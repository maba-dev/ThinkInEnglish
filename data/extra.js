window.DATA = window.DATA || {};

/* CEFR levels. hours = cumulative guided learning hours (Cambridge estimates). */
DATA.levels = [
  { id: "A1", name: "Breakthrough", fr: "Découverte", hours: "≈ 90–100 h", words: "≈ 500 mots",
    can: ["Te présenter et présenter quelqu'un", "Poser des questions simples (où tu habites, ce que tu aimes)", "Comprendre des phrases très simples si on parle lentement", "Remplir un formulaire (nom, adresse, nationalité)"],
    focus: ["to be, present simple, there is / are", "a / an / the, pluriels", "Vocabulaire : maison, nourriture, corps, vêtements", "Sons : H, TH, voyelles courtes"] },
  { id: "A2", name: "Waystage", fr: "Survie", hours: "≈ 180–200 h", words: "≈ 1 000 mots",
    can: ["Parler de ta routine, ta famille, ton travail", "Raconter ce que tu as fait le week-end (past simple)", "Faire des achats, commander, demander ton chemin", "Écrire un message court et simple"],
    focus: ["past simple / continuous, will / going to", "comparatifs, much / many", "Les premiers phrasal verbs (get up, look for…)", "Sons : schwa, -ed, -s"] },
  { id: "B1", name: "Threshold", fr: "Seuil", hours: "≈ 350–400 h", words: "≈ 2 000 mots",
    can: ["Te débrouiller en voyage et au quotidien à l'étranger", "Raconter une expérience, un rêve, un projet", "Donner ton avis et le justifier simplement", "Suivre l'essentiel d'une conversation claire sur un sujet connu"],
    focus: ["present perfect (vs past simple), conditionnels 1 et 2", "passif, modaux, used to, -ing vs to", "Chunks pour gagner du temps et donner son avis", "Accent tonique, liaisons, intonation"] },
  { id: "B2", name: "Vantage", fr: "Indépendant", hours: "≈ 500–600 h", words: "≈ 4 000 mots",
    can: ["Parler avec un natif sans effort pour l'un ou l'autre", "Passer un entretien d'embauche en anglais", "Comprendre des conférences, des séries, des articles", "Argumenter : avantages, inconvénients, nuances"],
    focus: ["past perfect, 3e conditionnel, discours indirect", "relatives, modaux de déduction, futur accompli", "Phrasal verbs du travail, collocations", "Comprendre l'anglais naturel (formes faibles)"] },
  { id: "C1", name: "Effective operational proficiency", fr: "Autonome", hours: "≈ 700–800 h", words: "≈ 8 000 mots",
    can: ["T'exprimer spontanément et couramment, sans chercher tes mots", "Utiliser l'anglais au travail de façon souple et efficace", "Comprendre des textes longs et exigeants, et l'implicite", "Écrire des textes clairs et bien structurés (rapports, essais)"],
    focus: ["inversion, conditionnels mixtes, phrases clivées", "registre formel / informel, idiomes", "Vocabulaire abstrait et précis", "Nuances d'intonation et d'accent"] }
];

