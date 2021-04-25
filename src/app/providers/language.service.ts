import { TranslateService } from "@ngx-translate/core";
import { Platform } from "@ionic/angular";
import { Injectable, OnInit } from "@angular/core";
import { Storage } from "@ionic/storage-angular";

const LNG_KEY = "SELECTED_LANGUAGE";

@Injectable({
	providedIn: "root",
})
export class LanguageService {
	selected = "en";

	constructor(
		private translate: TranslateService,
		private storage: Storage,
		private plt: Platform
	) {this.init();}

	async init() {
		const storage = await this.storage.create();
    this.storage = storage;
	}

	// sets default language as browser language. Store language choice
	setInitialAppLanguage(): void {
		const language = this.translate.getBrowserLang();
		this.translate.setDefaultLang(language);

		this.storage.get(LNG_KEY).then((val) => {
			if (val) {
				this.setLanguage(val);
				this.selected = val;
			} else {
				this.setLanguage("en");
				this.selected = "en";
      }
		});
	}

	// lng can be 'en', 'fr' or 'sp'
	setLanguage(lng: string) {
		this.translate.use(lng);
		this.selected = lng;
		this.storage.set(LNG_KEY, lng);
	}
}
