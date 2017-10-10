import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Song from '../core/Song.js';

import Visualizer from './Visualizer.jsx';
import Info from './Info.jsx';
import Drums from './Drums.jsx';
import Bass from './Bass.jsx';
import DrawerMenu from './DrawerMenu.jsx';
import InstrumentSelect from './InstrumentSelect.jsx';

import './css/RoomStyle.css';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      song: new Song(props.song),
      instrument: "",
      beat: 0,
      bar: 0,
      width: 0,
      height: 0,
      open: false
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    var tInterval = 60000 / (this.props.song.tempo * 4);
    this.interval = setInterval(() => {
      var currentBar = this.state.bar;
      let currentBeat = this.state.beat;
      currentBeat++;
      if (currentBeat === 16) {
        currentBeat = 0;
        currentBar++;
        if (currentBar === 4){
          currentBar = 0;
        }
      }
      this.PlaySounds(currentBeat, currentBar);
      this.setState({beat: currentBeat, bar: currentBar});
    }, tInterval);
  }
    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

  PlaySounds(currentBeat, currentBar) {
    if(currentBeat === 0) {
      this.state.song.PlayBGSounds(currentBar);
    }
    if(this.props.song.drums.user !== "") {
      for (var i = 0; i < this.props.song.drums.pattern.length; i++) {
        if (this.props.song.drums.pattern[i][currentBeat] === 'x') {
          this.state.song.PlayDrumSound(i);
        }
      }
    }
    if(this.props.song.bass.user !== "") {
      if(this.props.song.bass.pattern[currentBeat] !== '-') {
        this.state.song.PlayBassSound(this.props.song.bass.pattern[currentBeat], currentBar, this.props.song.bass.sound);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    clearInterval(this.interval);
  }

  updateWindowDimensions() {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  }

  render() {
    return (
      <div id="Room">
        <DrawerMenu estado={this.state.open} cerrar={()=>{this.handleClose()}} vista={(v)=>{this.props.updateV(v)}} saveSong={()=>{this.props.saveS()}}/>
        <div className="button-container-1 options">
          <span className="mas options">Click for options</span>
          <button id='work' type="button" name="Hover" onClick={()=>{this.handleToggle()}}>{this.props.usuario?this.props.usuario.username:""}</button>
        </div>
        <Visualizer instrument="Drums" create={(c, i) => this.CreateVisualizer(c, i)} width={this.state.width / 4} height={this.state.height * 0.35}/>
        <Visualizer instrument="Bass" create={(c, i) => this.CreateVisualizer(c, i)} width={this.state.width / 4} height={this.state.height * 0.35}/>
        <Visualizer instrument="Keys" create={(c, i) => this.CreateVisualizer(c, i)} width={this.state.width / 4} height={this.state.height * 0.35}/>
        <Info song={this.props.song} bar={this.state.bar}/>
        {this.RenderInstrument()}
      </div>
    );
  }

  RenderInstrument() {
    if (this.state.instrument === "") {
      return(
        <InstrumentSelect select={(instr) => this.SelectInstrument(instr)} song={this.props.song}/>
      );
    }
    else if (this.state.instrument === "Drums") {
      return (
        <Drums drums={this.props.song.drums} beat={this.state.beat} update={(h, i, j) => this.UpdateDrumPattern(h, i, j)} height={this.state.height * 0.65}/>
      );
    } else if (this.state.instrument === "Bass") {
      return (
        <Bass bass={this.props.song.bass} beat={this.state.beat} update={(v, i) => this.UpdateBassPattern(v, i)}/>
      );
    }
  }

  SelectInstrument(instr) {
    this.setState({
      instrument: instr
    }, () => {
      let song = this.props.song;
      if(instr==="Drums") {
        song.drums.user = this.props.user;
      } else if (instr==="Bass") {
        song.bass.user = this.props.user;
      }
      this.props.update(song);
    });
  }

  CreateVisualizer(canvas, instrument) {
    this.state.song.CreateVisualizer(canvas, instrument);
  }

  UpdateDrumPattern(newDrums) {
    let song = this.props.song;
    song.drums = newDrums;
    this.props.update(song);
  }

  UpdateBassPattern(newBass) {
    let song = this.props.song;
    song.bass = newBass;
    this.props.update(song)
  }
}

Room.propTypes = {
  song: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired
};

export default Room;
