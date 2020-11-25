import React from 'react';
import './RemindEditor.scss';

const RemindEditor = ({
	reminded,
	handleClick,
	writerEmail,
	docId,
	title,
	createdAt,
}) => {
	return reminded ? (
		<button className='button is-primary is-small is-light' disabled>
			Editor reminded
		</button>
	) : (
		<button
			className='button is-small is-light'
			onClick={() => handleClick(docId, writerEmail, title, createdAt)}>
			Remind Editor
		</button>
	);
};

export default RemindEditor;
