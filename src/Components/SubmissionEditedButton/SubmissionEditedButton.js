import React from 'react';

const SubmissionEditedButton = ({ submissionId, handleClick, url }) => {
	return (
		<button
			className='button is-small is-warning'
			onClick={() => handleClick(submissionId, url)}>
			Edits Complete<i className='far fa-check-square'></i>
		</button>
	);
};

export default SubmissionEditedButton;
