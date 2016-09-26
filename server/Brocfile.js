var mergeTrees = require('broccoli-merge-trees'),
    pickFiles = require('broccoli-static-compiler'),
    esTranspiler = require('broccoli-babel-transpiler');

var libTree = pickFiles('lib', {
    files: ['**/*.js'],
    srcDir: '.',
    destDir: '/'
});

var scriptTree = esTranspiler(libTree, {
    sourceMap: 'inline'
});

module.exports = mergeTrees([scriptTree]);