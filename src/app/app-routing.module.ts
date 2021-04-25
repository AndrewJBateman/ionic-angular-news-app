import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/app/tabs/news",
    pathMatch: "full",
  },
  {
    path: "app",
    loadChildren: () =>
      import("./pages/tabs/tabs.module").then((m) => m.TabsPageModule),
  },
  {
    path: "news-detail",
    loadChildren: () =>
      import("./pages/news-detail/news-detail.module").then(
        (m) => m.NewsDetailPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: "enabled" }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
