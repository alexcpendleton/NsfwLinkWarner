import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import createApi from './FakeApi'

import Home from './Home'
import VeilLoader from './VeilLoader'

import { 
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
class App extends Component {
  constructor(props) {
    super(props);
    this.api = createApi("http://localhost:3000");
  }
  render() {
    const api = this.api;
    console.log("render api", api);
    return (
    <Router>
        <div id="routes">
          <Route exact path="/NSFW/:id/NSFW" render={(props)=>(
            <VeilLoader {...props} api={api} />
          )}/>
          <Route exact path="/" render={(props)=>{
            return (<Home {...props} api={api} />)}
          }/>
        </div>
    </Router>
    );
  }
}
export default App;
