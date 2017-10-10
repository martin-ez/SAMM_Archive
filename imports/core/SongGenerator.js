function SongGenerator() {
}

SongGenerator.prototype.CreateNewSong = function() {
  var newSong = {
    id: "",
    tempo: 0,
    key: "",
    progression: [],
    band: "",
    drums: {
      user: "",
      pattern: [
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-']
      ],
      mutes: ['-','-','-','-','-']
    },
    bass: {
      user: "",
      pattern: [0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5],
      sound: [0.1, 0.1, 0.1, 0.1]
      //necesitaban esto desde el principio?
      //no era mejor un default en la BBDD?
    }
  };
  var tempos = [75, 80, 85, 90, 95, 100];
  newSong.tempo = tempos[Math.floor(Math.random() * tempos.length)];
  var keys = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
  newSong.key = keys[Math.floor(Math.random() * keys.length)];
  newSong.progression = this.CreateProgression();
  newSong.band = this.CreateBandName();
  return newSong;
}

SongGenerator.prototype.CreateProgression = function() {
  var progressions = [
    [1, 4, 5, 1],
    [1, -2, 5, 1],
    [1, -6, 4, 5],
    [1, -6, -2, 5],
    [1, 4, -6, 5],
    [1, 5, -6, 4],
    [-1, -4,-5,-1],
    [-1, 6, 7, 7],
    [-1, -4, 7, 7],
    [-1, -4, -5, -4],
    [-1, 6, 3, 7],
    [-1, 7, 6, 7]
  ];

  return progressions[Math.floor(Math.random() * progressions.length)];
}

SongGenerator.prototype.CreateBandName = function() {
  var colors =
  ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure",
  "Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood",
  "CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan",
  "DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue",
  "FireBrick","FloralWhite","ForestGreen","Fuchsia",
  "Gainsboro","GhostWhite",
  "Gold","GoldenRod","Gray","Grey","Green","GreenYellow",
  "HoneyDew","HotPink",
  "IndianRed","Indigo","Ivory",
  "Khaki",
  "Lavender","LavenderBlush","LawnGreen","LemonChiffon","Lime","LimeGreen","Linen",
  "Magenta",
  "Maroon","MidnightBlue","MintCream","MistyRose","Moccasin",
  "NavajoWhite","Navy",
  "OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid",
  "PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple",
  "Red","RosyBrown","RoyalBlue",
  "SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue",
  "Tan","Teal","Thistle","Tomato","Turquoise",
  "Violet",
  "Wheat","White","WhiteSmoke",
  "Yellow","YellowGreen"];
  var animals = require('animals');
  var a = animals();
  return "The " +colors[Math.floor(Math.random() * colors.length)] +" "+a.charAt(0).toUpperCase() + a.slice(1)+"s";
}

export default SongGenerator;
