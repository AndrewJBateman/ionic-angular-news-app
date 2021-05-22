# :zap: Ionic Angular News App

* Displays news items from a [news API](https://newsapi.org/) using the [Ionic 5 framework](https://ionicframework.com/docs).
* **Note:** to open web links in a new window use: _ctrl+click on link_

![GitHub repo size](https://img.shields.io/github/repo-size/AndrewJBateman/ionic-angular-news-app?style=plastic)
![GitHub pull requests](https://img.shields.io/github/issues-pr/AndrewJBateman/ionic-angular-news-app?style=plastic)
![GitHub Repo stars](https://img.shields.io/github/stars/AndrewJBateman/ionic-angular-news-app?style=plastic)
![GitHub last commit](https://img.shields.io/github/last-commit/AndrewJBateman/ionic-angular-news-app?style=plastic)

## :page_facing_up: Table of contents

* [:zap: Ionic Angular News App](#zap-ionic-angular-news-app)
  * [:page_facing_up: Table of contents](#page_facing_up-table-of-contents)
  * [:books: General info](#books-general-info)
  * [:camera: Screenshots](#camera-screenshots)
  * [:signal_strength: Technologies](#signal_strength-technologies)
  * [:floppy_disk: Setup](#floppy_disk-setup)
  * [:computer: Code Examples](#computer-code-examples)
  * [:cool: Features](#cool-features)
  * [:books: Navigation/Pages](#books-navigationpages)
  * [:clipboard: Status](#clipboard-status)
  * [:clipboard: To-do](#clipboard-to-do)
  * [:clap: Inspiration](#clap-inspiration)
  * [:file_folder: License](#file_folder-license)
  * [:envelope: Contact](#envelope-contact)

## :books: General info

* The [News API](https://newsapi.org/) is a simple HTTP REST API for searching and retrieving live articles from the web.
* The [News API](https://newsapi.org/) now only works on localhost. It will not work when deployed due to CORS errors (error 406) which means they want you to pay a subscription to fully access the API. This app was successfully deployed to Android Studio - see screen shots below but I deleted the firebase depoyment. I will do another news app using the [Gnews](https://gnews.io/) API which has a free tier for up to 100 requests per day and 10 articles per search.

## :camera: Screenshots

| ![Ionic page](./img/news1.png) | ![Ionic page](./img/news2.png) | ![Ionic page](./img/news3.png) |
| :----------------------------: | :----------------------------: | :---------------------------------------: |
|        News Page French        |       News Page Spanish        |             News Page English             |

| ![Ionic page](./img/news-detail1.png) | ![Ionic page](./img/news-detail2.png) | ![Ionic page](./img/news-detail3.png) |
| :----------------------------: | :----------------------------: | :---------------------------------------: |
|        News Detail Page French        |       News Detail Page Spanish        |             News Detail Page English             |

| ![Ionic page](./img/categories1.png) | ![Ionic page](./img/categories2.png) | ![Ionic page](./img/categories3.png) |
| :----------------------------------: | :----------------------------------: | :---------------------------------------------: |
|       Categories Page Business       |    Categories Page Entertainment     |               Article Detail Page               |

| ![Ionic page](./img/favourites1.png) | ![Ionic page](./img/favourites2.png) | ![Ionic page](./img/favourites3.png) |
| :----------------------------------: | :----------------------------------: | :---------------------------------------------: |
|        Favourites Page Empty         |         Favourites Page Some         |              Favourites Page Full               |

| ![Ionic page](./img/about1.png) | ![Ionic page](./img/about2.png) | ![Ionic page](./img/about3.png) |
| :-----------------------------: | :-----------------------------: | :----------------------------------------: |
|        About Page French        |     About Page + Side Menu      |           About Page + Info Menu           |

| ![Ionic page](./img/dark1.png) | ![Ionic page](./img/dark2.png) | ![Ionic page](./img/dark3.png) |
| :-----------------------------: | :-----------------------------: | :----------------------------------------: |
|        Dark Mode News Page       |     Dark Mode Categories+Menu Page      |           Dark Mode About Page           |

| ![Ionic page](./img/android-aboutdark.png) | ![Ionic page](./img/android-aboutlight.png) | ![Ionic page](./img/android-categoriesdark.png) |
| :-----------------------------: | :-----------------------------: | :----------------------------------------: |
|        Android About Dark Page       |     Android About Light Page      |           Android Categories Dark Page           |

| ![Ionic page](./img/android-detaildark.png) | ![Ionic page](./img/android-detaildark1.png) | ![Ionic page](./img/android-detaillight.png) |
| :-----------------------------: | :-----------------------------: | :----------------------------------------: |
|        Android Detail Dark Page        |     Android Detail Dark Page      |           Android Detail Light Page           |

| ![Ionic page](./img/android-favouriteslight.png) | ![Ionic page](./img/android-menudark.png) | ![Ionic page](./img/android-menulight.png) |
| :-----------------------------: | :-----------------------------: | :----------------------------------------: |
|        Android Favourites Light Page       |     Android Menu Dark Page      |           Android Menu Light Page           |

## :signal_strength: Technologies

* [Ionic v5](https://ionicframework.com/)
* [Angular v12](https://angular.io/)
* [Ionic/angular v5](https://www.npmjs.com/package/@ionic/angular)
* [RxJS v6](https://reactivex.io/)
* [News REST API used to search for news articles](https://newsapi.org/)
* [IP Geolocation API](https://ipapi.co/#api)
* [Ionic Storage v2](https://ionicframework.com/docs/building/storage)
* [Ionic ngx-Translate v13](https://ionicframework.com/docs/v3/developer-resources/ng2-translate/)
* [Ionic Native Network v5](https://ionicframework.com/docs/native/network)
* [NGX-Translate internationalization library for Angular v6](http://www.ngx-translate.com/)
* [Ionic open source Ionicons](https://ionicons.com/)
* [Day.js Date Conversion module v1](https://www.npmjs.com/package/dayjs)

## :floppy_disk: Setup

* It is necessary to [register with news API](https://newsapi.org/docs/get-started) to get an API key that is stored in the `environment.ts` file
* To start the server on _localhost://8100_ type: `ionic serve`
* `npm run dev:ssr` to run SSR dev server
* `npm run build:ssr` to create SSR build file
* `npm run serve:ssr` to run SSR build file on port `localhost:4000`
* To run linter: `npm run lint`
* to add android platform: `ionic cordova platform add android`
* to create build file for android: `ionic cordova build android`
* to run on device plugged in via USB cable: `ionic cordova run android`
* Follow this link [to deploy to IOS or Android](https://ionicframework.com/docs/angular/your-first-app/6-deploying-mobile)

## :computer: Code Examples

* service to switch between dark/light display mode

```typescript
// enable dark or light mode from html toggle switch event via changeThemeMode() function
export class ThemeService {
  darkMode: boolean;
  renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    private storage: Storage,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
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
```

## :cool: Features

* **Typescript interface** used to define the expected structures of the JSON objects returned from the IP and news APIs
* **Separate providers (services)** page with API http fetch rxjs observables
* **Custom pipes** used to modify API news article titles, contents and derive '..time ago' from a date string
* **Dark mode** Menu toggle changes from light to dark mode
* **Offline Storage** of dark mode status & favourite articles using Ionic Storage
* **Common Refresh Component** dragging down will perform refresh function
* **Common Progess Bar Component** ion-card shows while news loading on News, Categories and Favourites pages
* **Localisation using i18n** so user can select between English (default), Spanish and French
* [Ionic colour generator](https://ionicframework.com/docs/theming/color-generator) used to create color palette

## :books: Navigation/Pages

* **Nav side-bar:** news, categories, favorites, search, about, change language, dark theme toggle + Unsplash image with credit. Sidemenu is dismissed when the user clicks on a list item.
* **News page** shows world headlines using an ion-card list. Uses \*ngIf to only show card if it has an image to avoid having news items with empty spaces (API data is not perfect). Shows time as '... ago' using a date convert pipe that uses day.js to convert the API Coordinated Universal Time (UTC) date-time string to '...ago'.
* **News-detail page** shows the selected news item in more detail. Title has news source end text removed using a custom Angular pipe as I show this information in the top toolbar. Also uses custom pipe to show time as '... ago'. Includes working footer buttons for 'More info', which opens news source in a separate window and 'Favourite' which adds the article to a stored news 'favourites' array. Array symbol at end of article content string replaced with text using split and concat. **Remove `<li>` from content text using regex** .
* **Categories page:** ion-segment used to show categories in a scrollable horizontal menu: Sport, Busines, Health, Technology, Science, General, Entertainment. So far categories only shown from English sources. Shows time as '... ago'.
* **Favourites page:** articles listed in reverse date-time order that have been saved by clicking on the favourites icon on the news-detail page. **Include popover that will let user delete all list items, sliding from the right deletes the favourite, prevent storage of duplicate articles. Add 'delete all' button at top. lhs sliding delete is not working.**
* **About page** Displays Unsplash image with author credit and short info about the app with links to APIs used. Header includes popover with links to Author Website, Github Repo and a Contact Page.

## :clipboard: Status

* Status: SSR errors. Pre-SSR: Working except language on start-up menu, production build file created, successfully deployed to Android Studio
* Updated may 2021

## :clipboard: To-do

* Disable clicking on menu icon when in news page.
* Fix menu language storage.
* Check image shown when API image is null

## :clap: Inspiration

* Some of project structure based on: [Ionic example app: 'A conference app built with Ionic to demonstrate Ionic'](https://github.com/ionic-team/ionic-conference-app)
* The code for checking network status is based on: [Ionic 4 Network Check Example Problem](https://forum.ionicframework.com/t/ionic-4-network-check-example-problem/157909/2)
* [Ionic Academy Tutorial: How to Localise Your Ionic App with ngx-translate](https://ionicacademy.com/localise-ionic-ngx-translate/) however language selected using ion-select-option dropdown list in side-menu (ie not using a popover page)
* [Regexr.com](https://regexr.com/) for developing and testing regex expressions
* [How to Publish Ionic App on Google Play Store](https://www.swagasoft.com.ng/2020/01/how-to-publish-ionic-app-on-google-play.html) for interest - although I will not be publishing this app
* [Shields badges for readme](https://shields.io)
* [Easy-Resize to resize images to a smaller file size](https://www.easy-resize.com/en/)
* [Font Awesome Free Icon svgs](https://fontawesome.com/icons?d=gallery&m=free)

## :file_folder: License

* This project is licensed under the terms of the MIT license.

## :envelope: Contact

* Repo created by [ABateman](https://github.com/AndrewJBateman), email: gomezbateman@yahoo.com
