/* Interactive tablecloth.
   The gingham is drawn by a fragment shader. A small wave simulation (run on the CPU on a coarse grid)
   is stirred by the cursor and fed to the shader as a height/slope map, which both bends the checks
   and lights the folds. With no cursor contact the cloth is perfectly still. */
(() => {
  const cv = document.getElementById("cloth");
  if (!cv) return;
  const gl = cv.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
  if (!gl) return; // the CSS gingham stays as the fallback
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const VS = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
  const FS = `precision mediump float;
uniform vec2 uRes;uniform float uScroll,uCell,uTime,uDpr,uAmp,uBreeze;uniform sampler2D uW;
void main(){
  vec2 frag=vec2(gl_FragCoord.x,uRes.y-gl_FragCoord.y);
  vec2 css=frag/uDpr;
  vec4 w=texture2D(uW,frag/uRes);
  vec2 g=(w.rg-.5)*2.;
  float h=(w.b-.5)*2.;
  vec2 pg=css+vec2(0.,uScroll);
  float t=uTime;
  vec2 amb=vec2(sin(pg.y*.0065+t*.7+sin(pg.x*.0042-t*.4)*1.7),cos(pg.x*.0052-t*.6+sin(pg.y*.0031+t*.3)*1.5))*uBreeze;
  vec2 d=g*uAmp+amb*2.2;
  vec2 c=(pg+d)/uCell;
  float aa=1.1/uCell;
  vec2 f=abs(fract(c)-.5);
  float sx=smoothstep(.25-aa,.25+aa,f.x);
  float sy=smoothstep(.25-aa,.25+aa,f.y);
  vec3 white=vec3(.992,.965,.945);
  vec3 red=vec3(.788,.11,.204);
  vec3 col=mix(white,red,.66*sx);
  col=mix(col,red,.66*sy);
  vec3 n=normalize(vec3(-g.x*1.5-amb.x*.05,-g.y*1.5-amb.y*.05,1.));
  vec3 l=normalize(vec3(-.55,-.6,.9));
  float shade=1.+(dot(n,l)-l.z)*.75+h*.1;
  col*=clamp(shade,.55,1.35);
  gl_FragColor=vec4(col,1.);
}`;
  function sh(type, src) { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; } return s; }
  const vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS);
  if (!vs || !fs) return;
  const pr = gl.createProgram(); gl.attachShader(pr, vs); gl.attachShader(pr, fs); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
  gl.useProgram(pr);
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const U = (n) => gl.getUniformLocation(pr, n);
  const uRes = U("uRes"), uScroll = U("uScroll"), uCell = U("uCell"), uTime = U("uTime"), uDpr = U("uDpr"), uAmp = U("uAmp"), uBreeze = U("uBreeze");
  gl.uniform1i(U("uW"), 0);

  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  /* ---------- wave simulation ---------- */
  const C = 0.24, DAMP = 0.98;
  let GW = 0, GH = 0, h, v, px, dpr = 1, W = 0, H = 0, texW = 0, texH = 0, quiet = true, activeUntil = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    W = innerWidth; H = innerHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    gl.viewport(0, 0, cv.width, cv.height);
    GW = 120; GH = Math.max(40, Math.round((GW * H) / W));
    h = new Float32Array(GW * GH); v = new Float32Array(GW * GH); px = new Uint8Array(GW * GH * 4);
    for (let i = 0; i < GW * GH; i++) { px[i * 4] = 128; px[i * 4 + 1] = 128; px[i * 4 + 2] = 128; px[i * 4 + 3] = 255; }
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, GW, GH, 0, gl.RGBA, gl.UNSIGNED_BYTE, px);
    gl.uniform2f(uRes, cv.width, cv.height); gl.uniform1f(uDpr, dpr);
    const vu = Math.min(W * 0.01, H * 0.0155);
    gl.uniform1f(uCell, vu * 8.4); // same check size as the CSS fallback
    gl.uniform1f(uAmp, Math.max(7, vu * 1.2));
  }

  function step() {
    for (let y = 1; y < GH - 1; y++) {
      let i = y * GW + 1;
      for (let x = 1; x < GW - 1; x++, i++) v[i] = (v[i] + (h[i - 1] + h[i + 1] + h[i - GW] + h[i + GW] - 4 * h[i]) * C) * DAMP;
    }
    let e = 0;
    for (let i = GW; i < GW * (GH - 1); i++) { h[i] += v[i]; e += Math.abs(v[i]); }
    quiet = e < 0.02;
  }
  function pack() {
    const q = (n) => (n < -1 ? 0 : n > 1 ? 255 : (128 + n * 127) | 0);
    for (let y = 1; y < GH - 1; y++) {
      for (let x = 1; x < GW - 1; x++) {
        const i = y * GW + x, o = i * 4;
        px[o] = q((h[i + 1] - h[i - 1]) * 2.3); px[o + 1] = q((h[i + GW] - h[i - GW]) * 2.3); px[o + 2] = q(h[i] * 0.9);
      }
    }
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, GW, GH, gl.RGBA, gl.UNSIGNED_BYTE, px);
  }
  /* press the cloth down around (x,y) css px */
  function poke(x, y, amp) {
    const gx = (x / W) * GW, gy = (y / H) * GH, R = 3.4, r = Math.ceil(R * 2);
    for (let j = Math.max(1, Math.floor(gy - r)); j <= Math.min(GH - 2, Math.ceil(gy + r)); j++) {
      for (let i = Math.max(1, Math.floor(gx - r)); i <= Math.min(GW - 2, Math.ceil(gx + r)); i++) {
        const dx = i - gx, dy = j - gy; h[j * GW + i] += amp * Math.exp(-(dx * dx + dy * dy) / (R * R));
      }
    }
    activeUntil = performance.now() + 5000;
  }
  let lx = null, ly = null;
  function move(x, y) {
    if (reduce) return;
    if (lx === null) { lx = x; ly = y; return; }
    const dx = x - lx, dy = y - ly, dist = Math.hypot(dx, dy);
    if (dist < 0.5) return;
    const cellPx = W / GW, n = Math.max(1, Math.min(14, Math.round(dist / cellPx)));
    const k = Math.min(1, dist / 36); // faster hand, deeper drag
    for (let s = 1; s <= n; s++) poke(lx + (dx * s) / n, ly + (dy * s) / n, -0.08 * (0.4 + k));
    lx = x; ly = y;
  }
  addEventListener("pointermove", (e) => move(e.clientX, e.clientY), { passive: true });
  addEventListener("pointerdown", (e) => { poke(e.clientX, e.clientY, -0.4); lx = e.clientX; ly = e.clientY; }, { passive: true });
  document.addEventListener("pointerleave", () => { lx = ly = null; });
  addEventListener("resize", resize);

  resize();
  document.body.classList.add('gl');
  /* The cloth is completely still until the cursor touches it. It only redraws while it is
     rippling, while the page scrolls (the checks move with the page), or after a resize. */
  let prev = performance.now(), acc = 0, lastScroll = -1, lastW = 0, wasMoving = false;
  function frame(now) {
    requestAnimationFrame(frame);
    if (document.hidden) { prev = now; return; }
    acc += Math.min(50, now - prev); prev = now;
    const moving = !quiet || now < activeUntil;
    let dirty = scrollY !== lastScroll || cv.width !== lastW;
    if (moving) {
      let steps = 0;
      while (acc >= 16.7 && steps < 3) { acc -= 16.7; steps++; step(); }
      if (steps) { pack(); dirty = true; }
    } else {
      acc = 0;
      if (wasMoving) { h.fill(0); v.fill(0); pack(); dirty = true; } // settle perfectly flat
    }
    wasMoving = moving;
    if (!dirty) return;
    lastScroll = scrollY; lastW = cv.width;
    gl.uniform1f(uTime, 0);
    gl.uniform1f(uScroll, scrollY);
    gl.uniform1f(uBreeze, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  requestAnimationFrame(frame);
  window.__cloth = { poke, move, ready: true }; // handy for testing
})();
