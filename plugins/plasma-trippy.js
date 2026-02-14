// Plasma - Generative plasma effect

module.exports = {
  meta: {
    name: 'Plasma',
    id: 'plasma-trippy',
    version: '0.1.0',
    description: 'Flowing plasma energy waves'
  },

  getVisualCode: function() {
    return `
      const time = Date.now() * 0.001;
      
      if (!window._plasmaState) {
        window._plasmaState = { palette: [] };
      }
      const state = window._plasmaState;
      
      // Simple 2D noise-like plasma using multiple sine/cos waves
      for (let y = 0; y < canvas.height; y += 2) {
        for (let x = 0; x < canvas.width; x += 2) {
          // Multiple octaves of sin/cos waves
          const v1 = Math.sin((x + time * 50) * 0.01) * Math.cos((y + time * 50) * 0.01);
          const v2 = Math.sin((x * 0.003 - time * 30) + (y * 0.003 + time * 20)) * 0.5;
          const v3 = Math.sin(Math.sqrt(x * x + y * y) * 0.01 - time * 0.5) * 0.5;
          
          const value = (v1 + v2 + v3) / 2.5 + 0.5;
          const audioIdx = Math.floor((x / canvas.width + y / canvas.height) * audioData.length / 2) % audioData.length;
          const audioMod = audioData[audioIdx] / 255 * 0.3;
          
          const hue = (value * 360 + time * 100 + audioMod * 100) % 360;
          const sat = 70 + Math.sin(time * 2) * 20;
          const light = 30 + value * 40;
          
          ctx.fillStyle = 'hsl(' + hue + ', ' + sat + '%, ' + light + '%)';
          ctx.fillRect(x, y, 2, 2);
        }
      }
      
      // Overlay effect for more intensity
      ctx.globalAlpha = 0.1;
      const avgFreq = audioData.reduce((a, b) => a + b) / audioData.length / 255;
      ctx.fillStyle = 'hsl(200, 100%, ' + (50 + avgFreq * 20) + '%)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
    `;
  }
};
