const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Name is required!'],
		},
		type: {
			type: String,
			required: true,
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
		accessories: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Accessory',
			},
		],
		creator: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
		isSomething: {
			type: Boolean,
			default: false,
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

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
