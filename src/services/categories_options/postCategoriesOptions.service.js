const { Categories_options, Categories } = require('../../db');
const { Op } = require('sequelize');
const getCategoriesServise = require('../categories/getCategories.service');

const postCategoriesOptionsService = async (newOption) => {
  const { idCategorie, description } = newOption;

  const updateOption = { idCategorie, description, isDeleted: false };

  if (!idCategorie) return { status: 400, response: 'idCategorie es un dato requerido' };
  if (!description) return { status: 400, response: 'description es un dato requerido' };

  const category = await Categories.findByPk(idCategorie);
  const [optionCreated, create] = await Categories_options.findOrCreate({
    where: {
      description: { [Op.iLike]: description },
    },
    defaults: newOption,
  });

  if (!category) return { status: 400, response: 'No hay una categoria con el id proporcionado' };
  if (!create) {
    await Categories_options.update(updateOption, {
      where: {
        description: { [Op.iLike]: description },
      },
    });
  }

  // devuelve el formato de categorias, puede devolver solo 1 categoria sengun se requiera
  const response = await getCategoriesServise();

  return { status: 200, response };
};

module.exports = postCategoriesOptionsService;
