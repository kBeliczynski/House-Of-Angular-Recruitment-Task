import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RecipeStartComponent} from "./recipes/recipe-start/recipe-start.component";
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {StoreModule} from "@ngrx/store";
import * as fromApp from './store/app.reducer'
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {EffectsModule} from "@ngrx/effects";
import {RecipeEffects} from "./recipes/store/recipe.effects";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RecipesResolverService} from "./recipes/recipe-resolver.service";
import {RecipeInterceptorService} from "./recipes/recipe-interceptor.service";
import { ExactHourPipe } from './shared/exact-hour.pipe';
import { FilterPipe } from './shared/filter.pipe';
import {recipeGuardService} from './recipes/recipe-guard.service'

const routes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, children: [ //resolve: [RecipesResolverService], children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, canActivate:[recipeGuardService]},
      {path: ':id/edit', component: RecipeEditComponent},
    ]}
];

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeListComponent,
    HeaderComponent,
    RecipeStartComponent,
    RecipeItemComponent,
    ExactHourPipe,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(fromApp.appReducer),
    ReactiveFormsModule,
    StoreDevtoolsModule.instrument({logOnly:environment.production}),
    EffectsModule.forRoot([RecipeEffects])
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: RecipeInterceptorService, multi: true}, recipeGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
