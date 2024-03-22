import https from 'https';
import fs from 'fs';
import path from 'path';
import url from 'url';

/*
    Author: Sumeet Singh
    Dated: 23/03/2024
    Minimum EC6
    Purpose: Dev Webserver for testing AgniSamooh.com site offline
    License: MIT License
    Description: The script reads SSL certificate and key files, sets up an HTTPS server, and serves static files from a specified directory.
*/


/* TO DO

Implement Secure Headers:
Set secure HTTP response headers to enhance security. For example, you can use the helmet package in Node.js to set 
headers like X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, and others to protect against common web 
vulnerabilities.

Implement Content Security Policy (CSP):
Use Content Security Policy (CSP) headers to mitigate the risks of XSS (Cross-Site Scripting) attacks by specifying 
which resources are allowed to be loaded on your website.

Input Validation and Sanitization:
Ensure that user input is properly validated and sanitized to prevent injection attacks such as SQL injection, 
XSS, and command injection.

File Path Validation:
Validate user-supplied file paths to prevent directory traversal attacks. In your code, ensure that the requested 
file path is within the expected directory structure (websitePath) and does not allow access to sensitive system 
files.

Error Handling:
Implement comprehensive error handling to handle unexpected situations gracefully and prevent information 
leakage. Avoid exposing stack traces or sensitive information in error responses.

Access Control:
Enforce access control mechanisms to restrict access to sensitive resources and APIs based on user authentication 
and authorization.

Update Dependencies Regularly:
Keep your dependencies up-to-date to ensure that you're using the latest versions with security patches and fixes.

Security Audits and Penetration Testing:
Conduct regular security audits and penetration testing to identify and address potential security 
vulnerabilities proactively.

*/

const cwd = process.cwd(); // CWD: C:\Users\Sumeet\Documents\AgniSamooh\website\scripts
// note relative to this file, the website files are one level up hence websitePath = '..'
const websitePath = path.resolve(cwd, '..'); // Absolute: C:\Users\Sumeet\Documents\AgniSamooh\website
console.log("websitePath is: " + websitePath);

// Read CA cert and key for SSL
// use ../ to go up one level so ../../ go up 2 levels then go down /keys/key.pem
const options = {
    key: fs.readFileSync('../../keys/key.pem'),
    cert: fs.readFileSync('../../keys/cert.pem'),
};

// http.createServer(function (req, res) {
https.createServer(options, function(req, res) {

    // verify if SSL cert/ley pair loaded
    if (!options.key || !options.cert) {
        console.error('Error loading SSL certificate or key.');
        return;
    }

    var parsedURL = url.parse(req.url); // http://localhost:8080\index.html
    var filename = parsedURL.pathname; // index.html

    // If pathname is blank '/', serve index.html
    if (filename === '/') {
        filename = 'index.html';
    }

    console.log('filename is: ' + filename);

    var filepath = path.join(websitePath, filename); // e.g., C:\Users\Sumeet\Documents\AgniSamooh\website\index.html

    console.log('filepath to read is: ' + filepath);

    // Determine content type based on file extension to serve linked sheets in .html back to client e.g. .css, .js
    var contentType;
    switch (path.extname(filepath)) {
        case '.html':
            contentType = 'text/html';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        default:
            contentType = 'text/plain';
    }
    console.log('Content-Type is: ' + contentType);

    fs.readFile(filepath, function(err, data) { // e.g., C:\Users\Sumeet\Documents\AgniSamooh\website\index.html
        if (err) {
            // If an error occurs, serve the error page
            fs.readFile(path.join(websitePath, 'error.html'), function(err, errorPageContents) {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'text/html'});
                    res.write('HTTP error code: 500: Internal Server Error');
                    res.end();
                } else {
                    res.writeHead(404, {'Content-Type': contentType});
                    res.write(errorPageContents);
                    res.end();
                }
            });
        } else {
            // If the file is successfully read, serve its contents
            res.writeHead(200, {'Content-Type': contentType});
            res.write(data);
            res.end();
        }
    });
}).listen(8080);

console.log('Webserver running on : http://localhost:8080/');