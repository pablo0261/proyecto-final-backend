const axios = require('axios');
const { formattedGeolocation } = require("../../utils/formattedGeolocation.util");
require('dotenv').config();
const { PROVINCES } = process.env;

const getProvincesService = async () => {

    try {
        const result = await axios(PROVINCES);
        const originalData = result.data;
        const data = formattedGeolocation(originalData)

        return data;
    } catch (error) {
        throw error;
    }
}

module.exports = { getProvincesService };