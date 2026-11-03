import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { resolve, extname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { mkdir, writeFile } from 'node:fs/promises';

const root = resolve('frontend/dist');
const output = join(tmpdir(), 'portfolio-dashboard-qa');
await mkdir(output, { recursive: true });
const server = createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (!extname(path)) path = '/index.html';
    const data = await readFile(join(root, path));
    res.setHeader('Content-Type', ({'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp'})[extname(path)] || 'application/octet-stream');
    res.end(data);
  } catch { res.statusCode = 404; res.end(); }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const browser = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=9337', '--user-data-dir=' + join(output, 'profile'), 'about:blank'
], { windowsHide: true, stdio: 'ignore' });
let socket;
let failed = false;
try {
  let targets;
  for(let i=0;i<100;i++) {
    try { targets = await (await fetch('http://127.0.0.1:9337/json/list', { signal: AbortSignal.timeout(500) })).json(); if(targets.length) break; } catch {}
    await new Promise(r => setTimeout(r, 100));
  }
  if (!targets?.length) throw Error('Chrome debugging connection unavailable');
  socket = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((r,j) => { socket.onopen=r; socket.onerror=j; });
  let id=0; const pending = new Map();
  socket.onmessage = e => { const m=JSON.parse(e.data); if(pending.has(m.id)){ const [r,j]=pending.get(m.id); pending.delete(m.id); m.error?j(m.error):r(m.result); } };
  const send = (method,params={}) => new Promise((r,j) => {
    const key=++id;
    const timeout=setTimeout(() => { pending.delete(key); j(Error('Timed out: '+method)); },15000);
    pending.set(key,[value=>{clearTimeout(timeout);r(value);},error=>{clearTimeout(timeout);j(error);}]);
    socket.send(JSON.stringify({id:key,method,params}));
  });
  const evaluate = async expression => (await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true})).result.value;
  await send('Page.enable');
  for(const [width,height] of [[1920,1080],[1440,900],[1366,768],[390,844]]) {
    await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});
    await send('Page.navigate',{url:'http://127.0.0.1:'+server.address().port});
    for(let i=0;i<100;i++){ if(await evaluate('!!document.querySelector(".home-folder")')) break; await new Promise(r=>setTimeout(r,100)); }
    await evaluate('document.fonts.ready.then(() => true)');
    await new Promise(r=>setTimeout(r,400));
    const result=await evaluate(`(() => {
      const rect=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,bottom:r.bottom,right:r.right}};
      const folders=[...document.querySelectorAll('.home-explorer .home-folder')].map(e=>({box:rect(e),overflow:e.scrollHeight>e.clientHeight+1,description:rect(e.querySelector('p'))}));
      const panel=rect(document.querySelector('.workflow-highlights'));
      const main=document.querySelector('.workspace-content');
      const sidebar=document.querySelector('.workspace-sidebar');
      return {viewport:[innerWidth,innerHeight],document:[document.documentElement.scrollWidth,document.documentElement.scrollHeight],main:[main.clientHeight,main.scrollHeight],sidebar:[sidebar.clientHeight,sidebar.scrollHeight],folders,panel,grid:rect(document.querySelector('.portfolio-folder-grid')),hero:rect(document.querySelector('h1')),logos:rect(document.querySelector('.company-strip')),animation:getComputedStyle(document.querySelector('.workflow-highlights-track')).transform};
    })()`);
    await new Promise(r=>setTimeout(r,250));
    const next=await evaluate('getComputedStyle(document.querySelector(".workflow-highlights-track")).transform');
    result.movingUp=Number(next.split(',')[5]?.replace(')','')) < Number(result.animation.split(',')[5]?.replace(')',''));
    if(width>=1280) {
      result.pass=result.document[0]===width && result.document[1]===height && result.main[1]<=result.main[0]+1 && result.sidebar[1]<=result.sidebar[0]+1 && result.folders.length===6 && result.folders.every(f=>!f.overflow && f.box.bottom<=height && f.description.bottom<=f.box.bottom && f.box.right<=width) && result.panel.bottom<=height && Math.abs(result.panel.y-result.grid.y)<1 && Math.abs(result.panel.bottom-result.grid.bottom)<1 && result.movingUp;
    } else result.pass=result.document[0]===width && result.panel.y>=result.grid.bottom;
    const shot=await send('Page.captureScreenshot',{format:'png'});
    await writeFile(join(output,width+'x'+height+'.png'),Buffer.from(shot.data,'base64'));
    console.log(JSON.stringify(result));
    if (!result.pass) failed = true;
  }
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  console.log('Reduced motion: '+await evaluate('getComputedStyle(document.querySelector(".workflow-highlights-track")).animationName'));
  console.log('Screenshots: '+output);
  if (failed) throw Error('One or more viewport layout checks failed');
} finally {
  socket?.close(); browser.kill(); server.close();
}
