let songInstance = null;
import { MonoSynth } from 'synth-kit';
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
    this.bass.synth = require('./BassSynth.js')(this.context);
    this.bass.masterGain = this.context.createGain();
    this.bass.masterGain.connect(this.context.destination);
    this.bass.synth.connect(this.bass.masterGain);
    this.bass.masterGain.gain.value = 3;
    this.bass.ready = true;
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
    var rootStr = this.song.key+"4";
    var note = new Note(rootStr);
    note = this.GetNoteBar(note, bar);
    note = this.GetNoteInterval(note, h);
    var noteName = note.letter+(note.modifier===null?"":note.modifier);
    var midi = this.NoteToMIDI(noteName, note.octave);
    var s = 60 / (this.song.tempo*8);
    this.bass.synth.update({midiNote: midi, attack: 0, decay: 0, sustain: s, release: s*0.1, peak: 0.5, mid: 0.3, end: 0.00001, detune: 0});
    this.bass.synth.start(this.context.currentTime);
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

  GetNoteInterval(note, interval) {
    if(interval === 0.5) {
      return note;
    }
    var minor = this.song.progression[0] < 0;
    switch(interval) {
      case 0:
      note = note.downOctave();
      break;
      case 0.1:
      if(!minor) {
        note = note.majorSecond().downOctave();
      } else {
        note = note.minorThird().downOctave();
      }
      break;
      case 0.2:
      if(!minor) {
        note = note.majorThird().downOctave();
      } else {
        note = note.perfectFourth().downOctave();
      }
      break;
      case 0.3:
      note = note.perfectFifth().downOctave();
      break;
      case 0.4:
      if(!minor) {
        note = note.majorSixth().downOctave();
      } else {
        note = note.minorSeventh().downOctave();
      }
      break;
      case 0.6:
      if(!minor) {
        note = note.majorSecond();
      } else {
        note = note.minorThird();
      }
      break;
      case 0.7:
      if(!minor) {
        note = note.majorThird();
      } else {
        note = note.perfectFourth();
      }
      break;
      case 0.8:
      note = note.perfectFifth();
      break;
      case 0.9:
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

  NoteToMIDI(note, octave) {
    var notes = {
      "C": 0,
      "C#": 1,
      "D": 2,
      "D#": 3,
      "E": 4,
      "F": 5,
      "F#": 6,
      "G": 7,
      "G#": 8,
      "A": 9,
      "A#": 10,
      "B": 11
    };
    return (octave * 12) + notes[note];
  }
}
