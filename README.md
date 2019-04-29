# node-server
整个index.js有一个 request 入口，以及四个处理函数。

## 整体入口
```
var server = http.createServer(function(req, res) {
	routePath(req, res);
})

```
调用 node.js 中的 http 模块，创建一个服务器，将服务器接受的 request 传入 routePath 函数处理。

## routePath 
routePath 是处理路由的一个函数，如果用户输入的路由包含在 routes 对象中，则分别处理 get 方法输入的数据或者post方法提交的数据。如果不存在，则将请求传入 staticRoot 函数，当作静态资源请求处理。

## staticRoot
staticRoot 函数是将用户请求的静态资源文件返回的函数，如果文件存在则调用 res.write 返回文件，否则返回 “404 not found”。

## parseBody
parseBody 是将请求 url 里的参数解析成一个 key-value 对象，方便进行操作。