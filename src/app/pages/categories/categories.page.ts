import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Article } from "src/app/interfaces/interfaces";
import { NewsApiService } from "src/app/providers/news-api.service";
import { NetworkService } from "./../../providers/network.service";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.page.html",
  styleUrls: ["./categories.page.scss"],
})
export class CategoriesPage implements OnInit {
  categories = [
    "general",
    "technology",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
  ];
  news: Article[] = [];
  data: any;
  category: string;

  constructor(
    private newsService: NewsApiService,
    private networkService: NetworkService
  ) {}

  ngOnInit() {
    const randomCat = Math.floor(
      Math.random() * (this.categories.length - 1) + 1
    );
    this.category = this.categories[randomCat];
    this.loadCategoryNews(this.category);
  }

  // 
  changeCategory(event: any) {
    this.news = [];
    this.loadCategoryNews(event.detail.value);
  }

  // get news data from API request with a modified url that includes category
  loadCategoryNews(category: string) {
    this.newsService
      .getNews("top-headlines?category=" + category + "&country=us")
      .subscribe(
        (data) => {
          this.data = data;
        },
        (error) => {
          console.log("err", error);
        }
      );
  }
  // get news detail via news API service
  onGoToNewsDetail(article: Article) {
    this.newsService.getNewsDetail(article);
  }

  // load news when news category chosen
  loadData(event?: any) {
    this.loadCategoryNews(this.category);
  }

  // refresh page via network service
  onRefresh(event: any) {
    this.networkService.refreshPage(event);
  }

  // doInfinite(infiniteScroll) {
  // 	console.log('begin async operation');

  // 	setTimeout(() => {
  // 		for (let i = 0; i < 30; i++) {
  // 			this.item.push
  // 		}
  // 	})
  // }
}
