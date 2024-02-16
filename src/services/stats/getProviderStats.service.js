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
const { STATE_VIEW, STATE_COMPLETED, STATE_RATINGPROVIDERPENDING } = require("../../constants/index.js");
const { formatDate } = require("../../utils/formatDate.js");

const getProviderStatsService = async (idPeople) => {

    try {
        const whereProvider = {}
        if (idPeople) whereProvider.idProvider = idPeople

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
        query.forEach(value => {
            mostSearchedCategories.push({
                servicio: value.dataValues.Servicio,
                cantidad: value.dataValues.Cantidad
            })
        })

        //promedio de calificaciones del proveedor logueado
        query = await Opportunities.findAll({
            attributes: [
                [Sequelize.fn('AVG', Sequelize.col('"opportunities"."ratingCustomer"')), 'Promedio'],
                [Sequelize.fn('COUNT', Sequelize.col('"opportunities"."ratingCustomer"')), 'Cantidad']
            ],
            where: whereProvider
        });
       
        let indicadoresPersonales = {
            ratingPromedio: query[0].dataValues.Promedio,
            cantidadEvaluaciones: query[0].dataValues.Cantidad
        }

        //cantidad de oportunidades
        query = await Opportunities.findAll({
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('"opportunities"."idOpportunitie"')), 'Cantidad']
            ],
            where: whereProvider
        });
        indicadoresPersonales.cantidadOportunidades = query[0].dataValues.Cantidad

        //cantidad de oportunidades exitosas
        let whereSucccess = whereProvider
        whereSucccess.idService = { [Sequelize.Op.ne]: 0 }

        query = await Opportunities.findAll({
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('"opportunities"."idOpportunitie"')), 'Cantidad']
            ],
            where: whereSucccess
        });
        indicadoresPersonales.cantidadContrataciones = query[0].dataValues.Cantidad

        //cantidad de oportunidades en view
        let whereView = whereProvider
        whereView.state = STATE_VIEW

        query = await Opportunities.findAll({
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('"opportunities"."idOpportunitie"')), 'Cantidad']
            ],
            where: whereView
        });
        indicadoresPersonales.cantidadViews = query[0].dataValues.Cantidad

        //servicios contratados del proveedor
        let whereHiring = whereProvider
        whereHiring.idService = { [Sequelize.Op.ne]: 0 }

        query = await Opportunities.findAll({
            attributes: [
                [Sequelize.literal('"categories_option"."description"'), 'Servicio'],
                [Sequelize.fn('COUNT', Sequelize.col('"opportunities"."idService"')), 'Cantidad']
            ],
            where: whereHiring,
            include: [{
                model: Categories_options,
                as: 'categories_option',
                attributes: [], // Debes especificar las columnas que deseas seleccionar de la tabla incluida
            }],
            group: ['categories_option.description'],
            order: [[Sequelize.fn('COUNT', Sequelize.col('"opportunities"."idService"')), 'DESC']]
        });
        const mostSearchedServices = []
        query.forEach(value => {
            mostSearchedServices.push({
                servicio: value.dataValues.Servicio,
                cantidad: value.dataValues.Cantidad
            })
        })

        //ultimo comentario
        let whereLastComment = whereProvider
        whereLastComment.state = [STATE_COMPLETED, STATE_RATINGPROVIDERPENDING]

        query = await Opportunities.findOne({
            attributes: [
                ['ratingCustomer', 'rating'],
                ['dateRatingCustomer', 'fecha'],
                ['reviewCustomer', 'review'],
                [Sequelize.literal('"categories_option"."description"'), 'service'],
                [Sequelize.literal('"customer"."fullName"'), 'persona'],

            ],
            where: whereLastComment,
            include: [
                {
                    model: Categories_options,
                    as: 'categories_option',
                },
                {
                    model: People,

                    as: 'customer',
                }
            ],
            order: [['dateRatingCustomer', 'DESC']]
        });

        const lastComment = {
            rating: query.dataValues.rating,
            fecha: formatDate(query.dataValues.fecha),
            review: query.dataValues.review,
            cliente: query.dataValues.customer.fullName,
            servicio: query.dataValues.service
        }

        //historial de contrataciones

        //salida
        const data = {
            indicadoresPersonales: indicadoresPersonales,
            serviciosMasBuscados: mostSearchedCategories,
            misServiciosMasContratados: mostSearchedServices,
            ultimoComentario: lastComment
        }
        return { data }

    } catch (error) {
        console.log("ProviderStats: ", error);
        throw error;
    }
}

module.exports = { getProviderStatsService };