const { Router } = require('express');
const { Recipe, Diet } = require("../db") //me traigo los modelos que ya pasaron por Sequelize
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios')
const router = Router();
const recipesRouter = require('./recipesRoutes')
const dietsRouter = require('./dietsRouter')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/recipes", recipesRouter);

router.use("/diets", dietsRouter);


module.exports = router;
