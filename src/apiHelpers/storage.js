import { fbase } from '../index';

export const createFirebaseStorageURL = async (newFile) => {
	// create a new item in Firebase Storage for the file
	try {
		const storageRef = fbase.storage().ref();
		const newFileRef = storageRef.child(newFile.name);
		await newFileRef.put(newFile);

		// get the URL for the new Firebase Storage item
		const newFileUrl = await newFileRef.getDownloadURL();

		// return new file URL for use in set state hook
		return newFileUrl;
	} catch (error) {
		// this alert message intentionally has weird formatting so that it looks cleaner in the browser
		alert(`Error: ${error}.
        
PLEASE ENSURE THAT YOU ARE ATTEMPTING TO UPLOAD AN IMAGE WITH A FILE TYPE OF .png, .jpg, or .jpeg`);
	}
};
