const express = require('express');
const app = express();
const apiRouter = express.Router();
const minionRouter = require('./minions');

app.use('/minions', minionRouter);


module.exports = apiRouter;