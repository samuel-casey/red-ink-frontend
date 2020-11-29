import React, { useState } from 'react';
import './PasswordReset.scss';

const PasswordReset = ({ handlePasswordReset, history }) => {
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (formData.email === formData.confirmEmail) {
			const newUser = {
				email: formData.email,
				password: formData.password,
				userType: formData.userType,
			};
			const passwordReset = await handlePasswordReset(newUser);
			setFormData(emptyForm);
			if (passwordReset) history.push('/');
		} else {
			alert('Woops! Looks like your emails do not match. Please try again.');
			setFormData(emptyForm);
		}
	};

	return (
		<div className='reset-password-page'>
			<br />
			<h2 className='title is-2'>Reset Password</h2>
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
					type='submit'
					className='button is-primary'
					value='Reset Password'
				/>
			</form>
		</div>
	);
};

export default PasswordReset;
