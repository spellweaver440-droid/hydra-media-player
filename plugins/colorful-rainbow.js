// Rainbow - Vibrant multicolor rainbow effect

module.exports = {
  meta: {
    name: 'Rainbow',
    id: 'colorful-rainbow',
    version: '0.1.0',
    description: 'Vibrant rainbow spectrum'
  },

  getVisualCode: function() {
    return `
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() * 0.001;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const len = audioData.length;
      
      // Rainbow waves
      for (let wave = 0; wave < 6; wave++) {
        const period = 100 + wave * 30;
        const amplitude = 50 + wave * 20;
        
        ctx.strokeStyle = 'hsl(' + ((wave * 60 + time * 100) % 360) + ', 100%, 50%)';
        ctx.lineWidth = 3 - wave * 0.4;
        ctx.globalAlpha = 0.7 - wave * 0.1;
        
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 2) {
          const freq = audioData[Math.floor((x / canvas.width) * len)] / 255;
          const y = centerY + Math.sin((x - time * 50) / period) * (amplitude + freq * 50);
          
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      
      // Rainbow particles
      for (let i = 0; i < len; i += 3) {
        const freq = audioData[i] / 255;
        const angle = (i / len) * Math.PI * 2;
        const distance = 100 + freq * 150;
        
        const x = centerX + Math.cos(angle) * distance + Math.sin(time + i * 0.1) * 30;
        const y = centerY + Math.sin(angle) * distance + Math.cos(time + i * 0.1) * 30;
        
        const hue = ((angle * 180 / Math.PI + time * 200) % 360);
        ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
        ctx.globalAlpha = freq * 0.8;
        
        const size = freq * 10 + 3;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Rainbow glow
      const rainbowGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      rainbowGrad.addColorStop(0, 'hsl(0, 100%, 50%)');
      rainbowGrad.addColorStop(0.2, 'hsl(60, 100%, 50%)');
      rainbowGrad.addColorStop(0.4, 'hsl(120, 100%, 50%)');
      rainbowGrad.addColorStop(0.6, 'hsl(180, 100%, 50%)');
      rainbowGrad.addColorStop(0.8, 'hsl(240, 100%, 50%)');
      rainbowGrad.addColorStop(1, 'hsl(300, 100%, 50%)');
      
      ctx.fillStyle = rainbowGrad;
      ctx.globalAlpha = 0.1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    `;
  }
};
