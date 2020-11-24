import React from 'react';

const SubmissionEditStatusButton = ({
	submissionId,
	submissionObject,
	handleClick,
}) => {
	let buttonText;
	let buttonClass;

	if (submissionObject.edits_status === 'awaiting') {
		buttonText = buttonText = (
			<>
				<span>
					Mark as started <i className='far fa-play-circle'></i>
				</span>
			</>
		);
		buttonClass = 'is-link is-outlined';
	} else if (submissionObject.edits_status === 'ongoing') {
		buttonText = (
			<>
				<span>
					Mark complete <i className='fas fa-check'></i>
				</span>
			</>
		);
		buttonClass = 'is-warning is-outlined';
	} else {
		buttonText = (
			<>
				<span>Edits complete</span>
				<i className='far fa-check-square'></i>
			</>
		);
		buttonClass = 'is-warning';
	}

	return (
		<button
			className={`button is-small ${buttonClass}`}
			onClick={() => handleClick(submissionId, submissionObject)}>
			{buttonText}
		</button>
	);
};

export default SubmissionEditStatusButton;
