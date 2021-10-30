const Post = require('../models/Post');
const User = require('../models/User');

exports.create = async (data, userId) => {
	try {
		await Post.create(data);
		// let post = await Post.find({ author: userId });
		// let postId = data._id;
		// console.log(post);
		// await User.findOneAndUpdate(
		// 	{ _id: userId },
		// 	{
		// 		$push: { myPosts: postId },
		// 	},
		// 	{ runValidators: true }
		// );
	} catch (error) {
		throw error;
	}
};

exports.getAll = async () => {
	try {
		return await Post.find().lean();
	} catch (error) {
		throw error;
	}
};

exports.getMyPosts = async (userId) => {
	try {
		let post = await Post.find({ author: userId });
		console.log(post);
	} catch (error) {
		throw error;
	}
};

exports.getOne = async (id) => {
	try {
		return await Post.findById(id).populate('votesOnPost');
	} catch (error) {
		throw error;
	}
};

exports.getAuthor = async (id) => {
	try {
		let author = await User.findById(id);
		let fullName = author.getFullName();
		return fullName;
	} catch (error) {
		throw error;
	}
};

exports.upVote = async (postId, userId) => {
	try {
		return Post.findOneAndUpdate(
			{ _id: postId },
			{
				$push: { votesOnPost: userId },
				$inc: { ratingOfPost: +1 },
			},
			{ runValidators: true }
		);
	} catch (error) {
		throw error;
	}
};

exports.downVote = async (postId, userId) => {
	try {
		return Post.findOneAndUpdate(
			{ _id: postId },
			{
				$push: { votesOnPost: userId },
				$inc: { ratingOfPost: -1 },
			},
			{ runValidators: true }
		);
	} catch (error) {
		throw error;
	}
};

exports.updateOne = async (postId, data) => {
	try {
		return await Post.findByIdAndUpdate(postId, data);
	} catch (error) {
		throw error;
	}
};

exports.deleteOne = async (postId) => {
	try {
		return await Post.findByIdAndDelete(postId);
	} catch (error) {
		throw error;
	}
};
