# TeaParty - Brazilian Party

<p>
    <img src="public/img/bg.jpg">
</p>

## Overview
The main purpose of this project is to create a webpage to make my Tea BRazilian Party.

<hr>

## Libraries 

- Bcrypt => Crypt password;
- Body-parser => Bypass json data;
- DotEnv => Work with envkeys;
- EJS => Render HTML;
- Express => Flexible framework;
- Express-session => create specific routes for admins controller;
- JWT => Security Access 
- Nodemon => Update server when save;
- Sequelize => Manipulate database;

<hr>

## Set up `.env` file

- `POSTGRES_DIALECT` = postgres
- `POSTGRES_NAME` = teaparty
- `NEW_POSTGRES_NAME` = teaparty
- `POSTGRES_PASSWORD` = yourpassword
- `POSTGRES_USER` = root
- `POSTGRES_DB` = teaparty
- `POSTGRES_TIMEZONE` = -03:00

- `PORT` = 3000
- `SESSION_SECRET` = passwordSecret

- `JWT_TOKEN` = jwttoken

<hr>

## Running the application

To run the app you'll need [Docker](https://www.docker.com/products/docker-desktop/). After that, follow the steps below in your `terminal`:

- Run: `git` `clone` https://github.com/aleffaso/teaparty.git

- Run: `docker-compose up --build`

- Link: You can access the web page on `http://localhost:3000/`

- The application is also running at this [link](https://teaparty.herokuapp.com/) on Heroku

<hr>


## Licenses
<br>
<p>
    <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white">
</p>
