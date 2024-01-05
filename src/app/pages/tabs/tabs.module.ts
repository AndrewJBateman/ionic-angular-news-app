import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

// pages
import { TabsPage } from "./tabs.page";
import { TabsPageRoutingModule } from "./tabs.router.module";
import { CategoriesPageModule } from "../categories/categories.module";
import { FavouritesPageModule } from "../favourites/favourites.module";

// ngx node modules
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    imports: [
        CategoriesPageModule,
        CommonModule,
        FavouritesPageModule,
        FormsModule,
        IonicModule,
        TabsPageRoutingModule,
        TranslateModule,
        TabsPage,
    ],
})
export class TabsPageModule {}
