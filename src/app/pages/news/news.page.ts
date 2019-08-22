import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NewsApiService} from 'src/app/providers/newsapi.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss']
})
export class NewsPage implements OnInit {

  constructor(private newsService: NewsApiService, private router: Router) {}

  data: any;

  ngOnInit() {
    this.newsService.getData('top-headlines?country=gb').subscribe(data => {
      console.log(data);
      this.data = data;
    });
  }

  onGoToNewsDetail(article) {
    this.newsService.currentArticle = article;
    console.log('item clicked');
    this.router.navigate(['/news-detail']);
  }
}
