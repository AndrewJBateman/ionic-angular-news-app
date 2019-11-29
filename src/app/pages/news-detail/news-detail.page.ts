import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { NewsApiService } from 'src/app/providers/news-api.service';
import { NewsStorageService } from 'src/app/providers/news-storage.service';
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
		public loadingCtrl: LoadingController,
		public modalCtrl: ModalController,
		public toastCtrl: ToastController,
		public storeNewsService: NewsStorageService,
		public socialSharing: SocialSharing
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

  async openSocial(network: string, fab: HTMLIonFabElement) {
    const loading = await this.loadingCtrl.create({
      message: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    await loading.present();
    await loading.onWillDismiss();
    fab.close();
	}
	
	appendString(content:string) {
    try {
      let result = content.split('[')[0].concat(`(For more 'Visit Website' below)`);
      return result;
    } catch (err){
      console.log(err);
    }
  }

}
