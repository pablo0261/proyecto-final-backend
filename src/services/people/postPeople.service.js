const { People, People_logins, Payments } = require('../../db');
const { v4: uuidv4 } = require('uuid');

const postPeopleService = async (
    idPeople,
    fullName,
    address,
    idLocation,
    geoposition,
    birthDate,
    idGenre,
    state,
    aboutMe,
    typeOfPerson,
    email,
    password,
    externalLogin,
    weekCalendar,
    prize,
    options
) => {
    const currentDate = new Date();

    try {
        const newData = {
            idPeople,
            fullName,
            address,
            idLocation,
            geoposition,
            birthDate,
            idGenre,
            state: !state ? 'Active' : state,
            aboutMe,
            dateOfAdmission: currentDate,
            typeOfPerson,
            email,
            password,
            externalLogin,
            weekCalendar,
        };

        let [result, created] = await People.findOrCreate({
            where: { idPeople: newData.idPeople },
            defaults: newData,
        });

        if (!created) {
            // Si no se creó, se actualiza el usuario que contiene el idPeople
            await People.update(newData, { where: { idPeople: newData.idPeople } });
            // Se recupera los datos actualizados
            result = await People.findOne({ where: { idPeople: newData.idPeople } });
        } else {
            // Si se creó una nueva entrada, guardamos el login y el pago

            const logins = await People_logins.create({
                id: uuidv4(),
                idPeople,
                loginDate: currentDate,
            });

            const payments = await Payments.create({
                idPayment: uuidv4(),
                idPeople,
                emisionDate: currentDate,
                dueDate: currentDate,
                paymentDate: currentDate,
                prize,
            });
        }

        const people = {
            status: created ? 'Created' : 'Updated',
            result,
        };

        return { people, created };
    } catch (error) {
        throw error;
    }
};

module.exports = { postPeopleService };