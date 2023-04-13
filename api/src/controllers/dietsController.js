const { Diet } = require("../db");
const { getRecipesInApi } = require("../controllers/recipesController");

//Traigo las Diets de la Api, primero Trayendome la api con la funcion getRecipesInApi y despues la mapeo
const getDietsByApi = async () => {
  let allDiets = [];

  const getRecipes = await getRecipesInApi();

  const mapDiets = await getRecipes?.map((e) => e.diets);

  mapDiets.forEach((e) => e.forEach((dietByDiet) => allDiets.push(dietByDiet)));
  console.log([...new Set(allDiets)])
  return [...new Set(allDiets)];
};


//Pasando los datos a DB

const getAllDiets = async () => {
  const apiDiets = await getDietsByApi();

  apiDiets.forEach((e) => {
    Diet.findOrCreate({
      where: { name: e },
    });
  });
  const getDiets = await Diet.findAll();

  return getDiets;
};

module.exports = {
  getDietsByApi,
  getAllDiets,
};
