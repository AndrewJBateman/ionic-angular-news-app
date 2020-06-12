import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { CategoriesPage } from "./categories.page";
import { PipesModule } from "../../pipes/pipes.module";
import { ComponentsModule } from "../../components/components.module";

// ngx node modules
import { TranslateModule } from "@ngx-translate/core";

const routes: Routes = [
  {
    path: "",
    component: CategoriesPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    TranslateModule,
    ComponentsModule,
  ],
  declarations: [CategoriesPage],
})
export class CategoriesPageModule {}
