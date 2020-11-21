import React, { useState, useContext } from 'react';
import { GlobalCtx } from '../../../App';
import './SignUp.scss';

const SignUp = ({ handleSignUp, history }) => {
	const { gState, setGState } = useContext(GlobalCtx);

	const emptyForm = {
		email: '',
		confirmEmail: '',
		password: '',
		confirmPassword: '',
		userType: '',
	};

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

	const validateSignUpFields = (fields) => {
		let errorMessage;
		if (
			fields.password !== fields.confirmPassword ||
			fields.email !== fields.confirmEmail
		) {
			errorMessage =
				'Woops! Check that your emails and passwords match and try again';
		} else if (
			fields.email === '' ||
			fields.confirmEmail === '' ||
			fields.password === '' ||
			fields.confirmPassword === '' ||
			fields.userType === ''
		) {
			errorMessage = 'Please fill out all form fields';
		} else {
			errorMessage = null;
		}
		return errorMessage;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const newUser = {
				email: formData.email,
				password: formData.password,
				userType: formData.userType,
			};

			const errorMessage = await validateSignUpFields(formData);
			let signedUp;

			if (!errorMessage) {
				signedUp = await handleSignUp(newUser);
			} else {
				throw new Error(errorMessage);
			}

			if (signedUp === true) {
				history.push('/account');
			}
		} catch (error) {
			setGState({
				...gState,
				errorDropdown: error.message,
			});
		}
	};

	const editorFields = formData.userType === 'Editor' ? 'Stuff' : null;

	return (
		<div className='sign-up-page'>
			<h2>Sign Up for red ink</h2>
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
					type='email'
					name='confirmEmail'
					value={formData.confirmEmail}
					placeholder='Confirm Email'
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
				<input
					className='input'
					type='password'
					name='confirmPassword'
					value={formData.confirmPassword}
					placeholder='Confirm Password'
					onChange={handleChange}
				/>
				<div onChange={handleRadioChange}>
					<h3>Account Type</h3>
					<label className='radio'>
						<input type='radio' name='userType' value='Writer' />
						Writer
					</label>
					<label className='radio'>
						<input type='radio' name='userType' value='Editor' />
						Editor
					</label>
				</div>
				{editorFields}
				<input type='submit' className='button is-primary' value='Sign Up' />
			</form>
		</div>
	);
};

export default SignUp;
