const { Opportunities } = require("../../db");

const getOpportunitiesService = async () => {
  const opportunitiesData = await Opportunities.findAll();
  return opportunitiesData;
};

const createOpportunity = async (opportunityData) => {
  const createdOpportunity = await Opportunities.create(opportunityData);
  return createdOpportunity;
};

module.exports = {
  getOpportunitiesService,
  createOpportunity,
};
