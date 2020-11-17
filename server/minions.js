const express = require('express');
const minionRouter = express.Router();
const database = require('./db');

/*
// GET request (not finished)
minionRouter.get('/api/minions', (req, res, next) => {
    res.send(minions);
});
*/

// POST request
minionRouter.post('/api/minions', (req, res, next) => {
    createMinion();
    res.send(req.body);
    next();
});


module.exports = minionRouter;