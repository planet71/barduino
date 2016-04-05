var fs = require('fs'),
    browserify = require('browserify'),
    dest = fs.createWriteStream('./lib/js/app.js');

browserify(['./src/js/app.js'], {
    transform: [['babelify']]
}).bundle().pipe(dest);
