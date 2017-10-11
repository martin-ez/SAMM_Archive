import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './css/InstrumentSelectStyle.css';

class InstrumentSelect extends Component {
  render() {
    return (
      <div className="SelectCard">
        <div className="header">
          <h2>You are now a member of the band:</h2>
          <h1>{this.props.song.band}</h1>
        </div>
        {this.RenderDrumsButton()}
        {this.RenderBassButton()}
      </div>
    );
  }

  RenderDrumsButton() {
    if(this.props.song.drums.user==="") {
      return (
        <div className="DrumsSelect button" onClick={() => this.Select("Drums")}>
          <div className="content">
            <img src="icons/snare.svg" alt="Drums Module"/>
            <h3>Drums</h3>
            <h4>Click to Play</h4>
          </div>
        </div>
      );
    } else {
      return (
        <div className="DrumsSelect button taken">
          <div className="content">
            <img src="icons/snare.svg" alt="Drums Module"/>
            <h3>Drums</h3>
            <h4>{"Played by "+this.props.song.drums.user}</h4>
          </div>
        </div>
      );
    }
  }

  RenderBassButton() {
    if(this.props.song.bass.user==="") {
      return (
        <div className="BassSelect button" onClick={() => this.Select("Bass")}>
          <div className="content">
            <img src="icons/bass.svg" alt="Bass Module"/>
            <h3>Bass</h3>
            <h4>Click to Play</h4>
          </div>
        </div>
      );
    } else {
      return (
        <div className="BassSelect button taken">
          <div className="content">
            <img src="icons/bass.svg" alt="Bass Module"/>
            <h3>Bass</h3>
            <h4>{"Played by "+this.props.song.bass.user}</h4>
          </div>
        </div>
      );
    }
  }

  Select(instr) {
    this.props.select(instr);
  }
}

InstrumentSelect.propTypes = {
  select: PropTypes.func.isRequired,
  song: PropTypes.object.isRequired
}

export default InstrumentSelect;
