// Nederlandse grammatica-taxonomie voor Hollandaca Öğren (Nederlands leren, voor Turkstalige
// gebruikers). Kernversie: ~28 A1-A2-onderwerpen die de meest voorkomende dagelijkse grammatica
// dekken. Latere uitbreiding naar B1+ (passief, voegwoordelijke bijzinnen, condicionalis "zou",
// werkwoordelijke groepen bij modale ketens, etc.) is mogelijk door dit bestand aan te vullen --
// de rest van de app (pickNextItem, suffix/patroon-trainer, Course-tab) leest deze lijst dynamisch
// in en vereist geen structurele wijzigingen om nieuwe onderwerpen te ondersteunen.
//
// Elk item: key (uniek), label (Turks, getoond aan gebruiker), hint (Engelstalige instructie +
// een Nederlands voorbeeld met Turkse glans -- dient als AI-generatie-instructie, vandaar Engels
// voor precisie), minCefr (0=A1 start .. 5=A2 eind, zelfde schaal als MAX_VOCAB_CEFR_IDX-indeling).
// "variants" splitst een onderwerp in duidelijk te onderscheiden subvormen (zelfde reden als in de
// oorspronkelijke Turkse taxonomie: zonder splitsing kiest de AI vrijwel altijd dezelfde,
// makkelijkste subvorm en wordt de rest nooit echt geoefend).
const GRAMMAR_TOPICS = [
  {key:"zijn_hebben", label:"zijn / hebben (düzensiz temel fiiller)", hint:"the two irregular, high-frequency verbs \"zijn\" (to be) and \"hebben\" (to have) in the present tense -- e.g. \"Ik ben moe.\" (I am tired), \"Jij hebt een auto.\" (You have a car)", minCefr:0,
    variants: [
      {id:"zijn", hint:"conjugation of \"zijn\" (to be) -- ben/bent/is/zijn -- e.g. \"Wij zijn thuis.\" (We are home)"},
      {id:"hebben", hint:"conjugation of \"hebben\" (to have) -- heb/hebt/heeft/hebben -- e.g. \"Zij heeft een hond.\" (She has a dog)"},
    ]},
  {key:"tegenwoordige_tijd", label:"Tegenwoordige tijd (şimdiki/geniş zaman)", hint:"present tense of regular verbs: stem for ik, stem+t for jij/hij/zij/het, full infinitive for wij/jullie/zij -- e.g. \"Ik werk.\" / \"Jij werkt.\" / \"Wij werken.\" (I work / you work / we work)", minCefr:0,
    variants: [
      {id:"ik", hint:"1st person singular (bare stem, no -t) -- e.g. \"Ik woon in Rotterdam.\" (I live in Rotterdam)"},
      {id:"jij_hij", hint:"2nd/3rd person singular (stem + -t) -- e.g. \"Hij werkt veel.\" (He works a lot), \"Jij loopt snel.\" (You walk fast)"},
      {id:"meervoud", hint:"plural persons (wij/jullie/zij) -- full infinitive form -- e.g. \"Wij spelen buiten.\" (We play outside)"},
    ]},
  {key:"woordvolgorde_v2", label:"Woordvolgorde: werkwoord op de 2e plaats (V2)", hint:"in a main clause the conjugated verb is ALWAYS the second element, regardless of what comes first -- e.g. \"Vandaag ga ik naar school.\" (Today I go to school -- NOT \"Vandaag ik ga\"), \"Morgen werkt zij niet.\" (Tomorrow she doesn't work)", minCefr:0},
  {key:"ontkenning", label:"Ontkenning: niet vs. geen", hint:"\"niet\" negates verbs/adjectives/known nouns (with \"de/het\"), \"geen\" negates indefinite nouns (replacing \"een\" or a bare plural/uncountable noun) -- e.g. \"Ik heb geen auto.\" (I don't have a car) vs. \"Ik zie de auto niet.\" (I don't see the car)", minCefr:0,
    variants: [
      {id:"niet", hint:"\"niet\" negating a verb, adjective, or a definite/specific noun -- e.g. \"Ik versta het niet.\" (I don't understand it)"},
      {id:"geen", hint:"\"geen\" negating an indefinite noun -- e.g. \"Zij heeft geen tijd.\" (She has no time)"},
    ]},
  {key:"lidwoorden", label:"Lidwoorden: de / het", hint:"the definite article is \"de\" for de-words (most nouns, and all plurals) or \"het\" for het-words (many, but not all, single-syllable/neuter nouns) -- e.g. \"de tafel\" (the table), \"het huis\" (the house) -- there's no fully reliable rule, so this is largely memorization per noun", minCefr:0},
  {key:"meervoud", label:"Meervoud: -en / -s", hint:"plural formation: most nouns take -en, nouns ending in an unstressed -el/-em/-en/-er or a vowel+consonant pattern often take -s instead -- e.g. \"boeken\" (books), \"tafels\" (tables) -- vary which of the two patterns comes up across repeated exercises", minCefr:0,
    variants: [
      {id:"en", hint:"the regular \"-en\" plural -- e.g. \"boek\" -> \"boeken\" (books)"},
      {id:"s", hint:"the \"-s\" plural (after unstressed -el/-em/-en/-er, or many words ending in a vowel) -- e.g. \"tafel\" -> \"tafels\" (tables), \"auto\" -> \"auto's\" (cars, with apostrophe)"},
    ]},
  {key:"verkleinwoord", label:"Verkleinwoord (-je/-tje/-pje/-kje)", hint:"the diminutive suffix, chosen based on the final sound of the word (-je/-tje/-pje/-kje/-etje) -- e.g. \"huisje\" (little house), \"balletje\" (little ball) -- always becomes a \"het\"-word regardless of the original gender", minCefr:1},
  {key:"bnw_verbuiging", label:"Bijvoeglijk naamwoord: buigings-e", hint:"an attributive adjective (directly before a noun) usually gets an extra -e, EXCEPT before a singular \"het\"-word with \"een\"/no article -- e.g. \"een grote hond\" (a big dog, de-word) but \"een groot huis\" (a big house, het-word, no -e)", minCefr:1,
    variants: [
      {id:"met_e", hint:"the adjective DOES take -e: before de-words, before any plural, or before a het-word with \"het/dit/dat\" -- e.g. \"de grote hond\" (the big dog), \"de grote huizen\" (the big houses)"},
      {id:"zonder_e", hint:"the adjective does NOT take -e: only before a singular het-word combined with \"een\" or no article -- e.g. \"een groot huis\" (a big house), \"groot geluk\" (great happiness)"},
    ]},
  {key:"vergelijking", label:"Vergelijking: -er / -st, meer / meest", hint:"comparative with -er (\"groter\" = bigger) and superlative with -st (\"grootst\" = biggest); longer/foreign adjectives use \"meer\"/\"meest\" instead -- e.g. \"mooier\" (more beautiful) vs. \"meer interessant\" (more interesting)", minCefr:2,
    variants: [
      {id:"vergrotend", hint:"comparative -er -- e.g. \"Dit huis is groter dan dat huis.\" (This house is bigger than that house)"},
      {id:"overtreffend", hint:"superlative -st (with \"het\") -- e.g. \"Dit is het grootste huis.\" (This is the biggest house)"},
    ]},
  {key:"scheidbare_werkwoorden", label:"Scheidbare werkwoorden", hint:"a separable verb (e.g. \"opbellen\", \"aankomen\") splits in a main clause: the conjugated part stays in position 2, the particle moves to the end -- e.g. \"Ik bel je morgen op.\" (I'll call you tomorrow) from \"opbellen\" -- stays together as one word only in the infinitive/subordinate clause", minCefr:2,
    variants: [
      {id:"hoofdzin", hint:"main clause: verb splits, particle goes to the end -- e.g. \"Zij staat om zeven uur op.\" (She gets up at seven), from \"opstaan\""},
      {id:"bijzin_infinitief", hint:"subordinate clause OR infinitive construction: the verb stays together as one word -- e.g. \"...omdat zij om zeven uur opstaat.\" (...because she gets up at seven), \"Ik ga morgen opbellen.\" (I'm going to call tomorrow)"},
    ]},
  {key:"modale_werkwoorden", label:"Modale werkwoorden (kunnen/mogen/moeten/willen)", hint:"modal verb + a second (main) verb that goes to the infinitive at the END of the clause -- e.g. \"Ik kan morgen komen.\" (I can come tomorrow), \"Jij moet nu vertrekken.\" (You must leave now)", minCefr:1,
    variants: [
      {id:"kunnen", hint:"\"kunnen\" (can/to be able to) -- e.g. \"Zij kan goed zwemmen.\" (She can swim well)"},
      {id:"moeten", hint:"\"moeten\" (must/to have to) -- e.g. \"Wij moeten werken.\" (We have to work)"},
      {id:"mogen", hint:"\"mogen\" (may/to be allowed to) -- e.g. \"Mag ik binnenkomen?\" (May I come in?)"},
      {id:"willen", hint:"\"willen\" (to want to) -- e.g. \"Ik wil een appel eten.\" (I want to eat an apple)"},
    ]},
  {key:"voltooid_tegenwoordige_tijd", label:"Voltooid tegenwoordige tijd (hebben/zijn + voltooid deelwoord)", hint:"present perfect: \"hebben\" or \"zijn\" (for verbs of motion/change of state) + past participle at the end of the clause -- e.g. \"Ik heb gegeten.\" (I have eaten), \"Zij is gekomen.\" (She has come)", minCefr:2,
    variants: [
      {id:"hebben_regelmatig", hint:"\"hebben\" + a REGULAR past participle (ge-...-d or ge-...-t, chosen by \"'t kofschip\" consonant rule) -- e.g. \"Ik heb gewerkt.\" (I have worked)"},
      {id:"zijn_beweging", hint:"\"zijn\" (for motion/change-of-state verbs) + past participle -- e.g. \"Wij zijn naar huis gegaan.\" (We have gone home)"},
      {id:"onregelmatig", hint:"an IRREGULAR (strong) past participle that doesn't follow the ge-...-d/t pattern -- e.g. \"Ik heb het boek gelezen.\" (I have read the book), from \"lezen\""},
    ]},
  {key:"onvoltooid_verleden_tijd", label:"Onvoltooid verleden tijd (regelmatig/onregelmatig)", hint:"simple past tense: regular verbs add -te(n) or -de(n) (per the same 't kofschip consonant rule as the perfect participle); many common verbs are irregular (strong) with a vowel change -- e.g. \"Ik werkte.\" (I worked, regular) vs. \"Ik ging.\" (I went, irregular, from \"gaan\")", minCefr:2,
    variants: [
      {id:"regelmatig", hint:"regular simple past with -te(n)/-de(n) -- e.g. \"Zij speelde buiten.\" (She played outside)"},
      {id:"onregelmatig", hint:"irregular (strong) simple past with a vowel change, no -te/-de suffix -- e.g. \"Hij kwam laat.\" (He came late), from \"komen\""},
    ]},
  {key:"toekomende_tijd", label:"Toekomende tijd: gaan + infinitief / zullen", hint:"near future with \"gaan\" + infinitive (most common in speech) or \"zullen\" + infinitive (more for promises/predictions) -- e.g. \"Ik ga morgen werken.\" (I'm going to work tomorrow), \"Het zal wel lukken.\" (It'll probably work out)", minCefr:1,
    variants: [
      {id:"gaan", hint:"\"gaan\" + infinitive, the everyday near-future -- e.g. \"Wij gaan naar de markt lopen.\" (We're going to walk to the market)"},
      {id:"zullen", hint:"\"zullen\" + infinitive, for promises/predictions/suggestions -- e.g. \"Ik zal je helpen.\" (I will help you)"},
    ]},
  {key:"vraagzinnen", label:"Vraagzinnen: inversie & vraagwoorden", hint:"yes/no questions invert verb and subject (\"Werk jij?\" = Do you work?); wh-questions put the question word first, then invert -- e.g. \"Waar woon jij?\" (Where do you live?)", minCefr:0,
    variants: [
      {id:"ja_nee", hint:"yes/no question: verb-subject inversion, no question word -- e.g. \"Kom je morgen?\" (Are you coming tomorrow?)"},
      {id:"vraagwoord", hint:"wh-question: question word first, then verb, then subject -- e.g. \"Wat doe jij hier?\" (What are you doing here?)"},
    ]},
  {key:"bijzin_volgorde", label:"Bijzin: werkwoord naar het einde", hint:"in a subordinate clause (after omdat/dat/als/terwijl/hoewel etc.) the conjugated verb moves to the very end of the clause -- e.g. \"...omdat ik moe ben.\" (...because I am tired) -- contrast with the main-clause V2 rule", minCefr:2},
  {key:"persoonlijke_vnw", label:"Persoonlijke voornaamwoorden (onderwerp/lijdend voorwerp)", hint:"subject forms (ik/jij/hij/zij/het/wij/jullie/zij) vs. object forms (mij(me)/jou(je)/hem/haar/het/ons/jullie/hen(ze)) -- e.g. \"Ik zie hem.\" (I see him) -- subject \"ik\", object \"hem\"", minCefr:0,
    variants: [
      {id:"onderwerp", hint:"subject pronoun form -- e.g. \"Zij werkt hier.\" (She works here)"},
      {id:"lijdend_voorwerp", hint:"object pronoun form -- e.g. \"Ik help haar.\" (I help her)"},
    ]},
  {key:"bezittelijke_vnw", label:"Bezittelijke voornaamwoorden (mijn/jouw/zijn/haar/ons/hun)", hint:"possessive pronouns: mijn/jouw(je)/zijn/haar/ons(onze)/jullie/hun -- \"ons\" becomes \"onze\" before a de-word or any plural -- e.g. \"mijn huis\" (my house) vs. \"onze auto\" (our car, de-word)", minCefr:1},
  {key:"wederkerende_ww", label:"Wederkerende werkwoorden (zich)", hint:"reflexive verbs with \"zich\" (adjusted per person: me/je/zich/ons/je/zich) -- e.g. \"Ik was me.\" (I wash myself), \"Zij vergist zich.\" (She is mistaken)", minCefr:2},
  {key:"er_constructie", label:"Gebruik van \"er\"", hint:"the word \"er\" used for existence (\"er is/zijn\"), for referring back to a place, or combined with a preposition (\"erover\", \"ermee\") -- e.g. \"Er is een probleem.\" (There is a problem), \"Ik denk erover na.\" (I'm thinking it over)", minCefr:2,
    variants: [
      {id:"bestaan", hint:"existential \"er is/zijn\" (there is/are) -- e.g. \"Er zijn veel mensen.\" (There are many people)"},
      {id:"voorzetsel", hint:"\"er\" combined with a preposition, replacing \"het\"/\"dat\" as object of that preposition -- e.g. \"Ik hou ervan.\" (I like it, from \"houden van\")"},
    ]},
  {key:"voorzetsels", label:"Vaste voorzetsels", hint:"fixed prepositions -- e.g. \"in\", \"op\", \"aan\", \"van\", \"met\", \"voor\", \"naar\" -- used both for location/direction and in fixed expressions (\"wachten OP\", \"houden VAN\")", minCefr:0},
  {key:"gebiedende_wijs", label:"Gebiedende wijs (imperatief)", hint:"the imperative uses the bare stem of the verb, no subject -- e.g. \"Kom hier!\" (Come here!), \"Wacht even.\" (Wait a moment)", minCefr:1},
  {key:"telwoorden_tijd", label:"Telwoorden & klok kijken", hint:"cardinal/ordinal numbers and telling time -- e.g. \"Het is kwart voor drie.\" (It's a quarter to three), \"de derde mei\" (the third of May)", minCefr:1,
    variants: [
      {id:"hoofdtelwoord", hint:"cardinal numbers in context -- e.g. \"Ik heb drie boeken.\" (I have three books)"},
      {id:"klok", hint:"telling the time -- e.g. \"Het is half negen.\" (It's half past eight -- NOTE: Dutch \"half negen\" means halfway TO nine, i.e. 8:30, not 9:30)"},
    ]},
  {key:"nevenschikking", label:"Nevenschikkende voegwoorden (en/maar/want/of/dus)", hint:"coordinating conjunctions that do NOT change word order (main clause stays V2 on both sides) -- e.g. \"Ik werk, want ik heb geld nodig.\" (I work, because I need money)", minCefr:1},
  {key:"onderschikking", label:"Onderschikkende voegwoorden (omdat/als/terwijl/dat/hoewel)", hint:"subordinating conjunctions that push the verb to the end of their clause (see bijzin_volgorde) -- e.g. \"Ik blijf thuis als het regent.\" (I stay home if it rains)", minCefr:2},
  {key:"aanwijzende_vnw", label:"Aanwijzende voornaamwoorden (deze/die/dit/dat)", hint:"demonstratives: \"deze/die\" for de-words and plurals, \"dit/dat\" for singular het-words -- \"deze/dit\" = near, \"die/dat\" = far -- e.g. \"deze auto\" (this car, de-word) vs. \"dit huis\" (this house, het-word)", minCefr:1},
  {key:"hoeveelheidswoorden", label:"Hoeveelheidswoorden (veel/weinig/wat/geen)", hint:"quantifiers -- e.g. \"veel geld\" (a lot of money), \"weinig tijd\" (little time), \"een beetje\" (a little)", minCefr:1},
  {key:"bijwoorden_tijd_plaats", label:"Bijwoorden van tijd & plaats", hint:"adverbs of time/place and their typical position in the sentence (often right after the verb) -- e.g. \"Ik ga morgen naar Amsterdam.\" (I'm going to Amsterdam tomorrow)", minCefr:1},
];
