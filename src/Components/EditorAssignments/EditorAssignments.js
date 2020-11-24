import React, { useContext, useEffect, useState } from 'react';
import {
	getAllAssignmentsForEditor,
	toggleSubmissionDocumentCompleted,
	formatSubmissionDate,
} from '../../apiHelpers/submissionHelpers';
import { GlobalCtx } from '../../App';
import SubmissionEditedButton from '../SubmissionEditedButton/SubmissionEditedButton';
import SubmissionNotEditedButton from '../SubmissionNotEditedButton/SubmissionNotEditedButton';
import './EditorAssignments.scss';

const EditorAssignments = () => {
	const { gState } = useContext(GlobalCtx);
	const { uid, url } = gState;

	const [assignments, setAssignments] = useState([]);
	const [clicks, setClicks] = useState(0);

	const handleClick = async (documentId) => {
		await toggleSubmissionDocumentCompleted(documentId, url);
		setClicks(clicks + 1);
	};

	const listOfAssignments = assignments
		? assignments.map((assignment) => (
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
							{assignment.edits_complete ? 'Edits complete' : 'Awaiting edits'}
						</p>
					</div>
					<div className='link-button'>
						<a
							className='button is-outlined is-primary is-small'
							href={assignment.url}
							target='blank'>
							Document Link <i className='fas fa-file-alt'></i>
						</a>
					</div>
					<div className='toggle-complete-button'>
						{assignment.edits_complete ? (
							<SubmissionEditedButton
								handleClick={handleClick}
								submissionId={assignment.submission_id}
								url={url}
							/>
						) : (
							<SubmissionNotEditedButton
								handleClick={handleClick}
								submissionId={assignment.submission_id}
								url={url}
							/>
						)}
					</div>
				</div>
		  ))
		: null;

	useEffect(() => {
		const getAssignments = async () => {
			const allAssignments = await getAllAssignmentsForEditor(uid, url);
			setAssignments(allAssignments);
		};
		getAssignments();
	}, [clicks]);

	return (
		<section className='assignments-section'>
			<h5 className='title is-5 assignments-heading'>Editing Assignments</h5>
			<div className='assignments-container'>{listOfAssignments}</div>
		</section>
	);
};

export default EditorAssignments;
