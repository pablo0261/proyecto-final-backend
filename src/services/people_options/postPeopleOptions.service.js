const { Categories_options, Categories, People_options } = require('../../db');
const { v4: uuidv4 } = require('uuid');

const postPeopleOptionsService = async (dataBody) => {
    const { idPeople, idOption } = dataBody;

    if (!idPeople || !idOption) {
      return { status: 400, response: 'id de persona y id de opcion son datos requeridos' };
    }

    const option = await Categories_options.findByPk(idOption, {
      include: {
        model: Categories,
      },
    });

    if (!option) return { status: 400, response: 'El id no corresponde a ninguna opcion' };

    const category = option.dataValues.category;

    if (category.dataValues.isService) {
      const { price } = dataBody;
      if (!price) return { status: 400, response: 'Precio requerido' };

      const newData = {
        id: uuidv4(),
        idPeople,
        idOption,
        price,
      };

      const [res, create] = await People_options.findOrCreate({
        where: { idPeople, idOption },
        defaults: newData,
      });

      if (!create) {
        await People_options.update(newData, { where: { idPeople, idOption } });
        return { status: 201, response: 'Opciones de usuario modificadas con exito' };
      }

      if (create) {
        return { status: 201, response: 'Opciones de usuario creada con exito' };
      }
    }

    // se agragaron posteriores condiciones para los formularios restantes
    //
    //
    //

    // accion por default
    const newData = {
      id: uuidv4(),
      idPeople,
      idOption,
    };

    const [res, create] = await People_options.findOrCreate({
      where: { idPeople, idOption },
      defaults: newData,
    });

    if (!create) {
      await People_options.update(newData, { where: { idPeople, idOption } });
      return { status: 201, response: 'Opciones de usuario modificadas con exito' };
    }

    if (create) {
      return { status: 201, response: 'Opciones de usuario creada con exito' };
    }
    
    return { status: 500, response: 'No hubo respuesta al guardar las opciones' };
};

module.exports = postPeopleOptionsService;
