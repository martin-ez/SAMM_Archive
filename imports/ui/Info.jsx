import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './css/InfoStyle.css';

class Info extends Component {
  render() {
    return (
      <div className="InfoTab">
        <h3>Band:</h3>
        <h2>{this.props.song.band}</h2>
        <h3>{"Key: "+this.props.song.key}</h3>
        <h3>{"Tempo: "+this.props.song.tempo}</h3>
        <h3>Chords:</h3>
        <div className="Chords">{this.PrintChordProgression()}</div>
      </div>
    );
  }

  PrintChordProgression() {
    return this.props.song.progression.map((chord, i) => {
      return <div key={i} className="chord"><h2>{this.NumberToChord(chord)}</h2></div>;
    });
  }

  NumberToChord(c) {
    var chord = "I";
    var number = Math.abs(c);
    switch(number) {
      case 1:
      chord = "I";
      break;
      case 2:
      chord = "II";
      break;
      case 3:
      chord = "III";
      break;
      case 4:
      chord = "IV";
      break;
      case 5:
      chord = "V";
      break;
      case 6:
      chord = "VI";
      break;
      case 7:
      chord = "VII";
      break;
    }
    if(c < 0) {
      chord = chord.toLowerCase();
    }
    return chord;
  }
}

Info.propTypes = {
  song: PropTypes.object.isRequired,
  bar: PropTypes.number.isRequired
}

export default Info;
