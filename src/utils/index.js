exports.getErrorMessage = function (error) {
	let errorMsg = '';
	if (!error) {
		return 'Something went wrong';
	} else if (error.name === 'ValidationError') {
		Object.keys(error.errors).forEach((key) => {
			errorMsg = error.errors[key].message;
		});

		return errorMsg;
	} else {
		errorMsg = error;

		return errorMsg;
	}
};

exports.extractRequestData = function (req) {
	let { title, keyword, location, createdAt, image, description } = req.body;
	//TODO: adapt parameters to project requirements
	let data = {
		title,
		keyword,
		location,
		createdAt,
		image,
		description,
	};
	return data;
};
