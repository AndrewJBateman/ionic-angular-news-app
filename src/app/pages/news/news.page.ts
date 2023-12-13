import { Component, OnInit } from "@angular/core";
import {
  LoadingController,
  ModalController,
  ToastController,
  Platform,
} from "@ionic/angular";
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
  data: any;
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
    private newsService: NewsApiService,
    private storageService: StorageService,
    private networkService: NetworkService,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {}
  // ngOnInit lifecycle checks network and loads list of sources.
  // It is not reloaded when reentering page.
  ngOnInit() {
    // get country news
    this.getCountryNews();

    // get list of news sources via news API service
    this.newsService.getSources("/sources?").subscribe({
      next: (data: SourcesResponse) => {
        this.sources = data.sources;
        this.storageService.storeData(
          "storedSources",
          JSON.stringify(this.sources)
        );
      },
      error: (error) => {
        console.log("an error occured: ", error);
      },
    });
    this.storageService.getStoredData("storedSources").then((val) => {
      this.storedSources = JSON.parse(val);
    });
  }

  // subscribe from http service
  getCountryNews(): void {
    this.platform.ready().then(() => {
      this.newsService.getNews("top-headlines?country=" + this.defaultCountry).subscribe({
        next: (data: NewsApiResponse) => {
          this.data = data.articles;
        },
        error: (error) => {
          console.log("an error occured: ", error);
        },
      });
    });
  }

  // fetch news from default/selected source via news API service
  loadSourceData() {
    this.newsService
      .getNews("top-headlines?sources=" + this.defaultSource)
      .subscribe({
        next: (data: NewsApiResponse) => {
          this.sourceChosen = true;
          this.data = data.articles;
        },
        error: (error) => {
          console.log("An error occured, error: ", error);
        },
      });
  }

  // refresh page via network service
  onRefresh(event: any) {
    this.networkService.refreshPage(event);
  }

  // fetch news detail via news API service
  onGoToNewsDetail(article: Article) {
    this.newsService.getNewsDetail(article);
  }

  // show pop-up message using this function with 'message' input
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      position: "middle",
      duration: 2000,
    });
    toast.present();
  }
}
