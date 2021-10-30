const router = require('express').Router();

// const postService = require('../services/postService.js');
const { getErrorMessage } = require('../utils');

router.get('/', async (req, res) => {
	try {
		res.render('home');
	} catch (error) {
		res.render('home', { error: getErrorMessage(error) });
	}
});

module.exports = router;
