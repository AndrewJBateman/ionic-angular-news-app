
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Router } from '@angular/router';

import { Article } from 'src/app/interfaces/interfaces';
import { NewsApiService } from 'src/app/providers/news-api.service';
import { NetworkService } from './../../providers/network.service';

@Component({
	selector: 'app-categories',
	templateUrl: './categories.page.html',
	styleUrls: ['./categories.page.scss']
})
export class CategoriesPage implements OnInit {
	@ViewChild(IonSegment, {static: false}) segment: IonSegment;

	categories = ['general', 'technology', 'business', 'entertainment', 'health', 'science', 'sports'];
	news: Article[] = [];
	data: any;
	category: string;

	constructor(
		private newsService: NewsApiService,
		private router: Router,
		private networkService: NetworkService
	) {}

	ngOnInit() {
		const randomCat = Math.floor(Math.random() * (this.categories.length - 1) + 1);
		console.log('random', randomCat);
		console.log(this.categories.length);
		this.category = this.categories[randomCat];
		console.log('run loadCategoryNews function with default category: ', this.category);
		this.loadCategoryNews(this.category);
	}

	// 
	changeCategory(event: any) {
		this.news = [];
		console.log('change category to: ', event.detail.value);
		this.loadCategoryNews(event.detail.value);
	}


	// get news data from API request with a modified url that includes category
	loadCategoryNews(category: string, event?: any) {
		console.log('run loadCategoryNews function with category: ', category);
		this.newsService.getNews('top-headlines?category=' + category + '&country=us').subscribe(
			data => {
				this.data = data;
			},
			error => {
				console.log('err', error);
			}

			
		);
	}
	// get news detail via news API service
	onGoToNewsDetail(article: Article) {
		this.newsService.getNewsDetail(article);
	}

	// load news when news category chosen
	loadData(event?: any) {
		this.loadCategoryNews(this.category, event);
	}

		// refresh page via network service
	onRefresh(event: any) {
    this.networkService.refreshPage(event);
  }

	// doInfinite(infiniteScroll) {
	// 	console.log('begin async operation');

	// 	setTimeout(() => {
	// 		for (let i = 0; i < 30; i++) {
	// 			this.item.push
	// 		}
	// 	})
	// }

}
