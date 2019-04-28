var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

// create a server and 
// pass the request in the dealing function
var server = http.createServer(function(req, res){
  staticRoot(path.join(__dirname, 'sample'), req, res)
})

// static function after create a server.
function staticRoot(staticPath, req, res) {
  var pathObj = url.parse(req.url,true);

  if(pathObj.pathname === '/'){
    pathObj.pathname += 'test.html'
  }

  var filePath = path.join(staticPath, pathObj.pathname);

  fs.readFile(filePath, function(err, fileContent){
    if(err){
      console.log('404');
      res.writeHead(404, 'not found');
      res.end('<h1>404 NOT FOUND</h1>');
    }else {
      res.writeHead(200,'ok');
      res.write(fileContent);
      res.end();
    }
  })
}

// listen in the port 9000
server.listen(9000);