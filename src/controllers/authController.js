const router = require('express').Router();

const authService = require('../services/authService.js');
const { COOKIE_NAME } = require('../constants');
const { getErrorMessage } = require('../utils');

router.get('/register', (req, res) => {
	res.render('auth/register', { title: 'Register' });
});

router.post('/register', async (req, res, next) => {
	//TODO: adapt parameters to project requirements
	//TODO: extra validations
	const { name, username, password, repeatPassword } = req.body;
	// console.log(req.body);

	if (password !== repeatPassword) {
		res.locals.error = 'Passwords do not match!';
		return res.render('auth/register', { error: getErrorMessage(error) });
	}

	try {
		await authService.register({ name, username, password });

		// TODO: to login if necessary

		let token = await authService.login({ username, password });
		res.cookie(COOKIE_NAME, token, { httpOnly: true });
		res.redirect('/');
	} catch (error) {
		res.render('auth/register', { error: getErrorMessage(error) });
	}
});

router.get('/login', (req, res) => {
	res.render('auth/login', { title: 'Login' });
});

router.post('/login', async (req, res) => {
	const { username, password } = req.body;

	try {
		let token = await authService.login({ username, password });

		// console.log(`controller token: ${token}`);

		//TODO: set token in httpOnly cookie

		res.cookie(COOKIE_NAME, token, { httpOnly: true });

		res.redirect('/');
	} catch (error) {
		res.render('auth/login', { error: getErrorMessage(error) });
	}
});

router.get('/logout', (req, res) => {
	res.clearCookie(COOKIE_NAME);

	res.redirect('/auth/login');
});

module.exports = router;
