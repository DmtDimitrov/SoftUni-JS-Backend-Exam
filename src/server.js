const express = require('express');

const { PORT } = require('./constants');
const expressConfig = require('./config/express.js');


const app = express();

expressConfig(app);


app.listen(PORT, () => console.log(`The app is running on http://localhost:${PORT}/...`));