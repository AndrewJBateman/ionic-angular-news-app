import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {environment} from '../../environments/environment';

const apiUrl = environment.API_URL;
const apiKey = environment.API_KEY;

@Injectable({
  providedIn: 'root'
})

export class NewsApiService {
  currentArticle: any;

  constructor(private http: HttpClient) {}

  getData(url) {
    return this.http.get(`${apiUrl}/${url}&apiKey=${apiKey}`);
  }
}
