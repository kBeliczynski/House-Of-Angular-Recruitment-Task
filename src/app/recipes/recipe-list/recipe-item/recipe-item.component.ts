import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../../shared/recipe.model";
import {ActivatedRoute, Router} from "@angular/router";
import * as RecipesActions from "../../store/recipe.action";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/app.reducer";
import {AuthorDialogComponent} from "../../../material/author-dialog/author-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {RecipeDeleteDialogComponent} from "../../../material/recipe-delete-dialog/recipe-delete-dialog.component";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe | any;
  @Input() index: number | any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onEditRecipe() {
    this.router.navigate([this.index,'edit'], { relativeTo: this.route });
  }

    openDialog() {
    const dialogRef = this.dialog.open(RecipeDeleteDialogComponent, {
      data: this.index
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
