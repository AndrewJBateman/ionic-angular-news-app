import { IonItemSliding, LoadingController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";

import { PopoverController } from "@ionic/angular";
import { PopoverPage } from "./favourites-popover/favourites-popover";

import { StorageService } from "src/app/providers/storage.service";
import { Article } from "src/app/interfaces/interfaces";
import { NewsApiService } from "src/app/providers/news-api.service";
import { NetworkService } from "./../../providers/network.service";

@Component({
  selector: "app-favourites",
  templateUrl: "./favourites.page.html",
  styleUrls: ["./favourites.page.scss"],
})
export class FavouritesPage implements OnInit {
  sliderOptions = {
    allowSlidePrev: false,
    allowSlideNext: false,
  };

  constructor(
    private newsService: NewsApiService,
    public storageService: StorageService,
    private networkService: NetworkService,
    private loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController
  ) {}

  async presentPopover(event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: event,
    });
    await popover.present();
  }

  ngOnInit() {}

  // get news detail via news API service
  onGoToNewsDetail(article: Article) {
    this.newsService.getNewsDetail(article);
  }

  // refresh page via network service
  onRefresh(event: any) {
    this.networkService.refreshPage(event);
  }

  onRemoveFavourite(article: Article, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.loadingCtrl
      .create({
        message: "Deleting...",
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.storageService.removeFromFavourites(article);
        loadingEl.dismiss();
      });
  }

  onClearAll() {}
}
