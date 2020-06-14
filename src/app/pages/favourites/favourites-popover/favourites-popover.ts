import { Component } from "@angular/core";
import { PopoverController } from "@ionic/angular";

@Component({
  template: `
    <ion-list>
      <ion-item button (click)="clearFavourites()">
        <ion-label>
          <ion-icon name="trash" size="large" color="secondary"></ion-icon>
          Clear favourites
        </ion-label>
      </ion-item>
    </ion-list>
  `,
})
export class PopoverPage {
  constructor(public popoverCtrl: PopoverController) {}

  clearFavourites() {
    this.popoverCtrl.dismiss();
  }

  // openUrl(url: string) {
  //   console.log("openUrl function clicked");
  //   window.open(url, "_blank");
  //   this.popoverCtrl.dismiss();
  // }
}
