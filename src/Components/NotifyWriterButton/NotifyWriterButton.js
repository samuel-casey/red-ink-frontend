import React from 'react';

const NotifyWriterButton = ({
	handleClick,
	submissionObject,
	title,
	link,
	writerId,
	submissionId,
}) => {
	const buttonClass = submissionObject.writer_notified
		? 'is-dark'
		: 'is-dark is-outlined';

	return (
		<button
			className={`button is-small ${buttonClass}`}
			onClick={() => handleClick(submissionId, writerId, title, link)}>
			{submissionObject.writer_notified ? (
				<>
					<span>Writer Notified</span>
					<i className='fas fa-envelope'></i>
				</>
			) : (
				<>
					<span>Notify writer</span>
					<i className='fas fa-paper-plane'></i>
				</>
			)}
		</button>
	);
};

export default NotifyWriterButton;
