import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Slider from 'material-ui/Slider';

import './css/VisualizerStyle.css';

class Visualizer extends Component {

  componentDidMount() {
    var ctx = this.refs.canvas.getContext('2d');
    this.props.create(ctx, this.props.instrument);
  }

  render() {
    return (
      <div className={"Visualizer " +this.props.instrument}>
        {this.RenderTag()}
        <Slider defaultValue={1} axis="x" step={0.05} onChange={(evt, value) => this.ChangeVolume(value)}/>
        <div className="canvasContainer">
          <canvas id="Spectrum"
            ref="canvas"
            width={this.props.width}
            height={this.props.height}></canvas>          
        </div>
      </div>
    );
  }

  ChangeVolume(value) {
    this.props.volume(value, this.props.instrument);
  }

  RenderTag() {
    if(this.props.user === "") {
      return (
        <div className="tag">
          <h2>Empty Slot</h2>
        </div>
      );
    } else {
      return (
        <div className="tag">
          <h2>{this.props.user + " on "+this.props.instrument}</h2>
        </div>
      );
    }
  }
}

Visualizer.propTypes = {
  instrument: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  volume: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
}

export default Visualizer;
