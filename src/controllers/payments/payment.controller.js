const mercadopago = require("mercadopago");
const { MP_TOKEN, MP_WEBWOOK } = process.env;


const paymentController = async (req, res) => {
    const person = req.body;

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
            success: "https://www.soyhenry.com",
            failure: "https://www.soyhenry.com",
            pending: "https://www.soyhenry.com",
        },
        notification_url: `${MP_WEBWOOK}/webhook`,
        metadata: {
            id_people: "",
            full_name: person.fullName,
            birth_date: person.birthDate,
            email: person.email,
            password: person.password,
            type_of_person: person.typeOfPerson
        }
    });

    const data = {
        urlPayment: result.body.init_point
    }

    return res.status(200).json(data);

}

module.exports = paymentController;