/**
 * The NewsPage class is responsible for displaying news articles. It interacts with various services such as NewsApiService, StorageService, and NetworkService to fetch and store data, handle network connectivity, and display toast messages.
 *
 * Inputs:
 * - toastController: An instance of the ToastController class from the Ionic framework.
 * - platform: An instance of the Platform class from the Ionic framework.
 * - newsService: An instance of the NewsApiService class.
 * - storageService: An instance of the StorageService class.
 * - networkService: An instance of the NetworkService class.
 * - loadingCtrl: An instance of the LoadingController class from the Ionic framework.
 * - alertCtrl: An instance of the AlertController class from the Ionic framework.
 *
 * Outputs:
 * - The newsData property is updated with the fetched news articles.
 * - Toast messages are displayed to indicate success or failure.
 * - The sources property is updated with the fetched news sources.
 * - The sourceChosen property is set to true to indicate that a source has been selected.
 */
import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  LoadingController,
  ToastController,
  Platform,
  IonicModule,
} from "@ionic/angular";
import { AlertController } from "@ionic/angular";

import { NewsApiService } from "../../providers/news-api.service";
import { StorageService } from "../../providers/storage.service";
import { NetworkService } from "../../providers/network.service";

import {
  Article,
  SourcesResponse,
  NewsApiResponse,
} from "../../interfaces/interfaces";
import { TranslateModule } from "@ngx-translate/core";
import { ArticleListComponent } from "../../components/article-list/article-list.component";
import { ProgressBarComponent } from "../../components/progress-bar/progress-bar.component";
import { PageRefreshComponent } from "../../components/page-refresh/page-refresh.component";
import { PipesModule } from "src/app/pipes/pipes.module";

@Component({
  selector: "app-news",
  templateUrl: "./news.page.html",
  styleUrls: ["./news.page.scss"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PipesModule,
    PageRefreshComponent,
    ProgressBarComponent,
    ArticleListComponent
  ],
  providers: [NetworkService],
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

  async getCountryNews(): Promise<void> {
    await this.platform.ready();
    try {
      const data: NewsApiResponse = await this.newsService
        .getNews(`top-headlines?country=${this.defaultCountry}`)
        .toPromise();
      this.newsData = data.articles;
    } catch (error) {
      this.presentErrorToast(
        `An error occurred: "${error.message}". Please try again later.`
      );
    }
  }

  async getStoredSources(): Promise<void> {
    const val = await this.storageService.getStoredData("storedSources");
    this.storedSources = JSON.parse(val);
  }

  async presentErrorToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: "middle",
      color: "danger",
      cssClass: "custom-toast",
    });
    toast.present();
  }

  async presentSuccessToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 500,
      position: "middle",
      color: "success",
      cssClass: "custom-toast",
    });
    toast.present();
  }

  async getSources(): Promise<void> {
    const SOURCES_ENDPOINT = "/sources?";

    this.newsService.getSources(SOURCES_ENDPOINT).subscribe({
      next: (data: SourcesResponse) => {
        this.sources = data.sources;
        this.storageService.storeData(
          "storedSources",
          JSON.stringify(this.sources)
        );
        this.presentSuccessToast("News sources stored successfully");
      },
      error: (error) => {
        this.presentErrorToast(
          `An error occurred: "${error.message}". Please try again later.`
        );
      },
    });
  }

  loadSourceData() {
    this.newsService
      .getNews(`top-headlines?sources=${this.defaultSource}`)
      .subscribe({
        next: (data: NewsApiResponse) => {
          this.sourceChosen = true;
          this.newsData = data.articles;
        },
        error: (error) => {
          this.presentErrorToast(
            `An error occurred: "${error.message}". Please try again later.`
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
