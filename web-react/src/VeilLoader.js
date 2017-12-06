import React, { Component } from 'react';
import Veil from './Veil'

class VeilLoader extends Component {
  constructor(props) {
    super(props);
    if(!props.api) throw new Error("api prop is required");
    this.state = {
      loading: true,
      loaded: null,
      error: null,
    };
    this.load = this.load.bind(this);
    this.loadFromMatch = this.loadFromMatch.bind(this);
    this.loadFromMatch();
  }
  loadFromMatch() {
    const id = this.props.match.params.id;
    this.load(id);
  }
  load(id) {
    this.setState({loading:true});
    const onSuccess = (data)=>{
      this.setState({
        loaded:data,
        loading:false
      });
    }
    const onFailure = (error)=>{
      this.setState({
        loading:false,
        error,
        loaded:null
      });
    }
    this.props.api.fetch(id)
      .then(onSuccess, onFailure);
  }
  render() {
    const data = this.state.loaded;
    return <Veil loading={this.state.loading} data={data} />
  }
}

export default VeilLoader;
