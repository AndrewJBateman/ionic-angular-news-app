import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { NewsApiService } from 'src/app/providers/newsapi.service';
import { StoreNewsService } from 'src/app/providers/store-news.service';
import { Article } from './../../interfaces/interfaces';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
	styleUrls: ['./news-detail.page.scss']
})
export class NewsDetailPage implements OnInit {
  article: any;

  constructor(
		public newsService: NewsApiService,
		public alertCtrl: AlertController,
		public storeNewsService: StoreNewsService
	) { }

  ngOnInit() {
    this.article = this.newsService.currentArticle;
	}
	
	onAddToFavourites(article: Article) {
		this.storeNewsService.addToFavourites(article);
		console.log('article isFavourite status has changed to: ', (this.isFavourite(article)));
	}
		

	onRemoveFromFavourites(article: Article) {
		this.storeNewsService.removeFromFavourites(article);
		console.log('article isFavourite status has changed to: ', (this.isFavourite(article)));
	}

	isFavourite(article: Article) {
		return this.storeNewsService.isFavourite(article);
	}

}
