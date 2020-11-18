const express = require('express');
const app = express();
const apiRouter = express.Router();
const database = require('./db');

const minionRouter = require('./minions');
apiRouter.use('/minions', minionRouter);

const ideaRouter = require('./ideas');
apiRouter.use('/ideas', ideaRouter);

const meetingRouter = require('./meetings');
apiRouter.use('/meetings', meetingRouter);



module.exports = apiRouter;