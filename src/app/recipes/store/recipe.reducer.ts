import {Recipe} from "../../shared/recipe.model";
import {createReducer} from "@ngrx/store";
import * as RecipesActions from './recipe.action';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [{"_id":"612ea7e4dc46c203e8b3cbe3","name":"recipe1","preparationTimeInMinutes":11,"description":"desc1","ingredients":[{_id:'',"name":"i1","quantity":11},{_id:'',"name":"i2","quantity":22},{_id:'',"name":"i3","quantity":33}]}]
};

export function recipeReducer(
  state = initialState,
  action: RecipesActions.RecipesActions
) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipesActions.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe
      };

      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;

      return {
        ...state,
        recipes: updatedRecipes
      };
    case RecipesActions.REMOVE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          return index !== action.payload;
        })
      };
    default:
      return state;
  }
}
