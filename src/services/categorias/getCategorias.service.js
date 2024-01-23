const {Categorias}=require('../../db')

const getCategorias = async () => {
    try {
        const categorias = await Categorias.findAll()
        return categorias

    } catch (error) {
        return ({ error: error.message })
    }

}

module.exports = { getCategorias }