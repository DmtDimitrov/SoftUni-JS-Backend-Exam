const router = require('express').Router();

const housingService = require('../services/housingService.js');
const { getErrorMessage } = require('../utils');

router.get('/', async (req, res) => {
	try {
		let items = await housingService.getTopItems();
		//TODO: adapt parameters to project requirements
		res.render('home', { title: 'Home', items });
	} catch (error) {
		res.render('home', { error: getErrorMessage(error) });
	}
});

module.exports = router;
