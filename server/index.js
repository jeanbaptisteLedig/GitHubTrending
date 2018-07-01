const path = require("path");
const express = require("express");
const http = require("http");
const redis = require("redis");
const fetch = require("node-fetch");

const PUBLIC_FOLDER = path.join(__dirname, "../public");

var url = 'https://api.github.com';
const REDIS_PORT = 6379;
const PORT = process.env.PORT || 8080;
const REDIS_HOST =  process.env.REDIS_URL || '127.0.0.1';

const app = express();
const redisclient = redis.createClient(process.env.REDIS_URL);
const server = http.createServer(app);

app.get("/", (req, res) => {
  redisclient.del('repos', function(err, reply) {
    console.log(reply);
});
  res.sendFile(path.join(PUBLIC_FOLDER, "index.html"));
});

app.get("/repos", (req, res) => {
  redisclient.get('repos', function(error, result){
    if (error) console.log(error);
    if(result !== null) {
      res.send(result);
    } else {
      try {
        fetch(url + '/search/repositories?q=stars:>=1000')
        .then(res => res.json())
        .then(json => {
          redisclient.set('repos', json);
          redisclient.expire('repos', 3600);
          res.send(json);
        });
      } catch(error) {
        console.log(error);
      }
    }
  });
});

redisclient.on('connect', function() {
    console.log('Redis connected');
});

redisclient.on('error', err => {
  console.log(err);
});

app.use('/', express.static(PUBLIC_FOLDER));

server.listen(PORT, () => {
    console.log(`Server started on port ${server.address().port}`);
});
