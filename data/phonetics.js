window.DATA = window.DATA || {};
/* Phonetics. IPA chart (British standard), with picture words and tips for French speakers.
   hard: 2 = doesn't exist in French, 1 = close but different, 0 = same as French */
DATA.ipa = {
  short: [
    { s: "ɪ", hard: 2, w: [["🚢", "ship"], ["🐟", "fish"], ["🏠", "live"]], tip: "Plus court et plus relâché que le « i » français. Entre « i » et « é », bouche détendue. ship ≠ sheep." },
    { s: "e", hard: 0, w: [["🛏️", "bed"], ["🥚", "egg"], ["🔴", "red"]], tip: "Comme le « è » de « mère », mais plus court." },
    { s: "æ", hard: 2, w: [["🐱", "cat"], ["🎩", "hat"], ["🍎", "apple"]], tip: "Ouvre grand la bouche comme pour « a », mais pense « è ». Mâchoire basse. cat ≠ cut." },
    { s: "ʌ", hard: 2, w: [["☕", "cup"], ["☀️", "sun"], ["🚌", "bus"]], tip: "Un « a » court et central, sans arrondir les lèvres. Proche du « eu » de « peur » mais plus ouvert." },
    { s: "ɒ", hard: 1, w: [["🔥", "hot"], ["🐶", "dog"], ["🧦", "sock"]], tip: "« o » ouvert et court, comme dans « port » (anglais britannique). En US il devient /ɑː/." },
    { s: "ʊ", hard: 2, w: [["📖", "book"], ["🦶", "foot"], ["🍳", "cook"]], tip: "« ou » très court et relâché, lèvres peu arrondies. full ≠ fool." },
    { s: "ə", hard: 1, w: [["🍌", "banana"], ["👆", "about"], ["🧑‍🏫", "teacher"]], tip: "LE son le plus fréquent de l'anglais : le schwa. Un « e » muet très faible, sur toutes les syllabes non accentuées." }
  ],
  long: [
    { s: "iː", hard: 1, w: [["🐑", "sheep"], ["🌳", "tree"], ["🔑", "key"]], tip: "Un « i » français, mais LONG et souriant. Tire les lèvres." },
    { s: "ɑː", hard: 1, w: [["🚗", "car"], ["⭐", "star"], ["💪", "arm"]], tip: "« a » long et profond, au fond de la bouche, comme « pâte ». Le r ne se prononce pas (UK)." },
    { s: "ɔː", hard: 1, w: [["🚪", "door"], ["🐴", "horse"], ["🍴", "fork"]], tip: "« o » long et rond, comme dans « fort » mais allongé." },
    { s: "uː", hard: 1, w: [["🍲", "food"], ["🌙", "moon"], ["👟", "shoe"]], tip: "« ou » français, mais long." },
    { s: "ɜː", hard: 2, w: [["🐦", "bird"], ["💼", "work"], ["👕", "shirt"]], tip: "Le « eu » de « heure », long, langue au milieu, lèvres neutres (pas arrondies). work ≠ walk." }
  ],
  diph: [
    { s: "eɪ", hard: 1, w: [["📅", "day"], ["🚆", "train"], ["🍰", "cake"]], tip: "« é » qui glisse vers « i » : dé-i. Pas un « è » plat ! (say, play, late)" },
    { s: "aɪ", hard: 0, w: [["👁️", "eye"], ["🚲", "bike"], ["🌙", "night"]], tip: "Comme « aïe » : a-i." },
    { s: "ɔɪ", hard: 0, w: [["👦", "boy"], ["🪙", "coin"], ["🧸", "toy"]], tip: "Comme « oy » : o-i." },
    { s: "aʊ", hard: 1, w: [["🏠", "house"], ["🐄", "cow"], ["🐭", "mouse"]], tip: "« a » qui glisse vers « ou » : a-ou (now, how)." },
    { s: "əʊ", hard: 2, w: [["❄️", "snow"], ["📞", "phone"], ["🚤", "boat"]], tip: "Attention : PAS un « o » français ! Schwa qui glisse vers « ou » : eu-ou. go, no, know, won't." },
    { s: "ɪə", hard: 1, w: [["👂", "ear"], ["🦌", "deer"], ["🍺", "beer"]], tip: "« i » qui glisse vers schwa : i-eu." },
    { s: "eə", hard: 1, w: [["💇", "hair"], ["🐻", "bear"], ["🪑", "chair"]], tip: "« è » qui glisse vers schwa : è-eu (où, where, there)." },
    { s: "ʊə", hard: 1, w: [["🧭", "tour"], ["✅", "sure"], ["🧹", "pure"]], tip: "« ou » court qui glisse vers schwa. Souvent remplacé par /ɔː/ aujourd'hui (sure → /ʃɔː/)." }
  ],
  cons: [
    { s: "p", hard: 0, w: [["🐷", "pig"], ["🍕", "pizza"]], tip: "Avec un petit souffle d'air (aspiration) au début des mots : p-h-en. Mets ta main devant ta bouche !" },
    { s: "b", hard: 0, w: [["⚽", "ball"], ["🍌", "banana"]], tip: "Comme en français." },
    { s: "t", hard: 1, w: [["🌳", "tree"], ["⏰", "time"]], tip: "Langue sur les gencives (pas sur les dents), avec aspiration. En US, entre deux voyelles → presque « d » (water → wader)." },
    { s: "d", hard: 0, w: [["🐶", "dog"], ["🚪", "door"]], tip: "Langue sur les gencives, derrière les dents." },
    { s: "k", hard: 0, w: [["🐱", "cat"], ["🔑", "key"]], tip: "Aspiré en début de mot." },
    { s: "ɡ", hard: 0, w: [["🎸", "guitar"], ["🐐", "goat"]], tip: "Toujours « g » dur devant a, o, u." },
    { s: "f", hard: 0, w: [["🐟", "fish"], ["🦊", "fox"]], tip: "Comme en français." },
    { s: "v", hard: 0, w: [["🎻", "violin"], ["🚐", "van"]], tip: "Comme en français. Ne pas confondre avec /w/ !" },
    { s: "θ", hard: 2, w: [["🤔", "think"], ["3️⃣", "three"], ["👍", "thumb"]], tip: "TH sourd : langue ENTRE les dents, souffle de l'air sans voix. Ni « s », ni « f » !" },
    { s: "ð", hard: 2, w: [["👉", "this"], ["👨‍👩‍👧", "mother"], ["🌦️", "weather"]], tip: "TH sonore : même position que /θ/ mais avec la voix (ça vibre). the, this, they, that. Ni « z », ni « d »." },
    { s: "s", hard: 0, w: [["☀️", "sun"], ["🐍", "snake"]], tip: "Comme en français." },
    { s: "z", hard: 0, w: [["🦓", "zebra"], ["🔢", "zero"]], tip: "Comme en français. Attention : beaucoup de « s » anglais se prononcent /z/ (is, was, has, dogs)." },
    { s: "ʃ", hard: 0, w: [["🚢", "ship"], ["👞", "shoe"]], tip: "Comme « ch » français." },
    { s: "ʒ", hard: 0, w: [["📺", "television"], ["🏖️", "leisure"]], tip: "Comme « j » de « jour ». Rare en anglais." },
    { s: "h", hard: 2, w: [["🏠", "house"], ["🎩", "hat"], ["❤️", "heart"]], tip: "H EXPIRÉ : souffle comme sur une vitre pour faire de la buée. Ne pas l'oublier (hair ≠ air), ne pas l'ajouter (eat ≠ heat). Muet seulement dans hour, honest, honour." },
    { s: "tʃ", hard: 1, w: [["🧀", "cheese"], ["🪑", "chair"]], tip: "« tch » : t + ch d'un coup." },
    { s: "dʒ", hard: 1, w: [["🧃", "juice"], ["🦒", "giraffe"]], tip: "« dj » : d + j d'un coup. job, giraffe, page." },
    { s: "m", hard: 0, w: [["🌙", "moon"], ["🐒", "monkey"]], tip: "Comme en français." },
    { s: "n", hard: 0, w: [["👃", "nose"], ["🌃", "night"]], tip: "Comme en français, mais ne nasalise pas la voyelle avant ! one ≠ « oin »." },
    { s: "ŋ", hard: 1, w: [["💍", "ring"], ["🎤", "sing"], ["👑", "king"]], tip: "Le son de « parking » : arrière de la langue contre le palais, on n'entend PAS de g à la fin." },
    { s: "l", hard: 1, w: [["🦁", "lion"], ["🍋", "lemon"]], tip: "En fin de mot, le l est « sombre » (dark L) : langue creusée, presque « ou » (ball, feel, people)." },
    { s: "r", hard: 2, w: [["🔴", "red"], ["🌹", "rose"], ["🐇", "rabbit"]], tip: "Langue recourbée vers l'arrière, qui ne touche rien. Ni roulé, ni dans la gorge. En UK, muet en fin de mot (car, teacher)." },
    { s: "w", hard: 1, w: [["🍷", "wine"], ["🌊", "water"]], tip: "« ou » rapide, lèvres arrondies en avant. wine ≠ vine." },
    { s: "j", hard: 0, w: [["💛", "yellow"], ["🪀", "yo-yo"]], tip: "Comme le « y » de « yaourt ». Au début de university, use, music : /juː/." }
  ]
};

