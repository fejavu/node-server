var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');


var routes = {
  '/a': function(req, res) {
    res.end(JSON.stringify(req.query));
  },
  '/b': function(req, res) {
    res.end('match /b');
  },
  '/a/c': function(req, res) {
    res.end('match /a/c');
  },
  '/search': function(req, res) {
    res.end('username='+req.body.username+',password='+req.body.password);
  },
}

// routePath function 
function routePath(req, res) {
  var pathObj = url.parse(req.url,true);

  var handleFn = routes[pathObj.pathname];
  if(handleFn) {
    req.query = pathObj.query;
    var body = '';
    req.on('data', function(chunk){
      req.body = parseBody(body);
      handleFn(req, res);
    })
  }else {
    staticRoot(path.resolve(__dirname, 'sample'), req, res)
  }
}

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

// parse body function, parse post data to an object
function parseBody(body) {
  console.log(body);
  var obj = {};
  body.split('&').forEach(function {
    obj[str.split('=')[0]] = str.split('=')[1];
  });
  return obj;
}


// create a server and 
// pass the request in the dealing function
var server = http.createServer(function(req, res){
  routePath(req, res);
})

// listen in the port 9000
server.listen(9000);
