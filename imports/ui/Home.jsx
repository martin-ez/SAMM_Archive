import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';

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
          <div className="ctaButton">
            <h2 className="text fwThin">Make Music</h2>
            <img className="colors" src="icons/colors.svg" alt=""/>
          </div>
        </div>
      </div>
    );
  }

  RenderText() {
    return (
      <div className="box inverted">
        <span>
          <h2 className="fwThin">Social Adaptable Music Maker</h2>
          <br/>
          <p>
            Create songs with strangers, without any need of music theory.
            Have fun jamming out with one of four different instruments.
            <br/><br/>
            Create an account to be able to save your songs.
            Or log in if you already have an account.
          </p>
          <div className="logButtons">
            <div className="button"><h2>Sign Up</h2></div>
            <div className="button"><h2>Log In</h2></div>
          </div>
        </span>
      </div>
    );
  }
}

Home.propTypes = {
  updateView: PropTypes.func.isRequired
}

export default Home;
