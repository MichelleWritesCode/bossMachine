const express = require('express');
const apiRouter = express();
const ideaRouter = express.Router();
const database = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

// Function Create ID
let createIdeaId = () => {
    let ideaId = 1;
    ideaId++;
    return id = ideaId++;
}

// GET request all ideas
ideaRouter.get('/', (req, res, next) => {
    let allTheIdeas = database.getAllFromDatabase('ideas');
    res.send(allTheIdeas);
});

// POST request create idea
ideaRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    let id = createIdeaId();
    let name = req.body.name;
    let description = req.body.description;
    let numWeeks = req.body.numWeeks;
    let weeklyRevenue = req.body.weeklyRevenue;
    let newIdea = { id, name, description, numWeeks, weeklyRevenue };
    database.addToDatabase('ideas', newIdea);
    res.status(201).send(newIdea);
});

// GET request single idea
ideaRouter.get('/:id', (req, res, next) => {
    let ideaId = req.params.id;
    let ideaById = database.getFromDatabaseById('ideas', ideaId);

    if (!ideaById) {
        res.status(404).send("Idea not found!");
    } else {
        res.status(200).send(ideaById);
    }
});

// PUT request new idea
ideaRouter.put('/:id', checkMillionDollarIdea, (req, res, next) => {
    let ideaId = req.params.id;
    let allTheIdeas = database.getAllFromDatabase('ideas');
    let findIdeaById = allTheIdeas.some(idea => idea.id === ideaId);
    
    if (findIdeaById) {
        let id = ideaId;
        let name = req.body.name;
        let description = req.body.description;
        let numWeeks = req.body.numWeeks;
        let weeklyRevenue = req.body.weeklyRevenue;
        let updatedIdea = { id, name, description, numWeeks, weeklyRevenue };
        database.updateInstanceInDatabase('ideas', updatedIdea);
        res.send(updatedIdea);
    } else {
        res.status(404).send("Idea not found!");
    }
});

// DELETE an idea
ideaRouter.delete('/:id', (req, res, next) => {
    let ideaID = req.params.id;
    let allTheIdeas = database.getAllFromDatabase('ideas');
    let findIdeaToDelete = allTheIdeas.some(idea => idea.id === ideaID);

    if (findIdeaToDelete === true) {
        database.deleteFromDatabasebyId('ideas', ideaID);
        res.status(204).send();
    } else {
        res.status(404).send("Idea not found!");
    }
});

module.exports = ideaRouter;