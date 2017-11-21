import React, { Component } from 'react';
import Submit from './Submit'

class Home extends Component {
  render() {
    return (
      <div className="container" id="home-container">
        <div className="card" >
          <div className="card-body">
            <h1 className="card-title">NsfwNsfw.com</h1>
            <h3 className="card-subtitle">Give your friends an obvious heads up that this link is pretty suss.</h3>
            <div className="card-text">
            <Submit api={this.props.api} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Home;




        