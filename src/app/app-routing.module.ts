import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/news', pathMatch: 'full' },
  // { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  // { path: 'about', loadChildren: './pages/about/about.module#AboutPageModule' },
  // { path: 'news', loadChildren: './pages/news/news.module#NewsPageModule' },
  // { path: 'news-detail', loadChildren: './pages/news-detail/news-detail.module#NewsDetailPageModule' },
  // { path: 'categories', loadChildren: './pages/categories/categories.module#CategoriesPageModule' },
  // { path: 'favourites', loadChildren: './pages/favourites/favourites.module#FavouritesPageModule' },
  {
    path: 'app',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
