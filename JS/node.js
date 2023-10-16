const helmet = require("helmet");
helmet({
  crossOriginResourcePolicy: false,
})
  

const http = require('http');
const fs = require("fs")
const hostname = '127.0.0.1';
const port = 3000;

let Home =  fs.readFileSync("index.html")
let Hom =  fs.readFileSync("CSS")
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.writeHead(200,{'Content-Type': 'text/html'})
  res.end(Home);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});