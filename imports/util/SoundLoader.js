function SoundLoader(context, callback) {
  this.context = context;
  this.onload = callback;
}

SoundLoader.prototype.loadDrumsBuffer = function(url) {
  var DrumSounds = require('../engines/sounds/AcousticDrumsSounds.js');
  var Binary64Binary = require('./base64-binary.js');
  var sources = [];
  sources.push(DrumSounds.default.kick); 
  sources.push(DrumSounds.default.snare);
  sources.push(DrumSounds.default.hihat_close);
  sources.push(DrumSounds.default.hihat_open);

	var loader = this;
  var buffers = []
  sources.map(function(source, index) {
    var byteArray = Base64Binary.decodeArrayBuffer(source);
    loader.context.decodeAudioData(byteArray, function(buffer) {
      if (!buffer) {
        alert('error decoding file data: ' + url);
        return;
      }
      buffers.push(buffer);
    });
	});
	this.onload(buffers);
}

export default SoundLoader;
