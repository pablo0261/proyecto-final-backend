const postCategoriesService = require('../../services/categories/postCategorias.service');

const postCategories = async (req, res) => {
  try {
    const {
      description,
      isGenre,
      isEducation,
      isSkill,
      isService,
      includeCustomer,
      includeProvider,
    } = req.body;

    const categoryData = {
      isGenre,
      isEducation,
      isSkill,
      isService,
      includeCustomer,
      includeProvider,
    };

    if (!description) {
      res.status(400).json({ error: 'Faltan datos requeridos' });
      return;
    }

    const response = await postCategoriesService(description, categoryData);
    if (!response) {
      res.status(409).json({ error: 'Categoria ya creada' });
      return;
    }
    res.status(201).json(response);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

module.exports = postCategories;
