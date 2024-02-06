const mercadopago = require("mercadopago");

const paymentController = async (req, res) => {

    mercadopago.configure({
        access_token:"TEST-2497160309954110-010921-8f1c25f504b796d7a5f8eaee8bc5be5b-1632191008",
    });

    const result = await mercadopago.preferences.create({
        items: [
            {
                title: "Taza de te",
                unit_price: 100,
                currency_id: "ARS",
                quantity: 1
            }
        ],
        back_urls: {
            success: "https://proyecto-final-front-ashy.vercel.app/",
            failure: "https://proyecto-final-front-ashy.vercel.app/",
            pending: "https://proyecto-final-front-ashy.vercel.app/",
        },
        notification_url: "https://e9ea-2803-9800-9013-b4eb-5ed8-c52-8a20-4896.ngrok-free.app/webhook"
    });

    console.log(result);
    res.send(result.body);


}

module.exports = paymentController;