/* Tips to stop translating. */
DATA.tips = [
  { e: "🖼️", title: "Image d'abord, mot ensuite", body: "Quand tu apprends un mot, n'écris JAMAIS sa traduction. Associe-le à une image, un geste ou une situation. Ton cerveau crée un lien direct image → anglais, sans passer par le français. C'est le principe du dictionnaire en images de ce site.", how: "Ce soir, ouvre le Vocabulaire en mode quiz : écoute, clique sur l'image." },
  { e: "📖", title: "Dictionnaire anglais-anglais", body: "Remplace ton dictionnaire bilingue par un dictionnaire monolingue pour apprenants : Cambridge Learner's, Oxford Learner's, Longman. Les définitions utilisent environ 2 000 mots simples : en les lisant, tu apprends à expliquer en anglais.", how: "Ajoute dictionary.cambridge.org à tes favoris." },
  { e: "🧱", title: "Apprends des blocs, pas des mots", body: "« Make a decision », « It depends on », « I'm looking forward to » : les natifs parlent avec des blocs tout faits. Un bloc s'apprend comme un seul mot, on n'a rien à construire, donc rien à traduire.", how: "2 chunks par jour, à voix haute, avec une phrase vraie sur ta vie." },
  { e: "🗣️", title: "Le self-talk", body: "Commente ce que tu fais, en anglais, dans ta tête ou à voix basse : « I'm making coffee. Where are my keys? I need to leave in five minutes. » C'est l'exercice le plus efficace pour PENSER en anglais, et il ne coûte rien.", how: "5 minutes par jour : sous la douche, en marchant, en cuisinant." },
  { e: "🔁", title: "Le shadowing", body: "Écoute une phrase et répète-la EN MÊME TEMPS que l'audio, comme une ombre. Tu imites le rythme, la mélodie et les liaisons sans avoir le temps de traduire. Commence lentement (vitesse 0,8), puis vitesse normale.", how: "Utilise l'onglet Audio → Shadowing." },
  { e: "🧩", title: "Contourne le mot qui manque", body: "Tu ne connais pas le mot ? Ne cherche pas la traduction : décris-le. « It's a thing you use to… », « It's a kind of… », « It's like a… but bigger ». C'est une compétence évaluée au B2, et c'est exactement ce que font les natifs.", how: "Jeu : décris 5 objets de ta pièce sans dire leur nom." },
  { e: "⏱️", title: "La règle des 2 secondes", body: "Si tu mets plus de 2 secondes à trouver un mot, arrête-toi et utilise un chunk pour gagner du temps (« Let me think… », « How can I put it? »), puis reformule plus simplement. Viser la phrase parfaite, c'est ce qui te pousse à traduire.", how: "Révise la catégorie « Buying time » des chunks." },
  { e: "🎧", title: "Immersion passive", body: "Mets ton téléphone, tes jeux et ton ordinateur en anglais. Regarde les séries en VO avec sous-titres ANGLAIS (jamais français). Tu entends des milliers de phrases sans effort, et ton cerveau s'habitude à la musique de la langue.", how: "Change la langue de ton téléphone aujourd'hui." },
  { e: "📓", title: "Le journal de 5 lignes", body: "Chaque soir, écris 5 lignes en anglais sur ta journée, directement en anglais, sans brouillon en français. Si un mot manque, contourne-le (astuce 🧩) puis vérifie après dans un dictionnaire anglais.", how: "Réutilise 1 phrasal verb et 1 chunk du jour." },
  { e: "🎙️", title: "Enregistre-toi", body: "Lis une mini-histoire à voix haute, enregistre-toi, puis compare avec l'audio du site. Tu entendras tout de suite les sons français qui restent (H, TH, voyelles). Le jeu « Dis-le » de l'onglet Phonétique vérifie si on comprend ton mot.", how: "Une histoire par semaine, toujours la même pendant 7 jours." },
  { e: "🔂", title: "Relis la même histoire", body: "Relire 5 fois un texte facile vaut mieux que lire une fois un texte difficile. À la 3e lecture, tu ne traduis plus : tu comprends directement. Choisis des textes où tu connais 95 % des mots.", how: "Commence par l'histoire de ton niveau, puis celle du dessous." },
  { e: "💤", title: "Peu mais tous les jours", body: "20 minutes par jour battent 3 heures le dimanche. La mémoire fonctionne par répétitions espacées : revois un mot après 1 jour, 3 jours, 7 jours, 30 jours. Marque ce que tu connais sur ce site (⭐) pour suivre tes progrès.", how: "Fixe une heure fixe : par exemple 20 min avant le café du matin." }
];

/* Listening practice: picture listening (hear → pick the image) and dictation. */
DATA.dictation = {
  A1: ["My name is Sam and I'm from Paris.", "I have two brothers and a sister.", "The cat is under the table.", "I get up at seven every morning.", "Can I have a coffee, please?", "It's cold and it's raining today."],
  A2: ["Last weekend I went to the beach with my friends.", "I'm going to visit my grandparents next month.", "Could you tell me where the station is?", "She was cooking when I arrived.", "This phone is cheaper than that one.", "We've run out of milk, so I'll buy some."],
  B1: ["I've been learning English for about two years.", "If I had more free time, I'd learn to play the piano.", "The meeting has been moved to Thursday afternoon.", "I used to live in a small village near the mountains.", "You don't have to come, but it would be nice.", "I'm really looking forward to working with your team."],
  B2: ["By the time we got to the airport, the plane had already taken off.", "If I had known about the traffic, I would have left earlier.", "She told me that she would be working from home all week.", "The candidate who impressed us the most was the one from Lyon.", "He can't have finished the project already — it's huge.", "What really matters is how you deal with the problem."],
  C1: ["Not only did the update fix the bug, but it also improved performance considerably.", "Had I been aware of the risks, I would never have agreed to it.", "There's an inevitable trade-off between speed and reliability.", "It was only after the launch that we realised how much we'd underestimated demand.", "Seldom have I come across such a well-documented codebase.", "Whether or not remote work is here to stay remains to be seen."]
};

