import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LocationResponse, SourcesResponse, NewsApiResponse } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiUrl = environment.API_URL;
const apiKey = environment.API_KEY;

@Injectable({
  providedIn: 'root'
})

export class NewsApiService {
	currentArticle: any; // used by news-detail page

	// fetch news from user country
	constructor(private http: HttpClient) {
		this.getCountryCode();
	}

	// fetch country code from ip location API
	getCountryCode() {
		return this.http.get<LocationResponse>('http://ip-api.com/json');
	}

	// fetch sources from news API using url input
	getSources(url: string) {
		return this.http.get<SourcesResponse>(`${apiUrl}/${url}&apiKey=${apiKey}`);
  }

	// fetch news from news API using url input
  getNews(url: string) {
		return this.http.get<NewsApiResponse>(`${apiUrl}/${url}&apiKey=${apiKey}`);
	}
}
