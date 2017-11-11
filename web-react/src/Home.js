import React, { Component } from 'react';
import logo from './logo.svg';
import Submit from './Submit'

class Home extends Component {
  constructor(props) {
    super(props);
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
        <Submit api={this.props.api} />
      </div>
    );
  }
}


export default Home;




        