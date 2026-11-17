window.DATA = window.DATA || {};
/* More pronunciation lessons (4+ per level), dictations (10 per level) and shadowing scripts (2+ per level). */
DATA.pron.push(
  { id: "alphabet", lvl: "A1", e: "🔤", title: "L'alphabet et épeler",
    body: "Pour épeler ton nom, ton e-mail ou une adresse, il faut connaître les lettres anglaises. Pièges pour un francophone : A se dit « éï », E se dit « i », I se dit « aï », G « dji » et J « djéï » (inversés par rapport au français !), R « âr », W « double-you », Y « waï ». Pour une adresse e-mail : @ = « at », . = « dot ».",
    ex: [["A, E, I, O, U", "éï · i · aï · ôou · you"], ["G, J", "dji · djéï — l'inverse du français !"], ["My name is Karim: K, A, R, I, M.", ""], ["karim dot ba at gmail dot com", "karim.ba@gmail.com"]],
    quiz: [
      { q: "Comment se prononce la lettre E en anglais ?", o: ["comme « e »", "comme « i »", "comme « é »"], a: 1 },
      { q: "La lettre qui se dit « djéï » est…", o: ["G", "J", "Y"], a: 1 },
      { q: "@ dans une adresse e-mail se dit…", o: ["arobase", "at", "and"], a: 1 } ] },
  { id: "numbers", lvl: "A1", e: "🔢", title: "Nombres : 13 ou 30 ?",
    body: "Les nombres en -teen (13–19) et en -ty (30–90) se confondent facilement. La différence est dans l'ACCENT : thir-TEEN (accent sur la fin, n final bien audible) mais THIR-ty (accent sur le début, fin faible). Indispensable pour les prix, les heures et les numéros de téléphone.",
    ex: [["thirteen · thirty", "thir-TEEN · THIR-ty"], ["fourteen · forty", "four-TEEN · FOR-ty"], ["fifteen · fifty", ""], ["It costs fifteen pounds, not fifty!", ""]] },
  { id: "weak-aux", lvl: "B2", e: "🫥", title: "Les auxiliaires faibles",
    body: "Dans une phrase normale, les auxiliaires (have, has, was, were, do, does, are, can, could, should, would) sont presque avalés : ils prennent une forme faible avec /ə/. Ils ne retrouvent leur forme forte qu'en fin de phrase ou quand on insiste. Si tu les prononces fort partout, tu sonnes robotique ; si tu ne les connais pas, tu ne les entends pas.",
    ex: [["Where have you been?", "have → /əv/ : wear-əv-ju-bin"], ["What was he doing?", "was → /wəz/"], ["I could have told you.", "could have → /kʊdəv/ « coulda »"], ["Yes, I was! / Yes, I have!", "forme forte en fin de phrase"]] },
  { id: "elision", lvl: "B2", e: "✂️", title: "Élision et assimilation",
    body: "En parlant vite, les natifs suppriment ou transforment certains sons. Un /t/ ou /d/ entre deux consonnes disparaît souvent (next please → nex please). Un son prend la couleur du suivant (handbag → hambag, ten people → tem people, did you → didju). Ce n'est pas paresseux : c'est la norme. Le connaître t'aide surtout à COMPRENDRE.",
    ex: [["next please · last week · must be", "le t disparaît"], ["handbag · sandwich · grandmother", "le d disparaît"], ["ten people · in Paris", "n → m devant p/b"], ["Did you see it? · Would you like…?", "d + y → dj : didju, wudju"]] },
  { id: "sentence-stress", lvl: "B2", e: "🎯", title: "L'accent de phrase et l'emphase",
    body: "En anglais, on accentue les mots qui portent le SENS (noms, verbes, adjectifs, négations) et on écrase les autres. Déplacer l'accent change le message : I didn't say he stole it peut avoir 7 sens différents. Pour corriger quelqu'un ou contraster, accentue le mot qui compte.",
    ex: [["I NEED to FINISH the REPORT by FRIDAY.", "rythme normal"], ["I didn't say HE stole it.", "quelqu'un d'autre l'a volé"], ["I didn't say he STOLE it.", "il l'a peut-être emprunté"], ["It's not THIS Friday, it's NEXT Friday.", "contraste"]] },
  { id: "uk-us", lvl: "B2", e: "🇬🇧", title: "Accent britannique vs américain",
    body: "Tu vas entendre les deux. Différences principales : le R final (prononcé en US : car /kɑːr/, muet en UK : /kɑː/), le T entre voyelles (US : water → « wader », UK : t net), le A de bath, dance, can't (UK : /ɑː/ long, US : /æ/), le O de hot (UK : /ɒ/ rond, US : /ɑː/ ouvert). Choisis un modèle pour parler, mais entraîne-toi à comprendre les deux : change l'accent dans les réglages audio.",
    ex: [["water · better · city", "US : t → d léger"], ["car · far · teacher", "R final : US oui, UK non"], ["bath · dance · can't", "UK /ɑː/ · US /æ/"], ["Can you get me a bottle of water?", "écoute-la en UK puis en US"]] },
  { id: "attitude", lvl: "C1", e: "🎭", title: "L'intonation de l'attitude",
    body: "Au niveau C1, l'intonation exprime ce que les mots ne disent pas : ironie, surprise, doute, politesse. Une montée-descente (↗↘) exprime l'enthousiasme ou la surprise ; une descente-montée (↘↗) le doute ou une réserve (« Well… ↘↗ »). « Great » prononcé à plat et bas = sarcasme. Les Britanniques utilisent beaucoup l'euphémisme : « not bad » ↘↗ peut vouloir dire « excellent ».",
    ex: [["Great! ↗↘", "vraiment content"], ["Great. →", "sarcastique : ce n'est pas génial"], ["It's not bad… ↘↗", "réserve polie"], ["Really? ↗ / Really. ↘", "surprise vs incrédulité"]] },
  { id: "chunking", lvl: "C1", e: "⏸️", title: "Pauses et groupes de sens",
    body: "Un orateur convaincant découpe ses phrases en groupes de sens (« tone units ») séparés par de courtes pauses, avec un mot fort par groupe. Les francophones font souvent des pauses au mauvais endroit (au milieu d'un groupe, en cherchant le mot). Prépare tes phrases-clés, marque les pauses ( / ) et entraîne-toi à voix haute avant un entretien ou une présentation.",
    ex: [["Today / I'd like to talk about / three things.", ""], ["What I've learnt at 42 / is that / you can solve almost anything / if you ask the right people.", ""], ["On the one hand, / it's faster. / On the other, / it's more expensive.", ""], ["Thank you for your time / and I look forward to hearing from you.", ""]] },
  { id: "stress-shift", lvl: "C1", e: "🔀", title: "Accent mobile dans les familles de mots",
    body: "Dans une famille de mots, l'accent se déplace, et les voyelles changent avec lui (une voyelle non accentuée devient /ə/). C'est une source d'erreurs même pour les C1 : maîtrise-le avec les mots que tu utilises au travail.",
    ex: [["ECONOMY · ecoNOMic · eCONomist", "/ɪˈkɒn.ə.mi/ · /ˌiː.kəˈnɒm.ɪk/"], ["anaLYSis · ANalyse · analYTical", ""], ["PHOtograph · phoTOGraphy · photoGRAPHic", ""], ["deMOcracy · DEMocrat · demoCRAtic", ""]] },
  { id: "fast-speech", lvl: "C1", e: "🚄", title: "L'anglais rapide et familier",
    body: "Dans les séries, les podcasts et les conversations entre amis, tu entendras des formes réduites qu'on écrit rarement. Tu n'as pas besoin de les utiliser, mais tu dois les reconnaître : gonna (going to), wanna (want to), gotta (got to), dunno (don't know), lemme (let me), kinda (kind of), y'know, innit (UK).",
    ex: [["I'm gonna grab a coffee. D'you wanna come?", "going to · do you want to"], ["I dunno, lemme check.", "I don't know, let me check."], ["We gotta go, it's kinda late.", "have got to · kind of"], ["What're you up to tonight?", "what are → /ˈwɒtə/"]] }
);

