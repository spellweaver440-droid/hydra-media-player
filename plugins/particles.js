// Particle System - Dynamic particles that respond to audio

module.exports = {
  meta: {
    name: 'Particles',
    id: 'particles-viz',
    version: '0.1.0',
    description: 'Dynamic particle system responding to frequency changes'
  },

  getVisualCode: function() {
    return `
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const len = audioData.length;
      const strength = audioData.reduce((a, b) => a + b) / len / 255;
      
      // Generate particles from frequency data
      for (let i = 0; i < len; i += 2) {
        const freq = audioData[i] / 255;
        const freq2 = audioData[i + 1] / 255;
        
        // Particle angle and distance
        const angle = (i / len) * Math.PI * 2;
        const baseDistance = 80;
        const distance = baseDistance + freq * 150;
        
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        // Particle color
        const hue = (i / len) * 360;
        ctx.fillStyle = 'hsla(' + hue + ', 100%, 50%, ' + (freq * 0.8) + ')';
        
        // Draw particle
        const size = freq * 10 + 2;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        
        // Secondary particles
        const x2 = centerX + Math.cos(angle + 0.3) * (baseDistance + freq2 * 100);
        const y2 = centerY + Math.sin(angle + 0.3) * (baseDistance + freq2 * 100);
        ctx.fillStyle = 'hsla(' + (hue + 120) + ', 100%, 60%, ' + (freq2 * 0.5) + ')';
        ctx.beginPath();
        ctx.arc(x2, y2, freq2 * 6 + 1, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Glow effect
      ctx.shadowColor = 'rgba(100, 200, 255, 0.5)';
      ctx.shadowBlur = 20;
    `;
  }
};
