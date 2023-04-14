const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
  detail: {}, //object, porque el filtrado de id me devuelve un objeto
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_RECIPES':
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case 'GET_NAME_RECIPES':
      return {
        ...state,
        recipes: action.payload,
      };
    case 'GET_DIETS':
      return {
        ...state,
        diets: action.payload,
      };
    case 'FILTER_BY_DIETS':
      const allRecipes = state.allRecipes;
      let filteredRecipesByDiets =
        action.payload === 'All'
          ? allRecipes
          : allRecipes.filter(recipe => { //filtra todas, api y db
              if (recipe.diets) { //api
                return recipe.diets.includes(action.payload);
              } else if (recipe.Diets) { //db
                return recipe.Diets.some(diet => diet.name === action.payload);
              } else {
                return false;
              }
            });
      return {
        ...state,
        recipes: filteredRecipesByDiets,
      };
    case 'POST_RECIPES':
      return {
        ...state,
      };
    case 'FILTER_CREATED':
      const allRecipes2 = state.allRecipes;
      const createdFilter =
        action.payload === 'created'
          ? allRecipes2.filter(el => el.createdInDb)
          : allRecipes2.filter(el => !el.createdInDb);
      return {
        ...state,
        recipes: action.payload === 'all' ? state.allRecipes : createdFilter,
      };
    case 'ORDER_BY_NAME':
      let sortedArr =
        action.payload === 'asc'
          ? state.recipes.sort(function (a, b) {
              //el sort, ordena
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: sortedArr,
      };
    case 'ORDER_BY_HEALTH_SCORE':
      let sortedArrHelthScore =
        action.payload === 'asc'
          ? state.recipes.sort((a, b) => a.healthScore - b.healthScore)
          : state.recipes.sort((a, b) => b.healthScore - a.healthScore);
      return {
        ...state,
        recipes: sortedArrHelthScore,
      };
    case 'GET_DETAIL':
      console.log(action, 'action');
      return {
        ...state,
        detail: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
