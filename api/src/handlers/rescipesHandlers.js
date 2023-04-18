const {
  getAllRecipes,
  getRecipesById,
} = require("../controllers/recipesController");
const { Recipe, Diet } = require("../db");

//Handler de all recipes. Vamos a hacer dos rutas en una, una que me traiga todas las recetas y otra que m traiga por query parameter
const getAllRecipesHandler = async (req, res) => {
  try {
    let totalRecipes = await getAllRecipes(); 
    const name = req.query.hasOwnProperty("name") //aca se fija si hay una constante name por query(en la ruta)
      ? req.query.name.toLowerCase()
      : null;
    if (name) {
      //si hay un nombre que me pasan por query
      let filteredRecipes = totalRecipes.filter((e) =>
        e.name.toLowerCase().includes(name) //a cada receta, su nombre completo lo pasamos a minuscula y preguntamos si incluye name
      );
      filteredRecipes.length > 0
        ? res.status(200).send(filteredRecipes)
        : res.status(404).send("No existe la receta");
    } else {
      //el otro caso es que no haya query, entonces ahi le madno todas las recetas
      res.status(200).send(totalRecipes);
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

//Handler de getRecipesById
const getRecipesByIdHandler = async (req, res) => {
  const { id } = req.params; //sacamos el id de la url con req.params
  try {
    const getFilterRecipeById = await getRecipesById(id); //ejecutamos la funcion controladora con el id
    res.status(200).json(getFilterRecipeById); //y devolvemos ell resultado en un json
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const postRecipesHandler = async (req, res) => {
  const { name, img, summary, healthScore, steps, createdInDb, diets } =
    req.body;
  console.log(diets);
  try { //creamos la reseta en base de datos y la almacenamos en la variable
    const newRecipe = await Recipe.create({
      name,
      img,
      summary,
      healthScore,
      steps,
      createdInDb,
    });
    const dietDB = await Diet.findAll({ //aca le guardamos le concatenamos las dietas que seleccinamos por body, que ya estan en db
      where: { name: diets },
    });

    for (const diet of dietDB) {
      await newRecipe.addDiet(diet);
    }

    res.status(200).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports = {
  getAllRecipesHandler,
  getRecipesByIdHandler,
  postRecipesHandler,
};
