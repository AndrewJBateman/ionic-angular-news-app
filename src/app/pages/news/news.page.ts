import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';

import {NewsApiService} from '../../providers/newsapi.service';

// array of countries served by the news API service - note it does not include Spain
const countryCodeArray = [
	'ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co',
	'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie',
	'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng',
	'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se',
	'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za'
];

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
	styleUrls: ['./news.page.scss']
})

export class NewsPage implements OnInit {
	countryCode: string;
	checkedCountryCode: string;
	data: any;
	status = '';
	sources = [];
	selectedSource = 'CNN';
	timeAgo = '';
	time = '';
	newArticlesArray = [];

	constructor(
		private newsService: NewsApiService,
		private router: Router,
		public modalCtrl: ModalController,
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController
	) {
		// fetch user country then fetch news for that country - use 'us' if country not in countryCode array
		this.newsService.getCountryCode().subscribe(
			data => {
				const countryData = data;
				this.countryCode = countryData.countryCode.toLowerCase();
				const checkedCountryCode = countryCodeArray.indexOf(
					this.countryCode.toLowerCase()) === -1 ? 'us' : countryData.countryCode.toLowerCase();
				console.log(checkedCountryCode);
				this.getCountryNews(checkedCountryCode);
			}
		)
	}
	// ngOnInit lifecycle loads list of sources once.
	// It is not reloaded when reentering page but doesn't mattter as this data will not change.
  ngOnInit() {
		console.log('run ngOnInit function');
		this.newsService.getSources('/sources?').subscribe(
			data => {
				this.status = data.status;
				this.sources = data.sources;
				console.log('ngOnInit getSources function ran with status "', this.status, '" and retrieved an array of', +this.sources.length, 'sources.');
			}, err => {
				console.log('an error occured: ', err);
			}
		);
	}
	// ionViewWillEnter lifecycle event used so news reloads if coming back to the news page
	ionViewWillEnter() {
	}

	//  
	getCountryNews(countryCode: string) {
		this.newsService.getNews('top-headlines?country=' + countryCode).subscribe(
			data => {
				this.data = data;
			}
		);
	};
	// clicked article will make router navigate to news-detail page
  onGoToNewsDetail(article: any) {
    this.newsService.currentArticle = article;
    console.log('item clicked');
		this.router.navigate(['app/tabs/news-detail']);
	}

	// bind to selected source
  chooseSource(source: string) {
		console.log('run function chooseSource to make news source equal to selected source');
		this.selectedSource = source;
  	this.loadSourceData();
	}

	// fetch news from default/selected source using http get request
	loadSourceData(event?: any) {
		this.newsService.getNews('top-headlines?sources=' + this.selectedSource).subscribe(data => {
			console.log('loadSourceData function ran to get list of news articles from', this.selectedSource);
			
			this.data = data;
			this.newArticlesArray = Array.from(data.articles);
			console.log('this.newArticlesArray', this.newArticlesArray);
			// let timeSince = [];
			// for(let i=0; i<this.newArticlesArray.length+1; i++) {
			// 	let timeAgo = this.convertTime(data.articles[i].publishedAt);
			// 	let timeSince = (data.articles[i].publishedAt.replace(/[0-9]|[A-Z]|[-:]/g, '').concat(timeAgo));
			// }
				
		});
	}

	onShareActionSheet(news) {}

	// Convert article publishedAt "2019-08-28T10:24:08Z" to ISO 8601 format string with hour, minute and second part
	// Use to how long ago from now
	convertTime(time: string) {
		return moment.utc(
			time.replace('Z', '').replace('T', ' ')
			).fromNow();
	}
}