DATA.pairs = [
  { id: "i", label: "/ɪ/ vs /iː/", hint: "court & relâché vs long & souriant", items: [["🚢","ship","🐑","sheep"],["🏠","live","🚪","leave"],["🍟","chip","🏷️","cheap"],["🪑","sit","💺","seat"],["🫙","fill","🤲","feel"]] },
  { id: "ae", label: "/æ/ vs /ʌ/", hint: "bouche grande ouverte vs « a » court central", items: [["🐱","cat","✂️","cut"],["🎩","hat","🛖","hut"],["🧢","cap","☕","cup"],["👜","bag","🐛","bug"],["🏃","ran","🏃‍♂️","run"]] },
  { id: "th", label: "/θ/ vs /s/ · /t/", hint: "langue entre les dents !", items: [["🤔","think","🚰","sink"],["👄","mouth","🐭","mouse"],["👍","thumb","➕","sum"],["3️⃣","three","🌳","tree"],["🦴","thin","🥫","tin"]] },
  { id: "h", label: "/h/ vs rien", hint: "souffle de buée", items: [["💇","hair","🌬️","air"],["🔥","heat","🍽️","eat"],["✋","hand","➕","and"],["⬆️","high","👁️","eye"],["🤲","hold","👴","old"]] },
  { id: "vw", label: "/v/ vs /w/", hint: "dents sur la lèvre vs lèvres arrondies", items: [["🦺","vest","🧭","west"],["🍇","vine","🍷","wine"],["👰","veil","🐋","whale"],["🗳️","vote","🛥️","wrote"]] },
  { id: "u", label: "/ʊ/ vs /uː/", hint: "court vs long", items: [["🫸","pull","🏊","pool"],["🍽️","full","🤡","fool"],["👀","look","🙋‍♂️","Luke"]] },
  { id: "er", label: "/ɜː/ vs /ɔː/", hint: "« eu » neutre vs « o » rond", items: [["💼","work","🚶","walk"],["🔥","burn","👶","born"],["🔤","word","🏥","ward"],["🐦","bird","🚢","board"]] },
  { id: "ou", label: "/ɒ/ vs /əʊ/", hint: "o ouvert court vs eu-ou", items: [["🤲","want","🙅","won't"],["💰","cost","🏖️","coast"],["⛔","not","📝","note"]] },
  { id: "sh", label: "/ʃ/ vs /tʃ/", hint: "ch vs tch", items: [["🚢","ship","🍟","chip"],["👞","shoes","🤔","choose"],["🧼","wash","⌚","watch"],["🛒","shop","🥩","chop"]] },
  { id: "sz", label: "/s/ vs /z/", hint: "sans voix vs avec voix", items: [["🏷️","price","🏆","prize"],["🚌","bus","🐝","buzz"],["🧊","ice","👀","eyes"],["🦭","seal","🚀","zeal"]] },
  { id: "ng", label: "/n/ vs /ŋ/", hint: "langue devant vs langue au fond", items: [["🦴","thin","📦","thing"],["🚫","ban","💥","bang"],["😈","sin","🎤","sing"]] }
];

