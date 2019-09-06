import { Component, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

import { NewsApiService } from '../../providers/news-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent {
	@Input() article: Article;

  constructor(
		private newsService: NewsApiService,
		private router: Router
	) { }
  
}
