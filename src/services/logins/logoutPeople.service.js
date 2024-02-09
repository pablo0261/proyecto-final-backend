const { People, People_logins } = require('../../db.js');

const logoutPeopleService = async (idPeople) => {

    try {
        const person = await People.findOne({
            where: { idPeople }
        });

        if (!person) {
            throw new Error('No se encontró la persona');
        }

        const logoutDate = new Date();

        const createdLogin = await People_logins.create({
            idPeople: idPeople,
            logoutDate: logoutDate
        });

        const [updatedRowsCount, updatedRows] = await People.update({ logged: false }, {
            where: { idPeople },
            returning: true,
        });
        
        if (createdLogin && updatedRowsCount > 0) {
            return { message: 'Logout exitoso' };
        } else {
            throw new Error('Error al cerrar sesión');
        }

    } catch (error) {
        console.log(error);
        throw new Error('Error al cerrar sesión');
    }
}

module.exports = logoutPeopleService;