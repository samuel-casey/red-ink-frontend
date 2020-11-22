import React, { useContext, useEffect, useState } from 'react';
import { GlobalCtx } from '../../App';
import { getAllEditors } from '../../apiHelpers/editorsHelpers';
import './AllEditors.scss';
import EditorCard from '../Editor/EditorCard';
import { Link } from 'react-router-dom';

const AllEditors = ({ history }) => {
	const { gState } = useContext(GlobalCtx);
	const { url, uid, editorUid } = gState;
	const [editorsList, setEditorsList] = useState([]);

	const currentUserUid = uid;

	useEffect(() => {
		const getEditors = async () => {
			const editorsData = await getAllEditors(url);
			setEditorsList(editorsData);
		};
		getEditors();
	}, []);

	const loading = (
		<div>
			<h5 className='subtitle is-5'>Loading editors...</h5>
			<button className='button is-loading is-warning loading-spinner' disabled>
				{' '}
			</button>
		</div>
	);

	const messageToCurrentEditor =
		editorUid === currentUserUid
			? 'Editors cannot request edits from themselves. For a preview of what your profile looks like to the rest of the world, visit your Account page.'
			: null;

	const filteredEditors =
		editorsList.length > 0
			? editorsList.filter((editor) => editor.uid !== currentUserUid)
			: null;

	const editors =
		editorsList.length > 0
			? filteredEditors.map((editor) => (
					<EditorCard key={editor.doc_id} history={history} {...editor} />
			  ))
			: loading;

	console.log(messageToCurrentEditor);

	return (
		<div className='all-editors-container'>
			{editors}
			<p>{messageToCurrentEditor}</p>
		</div>
	);
};

export default AllEditors;
