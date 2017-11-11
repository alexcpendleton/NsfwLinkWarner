import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import createApi from './FakeApi'

import Submit from './Submit'

class App extends Component {
  constructor(props) {
    super(props);
    this.api = createApi("http://localhost:3000");
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to NsfwNsfw</h1>
        </header>
        <p className="App-intro">
          Give your friends an obvious heads up that this link is pretty suss.
        </p>
        <Submit api={this.api} />
      </div>
    );
  }
}

export default App;
