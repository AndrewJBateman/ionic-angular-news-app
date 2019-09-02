import { Component, OnInit } from '@angular/core';
import { StoreNewsService } from 'src/app/providers/store-news.service';

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
		public storageService: StoreNewsService
	) {	}

  ngOnInit() {
  }

}
