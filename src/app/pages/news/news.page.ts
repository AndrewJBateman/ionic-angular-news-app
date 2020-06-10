// angular & ionic/angular node modules
import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import {
  LoadingController,
  ModalController,
  ToastController,
  Platform,
} from "@ionic/angular";
import { AlertController } from "@ionic/angular";

// rxjs node modules
import { debounceTime } from "rxjs/operators";

// services
import { NewsApiService } from "../../providers/news-api.service";
import { NewsStorageService } from "../../providers/news-storage.service";
import { Article } from "./../../interfaces/interfaces";
import { NetworkService } from "../../providers/network.service";

// array of countries served by the news API service - note it does not include Spain
const countryCodeArray = [
  "ae",
  "ar",
  "at",
  "au",
  "be",
  "bg",
  "br",
  "ca",
  "ch",
  "cn",
  "co",
  "cu",
  "cz",
  "de",
  "eg",
  "fr",
  "gb",
  "gr",
  "hk",
  "hu",
  "id",
  "ie",
  "il",
  "in",
  "it",
  "jp",
  "kr",
  "lt",
  "lv",
  "ma",
  "mx",
  "my",
  "ng",
  "nl",
  "no",
  "nz",
  "ph",
  "pl",
  "pt",
  "ro",
  "rs",
  "ru",
  "sa",
  "se",
  "sg",
  "si",
  "sk",
  "th",
  "tr",
  "tw",
  "ua",
  "us",
  "ve",
  "za",
];

@Component({
  selector: "app-news",
  templateUrl: "./news.page.html",
  styleUrls: ["./news.page.scss"],
})
export class NewsPage implements OnInit {
  countryCode: string;
  checkedCountryCode: string;
  data: any;
  sources = [];
  onlySources = [];
  selectedSource = "CNN";
  defaultCountry = "us";
  public isConnected = true;
  sourceChosen = false;
  storedSources: any;
  storedData: any;
  storedNews: any;
  storedselectedNews: any;
  selectedNews: any;
  selectedLanguage: "string";

  constructor(
    public toastController: ToastController,
    private platform: Platform,
    private newsService: NewsApiService,
    private newsStorageService: NewsStorageService,
    private networkService: NetworkService,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {}
  // ngOnInit lifecycle checks network and loads list of sources.
  // It is not reloaded when reentering page.
  ngOnInit() {
    // check network status
    // this.networkSubscriber();

    /*
		fetch user country via separate service function provider
		fetch news for that country
		use defaultCountry if country not in countryCode array
		*/
    this.newsService.getCountryCode().subscribe((data) => {
      const countryData = data;
      this.countryCode = countryData.country.toLowerCase();
      const checkedCountryCode =
        countryCodeArray.indexOf(this.countryCode.toLowerCase()) === -1
          ? this.defaultCountry
          : countryData.country.toLowerCase();
      this.newsStorageService.storeData(
        "userCountry",
        checkedCountryCode.toString()
      );
      this.getCountryNews(checkedCountryCode);
    });

    // get list of news sources via news API service
    if (this.storedNews == null) {
      this.newsService.getSources("/sources?").subscribe(
        (data) => {
          this.sources = data.sources;
          this.newsStorageService.storeData(
            "this.storedSources",
            JSON.stringify(this.sources)
          );
        },
        (err) => {
          console.log("an error occured: ", err);
        }
      );
    }
    this.newsStorageService.getStoredData("this.storedSources").then((val) => {
      this.storedSources = JSON.parse(val);
    });
  }

  // subscribe to network connected state
  // networkSubscriber(): void {
  //   this.networkService
  //     .getNetworkStatus()
  //     .pipe(debounceTime(300))
  //     .subscribe((connected: boolean) => {
  //       this.isConnected = connected;
  //     });
  // }

  // get boolean state of network status
  // networkStatus() {
  //   this.networkService.getNetworkStatus().subscribe();
  // }

  ionViewWillEnter() {}

  // if no stored news then subscribe from http service, otherwise get news directly from storage
  getCountryNews(countryCode: string) {
    this.platform.ready().then(() => {
      if (this.storedNews == null) {
        this.newsService
          .getNews("top-headlines?country=" + countryCode)
          .subscribe(
            (data) => {
              this.data = data;
              this.newsStorageService.storeData(
                "this.storedNews",
                JSON.stringify(this.data)
              );
            },
            (err) => {
              console.log("An error occured, error: ", err);
            }
          );
      }
      this.newsStorageService.getStoredData("this.storedNews").then((val) => {
        this.storedNews = JSON.parse(val).articles;
      });
    });
  }

  // fetch news from default/selected source via news API service
  loadSourceData() {
    this.newsService
      .getNews("top-headlines?sources=" + this.selectedSource)
      .subscribe(
        (data) => {
          this.sourceChosen = true;
          this.data = data;
          this.newsStorageService.storeData(
            "this.storedselectedNews",
            JSON.stringify(this.data)
          );
        },
        (err) => {
          console.log("An error occured, error: ", err);
        }
      );
      this.newsStorageService.getStoredData("this.storedselectedNews").then((val) => {
        this.selectedNews = JSON.parse(val).articles;
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
