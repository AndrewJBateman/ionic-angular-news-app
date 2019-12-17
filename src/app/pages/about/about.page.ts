import { Component, ViewEncapsulation } from '@angular/core';

import { PopoverController } from '@ionic/angular';
import { PopoverPage } from '../about-popover/about-popover';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage {

  constructor(public popoverCtrl: PopoverController) { }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: event
    });
    await popover.present();
  }
}
