import React, { useState, useContext } from 'react';
import { GlobalCtx } from '../../../App';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import './LogIn.scss';

const LogIn = ({ handleLogIn, history }) => {
	const emptyForm = {
		email: '',
		password: '',
		userType: '',
	};

	const { gState, setGState } = useContext(GlobalCtx);
	const [isLoading, setIsLoading] = useState(false);

	const [formData, setFormData] = useState(emptyForm);

	const handleChange = (e) => {
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
			setIsLoading(true);

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
			<br></br>
			<h3 className='title is-3'>Log In</h3>
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
				{isLoading ? (
					<LoadingSpinner />
				) : (
					<>
						<br />{' '}
						<input
							type='submit'
							className={`button is-primary`}
							value='Log In'
						/>
					</>
				)}
			</form>
		</div>
	);
};

export default LogIn;
