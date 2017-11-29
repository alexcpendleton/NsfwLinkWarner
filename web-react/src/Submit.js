import React, { Component } from 'react';

class Submit extends Component {
  constructor(props) {
    super(props);
    //if(!props.api) throw new Error("api prop is required");
    this.state = {urlToMask: '',justCreated:{safeUri:"https://www.nsfwnsfw.com/NSFW/test/NSFW"}};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.create = this.create.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.displayCreated = this.displayCreated.bind(this);
    this.displayProblem = this.displayProblem.bind(this);
  }

  handleChange(event) {
    this.setState({urlToMask: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.handleValidation()
      .then(this.create, this.displayProblem);
  }
  handleValidation() {
    return new Promise((resolve, reject)=>{
      resolve();
    });
  }
  create() {
    const urlToMask = this.state.urlToMask;
    return this.props.api
      .create(urlToMask)
      .then(this.displayCreated, this.displayProblem)
  }
  displayCreated(data) {
    this.setState({justCreated:{safeUri:data.safeUri}});
  }
  displayProblem(problem) {
    console.error(problem);
  }
  render() {
    return (
      <div>
        <form className="submit-form" onSubmit={this.handleSubmit}>
          <div className="row">
            <input type="text" value={this.state.urlToMask} onChange={this.handleChange} placeholder="Your original URL here" className="url original-url col-9 col" />  
            <input type="submit" value="Submit" className="submit-button col-3 col" />
          </div>
        </form>
        <form className="submit-form">
          {this.renderJustCreated()}
          <p id="disclaimer" className="row">All nsfwnsfw.com links are public and can be accessed by anyone!</p>
        </form>
      </div>
    );
  }
  renderJustCreated() {
    if(!this.state.justCreated) return "";
    const safeUri = this.state.justCreated.safeUri;
    return (
      <div id="justCreated" className="row">
        <input type="text" value={safeUri} readOnly className="url col-8 col"/>
        <input type="submit" value="Copy" className="submit-button center col-2" />
        <a href={safeUri} className="submit-button btn center col-2 col">Go see it</a>
      </div>
    );
  }
}

export default Submit;
