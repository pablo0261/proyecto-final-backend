const axios = require('axios');
const { formattedGeolocation } = require("../../utils/formattedGeolocation.util");
const { provinces } = require("../../constants");

const getProvincesService = async () => {

    try {
        const result = await axios(provinces);
        const originalData = result.data;
        const data = formattedGeolocation(originalData)

        return data;
    } catch (error) {
        throw error;
    }
}

module.exports = { getProvincesService };