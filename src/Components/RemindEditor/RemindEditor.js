import React from 'react';
import './RemindEditor.scss';

const RemindEditor = ({
	handleClick,
	editorRemindedStatus,
	submissionId,
	editorId,
	link,
	title,
	createdAt,
	editorName,
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
					editorId,
					editorRemindedStatus,
					title,
					link,
					editorName,
					createdAt
				)
			}>
			<i className='fas fa-bell'></i>
			<span className='tooltip-text'>Remind Editor</span>
		</button>
	);
};

export default RemindEditor;
