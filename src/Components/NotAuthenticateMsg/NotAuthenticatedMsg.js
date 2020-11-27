import React from 'react';
import './NotAuthenticatedMsg.scss';
import { Link } from 'react-router-dom';
import DemoButton from '../DemoButton/DemoButton';

const NotAuthenticatedMsg = ({ pageMsg }) => {
	return (
		<div className='not-authenticated-page'>
			<div className='arrow-down'></div>
			<div className='not-authenticated-msg-container'>
				<p>Please Log in, Sign Up, or try a demo to access {pageMsg}</p>
				<div className='buttons-container'>
					<Link to='/signup' className='button is-primary'>
						Sign up
					</Link>
					<Link to='/login' className='button is-primary'>
						Log in
					</Link>
					<DemoButton />
				</div>
			</div>
		</div>
	);
};

export default NotAuthenticatedMsg;
