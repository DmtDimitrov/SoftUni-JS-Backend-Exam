const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = require('../constants');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required!'],
	},
	username: {
		type: String,
		required: [true, 'Username is required!'],
	},
	password: {
		type: String,
		required: [true, 'Password is required!'],
	},
});

userSchema.pre('save', async function (next) {
	try {
		const hashedPassword = await bcrypt.hash(this.password, SALT_ROUNDS);
		this.password = hashedPassword;
		return next();
	} catch (error) {
		throw error;
	}
});

userSchema.method('validatePassword', function (password) {
	return bcrypt.compare(password, this.password);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
