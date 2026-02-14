// Organic Growth - Branching growth patterns

module.exports = {
  meta: {
    name: 'Growth',
    id: 'organic-growth',
    version: '0.1.0',
    description: 'Branching organic growth'
  },

  getVisualCode: function() {
    return `
      ctx.fillStyle = 'rgba(0, 10, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() * 0.0008;
      const centerX = canvas.width / 2;
      const baseY = canvas.height;
      const len = audioData.length;
      
      // Draw branching tree-like structures
      function drawBranch(x, y, angle, length, depth, freq) {
        if (depth === 0 || length < 2) return;
        
        const endX = x + Math.cos(angle) * length;
        const endY = y + Math.sin(angle) * length;
        
        const hue = (angle * 180 / Math.PI + time * 100) % 360;
        ctx.strokeStyle = 'hsl(' + hue + ', 100%, ' + (40 + freq * 40) + '%)';
        ctx.lineWidth = depth * 1.5;
        ctx.globalAlpha = 0.7;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        // Two child branches
        const angleVariation = 0.4 + freq * 0.3;
        drawBranch(endX, endY, angle - angleVariation, length * 0.7, depth - 1, freq);
        drawBranch(endX, endY, angle + angleVariation, length * 0.7, depth - 1, freq);
      }
      
      // Main branches from each frequency band
      for (let i = 0; i < len; i += 8) {
        const freq = audioData[i] / 255;
        const angle = (i / len) * Math.PI * 2 - Math.PI / 2;
        
        drawBranch(centerX, baseY, angle, 80 + freq * 60, 6, freq);
      }
      
      // Growth tendrils
      for (let i = 0; i < len; i += 4) {
        const freq = audioData[i] / 255;
        const startAngle = (i / len) * Math.PI * 2;
        
        ctx.strokeStyle = 'hsl(' + (120 + freq * 60) + ', 100%, 50%)';
        ctx.lineWidth = 1 + freq * 2;
        ctx.globalAlpha = freq * 0.5;
        
        ctx.beginPath();
        let x = centerX;
        let y = baseY;
        
        for (let step = 0; step < 100; step++) {
          const t = step / 100;
          const angle = startAngle + Math.sin(time + t) * 0.5;
          const speed = freq * 3 + 0.5;
          
          x += Math.cos(angle) * speed;
          y += Math.sin(angle + time * 0.5) * speed;
          
          if (step === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    `;
  }
};
