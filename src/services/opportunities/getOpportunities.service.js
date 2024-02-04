
const { Sequelize, Op } = require("sequelize");
const { Opportunities, conn } = require("../../db.js");
const { PAGESIZE } = require("../../constants/index.js");

const getOpportunitiesService = async (params) => {
    const opportunitiesFields = [
        'idOpportunitie',
        'idCustomer',
        'idProvider',
        'state',
        'dateView',
        'idService',
        'dateHiring',
        'dateEstimateCompletion',
        'price',
        'dateOk',
        'dateCancelled',
        'reasonForCancelation',
        'idPeopleWhoCancel',
        'dateEndService',
        'ratingCustomer',
        'ratingProvider',
        'reviewCustomer',
        'reviewProvider']


    const { idOrder, pageSize, pageNumber } = params
    const filters = []

    //armo un objeto solo con los campos de people asi no me da error el sequelize por filtrar nombre de campo inexistente
    let filterOpportunities = Object.fromEntries(
        Object.entries(params).filter(([key]) => opportunitiesFields.includes(key)))

    //sequelize acepta filtros como array de objetosç
    //primer paso los de la ptabla people
    filters.push(filterOpportunities)

    //paginado
    const page = pageNumber ? pageNumber : 1
    const itemsPage = pageSize ? pageSize : PAGESIZE
    const offset = (page - 1) * itemsPage;

    //order
    const orders = []
    if (!idOrder) {
        orders.push(['dateView', 'ASC'])
    } else {

        //armo arrays separados por ;
        const orderField = idOrder.split(';')
        orderField.map((order) => {
            //armo array separado por ,
            const field = order.split(',')
            orders.push([field[0], field[1] ? field[1] : 'ASC'])
        })
    }
    try {
        //total de registros
        const totalCount = await Opportunities.count(
            {
                where: {
                    [Sequelize.Op.and]: filters
                },
            }
        )

        //registros
        let result = await Opportunities.findAll(
            {
                limit: itemsPage,
                offset: offset,
                where: {
                    [Sequelize.Op.and]: filters
                },
                order: orders,
            },
        )

        const count = result.length;
        const opportunities = {
            totalCount: totalCount,
            totalOfPages: Math.ceil(totalCount / itemsPage),
            count: count,
            pageSize: parseInt(itemsPage),
            pageNumber: parseInt(page),
            filter: filters,
            data: result
        }
        return { opportunities, status: totalCount === 0 ? 409 : 200 };

    } catch (error) {
        throw error;
    }
}

module.exports = { getOpportunitiesService }

