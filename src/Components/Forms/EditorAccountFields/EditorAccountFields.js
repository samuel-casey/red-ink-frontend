import React, { useState } from 'react';
import './EditorAccountFields.scss';

const EditorAccountFields = ({
	handleChange,
	handleFileChange,
	formData,
	setFormData,
}) => {
	const [selectedAvatarOneClass, setSelectedAvatarOneClass] = useState(false);
	const [selectedAvatarTwoClass, setSelectedAvatarTwoClass] = useState(false);

	const avatarOneClass = selectedAvatarOneClass ? 'selected-avatar' : '';
	const avatarTwoClass = selectedAvatarTwoClass ? 'selected-avatar' : '';

	const handleDefaultAvatarClick = (e) => {
		switch (e.target.id) {
			case 'default-avatar-1-button':
				setSelectedAvatarOneClass(true);
				setSelectedAvatarTwoClass(false);
				setFormData({
					...formData,
					profileImgUrl:
						'https://res.cloudinary.com/scimgcloud/image/upload/v1605896582/DefaultUserPhoto1_aeq0qy.png',
				});

				break;
			case 'default-avatar-2-button':
				setSelectedAvatarOneClass(false);
				setSelectedAvatarTwoClass(true);
				setFormData({
					...formData,
					profileImgUrl:
						'https://res.cloudinary.com/scimgcloud/image/upload/v1605896590/DefaultUserPhoto2_ate08f.png',
				});

				break;
			default:
				setSelectedAvatarOneClass(false);
				setSelectedAvatarTwoClass(false);
				break;
		}
	};

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
				type='file'
				name='profileImgUrl'
				className='avatars-input input'
				onChange={handleFileChange}
				onClick={handleDefaultAvatarClick}
			/>
			<div className='default-avatars'>
				<div className={`default-avatar-container ${avatarOneClass}`}>
					<span>Default Picture 1</span>
					<br />
					<img
						src='https://res.cloudinary.com/scimgcloud/image/upload/v1605896582/DefaultUserPhoto1_aeq0qy.png'
						alt='default-avatar-1'
						name='default-avatar-1'
						className='avatar-img'
					/>
					<br />
					<button
						type='button'
						className='button is-small is-success'
						id='default-avatar-1-button'
						onClick={handleDefaultAvatarClick}>
						Select
					</button>
				</div>
				<div className={`default-avatar-container ${avatarTwoClass}`}>
					<span>Default Picture 2</span>
					<br />
					<img
						src='https://res.cloudinary.com/scimgcloud/image/upload/v1605896590/DefaultUserPhoto2_ate08f.png'
						alt='default-avatar-2'
						name='default-avatar-2'
						value='Default Picture 2'
						className='avatar-img'
					/>
					<br />
					<button
						type='button'
						className='button is-small is-success'
						id='default-avatar-2-button'
						onClick={handleDefaultAvatarClick}>
						Select
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditorAccountFields;
