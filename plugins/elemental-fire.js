// Elemental Fire - Intense fire simulation

module.exports = {
  meta: {
    name: 'Fire',
    id: 'elemental-fire',
    version: '0.1.0',
    description: 'Raging elemental fire effect'
  },

  getVisualCode: function() {
    return `
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() * 0.001;
      const len = audioData.length;
      
      for (let i = 0; i < len; i += 2) {
        const freq = audioData[i] / 255;
        const freq2 = audioData[i + 1] / 255;
        
        const x = (i / len) * canvas.width;
        const baseHeight = freq * canvas.height * 2;
        
        // Multiple fire layers
        for (let layer = 0; layer < 3; layer++) {
          const layerOffset = layer * 15;
          const waveY = Math.sin(time * 3 + i * 0.01) * 20;
          const height = baseHeight - layerOffset + waveY;
          
          if (height > 0) {
            const hue = (30 - layer * 15);
            const brightness = 60 - layer * 15;
            ctx.fillStyle = 'hsl(' + hue + ', 100%, ' + brightness + '%)';
            ctx.globalAlpha = (1 - layer * 0.3) * freq;
            
            ctx.fillRect(x, canvas.height - height, canvas.width / len * 1.1, height);
          }
        }
      }
      
      // Fire glow
      const gradient = ctx.createLinearGradient(0, canvas.height * 0.5, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(255, 100, 0, 0)');
      gradient.addColorStop(1, 'rgba(255, 0, 0, 0.3)');
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
    `;
  }
};
