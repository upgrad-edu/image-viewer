import { getUserToken } from '../common/utils';
import axios from 'axios';


export const getUsrMedia = async () => {
	let token = getUserToken();
		if (getUserToken) {
			const mediaData = `https://api.instagram.com/v1/users/self/media/recent?access_token=${token}`;
			let { data: { data } } = await axios.get(mediaData);
			return data;
		}	
}

export const getUserProfile = async () => {
	let token = getUserToken();
		if (getUserToken) {
			const profileData = `https://api.instagram.com/v1/users/self?access_token=${token}`;
			let { data: { data } } = await axios.get(profileData);
		
			return data;
		}
	}
	
