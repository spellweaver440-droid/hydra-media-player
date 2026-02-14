// Neon Dreams - Cyberpunk neon glow

module.exports = {
  meta: {
    name: 'Neon',
    id: 'neon-dreams',
    version: '0.1.0',
    description: 'Cyberpunk neon glow'
  },

  getVisualCode: function() {
    return `
      ctx.fillStyle = 'rgba(0, 0, 5, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() * 0.001;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const len = audioData.length;
      
      // Neon glow effect
      ctx.shadowColor = 'rgba(0, 255, 200, 0.8)';
      ctx.shadowBlur = 20;
      
      // Draw neon lines
      for (let i = 0; i < len; i += 2) {
        const freq = audioData[i] / 255;
        const freq2 = audioData[i + 1] / 255;
        
        const angle = (i / len) * Math.PI * 2;
        const distance = 80 + freq * 150;
        
        const x1 = centerX + Math.cos(angle) * (distance * 0.7);
        const y1 = centerY + Math.sin(angle) * (distance * 0.7);
        
        const x2 = centerX + Math.cos(angle) * distance;
        const y2 = centerY + Math.sin(angle) * distance;
        
        const hue = (angle * 180 / Math.PI + time * 150) % 360;
        ctx.strokeStyle = 'hsl(' + hue + ', 100%, 50%)';
        ctx.lineWidth = 2 + freq * 4;
        ctx.globalAlpha = freq * 0.9;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      
      // Neon polygons
      ctx.shadowBlur = 30;
      for (let poly = 0; poly < 5; poly++) {
        const polyAngle = (poly / 5) * Math.PI * 2 + time * 0.3;
        const polyRadius = 80 + poly * 30;
        
        ctx.strokeStyle = 'hsl(' + ((poly * 72 + time * 200) % 360) + ', 100%, 60%)';
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.6;
        
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = polyAngle + (i / 6) * Math.PI * 2;
          const x = centerX + Math.cos(angle) * polyRadius;
          const y = centerY + Math.sin(angle) * polyRadius;
          
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }
      
      ctx.shadowBlur = 0;
    `;
  }
};
