import axios from "axios";

export function allRecipes() {
  return function (dispatch) {
    return axios.get(`http://localhost:3001/recipes`).then((respuesta) => {
      dispatch({ type: "GET_RECIPES", payload: respuesta.data });
    });
  };
}
export function recipeByID(id) {
  return function (dispatch) {
    return axios.get(`http://localhost:3001/recipe/${id}`).then((respuesta) => {
      dispatch({ type: "GET_BY_ID", payload: respuesta.data });
    });
  };
}
// export function recipeByID(id) {
//   return async function (dispatch) {
//     var recipeID = await axios.get(`http://localhost:3001/recipe/${id}`);
//     dispatch({
//       type: "GET_BY_ID",
//       payload: recipeID.data,
//     });
//   };
// }
export function recipeByTitle(title) {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3001/recipes?title=${title}`)
      .then((respuesta) => {
        console.log(respuesta);
        dispatch({ type: "GET_BY_TITLE", payload: respuesta.data });
      });
  };
}
export function setLoading() {
  return {
    type: "SET_LOADING",
  };
}
export function getDiets() {
  return function (dispatch) {
    axios.get(`http://localhost:3001/diets`).then((dietas) => {
      dispatch({ type: "GET_DIETS", payload: dietas.data });
    });
  };
}
export function orderByScore(payload) {
  return function (dispatch) {
    dispatch({
      type: "ORDER_BY_SCORE",
      payload: payload,
    });
  };
}
export function orderByTitle(payload) {
  return function (dispatch) {
    dispatch({
      type: "ORDER_BY_TITLE",
      payload: payload,
    });
  };
}
export function filterByDiet(payload) {
  return function (dispatch) {
    dispatch({
      type: "FILTER_BY_DIET",
      payload: payload,
    });
  };
}
export function createNewRecipe(input) {
  return async function (dispatch) {
    var nRecipe = await axios.post("http://localhost:3001/recipe", input);
    dispatch({
      type: "POST_RECIPE",
      payload: nRecipe.data,
    });
  };
}
export function deleteRecipe(id) {
  return async function (dispatch) {
    var nRecipe = await axios.delete(
      `http://localhost:3001/recipe/delete/${id}`
    );
    dispatch({
      type: "DELETE_RECIPE",
      payload: nRecipe.data,
    });
  };
}
export function setPage(payload) {
  return function (dispatch) {
    dispatch({ type: "SET_PAGE", payload: payload });
  };
}
