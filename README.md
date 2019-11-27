# Ionic Angular News App

App to search for and display news items from a [news API](https://newsapi.org/) using the [Ionic 5 framework](https://ionicframework.com/docs).

## Table of contents

* [General info](#general-info)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## General info

* The [News API](https://newsapi.org/) is a simple HTTP REST API for searching and retrieving live articles from the web using:

1. Keyword or phrase
2. Date published
3. Source name
4. Source domain name
5. Language

## Screenshots

![Ionic page](./img/news-page.png)
![Ionic page](./img/news-detail.png)
![Ionic page](./img/categories-page.png)
![Ionic page](./img/favourites-page.png)
![Ionic page](./img/about-page.png)

## Technologies

* [Ionic v5.4.9](https://ionicframework.com/)

* [Angular v8.2.3](https://angular.io/)

* [Ionic/angular v4.8.0](https://www.npmjs.com/package/@ionic/angular)

* [RxJS v6.5.2](https://reactivex.io/)

* [News REST API used to search for news articles](https://newsapi.org/)

* [IP Geolocation API](http://ip-api.com/)

* [Ionic Storage v2.2.0](https://ionicframework.com/docs/building/storage)

* [Ionic Native Network v5.13.0](https://ionicframework.com/docs/native/network)

* [Ionic Native Social-Sharing v5.13.0](https://ionicframework.com/docs/native/social-sharing)

## Setup

* It is necessary to [register with news API](https://newsapi.org/register) to get an API key that is stored in the `environment.ts` file
* To start the server on _localhost://8100_ type: 'ionic serve'

## Code Examples

* TBD

## Features

* Typescript interface used to define the expected structure of the json object returned from the news API.

* Separate services page with API http fetch functions.

* [Ionic colour generator](https://ionicframework.com/docs/theming/color-generator) used to create color palette.

### Pages

* **Menu side-bar:** news, categories, favorites, search, about, change language, dark theme toggle.
**TODO:** add Image/logo at bottom?
* **News page** shows world headlines using an ion-card list. Has view and favorite + social media share buttons. Shows time as '... ago'.
* **News-detail page** shows the selected news item in more detail with links to favourites share buttons? Shows time as '... ago'. Includes working footer buttons for 'More info', which opens news source in a separate window and 'Favourite' which adds the article to a stored news array. Array symbol at end of article content string replaced with text using split and concat.
* **Categories page:** ion-segment used to show categories in a scrollable horizontal menu: Sport, Busines, Health, Technology, Science, General, Entertainment. Shows time as '... ago'.
* **Favourites page:** lists articles in reverse date order that have been saved by clicking on the favourites icon on the news-detail page. Sliding from the right now deletes the favourite.
**TODO:** prevent storage of duplicate articles. Add 'delete all' button at top. lhs sliding delete is not working.
* **About page** with popover with working links to Author Website and Github repo.

### Additional Functionality

* **Dark mode** switch on menu changes from light to dark mode.
* **Offline Storage** of favourite articles using Ionic Storage.
* **Network** status check in initialisation so latest news data is stored. Template data-binding always from stored data.
* **Common Refresh Component** dragging down will perform refresh function.
* **Common Progess Bar Component** ion-card shows while news loading on News, Categories and Favourites pages.
* **Localisation using i18n** so user can select between English (default), Spanish and French.

## Status

* Status: Working but not complete.

## To-do
1. Theme scss: improve colors
2. Search: Add news search popover?
3. Article card - add alternative images for when there is no image in the json data.

5. language change menu i18n - working for News page - expand to tabs etc.
6. News Detail page could use a footer so user can change pages?? go straight to favourites list?
7. Splash screen
8. Tabs bar - replace About with Search route or Weather?
9. Common article storage/access function.
10. Contact form
11. SqLite - use as default database?
12. Add to refresh function so News, Categories and Favourites is refreshed.

## Inspiration

* Some of project structure based on: [Ionic example app: 'A conference app built with Ionic to demonstrate Ionic'](https://github.com/ionic-team/ionic-conference-app).
* The code for checking network status is based on: [Ionic 4 Network Check Example Problem](https://forum.ionicframework.com/t/ionic-4-network-check-example-problem/157909/2).
* [Ionic Academy Tutorial: How to Localise Your Ionic App with ngx-translate](https://ionicacademy.com/localise-ionic-ngx-translate/) however language selected using ion-select-option dropdown list in side-menu (ie not using a popover page).

## Contact

Repo created by [ABateman](https://www.andrewbateman.org) - feel free to contact me!
