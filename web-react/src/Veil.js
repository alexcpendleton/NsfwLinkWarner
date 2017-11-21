import React, {Component} from 'react';

class Veil extends Component {
  render() {
    const unsafeUri = this.props.data.unsafeUri;
    return (
      <div className="container">
        <div className="row flex-center">
          <div id="veil" className="">
            <div className="card">
              <div className="card-header">
                <h3 className="margin-small">Hey, be careful!</h3>
              </div>
              <div className="card-body">
                <p className="card-text">
                  This might be risky to open at work or in a public space.
                </p>
                <a className="row paper-btn unsafe-uri" href={unsafeUri}>{unsafeUri}</a>
                {this.renderAds()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  renderAds() {
    if (!this.props.data.showAds) 
      return ""
    return (
      <div className="card-text adspace">
        A tasteful ad may go here.
      </div>
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
