const { Payments, sequelize, People } = require('../../db.js');
const { Op } = require('sequelize');

const paidMembershipsService = async (filter) => {

    const whereCondition = {};
    if (filter.idPeople) whereCondition.idPeople = filter.idPeople;
    if (filter.onlyDebts) whereCondition.paymentDay = null;

    try {
        const deudas = await Payments.findAll({
            attributes: ['emisionDate', 'dueDate', 'price', 'paymentDay'],
            where: whereCondition,
            include: {
                model: People,
                attributes: ['idPeople','fullName', 'email','state'],
            }

        });

        let cantidadDeudas = 0;
        let totalDeuda = 0;
        const data = [];
        let result = null;



        deudas.forEach(deuda => {
            if (deuda.dataValues.paymentDay === null) {
                cantidadDeudas++;
                totalDeuda += parseFloat(deuda.dataValues.price);
                data.push(deuda.dataValues);
            } else if (deuda.dataValues.paymentDay !== null) {
                data.push(deuda.dataValues);
            }
        });

        result = {
            cantidadDeudas,
            totalDeuda,
            data
        }


        return result
    } catch (error) {
        console.log("Error al procesar deudas: ", error);
        throw error;
    }

}

module.exports = { paidMembershipsService };
