
const { Sequelize, Op } = require("sequelize");
const { People, People_options, Categories, Categories_options, People_logins, Opportunities, conn } = require("../../db.js");
const formatPeople = require("../../utils/formatPeople.js");
const { getMunicipalitiesService } = require("../geolocation/getMunicipalities.service.js");


const getPeopleService = async (params) => {
    const peopleFields = ['idPeople', 'fullName', 'address', 'idLocation', 'locationName', 'geoposition',
        'birthDate', 'age', 'idGenre', 'aboutMe', 'dateOfAdmission', 'typeOfPerson',
        'email', 'externalLogin', 'weekCalendar', 'averageRating', 'countRating',
        'logged', 'phone', 'location', 'country', 'profession']

    //armo un objeto solo con los campos de people asi no me da error el sequelize por filtrar nombre de campo inexistente
    let filterPeople = Object.fromEntries(
        Object.entries(params).filter(([key]) => peopleFields.includes(key)))
    //activos si no viene por params
    const { state } = params
    if (state) {
        filterPeople.state = state
    } else {
        filterPeople.state = 'Active'
    }

    // peopleoptions        
    const { idOption } = params
    const filterPeopleOptions = {}
    let filterRequired=false
    if (idOption) {
        //convierto a array
        const splitIdOption = idOption.split(',')
        //creo el filtro con Op.in
        filterPeopleOptions.idOption = { [Op.in]: splitIdOption }
        filterRequired=true
        
    }
    console.log(filterPeopleOptions)

    try {


        let result = await People.findAll(
            {
                where: filterPeople,
                include: [
                    {
                        model: People_options,
                        foreignKey: 'idPeople',
                        where: filterPeopleOptions,
                        required:filterRequired,
                        include:
                            [
                                {
                                    model: Categories_options,
                                    include: [
                                        {
                                            model: Categories,
                                        }
                                    ],
                                },
                            ]
                    },
                ],
            },
        )
        for (let person of result) {
            // Realiza una solicitud a la API externa para obtener los datos de la localidad
            if (person.dataValues.idLocation === 999999) {
                person.dataValues.locationName = 'No data';
                person.dataValues.idProvince = 'No data';
                person.dataValues.provinceName = 'No data';
            } else {
                const response = await getMunicipalitiesService(person.dataValues.idLocation)
                // Agrega el nombre de la localidad y provincia a person
                person.dataValues.locationName = response.data[0].nombreLocalidad;
                person.dataValues.idProvince = response.data[0].idProvincia;
                person.dataValues.provinceName = response.data[0].nombreProvincia;
            }
        }
        const count = result.length;
        const people = {
            count: count,
            filter: filterPeople,
            options: idOption,
            data: formatPeople(result)
        }

        return { people };
    } catch (error) {
        console.log("ERROR", error);
        throw error;
    }
}

module.exports = { getPeopleService }

