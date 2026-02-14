// Elemental Earth - Crystalline earth structures

module.exports = {
  meta: {
    name: 'Earth',
    id: 'elemental-earth',
    version: '0.1.0',
    description: 'Crystalline earth and stone'
  },

  getVisualCode: function() {
    return `
      ctx.fillStyle = 'rgba(20, 10, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() * 0.0005;
      const len = audioData.length;
      
      // Crystalline structures
      for (let i = 0; i < len; i += 2) {
        const freq = audioData[i] / 255;
        const freq2 = audioData[i + 1] / 255;
        
        const x = (i / len) * canvas.width;
        const baseY = canvas.height - freq * canvas.height * 1.2;
        
        // Draw crystal columns
        const crysWidth = canvas.width / len * 0.8;
        const crysHeight = freq * canvas.height;
        
        const hue = 30 + Math.sin(time + i * 0.1) * 20;
        ctx.fillStyle = 'hsl(' + hue + ', 70%, ' + (35 + freq2 * 30) + '%)';
        ctx.globalAlpha = 0.8;
        
        // Main crystal
        ctx.beginPath();
        ctx.moveTo(x, baseY);
        ctx.lineTo(x + crysWidth / 2, baseY - crysHeight);
        ctx.lineTo(x + crysWidth, baseY);
        ctx.lineTo(x + crysWidth * 0.7, baseY + crysHeight * 0.3);
        ctx.lineTo(x + crysWidth * 0.3, baseY + crysHeight * 0.3);
        ctx.closePath();
        ctx.fill();
        
        // Crystal outline
        ctx.strokeStyle = 'hsl(' + hue + ', 100%, 60%)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      // Earthen glow
      const earthGlow = ctx.createRadialGradient(canvas.width / 2, canvas.height, 0, canvas.width / 2, canvas.height, 400);
      earthGlow.addColorStop(0, 'rgba(139, 69, 19, 0.3)');
      earthGlow.addColorStop(1, 'rgba(139, 69, 19, 0)');
      ctx.fillStyle = earthGlow;
      ctx.globalAlpha = 0.5;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    `;
  }
};
