/**
 * Represents the CategoriesPage component.
 * This component is responsible for displaying news articles based on selected categories.
 * It uses the NewsApiService to fetch news data and the NetworkService to handle network-related operations.
 * The component also includes methods for changing the category, loading category news, navigating to news detail, and refreshing the page.
 * @class
 */
import { Component, OnInit, inject, HostListener } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { IonicModule } from "@ionic/angular";

import { Article, NewsApiResponse } from "src/app/interfaces/interfaces";
import { NewsApiService } from "src/app/providers/news-api.service";
import { NetworkService } from "./../../providers/network.service";
import { ToastService } from "../../providers/toast.service";
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
  private router = inject(Router);
  private newsService = inject(NewsApiService);
  private networkService = inject(NetworkService);
  private toastService = inject(ToastService);

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
  @HostListener('window:keydown.enter', ['$event'])

  onRefresh(event: KeyboardEvent | MouseEvent | TouchEvent): void {
    this.networkService.refreshPage(event);
  }

  ngOnInit() {
    this.category = "general";
    this.loadCategoryNews(this.category);
  }

  changeCategory(event: any) {
    const newNewsArticles: Article[] = [];
    this.loadCategoryNews(event.detail.value);
    this.newsArticles = newNewsArticles;
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
        this.toastService.presentErrorToast(
          `An error occurred: "${error.message}". Please try again later.`
        );
        throw error(error);
      }
    );
  }

  onGoToNewsDetail(article: Article) {
    this.newsService.getNewsDetail(article);
  }

  public trackByPublishedDate(index: number, article: Article): string {
    return article ? article.publishedAt : null;
  }
}
