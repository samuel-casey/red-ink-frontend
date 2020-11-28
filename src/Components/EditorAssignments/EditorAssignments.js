import React, { useContext, useEffect, useState } from 'react';
import {
	getAllAssignmentsForEditor,
	toggleSubmissionDocumentCompleted,
	formatSubmissionDate,
	toggleWriterNotifiedInDB,
} from '../../apiHelpers/submissionHelpers';
import { GlobalCtx } from '../../App';
import SubmissionEditStatusButton from '../SubmissionEditedButton/SubmissionEditedButton';
import NotifyWriterButton from '../NotifyWriterButton/NotifyWriterButton';
import './EditorAssignments.scss';
import { sendWriterEmailNotification } from '../../apiHelpers/writersHelpers';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import NoSubmissionsMsg from '../NoSubmissionsMsg/NoSubmissionsMsg';

const EditorAssignments = () => {
	const { gState } = useContext(GlobalCtx);
	const { uid, url } = gState;

	const [assignments, setAssignments] = useState([]);
	const [clicks, setClicks] = useState(0);

	const handleStatusClick = async (documentId, submissionObject) => {
		await toggleSubmissionDocumentCompleted(
			documentId,
			url,
			submissionObject,
			'status'
		);
		setClicks(clicks + 1);
	};

	const handleNotifyClick = async (submissionId, writerId, title, link) => {
		console.log(writerId, title, link);
		await toggleWriterNotifiedInDB(submissionId, url);
		await sendWriterEmailNotification(writerId, title, link, url);
		setClicks(clicks + 1);
	};

	const listOfAssignments =
		assignments.length > 0 && assignments[0] !== 'empty' ? (
			assignments.map((assignment) => (
				<div className='editor-assignment' key={assignment.submission_id}>
					<div className='assignment-text-container'>
						<h6 className='title is-6'>Title:</h6>
						<p>{assignment.title}</p>
					</div>
					<div className='assignment-text-container'>
						<h6 className='title is-6'>Submitted:</h6>
						<p>{formatSubmissionDate(assignment.created_at)}</p>
					</div>
					<div className='assignment-text-container'>
						<h6 className='title is-6'>Status:</h6>{' '}
						<p>
							{assignment.edits_status === 'awaiting'
								? 'Awaiting edits'
								: `Edits ${assignment.edits_status}`}
						</p>
					</div>
					<div className='assignment-text-container'>
						<h6 className='title is-6'>Notes from writer:</h6>{' '}
						<p>{assignment.notes}</p>
					</div>
					<div className='link-button'>
						<a
							className='button is-primary is-small'
							href={assignment.url}
							target='blank'>
							Document Link <i className='fas fa-file-alt'></i>
						</a>
					</div>
					<div className='toggle-complete-button'>
						{
							<SubmissionEditStatusButton
								handleClick={handleStatusClick}
								submissionId={assignment.submission_id}
								submissionObject={assignment}
								url={url}
							/>
						}
					</div>
					<div className='toggle-complete-button'>
						{assignment.edits_status === 'complete' ? (
							<NotifyWriterButton
								handleClick={handleNotifyClick}
								submissionId={assignment.submission_id}
								writerId={assignment.writer_id}
								title={assignment.title}
								link={assignment.url}
								submissionObject={assignment}
								url={url}
							/>
						) : null}
					</div>
				</div>
			))
		) : assignments[0] === 'empty' ? (
			<NoSubmissionsMsg userType='editor' />
		) : (
			<LoadingSpinner msg='Loading Assignments...' />
		);

	useEffect(() => {
		const getAssignments = async () => {
			const allAssignments = await getAllAssignmentsForEditor(uid, url);
			console.log(allAssignments);
			if (allAssignments.length === 0) {
				setAssignments(['empty']);
			} else {
				setAssignments(allAssignments);
			}
		};
		getAssignments();
		console.log(assignments);
	}, [clicks]);

	return (
		<section className='assignments-section'>
			<h5 className='title is-5 assignments-heading'>Editing Assignments</h5>
			<div className='assignments-container'>{listOfAssignments}</div>
		</section>
	);
};

export default EditorAssignments;
