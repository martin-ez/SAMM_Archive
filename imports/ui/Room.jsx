import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Song from '../engines/Song.js';

import Visualizer from './Visualizer.jsx';
import Drums from './Drums.jsx';

import './css/RommStyle.css';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      song: new Song(props.song),
      beat: 0,
      width: 0,
      height: 0
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    var tInterval = 60000 / (this.props.song.tempo * 4);
    this.interval = setInterval(() => {
      let currentBeat = this.state.beat;
      currentBeat++;
      if (currentBeat === 16)
        currentBeat = 0;
      for (var i = 0; i < this.props.song.drums.pattern.length; i++) {
        if (this.props.song.drums.pattern[i][currentBeat] === 'x') {
          this.state.song.PlayDrumSound(i);
        }
      }
      this.setState({beat: currentBeat});
    }, tInterval);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    clearInterval(this.interval);
  }

  updateWindowDimensions() {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  }

  render() {
    return (
      <div id="Room">
        <Visualizer instrument="Drums"
          create={(c, i) => this.CreateVisualizer(c, i)}
          width={this.state.width / 4}
          height={this.state.height * 0.35}/>
        <Visualizer instrument="Drums"
          create={(c, i) => this.CreateVisualizer(c, i)}
          width={this.state.width / 4}
          height={this.state.height * 0.35}/>
        <Visualizer instrument="Drums"
          create={(c, i) => this.CreateVisualizer(c, i)}
          width={this.state.width / 4}
          height={this.state.height * 0.35}/>
        <div className="songInfo">Info</div>
        <Drums drums={this.props.song.drums}
          beat={this.state.beat}
          update={(h, i, j) => this.UpdateDrumPattern(h, i, j)}/>
      </div>
    );
  }

  CreateVisualizer(canvas, instrument) {
    this.state.song.CreateVisualizer(canvas, instrument);
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
