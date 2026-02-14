const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, cb) => ipcRenderer.on(channel, (event, data) => cb(data)),
  invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args)
});
