const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { getPeopleController } = require("../controllers/people/getPeople.controller.js");
const { getPeopleByIdController } = require('../controllers/people/getPeopleById.controller.js');
const { getPeopleFilterService } = require('../services/people/getPeopleFilter.service.js');
const { postPeopleController } = require('../controllers/people/postPeople.controller.js');

const categoriesRouter = require('./categoriesRouter.js');
// router.get("/people/:type", (req, res) => getPeopleController(req, res));

router.get('/people/type', getPeopleByTypeController)
router.get('/people/:id', getPeopleByIdController)
router.get('/people', getPeopleController)



module.exports = router;