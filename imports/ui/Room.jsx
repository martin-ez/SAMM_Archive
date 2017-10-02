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
      this.setState({beat: currentBeat});
    } , tInterval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="container">
        <Drums drums={this.props.song.drums} beat={this.state.beat}/>
      </div>
    );
  }
}

Room.propTypes = {
  song: PropTypes.object.isRequired
};
export default Room;
