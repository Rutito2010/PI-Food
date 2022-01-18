const initialState = {
  recipes: [],
  filteredRecipes: [],
  diets: [],
  oneRecipe: [],
  loading: false,
  page: 1,
};
export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: payload,
        filteredRecipes: payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: !state.loading,
      };

    case "GET_BY_TITLE":
      return {
        ...state,
        filteredRecipes: payload,
      };
    case "GET_BY_ID":
      return {
        ...state,
        oneRecipe: payload,
      };
    case "GET_DIETS":
      return {
        ...state,
        diets: payload,
      };
    case "ORDER_BY_SCORE":
      if (payload === "desc") {
        return {
          ...state,
          filteredRecipes: [...state.filteredRecipes].sort((prev, next) =>
            prev.score > next.score ? 1 : -1
          ),
        };
      } else if (payload === "asc") {
        return {
          ...state,
          filteredRecipes: [...state.filteredRecipes].sort((prev, next) =>
            prev.score > next.score ? -1 : 1
          ),
        };
      }
      break;
    case "ORDER_BY_TITLE":
      if (payload === "za") {
        return {
          ...state,
          filteredRecipes: [...state.filteredRecipes].sort((prev, next) =>
            prev.name > next.name ? -1 : 1
          ),
        };
      }
      if (payload === "az") {
        return {
          ...state,
          filteredRecipes: [...state.filteredRecipes].sort((prev, next) =>
            prev.title > next.title ? 1 : -1
          ),
        };
      } else if (payload === "All") {
        return { ...state, filteredRecipes: state.recipes };
      }
      break;
    case "FILTER_BY_DIET":
      if (payload !== "All") {
        return {
          ...state,
          filteredRecipes: state.filteredRecipes.filter((e) => {
            return e.diets.map((n) => n.name).includes(payload);
          }),
        };
      } else {
        return { ...state, filteredRecipes: state.recipes };
      }
    case "POST_RECIPE":
      return {
        ...state,
        post: payload,
      };
    case "SET_PAGE":
      return {
        ...state,
        page: payload,
      };

    default:
      return state;
  }
}
