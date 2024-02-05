const { People } = require('../../db');
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

        const result = await getPeopleService({ idPeople: idPeople })
        return { result };
    } catch (error) {
        throw error;
    }
};

module.exports = { putPeopleService };