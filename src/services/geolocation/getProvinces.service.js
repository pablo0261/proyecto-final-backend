const axios = require('axios');
const { formattedGeolocation } = require("../../utils/formattedGeolocation.util");
const { URL_PROVINCES } = require("../../constants");

const getProvincesService = async (id) => {
    let provinces=URL_PROVINCES

    if (id) provinces=provinces+`?id=${id}`
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