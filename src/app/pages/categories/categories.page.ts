import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { IonicModule } from "@ionic/angular";

import { Article, NewsApiResponse } from "src/app/interfaces/interfaces";
import { NewsApiService } from "src/app/providers/news-api.service";
import { NetworkService } from "./../../providers/network.service";
import { TranslateModule } from "@ngx-translate/core";
import { ArticleListComponent } from "../../components/article-list/article-list.component";
import { ProgressBarComponent } from "../../components/progress-bar/progress-bar.component";
import { PageRefreshComponent } from "../../components/page-refresh/page-refresh.component";
import { PipesModule } from "../../pipes/pipes.module";
import { ComponentsModule } from "../../components/components.module";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.page.html",
  styleUrls: ["./categories.page.scss"],
  standalone: true,
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    IonicModule,
    PageRefreshComponent,
    ProgressBarComponent,
    ArticleListComponent,
    PipesModule,
    TranslateModule,
  ],
})
export class CategoriesPage implements OnInit {
  private newsService = inject(NewsApiService);
  private networkService = inject(NetworkService);
  private router = inject(Router);

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
