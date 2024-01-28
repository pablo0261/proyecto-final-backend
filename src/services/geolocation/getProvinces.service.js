const axios = require('axios');
const { formattedGeolocation } = require("../../utils/formattedGeolocation.util");
const { URL_PROVINCES } = require("../../constants");

const getProvincesService = async (id, name) => {
    let urlProvinces = URL_PROVINCES

    if (id) {
        urlProvinces = urlProvinces + `?id=${id}`
    } if (name) {
        urlProvinces = urlProvinces + `?nombre=${name}`
    }

    try {
        const requestOptions = {
            method: 'GET', // Método HTTP (GET en este caso)
            headers: {
              'Content-Type': 'application/json', // Puedes ajustar los encabezados según sea necesario
            },
          };
          
        const response = await fetch(urlProvinces,requestOptions)
        const data = await response.json();
        const provinces = formattedGeolocation(data)

        return provinces;
    } catch (error) {
        throw error;
    }
}

module.exports = { getProvincesService };