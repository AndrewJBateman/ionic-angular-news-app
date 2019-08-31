import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


// convert ISO8601 UTC string to '...time ago'
@Pipe({
  name: 'dateConvert'
})
export class DateConvertPipe implements PipeTransform {

  transform(value: string): string {
    return moment(value).fromNow();
  }

}
