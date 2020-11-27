import axios from 'axios';

export const getAllEditors = async (url) => {
	try {
		const res = await axios.get(url + '/editors');
		const editors = await res.data.data;
		return editors;
	} catch (error) {
		console.log(error);
	}
};

export const getSingleEditor = async (url, editorId) => {
	try {
		const res = await axios.get(url + '/editors/' + editorId);
		const editor = res.data.data;
		return editor;
	} catch (error) {
		console.log(error);
	}
};

export const updateEditorData = async (url, editorId, newEditorData) => {
	try {
		const updatesMap = {
			first_name: newEditorData.firstName,
			last_name: newEditorData.lastName,
			area_of_expertise: newEditorData.areaOfExpertise,
			about_me: newEditorData.aboutMe,
			linkedin_url: newEditorData.linkedInUrl,
			twitter_url: newEditorData.twitterUrl,
			profile_img_url: newEditorData.profileImgUrl,
		};
		const editorToUpdate = await getSingleEditor(url, editorId);
		const res = await axios.put(
			url + '/editors/' + editorToUpdate[0].doc_id,
			updatesMap
		);
		return true;
	} catch (error) {
		console.log(error);
	}
};

export const sendEditorReminderEmail = async (
	url,
	editorId,
	title,
	link,
	editorName,
	createdAt
) => {
	try {
		const submissionToSendReminderFor = {
			title: title,
			link: link,
			editorName: editorName,
			createdAt: createdAt,
		};
		const remindEditor = await axios.put(
			url + '/editors/remind/' + editorId,
			submissionToSendReminderFor
		);
		return remindEditor;
	} catch (error) {
		console.log(error);
	}
};
