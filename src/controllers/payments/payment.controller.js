const mercadopago = require("mercadopago");
const { MP_TOKEN, MP_WEBWOOK, MP_SUCCESS, MP_FAILURE, MP_PENDING } = process.env;
const { validator } = require("../../utils/validator.util");
const { checkEmailExists } = require("../../utils/checkEmailExists.util.js");

const paymentController = async (req, res) => {
    const params = req.body;

    const emailExists = await checkEmailExists(params.email);

    if (emailExists) {
        return res.status(409).json({ error: "El correo electrónico ya está registrado." });
    }

    const errors = validator(params);

    if (Object.keys(errors).length !== 0) {
        return res.status(400).json(errors);
    }

    mercadopago.configure({
        access_token: MP_TOKEN,
    });

    const result = await mercadopago.preferences.create({
        items: [
            {
                title: "Subscripción",
                unit_price: 1200,
                currency_id: "ARS",
                quantity: 1
            }
        ],
        back_urls: {
            success: `${MP_SUCCESS}`,
            failure: MP_FAILURE,
            pending: MP_PENDING
        },
        notification_url: `${MP_WEBWOOK}/webhook`,
        metadata: {
            id_people: "",
            full_name: params.fullName,
            birth_date: params.birthDate,
            email: params.email,
            password: params.password,
            type_of_person: params.typeOfPerson
        },
        auto_return: "approved"
    });

    const data = {
        urlPayment: result.body.init_point
    }

    console.log("wook", MP_WEBWOOK)

    return res.status(200).json(data);

}

module.exports = paymentController;