import React from 'react';
import './WriterSubmissionStatus.scss';

const WriterSubmissionStatus = ({ submissionStatus }) => {
	let submissionStatusElement;

	if (submissionStatus === 'awaiting') {
		submissionStatusElement = (
			<span>
				Awaiting edits <i className='fas fa-stopwatch'></i>
			</span>
		);
	} else if (submissionStatus === 'ongoing') {
		submissionStatusElement = (
			<span>
				Edits in progress <i className='fas fa-spinner'></i>
			</span>
		);
	} else {
		submissionStatusElement = (
			<span>
				Edits complete <i className='fas fa-check'></i>
			</span>
		);
	}

	return submissionStatusElement;
};

export default WriterSubmissionStatus;
