import React, { Component } from 'react';
import './App.css';
import './paper.min.css';

import createApi from './WebApi'
//import createApi from './FakeApi'

import Home from './Home'
import VeilLoader from './VeilLoader'

import { 
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
class App extends Component {
  constructor(props) {
    super(props);
    function inferBaseUri() {
      return window.location.origin;
    };
    const apiParams = {
      uriPrePath: inferBaseUri(), 
      apiBaseUri: "https://m4np7k4snf.execute-api.us-east-1.amazonaws.com/dev/"
    }
    this.api = createApi(apiParams);
  }

  render() {
    const api = this.api;
    return (
    <Router>
        <Switch id="routes">
          <Route path="/" exact render={(props)=>{
            return (<Home {...props} api={api} />)}
          }/>
          <Route path="/NSFW/:id/NSFW" exact render={(props)=>(
            <VeilLoader {...props} api={api} />
          )}/>
          <Redirect to="/"/>
        </Switch>
    </Router>
    );
  }
}
export default App;
