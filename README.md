# booking-node-api

[![Coverage Status](https://coveralls.io/repos/github/thejonroberts/booking-node-api/badge.svg?branch=code-coverage-instanbul)](https://coveralls.io/github/thejonroberts/booking-node-api?branch=code-coverage-instanbul) [![Build Status](https://travis-ci.com/thejonroberts/booking-node-api.svg?branch=master)](https://travis-ci.com/thejonroberts/booking-node-api)

This is a node api, ostensibly for bands and venues to book shows. I mainly built it so that I could play around with some new front end tech. But, I ended up playing around with this a good deal, and plan to continue!

It uses express, postgres, and sequelize, and is written in typescript (mostly). It also has continuous integration (travis), continuous deployment (heroku), and coverage reports (coveralls, via istanbul) setup.

## Setup

### Installation

I'm using [nvm](https://github.com/creationix/nvm) for node version management. If you have that setup, hit `nvm use` and you're good to `npm install`.

You wil want to install global versions of typescript, sequelize-cli, tslint, and concurrently packages, `npm link` them, or change the scripts to use the node_modules/.bin files.

Environment variables are kept in a dotenv file (.env), which is git-ignored. There is a .env.example file to copy your machine.

### Database

You'll need to have postgres 10+ installed.  Create a database named 'booking', or change the .src/config/config.js database setting to whatever name you want.

The seed data is git-ignored, so to get some data files, run `npm run faker`. Then hit `npm run reset` to run migrations and seed the data.

### Build

`npm run watch` will start up the typescript build and the express server and watch the files.  I haven't added testing to the watch script, yet.  Hit `npm run test` for that. I haven't added a linter to the watch script, either, but `npm run lint` will do that.

#### IDE

I prefer to just use the tslint extension of vs code, and keep the Problems pane open.  TSLint is handling code formatting rules, as well, which is why the /vscode/setting.json file is tracked - it avoids some settings conflicts with my user config.

### Deployment

See Procfile for Heroku setup. This is set to deploy when something gets merged to master. You'll need to create the database and run faker / migrate / seed scripts the first deployment, mine have changed since.

### Integration

See travis.yml for travis_ci configuration.  This runs on every push.  Husky runs a pre-push hook to run the lint and test scripts. They both have to pass before you can push. That might get old, but...
