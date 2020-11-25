import React, { useEffect, useState, useContext } from 'react';
import {
	getAllSubmissionsForWriter,
	formatSubmissionDate,
	updateReminderStatusForSubmission,
} from '../../apiHelpers/submissionHelpers';
import './WriterSubmissions.scss';
import { GlobalCtx } from '../../App';
import { getSingleEditor } from '../../apiHelpers/editorsHelpers';
import WriterSubmissionStatus from '../WriterSubmissionStatus/WriterSubmissionStatus';
import RemindEditor from '../RemindEditor/RemindEditor';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const WriterSubmissions = () => {
	const { gState } = useContext(GlobalCtx);
	const { uid, url, userEmail } = gState;

	const [submissions, setSubmissions] = useState([]);
	const [reminderCount, setReminderCount] = useState(0);

	const handleRemindEditorClick = async (
		submissionId,
		editorRemindedStatus,
		link,
		title,
		createdAt,
		editorName
	) => {
		const reminderStatusSetToTrue = await updateReminderStatusForSubmission(
			url,
			submissionId,
			editorRemindedStatus
		);
		if (reminderStatusSetToTrue) {
			console.log('reminder status updated to true');
			setReminderCount(reminderCount + 1);
		} else {
			console.log('editor already reminded about this buckaroo');
		}
	};

	const listOfSubmissions =
		submissions.length > 0 ? (
			submissions.map((submission) => (
				<div className='writer-submission' key={submission.submission_id}>
					<div className='submission-start'>
						<div className='submission-text-container'>
							<h6 className='title is-6'>Title:</h6>
							<p>{submission.title}</p>
						</div>
						<div className='submission-text-container'>
							<h6 className='title is-6'>Submitted:</h6>
							<p>{formatSubmissionDate(submission.created_at)}</p>
						</div>
						<div className='submission-text-container'>
							<h6 className='title is-6'>Editor:</h6>
							<p>{submission.editorName}</p>
						</div>
					</div>
					<div className='submission-end'>
						<div className='toggle-complete-button'>
							{
								<div className='remind-container'>
									{submission.edits_status !== 'complete' &&
									submission.editor_reminded === false ? (
										<div className='submission-status-container'>
											<WriterSubmissionStatus
												submissionStatus={submission.edits_status}
											/>
											<RemindEditor
												editorRemindedStatus={submission.editor_reminded}
												handleClick={handleRemindEditorClick}
												writerEmail={userEmail}
												submissionId={submission.submission_id}
												title={submission.title}
												createdAt={formatSubmissionDate(submission.created_at)}
											/>
										</div>
									) : (
										<>
											<WriterSubmissionStatus
												submissionStatus={submission.edits_status}
											/>
											<span className='reminder-sent-msg'>
												{submission.editor_reminded === true
													? 'editor reminded'
													: null}
											</span>
										</>
									)}
								</div>
							}
						</div>
						<div className='link-button'>
							<a
								className='button is-primary is-small'
								href={submission.url}
								target='blank'>
								Document Link <i className='fas fa-file-alt'></i>
							</a>
						</div>
					</div>
				</div>
			))
		) : (
			<LoadingSpinner msg='Loading Submissions...' />
		);

	useEffect(() => {
		const getSubmissions = async () => {
			const allSubmissions = await getAllSubmissionsForWriter(uid, url);

			// get editor names to add to writerSubmission and add them to allSubmissions objects
			for (let submission of allSubmissions) {
				let editorArr = await getSingleEditor(url, submission.editor_id);
				submission.editorName = `${editorArr[0].first_name} ${editorArr[0].last_name}`;
			}

			console.log(allSubmissions);

			setSubmissions(allSubmissions);
		};
		getSubmissions();
	}, [reminderCount]);

	return (
		<section className='submissions-section'>
			<h5 className='title is-5 submissions-heading'>Writing submissions</h5>
			<div className='submissions-container'>{listOfSubmissions}</div>
		</section>
	);
};

export default WriterSubmissions;
