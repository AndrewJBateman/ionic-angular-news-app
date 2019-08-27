import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  template: `
    <ion-list>
      <ion-item button (click)="close()">
        <ion-label>Contact Form</ion-label>
      </ion-item>
      <ion-item button (click)="close('https://andrewbateman.org')">
        <ion-label>Author Website</ion-label>
      </ion-item>
      <ion-item button (click)="close('https://github.com/AndrewJBateman/ionic-angular-news-app')">
        <ion-label>App Github Repo</ion-label>
      </ion-item>
    </ion-list>
  `
})
export class PopoverPage {
  constructor(public popoverCtrl: PopoverController) {}

  support() {
    // this.app.getRootNavs()[0].push('/support');
    this.popoverCtrl.dismiss();
  }

  close(url: string) {
    window.open(url, '_blank');
    this.popoverCtrl.dismiss();
  }
}
