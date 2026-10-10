// Local-only helper: serves a folder and saves canvas PNGs posted by a card template.
// Usage: node export-server.mjs [port=4795] [root=current directory]
// Saves go to <root>/cards/[<set>/]<name>.png and are limited to numbered card names and contact-sheet.png.
import {createServer} from 'node:http';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {dirname,extname,join,normalize,resolve} from 'node:path';

const port=Number(process.argv[2]||4795);
const root=resolve(process.argv[3]||process.cwd());
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.mp4':'video/mp4','.wav':'audio/wav','.otf':'font/otf'};
const exportName=/^([a-z0-9-]+\/)?(0[1-9]-[a-z0-9-]+|contact-sheet)\.png$/;

createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,'http://127.0.0.1');
    if(req.method==='POST'&&url.pathname.startsWith('/save/')){
      const name=url.pathname.slice(6);
      if(!exportName.test(name)){res.writeHead(400).end('bad name');return}
      const chunks=[];for await(const c of req)chunks.push(c);
      const out=join(root,'cards',name);
      await mkdir(dirname(out),{recursive:true});await writeFile(out,Buffer.concat(chunks));
      res.writeHead(200).end('saved');return;
    }
    const rel=normalize(decodeURIComponent(url.pathname)).replace(/^\/+/,'')||'index.html';
    if(rel.startsWith('..')){res.writeHead(403).end();return}
    const body=await readFile(join(root,rel));
    const head={'content-type':types[extname(rel)]||'application/octet-stream','cache-control':'no-store','accept-ranges':'bytes'};
    // Byte ranges let the browser seek inside a reel preview.
    const range=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range||'');
    if(range&&(range[1]||range[2])){
      const start=range[1]?Number(range[1]):Math.max(0,body.length-Number(range[2]));
      const end=range[1]&&range[2]?Math.min(Number(range[2]),body.length-1):body.length-1;
      if(start>end||start>=body.length){res.writeHead(416,{'content-range':`bytes */${body.length}`}).end();return}
      res.writeHead(206,{...head,'content-range':`bytes ${start}-${end}/${body.length}`}).end(body.subarray(start,end+1));return;
    }
    res.writeHead(200,head).end(body);
  }catch{res.writeHead(404).end('not found')}
}).listen(port,'127.0.0.1',()=>console.log(`serving ${root} on http://127.0.0.1:${port}`));
