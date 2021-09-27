import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import * as RecipesActions from "../../recipes/store/recipe.action";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-delete-dialog',
  templateUrl: './recipe-delete-dialog.component.html',
  styleUrls: ['./recipe-delete-dialog.component.scss']
})
export class RecipeDeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RecipeDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA)public data: number,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();
  }

  onDelete() {
      let num: number = this.data;
      this.store.dispatch(RecipesActions.allRecipeActions.DeleteRecipe({num}));
      this.store.dispatch(RecipesActions.allRecipeActions.RemoveRecipe({num}));
      this.router.navigate(['/recipes']);
  }
}
