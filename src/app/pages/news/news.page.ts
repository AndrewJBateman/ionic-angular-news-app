import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment';

// import { NewsApiResponse } from '../../interfaces/interfaces';
import {NewsApiService} from 'src/app/providers/newsapi.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss']
})
export class NewsPage implements OnInit {

  constructor(
		private newsService: NewsApiService,
		private router: Router,
		public modalCtrl: ModalController,
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController

		) {
	}
	data: any;
	status = '';
	sources = [];
	selectedSource = 'bbc-news';
	isLoading = false;
	timeAgo = '';
	time = '';
	newArticlesArray = [];

	// ngOnInit lifecycle loads list of sources once.
	// It is not reloaded when reentering page but doesn't mattter as this data will not change.
	// load news articles with the default selectedSource.
  ngOnInit() {
		console.log('run ngOnInit function');
		this.newsService.getSources('/sources?').subscribe(
			data => {
				this.status = data.status;
				this.sources = data.sources;
				console.log('ngOnInit getSources function ran with status "', this.status, '" and retrieved an array of', +this.sources.length, 'sources.');
			}, err => {
				console.log('an error occured: ', err);
				console.log(this.data);
			}
		);
	}
	// ionViewWillEnter lifecycle event used so news reloads if coming back to the news page
	ionViewWillEnter() {
		// this.isLoading = true;
		this.loadSourceData();
		console.log('ionViewWillEnter lifecycle ran with default source: ', this.selectedSource);
	}
	
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
