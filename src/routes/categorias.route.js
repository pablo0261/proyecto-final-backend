router.get('/categorias/id', getCategoriasByIdController)
router.get('/categorias', getCategoriasController)
router.post('/categorias', postCategoriasController)
router.delete('/categorias/:id', deleteCategoriasController)