import {Recipe} from "../../shared/recipe.model";
import {Action, createReducer, on} from "@ngrx/store";
import * as RecipesActions from './recipe.action';
import { allRecipeActions } from "./recipe.action";

export interface State {
  recipes: Recipe[];
}

export const initialState: State = {
  recipes: []
};

const recipeReducer = createReducer(
  initialState,
  on( allRecipeActions.AddRecipe, (state, { recipe }) => {
    return {
      ...state,
      recipes: [...state.recipes, recipe]
    }
  }),
  on( allRecipeActions.SetRecipes, (state, { recipes }) => {
    return {
      ...state,
      recipes: [...recipes]
    }
  }),
  on( allRecipeActions.UpdateRecipe, (state, { index, newRecipe }) => {
    const updatedRecipe = {
        ...state.recipes[index],
        ...newRecipe
      };
      const updatedRecipes = [...state.recipes];
      updatedRecipes[index] = updatedRecipe;
    return {
      ...state,
      recipes: updatedRecipes
    }
  }),
  on( allRecipeActions.RemoveRecipe, (state, { num } ) => {
    return{
      ...state,
      recipes: state.recipes.filter((recipe, index) => {
          return index !== num;
        })
    }
  })
);

export function reducer(state: State, action: Action) {
  return recipeReducer(state, action);
}
