/* Think in English — app logic. Data lives in data/*.js (window.DATA). */
(() => {
"use strict";
const D = window.DATA;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const LEVELS = ["A1", "A2", "B1", "B2", "C1"];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const dayIndex = Math.floor(Date.now() / 864e5);
const norm = s => String(s).toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9' ]+/g, " ").replace(/\s+/g, " ").trim();

const IC = {
  speaker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6"/><path d="M18.5 6.5a8 8 0 0 1 0 11"/></svg>',
  slow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 10.5a2.5 2.5 0 0 1 0 3"/></svg>',
  mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg>'
};
const sayBtn = (t, label = "Écouter") => `<button class="icon-btn" data-act="say" data-t="${esc(t)}" aria-label="${label}" title="${label}">${IC.speaker}</button>`;
const slowBtn = t => `<button class="icon-btn" data-act="say" data-slow="1" data-t="${esc(t)}" aria-label="Écouter lentement" title="Écouter lentement">${IC.slow}</button>`;
const micBtn = t => `<button class="icon-btn mic" data-act="mic" data-t="${esc(t)}" aria-label="Dis-le (reconnaissance vocale)" title="Dis-le : prononce le mot">${IC.mic}</button>`;
const starBtn = id => `<button class="icon-btn${known.has(id) ? " on" : ""}" data-act="known" data-id="${esc(id)}" aria-pressed="${known.has(id)}" aria-label="Je connais" title="Je connais">${IC.star}</button>`;
const lvlTag = l => `<span class="lvl ${l}">${l}</span>`;

/* ---------------- storage (per browser) ---------------- */
const store = {
  get(k, d) { try { const v = localStorage.getItem("tie:" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem("tie:" + k, JSON.stringify(v)); } catch (e) { /* storage blocked */ } }
};
const known = new Set(store.get("known", []));
const settings = Object.assign({ engine: "", rate: 1, immersion: true }, store.get("settings", {}));
const saveSettings = () => store.set("settings", settings);
function toggleKnown(id) {
  known.has(id) ? known.delete(id) : known.add(id);
  store.set("known", [...known]);
  renderNav();
}
const countKnown = prefix => [...known].filter(k => k.startsWith(prefix)).length;

/* ---------------- toast & popover ---------------- */
let toastTimer;
function toast(msg, ms = 3200) {
  const t = $("#toast"); t.textContent = msg; t.hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, ms);
}
function openPop(html) { const p = $("#pop"); p.innerHTML = html; p.hidden = false; }
function closePop() { $("#pop").hidden = true; }

/* ---------------- audio: Claude voice or browser voice ---------------- */
const Audio = {
  tts: null, ttsDenied: false, voices: [], current: null, lineHandler: null,
  async init() {
    if ("speechSynthesis" in window) {
      const load = () => { this.voices = speechSynthesis.getVoices().filter(v => /^en([-_]|$)/i.test(v.lang)); buildEngineSelect(); };
      load(); speechSynthesis.onvoiceschanged = load;
    }
    buildEngineSelect();
    if (window.claude && typeof window.claude.use === "function") {
      try {
        const t = await window.claude.use("tts");
        if (t) {
          this.tts = t;
          t.onState(({ state }) => this.setSpeaking(state !== "idle"));
          t.onLine(({ id }) => { if (this.lineHandler) this.lineHandler(id); });
          if (t.setRate) t.setRate(settings.rate).catch(() => {});
          buildEngineSelect();
        }
      } catch (e) { /* no tts here */ }
    }
  },
  engine() {
    const e = settings.engine;
    if (e === "claude") return this.tts ? "claude" : (this.ttsDenied ? "none" : this.browserDefault());
    if (e === "gb" || e === "us") return e;
    return this.tts ? "claude" : this.browserDefault();
  },
  browserDefault() { return "speechSynthesis" in window ? "gb" : "none"; },
  voiceFor(accent, alt) {
    const re = accent === "us" ? /en[-_]US/i : /en[-_]GB/i;
    const list = this.voices.filter(v => re.test(v.lang));
    const main = list.find(v => /natural|neural|online|google/i.test(v.name)) || list[0] || this.voices[0] || null;
    if (!alt) return main;
    return list.find(v => v !== main) || this.voices.find(v => v !== main && !re.test(v.lang)) || main;
  },
  paused: false,
  pause() {
    if (this.engine() === "claude" && this.tts) this.tts.pause().catch(() => {});
    else if ("speechSynthesis" in window) speechSynthesis.pause();
    this.paused = true;
  },
  resume() {
    if (this.engine() === "claude" && this.tts) this.tts.resume().catch(() => {});
    else if ("speechSynthesis" in window) speechSynthesis.resume();
    this.paused = false;
  },
  /* lines: string | [{text, id}] ; opts: {rate, onLine(id), onEnd()} */
  speak(lines, opts = {}) {
    const arr = typeof lines === "string" ? [{ text: lines }] : lines;
    const rate = opts.rate || settings.rate;
    const token = {}; this.current = token;
    const onLine = opts.onLine || null;
    let ended = false;
    const finish = () => { if (ended) return; ended = true; if (onLine) onLine(null); if (opts.onEnd) opts.onEnd(); };
    const eng = this.engine();
    if (eng === "none") { toast("Aucune voix disponible : choisis une voix du navigateur dans les réglages audio."); return; }
    this.paused = false;
    if (eng === "claude") {
      this.lineHandler = id => { if (this.current === token && onLine) onLine(id); };
      const VO = { A: "buttery", B: "airy" };
      const batches = [];
      for (let k = 0; k < arr.length; k += 90) batches.push(arr.slice(k, k + 90));
      const run = bi => {
        const lines = batches[bi].map(l => Object.assign({ text: l.text, language: "en" }, l.id ? { id: l.id } : {}, VO[l.voice] ? { voice: VO[l.voice] } : {}));
        (bi === 0 ? this.tts.speak(lines, { rate, language: "en" }) : this.tts.add(lines, { rate, language: "en" }))
          .then(() => { if (this.current === token && bi + 1 < batches.length) run(bi + 1); else finish(); })
          .catch(err => { finish(); if (err && err.code !== "stopped") this.handleError(err.code); });
      };
      run(0);
      return;
    }
    speechSynthesis.cancel();
    const v = this.voiceFor(eng), vB = this.voiceFor(eng, true);
    let i = 0;
    const next = () => {
      if (this.current !== token) { finish(); return; }
      if (i >= arr.length) { this.setSpeaking(false); finish(); return; }
      const l = arr[i++];
      const u = new SpeechSynthesisUtterance(l.text);
      const vv = l.voice === "B" ? vB : v;
      if (vv) { u.voice = vv; u.lang = vv.lang; } else { u.lang = eng === "us" ? "en-US" : "en-GB"; }
      u.rate = rate;
      u.onstart = () => { if (this.current === token && onLine) onLine(l.id); };
      u.onend = next; u.onerror = next;
      speechSynthesis.speak(u);
    };
    this.setSpeaking(true);
    setTimeout(next, 30);
  },
  stop() {
    this.current = null;
    if (this.tts) this.tts.stop().catch(() => {});
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    this.setSpeaking(false);
  },
  setSpeaking(b) { $("#nowplaying").hidden = !b; },
  handleError(code) {
    if (code === "not_granted" || code === "unavailable") {
      this.tts = null; this.ttsDenied = true; buildEngineSelect();
      toast("La voix Claude est coupée pour cette page. Tu peux choisir une voix du navigateur dans les réglages audio.", 5000);
    } else if (code === "rate_limited") toast("Beaucoup d'écoutes avec la voix Claude : réessaie dans un moment, ou passe sur la voix du navigateur.", 5000);
    else if (code === "no_gesture") toast("Clique encore une fois pour écouter.");
    else if (code === "busy") toast("Le micro est actif : attends la fin de l'écoute.");
    else toast("L'audio n'a pas pu être lu. Réessaie.");
  }
};
function buildEngineSelect() {
  const sel = $("#set-engine"); if (!sel) return;
  const opts = [];
  if (Audio.tts) opts.push(["claude", "Voix Claude (naturelle)"]);
  if ("speechSynthesis" in window) { opts.push(["gb", "Navigateur — accent UK"]); opts.push(["us", "Navigateur — accent US"]); }
  if (!opts.length) opts.push(["", "Aucune voix disponible"]);
  const cur = Audio.engine();
  sel.innerHTML = opts.map(([v, l]) => `<option value="${v}"${v === cur ? " selected" : ""}>${l}</option>`).join("");
}

/* ---------------- dictation: say it, the page checks it ---------------- */
const Mic = {
  d: null, target: "", heard: "", timer: null,
  async init() {
    if (!(window.claude && typeof window.claude.use === "function")) return;
    try { this.d = await window.claude.use("dictation"); } catch (e) { this.d = null; }
    if (!this.d) return;
    document.body.classList.add("has-mic");
    this.d.onPartial(({ text }) => {
      if (this.mode === "chat") { const p = $("#chat-partial"); if (p) p.textContent = text || "Je t'écoute…"; return; }
      if (text) this.render(this.heard + " " + text, true);
    });
    this.d.onFinal(({ text }) => {
      if (this.mode === "chat") { const i = $("#chat-in"); if (i) i.value = i.value ? i.value + text : text.trimStart(); return; }
      this.heard = (this.heard + text).trim(); this.render(this.heard, false); if (this.matches()) this.d.stop().catch(() => {});
    });
    this.d.onState(({ state, reason }) => {
      if (this.mode === "chat") {
        const b = $("#chat-mic"), p = $("#chat-partial");
        if (b) b.classList.toggle("on", state !== "idle");
        if (p) p.textContent = state === "idle" ? "" : (state === "listening" ? "Je t'écoute… parle en anglais, puis touche le micro pour arrêter." : "…");
        return;
      }
      if (state === "idle") { clearTimeout(this.timer); this.result(reason); }
    });
  },
  mode: "check",
  fail(err) {
    const c = err && err.code;
    if (c === "not_granted") { toast("Micro refusé pour cette page. Tu peux le réactiver dans le menu Permissions de l'artifact.", 5000); document.body.classList.remove("has-mic"); }
    else if (c === "unavailable") { toast("Reconnaissance vocale indisponible ici."); document.body.classList.remove("has-mic"); }
    else if (c === "dismissed") toast("Autorise le micro pour pouvoir parler.");
    else if (c === "rate_limited") toast("Trop d'essais d'un coup, attends quelques secondes.");
    else if (c === "busy") toast("Attends la fin de la lecture audio.");
    else if (c !== "stopped") toast("Le micro n'a pas démarré. Réessaie.");
  },
  startChat() {
    if (!this.d) { toast("La reconnaissance vocale marche dans Chrome ou Edge, sur claude.ai."); return; }
    if (this.d.active()) { this.d.stop().catch(() => {}); return; }
    this.mode = "chat";
    Audio.stop();
    this.d.start({ language: "en" }).catch(err => this.fail(err));
  },
  start(target) {
    if (!this.d) { toast("La reconnaissance vocale marche dans Chrome ou Edge, sur claude.ai."); return; }
    this.mode = "check";
    Audio.stop();
    this.target = target.split(" / ")[0].replace(/\(.*?\)/g, "").trim();
    this.heard = "";
    const box = $("#listening");
    box.hidden = false;
    box.innerHTML = `<div class="row"><span class="pulse"></span><b>Je t'écoute… dis :</b> <span>${esc(this.target)}</span></div><div class="heard" id="heard">…</div><div class="row"><button class="btn" data-act="mic-stop">Terminer</button></div>`;
    this.d.start({ language: "en" }).catch(err => { this.fail(err); $("#listening").hidden = true; });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.d.stop().catch(() => {}), 5000);
  },
  matches() {
    const want = norm(this.target).split(" ");
    const got = norm(this.heard).split(" ");
    return want.length > 0 && want.every(w => got.includes(w));
  },
  render(text, partial) { const h = $("#heard"); if (h) { h.textContent = text || "…"; h.style.opacity = partial ? .6 : 1; } },
  result(reason) {
    const box = $("#listening"); if (box.hidden) return;
    if (!this.heard) {
      box.innerHTML = `<b>Je n'ai rien entendu.</b><span class="muted small">Rapproche-toi du micro et parle clairement.</span><div class="row"><button class="btn primary" data-act="mic" data-t="${esc(this.target)}">Réessayer</button><button class="btn ghost" data-act="mic-close">Fermer</button></div>`;
      return;
    }
    const ok = this.matches();
    box.innerHTML = ok
      ? `<b style="color:var(--good)">Compris ! On a bien entendu « ${esc(this.heard)} ».</b><div class="row"><button class="btn" data-act="say" data-t="${esc(this.target)}">${IC.speaker} Comparer avec le modèle</button><button class="btn ghost" data-act="mic-close">Fermer</button></div>`
      : `<b style="color:var(--bad)">On a entendu « ${esc(this.heard)} », pas « ${esc(this.target)} ».</b><span class="muted small">Écoute le modèle, puis réessaie en exagérant le son.</span><div class="row"><button class="btn" data-act="say" data-t="${esc(this.target)}">${IC.speaker} Modèle</button><button class="btn primary" data-act="mic" data-t="${esc(this.target)}">Réessayer</button><button class="btn ghost" data-act="mic-close">Fermer</button></div>`;
  }
};

/* ---------------- navigation ---------------- */
const vocabAll = D.vocab.flatMap(t => t.words.map(w => ({ e: w[0], w: w[1], ipa: w[2], lvl: w[3], ex: w[4], theme: t.id })));
const NAV = [
  ["home", "Accueil", () => ""],
  ["levels", "Niveaux A1–C1", () => ""],
  ["audio", "Audio & écoute", () => ""],
  ["podcasts", "Podcasts", () => `${countKnown("e:")}/${D.podcasts.length}`],
  ["chat", "Parler avec l'IA", () => ""],
  ["stories", "Mini-histoires", () => `${countKnown("s:")}/${D.stories.length}`],
  ["vocab", "Vocabulaire", () => `${countKnown("v:")}/${vocabAll.length}`],
  ["chunks", "Chunks", () => `${countKnown("c:")}/${D.chunks.length}`],
  ["phrasal", "Phrasal verbs", () => `${countKnown("p:")}/${D.phrasal.length}`],
  ["grammar", "Grammaire", () => `${countKnown("g:")}/${D.grammar.length}`],
  ["phonetics", "Phonétique", () => ""],
  ["tips", "Conseils", () => ""]
];
let currentBase = "home";
function renderNav() {
  $("#nav").innerHTML = NAV.map(([id, label, c]) => `<a href="#${id}"${id === currentBase ? ' aria-current="page"' : ""}>${label}<small>${c()}</small></a>`).join("");
}

/* ---------------- generic MCQ ---------------- */
const quizzes = {};
function mcq(key, items, onDone) {
  quizzes[key] = { items, answers: {}, onDone };
  return `<div class="qblock" id="q-${key}">${items.map((it, i) => `
    <div class="q"><b>${i + 1}. ${esc(it.q)}</b>
      <div class="opts">${it.o.map((o, j) => `<button data-act="mcq" data-k="${key}" data-i="${i}" data-o="${j}">${esc(o)}</button>`).join("")}</div>
    </div>`).join("")}<div class="pq-msg" id="qr-${key}" aria-live="polite"></div></div>`;
}
function mcqPick(b) {
  const { k, i, o } = b.dataset; const qz = quizzes[k]; if (!qz || qz.answers[i] != null) return;
  const it = qz.items[i]; const right = +o === it.a;
  qz.answers[i] = right;
  const btns = $$(`button[data-k="${k}"][data-i="${i}"]`);
  btns.forEach((x, j) => { x.disabled = true; if (j === it.a) x.classList.add("right"); });
  if (!right) b.classList.add("wrong");
  const n = Object.keys(qz.answers).length;
  if (n === qz.items.length) {
    const score = Object.values(qz.answers).filter(Boolean).length;
    const msg = qz.onDone ? qz.onDone(score, qz.items.length, qz.answers) : null;
    $("#qr-" + k).innerHTML = msg || `Score : ${score} / ${qz.items.length}${score === qz.items.length ? " — parfait !" : ""}`;
  }
}

/* ---------------- picture quiz (hear → tap the picture) ---------------- */
const pqs = {};
function pqNew(key, pool, mode = "word") {
  const prev = pqs[key];
  const target = pick(pool.filter(x => !prev || x !== prev.target)) || pick(pool);
  const others = shuffle(pool.filter(x => x.e !== target.e)).slice(0, 3);
  pqs[key] = { pool, mode, target, opts: shuffle([target, ...others]), done: false, score: prev ? prev.score : 0, total: prev ? prev.total : 0 };
}
function pqHtml(key) {
  const s = pqs[key]; const txt = s.mode === "word" ? s.target.w : s.target.ex;
  return `<div class="pq" id="pq-${key}">
    <div class="toolbar"><div class="row"><button class="btn primary" data-act="pq-play" data-k="${key}">${IC.speaker} ${s.mode === "word" ? "Écouter le mot" : "Écouter la phrase"}</button>${slowBtn(txt)}</div><span class="score">${s.score} / ${s.total}</span></div>
    <div class="pq-opts">${s.opts.map((o, i) => `<button class="pic" data-act="pq-pick" data-k="${key}" data-i="${i}" aria-label="Image ${i + 1}">${o.e}</button>`).join("")}</div>
    <div class="row"><div class="pq-msg" id="pqm-${key}" aria-live="polite"></div><button class="btn" data-act="pq-next" data-k="${key}"${s.done ? "" : " hidden"}>Suivant →</button></div>
  </div>`;
}
function pqRefresh(key) { const el = $("#pq-" + key); if (el) el.outerHTML = pqHtml(key); }
function pqPlay(key) { const s = pqs[key]; Audio.speak(s.mode === "word" ? s.target.w : s.target.ex); }
function pqPick(b) {
  const key = b.dataset.k; const s = pqs[key]; if (s.done) return;
  const o = s.opts[+b.dataset.i]; const ok = o === s.target;
  if (!ok) { b.classList.add("wrong"); b.disabled = true; $("#pqm-" + key).textContent = "Pas celle-là — réécoute."; s.miss = true; return; }
  s.done = true; s.total++; if (!s.miss) s.score++; s.miss = false;
  b.classList.add("right");
  $("#pqm-" + key).innerHTML = `<span style="color:var(--good)">${esc(s.target.w)}</span> <span class="ipa">${esc(s.target.ipa || "")}</span>`;
  $(`#pq-${key} .score`).textContent = `${s.score} / ${s.total}`;
  $(`#pq-${key} [data-act="pq-next"]`).hidden = false;
  Audio.speak(s.target.w);
}

/* ================= PAGES ================= */
const state = { storyLvl: "all", grammarLvl: "all", chunkCat: "all", chunkLvl: "all", chunkLimit: 60, chunkQ: "", chunkMode: "list", pvCat: "all", pvPart: "", pvQ: "", pvMode: "list", vocabTab: "learn", audioTab: "picture", audioLvl: "A2", phonTab: "lessons", ipaSel: null, pairSet: "i", dictLvl: "A2", dictI: 0, flash: null };

function pageHome() {
  const w = vocabAll[dayIndex % vocabAll.length];
  const c = D.chunks[dayIndex % D.chunks.length];
  const p = D.phrasal[dayIndex % D.phrasal.length];
  if (!pqs.home) pqNew("home", vocabAll.filter(x => x.lvl !== "C1" && x.lvl !== "B2"));
  const stat = (href, label, n, total) => `<a class="stat" href="#${href}"><span class="eyebrow">${label}</span><b>${n} <span class="muted small">/ ${total}</span></b><div class="progress"><i style="width:${total ? Math.round(n / total * 100) : 0}%"></i></div></a>`;
  const lvlCol = { A1: "var(--a1)", A2: "var(--a2)", B1: "var(--b1)", B2: "var(--b2)", C1: "var(--c1)" };
  return `
  <section class="hero">
    <div style="display:flex;flex-direction:column;gap:16px">
      <span class="eyebrow">Ton site d'anglais personnel · A1 → C1</span>
      <h1>See it. Hear it. <em>Say it.</em></h1>
      <p class="lead">Ici, aucun mot n'est traduit en français. Chaque mot a une image, chaque phrase a un son, et tu t'entraînes à le dire. Ton cerveau apprend à relier directement l'image à l'anglais : c'est comme ça qu'on arrête de traduire.</p>
      <div class="row"><a class="btn primary" href="#levels">Faire le test de niveau</a><a class="btn" href="#vocab">Commencer par les images</a></div>
    </div>
    <div class="thesis" aria-label="Le principe">
      <span class="fr-word">pomme</span><span class="arrow">→</span><span class="pic">🍎</span><span class="arrow arrow2">→</span>
      <span class="en"><b>apple</b><span class="ipa">/ˈæp.əl/</span><span class="row">${sayBtn("apple")}${micBtn("apple")}</span></span>
      <p class="thesis-cap">On saute l'étape « pomme ». L'image remplace la traduction : 🍎 → apple, directement.</p>
    </div>
  </section>

  <section style="display:flex;flex-direction:column;gap:12px">
    <h2>Aujourd'hui</h2>
    <div class="today">
      <div class="tile"><span class="eyebrow">Mot du jour</span><div class="tile-top"><span class="pic big">${w.e}</span>${lvlTag(w.lvl)}</div><h3>${esc(w.w)} <span class="ipa small">${esc(w.ipa)}</span></h3><p class="example muted">${esc(w.ex)}</p><div class="row">${sayBtn(w.w)}${sayBtn(w.ex, "Écouter la phrase")}${micBtn(w.w)}${starBtn("v:" + w.w)}</div></div>
      <div class="tile"><span class="eyebrow">Chunk du jour</span><div class="tile-top"><span class="pic big">${D.chunkCats[c.c].emoji}</span>${lvlTag(c.lvl)}</div><h3>${esc(c.chunk)}</h3><p class="example muted">${esc(c.ex)}</p><div class="row">${sayBtn(c.chunk)}${sayBtn(c.ex, "Écouter l'exemple")}${starBtn("c:" + c.n)}</div></div>
      <div class="tile"><span class="eyebrow">Phrasal verb du jour</span><div class="tile-top"><span class="pic big">${p.e}</span>${lvlTag(p.lvl)}</div><h3>${esc(p.pv)}</h3><p class="small">${esc(p.mean)}</p><p class="example muted">${esc(p.ex)}</p><div class="row">${sayBtn(p.pv)}${sayBtn(p.ex, "Écouter l'exemple")}${starBtn("p:" + p.pv)}</div></div>
    </div>
  </section>

  <section class="grid wide">
    <a class="tile" href="#podcasts"><span class="eyebrow">100 épisodes · A1 → C1</span><h3>Podcasts de 15 minutes</h3><p class="muted small">Deux animateurs discutent d'un sujet à ton niveau, avec transcription, mots du jour et quiz.</p></a>
    <a class="tile" href="#chat"><span class="eyebrow">Conversation</span><h3>Parler avec l'IA</h3><p class="muted small">Discute à l'écrit ou au micro : entretien d'embauche, café, small talk… Tes erreurs sont corrigées.</p></a>
  </section>

  <section class="panel">
    <div><h2>Écoute, touche l'image</h2><p class="muted">Pas de français : tu entends un mot, tu trouves l'image. 2 minutes par jour suffisent pour créer le réflexe.</p></div>
    ${pqHtml("home")}
  </section>

  <section style="display:flex;flex-direction:column;gap:12px">
    <h2>Ta progression</h2>
    <div class="stats">
      ${stat("vocab", "Mots connus", countKnown("v:"), vocabAll.length)}
      ${stat("chunks", "Chunks", countKnown("c:"), D.chunks.length)}
      ${stat("phrasal", "Phrasal verbs", countKnown("p:"), D.phrasal.length)}
      ${stat("grammar", "Grammaire validée", countKnown("g:"), D.grammar.length)}
      ${stat("stories", "Histoires lues", countKnown("s:"), D.stories.length)}
    </div>
    <p class="muted small">Touche l'étoile sur un mot, un chunk ou un phrasal verb quand tu le connais. Ta progression est gardée dans ce navigateur.</p>
  </section>

  <section style="display:flex;flex-direction:column;gap:12px">
    <h2>Les 5 niveaux</h2>
    <div class="ladder">${D.levels.map((l, i) => `<a href="#levels" style="background:${lvlCol[l.id]};min-height:${60 + i * 26}px"><b>${l.id}</b><span>${l.fr}</span></a>`).join("")}</div>
  </section>`;
}

function pageLevels() {
  const res = store.get("placement", null);
  const count = (arr, l, f = x => x.lvl) => arr.filter(x => f(x) === l).length;
  return `
  <header class="page-head"><span class="eyebrow">Cadre européen (CECRL)</span><h1>Niveaux A1 → C1</h1><p>Ce que tu sais faire à chaque niveau, ce qu'il faut travailler, et le contenu du site qui correspond. Les heures sont les estimations de Cambridge (cumulées, avec un cours guidé).</p></header>
  <section class="panel">
    <div><h2>Test de niveau express</h2><p class="muted">15 questions, de A1 à C1. Réponds sans réfléchir trop longtemps.${res ? ` Dernier résultat : <b>${res}</b>.` : ""}</p></div>
    ${mcq("placement", D.placement, (score, n, answers) => {
      const byLvl = {}; D.placement.forEach((it, i) => { byLvl[it.l] = (byLvl[it.l] || 0) + (answers[i] ? 1 : 0); });
      let lvl = "A1"; for (const l of LEVELS) { if ((byLvl[l] || 0) >= 2) lvl = l; else break; }
      if (score <= 2) lvl = "A1";
      store.set("placement", lvl);
      return `Score : ${score} / ${n}. Niveau estimé : <span class="lvl ${lvl}">${lvl}</span>. Commence par la grammaire et les histoires de ce niveau, puis monte. <a href="#grammar-lvl-${lvl}">Voir la grammaire ${lvl} →</a>`;
    })}
  </section>
  <section style="display:flex;flex-direction:column;gap:14px">
    ${D.levels.map(l => `
    <article class="panel lvcard" id="lv-${l.id}">
      <div class="band" style="background:var(--${l.id.toLowerCase()})"><b>${l.id}</b><span>${esc(l.name)}</span><span>${l.fr} · ${l.hours} · ${l.words}</span></div>
      <div class="body">
        <div><span class="eyebrow">Tu sais…</span><ul>${l.can.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
        <div><span class="eyebrow">À travailler</span><ul>${l.focus.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
        <div class="links">
          <a class="chip" href="#grammar-lvl-${l.id}">Grammaire · ${count(D.grammar, l.id)}</a>
          <a class="chip" href="#stories-lvl-${l.id}">Histoires · ${count(D.stories, l.id)}</a>
          <a class="chip" href="#vocab">Mots · ${count(vocabAll, l.id)}</a>
          <a class="chip" href="#chunks">Chunks · ${count(D.chunks, l.id)}</a>
          <a class="chip" href="#phrasal">Phrasal verbs · ${count(D.phrasal, l.id)}</a>
          <a class="chip" href="#phonetics">Phonétique · ${count(D.pron, l.id)}</a>
        </div>
      </div>
    </article>`).join("")}
  </section>`;
}

/* ---------- audio ---------- */
function pageAudio() {
  const tabs = [["picture", "Écoute & image"], ["dictation", "Dictée"], ["shadow", "Shadowing"], ["res", "Podcasts & ressources"]];
  let body = "";
  if (state.audioTab === "picture") {
    const pool = vocabAll.filter(x => LEVELS.indexOf(x.lvl) <= LEVELS.indexOf(state.audioLvl));
    const key = "audio-" + state.audioLvl;
    if (!pqs[key]) pqNew(key, pool, "sentence");
    body = `<div class="panel"><div><h3>Écoute la phrase, trouve l'image</h3><p class="muted">Tu entends une phrase complète. Trouve l'image du mot important. Tu comprends le sens global sans traduire, comme dans la vraie vie.</p></div>
      <div class="chips">${LEVELS.slice(0, 4).map(l => `<button class="chip" data-act="audio-lvl" data-l="${l}" aria-pressed="${state.audioLvl === l}">jusqu'à ${l}</button>`).join("")}</div>
      ${pqHtml(key)}</div>`;
  } else if (state.audioTab === "dictation") {
    const list = D.dictation[state.dictLvl]; const s = list[state.dictI % list.length];
    body = `<div class="panel"><div><h3>Dictée</h3><p class="muted">Écoute (autant de fois que tu veux), écris ce que tu entends, puis vérifie. Excellent pour entendre les petits mots que les natifs avalent.</p></div>
      <div class="chips">${LEVELS.map(l => `<button class="chip" data-act="dict-lvl" data-l="${l}" aria-pressed="${state.dictLvl === l}">${l}</button>`).join("")}</div>
      <div class="row"><button class="btn primary" data-act="say" data-t="${esc(s)}">${IC.speaker} Écouter</button><button class="btn" data-act="say" data-slow="1" data-t="${esc(s)}">${IC.slow} Lentement</button><span class="muted small">Phrase ${state.dictI % list.length + 1} / ${list.length}</span></div>
      <label for="dict-in" class="eyebrow">Ce que tu entends</label>
      <input class="dict-input" id="dict-in" autocomplete="off" spellcheck="false" placeholder="Tape la phrase…">
      <div class="row"><button class="btn" data-act="dict-check">Vérifier</button><button class="btn ghost" data-act="dict-next">Phrase suivante →</button></div>
      <div id="dict-res" class="diff" aria-live="polite"></div></div>`;
  } else if (state.audioTab === "shadow") {
    body = `<div class="panel"><div><h3>Shadowing</h3><p class="muted">Lance une ligne et parle EN MÊME TEMPS que la voix, comme son ombre. Commence en vitesse lente, puis normale. Tu copies le rythme et la mélodie, et tu n'as pas le temps de traduire.</p></div></div>
      ${D.shadowing.map((sh, si) => `<div class="panel"><div class="toolbar"><div class="row">${lvlTag(sh.lvl)}<h3>${esc(sh.title)}</h3></div><div class="row"><button class="btn primary" data-act="shadow-all" data-s="${si}">${IC.speaker} Tout lire</button><button class="btn" data-act="shadow-all" data-s="${si}" data-slow="1">${IC.slow} Lent</button></div></div>
        <div class="lines">${sh.lines.map((ln, li) => `<div class="line" id="sh-${si}-${li}">${sayBtn(ln)}${slowBtn(ln)}<span>${esc(ln)}</span></div>`).join("")}</div></div>`).join("")}`;
  } else {
    body = `<div class="reslist">${D.resources.map(r => `<a class="tile" href="${r.url}" target="_blank" rel="noopener"><div class="tile-top"><span class="pic big">${r.e}</span><span class="chip">${r.lvl}</span></div><h3>${esc(r.name)}</h3><p class="muted small">${esc(r.what)}</p></a>`).join("")}</div>
      <p class="muted small">Ces sites s'ouvrent dans un nouvel onglet. Astuce : écoute toujours avec les sous-titres ou la transcription en anglais, jamais en français.</p>`;
  }
  return `<header class="page-head"><span class="eyebrow">Compréhension orale</span><h1>Audio & écoute</h1><p>Tout le texte du site peut être écouté : touche l'icône haut-parleur. Change la voix (UK, US) et la vitesse dans les réglages audio.</p></header>
  <div class="tabs" role="tablist">${tabs.map(([id, l]) => `<button role="tab" aria-selected="${state.audioTab === id}" data-act="audio-tab" data-t="${id}">${l}</button>`).join("")}</div>${body}`;
}
function lcsDiff(target, typed) {
  const a = target.split(/\s+/), A = a.map(norm), B = norm(typed).split(" ").filter(Boolean);
  const m = A.length, n = B.length, L = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) L[i][j] = A[i] === B[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  const ok = new Array(m).fill(false); let i = 0, j = 0;
  while (i < m && j < n) { if (A[i] === B[j]) { ok[i] = true; i++; j++; } else if (L[i + 1][j] >= L[i][j + 1]) i++; else j++; }
  return { html: a.map((w, k) => `<span class="${ok[k] ? "ok" : "miss"}">${esc(w)}</span>`).join(" "), score: ok.filter(Boolean).length, total: m };
}

/* ---------- stories ---------- */
function pageStories(sub) {
  if (sub && sub.startsWith("lvl-")) state.storyLvl = sub.slice(4);
  else if (sub) { const s = D.stories.find(x => x.id === sub); if (s) return storyView(s); }
  const list = D.stories.filter(s => state.storyLvl === "all" || s.lvl === state.storyLvl);
  return `<header class="page-head"><span class="eyebrow">Lecture</span><h1>Mini-histoires</h1><p>Des histoires courtes en images, du A1 au C1, avec l'audio. Les mots difficiles sont expliqués par une image et de l'anglais simple, jamais par une traduction. Relis la même histoire plusieurs jours de suite.</p></header>
  ${levelChips("story-lvl", state.storyLvl)}
  <div class="grid wide">${list.map(s => `<a class="tile" href="#stories-${s.id}"><div class="tile-top"><span class="pic story-cover">${s.e}</span>${lvlTag(s.lvl)}</div><h3>${esc(s.title)}</h3><p class="pic" style="font-size:1.4rem;letter-spacing:4px">${s.scenes.map(x => x.e.split(/(?=\p{Extended_Pictographic})/u)[0]).join("")}</p><p class="muted small">${s.scenes.length} scènes · ${s.questions.length} questions${known.has("s:" + s.id) ? " · lue ✓" : ""}</p></a>`).join("") || '<p class="empty">Aucune histoire à ce niveau pour l\'instant.</p>'}</div>`;
}
function levelChips(act, cur) {
  return `<div class="chips"><button class="chip" data-act="${act}" data-l="all" aria-pressed="${cur === "all"}">Tous</button>${LEVELS.map(l => `<button class="chip" data-act="${act}" data-l="${l}" aria-pressed="${cur === l}">${l}</button>`).join("")}</div>`;
}
function glossify(text, gloss) {
  let html = esc(text);
  const keys = Object.keys(gloss).sort((a, b) => b.length - a.length);
  for (const k of keys) {
    const re = new RegExp(`\\b(${k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})\\b`, "i");
    html = html.replace(re, `<button class="gl" data-act="gloss" data-k="${esc(k)}">$1</button>`);
  }
  return html;
}
let currentStory = null;
function storyView(s) {
  currentStory = s;
  return `<a class="btn ghost back" href="#stories">← Toutes les histoires</a>
  <header class="page-head"><div class="row">${lvlTag(s.lvl)}<span class="pic" style="font-size:2rem">${s.e}</span></div><h1>${esc(s.title)}</h1><p>Écoute une première fois sans lire, en regardant seulement les images. Puis écoute en lisant. Les mots surlignés : touche-les pour voir leur image.</p>
  <div class="row"><button class="btn primary" data-act="story-play">${IC.speaker} Écouter toute l'histoire</button><button class="btn" data-act="story-play" data-slow="1">${IC.slow} Version lente</button></div></header>
  <div class="reader">${s.scenes.map((sc, i) => `<div class="scene" id="sc${i}"><div class="strip pic" aria-hidden="true">${sc.e}</div><div><p class="txt">${glossify(sc.t, s.gloss)}</p><div class="tools">${sayBtn(sc.t, "Écouter ce passage")}${slowBtn(sc.t)}</div></div></div>`).join("")}</div>
  <section class="panel" style="max-width:760px"><h2>Did you understand?</h2>${mcq("story-" + s.id, s.questions, (score, n) => {
    if (score >= n - 1 && !known.has("s:" + s.id)) toggleKnown("s:" + s.id);
    return `Score : ${score} / ${n}. ${score >= n - 1 ? "Histoire marquée comme lue ✓" : "Relis l'histoire et réessaie demain."}`;
  })}</section>
  <section class="panel" style="max-width:760px"><h3>Mots de l'histoire</h3><div class="wordrow">${Object.entries(s.gloss).map(([k, [e, def]]) => `<span class="wordpill" title="${esc(def)}"><span class="pic">${e}</span>${esc(k)}${sayBtn(k)}</span>`).join("")}</div></section>`;
}

/* ---------- vocabulary ---------- */
function pageVocab(sub) {
  const theme = D.vocab.find(t => t.id === sub);
  if (theme) return vocabTheme(theme);
  return `<header class="page-head"><span class="eyebrow">Dictionnaire en images</span><h1>Vocabulaire</h1><p>${vocabAll.length} mots en ${D.vocab.length} thèmes. Une image, un son, une phrase : jamais de traduction. Chaque thème a deux quiz pour ancrer le lien image → mot.</p></header>
  <div class="grid">${D.vocab.map(t => { const n = t.words.filter(w => known.has("v:" + w[1])).length; return `<a class="tile" href="#vocab-${t.id}"><div class="tile-top"><span class="pic big">${t.e}</span><span class="muted small">${n}/${t.words.length}</span></div><h3>${esc(t.name)}</h3><p class="pic" style="font-size:1.3rem;letter-spacing:3px">${t.words.slice(0, 6).map(w => w[0]).join("")}</p><div class="progress"><i style="width:${Math.round(n / t.words.length * 100)}%"></i></div></a>`; }).join("")}</div>`;
}
function vocabTheme(t) {
  const words = vocabAll.filter(x => x.theme === t.id);
  const tabs = [["learn", "Découvrir"], ["listen", "Quiz : écoute → image"], ["write", "Quiz : image → mot"]];
  let body = "";
  if (state.vocabTab === "learn") {
    body = `<div class="grid tight">${words.map(x => `<div class="tile wcard${known.has("v:" + x.w) ? " known" : ""}">${lvlTag(x.lvl)}<span class="pic">${x.e}</span><span class="word">${esc(x.w)}</span><span class="ipa small">${esc(x.ipa)}</span><span class="ex">${esc(x.ex)}</span><div class="acts">${sayBtn(x.w)}${sayBtn(x.ex, "Écouter la phrase")}${micBtn(x.w)}${starBtn("v:" + x.w)}</div></div>`).join("")}</div>`;
  } else if (state.vocabTab === "listen") {
    const key = "v-" + t.id; if (!pqs[key]) pqNew(key, words);
    body = `<div class="panel">${pqHtml(key)}</div>`;
  } else {
    if (!state.flash || state.flash.theme !== t.id) state.flash = { theme: t.id, order: shuffle(words), i: 0, ok: 0 };
    const f = state.flash; const x = f.order[f.i % f.order.length];
    body = `<div class="panel flash"><div class="flash-card"><span class="pic" style="font-size:5rem">${x.e}</span><p class="muted">Quel est ce mot ? Écris-le${document.body.classList.contains("has-mic") ? " ou dis-le" : ""}.</p>
      <input class="dict-input" id="vw-in" style="max-width:320px;text-align:center" autocomplete="off" spellcheck="false" placeholder="…">
      <div class="row" style="justify-content:center"><button class="btn primary" data-act="vw-check">Vérifier</button>${micBtn(x.w)}<button class="btn ghost" data-act="vw-show">Voir la réponse</button></div>
      <div id="vw-res" class="pq-msg" aria-live="polite"></div>
      <span class="score muted">${f.i % f.order.length + 1} / ${f.order.length} · bonnes réponses : ${f.ok}</span></div></div>`;
  }
  return `<a class="btn ghost back" href="#vocab">← Tous les thèmes</a>
  <header class="page-head"><div class="row"><span class="pic" style="font-size:2.2rem">${t.e}</span><h1>${esc(t.name)}</h1></div><p>Touche le haut-parleur pour entendre le mot, puis la phrase. Le micro vérifie ta prononciation. L'étoile = « je connais ».</p></header>
  <div class="tabs" role="tablist">${tabs.map(([id, l]) => `<button role="tab" aria-selected="${state.vocabTab === id}" data-act="vocab-tab" data-t="${id}">${l}</button>`).join("")}</div>${body}`;
}

/* ---------- chunks ---------- */
function pageChunks() {
  const q = norm(state.chunkQ);
  const inLvl = c => state.chunkLvl === "all" || c.lvl === state.chunkLvl;
  const list = D.chunks.filter(c => inLvl(c) && (state.chunkCat === "all" || c.c === +state.chunkCat) && (!q || norm(c.chunk + " " + c.ex + " " + c.fr).includes(q)));
  const catCount = i => D.chunks.filter(c => inLvl(c) && c.c === i).length;
  const frHtml = c => settings.immersion ? `<button class="fr-peek" data-act="peek" data-fr="${esc(c.fr)}">voir en français</button>` : `<span class="fr">≈ ${esc(c.fr)}</span>`;
  let body;
  if (state.chunkMode === "flash") {
    const pool = list.length ? list : D.chunks;
    const cfKey = [state.chunkLvl, state.chunkCat, q].join("|");
    if (!state.cf || state.cf.key !== cfKey) state.cf = { key: cfKey, c: pick(pool), shown: false };
    const c = state.cf.c; const core = c.chunk.replace(/[.,!?…]+$/, "");
    const re = new RegExp(core.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    const prompt = re.test(c.ex) ? esc(c.ex).replace(new RegExp(esc(core).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), '<span class="blank">&nbsp;</span>') : `${D.chunkCats[c.c].emoji} ${esc(D.chunkCats[c.c].name)}<br><span class="muted small">Indice : ${esc(core.split(" ").map(w => w[0] + "…").join(" "))}</span>`;
    body = `<div class="flash"><div class="flash-card"><span class="eyebrow">${D.chunkCats[c.c].emoji} ${esc(D.chunkCats[c.c].name)}</span><p class="q">${prompt}</p>
      ${state.cf.shown ? `<p class="a">${esc(c.chunk)}</p><p class="example muted">${esc(c.ex)}</p><div class="row" style="justify-content:center">${sayBtn(c.ex)}${starBtn("c:" + c.n)}</div>` : `<p class="muted small">Dis le chunk à voix haute en moins de 2 secondes, puis vérifie.</p>`}
      <div class="row" style="justify-content:center">${state.cf.shown ? "" : `<button class="btn primary" data-act="cf-show">Voir le chunk</button>`}<button class="btn" data-act="cf-next">Suivant →</button></div></div></div>`;
  } else {
    body = `<p class="muted small">${list.length} chunks${list.length > state.chunkLimit ? ` · ${state.chunkLimit} affichés` : ""}</p><div class="grid wide">${list.slice(0, state.chunkLimit).map(c => `<div class="tile ccard${known.has("c:" + c.n) ? " known" : ""}"><div class="tile-top"><span class="pic" style="font-size:1.8rem">${D.chunkCats[c.c].emoji}</span>${lvlTag(c.lvl)}</div><span class="chunk">${esc(c.chunk)}</span><span class="example muted">${esc(c.ex)}</span><div class="acts">${sayBtn(c.chunk)}${sayBtn(c.ex, "Écouter l'exemple")}${starBtn("c:" + c.n)}${frHtml(c)}</div></div>`).join("") || '<p class="empty">Aucun chunk ne correspond.</p>'}</div>${list.length > state.chunkLimit ? `<button class="btn" data-act="chunk-more" style="align-self:center">Voir 60 de plus (${list.length - state.chunkLimit} restants)</button>` : ""}`;
  }
  return `<header class="page-head"><span class="eyebrow">Blocs tout faits</span><h1>Chunks</h1><p>Les natifs ne construisent pas leurs phrases mot à mot : ils sortent des blocs tout prêts. Voici ${D.chunks.length} blocs classés de A1 à C1 et par situation. Apprends-les comme un seul mot, à voix haute, d'un seul souffle : commence par ton niveau et celui du dessous. Plus tu as de blocs, moins tu traduis.</p></header>
  <div class="toolbar"><input class="search" id="chunk-q" type="search" placeholder="Chercher un chunk…" value="${esc(state.chunkQ)}" aria-label="Chercher un chunk">
    <div class="chips"><button class="chip" data-act="chunk-mode" data-m="list" aria-pressed="${state.chunkMode === "list"}">Liste</button><button class="chip" data-act="chunk-mode" data-m="flash" aria-pressed="${state.chunkMode === "flash"}">Révision (cartes)</button></div></div>
  <div class="chips" aria-label="Niveau"><button class="chip" data-act="chunk-lvl" data-l="all" aria-pressed="${state.chunkLvl === "all"}">Tous les niveaux · ${D.chunks.length}</button>${LEVELS.map(l => `<button class="chip" data-act="chunk-lvl" data-l="${l}" aria-pressed="${state.chunkLvl === l}">${l} · ${D.chunks.filter(c => c.lvl === l).length}</button>`).join("")}</div>
  <div class="chips" aria-label="Situation"><button class="chip" data-act="chunk-cat" data-c="all" aria-pressed="${state.chunkCat === "all"}">Toutes les situations</button>${D.chunkCats.map((c, i) => [c, i, catCount(i)]).filter(x => x[2] > 0).map(([c, i, k]) => `<button class="chip" data-act="chunk-cat" data-c="${i}" aria-pressed="${state.chunkCat === String(i)}"><span class="pic">${c.emoji}</span> ${esc(c.name)} <span class="muted">${k}</span></button>`).join("")}</div>
  <div id="chunk-body" style="display:flex;flex-direction:column;gap:12px">${body}</div>`;
}

/* ---------- phrasal verbs ---------- */
const PARTICLES = [
  ["up", "complete · increase · appear"], ["down", "decrease · stop · on paper"], ["out", "exit · discover · to the end"], ["in", "enter · join · hand over"],
  ["off", "leave · stop · disconnect"], ["on", "continue · start · attach"], ["over", "review · from start to end"], ["back", "return · go back"], ["away", "distance · disappear"]
];
function head(x, y, a) { return `<polygon class="dg-head" points="0,0 -11,-6.5 -11,6.5" transform="translate(${x} ${y}) rotate(${a})"/>`; }
function diagram(p) {
  const g = '<line class="dg-ground" x1="14" y1="88" x2="126" y2="88"/>';
  const d = {
    up: `${g}<circle class="dg-ball" cx="70" cy="76" r="9"/><path class="dg-arrow" d="M70 64 V22"/>${head(70, 14, -90)}`,
    down: `${g}<circle class="dg-ball" cx="70" cy="16" r="9"/><path class="dg-arrow" d="M70 30 V70"/>${head(70, 78, 90)}`,
    out: `<rect class="dg-box" x="12" y="24" width="64" height="58" rx="6"/><circle class="dg-ball" cx="40" cy="53" r="9"/><path class="dg-arrow" d="M54 53 H118"/>${head(127, 53, 0)}`,
    in: `<rect class="dg-box" x="64" y="24" width="64" height="58" rx="6"/><path class="dg-arrow" d="M10 53 H86"/>${head(94, 53, 0)}<circle class="dg-ball" cx="108" cy="53" r="9"/>`,
    off: `<line class="dg-ground" x1="14" y1="70" x2="86" y2="70"/><path class="dg-arrow" d="M64 58 Q92 46 110 26"/>${head(116, 18, -52)}<circle class="dg-ball" cx="52" cy="60" r="9" opacity=".35"/>`,
    on: `<line class="dg-ground" x1="10" y1="72" x2="130" y2="72"/><circle class="dg-ball" cx="40" cy="62" r="9"/><path class="dg-arrow" d="M58 50 H112"/>${head(121, 50, 0)}`,
    over: `<rect class="dg-box" x="52" y="54" width="36" height="34" rx="4"/><path class="dg-arrow" d="M20 84 Q70 -10 116 76"/>${head(120, 84, 70)}<circle class="dg-ball" cx="20" cy="84" r="7"/>`,
    back: `<path class="dg-arrow" d="M22 34 H96 A20 20 0 0 1 96 74 H40"/>${head(31, 74, 180)}<circle class="dg-ball" cx="22" cy="34" r="8"/>`,
    away: `<circle class="dg-ball" cx="22" cy="53" r="9"/><path class="dg-arrow" d="M38 53 H110" stroke-dasharray="10 7"/>${head(122, 53, 0)}<circle class="dg-ball" cx="128" cy="53" r="3" opacity=".4"/>`
  }[p] || "";
  return `<svg viewBox="0 0 140 100" aria-hidden="true">${d}</svg>`;
}
function pagePhrasal() {
  const q = norm(state.pvQ);
  const list = D.phrasal.filter(p => (state.pvCat === "all" || p.c === +state.pvCat) && (!state.pvPart || p.part === state.pvPart || (state.pvPart === "in" && p.part === "into")) && (!q || norm(p.pv + " " + p.mean + " " + p.ex).includes(q)));
  let body;
  if (state.pvMode === "flash") {
    const pool = list.length ? list : D.phrasal;
    const key = [state.pvCat, state.pvPart, q].join("|");
    if (!state.pf || state.pf.key !== key) state.pf = { key, p: pick(pool), shown: false };
    const p = state.pf.p;
    body = `<div class="flash"><div class="flash-card"><span class="pic" style="font-size:4rem">${p.e}</span><p class="q">${esc(p.mean)}</p>
      ${state.pf.shown ? `<p class="a">${esc(p.pv)}</p><p class="example muted">${esc(p.ex)}</p><div class="row" style="justify-content:center">${sayBtn(p.ex)}${starBtn("p:" + p.pv)}</div>` : '<p class="muted small">Quel phrasal verb ? Dis-le, puis vérifie.</p>'}
      <div class="row" style="justify-content:center">${state.pf.shown ? "" : '<button class="btn primary" data-act="pf-show">Voir la réponse</button>'}<button class="btn" data-act="pf-next">Suivant →</button></div></div></div>`;
  } else {
    body = `<p class="muted small">${list.length} phrasal verbs</p><div class="grid wide">${list.map(p => `<div class="tile ccard${known.has("p:" + p.pv) ? " known" : ""}"><div class="tile-top"><span class="pic" style="font-size:2.2rem">${p.e}</span><div class="row">${lvlTag(p.lvl)}<span class="type">${esc(p.type)}</span></div></div><span class="chunk">${esc(p.pv)}</span><span class="small">${esc(p.mean)}</span><span class="example muted">${esc(p.ex)}</span><div class="acts">${sayBtn(p.pv)}${sayBtn(p.ex, "Écouter l'exemple")}${starBtn("p:" + p.pv)}</div></div>`).join("") || '<p class="empty">Aucun phrasal verb ne correspond.</p>'}</div>`;
  }
  return `<header class="page-head"><span class="eyebrow">Verbe + particule</span><h1>Phrasal verbs</h1><p>${D.phrasal.length} phrasal verbs classés par situation, expliqués en anglais simple. Ne les traduis pas : regarde ce que fait la particule. Elle a presque toujours la même logique.</p></header>
  <section class="panel"><div><h2>La logique des particules</h2><p class="muted">Touche une particule pour voir ses phrasal verbs. L'accent tombe sur la particule : set <b>UP</b>, figure <b>OUT</b>, give <b>UP</b>.</p></div>
    <div class="particles">${PARTICLES.map(([p, idea]) => `<button class="particle" data-act="pv-part" data-p="${p}" aria-pressed="${state.pvPart === p}">${diagram(p)}<b>${p.toUpperCase()}</b><span class="small muted">${idea}</span></button>`).join("")}</div>
    <div class="table-wrap"><table class="form-table"><tr><td>Séparable</td><td>Turn <b>off</b> the light. = Turn the light <b>off</b>.</td></tr><tr><td>Avec un pronom</td><td>Turn <b>it</b> off. ✅ · Turn off it. ❌</td></tr><tr><td>Inséparable</td><td>I'm looking <b>for</b> my keys.</td></tr><tr><td>Après to / of / for</td><td>I'm looking forward to <b>meeting</b> you. (-ing)</td></tr></table></div>
  </section>
  <div class="toolbar"><input class="search" id="pv-q" type="search" placeholder="Chercher (ex. up, problem)…" value="${esc(state.pvQ)}" aria-label="Chercher un phrasal verb">
    <div class="chips"><button class="chip" data-act="pv-mode" data-m="list" aria-pressed="${state.pvMode === "list"}">Liste</button><button class="chip" data-act="pv-mode" data-m="flash" aria-pressed="${state.pvMode === "flash"}">Révision (cartes)</button></div></div>
  <div class="chips"><button class="chip" data-act="pv-cat" data-c="all" aria-pressed="${state.pvCat === "all"}">Toutes les situations</button>${D.pvCats.map((c, i) => `<button class="chip" data-act="pv-cat" data-c="${i}" aria-pressed="${state.pvCat === String(i)}"><span class="pic">${c.emoji}</span> ${esc(c.name)}</button>`).join("")}</div>
  <div id="pv-body" style="display:flex;flex-direction:column;gap:12px">${body}</div>`;
}

/* ---------- grammar ---------- */
function timeline(tl) {
  const X = p => (30 + p * 5.4).toFixed(1);
  let s = `<svg viewBox="0 0 600 132" role="img" aria-label="${esc(tl.label)}">
    <line class="tl-line" x1="20" y1="64" x2="572" y2="64"/><polygon points="0,0 -12,-7 -12,7" transform="translate(584 64)" style="fill:var(--ink)"/>
    <text class="tl-txt" x="20" y="34">PAST</text><text class="tl-txt" x="584" y="34" text-anchor="end">FUTURE</text>
    <line class="tl-now" x1="${X(60)}" y1="24" x2="${X(60)}" y2="98"/><text class="tl-now-txt" x="${X(60)}" y="17" text-anchor="middle">NOW</text>`;
  for (const m of tl.marks) {
    if (m.k === "point") s += `<circle class="tl-point" cx="${X(m.x)}" cy="64" r="8"/>`;
    else if (m.k === "range") s += `<rect class="tl-range" x="${X(m.a)}" y="53" width="${(X(m.b) - X(m.a)).toFixed(1)}" height="22" rx="7"/>`;
    else if (m.k === "repeat") { for (let p = m.a; p <= m.b; p += 7) { const x = +X(p); s += `<path class="tl-x" d="M${x - 5} ${59} L${x + 5} ${69} M${x + 5} ${59} L${x - 5} ${69}"/>`; } }
    else if (m.k === "arrow") s += `<path class="dg-arrow" d="M${X(m.a)} 44 H${(+X(m.b) - 10).toFixed(1)}"/>${head(+X(m.b), 44, 0)}`;
    else if (m.k === "ghost") s += `<circle class="tl-ghost" cx="${X(m.x)}" cy="64" r="13"/><text class="tl-ghost-q" x="${X(m.x)}" y="69" text-anchor="middle">?</text>`;
  }
  s += `<text class="tl-label" x="300" y="124" text-anchor="middle">${esc(tl.label)}</text></svg>`;
  return `<div class="timeline">${s}</div>`;
}
function pageGrammar(sub) {
  if (sub && sub.startsWith("lvl-")) state.grammarLvl = sub.slice(4);
  else if (sub) { const g = D.grammar.find(x => x.id === sub); if (g) return grammarView(g); }
  const list = D.grammar.filter(g => state.grammarLvl === "all" || g.lvl === state.grammarLvl);
  return `<header class="page-head"><span class="eyebrow">Structure</span><h1>Grammaire</h1><p>${D.grammar.length} points de A1 à C1. Chaque temps a sa ligne du temps : tu VOIS quand l'action se passe au lieu de chercher l'équivalent français. Et pour chaque point, le piège typique des francophones.</p></header>
  ${levelChips("grammar-lvl", state.grammarLvl)}
  <div class="grid">${list.map(g => `<a class="tile" href="#grammar-${g.id}"><div class="tile-top"><span class="pic big">${g.pic}</span>${lvlTag(g.lvl)}</div><h3>${esc(g.title)}</h3><p class="muted small">${g.tl ? "Avec ligne du temps · " : ""}${g.quiz.length} questions${known.has("g:" + g.id) ? " · validé ✓" : ""}</p></a>`).join("")}</div>`;
}
function grammarView(g) {
  const idx = D.grammar.indexOf(g); const nxt = D.grammar[idx + 1];
  return `<a class="btn ghost back" href="#grammar">← Toute la grammaire</a>
  <header class="page-head"><div class="gtop"><span class="pic">${g.pic}</span><div>${lvlTag(g.lvl)}<h1>${esc(g.title)}</h1></div></div></header>
  ${g.tl ? `<section class="panel"><span class="eyebrow">Quand ?</span>${timeline(g.tl)}</section>` : ""}
  <section class="panel"><span class="eyebrow">L'idée</span><p style="font-size:1.08rem;max-width:68ch">${esc(g.idea)}</p>
    <div class="table-wrap"><table class="form-table">${g.form.map(r => `<tr><td>${esc(r[0])}</td><td>${r.slice(1).map(esc).join(" · ")}</td></tr>`).join("")}</table></div></section>
  <section class="panel"><span class="eyebrow">En images</span><div class="exs">${g.ex.map(([e, t]) => `<div class="exline"><span class="pic">${e}</span><span class="t">${esc(t)}</span>${sayBtn(t)}</div>`).join("")}</div></section>
  <section class="panel"><span class="eyebrow">Le piège du francophone</span><div class="trap"><div class="no"><small>Calque du français</small><span>${esc(g.trap[0])}</span></div><div class="yes"><small>En anglais</small>${esc(g.trap[1])}</div></div></section>
  <section class="panel"><h2>Check yourself</h2>${mcq("g-" + g.id, g.quiz, (score, n) => {
    if (score === n && !known.has("g:" + g.id)) toggleKnown("g:" + g.id);
    return `Score : ${score} / ${n}. ${score === n ? "Point validé ✓" : "Relis l'idée et le piège, puis réessaie (recharge la page)."}`;
  })}</section>
  ${nxt ? `<a class="btn" href="#grammar-${nxt.id}" style="align-self:flex-end">Suivant : ${esc(nxt.title)} →</a>` : ""}`;
}

/* ---------- phonetics ---------- */
function pagePhonetics() {
  const tabs = [["lessons", "Cours de prononciation"], ["chart", "Alphabet phonétique (API)"], ["pairs", "Paires minimales"]];
  let body = "";
  if (state.phonTab === "lessons") {
    body = `<p class="muted">Classés par priorité pour un francophone. Écoute chaque exemple à vitesse normale, puis lente, et répète à voix haute.</p>
    ${D.pron.map(l => `<details class="panel" ${l.id === "h" ? "open" : ""}><summary class="row" style="cursor:pointer;list-style:none"><span class="pic" style="font-size:1.6rem">${l.e}</span><h3 style="flex:1">${esc(l.title)}</h3>${lvlTag(l.lvl)}</summary>
      <p style="max-width:70ch">${esc(l.body)}</p>
      <div class="lines">${l.ex.map(([t, note]) => `<div class="line">${sayBtn(t)}${slowBtn(t)}<span style="flex:1;min-width:0">${esc(t)}${note ? ` <span class="muted small">— ${esc(note)}</span>` : ""}</span></div>`).join("")}</div>
      ${l.quiz ? mcq("pron-" + l.id, l.quiz) : ""}</details>`).join("")}`;
  } else if (state.phonTab === "chart") {
    const groups = [["short", "Voyelles courtes"], ["long", "Voyelles longues"], ["diph", "Diphtongues (2 sons qui glissent)"], ["cons", "Consonnes"]];
    const all = Object.values(D.ipa).flat(); const sel = all.find(x => x.s === state.ipaSel);
    body = `<div class="legend"><span><i style="background:var(--bad)"></i>N'existe pas en français</span><span><i style="background:var(--spark)"></i>Proche, mais différent</span><span><i style="background:var(--line)"></i>Comme en français</span></div>
    ${sel ? `<section class="panel" id="ipa-detail"><div class="ipa-detail"><span class="sym">/${esc(sel.s)}/</span><div style="display:flex;flex-direction:column;gap:10px"><p>${esc(sel.tip)}</p><div class="wordrow">${sel.w.map(([e, w]) => `<span class="wordpill"><span class="pic">${e}</span>${esc(w)}${sayBtn(w)}${micBtn(w)}</span>`).join("")}</div><div>${sayBtn(sel.w.map(x => x[1]).join(", "), "Écouter tous les mots")}</div></div></div></section>` : '<p class="muted">Touche un symbole pour voir comment le prononcer et l\'écouter dans des mots.</p>'}
    ${groups.map(([k, label]) => `<section class="ipa-group"><h3>${label}</h3><div class="ipa-grid">${D.ipa[k].map(x => `<button class="ipa-cell h${x.hard}" data-act="ipa" data-s="${esc(x.s)}" aria-pressed="${state.ipaSel === x.s}"><b>${esc(x.s)}</b><span class="pic">${x.w[0][0]}</span><small>${esc(x.w[0][1])}</small></button>`).join("")}</div></section>`).join("")}`;
  } else {
    const set = D.pairs.find(p => p.id === state.pairSet) || D.pairs[0];
    if (!state.pg || state.pg.set !== set.id) state.pg = { set: set.id, score: 0, total: 0 };
    if (!state.pg.cur) { const it = pick(set.items); state.pg.cur = { it, side: Math.random() < .5 ? 0 : 1, done: false }; }
    const { it, done } = state.pg.cur;
    body = `<div class="panel"><div><h3>Entends-tu la différence ?</h3><p class="muted">Tu entends UN des deux mots. Touche la bonne image. Ces paires sont celles que les francophones confondent le plus.</p></div>
      <div class="chips">${D.pairs.map(p => `<button class="chip" data-act="pair-set" data-s="${p.id}" aria-pressed="${p.id === set.id}"><span class="ipa" style="color:inherit">${esc(p.label)}</span></button>`).join("")}</div>
      <p class="small muted">Astuce : ${esc(set.hint)}</p>
      <div class="toolbar"><div class="row"><button class="btn primary" data-act="pair-play">${IC.speaker} Écouter</button><button class="btn" data-act="pair-play" data-slow="1">${IC.slow} Lentement</button></div><span class="score">${state.pg.score} / ${state.pg.total}</span></div>
      <div class="pair-opts">${[0, 1].map(k => `<button data-act="pair-pick" data-k="${k}" id="pair-${k}"><span class="pic">${it[k * 2]}</span><b>${done ? esc(it[k * 2 + 1]) : "?"}</b></button>`).join("")}</div>
      <div class="row"><div class="pq-msg" id="pair-msg" aria-live="polite"></div>${done ? '<button class="btn" data-act="pair-next">Suivant →</button>' : ""}</div>
      ${done ? `<div class="row">${[0, 1].map(k => `<span class="wordpill"><span class="pic">${it[k * 2]}</span>${esc(it[k * 2 + 1])}${sayBtn(it[k * 2 + 1])}${micBtn(it[k * 2 + 1])}</span>`).join("")}</div>` : ""}
    </div>
    <div class="panel"><h3>Toutes les paires de cette série</h3><div class="lines">${set.items.map(x => `<div class="line"><span class="pic">${x[0]}</span>${esc(x[1])}${sayBtn(x[1])}<span class="muted">vs</span><span class="pic">${x[2]}</span>${esc(x[3])}${sayBtn(x[3])}${sayBtn(x[1] + ", " + x[3], "Écouter les deux")}</div>`).join("")}</div></div>`;
  }
  return `<header class="page-head"><span class="eyebrow">Prononciation</span><h1>Phonétique</h1><p>Les sons de l'anglais, avec l'alphabet phonétique international (API), une image et un mot pour chacun, et des astuces de bouche pour un francophone.${document.body.classList.contains("has-mic") ? " Le bouton micro vérifie si on comprend ton mot." : ""}</p></header>
  <div class="tabs" role="tablist">${tabs.map(([id, l]) => `<button role="tab" aria-selected="${state.phonTab === id}" data-act="phon-tab" data-t="${id}">${l}</button>`).join("")}</div>${body}`;
}

/* ---------- tips ---------- */
function pageTips() {
  return `<header class="page-head"><span class="eyebrow">Méthode</span><h1>Conseils pour arrêter de traduire</h1><p>Traduire, c'est normal au début : ton cerveau s'appuie sur ce qu'il connaît. Ces ${D.tips.length} habitudes créent peu à peu un chemin direct vers l'anglais. Choisis-en deux cette semaine, pas douze.</p></header>
  <div class="grid wide">${D.tips.map(t => `<article class="tile tip"><span class="pic">${t.e}</span><h3>${esc(t.title)}</h3><p>${esc(t.body)}</p><p class="how"><b>Concrètement :</b> ${esc(t.how)}</p></article>`).join("")}</div>
  <section class="panel"><h2>Ta routine de 30 minutes</h2><div class="table-wrap"><table class="form-table">
    <tr><td>5 min</td><td>Vocabulaire en images : un quiz « écoute → image »</td></tr>
    <tr><td>5 min</td><td>2 chunks + 3 phrasal verbs, à voix haute, avec une phrase vraie sur ta vie</td></tr>
    <tr><td>10 min</td><td>Une mini-histoire : écoute sans lire, puis lis en écoutant, puis shadowing d'un passage</td></tr>
    <tr><td>5 min</td><td>Phonétique : une paire minimale ou un cours de prononciation</td></tr>
    <tr><td>5 min</td><td>Self-talk ou journal de 5 lignes, directement en anglais</td></tr>
  </table></div></section>`;
}

/* ================= CLAUDE (sample): podcasts + chat ================= */
let SAMPLE = null, SAMPLE_STATE = "pending";
const PERM_CODES = ["not_granted", "sampling_disabled", "not_declared", "capability_disabled", "capability_removed"];
function markDenied(code) { if (PERM_CODES.includes(code)) { SAMPLE = null; SAMPLE_STATE = "denied"; } }
function sampleErr(code) {
  return ({
    not_granted: "Tu n'as pas autorisé ce site à utiliser Claude. Tu peux changer ça dans le menu Permissions de l'artifact.",
    sampling_disabled: "Claude n'est pas disponible pour ce compte.",
    rate_limited: "Limite d'utilisation atteinte pour l'instant. Réessaie dans un moment.",
    session_expired: "Reconnecte-toi à claude.ai, puis réessaie.",
    refused: "Claude a refusé cette demande. Reformule ton message.",
    empty_completion: "La réponse est vide. Réessaie.",
    prompt_too_large: "La conversation est trop longue : commence une nouvelle conversation."
  })[code] || "La connexion à Claude a échoué. Réessaie.";
}
function sampleUnavailable(what) {
  if (SAMPLE_STATE === "pending") return `<div class="panel"><p class="muted">Connexion à Claude…</p></div>`;
  return `<div class="panel"><h3>${what} a besoin de Claude</h3><p class="muted">Ouvre ce site depuis claude.ai (dans Chrome, Edge ou l'application Claude) et autorise-le à utiliser Claude. ${SAMPLE_STATE === "denied" ? "Tu l'as refusé pour cette page : tu peux changer ça dans le menu Permissions de l'artifact." : ""}</p></div>`;
}

/* ---------- podcasts ---------- */
const POD_GUIDE = {
  A1: { words: 1600, wpm: 115, guide: "Very slow, very simple English. Short sentences of 5 to 10 words. Only the 600 most common words. Present simple, present continuous, can. Repeat the key words many times. When a new word appears, explain it right away with simple words or an example." },
  A2: { words: 1800, wpm: 125, guide: "Simple English and short sentences. About the 1,200 most common words. Past simple, going to, comparatives. Repeat and rephrase key ideas. Explain any less common word right away." },
  B1: { words: 2000, wpm: 135, guide: "Clear, natural English at a relaxed pace. Everyday vocabulary plus common phrasal verbs and idioms, explained naturally in context. A mix of tenses, including the present perfect and conditionals." },
  B2: { words: 2200, wpm: 150, guide: "Natural conversational English at normal speed: phrasal verbs, collocations, idioms, hedging, opinions with nuance. Now and then, explain an advanced expression." },
  C1: { words: 2300, wpm: 160, guide: "Sophisticated, idiomatic English between educated native speakers: nuance, irony, abstract vocabulary, complex structures (inversion, cleft sentences, mixed conditionals). Rich but clear." }
};
const HOST = { A: "Sam", B: "Alex" };
function podPrompt(ep) {
  const g = POD_GUIDE[ep.lvl];
  return `Write the full script of episode ${ep.n} of "Think in English", an English-learning podcast for French speakers. CEFR level: ${ep.lvl}.
Title: "${ep.title}". Focus: ${ep.focus}.
Hosts: Sam (line prefix "A:") and Alex (line prefix "B:"). They are two friendly hosts having a real conversation, not giving a lecture. They share personal anecdotes, ask each other questions and react naturally.
Length: about ${g.words} words of dialogue, which is about 15 minutes of audio. The length matters: do not stop early.
Language: ${g.guide}
Never use French. Explain meanings with simple English, examples and descriptions, so the listener learns to think in English.
Structure: a warm welcome and the topic; a main conversation with a concrete story and real-life examples (the listener is a software developer who wants to work abroad; use this when it fits); a segment called "Words of the day" where the hosts explain 6 useful words or expressions from the episode with examples; a short recap; a goodbye that invites the listener to answer the quiz.
Each turn is 1 to 5 sentences. Between 50 and 90 turns.

Output format: plain text, one item per line, no headings, no Markdown, nothing else:
A: <what Sam says>
B: <what Alex says>
(all the dialogue lines, in order)
VOCAB: <word or expression> | <simple English definition> | <one emoji>
(exactly 6 VOCAB lines: the words of the day)
QUIZ: <question about the episode> | <option 1> | <option 2> | <option 3> | <number of the correct option, 1 to 3>
(exactly 5 QUIZ lines)`;
}
function parsePod(text) {
  const lines = [], vocab = [], quiz = [];
  for (const raw of text.split("\n")) {
    const l = raw.trim().replace(/^[*_]+|[*_]+$/g, "");
    let m;
    if ((m = l.match(/^(A|B|Sam|Alex)\s*:\s*(.+)$/))) lines.push({ s: m[1] === "Sam" ? "A" : m[1] === "Alex" ? "B" : m[1], t: m[2].trim() });
    else if ((m = l.match(/^VOCAB\s*:\s*(.+)$/i))) { const p = m[1].split("|").map(x => x.trim()); if (p[0]) vocab.push({ w: p[0], d: p[1] || "", e: p[2] || "💬" }); }
    else if ((m = l.match(/^QUIZ\s*:\s*(.+)$/i))) { const p = m[1].split("|").map(x => x.trim()); const a = parseInt(p[4], 10) - 1; if (p.length >= 5 && a >= 0 && a < 3) quiz.push({ q: p[0], o: p.slice(1, 4), a }); }
  }
  return { lines, vocab, quiz };
}
const wordCount = lines => lines.reduce((a, l) => a + l.t.split(/\s+/).filter(Boolean).length, 0);
let podGen = null;
function podReady(id) { try { return localStorage.getItem("tie:pod:" + id) != null; } catch (e) { return false; } }
function podGenerate(ep) {
  if (!SAMPLE || podGen) return;
  const ctl = new AbortController();
  podGen = { id: ep.id, ctl, text: "" };
  rerender();
  SAMPLE(podPrompt(ep), { signal: ctl.signal, cache: false, onText: ({ text }) => { podGen.text = text; podLive(ep); } })
    .then(({ text, truncated }) => {
      podGen = null;
      const d = parsePod(text);
      if (d.lines.length < 10) toast("L'épisode n'a pas pu être écrit correctement. Réessaie.", 5000);
      else {
        store.set("pod:" + ep.id, d);
        if (!store.get("pod:" + ep.id, null)) toast("Le navigateur n'a pas pu enregistrer l'épisode (stockage plein ou bloqué).", 6000);
        if (truncated) toast("L'épisode est un peu plus court que prévu.");
      }
      if (currentBase === "podcasts") rerender();
    })
    .catch(e => {
      podGen = null;
      if (e.code !== "cancelled") { markDenied(e.code); toast(sampleErr(e.code), 6000); }
      if (currentBase === "podcasts") rerender();
    });
}
function podLive(ep) {
  const box = $("#pod-live"); if (!box || !podGen) return;
  const d = parsePod(podGen.text); const words = wordCount(d.lines); const target = POD_GUIDE[ep.lvl].words;
  $("#pod-prog").style.width = Math.min(100, Math.round(words / target * 100)) + "%";
  $("#pod-count").textContent = d.lines.length ? `${words} / ~${target} mots écrits` : "Claude prépare l'épisode…";
  box.innerHTML = d.lines.slice(-5).map(l => `<div class="line"><span class="spk ${l.s}">${HOST[l.s]}</span><span class="t">${esc(l.t)}</span></div>`).join("");
}
function podPlay(ep, from) {
  const d = store.get("pod:" + ep.id, null); if (!d) return;
  const clear = () => $$(".transcript .line.playing").forEach(x => x.classList.remove("playing"));
  Audio.speak(d.lines.slice(from).map((l, i) => ({ text: l.t, id: "pl-" + (from + i), voice: l.s })), {
    onLine: id => { clear(); if (id) { const el = document.getElementById(id); if (el) { el.classList.add("playing"); el.scrollIntoView({ block: "nearest", behavior: "smooth" }); } } },
    onEnd: () => { clear(); const b = $("#pod-pause"); if (b) b.textContent = "Pause"; }
  });
  const b = $("#pod-pause"); if (b) b.textContent = "Pause";
}
function pagePodcasts(sub) {
  if (sub && sub.startsWith("lvl-")) state.podLvl = sub.slice(4);
  else if (sub) { const ep = D.podcasts.find(x => x.id === sub); if (ep) return podcastView(ep); }
  const lv = state.podLvl || "all";
  const list = D.podcasts.filter(p => lv === "all" || p.lvl === lv);
  return `<header class="page-head"><span class="eyebrow">Écoute longue</span><h1>Podcasts</h1><p>100 épisodes d'environ 15 minutes, 20 par niveau. Sam et Alex discutent d'un sujet de la vie réelle, à ton niveau, sans jamais traduire. Chaque épisode a sa transcription, ses 6 mots du jour et un quiz.</p>
  <p class="small muted">Claude écrit chaque épisode la première fois que tu l'ouvres (environ une minute), puis il reste enregistré dans ce navigateur.</p></header>
  ${levelChips("pod-lvl", lv)}
  <div class="grid">${list.map(p => { const ready = podReady(p.id); return `<a class="tile" href="#podcasts-${p.id}"><div class="tile-top"><span class="eyebrow">Épisode ${p.n}</span>${lvlTag(p.lvl)}</div><h3>${esc(p.title)}</h3><p class="muted small">${esc(p.focus)}</p><p class="small">${known.has("e:" + p.id) ? "Écouté ✓" : ready ? "Prêt à écouter" : '<span class="muted">À créer</span>'}</p></a>`; }).join("")}</div>`;
}
function podcastView(ep) {
  const d = store.get("pod:" + ep.id, null);
  const g = POD_GUIDE[ep.lvl];
  const idx = D.podcasts.indexOf(ep), nxt = D.podcasts[idx + 1];
  let body;
  if (!d) {
    if (podGen && podGen.id === ep.id) {
      setTimeout(() => podLive(ep), 0);
      body = `<section class="panel"><div class="toolbar"><h3>Claude écrit l'épisode…</h3><button class="btn" data-act="pod-cancel">Arrêter</button></div>
        <div class="progress"><i id="pod-prog" style="width:0%"></i></div><p class="muted small" id="pod-count">Claude prépare l'épisode… (les premières lignes arrivent après quelques secondes)</p>
        <div class="lines live transcript" id="pod-live"></div></section>`;
    } else if (podGen) {
      body = `<section class="panel"><p>Un autre épisode est en cours d'écriture. Attends qu'il soit fini.</p><a class="btn" href="#podcasts-${podGen.id}">Voir l'épisode en cours</a></section>`;
    } else if (!SAMPLE) {
      body = sampleUnavailable("La création d'épisodes");
    } else {
      body = `<section class="panel"><h3>Cet épisode n'existe pas encore</h3><p class="muted">Claude va écrire un dialogue d'environ ${g.words} mots adapté au niveau ${ep.lvl}, avec 6 mots du jour et 5 questions. Ça prend environ une minute, ensuite l'épisode reste dans ce navigateur.</p>
        <button class="btn primary" data-act="pod-gen" data-id="${ep.id}" style="align-self:flex-start">Créer l'épisode</button></section>`;
    }
  } else {
    const words = wordCount(d.lines);
    const mins = Math.round(words / (g.wpm * settings.rate));
    body = `<section class="panel"><div class="toolbar"><div class="row">
        <button class="btn primary" data-act="pod-play" data-id="${ep.id}" data-from="0">${IC.speaker} Écouter l'épisode</button>
        <button class="btn" id="pod-pause" data-act="pod-pause">Pause</button>
        <button class="btn ghost" data-act="pod-stop">Stop</button></div>
        <span class="muted small">≈ ${mins} min à la vitesse choisie · ${words} mots</span></div>
        <label class="switch" style="justify-content:flex-start;gap:12px">Cacher le texte (écouter d'abord sans lire) <input type="checkbox" id="pod-hide"${state.podHide ? " checked" : ""}></label>
        ${ep.lvl === "A1" || ep.lvl === "A2" ? '<p class="small muted">Conseil : choisis la vitesse « Posée » dans les réglages audio pour la première écoute.</p>' : ""}
      </section>
      <section class="panel"><h2>Transcription</h2><p class="muted small">Touche le haut-parleur d'une ligne pour reprendre l'écoute à partir de là.</p>
        <div class="lines transcript${state.podHide ? " hide" : ""}" id="pod-tr">${d.lines.map((l, i) => `<div class="line" id="pl-${i}"><button class="icon-btn" data-act="pod-play" data-id="${ep.id}" data-from="${i}" aria-label="Écouter à partir d'ici" title="Écouter à partir d'ici">${IC.speaker}</button><span class="spk ${l.s}">${HOST[l.s]}</span><span class="t">${esc(l.t)}</span></div>`).join("")}</div></section>
      ${d.vocab.length ? `<section class="panel"><h2>Words of the day</h2><div class="exs">${d.vocab.map(v => `<div class="exline"><span class="pic">${esc(v.e)}</span><span class="t"><b>${esc(v.w)}</b> — ${esc(v.d)}</span>${sayBtn(v.w)}${starBtn("w:" + v.w.toLowerCase())}</div>`).join("")}</div></section>` : ""}
      ${d.quiz.length ? `<section class="panel"><h2>Quiz</h2>${mcq("pod-" + ep.id, d.quiz, (score, n) => {
        if (score >= n - 1 && !known.has("e:" + ep.id)) toggleKnown("e:" + ep.id);
        return `Score : ${score} / ${n}. ${score >= n - 1 ? "Épisode marqué comme écouté ✓" : "Réécoute l'épisode (avec le texte cette fois) et réessaie."}`;
      })}</section>` : ""}
      <button class="btn ghost" data-act="pod-regen" data-id="${ep.id}" style="align-self:flex-start">Réécrire cet épisode</button>`;
  }
  return `<a class="btn ghost back" href="#podcasts">← Tous les épisodes</a>
  <header class="page-head"><div class="row">${lvlTag(ep.lvl)}<span class="eyebrow">Épisode ${ep.n} / 100</span></div><h1>${esc(ep.title)}</h1><p>${esc(ep.focus)}</p></header>
  ${body}
  ${nxt ? `<a class="btn" href="#podcasts-${nxt.id}" style="align-self:flex-end">Épisode suivant : ${esc(nxt.title)} →</a>` : ""}`;
}

/* ---------- chat ---------- */
const SCENARIOS = [
  { id: "free", name: "Conversation libre", role: "a friendly English-speaking friend who chats with the learner about their life, interests, work and plans" },
  { id: "interview", name: "Entretien d'embauche", role: "an interviewer hiring for a developer or pedagogy staff position at a 42 network coding school campus abroad. Ask typical interview questions one at a time (introduction, projects, teamwork, a failure, motivation, the learner's questions), follow up on their answers, and stay professional but warm" },
  { id: "smalltalk", name: "Pause café au travail", role: "a new colleague during a coffee break, making small talk about the weekend, the city, work and hobbies" },
  { id: "restaurant", name: "Au restaurant", role: "a waiter in a London restaurant. Take the order, answer questions about the menu, and at some point handle a small problem (a missing dish, a wrong bill)" },
  { id: "travel", name: "Voyage & hôtel", role: "first a hotel receptionist at check-in, then a local person the learner asks for directions and recommendations" },
  { id: "project", name: "Présenter un projet", role: "a curious non-technical manager who asks the learner to explain one of their coding projects simply: what it does, how it works, the hardest part, what they learnt" },
  { id: "debate", name: "Débat", role: "a friendly debate partner. Choose a light topic (remote work, social media, AI, city vs countryside), take the side opposite to the learner, and challenge their arguments politely" },
  { id: "teacher", name: "Question au prof", role: "a patient English teacher who answers the learner's questions about grammar, vocabulary and pronunciation with simple explanations and many examples, then gives a tiny exercise" }
];
const CHAT_LVL = {
  A1: "very short, very simple sentences; only basic, common words; mostly present tense",
  A2: "short, simple sentences with common words",
  B1: "clear everyday English with some common phrasal verbs",
  B2: "natural English with phrasal verbs, collocations and a few idioms",
  C1: "fully natural, idiomatic English with nuance"
};
const chat = Object.assign({ sc: "free", lvl: store.get("placement", null) || "B1", msgs: [] }, store.get("chat", {}));
if (settings.chatFix === undefined) settings.chatFix = true;
if (settings.chatVoice === undefined) settings.chatVoice = true;
let chatCtl = null, chatErr = null, chatSugg = null;
const saveChat = () => store.set("chat", { sc: chat.sc, lvl: chat.lvl, msgs: chat.msgs.slice(-60) });
function chatRules() {
  const sc = SCENARIOS.find(s => s.id === chat.sc) || SCENARIOS[0];
  return `You are an English conversation partner on a learning website. The learner is a French speaker, CEFR level ${chat.lvl}. Their main difficulty is that they translate from French in their head, so help them think directly in English.
Your role: ${sc.role}.
Rules:
- Stay in your role and keep the conversation going. Reply in 1 to 4 sentences, then ask one question.
- Language level: ${CHAT_LVL[chat.lvl]}.
- Write only in English. If the learner writes in French or mixes languages, reply in simple English and give them a model sentence to say instead.
- If the learner seems stuck, offer two simple ways to answer.
- Plain text only: no Markdown, no emojis, no bullet lists in your reply.
${settings.chatFix ? '- After your reply, if the learner\'s LAST message contains mistakes (grammar, word choice, unnatural phrasing, French calques), add a line "### CORRECTIONS" followed by up to 3 lines like "- wrong words → better words (very short reason in simple English)". Only real mistakes. If there are none, write nothing after your reply.' : "- Do not correct the learner's mistakes."}`;
}
function parseChat(text) {
  const parts = text.split(/\n?\s*#{2,3}\s*CORRECTIONS?\s*:?\s*\n?/i);
  const fixes = (parts[1] || "").split("\n").map(x => x.replace(/^\s*[-•*]\s*/, "").trim()).filter(Boolean).slice(0, 3);
  return { reply: parts[0].trim(), fixes };
}
function chatAsk() {
  if (!SAMPLE || chatCtl) return;
  const ctl = new AbortController(); chatCtl = ctl; chatErr = null; chatSugg = null;
  const userIdx = chat.msgs.length && chat.msgs[chat.msgs.length - 1].r === "u" ? chat.msgs.length - 1 : -1;
  const turns = chat.msgs.slice(-30).map(m => ({ role: m.r === "u" ? "user" : "assistant", content: m.t }));
  const input = [{ role: "user", content: chatRules() + (chat.msgs.length ? "" : "\n\nStart now: greet the learner and open the conversation for this scenario with one question.") }, ...turns];
  if (input[input.length - 1].role !== "user") input.push({ role: "user", content: "(Continue the conversation.)" });
  renderChatLog();
  SAMPLE(input, { cache: false, modelTier: "quick", signal: ctl.signal, onText: ({ text }) => { const el = $("#chat-stream"); if (el) { el.classList.remove("thinking"); el.textContent = parseChat(text).reply; } } })
    .then(({ text }) => {
      chatCtl = null;
      const { reply, fixes } = parseChat(text);
      if (userIdx >= 0 && settings.chatFix) chat.msgs[userIdx].fixes = fixes;
      chat.msgs.push({ r: "a", t: reply }); saveChat(); renderChatLog();
      if (settings.chatVoice) Audio.speak(reply);
    })
    .catch(e => {
      chatCtl = null;
      if (e.code === "cancelled") { if (e.text && parseChat(e.text).reply) { chat.msgs.push({ r: "a", t: parseChat(e.text).reply + " …" }); saveChat(); } }
      else { markDenied(e.code); chatErr = e.code; }
      if (currentBase === "chat") { if (SAMPLE_STATE === "denied") rerender(); else renderChatLog(); }
    });
}
function chatSend(text) {
  text = (text || "").trim(); if (!text || chatCtl) return;
  chat.msgs.push({ r: "u", t: text }); saveChat();
  const i = $("#chat-in"); if (i) i.value = "";
  chatAsk();
}
function chatSubmit() {
  if (Mic.d && Mic.mode === "chat" && Mic.d.active()) { Mic.d.stop().catch(() => {}).then(() => chatSend($("#chat-in").value)); return; }
  chatSend($("#chat-in").value);
}
function chatSuggest() {
  if (!SAMPLE || chatCtl) return;
  const last = chat.msgs.slice(-6).map(m => (m.r === "u" ? "Learner: " : "Partner: ") + m.t).join("\n");
  chatSugg = "loading"; renderChatLog();
  SAMPLE.json(`A French learner of English (CEFR ${chat.lvl}) is in this conversation:\n\n${last}\n\nSuggest 3 different short replies (at most 15 words each) the learner could say next, natural and at their level. Reply with only a JSON array of 3 strings.`, { modelTier: "quick", cache: false })
    .then(arr => { chatSugg = Array.isArray(arr) ? arr.map(String).slice(0, 3) : null; renderChatLog(); })
    .catch(e => { chatSugg = null; markDenied(e.code); toast(sampleErr(e.code)); renderChatLog(); });
}
function chatBubble(m) {
  if (m.r === "u") {
    const fx = m.fixes ? (m.fixes.length ? `<div class="fixes"><b>Pour dire plus naturellement :</b>${m.fixes.map(f => `<div>${esc(f)}</div>`).join("")}</div>` : `<div class="fixes ok">✓ Aucune erreur</div>`) : "";
    return `<div class="msg me"><div class="bub">${esc(m.t)}</div>${fx}</div>`;
  }
  return `<div class="msg ai"><div class="bub">${esc(m.t)}</div><div class="row">${sayBtn(m.t)}${slowBtn(m.t)}</div></div>`;
}
function renderChatLog() {
  const log = $("#chat-log"); if (!log) return;
  let html = chat.msgs.map(chatBubble).join("");
  if (chatCtl) html += `<div class="msg ai"><div class="bub thinking" id="chat-stream">…</div></div>`;
  if (!chat.msgs.length && !chatCtl) html += `<div class="empty">Choisis un scénario et ton niveau, puis lance la conversation. Claude parle en premier.<br><br><button class="btn primary" data-act="chat-start">Commencer la conversation</button></div>`;
  if (chatErr) html += `<div class="fixes" style="align-self:center"><b>${esc(sampleErr(chatErr))}</b><button class="btn" data-act="chat-retry" style="align-self:flex-start">Réessayer</button></div>`;
  log.innerHTML = html;
  log.scrollTop = log.scrollHeight;
  const send = $("#chat-send"); if (send) { send.textContent = chatCtl ? "Stop" : "Envoyer"; send.dataset.act = chatCtl ? "chat-stop" : "chat-send"; }
  const sg = $("#chat-sugg");
  if (sg) sg.innerHTML = chatSugg === "loading" ? '<span class="muted small">Je cherche des idées…</span>' : chatSugg ? chatSugg.map(s => `<button class="chip" data-act="chat-use" data-t="${esc(s)}">${esc(s)}</button>`).join("") : "";
}
function pageChat() {
  if (!SAMPLE) return `<header class="page-head"><span class="eyebrow">Conversation</span><h1>Parler avec l'IA</h1></header>${sampleUnavailable("Le chat")}`;
  setTimeout(renderChatLog, 0);
  const quick = ["Can you say that more simply?", "Sorry, could you repeat that?", "What does that word mean?", "How do you say it in English?"];
  return `<header class="page-head"><span class="eyebrow">Conversation</span><h1>Parler avec l'IA</h1><p>Un partenaire de conversation qui s'adapte à ton niveau. Écris ou parle au micro, en anglais. Tes erreurs sont corrigées sous ton message, sans traduction.</p></header>
  <div class="chat-wrap">
    <div class="chips">${SCENARIOS.map(s => `<button class="chip" data-act="chat-sc" data-s="${s.id}" aria-pressed="${chat.sc === s.id}">${esc(s.name)}</button>`).join("")}</div>
    <div class="toolbar"><div class="chips">${LEVELS.map(l => `<button class="chip" data-act="chat-lvl" data-l="${l}" aria-pressed="${chat.lvl === l}">${l}</button>`).join("")}</div>
      <div class="row"><label class="switch" style="gap:8px">Corrections <input type="checkbox" id="chat-fix"${settings.chatFix ? " checked" : ""}></label><label class="switch" style="gap:8px">Réponses à voix haute <input type="checkbox" id="chat-voice"${settings.chatVoice ? " checked" : ""}></label><button class="btn ghost" data-act="chat-new">Nouvelle conversation</button></div></div>
    <div class="chat-log" id="chat-log" aria-live="polite"></div>
    <div class="chips">${quick.map(q => `<button class="chip" data-act="chat-quick" data-t="${esc(q)}">${esc(q)}</button>`).join("")}<button class="chip" data-act="chat-sugg">Je ne sais pas quoi dire</button></div>
    <div class="chips" id="chat-sugg"></div>
    <p class="small muted" id="chat-partial" aria-live="polite"></p>
    <div class="chat-input"><textarea id="chat-in" rows="2" placeholder="Write in English… (Entrée pour envoyer, Maj+Entrée pour aller à la ligne)" aria-label="Ton message"></textarea>
      <button class="icon-btn mic" id="chat-mic" data-act="chat-mic" aria-label="Parler au micro" title="Parler au micro">${IC.mic}</button>
      <button class="btn primary" id="chat-send" data-act="chat-send">Envoyer</button></div>
  </div>`;
}

/* ================= ROUTER ================= */
const PAGES = { home: pageHome, levels: pageLevels, audio: pageAudio, podcasts: pagePodcasts, chat: pageChat, stories: pageStories, vocab: pageVocab, chunks: pageChunks, phrasal: pagePhrasal, grammar: pageGrammar, phonetics: pagePhonetics, tips: pageTips };
function render(keepScroll) {
  const h = (location.hash || "#home").slice(1);
  const i = h.indexOf("-");
  const base = i < 0 ? h : h.slice(0, i), sub = i < 0 ? "" : h.slice(i + 1);
  const fn = PAGES[base] || pageHome;
  currentBase = PAGES[base] ? base : "home";
  const y = window.scrollY;
  $("#main").innerHTML = `<div class="page">${fn(sub)}</div>`;
  renderNav();
  if (!keepScroll) window.scrollTo(0, 0); else window.scrollTo(0, y);
}
function rerender() { render(true); }
window.addEventListener("hashchange", () => { Audio.stop(); closePop(); state.flash = null; render(false); });

/* ================= ACTIONS ================= */
const ACTS = {
  say: b => Audio.speak(b.dataset.t, b.dataset.slow ? { rate: 0.7 } : {}),
  mic: b => Mic.start(b.dataset.t),
  "mic-stop": () => { if (Mic.d) Mic.d.stop().catch(() => {}); },
  "mic-close": () => { $("#listening").hidden = true; },
  known: b => { const id = b.dataset.id; toggleKnown(id); const on = known.has(id); $$(`[data-act="known"][data-id="${CSS.escape(id)}"]`).forEach(x => { x.classList.toggle("on", on); x.setAttribute("aria-pressed", on); const card = x.closest(".wcard, .ccard"); if (card) card.classList.toggle("known", on); }); },
  peek: b => { b.outerHTML = `<span class="fr">≈ ${esc(b.dataset.fr)}</span>`; },
  mcq: b => mcqPick(b),
  "pq-play": b => pqPlay(b.dataset.k),
  "pq-pick": b => pqPick(b),
  "pq-next": b => { const k = b.dataset.k; pqNew(k, pqs[k].pool, pqs[k].mode); pqRefresh(k); pqPlay(k); },
  gloss: b => { const s = currentStory; const [e, def] = s.gloss[b.dataset.k]; openPop(`<span class="pic">${e}</span><div><b>${esc(b.dataset.k)}</b><p class="small">${esc(def)}</p></div><div class="row">${sayBtn(b.dataset.k)}<button class="icon-btn" data-act="pop-close" aria-label="Fermer">✕</button></div>`); Audio.speak(b.dataset.k); },
  "pop-close": () => closePop(),
  "story-play": b => {
    const s = currentStory; const clear = () => $$(".scene.playing").forEach(x => x.classList.remove("playing"));
    Audio.speak(s.scenes.map((sc, i) => ({ text: sc.t, id: "sc" + i })), { rate: b.dataset.slow ? 0.75 : undefined, onLine: id => { clear(); if (id) { const el = document.getElementById(id); if (el) { el.classList.add("playing"); el.scrollIntoView({ block: "nearest", behavior: "smooth" }); } } }, onEnd: clear });
  },
  "story-lvl": b => { state.storyLvl = b.dataset.l; if (location.hash !== "#stories") location.hash = "#stories"; else rerender(); },
  "grammar-lvl": b => { state.grammarLvl = b.dataset.l; if (location.hash !== "#grammar") location.hash = "#grammar"; else rerender(); },
  "audio-tab": b => { state.audioTab = b.dataset.t; Audio.stop(); rerender(); },
  "audio-lvl": b => { state.audioLvl = b.dataset.l; rerender(); },
  "dict-lvl": b => { state.dictLvl = b.dataset.l; state.dictI = 0; rerender(); },
  "dict-next": () => { state.dictI++; rerender(); },
  "dict-check": () => { const s = D.dictation[state.dictLvl][state.dictI % D.dictation[state.dictLvl].length]; const r = lcsDiff(s, $("#dict-in").value); $("#dict-res").innerHTML = `<p style="font-size:1.1rem">${r.html}</p><p class="muted small">${r.score} / ${r.total} mots. En rouge : ce qui manque ou diffère.</p>`; },
  "shadow-all": b => { const si = +b.dataset.s; const sh = D.shadowing[si]; const clear = () => $$(".line.playing").forEach(x => x.classList.remove("playing")); Audio.speak(sh.lines.map((t, li) => ({ text: t, id: `sh-${si}-${li}` })), { rate: b.dataset.slow ? 0.75 : undefined, onLine: id => { clear(); if (id) { const el = document.getElementById(id); if (el) el.classList.add("playing"); } }, onEnd: clear }); },
  "vocab-tab": b => { state.vocabTab = b.dataset.t; state.flash = null; rerender(); },
  "vw-check": () => { const f = state.flash; const x = f.order[f.i % f.order.length]; const ok = norm($("#vw-in").value) === norm(x.w.split(" / ")[0].replace(/\(.*?\)/g, "")); const r = $("#vw-res"); if (ok) { if (!f.answered) f.ok++; f.answered = true; r.innerHTML = `<span style="color:var(--good)">Oui : ${esc(x.w)}</span> <span class="ipa">${esc(x.ipa)}</span> <button class="btn" data-act="vw-next">Suivant →</button>`; Audio.speak(x.w); } else { f.answered = true; r.innerHTML = `<span style="color:var(--bad)">Pas tout à fait.</span> <button class="btn ghost" data-act="vw-show">Voir la réponse</button>`; } },
  "vw-show": () => { const f = state.flash; const x = f.order[f.i % f.order.length]; f.answered = true; $("#vw-res").innerHTML = `${esc(x.w)} <span class="ipa">${esc(x.ipa)}</span> <button class="btn" data-act="vw-next">Suivant →</button>`; Audio.speak(x.w); },
  "vw-next": () => { state.flash.i++; state.flash.answered = false; rerender(); setTimeout(() => { const i = $("#vw-in"); if (i) i.focus(); }, 0); },
  "chunk-cat": b => { state.chunkCat = b.dataset.c; state.chunkLimit = 60; rerender(); },
  "chunk-lvl": b => { state.chunkLvl = b.dataset.l; state.chunkCat = "all"; state.chunkLimit = 60; rerender(); },
  "chunk-more": () => { state.chunkLimit += 60; rerender(); },
  "chunk-mode": b => { state.chunkMode = b.dataset.m; rerender(); },
  "cf-show": () => { state.cf.shown = true; rerender(); Audio.speak(state.cf.c.chunk); },
  "cf-next": () => { state.cf = null; rerender(); },
  "pv-cat": b => { state.pvCat = b.dataset.c; rerender(); },
  "pv-part": b => { state.pvPart = state.pvPart === b.dataset.p ? "" : b.dataset.p; rerender(); },
  "pv-mode": b => { state.pvMode = b.dataset.m; rerender(); },
  "pf-show": () => { state.pf.shown = true; rerender(); Audio.speak(state.pf.p.pv); },
  "pf-next": () => { state.pf = null; rerender(); },
  "phon-tab": b => { state.phonTab = b.dataset.t; Audio.stop(); rerender(); },
  ipa: b => { state.ipaSel = b.dataset.s; rerender(); const d = $("#ipa-detail"); if (d) d.scrollIntoView({ block: "nearest", behavior: "smooth" }); const x = Object.values(D.ipa).flat().find(y => y.s === b.dataset.s); if (x) Audio.speak(x.w.map(w => w[1]).join(", ")); },
  "pair-set": b => { state.pairSet = b.dataset.s; state.pg = null; rerender(); },
  "pair-play": b => { const c = state.pg.cur; Audio.speak(c.it[c.side * 2 + 1], b.dataset.slow ? { rate: 0.7 } : {}); },
  "pair-pick": b => { const c = state.pg.cur; if (c.done) return; const k = +b.dataset.k; c.done = true; state.pg.total++; const ok = k === c.side; if (ok) state.pg.score++; rerender(); $("#pair-" + c.side).classList.add("right"); if (!ok) $("#pair-" + k).classList.add("wrong"); $("#pair-msg").innerHTML = ok ? `<span style="color:var(--good)">Bravo : « ${esc(c.it[c.side * 2 + 1])} »</span>` : `<span style="color:var(--bad)">C'était « ${esc(c.it[c.side * 2 + 1])} ». Réécoute les deux.</span>`; },
  "pod-lvl": b => { state.podLvl = b.dataset.l; if (location.hash !== "#podcasts") location.hash = "#podcasts"; else rerender(); },
  "pod-gen": b => { const ep = D.podcasts.find(x => x.id === b.dataset.id); if (ep) podGenerate(ep); },
  "pod-regen": b => { const ep = D.podcasts.find(x => x.id === b.dataset.id); if (!ep || !SAMPLE) { toast("La réécriture a besoin de Claude (ouvre le site sur claude.ai)."); return; } Audio.stop(); podGenerate(ep); },
  "pod-cancel": () => { if (podGen) podGen.ctl.abort(); },
  "pod-play": b => { const ep = D.podcasts.find(x => x.id === b.dataset.id); if (ep) podPlay(ep, +b.dataset.from || 0); },
  "pod-pause": b => { if (Audio.paused) { Audio.resume(); b.textContent = "Pause"; } else { Audio.pause(); b.textContent = "Reprendre"; } },
  "pod-stop": () => Audio.stop(),
  "chat-start": () => chatAsk(),
  "chat-retry": () => { chatErr = null; chatAsk(); },
  "chat-send": () => chatSubmit(),
  "chat-stop": () => { if (chatCtl) chatCtl.abort(); },
  "chat-quick": b => chatSend(b.dataset.t),
  "chat-use": b => { const i = $("#chat-in"); i.value = b.dataset.t; i.focus(); },
  "chat-sugg": () => chatSuggest(),
  "chat-mic": () => Mic.startChat(),
  "chat-new": () => { if (chatCtl) chatCtl.abort(); chat.msgs = []; chatErr = null; chatSugg = null; saveChat(); renderChatLog(); },
  "chat-sc": b => { if (chatCtl) chatCtl.abort(); chat.sc = b.dataset.s; chat.msgs = []; chatErr = null; chatSugg = null; saveChat(); rerender(); chatAsk(); },
  "chat-lvl": b => { chat.lvl = b.dataset.l; saveChat(); $$('[data-act="chat-lvl"]').forEach(x => x.setAttribute("aria-pressed", x.dataset.l === chat.lvl)); },
  "pair-next": () => { state.pg.cur = null; rerender(); const c = state.pg.cur; Audio.speak(c.it[c.side * 2 + 1]); }
};
document.addEventListener("click", e => {
  const b = e.target.closest("[data-act]");
  if (!b) { if (!$("#pop").hidden && !e.target.closest("#pop")) closePop(); return; }
  const fn = ACTS[b.dataset.act]; if (fn) { e.preventDefault(); fn(b, e); }
});
document.addEventListener("input", e => {
  if (e.target.id === "chunk-q") { state.chunkQ = e.target.value; state.chunkLimit = 60; const pos = e.target.selectionStart; rerender(); const i = $("#chunk-q"); i.focus(); i.setSelectionRange(pos, pos); }
  if (e.target.id === "pv-q") { state.pvQ = e.target.value; const pos = e.target.selectionStart; rerender(); const i = $("#pv-q"); i.focus(); i.setSelectionRange(pos, pos); }
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !$("#pop").hidden) { e.preventDefault(); closePop(); }
  if (e.key === "Enter" && e.target.id === "dict-in") ACTS["dict-check"]();
  if (e.key === "Enter" && e.target.id === "vw-in") ACTS["vw-check"]();
  if (e.key === "Enter" && !e.shiftKey && e.target.id === "chat-in") { e.preventDefault(); chatSubmit(); }
});
document.addEventListener("change", e => {
  if (e.target.id === "pod-hide") { state.podHide = e.target.checked; const t = $("#pod-tr"); if (t) t.classList.toggle("hide", state.podHide); }
  if (e.target.id === "chat-fix") { settings.chatFix = e.target.checked; saveSettings(); }
  if (e.target.id === "chat-voice") { settings.chatVoice = e.target.checked; saveSettings(); }
});
$("#stop-btn").addEventListener("click", () => Audio.stop());
$("#gear").addEventListener("click", () => $("#settings").classList.toggle("open"));
$("#set-engine").addEventListener("change", e => { settings.engine = e.target.value; saveSettings(); });
$("#set-rate").value = String(settings.rate);
$("#set-rate").addEventListener("change", e => { settings.rate = +e.target.value; saveSettings(); if (Audio.tts && Audio.tts.setRate) Audio.tts.setRate(settings.rate).catch(() => {}); });
$("#set-immersion").checked = settings.immersion;
$("#set-immersion").addEventListener("change", e => { settings.immersion = e.target.checked; saveSettings(); rerender(); });

render(false);
Audio.init();
Mic.init().then(() => { if (Mic.d && (currentBase === "phonetics" || currentBase === "vocab")) rerender(); });
(async () => {
  if (window.claude && typeof window.claude.use === "function") { try { SAMPLE = await window.claude.use("sample"); } catch (e) { SAMPLE = null; } }
  SAMPLE_STATE = SAMPLE ? "ok" : "none";
  if (currentBase === "podcasts" || currentBase === "chat") rerender();
})();
})();
