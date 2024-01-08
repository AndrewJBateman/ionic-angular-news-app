import { IonItemSliding, LoadingController, IonicModule } from "@ionic/angular";
import { Component, inject, ChangeDetectorRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PopoverController } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";

import { StorageService } from "./../../providers/storage.service";
import { NewsApiService } from "./../../providers/news-api.service";
import { NetworkService } from "./../../providers/network.service";
import { Article } from "../../interfaces/interfaces";

import { PopoverPage } from "./favourites-popover/favourites-popover";
import { ArticleListComponent } from "../../components/article-list/article-list.component";
import { NewsSvgComponent } from "../../components/svgs/news-svg/news-svg.component";
import { ProgressBarComponent } from "../../components/progress-bar/progress-bar.component";
import { PageRefreshComponent } from "../../components/page-refresh/page-refresh.component";

@Component({
  selector: "app-favourites",
  templateUrl: "./favourites.page.html",
  styleUrls: ["./favourites.page.scss"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageRefreshComponent,
    ProgressBarComponent,
    NewsSvgComponent,
    ArticleListComponent,
    TranslateModule,
  ],
})
export class FavouritesPage {
  public storageService = inject(StorageService);
  public networkService = inject(NetworkService);
  public newsService = inject(NewsApiService);
  private loadingController = inject(LoadingController);
  private popoverController = inject(PopoverController);

  sliderOptions = {
    allowSlidePrev: false,
    allowSlideNext: false,
  };

  private loadingElement: any;

  /**
   * Presents the popover component.
   * @param event The event that triggered the popover.
   */
  presentPopover(event: KeyboardEvent | MouseEvent | TouchEvent): Promise<void> {
    return new Promise(async (resolve) => {
      const popover = await this.popoverController.create({
        component: PopoverPage,
        event: event,
      });
      await popover.present();
      resolve();
    });
  }

  /**
   * Removes the favourite article and closes the sliding item.
   * @param article The article to be removed.
   * @param slidingItem The sliding item to be closed.
   */
  onRemoveFavourite(article: Article, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.loadingElement.present();
    this.storageService.removeFromFavourites(article);
    this.loadingElement.dismiss();
  }

  public trackByPublishedDate(index: number, article: Article): string {
    return article ? article.publishedAt : null;
  }
}