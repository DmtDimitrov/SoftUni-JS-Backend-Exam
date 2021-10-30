const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Title is required!'],
		minlength: [6, 'Title should be at least 6 characters long'],
	},
	keyword: {
		type: String,
		required: [true, 'Keyword is required!'],
		minlength: [6, 'Keyword should be at least 6 characters long'],
	},
	location: {
		type: String,
		required: [true, 'Location is required!'],
		maxlength: [10, 'Location should be maximum 10 characters long'],
	},
	createdAt: {
		type: String,
		required: [true, 'Date is required!'],
		maxlength: [10, 'Date should be 10 characters long'],
		minlength: [10, 'Date should be 10 characters long'],
	},
	image: {
		type: String,
		required: [true, 'Image is required!'],
		validate: [/^https?:\/\//i, 'Image should starts with http or https!'],
	},
	description: {
		type: String,
		required: [true, 'Description is required!'],
		minlength: [8, 'Description should be at least 8 characters long'],
	},
	author: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
	},
	votesOnPost: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'User',
		},
	],
	ratingOfPost: {
		type: Number,
		default: 0,
	},
});

postSchema.method('getVoters', function () {
	return this.votesOnPost.map((x) => x.email).join(', ');
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
