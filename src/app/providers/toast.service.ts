import { Injectable, inject } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  private toastController = inject(ToastController);

  async presentErrorToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: "middle",
      color: "danger",
      cssClass: "custom-toast",
    });
    toast.present();
  }

  async presentSuccessToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 500,
      position: "middle",
      color: "success",
      cssClass: "custom-toast",
    });
    toast.present();
  }
}
