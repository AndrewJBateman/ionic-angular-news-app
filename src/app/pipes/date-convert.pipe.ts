import { Pipe, PipeTransform } from "@angular/core";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

// convert ISO8601 UTC string to '...time ago'
@Pipe({
  name: "dateConvert",
})
export class DateConvertPipe implements PipeTransform {
  transform(value: string): string {
    return dayjs(value).fromNow();
  }
}
