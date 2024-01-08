// module required so date pipe can be used by more than one page
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { DateConvertPipe } from "./date-convert.pipe";
import { TitleConvertPipe } from "./title-convert.pipe";
import { TitleNosourcePipe } from "./title-nosource.pipe";

@NgModule({
    imports: [CommonModule, IonicModule, DateConvertPipe, TitleConvertPipe, TitleNosourcePipe],
    exports: [DateConvertPipe, TitleConvertPipe, TitleNosourcePipe],
})
export class PipesModule {}
