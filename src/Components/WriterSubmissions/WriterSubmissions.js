import React, { useEffect, useState, useContext } from 'react';
import {
	getAllSubmissionsForWriter,
	formatSubmissionDate,
	sendRemindEditorEmailForSubmission,
} from '../../apiHelpers/submissionHelpers';
import './WriterSubmissions.scss';
import { GlobalCtx } from '../../App';
import { getSingleEditor } from '../../apiHelpers/editorsHelpers';
import WriterSubmissionStatus from '../WriterSubmissionStatus/WriterSubmissionStatus';
import RemindEditor from '../RemindEditor/RemindEditor';

const WriterSubmissions = () => {
	const { gState } = useContext(GlobalCtx);
	const { uid, url, userEmail } = gState;

	const [submissions, setSubmissions] = useState([]);

	const handleRemindEditorClick = async (
		submissionId,
		writerEmail,
		title,
		createdAt
	) => {
		await sendRemindEditorEmailForSubmission(
			url,
			submissionId,
			userEmail,
			title,
			createdAt
		);
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
									{submission.edits_status !== 'complete' ? (
										<>
											<WriterSubmissionStatus
												submissionStatus={submission.edits_status}
											/>
											<RemindEditor
												reminded={submission.editor_reminded}
												handleClick={handleRemindEditorClick}
												writerEmail={userEmail}
												docId={submission.submission_id}
												title={submission.title}
												createdAt={formatSubmissionDate(submission.created_at)}
											/>
										</>
									) : (
										<WriterSubmissionStatus
											submissionStatus={submission.edits_status}
										/>
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
			<div className='loading-container'>
				<h5 className='subtitle is-5'>Loading submissions...</h5>
				<button className='button is-loading loading-spinner' disabled>
					{' '}
				</button>
			</div>
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
	}, []);

	return (
		<section className='submissions-section'>
			<h5 className='title is-5 submissions-heading'>Writing submissions</h5>
			<div className='submissions-container'>{listOfSubmissions}</div>
		</section>
	);
};

export default WriterSubmissions;
