const { Router } = require("express");
const recipesRouter = Router();
const { getAllRecipesHandler, getRecipesByIdHandler, postRecipesHandler } = require("../handlers/rescipesHandlers");

//ALL INFO ROUTER.
recipesRouter.get("/", getAllRecipesHandler);

//INFO BY ID ROUTER
recipesRouter.get("/:id", getRecipesByIdHandler);

//POST RECIPER ROUTER
recipesRouter.post("/", postRecipesHandler);

module.exports = recipesRouter;
