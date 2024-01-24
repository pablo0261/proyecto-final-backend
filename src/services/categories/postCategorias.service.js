const { Categories } = require('../../db');

const postCategoriesService = async (description, categoryData) => {
  const [category, create] = await Categories.findOrCreate({
    where: { description },
    defaults: categoryData,
  });

  if (create) {
    return category;
  }
};

module.exports = postCategoriesService;
