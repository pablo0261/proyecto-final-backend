const { Sequelize, Op } = require("sequelize");
const {
    People,
    People_options,
    Categories,
    Categories_options,
    People_logins,
    Opportunities,
    Payments,
} = require("../../db.js");

const getProviderStatsService = async (idPeople) => {

    try {
        let query = []
        //servicios mas solicitados
        query = await Opportunities.findAll({
            attributes: [
                [Sequelize.literal('"categories_option"."description"'), 'Servicio'],
                [Sequelize.fn('COUNT', Sequelize.col('"opportunities"."idService"')), 'Cantidad']
            ],
            where: {
                idService: {
                    [Sequelize.Op.ne]: 0
                }
            },
            include: [{
                model: Categories_options,
                as: 'categories_option',
                attributes: [], // Debes especificar las columnas que deseas seleccionar de la tabla incluida
            }],
            group: ['categories_option.description'],
            order: [[Sequelize.fn('COUNT', Sequelize.col('"opportunities"."idService"')), 'DESC']]
        });
        const mostSearchedCategories = []
        query.forEach(service => {
            mostSearchedCategories.push({
                servicio: service.dataValues.Servicio,
                cantidad: service.dataValues.Cantidad
            })
        })

        //promedio de calificaciones del proveedor logueado
        query = await Sequelize.findAll()

        const promedioRating = []
        query.forEach(service => {
            mostSearchedCategories.push({
                servicio: service.dataValues.Servicio,
                cantidad: service.dataValues.Cantidad
            })
        })

        //salida
        const data = {
            serviciosMasBuscados: mostSearchedCategories,
            promedioRating: promedioRating
        }
        return { data }

    } catch (error) {
        console.log("ProviderStats: ", error);
        throw error;
    }
}

module.exports = { getProviderStatsService };