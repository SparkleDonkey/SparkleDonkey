#!/usr/bin/env node

const minimist = require('minimist'),
    bodyParser = require('body-parser'),
    express = require('express'),
    session = require('express-session'),
    globSync = require('glob').sync;

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

let controllers = globSync(`${distDir}/controllers/**/*.js`, {cwd: __dirname}).map(require);

app.config = config;

// make new instances of our controllers here
controllers.forEach(c => new c(app));

// add the error handler middleware
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        res.status(err.status).json(err);
    }
});

// Start Server
console.log(`Listening on port ${argv.port}`);
app.listen(argv.port);