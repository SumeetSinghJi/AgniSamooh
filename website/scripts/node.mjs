import http from 'http';
import fs from 'fs';
import path from 'path';
import url from 'url';

const cwd = process.cwd(); // CWD: C:\Users\Sumeet\Documents\AgniSamooh\website\scripts
const websitePath = path.resolve(cwd, '..'); // Absolute: C:\Users\Sumeet\Documents\AgniSamooh\website
console.log("websitePath is: " + websitePath);

http.createServer(function (req, res) {

    var parsedURL = url.parse(req.url); // http://localhost:8080\index.html
    var filename = parsedURL.pathname; // index.html

    // If pathname is blank '/', serve index.html
    if (filename === '/') {
        filename = 'index.html';
    }

    console.log('filename is: ' + filename);

    var filepath = path.join(websitePath, filename); // e.g., C:\Users\Sumeet\Documents\AgniSamooh\website\index.html
    console.log('filepath to read is: ' + filepath);

    fs.readFile(filepath, function(err, data) { // e.g., C:\Users\Sumeet\Documents\AgniSamooh\website\index.html
        if (err) {
            // If an error occurs, serve the error page
            fs.readFile(path.join(websitePath, 'error.html'), function(err, errorPageContents) {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'text/html'});
                    res.end('Internal Server Error');
                } else {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.write(errorPageContents);
                    res.end();
                }
            });
        } else {
            // If the file is successfully read, serve its contents
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        }
    });
}).listen(8080);

console.log('Webserver running on : http://localhost:8080/');