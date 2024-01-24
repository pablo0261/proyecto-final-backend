const { People, People_logins, Payments } = require('../../db');
const { v4: uuidv4 } = require('uuid');

const postPeopleService = async (idPeople, fullName, address, idLocation, geoposition, birthDate,
    idGenre, state, noShow, aboutMe, typeOfPerson, email, password,
    externalLogin, weekCalendar, prize, options) => {

    const currentDate = new Date()

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
            noShow,
            aboutMe,
            dateOfAdmission: currentDate,
            typeOfPerson,
            email,
            password,
            externalLogin,
            weekCalendar
        }

        let [result, created] = await People.findOrCreate({
            where: { email: newData.email },
            defaults: newData
        })
        //lo creo
        if (created) {
            //guardo login
            const logins = await People_logins.create(
                {
                    id:uuidv4(),
                    idPeople,
                    loginDate: currentDate
                })

            //guardo payment
            const payments = await Payments.create(
                {
                    idPayment:uuidv4(),
                    idPeople,
                    emisionDate: currentDate,
                    dueDate: currentDate,
                    paymentDate: currentDate,
                    prize
                })
        }
        const people={
            status:created? "Created":"Updated",
            result
        }
        
        return { people, created }
    } catch (error) {
        console.log(error)
        return ({ error: error.message })
    }
}

module.exports = { postPeopleService }