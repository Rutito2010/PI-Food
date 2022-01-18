const { Router } = require("express");
const Recipes = require("./recipes");
const Recipe = require("./recipe");
const Diets = require("./diets");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", Recipes);
router.use("/recipe", Recipe);
router.use("/diets", Diets);
module.exports = router;
