const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');

const { authMiddleware } = require('../middlewares/authMiddleware.js');

exports.handlebarsConfig = function (app) {
	app.engine(
		'hbs',
		handlebars({
			extname: 'hbs',
		})
	);
	app.set('views', path.resolve(__dirname, '../views'));
	app.set('view engine', 'hbs');
};

exports.expressConfig = function (app) {
	app.use('/static', express.static(path.resolve(__dirname, '../public')));
	app.use(express.urlencoded({ extended: true }));
	app.use(cookieParser());
	app.use(authMiddleware);
};
