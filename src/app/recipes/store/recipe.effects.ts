import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as RecipesActions from './recipe.action';
import {map, switchMap, tap, withLatestFrom} from "rxjs/operators";
import {Recipe} from "../../shared/recipe.model";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import * as fromApp from '../../store/app.reducer';
import {Observable} from "rxjs";
import { allRecipeActions } from "./recipe.action";


const url = 'https://crudcrud.com/api/6f14e6cd48534ce3a09bb6a3e0dea201';

@Injectable()
export class RecipeEffects {
  fetch$ = createEffect( () => {
    return this.actions$.pipe(
      ofType(RecipesActions.FETCH_RECIPES),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          url+'/recipes'
        );
      }),
      // map(recipes => {
      //   return recipes.map(recipe => {
      //     return {
      //       ...recipe,
      //       ingredients: recipe.ingredients ? recipe.ingredients : []
      //     };
      //   });
      // }),
      map(recipes => {
        return allRecipeActions.SetRecipes({recipes});
      })
    )
  })

  create$ = createEffect( () => {
    return this.actions$.pipe(
      ofType(RecipesActions.allRecipeActions.CreateRecipes),
      switchMap( ({recipe}) => {
       return this.http.post(
          url+'/recipes',
         recipe)
      })
    )
  }, {dispatch: false})

  edit$ = createEffect( () => {
    return this.actions$.pipe(
      ofType(RecipesActions.allRecipeActions.EditRecipes),
      switchMap(({recipe}) => {
       return this.http.put(
         url+'/recipes/'+recipe._id,
         recipe)
      })
    )
  }, {dispatch: false})

  delete$ = createEffect( () => {
    return this.actions$.pipe(
      ofType(RecipesActions.allRecipeActions.DeleteRecipe),
      withLatestFrom(this.store.select("recipes")),
      switchMap( ([{num}, store]) => {
       return this.http.delete(
         url+'/recipes/'+store.recipes[num]._id)
      })
    )
  }, {dispatch: false})

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
