/**
 * ArticleListComponent displays a list of Article data.
 *
 * @Component decorator defines this as an Angular component.
 * - selector: Custom HTML element to use this component.
 * - templateUrl: Points to the component's HTML template.
 * - styleUrls: Points to the component's CSS styles.
 *
 * @Input() article: Binds an Article object to display in the template.
 */
import { Component, Input } from "@angular/core";
import { Article } from "../../interfaces/interfaces";

@Component({
  selector: "app-article-list",
  templateUrl: "./article-list.component.html",
  styleUrls: ["./article-list.component.scss"],
})
export class ArticleListComponent {
  @Input() article: Article | null;
}
