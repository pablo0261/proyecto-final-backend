const { PEOPLE_STATE_UNVERIFIED, PEOPLE_STATE_ACTIVE, USER_PROVIDER } = require('../../constants');
const { People, People_options, Categories_options, Categories } = require('../../db');
const { getPeopleService } = require('./getPeople.service');

const putPeopleService = async (params) => {
    const { idPeople, fullName, address, idLocation, geoposition, birthDate, idGenre, state,
        aboutMe, email, password, externalLogin, weekCalendar,
        phone, country, profession, image } = params;

    try {
        const newData = {
            idPeople,
            fullName,
            address,
            idLocation,
            geoposition,
            birthDate,
            idGenre,
            state,
            aboutMe,
            email,
            password,
            externalLogin,
            weekCalendar,
            phone,
            country,
            profession,
            image
        };

        //age
        if (birthDate) {
            const currentDate = new Date();
            const birthDateToDate = new Date(birthDate);
            let age = currentDate.getFullYear() - birthDateToDate.getFullYear();
            if (
                currentDate.getMonth() < birthDateToDate.getMonth() ||
                (currentDate.getMonth() === birthDateToDate.getMonth() && currentDate.getDate() < birthDateToDate.getDate())
            ) {
                age--; // Resta 1 año si aún no ha cumplido años este año
            }
            newData.age = age
        }
        // Si no se creó, se actualiza el usuario que contiene el idPeople
        await People.update(newData, { where: { idPeople: newData.idPeople } });

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
            const hasCalendar = people.dataValues.weekCalendar.find(value => value === true);
            //
            if (people.dataValues.idLocation &&
                people.dataValues.geoposition &&
                people.dataValues.image &&
                people.dataValues.phone &&
                countServices > 0 &&
                hasCalendar) {
                    await people.update({state:PEOPLE_STATE_ACTIVE})
            }else{
                await people.update({state:PEOPLE_STATE_UNVERIFIED})
            }
        }
        const result = await getPeopleService({ idPeople: idPeople })
        return { result };
    } catch (error) {
        throw error;
    }
};

module.exports = { putPeopleService };