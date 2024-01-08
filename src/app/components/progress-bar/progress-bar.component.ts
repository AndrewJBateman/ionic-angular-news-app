import { Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { IonicModule } from "@ionic/angular";

@Component({
    selector: "app-progress-bar",
    templateUrl: "./progress-bar.component.html",
    styleUrls: ["./progress-bar.component.scss"],
    standalone: true,
    imports: [IonicModule, TranslateModule],
})
export class ProgressBarComponent {}
