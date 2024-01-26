const axios = require('axios');
const { formattedGeolocation } = require("../../utils/formattedGeolocation.util");
require('dotenv').config();
const { MUNICIPALITIES } = process.env;

const getMunicipalitiesService = async (province) => {

    try {
        const result = await axios(`${MUNICIPALITIES}${province}&aplanar`);
        const originalData = result.data;

        console.log("TIAGO: ", originalData);

        const data = formattedGeolocation(originalData)

        return data;
    } catch (error) {
        console.log("service: ", error);
        throw error;
    }
}

module.exports = { getMunicipalitiesService };