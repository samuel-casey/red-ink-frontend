import axios from 'axios';

const createdAt = new Date(Date.now()).toUTCString();

export const createNewSubmission = async (submissionData, url) => {
	try {
		const newSubmissionDocument = {
			created_at: createdAt,
			editor_id: submissionData.editorUid,
			edits_complete: submissionData.editsComplete,
			editor_email: submissionData.editorEmail,
			title: submissionData.title,
			notes: submissionData.notes,
			url: submissionData.link,
			writer_id: submissionData.writerUid,
			writer_email: submissionData.writerEmail,
			first_name: submissionData.editorFirstName,
			last_name: submissionData.editorLastName,
		};
		const res = await axios.post(url + '/submissions', newSubmissionDocument);
		console.log(res.data.data);
	} catch (error) {
		console.log(error);
	}
};