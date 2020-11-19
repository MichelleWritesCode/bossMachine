const express = require('express');
const workRouter = express.Router();
const database = require('./db');

// Function Create work ID
let createWorkId = () => {
    let workId = 1;
    workId++;
    return workId = workId++;
}

workRouter.param('workId', (req, res, next, id) => {
    let workId = id;
    let allTheWork = database.getAllFromDatabase('work');
    let specificWork = allTheWork.some(work => work.id === workId);

    if (specificWork === true) {
        req.workId = workId;
        req.specificWork = specificWork;
        next();
    } else {
        return res.status(400).send("Work not found");
    }
});

workRouter.get('/', (req, res, next) => {
    let minionId = req.minionId;
    let allWork = database.getAllFromDatabase('work');
    let workFromMinion = allWork.filter(workFromMinion => workFromMinion.minionId === minionId);
    res.send(workFromMinion);
});

workRouter.post('/', (req, res, next) => {
    let id = createWorkId();
    let title = req.body.title;
    let description = req.body.description;
    let hours = Number(req.body.hours);
    let minionId = req.body.minionId;
    let newWork = { id, title, description, hours, minionId };
    database.addToDatabase('work', newWork);
    res.status(201).send(newWork);
});

workRouter.put('/:workId', (req, res, next) => {
    let id = req.workId;
    let title = req.body.title;
    let description = req.body.description;
    let hours = Number(req.body.hours);
    let minionId = req.minionId;
    let allWork = database.getAllFromDatabase('work');

    let workId = allWork.find(work => work.id === id && work.minionId === minionId);
    
    if (workId) {
        let updatedWork = { id, title, description, hours, minionId };
        database.updateInstanceInDatabase('work', updatedWork);
        return res.send(updatedWork);
    } else {
        res.status(400).send("The specific minion doesn't do this work!");
    }
});

workRouter.delete('/:workId', (req, res, next) => {
    let id = req.workId;
    let minionId = req.minionId;
    let allWork = database.getAllFromDatabase('work');
    let allWorkFromSpecificMinion = allWork.filter(allWorkFromSpecificMinion => allWorkFromSpecificMinion.minionId === minionId);
    let specificWorkFromMinion = allWorkFromSpecificMinion.filter(specificWorkFromMinion => specificWorkFromMinion.id === id);

    let workId = specificWorkFromMinion.find(work => work.id === id);
    let idOfMinion = allWorkFromSpecificMinion.find(minion => minion.minionId === minionId);
    
    if (workId.id && idOfMinion.minionId) {
        database.deleteFromDatabasebyId('work', workId.id);
        return res.status(204).send();
    } else {
        res.status(400).send("Can't find work from specific minion!");
    }    
});

module.exports = workRouter;