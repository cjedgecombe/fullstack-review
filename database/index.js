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

let save = (userRepos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  // assuming that a list of repos returned from the github API is what is passed into this function...

  // iterate through the array of returned repos
  for (var currentRepo of userRepos) {
    var currentID = currentRepo.id;
    // query the database for the current repo's githubID
    Repo.exists({ githubID: currentID })
      // if the query is successful, the current repo already exists and should not be saved
      .then((repoID) => {
        console.log(`Repo ID ${repoID} already exists in the database`);
      })
      // if the query fails, the current repo does not exist and should be saved
      .catch((err) => {
      // create a new Repo instance, assigning all the relevant values to their appropriate fields
      var newDocument = new Repo({
        githubID: currentID,
        name: currentRepo.name,
        url: currentRepo.html_url,
        forks: currentRepo.forks,
        owner: {
          name: currentRepo.owner.login,
          url: currentRepo.owner.html_url
        }
      })
      // save the new instance to the database
      newDocument.save()
        .then(() => {
          console.log('Repo saved successfully');
        })
        .catch((err) => {
          console.log('ERROR', err);
        })
      })
  }


}

module.exports.save = save;