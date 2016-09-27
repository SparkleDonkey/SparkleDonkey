# SparkleDonkey

## Requirements

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [RethinkDB](https://rethinkdb.com/)


## Running / Development

There are multiple ways to run the project.
I added gradle purely as a wrapper to invoke various sub-parts and for aliasing. It can be removed if it's not something we want to use.


You'll need to install all the dependencies for both client and server.

To do so: `./gradlew prepare`

You can also `cd` into each directory and install the dependencies yourself, but this is easier.


### Client

*Using gradle:*

* `./gradlew client`
* Visit your app at [http://localhost:4200](http://localhost:4200).

*Using ember directly:*

* `cd client; ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Server

Start the database, if you don't have a daemon running:

`rethinkdb`

Start the server:

*Using gradle*

* `./gradlew server`

*Using npm directly*

* `cd server; npm start`

You can visit a test route at [http://localhost:1337/api/test](http://localhost:1337/api/test).
