import axios from 'axios';

export const getAllEditors = async (url) => {
	try {
		const res = await axios.get(url + '/editors');
		const editorsData = await res.data.data;
		return editorsData;
	} catch (error) {
		console.log(error);
	}
};
