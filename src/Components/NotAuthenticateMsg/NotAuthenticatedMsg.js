import React, { useContext } from 'react';
import './NotAuthenticatedMsg.scss';
import { Link } from 'react-router-dom';
import DemoButton from '../DemoButton/DemoButton';
import { GlobalCtx } from '../../App';

const NotAuthenticatedMsg = ({ pageMsg, handleLogIn, history }) => {
	const { gState, setGState } = useContext(GlobalCtx);

	console.log(handleLogIn);

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
					<DemoButton handleLogIn={handleLogIn} history={history} />
				</div>
			</div>
		</div>
	);
};

export default NotAuthenticatedMsg;
