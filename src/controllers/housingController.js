const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware.js');
const housingService = require('../services/housingService.js');
const { getErrorMessage } = require('../utils');

router.get('/', async (req, res) => {
	let housings = await housingService.getAll();

	res.render('housing', { housings });
});

router.get('/create', isAuth, (req, res) => {
	res.render('housing/create');
});

router.post('/create', isAuth, async (req, res) => {
	try {
		await housingService.create({ ...req.body, owner: req.user._id });

		res.redirect('/housing');
	} catch (error) {
		// console.log(error);
		// res.locals.error = error.message;
		res.render('housing/create', { error: getErrorMessage(error) });
	}
});

router.get('/:housingId/details', async (req, res) => {
	let housing = await housingService.getOne(req.params.housingId);

	let tenants = housing.getTenants();

	let housingData = await housing.toObject(); // може да се ползва за инстанциите, вместо да се ползва lean() в query mongoose

	let isOwner = housingData.owner == req.user?._id;

	let isAvailable = housing.availablePieces > 0;

	let isRentedByYou = housing.tenants.some((x) => x._id == req.user?._id);

	res.render('housing/details', {
		...housingData,
		isOwner,
		tenants,
		isAvailable,
		isRentedByYou,
	});
});

async function isOwner(req, res, next) {
	let housing = await housingService.getOne(req.params.housingId);

	if (housing.owner == req.user._id) {
		res.redirect('404');
	} else {
		next();
	}
}

async function isNotOwner(req, res, next) {
	let housing = await housingService.getOne(req.params.housingId);

	if (housing.owner != req.user._id) {
		next();
	} else {
		res.redirect('404');
	}
}

router.get('/:housingId/rent', isOwner, async (req, res) => {
	let housingId = req.params.housingId;
	tenantId = req.user?._id;

	await housingService.addTenant(housingId, tenantId);

	res.redirect(`/housing/${housingId}/details`);
});

router.get('/:housingId/delete', isNotOwner, async (req, res) => {
	await housingService.delete(req.params.housingId);

	res.redirect('/housing');
});

router.get('/:housingId/edit', isNotOwner, async (req, res) => {
	let housing = await housingService.getOne(req.params.housingId);

	res.render('housing/edit', { ...housing.toObject() });
});

router.post('/:housingId/edit', isNotOwner, async (req, res) => {
	try {
		await housingService.updateOne(req.params.housingId, req.body);

		res.redirect(`/housing/${req.params.housingId}/details`);
	} catch (error) {
		res.send(error);

		res.end();
	}
});

module.exports = router;
