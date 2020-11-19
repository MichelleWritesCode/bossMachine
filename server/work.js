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
        return res.status(404).send("Work not found");
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
    res.send(newWork);
});

workRouter.put('/:workId', (req, res, next) => {
    let workId = req.workId;
    let title = req.body.title;
    let description = req.body.description;
    let hours = Number(req.body.hours);
    let minionId = req.minionId;
    let updatedWork = { workId, title, description, hours, minionId };
    res.send(updatedWork);
});

workRouter.delete('/:workId', (req, res, next) => {
    let workId = req.workId;
    let minionId = req.minionId;
    let allWork = database.getAllFromDatabase('work');
    let workFromMinion = allWork.filter(workFromMinion => workFromMinion.minionId === minionId);
    let workToDelete = workFromMinion.filter(workToDelete => workToDelete.workId === workId);
    database.deleteFromDatabasebyId('work', workToDelete);
    res.send();
});

module.exports = workRouter;