// Pulse Visualizer - Expanding circles based on bass frequencies

module.exports = {
  meta: {
    name: 'Pulse',
    id: 'pulse-viz',
    version: '0.1.0',
    description: 'Expanding pulses that respond to bass frequencies'
  },

  getVisualCode: function() {
    return `
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const bassFreq = audioData[0] / 255;
      const midFreq = audioData[Math.floor(audioData.length / 2)] / 255;
      
      // Main pulse circle
      const mainRadius = 80 + bassFreq * 150;
      const gradient1 = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, mainRadius);
      gradient1.addColorStop(0, 'rgba(255, 0, 100, 0.6)');
      gradient1.addColorStop(1, 'rgba(255, 0, 100, 0)');
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Mid frequency circle
      const midRadius = 120 + midFreq * 120;
      const gradient2 = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, midRadius);
      gradient2.addColorStop(0, 'rgba(0, 200, 255, 0.4)');
      gradient2.addColorStop(1, 'rgba(0, 200, 255, 0)');
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Circle outline
      ctx.strokeStyle = 'rgba(100, 255, 200, 0.8)';
      ctx.lineWidth = 2 + bassFreq * 4;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 100 + bassFreq * 100, 0, Math.PI * 2);
      ctx.stroke();
      
      // Inner center dot
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 5 + bassFreq * 5, 0, Math.PI * 2);
      ctx.fill();
    `;
  }
};
