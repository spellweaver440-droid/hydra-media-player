// Fractal - Zooming/scrolling fractal-like patterns

module.exports = {
  meta: {
    name: 'Fractal',
    id: 'fractal-trippy',
    version: '0.1.0',
    description: 'Infinite zooming fractal patterns'
  },

  getVisualCode: function() {
    return `
      const time = Date.now() * 0.0005;
      const zoomLevel = Math.sin(time * 0.3) * 2 + 3;
      const scrollX = Math.sin(time * 0.2) * canvas.width * 0.3;
      const scrollY = Math.cos(time * 0.25) * canvas.height * 0.3;
      
      for (let py = 0; py < canvas.height; py += 3) {
        for (let px = 0; px < canvas.width; px += 3) {
          // Coordinate in fractal space
          const x = (px - canvas.width / 2) / (50 * zoomLevel) + scrollX * 0.001;
          const y = (py - canvas.height / 2) / (50 * zoomLevel) + scrollY * 0.001;
          
          // Simple fractal iteration
          let real = x;
          let imag = y;
          let iter = 0;
          const maxIter = 20;
          
          while (iter < maxIter && real * real + imag * imag < 4) {
            const temp = real * real - imag * imag + x;
            imag = 2 * real * imag + y;
            real = temp;
            iter++;
          }
          
          // Color based on iterations and audio
          const audioIdx = Math.floor((px / canvas.width + py / canvas.height) * audioData.length / 2) % audioData.length;
          const freq = audioData[audioIdx] / 255;
          
          const hue = (iter * 20 + time * 100 + freq * 100) % 360;
          const brightness = (iter / maxIter * 70) + 20;
          
          ctx.fillStyle = 'hsl(' + hue + ', 100%, ' + brightness + '%)';
          ctx.fillRect(px, py, 3, 3);
        }
      }
    `;
  }
};
