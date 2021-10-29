const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = require('../constants');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Email is required!'],
		validate: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i, 'Email should be valid and consist english letters and digits!'],
	},
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
	bookedHotels: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Hotel',
		},
	],
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

// userSchema.method('getCourses', function () {
//     return this.enrolledCourses.map((x) => x.title).join(', ');
// });

const User = mongoose.model('User', userSchema);

module.exports = User;
