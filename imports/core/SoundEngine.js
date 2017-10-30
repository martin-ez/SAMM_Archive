let songInstance = null;
import Soundfont from 'soundfont-player';
import { Octavian, Note } from 'octavian';
import SoundLoader from './SoundLoader.js';

export default class SoundEngine {
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
        ready: false
      };
      this.bass = {
        synth: null,
        ready: false
      };
      this.bg = {
        piano: null,
        ready: false
      };
      this.keys = {};
      this.solo = {};
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
    Soundfont.instrument(this.context, "lead_8_bass__lead").then(function (synth) {
      this.bass.synth = synth;
      this.bass.ready = true;
    }.bind(this));
  }

  LoadBGSynth() {
    Soundfont.instrument(this.context, this.song.backgroundSound).then(function (piano) {
      this.bg.piano = piano;
      this.bg.ready = true;
    }.bind(this));
  }

  FinishedLoadingDrums(bufferList) {
    var names = ["kick", "snare", "hihat_close", "hihat_open", "clap"];
    for(var i = 0; i<5; i++) {
      this.drums.buffers[i] = bufferList[names[i]];
    }
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

  ChangeVolume(v, instr) {
    this[instr].masterGain.gain.value = v;
  }

  PlayBGSounds(bar) {
    if(this.bg.ready) {
      var s = (60*8) / (this.song.tempo);
      var octave = 4;
      var rootStr = this.song.key+octave;
      var note = new Note(rootStr);
      note = this.GetNoteBar(note, bar);
      var freq = this.GetFrequenciesBar(note, bar);
      var dur = (60*4)/this.song.tempo;
      for(var i = 0; i<freq.length; i++) {
        this.bg.piano.play(freq[i], this.context.currentTime, {duration: dur}, {soundfont: 'FluidR3_GM'});
      }
    }
  }

  PlayDrumSound(i) {
    if (this.drums.ready) {
      if (this.drums.sources[i]) {
        this.drums.sources[i].disconnect();
      }
      this.drums.sources[i] = this.context.createBufferSource();
      this.drums.sources[i].buffer = this.drums.buffers[i];
      var g = i;
      if (i>2) {
        g = i-1;
      }
      this.drums.sources[i].connect(this.drums.gains[g]);
      this.drums.sources[i].start(0);
    }
  }

  PlayBassSound(h, bar) {
    if(this.bass.ready) {
      var s = 60 / (this.song.tempo*8);
      var octave = 3;
      var rootStr = this.song.key+octave;
      var note = new Note(rootStr);
      note = this.GetNoteBar(note, bar);
      note = this.GetNoteInterval(note, bar, h);
      var noteName = note.letter+(note.modifier?"#":"")+note.octave;
      this.bass.synth.play(noteName, this.context.currentTime, {duration: s}, {gain: 3, soundfont: 'FluidR3_GM'});
    }
  }

  GetNoteBar(rootNote, bar) {
    var note = rootNote;
    var chord = Math.abs(this.song.progression[bar]);
    switch(chord) {
      case 2:
      note = note.majorSecond();
      break;
      case 3:
      if(!this.song.minor) {
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
      if(!this.song.minor) {
        note = note.majorSixth();
      } else {
        note = note.minorSixth();
      }
      break;
      case 7:
      if(!this.song.minor) {
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
    freq.push(note.letter+(note.modifier?"#":"")+"4");
    var note2 = note.minorThird();
    if(this.song.progression[bar] > 0) {
      var note2 = note.majorThird();
    }
    freq.push(note2.letter+(note2.modifier?"#":"")+"4");
    note2 = note.perfectFifth();
    freq.push(note2.letter+(note2.modifier?"#":"")+"4");
    freq.push(note.letter+(note.modifier?"#":"")+"3");
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
