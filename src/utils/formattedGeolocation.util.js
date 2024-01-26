const formattedGeolocation = (originalData) => {
    let formattedData = {};

    if(originalData.provincias) {
        formattedData = {
            count: originalData.cantidad,
            data: originalData.provincias.map(province => ({
                id: province.id,
                nombre: province.nombre,
                lat: province.centroide.lat,
                lon: province.centroide.lon
            }))
        };
    } else if(originalData.municipios) {
        formattedData = {
            count: originalData.cantidad,
            data: originalData.municipios.map(municipio => ({
                id: municipio.id,
                nombre: municipio.nombre,
                lat: municipio.centroide_lat,
                lon: municipio.centroide_lon
            }))
        };
    }

    return formattedData;

};

module.exports = { formattedGeolocation }