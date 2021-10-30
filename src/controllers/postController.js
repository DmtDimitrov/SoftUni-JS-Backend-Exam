const router = require('express').Router();

const postService = require('../services/postService.js');
const { getErrorMessage, extractRequestData } = require('../utils');
const { isGuest, isUser, isNotOwner, isOwner } = require('../routes/guards.js');

router.get('/all', async (req, res) => {
	try {
		let posts = await postService.getAll();

		res.render('post/all', { posts });
	} catch (error) {
		res.render('post/all', { error: getErrorMessage(error) });
	}
});

router.get('/create', isUser, (req, res) => {
	res.render('post/create');
});

router.post('/create', isUser, async (req, res) => {
	try {
		let data = extractRequestData(req);

		let userId = req.user._id;

		await postService.create({ ...data, author: req.user._id }, userId);

		res.redirect('/post/all');
	} catch (error) {
		res.render('post/create', { error: getErrorMessage(error) });
	}
});

router.get('/:postId/details', async (req, res) => {
	try {
		let post = await postService.getOne(req.params.postId);

		let voters = post.getVoters();

		let postData = await post.toObject();

		let isAuthor = postData.author == req.user?._id;

		let fullName = await postService.getAuthor(postData.author);

		let isVotedByYou = post.votesOnPost.some((x) => x._id == req.user?._id);

		res.render('post/details', {
			...postData,
			isAuthor,
			fullName,
			voters,
			isVotedByYou,
		});
	} catch (error) {
		res.render('post/details', { error: getErrorMessage(error) });
	}
});

router.get('/:postId/upvote', isNotOwner, isUser, async (req, res) => {
	try {
		let postId = req.params.postId;

		let userId = req.user?._id;

		await postService.upVote(postId, userId);

		res.redirect(`/post/${postId}/details`);
	} catch (error) {
		res.render(`post/details`, { error: getErrorMessage(error) });
	}
});

router.get('/:postId/downvote', isNotOwner, isUser, async (req, res) => {
	try {
		let postId = req.params.postId;

		let userId = req.user?._id;

		await postService.downVote(postId, userId);

		res.redirect(`/post/${postId}/details`);
	} catch (error) {
		res.render(`post/details`, { error: getErrorMessage(error) });
	}
});

router.get('/:postId/edit', isOwner, async (req, res) => {
	try {
		let postId = req.params.postId;

		let post = await postService.getOne(postId);

		let data = post.toObject();

		res.render(`post/edit`, { ...data });
	} catch (error) {
		res.render(`post/edit`, { error: getErrorMessage(error) });
	}
});

router.post('/:postId/edit', isOwner, async (req, res) => {
	try {
		let postId = req.params.postId;

		let data = extractRequestData(req);

		await postService.updateOne(postId, data);

		res.redirect(`/post/${postId}/details`);
	} catch (error) {
		res.render(`post/edit`, { error: getErrorMessage(error) });
	}
});

router.get('/:postId/delete', isOwner, async (req, res) => {
	try {
		let postId = req.params.postId;
		await postService.deleteOne(postId);

		res.redirect('/post/all');
	} catch (error) {
		res.render(`post/details`, { error: getErrorMessage(error) });
	}
});

router.get('/my', async (req, res) => {
	try {
		let userId = req.user?._id;

		let posts = await postService.getMyPosts(userId);
		console.log(posts);

		let data = posts.toObject();

		res.render('post/my', { ...data });
	} catch (error) {
		res.render('post/my', { error: getErrorMessage(error) });
	}
});

module.exports = router;
