import { Component, OnInit } from '@angular/core';

import {NewsApiService} from 'src/app/providers/newsapi.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
	styleUrls: ['./news-detail.page.scss']
})
export class NewsDetailPage implements OnInit {
  article: any;

  constructor(private newsService: NewsApiService) { }

  ngOnInit() {
    this.article = this.newsService.currentArticle;
  }

}
