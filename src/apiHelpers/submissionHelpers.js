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
		await axios.post(url + '/submissions', newSubmissionDocument);
	} catch (error) {
		console.log(error);
	}
};

export const getAllAssignmentsForEditor = async (editorId, url) => {
	try {
		const res = await axios.get(url + '/submissions/editors/' + editorId);
		const assignments = res.data.data;
		return assignments;
	} catch (error) {
		console.log(error);
	}
};

export const toggleSubmissionDocumentCompleted = async (submissionId, url) => {
	try {
		console.log(submissionId, url);
		const res = await axios.put(`${url}/submissions/${submissionId}`, {
			edits_complete: true,
		});
		const updatedAssignment = res.data.data;
		return updatedAssignment;
	} catch (error) {
		console.log(error);
	}
};

export const getAllSubmissionsForWriter = async (writerId, url) => {
	try {
		const res = await axios.get(url + '/submissions/writers' + writerId);
		const submissions = res.data.data;
		console.log(submissions);
	} catch (error) {
		console.log(error);
	}
};
