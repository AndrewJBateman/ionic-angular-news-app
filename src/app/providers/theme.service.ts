import { Injectable, RendererFactory2, Inject, Renderer2, OnInit } from "@angular/core";

import { DOCUMENT } from "@angular/common";
import { Storage } from "@ionic/storage-angular";

@Injectable({
  providedIn: "root",
})

// enable dark or light mode from html toggle switch event via changeThemeMode() function
export class ThemeService implements OnInit{
  darkMode: boolean;
  renderer: Renderer2;

  constructor (
    private rendererFactory: RendererFactory2,
    private storage: Storage,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  async ngOnInit() {
    await this.storage.create();
	}

  enableDark() {
    this.renderer.addClass(this.document.body, "dark-theme");
    this.storage.set("dark-theme", true);
    this.darkMode = true;
  }

  enableLight() {
    this.renderer.removeClass(this.document.body, "dark-theme");
    this.storage.set("dark-theme", false);
    this.darkMode = false;
  }

  changeThemeMode(e: any) {
    e.detail.checked ? this.enableDark() : this.enableLight();
  }
}
