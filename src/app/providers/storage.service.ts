import { FavouritesPage } from './../pages/favourites/favourites.page';
import { ToastService } from "./toast.service";
import { Injectable, OnInit, inject } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { Article } from "../interfaces/interfaces";

@Injectable({
  providedIn: "root",
})
export class StorageService implements OnInit {
  private storage = inject(Storage);
  private toastService = inject(ToastService);
  // initialise a store of news articles as an empty array
  news: Article[] = [];

  async ngOnInit() {
    await this.storage.create();
    this.storage.clear();
    this.loadFavourites();
  }

  storeData(key: string, value: string | boolean) {
    try {
      this.storage.set(key, value);
      // const result: string = await this.storage.get(key);
      // return true;
    } catch (err) {
      this.toastService.presentErrorToast(
        `An error occurred: "${err.message}". Please try again later.`
      );
    }
  }

  async deleteStoredFavourites() {
    try {
      await this.storage.remove("favourites");
      this.toastService.presentSuccessToast("Favourites cleared");
    } catch (err) {
      this.toastService.presentErrorToast(
        `An error occurred: "${err.message}". Please try again later.`
      );
    }
  }

  async getStoredData(key: string) {
    try {
      return this.storage.get(key);
    } catch (err) {
      this.toastService.presentErrorToast(
        `An error occurred: "${err.message}". Please try again later.`
      );
      return null;
    }
  }

  storeCountryCode(checkedCountryCode) {
    this.storage.set("userCountry", checkedCountryCode);
  }

  addToFavourites(article: Article) {
    !this.isFavourite(article)
      ? this.storeArticle(article)
      : this.toastService.presentErrorToast(
          `An error occurred. Please try again later.`
        );
  }

  // add new article to beginning of array so in date order. Add array to storage.
  storeArticle(article: Article) {
    this.news.unshift(article);
    this.storage.set("favourites", this.news);
    this.storeData("favourites", JSON.stringify(this.news));
    this.toastService.presentSuccessToast("Article added to favourites");
  }
  // remove article from news array and storage.
  removeFromFavourites(article: Article) {
    this.news = this.news.filter((data) => data.title !== article.title);
    this.storeData("favourites", JSON.stringify(this.news));

    this.toastService.presentSuccessToast("Article deleted from favourites");
  }

  // use indexOf to test if article exists in favourites array or not.
  isFavourite(article: Article) {
    return this.news.indexOf(article) !== -1;
  }

  // get array of articles from storage to list on favourites page.
  async loadFavourites() {
    const favourites = await this.storage.get("favourites");

    if (favourites) {
      this.news = favourites;
    }
  }
}
