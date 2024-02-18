const { Categories_options, Categories, People_options } = require('../../db');
const { v4: uuidv4 } = require('uuid');
const { getPeopleService } = require('../people/getPeople.service');
const { checkUnverified } = require('../people/checkUnverified');

const postPeopleOptionsService = async (dataBody) => {
    const { idPeople, idOption } = dataBody;

    if (!idPeople || !idOption) {
      return {
        status: 400,
        response: { response: 'id de persona y id de opcion son datos requeridos' },
      };
    }

    const option = await Categories_options.findByPk(idOption, {
      include: {
        model: Categories,
      },
    });

    if (!option) {
      return { status: 400, response: { response: 'El id no corresponde a ninguna opcion' } };
    }

    const category = option.category;

    //
    // post para people service
    if (category.isService) {
      const { price } = dataBody;
      if (!price) return { status: 400, response: { response: 'Precio requerido' } };

      const newData = {
        id: uuidv4(),
        idPeople,
        idOption,
        price,
        isDeleted: false,
      };

      const [optionCreate, create] = await People_options.findOrCreate({
        where: { idPeople, idOption },
        defaults: newData,
      });

      if (!create) {
        await People_options.update(newData, { where: { idPeople, idOption } });
      }

      await checkUnverified(idPeople)
      
      const response = await getPeopleService({ idPeople: idPeople });
      return { response, status: create ? 201 : 200 };
    }

    //
    // post para people education
    if (category.isEducation) {
      const { institution, year, comment } = dataBody;

      if (!institution) return { status: 400, response: { response: 'institution es dato requerido' } };
      if (!year) return { status: 400, response: { response: 'year es dato requerido' } };
      if (!comment) return { status: 400, response: { response: 'comment es dato requerido' } };

      const newData = {
        id: uuidv4(),
        institution,
        year,
        comment,
        isDeleted: false,
      };

      const [optionCreate, create] = await People_options.findOrCreate({
        where: { idPeople, idOption },
        defaults: newData,
      });

      if (!create) {
        await People_options.update(newData, {
          where: { idPeople, idOption },
        });
      }

      const response = await getPeopleService({ idPeople });
      return { response, status: create ? 201 : 200 };
    }

    // post para people education
    if (category.isExperience) {
        const { institution, year, comment,description } = dataBody;
  
        if (!institution) return { status: 400, response: { response: 'institution es dato requerido' } };
        if (!year) return { status: 400, response: { response: 'year es dato requerido' } };
        if (!comment) return { status: 400, response: { response: 'comment es dato requerido' } };
        if (!description) return { status: 400, response: { response: 'description es dato requerido' } };
        
        const newData = {
          id: uuidv4(),
          institution,
          year,
          comment,
          description,
          isDeleted: false,
        };
  
        const [optionCreate, create] = await People_options.findOrCreate({
          where: { idPeople, idOption },
          defaults: newData,
        });
  
        if (!create) {
          await People_options.update(newData, {
            where: { idPeople, idOption },
          });
        }
        
        await checkUnverified(idPeople)

        const response = await getPeopleService({ idPeople });
        return { response, status: create ? 201 : 200 };
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
      isDeleted: false,
    };

    const [optionCreate, create] = await People_options.findOrCreate({
      where: { idPeople, idOption },
      defaults: newData,
    });

    if (!create) {
      await People_options.update(newData, { where: { idPeople, idOption } });
    }
    const response = await getPeopleService({ idPeople: idPeople });
    return { response, status: create ? 201 : 200 };
};

module.exports = postPeopleOptionsService;
