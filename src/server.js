const express = require('express');

const { PORT } = require('./constants');
const routes = require('./routes');
const { expressConfig, handlebarsConfig } = require('./config/express.js');
const { databaseConfig } = require('./config/database.js');

const app = express();

handlebarsConfig(app);
expressConfig(app);
app.use(routes);

databaseConfig()
	.then(() => {
		console.log('Database connected');
		app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}/`));
	})
	.catch((err) => {
		console.log('Database is not connected:', err);
	});
