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
  }
  componentWillMount() {
    this.loadFromMatch();
  }
  loadFromMatch() {
    const id = this.props.match.params.id;
    this.load(id);
  }
  load(id) {
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
    this.setState({loading:true});
    this.props.api.fetch(id)
      .then(onSuccess, onFailure);
  }
  render() {
    const data = this.state.loaded;
    const error = this.state.error;
    const loading = this.state.loading;
    const props = {loading,data,error};
    return <Veil {...props} />
  }
}

export default VeilLoader;
