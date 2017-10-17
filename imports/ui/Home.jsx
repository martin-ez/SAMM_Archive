import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';

import './css/HomeStyle.css';

const homeLayoutLarge = {
  display: 'grid',
  gridTemplateColumns: '55vw 45vw'
};

const homeLayoutMobile = {
  marginTop: '7.5vh'
};

class Home extends Component {
  render() {
    var MediaQuery = require('react-responsive');
    return (
      <div>
        <MediaQuery query='(min-device-width: 1224px)'>
          <div id="Home" className="page" style={homeLayoutLarge}>
            {this.RenderLogo()}
            {this.RenderText()}
          </div>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 1224px)'>
          <div id="Home" className="page" style={homeLayoutMobile}>
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
          <div className="ctaButton button">
            <h1 className="text fwThin">Make Music</h1>
            <img className="colors" src="icons/colors.svg" alt=""/>
          </div>
        </div>
      </div>
    );
  }

  RenderText() {
    if(this.props.user === null)
    {
      return (
        <div className="box inverted">
          <span>
            <h1>Social Adaptable Music Maker</h1>
            <br/>
            <h2>What is SAMM?</h2>
            <br/>
            <p>
              It's a place where you can create music with total strangers. You
              don't need to know any music theory, just have fun jamming out.
            </p>
            <br/>
            <h2>How can I use it?</h2>
            <br/>
            <p>
              Click the "Make Music" button to start creating. You can also log in
              to be able to save songs.
            </p>
            <div className="login" onClick={this.props.login}>
              <h2>Log In</h2>
            </div>
          </span>
        </div>
      );
    } else {
      return (
        <div className="box inverted"></div>
      );
    }
  }
}

Home.propTypes = {
  updateView: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default Home;
