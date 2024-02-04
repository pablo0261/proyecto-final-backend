const mercadopago = require('mercadopago');
const { MP_TOKEN } = process.env;

const createPreference = (req, res) => {

    console.log("BODY", req.body);

    mercadopago.configure({
        access_token: MP_TOKEN
    });

    let preference = {
        items: [
            {
                title: req.body.description,
                unit_price: parseFloat(req.body.unit_price),
                quantity: parseInt(req.body.quantity, 10)
            }
        ],
        back_urls: {
            success: "http://localhost:5173/feedback",//*aqui es donde vuelve luego de hacer la req a MP
            //Luego les indicaremos a donde necesitamos que vuelva
            failure: "http://localhost:5173/feedback",//*aqui es donde vuelve luego de hacer la req a MP
            //Luego les indicaremos a donde los llevará cuando la req sea failure.
            pending: "",
            // Inicialmente no vamos a utilizar el pending
        },
        auto_return: "approved",
        "notification_url": "http://localhost:5173/feedback"

    };

    mercadopago.preferences.create(preference)
        .then(function (response) {
            res.json({
                id: response.body.id
            });
            console.log("HOLA", response);
        }).catch(function (error) {
            console.log(error);
            res.status(500).send('Error al crear la preferencia');
        })

}

module.exports = createPreference;