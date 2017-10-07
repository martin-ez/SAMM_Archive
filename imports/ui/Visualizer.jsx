import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './css/VisualizerStyle.css';

class Visualizer extends Component {

  componentDidMount() {
    var ctx = this.refs.canvas.getContext('2d');
    this.props.create(ctx, this.props.instrument);
  }

  render() {
    return (
      <div className={"Visualizer " +this.props.instrument}>
        <canvas id="Spectrum"
          ref="canvas"
          width={this.props.width}
          height={this.props.height}></canvas>
      </div>
    );
  }
}

Visualizer.propTypes = {
  instrument: PropTypes.string.isRequired,
  create: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
}

export default Visualizer;
