// Hexagon - Geometric hexagon tessellation

module.exports = {
  meta: {
    name: 'Hexagon',
    id: 'hexagon-trippy',
    version: '0.1.0',
    description: 'Tessellating geometric hexagons'
  },

  getVisualCode: function() {
    return `
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() * 0.001;
      const hexSize = 30;
      const spacing = hexSize * 1.8;
      
      for (let row = -2; row < canvas.height / spacing + 2; row++) {
        for (let col = -2; col < canvas.width / spacing + 2; col++) {
          // Hexagon center
          const offsetX = row % 2 === 0 ? 0 : spacing / 2;
          const x = col * spacing + offsetX + canvas.width / 2;
          const y = row * spacing * 0.866 + canvas.height / 2;
          
          // Audio reactivity based on position
          const idx = Math.floor((col + row * canvas.width / spacing) % audioData.length);
          const freq = audioData[idx] / 255;
          
          // Rotation based on position and time
          const rotation = (col + row) * 0.3 + time;
          const scale = 1 + Math.sin(time + col * 0.5 + row * 0.5) * 0.3;
          
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(rotation);
          ctx.scale(scale + freq * 0.5, scale + freq * 0.5);
          
          // Draw hexagon
          const hue = (col * 30 + row * 40 + time * 120) % 360;
          ctx.strokeStyle = 'hsl(' + hue + ', 100%, 50%)';
          ctx.fillStyle = 'hsl(' + hue + ', 100%, 40%)';
          ctx.lineWidth = 2;
          ctx.globalAlpha = 0.3 + freq * 0.5;
          
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const px = Math.cos(angle) * hexSize;
            const py = Math.sin(angle) * hexSize;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          
          ctx.restore();
        }
      }
      
      ctx.globalAlpha = 1;
    `;
  }
};
