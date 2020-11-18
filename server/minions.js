const express = require('express');
const apiRouter = express();
const minionRouter = express.Router();
const database = require('./db');

// Function create ID
const createID = () => {
    let minionIdCount = 1;
    minionIdCount++;
    return id = minionIdCount++;
};

// GET request all minions
minionRouter.get('/', (req, res, next) => {
    let allTheMinions = database.getAllFromDatabase('minions');
    console.log(allTheMinions);
    res.send(allTheMinions);
});

// POST request
minionRouter.post('/', (req, res, next) => {
    let id = createID();
    let name = req.body.name;
    let title = req.body.title;
    let salary = req.body.salary;
    let weaknesses = req.body.weaknesses;
    let newMinion = { id, name, title, salary, weaknesses };
    database.addToDatabase('minions', newMinion);
    res.send(newMinion);
});

// GET request single minion
minionRouter.get('/:id', (req, res, next) => {
    let id = req.params.id;
    let singleMinion = database.getFromDatabaseById('minions', id);
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
    let id = req.params.id;
    database.deleteFromDatabasebyId('minions', id);
    res.send();
});


module.exports = minionRouter;