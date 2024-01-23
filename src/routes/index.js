const { Router } = require("express");

// Importar todos los routers;
const categoriesRouter = require("./categorias.route");
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

router.use("/categories", categoriesRouter);

module.exports = router;
