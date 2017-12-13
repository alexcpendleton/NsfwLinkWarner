import React, { Component } from 'react';
import Clipboard from 'clipboard';

class Submit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urlToMask: '',
      copyButtonText:"Copy"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.create = this.create.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.displayCreated = this.displayCreated.bind(this);
    this.displayProblem = this.displayProblem.bind(this);
    this.handleCopyClick = this.handleCopyClick.bind(this);
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
    this.clearError();
    const urlToMask = this.state.urlToMask;
    return this.props.api
      .create(urlToMask)
      .then(this.displayCreated, this.displayProblem)
  }
  displayCreated(data) {
    this.clearError();
    this.setState({justCreated:{safeUri:data.safeUri}});
    this.focusSafeUriInput();
  }
  focusSafeUriInput() {
    if(this.safeUriInput) {
      this.safeUriInput.focus();
      this.safeUriInput.select();
    }
  }
  displayProblem(problem) {
    this.setState({error:problem})
  }
  clearError() {
    this.setState({error:false})
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
    if(this.state.error) return this.renderError();
    if(!this.state.justCreated) return "";
    const safeUri = this.state.justCreated.safeUri;
    return (
      <div id="justCreated" className="row">
        <input type="text" value={safeUri} readOnly className="url col-8 col" id="safe-uri" ref={(i)=>this.safeUriInput = i}/>
        <button onClick={this.handleCopyClick} className="copy-button pseudo-submit-button center col-2">{this.state.copyButtonText}</button>
        <a href={safeUri} className="paper-btn pseudo-submit-button center col-2 col">Go see it</a>
      </div>
    );
  }
  renderError() {
    return (
      <div className="row">
        <div className="col sm-12 border border-danger background-danger text-danger">Sorry, there was a problem. Try again! :(</div>
      </div>
    )
  }
  handleCopyClick(event) {
    this.copySafeUriToClipboard();
    this.animateCopied();
    event.preventDefault();
  }
  animateCopied() {
    this.setState({
      copyButtonText:"Copied!"
    })
  }
  copySafeUriToClipboard() {
    const safeUri = this.state.justCreated.safeUri;
    const clipper = new Clipboard('', {
      text: ()=> safeUri
    });
    clipper.onClick({
      currentTarget: document.querySelector(".copy-button")
    });
    clipper.destroy();
  }
}

export default Submit;
