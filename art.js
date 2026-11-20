/* Original vector artwork: stamps, picnic props, icons. */
(function () {
  let _id = 0;
  const uid = (p = "a") => p + ++_id;

  /* ---------------------------------------------------------------- STAMPS */
  const motifs = {
    brain: (i) => {
      const L = [[52, [40, 70, 100]], [96, [28, 55, 82, 110]], [140, [40, 70, 100]], [184, [55, 85]]];
      let s = `<path d="M0 108 Q40 78 90 98 T170 88 T248 104 V139 H0Z" fill="${i}" opacity=".5"/>`;
      s += `<circle cx="196" cy="34" r="18" fill="none" stroke="${i}" stroke-width="2.4"/>` +
        [...Array(12)].map((_, k) => { const a = k * Math.PI / 6; return `<line x1="${196 + Math.cos(a) * 23}" y1="${34 + Math.sin(a) * 23}" x2="${196 + Math.cos(a) * 31}" y2="${34 + Math.sin(a) * 31}" stroke="${i}" stroke-width="2"/>`; }).join("");
      for (let a = 0; a < L.length - 1; a++) for (const y1 of L[a][1]) for (const y2 of L[a + 1][1])
        s += `<line x1="${L[a][0]}" y1="${y1}" x2="${L[a + 1][0]}" y2="${y2}" stroke="${i}" stroke-width="1.1" opacity=".7"/>`;
      for (const [x, ys] of L) for (const y of ys) s += `<circle cx="${x}" cy="${y}" r="6" fill="#efe6cf" stroke="${i}" stroke-width="2.2"/>`;
      return s;
    },
    chat: (i) => `
      <path d="M0 112 H248 V139 H0Z" fill="${i}" opacity=".55"/>
      <rect x="40" y="96" width="168" height="12" fill="#efe6cf" stroke="${i}" stroke-width="2"/>
      <rect x="52" y="84" width="150" height="12" fill="#efe6cf" stroke="${i}" stroke-width="2"/>
      <rect x="22" y="22" width="120" height="48" rx="12" fill="#efe6cf" stroke="${i}" stroke-width="2.6"/>
      <path d="M44 70 L40 88 L62 70Z" fill="#efe6cf" stroke="${i}" stroke-width="2.6" stroke-linejoin="round"/>
      <line x1="38" y1="40" x2="124" y2="40" stroke="${i}" stroke-width="3"/><line x1="38" y1="54" x2="100" y2="54" stroke="${i}" stroke-width="3"/>
      <rect x="116" y="46" width="112" height="42" rx="12" fill="${i}" opacity=".85"/>
      <path d="M200 88 L206 100 L184 88Z" fill="${i}" opacity=".85"/>
      <line x1="130" y1="60" x2="212" y2="60" stroke="#efe6cf" stroke-width="3"/><line x1="130" y1="73" x2="188" y2="73" stroke="#efe6cf" stroke-width="3"/>`,
    leaf: (i) => `
      <path d="M0 96 Q60 80 124 92 T248 88 V139 H0Z" fill="${i}" opacity=".35"/>
      ${[0, 1, 2, 3, 4, 5].map((k) => `<path d="M${-10 + k * 8} 139 L${112 + k * 4} 96" stroke="${i}" stroke-width="1.4" opacity=".6"/><path d="M${258 - k * 8} 139 L${136 - k * 4} 96" stroke="${i}" stroke-width="1.4" opacity=".6"/>`).join("")}
      <path d="M124 124 C60 100 66 36 124 12 C182 36 188 100 124 124Z" fill="#efe6cf" stroke="${i}" stroke-width="3"/>
      <path d="M124 122 V16" stroke="${i}" stroke-width="2.4"/>
      ${[34, 52, 70, 88].map((y) => `<path d="M124 ${y + 14} Q104 ${y + 8} 90 ${y - 4}" stroke="${i}" stroke-width="1.8" fill="none"/><path d="M124 ${y + 14} Q144 ${y + 8} 158 ${y - 4}" stroke="${i}" stroke-width="1.8" fill="none"/>`).join("")}
      <circle cx="148" cy="70" r="6" fill="${i}" opacity=".7"/><circle cx="100" cy="82" r="4.5" fill="${i}" opacity=".7"/>`,
    mic: (i) => `
      <path d="M0 108 Q60 90 124 104 T248 100 V139 H0Z" fill="${i}" opacity=".45"/>
      <rect x="104" y="18" width="40" height="64" rx="20" fill="#efe6cf" stroke="${i}" stroke-width="3"/>
      ${[30, 40, 50, 60, 70].map((y) => `<line x1="108" y1="${y}" x2="140" y2="${y}" stroke="${i}" stroke-width="1.6"/>`).join("")}
      <path d="M88 62 Q88 100 124 100 Q160 100 160 62" fill="none" stroke="${i}" stroke-width="3.2"/>
      <line x1="124" y1="100" x2="124" y2="122" stroke="${i}" stroke-width="3.2"/><line x1="100" y1="124" x2="148" y2="124" stroke="${i}" stroke-width="3.6"/>
      ${[1, 2, 3].map((k) => `<path d="M${72 - k * 15} ${50 - k * 6} Q${64 - k * 15} 54 ${72 - k * 15} ${58 + k * 6}" fill="none" stroke="${i}" stroke-width="2.4"/><path d="M${176 + k * 15} ${50 - k * 6} Q${184 + k * 15} 54 ${176 + k * 15} ${58 + k * 6}" fill="none" stroke="${i}" stroke-width="2.4"/>`).join("")}`,
    eye: (i) => `
      <path d="M0 112 H248 V139 H0Z" fill="${i}" opacity=".4"/>
      <path d="M30 70 Q124 -2 218 70 Q124 140 30 70Z" fill="#efe6cf" stroke="${i}" stroke-width="3.2"/>
      <circle cx="124" cy="70" r="30" fill="${i}" opacity=".9"/><circle cx="124" cy="70" r="14" fill="#1a1612"/><circle cx="114" cy="60" r="5" fill="#efe6cf"/>
      <path d="M16 28 V14 H30 M232 14 H218 M16 112 V126 H30 M232 126 H218 M232 28 V14 M232 112 V126" fill="none" stroke="${i}" stroke-width="2.6"/>
      ${[0, 1, 2, 3, 4, 5, 6].map((k) => `<line x1="${22 + k * 33}" y1="6" x2="${22 + k * 33}" y2="133" stroke="${i}" stroke-width=".8" opacity=".35"/>`).join("")}`,
    road: (i) => `
      <path d="M0 62 L40 34 L66 52 L98 24 L124 46 L150 28 L190 56 L222 36 L248 54 V74 H0Z" fill="${i}" opacity=".5"/>
      <circle cx="198" cy="20" r="12" fill="none" stroke="${i}" stroke-width="2.4"/>
      <path d="M112 72 L136 72 L236 139 H12Z" fill="#efe6cf" stroke="${i}" stroke-width="2.6" stroke-linejoin="round"/>
      ${[[124, 82, 3], [124, 96, 5], [124, 114, 8]].map(([x, y, w]) => `<rect x="${x - w / 2}" y="${y}" width="${w}" height="${w * 2.2}" fill="${i}"/>`).join("")}
      <rect x="100" y="100" width="22" height="12" rx="3" fill="${i}"/><rect x="104" y="96" width="14" height="6" rx="2" fill="${i}" opacity=".7"/>
      <rect x="148" y="112" width="30" height="16" rx="4" fill="${i}"/><rect x="153" y="106" width="20" height="8" rx="2" fill="${i}" opacity=".7"/>
      <path d="M0 72 H248" stroke="${i}" stroke-width="1.6"/>`,
    robot: (i) => `
      <path d="M0 114 H248 V139 H0Z" fill="${i}" opacity=".45"/>
      <line x1="124" y1="10" x2="124" y2="28" stroke="${i}" stroke-width="3"/><circle cx="124" cy="10" r="5" fill="${i}"/>
      <rect x="70" y="28" width="108" height="84" rx="16" fill="#efe6cf" stroke="${i}" stroke-width="3.2"/>
      <rect x="56" y="54" width="14" height="30" rx="5" fill="${i}"/><rect x="178" y="54" width="14" height="30" rx="5" fill="${i}"/>
      <circle cx="102" cy="62" r="11" fill="${i}"/><circle cx="146" cy="62" r="11" fill="${i}"/><circle cx="105" cy="59" r="3.5" fill="#efe6cf"/><circle cx="149" cy="59" r="3.5" fill="#efe6cf"/>
      ${[0, 1, 2, 3, 4].map((k) => `<line x1="${100 + k * 12}" y1="88" x2="${100 + k * 12}" y2="100" stroke="${i}" stroke-width="2.6"/>`).join("")}
      <path d="M26 36 l4 8 8 4 -8 4 -4 8 -4 -8 -8 -4 8 -4z" fill="${i}"/><path d="M212 90 l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3z" fill="${i}"/>`,
    book: (i) => `
      <path d="M0 112 H248 V139 H0Z" fill="${i}" opacity=".4"/>
      ${[...Array(9)].map((_, k) => { const a = Math.PI + (k + 0.5) * Math.PI / 9; return `<line x1="${124 + Math.cos(a) * 34}" y1="${96 + Math.sin(a) * 34}" x2="${124 + Math.cos(a) * 80}" y2="${96 + Math.sin(a) * 80}" stroke="${i}" stroke-width="2" opacity=".7"/>`; }).join("")}
      <path d="M124 112 Q84 96 30 104 V58 Q84 50 124 66Z" fill="#efe6cf" stroke="${i}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M124 112 Q164 96 218 104 V58 Q164 50 124 66Z" fill="#efe6cf" stroke="${i}" stroke-width="3" stroke-linejoin="round"/>
      ${[70, 80, 90].map((y, k) => `<path d="M42 ${y - 1 + k} Q84 ${y - 8} 114 ${y + 6}" fill="none" stroke="${i}" stroke-width="1.6"/><path d="M206 ${y - 1 + k} Q164 ${y - 8} 134 ${y + 6}" fill="none" stroke="${i}" stroke-width="1.6"/>`).join("")}
      <path d="M26 112 Q124 120 222 112" fill="none" stroke="${i}" stroke-width="3"/>`,
  };

  const rays = (i, cx, cy, n, r1, r2) => [...Array(n)].map((_, k) => { const a = (k * 2 * Math.PI) / n; return `<line x1="${cx + Math.cos(a) * r1}" y1="${cy + Math.sin(a) * r1}" x2="${cx + Math.cos(a) * r2}" y2="${cy + Math.sin(a) * r2}" stroke="${i}" stroke-width="1.6" opacity=".45"/>`; }).join("");
  const hex = (cx, cy, r) => [...Array(6)].map((_, k) => { const a = (Math.PI / 180) * (30 + 60 * k); return `${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`; }).join(" ");
  Object.assign(motifs, {
    shield: (i) => `
      <path d="M0 114 H248 V139 H0Z" fill="${i}" opacity=".4"/>${rays(i, 124, 66, 22, 58, 130)}
      ${[[30, 44, 66, 54], [30, 92, 66, 84], [218, 44, 182, 54], [218, 92, 182, 84]].map(([x, y, x2, y2]) => `<line x1="${x}" y1="${y}" x2="${x2}" y2="${y2}" stroke="${i}" stroke-width="1.8"/><circle cx="${x}" cy="${y}" r="6" fill="#efe6cf" stroke="${i}" stroke-width="2.4"/>`).join("")}
      <path d="M124 10 L188 30 V66 C188 98 160 116 124 128 C88 116 60 98 60 66 V30Z" fill="#efe6cf" stroke="${i}" stroke-width="3.2" stroke-linejoin="round"/>
      <path d="M124 22 L176 38 V66 C176 92 153 106 124 117 C95 106 72 92 72 66 V38Z" fill="none" stroke="${i}" stroke-width="1.6" opacity=".55"/>
      <circle cx="124" cy="62" r="12" fill="${i}"/><path d="M118 68 h12 l4 24 h-20z" fill="${i}"/><circle cx="124" cy="62" r="4.5" fill="#efe6cf"/>`,
    gate: (i) => `
      <path d="M0 112 H248 V139 H0Z" fill="${i}" opacity=".42"/><path d="M0 112 H248" stroke="${i}" stroke-width="2"/>
      <rect x="16" y="72" width="116" height="36" rx="5" fill="#efe6cf" stroke="${i}" stroke-width="3.2"/>
      <rect x="16" y="72" width="13" height="36" rx="5" fill="${i}"/><circle cx="22.5" cy="90" r="3.2" fill="#efe6cf"/>
      <text x="80" y="95" text-anchor="middle" textLength="92" lengthAdjust="spacingAndGlyphs" font-family="'Archivo Black',Geist,sans-serif" font-size="14" fill="${i}">KL 09 AB 4821</text>
      <rect x="196" y="62" width="20" height="50" fill="${i}"/><rect x="190" y="106" width="32" height="8" fill="${i}"/>
      <circle cx="206" cy="74" r="4" fill="#efe6cf"/><circle cx="206" cy="88" r="4" fill="#efe6cf"/>
      <g transform="rotate(34 206 60)"><rect x="106" y="54" width="100" height="12" rx="2" fill="#efe6cf" stroke="${i}" stroke-width="2.8"/>${[0, 1, 2, 3, 4].map((k) => `<rect x="${118 + k * 18}" y="54" width="9" height="12" fill="${i}"/>`).join("")}</g>
      ${[1, 2, 3].map((k) => `<path d="M${176 - k * 0} ${86 - k * 0}" fill="none"/>`).join("")}
      <path d="M150 62 q10 8 0 18 M160 56 q16 14 0 30" fill="none" stroke="${i}" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M20 30 h40 M20 40 h26" stroke="${i}" stroke-width="3" stroke-linecap="round" opacity=".5"/>`,
    dumbbell: (i) => `
      <path d="M0 112 H248 V139 H0Z" fill="${i}" opacity=".4"/>${rays(i, 124, 70, 24, 46, 120)}
      <rect x="58" y="62" width="132" height="15" fill="#efe6cf" stroke="${i}" stroke-width="3"/>
      ${[0, 1, 2, 3, 4, 5].map((k) => `<line x1="${86 + k * 8}" y1="62" x2="${86 + k * 8}" y2="77" stroke="${i}" stroke-width="1.2"/>`).join("")}
      <rect x="44" y="44" width="14" height="51" rx="3" fill="#efe6cf" stroke="${i}" stroke-width="3"/><rect x="190" y="44" width="14" height="51" rx="3" fill="#efe6cf" stroke="${i}" stroke-width="3"/>
      <rect x="26" y="30" width="18" height="79" rx="4" fill="${i}"/><rect x="204" y="30" width="18" height="79" rx="4" fill="${i}"/>
      <rect x="14" y="54" width="12" height="31" rx="3" fill="#efe6cf" stroke="${i}" stroke-width="3"/><rect x="222" y="54" width="12" height="31" rx="3" fill="#efe6cf" stroke="${i}" stroke-width="3"/>`,
    flask: (i) => `
      <path d="M0 112 H248 V139 H0Z" fill="${i}" opacity=".4"/>${rays(i, 124, 84, 20, 62, 130)}
      <rect x="110" y="10" width="28" height="16" fill="${i}"/><rect x="113" y="26" width="22" height="28" fill="#efe6cf" stroke="${i}" stroke-width="3"/>
      <path d="M113 54 L66 108 Q60 120 74 120 H174 Q188 120 182 108 L135 54Z" fill="#efe6cf" stroke="${i}" stroke-width="3.2" stroke-linejoin="round"/>
      <path d="M82 96 H166 L180 112 Q184 118 176 118 H72 Q64 118 68 112Z" fill="${i}" opacity=".8"/>
      <circle cx="108" cy="82" r="4" fill="none" stroke="${i}" stroke-width="2"/><circle cx="130" cy="72" r="3" fill="none" stroke="${i}" stroke-width="2"/><circle cx="144" cy="86" r="5" fill="none" stroke="${i}" stroke-width="2"/>
      <path d="M190 40 q10 -10 0 -20 M206 46 q12 -12 0 -24" fill="none" stroke="${i}" stroke-width="2.2" stroke-linecap="round"/>`,
    heart: (i) => `
      <path d="M0 114 H248 V139 H0Z" fill="${i}" opacity=".4"/>${rays(i, 124, 66, 22, 54, 130)}
      <path d="M124 116 C34 62 64 8 100 18 C114 22 121 33 124 42 C127 33 134 22 148 18 C184 8 214 62 124 116Z" fill="#efe6cf" stroke="${i}" stroke-width="3.2" stroke-linejoin="round"/>
      ${[16, 28, 40].map((r) => `<path d="M${124 - r} 62 Q124 ${40 - r / 3} ${124 + r} 62" fill="none" stroke="${i}" stroke-width="1.5" opacity=".6"/>`).join("")}
      <path d="M44 34 l4 9 9 4 -9 4 -4 9 -4 -9 -9 -4 9 -4z" fill="${i}"/><path d="M204 96 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z" fill="${i}"/><path d="M208 30 q4-8 10 0 q6 8 -10 18 q-16 -10 0 -18z" fill="${i}" opacity=".8"/>`,
    dome: (i) => `
      <path d="M0 112 H248 V139 H0Z" fill="${i}" opacity=".45"/>${rays(i, 124, 40, 18, 52, 130)}
      <rect x="30" y="102" width="188" height="10" fill="#efe6cf" stroke="${i}" stroke-width="2.6"/><rect x="42" y="94" width="164" height="8" fill="#efe6cf" stroke="${i}" stroke-width="2.6"/>
      <rect x="82" y="64" width="84" height="30" fill="#efe6cf" stroke="${i}" stroke-width="3"/>
      <path d="M86 64 C80 14 168 14 162 64Z" fill="#efe6cf" stroke="${i}" stroke-width="3.2"/><line x1="124" y1="26" x2="124" y2="8" stroke="${i}" stroke-width="3"/><circle cx="124" cy="7" r="3" fill="${i}"/>
      <path d="M112 94 V80 Q124 62 136 80 V94Z" fill="${i}"/>
      ${[48, 200].map((x) => `<rect x="${x - 6}" y="46" width="12" height="48" fill="#efe6cf" stroke="${i}" stroke-width="2.6"/><path d="M${x - 8} 46 Q${x} 26 ${x + 8} 46Z" fill="#efe6cf" stroke="${i}" stroke-width="2.6"/>`).join("")}
      ${[66, 182].map((x) => `<rect x="${x - 4}" y="64" width="8" height="30" fill="#efe6cf" stroke="${i}" stroke-width="2.2"/>`).join("")}`,
    hive: (i) => `
      <path d="M0 114 H248 V139 H0Z" fill="${i}" opacity=".4"/>
      ${[[0, 0], [38, 0], [-38, 0], [19, 33], [-19, 33], [19, -33], [-19, -33]].map(([dx, dy], k) => `<polygon points="${hex(124 + dx, 66 + dy, 21)}" fill="${k === 0 ? i : "#efe6cf"}" stroke="${i}" stroke-width="3" stroke-linejoin="round" ${k === 0 ? 'opacity=".85"' : ""}/>`).join("")}
      <g transform="translate(176 24) rotate(-18)"><ellipse cx="0" cy="0" rx="17" ry="11" fill="#efe6cf" stroke="${i}" stroke-width="2.8"/><path d="M-5 -10 V10 M3 -10 V10 M10 -8 V8" stroke="${i}" stroke-width="3.4"/>
      <ellipse cx="-4" cy="-14" rx="9" ry="6" fill="#efe6cf" stroke="${i}" stroke-width="2" transform="rotate(-20 -4 -14)"/><circle cx="-14" cy="-1" r="5" fill="${i}"/></g>
      <path d="M40 24 q10 -6 20 0 t20 0" fill="none" stroke="${i}" stroke-width="2" stroke-dasharray="3 4"/>`,
  });

  function stamp(opts, size) {
    const { title, denom, theme: t, art, seed = 1 } = opts;
    const id = uid("s");
    const W = 300, H = 225, step = 15, rad = 4.7;
    let holes = "";
    for (let x = step / 2; x < W; x += step) holes += `<circle cx="${x}" cy="0" r="${rad}"/><circle cx="${x}" cy="${H}" r="${rad}"/>`;
    for (let y = step / 2; y < H; y += step) holes += `<circle cx="0" cy="${y}" r="${rad}"/><circle cx="${W}" cy="${y}" r="${rad}"/>`;
    const fs = Math.min(21, 196 / (title.length * 0.62));
    const m = (motifs[art] || motifs.brain)(t.ink);
    return `<svg class="stampsvg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" ${size ? `width="${size}"` : ""}>
      <defs>
        <mask id="${id}m"><rect width="${W}" height="${H}" fill="#fff"/><g fill="#000">${holes}</g></mask>
        <pattern id="${id}h" patternUnits="userSpaceOnUse" width="3.6" height="3.6" patternTransform="rotate(${30 + seed * 7})"><line x1="0" y1="0" x2="0" y2="3.6" stroke="${t.ink}" stroke-width=".9"/></pattern>
        <filter id="${id}g" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="${seed}"/><feColorMatrix values="0 0 0 0 .25  0 0 0 0 .18  0 0 0 0 .1  0 0 0 .55 0"/></filter>
        <clipPath id="${id}c"><rect x="26" y="46" width="248" height="139"/></clipPath>
        <linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#000" stop-opacity=".12"/></linearGradient>
      </defs>
      <g mask="url(#${id}m)">
        <rect width="${W}" height="${H}" fill="#f5ecd5"/>
        <rect x="12" y="12" width="276" height="201" fill="${t.frame}"/>
        <rect x="12" y="12" width="276" height="201" fill="url(#${id}s)"/>
        <rect x="17.5" y="17.5" width="265" height="190" fill="none" stroke="#f5ecd5" stroke-width="1" opacity=".7"/>
        <g clip-path="url(#${id}c)"><rect x="26" y="46" width="248" height="139" fill="${t.sky}"/>
          <g transform="translate(26 46)">${m}<rect y="60" width="248" height="80" fill="url(#${id}h)" opacity=".28"/></g>
        </g>
        <rect x="26" y="46" width="248" height="139" fill="none" stroke="#f5ecd5" stroke-width="1.6"/>
        <text x="150" y="37" text-anchor="middle" font-family="'Abril Fatface',serif" font-size="${fs}" fill="#f8efd8" letter-spacing=".6">${title}</text>
        <text x="40" y="203" font-family="'Abril Fatface',serif" font-size="15" fill="#f8efd8">${denom}</text>
        <text x="260" y="203" text-anchor="end" font-family="'Abril Fatface',serif" font-size="15" fill="#f8efd8">${denom}</text>
        <text x="150" y="201" text-anchor="middle" font-family="Geist,sans-serif" font-size="6.5" letter-spacing="1.6" fill="#f8efd8" opacity=".85">SAMPLE POSTAGE</text>
        <circle cx="262" cy="32" r="11" fill="none" stroke="#f8efd8" stroke-width="1.4"/><circle cx="262" cy="32" r="5" fill="#f8efd8" opacity=".85"/>
        <rect width="${W}" height="${H}" filter="url(#${id}g)" opacity=".55" style="mix-blend-mode:multiply"/>
      </g></svg>`;
  }

  /* ----------------------------------------------------------------- PROPS */
  const props = {
    /* open laptop, seen from above and in front: screen up top, keyboard deck below */
    laptop() {
      const L = [
        [["m", "import"], [" { "], ["v", "build"], [" } "], ["m", "from"], [" "], ["s", '"ideas"'], [";"]],
        [],
        [["k", "const"], [" "], ["c", "henna"], [" = {"]],
        [["  "], ["p", "role"], [": "], ["s", '"AI Engineer"'], [","]],
        [["  "], ["p", "stack"], [": ["], ["s", '"Python"'], [", "], ["s", '"React"'], ["],"]],
        [["  "], ["p", "intern"], [": "], ["s", '"Heapvue"'], [","]],
        [["  "], ["p", "dreaming"], [": "], ["k", "true"], [","]],
        [["};"]],
        [],
        [["k", "async function"], [" "], ["f", "ship"], ["(idea) {"]],
        [["  "], ["k", "const"], [" app = "], ["m", "await"], [" "], ["f", "build"], ["(idea);"]],
        [["  "], ["m", "return"], [" app."], ["f", "care"], ["("], ["s", '"look"'], [", "], ["s", '"feel"'], [", "], ["s", '"work"'], [");"]],
        [["}"], ["x", ""]],
      ];
      const lines = L.map((l, i) => `<div class="ln" style="--i:${i}"><b>${i + 1}</b><span>${l.map(([c, t]) => (t === undefined ? c : c === "x" ? '<u class="caret"></u>' : `<i class="${c}">${t}</i>`)).join("") || "&nbsp;"}</span></div>`).join("");
      const keys = [...Array(5)].map((_, r) => `<div class="kr">${[...Array(r === 4 ? 9 : 14)].map((_, k) => `<s${r === 4 && k === 4 ? ' class="sp"' : ""}></s>`).join("")}</div>`).join("");
      return `<div class="lp-screen"><div class="lp-bezel"><i class="cam"></i><div class="vsc">
          <div class="vs-title"><u></u><u></u><u></u><span>henna.js — portfolio — Visual Studio Code</span></div>
          <div class="vs-body">
            <div class="vs-act"><u class="on"></u><u></u><u></u><u></u></div>
            <div class="vs-side"><em>EXPLORER</em><p class="dir">⌄ PORTFOLIO</p><p>&nbsp;&nbsp;index.html</p><p>&nbsp;&nbsp;style.css</p><p>&nbsp;&nbsp;app.js</p><p class="sel">&nbsp;&nbsp;henna.js</p><p>&nbsp;&nbsp;content.js</p></div>
            <div class="vs-main"><div class="vs-tabs"><span>app.js</span><span class="on"><i class="js">JS</i> henna.js</span></div><div class="vs-code">${lines}</div></div>
          </div>
          <div class="vs-status"><span>⎇ main</span><span>✓ 0 ⚠ 0</span><span class="r">Ln 13, Col 2</span><span>JavaScript</span></div>
        </div></div></div>
        <div class="lp-hinge"></div>
        <div class="lp-base"><div class="deck"><div class="grill"></div><div class="kb">${keys}</div><div class="grill"></div><div class="pad"></div></div></div>`;
    },
    cap() {
      const g = uid("c");
      return `<svg viewBox="0 0 380 360" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="${g}a" cx=".38" cy=".3" r=".85"><stop offset="0" stop-color="#4a74ff"/><stop offset=".55" stop-color="#2748e6"/><stop offset="1" stop-color="#14279a"/></radialGradient>
        <linearGradient id="${g}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2c52ee"/><stop offset="1" stop-color="#16299f"/></linearGradient>
        <filter id="${g}n"><feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 .3  0 0 0 .35 0"/></filter>
      </defs>
      <path d="M62 262 C86 350 270 356 318 244 C262 286 128 292 62 262Z" fill="url(#${g}b)"/>
      <path d="M70 268 C120 292 250 292 308 252" fill="none" stroke="#0e1c78" stroke-width="3" opacity=".6"/>
      <ellipse cx="186" cy="160" rx="156" ry="146" fill="url(#${g}a)"/>
      <ellipse cx="186" cy="160" rx="156" ry="146" filter="url(#${g}n)" opacity=".6"/>
      <g fill="none" stroke="#0f1f86" stroke-width="2.5" opacity=".55"><path d="M186 14 C150 70 150 250 186 306"/><path d="M186 14 C222 70 222 250 186 306"/><path d="M186 14 C90 40 40 120 44 190"/><path d="M186 14 C282 40 332 120 328 190"/></g>
      <circle cx="186" cy="26" r="11" fill="#3157f0" stroke="#10208c" stroke-width="2"/>
      <ellipse cx="186" cy="178" rx="78" ry="36" fill="#eef2ff" stroke="#0f1f86" stroke-width="3"/>
      <ellipse cx="186" cy="178" rx="70" ry="29" fill="none" stroke="#2a46d6" stroke-width="2" stroke-dasharray="3 4"/>
      <text x="186" y="170" text-anchor="middle" font-family="Archivo Black,Geist,sans-serif" font-size="15" fill="#1f35c4">BUILD IT</text>
      <text x="186" y="190" text-anchor="middle" font-family="Archivo Black,Geist,sans-serif" font-size="15" fill="#1f35c4">ANYWAY</text>
      <path d="M296 120 h34 v34 h-34z" fill="#f6efdc" transform="rotate(8 313 137)"/><path d="M302 142 q8-14 14 0 t12-6" fill="none" stroke="#2748e6" stroke-width="2" transform="rotate(8 313 137)"/>
      </svg>`;
    },
    glass() {
      const g = uid("g");
      return `<svg viewBox="0 0 340 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="${g}a" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#d9a86b"/><stop offset="1" stop-color="#9b6535"/></radialGradient>
        <radialGradient id="${g}b" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#e9bd86"/><stop offset=".7" stop-color="#c98f55"/><stop offset="1" stop-color="#a86f3b"/></radialGradient>
        <filter id="${g}n"><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2"/><feColorMatrix values="0 0 0 0 .3  0 0 0 0 .15  0 0 0 0 0  0 0 0 .6 0"/></filter>
        <filter id="${g}bl"><feGaussianBlur stdDeviation="1.4"/></filter>
      </defs>
      <circle cx="150" cy="150" r="140" fill="url(#${g}a)"/><circle cx="150" cy="150" r="140" filter="url(#${g}n)" opacity=".8"/><circle cx="150" cy="150" r="132" fill="none" stroke="#7b4a24" stroke-width="3" opacity=".5"/>
      <circle cx="150" cy="150" r="104" fill="rgba(255,255,255,.38)" stroke="rgba(255,255,255,.9)" stroke-width="7"/>
      <circle cx="150" cy="150" r="94" fill="url(#${g}b)" opacity=".95"/>
      <g fill="rgba(255,255,255,.55)" stroke="#fff" stroke-width="2.4" opacity=".9">
        <rect x="104" y="112" width="44" height="44" rx="9" transform="rotate(14 126 134)"/><rect x="152" y="98" width="42" height="42" rx="9" transform="rotate(-20 173 119)"/>
        <rect x="124" y="156" width="46" height="44" rx="9" transform="rotate(-8 147 178)"/><rect x="174" y="150" width="40" height="40" rx="9" transform="rotate(26 194 170)"/></g>
      <g filter="url(#${g}bl)" fill="#fff" opacity=".7"><ellipse cx="108" cy="104" rx="20" ry="6" transform="rotate(-38 108 104)"/></g>
      <path d="M196 120 L312 18" stroke="#fff" stroke-width="15" stroke-linecap="round"/>
      <path d="M196 120 L312 18" stroke="#2fb8aa" stroke-width="15" stroke-linecap="round" stroke-dasharray="12 14"/>
      <path d="M196 120 L312 18" stroke="rgba(0,0,0,.18)" stroke-width="3" stroke-linecap="round" transform="translate(5 5)"/>
      </svg>`;
    },
    radio() {
      const g = uid("r");
      return `<svg viewBox="0 0 420 260" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${g}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eceded"/><stop offset="1" stop-color="#b4b7b9"/></linearGradient>
        <pattern id="${g}p" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="4.5" cy="4.5" r="2.5" fill="#6d7274"/></pattern>
      </defs>
      <path d="M92 40 L-6 6" stroke="#8d9193" stroke-width="3.5" stroke-linecap="round"/><circle cx="-6" cy="6" r="5" fill="#6d7274"/>
      <circle cx="372" cy="160" r="40" fill="#f2a516"/><circle cx="372" cy="160" r="40" fill="none" stroke="#c4800a" stroke-width="3"/>
      <rect x="40" y="38" width="320" height="194" rx="28" fill="url(#${g}a)" stroke="#8a8e90" stroke-width="3"/>
      <rect x="58" y="58" width="150" height="156" rx="16" fill="url(#${g}p)"/><rect x="58" y="58" width="150" height="156" rx="16" fill="none" stroke="#8a8e90" stroke-width="3"/>
      <rect x="226" y="58" width="116" height="52" rx="8" fill="#d8dadc" stroke="#8a8e90" stroke-width="2.5"/>
      ${[0, 1, 2, 3, 4, 5, 6].map((k) => `<line x1="${238 + k * 14}" y1="${70}" x2="${238 + k * 14}" y2="${k % 2 ? 90 : 96}" stroke="#a8332b" stroke-width="2"/>`).join("")}
      <rect x="236" y="100" width="96" height="3" fill="#8a8e90"/>
      <circle cx="262" cy="160" r="22" fill="#cfd1d2" stroke="#8a8e90" stroke-width="3"/><circle cx="262" cy="160" r="3" fill="#6d7274"/><line x1="262" y1="160" x2="274" y2="146" stroke="#6d7274" stroke-width="3"/>
      <circle cx="322" cy="160" r="16" fill="#cfd1d2" stroke="#8a8e90" stroke-width="3"/>
      <rect x="236" y="196" width="100" height="22" rx="4" fill="#f2a516" stroke="#c4800a" stroke-width="2"/><text x="286" y="212" text-anchor="middle" font-family="Geist,sans-serif" font-size="11" font-weight="700" fill="#5a3a00" letter-spacing="2">FM · AM</text>
      </svg>`;
    },
    camera() {
      const g = uid("m");
      return `<svg viewBox="0 0 340 340" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${g}a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#bfeadb"/><stop offset=".6" stop-color="#8fd0bb"/><stop offset="1" stop-color="#6fb8a2"/></linearGradient>
        <radialGradient id="${g}l" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#4c555c"/><stop offset=".5" stop-color="#1b2024"/><stop offset="1" stop-color="#0a0d0f"/></radialGradient>
      </defs>
      <rect x="14" y="14" width="312" height="312" rx="52" fill="url(#${g}a)" stroke="#5aa28c" stroke-width="3"/>
      <rect x="26" y="26" width="288" height="288" rx="42" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="2.5"/>
      <circle cx="170" cy="190" r="96" fill="#d9f2e8" stroke="#5aa28c" stroke-width="3"/>
      <circle cx="170" cy="190" r="82" fill="url(#${g}l)"/><circle cx="170" cy="190" r="52" fill="#06080a" stroke="#39434a" stroke-width="3"/><circle cx="170" cy="190" r="30" fill="#141a1f" stroke="#2b343b" stroke-width="2"/>
      <ellipse cx="150" cy="166" rx="22" ry="12" fill="rgba(255,255,255,.35)" transform="rotate(-35 150 166)"/><circle cx="196" cy="216" r="6" fill="rgba(160,200,255,.45)"/>
      <rect x="58" y="48" width="58" height="34" rx="9" fill="#17202a" stroke="#5aa28c" stroke-width="2"/><circle cx="76" cy="65" r="8" fill="#27343f"/>
      <circle cx="268" cy="64" r="16" fill="#f5f9f7" stroke="#5aa28c" stroke-width="2.5"/><circle cx="268" cy="64" r="8" fill="#e75a5a"/>
      <rect x="226" y="44" width="38" height="22" rx="4" fill="#fff" opacity=".9" transform="rotate(-8 245 55)"/>
      <rect x="240" y="288" width="52" height="10" rx="3" fill="#2f3b45"/>
      </svg>`;
    },
    flower() {
      const g = uid("f");
      const petals = [0, 1, 2, 3, 4].map((k) => `<ellipse cx="50" cy="26" rx="19" ry="30" fill="url(#${g}a)" stroke="#e8c9d2" stroke-width="1.2" transform="rotate(${k * 72 + 8} 50 50)"/>`).join("");
      return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="${g}a" cx=".5" cy="1" r="1"><stop offset="0" stop-color="#ffd23d"/><stop offset=".35" stop-color="#fff7e8"/><stop offset="1" stop-color="#ffffff"/></radialGradient></defs>${petals}<circle cx="50" cy="50" r="9" fill="#ffc21f"/><circle cx="50" cy="50" r="9" fill="none" stroke="#e59a00" stroke-width="1.5"/></svg>`;
    },
    leaf() {
      return `<svg viewBox="0 0 120 220" xmlns="http://www.w3.org/2000/svg"><path d="M60 4 C112 50 118 150 60 214 C2 150 8 50 60 4Z" fill="#3f7f2c"/><path d="M60 4 C112 50 118 150 60 214Z" fill="#53a03a"/><path d="M60 14 V214" stroke="#c6e6a2" stroke-width="3"/>${[44, 76, 108, 140, 170].map((y) => `<path d="M60 ${y + 10} L24 ${y - 12}" stroke="#2c5f1e" stroke-width="2" opacity=".7"/><path d="M60 ${y + 10} L96 ${y - 12}" stroke="#2c5f1e" stroke-width="2" opacity=".7"/>`).join("")}</svg>`;
    },
    butterfly() {
      const g = uid("b");
      return `<svg viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff9a3c"/><stop offset="1" stop-color="#e2452b"/></linearGradient></defs>
      <g class="wing wl" style="transform-origin:50px 40px"><path d="M50 38 C30 0 4 6 8 30 C10 46 36 48 50 42Z" fill="url(#${g})" stroke="#2a1410" stroke-width="2.4"/><path d="M50 44 C34 46 16 56 24 70 C34 80 48 60 50 48Z" fill="url(#${g})" stroke="#2a1410" stroke-width="2.4"/></g>
      <g class="wing wr" style="transform-origin:50px 40px"><path d="M50 38 C70 0 96 6 92 30 C90 46 64 48 50 42Z" fill="url(#${g})" stroke="#2a1410" stroke-width="2.4"/><path d="M50 44 C66 46 84 56 76 70 C66 80 52 60 50 48Z" fill="url(#${g})" stroke="#2a1410" stroke-width="2.4"/></g>
      <ellipse cx="50" cy="42" rx="3.6" ry="16" fill="#2a1410"/><path d="M48 28 Q42 16 36 14 M52 28 Q58 16 64 14" fill="none" stroke="#2a1410" stroke-width="1.6"/></svg>`;
    },
  };

  /* ----------------------------------------------------------------- ICONS */
  const icons = {
    search: '<circle cx="21" cy="21" r="10" fill="none" stroke="currentColor" stroke-width="4"/><line x1="29" y1="29" x2="39" y2="39" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>',
    spark: '<path d="M24 6 C26 18 30 22 42 24 C30 26 26 30 24 42 C22 30 18 26 6 24 C18 22 22 18 24 6Z" fill="currentColor"/>',
    plane: '<path d="M6 22 L42 6 L32 42 L22 28Z" fill="currentColor"/><path d="M22 28 L42 6" stroke="rgba(0,0,0,.25)" stroke-width="2"/>',
    gear: '<circle cx="24" cy="24" r="9" fill="none" stroke="currentColor" stroke-width="5"/>' + [0, 1, 2, 3, 4, 5, 6, 7].map((k) => `<rect x="21" y="3" width="6" height="9" rx="2" fill="currentColor" transform="rotate(${k * 45} 24 24)"/>`).join(""),
    hello: '<rect x="6" y="10" width="36" height="28" rx="4" fill="none" stroke="currentColor" stroke-width="3.5"/><path d="M12 20 H26 M12 27 H22" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"/><rect x="30" y="16" width="8" height="8" fill="currentColor"/>',
    work: '<rect x="8" y="6" width="32" height="36" rx="4" fill="none" stroke="currentColor" stroke-width="3.5"/><circle cx="24" cy="21" r="5.5" fill="currentColor"/><path d="M13 38 C14 29 34 29 35 38" fill="currentColor"/>',
    kind: '<path d="M8 10 H40 V30 H26 L16 40 V30 H8Z" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round"/><circle cx="17" cy="20" r="2.3" fill="currentColor"/><circle cx="24" cy="20" r="2.3" fill="currentColor"/><circle cx="31" cy="20" r="2.3" fill="currentColor"/>',
    write: '<rect x="6" y="10" width="36" height="28" rx="4" fill="none" stroke="currentColor" stroke-width="3.5"/><path d="M8 13 L24 27 L40 13" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linejoin="round"/>',
  };
  const icon = (n, s = 48) => `<svg viewBox="0 0 48 48" width="${s}" height="${s}" aria-hidden="true">${icons[n] || ""}</svg>`;

  window.ART = { stamp, props, icon, icons, uid };
})();
