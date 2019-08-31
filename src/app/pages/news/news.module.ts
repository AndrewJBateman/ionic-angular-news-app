import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { NewsPage } from './news.page';
import { DateConvertPipe } from '../../pipes/date-convert.pipe';

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
	RouterModule.forChild(routes)
  ],
	declarations: [
		NewsPage,
		DateConvertPipe
	]
})
export class NewsPageModule {}
