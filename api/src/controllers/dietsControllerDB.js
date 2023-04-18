const { Diet } = require("../db");
const { getRecipesInApi } = require("./recipesController");

const getDietsByApi = async () => {
  let allDiets = [];

  const getRecipes = await getRecipesInApi();
  const mapDiets = await getRecipes?.map((e) => e.diets);
  mapDiets.forEach((e) => e.forEach((dietByDiet) => allDiets.push(dietByDiet)));
  return [...new Set(allDiets)];
};

const saveDietsInDB = async () => {
  try {
    const apiDiets = await getDietsByApi();

    apiDiets.forEach((e) => {
      Diet.findOrCreate({ where: { name: e } });
    });
  } catch (error) {
    return { error: "Error on create diets in DB" };
  }
};

// solo retorna dietas en base de datos
const getAllDiets = async () => {
  return await Diet.findAll();
};

module.exports = {
  getDietsByApi,
  getAllDiets,
  saveDietsInDB,
};
