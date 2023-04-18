require("dotenv").config();
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;

// const API_KEY = "b2159194a2684224904f211382ed3a25"
//END POINT PARA TOTALRECIPES: https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100
//END POINT PARA GETRECIPESBYID: https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&number=100


//Funcion por ID. (cuando busco por id, me trae las instrucciones)
const getRecipesById = async (id) => {
  const value = isNaN(id) ? "dataBase" : "api"; //si id no es numero, value data base
  if (value === "api") {
    const data = await axios
      .get(
        `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5/${id} `
      )
      .then((response) => response.data)
      .then((data) => {
        let recivedInfo = {
          id: data.id,
          name: data.title,
          img: data.image,
          summary: data.summary,
          healthScore: data.healthScore,
          instructions: data.instructions,
          diets: data.diets,
        };
        return recivedInfo;
      });
    return data;
  } else {
    return await Recipe.findByPk(id, { include: Diet }); //si no encuentra en la APi va a buscar a la db
  }
};

//Primera funcion. Traigo info de la API
const getRecipesInApi = async () => {
  const apiUrl = await axios.get(
    `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`
  );
  const apiInfo = await apiUrl.data.results?.map((e) => {
    return {
      id: e.id,
      name: e.title,
      img: e.image,
      summary: e.summary, //resumen del plato
      healthScore: e.healthScore,
      instructions: e.instructions, //paso a paso
      diets: e.diets
    };
  });
  
  return apiInfo;
};

//Segunda funcion, Traigo info de DB
const getRecipesInDb = async () => {
  const recipe = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      througth: {
        attributes: [],
      },
    },
  });
  return recipe;
};

//Tercera funcion. Concateno info de API y DB (allRecipes)
const getAllRecipes = async () => {
  let apiInfo = await getRecipesInApi();
  let dbInfo = await getRecipesInDb();
  const allRecipes = [...apiInfo, ...dbInfo];
  return allRecipes;
};

module.exports = { 
    getRecipesInDb,
    getRecipesInApi, 
    getAllRecipes, 
    getRecipesById
};
