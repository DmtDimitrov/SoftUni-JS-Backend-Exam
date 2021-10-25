const mongoose = require('mongoose');

const { DB_URI } = require('../constants');

exports.databaseConfig = function () {
	return mongoose.connect(DB_URI);
};
