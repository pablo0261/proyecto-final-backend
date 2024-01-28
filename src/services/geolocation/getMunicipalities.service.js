const axios = require('axios');
const { formattedGeolocation } = require("../../utils/formattedGeolocation.util");
const { URL_MUNICIPALITIES } = require("../../constants");

const getMunicipalitiesService = async (id, name, idProvince, province) => {
    let municipalities = URL_MUNICIPALITIES
    let separator = '?'
    if (id) {
        municipalities = municipalities + `${separator}id=${id}`
        if (separator === '?') separator = '&'
    }
    if (name) {
        municipalities = municipalities + `${separator}nombre=${name}`
        if (separator === '?') separator = '&'
    }
    if (idProvince) {
        municipalities = municipalities + `{$separator}provincia=${idProvince}&max=500`
        if (separator === '?') separator = '&'
    }
    if (province) {
        municipalities = municipalities + `${separator}provincia=${province}&max=500`
        if (separator === '?') separator = '&'
    }

    try {
        const result = await axios(`${municipalities}`);
        const originalData = result.data;

        const data = formattedGeolocation(originalData)
        return data;
    } catch (error) {
        console.log("service: ", error);
        throw error;
    }
}

module.exports = { getMunicipalitiesService };