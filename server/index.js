const express = require('express');
const cors = require('cors');
let app = express();
const getReposByUsername = require('../helpers/github.js');
const db = require('../database/index.js');


app.use(cors());
app.use(express.json());



// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
app.use(express.static('client/dist'));
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.


app.post('/repos', async function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  var username = req.body.username;

  // console.log('this should be the entered username', Object.keys(req.body));

  // var username = Object.keys(req.body);

  // console.log('request*****', req);

  var repoData = await getReposByUsername(username);

  var reposSaved = await db.save(repoData.data);

  console.log(reposSaved);

  res.status(201).send(reposSaved);

});

app.get('/repos', async function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  var top25Repos = await db.getTopRepos();

  res.status(200).send(top25Repos);

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

