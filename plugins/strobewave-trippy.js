// StrobeWave - Strobing and pulsing wave effect

module.exports = {
  meta: {
    name: 'StrobeWave',
    id: 'strobewave-trippy',
    version: '0.1.0',
    description: 'Strobing psychedelic waves'
  },

  getVisualCode: function() {
    return `
      const time = Date.now() * 0.001;
      const len = audioData.length;
      const avgFreq = audioData.reduce((a, b) => a + b) / len / 255;
      
      // Strobing background
      const strobeIntensity = Math.abs(Math.sin(time * 10)) * avgFreq;
      ctx.fillStyle = 'rgba(0, 0, 0, ' + (0.3 - strobeIntensity * 0.1) + ')';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw wave forms
      const waveCount = 4;
      for (let wave = 0; wave < waveCount; wave++) {
        ctx.strokeStyle = 'hsl(' + (wave * 90 + time * 200) % 360 + ', 100%, 50%)';
        ctx.lineWidth = 2 + Math.sin(time * 8 + wave) * 2;
        ctx.globalAlpha = Math.abs(Math.sin(time * 6 + wave * 1.5)) * 0.8;
        
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 2) {
          const freq = audioData[Math.floor((x / canvas.width) * len)];
          const waveOffset = wave * Math.PI * 2 / waveCount;
          
          const y = canvas.height / 2 + 
                    Math.sin((x * 0.01) + time * 2 + waveOffset) * (freq / 255 * 100) +
                    Math.cos((x * 0.005) + time + waveOffset) * 50;
          
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      
      ctx.globalAlpha = 1;
      
      // Strobing color flashes
      if (Math.floor(time * 5) % 2 === 0) {
        const flashColor = Math.floor((time * 1000) % 360);
        ctx.fillStyle = 'hsla(' + flashColor + ', 100%, 70%, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    `;
  }
};
