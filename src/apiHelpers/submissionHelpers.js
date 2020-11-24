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
		const res = await axios.get(url + '/submissions/writers/' + writerId);
		const submissions = await res.data.data;
		return submissions;
	} catch (error) {
		console.log(error);
	}
};

export const formatSubmissionDate = (date) => {
	const dateObj = new Date(date);

	const day = dateObj.getDate();
	const monthNo = dateObj.getMonth() + 1;
	const year = dateObj.getFullYear();

	const months = {
		1: 'Jan',
		2: 'Feb',
		3: 'Mar',
		4: 'Apr',
		5: 'May',
		6: 'Jun',
		7: 'Jul',
		8: 'Aug',
		9: 'Sept',
		10: 'Oct',
		11: 'Nov',
		12: 'Dec',
	};

	const newFormat = `${day} ${months[monthNo]}, ${year}`;

	return newFormat;
};
