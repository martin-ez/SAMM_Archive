let songInstance = null;

import SoundLoader from '../util/SoundLoader.js';

export default class Song {
  constructor(newSong) {
    if (!songInstance) {
      songInstance = this;
      this.context = new AudioContext();
      this.song = newSong;
      this.drums = {
        buffers: [],
        sources: [],
        gains: []
      };
      this.ready = false;
      this.LoadDrumSounds();
    }
    this.song = newSong;
    return songInstance;
  }

  LoadDrumSounds() {
    let soundLoader = new SoundLoader(this.context,(b) => this.FinishedLoading(b));
    soundLoader.loadDrumsBuffer();
  }

  FinishedLoading(bufferList) {
    this.drums.buffers = bufferList;
    for(var i = 0; i< 4; i++) {
      this.drums.gains[i] = this.context.createGain().connect(this.context.destination);
    }
    this.ready = true;
  }

  PlayDrumSound(i) {
    if(this.ready) {
      if(this.drums.sources[i]) {
        this.drums.sources[i].disconnect();
      }
      this.drums.sources[i] = this.context.createBufferSource();
      this.drums.sources[i].buffer = this.drums.buffers[i];
      this.drums.sources[i].connect(this.drums.gains[i]);
      this.drums.sources[i].start(0);
    }
  }
}
