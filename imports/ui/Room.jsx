import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Song from '../engines/Song.js';

class Room extends Component {
  render() {
    return (
      <div className="container">
        <h1>Room</h1>
      </div>
    );
  }
}

Room.propTypes = {
  song: PropTypes.object.isRequired
};
export default Room;
