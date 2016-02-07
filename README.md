# BentoChat
BentoChat is an app for team communication. NodeJS, React + Flux, RethinkDB. iOS client built with React Native.

# Web Front-End
To compile and serve the front-end locally:
```
grunt serve
```
this will point your browser to `localhost:8000/webpack-dev-server/` where your code will be hot-reloaded as you change it.

To build the static bundle, run `grunt build`.

# iOS app
This app is very early stage, to run the app open `bentoapp/bentoapp.xcodeproj` in Xcode.
Then edit `bentoapp.ios.js`

# DB
The database is RethinkDB and it runs inside a Docker container. To build it `cd db/ && docker build .`
_the db is currently being migrated to PostgreSQL|_

# BackEnd
The server app is NodeJS + Express. To run locally: `node back-end/scripts/index.js`
There are some scripts in `back-end/` that set up environment variables used by the server app.
