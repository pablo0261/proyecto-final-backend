// const { createOpportunity } = require("../../services/opportunities/opportunities.service");

// const postOpportunities = async (req, res) => {
//   try {
//     const {
//       idCustomer,
//       idProvider,
//       dateQuery,
//       idService,
//       price,
//       dateHiring,
//       dateCanceled,
//       idCanceler,
//       dateServiceEnd,
//       ratingProvider,
//       ratingCustomer,
//       reviewCustomer,
//       reviewProvider,
//     } = req.body;

//     const opportunityData = {
//       idCustomer,
//       idProvider,
//       dateQuery,
//       idService,
//       price,
//       dateHiring,
//       dateCanceled,
//       idCanceler,
//       dateServiceEnd,
//       ratingProvider,
//       ratingCustomer,
//       reviewCustomer,
//       reviewProvider,
//     }; 

//     const createdOpportunity = await createOpportunity(opportunityData);

//     res.status(201).json(createdOpportunity);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error al procesar la solicitud" });
//   }
// };

// module.exports = postOpportunities;