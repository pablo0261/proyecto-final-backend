const { v4: uuidv4 } = require('uuid');
const { Opportunities } = require('../../db');
const { STATE_VIEW, STATE_PENDING, STATE_ACCEPTED, STATE_CANCELLED, STATE_RATINGPENDING, STATE_RATINGPROVIDERPENDING, STATE_RATINGCUSTOMERPENDING, STATE_COMPLETED } = require('../../constants');
const { getOpportunitiesService } = require('./getOpportunities.service');
const { putRatingService } = require('../people/putRating.service');

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
    ratingCustomer,
    ratingProvider,
    reviewCustomer,
    reviewProvider,
    accepted,
    cancelled,
  } = params

  let updateRating = false

  try {
    const currentDate = new Date();

    if (!idOpportunitie) return { result: { message: 'Falta id de oportunidad' }, status: 400 }
    if (!idPeople) return { result: { message: 'Falta id de persona' }, status: 400 }

    const opportunitie = await Opportunities.findByPk(idOpportunitie);

    const newData = {}

    if (cancelled) {
      if (!reasonForCancelation) return { result: { message: 'Falta motivo de cancelacion' }, status: 400 }
      if (!idPeopleWhoCancel) return { result: { message: 'Falta persona que cancelo' }, status: 400 }

      newData.dateCancelled = currentDate
      newData.reasonForCancelation = reasonForCancelation
      newData.idPeopleWhoCancel = idPeopleWhoCancel
      newData.state = STATE_CANCELLED
    } else {
      switch (opportunitie.state) {
        case STATE_VIEW:
          if (!idService) return { result: { message: 'Falta codigo de servicio' }, status: 400 }
          if (!price) return { result: { message: 'Falta precio' }, status: 400 }
          if (!dateOfService) return { result: { message: 'Falta fecha de servicio' }, status: 400 }
          if (!timeOfService) return { result: { message: 'Falta hora de servicio' }, status: 400 }
          if (!durationOfService) return { result: { message: 'Falta duracion de servicio' }, status: 400 }


          newData.idService = idService
          newData.price = price
          newData.dateHiring = currentDate
          newData.dateOfService = dateOfService
          newData.timeOfService = timeOfService
          newData.durationOfService = durationOfService
          newData.state = STATE_PENDING
          break;

        case STATE_PENDING:
          if (accepted) {
            newData.dateAccepted = currentDate
            newData.state = STATE_ACCEPTED
          }
          break;

        case STATE_ACCEPTED:
          if (!dateEndService) return { result: { message: 'Falta Fecha de fin de servicio' }, status: 400 }

          newData.dateEndService = currentDate
          newData.state = STATE_RATINGPENDING
          break;

        case STATE_RATINGPENDING:
        case STATE_RATINGCUSTOMERPENDING:
        case STATE_RATINGPROVIDERPENDING:
        case STATE_COMPLETED:

          if (ratingCustomer) {
            if (!reviewCustomer) return { result: { message: 'Falta review de Cliente' }, status: 400 }

            newData.ratingCustomer = ratingCustomer
            newData.dateRatingCustomer = currentDate
            newData.reviewCustomer = reviewCustomer
            if (opportunitie.state === STATE_RATINGPENDING || opportunitie.state === STATE_RATINGPROVIDERPENDING) {
              newData.state = STATE_RATINGPROVIDERPENDING
            } else {
              newData.state = STATE_COMPLETED
            }
            updateRating = true

          } else if (ratingProvider) {
            if (!reviewProvider) return { result: { message: 'Falta review de proveedor' }, status: 400 }

            newData.ratingProvider = ratingProvider
            newData.dateRatingProvider = currentDate
            newData.reviewProvider = reviewProvider
            if (opportunitie.state === STATE_RATINGPENDING || opportunitie.state === STATE_RATINGCUSTOMERPENDING) {
              newData.state = STATE_RATINGCUSTOMERPENDING
            } else {
              newData.state = STATE_COMPLETED
            }
            updateRating = true
          }
          break;

        default:
          break;
      }
    }
    await Opportunities.update(newData, { where: { idOpportunitie: idOpportunitie } });
    if (updateRating) putRatingService(idPeople)
    console.log(updateRating)
    result = await getOpportunitiesService({ idOpportunitie: idOpportunitie })
    return { result, status: 200 };


  } catch (error) {
    console.log(error)
    return { error: error.message, status: 500 };
  };
}

module.exports = { putOpportunitiesService };
