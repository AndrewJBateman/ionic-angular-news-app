// module required so item-list component can be used by more than one page
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular';
import { ArticleListComponent } from './article-list/article-list.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
	declarations: [ArticleListComponent],
	imports: [
		CommonModule,
		IonicModule,
		PipesModule
	],
	exports: [ArticleListComponent]
})

export class ComponentsModule {}
