const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { getPeopleController } = require("../controllers/people/getPeople.controller.js");
const { getPeopleByIdController } = require('../controllers/people/getPeopleById.controller.js');
const { getPeopleFilterService } = require('../services/people/getPeopleFilter.service.js');
const { postPeopleController } = require('../controllers/people/postPeople.controller.js');


// router.get("/people/:type", (req, res) => getPeopleController(req, res));

//People
router.get('/people/filter', getPeopleFilterService)
router.get('/people/:id', getPeopleByIdController)
router.get('/people', getPeopleController)
router.post('/people', postPeopleController)


module.exports = router;