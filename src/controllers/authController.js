const router = require('express').Router();

const authService = require('../services/authService.js');
const { COOKIE_NAME } = require('../constants');
const { getErrorMessage } = require('../utils');
const { isGuest, isUser } = require('../routes/guards.js');

router.get('/register', isGuest, (req, res) => {
	res.render('auth/register');
});

router.post('/register', isGuest, async (req, res, next) => {
	const { firstName, lastName, email, password, repeatPassword } = req.body;
	console.log(req.body);

	try {
		if (password !== repeatPassword) {
			throw 'Passwords do not match!';
		}

		await authService.register({ firstName, lastName, email, password });

		let token = await authService.login({ email, password });
		res.cookie(COOKIE_NAME, token, { httpOnly: true });
		res.redirect('/');
	} catch (error) {
		res.render('auth/register', { error: getErrorMessage(error) });
	}
});

router.get('/login', isGuest, (req, res) => {
	res.render('auth/login');
});

router.post('/login', isGuest, async (req, res) => {
	const { email, password } = req.body;

	try {
		let token = await authService.login({ email, password });

		res.cookie(COOKIE_NAME, token, { httpOnly: true });

		res.redirect('/');
	} catch (error) {
		res.render('auth/login', { error: getErrorMessage(error) });
	}
});

router.get('/logout', isUser, (req, res) => {
	res.clearCookie(COOKIE_NAME);

	res.redirect('/');
});

module.exports = router;
