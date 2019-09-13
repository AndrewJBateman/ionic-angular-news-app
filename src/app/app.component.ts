// angular & ionic/angular node modules
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';

// ionic-native & ngx node modules
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// Services
import { NetworkService } from './providers/network.service';
import { ThemeService } from './providers/theme.service';
import { LanguageService } from './providers/language.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
	text = '';
	darkMode: any;
	public isConnected = false;
	public language: string = this.languageService.selected;
	public appPages = [
    {
			title: 'News',
			titlefr: 'Nouvelles',
			titlesp: 'Noticias',
      url: '/app/tabs/news',
			icon: 'list-box',
			menuIcon: 'menuIconNews'
			
    },
    {
			title: 'Categories',
			titlefr: 'Categories',
			titlesp: 'Categorias',
      url: '/app/tabs/categories',
			icon: 'options',
			menuIcon: 'menuIconCategories'
    },
    {
			title: 'Favourites',
			titlefr: 'Favoris',
			titlesp: 'Favoritas',
      url: '/app/tabs/favourites',
			icon: 'heart-empty',
			menuIcon: 'menuIconFavourites'
    },
    {
			title: 'About',
			titlefr: 'Sur cette app',
			titlesp: 'Sobre esta app',
      url: '/app/tabs/about',
			icon: 'information-circle-outline',
			menuIcon: 'menuIconAbout'
    }
  ];

  constructor(
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		public themeService: ThemeService,
		public networkService: NetworkService,
		public toastController: ToastController,
		private languageService: LanguageService,
  ) {
		this.initializeApp();
		this.darkMode = this.themeService.darkMode;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
			this.splashScreen.hide();
			
			// check network available
			this.networkService.getNetworkStatus().subscribe((connected: boolean) => {
				this.isConnected = connected;
				console.log('Network status: ', this.isConnected);
				// this.isConnected ? this.presentToast('network connected') : this.presentToast('network disconnected');
			this.text = this.isConnected ? 'network connected' : 'network disconnected';
			this.presentToast(this.text);
			})
			this.languageService.setInitialAppLanguage();
    });
	}

	async presentToast(message: string) {
		const toast = await this.toastController.create({
			message: message,
			position: 'middle',
			duration: 2000
		});
		toast.present();
	}
	
	languageChange() {
    this.languageService.setLanguage(this.language);
  }
}
