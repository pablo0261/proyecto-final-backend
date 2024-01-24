const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { getPeopleController } = require("../controllers/people/getPeople.controller.js");


// router.get("/people/:type", (req, res) => getPeopleController(req, res));

router.get('/people/type', getPeopleByTypeController)
router.get('/people/:id', getPeopleByIdController)
router.get('/people', getPeopleController)
router.post('/people', postPeopleController)



module.exports = router;