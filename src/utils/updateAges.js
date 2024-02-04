const updateAges = async (instance) => {
    const today = new Date();
    const birthDateStr = instance.getDataValue('birthDate');

    const birthDate = new Date(birthDateStr);

    if (birthDate instanceof Date) {
        let age = today.getFullYear() - birthDate.getFullYear();
        if (
            today.getMonth() < birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
        ) {
            age--; // Resta 1 año si aún no ha cumplido años este año
        }
        await instance.update({ age });
    }
};

module.exports = updateAges;