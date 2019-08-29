import { Component, ViewEncapsulation } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

import { ThemeService } from './providers/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
	darkMode: any;
	
	public appPages = [
    {
      title: 'News',
      url: '/app/tabs/news',
			icon: 'list-box',
			menuIcon: 'menuIconNews'
			
    },
    {
      title: 'Categories',
      url: '/app/tabs/categories',
			icon: 'options',
			menuIcon: 'menuIconCategories'
    },
    {
      title: 'Favourites',
      url: '/app/tabs/favourites',
			icon: 'heart-empty',
			menuIcon: 'menuIconFavourites'
    },
    {
      title: 'About',
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
		public themeService: ThemeService
  ) {
		this.initializeApp();
		this.darkMode = this.themeService.darkMode;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
	}
	
}
