import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { TabsPageRoutingModule } from '../tabs/tabs-routing.module';
import { CategoriesPageModule } from '../categories/categories.module';
import { FavouritesPageModule } from '../favourites/favourites.module';
import { NewsPageModule } from '../news/news.module';
import { NewsDetailPageModule } from '../news-detail/news-detail.module';
import { AboutPageModule } from '../about/about.module';

@NgModule({
  imports: [
    AboutPageModule,
    CategoriesPageModule,
    CommonModule,
    FavouritesPageModule,
    FormsModule,
    IonicModule,
    NewsPageModule,
    NewsDetailPageModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
