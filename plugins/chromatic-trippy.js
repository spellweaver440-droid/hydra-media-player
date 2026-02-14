// Chromatic - Color separation and shifting

module.exports = {
  meta: {
    name: 'Chromatic',
    id: 'chromatic-trippy',
    version: '0.1.0',
    description: 'RGB chromatic aberration effect'
  },

  getVisualCode: function() {
    return `
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const time = Date.now() * 0.001;
      const len = audioData.length;
      
      // Draw frequency bars with chromatic separation
      const separation = Math.sin(time) * 15 + 10;
      
      for (let i = 0; i < len; i += 2) {
        const freq = audioData[i] / 255;
        const x = (i / len) * canvas.width;
        const height = freq * canvas.height * 1.5;
        
        const hue = (i / len * 360 + time * 200) % 360;
        
        // Red channel
        ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
        ctx.globalAlpha = 0.7;
        ctx.fillRect(x + separation, canvas.height - height, canvas.width / len, height);
        
        // Green channel
        ctx.fillStyle = 'hsl(' + ((hue + 120) % 360) + ', 100%, 50%)';
        ctx.globalAlpha = 0.6;
        ctx.fillRect(x, canvas.height - height, canvas.width / len, height);
        
        // Blue channel
        ctx.fillStyle = 'hsl(' + ((hue + 240) % 360) + ', 100%, 50%)';
        ctx.globalAlpha = 0.5;
        ctx.fillRect(x - separation, canvas.height - height, canvas.width / len, height);
      }
      
      ctx.globalAlpha = 1;
      
      // Radial glow effect
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 300);
      gradient.addColorStop(0, 'rgba(255, 100, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    `;
  }
};
