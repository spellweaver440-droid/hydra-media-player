// Glitch - Digital corrupted/glitch effect

module.exports = {
  meta: {
    name: 'Glitch',
    id: 'glitch-trippy',
    version: '0.1.0',
    description: 'Digital glitch and corruption effect'
  },

  getVisualCode: function() {
    return `
      const time = Date.now() * 0.001;
      const avgFreq = audioData.reduce((a, b) => a + b) / audioData.length / 255;
      
      // Base layer
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw distorted bars with glitches
      const barCount = 32;
      const barWidth = canvas.width / barCount;
      
      for (let i = 0; i < barCount; i++) {
        const freq = audioData[i] / 255;
        const height = freq * canvas.height * 1.5;
        
        // Random glitch offset
        const glitchAmount = Math.sin(time * 10 + i) * 30 + (Math.random() - 0.5) * 40 * avgFreq;
        const glitchOffset = Math.floor(glitchAmount);
        
        // Primary bar
        const hue = (i / barCount * 360 + time * 200) % 360;
        ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
        ctx.globalAlpha = 0.8;
        ctx.fillRect(i * barWidth + glitchOffset, canvas.height - height, barWidth * 0.8, height);
        
        // Glitch copies (chromatic aberration effect)
        ctx.fillStyle = 'hsl(' + ((hue + 120) % 360) + ', 100%, 50%)';
        ctx.globalAlpha = 0.3;
        ctx.fillRect(i * barWidth + glitchOffset + 3, canvas.height - height + 5, barWidth * 0.8, height);
        
        ctx.fillStyle = 'hsl(' + ((hue + 240) % 360) + ', 100%, 50%)';
        ctx.globalAlpha = 0.2;
        ctx.fillRect(i * barWidth + glitchOffset - 3, canvas.height - height - 5, barWidth * 0.8, height);
      }
      
      // Horizontal scan lines
      ctx.globalAlpha = 0.1;
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      for (let y = 0; y < canvas.height; y += Math.random() * 20 + 5) {
        const offset = Math.sin(time * 5 + y * 0.01) * 20;
        ctx.beginPath();
        ctx.moveTo(0 + offset, y);
        ctx.lineTo(canvas.width + offset, y);
        ctx.stroke();
      }
    `;
  }
};
