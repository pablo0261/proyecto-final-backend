const mercadopago = require("mercadopago");
const { MP_TOKEN, MP_WEBWOOK } = process.env;
const { validator } = require("../../utils/validator.util");


const paymentController = async (req, res) => {
    const params = req.body;

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
            success: "https://proyecto-final-front-ashy.vercel.app/accessAccount",
            failure: "https://proyecto-final-front-ashy.vercel.app",
            pending: "https://proyecto-final-front-ashy.vercel.app",
        },
        notification_url: `${MP_WEBWOOK}/webhook`,
        metadata: {
            id_people: "",
            full_name: params.fullName,
            birth_date: params.birthDate,
            email: params.email,
            password: params.password,
            type_of_person: params.typeOfPerson
        }
    });

    const data = {
        urlPayment: result.body.init_point
    }

    return res.status(200).json(data);

}

module.exports = paymentController;