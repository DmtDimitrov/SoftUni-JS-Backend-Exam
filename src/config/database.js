const mongoose = require('mongoose');

const { DB_URI } = require('../constants');

// async function databaseConfig() {
//     await mongoose.connect(DB_URI);
//     console.log('Database connected');
// };

exports.databaseConfig = function () {
	return mongoose.connect(DB_URI);
};

// module.exports = databaseConfig;
