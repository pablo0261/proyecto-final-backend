const { Categories_options, Categories, People_options } = require('../../db');
const { v4: uuidv4 } = require('uuid');

const postPeopleOptionsService = async (dataBody) => {
    const { idPeople, idOption } = dataBody;

    const option = await Categories_options.findByPk(idOption, {
        include: {
            model: Categories,
        },
    });

    if (!option) return { status: 400, response: 'El id no corresponde a ninguna opcion' };

    const category = option.dataValues.category;
    const description = category.dataValues.description;

    if (category.dataValues.isService) {
        const { price } = dataBody;
        if (!price) return { status: 400, response: 'Precio requerido' };

        const newData = {
            id: uuidv4(),
            idPeople,
            idOption,
            price
        }
        const [res, create] = await People_options.findOrCreate({
            where: { idPeople, idOption },
            defaults: newData
        })

        if (!create) {
            await People_options.update(newData,
                { where: { idPeople: newData.idPeople } });
            return { status: 200, response: 'Opciones de usuario modificadas con exito' };

        } else {
            return { status: 201, response: 'Opciones de usuario guardadas con exito' };
        }
        return { status: 500, response: 'No hubo respuesta al guardar las opciones' };
    }

    // se agragaron posteriores condiciones para los formularios restantes
    //
    //
    //

    // accion por default
    const res = await People_options.create({
        id: uuidv4(),
        idPeople,
        idOption,
    });

    if (res.dataValues) return { status: 201, response: 'Opciones de usuario guardadas con exito' };
    return { status: 500, response: 'No hubo respuesta al guardar las opciones' };
};

module.exports = postPeopleOptionsService;
