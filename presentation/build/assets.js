const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const OUT = '/tmp/claude-0/-home-user-Default/6c313414-fc11-5a80-9cf8-49dad1a51f26/scratchpad/img';
fs.mkdirSync(OUT, { recursive: true });
const PUB = '/home/user/Default/public';

// ---- CPeak signature texture: ledger rules dissolving into a node network ----
function ledgerSVG(w, h, stroke, op) {
  const rows = [];
  const step = 46;
  for (let y = step; y < h; y += step) rows.push(`<line x1="0" y1="${y}" x2="${w}" y2="${y}"/>`);
  const nodes = [
    [0.62,0.24,5],[0.74,0.15,3.5],[0.86,0.33,6],[0.66,0.52,3.5],
    [0.80,0.62,4.5],[0.92,0.72,3.5],[0.58,0.74,3.5],[0.74,0.40,7]
  ].map(([fx,fy,r])=>({x:fx*w,y:fy*h,r}));
  const edges=[[0,1],[1,2],[0,7],[7,2],[7,3],[3,4],[4,2],[4,5],[3,6],[6,4]];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <g stroke="${stroke}" stroke-width="1" opacity="${op}">${rows.join('')}</g>
  <g stroke="${stroke}" stroke-width="1.2" opacity="${op * 2.1}">
    ${edges.map(([a,b])=>`<line x1="${nodes[a].x}" y1="${nodes[a].y}" x2="${nodes[b].x}" y2="${nodes[b].y}"/>`).join('')}
  </g>
  <g fill="${stroke}" opacity="${op * 3.4}">
    ${nodes.map(n=>`<circle cx="${n.x}" cy="${n.y}" r="${n.r}"/>`).join('')}
  </g>
</svg>`;
}

(async () => {
  // textures (2x for 13.333x7.5in slide @ 150dpi -> 2000x1125)
  await sharp(Buffer.from(ledgerSVG(2000, 1125, '#FFFFFF', 0.055))).png().toFile(`${OUT}/tex-dark.png`);
  await sharp(Buffer.from(ledgerSVG(2000, 1125, '#F5DCA4', 0.075))).png().toFile(`${OUT}/tex-amber.png`);
  await sharp(Buffer.from(ledgerSVG(2000, 1125, '#11676A', 0.10))).png().toFile(`${OUT}/tex-light.png`);

  // logos
  await sharp(`${PUB}/brand/cpeak-logo.svg`, { density: 700 }).resize({ width: 1400 }).png().toFile(`${OUT}/logo.png`);
  await sharp(`${PUB}/brand/cpeak-logo-on-dark.svg`, { density: 700 }).resize({ width: 1400 }).png().toFile(`${OUT}/logo-dark.png`);

  // reference logos -> trimmed transparent PNGs
  const refs = JSON.parse(fs.readFileSync('/tmp/claude-0/-home-user-Default/6c313414-fc11-5a80-9cf8-49dad1a51f26/scratchpad/refs.json','utf8'));
  for (const r of refs) {
    const src = PUB + r.src;
    const name = path.basename(r.src).replace(/\.(svg|webp|png)$/, '.png');
    let img = sharp(src, { density: 700 });
    await img.resize({ width: 900, fit: 'inside' }).trim({ threshold: 5 }).png().toFile(`${OUT}/ref-${name}`);
  }
  console.log('assets built');
})().catch(e => { console.error(e); process.exit(1); });
