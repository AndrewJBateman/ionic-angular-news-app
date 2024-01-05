/**
 * Represents the AboutPage class.
 * 
 * @class
 * @description The AboutPage class is responsible for creating and presenting a popover component when a mouse event occurs.
 * If an error occurs during the creation or presentation of the popover, an error toast is displayed and the error is thrown.
 */
import { Component, inject } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { IonicModule } from "@ionic/angular";

import { PopoverPage } from "../about-popover/about-popover";
import { ToastService } from "../../providers/toast.service";

@Component({
  selector: "app-about",
  templateUrl: "./about.page.html",
  styleUrls: ["./about.page.scss"],
  standalone: true,
  imports: [PopoverPage, TranslateModule, IonicModule],
  providers: [ToastService],
})
export class AboutPage {
  private popoverCtrl = inject(PopoverController);
  private toastService = inject(ToastService);

  /**
   * Presents the popover component when a mouse event occurs.
   * 
   * @param {MouseEvent} event - The mouse event that triggers the popover creation and presentation.
   * @returns {Promise<void>} - A promise that resolves when the popover is presented successfully.
   * @throws {Error} - If an error occurs during the creation or presentation of the popover.
   */
  async presentPopover(event: MouseEvent): Promise<void> {
    try {
      const popover = await this.popoverCtrl.create({
        component: PopoverPage,
        event: event,
      });
      await popover.present();
    } catch (error) {
      this.toastService.presentErrorToast(
        `An error occurred: "${error.message}". Please try again later.`
      );
      throw error(error);
    }
  }
}
