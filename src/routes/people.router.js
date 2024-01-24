const { Router } = require('express');

// controllers
const { getPeopleController } = require("../controllers/people/getPeople.controller.js");
const { getPeopleByIdController } = require('../controllers/people/getPeopleById.controller.js');
const { getPeopleFilterController } = require('../controllers/people/getPeopleFilter.controller.js');
const { postPeopleController } = require('../controllers/people/postPeople.controller.js');

const peopleRouter = Router();

peopleRouter.get('/people/type', getPeopleFilterController)
peopleRouter.get('/people/:id', getPeopleByIdController)
peopleRouter.get('/people', getPeopleController)
peopleRouter.post('/people', postPeopleController)

module.exports = peopleRouter;
