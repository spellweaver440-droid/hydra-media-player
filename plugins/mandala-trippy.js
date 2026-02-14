// Mandala - Geometric mandala flower patterns

module.exports = {
  meta: {
    name: 'Mandala',
    id: 'mandala-trippy',
    version: '0.1.0',
    description: 'Geometric mandala flower fractal'
  },

  getVisualCode: function() {
    return `
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const time = Date.now() * 0.0008;
      const maxRadius = 250;
      
      // Draw petals
      const petalCount = 12;
      for (let petal = 0; petal < petalCount; petal++) {
        const petalAngle = (petal / petalCount) * Math.PI * 2;
        
        // Multiple rings of petals
        for (let ring = 0; ring < 5; ring++) {
          const ringRadius = (ring / 5) * maxRadius;
          const baseFreq = audioData[Math.floor((petal + ring * 3) % audioData.length)] / 255;
          
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(petalAngle + time * (ring % 2 === 0 ? 1 : -1) * 0.5);
          
          // Draw petal shape
          const petalWidth = 40 + baseFreq * 80;
          const petalHeight = 60 + baseFreq * 120;
          
          const hue = (petal * 30 + ring * 72 + time * 150) % 360;
          ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
          ctx.globalAlpha = 0.6;
          
          // Ellipse-like petal
          ctx.beginPath();
          for (let i = 0; i < Math.PI * 2; i += 0.1) {
            const x = Math.cos(i) * petalWidth;
            const y = Math.sin(i) * petalHeight;
            const distFromCenter = Math.sqrt(x * x + y * y);
            const finalX = x * (ringRadius + distFromCenter * 0.5) / ringRadius;
            const finalY = y * (ringRadius + distFromCenter * 0.5) / ringRadius;
            
            if (i === 0) ctx.moveTo(finalX, finalY);
            else ctx.lineTo(finalX, finalY);
          }
          ctx.fill();
          
          ctx.restore();
        }
      }
      
      // Center circle
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
      ctx.fill();
    `;
  }
};
