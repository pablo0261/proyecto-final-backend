const postCategoriesOptionsService = require('../../services/categories_options/postCategoriesOptions.service');

const postCategoriesOptionsController = async (req, res) => {
  try {
    const newOption = req.body;

    const { status, response } = await postCategoriesOptionsService(newOption);
    res.status(status).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = postCategoriesOptionsController;