DATA.dictation.A1.push("I like coffee, but I don't like tea.", "My brother is a doctor in London.", "There is a bank next to the station.", "We have English class on Monday.");
DATA.dictation.A2.push("I didn't go to work yesterday because I was ill.", "Could you tell me how much this jacket costs?", "We're going to have a party on Saturday night.", "She's taller than her brother, but he's older.");
DATA.dictation.B1.push("I've never been to Japan, but I'd love to go one day.", "If it doesn't rain tomorrow, we'll go hiking.", "He used to work in a bank before he became a developer.", "The new library was opened by the mayor last week.");
DATA.dictation.B2.push("Despite the delay, the team managed to deliver the project on time.", "I wish I had started learning English when I was younger.", "The candidate we interviewed yesterday seemed very confident.", "I'm having my laptop repaired, so I'll be working from the office.");
DATA.dictation.C1.push("It is widely believed that the policy will be reversed before the election.", "Having weighed up the options, we decided to postpone the launch.", "It was only after the merger that the real problems came to light.", "Were the budget to be cut, several projects would have to be abandoned.");

DATA.shadowing.push(
  { lvl: "A1", title: "Hello, I'm new here", lines: ["Hello! My name is Sam.", "I'm from France.", "I live in a small flat.", "I like coffee and music.", "Nice to meet you!"] },
  { lvl: "A1", title: "My day", lines: ["I get up at seven.", "I have breakfast at home.", "I go to work by bus.", "I finish at five.", "In the evening, I watch TV."] },
  { lvl: "A2", title: "Last weekend", lines: ["Last weekend was great.", "On Saturday, I went to the beach with my friends.", "We swam and had lunch in a small restaurant.", "On Sunday, I stayed at home and cooked.", "How about you? What did you do?"] },
  { lvl: "B2", title: "Handling a difficult question", lines: ["That's a really good question, and to be honest, it's a tricky one.", "Let me think about it for a second.", "I'd say the biggest challenge was managing my time.", "Looking back, I should have asked for help much earlier.", "It's something I've definitely learnt from."] },
  { lvl: "C1", title: "Presenting a recommendation", lines: ["Having looked at the data in some detail, I'd like to make a recommendation.", "In short, we should postpone the launch by two weeks.", "Admittedly, that's not what anyone wanted to hear.", "However, releasing now would expose us to risks we simply can't justify.", "So, on balance, a short delay is by far the safer option."] }
);
