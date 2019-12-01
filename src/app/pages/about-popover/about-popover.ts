import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  template: `
    <ion-list>
      <ion-item button (click)="openContact()">
        <ion-label>Contact Form</ion-label>
      </ion-item>
      <ion-item button (click)="openUrl('https://andrewbateman.org')">
        <ion-label>Author Website</ion-label>
      </ion-item>
      <ion-item button (click)="openUrl('https://github.com/AndrewJBateman/ionic-angular-news-app')">
        <ion-label>App Github Repo</ion-label>
      </ion-item>
    </ion-list>
  `
})
export class PopoverPage {
  constructor(public popoverCtrl: PopoverController) {}

	openContact() {
		console.log('openContact function clicked')
		this.popoverCtrl.dismiss();
	}

  openUrl(url: string) {
		console.log('openUrl function clicked')
    window.open(url, '_blank');
    this.popoverCtrl.dismiss();
	}
	

}
