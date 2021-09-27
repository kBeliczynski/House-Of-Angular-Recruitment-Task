import * as fromReducer from './recipe.reducer';
import {Recipe} from "../../shared/recipe.model";
import {allRecipeActions} from "./recipe.action";
import {appReducer} from "../../store/app.reducer";

describe('RecipeReducer', () => {
  describe('RecipeReducer State testing', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = { type: 'unknown'};
      const state = fromReducer.recipeReducer(initialState, action);
      expect(state).toBe(initialState);
    });

    it('should set the state in on immutable way', () => {
      const { initialState } = fromReducer;
      const newState  = {recipes:[{"_id":"6151b283dc46c203e8b3dfa8","name":"Test1","preparationTimeInMinutes":56,"description":"Quisque et lectus vestibulum dolor commodo imperdiet in vel erat.","ingredients":[{"name":"i1","quantity":14},{"name":"i2","quantity":6}]}]};
      const action = allRecipeActions.SetRecipes(newState);
      const state = fromReducer.recipeReducer(initialState,action);
      expect(state).toEqual(newState);
      expect(state).not.toBe(newState)
    })

    it('should update the state in on immutable way', () => {
      const initialState = {
        recipes:[
          {"_id":"6151b283dc46c203e8b3dfa8","name":"Test1","preparationTimeInMinutes":56,"description":"Quisque et lectus vestibulum dolor commodo imperdiet in vel erat.","ingredients":[{"name":"i1","quantity":14},{"name":"i2","quantity":6}]},
          {"_id":"6151b283dc46c203e8b3dfa9","name":"Test2","preparationTimeInMinutes":11,"description":"Buisque et lectus vestibulum dolor commodo imperdiet in vel erat.","ingredients":[{"name":"i1","quantity":14},{"name":"i2","quantity":6}]}
        ]};
      const newRecipe = {"_id":"6151b283dc46c203e8b3dfa8","name":"newRecipe","preparationTimeInMinutes":6,"description":"Quisque et lectus vestibulum dolor commodo imperdiet in vel erat.","ingredients":[{"name":"i1","quantity":14},{"name":"i2","quantity":6}]};
      const action = allRecipeActions.UpdateRecipe({index: 0, newRecipe});
      const state = fromReducer.recipeReducer(initialState,action);
      expect(state.recipes[0]).toEqual(newRecipe);
      expect(state.recipes[1]).toEqual(initialState.recipes[1]);
    })

    it('should not update the state when recipe does not exist', () => {
      const initialState = {
        recipes:[
          {"_id":"6151b283dc46c203e8b3dfa8","name":"Test1","preparationTimeInMinutes":56,"description":"Quisque et lectus vestibulum dolor commodo imperdiet in vel erat.","ingredients":[{"name":"i1","quantity":14},{"name":"i2","quantity":6}]},
          {"_id":"6151b283dc46c203e8b3dfa9","name":"Test2","preparationTimeInMinutes":11,"description":"Buisque et lectus vestibulum dolor commodo imperdiet in vel erat.","ingredients":[{"name":"i1","quantity":14},{"name":"i2","quantity":6}]}
        ]};
      const newRecipe = {"_id":"6151b283dc46c203e8b3dfa8","name":"newRecipe","preparationTimeInMinutes":6,"description":"Quisque et lectus vestibulum dolor commodo imperdiet in vel erat.","ingredients":[{"name":"i1","quantity":14},{"name":"i2","quantity":6}]};
      const action = allRecipeActions.UpdateRecipe({ index:4, newRecipe  });
      const state = fromReducer.recipeReducer(initialState, action);
      expect(state).not.toBe(initialState);
      expect(state).toEqual(initialState);
    })

    it('should add new recipe to the state', () => {
      const { initialState } = fromReducer;
      const newRecipe: Recipe = {"_id":"6151b283dc46c203e8b3dfa8","name":"Test1","preparationTimeInMinutes":56,"description":"Quisque et lectus vestibulum dolor commodo imperdiet in vel erat.","ingredients":[{"name":"i1","quantity":14},{"name":"i2","quantity":6}]}
      const correctState = {
        recipes:[
          {"_id":"6151b283dc46c203e8b3dfa8","name":"Test1","preparationTimeInMinutes":56,"description":"Quisque et lectus vestibulum dolor commodo imperdiet in vel erat.","ingredients":[{"name":"i1","quantity":14},{"name":"i2","quantity":6}]}
        ]};
      const action = allRecipeActions.AddRecipe({recipe: newRecipe});
      const state = fromReducer.recipeReducer(initialState,action);
      expect(state).toEqual(correctState);
    })

    it('should delete recipe to the state', () => {
      const initialState = {
        recipes:[
          {"_id":"6151b283dc46c203e8b3dfa8","name":"Test1","preparationTimeInMinutes":56,"description":"Quisque et lectus vestibulum dolor commodo imperdiet in vel erat.","ingredients":[{"name":"i1","quantity":14},{"name":"i2","quantity":6}]},
          {"_id":"6151b283dc46c203e8b3dfa9","name":"Test2","preparationTimeInMinutes":11,"description":"Buisque et lectus vestibulum dolor commodo imperdiet in vel erat.","ingredients":[{"name":"i1","quantity":14},{"name":"i2","quantity":6}]}
        ]};
      const correctState = {
        recipes:[
          {"_id":"6151b283dc46c203e8b3dfa9","name":"Test2","preparationTimeInMinutes":11,"description":"Buisque et lectus vestibulum dolor commodo imperdiet in vel erat.","ingredients":[{"name":"i1","quantity":14},{"name":"i2","quantity":6}]}
        ]};
      const action = allRecipeActions.RemoveRecipe({num: 0});
      const state = fromReducer.recipeReducer(initialState,action);
      console.log(state);
      expect(state).toEqual(correctState);
    });
  });
})
