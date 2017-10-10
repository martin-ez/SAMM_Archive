function SoundLoader(context) {
  this.context = context;
}
/** Podran hacer uso de let o const dependiendo lo que necesiten **/
SoundLoader.prototype.loadDrumsBuffer = function(callback) {
  var DrumsSounds = require('../sounds/DrumsSounds.js');
  var Binary64Binary = require('./base64-binary.js');
  var sources = [];
  sources.push(DrumsSounds.default.kick);
  sources.push(DrumsSounds.default.snare);
  sources.push(DrumsSounds.default.hihat_close);
  sources.push(DrumsSounds.default.hihat_open);
  sources.push(DrumsSounds.default.clap);
  var names = ["kick", "snare", "hihat_close", "hihat_open", "clap"];
  var loader = this;
  var buffers = {
    "kick": null,
    "snare": null,
    "hihat_close": null,
    "hihat_open": null,
    "clap": null
  };
  sources.map((source, index) => {
    /* Podrían hacer uso de const */
    var byteArray = Base64Binary.decodeArrayBuffer(source);
    loader.context.decodeAudioData(byteArray, function(buffer) {
      if(!buffer) {
        alert('Error loading drums sounds.');
        return;
      }
      buffers[names[index]] = buffer;
      var finish = true;
      for(var i = 0; i<5 && finish; i++) {
        finish = !(buffers[names[i]] === null);
      }
      if(finish) {
        callback(buffers);
      }
    });
  });
}
/* Se podrían eliminar los comentarios */
SoundLoader.prototype.loadBassBuffer = function(callback) {
  /*var BassSounds = require('../sounds/BassSounds.js');
  var Binary64Binary = require('./base64-binary.js');
  var sources = [];
  var finish = false;
  var note = ['G', '', 0];

  while (!finish) {
    var noteStr = note[0] + note[1] + note[2];
    sources.push(BassSounds.default[noteStr]);
    if (note[1] == '#' || note[0] == 'E' || note[0] == 'B') {
      if (note[0] == 'B')
        note[2] = note[2] + 1;
      note[0] = String.fromCharCode(note[0].charCodeAt(0) + 1);
      note[1] = '';
      if (note[0] == 'H')
        note[0] = 'A';
      }
    else {
      note[1] = '#';
    }
    finish = (note[0] == 'G' && note[1] == '' && note[2] == 3);
  }

  var loader = this;
  var buffers = []
  sources.map(function(source, index) {
    var byteArray = Base64Binary.decodeArrayBuffer(source);
    loader.context.decodeAudioData(byteArray, function(buffer) {
      if(!buffer) {
        alert('Error loading bass sounds.');
        return;
      }
      buffers.push(buffer);
      if(buffers.length == sources.length) callback(buffers);
    });
  });*/
}

export default SoundLoader;
