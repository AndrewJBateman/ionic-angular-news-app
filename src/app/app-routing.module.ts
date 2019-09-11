import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/app/tabs/news',
		pathMatch: 'full'
	},
	{
		path: 'app',
		loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
	},
	{ path: 'search',
		loadChildren: './pages/search/search.module#SearchPageModule'
	},
	{ path: 'news-detail',
		loadChildren: () => import('./pages/news-detail/news-detail.module').then(m => m.NewsDetailPageModule)
	},
  { path: 'language-popver', loadChildren: './pages/language-popver/language-popver.module#languagePopoverPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
