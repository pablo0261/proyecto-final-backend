const { PEOPLE_STATE_UNVERIFIED, PEOPLE_STATE_ACTIVE, USER_PROVIDER } = require('../../constants');
const { People, People_options, Categories_options, Categories } = require('../../db');

const checkUnverified = async (idPeople) => {
    try {
        //revisar state por si hay que pasarlo a activo o unverified
        const people = await People.findByPk(idPeople)
        if (people.dataValues.typeOfPerson === USER_PROVIDER &&
            (people.dataValues.state === PEOPLE_STATE_UNVERIFIED || people.dataValues.state === PEOPLE_STATE_ACTIVE)) {
            //reviso que tenga servicios
            const { count: countServices, rows } = await People_options.findAndCountAll({
                where: {
                    idPeople: people.dataValues.idPeople,
                    isDeleted: false
                },
                include: [
                    {
                        model: Categories_options,
                        required: true,
                        include: [
                            {
                                model: Categories,
                                required: true,
                                where: {
                                    isService: true
                                },
                            }
                        ]
                    }
                ]
            });
            //reviso que tenga calendario
            const hasCalendar = people.dataValues.weekCalendar ? people.dataValues.weekCalendar.find(value => value === true) : false;
            //
            if (people.dataValues.idLocation &&
                people.dataValues.geoposition &&
                people.dataValues.image &&
                people.dataValues.phone &&
                people.dataValues.address &&
                countServices > 0 &&
                people.dataValues.image &&
                hasCalendar) {
                await people.update({ state: PEOPLE_STATE_ACTIVE })
            } else {
                await people.update({ state: PEOPLE_STATE_UNVERIFIED })
            }
        }
    } catch (error) {
        throw error;
    }
};

module.exports = { checkUnverified };