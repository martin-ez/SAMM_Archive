import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './css/DrumsStyle.css';

class Drums extends Component {
  render() {
    return (
      <div className="drumsComponent">
        <div className="labels">
          {this.RenderLabels()}
        </div>
        <div className="drumPad">
          {this.RenderPointer()}
          {this.RenderPads(this.props.drums.pattern)}
        </div>
        <div className="effectRack">

        </div>
      </div>
    );
  }

  RenderLabels() {
    var labels = ["","Kick", "Snare", "Hihat", "Other"];
    return labels.map((l, i) => {
      if(i==0) return <div key={i} className="empty"></div>;
      return <div key={i} className="label"><h1>{l}</h1></div>
    });
  }

  RenderPointer()
  {
    var pnt = [];
    for(var i = 0; i<16; i++) {
      pnt.push(i);
    }
    return pnt.map((v) => {
      return <div key={v} className={"pointer " + (v==this.props.beat?"active":"")}></div>
    });
  }

  RenderPads(pattern) {
    return pattern.map((v,i) => {
      return v.map((hit, j) => {
        return <div key={i+':'+j}
          className={"pad "+(hit==='x'?"active":"")}
          onClick={() => this.UpdatePattern(i, j)}></div>;
      });
    });
  }

  UpdatePattern(i, j) {
    let oldHit = this.props.drums.pattern[i][j];
    let newHit = oldHit==='x' ? '-':'x';
    this.props.update(newHit, i, j);
  }
}

Drums.propTypes = {
  drums: PropTypes.object.isRequired,
  beat: PropTypes.number.isRequired,
  update: PropTypes.func.isRequired
};
export default Drums;
