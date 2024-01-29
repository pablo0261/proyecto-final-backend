const { People } = require('../../db');
const { getPeopleByIdService } = require('./getPeopleById.service');

const loginPeopleService = async (email, password) => {
  const people = await People.findOne({
    where: { email, password },
  });

  if (people) {
    people.logged = true;
    await people.save();
    return people.idPeople;
  }
};

module.exports = loginPeopleService;
