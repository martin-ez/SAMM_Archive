import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './css/HomeStyle.css';

const homeLayout = {
  display: 'grid',
  gridTemplateColumns: '55vw 45vw'
};

class Home extends Component {
  render() {
    var MediaQuery = require('react-responsive');
    return (
      <div>
        <MediaQuery query='(min-device-width: 1224px)'>
          <div id="Home" className="page" style={homeLayout}>
            {this.RenderLogo()}
            {this.RenderText()}
          </div>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 1224px)'>
          <div id="Home" className="page">
            {this.RenderLogo()}
            {this.RenderText()}
          </div>
        </MediaQuery>
      </div>
    );
  }

  RenderLogo() {
    return (
      <div className="logoBox">
        <div className="content">
          <div className="logo">
            <img src="icons/logo.svg" alt="SAMM's Logo"/>
          </div>
          <div className="ctaButton"></div>
        </div>
      </div>
    );
  }

  RenderText() {
    return (
      <div className="box inverted">
        <span>
          <h2 className="fwThin">Social Adaptable Music Maker</h2>
          <p>
            Lorem Ipsum
          </p>
        </span>
      </div>
    );
  }
}

Home.propTypes = {
  updateView: PropTypes.func.isRequired
}

export default Home;
