import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Bass extends Component {
  render() {
    return (
      <div className="bassComponent"></div>
    );
  }
}

Bass.propTypes = {
  bass: PropTypes.object.isRequired,
  beat: PropTypes.number.isRequired,
  update: PropTypes.func.isRequired
}

export default Bass;
