const express = require('express');
const apiRouter = express();
const minionRouter = express.Router();
const database = require('./db');


// Param minionId function
minionRouter.param('minionId', (req, res, next, id) => {
    let minionId = id;
    let allTheMinions = database.getAllFromDatabase('minions');
    let specificMinion = allTheMinions.some(minion => minion.id === minionId);

    if (specificMinion === true) {
        req.minionId = minionId;
        next();
    } else {
        return res.status(404).send("Minion not found!");
    }
});

const workRouter = require('./work');
minionRouter.use('/:minionId/work', workRouter);

// Function create ID
const createID = () => {
    let minionIdCount = 1;
    minionIdCount++;
    return minionId = minionIdCount++;
};

// GET request all minions
minionRouter.get('/', (req, res, next) => {
    let allTheMinions = database.getAllFromDatabase('minions');
    res.send(allTheMinions);
});

// POST request
minionRouter.post('/', (req, res, next) => {
    let minionId = createID();
    let name = req.body.name;
    let title = req.body.title;
    let salary = req.body.salary;
    let weaknesses = req.body.weaknesses;
    let newMinion = { minionId, name, title, salary, weaknesses };
    database.addToDatabase('minions', newMinion);
    res.send(newMinion);
});

// GET request single minion
minionRouter.get('/:id', (req, res, next) => {
    let minionId = req.params.id;
    let singleMinion = database.getFromDatabaseById('minions', minionId);
    res.send(singleMinion);
});

// PUT request update single minion
minionRouter.put('/:id', (req, res, next) => {
    let minionId = req.params.id;
    let allTheMinions = database.getAllFromDatabase('minions');
    const findId = allTheMinions.some(minion => minion.id === minionId);

    if (findId === true) {
        let id = minionId;
        let name = req.body.name;
        let title = req.body.title;
        let salary = req.body.salary;
        let weaknesses = req.body.weaknesses;
        let updatedMinion = { id, name, title, salary, weaknesses };
        database.updateInstanceInDatabase('minions', updatedMinion);
        res.send(updatedMinion);
    } else {
        res.status(404).send("Minion is not found!");
    }
});

// DELETE request
minionRouter.delete('/:id', (req, res, next) => {
    let minionId = req.params.id;
    let allTheMinions = database.getAllFromDatabase('minions');
    let findMinionToDelete = allTheMinions.some(minion => minion.id === minionId);

    if (findMinionToDelete === true) {
        database.deleteFromDatabasebyId('minions', minionId);
        res.send();
    } else {
        res.status(404).send('Minion not found!');
    }
});


module.exports = minionRouter;