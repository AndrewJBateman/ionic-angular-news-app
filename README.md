# :zap: Ionic Angular News App

App to search for and display news items from a [news API](https://newsapi.org/) using the [Ionic 5 framework](https://ionicframework.com/docs).

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
  * [:envelope: Contact](#envelope-contact)

## :books: General info

* The [News API](https://newsapi.org/) is a simple HTTP REST API for searching and retrieving live articles from the web using:

1. Keyword or phrase
2. Date published
3. Source name
4. Source domain name
5. Language

## :camera: Screenshots

| ![Ionic page](./img/news1.png) | ![Ionic page](./img/news2.png) | ![Ionic categories page](./img/news3.png) |
|:---:|:---:|:---:|
| News Page French | News Page Spanish | News Page English |

| ![Ionic page](./img/categories1.png) | ![Ionic page](./img/categories2.png) | ![Ionic categories page](./img/categories3.png) |
|:---:|:---:|:---:|
| Categories Page Business | Categories Page Entertainment| Article Detail Page |

| ![Ionic page](./img/favourites1.png) | ![Ionic page](./img/favourites2.png) | ![Ionic categories page](./img/favourites3.png) |
|:---:|:---:|:---:|
| Favourites Page Empty | Favourites Page Some | Favourites Page Full |

| ![Ionic page](./img/about1.png) | ![Ionic page](./img/about2.png) | ![Ionic categories page](./img/about3.png) |
|:---:|:---:|:---:|
| About Page French | About Page + Side Menu | About Page + Info Menu |

## :signal_strength: Technologies

* [Ionic v5](https://ionicframework.com/)
* [Angular v9](https://angular.io/)
* [Ionic/angular v5](https://www.npmjs.com/package/@ionic/angular)
* [RxJS v6](https://reactivex.io/)
* [News REST API used to search for news articles](https://newsapi.org/)
* [IP Geolocation API](https://ipapi.co/#api)
* [Ionic Storage v2](https://ionicframework.com/docs/building/storage) - remove?
* [Ionic Native Network v5](https://ionicframework.com/docs/native/network)
* [Ionic Native Social-Sharing v5](https://ionicframework.com/docs/native/social-sharing)
* [Ionic ngx-Translate v12](https://ionicframework.com/docs/v3/developer-resources/ng2-translate/)
* [NGX-Translate internationalization library for Angular](http://www.ngx-translate.com/)
* [Ionic open source Ionicons](https://ionicons.com/)
* [Day.js Date Conversion module v1](https://www.npmjs.com/package/dayjs)

## :floppy_disk: Setup

* It is necessary to [register with news API](https://newsapi.org/docs/get-started) to get an API key that is stored in the `environment.ts` file
* To start the server on _localhost://8100_ type: `ionic serve`
* To create a build file suitable for Firebase deployment: `ionic build --prod --release`
* To deploy to Firebase: `firebase deploy`

## :computer: Code Examples

* function to identify the user's country and show news for that country when app first initialises.

```typescript
// array of countries served by the news API service - does not include Spain
const countryCodeArray = [
  'ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co',
  'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie',
  'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng',
  'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se',
  'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za'
];

/* fetch user country via separate service function provider
fetch news for that country
use defaultCountry if country not in countryCode array
*/
this.newsService.getCountryCode().subscribe(
  data => {
    console.log('country code search: ', data);
    const countryData = data;
    this.countryCode = countryData.countryCode.toLowerCase();
    const checkedCountryCode = countryCodeArray
      .indexOf(this.countryCode.toLowerCase()) === -1 ? this.defaultCountry : countryData.countryCode.toLowerCase();
    console.log('Country code is: ', checkedCountryCode);
    this.newsStorageService.storeData('userCountry', checkedCountryCode.toString());
    this.getCountryNews(checkedCountryCode);
  }
)
```

## :cool: Features

* **Typescript interface** used to define the expected structures of the json objects returned from the IP and news APIs
* **Separate providers (services)** page with API http fetch rxjs observables
* **Custom pipes** used to modify API news article titles, contents and derive '..time ago' from a date string
* **Dark mode** switch on menu changes from light to dark mode
* **Offline Storage** of favourite articles using Ionic Storage
* **Common Refresh Component** dragging down will perform refresh function
* **Common Progess Bar Component** ion-card shows while news loading on News, Categories and Favourites pages
* **Localisation using i18n** so user can select between English (default), Spanish and French

* [Ionic colour generator](https://ionicframework.com/docs/theming/color-generator) used to create color palette.

## :books: Navigation/Pages

* **Nav side-bar:** news, categories, favorites, search, about, change language, dark theme toggle + Unsplash image with credit. Sidemenu is dismissed when the user clicks on a list item.
* **News page** shows world headlines using an ion-card list. Uses *ngIf to only show card if it has an image to avoid having news items with empty spaces (API data is not perfect). Shows time as '... ago' using a date convert pipe that uses day.js to convert the API Coordinated Universal Time (UTC) date-time string to '...ago'.
* **News-detail page** shows the selected news item in more detail. Title has news source end text removed using a custom Angular pipe as I show this information in the top toolbar. Also uses custom pipe to show time as '... ago'. Includes working footer buttons for 'More info', which opens news source in a separate window and 'Favourite' which adds the article to a stored news 'favourites' array. Array symbol at end of article content string replaced with text using split and concat. Uses a Floating Action Button for social media sharing.**Remove `<li>` from content text using regex** .
* **Categories page:** ion-segment used to show categories in a scrollable horizontal menu: Sport, Busines, Health, Technology, Science, General, Entertainment. Shows time as '... ago'.
* **Favourites page:** articles listed in reverse date-time order that have been saved by clicking on the favourites icon on the news-detail page.
**TODO:** Includes popover that will let user delete all list items.
**TODO:** Sliding from the right deletes the favourite.
**TODO:** prevent storage of duplicate articles. Add 'delete all' button at top. lhs sliding delete is not working.
* **About page** Working. Displays Unsplash image with author credit and short info about the app with links to APIs used. Header includes popover with links to Author Website, Github Repo and a Contact Page.
**TODO:** add contact page, add my thumbnail image. Redirect to my website.
* **Search page** add or remove Search page.

## :clipboard: Status

* Status: Working, production build file created, deployed to Firebase. Missing the ion-fab social share.

## :clipboard: To-do

1. Dark theme - improve
2. Splash screen
3. SqLite - use as default database?
4. replace any types with models - Article etc

## :clap: Inspiration

* Some of project structure based on: [Ionic example app: 'A conference app built with Ionic to demonstrate Ionic'](https://github.com/ionic-team/ionic-conference-app).
* The code for checking network status is based on: [Ionic 4 Network Check Example Problem](https://forum.ionicframework.com/t/ionic-4-network-check-example-problem/157909/2).
* [Ionic Academy Tutorial: How to Localise Your Ionic App with ngx-translate](https://ionicacademy.com/localise-ionic-ngx-translate/) however language selected using ion-select-option dropdown list in side-menu (ie not using a popover page).
* [Regexr.com](https://regexr.com/) for developing and testing regex expressions.
* [How to Publish Ionic App on Google Play Store](https://www.swagasoft.com.ng/2020/01/how-to-publish-ionic-app-on-google-play.html)

## :envelope: Contact

* Repo created by [ABateman](https://www.andrewbateman.org) - you are welcome to [send me a message](https://andrewbateman.org/contact)
