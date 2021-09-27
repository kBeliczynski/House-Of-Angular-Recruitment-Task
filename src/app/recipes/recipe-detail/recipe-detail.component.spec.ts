import {ComponentFixture, TestBed} from "@angular/core/testing";
import {RecipeDetailComponent} from "./recipe-detail.component";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {RouterModule} from "@angular/router";
import {StoreModule} from "@ngrx/store";
import {MatDialogModule} from "@angular/material/dialog";
import {ExactHourPipe} from "../../shared/exact-hour.pipe";
import {AppModule} from "../../app.module";
//import {RouterTestingModule} from "@angular/router/testing";

class fakeRouter{
  navigate() {
    return {path: 'recipes/0'};
  }
};

describe('RecipeDetailComponent', () => {
  describe('Testing RecipeDetail Component Metod', () => {
    let fixture: ComponentFixture<RecipeDetailComponent>;
    let component: RecipeDetailComponent;

    beforeEach( () => {
      let fromApp;
      TestBed.configureTestingModule({
        imports: [
        //   RouterTestingModule.withRoutes([
        //   { path: 'recipes/0', component: RecipeDetailComponent}
        // ]),
          AppModule
        ],
        schemas: [NO_ERRORS_SCHEMA]
      });
      fixture = TestBed.createComponent(RecipeDetailComponent);
      component = fixture.componentInstance;
    });

    it('Should change route from recipes/:number to recipes/:number/edit', () => {

      component.recipe = {
          _id: '614ef763dc46c203e8b3dedc',
          name: 'test1',
          preparationTimeInMinutes: 30,
          description: 'testestestestestesetsettestestestestestes',
          ingredients: [
            {
              name: 'i2',
              quantity: 4
            },
            {
              name: 'i4',
              quantity: 3
            }
          ]
        };
       // console.log(component);
      // //fixture.detectChanges();
      // component.ngOnInit();
      // component.onEditRecipe();

    });
  })
})
