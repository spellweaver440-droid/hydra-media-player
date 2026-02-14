// Waveform Visualizer - Smooth wave rendering with gradient

module.exports = {
  meta: {
    name: 'Waveform',
    id: 'waveform-viz',
    version: '0.1.0',
    description: 'Smooth waveform visualization with gradient colors'
  },

  getVisualCode: function() {
    return `
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const len = audioData.length;
      const centerY = canvas.height / 2;
      const width = canvas.width / len;
      
      // Draw waveform as line
      ctx.strokeStyle = '#00ff88';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      for (let i = 0; i < len; i++) {
        const value = (audioData[i] / 255) - 0.5;
        const x = i * width;
        const y = centerY + (value * canvas.height * 0.8);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      
      // Add frequency bars on top
      ctx.globalAlpha = 0.6;
      for (let i = 0; i < len; i++) {
        const height = audioData[i] / 255 * canvas.height * 0.4;
        const hue = (i / len) * 360;
        ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
        ctx.fillRect(i * width, canvas.height - height, width * 0.9, height);
      }
      ctx.globalAlpha = 1.0;
    `;
  }
};
