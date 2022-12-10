import React from 'react';

const RepoList = (props) => {

  var sldkfj;

  return <div>
    <h4> Repo List Component </h4>
    These are the top {props.repos.length} most forked repos in the database.

    <ol>
      {props.repos.map((repo) => {
        return <li key={repo.githubID}>
          <a href={repo.url}>{repo.name}</a> by <a href={repo.owner.url}>{repo.owner.name}</a> with {repo.forks} forks</li>
      })}
    </ol>
  </div>
}

export default RepoList;