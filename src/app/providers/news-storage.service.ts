import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NewsStorageService implements OnInit {
	// initialise a store of news articles as an empty array
	news: Article[] = [];

  constructor(
		private storage: Storage,
		private toastContr: ToastController
	) {}

	ngOnInit() {
		this.storage.clear();
		this.loadFavourites();
	}

		storeData(key: string, value: string) {
		try {
			this.storage.set(key, value);
			// const result: string = await this.storage.get(key);
			// return true;
		}
		catch (err) {
			alert('Error storing data: ' + err);
			// return false;
		}
	}

	async getStoredData(key: string) {
		try {
			return this.storage.get(key);
		}
		catch(err) {
			alert ('Error getting stored data: ' + err);
			return null;
		}
	}

	// storeCountryCode(checkedCountryCode) {
	// 	this.storage.set('userCountry', checkedCountryCode);
	// }

	addToFavourites(article: Article) {
		!this.isFavourite(article) ? this.storeArticle(article) :	console.log('article already exists in storage');
	}

	// add new article to beginning of array so in date order. Add array to storage.
	storeArticle(article: Article) {
		console.log('news array: ', this.news);
		this.news.unshift(article);
		console.log('article added to news array: ', this.news);
		this.storage.set('favourites', this.news);
		this.storeData('favourites', JSON.stringify(this.news));
		this.presentToast('Article added to favourites');
	}
	// remove article from news array and storage.
	removeFromFavourites(article: Article) {
		this.news = this.news.filter(data => data.title !== article.title);
		this.storeData('favourites', JSON.stringify(this.news));

		console.log('article removed from news array: ', this.news);
		this.presentToast('Article deleted from favourites');
	}

	// use indexOf to test if article exists in favourites array or not.
	isFavourite(article: Article) {
		return this.news.indexOf(article) !== -1;
	}

	async presentToast(message: string) {
		const toast = await this.toastContr.create({
			message,
			position: 'middle',
			duration: 2000
		});
		toast.present();
	}

	// get aray of articles from storage to list on favourites page.
	async loadFavourites() {
		const favourites = await this.storage.get('favourites');
		console.log('favourites in storage: ', favourites);

		if (favourites) {
			this.news = favourites;
		}
	}
}
