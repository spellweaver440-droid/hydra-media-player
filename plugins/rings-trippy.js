// Rings - Expanding and contracting ring waves

module.exports = {
  meta: {
    name: 'Rings',
    id: 'rings-trippy',
    version: '0.1.0',
    description: 'Pulsing expanding ring waves'
  },

  getVisualCode: function() {
    return `
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const time = Date.now() * 0.001;
      const len = audioData.length;
      
      // Draw expanding rings from audio frequencies
      for (let i = 0; i < len; i += 2) {
        const freq = audioData[i] / 255;
        const freq2 = audioData[i + 1] / 255;
        
        // Ring expansion speed based on frequency
        const expansion = time * 100 * (freq + 1);
        const radius = expansion % 400;
        
        const hue = (i / len * 360 + time * 150) % 360;
        
        // Main ring
        ctx.strokeStyle = 'hsl(' + hue + ', 100%, 50%)';
        ctx.lineWidth = 2 + freq * 6;
        ctx.globalAlpha = (1 - radius / 400) * (freq + 0.5);
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Secondary harmonic ring
        const harmonic = radius * 0.618;
        ctx.strokeStyle = 'hsl(' + ((hue + 180) % 360) + ', 100%, 60%)';
        ctx.lineWidth = 1 + freq2 * 4;
        ctx.globalAlpha = (1 - harmonic / 400) * freq2 * 0.8;
        
        if (harmonic < 400) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, harmonic, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      
      ctx.globalAlpha = 1;
      
      // Center intensity indicator
      const avgFreq = audioData.reduce((a, b) => a + b) / len / 255;
      ctx.fillStyle = 'hsl(200, 100%, 60%)';
      ctx.globalAlpha = avgFreq * 0.6;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 30 + avgFreq * 40, 0, Math.PI * 2);
      ctx.fill();
    `;
  }
};
