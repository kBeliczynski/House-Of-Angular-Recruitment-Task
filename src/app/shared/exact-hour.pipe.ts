import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exactHour'
})
export class ExactHourPipe implements PipeTransform {

  transform( minutes: number ): string {
    if( minutes < 60)
      return minutes+'m';
    else if( minutes%60 == 0)
      return minutes/60+'h';
    else
      return Math.floor(minutes/60)+'h '+minutes%60+'m';
  }

}
