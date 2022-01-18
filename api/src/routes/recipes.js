const axios = require("axios");
const e = require("express");
const { Router } = require("express");
const router = Router();
const { Recipe, Diet, ApiRecipe } = require("../db");
const { API_KEY } = process.env;

router.get("/", async (req, res) => {
  if (!req.query.title) {
    try {
      let dbRecipes = await Recipe.findAll({
        attributes: ["id", "title", "score", "image"],
        include: {
          model: Diet,
        },
      });

      var totalRecipes = [...dbRecipes];

      let apiDbRecipes = await ApiRecipe.findAll({
        attributes: ["id", "title", "image", "score"],
        include: {
          model: Diet,
        },
      });

      // let apiRecipesAll = await axios.get(
      //   `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
      // );

      // let apiRecipe = apiRecipesAll.data.results.map((e) => {
      //   let dietas = [];
      //   // let objDietas = {};
      //   for (let i = 0; i < e.diets.length; i++) {
      //     let objDietas = { name: e.diets[i] };
      //     dietas.push(objDietas);
      //     return {
      //       id: e.id,
      //       title: e.title,
      //       image: e.image,
      //       diets: dietas,
      //       score: e.spoonacularScore,
      //     };
      //   }
      // });

      totalRecipes = [...totalRecipes, ...apiDbRecipes];
      res.json(totalRecipes);
    } catch (error) {
      console.log(error);
    }
  } else {
    const { title } = req.query;
    if (title && title !== "")
      var dbResult = await Recipe.findAll({
        include: {
          model: Diet,
        },
      });

    let dbFilter = dbResult.filter((e) =>
      e.title.toLowerCase().includes(title.toLowerCase())
    );
    // let apiDbRecipes = await ApiRecipe.findAll({
    //   include: {
    //     model: Diet,
    //   },
    // });
    // let dbApiFilter = apiDbRecipes.filter((e) =>
    //   e.title.toLowerCase().includes(title.toLowerCase())
    // );
    let apiRecipesName = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&query=${title}&number=100`
    );
    // let apiRecipesOne = apiRecipesAll.data.results.filter((e) =>
    //   e.title.toLowerCase().includes(title.toLowerCase())
    // );
    // console.log(apiRecipesAll.data.results);

    let apiRecipe = apiRecipesName.data.results.map((e) => {
      let dietas = [];
      // let objDietas = {};
      for (let i = 0; i < e.diets.length; i++) {
        let objDietas = { name: e.diets[i] };
        dietas.push(objDietas);
      }
      return {
        id: e.id,
        title: e.title,
        image: e.image,
        diets: dietas,
        score: e.spoonacularScore,
      };
    });
    filteredRecipe = [...dbFilter, ...apiRecipe];
    res.json(filteredRecipe);
    // console.log(filteredRecipe);
  }
});

// router.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   // try {
//   if (typeof id === "string" && id.length > 8) {
//     const recipe = await Recipe.findByPk(id, {
//       include: [Diet],
//     });
//     return res.json(recipe);
//   } else {
//     let findApiRecipe = await axios.get(
//       `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
//     );
//     console.log(findApiRecipe.data);
//     let apiRecipe = findApiRecipe.data.map((e) => {
//       return {
//         title: e.title,
//         image: e.image,
//         // type: e.dishTipes.map((r) => r.type),
//         // diets: e.diets.map((r) => r.diet),
//         score: e.spoonacularScore,
//         healthscore: e.healthScore,
//         resume: e.summary,
//         recipeOrder: e.instructions,
//       };
//     });
//     res.json(apiRecipe);
//   }
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
// });

module.exports = router;
