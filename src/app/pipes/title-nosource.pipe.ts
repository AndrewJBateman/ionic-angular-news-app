import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "titleNosource",
    standalone: true,
})
export class TitleNosourcePipe implements PipeTransform {
  //
  transform(value: string): string {
    return value.replace(/-[^-]*$/, "");
  }
}
