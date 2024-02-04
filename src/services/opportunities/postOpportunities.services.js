const { v4: uuidv4 } = require('uuid');
const { Opportunities } = require('../../db');
const { STATE_VIEW } = require('../../constants');

const postOpportunitiesService = async (params) => {
  try {
    const { idCustomer, idProvider,} = params

    const currentDate = new Date();
    

    if (!idCustomer) return { result: { message: 'Falta id de Cliente' }, status: 400 }
    if (!idProvider) return { result: { message: 'Falta id de Proveedor' }, status: 400 }

    const idOpportunitie = uuidv4()
    const [result, created] = await Opportunities.findOrCreate({
        where: { idOpportunitie },
        defaults: {
          idOpportunitie,
          idCustomer,
          idProvider,
          dateView: currentDate,
          state: STATE_VIEW
        },
      });
    
    return { result, status: created ? 201 : 409 };

  } catch (error) {
    return { error: error.message, status: 500 };
  };
}


module.exports = { postOpportunitiesService };
