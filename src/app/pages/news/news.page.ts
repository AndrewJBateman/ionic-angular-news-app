import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

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

	// fetch news for user/default country
	getCountryNews(countryCode: string) {
		this.newsService.getNews('top-headlines?country=' + countryCode).subscribe(
			data => {
				this.data = data;
			}
		);
	};

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
		});
	}

	onGoToNewsDetail(article: any) {
    this.newsService.currentArticle = article;
    console.log('item clicked');
		this.router.navigate(['/news-detail']);
	}
}
