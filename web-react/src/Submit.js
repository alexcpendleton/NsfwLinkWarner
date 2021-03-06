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

  render() {
    const isLoading = this.state.loading;
    const containerClass = isLoading ? "loading":"";
    return (
      <div className={containerClass}>
        <form className="submit-form" onSubmit={this.handleSubmit}>
          <div className="row">
            <input type="text" value={this.state.urlToMask} onChange={this.handleChange} placeholder="Your original URL here" className="url original-url col-9 col hoverlike-box-shadow" />
            <button type="submit" className="paper-btn pseudo-submit-button col-3 col hoverlike-box-shadow">
              <div className="normal-text">Submit</div>
              <div className="spinner">&nbsp;</div>
            </button>
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
        <button onClick={this.handleCopyClick} className="copy-button paper-btn pseudo-submit-button center col-2 hoverlike-box-shadow">{this.state.copyButtonText}</button>
        <a href={safeUri} className="paper-btn pseudo-submit-button center col-2 col hoverlike-box-shadow">Go see it</a>
      </div>
    );
  }
  renderError() {
    const message = this.state.error.friendlyMessage ||
       "Sorry, there was a problem. Try again! :(";
    return (
      <div className="row">
        <div className="col sm-12 border border-danger background-danger text-danger">{message}</div>
      </div>
    )
  }
  handleChange(event) {
    this.setState({urlToMask: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    this.handleValidation()
      .then(this.create, this.displayProblem);
  }
  handleLoading() {
    this.setState({
      loading: true
    });
  }
  handleLoadingFinished() {
    this.setState({
      loading: false
    });
  }
  handleValidation() {
    return new Promise((resolve, reject)=>{
      resolve();
    });
  }
  create() {
    this.handleLoading();
    this.clearError();
    const urlToMask = this.state.urlToMask;
    return this.props.api
      .create(urlToMask)
      .then(this.displayCreated, this.displayProblem)
  }
  displayCreated(data) {
    this.handleLoadingFinished();
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
    this.handleLoadingFinished();
    this.setState({error:problem})
  }
  clearError() {
    this.setState({error:false})
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
