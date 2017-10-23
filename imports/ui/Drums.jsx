import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './css/DrumsStyle.css';

class Drums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selector: -1,
      controls: 4
    };
  }
  render() {
    var MediaQuery = require('react-responsive');
    return (
      <div>
        <MediaQuery query='(min-width: 800px)'>
          <div id="Drums" className="instrumentUILarge">
            {this.RenderDrums()}
          </div>
        </MediaQuery>
        <MediaQuery query='(max-width: 800px)'>
          <div id="Drums" className="instrumentUISmall">
            {this.RenderDrums()}
          </div>
        </MediaQuery>
      </div>
    );
  }

  RenderDrums() {
    return (
      <svg id="DrumsModule" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <g id="soundSelectors">
          <path className="selector" fill={this.state.selector===0 || this.state.selector===4?"#E5E5E5":"none"} vectorEffect="non-scaling-stroke" d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.7 0 50 0zm0 92.2c-23.3 0-42.3-19-42.3-42.3S26.7 7.6 50 7.6c23.3 0 42.3 19 42.3 42.3.1 23.4-18.9 42.3-42.3 42.3z"/>
          <path className="selector" fill={this.state.selector===1 || this.state.selector===4?"#E5E5E5":"none"} vectorEffect="non-scaling-stroke" d="M50 5.6C25.5 5.6 5.5 25.5 5.5 50.1c0 24.5 19.9 44.5 44.5 44.5s44.5-19.9 44.5-44.5S74.6 5.6 50 5.6zm.1 80.6c-20 0-36.2-16.2-36.2-36.2s16.2-36.2 36.2-36.2S86.3 30 86.3 50 70.1 86.2 50.1 86.2z"/>
          <path className="selector" fill={this.state.selector===2 || this.state.selector===4?"#E5E5E5":"none"} vectorEffect="non-scaling-stroke" d="M50 12c-21 0-38 17.1-38 38s17.1 38 38 38 38-17.1 38-38-17-38-38-38zm0 68c-16.6 0-30-13.4-30-30s13.4-30 30-30 30 13.4 30 30-13.4 30-30 30z"/>
          <path className="selector" fill={this.state.selector===3 || this.state.selector===4?"#E5E5E5":"none"} vectorEffect="non-scaling-stroke" d="M50 18.2c-17.6 0-31.8 14.2-31.8 31.8s14.2 31.8 31.8 31.8S81.9 67.6 81.9 50 67.7 18.2 50.1 18.2zM50 74c-13.2 0-24-10.8-24-24s10.8-24 24-24 24 10.8 24 24-10.8 24-24 24z"/>
        </g>
        <g id="beatSelectors">
          <path className="beatSelector" fill="#E5E5E5" transform={"rotate("+(22.5 * this.props.beat)+" 50 50)"} d="M40.3,1l5,24.6c1.5-0.3,2.7-0.5,4.9-0.5c2.1,0,3.3,0.2,4.7,0.5c1.6-7.9,3.4-16.8,5-24.6C57.2,0.4,54,0,50,0S43.1,0.4,40.3,1z"/>
        </g>
        <g id="controls">
          <path className={"control"+(this.state.controls===0?" active":"")} onMouseEnter={this.state.controls===0?"":(() => this.ControlHover(0))} onMouseLeave={() => this.ControlHoverLeave()}
            fill={this.state.controls===0?"#4C4C4C":"#808080"} onClick={() => this.SelectControl(0)}
            d="M30,36.1c0.8-1.1,1.7-2.1,2.6-3.1c1.1-1.1,2.2-2.1,3.4-3l3,4.3c-0.9,0.6-1.8,1.4-2.5,2.1c-0.8,0.8-1.4,1.6-2.1,2.6L30,36.1z"/>
          <path className={"control"+(this.state.controls===1?" active":"")} onMouseEnter={this.state.controls===1?"":(() => this.ControlHover(1))}  onMouseLeave={() => this.ControlHoverLeave()}
            fill={this.state.controls===1?"#4C4C4C":"#808080"} onClick={() => this.SelectControl(1)}
            d="M36.9,29.5c1.1-0.7,2.3-1.3,3.6-1.9c1.4-0.6,2.8-1.1,4.3-1.4l1.1,5.1c-1,0.3-2.1,0.6-3.1,1c-1.1,0.4-1.9,1-2.9,1.6L36.9,29.5z"/>
          <path className={"control"+(this.state.controls===2?" active":"")} onMouseEnter={this.state.controls===2?"":(() => this.ControlHover(2))}  onMouseLeave={() => this.ControlHoverLeave()}
            fill={this.state.controls===2?"#4C4C4C":"#808080"} onClick={() => this.SelectControl(2)}
            d="M45.8,26c1.3-0.2,2.7-0.3,4-0.3c1.5,0,3,0.1,4.5,0.3l-1,5.2c-1.1-0.2-2.2-0.3-3.3-0.3c-1.1,0-2.2,0.1-3.3,0.3L45.8,26z"/>
          <path className={"control"+(this.state.controls===3?" active":"")} onMouseEnter={this.state.controls===3?"":(() => this.ControlHover(3))}  onMouseLeave={() => this.ControlHoverLeave()}
            fill={this.state.controls===3?"#4C4C4C":"#808080"} onClick={() => this.SelectControl(3)}
            d="M55.4,26.2c1.3,0.3,2.6,0.7,3.8,1.2c1.4,0.6,2.8,1.2,4,2l-2.9,4.4c-0.9-0.5-1.9-1.1-2.9-1.5c-1.1-0.4-2-0.7-3.2-1L55.4,26.2z"/>
          <path className={"control"+(this.state.controls===4?" active":"")} onMouseEnter={this.state.controls===4?"":(() => this.ControlHover(4))}  onMouseLeave={() => this.ControlHoverLeave()}
            fill={this.state.controls===4?"#4C4C4C":"#808080"} onClick={() => this.SelectControl(4)}
            d="M64.1,30c1.1,0.8,2.1,1.7,3.1,2.6c1.1,1.1,2.1,2.2,3,3.4l-4.3,3c-0.6-0.9-1.4-1.8-2.1-2.5c-0.8-0.8-1.6-1.4-2.6-2.1L64.1,30z"/>
          <circle className="controlUI" fill="#808080" cx="50.1" cy="50.1" r="18.4"/>
        </g>
        <g id="pads">
          {this.RenderPads()}
        </g>
      </svg>
    );
  }

  RenderPads() {
    var pattern = this.props.pattern.pattern;

    return pattern.map((p, i) =>{
      return p.map((q,j) => {
        var hit = (q==='x');
        var current = (j===this.props.beat);
        var selector = false;
        if(this.state.selector < 2) {
          selector = (i===this.state.selector);
        } else if ((this.state.selector === 2 && (i===2 || i===3)) || (this.state.selector === 3 && i===4) || this.state.selector === 4) {
          selector = true;
        }
        switch(i) {
          case 0:
          return (
            <path key={i+":"+j} className={"pad"+(hit?" active":"")} onClick={() => this.ChangePattern(i,j)}
              stroke={current?"#181818":(selector?"#181818":"#808080")} fill={hit?(current?"#181818":(selector?"#181818":"#808080")):"#DF2230"} transform={"rotate("+(22.5 * j)+" 50 50)"}
              d="M41.5 1.9c2.8-.5 5.7-.8 8.6-.8s5.8.3 8.6.8l-.8 4.2c-2.4-.4-4.9-.6-7.4-.7h-.3c-2.6 0-5.2.2-7.8.7l-.9-4.2z"/>
          );
          break;
          case 1:
          return (
            <path key={i+":"+j} className={"pad"+(hit?" active":"")} onClick={() => this.ChangePattern(i,j)}
              stroke={current?"#181818":(selector?"#181818":"#808080")} fill={hit?(current?"#181818":(selector?"#181818":"#808080")):"#DF2230"} transform={"rotate("+(22.5 * j)+" 50 50)"}
              d="M56.7 12.2c-2.1-.4-4.3-.6-6.4-.6h-.1c-2.2 0-4.4.2-6.5.6l-.8-4.1c2.4-.5 4.9-.7 7.4-.7h.3c2.4 0 4.7.3 7 .7l-.9 4.1z"/>
          );
          break;
          case 2:
          return (
            <path key={i+":"+j} className={"pad"+(hit?" active":"")} onClick={() => this.ChangePattern(i,j)}
              stroke={current?"#181818":(selector?"#181818":"#808080")} fill={hit?(current?"#181818":(selector?"#181818":"#808080")):"#DF2230"} transform={"rotate("+(22.5 * j)+" 50 50)"}
              d="M50.1 13.6c-2.1 0-4 .2-6 .6l.8 4.2c1.8-.3 3.4-.5 5.2-.5v-4.3z"/>
          );
          break;
          case 3:
          return (
            <path key={i+":"+j} className={"pad"+(hit?" active":"")} onClick={() => this.ChangePattern(i,j)}
              stroke={current?"#181818":(selector?"#181818":"#808080")} fill={hit?(current?"#181818":(selector?"#181818":"#808080")):"#DF2230"} transform={"rotate("+(22.5 * j)+" 50 50)"}
              d="M50.1 13.6c.1 0 4.2.2 6.1.6l-.8 4.2c-1.7-.3-5.2-.5-5.3-.5v-4.3z"/>
          );
          break;
          case 4:
          return (
            <path key={i+":"+j} className={"pad"+(hit?" active":"")} onClick={() => this.ChangePattern(i,j)}
              stroke={current?"#181818":(selector?"#181818":"#808080")} fill={hit?(current?"#181818":(selector?"#181818":"#808080")):"#DF2230"} transform={"rotate("+(22.5 * j)+" 50 50)"}
              d="M54.2 24.4c-1.3-.2-2.6-.3-3.9-.3h-.2c-1.4 0-2.7.1-4.1.3l-.8-4.2c1.6-.3 3.3-.4 4.9-.4s3.3.1 4.9.4l-.8 4.2z"/>
          );
          break;
        }
      });
    });
  }

  ChangePattern(i,j) {
    var drums = this.props.pattern;
    drums.pattern[i][j] = (drums.pattern[i][j]==='-'?"x":"-");
    if(i==2 && drums.pattern[i][j]==='x') {
      drums.pattern[3][j] = '-';
    } else if (i==3 && drums.pattern[i][j]==='x') {
      drums.pattern[2][j] = '-';
    }
    this.props.update(drums);
  }

  ControlHover(i) {
    this.setState({
      selector: i
    });
  }

  ControlHoverLeave() {
    this.setState({
      selector: -1
    });
  }

  SelectControl(i) {
    this.setState({
      controls: i
    });
  }
}

Drums.propTypes = {
  beat: PropTypes.number.isRequired,
  pattern: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired
}

export default Drums;
