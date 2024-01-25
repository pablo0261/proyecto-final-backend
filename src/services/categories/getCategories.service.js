const { Categories, Categories_options } = require('../../db');

const getCategoriesServise = async () => {
  const categoriesData = await Categories.findAll({
    include: {
      model: Categories_options,
      attributes: ['idOption', 'description'],
    },
  });

  const count = categoriesData.length;
  const categories = {
    count,
    data: categoriesData,
  };
  return { categories };
};

module.exports = getCategoriesServise;
