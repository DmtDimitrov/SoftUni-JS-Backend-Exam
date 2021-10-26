const router = require('express').Router();

const authService = require('../services/authService.js');
const { COOKIE_NAME } = require('../constants');
const { getErrorMessage } = require('../utils');
const { isGuest, isUser } = require('../routes/guards.js');

router.get('/register', isGuest, (req, res) => {
	res.render('auth/register', { title: 'Register' });
});

router.post('/register', isGuest, async (req, res, next) => {
	//TODO: adapt parameters to project requirements
	//TODO: extra validations
	const { name, username, password, repeatPassword } = req.body;
	// console.log(req.body);

	try {
		if (password !== repeatPassword) {
			throw 'Passwords do not match!';
		}

		await authService.register({ name, username, password });

		// TODO: to login if necessary

		let token = await authService.login({ username, password });
		res.cookie(COOKIE_NAME, token, { httpOnly: true });
		res.redirect('/');
	} catch (error) {
		res.render('auth/register', { error: getErrorMessage(error) });
	}
});

router.get('/login', isGuest, (req, res) => {
	res.render('auth/login', { title: 'Login' });
});

router.post('/login', isGuest, async (req, res) => {
	const { username, password } = req.body;

	try {
		let token = await authService.login({ username, password });

		//TODO: set token in httpOnly cookie

		res.cookie(COOKIE_NAME, token, { httpOnly: true });

		res.redirect('/');
	} catch (error) {
		res.render('auth/login', { error: getErrorMessage(error) });
	}
});

router.get('/logout', isUser, (req, res) => {
	res.clearCookie(COOKIE_NAME);

	res.redirect('/auth/login');
});

// router.get('/:userId/profile', async (req, res) => {
// 	try {
// 		let user = await authService.getUser(req.params.userId);

// 		let enrolledCourses = user.getCourses();

// 		res.render('auth/profile', { title: 'My profile', enrolledCourses });
// 	} catch (error) {
// 		res.render('auth/profile', { error: getErrorMessage(error) });
// 	}
// });

module.exports = router;

module.exports = router;
