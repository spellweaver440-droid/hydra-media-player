// Alchemy - Layered weather effects with audio reactivity
// Converts Hydra.js-style visual to Canvas 2D

module.exports = {
  meta: {
    name: 'Alchemy',
    id: 'alchemy-viz',
    version: '0.1.0',
    description: 'Layered atmospheric effects: rain, fire, wind distortion with audio reactivity'
  },

  getVisualCode: function() {
    return `
      // State persistence for smooth animations
      if (!window._alchemyState) {
        window._alchemyState = {
          time: 0,
          motionBuffer: null,
          prevImageData: null
        };
      }
      const state = window._alchemyState;
      state.time = (state.time || 0) + 0.016;

      // Background blur/motion
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const bassFreq = audioData[0] / 255;
      const midFreq = audioData[Math.floor(audioData.length / 2)] / 255;
      const trebleFreq = audioData[Math.floor(audioData.length * 0.75)] / 255;

      // 🔥 FIRE LAYER - Bass reactive turbulent color
      const fireIntensity = 0.15 + bassFreq * 0.3;
      const fireColorH = 15;
      const fireColorS = 100;
      
      for (let y = 0; y < canvas.height; y += 4) {
        for (let x = 0; x < canvas.width; x += 4) {
          // Perlin-like noise using multiple sine waves
          const noiseFire = 
            Math.sin(x * 0.01 + state.time) * 
            Math.sin(y * 0.01 + state.time * 0.7) *
            Math.sin((x + y) * 0.005 + state.time * 0.5 + bassFreq * 3);
          
          const fireVal = Math.abs(noiseFire);
          if (fireVal > 0.3) {
            const lightness = 30 + fireVal * 40 + bassFreq * 20;
            ctx.fillStyle = 'hsl(' + fireColorH + ', ' + fireColorS + '%, ' + Math.min(70, lightness) + '%)';
            ctx.globalAlpha = fireIntensity * (fireVal - 0.3);
            ctx.fillRect(x, y, 4, 4);
          }
        }
      }

      // 🌧 RAIN LAYER - Vertical streaks, treble reactive
      ctx.globalAlpha = 0.1 + trebleFreq * 0.3;
      const rainSpeed = 0.4 + trebleFreq * 1.5;
      
      for (let i = 0; i < 40; i++) {
        const rainX = (i * 22.5 + state.time * rainSpeed * 50) % canvas.width;
        const rainY = (state.time * rainSpeed * 150) % canvas.height;
        
        // Rain streaks
        ctx.strokeStyle = 'rgba(100, 150, 200, 0.6)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(rainX, rainY - 60);
        ctx.lineTo(rainX, rainY);
        ctx.stroke();
      }

      // 💨 WIND DISTORTION - Horizontal sinusoidal displacement
      ctx.globalAlpha = 0.05 + midFreq * 0.2;
      ctx.strokeStyle = 'rgba(150, 150, 150, 0.3)';
      ctx.lineWidth = 2;
      
      for (let y = 0; y < canvas.height; y += 8) {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 3) {
          const windWave = Math.sin(state.time * 2 + y * 0.02) * (20 + midFreq * 30);
          const yPos = y + windWave;
          if (x === 0) {
            ctx.moveTo(x, yPos);
          } else {
            ctx.lineTo(x, yPos);
          }
        }
        ctx.stroke();
      }

      // 🌊 MOTION DETECTION - Subtle warping effect
      const motionIntensity = 0.08;
      for (let i = 0; i < audioData.length; i += 8) {
        const freq = audioData[i] / 255;
        const angle = (i / audioData.length) * Math.PI * 2;
        const radius = 50 + freq * 100;
        
        const x = canvas.width / 2 + Math.cos(angle) * radius;
        const y = canvas.height / 2 + Math.sin(angle) * radius;
        
        ctx.globalAlpha = motionIntensity * freq * 0.5;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(x, y, freq * 8, 0, Math.PI * 2);
        ctx.fill();
      }

      // 🎨 OVERLAY - Sharp contrast and saturation boost
      ctx.globalAlpha = 1.0;
      const overlayGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      overlayGradient.addColorStop(0, 'rgba(255, 100, 0, 0.02)');
      overlayGradient.addColorStop(0.5, 'rgba(0, 150, 255, 0.01)');
      overlayGradient.addColorStop(1, 'rgba(100, 0, 255, 0.02)');
      ctx.fillStyle = overlayGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Scanline effect for visual coherence
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.lineWidth = 1;
      for (let y = 0; y < canvas.height; y += 2) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    `;
  }
};
