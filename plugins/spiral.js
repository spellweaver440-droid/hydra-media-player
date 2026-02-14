// Spiral Visualizer - Rotating spiral based on audio frequencies

module.exports = {
  meta: {
    name: 'Spiral',
    id: 'spiral-viz',
    version: '0.1.0',
    description: 'Mesmerizing rotating spiral visualization'
  },

  getVisualCode: function() {
    return `
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const len = audioData.length;
      const time = Date.now() * 0.001;
      
      for (let i = 0; i < len; i++) {
        const freq = audioData[i] / 255;
        const angle = (i / len) * Math.PI * 4 + time;
        const distance = freq * 150 + 50;
        
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        const hue = (i / len) * 360 + time * 50;
        ctx.fillStyle = 'hsl(' + (hue % 360) + ', 100%, ' + (50 + freq * 30) + '%)';
        ctx.beginPath();
        ctx.arc(x, y, freq * 8 + 2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Center glow
      const centerGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 100);
      centerGlow.addColorStop(0, 'rgba(255, 0, 255, 0.3)');
      centerGlow.addColorStop(1, 'rgba(0, 255, 255, 0)');
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    `;
  }
};
