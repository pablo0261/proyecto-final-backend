const { Payments, sequelize } = require('../../db.js');
const { Op } = require('sequelize');

const paidMembershipsService = async (filter) => {

    console.log("idPeople: ", filter.idPeople);
    try {

        const whereCondition = filter.idPeople ? { paymentDay: null, idPeople: filter.idPeople } : { paymentDay: null };

        const countNullPaymentDay = await Payments.count({
            where: whereCondition
        });

        const payment = await Payments.findOne({
            attributes: ['price'],
            where: whereCondition
        });

        const fixedPrice = payment ? payment.price : 0;

        const total = countNullPaymentDay * fixedPrice;

        const nullPaymentDayRecords = await Payments.findAll({
            where: whereCondition
        });

        const info = {
            count: countNullPaymentDay,
            total: total,
            data: nullPaymentDayRecords
        };

        return info;
    } catch (error) {
        console.log("service: ", error);
        throw error;
    }
}

module.exports = { paidMembershipsService };
