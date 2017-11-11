import React, { Component } from 'react';
import logo from './screen.png';
import Submit from './Submit'

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container" id="home-container">
        <div class="card" >
          <div class="card-body">
            <h1 class="card-title">NsfwNsfw.com</h1>
            <h3 class="card-subtitle">Give your friends an obvious heads up that this link is pretty suss.</h3>
            <p class="card-text">
            <Submit api={this.props.api} />
            </p>
          </div>
        </div>
      </div>
    );
  }
}


export default Home;




        