
const { Sequelize, Op } = require("sequelize");
const { People, People_options, Categories, Categories_options, People_logins, Opportunities, conn } = require("../../db.js");
const formatPeople = require("../../utils/formatPeople.js");
const { getMunicipalitiesService } = require("../geolocation/getMunicipalities.service.js");


const getPeopleService = async (body) => {

    let filterPeople = {}
    try {
        // filtro ? filterPeople = filtro : filterPeople = { state: 'Active' }

        let result = await People.findAll(
            {
                where: filterPeople,
                include: [
                    {
                        model: People_options,
                        foreignKey: 'idPeople',
                        order: [['idOption', 'DESC']],
                        include:
                            [
                                {
                                    model: Categories_options,
                                    order: [['idCategorie', 'DESC']],
                                    include: [
                                        {
                                            model: Categories,
                                            order: [['idCategorie', 'DESC']]
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
            data: formatPeople(result)
        }

        return { people };
    } catch (error) {
        console.log("ERROR", error);
        throw error;
    }
}

module.exports = { getPeopleService }

