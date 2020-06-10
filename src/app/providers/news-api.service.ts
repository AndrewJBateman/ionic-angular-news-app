import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

import {
  LocationResponse,
  SourcesResponse,
  NewsApiResponse,
} from "../interfaces/interfaces";
import { Article } from "../interfaces/interfaces";
import { environment } from "../../environments/environment";

const apiUrl = environment.API_URL;
const apiKey = environment.API_KEY;

@Injectable({
  providedIn: "root",
})
export class NewsApiService implements OnInit {
  currentArticle: any; // used by news-detail page

  // fetch news from user country
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getCountryCode();
  }

  // fetch country code from ip location API
  // response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
  getCountryCode() {
    return this.http.get("https://ipapi.co/json").pipe(
      map((data: LocationResponse) => data),
      catchError((err) => {
        return throwError("News sources not found, error: ", err);
      })
    );
  }

  // fetch sources from news API using url input
  getSources(url: string) {
    return this.http.get(`${apiUrl}/${url}&apiKey=${apiKey}`).pipe(
      map((data: SourcesResponse) => data),
      catchError((err) => {
        return throwError("News sources not found, error: ", err);
      })
    );
  }

  // fetch news from news API using url input
  getNews(url: string) {
    return this.http.get(`${apiUrl}/${url}&apiKey=${apiKey}`).pipe(
      map((data: NewsApiResponse) => data),
      catchError((err) => {
        return throwError("Problem fetching news from API, error: ", err);
      })
    );
  }

  // navigate to news-detail page to show article detail
  getNewsDetail(article: Article) {
    this.currentArticle = article;
    this.router.navigate(["/news-detail"]);
  }
}
