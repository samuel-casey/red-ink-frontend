import React, { useState, useContext } from 'react';
import './Account.scss';
import { GlobalCtx } from '../../App';
import SendPasswordResetEmail from '../Forms/SendPasswordResetEmail/SendPasswordResetEmail';
import { Link } from 'react-router-dom';

const Account = ({ handleSendPasswordResetEmail, successMessage }) => {
	const { gState, setGState } = useContext(GlobalCtx);
	const { userType, userEmail } = gState;

	const emptyForm = {
		email: '',
		confirmEmail: '',
		password: '',
		confirmPassword: '',
	};

	const [formData, setFormData] = useState(emptyForm);

	const handleChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;
		setFormData({ ...formData, [key]: value });
	};

	const loggedIn = (
		<>
			<h2 className='title is-2'>My Account</h2>
			<h3 className='welcome-msg subtitle is-3'>Welcome {userEmail}</h3>
			<h4 className='subtitle is-4'>Account type: {userType}</h4>
			{successMessage}
			<SendPasswordResetEmail
				handleSendPasswordResetEmail={handleSendPasswordResetEmail}
			/>
		</>
	);

	const loggedOut = (
		<>
			<p>Please sign up and log in to access your red-ink account.</p>
		</>
	);

	const pageContent = userEmail ? loggedIn : loggedOut;

	return <div className='account-page'>{pageContent}</div>;
};

export default Account;
