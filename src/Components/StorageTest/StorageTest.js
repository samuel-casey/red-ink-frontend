import React, { useContext, useState } from 'react';
import { isCompositeComponent } from 'react-dom/test-utils';
import { addUserToEditorsCollection } from '../../apiHelpers/authHelpers';
import { GlobalCtx } from '../../App';
import { fbase } from '../../index';

const StorageTest = () => {
	const [file, setFile] = useState(null);
	const { gState } = useContext(GlobalCtx);
	const { url } = gState;

	const handleChange = async (e) => {
		const newFile = e.target.files[0];
		setFile(newFile);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const storageRef = fbase.storage().ref();
		const newFileRef = storageRef.child(file.name);
		await newFileRef.put(file);
		const newFileUrl = await newFileRef.getDownloadURL();

		const newTestEditor = {
			userEmail: 'test@fbstorage.com',
			uid: 'TEST',
			aboutMe: 'TEST',
			AreaOfExpertise: 'TEST',
			twitterUrl: 'TEST',
			linkedinUrl: 'TEST',
			profileImgUrl: newFileUrl,
			firstName: 'TEST',
			lastName: 'TEST',
		};
		const message = await addUserToEditorsCollection(newTestEditor, url);
		console.log(message);
	};

	return (
		<>
			<br />
			<br />
			<br />
			<form onSubmit={handleSubmit}>
				<input type='file' onChange={handleChange} />
				<input type='submit' />
			</form>
			{/* <img src='https://firebasestorage.googleapis.com/v0/b/red-ink.appspot.com/o/Bcasey.jpg?alt=media&token=75c57636-01c9-4044-b293-4715102cee10' /> */}
			<button>Download Photo</button>
		</>
	);
};

export default StorageTest;
