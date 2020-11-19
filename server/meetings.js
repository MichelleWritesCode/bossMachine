const express = require('express');
const apiRouter = express();
const meetingRouter = express.Router();
const database = require('./db');

// GET request all ideas
meetingRouter.get('/', (req, res, next) => {
    let allTheMeetings = database.getAllFromDatabase('meetings');
    res.send(allTheMeetings);
});

// POST new meeting
meetingRouter.post('/', (req, res, next) => {
    let newMeeting = database.createMeeting();
    database.addToDatabase('meetings', newMeeting);
    res.status(201).send(newMeeting);
});

// DELETE all meetings
meetingRouter.delete('/', (req, res, next) => {
    database.deleteAllFromDatabase('meetings');
    res.status(204).send();
});


module.exports = meetingRouter;