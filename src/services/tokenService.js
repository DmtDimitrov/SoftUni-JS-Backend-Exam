const jwt = require('../utils/jwt.js');
const { TOKEN_SECRET } = require('../constants');

exports.createToken = async (user, next) => {
	try {
		//TODO: adapt parameters to project requirements
		let payload = {
			_id: user._id,
			email: user.email,
		};

		let token = await jwt.sign(payload, TOKEN_SECRET);
		return token;
	} catch (error) {
		throw error;
	}
};
