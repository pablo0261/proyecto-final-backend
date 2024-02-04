const postCategoriasOptionsService = require('../../services/categories_options/postCategoriesOptions.service');

const postCategoriasOptions = async (req, res) => {
    try {
        const {
            idOption,
            idCategorie,
            description,
        } = req.body;

        const categoriesData = {
            idOption,
            idCategorie,
            description,
        };

        const createdOption = await postCategoriasOptionsService(categoriesData);

        res.status(201).json(createdOption);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = postCategoriasOptions;