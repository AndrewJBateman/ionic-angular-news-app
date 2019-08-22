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
		loadChildren: './pages/tabs/tabs.module#TabsPageModule'
	},
	{
		path: 'news',
		loadChildren: './pages/news/news.module#NewsPageModule'
	},
	{
		path: 'news-detail',
		loadChildren: './pages/news-detail/news-detail.module#NewsDetailPageModule'
	}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
