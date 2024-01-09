/**
 * AppComponent class represents the root component of the application.
 * It is responsible for initializing the app, setting up the platform, and handling various functionalities.
 *
 * Properties:
 * - platform: Platform instance for accessing platform-specific functionalities.
 * - router: Router instance for navigating between different routes.
 * - splashScreen: SplashScreen instance for controlling the splash screen.
 * - statusBar: StatusBar instance for controlling the status bar.
 * - themeService: ThemeService instance for managing the app's theme.
 * - networkService: NetworkService instance for handling network-related functionalities.
 * - toastController: ToastController instance for displaying toast messages.
 * - languageService: LanguageService instance for managing the app's language.
 * - storageService: StorageService instance for accessing and manipulating stored data.
 * - darkMode: A boolean flag indicating whether the app is in dark mode or not.
 * - language: The selected language for the app.
 * - menuCtrl: MenuController instance for controlling the app's menu.
 * - appPages: An array of app pages.
 *
 * Methods:
 * - initializeApp(): Initializes the app by setting up the platform, status bar, splash screen, language, and dark mode.
 * - darkStartMode(): Sets the app's theme based on the stored dark mode value.
 * - languageChange(): Changes the app's language based on the selected language.
 * - closeMenu(event: any): Closes the app's menu if it is open.
 */

import { APP_PAGES } from "../assets/pages-data";
// angular & ionic/angular node modules
import { Component, ViewEncapsulation, inject } from "@angular/core";
import { Router } from "@angular/router";
import { MenuController, Platform, ToastController } from "@ionic/angular";

// ionic-native & ngx node modules
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

// Services
import { NetworkService } from "./providers/network.service";
import { ThemeService } from "./providers/theme.service";
import { LanguageService } from "./providers/language.service";
import { StorageService } from "./providers/storage.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  private platform = inject(Platform);
  private router = inject(Router);
  private splashScreen = inject(SplashScreen);
  private statusBar = inject(StatusBar);
  public themeService = inject(ThemeService);
  public networkService = inject(NetworkService);
  public toastController = inject(ToastController);
  private languageService = inject(LanguageService);
  private storageService = inject(StorageService);

  public darkMode: boolean;
  public language: string = this.languageService.selected;
  private menuCtrl: MenuController;
  public appPages = APP_PAGES;

  constructor() {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.languageService.setInitialAppLanguage();
      this.darkStartMode();
    });
  }

  async darkStartMode() {
    this.storageService.getStoredData("dark-theme").then((val) => {
      if (val !== null && val !== undefined) {
        this.darkMode = JSON.parse(val);
        this.darkMode === true
          ? this.themeService.enableDark()
          : this.themeService.enableLight();
      } else {
        // Handle null or undefined stored data
        this.themeService.enableLight();
      }
    });
  }

  languageChange() {
    this.languageService.setLanguage(this.language);
  }

  async closeMenu(event: any) {
    if (this.menuCtrl.isOpen()) {
      await this.menuCtrl.close();
    }
  }
}
