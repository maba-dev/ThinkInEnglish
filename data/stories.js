window.DATA = window.DATA || {};
/* Mini-stories, graded A1 → C1.
   scenes: one picture strip + one paragraph each.
   gloss: words explained with a picture and simple English (never French). */
DATA.stories = [
{
  id: "new-flat", lvl: "A1", title: "Lina's new flat", e: "🏠",
  scenes: [
    { e: "👩🧳🏠", t: "This is Lina. She is twenty-five. Today is a big day: she has a new flat in Lisbon." },
    { e: "🛏️🪑🪟", t: "The flat is small, but it is nice. There is a bed, a table, two chairs and a big window." },
    { e: "☀️🌊", t: "From the window, Lina can see the sea. The sun is shining. She is very happy." },
    { e: "🛒🍞🧀🍎", t: "In the afternoon, she goes to the supermarket. She buys bread, cheese, apples and coffee." },
    { e: "🚪👵🐱", t: "When she comes back, an old woman is at the door. 'Hello! I'm Rosa, your neighbour. And this is my cat, Tito.'" },
    { e: "☕😊", t: "Lina smiles. 'Nice to meet you, Rosa! Would you like a coffee?' Now she has a flat and a friend." }
  ],
  gloss: { flat: ["🏢", "a home with rooms on one floor of a building"], neighbour: ["🏘️", "a person who lives next to you"], shining: ["☀️", "giving bright light"] },
  questions: [
    { q: "Where is Lina's new flat?", o: ["In London", "In Lisbon", "In Lyon"], a: 1 },
    { q: "What can she see from the window?", o: ["The sea", "A park", "The station"], a: 0 },
    { q: "Who is Tito?", o: ["Rosa's son", "Rosa's dog", "Rosa's cat"], a: 2 }
  ]
},
{
  id: "lost-dog", lvl: "A1", title: "Where is Max?", e: "🐶",
  scenes: [
    { e: "👦🐶🌳", t: "Tom has a dog. His name is Max. Every morning, Tom and Max go to the park." },
    { e: "🦋🐶💨", t: "One morning, Max sees a butterfly. He runs after it. He runs and runs… and then Tom can't see him." },
    { e: "😟🔍", t: "'Max! Max! Where are you?' Tom looks behind the trees. He looks under the benches. No Max." },
    { e: "👩‍🍳🥐", t: "Tom asks a woman at the bakery. 'Excuse me, have you seen a small brown dog?' 'Yes! He went that way.'" },
    { e: "🏠🐶🦴", t: "Tom runs home. And there is Max, in front of the door, with a big bone in his mouth!" },
    { e: "🤗😂", t: "Tom laughs and hugs his dog. 'You found your way home, clever boy!'" }
  ],
  gloss: { butterfly: ["🦋", "a flying insect with big colourful wings"], benches: ["🪑", "long seats in a park, for two or more people"], bakery: ["🥐", "a shop that sells bread and cakes"], hugs: ["🤗", "puts their arms around someone with love"] },
  questions: [
    { q: "Why does Max run away?", o: ["He is hungry", "He sees a butterfly", "He hears a car"], a: 1 },
    { q: "Who helps Tom?", o: ["A woman at the bakery", "A police officer", "His mother"], a: 0 },
    { q: "Where does Tom find Max?", o: ["In the park", "At the bakery", "In front of his house"], a: 2 }
  ]
},
{
  id: "first-day", lvl: "A2", title: "First day on campus", e: "💻",
  scenes: [
    { e: "⏰😬🚆", t: "Karim woke up at six. He was nervous: it was his first day at a coding school in Berlin. He took the train and arrived early." },
    { e: "🏢💻💻💻", t: "The campus was huge. There were hundreds of computers and no teachers. 'How do we learn without teachers?' he asked himself." },
    { e: "🙋‍♀️👋", t: "A girl with green headphones came to him. 'Hi, I'm Ana. Are you new? Don't worry, everybody is lost on the first day.'" },
    { e: "🧩🤝", t: "Ana explained the rules: you work on projects, you ask other students for help, and other students check your code." },
    { e: "🐛😤➡️😃", t: "In the afternoon, Karim had a bug he couldn't fix. He asked the student next to him. Together, they found the problem in ten minutes." },
    { e: "🌙🍕", t: "In the evening, Karim was tired but happy. He ate pizza with Ana and two other students. 'I think I'm going to like it here,' he said." }
  ],
  gloss: { nervous: ["😬", "a bit worried or afraid before something important"], huge: ["🐘", "very, very big"], lost: ["🗺️", "not knowing where you are or what to do"], fix: ["🔧", "repair; make it work again"] },
  questions: [
    { q: "How did Karim feel in the morning?", o: ["Bored", "Nervous", "Angry"], a: 1 },
    { q: "What was surprising about the campus?", o: ["There were no teachers", "There were no computers", "It was very small"], a: 0 },
    { q: "How did Karim fix his bug?", o: ["He watched a video", "Ana fixed it", "With the student next to him"], a: 2 }
  ]
},
{
  id: "wrong-train", lvl: "A2", title: "The wrong train", e: "🚆",
  scenes: [
    { e: "🚉🎫", t: "Last summer, Julie went to Scotland on holiday. She wanted to go from Edinburgh to a small town called Pitlochry." },
    { e: "😴🚆", t: "She got on the train, sat by the window and fell asleep. When she woke up, the sea was on her left. That was strange: Pitlochry is in the mountains." },
    { e: "👨‍✈️❓", t: "'Excuse me,' she asked the conductor, 'does this train stop in Pitlochry?' He smiled. 'I'm afraid not, love. This train is going to Aberdeen.'" },
    { e: "😱➡️😅", t: "Julie panicked for a second. Then she laughed. 'Well, I've never been to Aberdeen.'" },
    { e: "🐬🌅🐟", t: "In Aberdeen, she saw dolphins in the harbour and ate the best fish and chips of her life." },
    { e: "📸💡", t: "The next day, she took the right train. But her favourite photo of the trip is still the dolphins — from the wrong city." }
  ],
  gloss: { conductor: ["🎫", "the person who checks tickets on a train"], panicked: ["😱", "suddenly felt very afraid and could not think clearly"], harbour: ["⚓", "a place on the coast where boats stay"] },
  questions: [
    { q: "Why did Julie miss her stop?", o: ["She was asleep", "The train was late", "She lost her ticket"], a: 0 },
    { q: "How did she react in the end?", o: ["She cried", "She laughed", "She called the police"], a: 1 },
    { q: "What did she see in Aberdeen?", o: ["Mountains", "Dolphins", "A castle"], a: 1 }
  ]
},
{
  id: "interview", lvl: "B1", title: "The interview question", e: "🎤",
  scenes: [
    { e: "🪑👔😬", t: "Mehdi had been preparing for this interview for weeks. He had practised his introduction so many times that he could say it in his sleep." },
    { e: "👩‍💼💬", t: "The interviewer, a calm woman called Priya, asked him about his projects, and everything went well. Then she asked: 'Tell me about a time you failed.'" },
    { e: "🧊😶", t: "Mehdi froze. In his head, he started translating from French, looking for the perfect sentence. The silence felt endless." },
    { e: "🫁⏳", t: "Then he remembered his teacher's advice: 'Buy time, don't translate.' He took a breath and said, 'That's a good question. Let me think for a second.'" },
    { e: "🐛📉➡️📈", t: "He told her about a group project where he had pushed broken code the night before a deadline. He explained what he had learnt: test first, and communicate early." },
    { e: "📧🎉", t: "A week later, he got an email. Priya wrote: 'We loved your honesty.' He had the job — not because his English was perfect, but because it was real." }
  ],
  gloss: { froze: ["🧊", "suddenly stopped moving or speaking, often because of fear"], endless: ["♾️", "seeming to never finish"], deadline: ["⏰", "the last moment to finish a task"], honesty: ["🤞", "telling the truth"] },
  questions: [
    { q: "Why did Mehdi freeze?", o: ["He didn't understand the question", "He was translating in his head", "The interviewer was rude"], a: 1 },
    { q: "What chunk helped him?", o: ["'Let me think for a second'", "'I don't know'", "'Can you repeat?'"], a: 0 },
    { q: "Why did he get the job?", o: ["His English was perfect", "He had the best CV", "His answer was honest"], a: 2 }
  ]
},
{
  id: "storm", lvl: "B1", title: "The night of the storm", e: "⛈️",
  scenes: [
    { e: "🏕️🌲🌄", t: "The weather forecast had promised a sunny weekend, so Sara and her brother decided to camp by a lake in the Alps." },
    { e: "🌩️⛈️💨", t: "Around midnight, they were woken up by thunder. The wind was so strong that the tent was shaking like a leaf." },
    { e: "🔦🏃‍♀️🏃", t: "'We can't stay here,' said her brother. They grabbed their torches and their phones and ran towards an old wooden hut they had seen earlier." },
    { e: "🛖🔥☕", t: "Inside, an old shepherd was making tea on a small stove. He didn't look surprised at all. 'Storms come fast up here,' he said. 'Sit down.'" },
    { e: "📖🌌", t: "He told them stories about the mountains until the storm passed. At dawn, the sky was perfectly clear, as if nothing had happened." },
    { e: "⛺💧😂", t: "Their tent was full of water, their sleeping bags were ruined — but years later, it is still the best camping trip they have ever had." }
  ],
  gloss: { forecast: ["📺", "what experts say the weather will be"], thunder: ["🌩️", "the loud noise in the sky during a storm"], torches: ["🔦", "small lights you hold in your hand (US: flashlights)"], hut: ["🛖", "a small, simple house, often made of wood"], shepherd: ["🐑", "a person who looks after sheep"], dawn: ["🌅", "the moment the sun comes up"] },
  questions: [
    { q: "Why did they go camping?", o: ["The forecast was good", "Their friend invited them", "It was a school trip"], a: 0 },
    { q: "Who was in the hut?", o: ["A park ranger", "An old shepherd", "Nobody"], a: 1 },
    { q: "How do they remember the trip today?", o: ["As a disaster", "As their best camping trip", "They have forgotten it"], a: 1 }
  ]
},
{
  id: "remote", lvl: "B2", title: "The remote worker's dilemma", e: "🌍",
  scenes: [
    { e: "🏝️💻", t: "When Leo's company announced that employees could work from anywhere, he didn't hesitate for a second. Within a month, he had swapped his grey office in Lyon for a co-working space in Bali." },
    { e: "📸😎", t: "At first, it was everything he had imagined. He posted photos of his laptop next to a swimming pool, and his friends back home were green with envy." },
    { e: "🌙📞😩", t: "But the time difference soon began to take its toll. His team's daily meeting was at 10 am in France — 4 pm for him, which was fine — but urgent calls kept coming in at midnight." },
    { e: "🫥🗨️", t: "What he hadn't anticipated was the loneliness. Online, he was always connected; in reality, he hardly had a proper conversation with anyone all week." },
    { e: "🤔⚖️", t: "After six months, Leo had to admit that the dream life was more of a trade-off than he had expected. Freedom came at the price of routine, friendship and sleep." },
    { e: "🏙️🧳✨", t: "He didn't go back to Lyon, though. Instead, he moved to Lisbon, a city in his team's time zone, with a strong community of remote workers. Sometimes, he says, the best decision is a compromise." }
  ],
  gloss: { swapped: ["🔄", "exchanged one thing for another"], "green with envy": ["🤢", "very jealous of what someone else has"], "take its toll": ["📉", "to have a bad effect slowly, over time"], anticipated: ["🔮", "expected or predicted"], compromise: ["🤝", "a solution where each side accepts part of what it wants"] },
  questions: [
    { q: "What was the first big problem Leo faced?", o: ["The cost of living", "The time difference", "Bad internet"], a: 1 },
    { q: "What did he not expect?", o: ["Loneliness", "The heat", "His salary going down"], a: 0 },
    { q: "Why did he choose Lisbon?", o: ["It was cheaper than Bali", "His family lives there", "It's in his team's time zone"], a: 2 }
  ]
},
{
  id: "ai-letter", lvl: "C1", title: "The letter nobody wrote", e: "✉️",
  scenes: [
    { e: "👵📬", t: "For forty years, Margaret had exchanged handwritten letters with her pen friend Anne, who lived in Canada. They had never met, yet each knew the other's life in remarkable detail." },
    { e: "✒️➡️⌨️", t: "When Anne's arthritis made writing too painful, her grandson set up an AI assistant to help her. Anne would dictate a few rough ideas; the software would turn them into elegant, flowing prose." },
    { e: "🤨📄", t: "Margaret noticed immediately. The letters were flawless — and utterly hollow. Gone were the crossed-out words, the tangents about the weather, the jokes that only made sense to the two of them." },
    { e: "😔💭", t: "She agonised over whether to say anything. Was it fair to criticise the very tool that allowed her friend to keep writing at all? Wasn't a polished letter better than no letter?" },
    { e: "✉️❤️", t: "In the end, she wrote back with characteristic bluntness: 'I'd rather read three clumsy lines from you than three perfect pages from a machine.'" },
    { e: "📝🖊️🌷", t: "The next envelope contained a single, shaky sentence, barely legible: 'Here I am, then — warts and all.' Margaret framed it. It was, she later said, the finest thing Anne had ever sent her." }
  ],
  gloss: { "pen friend": ["✉️", "someone you write letters to, often in another country"], flawless: ["💎", "with no mistakes at all"], hollow: ["🕳️", "empty inside; without real feeling"], tangents: ["↗️", "moments when you leave the main subject to talk about something else"], agonised: ["😣", "worried and thought about something for a long time"], bluntness: ["🔨", "saying exactly what you think, without being diplomatic"], "warts and all": ["🐸", "including all the faults and imperfections"] },
  questions: [
    { q: "Why did Anne start using an AI assistant?", o: ["She was too busy", "Writing had become painful", "Her English was poor"], a: 1 },
    { q: "What did Margaret miss in the new letters?", o: ["The personal imperfections", "Correct grammar", "Long descriptions"], a: 0 },
    { q: "What does 'warts and all' suggest about the last letter?", o: ["It was written by the AI", "It was imperfect but authentic", "It was very long"], a: 1 }
  ]
}
];
