import React, { useContext, useState } from 'react';
import './SubmissionForm.scss';
import { GlobalCtx } from '../../../App';
import { Link } from 'react-router-dom';
import { createNewSubmission } from '../../../apiHelpers/submissionHelpers';

const SubmissionForm = ({ history }) => {
	const { gState } = useContext(GlobalCtx);
	const {
		editorEmail,
		editorFirstName,
		editorLastName,
		userEmail,
		editorUid,
		uid,
		url,
	} = gState;

	const initialForm = {
		editorUid: editorUid,
		editorEmail: editorEmail,
		editorFirstName: editorFirstName,
		editorLastName: editorLastName,
		writerUid: uid,
		writerEmail: userEmail,
		editsComplete: false,
		link: '',
		notes: '',
		title: '',
	};

	const [formData, setFormData] = useState(initialForm);

	console.log(userEmail);

	const handleSubmit = (e) => {
		e.preventDefault();
		createNewSubmission(formData, url);
		history.push('/account');
	};

	const handleChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;
		setFormData({ ...formData, [key]: value });
	};

	return (
		<div className='submission-form-container'>
			<br></br>
			<h3 className='title is-3'>
				Submit your writing to {editorFirstName} {editorLastName}
			</h3>
			<form onSubmit={handleSubmit} className='submission-form'>
				<label htmlFor='editorName'>Editor Name</label>
				<input
					className='input'
					type='text'
					name='editorName'
					value={`${formData.editorFirstName} ${formData.editorLastName}`}
					placeholder='Editor Last Name'
					disabled
				/>
				<label htmlFor='writerEmail'>Your email</label>
				<input
					className='input'
					type='text'
					name='writerEmail'
					value={formData.writerEmail}
					onChange={handleChange}
					placeholder='Provide your email so your editor can get in touch'
				/>
				<label htmlFor='title'>Title of writing</label>
				<input
					className='input'
					type='text'
					name='title'
					value={formData.title}
					onChange={handleChange}
					placeholder='Title'
				/>
				<label htmlFor='link'>Link to Google Doc</label>
				<input
					className='input'
					type='text'
					name='link'
					value={formData.link}
					onChange={handleChange}
					placeholder='Link to Google Doc'
				/>
				<label htmlFor='notes'>Notes for editor</label>
				<textarea
					className='textarea'
					type='text'
					name='notes'
					value={formData.notes}
					onChange={handleChange}
					placeholder='Notes for editor...'
				/>
				<div className='form-btns'>
					<button className='button is-primary' type='submit'>
						Submit writing{' '}
						<i className='fa fa-paper-plane' aria-hidden='true'></i>
					</button>
					<button className='button is-light' type='submit'>
						<Link to='/editors'>
							<i className='fas fa-angle-double-left'></i> Back to Editors
						</Link>
					</button>
				</div>
			</form>
		</div>
	);
};

export default SubmissionForm;
