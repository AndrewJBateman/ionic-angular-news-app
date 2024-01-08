import { StorageService } from './../../../providers/storage.service';
import { PopoverController, IonicModule } from "@ionic/angular";
import { Component, ChangeDetectorRef, inject, OnInit } from "@angular/core";

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
export class PopoverPage implements OnInit {
  private popoverController = inject(PopoverController);
  private storageService = inject(StorageService);

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    // initialization logic
  }

  clearFavourites() {
    this.storageService.deleteStoredFavourites();
    this.popoverController.dismiss();
    this.changeDetectorRef.detectChanges();
  }
}
