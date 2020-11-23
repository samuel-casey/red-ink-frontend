import React, { useContext, useState } from 'react';
import './SubmissionForm.scss';
import { GlobalCtx } from '../../../App';

const SubmissionForm = ({ history }) => {
	const { gState } = useContext(GlobalCtx);
	const { editorEmail, editorFirstName, editorLastName } = gState;

	const initialForm = {
		editorEmail: editorEmail,
		editorFirstName: editorFirstName,
		editorLastName: editorLastName,
		link: '',
		notes: '',
		writerEmail: '',
	};

	const [formData, setFormData] = useState(initialForm);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('submit');
		// history.push('/account');
	};

	const handleChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;
		setFormData({ ...formData, [key]: value });
	};

	console.log(initialForm);

	return (
		<div className='submission-form-container'>
			<h3>
				Submit your writing to {gState.firstName} {gState.lastName}
			</h3>
			<form onSubmit={handleSubmit} className='submission-form'>
				<input
					className='input'
					type='password'
					name='editorEmail'
					value={formData.editorEmail}
					placeholder='Editor Email'
					disabled
				/>
				<input
					className='input'
					type='text'
					name='editorFirstName'
					value={formData.editorFirstName}
					placeholder='Editor First Name'
					disabled
				/>
				<input
					className='input'
					type='text'
					name='editorLastName'
					value={formData.editorLastName}
					placeholder='Editor Last Name'
					disabled
				/>
				<div className='form-btns'>
					<button className='button is-primary' type='submit'>
						Submit writing{' '}
						<i className='fa fa-paper-plane' aria-hidden='true'></i>
					</button>
					<button className='button is-light' type='submit'>
						<i className='fas fa-angle-double-left'></i> Back to Editors
					</button>
				</div>
			</form>
		</div>
	);
};

export default SubmissionForm;
