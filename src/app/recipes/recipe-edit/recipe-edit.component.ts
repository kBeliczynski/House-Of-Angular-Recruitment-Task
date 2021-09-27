import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromApp from '../../store/app.reducer'
import * as RecipesActions from '../store/recipe.action'
import {map} from "rxjs/operators";
import {Recipe} from "../../shared/recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  recipeId: string;
  editMode = false;
  recipeForm: FormGroup;

  private storeSub: Subscription;

  get ingredientsControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(
        RecipesActions.allRecipeActions.UpdateRecipe({
          index: this.id,
          newRecipe: this.recipeForm.value
        })
      );
      this.store.dispatch(RecipesActions.allRecipeActions.EditRecipes({
        _id: this.recipeId,
          ...this.recipeForm.value}
        ));
    } else {
      let recipe = this.recipeForm.value;
      this.store.dispatch(RecipesActions.allRecipeActions.AddRecipe({ recipe }));
      console.log("jesetem w edit component",this.recipeForm.value);
      this.store.dispatch(RecipesActions.allRecipeActions.CreateRecipes({ recipe }));
    }
    this.onCancel();
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        quantity: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  minLengthArray = (min: number) => {
    return (c: AbstractControl): { [p: string]: any } | null => {
      if (c.value.length >= min)
        return null;
      return { MinLengthArray: true};
    }
  }

  private initForm() {
    let recipeName = '';
    let recipePreparationTime = null;
    let recipeDescription = '';
    let recipeIngredients = new FormArray([], [this.minLengthArray(2)]);

    if (this.editMode) {
      this.storeSub = this.store
        .select('recipes')
        .pipe(
          map(recipeState => {
            return recipeState.recipes.find((recipe, index) => {
              return index === this.id;
            });
          })
        )
        .subscribe((recipe) => {
          this.recipeId = recipe!._id;
          recipeName = recipe!.name;
          recipePreparationTime = recipe!.preparationTimeInMinutes;
          recipeDescription = recipe!.description;
          if (recipe!['ingredients']) {
            for (let ingredient of recipe!.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  quantity: new FormControl(ingredient.quantity, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                  ])
                })
              );
            }
          }
        });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
      preparationTimeInMinutes: new FormControl(recipePreparationTime, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      description: new FormControl(recipeDescription, [Validators.required, Validators.minLength(15), Validators.maxLength(255)]),
      ingredients: recipeIngredients
    });
  }
}

