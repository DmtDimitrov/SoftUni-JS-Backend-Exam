const User = require('../models/User.js');
const { createToken } = require('./tokenService.js');

exports.register = async (userData) => {
	//TODO: adapt parameters to project requirements
	try {
		await User.create(userData);
	} catch (error) {
		throw error;
	}
};

exports.login = async (userData, next) => {
	//TODO: adapt parameters to project requirements
	//TODO: extra validations?
	let { username, password } = userData;

	try {
		let user = await User.findOne({ username });

		if (!user) {
			throw new Error('Invalid username or password');
		}

		let isValid = await user.validatePassword(password);

		if (!isValid) {
			throw new Error('Invalid username or password');
		}

		//TODO: create token
		let token = await createToken(user);

		return token;
	} catch (error) {
		throw error;
	}
};
