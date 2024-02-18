const { Payments } = require('../../db.js');
const { paidMembershipsService } = require('../../services/payments/paidMemberships.service');


const updatePaidMembershipsService = async (params) => {
    const {
        idPayment,
        idPeople,
        emisionDate,
        dueDate,
        paymentDay,
        methodOfPayment,
        price,
        responseApi } = params;

    try {
        const newData = {
            idPayment,
            idPeople,
            emisionDate,
            dueDate,
            paymentDay,
            methodOfPayment,
            price,
            responseApi
        };

        await Payments.update(newData, { where: { idPayment: newData.idPayment } });

        const result = await paidMembershipsService({ idPayment: idPayment });
        return { result };


    } catch (error) {
        console.log("service: ", error);
        throw error
    }

}

module.exports = { updatePaidMembershipsService }