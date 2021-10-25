const housingService = require('../services/housingService.js');

exports.isOwner = async (req, res, next) => {
	let housing = await housingService.getOne(req.params.housingId);
	// TODO: adapt parameters to project requirements
	if (housing.owner == req.user._id) {
		next();
	} else {
		res.redirect('error');
	}
};

exports.isNotOwner = async (req, res, next) => {
	let housing = await housingService.getOne(req.params.housingId);
	// TODO: adapt parameters to project requirements
	if (housing.owner != req.user._id) {
		next();
	} else {
		res.redirect('error');
	}
};

exports.isGuest = async (req, res, next) => {
	if (!req.user) {
		next();
	} else {
		res.redirect('/error');
	}
};

exports.isUser = async (req, res, next) => {
	if (req.user) {
		next();
	} else {
		res.redirect('/error');
	}
};
