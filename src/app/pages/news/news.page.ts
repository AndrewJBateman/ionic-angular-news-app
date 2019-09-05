
import { Component, OnInit, NgModule, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController, ToastController, Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { debounceTime, map } from 'rxjs/operators';

import { NewsApiService } from '../../providers/newsapi.service';
import { StoreNewsService } from '../../providers/store-news.service';
import { Article } from './../../interfaces/interfaces';
import { NetworkService } from '../../providers/network.service';
import { environment } from './../../../environments/environment';

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
	public isConnected = true;

	constructor(
		public toastController: ToastController,
		private platform: Platform,
		private newsService: NewsApiService,
		private router: Router,
		private storeNewsService: StoreNewsService,
		private networkService: NetworkService,
		private changeDetectorRef: ChangeDetectorRef,
		public modalCtrl: ModalController,
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController
	) {	}
	// ngOnInit lifecycle checks network and loads list of sources.
	// It is not reloaded when reentering page.
  ngOnInit() {
		console.log('[News] OnInit');

		// check network status
		this.networkSubscriber();

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

		// get list of news sources via news API service
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

	// subscribe to network connected state
	networkSubscriber(): void {
		this.networkService
			.getNetworkStatus()
			.pipe(
				debounceTime(300))
			.subscribe((connected: boolean) => {
				this.isConnected = connected;
				console.log('[News] isConnected', this.isConnected);
			});
	}

	// get boolean state of network status
	networkStatus() {
		this.networkService.getNetworkStatus().subscribe();
	}

	// ionViewWillEnter lifecycle event used so news reloads if coming back to the news page
	ionViewWillEnter() {
	}

	// fetch news for user/default country via news API service
	getCountryNews(countryCode: string) {
		this.newsService.getNews('top-headlines?country=' + countryCode).subscribe(
			data => {
				this.data = data;
			}
		);
	};

	// bind source to selected source
  chooseSource(source: string) {
		console.log('run function chooseSource to make news source equal to selected source');
		this.selectedSource = source;
  	this.loadSourceData();
	}

	// fetch news from default/selected source via news API service
	loadSourceData(event?: any) {
		this.newsService.getNews('top-headlines?sources=' + this.selectedSource).subscribe(data => {
			console.log('loadSourceData function ran to get list of news articles from', this.selectedSource);
			
			this.data = data;
		});
	}

	// refresh page via network service
	onRefresh(event: any) {
    this.networkService.refreshPage(event);
  }

	// fetch news detail via news API service
	onGoToNewsDetail(article: Article) {
		this.newsService.getNewsDetail(article);
	}

	// show pop-up message using this function with 'message' input
	async presentToast(message: string) {
		const toast = await this.toastController.create({
			message,
			position: 'middle',
			duration: 2000
		});
		toast.present();
	}
}
