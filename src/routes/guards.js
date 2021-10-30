const postService = require('../services/postService.js');

exports.isOwner = async (req, res, next) => {
	let post = await postService.getOne(req.params.postId);

	if (post.author == req.user._id) {
		next();
	} else {
		res.redirect('/');
	}
};

exports.isNotOwner = async (req, res, next) => {
	let post = await postService.getOne(req.params.postId);

	if (post.author != req.user._id) {
		next();
	} else {
		res.redirect('/');
	}
};

exports.isGuest = async (req, res, next) => {
	if (!req.user) {
		next();
	} else {
		res.redirect('/');
	}
};

exports.isUser = async (req, res, next) => {
	if (req.user) {
		next();
	} else {
		res.redirect('/auth/login');
	}
};
