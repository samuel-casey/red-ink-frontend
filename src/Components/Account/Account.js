import React, { useState, useContext } from 'react';
import './Account.scss';
import { GlobalCtx } from '../../App';
import { Link } from 'react-router-dom';

const EditorAccount = () => {
	const { gState, setGState } = useContext(GlobalCtx);
	const { userType } = gState;

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
		console.log(formData);
	};

	return (
		<div>
			<h3>My Account</h3>
			{userType}
			{/* <form onSubmit={handleSubmit}>
				<input
					className='input'
					type='text'
					name='title'
					value={formData.email}
					placeholder='Email'
					onChange={handleChange}
				/>
				<input
					className='input'
					type='text'
					name='artist'
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
					value={formBtnText}
				/>
			</form> */}
		</div>
	);
};

export default EditorAccount;
