import React, { Component } from 'react';

class Submit extends Component {
  constructor(props) {
    super(props);
    if(!props.api) throw new Error("api prop is required");
    this.state = {value: ''};

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
      .create()
      .then(this.displayCreated, this.displayProblem)
  }
  displayCreated({safeUrl}) {
    this.setState({justCreated:{safeUrl}});
  }
  displayProblem(problem) {
    console.error(problem);
  }
  render() {
    return (
      <form className="submit" onSubmit={this.handleSubmit}>
        <label>
          Protect your friends
          <input type="text" value={this.state.urlToMask} onChange={this.handleChange} placeholder="Your original URL here" />
        </label>
        <input type="submit" value="Submit" />
        {this.renderJustCreated()}
        <p id="disclaimer">All nsfwnsfw.com links are public and can be accessed by anyone!</p>
      </form>
    );
  }
  renderJustCreated() {
    if(!this.state.justCreated) return "";
    const safeUrl = this.state.justCreated.safeUrl;
    return (
      <div id="justCreated">
        <input type="text" value={safeUrl} />
        <a href={safeUrl}>Go see it</a>
      </div>
    );
  }
}

export default Submit;
