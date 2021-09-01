import { Pipe, PipeTransform } from '@angular/core';
import {Recipe} from "./recipe.model";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString : string, propName: string): any {
    if (value.length === 0)
      return value;
    const resultArray = [];
    for (const item of value) {
      if(item[propName].includes(filterString)) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
