import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
const getReposByUsername = require('../../helpers/github.js');
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  componentDidMount() {
    axios.get('http://localhost:1128/repos')
    .then((top25Repos) => {
      this.setState({repos: top25Repos.data});
    })
  }

  search (term) {
    console.log(`${term} was searched`);

    axios.post('http://localhost:1128/repos', {username: term})
    .then(() => {
      console.log('');
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));