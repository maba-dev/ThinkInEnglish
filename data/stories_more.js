window.DATA = window.DATA || {};
DATA.stories.push(
{
  id: "birthday-cake", lvl: "A1", title: "The birthday cake", e: "🎂",
  scenes: [
    { e: "📅🎂👧", t: "Today is Saturday. It is Emma's birthday. She is seven years old." },
    { e: "👨🍳🥚🥛", t: "Her dad wants to make a cake. He has eggs, milk, flour and chocolate." },
    { e: "📱📞😟", t: "Then his phone rings. It is his boss. Dad talks and talks. He forgets the cake in the oven." },
    { e: "🔥💨😱", t: "Oh no! There is smoke in the kitchen. The cake is black!" },
    { e: "🏃‍♂️🥐🍰", t: "Dad runs to the bakery. He buys a big strawberry cake. It is beautiful." },
    { e: "🎉🕯️😂", t: "At the party, Emma blows out the candles. 'Thank you, Dad! Is this your cake?' Dad smiles. 'Of course!'" }
  ],
  gloss: { flour: ["🌾", "white powder you use to make bread and cakes"], oven: ["🔥", "the hot box in the kitchen where you cook cakes"], smoke: ["💨", "the grey cloud that comes from fire"], candles: ["🕯️", "small sticks of wax with a little fire on top"] },
  questions: [
    { q: "How old is Emma?", o: ["Six", "Seven", "Eight"], a: 1 },
    { q: "Why does Dad forget the cake?", o: ["He is on the phone", "He is asleep", "He goes out"], a: 0 },
    { q: "Where does Dad buy the new cake?", o: ["At the supermarket", "At the bakery", "At a café"], a: 1 }
  ]
},
{
  id: "flatmate", lvl: "A2", title: "The new flatmate", e: "🏠",
  scenes: [
    { e: "🏠📝👋", t: "Last month, Yasmin moved to Dublin for work. She found a room in a flat with a guy called Liam." },
    { e: "🎸🌙😩", t: "Liam seemed nice, but on the first night he played the guitar until two in the morning. Yasmin couldn't sleep." },
    { e: "🍽️🧽😤", t: "The next day, the kitchen was a disaster. There were dirty plates everywhere, and the fridge was empty." },
    { e: "☕🗣️🙂", t: "Yasmin was angry, but she decided to talk to him calmly. She made two coffees and said, 'Can we talk about some house rules?'" },
    { e: "📋✅🤝", t: "Liam was surprised but friendly. 'Sorry! I lived alone before.' Together, they wrote a list: no music after eleven, and everyone cleans their own plates." },
    { e: "🎶🍝😊", t: "Now they're good friends. On Sundays, Liam plays the guitar — before eleven — and Yasmin cooks pasta for both of them." }
  ],
  gloss: { flat: ["🏢", "a home with rooms on one floor of a building"], disaster: ["💥", "something that goes very, very badly"], calmly: ["😌", "in a quiet way, without getting angry"], rules: ["📋", "things everybody must or must not do"] },
  questions: [
    { q: "Why couldn't Yasmin sleep?", o: ["The street was noisy", "Liam played the guitar", "She was ill"], a: 1 },
    { q: "How did Yasmin solve the problem?", o: ["She moved out", "She shouted at Liam", "She talked to him calmly"], a: 2 },
    { q: "What is one of their new rules?", o: ["No music after eleven", "No guests", "No cooking"], a: 0 }
  ]
},
{
  id: "hackathon", lvl: "B1", title: "48 hours to build it", e: "⏱️",
  scenes: [
    { e: "🏢💻👥", t: "Nadia had never taken part in a hackathon before. When her friend suggested they sign up for one in Amsterdam, she hesitated: her English wasn't perfect and she'd only been coding for a year." },
    { e: "🧑‍🤝‍🧑🗺️💡", t: "On the first evening, she was put in a team with three strangers: a designer from Brazil, a data scientist from India and a student from Poland. Their idea was an app that helps tourists find quiet places in busy cities." },
    { e: "🐛🌙☕", t: "By Saturday night, nothing was working. The map kept crashing and everyone was exhausted. Nadia wanted to give up, but the designer said, 'Let's take a break and look at it with fresh eyes.'" },
    { e: "🔍💡🎉", t: "After a walk and some terrible coffee, Nadia found the bug: a single missing line. The app finally worked, and the team cheered so loudly that people at the next table started clapping." },
    { e: "🎤😰➡️😊", t: "On Sunday, Nadia had to present the project on stage. Her hands were shaking, but she had practised her opening sentence twenty times. Once she started, the words came naturally." },
    { e: "🥈📬🌍", t: "They didn't win, but they came second. More importantly, Nadia realised that people cared about her ideas, not her accent. She has been to four hackathons since then." }
  ],
  gloss: { hackathon: ["💻", "an event where people build a software project in one or two days"], hesitated: ["🤔", "waited a moment before deciding, because she wasn't sure"], strangers: ["👥", "people you have never met"], "fresh eyes": ["👀", "a new, rested way of looking at something"], cheered: ["🙌", "shouted because they were happy"] },
  questions: [
    { q: "Why did Nadia hesitate at first?", o: ["She was too busy", "She wasn't confident about her English and experience", "She didn't like Amsterdam"], a: 1 },
    { q: "What helped the team find the bug?", o: ["Taking a break", "Asking the organisers", "Starting again from zero"], a: 0 },
    { q: "What did Nadia learn?", o: ["That her accent was a big problem", "That people cared about her ideas", "That hackathons are boring"], a: 1 }
  ]
},
{
  id: "mentor", lvl: "B2", title: "The mentor who said no", e: "🧑‍🏫",
  scenes: [
    { e: "🎓💼😤", t: "When Omar joined a software company in Montreal as a junior developer, he was determined to prove himself. He volunteered for every task, stayed late every night and rarely asked for help." },
    { e: "🧑‍🏫☕🗣️", t: "After three weeks, his mentor, Claire, invited him for a coffee. He expected praise. Instead, she told him that his last pull request had been rejected by two senior engineers." },
    { e: "📉😶", t: "Omar was stunned. He had worked on it until midnight. 'That's exactly the problem,' Claire said gently. 'You're trying to do everything on your own, so nobody can help you early.'" },
    { e: "🗂️🔁🤝", t: "She suggested a different approach: share unfinished work, ask questions in public channels, and say no to tasks he couldn't do properly. It went against everything Omar believed about being a good employee." },
    { e: "📈🌱", t: "Reluctantly, he gave it a try. His first messages felt awkward, but colleagues answered within minutes. His code improved, and, to his surprise, he started leaving the office at six." },
    { e: "🧑‍🏫🔄👩‍💻", t: "Two years later, Omar is a mentor himself. The first thing he tells every new junior is the advice he once found so hard to accept: 'Asking for help isn't a weakness; it's part of the job.'" }
  ],
  gloss: { "determined to": ["💪", "having decided firmly to do something"], praise: ["👏", "words that say you did something well"], stunned: ["😳", "so surprised that you can't react"], reluctantly: ["😒", "without really wanting to"], awkward: ["😬", "uncomfortable and a bit embarrassing"] },
  questions: [
    { q: "What was Omar's main mistake?", o: ["He worked too slowly", "He tried to do everything alone", "He argued with colleagues"], a: 1 },
    { q: "How did Omar feel about Claire's advice at first?", o: ["Enthusiastic", "It went against his beliefs", "Indifferent"], a: 1 },
    { q: "What changed after he followed her advice?", o: ["He left the company", "His code improved and he worked less late", "He got a pay rise immediately"], a: 1 }
  ]
},
{
  id: "language-exchange", lvl: "B2", title: "The language exchange", e: "🗣️",
  scenes: [
    { e: "🇫🇷🇬🇧☕", t: "Every Thursday, Julien met Tom in a café near King's Cross: thirty minutes in French, thirty minutes in English. It was Julien's idea, and at first he dreaded the English half." },
    { e: "🧠🔁😩", t: "He would plan sentences in French, translate them in his head and then deliver them far too late. By the time he had finished, the conversation had moved on." },
    { e: "🃏🎲😂", t: "Tom, who was learning French himself, suggested a game: whoever paused for more than three seconds had to pay for the next coffee. Julien lost five coffees in the first week." },
    { e: "🧩🗣️", t: "So he changed tactics. Instead of searching for the perfect word, he started describing what he meant: 'the thing you use to… ', 'a kind of…'. It sounded clumsy, but the conversation kept flowing." },
    { e: "📈🎧", t: "A few months later, something odd happened: Julien caught himself thinking in English on the Tube, commenting silently on the people around him. He hadn't translated anything for a whole journey." },
    { e: "☕💸😄", t: "These days, it's Tom who pays for most of the coffees. And Julien has stopped dreading Thursdays: they've become the highlight of his week." }
  ],
  gloss: { dreaded: ["😨", "felt very worried about something in the future"], "moved on": ["➡️", "changed to a new topic"], tactics: ["♟️", "a plan or method to get what you want"], clumsy: ["🐘", "not elegant or smooth"], highlight: ["🌟", "the best or most exciting part"] },
  questions: [
    { q: "Why was Julien always late in the conversation?", o: ["He translated everything in his head", "He didn't listen", "He spoke too fast"], a: 0 },
    { q: "What did the game force him to do?", o: ["Speak only French", "Avoid long pauses", "Write his sentences down"], a: 1 },
    { q: "What new strategy helped him?", o: ["Learning lists of words", "Describing what he meant", "Speaking more slowly"], a: 1 }
  ]
},
{
  id: "algorithm", lvl: "C1", title: "The algorithm that knew too much", e: "🧮",
  scenes: [
    { e: "🏦💻📊", t: "Priya had been hired to improve the bank's loan-approval algorithm, and within weeks she had done just that: approvals were faster, defaults had dropped, and her manager was positively glowing." },
    { e: "🔍📍😶", t: "It was only when she dug into the data on a quiet Friday afternoon that she noticed something unsettling. Applicants from certain postcodes were being rejected at twice the average rate, regardless of their income." },
    { e: "🧩⚖️", t: "The model had never been given anyone's ethnicity, yet it had learnt to infer it, in effect, from where people lived. Nobody had programmed it to discriminate; it had simply mirrored the biases buried in decades of historical decisions." },
    { e: "🗣️🏢😬", t: "Raising the issue was not without risk. The new model was already being praised in board meetings, and Priya was the most junior person on the team. She spent the weekend agonising over how to frame it." },
    { e: "📑🤝", t: "On Monday, rather than accusing anyone, she presented the figures alongside a proposal: retrain the model with fairness constraints and publish an independent audit. To her relief, the head of risk backed her straight away." },
    { e: "🌍📰", t: "The audit eventually became a case study, cited far beyond the bank. Asked about it later, Priya shrugged: 'The algorithm wasn't evil. It was a mirror — and we didn't much like what we saw.'" }
  ],
  gloss: { defaults: ["📉", "cases where people fail to pay back a loan"], glowing: ["✨", "looking extremely pleased"], unsettling: ["😟", "making you feel worried and uncomfortable"], infer: ["🔎", "to work something out from indirect information"], agonising: ["😣", "thinking about something for a long time with great worry"], "backed her": ["🤝", "supported her"] },
  questions: [
    { q: "What did Priya discover?", o: ["The model was too slow", "The model rejected people from certain areas more often", "The data had been stolen"], a: 1 },
    { q: "Why was the model biased?", o: ["Someone programmed it on purpose", "It reproduced biases in historical data", "It was given people's ethnicity"], a: 1 },
    { q: "What does Priya mean by calling the algorithm 'a mirror'?", o: ["It reflected society's own biases", "It copied other banks", "It was transparent and perfect"], a: 0 }
  ]
},
{
  id: "return", lvl: "C1", title: "Coming home a stranger", e: "🧳",
  scenes: [
    { e: "✈️🏡🌅", t: "After six years in Melbourne, Léa flew back to Bordeaux, convinced that the hardest part of living abroad was behind her. Nobody had warned her that coming home could be just as disorienting." },
    { e: "🗣️🤷‍♀️", t: "The first shock was linguistic. Mid-sentence, she would reach for a French word and find an English one in its place. Her friends teased her mercilessly; her grandmother simply looked baffled." },
    { e: "🍷⏳😶", t: "Then came the subtler shifts. Long Sunday lunches, which she had missed terribly, now struck her as slightly suffocating. She caught herself checking her watch, and felt guilty for doing so." },
    { e: "🪞🌀", t: "It dawned on her that she hadn't come back to the place she had left. The city had changed, of course, but so had she — and the gap between the two was something no one could see but her." },
    { e: "📓🤝🌏", t: "What eventually helped was not trying to pick up where she had left off. She joined a group of returnees who met monthly, and began writing about the experience, if only to make sense of it." },
    { e: "🏠🌉✨", t: "Two years on, Léa describes herself as permanently 'in between' — and, to her own surprise, she has come to regard that not as a loss but as a kind of privilege." }
  ],
  gloss: { disorienting: ["🌀", "making you feel lost and confused"], mercilessly: ["😈", "without any pity, a lot"], baffled: ["🤨", "completely confused"], suffocating: ["😮‍💨", "making you feel you can't breathe or be free"], "dawned on her": ["🌅", "she slowly understood"], returnees: ["🔙", "people who come back to their home country after living abroad"] },
  questions: [
    { q: "What surprised Léa most about coming home?", o: ["How expensive it was", "That it was as disorienting as leaving", "That her friends had moved away"], a: 1 },
    { q: "How did she feel about long Sunday lunches?", o: ["She enjoyed them even more", "They now felt a bit suffocating", "She refused to go"], a: 1 },
    { q: "How does Léa see her 'in between' identity now?", o: ["As a loss", "As a privilege", "As a temporary problem"], a: 1 }
  ]
}
);
