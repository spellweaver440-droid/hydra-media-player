// Advanced example: Kaleidoscope visual synchronized to audio

module.exports = {
  meta: {
    name: 'Kaleidoscope',
    id: 'kaleidoscope-visual',
    version: '0.2.0',
    description: 'Animated kaleidoscope pattern that responds to audio frequencies'
  },

  getVisualCode: function() {
    return `
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      
      // Fade background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, w, h);
      
      // Get average frequency energy
      let sum = 0;
      for (let i = 0; i < audioData.length; i++) sum += audioData[i];
      const avg = sum / audioData.length / 255;
      
      // Draw kaleidoscope petals
      const segments = 6;
      const radius = Math.min(w, h) * (0.3 + avg * 0.3);
      
      for (let seg = 0; seg < segments; seg++) {
        const angle = (seg / segments) * Math.PI * 2;
        const freqBin = Math.floor((seg / segments) * audioData.length);
        const freq = audioData[freqBin] / 255;
        
        // Petal rotation
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle + avg * Math.PI);
        
        // Draw petal wedge
        const grad = ctx.createLinearGradient(0, 0, radius, 0);
        grad.addColorStop(0, 'hsla(' + (seg * 60 + avg * 180) + ', 100%, 50%, 0)');
        grad.addColorStop(1, 'hsla(' + (seg * 60 + avg * 180) + ', 100%, ' + (50 + freq * 50) + '%, 1)');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius * (1 + freq * 0.5), -Math.PI / segments, Math.PI / segments);
        ctx.lineTo(0, 0);
        ctx.fill();
        
        ctx.restore();
      }
      
      // Center glow
      const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.2);
      glowGrad.addColorStop(0, 'hsla(280, 100%, 60%, 0.8)');
      glowGrad.addColorStop(1, 'hsla(280, 100%, 60%, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(cx - radius * 0.2, cy - radius * 0.2, radius * 0.4, radius * 0.4);
    `;
  }
};
