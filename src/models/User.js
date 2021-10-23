const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = require('../constants');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required!'],
		validate: [/^[a-z]+\s[a-z ]+$/i, 'Name should contain First name and Last name!'],
	},
	username: {
		type: String,
		required: [true, 'Username is required!'],
		minlength: [5, 'Username should be more than 5 characters!'],
	},
	password: {
		type: String,
		required: [true, 'Password is required!'],
		minlength: [4, 'Password should be more than 5 characters!'],
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
