import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { NewsDetailPage } from './news-detail.page';
import { DateConvertPipe } from '../../pipes/date-convert.pipe';

const routes: Routes = [
  {
    path: '',
    component: NewsDetailPage
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
		NewsDetailPage
	],
	exports: []
})
export class NewsDetailPageModule {}
