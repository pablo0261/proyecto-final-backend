const { v4: uuidv4 } = require('uuid');
const { Opportunities, Categories_options } = require('../../db');
const { STATE_VIEW, STATE_PENDING, STATE_ACCEPTED, STATE_CANCELLED, STATE_RATINGPENDING, STATE_RATINGPROVIDERPENDING, STATE_RATINGCUSTOMERPENDING, STATE_COMPLETED, USER_CUSTOMER, USER_PROVIDER } = require('../../constants');
const { getOpportunitiesService } = require('./getOpportunities.service');
const { putRatingService } = require('../people/putPeople.service');
const postChatsService = require('../chats/postChats.service');
const { default: formatDate } = require('../../utils/formatDate');

const CHAT_MESSAGE_PENDING = `Ha sido contratado para el %DIA% a las %HORA% hora(s), por %DURACION% hora(s) de %SERVICIO% por un valor de $%PRECIO%`

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
        idPeopleWhoCancel,
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

        let newChat = {}
        let message = ''

        //cancelar se puede en cualquier momento
        if (cancelled) {
            if (!reasonForCancelation) return { result: { message: 'Falta motivo de cancelacion' }, status: 400 }
            if (!idPeopleWhoCancel) return { result: { message: 'Falta persona que cancelo' }, status: 400 }

            opportunitie.dateCancelled = currentDate
            opportunitie.reasonForCancelation = reasonForCancelation
            opportunitie.idPeopleWhoCancel = idPeopleWhoCancel
            opportunitie.state = STATE_CANCELLED
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

                    //busco el servicio
                    const service = await Categories_options.findByPk(idService)
                    console.log(service.dataValues.description)
                    
                    //envio automaticamente el chat 

                    newChat = {
                        idOpportunitie: opportunitie.idOpportunitie,
                        idPeople: opportunitie.idProvider,
                        message: CHAT_MESSAGE_PENDING
                            .replace('%DIA%', formatDate(dateOfService))
                            .replace('%HORA%', timeOfService)
                            .replace('%DURACION%', durationOfService)
                            .replace('%SERVICIO%', service.dataValues.description)
                            .replace('%PRECIO%', price),
                        isRating: false,
                        isRated: false
                    }
                    console.log(newChat)
                    postChatsService(newChat)

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
                        idPeople: opportunitie.idProvider,
                        message: 'Por favor evalue al Cliente',
                        isRating: true,
                        isRated: false
                    }
                    postChatsService(newChat)

                    newChat = {
                        idOpportunitie: opportunitie.idOpportunitie,
                        idPeople: opportunitie.idCustomer,
                        message: 'Por favor evalue el servicio recibido',
                        isRating: true,
                        isRated: false
                    }
                    postChatsService(newChat)
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

        result = await getOpportunitiesService({ idOpportunitie: idOpportunitie })
        return { result, status: 200 };


    } catch (error) {
        return { error: error.message, status: 500 };
    };
}

module.exports = { putOpportunitiesService };
