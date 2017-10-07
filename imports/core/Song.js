let songInstance = null;
import { MonoSynth } from 'synth-kit'
import { Octavian, Note } from 'octavian';
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
        synths: [],
        gains: [],
        masterGain: null,
        analyser: null,
        ready: false
      };
      this.bg = {
        voices: [],
        masterGain: null,
        analyser: null,
        ready: false
      };
      this.ready = false;
      let soundLoader = new SoundLoader(this.context);
      soundLoader.loadDrumsBuffer((b) => this.FinishedLoadingDrums(b));
      this.LoadBassSynth();
      this.LoadBGSynth();
    }
    this.song = newSong;
    return songInstance;
  }

  LoadBassSynth() {
    this.bass.masterGain = this.context.createGain();
    for(var i = 0; i<2; i++) {
      this.bass.synths[i] = MonoSynth(this.context);
      this.bass.synths[i].oscillator.type = (i===0?"triangle":"square");
      this.bass.gains[i] = this.context.createGain();
      this.bass.gains[i].connect(this.bass.masterGain);
      this.bass.synths[i].connect(this.bass.gains[i]);
      if(i===1) this.bass.gains[i].gain.value = 0.25;
    }
    this.bass.masterGain.connect(this.context.destination);
    this.bass.ready = true;
  }

  LoadBGSynth() {
    this.bg.masterGain = this.context.createGain();
    for(var i = 0; i<4; i++) {
      this.bg.voices[i] = MonoSynth(this.context);
      this.bg.voices[i].oscillator.type = "sine";
      this.bg.voices[i].connect(this.bg.masterGain);
    }
    this.bg.masterGain.connect(this.context.destination);
    this.bg.masterGain.gain.value = 0.25;
  }

  FinishedLoadingDrums(bufferList) {
    this.drums.buffers = bufferList;
    this.drums.masterGain = this.context.createGain();
    this.drums.masterGain.connect(this.context.destination);
    for (var i = 0; i < 4; i++) {
      this.drums.gains[i] = this.context.createGain();
      this.drums.gains[i].connect(this.drums.masterGain);
    }
    if(this.drums.buffers.length != 0) {
      this.drums.ready = true;
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

  PlayBGSounds(bar) {
    var s = (60) / (this.song.tempo);
    var octave = 4;
    var rootStr = this.song.key+octave;
    var note = new Note(rootStr);
    note = this.GetNoteBar(note, bar);
    var freq = this.GetFrequenciesBar(note, bar);
    for(var i = 0; i<4; i++) {
      this.bg.voices[i].trigger(freq[i], this.context.currentTime, s);
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
    var octave = 2;
    var rootStr = this.song.key+octave;
    var note = new Note(rootStr);
    note = this.GetNoteBar(note, bar);
    note = this.GetNoteInterval(note, bar, h);
    for(var i = 0; i<this.bass.synths.length; i++) {
      this.bass.gains[i].gain.value = (i===1?0.3:1);
      this.bass.synths[i].trigger(note.frequency, this.context.currentTime);
      this.bass.gains[i].gain.setTargetAtTime(0, this.context.currentTime, s);
    }
  }

  GetNoteBar(rootNote, bar) {
    var note = rootNote;
    var minor = this.song.progression[0] < 0;
    var chord = Math.abs(this.song.progression[bar]);
    switch(chord) {
      case 2:
      note = note.majorSecond();
      break;
      case 3:
      if(!minor) {
        note = note.majorThird();
      } else {
        note = note.minorThird();
      }
      break;
      case 4:
      note = note.perfectFourth();
      break;
      case 5:
      note = note.perfectFifth();
      break;
      case 6:
      if(!minor) {
        note = note.majorSixth();
      } else {
        note = note.minorSixth();
      }
      break;
      case 7:
      if(!minor) {
        note = note.majorSeventh();
      } else {
        note = note.minorSeventh();
      }
      break;
    }
    return note;
  }

  GetFrequenciesBar(note, bar) {
    var freq = [];
    freq.push(note.frequency);
    if(this.song.progression[bar] > 0) {
      freq.push(note.majorThird().frequency);
    } else {
      freq.push(note.minorThird().frequency);
    }
    freq.push(note.perfectFifth().frequency);
    freq.push(note.perfectOctave().frequency);
    return freq;
  }

  GetNoteInterval(note, bar, interval) {
    if(interval === 0.5) {
      return note;
    }
    var minor = this.song.progression[bar] < 0;
    switch(interval) {
      case 0:
      note = note.downOctave();
      break;
      case 0.125:
      if(!minor) {
        note = note.majorThird().downOctave();
      } else {
        note = note.minorThird().downOctave();
      }
      break;
      break;
      case 0.25:
      note = note.perfectFifth().downOctave();
      break;
      case 0.375:
      if(!minor) {
        note = note.majorSixth().downOctave();
      } else {
        note = note.minorSeventh().downOctave();
      }
      break;
      case 0.625:
      if(!minor) {
        note = note.majorThird();
      } else {
        note = note.minorThird();
      }
      break;
      case 0.75:
      note = note.perfectFifth();
      break;
      case 0.875:
      if(!minor) {
        note = note.majorSixth();
      } else {
        note = note.minorSeventh();
      }
      break;
      case 1:
      note = note.perfectOctave();
      break;
    }
    return note;
  }
}