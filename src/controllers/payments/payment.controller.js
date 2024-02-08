const mercadopago = require("mercadopago");
const { MP_TOKEN } = process.env;


const paymentController = async (req, res) => {
    const person = req.body;

    mercadopago.configure({
        access_token: MP_TOKEN,
    });

    const result = await mercadopago.preferences.create({
        items: [
            {
                title: "Plato sucio",
                unit_price: 200,
                currency_id: "ARS",
                quantity: 1
            }
        ],
        back_urls: {
            success: "https://www.soyhenry.com",
            failure: "https://www.soyhenry.com",
            pending: "https://www.soyhenry.com",
        },
        notification_url: "https://6c6d-2803-9800-9013-b4eb-aad2-ee62-a952-d2dd.ngrok-free.app/webhook",
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