import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
	{
		path: 'tabs',
		component: TabsPage,
		children: [
			{
				path: 'news',
				children: [
					{
						path: '',
						loadChildren: () => import('../news/news.module').then(m => m.NewsPageModule)
					}
				]
			},
			{
				path: 'categories',
				children: [
					{
						path: '',
						loadChildren: () => import('../categories/categories.module').then(m => m.CategoriesPageModule)
					}
				]
			},
			{
				path: 'favourites',
				children: [
					{
						path: '',
						loadChildren: () => import('../favourites/favourites.module').then(m => m.FavouritesPageModule)
					}
				]
			},
			{
				path: 'about',
				children: [
					{
						path: '',
						loadChildren: () => import('../about/about.module').then(m => m.AboutPageModule)
					}
				]
			},
			{
				path: '',
				redirectTo: '/tabs/news',
				pathMatch: 'full'
			}
		]
	},
	{
		path: '',
		redirectTo: '/app/tabs/news',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TabsPageRoutingModule {}
