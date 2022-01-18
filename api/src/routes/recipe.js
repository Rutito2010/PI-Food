const { Router } = require("express");
const axios = require("axios");
const { API_KEY } = process.env;
const router = Router();
const { Recipe, Diet } = require("../db");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id.includes("-") && id.length > 8) {
      const recipe = await Recipe.findByPk(id, {
        include: [Diet],
      });
      return res.json(recipe);
    } else {
      // console.log(JSON.stringify(id));
      let findApiRecipe = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );
      let apiRecipe = findApiRecipe.data;
      let goodResume = apiRecipe.summary.replace(/<[^>]*>?/g, "");
      let prettySteps = [];
      apiRecipe.analyzedInstructions.map((e) => {
        let goodSteps = [];
        e.steps.map((step) => {
          goodSteps.push([step.number, step.step]);
        });
        prettySteps.push((e.name, goodSteps));
        return goodSteps;
      });
      let terminateRecipe = {
        id: apiRecipe.id,
        title: apiRecipe.title,
        image: apiRecipe.image,
        dishType: apiRecipe.dishTypes,
        diets: apiRecipe.diets,
        score: apiRecipe.spoonacularScore,
        healthscore: apiRecipe.healthScore,
        resume: goodResume,
        recipeOrder: prettySteps,
      };
      res.json(terminateRecipe);
    }
  } catch (error) {
    console.log("aca");
  }
});

router.post("/", async (req, res) => {
  const { title, resume, score, healthscore, recipeOrder, image, diets } =
    req.body;
  try {
    const createRecipe = await Recipe.create({
      title,
      resume,
      score,
      healthscore,
      recipeOrder,
      image,
    });
    await createRecipe.setDiets(diets);
    res.json("Recipe Created");
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    Recipe.destroy({
      where: { id: id },
    });
    res.json("Recipe Eliminated");
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
