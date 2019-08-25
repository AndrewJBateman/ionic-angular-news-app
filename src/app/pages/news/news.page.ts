import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

// import { NewsApiResponse } from '../../interfaces/interfaces';
import {NewsApiService} from 'src/app/providers/newsapi.service';

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
		this.loadSource();
	}
	data: any;
	status = '';
	sources = [];
	selectedSource = 'bbc-news';

	// ionViewDidLoad has been replaced with Angular Lifecycle ngOnInit
	// load news articles with the default selectedSource.
  ngOnInit() {
		this.loadSourceData();
		console.log('run ngOnInit with default source: ', this.selectedSource);
	}

	// return a list of news sources
	loadSource() {
		console.log('run loadSource function');
		this.newsService.getSources('/sources?').subscribe(
			data => {
				this.status = data.status;
				this.sources = data.sources;
				console.log('loadSource function ran with status "', this.status, '" and retrieved an array of', +this.sources.length, 'sources.');
			}, err => {
				console.log('an error occured: ', err);
			}
		);
		}

	// clicked article will make router navigate to news-detail page
  onGoToNewsDetail(article) {
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

	// fetch news from selected source using http get request
	loadSourceData() {

		this.newsService.getSources('top-headlines?sources=' + this.selectedSource).subscribe(data => {
      console.log('loadSourceData function ran to get list of news articles from', this.selectedSource);
      this.data = data;
		});

		// if (event) {
		// 	event.target.complete();
		// }
	}

}
