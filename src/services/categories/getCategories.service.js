const { Categories, Categories_options } = require('../../db');
const { Op } = require('sequelize');

const getCategoriesServise = async (parameters = {}) => {
  //
  // array de filtros
  const filters = [];
  Object.entries(parameters).map(([key, value]) => {
    const obj = {};
    if (value) {
      if (key === 'description') return filters.push({ description: { [Op.iLike]: value } });
      obj[key] = value;
      return filters.push(obj);
    }
  });

  const categoriesData = await Categories.findAll({
    where: { [Op.and]: filters },
    include: {
      model: Categories_options,
      attributes: ['idOption', 'description'],
    },
  });

  if (!categoriesData[0]) {
    return { status: 404, response: 'Sin ningun resultado' };
  }

  const count = categoriesData.length;
  const categories = {
    count,
    filters: parameters,
    data: categoriesData,
  };
  return { status: 200, response: { categories } };
};

module.exports = getCategoriesServise;
