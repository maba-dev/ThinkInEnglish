window.DATA = window.DATA || {};
/* Extra picture words so that every level has about 100 words. Same format: [picture, word, IPA, level, example]. */
(function () {
  const add = (id, name, e, words) => {
    let t = DATA.vocab.find(x => x.id === id);
    if (!t) { t = { id, name, e, words: [] }; DATA.vocab.push(t); }
    t.words.push(...words);
  };
  /* ---------- A1 ---------- */
  add("food", "Food & drink", "🍎", [
    ["🍽️","plate","/pleɪt/","A1","Put the plates on the table."],
    ["🥄","spoon","/spuːn/","A1","I eat soup with a spoon."],
    ["🔪","knife","/naɪf/","A1","Be careful, the knife is sharp."],
    ["🥃","glass","/ɡlɑːs/","A1","Can I have a glass of water?"],
    ["🍌","banana","/bəˈnɑː.nə/","A1","Monkeys love bananas."],
    ["🍊","orange","/ˈɒr.ɪndʒ/","A1","I drink orange juice at breakfast."],
    ["🍅","tomato","/təˈmɑː.təʊ/","A1","Pizza with tomato and cheese."],
    ["🥔","potato","/pəˈteɪ.təʊ/","A1","Chips are made from potatoes."],
    ["🍰","cake","/keɪk/","A1","She made a chocolate cake."],
    ["💧","water","/ˈwɔː.tə/","A1","Drink a lot of water."]
  ]);
  add("family", "Family & people", "👪", [
    ["👶","baby","/ˈbeɪ.bi/","A1","The baby is sleeping."],
    ["👦","boy","/bɔɪ/","A1","The boy is playing football."],
    ["👧","girl","/ɡɜːl/","A1","The girl has long hair."],
    ["👨","man","/mæn/","A1","Who is that man?"],
    ["👩","woman","/ˈwʊm.ən/","A1","The woman at the desk is my boss."],
    ["👴","grandfather","/ˈɡræn.fɑː.ðə/","A1","My grandfather is eighty."],
    ["👵","grandmother","/ˈɡræn.mʌð.ə/","A1","My grandmother makes great soup."],
    ["👪","family","/ˈfæm.əl.i/","A1","I have a big family."],
    ["👫","friends","/frendz/","A1","I go out with my friends on Fridays."]
  ]);
  add("colours", "Colours, numbers & time", "🎨", [
    ["🔴","red","/red/","A1","Stop at the red light."],
    ["🔵","blue","/bluː/","A1","The sky is blue today."],
    ["🟢","green","/ɡriːn/","A1","Green means go."],
    ["🟡","yellow","/ˈjel.əʊ/","A1","Bananas are yellow."],
    ["⚫","black","/blæk/","A1","I always wear black."],
    ["⚪","white","/waɪt/","A1","Snow is white."],
    ["1️⃣","one","/wʌn/","A1","One coffee, please."],
    ["2️⃣","two","/tuː/","A1","I have two cats."],
    ["3️⃣","three","/θriː/","A1","Three tickets, please."],
    ["🔟","ten","/ten/","A1","It's ten o'clock."],
    ["⏰","clock","/klɒk/","A1","The clock on the wall is slow."],
    ["📅","calendar","/ˈkæl.ɪn.də/","A1","Write the date in your calendar."]
  ]);
  /* ---------- A2 ---------- */
  add("shopping", "Shopping & money", "🛍️", [
    ["💳","credit card","/ˈkred.ɪt kɑːd/","A2","Can I pay by credit card?"],
    ["🧾","receipt","/rɪˈsiːt/","A2","Keep the receipt in case you want to return it."],
    ["💶","cash","/kæʃ/","A2","I never carry cash."],
    ["🏷️","price","/praɪs/","A2","The price is on the label."],
    ["🛍️","shopping bag","/ˈʃɒp.ɪŋ bæɡ/","A2","Bring your own shopping bag."],
    ["🪙","coin","/kɔɪn/","A2","I need a coin for the trolley."],
    ["👛","purse","/pɜːs/","A2","She lost her purse on the bus."],
    ["🏧","cash machine","/ˈkæʃ məˌʃiːn/","A2","Is there a cash machine near here?"]
  ]);
  add("hobbies", "Free time & hobbies", "🎸", [
    ["⚽","football","/ˈfʊt.bɔːl/","A2","We play football every Sunday."],
    ["🎸","guitar","/ɡɪˈtɑː/","A2","He's learning to play the guitar."],
    ["🎨","painting","/ˈpeɪn.tɪŋ/","A2","Painting helps me relax."],
    ["📚","reading","/ˈriː.dɪŋ/","A2","Reading in English improves your vocabulary."],
    ["🎮","video games","/ˈvɪd.i.əʊ ɡeɪmz/","A2","I play video games at the weekend."],
    ["🎬","cinema","/ˈsɪn.ə.mə/","A2","Let's go to the cinema tonight."],
    ["🎤","concert","/ˈkɒn.sət/","A2","The concert was amazing."],
    ["🏕️","camping","/ˈkæm.pɪŋ/","A2","We went camping in the mountains."],
    ["🧘","yoga","/ˈjəʊ.ɡə/","A2","I do yoga before work."],
    ["🎣","fishing","/ˈfɪʃ.ɪŋ/","A2","My dad goes fishing at the lake."],
    ["🎲","board game","/ˈbɔːd ɡeɪm/","A2","We played a board game all evening."],
    ["📷","camera","/ˈkæm.rə/","A2","I took my camera on holiday."]
  ]);
  add("home", "At home", "🏠", [
    ["🛁","bath","/bɑːθ/","A2","I prefer a hot bath to a shower."],
    ["🧴","shampoo","/ʃæmˈpuː/","A2","We've run out of shampoo."],
    ["🪥","toothbrush","/ˈtuːθ.brʌʃ/","A2","Don't forget your toothbrush."],
    ["🛗","lift","/lɪft/","A2","The lift is broken, take the stairs."],
    ["🪴","plant","/plɑːnt/","A2","Water the plants twice a week."],
    ["🖼️","picture","/ˈpɪk.tʃə/","A2","There's a picture of the sea on the wall."]
  ]);
  add("food", "Food & drink", "🍎", [
    ["🥗","salad","/ˈsæl.əd/","A2","I'll have a salad for lunch."],
    ["🍝","pasta","/ˈpæs.tə/","A2","Pasta is quick and easy to cook."],
    ["🥩","meat","/miːt/","A2","She doesn't eat meat."],
    ["🧈","butter","/ˈbʌt.ə/","A2","Toast with butter and jam."],
    ["🍓","strawberry","/ˈstrɔː.bər.i/","A2","Strawberries are best in summer."],
    ["🍋","lemon","/ˈlem.ən/","A2","Tea with lemon, please."],
    ["🥜","peanuts","/ˈpiː.nʌts/","A2","Some people are allergic to peanuts."],
    ["🍫","chocolate","/ˈtʃɒk.lət/","A2","Dark chocolate is my weakness."]
  ]);
  add("body", "The body", "🧍", [
    ["💊","pill","/pɪl/","A2","Take one pill after each meal."],
    ["🩹","plaster","/ˈplɑː.stə/","A2","Put a plaster on that cut."],
    ["🌡️","temperature","/ˈtem.prə.tʃə/","A2","You have a high temperature."],
    ["🤧","sneeze","/sniːz/","A2","Cats make me sneeze."],
    ["🤒","fever","/ˈfiː.və/","A2","He stayed in bed with a fever."],
    ["🩺","check-up","/ˈtʃek.ʌp/","A2","I go for a check-up every year."],
    ["🚑","ambulance","/ˈæm.bjə.ləns/","A2","Call an ambulance!"]
  ]);
  add("travel", "Transport & travel", "✈️", [
    ["🏨","hotel","/həʊˈtel/","A2","Our hotel is near the beach."],
    ["🏖️","beach","/biːtʃ/","A2","We spent the day at the beach."],
    ["⛺","tent","/tent/","A2","We put up the tent before dark."],
    ["🧭","compass","/ˈkʌm.pəs/","A2","Use a compass to find north."],
    ["🚤","boat","/bəʊt/","A2","We took a boat to the island."],
    ["🛣️","motorway","/ˈməʊ.tə.weɪ/","A2","The motorway was full of traffic."]
  ]);
  add("nature", "Nature & weather", "🌳", [
    ["🌙","moon","/muːn/","A2","The moon is full tonight."],
    ["⭐","star","/stɑː/","A2","You can see the stars in the countryside."],
    ["🌸","flower","/ˈflaʊ.ə/","A2","He brought her flowers."],
    ["🍂","autumn","/ˈɔː.təm/","A2","The leaves fall in autumn."]
  ]);
  /* ---------- B1 ---------- */
  add("work", "Work & jobs", "💼", [
    ["📊","report","/rɪˈpɔːt/","B1","I have to finish the report by Friday."],
    ["📈","profit","/ˈprɒf.ɪt/","B1","The company made a profit this year."],
    ["🗂️","file","/faɪl/","B1","Save the file before you close it."],
    ["📎","attachment","/əˈtætʃ.mənt/","B1","I forgot the attachment in my email."],
    ["🧑‍💼","manager","/ˈmæn.ɪ.dʒə/","B1","My manager gave me good feedback."],
    ["👥","colleague","/ˈkɒl.iːɡ/","B1","My colleagues are very friendly."],
    ["🏢","headquarters","/ˌhedˈkwɔː.təz/","B1","The headquarters are in Amsterdam."],
    ["📝","contract","/ˈkɒn.trækt/","B1","Read the contract before you sign it."],
    ["🕘","shift","/ʃɪft/","B1","She works the night shift."],
    ["🙋","customer","/ˈkʌs.tə.mə/","B1","The customer is always right."]
  ]);
  add("tech", "Tech & code", "💻", [
    ["🔄","update","/ˈʌp.deɪt/","B1","Install the update tonight."],
    ["💽","hard drive","/ˈhɑːd draɪv/","B1","My hard drive is almost full."],
    ["🌐","website","/ˈweb.saɪt/","B1","Check our website for more information."],
    ["📲","app","/æp/","B1","There's an app for everything."],
    ["🔍","search engine","/ˈsɜːtʃ ˌen.dʒɪn/","B1","Type the question into a search engine."],
    ["📧","inbox","/ˈɪn.bɒks/","B1","My inbox is full of spam."],
    ["🧑‍💻","user","/ˈjuː.zə/","B1","The app has a million users."],
    ["🔗","link","/lɪŋk/","B1","Click the link to join the meeting."],
    ["⬇️","download","/ˌdaʊnˈləʊd/","B1","Download the file and open it."],
    ["📸","screenshot","/ˈskriːn.ʃɒt/","B1","Send me a screenshot of the error."]
  ]);
  add("nature", "Nature & weather", "🌳", [
    ["♻️","recycling","/ˌriːˈsaɪ.klɪŋ/","B1","Put the bottles in the recycling."],
    ["🌡️","global warming","/ˌɡləʊ.bəl ˈwɔː.mɪŋ/","B1","Global warming is melting the ice."],
    ["🏭","pollution","/pəˈluː.ʃən/","B1","Air pollution is a problem in big cities."],
    ["🌲","forest","/ˈfɒr.ɪst/","B1","We got lost in the forest."],
    ["🌊","flood","/flʌd/","B1","The flood destroyed several houses."],
    ["🔥","wildfire","/ˈwaɪld.faɪə/","B1","Wildfires are more common in hot summers."],
    ["☀️","solar panel","/ˌsəʊ.lə ˈpæn.əl/","B1","We put solar panels on the roof."],
    ["🌾","field","/fiːld/","B1","Cows were eating in the field."],
    ["🏝️","island","/ˈaɪ.lənd/","B1","They live on a small island."],
    ["🌍","environment","/ɪnˈvaɪ.rən.mənt/","B1","We must protect the environment."]
  ]);
  add("body", "The body", "🧍", [
    ["🤕","injury","/ˈɪn.dʒər.i/","B1","He can't play because of an injury."],
    ["💉","injection","/ɪnˈdʒek.ʃən/","B1","The nurse gave me an injection."],
    ["🧪","blood test","/ˈblʌd test/","B1","The doctor asked for a blood test."],
    ["🦠","virus","/ˈvaɪə.rəs/","B1","The virus spread quickly."],
    ["😷","symptom","/ˈsɪmp.təm/","B1","What are your symptoms?"],
    ["🏋️","fitness","/ˈfɪt.nəs/","B1","Swimming is great for your fitness."],
    ["🥦","diet","/ˈdaɪ.ət/","B1","A healthy diet includes vegetables."],
    ["🧠","stress","/stres/","B1","Exercise reduces stress."]
  ]);
  add("feelings", "Feelings & character", "😊", [
    ["😇","honest","/ˈɒn.ɪst/","B1","Be honest — do you like it?"],
    ["🤝","reliable","/rɪˈlaɪ.ə.bəl/","B1","She's very reliable; she's never late."],
    ["😄","cheerful","/ˈtʃɪə.fəl/","B1","He's always cheerful in the morning."],
    ["🤓","hard-working","/ˌhɑːdˈwɜː.kɪŋ/","B1","Our new intern is very hard-working."],
    ["😒","jealous","/ˈdʒel.əs/","B1","He was jealous of his brother's success."],
    ["🤗","generous","/ˈdʒen.ər.əs/","B1","It was generous of you to pay."],
    ["😎","confident","/ˈkɒn.fɪ.dənt/","B1","Practice makes you more confident."],
    ["😶","shy","/ʃaɪ/","B1","She's shy with people she doesn't know."],
    ["😡","rude","/ruːd/","B1","It's rude to interrupt people."],
    ["🙂","patient","/ˈpeɪ.ʃənt/","B1","Be patient, the results will come."]
  ]);
  add("city", "In the city", "🏙️", [
    ["🏛️","town hall","/ˌtaʊn ˈhɔːl/","B1","You can get the form at the town hall."],
    ["🏤","post office","/ˈpəʊst ˌɒf.ɪs/","B1","I need to send a parcel from the post office."],
    ["🚓","police station","/pəˈliːs ˌsteɪ.ʃən/","B1","Report the theft at the police station."],
    ["🏪","corner shop","/ˈkɔː.nə ʃɒp/","B1","The corner shop is open until midnight."],
    ["🚇","rush hour","/ˈrʌʃ aʊə/","B1","Avoid the underground at rush hour."],
    ["🏘️","neighbourhood","/ˈneɪ.bə.hʊd/","B1","It's a quiet neighbourhood."],
    ["🚸","pedestrian","/pəˈdes.tri.ən/","B1","This street is for pedestrians only."],
    ["🚮","bin","/bɪn/","B1","Throw it in the bin."]
  ]);
  add("media", "Media & news", "📰", [
    ["📰","newspaper","/ˈnjuːz.peɪ.pə/","B1","I read the newspaper online."],
    ["📺","channel","/ˈtʃæn.əl/","B1","Which channel is the match on?"],
    ["🎙️","podcast","/ˈpɒd.kɑːst/","B1","I listen to podcasts on the train."],
    ["📣","advertisement","/ədˈvɜː.tɪs.mənt/","B1","There are too many advertisements on TV."],
    ["🗞️","headline","/ˈhed.laɪn/","B1","The story made the headlines."],
    ["🎞️","series","/ˈsɪə.riːz/","B1","I watched the whole series in a week."],
    ["🎧","headphones","/ˈhed.fəʊnz/","B1","Use headphones on the train, please."],
    ["⭐","review","/rɪˈvjuː/","B1","The film got great reviews."]
  ]);
  add("travel", "Transport & travel", "✈️", [
    ["🛂","customs","/ˈkʌs.təmz/","B1","We waited an hour at customs."],
    ["🧳","luggage","/ˈlʌɡ.ɪdʒ/","B1","My luggage was lost in Dubai."],
    ["🗺️","sightseeing","/ˈsaɪtˌsiː.ɪŋ/","B1","We spent the day sightseeing."],
    ["🛏️","accommodation","/əˌkɒm.əˈdeɪ.ʃən/","B1","Accommodation is expensive in London."],
    ["💁","flight attendant","/ˈflaɪt əˌten.dənt/","B1","The flight attendant brought us water."],
    ["🚗","car hire","/ˈkɑː haɪə/","B1","Car hire is cheaper if you book early."],
    ["🚧","roadworks","/ˈrəʊd.wɜːks/","B1","There are roadworks on the bridge."]
  ]);
  /* ---------- B2 ---------- */
  add("work", "Work & jobs", "💼", [
    ["📋","job description","/ˌdʒɒb dɪˈskrɪp.ʃən/","B2","Read the job description carefully."],
    ["💸","pay rise","/ˈpeɪ raɪz/","B2","I asked for a pay rise."],
    ["🪜","career ladder","/kəˈrɪə ˌlæd.ə/","B2","She climbed the career ladder quickly."],
    ["🧑‍🏫","mentor","/ˈmen.tɔː/","B2","My mentor helped me prepare for interviews."],
    ["👔","stakeholder","/ˈsteɪkˌhəʊl.də/","B2","We need to inform all stakeholders."],
    ["📉","redundancy","/rɪˈdʌn.dən.si/","B2","Fifty people were made redundant — a wave of redundancies."],
    ["🏡","remote work","/rɪˌməʊt ˈwɜːk/","B2","Remote work saves hours of commuting."],
    ["🧾","invoice","/ˈɪn.vɔɪs/","B2","Send the invoice to the finance team."],
    ["🤝","negotiation","/nɪˌɡəʊ.ʃiˈeɪ.ʃən/","B2","The negotiation lasted three days."],
    ["⏳","deadline","/ˈded.laɪn/","B2","We missed the deadline by a day."],
    ["🧰","skill set","/ˈskɪl set/","B2","Your skill set matches the role."],
    ["🎯","target","/ˈtɑː.ɡɪt/","B2","We hit our sales target."]
  ]);
  add("society", "Society & politics", "🏛️", [
    ["🗳️","election","/ɪˈlek.ʃən/","B2","The election is next spring."],
    ["🏛️","government","/ˈɡʌv.ən.mənt/","B2","The government announced new measures."],
    ["⚖️","law","/lɔː/","B2","It's against the law to drive without a licence."],
    ["🧑‍⚖️","judge","/dʒʌdʒ/","B2","The judge sentenced him to two years."],
    ["🚔","crime","/kraɪm/","B2","Crime has fallen in the city centre."],
    ["🏚️","poverty","/ˈpɒv.ə.ti/","B2","Millions of children live in poverty."],
    ["💰","tax","/tæks/","B2","Income tax is high here."],
    ["🧓","pension","/ˈpen.ʃən/","B2","She lives on a small pension."],
    ["✊","protest","/ˈprəʊ.test/","B2","Thousands joined the protest."],
    ["🏳️","refugee","/ˌref.juˈdʒiː/","B2","The country welcomed many refugees."],
    ["🏥","healthcare","/ˈhelθ.keə/","B2","Healthcare is free in many countries."],
    ["📊","unemployment","/ˌʌn.ɪmˈplɔɪ.mənt/","B2","Youth unemployment is rising."],
    ["🧑‍🤝‍🧑","community","/kəˈmjuː.nə.ti/","B2","The open-source community is very active."],
    ["🌐","globalisation","/ˌɡləʊ.bəl.aɪˈzeɪ.ʃən/","B2","Globalisation has changed the job market."]
  ]);
  add("science", "Science & technology", "🔬", [
    ["🧬","research","/rɪˈsɜːtʃ/","B2","Research shows that sleep improves memory."],
    ["🔬","microscope","/ˈmaɪ.krə.skəʊp/","B2","Look at the cells under the microscope."],
    ["🤖","artificial intelligence","/ˌɑː.tɪ.fɪʃ.əl ɪnˈtel.ɪ.dʒəns/","B2","Artificial intelligence is changing many jobs."],
    ["🛰️","satellite","/ˈsæt.əl.aɪt/","B2","GPS works with satellites."],
    ["🧪","experiment","/ɪkˈsper.ɪ.mənt/","B2","The experiment failed, so we tried again."],
    ["🔐","encryption","/ɪnˈkrɪp.ʃən/","B2","Encryption protects your messages."],
    ["📡","bandwidth","/ˈbænd.wɪtθ/","B2","Video calls need a lot of bandwidth."],
    ["🗃️","database","/ˈdeɪ.tə.beɪs/","B2","The user data is stored in a database."],
    ["🦾","automation","/ˌɔː.təˈmeɪ.ʃən/","B2","Automation saves the team hours every week."],
    ["💥","breakthrough","/ˈbreɪk.θruː/","B2","It was a major breakthrough in medicine."],
    ["📊","data","/ˈdeɪ.tə/","B2","The data doesn't support that idea."],
    ["🧑‍🔬","scientist","/ˈsaɪən.tɪst/","B2","Scientists warned about the risks."]
  ]);
  add("money", "Money & economy", "💹", [
    ["🏦","loan","/ləʊn/","B2","I took out a loan to buy a car."],
    ["📈","investment","/ɪnˈvest.mənt/","B2","Learning English is a good investment."],
    ["💹","stock market","/ˈstɒk ˌmɑː.kɪt/","B2","The stock market fell sharply."],
    ["📉","recession","/rɪˈseʃ.ən/","B2","Many companies closed during the recession."],
    ["🎈","inflation","/ɪnˈfleɪ.ʃən/","B2","Inflation makes everything more expensive."],
    ["💳","debt","/det/","B2","He's trying to pay off his debt."],
    ["🐖","savings","/ˈseɪ.vɪŋz/","B2","I used my savings to travel."],
    ["🏠","mortgage","/ˈmɔː.ɡɪdʒ/","B2","They took out a mortgage on the house."],
    ["🧮","budget","/ˈbʌdʒ.ɪt/","B2","We're over budget this month."],
    ["🤑","wealth","/welθ/","B2","Wealth doesn't guarantee happiness."]
  ]);
  add("feelings", "Feelings & character", "😊", [
    ["😤","stubborn","/ˈstʌb.ən/","B2","He's too stubborn to admit he's wrong."],
    ["🤔","thoughtful","/ˈθɔːt.fəl/","B2","What a thoughtful present!"],
    ["🙄","arrogant","/ˈær.ə.ɡənt/","B2","He sounded arrogant in the interview."],
    ["😰","anxious","/ˈæŋk.ʃəs/","B2","I get anxious before exams."],
    ["😌","content","/kənˈtent/","B2","She's content with a simple life."],
    ["😞","disappointed","/ˌdɪs.əˈpɔɪn.tɪd/","B2","I was disappointed with the result."],
    ["🥹","grateful","/ˈɡreɪt.fəl/","B2","I'm grateful for your help."],
    ["😠","resentful","/rɪˈzent.fəl/","B2","He felt resentful about being ignored."],
    ["🤨","sceptical","/ˈskep.tɪ.kəl/","B2","I'm sceptical about these promises."],
    ["🫠","overwhelmed","/ˌəʊ.vəˈwelmd/","B2","I felt overwhelmed in my first week."]
  ]);
  add("nature", "Nature & weather", "🌳", [
    ["🌱","sustainability","/səˌsteɪ.nəˈbɪl.ə.ti/","B2","Sustainability is now a priority for companies."],
    ["🐻‍❄️","endangered species","/ɪnˌdeɪn.dʒəd ˈspiː.ʃiːz/","B2","The polar bear is an endangered species."],
    ["🏜️","drought","/draʊt/","B2","The drought destroyed the crops."],
    ["🌫️","smog","/smɒɡ/","B2","The city disappeared under the smog."],
    ["🪓","deforestation","/diːˌfɒr.ɪˈsteɪ.ʃən/","B2","Deforestation threatens the Amazon."],
    ["💨","emissions","/iˈmɪʃ.ənz/","B2","We must cut carbon emissions."],
    ["🔋","renewable energy","/rɪˌnjuː.ə.bəl ˈen.ə.dʒi/","B2","Wind and solar are renewable energy."],
    ["🐝","biodiversity","/ˌbaɪ.əʊ.daɪˈvɜː.sə.ti/","B2","Pesticides reduce biodiversity."]
  ]);
  add("education", "Education & learning", "🎓", [
    ["🎓","degree","/dɪˈɡriː/","B2","She has a degree in mathematics."],
    ["🏫","tuition fees","/tjuˈɪʃ.ən fiːz/","B2","Tuition fees are very high in the UK."],
    ["📚","scholarship","/ˈskɒl.ə.ʃɪp/","B2","He got a scholarship to study abroad."],
    ["📝","assignment","/əˈsaɪn.mənt/","B2","The assignment is due on Monday."],
    ["🧑‍🎓","graduate","/ˈɡrædʒ.u.ət/","B2","Graduates often struggle to find a first job."],
    ["🗣️","lecture","/ˈlek.tʃə/","B2","The lecture was recorded online."],
    ["✅","assessment","/əˈses.mənt/","B2","The final assessment is a project."],
    ["🔁","peer review","/ˈpɪə rɪˌvjuː/","B2","At 42, peer review replaces teachers."],
    ["📜","certificate","/səˈtɪf.ɪ.kət/","B2","You get a certificate at the end."],
    ["🧠","critical thinking","/ˌkrɪt.ɪ.kəl ˈθɪŋ.kɪŋ/","B2","Critical thinking is a key skill."]
  ]);
  add("media", "Media & news", "📰", [
    ["🕵️","fake news","/ˌfeɪk ˈnjuːz/","B2","Check the source to avoid fake news."],
    ["📱","influencer","/ˈɪn.flu.ən.sə/","B2","Influencers earn money from adverts."],
    ["🗞️","journalist","/ˈdʒɜː.nə.lɪst/","B2","The journalist interviewed the minister."],
    ["🔥","viral","/ˈvaɪə.rəl/","B2","The video went viral overnight."],
    ["🧮","algorithm","/ˈæl.ɡə.rɪ.ðəm/","B2","The algorithm decides what you see."],
    ["🔒","privacy","/ˈprɪv.ə.si/","B2","Social networks don't respect your privacy."]
  ]);
  add("body", "The body", "🧍", [
    ["🧘","well-being","/ˌwelˈbiː.ɪŋ/","B2","Exercise is good for your well-being."],
    ["💤","insomnia","/ɪnˈsɒm.ni.ə/","B2","Stress can cause insomnia."],
    ["🩻","X-ray","/ˈeks.reɪ/","B2","The X-ray showed a broken bone."],
    ["🦴","fracture","/ˈfræk.tʃə/","B2","She has a fracture in her wrist."],
    ["💊","prescription","/prɪˈskrɪp.ʃən/","B2","You need a prescription for this medicine."],
    ["🏃","recovery","/rɪˈkʌv.ər.i/","B2","He made a full recovery."]
  ]);
  /* ---------- C1 ---------- */
  add("abstract", "Ideas & abstract (B2–C1)", "🧭", [
    ["🧭","integrity","/ɪnˈteɡ.rə.ti/","C1","She's a person of great integrity."],
    ["🎭","ambiguity","/ˌæm.bɪˈɡjuː.ə.ti/","C1","The contract leaves no room for ambiguity."],
    ["🔁","paradox","/ˈpær.ə.dɒks/","C1","It's a paradox: more choice can make us less happy."],
    ["⛓️","constraint","/kənˈstreɪnt/","C1","We work under tight budget constraints."],
    ["🌀","complexity","/kəmˈplek.sə.ti/","C1","Don't underestimate the complexity of the task."],
    ["🪞","perception","/pəˈsep.ʃən/","C1","Public perception of AI is changing."],
    ["🎨","nuance","/ˈnjuː.ɑːns/","C1","Translation often loses the nuance."],
    ["🔭","scope","/skəʊp/","C1","That's beyond the scope of this project."],
    ["🔮","foresight","/ˈfɔː.saɪt/","C1","She had the foresight to save money."],
    ["🌿","resilience","/rɪˈzɪl.i.əns/","C1","Moving abroad builds resilience."],
    ["🥕","incentive","/ɪnˈsen.tɪv/","C1","Bonuses are an incentive to work harder."],
    ["🌗","dichotomy","/daɪˈkɒt.ə.mi/","C1","The dichotomy between work and life is fading."],
    ["🧱","premise","/ˈprem.ɪs/","C1","The argument rests on a false premise."],
    ["🗺️","paradigm","/ˈpær.ə.daɪm/","C1","Remote work is a new paradigm."],
    ["🌊","momentum","/məˈmen.təm/","C1","The project is gaining momentum."]
  ]);
  add("society", "Society & politics", "🏛️", [
    ["📜","legislation","/ˌledʒ.ɪˈsleɪ.ʃən/","C1","New legislation protects online privacy."],
    ["🧾","accountability","/əˌkaʊn.təˈbɪl.ə.ti/","C1","There must be accountability for these decisions."],
    ["📑","policy","/ˈpɒl.ə.si/","C1","The company changed its remote work policy."],
    ["🗳️","referendum","/ˌref.əˈren.dəm/","C1","The question was decided by referendum."],
    ["🕊️","diplomacy","/dɪˈpləʊ.mə.si/","C1","The crisis was solved through diplomacy."],
    ["📢","propaganda","/ˌprɒp.əˈɡæn.də/","C1","The posters were pure propaganda."],
    ["⚔️","conflict","/ˈkɒn.flɪkt/","C1","The conflict has lasted for decades."],
    ["⚖️","inequality","/ˌɪn.ɪˈkwɒl.ə.ti/","C1","Income inequality keeps growing."],
    ["🏙️","gentrification","/ˌdʒen.trɪ.fɪˈkeɪ.ʃən/","C1","Gentrification pushed local families out."],
    ["🌱","grassroots","/ˌɡrɑːsˈruːts/","C1","It started as a grassroots movement."],
    ["🛡️","civil rights","/ˌsɪv.əl ˈraɪts/","C1","She fought for civil rights all her life."],
    ["👁️","surveillance","/səˈveɪ.ləns/","C1","Mass surveillance raises ethical questions."],
    ["🗄️","bureaucracy","/bjʊəˈrɒk.rə.si/","C1","Getting a visa means a lot of bureaucracy."],
    ["🌍","sovereignty","/ˈsɒv.rɪn.ti/","C1","The treaty respects national sovereignty."]
  ]);
  add("work", "Work & jobs", "💼", [
    ["📏","benchmark","/ˈbentʃ.mɑːk/","C1","This model is now the industry benchmark."],
    ["🛤️","roadmap","/ˈrəʊd.mæp/","C1","Let's agree on a roadmap for next year."],
    ["🤝","merger","/ˈmɜː.dʒə/","C1","The merger created the largest bank in Europe."],
    ["🚀","entrepreneur","/ˌɒn.trə.prəˈnɜː/","C1","Many entrepreneurs fail before they succeed."],
    ["🪙","revenue","/ˈrev.ən.juː/","C1","Revenue doubled in two years."],
    ["📦","supply chain","/səˈplaɪ tʃeɪn/","C1","The pandemic disrupted global supply chains."],
    ["🏗️","scalability","/ˌskeɪ.ləˈbɪl.ə.ti/","C1","Scalability was not considered at the start."],
    ["🎓","expertise","/ˌek.spɜːˈtiːz/","C1","We need your expertise in security."],
    ["🔁","iteration","/ˌɪt.əˈreɪ.ʃən/","C1","Each iteration improves the product."],
    ["⚙️","leverage","/ˈliː.vər.ɪdʒ/","C1","Our data gives us leverage in negotiations."],
    ["📉","downturn","/ˈdaʊn.tɜːn/","C1","Tech hiring slowed during the downturn."],
    ["🧩","synergy","/ˈsɪn.ə.dʒi/","C1","There's real synergy between the two teams."]
  ]);
  add("tech", "Tech & code", "💻", [
    ["🧠","machine learning","/məˌʃiːn ˈlɜː.nɪŋ/","C1","Machine learning models need clean data."],
    ["🔓","vulnerability","/ˌvʌl.nər.əˈbɪl.ə.ti/","C1","The audit found a critical vulnerability."],
    ["🕸️","infrastructure","/ˈɪn.frəˌstrʌk.tʃə/","C1","We moved our infrastructure to the cloud."],
    ["🪪","authentication","/ɔːˌθen.tɪˈkeɪ.ʃən/","C1","Enable two-factor authentication."],
    ["⚡","latency","/ˈleɪ.tən.si/","C1","Low latency matters for online games."],
    ["🧮","computation","/ˌkɒm.pjuˈteɪ.ʃən/","C1","The computation takes several hours."],
    ["🎛️","interface","/ˈɪn.tə.feɪs/","C1","The interface is clean and intuitive."],
    ["🗜️","compression","/kəmˈpreʃ.ən/","C1","Compression reduces the file size."],
    ["🪲","debugging","/ˌdiːˈbʌɡ.ɪŋ/","C1","I spent the whole day debugging."],
    ["🛠️","maintenance","/ˈmeɪn.tən.əns/","C1","The site is down for maintenance."]
  ]);
  add("feelings", "Feelings & character", "😊", [
    ["🤐","discreet","/dɪˈskriːt/","C1","Don't worry, she's very discreet."],
    ["😏","smug","/smʌɡ/","C1","He looked smug after winning the argument."],
    ["🧐","meticulous","/məˈtɪk.jə.ləs/","C1","She's meticulous about testing her code."],
    ["🗣️","assertive","/əˈsɜː.tɪv/","C1","Be assertive when you negotiate."],
    ["🫂","empathetic","/ˌem.pəˈθet.ɪk/","C1","A good mentor is empathetic."],
    ["🙄","condescending","/ˌkɒn.dɪˈsen.dɪŋ/","C1","His condescending tone annoyed everyone."],
    ["😑","apathetic","/ˌæp.əˈθet.ɪk/","C1","Voters have become apathetic."],
    ["🦁","bold","/bəʊld/","C1","It was a bold decision to quit."],
    ["😬","awkward","/ˈɔː.kwəd/","C1","There was an awkward silence."],
    ["🧘","composed","/kəmˈpəʊzd/","C1","She stayed composed under pressure."],
    ["🤥","deceitful","/dɪˈsiːt.fəl/","C1","The advert was deceitful."],
    ["🫡","diligent","/ˈdɪl.ɪ.dʒənt/","C1","He's a diligent and reliable worker."]
  ]);
  add("actions", "Action verbs", "🏃", [
    ["🔍","scrutinise","/ˈskruː.tɪ.naɪz/","C1","The committee will scrutinise the budget."],
    ["🧨","undermine","/ˌʌn.dəˈmaɪn/","C1","Constant criticism undermines confidence."],
    ["🌱","foster","/ˈfɒs.tə/","C1","We want to foster a culture of learning."],
    ["🌾","cultivate","/ˈkʌl.tɪ.veɪt/","C1","Cultivate good habits early."],
    ["⚖️","reconcile","/ˈrek.ən.saɪl/","C1","It's hard to reconcile work and family."],
    ["🗣️","articulate","/ɑːˈtɪk.jə.leɪt/","C1","She articulated her ideas clearly."],
    ["🧭","navigate","/ˈnæv.ɪ.ɡeɪt/","C1","I'm still learning to navigate the system."],
    ["🎯","prioritise","/praɪˈɒr.ɪ.taɪz/","C1","You need to prioritise your tasks."],
    ["🔥","exacerbate","/ɪɡˈzæs.ə.beɪt/","C1","The heat exacerbated the problem."],
    ["🩹","mitigate","/ˈmɪt.ɪ.ɡeɪt/","C1","Backups mitigate the risk of data loss."],
    ["🚧","hinder","/ˈhɪn.də/","C1","Bad documentation hinders progress."],
    ["💡","envisage","/ɪnˈvɪz.ɪdʒ/","C1","I envisage a career in teaching."],
    ["✂️","streamline","/ˈstriːm.laɪn/","C1","We streamlined the hiring process."],
    ["🧲","entail","/ɪnˈteɪl/","C1","What does the job entail?"]
  ]);
  add("nature", "Nature & weather", "🌳", [
    ["👣","carbon footprint","/ˌkɑː.bən ˈfʊt.prɪnt/","C1","Flying increases your carbon footprint."],
    ["🛢️","fossil fuels","/ˈfɒs.əl ˌfjuː.əlz/","C1","We need to move away from fossil fuels."],
    ["🌊","rising sea levels","/ˌraɪ.zɪŋ ˈsiː ˌlev.əlz/","C1","Rising sea levels threaten coastal cities."],
    ["🌿","ecosystem","/ˈiː.kəʊˌsɪs.təm/","C1","Coral reefs are fragile ecosystems."],
    ["🏗️","urban sprawl","/ˌɜː.bən ˈsprɔːl/","C1","Urban sprawl eats up farmland."],
    ["🔄","circular economy","/ˌsɜː.kjə.lər iˈkɒn.ə.mi/","C1","A circular economy reuses materials."]
  ]);
  add("media", "Media & news", "📰", [
    ["🗯️","rhetoric","/ˈret.ər.ɪk/","C1","His speech was full of empty rhetoric."],
    ["🎙️","discourse","/ˈdɪs.kɔːs/","C1","Public discourse has become more polarised."],
    ["🧷","bias","/ˈbaɪ.əs/","C1","Every newspaper has some bias."],
    ["🔎","fact-checking","/ˈfækt ˌtʃek.ɪŋ/","C1","Fact-checking takes time but it's essential."],
    ["🫧","echo chamber","/ˈek.əʊ ˌtʃeɪm.bə/","C1","Social media can trap us in an echo chamber."],
    ["🎣","clickbait","/ˈklɪk.beɪt/","C1","That headline is pure clickbait."],
    ["🎭","satire","/ˈsæt.aɪə/","C1","The show uses satire to criticise politicians."],
    ["🖋️","editorial","/ˌed.ɪˈtɔː.ri.əl/","C1","The editorial criticised the new law."]
  ]);
  add("body", "The body", "🧍", [
    ["🧠","cognitive","/ˈkɒɡ.nə.tɪv/","C1","Learning a language improves cognitive skills."],
    ["⏳","chronic","/ˈkrɒn.ɪk/","C1","She suffers from chronic back pain."],
    ["🩺","diagnosis","/ˌdaɪ.əɡˈnəʊ.sɪs/","C1","An early diagnosis saved his life."],
    ["💊","side effect","/ˈsaɪd ɪˌfekt/","C1","Tiredness is a common side effect."],
    ["🦠","outbreak","/ˈaʊt.breɪk/","C1","There was an outbreak of flu at the school."],
    ["🍬","placebo","/pləˈsiː.bəʊ/","C1","Half the patients received a placebo."]
  ]);
})();
