const Housing = require('../models/Housing.js'); // import model according to project requirements

exports.create = (data) => {
	Housing.create(data);
};

exports.getAll = () => {
	Housing.find().lean();
};

exports.getTopHouses = () => {
	Housing.find().sort({ createdAt: -1 }).limit(3).lean();
};

exports.getOne = (itemId) => {
	Housing.findById(itemId).populate('tenants');
};

exports.addTenant = (itemId, tenantId) => {
	// let housing = await housingService.getOne(req.params.housingId);

	// housing.tenants.push(req.user._id);

	// return housing.save();

	return Housing.findOneAndUpdate(
		{ _id: itemId },
		{
			$push: { tenants: tenantId },
			$inc: { availablePieces: -1 },
		},
		{ runValidators: true }
	);
};

exports.delete = (itemId) => {
	Housing.findByIdAndDelete(itemId);
};

exports.updateOne = (itemId, data) => {
	Housing.findByIdAndUpdate(itemId, data);
};

exports.search = (searchedText) => {
	Housing.find({ type: { $regex: searchedText, $options: 'i' } }).lean();
};
