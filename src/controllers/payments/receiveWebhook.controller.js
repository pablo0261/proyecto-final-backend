const mercadopago = require("mercadopago");
const {postPeopleService} = require("../../services/people/postPeople.service")
const { validator } = require("../../utils/validator.util");
const { hashPassword } = require("../../utils/encrypt.util.js");
const { v4: uuidv4 } = require('uuid');


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
            }

            if (!params.idPeople) {
                params.idPeople = uuidv4();
            }

            const { fullName, birthDate,
                email, password,
            } = req.body


            

            // const errors = validator(params);

            // if (Object.keys(errors).length !== 0) {
            //     return res.status(400).json(errors);
            // }

            console.log("hola aqui estoy");


            if (email && password) { 
                if (!fullName || !birthDate) { 
                    return res.status(400).json({ error: "Faltan Datos." })
                }
                // encriptacion de la contraseña
                params.password = await hashPassword(password);

            }

            const result = await postPeopleService(params);

            console.log("RESULTADO: ", result);
        }

        res.sendStatus(204);
    } catch (error) {
        console.log("WEBHOOK: ", error);
        return res.sendStatus(500);
    }
}

module.exports = receiveWebhookController;