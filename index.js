/* eslint-disable semi */
/*jshint esversion: 6 */


var fs = require('fs');
var path = require('path');
var http = require('http');


var pathName = process.argv[2];
var fileExt = "." + process.argv[3];


// Got help from: https://github.com/pereiradaniel/learnyounode/blob/master/filteredls.js
var directoryContents = require('readdir').readSync('some_path/');

var mime = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpg'
};

http.createServer(onrequest).listen(8000);

function onrequest(req, res) {
    var route = req.url;

    if (route === '/') {
        route = 'index.html';
    }

    fs.readFile(path.join('static', route), onread);

    function onread(err, buf) {
        res.setHeader('Content-Type', 'text/html');

// THIS DOENST WOOOORK :(
// Got help from: https://github.com/pereiradaniel/learnyounode/blob/master/filteredls.js
        if (err.code === 'EISDIR') {
            fs.readdir(pathName, function(err, list) {
                for (i = 0; i < list.length; i++) {
                    if (path.extname(list[i]) === fileExt) {
                        console.log(list[i]);
                        console.log('jaja');
                    } else {
                        console.log('hi');
                    }
                }
            });

        } else if (err) {
            res.statusCode = 404;
            // res.end('Not found\n');
            fs.readFile(path.join('static', 'error404.html'), onread);


        } else {
            var extension = path.extname(route);
            var type = mime[extension] || 'text/html';
            res.statusCode = 200;
            res.setHeader('Content-Type', type);
            res.end(buf);
        }


    }
}
