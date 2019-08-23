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

	constructor(private newsService: NewsApiService) {}

	ngOnInit() {
		// this.segment.value = this.categories[0];
		// this.loadCategoryNews(this.segment.value);
		this.loadCategoryNews('general');
	}

	changeCategory(event: any) {
		this.news = [];
		this.loadCategoryNews(event.detail.value);
	}

	// gets news data from API request with a modified url that includes the category in the url input parameter
	loadCategoryNews(category: string, event?: any) {
		console.log('loadCategoryNews function started with this category: ', category);
		this.newsService.getNews('top-headlines?country=gb&category=' + category).subscribe(
			data => {
				this.data = data;
			},
			error => {
				console.log('err', error);
			}
		);
	}
	// avoid duplication - move to services?
	onGoToNewsDetail(article: any) {}

	loadData(event: any) {
		this.loadCategoryNews(this.segment.value, event);
	}
}
