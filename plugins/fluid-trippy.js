// Fluid - Fluid flow simulation

module.exports = {
  meta: {
    name: 'Fluid',
    id: 'fluid-trippy',
    version: '0.1.0',
    description: 'Liquid fluid flow animation'
  },

  getVisualCode: function() {
    return `
      const time = Date.now() * 0.001;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Create flowing particles
      const particleCount = audioData.length;
      for (let i = 0; i < particleCount; i++) {
        const freq = audioData[i] / 255;
        
        // Parametric flowing curves
        const angle = (i / particleCount) * Math.PI * 2;
        const waveX = Math.sin(angle + time) * canvas.width * 0.3;
        const waveY = Math.cos(angle * 2 + time * 0.7) * canvas.height * 0.3;
        
        const x = centerX + waveX;
        const y = centerY + waveY;
        
        // Add swirling motion
        const swirl = Math.sin(time * 0.5 + i * 0.1) * 50;
        const swirlX = Math.cos(angle) * swirl;
        const swirlY = Math.sin(angle) * swirl;
        
        const finalX = x + swirlX;
        const finalY = y + swirlY;
        
        const hue = (angle * 180 / Math.PI + time * 150) % 360;
        ctx.fillStyle = 'hsl(' + hue + ', 100%, ' + (30 + freq * 50) + '%)';
        ctx.globalAlpha = freq * 0.8;
        
        const size = freq * 12 + 2;
        ctx.beginPath();
        ctx.arc(finalX, finalY, size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.globalAlpha = 1;
      
      // Smooth blending trails
      ctx.strokeStyle = 'rgba(100, 200, 255, 0.2)';
      ctx.lineWidth = 1;
      for (let trail = 0; trail < 5; trail++) {
        const trailAngle = (trail / 5) * Math.PI * 2;
        ctx.beginPath();
        
        for (let t = 0; t < 100; t++) {
          const prog = t / 100;
          const offset = trail * 0.5;
          const x = centerX + Math.sin(time * 0.5 + offset + prog * Math.PI * 2) * canvas.width * 0.3;
          const y = centerY + Math.cos(time * 0.3 + offset + prog * Math.PI * 2) * canvas.height * 0.3;
          
          if (t === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    `;
  }
};
