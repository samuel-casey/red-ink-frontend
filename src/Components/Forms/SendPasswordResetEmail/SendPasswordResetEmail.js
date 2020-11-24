import React, { useState } from 'react';
import './SendPasswordResetEmail.scss';

const SendPasswordResetEmail = ({
	handleSendPasswordResetEmail,
	toggleForgetPassword,
}) => {
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
				<div className='reset-buttons'>
					<input
						type='submit'
						className='button is-primary is-light'
						value='Reset Password'
					/>
					<button
						className='button is-ghost'
						onClick={() => toggleForgetPassword()}>
						<i className='far fa-window-close'></i>
					</button>
				</div>
			</form>
		</div>
	);
};

export default SendPasswordResetEmail;
