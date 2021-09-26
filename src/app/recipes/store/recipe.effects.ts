import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as RecipesActions from './recipe.action';
import {map, switchMap, tap, withLatestFrom} from "rxjs/operators";
import {Recipe} from "../../shared/recipe.model";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import * as fromApp from '../../store/app.reducer';
import {Observable} from "rxjs";


const url = 'https://crudcrud.com/api/5254f5ec9a3a46d489eb4aaaaedf949c';

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
        return new RecipesActions.SetRecipes(recipes);
      })
    )
  })

  create$ = createEffect( () => {
    return this.actions$.pipe(
      ofType(RecipesActions.CREATE_RECIPES),
      map( (action: RecipesActions.CreateRecipes) => action.payload),
      switchMap( recipe => {
       return this.http.post(
          url+'/recipes',
         recipe)
      })
    )
  }, {dispatch: false})

  edit$ = createEffect( () => {
    return this.actions$.pipe(
      ofType(RecipesActions.EDIT_RECIPES),
      map( (action: RecipesActions.EditRecipes) => action.payload),
      switchMap( recipe => {
       return this.http.put(
         url+'/recipes/'+recipe._id,
         recipe)
      })
    )
  }, {dispatch: false})

  delete$ = createEffect( () => {
    return this.actions$.pipe(
      ofType(RecipesActions.DELETE_RECIPES),
      map( (action: RecipesActions.DeleteRecipe) => action.payload),
      withLatestFrom(this.store.select("recipes")),
      switchMap( ([index, store]) => {
       return this.http.delete(
         url+'/recipes/'+store.recipes[index]._id)
      })
    )
  }, {dispatch: false})

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
