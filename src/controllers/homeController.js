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

// router.get('/', async (req, res) => {
// 	try {
// 		if (!req.user?._id) {
// 			console.log(req.user);
// 			let plays = await theaterService.getTop();
// 			console.log('guest plays');
// 			console.log(plays);
// 			// TODO: adapt parameters to project requirements
// 			res.render('home', { plays });
// 		} else {
// 			let plays = await theaterService.getAll();
// 			// TODO: adapt parameters to project requirements
// 			res.render('home', { title: 'Home', plays });
// 		}
// 	} catch (error) {
// 		res.render('home', { error: getErrorMessage(error) });
// 	}
// });

// router.get('/sortLikes', async (req, res) => {
// 	try {
// 		let plays = await theaterService.getAllByLikes();
// 		console.log('sort plays');
// 		console.log(plays);
// 		// TODO: adapt parameters to project requirements
// 		res.render('home', { plays });
// 	} catch (error) {
// 		res.render(`home`, { error: getErrorMessage(error) });
// 	}
// });

// router.get('/sortDates', async (req, res) => {
// 	try {
// 		let plays = await theaterService.getAllByDate();
// 		console.log('sort plays');
// 		console.log(plays);
// 		// TODO: adapt parameters to project requirements
// 		res.render('home', { plays });
// 	} catch (error) {
// 		res.render(`home`, { error: getErrorMessage(error) });
// 	}
// });

module.exports = router;
