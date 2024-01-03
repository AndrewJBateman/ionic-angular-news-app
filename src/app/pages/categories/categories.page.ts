import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

import { Article, NewsApiResponse } from "src/app/interfaces/interfaces";
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
  newsArticles: Article[] = [];
  newsData: NewsApiResponse;
  category: string;

  constructor(
    private newsService: NewsApiService,
    private networkService: NetworkService,
    private router: Router
  ) {}

  ngOnInit() {
    this.category = "general";
    this.loadCategoryNews(this.category);
  }

  changeCategory(event: any) {
    this.newsArticles = [];
    this.loadCategoryNews(event.detail.value);
  }

  loadCategoryNews(category: string) {
    const url = `top-headlines?category=${encodeURIComponent(
      category
    )}&country=us`;
    this.newsService.getNews(url).subscribe(
      (data: NewsApiResponse) => {
        this.newsData = data;
      },
      (error) => {
        throw new Error(error);
      }
    );
  }

  onGoToNewsDetail(article: Article) {
    this.newsService.getNewsDetail(article);
  }

  onRefresh(event: any) {
    this.networkService.refreshPage(event);
  }

  public trackByPublishedDate(index: number, article: Article): string {
    return article ? article.publishedAt : null;
  }
}
