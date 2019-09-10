import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LanguagePopverPage } from './language-popver.page';

const routes: Routes = [
  {
    path: '',
    component: LanguagePopverPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LanguagePopverPage]
})
export class LanguagePopverPageModule {}
