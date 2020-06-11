import { Component, Input } from "@angular/core";
import { Article } from "../../interfaces/interfaces";

@Component({
  selector: "app-article-list",
  templateUrl: "./article-list.component.html",
  styleUrls: ["./article-list.component.scss"],
})
export class ArticleListComponent {
  @Input() article: Article;

  constructor() {}
}
