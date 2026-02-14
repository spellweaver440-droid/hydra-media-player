// Organic Cells - Living cell structures

module.exports = {
  meta: {
    name: 'Cells',
    id: 'organic-cells',
    version: '0.1.0',
    description: 'Living organic cell structures'
  },

  getVisualCode: function() {
    return `
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() * 0.0008;
      
      if (!window._cellState) {
        window._cellState = { cells: [] };
        for (let i = 0; i < 50; i++) {
          window._cellState.cells.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 20 + 10
          });
        }
      }
      
      const cells = window._cellState.cells;
      const avgFreq = audioData.reduce((a, b) => a + b) / audioData.length / 255;
      
      // Update and draw cells
      for (let cell of cells) {
        // Update position
        cell.x += cell.vx + Math.sin(time + cell.size) * 0.5;
        cell.y += cell.vy + Math.cos(time + cell.size) * 0.5;
        
        // Wrap around
        if (cell.x < 0) cell.x = canvas.width;
        if (cell.x > canvas.width) cell.x = 0;
        if (cell.y < 0) cell.y = canvas.height;
        if (cell.y > canvas.height) cell.y = 0;
        
        // Pulsing size
        const pulseSize = cell.size * (1 + Math.sin(time * 2) * 0.2);
        
        // Draw cell nucleus
        const hue = (cell.size * 10 + time * 100) % 360;
        ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(cell.x, cell.y, pulseSize * 0.3, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw cell membrane
        ctx.strokeStyle = 'hsl(' + hue + ', 100%, 60%)';
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(cell.x, cell.y, pulseSize, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Draw connections
      ctx.globalAlpha = 0.2;
      ctx.strokeStyle = 'rgba(100, 255, 100, 0.5)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < cells.length; i++) {
        for (let j = i + 1; j < cells.length; j++) {
          const dx = cells[j].x - cells[i].x;
          const dy = cells[j].y - cells[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(cells[i].x, cells[i].y);
            ctx.lineTo(cells[j].x, cells[j].y);
            ctx.stroke();
          }
        }
      }
    `;
  }
};
