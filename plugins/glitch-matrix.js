// Glitch Matrix - Matrix-style falling code

module.exports = {
  meta: {
    name: 'Matrix',
    id: 'glitch-matrix',
    version: '0.1.0',
    description: 'Matrix digital rain'
  },

  getVisualCode: function() {
    return `
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() * 0.001;
      const len = audioData.length;
      
      if (!window._matrixState) {
        window._matrixState = { columns: [] };
        for (let i = 0; i < 30; i++) {
          window._matrixState.columns.push({
            x: i * (canvas.width / 30),
            y: Math.random() * canvas.height,
            speed: Math.random() * 3 + 1,
            freq: 0
          });
        }
      }
      
      const columns = window._matrixState.columns;
      const chars = '01アイウエオカキクケコサシスセソタチツテト';
      
      // Update and draw digital rain
      for (let col of columns) {
        col.y += col.speed;
        
        // Update frequency for this column
        const colIdx = Math.floor((col.x / canvas.width) * len);
        col.freq = audioData[colIdx] / 255;
        
        if (col.y > canvas.height) {
          col.y = -20;
        }
        
        // Draw column of characters
        ctx.font = (12 + col.freq * 8) + 'px monospace';
        ctx.globalAlpha = 0.8;
        
        for (let i = 0; i < 15; i++) {
          const charY = col.y - i * 20;
          
          if (charY > 0 && charY < canvas.height) {
            const char = chars[Math.floor((charY + col.freq * 1000) % chars.length)];
            
            if (i === 0) {
              // Bright green for lead character
              ctx.fillStyle = 'hsl(120, 100%, 50%)';
              ctx.globalAlpha = 1;
            } else {
              // Fading green
              ctx.fillStyle = 'hsl(120, 100%, ' + (50 - i * 3) + '%)';
              ctx.globalAlpha = 0.8 - i * 0.05;
            }
            
            ctx.fillText(char, col.x, charY);
          }
        }
      }
      
      // Glitch effect
      ctx.globalAlpha = 0.1;
      if (Math.random() < 0.1) {
        const glitchY = Math.random() * canvas.height;
        const glitchH = Math.random() * 20 + 5;
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.fillRect(Math.random() * canvas.width * 0.3, glitchY, canvas.width * 0.7, glitchH);
      }
    `;
  }
};
