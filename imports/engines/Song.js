let songInstance = null;

export default class Song {
  constructor(newSong) {
    if(!songInstance) {
      songInstance = this;
      this.Context = new AudioContext();
      this.song = newSong;
    }
    this.song = newSong;
    return songInstance;
  }
}
