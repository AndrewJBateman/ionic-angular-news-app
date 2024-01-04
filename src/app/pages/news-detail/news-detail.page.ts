/**
 * The `NewsDetailPage` class is responsible for displaying the details of a news article.
 */
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  AlertController,
  LoadingController,
  ToastController,
  IonicModule,
} from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { NewsApiService } from "src/app/providers/news-api.service";
import { StorageService } from "src/app/providers/storage.service";
import { Article } from "./../../interfaces/interfaces";
import { TitleNosourcePipe } from "../../pipes/title-nosource.pipe";
import { DateConvertPipe } from "../../pipes/date-convert.pipe";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-news-detail",
  templateUrl: "./news-detail.page.html",
  styleUrls: ["./news-detail.page.scss"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    DateConvertPipe,
    TitleNosourcePipe,
  ],
})
export class NewsDetailPage implements OnInit {
  article: Article;

  constructor(
    public newsService: NewsApiService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public storageService: StorageService,
    public router: Router
  ) {}

  /**
   * Initializes the component and sets the `article` property to the current article from the `NewsApiService`.
   */
  ngOnInit() {
    this.article = this.newsService.currentArticle;
  }

  /**
   * Appends "(For more 'Visit Website' below)" to the given content string.
   * 
   * @param content - The content string to modify.
   * @returns The modified content string with "(For more 'Visit Website' below)" appended to it.
   */
  appendString(content: string) {
    try {
      let result = content
        .split("[")[0]
        .concat(`(For more 'Visit Website' below)`);
      return result;
    } catch (err) {
      throw err;
    }
  }
}
