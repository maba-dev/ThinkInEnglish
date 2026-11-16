window.DATA = window.DATA || {};
/* Extra chunks by level. Format: a line with a number = category index; then "chunk|≈ français|example". */
DATA.chunkCats.push(
  { emoji: "🛒", name: "Shopping, cafés & services" },
  { emoji: "✈️", name: "Travel & getting around" },
  { emoji: "🩺", name: "Health & feelings" },
  { emoji: "📱", name: "Phone, messages & tech" },
  { emoji: "🎉", name: "Invitations & going out" },
  { emoji: "🗣️", name: "Idioms & figurative language" },
  { emoji: "⚖️", name: "Nuance, hedging & emphasis" }
);
DATA.chunkRaw = DATA.chunkRaw || {};
DATA.chunkRaw.A1 = `
0
Nice to meet you.|Enchanté(e).|Hi, I'm Karim. — Nice to meet you, Karim.
Where are you from?|Tu viens d'où ?|Where are you from? — I'm from Lyon.
I'm from France.|Je viens de France.|I'm from France, but I live in Spain.
How old are you?|Quel âge as-tu ?|How old are you? — I'm twenty-six.
I'm ... years old.|J'ai ... ans.|I'm twenty-six years old.
What's your name?|Comment tu t'appelles ?|Hi! What's your name?
My name is|Je m'appelle|My name is Sara.
How are you?|Comment vas-tu ?|Hello Tom! How are you?
I'm fine, thank you.|Je vais bien, merci.|I'm fine, thank you. And you?
And you?|Et toi ?|I'm a student. And you?
See you later!|À plus tard !|Bye, see you later!
See you tomorrow!|À demain !|Good night, see you tomorrow!
Have a nice day!|Bonne journée !|Thanks for your help. Have a nice day!
Good morning!|Bonjour ! (le matin)|Good morning! Did you sleep well?
Good night!|Bonne nuit !|Good night, sleep well!
Do you speak English?|Tu parles anglais ?|Excuse me, do you speak English?
I speak a little English.|Je parle un peu anglais.|Sorry, I speak a little English.
What do you like doing?|Qu'est-ce que tu aimes faire ?|What do you like doing at the weekend?
Me too!|Moi aussi !|I love pizza. — Me too!
Me neither.|Moi non plus.|I don't like the cold. — Me neither.
Welcome!|Bienvenue !|Welcome to our house!
2
I don't understand.|Je ne comprends pas.|Sorry, I don't understand.
Can you repeat, please?|Tu peux répéter, s'il te plaît ?|Can you repeat, please? I didn't hear.
How do you spell that?|Comment ça s'écrit ?|Karim? How do you spell that?
What does this word mean?|Que veut dire ce mot ?|What does this word mean? "Busy"?
Slowly, please.|Lentement, s'il te plaît.|Slowly, please. My English isn't very good.
I don't know.|Je ne sais pas.|Where is Ana? — I don't know.
3
Great!|Super !|I passed the test! — Great!
Really?|Vraiment ?|I have five cats. — Really?
Oh no!|Oh non !|Oh no! I forgot my keys.
That's nice.|C'est sympa.|My sister made me a cake. — That's nice.
Cool!|Cool !|I have a new bike. — Cool!
Congratulations!|Félicitations !|I got the job! — Congratulations!
Happy birthday!|Joyeux anniversaire !|Happy birthday, Lina! How old are you today?
I'm sorry.|Je suis désolé(e).|I'm sorry, I'm late.
Good luck!|Bonne chance !|Good luck with your exam!
Thank you very much.|Merci beaucoup.|Thank you very much for the flowers.
You're welcome.|De rien.|Thanks for the coffee! — You're welcome.
No problem.|Pas de problème.|Can you help me? — No problem.
Excuse me.|Excusez-moi.|Excuse me, where is the station?
Of course!|Bien sûr !|Can I sit here? — Of course!
4
I like|J'aime|I like coffee, but I don't like tea.
I love|J'adore|I love music.
I don't like|Je n'aime pas|I don't like getting up early.
My favourite ... is|Mon ... préféré est|My favourite colour is blue.
I think it's|Je pense que c'est|I think it's a good idea.
It's very good.|C'est très bon.|Try this cake, it's very good.
6
I live in|J'habite à|I live in a small flat in Paris.
I work as|Je travaille comme|I work as a developer.
I'm a student.|Je suis étudiant(e).|I'm a student at a coding school.
I've got|J'ai|I've got two brothers.
There is / There are|Il y a|There are three rooms in my flat.
I'm hungry.|J'ai faim.|I'm hungry. Let's eat!
I'm thirsty.|J'ai soif.|I'm thirsty. Can I have some water?
I'm tired.|Je suis fatigué(e).|I'm tired. I'm going to bed.
I'm cold.|J'ai froid.|I'm cold. Can you close the window?
I'm hot.|J'ai chaud.|I'm hot. Let's go to the beach.
I'm busy.|Je suis occupé(e).|Sorry, I'm busy right now.
I'm ready.|Je suis prêt(e).|I'm ready. Let's go!
Let's go!|Allons-y !|It's eight o'clock. Let's go!
Come in!|Entre !|Come in! Sit down, please.
Sit down, please.|Asseyez-vous, s'il vous plaît.|Sit down, please. Do you want a coffee?
Wait a minute.|Attends une minute.|Wait a minute, I need my bag.
I need|J'ai besoin de|I need a new phone.
I want to|Je veux|I want to learn English.
I can|Je sais / je peux|I can swim, but I can't ski.
I can't|Je ne sais pas / ne peux pas|I can't come today.
Be careful!|Fais attention !|Be careful! The floor is wet.
Don't worry.|Ne t'inquiète pas.|Don't worry, it's OK.
Here you are.|Voilà / tiens.|Here you are, your coffee.
Is it OK?|C'est bon ? (ça va ?)|I'm using your pen. Is it OK?
It's OK.|Ça va / c'est bon.|Sorry! — It's OK.
Where is the toilet?|Où sont les toilettes ?|Excuse me, where is the toilet?
I go to bed at|Je me couche à|I go to bed at eleven.
I get up at|Je me lève à|I get up at seven every day.
I have breakfast|Je prends le petit-déjeuner|I have breakfast at home.
I go to work by|Je vais au travail en|I go to work by bus.
at home|à la maison|I'm at home tonight.
at work|au travail|She's at work until six.
7
What time is it?|Quelle heure est-il ?|Excuse me, what time is it?
It's ... o'clock.|Il est ... heures.|It's three o'clock.
at the weekend|le week-end|What do you do at the weekend?
every day|tous les jours|I study English every day.
in the morning|le matin|I drink coffee in the morning.
in the evening|le soir|I watch TV in the evening.
on Monday|lundi|I have a meeting on Monday.
today|aujourd'hui|It's sunny today.
tomorrow|demain|See you tomorrow!
yesterday|hier|I was at home yesterday.
now|maintenant|I'm busy now. Call me later.
later|plus tard|I'll call you later.
What day is it today?|On est quel jour ?|What day is it today? — It's Friday.
next week|la semaine prochaine|I'm on holiday next week.
last night|hier soir|I slept badly last night.
How often do you|Tous les combien est-ce que tu|How often do you go to the gym?
usually|d'habitude|I usually walk to work.
sometimes|parfois|I sometimes cook on Sundays.
never|jamais|I never drink coffee at night.
15
How much is it?|Combien ça coûte ?|I like this bag. How much is it?
Can I have|Je peux avoir|Can I have a coffee, please?
I'd like|Je voudrais|I'd like a sandwich, please.
A table for two, please.|Une table pour deux, s'il vous plaît.|Good evening. A table for two, please.
The bill, please.|L'addition, s'il vous plaît.|The bill, please. Can I pay by card?
Can I pay by card?|Je peux payer par carte ?|Can I pay by card or only cash?
Anything else?|Autre chose ?|One coffee. Anything else? — No, thanks.
That's all, thanks.|C'est tout, merci.|Anything else? — That's all, thanks.
Do you have|Vous avez|Do you have this T-shirt in blue?
It's too expensive.|C'est trop cher.|It's nice, but it's too expensive.
I'm just looking.|Je regarde seulement.|Can I help you? — No thanks, I'm just looking.
Can I try it on?|Je peux l'essayer ?|I like this jacket. Can I try it on?
Where can I buy|Où est-ce que je peux acheter|Where can I buy a SIM card?
To take away, please.|À emporter, s'il vous plaît.|A latte to take away, please.
for here|sur place|Is it for here or to take away?
16
Where is the station?|Où est la gare ?|Excuse me, where is the station?
Is it far?|C'est loin ?|The museum? Is it far?
It's near here.|C'est près d'ici.|The bank? It's near here.
Turn left.|Tournez à gauche.|Turn left at the bank.
Turn right.|Tournez à droite.|Turn right after the church.
Go straight on.|Allez tout droit.|Go straight on for 200 metres.
A ticket to ..., please.|Un billet pour ..., s'il vous plaît.|A ticket to Oxford, please.
a return ticket|un aller-retour|A return ticket to London, please.
a single ticket|un aller simple|Just a single ticket, please.
What time does it leave?|À quelle heure il part ?|The bus to the airport — what time does it leave?
I'm lost.|Je suis perdu(e).|Excuse me, I'm lost. Where is the hotel?
I have a reservation.|J'ai une réservation.|Hello, I have a reservation. My name is Martin.
on the left|à gauche|The bank is on the left.
next to|à côté de|The café is next to the cinema.
opposite|en face de|The hotel is opposite the station.
17
I'm happy.|Je suis content(e).|I'm happy to see you!
I'm sad.|Je suis triste.|I'm sad because my friend is leaving.
I feel sick.|Je me sens mal / j'ai la nausée.|I feel sick. I want to go home.
I have a headache.|J'ai mal à la tête.|I have a headache. Do you have an aspirin?
My ... hurts.|J'ai mal au/à la ...|My back hurts.
I have a cold.|J'ai un rhume.|I have a cold, so I'm staying at home.
Call a doctor!|Appelez un médecin !|Help! Call a doctor!
Are you OK?|Ça va ? (tu vas bien ?)|You look pale. Are you OK?
I'm bored.|Je m'ennuie.|I'm bored. Let's do something.
I'm scared.|J'ai peur.|I'm scared of dogs.
18
Hello, this is|Allô, c'est|Hello, this is Sam.
Can I speak to|Je peux parler à|Can I speak to Mr Brown, please?
What's your phone number?|C'est quoi ton numéro ?|What's your phone number? I'll text you.
What's your email address?|Quelle est ton adresse e-mail ?|What's your email address?
What's the Wi-Fi password?|C'est quoi le mot de passe du Wi-Fi ?|Excuse me, what's the Wi-Fi password?
Call me.|Appelle-moi.|Call me when you arrive.
Text me.|Envoie-moi un texto.|Text me your address.
My phone is dead.|Mon téléphone n'a plus de batterie.|Sorry, my phone is dead.
19
Do you want to|Tu veux|Do you want to come to the cinema?
Let's go to|Allons à/au|Let's go to the park!
Yes, please.|Oui, avec plaisir.|Do you want some tea? — Yes, please.
No, thank you.|Non, merci.|More cake? — No, thank you.
I'd love to.|Avec grand plaisir.|Do you want to come? — I'd love to.
What time?|À quelle heure ?|Dinner on Friday? What time?
Where do we meet?|On se retrouve où ?|OK for the cinema. Where do we meet?
Have fun!|Amuse-toi bien !|You're going to the party? Have fun!
`;
DATA.chunkRaw.A2 = `
0
What do you do for a living?|Tu fais quoi dans la vie ?|What do you do for a living? — I'm a nurse.
How was your weekend?|C'était comment ton week-end ?|Hi! How was your weekend?
Did you have a good time?|Tu t'es bien amusé(e) ?|You went to Rome? Did you have a good time?
What have you been up to?|Qu'est-ce que tu deviens ?|Hey! What have you been up to lately?
Nothing much.|Pas grand-chose.|What's new? — Nothing much, just work.
Same here.|Pareil pour moi.|I'm so tired today. — Same here.
It's nice to see you again.|Ça fait plaisir de te revoir.|Hi Paul! It's nice to see you again.
Say hi to|Passe le bonjour à|Say hi to your parents for me.
Take care!|Prends soin de toi !|Bye! Take care!
Have a good weekend!|Bon week-end !|See you on Monday. Have a good weekend!
You too.|Toi aussi.|Have a nice evening! — You too.
I've heard a lot about you.|J'ai beaucoup entendu parler de toi.|Nice to meet you, I've heard a lot about you.
How do you know|Comment tu connais|How do you know Sarah? — We studied together.
What brings you here?|Qu'est-ce qui t'amène ici ?|So, what brings you here? Work or holiday?
1
Well,|Eh bien,|Well, I'm not sure.
Hmm, let me see.|Hmm, voyons voir.|Hmm, let me see… I think it was Tuesday.
Just a moment.|Un instant.|Just a moment, I'm looking for it.
Good question!|Bonne question !|Why English? Good question!
I'm not sure, but|Je ne suis pas sûr(e), mais|I'm not sure, but I think it's closed.
2
Could you write it down?|Tu peux l'écrire ?|I didn't get the address. Could you write it down?
What's the word for|Comment on dit|What's the word for the thing you use to open wine?
Sorry, what did you say?|Pardon, tu as dit quoi ?|Sorry, what did you say? It's noisy here.
Is that right?|C'est ça ?|The meeting is at ten. Is that right?
Can you give me an example?|Tu peux me donner un exemple ?|I don't get it. Can you give me an example?
I'm not sure I understand.|Je ne suis pas sûr(e) de comprendre.|I'm not sure I understand the question.
3
That's amazing!|C'est génial !|You climbed Kilimanjaro? That's amazing!
What a pity!|Quel dommage !|The concert is cancelled? What a pity!
Lucky you!|Veinard(e) !|You're going to Bali? Lucky you!
Well done!|Bravo !|You passed your driving test? Well done!
Poor you!|Mon/ma pauvre !|You've got the flu? Poor you!
I'm glad to hear that.|Ça me fait plaisir d'entendre ça.|Your mum is better? I'm glad to hear that.
Sounds good.|Ça marche / ça me va.|Dinner at eight? Sounds good.
That's funny!|C'est drôle !|He called his dog "Wi-Fi"? That's funny!
Oh, I see.|Ah, je vois.|The shop moved? Oh, I see.
What happened?|Qu'est-ce qui s'est passé ?|You look upset. What happened?
Are you serious?|Tu es sérieux ?|You quit your job? Are you serious?
I hope so.|J'espère.|Will it be sunny tomorrow? — I hope so.
I don't think so.|Je ne pense pas.|Is the shop open on Sunday? — I don't think so.
Don't mention it.|Il n'y a pas de quoi.|Thanks a lot! — Don't mention it.
4
I prefer ... to ...|Je préfère ... à ...|I prefer tea to coffee.
I'd rather|Je préférerais|I'd rather stay at home tonight.
I'm a big fan of|Je suis fan de|I'm a big fan of football.
It's not my cup of tea.|Ce n'est pas mon truc.|Opera? It's not my cup of tea.
I think so too.|Je pense aussi.|This place is great. — I think so too.
It's worth it.|Ça vaut le coup.|The ticket is expensive, but it's worth it.
It's better than|C'est mieux que|Living here is better than I thought.
What do you think of|Qu'est-ce que tu penses de|What do you think of my new haircut?
6
I have to|Je dois|I have to work tomorrow.
I don't have to|Je n'ai pas besoin de|It's Sunday, I don't have to get up early.
I'm used to it.|J'ai l'habitude.|The noise? I'm used to it.
I'm getting used to|Je m'habitue à|I'm getting used to the weather here.
It's my turn.|C'est mon tour.|Let me pay — it's my turn.
It's your turn.|C'est ton tour.|It's your turn to cook.
I'm on my way.|J'arrive / je suis en route.|I'm on my way, see you in ten minutes.
Hurry up!|Dépêche-toi !|Hurry up, the train is leaving!
I forgot.|J'ai oublié.|Sorry, I forgot to call you.
I lost my|J'ai perdu mon/ma|I lost my wallet on the bus.
It doesn't matter.|Ce n'est pas grave.|I broke a glass! — It doesn't matter.
I'm not sure.|Je ne suis pas sûr(e).|Is it far? — I'm not sure.
Can you help me?|Tu peux m'aider ?|This box is heavy. Can you help me?
Could you|Pourrais-tu|Could you open the window, please?
Do you mind if I|Ça te dérange si je|Do you mind if I sit here?
do the shopping|faire les courses|I'm doing the shopping. Do you need anything?
do the washing-up|faire la vaisselle|I cooked, so you do the washing-up.
I'm in a hurry.|Je suis pressé(e).|Sorry, I'm in a hurry. Can we talk later?
It takes|Ça prend (durée)|It takes twenty minutes to get to work.
spend time with|passer du temps avec|I like spending time with my family.
take a photo|prendre une photo|Can you take a photo of us?
have a shower|prendre une douche|I'll have a shower and then we can go.
go for a walk|aller se promener|Let's go for a walk after lunch.
What's the matter?|Qu'est-ce qui ne va pas ?|What's the matter? You look worried.
7
a few days ago|il y a quelques jours|I saw him a few days ago.
the day before yesterday|avant-hier|I arrived the day before yesterday.
the day after tomorrow|après-demain|The exam is the day after tomorrow.
at the moment|en ce moment|I'm looking for a job at the moment.
these days|ces temps-ci|I'm really busy these days.
on time|à l'heure|The train was on time.
in time|à temps|We arrived just in time for dinner.
all day|toute la journée|It rained all day.
until|jusqu'à|The shop is open until eight.
for two years|depuis deux ans (durée)|I've lived here for two years.
since 2022|depuis 2022|I've worked here since 2022.
How long does it take?|Ça prend combien de temps ?|How long does it take to get to the airport?
I'm going to|Je vais (projet)|I'm going to visit my parents this weekend.
What are you doing this weekend?|Tu fais quoi ce week-end ?|What are you doing this weekend? — Nothing special.
once a week|une fois par semaine|I go swimming once a week.
twice a month|deux fois par mois|We eat out twice a month.
hardly ever|presque jamais|I hardly ever watch TV.
8
It's like a ... but|C'est comme un ... mais|It's like a bike, but with a motor.
You use it for|On l'utilise pour|You use it for cutting paper.
It's a type of|C'est un type de|It's a type of fish.
9
and then|et puis|We had dinner and then we went dancing.
after that|après ça|I went to the gym. After that, I had a shower.
because of|à cause de|The match was cancelled because of the rain.
so|donc|It was raining, so we stayed at home.
for example|par exemple|I love sports, for example tennis and swimming.
At first,|Au début,|At first, I didn't like London.
In the end,|Finalement,|In the end, we took a taxi.
15
I'm looking for|Je cherche|I'm looking for a present for my sister.
Have you got it in a smaller size?|Vous l'avez en plus petit ?|These shoes are too big. Have you got them in a smaller size?
Is there a discount?|Il y a une réduction ?|Is there a student discount?
Can I get a receipt?|Je peux avoir un ticket ?|Can I get a receipt, please?
Could I see the menu?|Je pourrais voir la carte ?|Excuse me, could I see the menu?
What do you recommend?|Qu'est-ce que vous recommandez ?|Everything looks good. What do you recommend?
I'll have|Je vais prendre|I'll have the chicken, please.
Is service included?|Le service est compris ?|Is service included in the bill?
Keep the change.|Gardez la monnaie.|Here's twenty. Keep the change.
It's on sale.|C'est en solde.|This coat is on sale — half price!
I'd like to return this.|Je voudrais rendre ceci.|I'd like to return this. It doesn't work.
Could we have the bill?|On pourrait avoir l'addition ?|Could we have the bill, please?
I'm allergic to|Je suis allergique à|I'm allergic to nuts. Are there any in this?
Is this seat free?|Cette place est libre ?|Excuse me, is this seat free?
16
How do I get to|Comment je vais à|How do I get to the city centre?
Which platform?|Quel quai ?|The train to Bath — which platform?
Does this bus go to|Ce bus va à|Does this bus go to the airport?
I missed the bus.|J'ai raté le bus.|Sorry I'm late, I missed the bus.
The flight is delayed.|Le vol est retardé.|The flight is delayed by two hours.
I'd like to check in.|Je voudrais m'enregistrer.|Hello, I'd like to check in.
What time is check-out?|À quelle heure faut-il libérer la chambre ?|What time is check-out tomorrow?
Could you call a taxi?|Pourriez-vous appeler un taxi ?|Could you call a taxi for me, please?
It's about ten minutes' walk.|C'est à environ dix minutes à pied.|The beach? It's about ten minutes' walk.
take the first left|prendre la première à gauche|Take the first left and it's on your right.
get on / get off|monter / descendre (bus, train)|Get off at the third stop.
I'm here on holiday.|Je suis ici en vacances.|I'm here on holiday for two weeks.
I'm here on business.|Je suis ici pour le travail.|I'm here on business until Friday.
17
I don't feel well.|Je ne me sens pas bien.|I don't feel well. I'm going home.
I've got a sore throat.|J'ai mal à la gorge.|I've got a sore throat and a cough.
I need to see a doctor.|Je dois voir un médecin.|My ankle is swollen. I need to see a doctor.
I hurt my|Je me suis fait mal au/à la|I hurt my knee playing football.
Get well soon!|Bon rétablissement !|You're ill? Get well soon!
I'm worried about|Je m'inquiète pour|I'm worried about my exam.
I'm excited about|J'ai hâte de / je suis excité(e) par|I'm excited about my trip to Canada.
I'm nervous.|Je suis nerveux / stressé(e).|I'm nervous about the interview.
I'm in a good mood.|Je suis de bonne humeur.|I'm in a good mood today!
I'm fed up.|J'en ai marre.|I'm fed up with this rain.
18
Can I call you back?|Je peux te rappeler ?|I'm driving. Can I call you back?
Hold on, please.|Ne quittez pas.|Hold on, please. I'll get her.
The line is bad.|La ligne est mauvaise.|Sorry, the line is bad. Can you repeat?
I'll send you a message.|Je t'enverrai un message.|I'll send you a message with the address.
Can you hear me?|Tu m'entends ?|Hello? Can you hear me?
You're on mute.|Tu es en muet.|Sorry, you're on mute!
I can't find|Je ne trouve pas|I can't find the file.
The Wi-Fi isn't working.|Le Wi-Fi ne marche pas.|The Wi-Fi isn't working in my room.
Can I leave a message?|Je peux laisser un message ?|She's not here? Can I leave a message?
19
Would you like to|Voudrais-tu|Would you like to have dinner with us?
Are you free on|Tu es libre (jour)|Are you free on Saturday evening?
I'm afraid I can't.|J'ai bien peur de ne pas pouvoir.|Dinner tomorrow? I'm afraid I can't.
Maybe another time.|Peut-être une autre fois.|I'm busy tonight. Maybe another time.
What about Friday?|Et vendredi ?|Saturday is bad for me. What about Friday?
Let's meet at|Retrouvons-nous à|Let's meet at the station at six.
Shall I bring something?|Je dois apporter quelque chose ?|Thanks for the invitation! Shall I bring something?
Thanks for inviting me.|Merci de m'avoir invité(e).|Thanks for inviting me, it was lovely.
I had a great time.|Je me suis bien amusé(e).|Thanks for the party, I had a great time.
Cheers!|Santé !|Cheers! To your new job!
`;
DATA.chunkRaw.B1 = `
0
Small world!|Le monde est petit !|You know my cousin? Small world!
It's been ages!|Ça fait une éternité !|Anna! It's been ages! How are you?
What's new with you?|Quoi de neuf ?|So, what's new with you?
I'll let you go.|Je te laisse.|Anyway, I'll let you go. Talk soon!
Talk to you soon.|À bientôt (au téléphone).|OK, talk to you soon. Bye!
Let's keep in touch.|Restons en contact.|It was great working with you. Let's keep in touch.
I didn't catch your name.|Je n'ai pas saisi ton nom.|Sorry, I didn't catch your name.
Have we met before?|On s'est déjà rencontrés ?|You look familiar. Have we met before?
How's work going?|Comment ça se passe au travail ?|How's work going? Still busy?
How did it go?|Comment ça s'est passé ?|You had your exam today! How did it go?
1
Let me think about it.|Laisse-moi y réfléchir.|It's a good offer. Let me think about it.
I've never really thought about it.|Je n'y ai jamais vraiment pensé.|My favourite decade? I've never really thought about it.
Where was I?|Où en étais-je ?|Sorry, where was I? Oh yes, the trip.
What's the word…?|C'est quoi le mot… ?|It's a… what's the word… a ladder!
It's hard to explain.|C'est difficile à expliquer.|It's hard to explain, but I'll try.
How shall I put it?|Comment dire ?|He's… how shall I put it… very direct.
2
Could you be more specific?|Tu peux être plus précis ?|"Soon"? Could you be more specific?
Sorry, I lost you there.|Désolé, je t'ai perdu.|Sorry, I lost you there. Can you go back?
What exactly do you mean?|Que veux-tu dire exactement ?|"Flexible hours" — what exactly do you mean?
Could you explain that again?|Pourrais-tu réexpliquer ?|Could you explain that again in a different way?
Did I get that right?|J'ai bien compris ?|So we start at nine. Did I get that right?
Are you saying that|Tu veux dire que|Are you saying that the project is cancelled?
3
You must be joking!|Tu plaisantes !|They want it by tomorrow? You must be joking!
I bet!|J'imagine bien !|I was so tired after the flight. — I bet!
That's a relief!|Quel soulagement !|The test was easy? That's a relief!
How annoying!|C'est agaçant !|They lost your luggage? How annoying!
What a coincidence!|Quelle coïncidence !|You're from Lyon too? What a coincidence!
It's not the end of the world.|Ce n'est pas la fin du monde.|You failed one exam. It's not the end of the world.
I'm so happy for you!|Je suis tellement content(e) pour toi !|You're getting married? I'm so happy for you!
That must be hard.|Ça doit être dur.|You're working nights? That must be hard.
That sounds like fun.|Ça a l'air amusant.|A trip to Iceland? That sounds like fun.
Oh, come on!|Allez ! / Oh, arrête !|Oh, come on! It's only five minutes.
Guess what!|Devine quoi !|Guess what! I got the job!
You won't believe this, but|Tu ne vas pas me croire, mais|You won't believe this, but I met Tom Hanks.
4
I've got mixed feelings about|J'ai des sentiments partagés sur|I've got mixed feelings about living abroad.
I'm not a big fan of|Je ne suis pas fan de|I'm not a big fan of horror films.
To me,|Pour moi,|To me, health is more important than money.
I'd go for|Je choisirais|Pasta or pizza? I'd go for pizza.
It's a waste of time.|C'est une perte de temps.|Some meetings are a waste of time.
It's a good way to|C'est un bon moyen de|Cooking is a good way to relax.
Personally,|Personnellement,|Personally, I prefer working from home.
I must admit|Je dois avouer|I must admit, the film was better than I expected.
What's your take on|Quel est ton avis sur|What's your take on remote work?
I'm not keen on|Je ne suis pas emballé(e) par|I'm not keen on spicy food.
5
Exactly!|Exactement !|It's too expensive. — Exactly!
Absolutely.|Absolument.|Should we take a break? — Absolutely.
I suppose so.|J'imagine que oui.|Is it the best option? — I suppose so.
I'm with you on that.|Je suis d'accord avec toi là-dessus.|Meetings should be shorter. — I'm with you on that.
You're right.|Tu as raison.|You're right, I should apologise.
I don't think that's true.|Je ne pense pas que ce soit vrai.|English is impossible to learn? I don't think that's true.
That's a good point.|C'est un bon argument.|That's a good point, I hadn't thought of that.
Yes and no.|Oui et non.|Is it hard? — Yes and no.
6
I'm thinking of|Je pense à (faire)|I'm thinking of moving to Berlin.
I can't afford it.|Je n'en ai pas les moyens.|A new car? I can't afford it.
It's not worth it.|Ça n'en vaut pas la peine.|Don't take a taxi, it's not worth it.
I've run out of|Je n'ai plus de|I've run out of coffee.
I'm in the middle of|Je suis en plein dans|Can I call you back? I'm in the middle of something.
make up my mind|me décider|I can't make up my mind.
It's getting late.|Il se fait tard.|It's getting late. I should go home.
I'm not in the mood.|Je n'ai pas envie (pas d'humeur).|Go out tonight? I'm not in the mood.
I can't be bothered.|J'ai la flemme.|I can't be bothered to cook tonight.
There's no point in|Ça ne sert à rien de|There's no point in waiting, the shop is closed.
Do me a favour.|Rends-moi service.|Could you do me a favour and water my plants?
I owe you one.|Je te dois une fière chandelle.|Thanks for helping me move. I owe you one.
It slipped my mind.|Ça m'est sorti de la tête.|Sorry I didn't call — it slipped my mind.
I'm off.|J'y vais.|Right, I'm off. See you tomorrow!
Make yourself comfortable.|Mets-toi à l'aise.|Come in, make yourself comfortable.
get on well with|bien s'entendre avec|I get on well with my flatmates.
look after|s'occuper de|Can you look after my cat this weekend?
keep an eye on|surveiller|Can you keep an eye on my bag?
7
in advance|à l'avance|Book your tickets in advance.
the other day|l'autre jour|I saw your brother the other day.
all of a sudden|tout à coup|All of a sudden, the lights went out.
any minute now|d'une minute à l'autre|She'll be here any minute now.
for ages|depuis une éternité|I haven't seen him for ages.
at the latest|au plus tard|Send it by Friday at the latest.
in a while|dans un moment|I'll call you in a while.
by the time|le temps que / quand|By the time we arrived, the film had started.
on a regular basis|régulièrement|I exercise on a regular basis.
It's high time|Il est grand temps|It's high time we left.
up to now|jusqu'à présent|Up to now, everything is fine.
nowadays|de nos jours|Nowadays, everybody has a smartphone.
before long|bientôt|Before long, you'll speak fluently.
I'm about to|Je suis sur le point de|I'm about to leave. Can I call you later?
8
It's a bit like|C'est un peu comme|It's a bit like a pancake, but thicker.
You know, the thing that|Tu sais, le truc qui|You know, the thing that keeps the door open.
It's what you do when|C'est ce que tu fais quand|It's what you do when you can't sleep.
It's used for|Ça sert à|It's used for cleaning the floor.
Imagine a|Imagine un(e)|Imagine a small car with only three wheels.
9
Firstly,… Secondly,…|Premièrement… Deuxièmement…|Firstly, it's cheap. Secondly, it's close.
Another thing is|Autre chose :|Another thing is the price.
The problem is that|Le problème, c'est que|The problem is that I don't have time.
The good thing is that|Le bon côté, c'est que|The good thing is that it's near the beach.
To cut a long story short,|Pour faire court,|To cut a long story short, we missed the plane.
In addition,|De plus,|In addition, the hotel has a free gym.
However,|Cependant,|It's a nice flat. However, it's very noisy.
Although|Bien que|Although it was raining, we went out.
so that|pour que / afin que|I left early so that I wouldn't be late.
in order to|afin de|I study every day in order to pass the B2.
For instance,|Par exemple,|Some cities, for instance Lisbon, are cheaper.
Finally,|Enfin,|Finally, I'd like to thank everyone.
What happened was|Ce qui s'est passé, c'est que|What happened was, my alarm didn't ring.
10
I'm in charge of|Je suis responsable de|I'm in charge of the website.
I'm on it.|Je m'en occupe.|The bug? I'm on it.
It's not working.|Ça ne marche pas.|I've restarted it, but it's still not working.
Could you have a look at|Tu pourrais jeter un œil à|Could you have a look at my code?
I'll let you know.|Je te tiens au courant.|I'll let you know when it's ready.
It's done.|C'est fait.|The report? It's done.
What's the deadline?|C'est pour quand ?|What's the deadline for this task?
I'm off tomorrow.|Je ne travaille pas demain.|I'm off tomorrow, so call Sara.
work overtime|faire des heures sup|We had to work overtime last week.
take a day off|prendre un jour de congé|I'm taking a day off on Friday.
I'm snowed under.|Je suis débordé(e).|I'm snowed under this week.
Who's responsible for|Qui est responsable de|Who's responsible for the server?
12
Can we reschedule?|On peut reporter ?|I'm ill tomorrow. Can we reschedule?
Let's take a break.|Faisons une pause.|We've been working for two hours. Let's take a break.
What's next?|Et ensuite ?|OK, that's done. What's next?
Let's start with|Commençons par|Let's start with a quick update.
15
Could you wrap it?|Pouvez-vous l'emballer ?|It's a present. Could you wrap it?
It's out of stock.|C'est en rupture de stock.|Sorry, that model is out of stock.
Is it under guarantee?|C'est sous garantie ?|It stopped working. Is it under guarantee?
I'd like to make a complaint.|Je voudrais faire une réclamation.|I'd like to make a complaint about my order.
Could I get a refund?|Je pourrais être remboursé(e) ?|It's broken. Could I get a refund?
Shall we split the bill?|On partage l'addition ?|That was lovely. Shall we split the bill?
It's a rip-off!|C'est du vol !|Ten euros for a coffee? It's a rip-off!
a bargain|une bonne affaire|Only 20 euros? That's a bargain!
I'll pay in cash.|Je paierai en liquide.|I'll pay in cash, if that's OK.
book a table|réserver une table|I'd like to book a table for Friday.
16
Is it worth visiting?|Ça vaut le coup de visiter ?|The castle — is it worth visiting?
I got lost.|Je me suis perdu(e).|I got lost on the way to the hotel.
We're running out of time.|On manque de temps.|Hurry, we're running out of time!
My luggage hasn't arrived.|Mes bagages ne sont pas arrivés.|Excuse me, my luggage hasn't arrived.
I'd like to change my booking.|Je voudrais modifier ma réservation.|I'd like to change my booking to Monday.
Is breakfast included?|Le petit-déjeuner est compris ?|How much is the room? Is breakfast included?
off the beaten track|hors des sentiers battus|We wanted somewhere off the beaten track.
travel light|voyager léger|I always travel light — just a backpack.
jet lag|décalage horaire|I'm still suffering from jet lag.
catch a flight|prendre un vol|I have to catch a flight at six.
17
I'm feeling a bit down.|Je déprime un peu.|I'm feeling a bit down today.
I'm stressed out.|Je suis très stressé(e).|I'm stressed out about the deadline.
It drives me crazy.|Ça me rend fou/folle.|The noise from upstairs drives me crazy.
I'm not myself today.|Je ne suis pas dans mon assiette.|Sorry, I'm not myself today.
I'm over the moon.|Je suis aux anges.|I passed! I'm over the moon.
calm down|se calmer|Calm down, it's not a big problem.
cheer up|remonter le moral|Cheer up! It's Friday.
I'm proud of|Je suis fier/fière de|I'm proud of what I've achieved.
look after yourself|prendre soin de soi|Look after yourself — sleep and do some sport.
get some rest|se reposer|You look tired. Get some rest.
get some fresh air|prendre l'air|Let's go out and get some fresh air.
18
I'll drop you a line.|Je t'écrirai un mot.|I'll drop you a line when I'm back.
Sorry, you're breaking up.|Désolé, ça coupe.|Sorry, you're breaking up. I'll call you back.
Can you share your screen?|Tu peux partager ton écran ?|Can you share your screen so we can see it?
It keeps crashing.|Ça plante tout le temps.|My laptop keeps crashing.
Have you tried restarting it?|Tu as essayé de le redémarrer ?|It's frozen? Have you tried restarting it?
I'll send you the link.|Je t'envoie le lien.|I'll send you the link to the meeting.
I can't log in.|Je n'arrive pas à me connecter.|I can't log in — I forgot my password.
My battery is low.|Ma batterie est faible.|My battery is low, so I'll be quick.
19
Are you up for|Ça te dit de|Are you up for a drink after work?
I'll pass.|Je vais passer mon tour.|Karaoke? I think I'll pass.
Count me in!|Je suis partant(e) !|A trip to the mountains? Count me in!
Let's play it by ear.|On verra sur le moment.|Let's not plan too much. Let's play it by ear.
Something came up.|J'ai eu un empêchement.|Sorry, I can't come — something came up.
Let's grab a coffee.|Allons prendre un café.|Let's grab a coffee one day this week.
It's on me.|C'est moi qui invite.|Put your wallet away, it's on me.
the more, the merrier|plus on est de fous, plus on rit|Bring your friends — the more, the merrier!
`;
