import React from 'react';
import './RemindEditor.scss';

const RemindEditor = ({ reminded, handleClick, writerEmail, docId }) => {
	return reminded ? (
		<button className='button is-primary is-small is-light' disabled>
			Editor reminded
		</button>
	) : (
		<button
			className='button is-small is-light'
			handleClick={() => handleClick(docId, writerEmail)}>
			Remind Editor
		</button>
	);
};

export default RemindEditor;
