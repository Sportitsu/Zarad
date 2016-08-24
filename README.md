[![Stories in Ready](https://badge.waffle.io/Sportitsu/Zarad.png?label=ready&title=Ready)](https://waffle.io/Sportitsu/Zarad)
[![Build Status](https://travis-ci.org/Mihyar-30614/Zarad.svg?branch=master)](https://travis-ci.org/Mihyar-30614/Zarad/)


# Zarad 

Zarad is an application that helps JiuJitsu Academies manage their members and facilitate track players achievements plus their history, also it helps each member to see the latest techniques uploaded by the academy.    



## Team

  - __Product Owner__: Mohammad Al-Bakri
  - __Scrum Master__: Mihyar Al-Masalma
  - __Development Team Members__: Fatima Hammami, Elham Rababah, Mohammad Al-Bakri, Mihyar Al-Masalma

## Table of Contents

1. [Usage](#Usage)
1. [Architecture](#architecture)
    1. [Tech Stack](#tech-stack)
    1. [System Architecture](#system-architecture)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage



### As a subscribed Member

![Subscribed](https://raw.githubusercontent.com/Sportitsu/Zarad/master/masters/screenshots/combine_images.jpg "Subscribed")

### As a Club Owner

![Club Owner](https://raw.githubusercontent.com/Sportitsu/Zarad/master/masters/screenshots/combine_images2.jpg "Club Ownder")

> Web Browser application link :
[Click Here](http://zarad.herokuapp.com)

> Preview the app on your phone
```sh
Download Ionic View from Play Store or App store 
Enter this Id : 4C581605
```


## Running Tests
```sh
npm test
```

## styling guide
```sh
gulp
```

## Architecture

### Tech Stack

1) Front-End
- Ionic  
- Angular

2) Back-End
- Node/Express
- MongoDB


3) Testing
- Mocha
- Chai
- Karma 
- Jasmine

4) Deployment
- Heroku


### System Architecture
![System Architecture](https://raw.githubusercontent.com/Sportitsu/Zarad/master/masters/screenshots/systemArchitecture.jpg "System Architecture")

## Requirements

- Node 6.3.x
- mongoDB 4.1.0
- Ionic 1.3.1

## Development

### Installing Dependencies

From within the root directory:

```sh
git clone https://github.com/Sportitsu/Zarad.git
```

```sh
npm install -g ionic
npm install
```

```sh
npm install && bower install
```

```sh
Web platform -- > ionic serve
Phone platform -- > ionic serve --lab
```


#APIs Used

- We used the Youtube API to collect Academy youtube channel videos. 
- we used Imgur API to save memory on our database.

#The Database 
Our Database is built using MongoDB, which holds the main three models, Clubs, Members, Tournaments, Admins

### Roadmap

View the project roadmap [here](https://waffle.io/Sportitsu/Zarad)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Production

See our website [here](http://zarad.herokuapp.com/#/).

## Builds

See our latest build [here](https://travis-ci.org/Sportitsu/Zarad).
