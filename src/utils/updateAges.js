const {conn,People}=require('../db')

const updateAges = async (params) => {
    const today = new Date();

    const allPeople = await People.findAll({
        where: conn.literal(`EXTRACT( DAY FROM "birthDate") = ${today.getDate()} AND EXTRACT ( MONTH FROM "birthDate") = ${today.getMonth() + 1}`),
    });
    await Promise.all(allPeople.map(async (person) => {

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
    }))
}
module.exports = updateAges;