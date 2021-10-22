exports.errorHandler = function (err, req, res, next) {
	err.message = err.message || 'Something went wrong';
	err.status = err.status || 500;

	console.log(err);

	res.status(err.status).render('error', { err });
};

// exports.errorHandler = function(error, req, res, next) {
//     if (error) {
//         res.locals.errors = [error];
//         res.render('error');
//     }

// };
