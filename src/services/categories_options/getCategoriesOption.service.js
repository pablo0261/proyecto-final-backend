const { Categories_options, Categories } = require('../../db');
const { Op } = require('sequelize');

const getCategoriesOption = async (parameters = {}) => {
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

  const categoriesOptionsData = await Categories_options.findAll({
    include: {
      model: Categories,
      where: { [Op.and]: filters },
      attributes: ['description'],
    },
  });

  if (!categoriesOptionsData[0]) return { status: 404, response: 'Sin ningun resultado' };

  const count = categoriesOptionsData.length;
  const categoriesOptions = {
    count,
    filters: parameters,
    data: categoriesOptionsData,
  };
  return { status: 200, response: { categoriesOptions } };
};

module.exports = getCategoriesOption;
