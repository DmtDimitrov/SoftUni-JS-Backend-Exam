const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware.js');
const housingService = require('../services/housingService.js');
const { getErrorMessage } = require('../utils');
const { isGuest, isUser, isNotOwner, isOwner } = require('../routes/guards.js');

router.get('/', async (req, res) => {
	try {
		let housings = await housingService.getAll();

		res.render('housing', { title: 'Home', housings });
	} catch (error) {
		res.render('housing', { error: getErrorMessage(error) });
	}
});

router.get('/create', isUser, (req, res) => {
	res.render('housing/create', { title: 'Create Housing' });
});

router.post('/create', isUser, async (req, res) => {
	try {
		let data = extractRequestData(req);
		await housingService.create({ data, owner: req.user._id });

		res.redirect('/housing');
	} catch (error) {
		res.render('housing/create', { error: getErrorMessage(error) });
	}
});

router.get('/:housingId/details', async (req, res) => {
	try {
		let housing = await housingService.getOne(req.params.housingId);

		let tenants = housing.getTenants();

		let housingData = await housing.toObject(); // може да се ползва за инстанциите, вместо да се ползва lean() в query mongoose

		let isOwner = housingData.owner == req.user?._id;

		let isAvailable = housing.availablePieces > 0;

		let isRentedByYou = housing.tenants.some((x) => x._id == req.user?._id);

		res.render('housing/details', {
			title: 'Home',
			...housingData,
			isOwner,
			tenants,
			isAvailable,
			isRentedByYou,
		});
	} catch (error) {
		res.render('housing/details', { error: getErrorMessage(error) });
	}
});

router.get('/:housingId/rent', isNotOwner, async (req, res) => {
	try {
		let housingId = req.params.housingId;
		let tenantsId = req.user?._id;
		let housing = await housingService.getOne(housingId);

		await housingService.addTenant(housing, tenantsId);

		res.redirect(`/housing/${req.params.housingId}/details`);
	} catch (error) {
		res.render(`housing/${req.params.housingId}/details`, { error: getErrorMessage(error) });
	}
});

router.get('/:housingId/edit', isOwner, async (req, res) => {
	try {
		let housingId = req.params.housingId;
		let housing = await housingService.getOne(housingId);
		let housingData = housing.toObject();

		res.render(`housing/edit`, { title: 'Home', ...housingData });
	} catch (error) {
		res.render(`housing/${housingId}/edit`, { error: getErrorMessage(error) });
	}
});

router.post('/:housingId/edit', isOwner, async (req, res) => {
	try {
		let housingId = req.params.housingId;

		let data = extractRequestData(req);

		await housingService.updateOne(housingId, data);

		res.redirect(`/housing/${housingId}/details`);
	} catch (error) {
		res.render(`housing/${housingId}/edit`, { error: getErrorMessage(error) });
	}
});

router.get('/:housingId/delete', isOwner, async (req, res) => {
	try {
		let housingId = req.params.housingId;
		await housingService.deleteOne(housingId);

		res.redirect('/housing');
	} catch (error) {
		res.render(`housing/${housingId}/details`, { error: getErrorMessage(error) });
	}
});

router.get('/search', async (req, res) => {
	try {
		let searchedText = req.query.searching;

		let searchedHousing = await housingService.search(searchedText);

		res.render('housing/search', { title: 'Search', searchedHousing });
	} catch (error) {
		res.render(`housing/search`, { error: getErrorMessage(error) });
	}
});

module.exports = router;
