// const Housing = require('../models/Housing');

// exports.create = async (data) => {
// 	try {
// 		return await Housing.create(data);
// 	} catch (error) {
// 		throw error;
// 	}
// };

// exports.getTopItems = async () => {
// 	try {
// 		return await Housing.find().sort({ createdAt: -1 }).limit(3).lean();
// 	} catch (error) {
// 		throw error;
// 	}
// };

// exports.getAllItems = async () => {
// 	try {
// 		return await Housing.find().lean();
// 	} catch (error) {
// 		throw error;
// 	}
// };

// exports.getOne = async (id) => {
// 	try {
// 		return await Housing.findById(id).populate('rentedHome');
// 	} catch (error) {
// 		throw error;
// 	}
// };

// exports.addTenant = async (housing, tenantId) => {
// 	try {
// 		housing.rentedHome.push(tenantId);
// 		housing.availablePieces = housing.availablePieces - 1;
// 		let updatedHousing = await housing.save();
// 		return updatedHousing;
// 	} catch (error) {
// 		throw error;
// 	}

// 	// return Housing.findOneAndUpdate(
// 	// 	{ _id: housingId },
// 	// 	{
// 	// 		$push: { rentedHome: tenantId },
// 	// 		$inc: { availablePieces: -1 },
// 	// 	},
// 	// 	{ runValidators: true }
// 	// );
// };

// exports.updateOne = async (houseId, houseData) => {
// 	try {
// 		return await Housing.findByIdAndUpdate(houseId, houseData);
// 	} catch (error) {
// 		throw error;
// 	}
// };

// exports.deleteOne = async (houseId) => {
// 	try {
// 		return await Housing.findByIdAndDelete(houseId);
// 	} catch (error) {
// 		throw error;
// 	}
// };

// exports.search = async (searchedText) => {
// 	try {
// 		return await Housing.find({ type: { $regex: searchedText, $options: 'i' } }).lean();
// 	} catch (error) {
// 		throw error;
// 	}
// };
