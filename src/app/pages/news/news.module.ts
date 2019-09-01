import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { NewsPage } from './news.page';
import { ArticleListComponent} from '../../components/article-list/article-list.component';
import { PipesModule } from '../../pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: NewsPage
  }
];

@NgModule({
	imports: [
  CommonModule,
  FormsModule,
  IonicModule,
	RouterModule.forChild(routes),
	PipesModule
  ],
	declarations: [
		NewsPage,
		ArticleListComponent,
	],
	providers: []
})
export class NewsPageModule {}
