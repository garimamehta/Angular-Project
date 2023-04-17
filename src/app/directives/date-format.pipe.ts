import { DatePipe, formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, ...args: string[]): any {
    if (+new Date(value)) {
      return new DatePipe('en-US').transform(value,args[0]);  
    }
    else {
      return value;
    }
  }

}
