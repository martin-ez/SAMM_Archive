let songInstance = null;
import { MonoSynth } from 'synth-kit';
import { Ocatvian } from 'octavian';
import SoundLoader from './SoundLoader.js';
import Visualizer from './Visualizer.js';

export default class Song {
  constructor(newSong) {
    if (!songInstance) {
      songInstance = this;
      this.context = new AudioContext();
      this.song = newSong;
      this.drums = {
        buffers: [],
        sources: [],
        gains: [],
        masterGain: null,
        analyser: null,
        ready: false
      };
      this.bass = {
        synth: null,
        masterGain: null,
        analyser: null,
        ready: false
      };
      this.keys = {
        buffers: [],
        sources: [],
        masterGain: null,
        analyser: null,
        ready: false
      };
      this.solo = {
        buffers: [],
        sources: [],
        masterGain: null,
        analyser: null,
        ready: false
      };
      this.ready = false;
      let soundLoader = new SoundLoader(this.context);
      soundLoader.loadDrumsBuffer((b) => this.FinishedLoadingDrums(b));
      this.LoadBassSynth();
    }
    this.song = newSong;
    return songInstance;
  }

  LoadBassSynth() {
    /*this.bass.synth = MonoSynth(this.context).connect(true);
    this.bass.synth.amp.gain = 0.5;*/
    this.bass.synth = require('./BassSynth.js')(this.context);
    this.bass.masterGain = this.context.createGain().connect(this.context.destination);
    this.bass.synth .connect(this.bass.masterGain)
    this.bass.ready = true;
  }

  FinishedLoadingDrums(bufferList) {
    this.drums.buffers = bufferList;
    this.drums.masterGain = this.context.createGain().connect(this.context.destination);
    for (var i = 0; i < 4; i++) {
      this.drums.gains[i] = this.context.createGain().connect(this.drums.masterGain);
    }
    if(this.drums.buffers.length != 0) {
      this.drums.ready = true;
    }
  }

  FinishedLoadingBass(bufferList) {
    this.bass.buffers = bufferList;
    this.bass.masterGain = this.context.createGain().connect(this.context.destination);
    if(this.drums.buffers.length != 0) {
      this.bass.ready = true;
    }
  }

  CreateVisualizer(canvas, instrument) {
    var v = new Visualizer();
    switch(instrument) {
      case "Drums":
      var analyser = v.InitializeAnalyser(this.context, canvas, '#FE0000');
      if(!this.drums.analyser) this.drums.analyser = analyser;
      break;
      case "Bass":
      var analyser = v.InitializeAnalyser(this.context, canvas, '#011EFE');
      if(!this.bass.analyser) this.bass.analyser = analyser;
      break;
      case "Keys":
      var analyser = v.InitializeAnalyser(this.context, canvas, '#0BFF01');
      if(!this.keys.analyser) this.keys.analyser = analyser;
      break;
      case "Solo":
      var analyser = v.InitializeAnalyser(this.context, canvas, '#FE00F6');
      if(!this.solo.analyser) this.solo.analyser = analyser;
      break;
    }
  }

  PlayDrumSound(i) {
    if (this.drums.ready) {
      if (this.drums.sources[i]) {
        this.drums.sources[i].disconnect();
      }
      this.drums.sources[i] = this.context.createBufferSource();
      this.drums.sources[i].buffer = this.drums.buffers[i];
      this.drums.sources[i].connect(this.drums.gains[i]);
      if(this.drums.analyser) this.drums.sources[i].connect(this.drums.analyser);
      this.drums.sources[i].start(0);
    }
  }

  PlayBassSound(h, bar) {
    var s = 60 / (this.song.tempo*8);
    //this.bass.synth.update({midiNote: 60, attack: 0.01, decay: s, sustain: s, release: s*0.1, peak: 0.5, mid: 0.3, end: 0.00001, detune: 7});
    //this.bass.synth.start(this.context.currentTime);
  }
}
