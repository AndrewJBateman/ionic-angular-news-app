import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NewsApiResponse } from '../interfaces/interfaces';
import {environment} from '../../environments/environment';

const apiUrl = environment.API_URL;
const apiKey = environment.API_KEY;

@Injectable({
  providedIn: 'root'
})

export class NewsApiService {
  currentArticle: any;

  constructor(private http: HttpClient) {}

  getNews(url) {
		return this.http.get<NewsApiResponse>(`${apiUrl}/${url}&apiKey=${apiKey}`);
	// }
	
	// getNewsByCategory(category: string) {

	// }

	}
}
