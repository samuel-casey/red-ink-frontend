import React from 'react';
import './EditorAccountFields.scss';

const EditorAccountFields = ({ handleChange, formData, setFormData }) => {
	return (
		<div className='extra-editor-fields'>
			<label htmlFor='firstName'>First name</label>
			<input
				className='input'
				name='firstName'
				value={formData.firstName}
				placeholder='First name'
				onChange={handleChange}
			/>
			<br />
			<label htmlFor='linkedInUrl'>Last name</label>
			<input
				className='input'
				name='lastName'
				value={formData.lastName}
				placeholder='Last name'
				onChange={handleChange}
			/>
			<br />
			<label htmlFor='areaOfExpertise'>Area of Expertise</label>
			<input
				className='input'
				name='areaOfExpertise'
				value={formData.areaOfExpertise}
				placeholder='What do you know a lot about?'
				onChange={handleChange}
			/>
			<br />
			<label>About You</label>
			<textarea
				className='textarea'
				name='aboutMe'
				value={formData.aboutMe}
				placeholder='Describe yourself in a few sentences so writers know why they should ask you to edit their writing!'
				onChange={handleChange}
			/>
			<br />
			<label htmlFor='linkedInUrl'>LinkedIn</label>
			<input
				className='input'
				name='linkedInUrl'
				value={formData.linkedInUrl}
				placeholder='Link to LinkedIn profile (optional)'
				onChange={handleChange}
			/>
			<br />
			<label htmlFor='twitterUrl'>Twitter</label>
			<input
				className='input'
				name='twitterUrl'
				value={formData.twitterUrl}
				placeholder='Link to Twitter profile (optional)'
				onChange={handleChange}
			/>
			<br />
			<label htmlFor='profileImgUrl'>Profile Picture</label>
			<input
				type='text'
				name='profileImgUrl'
				className='avatars-input input'
				value={formData.profileImgUrl}
				list='avatars'
				placeholder='Enter a link to your profile picture, or select a default'
				onChange={handleChange}
			/>
			<div className='default-avatars'>
				<div className='default-avatar-container'>
					<span>Default Picture 1</span>
					<br />
					<img
						src='https://res.cloudinary.com/scimgcloud/image/upload/v1605896582/DefaultUserPhoto1_aeq0qy.png'
						alt='default-avatar-1'
						className='avatar-img'
					/>
					<br />
					<button
						type='button'
						className='button is-small is-success'
						onClick={() =>
							setFormData({
								...formData,
								profileImgUrl:
									'https://res.cloudinary.com/scimgcloud/image/upload/v1605896582/DefaultUserPhoto1_aeq0qy.png',
							})
						}>
						Select
					</button>
				</div>
				<div className='default-avatar-container'>
					<span>Default Picture 2</span>
					<br />
					<img
						src='https://res.cloudinary.com/scimgcloud/image/upload/v1605896590/DefaultUserPhoto2_ate08f.png'
						alt='default-avatar-2'
						value='Default Picture 2'
						className='avatar-img'
						onClick={() => {
							setFormData({
								...formData,
								profileImgUrl:
									'https://res.cloudinary.com/scimgcloud/image/upload/v1605896590/DefaultUserPhoto2_ate08f.png',
							});
						}}
					/>
					<br />
					<button
						type='button'
						className='button is-small is-success'
						onClick={() =>
							setFormData({
								...formData,
								profileImgUrl:
									'https://res.cloudinary.com/scimgcloud/image/upload/v1605896590/DefaultUserPhoto2_ate08f.png',
							})
						}>
						Select
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditorAccountFields;
