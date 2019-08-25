import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { SourcesResponse, NewsApiResponse } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiUrl = environment.API_URL;
const apiKey = environment.API_KEY;
let url: string;

@Injectable({
  providedIn: 'root'
})

export class NewsApiService {
	currentArticle: any; // used by news-detail page

	constructor(private http: HttpClient) {}

	// Use http - Angular HttpClient class - to query the news API and return data as an observable,
	// using SourcesResponse type assertion to tell the query the expected data structure.
	getSources(url) {
		return this.http.get<SourcesResponse>(`${apiUrl}/${url}&apiKey=${apiKey}`);
  }

	// Use http to query the news API and return data as an observable,
	// using NewsApiResponse type assertion to tell the query the expected data structure.
  getNews(url) {
		return this.http.get<NewsApiResponse>(`${apiUrl}/${url}&apiKey=${apiKey}`);
	}
}
