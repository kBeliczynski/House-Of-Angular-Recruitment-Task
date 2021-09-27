import {Recipe} from "../../shared/recipe.model";
import {createAction, props} from "@ngrx/store";

export const SET_RECIPES = '[Recipes] Set Recipes';
export const ADD_RECIPE = '[Recipe] Add Recipe';
export const UPDATE_RECIPE = '[Recipe] Update Recipe';
export const REMOVE_RECIPE = '[Recipe] Remove Recipe';
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';
export const CREATE_RECIPES = '[Recipes] Create Recipes';
export const EDIT_RECIPES = '[Recipes] Edit Recipes';
export const DELETE_RECIPES = '[Recipes] Delete Recipes';

export const allRecipeActions = {
  SetRecipes: createAction(
    SET_RECIPES,
    props<{ recipes: Recipe[] }>()
  ),
  AddRecipe: createAction(
    ADD_RECIPE,
    props<{ recipe: Recipe }>()
  ),
  UpdateRecipe: createAction(
    UPDATE_RECIPE,
    props<{ index: number, newRecipe: Recipe }> ()
  ),
  RemoveRecipe: createAction(
    REMOVE_RECIPE,
    props<{ num: number }> ()
  ),
  FetchRecipes: createAction(
    FETCH_RECIPES
  ),
  CreateRecipes: createAction(
    CREATE_RECIPES,
    props<{ recipe: Recipe }> ()
  ),
  EditRecipes: createAction(
    EDIT_RECIPES,
    props<{ recipe: Recipe }> ()
  ),
  DeleteRecipe: createAction(
    DELETE_RECIPES,
    props<{ num: number }> ()
  )
}

