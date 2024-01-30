const getCategoriesOption = require("../../services/categories/categories_options/getCategoriesOption.service");

const getCategoriesOptions = async (req, res) => {
  try {
    const optionsData = await getCategoriesOption();

    if (!optionsData) {
      res.status(404).json({ error: "No hay datos en categories_options" });
      return;
    }

    res.status(200).json(optionsData);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = getCategoriesOptions;
