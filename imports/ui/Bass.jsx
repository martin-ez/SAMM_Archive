import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './css/BassStyle.css';

class Bass extends Component {
  render() {
    var MediaQuery = require('react-responsive');
    return (
      <div>
        <MediaQuery query='(min-width: 800px)'>
          <div id="Bass" className="instrumentUILarge">
            {this.RenderBass()}
          </div>
        </MediaQuery>
        <MediaQuery query='(max-width: 800px)'>
          <div id="Bass" className="instrumentUISmall">
            {this.RenderBass()}
          </div>
        </MediaQuery>
      </div>
    );
  }

  RenderBass() {

  }
}

Bass.propTypes = {
  beat: PropTypes.number.isRequired,
  pattern: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired
}

export default Bass;
