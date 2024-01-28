const formattedGeolocation = (originalData) => {
    let formattedData = {};

    if(originalData.provincias) {
        formattedData = {
            count: originalData.cantidad,
            data: originalData.provincias.map(province => ({
                idProvincia: province.id,
                nombre: province.nombre,
                lat: province.centroide.lat,
                lon: province.centroide.lon
            }))
        };
    } else if(originalData.municipios) {
        formattedData = {
            count: originalData.cantidad,
            data: originalData.municipios.map(municipio => ({
                idLocalidad: municipio.id,
                nombreLocalidad: municipio.nombre,
                lat: municipio.centroide.lat,
                lon: municipio.centroide.lon,
                idProvincia:municipio.provincia.id,
                nombreProvincia:municipio.provincia.nombre
            }))
        };
    }
    return formattedData;

};

module.exports = { formattedGeolocation }