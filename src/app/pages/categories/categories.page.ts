import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSegment} from '@ionic/angular';

import {Article} from 'src/app/interfaces/interfaces';
import {NewsApiService} from 'src/app/providers/newsapi.service';

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

	constructor(private newsService: NewsApiService) {}

	ngOnInit() {
		this.category = this.categories[0];
		console.log('run loadCategoryNews function with default category: ', this.category);
		this.loadCategoryNews(this.category);
	}

	changeCategory(event: any) {
		this.news = [];
		console.log('change category to: ', event.detail.value);
		this.loadCategoryNews(event.detail.value);
	}

	// gets news data from API request with a modified url that includes the category in the url input parameter
	loadCategoryNews(category: string, event?: any) {
		console.log('run loadCategoryNews function with category: ', category);
		this.newsService.getNews('top-headlines?country=gb&category=' + category).subscribe(
			data => {
				this.data = data;
			},
			error => {
				console.log('err', error);
			}

			
		);

	// 	if (event) {
	// 		event.target.complete();
	// 	}
	}
	// avoid duplication - move to services?
	onGoToNewsDetail(article: any) {}

	loadData(event?: any) {
		this.loadCategoryNews(this.category, event);
	}
}
