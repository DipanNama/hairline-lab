const t=require('node:test'),a=require('node:assert/strict'),f=require('node:fs');
t('gallery entries',()=>{const s=f.readFileSync('app.js','utf8');for(const n of ['funnel','rack','layers'])a.ok(s.includes('id:"'+n+'"'));});
for(const n of ['funnel','rack','layers'])t(n+' self-contained SVG page',()=>{const s=f.readFileSync('figures/'+n+'.html','utf8');a.ok(s.includes('createElementNS'));a.ok(s.includes('pointer'));a.ok(s.includes('<script'));a.ok(!/<script[^>]+src=/.test(s));});
t('main only workflow',()=>{const s=f.readFileSync('.github/workflows/pages.yml','utf8');a.ok(s.includes('branches: [main]'));a.ok(!s.includes('workflow_dispatch'));a.ok(!s.includes('pull_request'));});
t('site assets',()=>{for(const p of ['og.png.base64','favicon.svg','robots.txt','sitemap.xml','404.html'])a.ok(f.statSync(p).size>0);});
t('OG bytes decode',()=>a.equal(Buffer.from(f.readFileSync('og.png.base64','utf8'),'base64').subarray(0,8).toString('hex'),'89504e470d0a1a0a'));
