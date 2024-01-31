const { CategoriesOptions } = require("../../db");

const getCategoriesOption = async () => {
  const categoriesOptionsData = await CategoriesOptions.findAll();
  return categoriesOptionsData;
};

module.exports = getCategoriesOption