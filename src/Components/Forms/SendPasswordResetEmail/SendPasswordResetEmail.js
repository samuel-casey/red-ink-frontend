import React, { useState } from 'react';
import './SendPasswordResetEmail.scss';

const SendPasswordResetEmail = ({ handleSendPasswordResetEmail }) => {
	const emptyForm = {
		email: '',
	};

	const [formData, setFormData] = useState(emptyForm);

	const handleChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;
		setFormData({ ...formData, [key]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const resetUser = {
				email: formData.email,
			};
			await handleSendPasswordResetEmail(resetUser);
			setFormData(emptyForm);
		} catch (error) {
			alert(error);
			setFormData(emptyForm);
		}
	};

	return (
		<div className='password-reset'>
			<h4>Reset Password</h4>
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
					type='submit'
					className='button is-success'
					value='Reset Password'
				/>
			</form>
		</div>
	);
};

export default SendPasswordResetEmail;
