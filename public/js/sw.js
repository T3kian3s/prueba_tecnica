if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const c=e=>s(e,t),d={module:{uri:t},exports:o,require:c};i[t]=Promise.all(n.map((e=>d[e]||c(e)))).then((e=>(r(...e),o)))}}define(["./workbox-8366b1fe"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"img/task_icon.png",revision:"8057406e5abf5d8c54396a544d1fc902"},{url:"index.html",revision:"6b714ff11b359b8f911043fe8d083ac4"},{url:"main.js",revision:"f1310a7041c64083c1576af89d616bd5"},{url:"manifest.json",revision:"dab3ecd6bc3dd96adc0b4fd4d4e87e78"},{url:"style.css",revision:"5fcf90ec656e559b8742caabedcb9b83"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map
