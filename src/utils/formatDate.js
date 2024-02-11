const formatDate = (fechaRecibida) => {
    const fecha = new Date(fechaRecibida + 'T00:00:00');

    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const año = fecha.getFullYear();

    // Formatear la fecha como día-mes-año
    return `${dia < 10 ? '0' : ''}${dia}-${mes < 10 ? '0' : ''}${mes}-${año}`;

}
module.exports = {formatDate}