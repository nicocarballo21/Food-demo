require("dotenv").config();
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;

// const API_KEY = "78e078510c184f489115483192cc8443"

// MI URL: https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true

//Funcion por ID. (cuando busco por id, me trae las instrucciones)
const getRecipesById = async (id) => {
  const value = isNaN(id) ? "dataBase" : "api";
  if (value === "api") {
    const data = await axios
      .get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      )
      .then((response) => response.data)
      .then((data) => {
        let recivedInfo = {
          id: data.id,
          name: data.title,
          img: data.img,
          summary: data.summary,
          healthScore: data.healthScore,
          instructions: data.instructions,
          vegetarian: data.vegetarian,
          vegan: data.vegan,
          glutenFree: data.glutenFree,
          diets: data.diets,
        };
        return recivedInfo;
      });
    return data;
  } else {
    return await Recipe.findByPk(id); //si no encuentra en la APi va a buscar a la db
  }
};

//Primera funcion. Traigo info de la API
const getRecipesInApi = async () => {
  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`
  );
  const apiInfo = await apiUrl.data.results?.map((e) => {
    return {
      id: e.id,
      name: e.title,
      img: e.image,
      summary: e.summary, //resumen del plato
      healthScore: e.healthScore,
      instructions: e.instructions, //paso a paso
      vegetarian: e.vegetarian,
      vegan: e.vegan,
      glutenFree: e.glutenFree,
      diets: e.diets /*e.diets.map((d) => {
        return { name: d };
      })*/, //array con los tipos de dietas
      // dishTypes: e.dishTypes.map((dish) => {
      //   return { dish };
      // }),
    };
  });
  // console.log(apiInfo);
  return apiInfo;
};

//Segunda funcion, Traigo info de DB
const getRecipesInDb = async () => {
  const recipe = await Recipe.findAll({
    includes: {
      model: Diet,
      attributes: ["name"],
      througth: {
        attributes: [],
      },
    },
  });
  const recipeDb = recipe.map((e) => {
    return {
      name: e.name,
      image: e.image,
      summary: e.summary,
      healthscore: e.healthscore,
      steps: e.steps,
      diets: e.Diets.map((x) => x.name),
    };
  });
  return recipeDb;
};

//Tercera funcion. Concateno info de API y DB (allRecipes)
const getAllRecipes = async () => {
  let apiInfo = await getRecipesInApi();
  let dbInfo = await getRecipesInDb();
  const allRecipes = [...apiInfo, ...dbInfo];
  // console.log(allRecipes);
  return allRecipes;
};

// const createRecipe = ( id,
//   name,
//   img,
//   summary,
//   healthScor,
//   instructions,
//   vegetarian,
//   vegan,
//   glutenFree,
//   diets ) => {

// }

module.exports = { 
    getRecipesInDb,
    getRecipesInApi, 
    getAllRecipes, 
    getRecipesById
};
