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
						loadChildren: '../news/news.module#NewsPageModule'
					},
					{
						path: 'news/.newsId',
						loadChildren: '../news-detail/news-detail.module#NewsDetailPageModule'
					}
				]
			},
			{
				path: 'categories',
				children: [
					{
						path: '',
						loadChildren: '../categories/categories.module#CategoriesPageModule'
					}
				]
			},
			{
				path: 'favourites',
				children: [
					{
						path: '',
						loadChildren: '../favourites/favourites.module#FavouritesPageModule'
					}
				]
			},
			{
				path: 'about',
				children: [
					{
						path: '',
						loadChildren: '../about/about.module#AboutPageModule'
					}
				]
			},
			{
				path: '',
				redirectTo: '/tabs/news',
				pathMatch: 'full'
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TabsPageRoutingModule {}
