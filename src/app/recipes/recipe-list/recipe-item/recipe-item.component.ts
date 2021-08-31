import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../../shared/recipe.model";
import {ActivatedRoute, Router} from "@angular/router";
import * as RecipesActions from "../../store/recipe.action";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/app.reducer";

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
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
  }

  onEditRecipe() {
    this.router.navigate([this.index,'edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.index));
    this.router.navigate(['/recipes']);
  }

}
