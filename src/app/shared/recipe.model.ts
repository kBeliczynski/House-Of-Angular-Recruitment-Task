import {Ingredient} from "./ingredient.model";

export class Recipe {

  constructor(public _id: string, public name: string, public preparationTimeInMinutes: number, public description: string, public ingredients: Ingredient[]) {
  }
}
