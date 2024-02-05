const mercadopago = require('mercadopago');
const { MP_TOKEN } = process.env;

const createPreference = (req, res) => {

    mercadopago.configure({
        access_token: MP_TOKEN
    });

    let preference = {
        items: [
            {
                title: req.body.items.description,
                unit_price: parseFloat(req.body.items.price),
                quantity: parseInt(req.body.items.quantity, 10),
                currency_id: req.body.items.currency_id
            }
        ],
        back_urls: {
            success: "https://proyecto-final-front-ashy.vercel.app/feedback",//*aqui es donde vuelve luego de hacer la req a MP
            //Luego les indicaremos a donde necesitamos que vuelva
            failure: "https://proyecto-final-front-ashy.vercel.app/feedback",//*aqui es donde vuelve luego de hacer la req a MP
            //Luego les indicaremos a donde los llevará cuando la req sea failure.
            pending: "",
            // Inicialmente no vamos a utilizar el pending
        },
        auto_return: "approved",
        "notification_url": "https://proyecto-final-front-ashy.vercel.app/feedback"

    };

    const datosDelPagador = {
        name: req.body.payer.name,
        email: req.body.payer.email,
        password: req.body.payer.password,
        birthDate: req.body.payer.birthDate,
        typeOfPerson: req.body.payer.typeOfPerson
    }

    console.log("dataParaMP", preference.items[0]);
    console.log("PAgador: ", datosDelPagador);

    mercadopago.preferences.create(preference)
        .then(function (response) {
            res.json({
                id: response.body.id
            });
            console.log(response)
        }).catch(function (error) {
            console.log(error);
            res.status(500).send('Error al crear la preferencia');
        })

}

module.exports = createPreference;