DATA.shadowing = [
  { lvl: "A2", title: "Introducing yourself", lines: ["Hi, I'm Alex.", "I'm a software developer.", "I'm from France, but I live in Spain now.", "I love hiking and cooking.", "Nice to meet you!"] },
  { lvl: "B1", title: "Ordering in a café", lines: ["Hi, could I get a flat white, please?", "Is it possible to have oat milk?", "And can I have one of those croissants?", "To take away, please.", "Can I pay by card?"] },
  { lvl: "B1", title: "Talking about a project", lines: ["So, basically, it's a chat server written in C++.", "The tricky part was handling many clients at the same time.", "We ended up using poll to manage the connections.", "If I did it again, I'd write more tests from the start."] },
  { lvl: "B2", title: "Job interview: strengths", lines: ["I'd say my main strength is problem-solving.", "When I get stuck, I break the problem down into smaller pieces.", "At 42, there are no teachers, so I learnt to find answers on my own.", "I'm also comfortable working in a team and giving feedback."] },
  { lvl: "C1", title: "Giving a nuanced opinion", lines: ["To be honest, I'm in two minds about it.", "On the one hand, remote work gives people a lot of flexibility.", "On the other hand, it can be quite isolating, especially for juniors.", "So, all things considered, I'd go for a hybrid model."] }
];

/* Placement test: 15 items from A1 to C1 */
DATA.placement = [
  { l: "A1", q: "She ___ a teacher.", o: ["is", "are", "have"], a: 0 },
  { l: "A1", q: "___ you like coffee?", o: ["Are", "Do", "Is"], a: 1 },
  { l: "A1", q: "There ___ two cats in the garden.", o: ["is", "are", "has"], a: 1 },
  { l: "A2", q: "I ___ to Italy last year.", o: ["go", "have gone", "went"], a: 2 },
  { l: "A2", q: "This exercise is ___ than the last one.", o: ["more easy", "easier", "easiest"], a: 1 },
  { l: "A2", q: "Look at those clouds! It ___ rain.", o: ["is going to", "will to", "rains"], a: 0 },
  { l: "B1", q: "I ___ here since 2021.", o: ["work", "have worked", "am working"], a: 1 },
  { l: "B1", q: "If I ___ rich, I'd travel the world.", o: ["am", "will be", "were"], a: 2 },
  { l: "B1", q: "You ___ pay — it's free!", o: ["mustn't", "don't have to", "can't"], a: 1 },
  { l: "B2", q: "When I arrived, the meeting ___.", o: ["already started", "had already started", "has already started"], a: 1 },
  { l: "B2", q: "He ___ have forgotten — I reminded him twice!", o: ["can't", "mustn't", "shouldn't"], a: 0 },
  { l: "B2", q: "She asked me where ___.", o: ["did I live", "I lived", "do I live"], a: 1 },
  { l: "C1", q: "___ I known, I would have called you.", o: ["If", "Had", "Should"], a: 1 },
  { l: "C1", q: "Not only ___ late, but he also forgot the documents.", o: ["he was", "was he", "he did"], a: 1 },
  { l: "C1", q: "The new policy is likely to ___ a lot of criticism.", o: ["draw", "do", "take"], a: 0 }
];

DATA.resources = [
  { e: "🎧", name: "BBC Learning English — 6 Minute English", url: "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english", lvl: "B1–B2", what: "Podcasts courts avec transcription et vocabulaire." },
  { e: "🔊", name: "YouGlish", url: "https://youglish.com", lvl: "Tous", what: "Entends n'importe quel mot ou chunk dit par des natifs dans de vraies vidéos." },
  { e: "📖", name: "Cambridge Dictionary", url: "https://dictionary.cambridge.org", lvl: "Tous", what: "Dictionnaire anglais-anglais avec audio UK et US." },
  { e: "🗣️", name: "BBC — The Sounds of English", url: "https://www.bbc.co.uk/learningenglish/english/features/pronunciation", lvl: "A2–B2", what: "Vidéos sur chaque son de l'alphabet phonétique." },
  { e: "📰", name: "News in Levels", url: "https://www.newsinlevels.com", lvl: "A1–B1", what: "La même actualité écrite à 3 niveaux, avec audio." },
  { e: "🎤", name: "TED Talks", url: "https://www.ted.com/talks", lvl: "B2–C1", what: "Conférences avec transcription interactive en anglais." },
  { e: "📺", name: "ESL Pod / English Class 101", url: "https://www.eslpod.com", lvl: "A2–B1", what: "Dialogues lents, expliqués en anglais simple." },
  { e: "📝", name: "Write & Improve (Cambridge)", url: "https://writeandimprove.com", lvl: "A2–C1", what: "Corrige tes textes et estime ton niveau." }
];
