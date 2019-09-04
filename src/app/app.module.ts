// angular modules
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

// ionic modules
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

// Ionic native modules
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Network } from '@ionic-native/network/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
		AppComponent
	],
  entryComponents: [],
  imports: [
		CommonModule,
		FormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
		HttpClientModule,
		IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		SocialSharing,
		Network
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
