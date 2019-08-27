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
![Ionic page](./img/categories-page.png)
![Ionic page](./img/favourites-page.png)
![Ionic page](./img/about-page.png)

## Technologies

* [Ionic v5.12.0](https://ionicframework.com/)

* [Angular v8.2.3](https://angular.io/)

* [Ionic/angular v4.8.0](https://www.npmjs.com/package/@ionic/angular)

* [RxJS v6.5.2](https://reactivex.io/)

* [News REST API used to search for news articles](https://newsapi.org/)

## Setup

* To start the server on _localhost://8100_ type: 'ionic serve'

## Code Examples

* TBD

## Features

* **Menu side-bar:** news, categories, favorites, search, about, change language, dark theme toggle. Image/logo at bottom?
* **News page** shows world headlines using an ion-card list. Add share/favorite modal menu? Show time as e.g. '2 minutes ago? etc.
* **News-detail page** shows the selected news item in more detail with links to favourites share buttons?
* **Categories page:** ion-segment used to show categories in a scrollable horizontal menu: Sport, Busines, Health, Technology, Science, General, Entertainment.
* **Search page** tbd
* **About page** with popover with links to Contact Form, Author Webste and Github repo.

## Status & To-do list

* Status: Working news api and side/tabs menu system. News and categories pages work. News can be selected using a news source menu.

* To-do: Complete News page - work out how to highlight list item then remove eye page link.
* To-do: change side menu and routing so search tab replaces About tab. Add to side menu list.
* To-do: News search facility? language menu? Consider how to choose country - user location? or menu? favourites. Create my own scss themes with dark mode etc.

## Inspiration

Some of project structure based on: [Ionic example app: 'A conference app built with Ionic to demonstrate Ionic'](https://github.com/ionic-team/ionic-conference-app).

## Contact

Repo created by [ABateman](https://www.andrewbateman.org) - feel free to contact me!
