import React, {Component} from 'react';

class Veil extends Component {
  render() {
    return (
      <div className="container">
        <div className="row flex-center">
          <div id="veil" className="">
            <div className="card">
              <div className="card-header">
                <h3 className="margin-small">Hey, be careful!</h3>
              </div>
              <div className="card-body">
                {this.renderBody()}
                {this.renderAds()}
              </div>
              <div className="card-footer">
                Make your own at <a href="https://www.nsfwnsfw.com/">nsfwnsfw.com</a>!
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
    else 
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
    return <div>Loading...</div>
  }
  renderAds() {
    if (!this.props.data || !this.props.data.showAds) 
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
