import { Component } from "@angular/core";
import { PopoverController, IonicModule } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
    templateUrl: "./about-popover.html",
    styleUrls: ["./about-popover.scss"],
    standalone: true,
    imports: [IonicModule],
})
export class PopoverPage {
  constructor(private router: Router, public popoverCtrl: PopoverController) {}

  openContactForm() {
    this.router.navigate(["app/tabs/contact"]);
    this.popoverCtrl.dismiss();
  }

  openUrl(url: string) {
    window.open(url, "_blank");
    this.popoverCtrl.dismiss();
  }
}
