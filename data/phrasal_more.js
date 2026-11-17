window.DATA = window.DATA || {};
(function () {
  /* the 12 "Daily life & routine" verbs become A1 */
  DATA.phrasal.forEach(p => { if (p.c === 0) p.lvl = "A1"; });
  const cat = name => { let i = DATA.pvCats.findIndex(c => c.name === name); return i; };
  DATA.pvCats.push({ emoji: "🎓", name: "Formal, academic & abstract" });
  const C1CAT = DATA.pvCats.length - 1;
  const mk = (lvl, c, rows) => rows.forEach(([pv, type, mean, ex, e, part]) => DATA.phrasal.push({ pv, type, mean, ex, c, e, part, lvl }));
  mk("A1", 0, [
    ["sit down", "sans objet", "to move from standing to sitting", "Please sit down and make yourself comfortable.", "🪑", "down"],
    ["stand up", "sans objet", "to move from sitting to standing", "Everybody stood up when the teacher came in.", "🧍", "up"],
    ["come in", "sans objet", "to enter a room or a building", "Come in! The door is open.", "🚪", "in"],
    ["come back", "sans objet", "to return to a place", "I'll come back in ten minutes.", "↩️", "back"],
    ["go back", "sans objet", "to return to a place you were before", "I want to go back to Italy next year.", "🔙", "back"],
    ["get on", "inséparable", "to enter a bus, train or plane", "Get on the bus at the station.", "🚌", "on"],
    ["get off", "inséparable", "to leave a bus, train or plane", "Get off at the next stop.", "🚏", "off"],
    ["look at", "inséparable", "to turn your eyes towards something", "Look at this photo — it's my dog!", "👀", "at"],
    ["listen to", "inséparable", "to give attention to a sound", "I listen to music on the train.", "🎧", "to"],
    ["wait for", "inséparable", "to stay until someone or something arrives", "Wait for me! I'm coming.", "⏳", "for"]
  ]);
  mk("A2", 0, [
    ["try on", "séparable", "to put on clothes to see if they fit", "Can I try these jeans on?", "👖", "on"],
    ["put away", "séparable", "to put something back in its place", "Put your toys away, please.", "🧺", "away"],
    ["grow up", "sans objet", "to become an adult", "I grew up in a small village.", "🌱", "up"],
    ["eat out", "sans objet", "to eat in a restaurant", "We eat out every Friday.", "🍽️", "out"],
    ["give back", "séparable", "to return something to its owner", "Can you give me back my charger?", "🤲", "back"],
    ["turn up", "séparable", "to increase the volume or heat / to arrive", "Turn the music up! · He turned up late.", "🔊", "up"],
    ["take out", "séparable", "to remove / to take someone to a restaurant", "Can you take the rubbish out?", "🗑️", "out"],
    ["clean up", "séparable", "to make a place clean and tidy", "Let's clean up the kitchen after dinner.", "🧽", "up"]
  ]);
  mk("C1", C1CAT, [
    ["bring about", "séparable", "to cause something to happen", "The internet brought about huge social changes.", "🌋", "about"],
    ["come across as", "inséparable", "to give a particular impression", "He comes across as arrogant, but he's actually shy.", "🎭", "across"],
    ["fall through", "sans objet", "to fail to happen (a plan, a deal)", "The deal fell through at the last minute.", "🕳️", "through"],
    ["gloss over", "inséparable", "to mention something quickly to avoid the problem", "The report glosses over the security risks.", "🖌️", "over"],
    ["phase out", "séparable", "to stop using something gradually", "The city is phasing out diesel buses.", "📉", "out"],
    ["play down", "séparable", "to make something seem less important", "The CEO played down the losses.", "🔉", "down"],
    ["pull off", "séparable", "to succeed in doing something difficult", "Nobody thought we could finish in time, but we pulled it off.", "🏆", "off"],
    ["run up against", "inséparable", "to meet an unexpected problem", "We ran up against strong opposition from management.", "🧱", "up"],
    ["stem from", "inséparable", "to be caused by", "Most bugs stem from unclear requirements.", "🌿", "from"],
    ["touch on", "inséparable", "to mention a subject briefly", "In her talk, she touched on the ethics of AI.", "👆", "on"],
    ["weigh up", "séparable", "to consider carefully before deciding", "I'm weighing up the pros and cons of moving abroad.", "⚖️", "up"],
    ["write off", "séparable", "to decide something is a failure or worthless", "Don't write him off — he learns fast.", "❌", "off"],
    ["zero in on", "inséparable", "to focus all your attention on", "Let's zero in on the main cause of the crash.", "🎯", "in"],
    ["account for", "inséparable", "to explain / to form a part of", "Mobile users account for 70% of our traffic.", "🧮", "for"],
    ["bank on", "inséparable", "to rely on something happening", "Don't bank on getting a bonus this year.", "🏦", "on"],
    ["crack down on", "inséparable", "to deal with something much more strictly", "The government is cracking down on tax fraud.", "🚨", "down"],
    ["drag on", "sans objet", "to continue for too long", "The meeting dragged on for three hours.", "🐌", "on"],
    ["dwell on", "inséparable", "to think or talk too much about something negative", "Don't dwell on your mistakes; learn from them.", "🌧️", "on"],
    ["factor in", "séparable", "to include something in a calculation or decision", "Remember to factor in the cost of living.", "➕", "in"],
    ["follow through (on)", "inséparable", "to finish what you started or promised", "Good leaders follow through on their promises.", "✅", "through"],
    ["live up to", "inséparable", "to be as good as expected", "The sequel didn't live up to the hype.", "📏", "up"],
    ["opt out (of)", "inséparable", "to choose not to take part", "You can opt out of the newsletter at any time.", "🚪", "out"],
    ["step down", "sans objet", "to leave an important job or position", "The minister stepped down after the scandal.", "⬇️", "down"],
    ["usher in", "séparable", "to mark the start of something new", "Smartphones ushered in a new era of communication.", "🎬", "in"],
    ["brush aside", "séparable", "to refuse to consider something seriously", "She brushed aside all criticism.", "🧹", "aside"],
    ["cave in (to)", "inséparable", "to finally accept something after resisting", "The company caved in to pressure from customers.", "🏚️", "in"]
  ]);
})();
