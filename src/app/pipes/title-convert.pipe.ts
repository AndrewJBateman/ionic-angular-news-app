import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "titleConvert",
})
export class TitleConvertPipe implements PipeTransform {
  transform(value: string): string {
    const shorterStrLength = 90;
    return value.substring(0, shorterStrLength).concat("...");
  }
}
