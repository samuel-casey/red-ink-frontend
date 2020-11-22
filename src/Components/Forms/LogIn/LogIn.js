import React, { useState, useContext } from 'react';
import { GlobalCtx } from '../../../App';
import './LogIn.scss';

const LogIn = ({ handleLogIn, history }) => {
	const emptyForm = {
		email: '',
		password: '',
		userType: '',
	};

	const { gState, setGState } = useContext(GlobalCtx);

	const [formData, setFormData] = useState(emptyForm);

	const handleChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;
		setFormData({ ...formData, [key]: value });
	};

	const handleRadioChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;
		setFormData({ ...formData, [key]: value });
	};

	// const validateLogInFields = (fields) => {
	// 	let errorMessage;
	// 	if (
	// 		fields.password !== fields.confirmPassword ||
	// 		fields.email !== fields.confirmEmail
	// 	) {
	// 		errorMessage =
	// 			'Woops! Check that your emails and passwords match and try again';
	// 	} else if (
	// 		fields.email === '' ||
	// 		fields.confirmEmail === '' ||
	// 		fields.password === '' ||
	// 		fields.confirmPassword === '' ||
	// 		fields.userType === ''
	// 	) {
	// 		errorMessage = 'Please fill out all form fields';
	// 	} else {
	// 		errorMessage = null;
	// 	}
	// 	return errorMessage;
	// };

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const newUser = {
				email: formData.email,
				password: formData.password,
				userType: formData.userType,
			};
			const loggedIn = await handleLogIn(newUser);

			if (loggedIn === true) {
				history.push('/account');
			}
		} catch (error) {
			setGState({ ...gState, errorDropdown: error.message });
			setFormData(emptyForm);
		}
	};

	return (
		<div className='sign-up-page'>
			<h2>Log In</h2>
			<form onSubmit={handleSubmit} className='auth-form'>
				<input
					className='input'
					type='email'
					name='email'
					value={formData.email}
					placeholder='Email'
					onChange={handleChange}
				/>
				<input
					className='input'
					type='password'
					name='password'
					value={formData.password}
					placeholder='Password'
					onChange={handleChange}
				/>
				<input type='submit' className='button is-primary' value='Sign In' />
			</form>
		</div>
	);
};

export default LogIn;
