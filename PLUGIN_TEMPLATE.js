// Template: Copy this file and rename to your plugin name
// Place in plugins/ folder and restart the app

module.exports = {
  meta: {
    name: 'Your Plugin Name',
    id: 'your-plugin-id',
    version: '0.1.0',
    description: 'Describe your visual effect here'
  },

  getVisualCode: function() {
    return `
      // Visual code runs every frame
      // Available variables:
      // - canvas: HTMLCanvasElement
      // - ctx: CanvasRenderingContext2D
      // - audioData: Uint8Array (FFT frequency data, 128 values 0-255)
      
      // Example: Simple bars
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const len = audioData.length;
      const barWidth = canvas.width / len;
      
      for (let i = 0; i < len; i++) {
        const height = (audioData[i] / 255) * canvas.height;
        const hue = (i / len) * 360;
        ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
        ctx.fillRect(i * barWidth, canvas.height - height, barWidth, height);
      }
    `;
  }
};
