import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Room extends Component {
  render() {
    return (
      <div className="empty"></div>
    );
  }
}

Room.propTypes = {
  session: PropTypes.bool.isRequired,
  song: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  saveSong: PropTypes.func.isRequired
}

export default Room;
