import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {TweenMax, Power2, TimelineLite} from 'gsap';

import './css/HomeStyle.css';

const homeLayoutLarge = {
  display: 'grid',
  gridTemplateColumns: '55vw 45vw'
};

const homeLayoutMobile = {
  marginTop: '7.5vh'
};

class Home extends Component {

  componentDidMount() {
    this.ButtonStartAnimation();
  }

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
          <div className="ctaContainer">
            <button className="ctaButton" onMouseEnter={() => this.ButtonOnEnterAnimation()} onMouseLeave={() => this.ButtonOnLeaveAnimation()}>
              <svg id="ctaColors" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <g ref={(b) => (this.colors = b)} id="colorsGroup">
                  <rect x="00%" width="25%" height="10%" fill="#DF2230"/>
                  <rect x="25%" width="25%" height="10%" fill="#107AB3"/>
                  <rect x="50%" width="25%" height="10%" fill="#11882A"/>
                  <rect x="75%" width="25%" height="10%" fill="#791FC6"/>
                </g>
              </svg>
              <h1 className="text fwThin">Make Music</h1>
            </button>
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
          </span>
        </div>
      );
    } else {
      return (
        <div className="box inverted">
          <div className="logButton">
            <button>
              <h2>Log out</h2>
            </button>
          </div>
          <div className="userImg">
            <img src={this.props.user.photoURL} alt={this.props.user.displayName+"'s profile image"}/>
          </div>
          <h1>{this.props.user.displayName}</h1>
          <div className="userStats">
            <div className="sessionSong">
              <h2>SessionSongs</h2>
              <p>12</p>
            </div>
            <div className="savedSong">
              <h2>SavedSongs</h2>
              <p>12</p>
            </div>
            <div className="favInstr">
              <h2>FavoriteInstr</h2>
              <p>Bass</p>
            </div>
          </div>
          <div className="loadSong">
            <button>
              See saved songs
            </button>
          </div>
        </div>
      );
    }
  }

  ButtonStartAnimation() {
    this.colorsRef = [...this.colors.childNodes].reverse();
    let tl = new TimelineLite();
    tl.set(this.colorsRef, {y: "0%", height: "10%"})
    tl.staggerTo(this.colorsRef, 0.4, {height: "100%", ease: Sine.easeInOut}, 0.1);
    tl.staggerTo(this.colorsRef, 0.4, {y: "90%", height: "100%", ease: Sine.easeInOut}, 0.1);
  }

  ButtonOnEnterAnimation() {
    let tl = new TimelineLite();
    tl.staggerTo(this.colorsRef, 0.5, {y: "0%", ease: Sine.easeInOut}, 0.1);
  }

  ButtonOnLeaveAnimation() {
    let tl = new TimelineLite();
    tl.staggerTo(this.colorsRef, 0.5, {y: "90%", ease: Sine.easeInOut}, 0.1);
  }
}

Home.propTypes = {
  updateView: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default Home;
