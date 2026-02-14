// Ghost in the Shell - Cyberpunk tech effect

module.exports = {
  meta: {
    name: 'Ghost Shell',
    id: 'ghost-in-shell',
    version: '0.1.0',
    description: 'Cyberpunk Ghost in the Shell style'
  },

  getVisualCode: function() {
    return `
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() * 0.001;
      const len = audioData.length;
      
      // Holographic grid
      ctx.strokeStyle = 'rgba(0, 255, 150, 0.1)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Data flow lines
      ctx.globalAlpha = 0.6;
      for (let i = 0; i < len; i += 4) {
        const freq = audioData[i] / 255;
        const x = (i / len) * canvas.width;
        
        ctx.strokeStyle = 'hsl(160, 100%, 50%)';
        ctx.lineWidth = 1 + freq * 3;
        
        ctx.beginPath();
        ctx.moveTo(x, 0);
        const targetY = canvas.height * (0.5 + freq * 0.5);
        ctx.lineTo(x + Math.sin(time + i * 0.01) * 30, targetY);
        ctx.stroke();
      }
      
      // Scanning lines
      ctx.globalAlpha = 0.3;
      ctx.strokeStyle = 'rgba(0, 255, 200, 0.4)';
      ctx.lineWidth = 2;
      const scanY = (time * 200) % canvas.height;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(canvas.width, scanY);
      ctx.stroke();
      
      // Holographic spheres
      ctx.globalAlpha = 0.5;
      for (let i = 0; i < len; i += 8) {
        const freq = audioData[i] / 255;
        const x = (i / len) * canvas.width + Math.sin(time + i * 0.1) * 50;
        const y = canvas.height * 0.5 + Math.cos(time * 0.5 + i * 0.1) * 100;
        
        ctx.strokeStyle = 'hsl(160, 100%, ' + (40 + freq * 40) + '%)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, 30 + freq * 40, 0, Math.PI * 2);
        ctx.stroke();
        
        // Inner sphere
        ctx.globalAlpha = 0.3;
        ctx.strokeStyle = 'hsl(180, 100%, 50%)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, 10 + freq * 15, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 0.5;
      }
    `;
  }
};
