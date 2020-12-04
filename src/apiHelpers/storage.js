import { fbase } from '../index';

export const createFirebaseStorageURL = async (newFile) => {
	// create a new item in Firebase Storage for the file
	const storageRef = fbase.storage().ref();
	const newFileRef = storageRef.child(newFile.name);
	await newFileRef.put(newFile);

	// get the URL for the new Firebase Storage item
	const newFileUrl = await newFileRef.getDownloadURL();

	// return new file URL for use in set state hook
	return newFileUrl;
};
