import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../shared/recipe.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromApp from '../../store/app.reducer'
import {map, switchMap} from "rxjs/operators";
import * as RecipesActions from '../store/recipe.action';
import {RecipeDeleteDialogComponent} from "../../material/recipe-delete-dialog/recipe-delete-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | any;
  id: number | any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
     this.route.params
      .pipe(
        map(params => {
          return +params['id'];
        }),
        switchMap(id => {
          this.id = id;
          return this.store.select('recipes');
        }),
        map(recipesState => {
          return recipesState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe(recipe => {
        this.recipe = recipe;
      });
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

    openDialog() {
      const dialogRef = this.dialog.open(RecipeDeleteDialogComponent, {
        data: this.id
      });

      dialogRef.afterClosed().subscribe(result => {
      });
    }
}
