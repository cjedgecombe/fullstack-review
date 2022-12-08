const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  githubID: Number,
  name: String,
  url: String,
  stargazers: Number,
  forks: Number,
  updated: Date,
  owner: {
    name: String,
    url: String
  }
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  // assuming that a list of repos returned from the github API is what is passed into this function...

  // iterate through the array of returned repos

    // if the current repo doesn't already exist in the database
      // create a new Repo instance, assigning all the relevant values to their appropriate fields
      // save the new instance to the database

}

module.exports.save = save;