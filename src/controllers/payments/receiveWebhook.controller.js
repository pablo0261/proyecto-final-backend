const mercadopago = require("mercadopago");
const { postPeopleService } = require("../../services/people/postPeople.service")
const { v4: uuidv4 } = require('uuid');
const { postPeopleUtil } = require("../../utils/postPeople.util");
const { convertDate } = require("../../utils/convertDate.util");
const { add30Days } = require("../../utils/add30Days.util");

const receiveWebhookController = async (req, res) => {

    const payment = req.query;
    let data = null;

    try {
        if (payment.type === "payment") {
            data = await mercadopago.payment.findById(payment["data.id"]);
        }

        if (data && data.response.status === "approved") {
            const params = {
                idPeople: data.response.metadata.id_people,
                fullName: data.response.metadata.full_name,
                birthDate: data.response.metadata.birth_date,
                email: data.response.metadata.email,
                password: data.response.metadata.password,
                typeOfPerson: data.response.metadata.type_of_person,
                methodOfPayment: data.response.payment_method.id,
                price: data.response.transaction_details.total_paid_amount,
                responseApi: payment["data.id"]
            }

            let baseDate = data.response.date_approved;
            params.emisionDate = convertDate(baseDate);
            params.paymentDay = add30Days(baseDate);

            if (!params.idPeople) {
                params.idPeople = uuidv4();
            }

            const { params: validatedParams, errors } = await postPeopleUtil(params);

            if (errors && Object.keys(errors).length !== 0) {
                return res.status(400).json(errors);
            }

            const result = await postPeopleService(validatedParams);

        }

        res.sendStatus(204);
    } catch (error) {
        console.log("WEBHOOK: ", error);
        return res.sendStatus(500);
    }
}

module.exports = receiveWebhookController;