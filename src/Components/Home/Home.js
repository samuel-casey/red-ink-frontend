import React, { useState } from 'react';
import './Home.scss';
import SvgLogo from '../Svgs/SvgLogo/SvgLogo';
import SvgEditingHome from '../Svgs/SvgEditingImage/SvgEditingHome';
import { Link } from 'react-router-dom';
import DemoButton from '../DemoButton/DemoButton';

const Home = ({ handleSignUp, history }) => {
	const [aboutType, setAboutType] = useState('mission');

	const about =
		aboutType === 'mission' ? (
			<>
				<span className='app-name'>red ink</span> is a platform for connecting
				students, bloggers, and others looking to improve their writing with
				editors who have specific subject-matter expertise. The goal of{' '}
				<span className='app-name'>red ink</span> is to help individuals improve
				the content, style and tone of their writing.
			</>
		) : (
			<>
				<span className='app-name'>red ink</span> currently leverages Google
				Docs for document editing, and serves primarily as a way to connect
				Writers and Editors.
				<br />
				<br />
				Writers and Editors are notified via email about new edits and new
				assignments respectively. Writers and Editors can trigger emails to each
				other through the Account page to communicate about status changes for
				documents.
				<br />
				<br />
				Right now, anyone can sign up to be an Editor and Editors work on a
				volunteer basis. Editors must provide some information about themselves
				so that writers have information about who they are choosing to edit
				their work.
				<br />
				<br />
				If you love reading and helping others with their writing, sign up to
				edit today!
			</>
		);

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
					Sign up today!
				</h4>
				<div className='buttons-container'>
					<Link to='/signup' className='button is-primary'>
						Sign Up
					</Link>
					<DemoButton history={history} handleSignUp={handleSignUp} />
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
						frameBorder='0'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
						allowFullScreen></iframe>
				</div>
				<div className='buttons-container'>
					<Link to='/signup' className='button is-primary'>
						Sign Up
					</Link>
					<DemoButton history={history} handleSignUp={handleSignUp} />
				</div>
			</div>
			<div className='page-bottom'>
				<br />
				<br />
				<br />
				<div className='home-about-container'>
					<h3 className='title is-3 home-about-heading'>
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
					<div className='home-about-info'>{about}</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
