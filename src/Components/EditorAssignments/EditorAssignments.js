import React, { useContext, useEffect, useState } from 'react';
import {
	getAllAssignmentsForEditor,
	toggleSubmissionDocumentCompleted,
	formatSubmissionDate,
	notifyWriter,
} from '../../apiHelpers/submissionHelpers';
import { GlobalCtx } from '../../App';
import SubmissionEditStatusButton from '../SubmissionEditedButton/SubmissionEditedButton';
import NotifyWriterButton from '../NotifyWriterButton/NotifyWriterButton';
import './EditorAssignments.scss';

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

	const handleNotifyClick = async (documentId) => {
		await notifyWriter(documentId, url);
		setClicks(clicks + 1);
	};

	const listOfAssignments = assignments ? (
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
					{
						<NotifyWriterButton
							handleClick={handleNotifyClick}
							submissionId={assignment.submission_id}
							submissionObject={assignment}
							url={url}
						/>
					}
				</div>
			</div>
		))
	) : (
		<div className='loading-container'>
			<h5 className='subtitle is-5'>Loading assignments...</h5>
			<button className='button is-loading loading-spinner' disabled>
				{' '}
			</button>
		</div>
	);

	useEffect(() => {
		const getAssignments = async () => {
			const allAssignments = await getAllAssignmentsForEditor(uid, url);
			setAssignments(allAssignments);
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
