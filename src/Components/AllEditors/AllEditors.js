import React, { useContext, useEffect, useState } from 'react';
import { GlobalCtx } from '../../App';
import axios from 'axios';
import './AllEditors.scss';
import EditorCard from '../Editor/EditorCard';

const AllEditors = () => {
	const { gState, setGState } = useContext(GlobalCtx);
	const { url, numEditors } = gState;
	const [editorsList, setEditorsList] = useState([]);

	useEffect(() => {
		const getAllEditors = async () => {
			try {
				const res = await axios.get(url + '/editors');
				console.log(res.data.data);
				setEditorsList(res.data.data);
			} catch (error) {
				console.log(error);
			}
		};
		getAllEditors();
	}, []);

	const loading = (
		<>
			<p>Loading editors</p>
			<button className='button is-loading is-warning loading-spinner' disabled>
				{' '}
			</button>
		</>
	);

	const editors =
		editorsList.length > 0
			? editorsList.map((editor) => (
					<EditorCard key={editor.doc_id} {...editor} />
			  ))
			: loading;

	return <div className='all-editors-container'>{editors}</div>;
};

export default AllEditors;
