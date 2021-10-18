const jwt = require('../utils/jwt.js');
const { COOKIE_NAME, TOKEN_SECRET } = require('../constants');

exports.authMiddleware = async function(req, res, next) {
    let token = req.cookies[COOKIE_NAME];

    if (token) {
        try {
            let decodedToken = await jwt.verify(token, TOKEN_SECRET);
            req.user = decodedToken;
            next();
        } catch (error) {
            console.log(error);
            res.clearCookie(COOKIE_NAME)
            res.status(401).render('error');
            // res.redirect('/auth/login');
        }
    } else {
        next();
    };
};

exports.isAuth = function(req, res, next) {
    if (req.user) {
        next()
    } else {
        res.redirect('/auth/login');
    }
}