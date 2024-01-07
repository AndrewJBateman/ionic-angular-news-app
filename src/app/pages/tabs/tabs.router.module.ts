import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "news",
        children: [
          {
            path: "",
            loadComponent: () =>
              import("../news/news.page").then((m) => m.NewsPage),
          },
        ],
      },
      {
        path: "news-detail",
        children: [
          {
            path: "",
            loadComponent: () =>
              import("../news-detail/news-detail.page").then(
                (m) => m.NewsDetailPage
              ),
          },
        ],
      },
      {
        path: "categories",
        children: [
          {
            path: "",
            loadComponent: () =>
              import("../categories/categories.page").then(
                (m) => m.CategoriesPage
              ),
          },
        ],
      },
      {
        path: "favourites",
        children: [
          {
            path: "",
            loadComponent: () =>
              import("../favourites/favourites.page").then(
                (m) => m.FavouritesPage
              ),
          },
        ],
      },
      {
        path: "about",
        children: [
          {
            path: "",
            loadComponent: () =>
              import("../about/about.page").then((m) => m.AboutPage),
          },
        ],
      },
      {
        path: "",
        redirectTo: "/tabs/news",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "/app/tabs/news",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
