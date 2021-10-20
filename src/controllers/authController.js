const router = require('express').Router();

const authService = require('../services/authService.js');
const { COOKIE_NAME } = require('../constants')

router.get('/register', (req, res) => {
    res.render('auth/register', { title: 'Register' });
});

router.post('/register', async(req, res, next) => {
    //TODO: adapt parameters to project requirements
    //TODO: extra validations
    const { name, username, password, repeatPassword } = req.body;
    // console.log(req.body);

    if (password !== repeatPassword) {
        res.locals.error = 'Passwords do not match!'
        return res.render('auth/register');
    };

    try {
        await authService.register({ name, username, password });
        // let createdUser = await authService.register({ name, username, password });
        // res.redirect('/auth/login');

        // TODO: to login if necessary

        let token = await authService.login({ username, password });
        res.cookie(COOKIE_NAME, token, { httpOnly: true });
        res.redirect('/');
    } catch (err) {
        // TODO: return error response
        next(err);
    }
});



router.get('/login', (req, res) => {
    res.render('auth/login', { title: 'Login' });
});

router.post('/login', async(req, res) => {
    const { username, password } = req.body;

    try {
        let token = await authService.login({ username, password });

        // console.log(`controller token: ${token}`);

        //TODO: set token in httpOnly cookie

        res.cookie(COOKIE_NAME, token, { httpOnly: true });

        res.redirect('/');
    } catch (arr) {
        // TODO: return error response
        console.log(err);
        res.end();
    }
});


router.get('/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME);

    res.redirect('/auth/login');
});


module.exports = router;