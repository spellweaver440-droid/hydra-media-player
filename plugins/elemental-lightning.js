// Elemental Lightning - Electric storm

module.exports = {
  meta: {
    name: 'Lightning',
    id: 'elemental-lightning',
    version: '0.1.0',
    description: 'Electric lightning storm'
  },

  getVisualCode: function() {
    return `
      ctx.fillStyle = 'rgba(0, 0, 20, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() * 0.001;
      const len = audioData.length;
      
      // Electrical storm background
      const stormIntensity = audioData.reduce((a, b) => a + b) / len / 255;
      ctx.fillStyle = 'rgba(100, 150, 255, ' + (stormIntensity * 0.1) + ')';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw lightning bolts
      for (let bolt = 0; bolt < 3; bolt++) {
        const startX = (bolt / 3) * canvas.width + Math.sin(time * (bolt + 1)) * 100;
        const startY = 0;
        
        ctx.strokeStyle = 'hsl(210, 100%, ' + (60 + Math.sin(time * 5) * 20) + '%)';
        ctx.lineWidth = 2 + stormIntensity * 3;
        ctx.globalAlpha = 0.8 + Math.sin(time * 10 + bolt) * 0.2;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        
        let x = startX;
        let y = startY;
        while (y < canvas.height) {
          const randomOffset = (Math.random() - 0.5) * 40;
          x += randomOffset;
          y += 30 + Math.cos(time * (bolt + 2)) * 20;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      
      // Electric arcs
      for (let i = 0; i < len; i += 8) {
        const freq = audioData[i] / 255;
        const x = (i / len) * canvas.width;
        
        ctx.strokeStyle = 'hsl(200, 100%, 70%)';
        ctx.lineWidth = 1;
        ctx.globalAlpha = freq * 0.6;
        
        ctx.beginPath();
        const arcH = freq * 100;
        ctx.arc(x, canvas.height * 0.3, arcH, Math.PI, 0, false);
        ctx.stroke();
      }
      
      ctx.globalAlpha = 1;
    `;
  }
};
