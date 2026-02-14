// Kaleidoscope - Mirrored symmetrical patterns

module.exports = {
  meta: {
    name: 'Kaleidoscope',
    id: 'kaleidoscope-trippy',
    version: '0.1.0',
    description: 'Mesmerizing symmetrical kaleidoscope patterns'
  },

  getVisualCode: function() {
    return `
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const time = Date.now() * 0.001;
      const segments = 6;
      const len = audioData.length;
      
      for (let seg = 0; seg < segments; seg++) {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate((seg / segments) * Math.PI * 2);
        
        // Draw mirrored pattern
        for (let i = 0; i < len; i += 2) {
          const freq = audioData[i] / 255;
          const freq2 = audioData[i + 1] / 255;
          
          const angle = (i / len) * Math.PI;
          const distance = 50 + freq * 200;
          const size = freq2 * 15 + 2;
          
          const x = Math.cos(angle) * distance;
          const y = Math.sin(angle) * distance;
          
          const hue = (seg * 60 + i / len * 360 + time * 100) % 360;
          ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
          
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
          
          // Mirror
          ctx.beginPath();
          ctx.arc(-x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
      }
    `;
  }
};
