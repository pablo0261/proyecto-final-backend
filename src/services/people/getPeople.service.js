
const { Sequelize } = require("sequelize");
const { People, People_options, Categories, Categories_options, People_logins, Opportunities } = require("../../db.js");
const formatPeople = require("../../utils/formatPeople.js");

const getPeopleService = async (filtro) => {
    let filterPeople = {}
    try {
        filtro ? filterPeople = filtro : filterPeople = { state: 'Active' }

        const result = await People.findAll(
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
                    {
                        model: Opportunities,
                        foreignKey: 'idCustomer',
                    },
                ]
            },

        );

        const count = result.length;
        const people = {
            count: count,
            filter: filterPeople,
            data: result
        }

        return { people };
    } catch (error) {
        console.log("ERROR", error);
        throw error;
    }
}

module.exports = { getPeopleService }

