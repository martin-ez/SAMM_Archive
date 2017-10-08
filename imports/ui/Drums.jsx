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
          {this.RenderPads()}
        </div>
        <div className="effectRack">

        </div>
      </div>
    );
  }

  RenderLabels() {
    var labels = ["kick", "snare", "hihat", "clap"];
    return labels.map((l, i) => {
      return <div key={i} className="label">
        <img src={"icons/"+l+".svg"} alt={l}/>
      </div>
    });
  }

  RenderPads() {
    var beat = [];
    for(var i = 0; i<16; i++){
      beat.push(i);
    }
    return beat.map((v,i) => {
      return (
        <div key={i} className={"padRow"+(i===this.props.beat?" active":"")}>
          {this.RenderRow(i)}
        </div>
      );
    });
  }

  RenderRow(j) {
    var pad = [0, 1, 2, 4];
    return pad.map((p, i) => {
      if(i!==2) {
        return (
          <div key={i} className={"pad"+(this.props.drums.pattern[p][j]==='x'?" active":"")} onClick={() => this.UpdatePattern(p, j)}>
            <div className="render"></div>
          </div>
        );
      } else {
        return (
          <div key={i} className="hihat">
            <div key={0}className={"hihatClosePad pad"+(this.props.drums.pattern[2][j]==='x'?" active":"")} onClick={() => this.UpdatePattern(2, j)}>
              <div className="render"></div>
            </div>
            <div key={1} className={"hihatOpenPad pad"+(this.props.drums.pattern[3][j]==='x'?" active":"")} onClick={() => this.UpdatePattern(3, j)}>
              <div className="render"></div>
            </div>
          </div>
        );
      }
    });
  }

  UpdatePattern(i, j) {
    var newDrums = this.props.drums;
    let oldHit = newDrums.pattern[i][j];
    let newHit = oldHit==='x' ? '-':'x';
    newDrums.pattern[i][j] = newHit;
    if(i===2 && newHit==='x') {
      newDrums.pattern[3][j] = '-';
    }
    if(i===3 && newHit==='x') {
      newDrums.pattern[2][j] = '-';
    }
    this.props.update(newDrums);
  }
}

Drums.propTypes = {
  drums: PropTypes.object.isRequired,
  beat: PropTypes.number.isRequired,
  update: PropTypes.func.isRequired
};
export default Drums;
