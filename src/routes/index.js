const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const categoriesRouter = require('./categoriesRouter.js');
const peopleRouter=require('./people.router.js')

router.use(categoriesRouter)
router.use(peopleRouter)

module.exports = router;