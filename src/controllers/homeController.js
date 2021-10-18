const router = require('express').Router();

router.get('/', (req, res) => {
    console.log(`homeController log`);
    console.log(req.user);

    res.render('home', { title: 'Home' });
});

module.exports = router;