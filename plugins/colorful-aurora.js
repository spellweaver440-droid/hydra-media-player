// Aurora - Northern lights effect

module.exports = {
  meta: {
    name: 'Aurora',
    id: 'colorful-aurora',
    version: '0.1.0',
    description: 'Aurora borealis effect'
  },

  getVisualCode: function() {
    return `
      ctx.fillStyle = 'rgba(0, 0, 10, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() * 0.0008;
      const len = audioData.length;
      
      // Multiple aurora bands
      for (let band = 0; band < 5; band++) {
        const bandY = (canvas.height / 6) + band * (canvas.height / 5);
        const bandWidth = 80 + band * 40;
        
        for (let x = 0; x < canvas.width; x += 3) {
          const freq = audioData[Math.floor((x / canvas.width) * len)] / 255;
          
          const hue = (120 + band * 30 + time * 80) % 360;
          const wavyY = bandY + Math.sin((x + time * 100) / 80 + band) * bandWidth;
          
          // Aurora glow
          const gradient = ctx.createRadialGradient(x, wavyY, 0, x, wavyY, 100);
          gradient.addColorStop(0, 'hsl(' + hue + ', 100%, 70%)');
          gradient.addColorStop(0.5, 'hsl(' + hue + ', 100%, 50%)');
          gradient.addColorStop(1, 'hsl(' + hue + ', 100%, 0%)');
          
          ctx.fillStyle = gradient;
          ctx.globalAlpha = (freq * 0.7) / 5;
          ctx.fillRect(x - 50, wavyY - 100, 100, 200);
        }
      }
      
      // Flickering stars
      ctx.globalAlpha = 1;
      for (let i = 0; i < len; i += 10) {
        const freq = audioData[i] / 255;
        const x = (i / len) * canvas.width;
        const y = Math.random() * (canvas.height * 0.3);
        
        const opacity = Math.sin(time * 3 + i) * 0.5 + 0.5;
        ctx.fillStyle = 'rgba(255, 255, 255, ' + (opacity * 0.8) + ')';
        
        ctx.beginPath();
        ctx.arc(x, y, 1 + freq * 2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Aurora shimmer effect
      ctx.globalAlpha = 0.15;
      ctx.strokeStyle = 'rgba(0, 255, 100, 0.5)';
      ctx.lineWidth = 1;
      for (let shimmer = 0; shimmer < 10; shimmer++) {
        ctx.beginPath();
        const shimmerY = (canvas.height * 0.3) + Math.sin(time + shimmer * 0.5) * 50;
        ctx.moveTo(0, shimmerY);
        ctx.lineTo(canvas.width, shimmerY);
        ctx.stroke();
      }
    `;
  }
};
