// birthDate : "1999-10-05"
// email : "alejofunes1@gmail.com"
// fullName : "Alejo"
// password : "AlexisFa23"
// prize: 12
// isProvider: true/false

//flag con verification si tiene datos completos o no
const { v4: uuidv4 } = require('uuid');
const { postPeopleService } = require('../../services/people/postPeople.service');

const postPeopleController = async (req, res) => {
    let { idPeople } = req.body
    const { fullName,address,idLocation,geoposition,birthDate,
            idGenre,state,noShow,aboutMe,typeOfPerson,email,password,
            externalLogin,weekCalendar,prize,
            options} =req.body
    if (!idPeople) idPeople = uuidv4() //por si lo cargo desde afuera de la app

    if (!fullName ||
        !email ||
        !password ||
        !birthDate )
        return res.status(400).json({ error: "Faltan Datos" })

    try {
        const { people ,created} = await postPeopleService(idPeople,fullName,address,idLocation,geoposition,birthDate,
            idGenre,state,noShow,aboutMe,typeOfPerson,email,password,
            externalLogin,weekCalendar,prize,options)
        
            if (created) return res.status(201).json(people)
            return res.status(200).json(people)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

module.exports = { postPeopleController };