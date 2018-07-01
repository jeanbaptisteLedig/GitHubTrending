var express = require('express');
var CLIENT_ID = process.env.GITHUB_CLIENT_ID;
var CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
var app = express();

class CallApi {
  async getAllRepos() {-
    fetch(url + '/search/repositories?q=stars:>=250&sort=stars')
    .then(res => res.json())
    .then(json => {
      return json;
    });
  }

  starRepos(owner, repo) {
    var options = {
      host: url,
      port: 80,
      path: '/user/starred/'+ owner +'/'+ repo,
      method: 'GET'
    };
  }
}

module.exports = CallApi;