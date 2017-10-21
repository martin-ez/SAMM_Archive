import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Drums extends Component {
  render() {
    var MediaQuery = require('react-responsive');
    return (
      <div>
        <MediaQuery query='(min-width: 800px)'>
          <div id="Drums" className="instrumentUILarge"></div>
        </MediaQuery>
        <MediaQuery query='(max-width: 800px)'>
          <div id="Drums" className="instrumentUISmall"></div>
        </MediaQuery>        
      </div>
    );
  }
}

Drums.propTypes = {
  pattern: PropTypes.object.isRequired
}

export default Drums;
