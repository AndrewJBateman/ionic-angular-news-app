import { Component, OnInit } from "@angular/core";
import { LoadingController, ToastController, Platform } from "@ionic/angular";
import { AlertController } from "@ionic/angular";

// services
import { NewsApiService } from "../../providers/news-api.service";
import { StorageService } from "../../providers/storage.service";
import {
  Article,
  SourcesResponse,
  NewsApiResponse,
} from "../../interfaces/interfaces";
import { NetworkService } from "../../providers/network.service";

@Component({
  selector: "app-news",
  templateUrl: "./news.page.html",
  styleUrls: ["./news.page.scss"],
})
export class NewsPage implements OnInit {
  newsData: Article[];
  sources = [];
  defaultSource = "CNN";
  defaultCountry = "us";
  isConnected = true;
  sourceChosen = false;
  storedSources: any;
  storedData: any;
  storedselectedNews: any;
  selectedNews: any;
  selectedLanguage: "string";

  constructor(
    private toastController: ToastController,
    private platform: Platform,
    public newsService: NewsApiService,
    private storageService: StorageService,
    public networkService: NetworkService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.getSources();
    this.getStoredSources();
    this.getCountryNews();
  }

  getSources(): void {
    const SOURCES_ENDPOINT = "/sources?";

    this.newsService.getSources(SOURCES_ENDPOINT).subscribe({
      next: (data: SourcesResponse) => {
        this.sources = data.sources;
        this.storageService.storeData(
          "storedSources",
          JSON.stringify(this.sources)
        );
        this.presentToast("News sources stored successfully", false);
      },
      error: (error) => {
        this.presentToast(
          `An error occurred: "${error.message}". Please try again later.`,
          true
        );
      },
    });
  }

  getStoredSources(): void {
    this.storageService.getStoredData("storedSources").then((val) => {
      this.storedSources = JSON.parse(val);
    });
  }

  async presentToast(message: string, error: boolean) {
    const toast = await this.toastController.create({
      message: message,
      duration: error ? 2000 : 500,
      position: "middle",
      color: "error ? 'danger' : 'success'",
      cssClass: "custom-toast",
    });
    toast.present();
  }

  getCountryNews(): void {
    this.platform.ready().then(() => {
      this.newsService
        .getNews("top-headlines?country=" + this.defaultCountry)
        .subscribe({
          next: (data: NewsApiResponse) => {
            this.newsData = data.articles;
          },
          error: (error) => {
            this.presentToast(
              `An error occurred: "${error.message}". Please try again later.`,
              true
            );
          },
        });
    });
  }

  loadSourceData() {
    this.newsService
      .getNews("top-headlines?sources=" + this.defaultSource)
      .subscribe({
        next: (data: NewsApiResponse) => {
          this.sourceChosen = true;
          this.newsData = data.articles;
        },
        error: (error) => {
          this.presentToast(
            `An error occurred: "${error.message}". Please try again later.`,
            true
          );
        },
      });
  }

  public trackByPublishedDate(index: number, article: Article): string {
    return article ? article.publishedAt : null;
  }

  public trackById(index: number, storedSources: any): string {
    return storedSources ? storedSources.name : null;
  }
}
