let songInstance = null;

export default class Song {
  constructor() {
    if(!songInstance) {
      songInstance = this;
      this.Context = new AudioContext();
    }
    return songInstance;
  }
}
