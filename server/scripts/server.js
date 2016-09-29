#!/usr/bin/env node

const minimist = require('minimist'),
    bodyParser = require('body-parser'),
    express = require('express'),
    session = require('express-session'),
    globSync = require('glob').sync,
    rdb = require('rethinkdb');

let argv = minimist(process.argv.slice(2), {
    string: 'port env'.split(' '),
    alias: {p: 'port'},
    "default": {port: 1337, env: "dev"}
});

let distDir = '../dist';
let config = require(`${distDir}/config`);

config.env = argv.env;

let app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(require('method-override')());

app.use(session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false
}));

let routes = globSync(`${distDir}/routes/**/*.js`, {cwd: __dirname}).map(require);

app.config = config;

// add the error handler middleware
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        res.status(err.status).json(err);
    } else {
        res.status(500).send(err.message ? err.message : err);
    }
});

// TODO use an object container/registry so we can create singleton services and use them throughout the app

let DB = require(`${distDir}/rethink`);
rdb.connect(config.database).then(c => {
    app.db = new DB(c);

    // TODO some db initialization - make nicer with promises/hashes
    return rdb.tableList().run(c).then(tables => {
        if (!tables.includes('users')) {
            return rdb.tableCreate('users').run(c);
        }
    });
    
}).then(() => {
    // make new instances of our controllers here
    routes.forEach(r => new r(app));

    console.log(`Listening on port ${argv.port}`);
    app.listen(argv.port);
});




