
const { Sequelize } = require("sequelize");
const { People, People_options, Categories, Categories_options, People_logins } = require("../../db.js");
const formatPeople = require("../../utils/formatPeople.js");

const getPeopleService = async (filtro) => {
    let result
    try {
        result = await People.findAll(

            {
                include: [
                    {
                        model: People_options,
                        foreignKey: 'idPeople',
                        order:[['idOption','DESC']],
                        include:
                            [
                                {
                                    model: Categories_options,
                                    order:[['idCategorie','DESC']],
                                    include: [
                                        {
                                            model: Categories,
                                            order:[['idCategorie','DESC']]
                                        }
                                    ],
                                },
                            ]
                    }
                ]
            }
        );
        //add age

        const count = result.length;
        const people = {
            count: count,
            //data:result
            data: formatPeople(result)
        }

        return { people };
    } catch (error) {
        console.log("ERROR", error);
        throw error;
    }
}

module.exports = { getPeopleService }