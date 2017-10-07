import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Slider from 'material-ui/Slider';
import Toggle from 'material-ui/Toggle';

import './css/BassStyle.css';

class Bass extends Component {
  render() {
    return (
      <div className="bassComponent">
        <div className="labels"></div>
        <div className="controls">
          {this.RenderSliders()}
        </div>
      </div>
    );
  }

  RenderSliders() {
    return this.props.bass.pattern.map((v, i) => {
      var value = v;
      var disable = (v==='-');
      if (disable) value = 0.5;
      return (
        <div key={i} className={"step "+(i==this.props.beat?"active":"")}>
          <div className="slider">
            <Slider value={value} style={{height: 300}} axis="y" step={0.125} disabled={disable} onChange={(evt, value) => this.UpdateStep(value, i)}/>
          </div>
          <div className="toggle">
            <Toggle toggled={!disable} onToggle={(evt, b) => this.ToggleStep(b, i)}/>
          </div>
        </div>
      );
    });
  }

  ToggleStep(b, i) {
    var newBass = this.props.bass;
    if(b) {
      newBass.pattern[i] = 0.5;
    } else {
      newBass.pattern[i] = '-';
    }
    this.props.update(newBass);
  }

  UpdateStep(value, i) {
    var newBass = this.props.bass;
    newBass.pattern[i] = value;
    this.props.update(newBass);
  }
}

Bass.propTypes = {
  bass: PropTypes.object.isRequired,
  beat: PropTypes.number.isRequired,
  update: PropTypes.func.isRequired,
  height: PropTypes.number
}

export default Bass;
