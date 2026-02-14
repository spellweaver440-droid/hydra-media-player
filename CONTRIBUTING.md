# Contributing to HydraPlayer

First off, thank you for considering contributing to HydraPlayer! It's people like you that make HydraPlayer such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by a Code of Conduct. By participating, you are expected to uphold this code.

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful of differing opinions, viewpoints, and experiences.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps which reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots and animated GIFs if possible**
* **Include your OS, Node.js version, and any other relevant environment details**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and expected behavior**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Follow the JavaScript styleguides
* Document new code with comments
* End all files with a newline

## Development Process

### Setup Development Environment

1. Fork and clone the repository
2. Install Node.js (v16+)
3. Run `npm install`
4. Run `npm start` to test your changes

### Making Changes

1. Create a new branch for your feature: `git checkout -b feature/my-feature`
2. Make your changes
3. Test thoroughly: `npm start`
4. Commit with clear messages: `git commit -m "Add: my feature description"`
5. Push to your fork: `git push origin feature/my-feature`
6. Open a Pull Request

### Commit Message Guidelines

```
[Type]: [Subject]

[Body - optional]

[Footer - optional]
```

Types:
- `Add`: New feature
- `Fix`: Bug fix
- `Docs`: Documentation
- `Style`: Code styling
- `Refactor`: Code restructuring
- `Perf`: Performance
- `Test`: Tests

Example:
```
Add: Oscilloscope waveform plugin

Implements a new visualizer that displays raw audio waveform
in oscilloscope style with dynamic coloring.

Closes #42
```

### Style Guide

#### JavaScript

- Use `const` and `let` (no `var`)
- Use arrow functions when appropriate
- Use camelCase for variables and functions
- Use PascalCase for React components
- Add comments for complex logic
- Max line length: 100 characters

```javascript
// Good
const handlePlay = () => {
  if (audio) {
    audio.play(); // Resume playback
  }
};

// Bad
const h = ()=>{if(a)a.play();}
```

#### React

- Use functional components with hooks
- Keep components small and focused
- Use descriptive names for states

```javascript
// Good
function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
  };
  
  return (
    <button onClick={handlePlayClick}>
      {isPlaying ? 'Pause' : 'Play'}
    </button>
  );
}

// Bad
function AP() {
  const [p, setP] = useState(false);
  return <button onClick={()=>setP(!p)}>{p?'P':'Pl'}</button>;
}
```

### Testing

Before submitting a PR:

1. Test on Linux (Ubuntu/Debian/Kali/Fedora)
2. Test on macOS (if possible)
3. Test with multiple audio formats (.mp3, .wav, .ogg)
4. Test plugins loading and execution
5. Check console for errors (F12)

## Recognition

Contributors will be:
- Added to the README
- Mentioned in release notes
- Given credit for their work

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

---

**Thank you for contributing to HydraPlayer! 🎵✨**

