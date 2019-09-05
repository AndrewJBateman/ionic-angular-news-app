import { Component, OnInit } from '@angular/core';

import { StoreNewsService } from 'src/app/providers/store-news.service';
import { Article } from 'src/app/interfaces/interfaces';
import { NewsApiService } from 'src/app/providers/newsapi.service';
import { NetworkService } from './../../providers/network.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
	sliderOptions = {
		allowSlidePrev: false,
		allowSlideNext: false
	};

  constructor(
		private newsService: NewsApiService,
		public storageService: StoreNewsService,
		private networkService: NetworkService
	) {	}

  ngOnInit() {
	}

	// get news detail via news API service
	onGoToNewsDetail(article: Article) {
		this.newsService.getNewsDetail(article);
	}
	
	// refresh page via network service
	onRefresh(event: any) {
		this.networkService.refreshPage(event);
	}

}
