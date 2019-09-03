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

* Typescript interface used to define the expected structure of the json object returned from the news API.

* Separate services page with API http fetch functions.

## Screenshots

![Ionic page](./img/news-page.png)
![Ionic page](./img/news-detail.png)
![Ionic page](./img/categories-page.png)
![Ionic page](./img/favourites-page.png)
![Ionic page](./img/about-page.png)

## Technologies

* [Ionic v5.12.0](https://ionicframework.com/)

* [Angular v8.2.3](https://angular.io/)

* [Ionic/angular v4.8.0](https://www.npmjs.com/package/@ionic/angular)

* [RxJS v6.5.2](https://reactivex.io/)

* [News REST API used to search for news articles](https://newsapi.org/)

* [IP Geolocation API](http://ip-api.com/)

* [Ionic Storage v2.2.0](https://ionicframework.com/docs/building/storage)

## Setup

* To start the server on _localhost://8100_ type: 'ionic serve'

## Code Examples

* TBD

## Features

* **Menu side-bar:** news, categories, favorites, search, about, change language, dark theme toggle. Image/logo at bottom?
* **News page** shows world headlines using an ion-card list. Add share/favorite modal menu? Shows time as '... ago'.
* **News-detail page** shows the selected news item in more detail with links to favourites share buttons? Shows time as '... ago'. Includes working footer buttons for 'More info', which opens news source in a separate window and 'Favourite' which adds the article to a stored news array.
* **Categories page:** ion-segment used to show categories in a scrollable horizontal menu: Sport, Busines, Health, Technology, Science, General, Entertainment. Shows time as '... ago'.
* **Favourites page:** lists articles in reverse date order that have been saved by clicking on the favourites icon on the news-detail page.
* **About page** with popover with links to Contact Form, Author Webste and Github repo.

* **Dark mode** switch on menu changes from light to dark mode.
* **Storage** of favourite articles using Ionic Storage.

## Status

* Status: Working but not complete.

## To-do

1. Favourites: prevent storage of duplicate articles. Add slide delete article function to favourites page.
2. Seaerch: Add news search popover?
3. store country code so other pages use it. add to common component?
4. Theme scss: improve colors
5. language change menu i18n
6. News page - work out how to highlight list item
7. splash screen
8. add weather to categories page?
9. network status and offline array storage
10. contact form

## Inspiration

Some of project structure based on: [Ionic example app: 'A conference app built with Ionic to demonstrate Ionic'](https://github.com/ionic-team/ionic-conference-app).

## Contact

Repo created by [ABateman](https://www.andrewbateman.org) - feel free to contact me!
