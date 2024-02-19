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

const { STATE_VIEW, STATE_COMPLETED, STATE_RATINGPROVIDERPENDING, STATE_ACCEPTED, STATE_RATINGCUSTOMERPENDING, STATE_RATINGPENDING } = require("../../constants/index.js");
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
                [Sequelize.fn('AVG', Sequelize.col('"opportunities"."ratingCustomer"')), 'Promedio'],
                [Sequelize.fn('COUNT', Sequelize.col('"opportunities"."ratingCustomer"')), 'Cantidad']
            ],
            where: idPeople ? { idProvider: idPeople } : {}
        });
        let indicadoresPersonales = {
            ratingPromedio: query ? parseFloat(query[0].dataValues.Promedio) : 0,
            cantidadEvaluaciones: query ? query[0].dataValues.Cantidad : 0
        }

        //cantidad de oportunidades
        query = await Opportunities.findAll({
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('"opportunities"."idOpportunitie"')), 'Cantidad']
            ],
            where: idPeople ? { idProvider: idPeople } : {}
        });
        indicadoresPersonales.cantidadOportunidades = query ? query[0].dataValues.Cantidad : 0

        //cantidad de servicios solicitados
        let whereSucccess = idPeople ? { idProvider: idPeople } : {}
        whereSucccess.idService = { [Sequelize.Op.ne]: 0 }

        query = await Opportunities.findAll({
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('"opportunities"."idOpportunitie"')), 'Cantidad']
            ],
            where: whereSucccess
        });

        indicadoresPersonales.cantidadSolicitudes = query ? query[0].dataValues.Cantidad : 0

        //cantidad de oportunidades exitosas
        let whereAccepted = idPeople ? { idProvider: idPeople } : {}
        whereAccepted.idService = { [Sequelize.Op.ne]: 0 }
        whereAccepted.state = [STATE_COMPLETED, STATE_RATINGPROVIDERPENDING, STATE_ACCEPTED, STATE_RATINGCUSTOMERPENDING, STATE_RATINGPENDING]

        query = await Opportunities.findAll({
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('"opportunities"."idOpportunitie"')), 'Cantidad']
            ],
            where: whereAccepted
        });

        indicadoresPersonales.cantidadContrataciones = query ? query[0].dataValues.Cantidad : 0

        //cantidad de oportunidades en view
        let whereView = idPeople ? { idProvider: idPeople } : {}
        whereView.state = STATE_VIEW

        query = await Opportunities.findAll({
            attributes: [
                [Sequelize.fn('COUNT', Sequelize.col('"opportunities"."idOpportunitie"')), 'Cantidad']
            ],
            where: whereView
        });
        indicadoresPersonales.cantidadViews = query ? query[0].dataValues.Cantidad : 0

        //servicios contratados del proveedor
        let whereHiring = idPeople ? { idProvider: idPeople } : {}
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
                attributes: [],
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
        let whereLastComment = idPeople ? { idProvider: idPeople } : {}
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
            rating: query ? query.dataValues.rating : 0,
            fecha: query ? formatDate(query.dataValues.fecha) : "",
            review: query ? query.dataValues.review : "Sin comentarios cargados",
            cliente: query ? query.dataValues.customer.fullName : 0,
            servicio: query ? query.dataValues.service : ''
        }

        //historial de contrataciones ultimp mes por semana
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        let whereOpportunitiesByWeek = idPeople ? { idProvider: idPeople } : {}
        whereOpportunitiesByWeek.dateView = {
            [Sequelize.Op.gte]: firstDayOfMonth,
            [Sequelize.Op.lte]: currentDate
        }


        query = await Opportunities.findAll({
            attributes: [
                [Sequelize.literal(`EXTRACT('week' FROM "dateView") - EXTRACT('week' FROM date_trunc('month', "dateView")) + 1`), 'week'],
                [Sequelize.fn('SUM', Sequelize.literal('CASE WHEN ("idService" = 0 or "idService" is null) THEN 1 ELSE 0 END')), 'countOpp'],
                [Sequelize.fn('SUM', Sequelize.literal('CASE WHEN "idService" != 0 THEN 1 ELSE 0 END')), 'countServices'],
                [Sequelize.fn('SUM', Sequelize.literal(`CASE WHEN "state" in('${STATE_ACCEPTED}','${STATE_COMPLETED}','${STATE_RATINGPROVIDERPENDING}',
                '${STATE_RATINGCUSTOMERPENDING}','${STATE_RATINGPENDING}') THEN 1 ELSE 0 END`)), 'countAccepted']
            ],
            where: whereOpportunitiesByWeek,
            group: [Sequelize.literal(`EXTRACT('week' FROM "dateView") - EXTRACT('week' FROM date_trunc('month', "dateView")) + 1`)],
            order: [Sequelize.literal(`EXTRACT('week' FROM "dateView") - EXTRACT('week' FROM date_trunc('month', "dateView")) + 1`)]

        })
        const opportunitiesByWeek = []
        query.forEach(value => {
            opportunitiesByWeek.push({
                ejex: value.dataValues.week,
                Oportunidades: value.dataValues.countOpp,
                Solicitudes: value.dataValues.countServices,
                Contrataciones: value.dataValues.countAccepted
            })
        })

        //salida
        const data = {
            indicadoresPersonales: indicadoresPersonales,
            serviciosMasBuscados: mostSearchedCategories,
            misServiciosMasContratados: mostSearchedServices,
            opportunidadesPorSemana: opportunitiesByWeek,
            ultimoComentario: lastComment
        }
        return { data }

    } catch (error) {
        console.log("ProviderStats: ", error);
        throw error;
    }
}

module.exports = { getProviderStatsService };
