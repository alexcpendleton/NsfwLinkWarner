import React, {Component} from 'react';
import logo from './screen.png'
class Veil extends Component {
  constructor(props) {
    super(props);
    //if(!props.api) throw new Error("api prop is required");
  }
  render() {
    const unsafeUrl = this.props.data.unsafeUrl;
    return (
      <div class="container">
        <div className="row flex-center">
          <div id="veil" className="">
            <div className="card">
              <div className="card-header">
                <h3 className="margin-small">Hey, be careful!</h3>
              </div>
              <div class="card-body">
                <p className="card-text">
                  This might be risky to open at work or in a public space.
                </p>
                <a className="row paper-btn unsafe-url" href={unsafeUrl}>{unsafeUrl}</a>
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
    unsafeUrl: '',
    showAds: true
  }
};

export default Veil;
