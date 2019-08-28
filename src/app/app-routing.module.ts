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
  { path: 'search', loadChildren: './pages/search/search.module#SearchPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
