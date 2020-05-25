export const updateFavoriteItem = (items, id) => {
	let resultArray = items.map((item) => {
		let modifiedItem = item;

		if (!modifiedItem.hasOwnProperty('isFavorite')) {
			modifiedItem.isFavorite = false;
		}

		if (modifiedItem.id === id) {
			modifiedItem.isFavorite = !modifiedItem.isFavorite;
			modifiedItem.isFavorite ? ++modifiedItem.likes.count : --modifiedItem.likes.count;
		}
		return modifiedItem;
	});
	return resultArray;
}


export const pushComments = (items, id, comment) => {

	let resultArray = items.map((item) => {
		let modifiedItem = item;
		let comments = { ...item.comments };
		if (modifiedItem.id === id) {
			comments.values = comments.values || [];
			comments.values.push(comment);
			modifiedItem.comments = comments;
		}
		return modifiedItem;
	});
	return resultArray;
}
