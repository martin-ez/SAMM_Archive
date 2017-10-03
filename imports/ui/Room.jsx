import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Song from '../engines/Song.js';
import Drums from './Drums.jsx';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      song: new Song(props.song),
      beat: 0
    }
  }

  componentDidMount() {
    var tInterval = 60000 / (this.props.song.tempo * 4);
    this.interval = setInterval(() => {
      let currentBeat = this.state.beat;
      currentBeat++;
      if(currentBeat === 16) currentBeat = 0;
      for(var i = 0; i<this.props.song.drums.pattern.length; i++) {
        if(this.props.song.drums.pattern[i][currentBeat] === 'x') {
          this.state.song.PlayDrumSound(i);
        }
      }
      this.setState({beat: currentBeat});
    } , tInterval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="container">
        <Drums drums={this.props.song.drums}
          beat={this.state.beat}
          update={(h, i, j) => this.UpdateDrumPattern(h, i, j)}/>
      </div>
    );
  }

  UpdateDrumPattern(hit, i, j) {
    let song = this.props.song;
    song.drums.pattern[i][j] = hit;
    this.props.update(song);
  }
}

Room.propTypes = {
  song: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired
};
export default Room;
