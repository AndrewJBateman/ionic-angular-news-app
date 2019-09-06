import { Component, OnInit } from '@angular/core';

import { NewsStorageService } from 'src/app/providers/news-storage.service';
import { Article } from 'src/app/interfaces/interfaces';
import { NewsApiService } from 'src/app/providers/news-api.service';
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
		public storageService: NewsStorageService,
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
