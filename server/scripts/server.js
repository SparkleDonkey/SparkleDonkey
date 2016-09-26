#!/usr/bin/env node

var minimist = require('minimist');
var bodyParser = require('body-parser');
var express = require('express');
var session = require('express-session');
var globSync = require('glob').sync;

var argv = minimist(process.argv.slice(2), {
    string: 'port env'.split(' '),
    alias: {p: 'port'},
    "default": {port: 1337, env: "dev"}
});

var config = require('../dist/config');

config.env = argv.env;

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(require('method-override')());

app.use(session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false
}));

var controllers = globSync('../dist/controllers/**/*.js', {cwd: __dirname}).map(require);

app.config = config;

// make new instances of our controllers here
controllers.forEach(c => new c(app));

// add the error handler middleware
app.use(function (err, req, res, next) {
    if (err.name === 'ValidationError') {
        res.status(err.status).json(err);
    }
});

// Start Server
console.log("Listening on port " + argv.port);
app.listen(argv.port);