import {Recipe} from "../../shared/recipe.model";
import {Action} from "@ngrx/store";

export const SET_RECIPES = '[Recipes] Set Recipes';
export const ADD_RECIPE = '[Recipe] Add Recipe';
export const UPDATE_RECIPE = '[Recipe] Update Recipe';
export const REMOVE_RECIPE = '[Recipe] Remove Recipe';
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';
export const CREATE_RECIPES = '[Recipes] Create Recipes';
export const EDIT_RECIPES = '[Recipes] Edit Recipes';
export const DELETE_RECIPES = '[Recipes] Delete Recipes';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: { index: number; newRecipe: Recipe }) {}
}

export class RemoveRecipe implements Action {
  readonly type = REMOVE_RECIPE;

  constructor(public payload: number) {}
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export class CreateRecipes implements Action {
  readonly type = CREATE_RECIPES;

  constructor(public payload: Recipe) {}
}

export class EditRecipes implements Action {
  readonly type = EDIT_RECIPES;

  constructor(public payload: Recipe) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPES;

    constructor(public payload: number) {}
}



export type RecipesActions =
  | SetRecipes
  | AddRecipe
  | UpdateRecipe
  | RemoveRecipe
  | FetchRecipes
  | CreateRecipes
  | EditRecipes
  | DeleteRecipe;
