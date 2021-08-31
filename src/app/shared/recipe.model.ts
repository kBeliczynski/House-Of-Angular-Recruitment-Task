import {Ingredient} from "./ingredient.model";

export class Recipe {

  constructor(public name: string, public preparationTime: string, public description: string, public ingredients: Ingredient[]) {
  }
}
