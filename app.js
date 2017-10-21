
var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function(request,response) {
  console.log('request starting...');
  
      var filePath = '.' + request.url;
      if (filePath == './')
          filePath = 'modules/index.html';
          var extname = path.extname(filePath);
          var contentType = 'text/html';
          switch (extname) {
              case '.js':
                  contentType = 'text/javascript';
                  break;
              case '.css':
                  contentType = 'text/css';
                  break;
              case '.json':
                  contentType = 'application/json';
                  break;
              case '.png':
                  contentType = 'image/png';
                  break;      
              case '.jpg':
                  contentType = 'image/jpg';
                  break;
              case '.wav':
                  contentType = 'audio/wav';
                  break;
          }

          fs.readFile(filePath, function(error, content) {
            if (error) {
                if(error.code == 'ENOENT'){
                    fs.readFile('./404.html', function(error, content) {
                        response.writeHead(200, { 'Content-Type': contentType });
                        response.end(content, 'utf-8');
                    });
                }
                else {
                    response.writeHead(500);
                    response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                    response.end(); 
                }
            }
            else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            }
        });

        // Website you wish to allow to connect
        response.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        response.setHeader('Access-Control-Allow-Credentials', true);
    
});

server.listen(3000);