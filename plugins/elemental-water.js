// Elemental Water - Fluid water waves

module.exports = {
  meta: {
    name: 'Water',
    id: 'elemental-water',
    version: '0.1.0',
    description: 'Flowing elemental water waves'
  },

  getVisualCode: function() {
    return `
      ctx.fillStyle = 'rgba(0, 10, 20, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() * 0.0008;
      const centerY = canvas.height / 2;
      const len = audioData.length;
      
      // Multiple water wave layers
      for (let waveNum = 0; waveNum < 4; waveNum++) {
        ctx.strokeStyle = 'hsl(' + (200 - waveNum * 20) + ', 100%, ' + (40 + waveNum * 10) + '%)';
        ctx.lineWidth = 3 - waveNum * 0.5;
        ctx.globalAlpha = 0.6 - waveNum * 0.1;
        
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 2) {
          const freq = audioData[Math.floor((x / canvas.width) * len)] / 255;
          const wavelength = 40 + waveNum * 20;
          
          const y = centerY + 
                    Math.sin((x + time * 100) / wavelength) * (freq * 80) +
                    Math.cos((x - time * 50) / (wavelength * 0.5)) * 30;
          
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      
      // Water droplets
      ctx.globalAlpha = 1;
      for (let i = 0; i < len; i += 4) {
        const freq = audioData[i] / 255;
        const x = (i / len) * canvas.width;
        const dropY = centerY + Math.sin(time + i * 0.05) * canvas.height * 0.3 - freq * 100;
        
        const gradient = ctx.createRadialGradient(x, dropY, 0, x, dropY, 10 + freq * 5);
        gradient.addColorStop(0, 'rgba(100, 200, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 100, 200, 0.2)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, dropY, 10 + freq * 5, 0, Math.PI * 2);
        ctx.fill();
      }
    `;
  }
};
