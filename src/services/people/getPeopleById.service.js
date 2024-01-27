const { People } = require("../../db.js");

const getPeopleByIdService = async (id) => {
    console.log(id)
    try {
        result = await People.findAll(
            {
                where: {idPeople:id},
                
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
                    }
                ]
            },

        );

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

module.exports = { getPeopleByIdService }