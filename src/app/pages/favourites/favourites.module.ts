// angular & ionic/angular node modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

// ngx node modules
import { TranslateModule } from "@ngx-translate/core";

// Component & pipe modules
import { PopoverPage } from "./favourites-popover/favourites-popover";
import { FavouritesPage } from "./favourites.page";
import { ComponentsModule } from "../../components/components.module";
import { PipesModule } from "../../pipes/pipes.module";

import { NewsSvgComponent } from "../../components/svgs/news-svg/news-svg.component";

const routes: Routes = [
	{
		path: "",
		component: FavouritesPage,
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
    ],
    declarations: [FavouritesPage, PopoverPage, NewsSvgComponent]
})
export class FavouritesPageModule {}
