// Tunnel - Hypnotic wormhole tunnel effect

module.exports = {
  meta: {
    name: 'Tunnel',
    id: 'tunnel-trippy',
    version: '0.1.0',
    description: 'Hypnotic tunnel/wormhole visual'
  },

  getVisualCode: function() {
    return `
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const time = Date.now() * 0.0005;
      const avgFreq = audioData.reduce((a, b) => a + b) / audioData.length / 255;
      
      // Background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw concentric circles creating tunnel
      for (let ring = 0; ring < 50; ring++) {
        const progress = (ring / 50 - time) % 1;
        const radius = progress * 300 + avgFreq * 100;
        
        const hue = (ring * 7.2 + time * 200) % 360;
        ctx.strokeStyle = 'hsl(' + hue + ', 100%, 50%)';
        ctx.lineWidth = 1 + (1 - progress) * 4;
        ctx.globalAlpha = (1 - progress) * 0.8;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Spiraling tunnel lines
      ctx.globalAlpha = 1;
      for (let line = 0; line < 8; line++) {
        ctx.strokeStyle = 'hsl(' + (line * 45 + time * 150) % 360 + ', 100%, 60%)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        for (let point = 0; point < 100; point++) {
          const t = point / 100;
          const radius = t * 300 + avgFreq * 80;
          const angle = (line / 8) * Math.PI * 2 + t * Math.PI * 8 + time * 2;
          
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          
          if (point === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    `;
  }
};
