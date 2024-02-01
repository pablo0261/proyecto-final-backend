const axios = require('axios');
const { formattedGeolocation } = require("../../utils/formattedGeolocation.util");
const { URL_MUNICIPALITIES } = require("../../constants");

const getMunicipalitiesService = async (id, name, idProvince, province) => {
    let urlMunicipalities = URL_MUNICIPALITIES
    let separator = '?'
    if (id) {
        urlMunicipalities = urlMunicipalities + `${separator}id=${id}`
        if (separator === '?') separator = '&'
    }
    if (name) {
        urlMunicipalities = urlMunicipalities + `${separator}nombre=${name}`
        if (separator === '?') separator = '&'
    }
    if (idProvince) {
        urlMunicipalities = urlMunicipalities + `{$separator}provincia=${idProvince}&max=500`
        if (separator === '?') separator = '&'
    }
    if (province) {
        urlMunicipalities = urlMunicipalities + `${separator}provincia=${province}&max=500`
        if (separator === '?') separator = '&'
    }

    try {
        const requestOptions = {
            method: 'GET', // Método HTTP (GET en este caso)
            headers: {
              'Content-Type': 'application/json', // Puedes ajustar los encabezados según sea necesario
            },
          };
          
        const response = await fetch(urlMunicipalities,requestOptions);
        const data = await response.json();
        const municipalities = formattedGeolocation(data)
        return municipalities;

    } catch (error) {
        throw error;
    }
}

module.exports = { getMunicipalitiesService };