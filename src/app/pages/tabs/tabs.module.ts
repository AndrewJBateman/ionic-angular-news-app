import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

// pages
import { TabsPage } from "./tabs.page";
import { TabsPageRoutingModule } from "./tabs.router.module";

// ngx node modules
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TabsPageRoutingModule,
        TranslateModule,

    ],
    declarations: [TabsPage]
})
export class TabsPageModule {}