/* Pronunciation lessons. ex = [what to listen to, note]. */
DATA.pron = [
  { id: "h", lvl: "A1", e: "🌬️", title: "Le H qui souffle",
    body: "Le français n'a pas de H prononcé, alors on l'oublie (« I 'ate 'amburgers ») ou on l'ajoute là où il n'y en a pas (« I heat an happle »). Le H anglais est un simple SOUFFLE, comme pour faire de la buée sur une vitre. Il est muet seulement dans hour, honest, honour, heir.",
    ex: [["Harry has a huge house on the hill.", "6 souffles"], ["I'm hungry. How about a hamburger?", ""], ["It's an honour. I'll be there in an hour.", "H muet ici"], ["hair / air · heat / eat · hold / old", "paires"]] },
  { id: "th", lvl: "A1", e: "👅", title: "TH : la langue entre les dents",
    body: "Deux sons qui n'existent pas en français. /θ/ (think) = langue entre les dents, on souffle SANS la voix. /ð/ (the, this) = même position AVEC la voix. Ne remplace pas par « s », « z », « f » ou « d » : think ≠ sink, they ≠ day. Exagère au début, c'est normal.",
    ex: [["I think that three thousand is enough.", ""], ["This is the thing that they wanted.", ""], ["My mother and father are both thirty-three.", ""], ["Thank you. Thanks a lot.", "les mots les plus fréquents !"]] },
  { id: "schwa", lvl: "A2", e: "😶", title: "Le schwa /ə/ — le son roi",
    body: "En français, toutes les syllabes ont la même force. En anglais, les syllabes NON accentuées se réduisent presque toujours à /ə/, un « eu » très faible. C'est la clé de l'accent naturel ET de la compréhension orale : les natifs « avalent » ces syllabes. Exemples : banana = bə-NA-nə, today = tə-DAY, problem = PRO-bləm.",
    ex: [["banana · tomato · computer", "bə-NA-nə · tə-MA-təʊ · kəm-PJU-tə"], ["I want to go to the doctor.", "to → tə, the → ðə"], ["a cup of tea", "ə CUP əv TEA"], ["What are you doing?", "wɒtə jə DOING"]] },
  { id: "short-long", lvl: "A2", e: "↔️", title: "Voyelles courtes et longues",
    body: "En anglais, la longueur d'une voyelle change le sens. ship (navire) ≠ sheep (mouton), full (plein) ≠ fool (idiot). La voyelle courte est aussi plus RELÂCHÉE. Entraîne-toi avec le jeu des paires minimales ci-dessous.",
    ex: [["ship · sheep", "/ɪ/ · /iː/"], ["sit · seat", ""], ["full · fool", "/ʊ/ · /uː/"], ["Can you live here? — No, I'm going to leave.", ""]] },
  { id: "stress", lvl: "B1", e: "📢", title: "L'accent tonique (word stress)",
    body: "Le français accentue la DERNIÈRE syllabe. L'anglais accentue souvent la première ou l'avant-dernière, et c'est imprévisible : il faut l'apprendre avec chaque mot (dans un dictionnaire, la syllabe accentuée a ˈ devant). Mal placé, l'accent rend le mot incompréhensible. Règles utiles : noms de 2 syllabes → 1re (TAble, PROject) ; verbes de 2 syllabes → 2e (deCIDE, preFER) ; mots en -tion, -ic, -ity → juste avant (inforMAtion, enerGEtic, uniVERsity).",
    ex: [["PHOtograph · phoTOgrapher · photoGRAphic", "l'accent bouge !"], ["deVElop · deVElopment · deVEloper", ""], ["COMfortable · VEGetable · INteresting", "3 syllabes seulement : COMF-tə-bəl"], ["a REcord · to reCORD · a PREsent · to preSENT", "nom vs verbe"]] },
  { id: "ed", lvl: "A2", e: "⏮️", title: "Les terminaisons -ed",
    body: "Le -ed du passé ne se prononce presque jamais « èd » ! Trois sons : /t/ après un son sourd (p, k, f, s, ʃ, tʃ) ; /d/ après un son sonore (voyelle, b, g, v, z, l, m, n, r) ; /ɪd/ SEULEMENT après t ou d.",
    ex: [["worked · stopped · watched · laughed", "/t/ — workt, stopt"], ["played · called · lived · opened", "/d/ — playd"], ["wanted · needed · started · decided", "/ɪd/ — wan-tid"], ["I watched a film and I liked it.", ""]],
    quiz: [
      { q: "Comment se prononce le -ed de « worked » ?", o: ["/t/", "/d/", "/ɪd/"], a: 0 },
      { q: "Et celui de « wanted » ?", o: ["/t/", "/d/", "/ɪd/"], a: 2 },
      { q: "Et celui de « played » ?", o: ["/t/", "/d/", "/ɪd/"], a: 1 },
      { q: "Combien de syllabes dans « finished » ?", o: ["2 (FI-nisht)", "3 (fi-ni-shèd)"], a: 0 } ] },
  { id: "s", lvl: "A2", e: "🐍", title: "Les terminaisons -s",
    body: "Pluriels, 3e personne et possessif : même logique que -ed. /s/ après un son sourd (cats, works) ; /z/ après un son sonore (dogs, plays, is) ; /ɪz/ après s, z, ʃ, tʃ, dʒ (buses, watches, pages). Le /z/ est le plus fréquent !",
    ex: [["cats · books · works · Pete's", "/s/"], ["dogs · plays · calls · Tom's", "/z/"], ["buses · watches · pages · George's", "/ɪz/ — une syllabe en plus"], ["She watches films and reads books.", ""]],
    quiz: [
      { q: "« dogs » se termine par…", o: ["/s/", "/z/", "/ɪz/"], a: 1 },
      { q: "« watches » se termine par…", o: ["/s/", "/z/", "/ɪz/"], a: 2 },
      { q: "« books » se termine par…", o: ["/s/", "/z/", "/ɪz/"], a: 0 } ] },
  { id: "linking", lvl: "B1", e: "🔗", title: "Liaisons et formes faibles",
    body: "Les natifs ne disent pas des mots séparés, ils disent des groupes. Consonne + voyelle se lient (turn it off → tur-ni-toff). Les petits mots grammaticaux (to, of, for, can, and, at, was) ont une forme faible avec /ə/. Écoute à vitesse lente puis normale.",
    ex: [["Turn it off. · Pick it up. · Check it out.", "tur-ni-toff · pi-ki-tup"], ["I can swim, but I can't dive.", "can = /kən/, can't = /kɑːnt/"], ["fish and chips · rock and roll", "and → /ən/ ou /n/"], ["What do you want to do?", "wɒdʒə wɒnə do"]] },
  { id: "intonation", lvl: "B1", e: "🎵", title: "Intonation",
    body: "La mélodie porte du sens. Questions fermées (yes/no) → la voix MONTE à la fin. Questions ouvertes (wh-) → la voix DESCEND. Une voix plate sonne impolie ou ennuyée en anglais : exagère un peu la mélodie, surtout pour remercier et s'excuser.",
    ex: [["Are you ready? ↗", "monte"], ["Where are you from? ↘", "descend"], ["Thank you so much! ↘↗", "chaleureux"], ["You're French, aren't you? ↘", "tu attends juste une confirmation"]] },
  { id: "silent", lvl: "B1", e: "🤫", title: "Les lettres muettes",
    body: "L'orthographe anglaise ne dit pas toujours comment on prononce. Apprends ces mots fréquents par cœur, avec le son.",
    ex: [["knife · know · knee", "k muet"], ["write · wrong · answer", "w muet"], ["listen · castle · Christmas", "t muet"], ["Wednesday · comfortable · island · could · half", "/ˈwenz.deɪ/ · /ˈkʌmf.tə.bəl/ · /ˈaɪ.lənd/"]] },
  { id: "r", lvl: "B1", e: "🌀", title: "Le R anglais",
    body: "Ni roulé (espagnol), ni dans la gorge (français). La langue se recourbe un peu vers l'arrière sans rien toucher, lèvres légèrement arrondies. En anglais britannique, le r ne se prononce que devant une voyelle (red, very) ; en fin de mot il est muet (car, teacher). En américain, il se prononce partout.",
    ex: [["red · run · right · very", ""], ["Rory's rabbit runs around the room.", ""], ["car · far · teacher · water", "UK : r muet"], ["Are you ready for the reading?", ""]] },
  { id: "ng", lvl: "A2", e: "🔔", title: "-ing sans « g »",
    body: "Dans -ing, on ne prononce PAS « ing-gue » ni « in » nasal. Le son /ŋ/ se fait au fond de la bouche, comme dans « parking » dit vite. Arrêt net : pas de g audible.",
    ex: [["sing · thing · morning · king", ""], ["I'm working, cooking and singing.", ""], ["finger · English · hungry", "ici on entend le g : /ŋɡ/"], ["What are you thinking about?", ""]] }
];
