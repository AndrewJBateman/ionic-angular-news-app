import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { FavouritesPage } from './favourites.page';
import { ComponentsModule} from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: FavouritesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
		RouterModule.forChild(routes),
		PipesModule,
		ComponentsModule
  ],
  declarations: [FavouritesPage]
})
export class FavouritesPageModule {}
