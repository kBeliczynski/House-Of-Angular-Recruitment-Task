import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Params,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from './store/recipe.action';
import {map, mergeMap, switchMap, take} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable()
 export class recipeGuardService  implements CanActivate {

    constructor(private router: Router,
                private route: ActivatedRoute,
                private store: Store<fromApp.AppState>) {
    }

    canActivate(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot)
    {
      return this.store.select('recipes').pipe(
        take(1),
        map( state => state.recipes),
        map( recipes => {
          if(recipes[route.params['id']] !== undefined){
            return true
          }
          return this.router.createUrlTree(['']);
        }))
    }
 }
