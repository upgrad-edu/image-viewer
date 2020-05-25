export const isUserLoggedIn = () => {
	return getUserToken() ? true : false
}

export const getUserToken = () => {
	return sessionStorage.getItem('access-token');
}
