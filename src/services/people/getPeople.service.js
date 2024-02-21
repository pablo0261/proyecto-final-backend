
const { Sequelize, Op } = require("sequelize");
const { People, People_options, Categories, Categories_options, People_logins, Opportunities, conn } = require("../../db.js");
const formatPeople = require("../../utils/formatPeople.js");
const { getMunicipalitiesService } = require("../geolocation/getMunicipalities.service.js");
const { PAGESIZE, PEOPLE_STATE_ACTIVE } = require("../../constants/index.js");

const getPeopleService = async (params) => {
    const peopleFields = [
        'idPeople',
        'fullName',
        'address',
        'idLocation',
        'geoposition',
        'birthDate',
        'age',
        'idGenre',
        'state',
        'aboutMe',
        'dateOfAdmission',
        'typeOfPerson',
        'email',
        'externalLogin',
        'averageRating',
        'countRating',
        'logged',
        'phone',
        'location',
        'country',
        'image',
        'profession',
        'weekCalendar']

    const { idOption, idOrder, state, pageSize, pageNumber } = params
    const { idPeople,fullName,email } = params

    const filters = []


    //armo un objeto solo con los campos de people asi no me da error el sequelize por filtrar nombre de campo inexistente
    //exceto si viene fullName que lo majejo mas abajo
    let filterPeople = Object.fromEntries(
        Object.entries(params).filter(([key]) => {
            if (key === 'fullName') {
                return false; // Excluye el campo fullname
            }
            return peopleFields.includes(key);
        })
    );

    //activos si no viene por params
    if (!idPeople && !email) {
        if (state) {
            filterPeople.state = state
        } else {
            filterPeople.state = PEOPLE_STATE_ACTIVE
        }
    }
    //sequelize acepta filtros como array de objetosç
    //primer paso los de l aptabla people

    filters.push(filterPeople)
    // starts with si viene fullname
    if (fullName) {
        filters.push(Sequelize.literal(`UPPER("fullName") LIKE '${fullName.toUpperCase()}%'`))
    }

    const filterServices = [] //usada para buscar el minimo valor de los servicios filtrados
    // peopleoptions        
    if (idOption) {
        // convierto a array 
        const options = idOption.split(',')
        const lengthOption = options.length
        // armo consulta sql para filtrar los people con esas opciones
        // la lengh sirve para saber si se cumplen todas las condiciones
        filters.push({
            idPeople: {
                [Sequelize.Op.in]: Sequelize.literal(`(SELECT "idPeople" FROM "people_options"
                                                               WHERE "people_options"."idOption" IN (${idOption})
                                                               AND "people_options"."isDeleted"=false
                                                               GROUP BY "idPeople" HAVING  COUNT(DISTINCT "idOption") = ${lengthOption})`)
            }
        })

        //uso for por el map no espera el await
        for (const option of options) {
            //busco si options es servicio
            const categorie = await Categories_options.findOne({
                where: { idOption: option },
                include: [
                    {
                        model: Categories,
                        attributes: ['isService']
                    }
                ]
            })
            //agrego los services filtrados
            if (categorie.dataValues.category.dataValues.isService === true) {
                filterServices.push(option)
            }
        }
    }
    //agrego service 1 CUIDADO si no hay filtros de servicios
    if (filterServices.length === 0) filterServices.push('1')

    const idServicesFiltered = filterServices.join()
    //armo funcion para encontrar el valor de servicio minimo
    const priceMin = '(SELECT COALESCE(MIN("price"),0) ' +
        'FROM "people_options" ' +
        'WHERE "people_options"."idPeople" = "people"."idPeople" ' +
        'AND "people_options"."isDeleted"=false ' +
        'AND "people_options"."idOption" IN(' + idServicesFiltered + '))'

    //paginado
    const page = pageNumber ? pageNumber : 1
    const itemsPage = pageSize ? pageSize : PAGESIZE
    const offset = (page - 1) * itemsPage;

    //order
    const orderPeople = []
    if (!idOrder) {
        orderPeople.push(['fullName', 'ASC'])
    } else {
        //armo arrays separados por ;
        const orderField = idOrder.split(';')
        orderField.map((order) => {
            //armo array separado por ,
            const field = order.split(',')
            //si ordeno por price ordeno por people_options
            if (field[0] === 'price') {
                // orderPeople.push([{ model: People_options },field[0], field[1] ? field[1] : 'ASC'])
                orderPeople.push([Sequelize.literal(priceMin)
                    , field[1] ? field[1] : 'ASC'])
            } else {
                orderPeople.push([field[0], field[1] ? field[1] : 'ASC'])
            }
        })
    }

    try {
        //total de registros
        const totalCount = await People.count(
            {
                where: {
                    [Sequelize.Op.and]: filters
                },
            }
        )
        //registros
        let result = await People.findAll(
            {
                limit: itemsPage,
                offset: offset,
                attributes: [
                    ...peopleFields,
                    [Sequelize.literal(priceMin), 'minPrice']
                ],
                where: {
                    [Sequelize.Op.and]: filters
                },
                order: orderPeople,
                include: [
                    {
                        model: People_options,
                        required: false,
                        where: { isDeleted: false },
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
            totalCount: totalCount,
            totalOfPages: Math.ceil(totalCount / itemsPage),
            count: count,
            pageSize: parseInt(itemsPage),
            pageNumber: parseInt(page),
            filter: filterPeople,
            filterFullName: fullName? fullName:"",
            //          order: orderPeople,
            options: idOption,
            data: formatPeople(result)
        }

        return { people };
    } catch (error) {
        throw error
    }
}

module.exports = { getPeopleService }

