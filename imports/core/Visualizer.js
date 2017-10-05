export default class Visualizer {
  InitializeAnalyser(context, ctx, color) {
    var analyser = context.createAnalyser();
    analyser.smoothingTimeConstant = 0.3;
    analyser.fftSize = 512;
    var javascriptNode = context.createScriptProcessor(2048, 1, 1);
    javascriptNode.connect(context.destination);
    analyser.connect(javascriptNode);

    var step1 = this.ColorLuminance(color, -0.25);
    var step2 = this.ColorLuminance(step1, -0.25);
    var gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(1, '#000000');
    gradient.addColorStop(0.25, color);
    gradient.addColorStop(0.50, step1);
    gradient.addColorStop(0.75, step2);
    gradient.addColorStop(0, '#ffffff');

    javascriptNode.onaudioprocess = function() {

      var array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);

      ctx.clearRect(0, 0, 1000, 325);

      ctx.fillStyle = gradient;
      drawSpectrum(array);

    }
    function drawSpectrum(array) {
      for (var i = 0; i < (array.length); i++) {
        var value = array[i];
        ctx.fillRect(i * 5, 325 - value, 3, 325);
      }
    };
    return analyser;
  }

  ColorLuminance(hex, lum) {
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    var rgb = "#",
      c,
      i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
      rgb += ("00" + c).substr(c.length);
    }

    return rgb;
  }
}
