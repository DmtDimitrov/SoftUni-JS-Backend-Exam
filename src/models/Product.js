const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Name is required!'],
			minlength: [4, 'Name should be at least 4 characters'],
		},
		year: {
			type: Number,
			required: [true, 'Year is required!'],
		},
		description: {
			type: String,
			required: [true, 'Description is required!'],
			minlength: [20, 'Description should be at least 20 characters'],
			validate: [/^[a-zA-Z0-9\s]+$/, 'Description should have english letters and digits'],
		},
		imageUrl: {
			type: String,
			required: [true, 'Image url is required!'],
			validate: [/^https?:\/\//i, 'Image url should starts with http or https!'],
		},
		difficultyLevel: {
			type: Number,
			required: true,
			min: [1, 'DifficultyLevel should be between 1 and 6!'],
			max: [6, 'DifficultyLevel should be between 1 and 6!'],
		},
		createdAt: {
			type: Date,
			required: true,
			default: new Date(),
		},
		isPublic: {
			type: Boolean,
			default: false,
		},
		accessories: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Accessory',
			},
		],
		owner: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
		owner: {
			type: String,
			required: [true, 'Owner is required!'],
		},
	}
	// {
	// 	timestamps: true,
	// }
);

// courseSchema.pre('validate', function (next) {
// 	try {
// 		this.createdAt = new Date();
// 		next();
// 	} catch (error) {
// 		throw error;
// 	}
// });

// courseSchema.pre('save', async function (next) {
// 	try {
// 		this.isPublic = Boolean(this.isPublic);
// 		return next();
// 	} catch (error) {
// 		throw error;
// 	}
// });

// housingSchema.method('getTenants', function () {
// 	return this.rentedHome.map((x) => x.name).join(', ');
// });

// hotelSchema.method('getBookings', function () {
// 	return this.usersBookedRooms.includes((x) => x.username);
// });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
