// Sample plugin for HydraPlayer — exports metadata and optional hooks.

module.exports = {
  meta: {
    name: 'Sample Visual Plugin',
    id: 'sample-visual-1',
    version: '0.1.0',
    description: 'Provides a sample visual preset that can be loaded into the live editor.',
    author: 'HydraPlayer Prototype'
  },

  // optional: a function that returns initial visual code
  getVisualCode: function() {
    return `// sample plugin visual code\nctx.fillStyle = 'rgba(0,0,10,0.2)';\nctx.fillRect(0,0,canvas.width,canvas.height);\nctx.fillStyle = '#00ffcc';\nctx.font = '24px monospace';\nctx.fillText('Sample Plugin Visual', 20, 40);`;
  }
};
