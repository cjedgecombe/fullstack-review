const express = require('express');
let app = express();
const getReposByUsername = require('../helpers/github.js');
const save = require('../database/index.js');

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

  var repoData = await getReposByUsername(req.data);

  await save(repoData);

  res.status(201).send('User repos added to database');

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

