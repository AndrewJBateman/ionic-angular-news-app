import { IonItemSliding, LoadingController } from "@ionic/angular";
import { Component } from "@angular/core";

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
export class FavouritesPage {
  sliderOptions = {
    allowSlidePrev: false,
    allowSlideNext: false,
  };

  private loadingElement: any;

  constructor(
    public newsService: NewsApiService,
    public storageService: StorageService,
    public networkService: NetworkService,
    private loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController
  ) {}

  /**
   * Presents the popover component.
   * @param event The event that triggered the popover.
   */
  async presentPopover(event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: event,
    });
    await popover.present();
  }

  /**
   * Removes the favourite article and closes the sliding item.
   * @param article The article to be removed.
   * @param slidingItem The sliding item to be closed.
   */
  onRemoveFavourite(article: Article, slidingItem: IonItemSliding) {
    slidingItem.close();
    if (!this.loadingElement) {
      this.loadingElement = this.loadingCtrl.create({
        message: "Deleting...",
      });
    }
    this.loadingElement.present();
    this.storageService.removeFromFavourites(article);
    this.loadingElement.dismiss();
  }

  public trackByPublishedDate(index: number, article: Article): string {
    return article ? article.publishedAt : null;
  }
}
