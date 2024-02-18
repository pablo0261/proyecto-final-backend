const { v4: uuidv4 } = require('uuid');
const { Opportunities, Categories_options, People } = require('../../db');
const { STATE_VIEW, STATE_PENDING, STATE_ACCEPTED, STATE_CANCELLED, STATE_RATINGPENDING, STATE_RATINGPROVIDERPENDING, STATE_RATINGCUSTOMERPENDING, STATE_COMPLETED, USER_CUSTOMER, USER_PROVIDER } = require('../../constants');
const { getOpportunitiesService } = require('./getOpportunities.service');
// const { putRatingService } = require('../people/putPeople.service');
const { putRatingService } = require("../../services/people/putRating.service");
const { putPeopleService } = require('../people/putPeople.service');

const postChatsService = require('../chats/postChats.service');
const { formatDate } = require('../../utils/formatDate');
const { sendMailService } = require('../sendMail/sendMail.service');

const CHAT_MESSAGE_PENDING = `Lo he contratado para el %DIA% a las %HORA% hora(s), por %DURACION% hora(s) de %SERVICIO% por un valor de $%PRECIO%`

const putOpportunitiesService = async (params) => {
    const {
        idPeople,
        idOpportunitie,
        idService,
        dateOfService,
        timeOfService,
        durationOfService,
        price,
        reasonForCancelation,
        dateEndService,
        typeOfPerson,
        rating,
        review,
        accepted,
        cancelled,
    } = params

    let updateRating = false

    try {
        const currentDate = new Date();

        if (!idOpportunitie) return { result: { message: 'Falta id de oportunidad' }, status: 400 }
        if (!idPeople) return { result: { message: 'Falta id de persona' }, status: 400 }

        const opportunitie = await Opportunities.findByPk(idOpportunitie);

        const people = await People.findByPk(idPeople);

        const customer = await People.findByPk(opportunitie.idCustomer);
        const provider = await People.findByPk(opportunitie.idProvider);

        //busco el servicio
        const service = await Categories_options.findByPk(opportunitie.idService ? opportunitie.idService : idService)

        let newChat = {}
        let message = ''

        //cancelar se puede en cualquier momento
        if (cancelled) {
            if (!reasonForCancelation) return { result: { message: 'Falta motivo de cancelacion' }, status: 400 }

            opportunitie.dateCancelled = currentDate
            opportunitie.reasonForCancelation = reasonForCancelation
            opportunitie.idPeopleWhoCancel = idPeople
            opportunitie.state = STATE_CANCELLED

            newChat = {
                idOpportunitie: opportunitie.idOpportunitie,
                idPeople: idPeople,
                message: 'El servicio fue Cancelado!',
                isRating: false,
                isRated: false
            }
            postChatsService(newChat)
            //enviarMail
            sendMailService(
                people.typeOfPerson === USER_CUSTOMER ? provider.email : customer.email, //to
                'El servicio fue Cancelado!',
                `El servicio ${service.description} del dia ${formatDate(dateOfService)} fue cancelado!`
            )


        } else {
            switch (opportunitie.state) {
                case STATE_VIEW:
                    if (!idService) return { result: { message: 'Falta codigo de servicio' }, status: 400 }
                    if (!price) return { result: { message: 'Falta precio' }, status: 400 }
                    if (!dateOfService) return { result: { message: 'Falta fecha de servicio' }, status: 400 }
                    if (!timeOfService) return { result: { message: 'Falta hora de servicio' }, status: 400 }
                    if (!durationOfService) return { result: { message: 'Falta duracion de servicio' }, status: 400 }

                    //si esta todo OK paso a pending
                    opportunitie.idService = idService
                    opportunitie.price = price
                    opportunitie.dateHiring = currentDate
                    opportunitie.dateOfService = dateOfService
                    opportunitie.timeOfService = timeOfService
                    opportunitie.durationOfService = durationOfService
                    opportunitie.state = STATE_PENDING


                    //envio automaticamente el chat 

                    newChat = {
                        idOpportunitie: opportunitie.idOpportunitie,
                        idPeople: opportunitie.idCustomer,
                        message: CHAT_MESSAGE_PENDING
                            .replace('%DIA%', formatDate(dateOfService))
                            .replace('%HORA%', timeOfService)
                            .replace('%DURACION%', durationOfService)
                            .replace('%SERVICIO%', service.description)
                            .replace('%PRECIO%', price),
                        isRating: false,
                        isRated: false
                    }
                    postChatsService(newChat)
                    //enviarMail
                    newChat.message = newChat.message +
                        `\nMi nombre es ${customer.fullName}, por favor ingrese en  https://carewithlove.onrender.com para confirmar la contratacion`
                    sendMailService(
                        people.typeOfPerson === USER_CUSTOMER ? provider.email : customer.email, //to
                        'Servicio contratado!',
                        newChat.message
                    )

                    break;

                case STATE_PENDING:
                    if (accepted) {
                        // si esta todo OK paso a accepted
                        opportunitie.dateAccepted = currentDate
                        opportunitie.state = STATE_ACCEPTED
                    }
                    break;

                case STATE_ACCEPTED:
                    if (!dateEndService) return { result: { message: 'Falta Fecha de fin de servicio' }, status: 400 }

                    // si esta todo OK paso a RatingPending    
                    opportunitie.dateEndService = currentDate
                    opportunitie.state = STATE_RATINGPENDING
                    //envio automaticamente el chat 
                    newChat = {
                        idOpportunitie: opportunitie.idOpportunitie,
                        idPeople: opportunitie.idCustomer,
                        message: 'Por favor ingrese su evaluacion',
                        isRating: true,
                        isRated: false
                    }
                    postChatsService(newChat)

                    //enviar mail
                    sendMailService(
                        customer.email,
                        'Evaluacion de servicio',
                        `Por favor evalue el servicio de ${service.description} realizado por ${provider.fullName}\n` +
                        `ingresando en https://carewithlove.onrender.com\n\n` +
                        `Muchas Gracias !!!`
                    )

                    //enviar chat
                    newChat = {
                        idOpportunitie: opportunitie.idOpportunitie,
                        idPeople: opportunitie.idProvider,
                        message: 'Por favor evalue el servicio recibido',
                        isRating: true,
                        isRated: false
                    }
                    postChatsService(newChat)
                    //enviar mail 
                    sendMailService(
                        provider.email,
                        'Evaluacion de servicio',
                        `Por favor evalue a ${customer.fullName} por el servicio de ${service.description}\n` +
                        `ingresando en https://carewithlove.onrender.com\n\n` +
                        `Muchas Gracias !!!`
                    )

                    break;

                case STATE_RATINGPENDING:
                case STATE_RATINGCUSTOMERPENDING:
                case STATE_RATINGPROVIDERPENDING:
                case STATE_COMPLETED:
                    if (!typeOfPerson) return { result: { message: 'Falta definir el tipo de persona' }, status: 400 }
                    if (!review) return { result: { message: 'Falta cargar el review' }, status: 400 }

                    // si esta todo OK 
                    if (typeOfPerson === USER_CUSTOMER) {
                        //cargo el rating del customer al proveedor
                        opportunitie.ratingCustomer = rating ? rating : 0
                        opportunitie.dateRatingCustomer = currentDate
                        opportunitie.reviewCustomer = review
                        opportunitie.state = opportunitie.dateRatingProvider ? STATE_COMPLETED : STATE_RATINGPROVIDERPENDING
                        updateRating = true
                    }
                    if (typeOfPerson === USER_PROVIDER) {
                        // cargo el ratign del provider al customer
                        opportunitie.ratingProvider = rating ? rating : 0
                        opportunitie.dateRatingProvider = currentDate
                        opportunitie.reviewProvider = review
                        opportunitie.state = opportunitie.dateRatingCustomer ? STATE_COMPLETED : STATE_RATINGCUSTOMERPENDING
                        updateRating = true
                    }
                    break;

                default:
                    break;
            }
        }
        //grabo 
        await opportunitie.save(opportunitie);
        //actualizo el rating de la persona que ranquearon
        if (updateRating) putRatingService(typeOfPerson === USER_CUSTOMER ? opportunitie.idProvider : opportunitie.idCustomer)
        const filter = people.typeOfPerson === USER_CUSTOMER ? { idCustomer: idPeople } : { idProvider: idPeople }
        result = await getOpportunitiesService(filter)
        return { result };


    } catch (error) {
        throw error
    };
}

module.exports = { putOpportunitiesService };
