import React, { useContext, useEffect, useState } from 'react';
import { GlobalCtx } from '../../App';
import { getAllEditors } from '../../apiHelpers/editorsHelpers';
import './AllEditors.scss';
import EditorCard from '../EditorCard/EditorCard';
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

	return (
		<>
			<div className='all-editors-container'>{editors}</div>
			<div>
				<h6 className='title is-6 message-to-current-editor-heading'>
					Wondering where your Editor profile is?
				</h6>
				<p className='message-to-current-editor'>
					If you don't have an Editor account, create one today! If you already
					have an account and want to see a preview of your editor profile card,
					visit the Account page. Editors cannot submit edit requests to
					themselves.{' '}
				</p>
			</div>
		</>
	);
};

export default AllEditors;
