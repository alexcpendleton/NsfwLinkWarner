import React, { Component } from 'react';

class Veil extends Component {
  constructor(props) {
    super(props);
    //if(!props.api) throw new Error("api prop is required");
  }
  render() {
    const unsafeUrl = this.props.data.unsafeUrl;
    return (
      <div id="veil">
        <div className="card">
          <div className="logo"></div>
          <div>
            <h3>Hey, be careful!</h3>
            <p>This might be risky to open at work or in a public space.</p>
            <a href={unsafeUrl}>{unsafeUrl}</a>
          </div>
        </div>
        {this.renderAds()}
      </div>
    );
  }
  renderAds() {
    if(!this.props.data.showAds) return ""
    return (
    <div className="adspace">
      A tasteful ad may go here.
    </div>
    )
  }
};
Veil.defaultProps = {
  data:{unsafeUrl:'', showAds:true}
};

export default Veil;
