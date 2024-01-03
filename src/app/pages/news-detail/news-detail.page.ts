import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, LoadingController, ToastController, IonicModule } from "@ionic/angular";

import { NewsApiService } from "src/app/providers/news-api.service";
import { StorageService } from "src/app/providers/storage.service";
import { Article } from "./../../interfaces/interfaces";
import { TitleNosourcePipe } from "../../pipes/title-nosource.pipe";
import { DateConvertPipe } from "../../pipes/date-convert.pipe";
import { TranslateModule } from "@ngx-translate/core";
import { NgIf } from "@angular/common";

@Component({
    selector: "app-news-detail",
    templateUrl: "./news-detail.page.html",
    styleUrls: ["./news-detail.page.scss"],
    standalone: true,
    imports: [
        IonicModule,
        NgIf,
        TranslateModule,
        DateConvertPipe,
        TitleNosourcePipe,
    ],
})
export class NewsDetailPage implements OnInit {
	article: any;

	constructor(
		public newsService: NewsApiService,
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		public toastCtrl: ToastController,
		public storageService: StorageService,
    public router: Router
	) {}

	ngOnInit() {
		this.article = this.newsService.currentArticle;
	}

	onAddToFavourites(article: Article) {
		this.storageService.addToFavourites(article);
	}

	onRemoveFromFavourites(article: Article) {
		this.storageService.removeFromFavourites(article);
	}

	isFavourite(article: Article) {
		return this.storageService.isFavourite(article);
	}

	async openSocial(network: string, fab: HTMLIonFabElement) {
		const loading = await this.loadingCtrl.create({
			message: `Posting to ${network}`,
			duration: Math.random() * 1000 + 500,
		});
		await loading.present();
		await loading.onWillDismiss();
		fab.close();
	}

	appendString(content: string) {
		try {
			let result = content
				.split("[")[0]
				.concat(`(For more 'Visit Website' below)`);
			return result;
		} catch (err) {
			console.log(err);
		}
	}

  goBack() {
    this.router.navigateByUrl('/');
  }
}
