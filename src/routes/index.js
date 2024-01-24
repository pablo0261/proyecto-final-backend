const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { getPeopleController } = require("../controllers/people/getPeople.controller.js");


router.get("/people/:type", (req, res) => getPeopleController(req, res));

module.exports = router;