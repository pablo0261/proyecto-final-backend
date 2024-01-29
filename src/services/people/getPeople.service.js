
const { Sequelize, Op } = require("sequelize");
const { People, People_options, Categories, Categories_options, People_logins, Opportunities, conn } = require("../../db.js");
const formatPeople = require("../../utils/formatPeople.js");
const { getMunicipalitiesService } = require("../geolocation/getMunicipalities.service.js");
const { PAGESIZE } = require("../../constants/index.js");

const getPeopleService = async (params) => {
    const peopleFields = ['idPeople', 'fullName', 'address', 'idLocation', 'locationName', 'geoposition',
        'birthDate', 'age', 'idGenre', 'aboutMe', 'dateOfAdmission', 'typeOfPerson',
        'email', 'externalLogin', 'weekCalendar', 'averageRating', 'countRating',
        'logged', 'phone', 'location', 'country', 'profession']
    const { idOption, state, pageSize, pageNumber } = params

    const filters = []

    //armo un objeto solo con los campos de people asi no me da error el sequelize por filtrar nombre de campo inexistente
    let filterPeople = Object.fromEntries(
        Object.entries(params).filter(([key]) => peopleFields.includes(key)))

    //activos si no viene por params
    if (state) {
        filterPeople.state = state
    } else {
        filterPeople.state = 'Active'
    }

    //sequelize acepta filtros como array de objetosç
    //primer paso los de l aptabla people
    filters.push(filterPeople)

    // peopleoptions        
    if (idOption) {
        // convierto a array 
        const lengthOption = idOption.split(',').length
        // armo consulta sql para filtrar los people con esas opciones
        // la lengh sirve para saber si se cumplen todas las condiciones
        filters.push({
            idPeople: {
                [Sequelize.Op.in]: Sequelize.literal(`(SELECT "idPeople" FROM "people_options"
                                                               WHERE "people_options"."idOption" IN (${idOption})
                                                               GROUP BY "idPeople" HAVING  COUNT(DISTINCT "idOption") = ${lengthOption})`)
            }
        })

    }

    //paginado
    if(!pageSize) pageSize=PAGESIZE
    if(!pageNumber || pageNumber<=0) pageNumber=1

    const offset = (pageNumber - 1) * pageSize;
    try {
        let result = await People.findAll(
            {
                limit: pageSize,
                offset: offset,
                where: {
                    [Sequelize.Op.and]: filters
                },
                include: [
                    {
                        model: People_options,
                        foreignKey: 'idPeople',
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
            pageSize: parseInt(pageSize),
            pageNumber: parseInt(offset+1),
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

