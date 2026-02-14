// Equalizer Visualizer - Classic 3D-style frequency bars

module.exports = {
  meta: {
    name: 'Equalizer',
    id: 'equalizer-viz',
    version: '0.1.0',
    description: 'Classic 3D equalizer bars with peak detection'
  },

  getVisualCode: function() {
    return `
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const len = audioData.length;
      const barCount = 32;
      const barWidth = canvas.width / barCount;
      const centerY = canvas.height / 2;
      const maxHeight = canvas.height * 0.8;
      
      // Draw equalizer bars
      for (let i = 0; i < barCount; i++) {
        const index = Math.floor((i / barCount) * len);
        const value = audioData[index] / 255;
        const height = value * maxHeight;
        
        // Bar color gradient
        const hue = (i / barCount) * 360;
        const gradient = ctx.createLinearGradient(i * barWidth, centerY - height, i * barWidth, centerY + height);
        gradient.addColorStop(0, 'hsl(' + hue + ', 100%, 60%)');
        gradient.addColorStop(0.5, 'hsl(' + hue + ', 100%, 50%)');
        gradient.addColorStop(1, 'hsl(' + hue + ', 100%, 40%)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(i * barWidth + 2, centerY - height, barWidth - 4, height * 2);
        
        // Top cap
        ctx.fillStyle = 'hsl(' + hue + ', 100%, 70%)';
        ctx.fillRect(i * barWidth + 2, centerY - height - 4, barWidth - 4, 4);
      }
      
      // Center line
      ctx.strokeStyle = 'rgba(200, 200, 200, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(canvas.width, centerY);
      ctx.stroke();
    `;
  }
};
