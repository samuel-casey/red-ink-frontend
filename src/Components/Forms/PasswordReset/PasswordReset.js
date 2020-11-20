import React, { useState, useContext } from 'react';
import './PasswordReset.scss';
// import { GlobalCtx } from '../../App';
import { Link } from 'react-router-dom';

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
		if (
			formData.email === formData.confirmEmail &&
			formData.password === formData.confirmPassword
		) {
			const newUser = {
				email: formData.email,
				password: formData.password,
				userType: formData.userType,
			};
			await handlePasswordReset(newUser);
			console.log(newUser);
			const passwordReset = await alert(
				'Password successfully reset. Logging you in.'
			);
			if (passwordReset === true) {
				history.push('/account');
			}
		} else {
			alert(
				'Woops! Looks like your emails or passwords do not match. Please try again.'
			);
			setFormData(emptyForm);
		}
	};

	const editorFields = formData.userType === 'Editor' ? 'Stuff' : null;

	return (
		<div className='sign-up-page'>
			<h2>Reset Password</h2>
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
				<input
					type='submit'
					className='button is-primary'
					value='ResetPassword'
				/>
			</form>
		</div>
	);
};

export default PasswordReset;
