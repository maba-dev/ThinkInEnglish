window.DATA = window.DATA || {};
/* Loaders for the "plus" content: 50 grammar points, ~50 vocabulary themes and 20 stories per level.
   Grammar text format (one block per point):
     @ id | rank | title | emoji
     idea text (one line, in French)
     F: label = forms            (table rows, several)
     E: emoji | English sentence (examples, several)
     T: French calque || English (the trap)
     Q: question || option | *correct option | option   (quiz, several)
   Points are sorted by `rank` inside each level; existing points get their rank from GRANK. */
(function () {
  const ORDER = ["A1", "A2", "B1", "B2", "C1"];
  const GRANK = {
    "be": 2, "articles": 4, "present-simple": 7, "possessives": 11, "there-is": 15, "can": 20, "present-continuous": 23, "in-on-at": 25,
    "past-simple": 3, "past-continuous": 8, "future": 14, "comparatives": 20, "quantifiers": 25, "frequency": 1, "questions": 11, "just-already-yet": 31,
    "present-perfect": 2, "present-perfect-cont": 5, "conditionals-1-2": 12, "passive": 18, "modals-obligation": 22, "used-to": 9, "gerund-infinitive": 27, "dependent-prepositions": 33,
    "past-perfect": 1, "conditional-3": 4, "reported-speech": 10, "relative": 15, "deduction": 20, "future-perfect": 25, "causative": 30, "contrast": 35,
    "inversion": 3, "mixed-conditionals": 7, "cleft": 12, "participle-clauses": 17, "advanced-passive": 22, "subjunctive": 27, "emphasis": 32, "ellipsis": 37
  };
  const rank = g => (g.rank != null ? g.rank : (GRANK[g.id] != null ? GRANK[g.id] : 99));
  const sortGrammar = () => {
    if (!DATA.grammar) return;
    const idx = new Map(DATA.grammar.map((g, i) => [g, i]));
    DATA.grammar.sort((a, b) => ORDER.indexOf(a.lvl) - ORDER.indexOf(b.lvl) || rank(a) - rank(b) || idx.get(a) - idx.get(b));
  };
  DATA.addGrammar = (lvl, raw) => {
    DATA.grammar = DATA.grammar || [];
    const have = new Set(DATA.grammar.map(g => g.id));
    for (const block of raw.split(/\n(?=@ )/)) {
      const lines = block.split("\n").map(l => l.trim()).filter(Boolean);
      if (!lines.length || !lines[0].startsWith("@ ")) continue;
      const [id, r, title, pic] = lines[0].slice(2).split("|").map(s => s.trim());
      if (have.has(id)) continue;
      const g = { id, lvl, rank: +r, title, pic, idea: "", form: [], ex: [], trap: ["", ""], quiz: [] };
      for (const l of lines.slice(1)) {
        const m = l.match(/^([FETQ]):\s*(.*)$/);
        if (!m) { g.idea += (g.idea ? " " : "") + l; continue; }
        const [, k, v] = m;
        if (k === "F") { const i = v.indexOf("="); g.form.push([v.slice(0, i).trim(), v.slice(i + 1).trim()]); }
        else if (k === "E") { const i = v.indexOf("|"); g.ex.push([v.slice(0, i).trim(), v.slice(i + 1).trim()]); }
        else if (k === "T") g.trap = v.split("||").map(s => s.trim());
        else if (k === "Q") {
          const [q, opts] = v.split("||");
          const o = opts.split("|").map(s => s.trim());
          g.quiz.push({ q: q.trim(), o: o.map(s => s.replace(/^\*/, "")), a: o.findIndex(s => s.startsWith("*")) });
        }
      }
      DATA.grammar.push(g); have.add(id);
    }
    sortGrammar();
  };
  sortGrammar();

  /* Vocabulary themes. Text format:
       # id | Theme name | emoji
       emoji | word | IPA | example sentence
     Words already present anywhere in the dictionary are skipped. */
  const norm = s => s.toLowerCase().normalize("NFC").trim();
  DATA.addThemes = (lvl, raw) => {
    DATA.vocab = DATA.vocab || [];
    const seen = new Set(DATA.vocab.flatMap(t => t.words.map(w => norm(w[1]))));
    let cur = null;
    for (const line of raw.split("\n").map(l => l.trim()).filter(Boolean)) {
      if (line.startsWith("# ")) {
        const [id, name, e] = line.slice(2).split("|").map(s => s.trim());
        const tid = lvl.toLowerCase() + "-" + id;
        cur = DATA.vocab.find(t => t.id === tid);
        if (!cur) { cur = { id: tid, name, e, words: [] }; DATA.vocab.push(cur); }
        continue;
      }
      if (!cur) continue;
      const [pic, word, ipa, ex] = line.split("|").map(s => (s || "").trim());
      if (!word || seen.has(norm(word))) continue;
      seen.add(norm(word));
      cur.words.push([pic, word, ipa, lvl, ex]);
    }
  };

  /* Mini-stories. Text format (one block per story):
       @ id | Title | emoji
       S: scene emojis | scene text
       G: word as written in the text | emoji | simple English explanation
       Q: question || option | *correct option | option */
  DATA.addStories = (lvl, raw) => {
    DATA.stories = DATA.stories || [];
    const have = new Set(DATA.stories.map(s => s.id));
    for (const block of raw.split(/\n(?=@ )/)) {
      const lines = block.split("\n").map(l => l.trim()).filter(Boolean);
      if (!lines.length || !lines[0].startsWith("@ ")) continue;
      const [id, title, e] = lines[0].slice(2).split("|").map(s => s.trim());
      if (have.has(id)) continue;
      const s = { id, lvl, title, e, scenes: [], gloss: {}, questions: [] };
      for (const l of lines.slice(1)) {
        const m = l.match(/^([SGQ]):\s*(.*)$/);
        if (!m) continue;
        const [, k, v] = m;
        if (k === "S") { const i = v.indexOf("|"); s.scenes.push({ e: v.slice(0, i).trim(), t: v.slice(i + 1).trim() }); }
        else if (k === "G") { const [w, ge, def] = v.split("|").map(x => x.trim()); s.gloss[w] = [ge, def]; }
        else {
          const [q, opts] = v.split("||");
          const o = opts.split("|").map(x => x.trim());
          s.questions.push({ q: q.trim(), o: o.map(x => x.replace(/^\*/, "")), a: o.findIndex(x => x.startsWith("*")) });
        }
      }
      DATA.stories.push(s); have.add(id);
    }
  };

  /* Extra chunks: "category index" line, then "chunk | French | example" lines. */
  DATA.addChunks = (lvl, raw) => {
    DATA.chunks = DATA.chunks || [];
    const n0 = s => s.toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9' ]+/g, " ").replace(/\s+/g, " ").trim();
    const seen = new Set(DATA.chunks.map(c => n0(c.chunk)));
    let n = Math.max(0, ...DATA.chunks.map(c => c.n || 0)), cat = 0;
    for (const raw1 of raw.split("\n")) {
      const line = raw1.trim();
      if (!line) continue;
      if (/^\d+$/.test(line)) { cat = +line; continue; }
      const [chunk, fr, ex] = line.split("|").map(x => (x || "").trim());
      if (!chunk || seen.has(n0(chunk))) continue;
      seen.add(n0(chunk));
      DATA.chunks.push({ n: ++n, c: cat, chunk, fr, ex, lvl });
    }
  };
})();
