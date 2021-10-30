const User = require('../models/User.js');
const { createToken } = require('./tokenService.js');

exports.register = async (userData) => {
	try {
		await User.create(userData);
	} catch (error) {
		throw error;
	}
};

exports.login = async (userData, next) => {
	let { email, password } = userData;

	try {
		let user = await User.findOne({ email });

		if (!user) {
			throw 'Invalid email or password';
		}

		let isValid = await user.validatePassword(password);

		if (!isValid) {
			throw 'Invalid email or password';
		}

		let token = await createToken(user);

		return token;
	} catch (error) {
		throw error;
	}
};
