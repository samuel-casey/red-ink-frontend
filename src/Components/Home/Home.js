import React, { useContext, useEffect } from 'react';
import './Home.scss';
import { GlobalCtx } from '../../App';
import { getAllEditors } from '../../apiHelpers/editorsHelpers';

const Home = () => {
	const { gState, setGState } = useContext(GlobalCtx);
	const { numEditors, url } = gState;

	useEffect(() => {
		const getEditorsCount = async () => {
			const editorsList = await getAllEditors(url);
			setGState({ ...gState, numEditors: editorsList.length });
		};
		getEditorsCount();
	});
	return (
		<div>
			<h3>Home</h3>
			<h5>
				Like to help others with their writing? Join {numEditors} other editors
				by signing up today!
			</h5>
		</div>
	);
};

export default Home;
