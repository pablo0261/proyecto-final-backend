const { People, People_logins } = require('../../db');

const { v4: uuidv4 } = require('uuid');

const loginPeopleService = async (email, password) => {
  const people = await People.findOne({
    where: { email, password },
  });

  if (people) {
    const currentDate = new Date();
    const idPeople = people.idPeople;

    people.logged = true;
    await people.save();

    await People_logins.create({
      id: uuidv4(),
      idPeople,
      loginDate: currentDate,
    });
    return idPeople;
  }
};

module.exports = loginPeopleService;
