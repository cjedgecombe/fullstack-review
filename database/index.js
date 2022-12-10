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

// const test = async function() {
//   var test = await Repo.deleteMany();
//   // var test = await Repo.find();
//   console.log(test);
// }

// test();

let save = async (userRepos) => {

  var reposSaved = 0;

  for (var currentRepo of userRepos) {

    var currentID = currentRepo.id;

    const repoExists = await Repo.exists({ githubID: currentID});

    if (repoExists === null) {

      var newDocument = new Repo({
      githubID: currentID,
      name: currentRepo.name,
      url: currentRepo.html_url,
      forks: currentRepo.forks,
      owner: {
        name: currentRepo.owner.login,
        url: currentRepo.owner.html_url
        }
      });

      await newDocument.save();

      reposSaved++;

    } else {

      console.log(`Repo ID ${currentID} already exists in the database`);
    }
  }
  return `${reposSaved} new repos were saved`;
}

let getTopRepos = async () => {
  // use mongoose to get an array of all repos
  var allRepos = await Repo.find();

  // sort that array, comparing the number of forks of each repo
  var sortedRepos = allRepos.sort((a,b) => {
    return b.forks - a.forks;
  })

  // use slice to create a copy of the first 25 items in the array
  var mostForkedRepos = sortedRepos.slice(0, 25);

  // return top 25 repos
  return mostForkedRepos;
}

exports.save = save;
exports.getTopRepos = getTopRepos;