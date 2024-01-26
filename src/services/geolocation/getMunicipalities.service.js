const axios = require('axios');
const { formattedGeolocation } = require("../../utils/formattedGeolocation.util");
const { municipalities } = require("../../constants");

const getMunicipalitiesService = async (province) => {

    try {
        const result = await axios(`${municipalities}${province}&aplanar`);
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