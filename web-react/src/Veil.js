import React, {Component} from 'react';

class Veil extends Component {
  render() {
    return (
      <div className="container">
        <div className="row flex-center">
          <div id="veil" className="">
            <div className="card hoverlike-box-shadow">
              <div className="card-header">
                <h3 className="margin-small">Hey, be careful!</h3>
              </div>
              <div className="card-body">
                {this.renderBody()}
                {this.renderAds()}
              </div>
              <div className="card-footer">
                Make your own at <a href="https://www.nsfwnsfw.com/" className="">nsfwnsfw.com</a>!
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  renderBody() {
    if(this.props.loading) 
      return this.renderLoading();
    else if (this.props.error) 
      return this.renderError();
    return this.renderContent();
  }
  renderContent() {
    const unsafeUri = this.props.data.unsafeUri;
    return <div>
      <p className="card-text">
        This might be risky to open at work or in a public space.
      </p>
      <a className="row paper-btn unsafe-uri" href={unsafeUri}>{unsafeUri}</a>
    </div>
  }
  renderLoading() {
    return <p>Loading...</p>
  }
  renderError(error) {
    return <p className="col sm-12 border border-danger text-danger background-danger">Sorry, there was a problem. :(</p>
  }
  renderAds() {
    if (!this.props.data || !this.props.data.showAds) 
      return ""
    return (
      <p className="card-text adspace">
        A tasteful ad may go here.
      </p>
    )
  }

};
Veil.defaultProps = {
  data: {
    unsafeUri: '',
    showAds: true
  }
};

export default Veil;
