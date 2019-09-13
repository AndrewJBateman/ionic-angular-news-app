// angular & ionic/angular node modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular';

// ngx node modules
import { TranslateModule } from '@ngx-translate/core';

// Component & pipe modules
import { ArticleListComponent } from './article-list/article-list.component';
import { PipesModule } from '../pipes/pipes.module';
import { PageRefreshComponent } from './page-refresh/page-refresh.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

@NgModule({
	declarations: [ArticleListComponent, PageRefreshComponent, ProgressBarComponent],
	imports: [
		CommonModule,
		IonicModule,
		PipesModule,
		TranslateModule
	],
	exports: [
		ArticleListComponent,
		PageRefreshComponent,
		ProgressBarComponent
	]
})

export class ComponentsModule {}
