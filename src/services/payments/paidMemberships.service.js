const { Payments } = require('../../db.js');

const paidMembershipsService = async (filter) => {
    try {
        const data = await Payments.findAll({ where: filter });

        console.log("datos de pago: ", data);
        return data;
    } catch (error) {
        console.log("service: ", error);
        throw error;
    }
}

module.exports = { paidMembershipsService };