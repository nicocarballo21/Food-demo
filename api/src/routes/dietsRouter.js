const { Router } = require("express");
const { getDietsHandler, hydrateDiets } = require("../handlers/dietsHandler");
const dietsRouter = Router();

dietsRouter.get("/", getDietsHandler);
dietsRouter.post("/hydrate", hydrateDiets);

module.exports = dietsRouter;
