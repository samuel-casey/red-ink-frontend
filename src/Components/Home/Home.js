import React, { useContext, useEffect, useState } from 'react';
import './Home.scss';
import { GlobalCtx } from '../../App';
import { getAllEditors } from '../../apiHelpers/editorsHelpers';
import SvgLogo from '../Svgs/SvgLogo/SvgLogo';
import SvgEditingHome from '../Svgs/SvgEditingImage/SvgEditingHome';
import { Link } from 'react-router-dom';
import { getAllWriters } from '../../apiHelpers/writersHelpers';
import DemoButton from '../DemoButton/DemoButton';

const Home = ({ handleLogIn, history }) => {
	const { gState, setGState } = useContext(GlobalCtx);
	const { numEditors, numWriters, url } = gState;
	const [aboutType, setAboutType] = useState('mission');

	const about = aboutType === 'mission' ? 'mission' : 'EdItOrS ArE VeTtEd';

	useEffect(() => {
		const getCounts = async () => {
			const editorsList = await getAllEditors(url);
			const writersList = await getAllWriters(url);
			setGState({
				...gState,
				numEditors: editorsList.length,
				numWriters: writersList.length,
			});
		};
		getCounts();
	}, []);
	return (
		<div className='home-page'>
			<div className='page-top'>
				<div className='svgs-container'>
					<SvgLogo />
					<br />
					<SvgEditingHome />
				</div>
				<h1 className='title is-1'>
					Get feedback on your writing from subject-matter experts.
				</h1>
				<h4 className='subtitle is-4'>
					Need help with your writing? Like to help others with their writing?
					Join {numWriters} writers and {numEditors} editors by signing up
					today!
				</h4>
				<div className='buttons-container'>
					<Link to='/signup' className='button is-primary'>
						Sign Up
					</Link>
					<DemoButton history={history} handleLogIn={handleLogIn} />
				</div>
				<div className='learn-more'>
					<p>Learn more</p>
					<i className='fas fa-caret-down bounce-3'></i>
				</div>
			</div>
			<div className='page-middle'>
				<div id='video-container'>
					<h3 className='title is-3'>How it works</h3>
					<iframe
						src='https://www.youtube.com/embed/XIMLoLxmTDw'
						frameborder='0'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
						allowfullscreen></iframe>
				</div>
				<div className='buttons-container'>
					<Link to='/signup' className='button is-primary'>
						Sign Up
					</Link>
					<DemoButton history={history} handleLogIn={handleLogIn} />
				</div>
			</div>
			<div className='page-bottom'>
				<br />
				<br />
				<br />
				<div className='home-about-container'>
					<h3 className='title is-3 how-it-works-heading'>
						About <span>red ink</span>
					</h3>
					<div className='instructions-toggle'>
						<span
							className={
								aboutType === 'mission' ? 'active-info' : 'inactive-info'
							}
							onClick={() => setAboutType('mission')}>
							Mission
						</span>
						<span
							className={
								aboutType === 'editing' ? 'active-info' : 'inactive-info'
							}
							onClick={() => setAboutType('editing')}>
							Editing
						</span>
					</div>
					<div className='how-it-works-info'>{about}</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
