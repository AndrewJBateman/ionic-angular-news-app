// angular & ionic/angular node modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

// ngx node modules
import { TranslateModule } from "@ngx-translate/core";

// Component & pipe modules & services
import { NewsDetailPage } from "./news-detail.page";
import { PipesModule } from "../../pipes/pipes.module";
import { ComponentsModule } from "../../components/components.module";

const routes: Routes = [
  {
    path: "",
    component: NewsDetailPage,
  },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        TranslateModule,
        PipesModule,
        ComponentsModule,
        NewsDetailPage,
    ],
    exports: [],
})
export class NewsDetailPageModule {}
