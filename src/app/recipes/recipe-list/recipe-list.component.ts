import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Recipe} from "../../shared/recipe.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromApp from '../../store/app.reducer'
import {Subscription} from "rxjs";
import {map} from "rxjs/operators";
import * as RecipesActions from '../store/recipe.action'


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] | undefined;
  subscription = new Subscription();
  recipeFilter: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store.select('recipes')
      .pipe(map(state => state.recipes))
      .subscribe(recipes => {
        this.recipes = recipes;
      })
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
