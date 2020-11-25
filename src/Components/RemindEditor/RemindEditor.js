import React from 'react';
import './RemindEditor.scss';

const RemindEditor = ({
	editorRemindedStatus,
	submissionId,
	link,
	title,
	createdAt,
	editorName,
	handleClick,
}) => {
	return editorRemindedStatus ? (
		<button className='button is-primary is-small is-light' disabled>
			Editor reminded
		</button>
	) : (
		<button
			className='button is-small is-ghost tooltip'
			onClick={() =>
				handleClick(
					submissionId,
					editorRemindedStatus,
					title,
					createdAt,
					link,
					editorName
				)
			}>
			<i className='fas fa-bell'></i>
			<span className='tooltip-text'>Remind Editor</span>
		</button>
	);
};

export default RemindEditor;
