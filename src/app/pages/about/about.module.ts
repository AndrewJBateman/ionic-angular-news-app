import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { TranslateModule } from "@ngx-translate/core";

import { PopoverPage } from "../about-popover/about-popover";
import { AboutPage } from "./about.page";

const routes: Routes = [
  {
    path: "",
    component: AboutPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
  ],
  declarations: [AboutPage, PopoverPage],
  entryComponents: [PopoverPage],
  bootstrap: [AboutPage],
})
export class AboutPageModule {}
