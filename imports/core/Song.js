let songInstance = null;

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
        buffers: [],
        source: null,
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
      soundLoader.loadBassBuffer((b) => this.FinishedLoadingBass(b));
    }
    this.song = newSong;
    return songInstance;
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
      this.drums.sources[i].connect(this.drums.analyser);
      this.drums.sources[i].start(0);
    }
  }
}
