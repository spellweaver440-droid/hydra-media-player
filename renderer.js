const { useState, useEffect, useRef } = React;

function App() {
  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [files, setFiles] = useState([]);
  const [plugins, setPlugins] = useState([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const analyserRef = useRef(null);
  const audioCtxRef = useRef(null);
  const freqDataRef = useRef(null);
  const canvasRef = useRef(null);
  const [userCode, setUserCode] = useState(defaultVisualCode);
  const [debugInfo, setDebugInfo] = useState('');
  const [execStatus, setExecStatus] = useState('');
  const userCodeRef = useRef(defaultVisualCode);

  useEffect(() => {
    setupMatrixBackground();
    startRenderLoop();
    
    // Request plugins from main process
    const loadPlugins = async () => {
      if (window.electronAPI && window.electronAPI.invoke) {
        try {
          console.log('Requesting plugins from main process...');
          const pluginsList = await window.electronAPI.invoke('get-plugins');
          console.log('✓ Received plugins:', pluginsList);
          console.log('Plugin count:', pluginsList?.length || 0);
          setDebugInfo(`Loaded ${pluginsList?.length || 0} plugins`);
          setPlugins(pluginsList || []);
        } catch (error) {
          console.error('❌ Failed to load plugins:', error);
          setDebugInfo('Error loading plugins');
        }
      } else {
        console.warn('❌ electronAPI.invoke not available');
        setDebugInfo('electronAPI unavailable');
      }
    };
    
    loadPlugins();
  }, []);

  // Update the ref whenever userCode changes
  useEffect(() => {
    userCodeRef.current = userCode;
    console.log('User code updated, length:', userCode.length);
  }, [userCode]);

  function setupMatrixBackground() {
    const canvas = document.getElementById('bg-matrix');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const cols = Math.floor(canvas.width / 20) + 1;
    const drops = Array(cols).fill(0);

    function draw() {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0f0';
      ctx.font = '18pt monospace';
      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(0x30A0 + Math.random() * 96);
        ctx.fillText(text, i * 20, drops[i] * 20);
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      requestAnimationFrame(draw);
    }

    draw();
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  function startRenderLoop() {
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 400;
    canvasRef.current = canvas;
    const ctx = canvas.getContext('2d');

    function loop() {
      const audioData = freqDataRef.current ? freqDataRef.current.slice() : new Uint8Array(128);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      try {
        const userFn = new Function('canvas','ctx','audioData', userCodeRef.current);
        userFn(canvas, ctx, audioData);
      } catch (e) {
        ctx.fillStyle = '#fff';
        ctx.fillText('Visual error: ' + e.message, 10, 20);
      }
      requestAnimationFrame(loop);
    }

    loop();
  }

  function setupAudio(file, index) {
    if (audio) { audio.pause(); }
    if (typeof index !== 'undefined') setCurrentFileIndex(index);
    const a = new Audio();
    a.src = URL.createObjectURL(file);
    a.crossOrigin = 'anonymous';
    a.loop = false;
    a.volume = muted ? 0 : volume;

    // Web Audio
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaElementSource(a);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    analyserRef.current = analyser;
    audioCtxRef.current = audioCtx;
    freqDataRef.current = dataArray;

    a.addEventListener('play', () => {
      if (audioCtx.state === 'suspended') audioCtx.resume();
    });

    a.addEventListener('timeupdate', () => {
      if (analyserRef.current) analyserRef.current.getByteFrequencyData(freqDataRef.current);
      setCurrentTime(a.currentTime);
      setDuration(a.duration);
    });

    a.addEventListener('loadedmetadata', () => {
      setDuration(a.duration);
    });

    a.addEventListener('ended', () => {
      skipTrack();
    });

    setAudio(a);
  }

  function skipTrack() {
    const nextIndex = (currentFileIndex + 1) % files.length;
    if (files.length > 0) {
      setupAudio(files[nextIndex], nextIndex);
      if (playing) setTimeout(() => audio?.play(), 100);
    }
  }

  function handleVolumeChange(e) {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audio) audio.volume = muted ? 0 : newVol;
  }

  function toggleMute() {
    setMuted(!muted);
    if (audio) audio.volume = muted ? volume : 0;
  }

  function togglePlay() {
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play(); setPlaying(true); }
  }

  function onFiles(e) {
    const chosen = Array.from(e.target.files || []);
    if (chosen.length === 0) return;
    setFiles(prev => prev.concat(chosen));
    setupAudio(chosen[0]);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <h1 className="logo">HydraPlayer</h1>
        <input type="file" accept="audio/*" onChange={onFiles} multiple />
        <div className="controls">
          <button onClick={togglePlay}>{playing ? '⏸ Pause' : '▶ Play'}</button>
          <button onClick={skipTrack} className="skip-btn">⏭ Skip</button>
        </div>
        <div className="volume-control">
          <button onClick={toggleMute} className="mute-btn" title="Mute/Unmute">
            {muted ? '🔇' : '🔊'}
          </button>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.05" 
            value={muted ? 0 : volume}
            onChange={handleVolumeChange}
            className="volume-slider"
            title="Volume"
          />
          <span className="volume-label">{Math.round((muted ? 0 : volume) * 100)}%</span>
        </div>
        
        <div className="progress-control">
          <div className="progress-bar-container" onClick={(e) => {
            if (!audio || !duration) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percent = clickX / rect.width;
            audio.currentTime = percent * duration;
          }}>
            <div className="progress-fill" style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}></div>
          </div>
          <div className="time-display">
            <span>{Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}</span>
            <span>{Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, '0')}</span>
          </div>
        </div>
        
        <div className="playlist">
          <h3>Playlist</h3>
          <ul>
            {files.map((f, i) => (
              <li key={i} onClick={() => { setupAudio(f, i); setPlaying(true); }} 
                  className={i === currentFileIndex ? 'active' : ''}>
                {f.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="plugins-panel">
          <h3>Plugins {plugins.length > 0 && `(${plugins.length})`}</h3>
          {plugins.length === 0 && (
            <p style={{fontSize: '11px', color: '#aaa', marginTop: '8px'}}>
              {debugInfo || 'Loading plugins...'}
            </p>
          )}
          <ul>
            {plugins.map((plugin, i) => (
              <li key={i}>
                <div className="plugin-info">
                  <strong>{plugin.name || 'Unknown'}</strong>
                  <p className="plugin-desc">{plugin.description || ''}</p>
                </div>
                <button 
                  className="load-btn"
                  onClick={() => {
                    if (plugin.visualCode) {
                      setUserCode(plugin.visualCode);
                      console.log('Loaded plugin:', plugin.name);
                    }
                  }}
                >
                  Load
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="main">
        <div className="visual-canvas">
          <canvas ref={(el) => {
            if (!el || !canvasRef.current) return;
            // copy rendered canvas into visible element
            const src = canvasRef.current;
            const dst = el;
            dst.width = src.width;
            dst.height = src.height;
            const dstCtx = dst.getContext('2d');
            function copyLoop() {
              dstCtx.clearRect(0,0,dst.width,dst.height);
              dstCtx.drawImage(src,0,0);
              requestAnimationFrame(copyLoop);
            }
            copyLoop();
          }} width={900} height={400}></canvas>
        </div>

        <div className="editor">
          <h3>Live Visual Editor</h3>
          <textarea value={userCode} onChange={(e)=>setUserCode(e.target.value)} />
          <button 
            className="run-code-btn"
            onClick={() => {
              try {
                // Get latest code from ref
                const code = userCodeRef.current;
                
                // Clear any plugin animation state
                window._alchemyState = null;
                window._particleState = null;
                
                // Validate the code by trying to create a function
                const testFn = new Function('canvas','ctx','audioData', code);
                
                // Get current audio data
                const audioData = freqDataRef.current ? freqDataRef.current.slice() : new Uint8Array(128);
                
                // Execute immediately with current audio data on the render canvas
                if (canvasRef.current) {
                  const canvas = canvasRef.current;
                  const ctx = canvas.getContext('2d');
                  // Clear the canvas first
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                  // Execute the code
                  testFn(canvas, ctx, audioData);
                }
                
                setExecStatus('✓ Code executed!');
                console.log('✓ Code executed successfully');
                
                // Clear status after 2 seconds
                setTimeout(() => setExecStatus(''), 2000);
              } catch (error) {
                setExecStatus('✗ Error: ' + error.message.substring(0, 30));
                console.error('Code execution error:', error.message);
                setTimeout(() => setExecStatus(''), 3000);
              }
            }}
          >
            ▶ Execute Code
          </button>
          {execStatus && (
            <div style={{
              marginTop: '6px',
              fontSize: '12px',
              padding: '8px',
              borderRadius: '4px',
              textAlign: 'center',
              background: execStatus.includes('✓') ? 'rgba(0,255,100,0.2)' : 'rgba(255,50,50,0.2)',
              color: execStatus.includes('✓') ? '#00ff64' : '#ff3232',
              border: `1px solid ${execStatus.includes('✓') ? 'rgba(0,255,100,0.4)' : 'rgba(255,50,50,0.4)'}`
            }}>
              {execStatus}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const defaultVisualCode = `// canvas, ctx, audioData (Uint8Array)
ctx.fillStyle = 'rgba(0,0,0,0.2)';
ctx.fillRect(0,0,canvas.width,canvas.height);
const w = canvas.width; const h = canvas.height;
const len = audioData.length;
for (let i=0;i<len;i++){
  const v = audioData[i]/255.0;
  const x = (i/len)*w;
  const barH = v*h*1.2;
  const g = ctx.createLinearGradient(x,0,x,barH);
  g.addColorStop(0,'#ff00ff');
  g.addColorStop(1,'#00ffff');
  ctx.fillStyle = g;
  ctx.fillRect(x, h-barH, w/len*1.1, barH);
}
`;

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
