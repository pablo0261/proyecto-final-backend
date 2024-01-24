const { People, Logins, Payments } = require('../../db');

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
            state: !state? 'Active':state,
            noShow,
            aboutMe,
            dateOfAdmission: currentDate,
            typeOfPerson,
            email,
            password,
            externalLogin,
            weekCalendar
        }
        console.log(newData)
        let [people, created] = await People.findOrCreate({
            where: { email: email },
            defaults: newData
        })
        //lo creo
        if (created) {
            //guardo login
            const logins = await Logins.Create(
                {
                    defaults: {
                        idPeople,
                        loginDate: currentDate
                    }
                })

            //guardo payment
            const payments = await Payments.Create(
                {
                    defaults: {
                        idPeople,
                        emisionDate: currentDate,
                        dueDate:currentDate,
                        paymentDate:currentDate,
                        prize
                    }
                })
        }
        
        return { people, created}
    } catch (error) {
        return ({ error: error.message })
    }
}

module.exports = { postPeopleService }