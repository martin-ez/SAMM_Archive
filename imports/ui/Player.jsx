import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './css/PlayerStyle.css';

class Player extends Component {
  render() {
    return (
      <div id="Player">
        <div className="SongInfo">
          <h2>Band: </h2>
          <br/>
          <h1>{this.props.song.band}</h1>
          <br/>
          <h2>Tempo: </h2>
          <h1>{this.props.song.tempo}</h1>
          <br/>
          <h2>Key: </h2>
          <h1>{this.props.song.key}</h1>
          <br/>
          <h2>Chords:</h2>
          <br/>
          <div className="Chords">{this.PrintChordProgression()}</div>
        </div>
        <div className="buttons">
          <button className={"saveButton"+(this.props.save?"":" inactive")}>
            <h2>{this.props.save?"Save Song":"You need to be log in to save songs"}</h2>
          </button>
          <button className="playButton">
            <h2>play</h2>
          </button>
        </div>
      </div>
    );
  }

  PrintChordProgression() {
    return this.props.song.progressionName.map((chord, i) => {
      return <div key={i} className={"chord"+(this.props.bar===i?" active":"")}><h2>{chord}</h2></div>;
    });
  }
}

Player.propTypes = {
  bar: PropTypes.number.isRequired,
  song: PropTypes.object.isRequired,
  save: PropTypes.bool.isRequired
}

export default Player;
