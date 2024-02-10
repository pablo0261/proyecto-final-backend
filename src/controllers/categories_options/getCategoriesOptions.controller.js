const getCategoriesOption = require("../../services/categories_options/getCategoriesOption.service");

const getCategoriesOptions = async (req, res) => {
  try {
    const { description, idCategorie } = req.body;

    if (description || idCategorie) {
      const { status, response } = await getCategoriesOption({ description, idCategorie });
      return res.status(status).json(response);
    }

    const { status, response } = await getCategoriesOption();
    res.status(status).json(response);

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = getCategoriesOptions;
