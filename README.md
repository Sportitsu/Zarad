[![Stories in Ready](https://badge.waffle.io/Sportitsu/Zarad.png?label=ready&title=Ready)](https://waffle.io/Sportitsu/Zarad)
[![Build Status](https://travis-ci.org/Mihyar-30614/Zarad.svg?branch=master)](https://travis-ci.org/Mihyar-30614/Zarad/)


# Zarad 

Zarad is app help  the sport clubs to manage  their  activities and facilitate track the players and their history,also it helps player to see the videos related to his club.    



## Team

  - __Product Owner__: Mohammad Al-Bakri
  - __Scrum Master__: Mihyar Al-Masalma
  - __Development Team Members__: Fatima Hammami, Elham Rababah, Mohammad Al-Bakri, Mihyar Al-Masalma

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

<p align="center">
  <img src="masters/screenshots/combine_images.jpg" width="350"/>
</p>

> Web Browser application link :
[Click Here](http://zarad.herokuapp.com)

> Preview the app on your phone
```sh
Download Ionic View from Play Store or App store 
Enter this Id : A92B94C3
```

>To run the app locally:

```sh
git clone https://github.com/Sportitsu/Zarad.git
```

```sh
npm install && bower install
```

```sh
Web platform -- > ionic serve
Phone platform -- > ionic serve --lab
```

## Running Tests
```sh
npm test
```

## styling guide
```sh
gulp
```

## Requirements

- Node 6.3.x
- mongoDB 4.1.0
- ionic 1.3.1

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g ionic
npm install
```


#APIs Used
- We used the Youtube API to gather details about the videos related to each club
- we used Imgur API to stord the tournaments Image .

# RESTful Routes
| Method        | Endpoint      | Description  |
| ------------- |:-------------:| ------------:|
|Post           |/api/admin/create|create new admin |
|Post|/api/admin/signin|check if the admin authenticat to use the app|
|get|/api/admin/x/:username|get the data of admin depend on username.Username must be passed in as the last part of the URL path|
|post|/api/admin/delete|delete specific admin  |
|Post|/api/admin/admins|get information of all admin|
|get|/api/tournament/x/:name|get information of tournament depend on name.name must be passed in as the last part of the URL path|
|get|/api/tournament/tournaments|get information of all tournaments | 
|post|/api/tournament/create|create new tournaments|
|post|/api/tournament/delete|delete specific tournaments|
|post|/api/tournament/edit'|update tournament information|
|post|/api/tournament/addLike'| add like on tournament|
|post|/api/club/register|create new club|
|get|/api/club/x/:username|get information of club depend on username.username must be passed in as the last part of the URL path|
|get|/api/clubs| get information of all club|
|post|/api/club/delete|Remove specific club |
|post|/api/club/editProfile|update information of club|
|post|/api/club/signin|check if the club authenticat to use the app|
|post|/api/club/getclub|get information of club|
|post|/api/user/delete|delete specific user|
|post|/api/user/editProfile| update information Profile of user|
|get|/api/user/x/:username| get information of user depend on username.username must be passed in as the last part of the URL path|
|get|/api/users| get information of all user|
|post|/api/user/signin| check if the user authenticat to use the app|
|post|/api/user/signup| create new user|
|post|/api/user/resub| check  the user subscribtion to use the app|
|post|/api/user/goals| add goals for specific user|
|get|/api/quotes/get|get information of quote |
|post|/api/quotes/newquote| add new quote to specific user|



#The Database 
<<<<<<< HEAD
We used MongoDB for our database. Initially,we were planning on club being able to have users , also we have tournament table which stored  tournament data ,quote table have  data about  quote.
In the end, the database mainly stored user,admin,club data to help with authentication and to deliver a more customized experience


| Table :       |

| admin|
| tournament|
| club|
| user|
| quote|


# Schema's

### User Schema
```sh
{
	username : { type: String, required: true, index : {unique: true}},
	password : { type: String, required: true},
  country : { type : String , required : true },
  beltColor: { type: String , required: true},
  club: { type: String, required: true},
  membership : { type : Number, required : true , default : 1 },
  email: { type: String , index : {unique : true}},
  firstName: { type: String},
  image : {type : String},
  lastName: { type: String },
  middleName : { type : String },
  age : { type : Number},
  phone: { type: String },
  Date: { type: Date, default: Date.now() },
  attendance : { type: Number },
  achievements: { type : Array},
  valid : { type : Boolean , default : true },
  subscription : { type : Number },
  resub : { type : Boolean , default : false},
  goals : {type : Array},
  salt : { type : String}
}
```

### Admin Schema
  ```sh
{
	username : {type: String, required : true, index : { unique : true }},
	password : {type: String, required : true},
	firstName : {type: String, required : true},
	lastName : {type: String, required : true},
	email : {type: String, required : true},
  salt : { type : String}
}
```

### Club Schema
```sh
{
	username : {type : String, required : true, index : {unique : true} },
	password : {type : String, required : true },
  email    : {type : String , index : { unique : true}},
	country  : {type : String, required : true },
	clubName : {type : String, required : true, index : { unique : true } },
  image    : {type:String },
  channelId : {type : String, unique : true},
  salt : { type : String}
}
```
### Tournament Schema
```sh
{
	name : {type : String , required : true},
	Date : {type : String , required : true},
	place : {type : String , required : true},
	organizer : {type : String , required : true},
	details : {type :  String , required : true},
	poster : {type : String , required : true},
	like:{type :[]}
})
```
### Qoutes Schema
```sh
 {
 image : { type : String}
}
```
### Roadmap

View the project roadmap [here](https://waffle.io/Sportitsu/Zarad)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Production

See our website [here](http://zarad.herokuapp.com/#/).

## Builds

See our latest build [here](https://travis-ci.org/Sportitsu/Zarad).
