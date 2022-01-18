//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const { default: axios } = require("axios");
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
// const { API_KEY } = process.env;
const { Diet } = require("./src/db");
const { ApiRecipe } = require("./src/db");

// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
  // try {
  //   axios
  //     .get(
  //       `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  //     )
  //     .then((e) => {
  //       const apiDiets = e.data.results.map((recipe) => {
  //         return {
  //           diets: recipe.diets,
  //         };
  //       });
  //       const dietsTypes = [];
  //       for (let i = 0; i < apiDiets.length; i++) {
  //         for (let j = 0; j < apiDiets[i].diets.length; j++) {
  //           if (dietsTypes.includes(apiDiets[i].diets[j])) {
  //             continue;
  //           }
  //           dietsTypes.push(apiDiets[i].diets[j]);
  //         }
  //       }
  //       console.log(dietsTypes);
  //       try {
  //         dietsTypes.map((e) => {
  //           try {
  //             Diet.create({ name: e });
  //           } catch (error) {
  //             console.log(error, "index3");
  //           }
  //         });
  //       } catch (error) {
  //         console.log(error, "index2");
  //       }
  //     });
  // } catch (error) {
  //   console.log(error, "index");
  // }

  // console.log(apiRecipesAll.data.results[0]);
  // axios
  //   .get(
  //     `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  //   )
  //   .then(async (apiRecipesAll) => {
  //     var apiRecipe = apiRecipesAll.data.results;
  //     // console.log(apiRecipe);
  //     apiRecipe.map(async (e) => {
  //       try {
  //         let max = await ApiRecipe.create({
  //           id: e.id,
  //           title: e.title,
  //           image: e.image,
  //           score: e.spoonacularScore,
  //         });
  //         e.diets.map(async (d) => {
  //           await max.setDiets(d);
  //         });
  //       } catch (err) {
  //         console.log("loco", err);
  //       }
  //     });
  //   })

  //   .catch((error) => {
  //     console.log("aca wey", error);
  //   });
  // let diets = [
  //   "gluten free",
  //   "vegetarian",
  //   "vegan",
  //   "dairy free",
  //   "lacto ovo vegetarian",
  //   "primal",
  //   "fodmap friendly",
  //   "paleolithic",
  //   "pescatarian",
  //   "ketogenic",
  //   "whole 30",
  // ];
  // diets.map((e) => Diet.create({ name: e }));
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
