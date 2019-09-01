// module required so date pipe can be used by more than one page
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular';
import { DateConvertPipe } from './date-convert.pipe';

@NgModule({
	declarations: [DateConvertPipe],
	imports: [CommonModule, IonicModule],
	exports: [DateConvertPipe]
})

export class PipesModule {}
