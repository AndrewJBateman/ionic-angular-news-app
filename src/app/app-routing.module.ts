import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

	// {
  //   path: '',
	// 	redirectTo: '/app/tabs/news',
	// 	pathMatch: 'full'
  // },
  {
    path: 'app',
    loadChildren: './pages/tabs/tabs.module#TabsPageModule'
  },
  // {
  //   path: 'tabs/news/newsdetail',
  //   loadChildren: './newsdetail/newsdetail.module#NewsDetailModule'
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
