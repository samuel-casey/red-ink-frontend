import React from 'react';

const SubmissionNotEditedButton = ({ submissionId, handleClick, url }) => {
	return (
		<button
			className='button is-small is-ghost'
			onClick={() => handleClick(submissionId, url)}>
			Mark as Edited <i className='fas fa-check-square'></i>
		</button>
	);
};

export default SubmissionNotEditedButton;
