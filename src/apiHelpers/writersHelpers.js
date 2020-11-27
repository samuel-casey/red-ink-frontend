import axios from 'axios';

export const getAllWriters = async (url) => {
	try {
		const res = await axios.get(url + '/writers');
		const writers = res.data.data;
		return writers;
	} catch (error) {
		console.log(error);
	}
};

export const getSingleWriter = async (url, writerId) => {
	try {
		const res = await axios.get(url + '/writers/' + writerId);
		const writer = res.data.data[0];
		return writer;
	} catch (error) {
		console.log(error);
	}
};

export const sendWriterEmailNotification = async (
	writerId,
	title,
	link,
	url
) => {
	try {
		const res = await axios.put(url + '/writers/notify/' + writerId, {
			updatedTitle: title,
			updatedLink: link,
		});
		const updateMessage = res.data.data;
	} catch (error) {
		console.log(error);
	}
};
