import axios from 'axios';

export const addUserToWritersCollection = async (user, url) => {
	try {
		await axios.post(url + `/writers/`, {
			email: user.userEmail,
			uid: user.uid,
			about_me: user.aboutMe,
		});
	} catch (error) {
		console.log(error);
	}
};

export const addUserToEditorsCollection = async (user, url) => {
	try {
		await axios.post(url + `/editors/`, {
			email: user.userEmail,
			uid: user.uid,
			about_me: user.aboutMe,
			area_of_expertise: user.areaOfExpertise,
			twitter_url: user.twitterUrl,
			linkedin_url: user.linkedInUrl,
			profile_img_url: user.profileImgUrl,
			first_name: user.firstName,
			last_name: user.lastName,
		});
	} catch (error) {
		console.log(error);
	}
};

export const checkCollection = async (user, collection, url) => {
	try {
		const res = await axios.get(url + `/${collection}/` + user.uid);
		const targetUser = await res.data.data;
		return targetUser;
	} catch (error) {
		console.log(error);
	}
};
