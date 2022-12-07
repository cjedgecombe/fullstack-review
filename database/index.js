const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
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
}

module.exports.save = save;