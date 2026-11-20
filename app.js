(() => {
  const S = window.SITE, A = window.ART;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const rand = (a, b) => a + Math.random() * (b - a);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
  const vh = () => innerHeight;

  document.title = S.title;
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  /* ---------- perforated edge mask (data-uri SVG) ---------- */
  function perfPath(w, h, step, r) {
    let d = `M0 0H${w}V${h}H0Z`;
    const hole = (cx, cy) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`;
    const nx = Math.round(w / step), ny = Math.round(h / step);
    for (let i = 0; i < nx; i++) { const x = (i + 0.5) * (w / nx); d += hole(x, 0) + hole(x, h); }
    for (let i = 0; i < ny; i++) { const y = (i + 0.5) * (h / ny); d += hole(0, y) + hole(w, y); }
    return d;
  }
  function maskURL(w, h, step = 14, r = 4.2) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'><path fill-rule='evenodd' d='${perfPath(w, h, step, r)}'/></svg>`;
    return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
  }
  function perforate(el, step = 14, r = 4.2) {
    const w = Math.round(el.offsetWidth), h = Math.round(el.offsetHeight);
    if (!w || !h) return;
    const m = maskURL(w, h, step, r);
    el.style.webkitMaskImage = el.style.maskImage = m;
    el.style.webkitMaskSize = el.style.maskSize = "100% 100%";
  }

  /* ---------- seeded random for stable decoration ---------- */
  const seeded = (s) => () => ((s = (s * 16807) % 2147483647) / 2147483647);

  /* ============================================================ PROPS */
  const put = (id, html) => { const el = $(id); if (el) el.innerHTML = html; };
  put("#p-laptop", A.props.laptop()); put("#p-laptop2", A.props.laptop());
  put("#p-glass", A.props.glass()); put("#p-glass2", A.props.glass());
  put("#p-radio", A.props.radio()); put("#p-radio2", A.props.radio());
  put("#p-camera", A.props.camera()); put("#p-camera2", A.props.camera());
  ["#p-fl1", "#p-fl2", "#p-fl3", "#p-fl4", "#p-fl5", "#p-fl6"].forEach((id) => put(id, A.props.flower()));
  $$(".prop").forEach((el, i) => { el.style.transitionDelay = 0.15 + i * 0.07 + "s"; });
  $$("#p-radio,#p-radio2").forEach((el) => { el.style.cursor = "pointer"; el.title = "Radio"; el.addEventListener("click", () => toggleSound()); });

  /* ---------- polaroids ---------- */
  const clipSVG = `<svg class="clip" viewBox="0 0 40 52" fill="none" stroke="#9aa3ad" stroke-width="3.2" stroke-linecap="round"><path d="M12 36V12a8 8 0 0 1 16 0v26a5 5 0 0 1-10 0V16"/><path d="M12 36V12a8 8 0 0 1 16 0" stroke="#e6ebf0" stroke-width="1.2"/></svg>`;
  function polaroid(el) {
    const links = S.contact.links.map((l) => `<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`).join("");
    el.innerHTML = `<div class="pol-in">
      <div class="face front"><div class="photo"><video src="${S.hero.video}" muted loop playsinline preload="auto"></video>
        <div class="scrib"><span class="l1">${S.hero.scribble[0]}</span><span class="l2">${S.hero.scribble[1]}</span><span class="l3">${S.hero.scribble[2]}</span></div></div>${clipSVG}</div>
      <div class="face back"><h4>Hi, I'm ${S.first}!</h4><p>Thanks for stopping by the picnic. Say hello!</p>
        <a href="mailto:${S.contact.email}">${S.contact.email}</a><a href="tel:${S.contact.phoneLink}">${S.contact.phone}</a><div class="links">${links}</div></div></div>`;
    el.addEventListener("click", (e) => { if (e.target.closest("a")) return; el.classList.toggle("flipped"); });
    el.setAttribute("role", "button"); el.setAttribute("tabindex", "0"); el.setAttribute("aria-label", "Flip the photo");
    el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); el.classList.toggle("flipped"); } });
    el.dataset.hint = "Check the back";
  }
  polaroid($("#pol1")); polaroid($("#pol2"));
  const videos = $$("video");

  /* ---------- leaf shadows (multiply layer) ---------- */
  (function shade() {
    const r = seeded(7);
    const leaf = (x, y, a, s) => `<path transform="translate(${x} ${y}) rotate(${a}) scale(${s})" d="M0 0C14-18 44-18 60 0C44 18 14 18 0 0Z"/>`;
    function branch(x0, y0, ang, len, n) {
      let out = `<path d="M${x0} ${y0} q${Math.cos(ang) * len * .5 + 40} ${Math.sin(ang) * len * .5 - 30} ${Math.cos(ang) * len} ${Math.sin(ang) * len}" fill="none" stroke="#2b1d33" stroke-width="5"/>`;
      for (let i = 0; i < n; i++) {
        const t = i / n, px = x0 + Math.cos(ang) * len * t, py = y0 + Math.sin(ang) * len * t;
        out += leaf(px, py, (ang * 180) / Math.PI + (i % 2 ? 62 : -62) + rand(-18, 18), rand(1.2, 2.1));
        if (i % 3 === 0) out += leaf(px, py, (ang * 180) / Math.PI + rand(-20, 20), rand(1.4, 2.2));
      }
      return out;
    }
    const g1 = branch(1050, -30, 2.45, 760, 22) + branch(980, 10, 2.1, 520, 14) + branch(1080, 120, 2.8, 420, 12);
    const g2 = branch(-50, 760, -0.55, 760, 22) + branch(20, 730, -0.15, 520, 14) + branch(-40, 600, -0.8, 420, 12);
    $("#shade").innerHTML = `<svg viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice"><defs><filter id="bl" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="5"/></filter></defs>
      <g filter="url(#bl)" fill="#33222f" opacity=".42"><g class="sway">${g1}</g><g class="sway b">${g2}</g></g></svg>`;
  })();

  /* ============================================================ POSTCARD */
  (function postcard() {
    const w = S.works[0];
    const badges = S.skills.map((s) => `<div class="badge"><span class="b ${s.color}">${A.icon(s.icon)}</span>${s.label}</div>`).join("");
    const stampPC = A.stamp({ title: S.first.toUpperCase(), denom: "1", theme: { frame: "#2f6b50", ink: "#3a2c24", sky: "#e9dfc8" }, art: "brain", seed: 3 });
    const mark = `<svg class="pc-mark" viewBox="0 0 100 100" fill="none" stroke="#3a3a3a" stroke-width="2"><circle cx="50" cy="50" r="40"/><circle cx="50" cy="50" r="30"/><path id="pmk" d="M18 50a32 32 0 0 1 64 0" stroke="none"/><text font-family="Geist,sans-serif" font-size="8" font-weight="700" fill="#3a3a3a" stroke="none" letter-spacing="1.5"><textPath href="#pmk" startOffset="50%" text-anchor="middle">${S.location.toUpperCase()} · AI</textPath></text><path d="M2 40q12-8 24 0t24 0t24 0t24 0M2 52q12-8 24 0t24 0t24 0t24 0M2 64q12-8 24 0t24 0t24 0t24 0" stroke-width="1.6"/></svg>`;
    $("#postcard").innerHTML = `<div class="pc-fold">
      <div class="half l"><div class="frame"><div class="pad">
        <div class="pc-top">POST CARD</div>
        <p class="pc-hey">${S.intro.replace(/https?:\/\/(?:www\.)?([^\s/]+)\/?/g, (u, h) => `<a href="${u}" target="_blank" rel="noopener">${h}</a>`)}</p>
        <div class="badges">${badges}</div></div></div></div>
      <div class="half r"><div class="frame"><div class="pad">
        <div class="pc-stamp">${stampPC}</div>${mark}
        <div class="pc-addr"><div class="n">${S.name}</div><div class="r">${S.role}</div><div class="y">${S.badge}</div></div>
        <div class="fshade" style="position:absolute;inset:0;background:#000;opacity:0;pointer-events:none"></div>
        </div></div><div class="reverse"></div></div></div>
      <div class="pf-title" aria-hidden="true">${[..."PORTFOLIO"].map((c, i) => `<span style="--k:${i}">${c}</span>`).join("")}</div>`;
  })();

  /* ============================================================ RANSOM HEADING */
  const RL = [
    ["'Abril Fatface'", "#fff", "#111"], ["Bungee", "#2a5cc9", "#fff"], ["'Bebas Neue'", "#f5d90a", "#111"], ["'Bowlby One'", "#e0412b", "#fff"],
    ["'Rubik Mono One'", "#111", "#fff"], ["Shrikhand", "#f6ecd2", "#c0272d"], ["'Archivo Black'", "#2f8f5b", "#fff"], ["'DM Serif Display'", "#fff", "#2a5cc9"],
    ["'Source Serif 4'", "#e7d8ff", "#222"], ["Fraunces", "#ffb3c7", "#222"],
  ];
  const ransom = $("#ransom");
  "Selected work".split("").forEach((ch) => {
    const s = document.createElement("span");
    s.className = "rl" + (ch === " " ? " gap" : "");
    s.textContent = ch === " " ? "" : ch;
    ransom.appendChild(s);
  });
  const letters = $$(".rl:not(.gap)", ransom);
  function restyle(el) {
    const [f, bg, c] = RL[(Math.random() * RL.length) | 0];
    el.style.fontFamily = f; el.style.background = bg; el.style.color = c;
    el.style.transform = `rotate(${rand(-7, 7)}deg) translateY(${rand(-0.4, 0.4)}vmin) scale(${rand(0.92, 1.12)})`;
    el.style.textTransform = Math.random() > 0.5 ? "uppercase" : "none";
  }
  letters.forEach(restyle);
  let lastShuffle = 0;
  function shuffleSome(y) { if (Math.abs(y - lastShuffle) < 140) return; lastShuffle = y; for (let i = 0; i < 2; i++) restyle(letters[(Math.random() * letters.length) | 0]); }

  /* ============================================================ WORK STAMPS */
  const rowsEl = $("#rows");
  const layout = [[0, 1, 2], [3, 4, 5], [6, 7]];
  layout.forEach((idxs, ri) => {
    const row = document.createElement("div"); row.className = "row";
    idxs.forEach((wi, pos) => {
      const w = S.works[wi];
      const big = idxs.length === 3 ? pos === 1 : pos === 0;
      const el = document.createElement("div");
      el.className = "sw-wrap par" + (big ? " big" : "");
      el.dataset.k = big ? "-0.04" : "0.05";
      el.setAttribute("role", "link"); el.setAttribute("tabindex", "0"); el.setAttribute("aria-label", `${w.title} — ${w.kind}`);
      el.dataset.hint = "Click to view"; el.dataset.slug = w.slug;
      el.innerHTML = `<div class="sw-tilt">${A.stamp({ title: w.stampTitle, denom: w.denom, theme: w.theme, art: w.art, seed: wi + 2 })}</div>`;
      el.addEventListener("click", () => openCase(w.slug));
      el.addEventListener("keydown", (e) => { if (e.key === "Enter") openCase(w.slug); });
      row.appendChild(el);
    });
    rowsEl.appendChild(row);
  });


  /* ============================================================ NAV */
  (function nav() {
    const mini = (c, label, ic) => `<button class="st" type="button" data-go="${label.key}" style="--c:${c}"><span class="face2">${A.icon(ic, 26)}<span>${label.t}</span></span></button>`;
    $("#nav-sheet").innerHTML = [
      mini("#f6c320", { key: "hello", t: "Hello" }, "hello"), mini("#2f5be0", { key: "work", t: "Work" }, "work"),
      mini("#ff8fa3", { key: "write", t: "Write" }, "write"),
    ].join("");
    const mk = maskURL(60, 74, 8, 2.6);
    $$(".st").forEach((b) => b.style.setProperty("--mk", mk));
    $(".st:nth-child(2) .face2").style.color = "#fff";
    const logo = `<svg viewBox="0 0 56 68" xmlns="http://www.w3.org/2000/svg"><defs><mask id="lm"><rect width="56" height="68" fill="#fff"/><path fill-rule="evenodd" fill="#000" d="${perfPath(56, 68, 7, 2.3).replace("M0 0H56V68H0Z", "")}"/></mask></defs>
      <g mask="url(#lm)"><rect width="56" height="68" fill="#fbf7ee"/><rect x="5" y="5" width="46" height="58" fill="#eef3ff"/><path d="M12 44c6-12 10-22 14-14s2 18 8 6 6-10 10-4" fill="none" stroke="#2a56d6" stroke-width="2.4" stroke-linecap="round"/><text x="28" y="56" text-anchor="middle" font-family="Yellowtail,cursive" font-size="13" fill="#2a56d6">${S.first}</text></g></svg>`;
    $("#nav-open").innerHTML = logo;
    const root = $("#nav");
    const set = (v) => { root.classList.toggle("open-menu", v); $("#nav-open").setAttribute("aria-expanded", v); };
    $("#nav-open").onclick = (e) => { e.stopPropagation(); set(!root.classList.contains("open-menu")); };
    document.addEventListener("click", (e) => { if (!e.target.closest("#nav")) set(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") { set(false); closeWrite(); if (history.state && history.state.case) closeCase(); } });
    $$(".st", root).forEach((b) => b.addEventListener("click", () => { set(false); go(b.dataset.go); }));
  })();
  function go(k) {
    if (k === "write") return openWrite();
    const t = { hello: () => { const s = $("#about"); return s.offsetTop + (s.offsetHeight - vh()) * 0.62; }, work: () => $("#work").offsetTop }[k]();
    scrollTo({ top: t, behavior: reduce ? "auto" : "smooth" });
  }

  /* ---------- write modal ---------- */
  const wm = $("#write");
  function openWrite() { wm.classList.add("open"); wm.setAttribute("aria-hidden", "false"); setTimeout(() => $("#w-email").focus(), 250); }
  function closeWrite() { wm.classList.remove("open"); wm.setAttribute("aria-hidden", "true"); }
  $("#write-x").onclick = closeWrite; wm.addEventListener("click", (e) => { if (e.target === wm) closeWrite(); });
  $("#write-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const em = $("#w-email").value, msg = $("#w-msg").value;
    location.href = `mailto:${S.contact.email}?subject=${encodeURIComponent("Hello from your portfolio")}&body=${encodeURIComponent((msg || "Hi!") + "\n\nReply to: " + em)}`;
    closeWrite();
  });

  /* ============================================================ CASE STUDY */
  const cs = $("#case");
  function showCase(slug) {
    const w = S.works.find((x) => x.slug === slug); if (!w) return;
    const next = S.works[(S.works.indexOf(w) + 1) % S.works.length];
    const cta = w.link
      ? `<a class="c-cta" href="${w.link}" target="_blank" rel="noopener">Visit the live site ↗</a>`
      : w.repo
        ? `<a class="c-cta" href="${w.repo}" target="_blank" rel="noopener">View the code on GitHub ↗</a>`
        : ""; // no link or repo yet: no button
    const host = w.frameLabel || (w.link || "").replace(/^https?:\/\//, "").replace(/\/$/, "");
    const single = w.images && w.images.length === 1;
    const show = w.images && w.images.length ? `
      <div class="c-show${single ? " single" : ""}" style="${w.frameMax ? `max-width:${w.frameMax};margin-inline:auto` : ""}" role="region" aria-roledescription="carousel" aria-label="${w.title} screenshots">
        <${w.link ? `a class="bar" href="${w.link}" target="_blank" rel="noopener" aria-label="Open ${w.title}"` : 'div class="bar"'}><i></i><i></i><i></i><em>${host}</em></${w.link ? "a" : "div"}>
        <div class="slides" style="aspect-ratio:${w.aspect || "4 / 3"}">${w.images.map((src, i) => `<figure class="slide${i === 0 ? " on" : ""}"><img src="${src}" alt="${w.title}: ${w.captions[i]}" ${i < 2 ? "" : 'loading="lazy"'}></figure>`).join("")}
          <button class="arr prev" type="button" aria-label="Previous screenshot">‹</button><button class="arr next" type="button" aria-label="Next screenshot">›</button>
          <i class="prog"></i></div>
        <div class="capbar"><span class="cap">${w.captions[0]}</span><span class="dots">${w.images.map((_, i) => `<button type="button" aria-label="Screenshot ${i + 1}"${i === 0 ? ' class="on"' : ""}></button>`).join("")}</span></div>
      </div>` : "";
    const stats = w.stats ? `<div class="c-stats">${w.stats.map(([v, l]) => `<div><b>${v}</b><span>${l}</span></div>`).join("")}</div>` : "";
    const body = w.body ? `<div class="c-body">${w.body.map((p) => `<p>${p}</p>`).join("")}</div>` : "";
    const flow = w.flow ? `<div class="c-flow"><h3>How it works</h3><ol>${w.flow.map(([t, d]) => `<li><b>${t}</b><p>${d}</p></li>`).join("")}</ol></div>` : "";
    $("#case-body").innerHTML = `<div class="c-head"><div>${w.badge ? `<span class="c-badge">${w.badge}</span>` : ""}<h1>${w.title}</h1><p>${w.blurb}</p>${cta}</div>
      <div class="stampbox">${A.stamp({ title: w.stampTitle, denom: w.denom, theme: w.theme, art: w.art, seed: 4 })}</div></div>
      <div class="c-meta">${w.meta.map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join("")}</div>
      ${show}${stats}${body}${flow}
      <div class="c-hl"><span>${w.images && w.images.length ? "Highlights" : "Key features"}</span>${w.highlights.map((h) => `<b>${h}</b>`).join("")}</div>
      <button class="c-next" type="button" data-next="${next.slug}">Next project: ${next.title} →</button>`;
    $(".c-next", cs).onclick = () => { history.replaceState({ case: next.slug }, "", "#/work/" + next.slug); showCase(next.slug); };
    clearInterval(showTimer);
    if (w.images && w.images.length > 1) startShow($(".c-show", cs), w);
    cs.classList.add("open"); cs.setAttribute("aria-hidden", "false"); cs.scrollTop = 0; $("#case-back").focus({ preventScroll: true });
  }
  /* ---------- automatic screenshot slideshow ---------- */
  const SLIDE_MS = 3600;
  let showTimer = null;
  function startShow(root, w) {
    clearInterval(showTimer);
    const slides = $$(".slide", root), dots = $$(".dots button", root), cap = $(".cap", root), prog = $(".prog", root), box = $(".slides", root);
    let i = 0, paused = false, vis = true;
    const go = (n, manual) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("on", k === i));
      dots.forEach((d, k) => d.classList.toggle("on", k === i));
      cap.textContent = w.captions[i];
      prog.classList.remove("run"); void prog.offsetWidth; if (!paused && !reduce) prog.classList.add("run");
      if (manual) tick = 0;
    };
    let tick = 0;
    $(".prev", root).onclick = () => go(i - 1, true);
    $(".next", root).onclick = () => go(i + 1, true);
    dots.forEach((d, k) => (d.onclick = () => go(k, true)));
    const pause = (v) => { paused = v; prog.style.animationPlayState = v ? "paused" : "running"; };
    box.addEventListener("pointerenter", () => pause(true)); box.addEventListener("pointerleave", () => pause(false));
    root.addEventListener("focusin", () => pause(true)); root.addEventListener("focusout", () => pause(false));
    let sx = 0; box.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; pause(true); }, { passive: true });
    box.addEventListener("touchend", (e) => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1), true); pause(false); });
    new IntersectionObserver(([e]) => { vis = e.isIntersecting; }, { root: cs, threshold: 0.2 }).observe(box);
    prog.style.setProperty("--ms", SLIDE_MS + "ms");
    go(0);
    // advance by elapsed time so pausing/hover simply holds the current slide
    let last = performance.now();
    showTimer = setInterval(() => {
      const now = performance.now(), dt = now - last; last = now;
      if (paused || !vis || document.hidden || !cs.classList.contains("open")) return;
      tick += dt; if (tick >= SLIDE_MS) { tick = 0; go(i + 1); }
    }, 120);
  }
  function hideCase() { clearInterval(showTimer); cs.classList.remove("open"); cs.setAttribute("aria-hidden", "true"); }
  function openCase(slug) { history.pushState({ case: slug }, "", "#/work/" + slug); showCase(slug); }
  function closeCase() { if (history.state && history.state.case) history.back(); else hideCase(); }
  $("#case-back").onclick = closeCase;
  addEventListener("popstate", () => { const s = history.state; if (s && s.case) showCase(s.case); else hideCase(); });
  cs.addEventListener("click", (e) => { if (e.target === cs) closeCase(); });

  /* ============================================================ SOUND */
  let ac, master, soundOn = false, birdTimer;
  function toggleSound() {
    soundOn = !soundOn;
    $("#sound").classList.toggle("playing", soundOn); $("#sound").setAttribute("aria-pressed", soundOn);
    if (!ac) {
      const C = window.AudioContext || window.webkitAudioContext; if (!C) return;
      ac = new C(); master = ac.createGain(); master.gain.value = 0; master.connect(ac.destination);
      const len = ac.sampleRate * 4, buf = ac.createBuffer(1, len, ac.sampleRate), d = buf.getChannelData(0); let b0 = 0;
      for (let i = 0; i < len; i++) { const wn = Math.random() * 2 - 1; b0 = 0.985 * b0 + 0.015 * wn; d[i] = b0 * 9; }
      const src = ac.createBufferSource(); src.buffer = buf; src.loop = true;
      const lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 520;
      const g = ac.createGain(); g.gain.value = 0.22;
      const lfo = ac.createOscillator(), lg = ac.createGain(); lfo.frequency.value = 0.12; lg.gain.value = 0.12; lfo.connect(lg); lg.connect(g.gain); lfo.start();
      src.connect(lp); lp.connect(g); g.connect(master); src.start();
    }
    ac.resume && ac.resume();
    master.gain.cancelScheduledValues(ac.currentTime); master.gain.linearRampToValueAtTime(soundOn ? 0.5 : 0, ac.currentTime + 0.6);
    clearTimeout(birdTimer);
    const bird = () => {
      if (!soundOn) return;
      const t = ac.currentTime, n = 2 + ((Math.random() * 4) | 0), base = rand(2200, 3800);
      for (let i = 0; i < n; i++) {
        const o = ac.createOscillator(), g = ac.createGain(), s = t + i * 0.13;
        o.type = "sine"; o.frequency.setValueAtTime(base, s); o.frequency.exponentialRampToValueAtTime(base * rand(1.2, 1.6), s + 0.09);
        g.gain.setValueAtTime(0, s); g.gain.linearRampToValueAtTime(0.07, s + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, s + 0.11);
        o.connect(g); g.connect(master); o.start(s); o.stop(s + 0.14);
      }
      birdTimer = setTimeout(bird, rand(1800, 5200));
    };
    if (soundOn) birdTimer = setTimeout(bird, 600);
  }
  $("#sound").onclick = toggleSound;

  /* ============================================================ BUTTERFLIES + LEAVES */
  const fx = $("#fx");
  const bfs = [0, 1].map((i) => {
    const el = document.createElement("div"); el.className = "bf"; el.innerHTML = A.props.butterfly();
    el.querySelector(".wr").style.animationDelay = "-.05s"; el.style.opacity = 0; fx.appendChild(el);
    return { el, x: rand(0.2, 0.8) * innerWidth, y: rand(0.2, 0.7) * vh(), tx: 0, ty: 0, a: 0, t: 0 };
  });
  const lvs = [0, 1, 2].map((i) => {
    const el = document.createElement("div"); el.className = "lf"; el.innerHTML = A.props.leaf(); fx.appendChild(el);
    return { el, x: 0, y: -999, vx: 0, vy: 0, r: 0, vr: 0, w: rand(0, 6), delay: i * 4 + 3, life: 0 };
  });
  function resetLeaf(l) { l.x = rand(0, innerWidth); l.y = -80; l.vx = rand(-0.2, 0.5); l.vy = rand(0.7, 1.3); l.r = rand(0, 360); l.vr = rand(-1, 1); l.s = rand(0.7, 1.2); }
  lvs.forEach(resetLeaf);
  let mouse = { x: innerWidth / 2, y: vh() / 2 };

  /* ============================================================ HINTS / CURSOR */
  const hint = $("#cursorhint");
  addEventListener("pointermove", (e) => {
    mouse.x = e.clientX; mouse.y = e.clientY;
    if (!fine) return;
    const h = e.target.closest && e.target.closest("[data-hint]");
    if (h && !cs.classList.contains("open")) { hint.textContent = h.dataset.hint; hint.classList.add("on"); hint.style.transform = `translate(${e.clientX + 16}px,${e.clientY + 18}px)`; }
    else hint.classList.remove("on");
  });

  /* ============================================================ SCROLL ENGINE */
  let pars = [], aboutTop = 0, aboutH = 0, sy = 0, vel = 0;
  function measure() {
    pars = $$(".par").map((el) => {
      const keep = el.style.transform; el.style.transform = "";
      let y = 0, n = el; while (n && n !== document.body) { y += n.offsetTop; n = n.offsetParent; }
      el.style.transform = keep;
      return { el, cy: y + el.offsetHeight / 2, k: +el.dataset.k || 0, r: +el.dataset.r || 0, rot: +el.dataset.rot || 0 };
    });
    const a = $("#about"); aboutTop = a.offsetTop; aboutH = a.offsetHeight;
  }
  addEventListener("load", () => { measure(); setTimeout(measure, 600); });
  addEventListener("resize", () => { measure(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);

  const pc = $("#postcard"), rhalf = $(".half.r"), rShade = $(".fshade");
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.18 });
  $$(".sw-wrap").forEach((el) => io.observe(el));

  function frame() {
    const prev = sy; sy += (scrollY - sy) * (reduce ? 1 : 0.16); vel = sy - prev;
    const H = vh();

    for (const p of pars) {
      const d = sy + H / 2 - p.cy;
      if (Math.abs(d) > H * 2.2) continue;
      const tilt = p.el.classList.contains("sw-wrap") ? 0 : 0;
      p.el.style.transform = `translate3d(0,${(d * p.k).toFixed(1)}px,0) rotate(${(p.rot + d * p.r + tilt).toFixed(2)}deg)`;
    }

    /* stamps lean into the scroll */
    const lean = clamp(vel * 0.35, -6, 6);
    $$(".sw-tilt").forEach((t, i) => { if (!t.matches(":hover")) t.style.transform = `rotate(${(lean * (i % 2 ? -1 : 1)).toFixed(2)}deg)`; });

    /* postcard unfold */
    const p = (sy - aboutTop) / (aboutH - H);              // 0..1 while pinned
    const enter = clamp((sy - (aboutTop - H)) / H);         // 0..1 sliding in
    const f = ease(clamp((p - 0.04) / 0.42));
    const ang = 180 * (1 - f);
    const exit = clamp((p - 0.82) / 0.18);
    const pw = pc.offsetWidth;
    pc.style.transform = `translate(-50%,-50%) translateX(${(pw * 0.25 * (1 - f)).toFixed(1)}px) rotate(${(lerp(7, 0, ease(enter)) - exit * 5).toFixed(2)}deg) scale(${(1 - exit * 0.06).toFixed(3)})`;
    rhalf.style.transform = `rotateY(${ang.toFixed(1)}deg)`;
    rhalf.style.visibility = ang > 176 ? "hidden" : "visible";
    pc.style.setProperty("--f", f.toFixed(3)); // drives the PORTFOLIO letters
    rShade.style.opacity = (Math.sin((ang * Math.PI) / 180) * 0.42).toFixed(3);

    /* sticky ransom heading shuffle */
    shuffleSome(sy);

    /* UI that reacts to scroll */
    if (sy > 40) $("#more").classList.remove("on");
    requestAnimationFrame(frame);
  }

  /* butterflies + leaves tick */
  let lt = 0;
  function life(now) {
    const dt = Math.min(2, (now - lt) / 16.7 || 1); lt = now;
    for (const b of bfs) {
      b.t -= dt;
      if (b.t <= 0) {
        b.t = rand(70, 160);
        if (Math.random() < 0.35 && fine) { b.tx = mouse.x + rand(-120, 120); b.ty = mouse.y + rand(-120, 120); }
        else { b.tx = rand(0.08, 0.92) * innerWidth; b.ty = rand(0.1, 0.85) * vh(); }
      }
      const dx = b.tx - b.x, dy = b.ty - b.y, dist = Math.hypot(dx, dy) || 1;
      const sp = Math.min(3.2, dist * 0.02 + 1.1) * dt;
      b.x += (dx / dist) * sp + Math.sin(now / 260 + b.t) * 0.9; b.y += (dy / dist) * sp + Math.cos(now / 210) * 0.9;
      const ta = (Math.atan2(dy, dx) * 180) / Math.PI + 90; let da = ((ta - b.a + 540) % 360) - 180; b.a += da * 0.08;
      b.el.style.transform = `translate3d(${b.x}px,${b.y}px,0) rotate(${b.a}deg)`;
    }
    for (const l of lvs) {
      if (l.delay > 0) { l.delay -= dt / 60; continue; }
      l.w += 0.02 * dt; l.x += (l.vx + Math.sin(l.w) * 0.9) * dt; l.y += l.vy * dt; l.r += l.vr * dt;
      if (l.y > vh() + 80) { resetLeaf(l); l.delay = rand(4, 12); }
      l.el.style.transform = `translate3d(${l.x}px,${l.y}px,0) rotate(${l.r}deg) scale(${l.s})`;
    }
    requestAnimationFrame(life);
  }

  /* ============================================================ INTRO */
  const intro = $("#intro"), fl = $("#ifloat");
  const showStamp = (i) => { const w = S.works[i % S.works.length]; fl.innerHTML = A.stamp({ title: w.stampTitle, denom: w.denom, theme: w.theme, art: w.art, seed: i + 2 }); };
  const order = [3, 1, 0, 6];
  let step = 0, introTimer, done = false;
  showStamp(order[0]);

  /* the laptop types its code out, then starts over */
  const laptops = $$(".lp");
  function startTyping() {
    const run = () => laptops.forEach((l) => { l.classList.remove("type"); void l.offsetWidth; if (!reduce) l.classList.add("type"); });
    setTimeout(run, 900); setInterval(run, 16000);
  }

  function enter() {
    if (done) return; done = true; clearInterval(introTimer);
    intro.classList.add("leaving");
    document.body.classList.remove("lock"); scrollTo(0, 0);
    setTimeout(() => {
      document.body.classList.add("ready"); intro.classList.add("gone");
      $("#pol1").classList.add("enter");
      videos.forEach((v) => { try { v.currentTime = 0; v.play().catch(() => {}); } catch (_) {} });
      const [a, b, c] = $$("#pol1 .scrib span"); setTimeout(() => a.classList.add("on"), 500); setTimeout(() => b.classList.add("on"), 1100); setTimeout(() => c.classList.add("on"), 3000);
      ["#minimal", "#nav", "#sound"].forEach((s) => $(s).classList.add("on"));
      startTyping();
      setTimeout(() => { if (scrollY < 40) $("#more").classList.add("on"); }, 4200);
    }, 650);
  }
  if (location.hash.startsWith("#/work/")) {
    history.replaceState({ case: location.hash.slice(7) }, "", location.hash);
    intro.classList.add("gone"); document.body.classList.remove("lock"); document.body.classList.add("ready"); done = true;
    ["#minimal", "#nav", "#sound"].forEach((s) => $(s).classList.add("on")); videos.forEach((v) => v.play().catch(() => {}));
    $$("#pol1 .scrib span").forEach((s) => s.classList.add("on"));
    startTyping();
    setTimeout(() => showCase(location.hash.slice(7)), 100);
  } else {
    introTimer = setInterval(() => {
      step++;
      if (step >= order.length) return enter();
      fl.classList.add("flip");
      setTimeout(() => showStamp(order[step]), 330);
      setTimeout(() => fl.classList.remove("flip"), 720);
    }, 1050);
    $("#skip").onclick = enter; intro.addEventListener("click", enter);
  }

  /* videos only play while visible */
  const vio = new IntersectionObserver((es) => es.forEach((e) => { const v = e.target.querySelector("video"); if (!v || !done) return; e.isIntersecting ? v.play().catch(() => {}) : v.pause(); }), { threshold: 0.05 });
  vio.observe($("#pol1")); vio.observe($("#pol2"));
  new IntersectionObserver(([e], o) => { if (e.isIntersecting && done) { $$("#pol2 .scrib span").forEach((s, i) => setTimeout(() => s.classList.add("on"), 400 + i * 700)); o.disconnect(); } }, { threshold: 0.4 }).observe($("#pol2"));

  /* readable copy for search engines + screen readers */
  $("#copy").innerHTML = `<h1>${S.name}</h1><p>${S.role}. ${S.status}</p><p>${S.intro}</p><h2>Selected work</h2><ul>${S.works.map((w) => `<li>${w.title} — ${w.kind}. ${w.blurb} ${w.link || w.repo ? `<a href="${w.link || w.repo}">${w.link || w.repo}</a>` : ""}</li>`).join("")}</ul><h2>Get in touch</h2><p><a href="mailto:${S.contact.email}">${S.contact.email}</a> · <a href="tel:${S.contact.phoneLink}">${S.contact.phone}</a></p>`;

  measure();
  requestAnimationFrame(frame);
  if (!reduce) requestAnimationFrame(life);
  setTimeout(() => bfs.forEach((b) => (b.el.style.opacity = 1)), 5000);
})();
