import { StorageService } from './../../../providers/storage.service';
import { Component, inject } from "@angular/core";
import { PopoverController, IonicModule } from "@ionic/angular";

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
  standalone: true,
  imports: [IonicModule],
})
export class PopoverPage {
  private popoverController = inject(PopoverController);
  private storageService = inject(StorageService);

  clearFavourites() {
    this.storageService.deleteStoredFavourites();
    this.popoverController.dismiss();
    window.location.reload();
  }
}
