const express = require('express');
const app = express();
const apiRouter = express.Router();
const database = require('./db');
const minionRouter = require('./minions');

// Function create ID
const createID = () => {
  let minionIdCount = 1;
  minionIdCount++;
  return id = minionIdCount++;
};

// GET request all minions
apiRouter.get('/minions', (req, res, next) => {
    let allTheMinions = database.getAllFromDatabase("minions");
    console.log(allTheMinions);
    res.send(allTheMinions);
    next();
});

// POST request
apiRouter.post('/minions', (req, res, next) => {
    let id = createID();
    let name = req.body.name;
    let title = req.body.title;
    let salary = req.body.salary;
    let weaknesses = req.body.weaknesses;
    let newMinion = { id, name, title, salary, weaknesses };
    database.addToDatabase("minions", newMinion);
    res.send(newMinion);
    next();
});

// GET request single minion
apiRouter.get('/minions/:id', (req, res, next) => {
    let id = req.params.id;
    let singleMinion = database.getFromDatabaseById('minions', id);
    res.send(singleMinion);
    next();
});

// PUT request update single minion
apiRouter.put('/minions/:id', (req, res, next) => {
    let minionId = req.params.id;
    let allTheMinions = database.getAllFromDatabase("minions");
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
        next();
    } else {
        res.status(404).send("Minion is not found!");
    }
});

// DELETE request
apiRouter.delete('/minions/:id', (req, res, next) => {
    let id = req.params.id;
    database.deleteFromDatabasebyId("minions", id);
    res.send();
});

module.exports = apiRouter;