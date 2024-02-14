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
                ['idProvider', 'idProvider'],
                [Sequelize.fn('AVG', Sequelize.col('"opportunities"."ratingCustomer"')), 'Promedio'],
                [Sequelize.fn('COUNT', Sequelize.col('"opportunities"."ratingCustomer"')), 'Cantidad']
            ],
            where: {
                idProvider: idPeople
            },
            group: ['idProvider'],
        });
        let indicadoresPersonales = {
            ratingPromedio: query[0].dataValues.Promedio,
            cantidadEvaluaciones: query[0].dataValues.Cantidad
        }

        //cantidad de oportunidades
        query = await Opportunities.findAll({
            attributes: [
                ['idProvider', 'idProvider'],
                [Sequelize.fn('COUNT', Sequelize.col('"opportunities"."idOpportunitie"')), 'Cantidad']
            ],
            where: {
                idProvider: idPeople
            },
            group: ['idProvider'],
        });
        indicadoresPersonales.cantidadOportunidades = query[0].dataValues.Cantidad

        //cantidad de oportunidades exitosas
        query = await Opportunities.findAll({
            attributes: [
                ['idProvider', 'idProvider'],
                [Sequelize.fn('COUNT', Sequelize.col('"opportunities"."idOpportunitie"')), 'Cantidad']
            ],
            where: {
                idProvider: idPeople,
                idService: {
                    [Sequelize.Op.ne]: 0
                }
            },
            group: ['idProvider'],
        });
        indicadoresPersonales.cantidadContrataciones = query[0].dataValues.Cantidad

        //cantidad de oportunidades en view
        query = await Opportunities.findAll({
            attributes: [
                ['idProvider', 'idProvider'],
                [Sequelize.fn('COUNT', Sequelize.col('"opportunities"."idOpportunitie"')), 'Cantidad']
            ],
            where: {
                idProvider: idPeople,
                state: STATE_VIEW
            },
            group: ['idProvider'],
        });
        indicadoresPersonales.cantidadViews = query[0].dataValues.Cantidad

        //servicios contratados del proveedor
        query = await Opportunities.findAll({
            attributes: [
                [Sequelize.literal('"categories_option"."description"'), 'Servicio'],
                [Sequelize.fn('COUNT', Sequelize.col('"opportunities"."idService"')), 'Cantidad']
            ],
            where: {
                idProvider: idPeople,
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
        const mostSearchedServices = []
        query.forEach(value => {
            mostSearchedServices.push({
                servicio: value.dataValues.Servicio,
                cantidad: value.dataValues.Cantidad
            })
        })

        //ultimo comentario
        query = await Opportunities.findOne({
            attributes: [
                ['ratingCustomer', 'rating'],
                ['dateRatingCustomer', 'fecha'],
                ['reviewCustomer', 'review'],
                [Sequelize.literal('"categories_option"."description"'), 'service'],
                [Sequelize.literal('"customer"."fullName"'), 'persona'],

            ],
            where: {
                idProvider: idPeople,
                state: [STATE_COMPLETED, STATE_RATINGPROVIDERPENDING]
            },
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