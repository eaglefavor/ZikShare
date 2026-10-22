// Faculty of Arts: one deep primer per department.
//
// These packs complement the Theatre & Film Studies archive rather than
// replace the other faculties in the library. They are primers, not archived
// course lists, so they carry no year-demarcated archive block.

const COMMON = {
    domain: "Faculty Primer",
    faculty: "Faculty of Arts",
    level: "100L",
    material_type: "lecture-notes",
    subcategory: "lecture-notes",
    priceKobo: 0, // free
}

export const ARTS_DEPARTMENT_PACKS = [
    {
        ...COMMON,
        slug: "eng-101-nigerian-literature-in-english",
        code: "ENG 101",
        title: "ENG 101: Nigerian Literature in English - Texts, Contexts and Close Reading",
        subtitle: "A reading method for the novels, plays and poems on your first-year list",
        department: "English Language & Literature",
        tags: ["ENG 101", "Nigerian Literature", "African Literature", "Close Reading", "100L"],
        description: "First-year literature is not about memorising plots; it is about making defensible claims from evidence. This pack covers the historical shaping of Nigerian literature in English, the shift from cultural nationalism to critique of the nation, and a close-reading method you can apply to any text on the list.",
        outcomes: [
            "Place a text in the phases of Nigerian literary history.",
            "Distinguish close reading from plot summary.",
            "Analyse narrative voice, imagery and structure.",
            "Build an argument supported by quotation."
        ],
        sections: [
            {
                heading: "A short map of the field",
                intro: "Know the phases well enough to date and situate a text.",
                bullets: [
                    "Cultural nationalism and the generation that wrote back to colonial representation.",
                    "Independence-era optimism and its rapid disillusionment.",
                    "Civil war literature and the literature of trauma.",
                    "Postcolonial critique of the nation-state, elite politics and corruption.",
                    "Diaspora writing and the global circulation of Nigerian fiction.",
                    "Contemporary writing on gender, sexuality, migration and technology."
                ]
            },
            {
                heading: "Close reading, step by step",
                intro: "The method is repeatable and it earns marks.",
                numbered: [
                    "Choose a short passage that clearly matters to the text.",
                    "Note its literal content in one sentence.",
                    "Analyse diction: which words are unexpected and why?",
                    "Analyse imagery and figurative language.",
                    "Analyse syntax and rhythm: short clauses or long accumulations?",
                    "Connect the passage to a pattern in the whole text and to your argument."
                ],
                callout: {
                    title: "Quote precisely",
                    body: "A short quotation, correctly embedded and analysed, beats a long block quotation that is never discussed."
                }
            },
            {
                heading: "Context without overreach",
                intro: "Biography explains less than you think.",
                bullets: [
                    "Use history to explain textual choices, not to replace analysis.",
                    "Avoid reading a character as the author's autobiography.",
                    "Note publication date and reception when they matter.",
                    "Treat oral tradition as form and influence, not as background colour.",
                    "Read the introduction and notes, then form your own reading.",
                    "Cite editions consistently."
                ]
            }
        ],
        practice: [
            { q: "What is the difference between close reading and summary?", a: "Summary reports events; close reading analyses how language makes meaning and supports an argument." },
            { q: "Name two phases of Nigerian literary history.", a: "Cultural nationalism and independence-era disillusionment; civil-war writing and diaspora writing are further phases." },
            { q: "Why is biography an unreliable explanation on its own?", a: "It reduces textual choices to authorial experience and ignores form, audience and literary tradition." },
            { q: "What should you do after quoting a line?", a: "Analyse its diction, imagery or syntax and explain how it supports your claim." },
            { q: "Why does edition matter?", a: "Pagination and textual variants differ between editions, so citations must name the edition used." }
        ],
        checklist: [
            "Build a timeline of four phases with one text each.",
            "Close-read one passage in 300 words.",
            "Annotate quotations in your set text.",
            "Write one argued paragraph with claim, evidence and analysis.",
            "Read one critical essay and summarise its argument.",
            "Check your citations against a single edition.",
            "Exchange essays and test each other's evidence."
        ]
    },
    {
        ...COMMON,
        slug: "igb-101-introduction-to-igbo-language-and-culture",
        code: "IGB 101",
        title: "IGB 101: Introduction to Igbo Language and Culture",
        subtitle: "Tone, orthography and the cultural knowledge behind the words",
        department: "Igbo, African & Asian Studies",
        tags: ["IGB 101", "Igbo", "Tone", "Orthography", "Culture", "100L"],
        description: "Igbo is a tonal language and the orthography is only part of the story. This pack covers the sound system, tone marking, the standard orthography, common grammatical patterns, and the cultural concepts that untranslatable words carry - the ground first-year students most often skip.",
        outcomes: [
            "Mark tone correctly on written Igbo.",
            "Use the standard orthography accurately.",
            "Build simple sentences with correct agreement.",
            "Explain cultural concepts that translation flattens."
        ],
        sections: [
            {
                heading: "Sound, spelling and tone",
                intro: "Tone is meaning, not decoration.",
                bullets: [
                    "Igbo has high, low and downstep tones; the same letters with different tone give different words.",
                    "Vowel harmony constrains which vowels co-occur in a word.",
                    "Digraphs and the dotted vowels must be typed correctly.",
                    "Nasalisation and syllabic nasals change pronunciation.",
                    "Write tone marks from the beginning; retrofitting them later is harder.",
                    "Use a keyboard or IME that supports dotted characters."
                ]
            },
            {
                heading: "Basic sentence patterns",
                intro: "Learn patterns, not isolated vocabulary.",
                bullets: [
                    "Subject-verb-object order with agreement markers.",
                    "Question formation through tone and particles.",
                    "Negation as a marked form, not a simple 'not'.",
                    "Pronoun series differ by grammatical role.",
                    "Verb suffixes carry tense, aspect and emphasis.",
                    "Learn vocabulary inside sentences you can actually say."
                ],
                callout: {
                    title: "Speak from week one",
                    body: "Reading grammar silently builds recognition, not fluency. Say every example aloud and record yourself."
                }
            },
            {
                heading: "Culture inside the language",
                intro: "Some words are not translatable; they are concepts.",
                bullets: [
                    "Kinship terms encode relationships wider than the English equivalents.",
                    "Greeting sequences carry respect and hierarchy.",
                    "Proverbs function as argument and precedent, not ornament.",
                    "Names carry meaning, circumstance and expectation.",
                    "Market, farm and household vocabulary reveals social organisation.",
                    "Ask a fluent speaker before assuming a one-word English equivalent."
                ]
            }
        ],
        practice: [
            { q: "Why is tone marking essential in written Igbo?", a: "Because tone distinguishes words that share the same letters, so omitting it changes or obscures meaning." },
            { q: "What is vowel harmony?", a: "A constraint where vowels within a word belong to compatible sets, affecting which affixes can attach." },
            { q: "Give one reason to learn vocabulary in sentences.", a: "It teaches agreement, tone and usage together, producing usable speech rather than a word list." },
            { q: "How do proverbs function in speech?", a: "As authoritative argument and shared precedent, condensing a position into inherited wisdom." },
            { q: "What should you do when a word seems untranslatable?", a: "Ask a fluent speaker for the concept and its usage rather than forcing a single English equivalent." }
        ],
        checklist: [
            "Learn the vowel and consonant inventory with examples.",
            "Set up an Igbo keyboard with dotted characters.",
            "Write ten tone-marked sentences.",
            "Record yourself reading a short passage aloud.",
            "Learn twenty kinship and greeting terms in context.",
            "Collect five proverbs with their meanings.",
            "Hold a five-minute conversation with a fluent speaker."
        ]
    },
    {
        ...COMMON,
        slug: "his-101-nigerian-history-to-1960",
        code: "HIS 101",
        title: "HIS 101: Nigerian History to 1960 - States, Trade and Conquest",
        subtitle: "Chronology, evidence and the arguments historians actually have",
        department: "History & International Studies",
        tags: ["HIS 101", "Nigerian History", "Colonialism", "Nationalism", "100L"],
        description: "This pack gives you the chronology first-year history demands, then shows the arguments behind it: pre-colonial state formation, the trans-Saharan and Atlantic trades, the mechanics of colonial conquest, indirect rule, and the nationalist movement up to independence.",
        outcomes: [
            "Build a defensible chronology of Nigerian history to 1960.",
            "Compare pre-colonial political systems without ranking them.",
            "Explain how colonial administration reshaped economy and society.",
            "Evaluate competing historical interpretations."
        ],
        sections: [
            {
                heading: "Chronology you must hold",
                intro: "Dates are the skeleton of a history answer.",
                bullets: [
                    "Pre-colonial states: Kanem-Bornu, the Hausa city-states, Oyo, Benin, the Igbo segmentary societies.",
                    "Trans-Saharan trade and the spread of Islam in the north.",
                    "Atlantic slave trade and its demographic and political effects.",
                    "Legitimate trade in palm oil and the Niger expeditions.",
                    "Annexation of Lagos (1861) and the Royal Niger Company era.",
                    "Amalgamation of 1914, indirect rule, nationalist parties, and independence in 1960."
                ]
            },
            {
                heading: "Comparing political systems",
                intro: "Comparison needs criteria, not adjectives.",
                bullets: [
                    "Centralisation: emperor, oba, emir, or council of elders.",
                    "Succession rules and the role of lineage.",
                    "Taxation, tribute and military organisation.",
                    "Gender and age-grade structures in governance.",
                    "Religion and legitimacy.",
                    "Trade linkages between regions before colonial contact."
                ],
                callout: {
                    title: "Avoid the 'stateless' trap",
                    body: "Societies without kings were not without government. Describe the institutions that actually governed - councils, age grades, title societies."
                }
            },
            {
                heading: "Colonial rule and its arguments",
                intro: "Know the debate and its evidence.",
                bullets: [
                    "Indirect rule relied on existing authorities and reshaped them in the process.",
                    "Cash crops, rail and taxation integrated Nigeria into an export economy.",
                    "Mission education produced a new elite with its own grievances.",
                    "Nationalism moved from cultural assertion to party politics.",
                    "Historiographical debate: colonial emphasis versus African agency.",
                    "Use primary sources critically: who wrote, for whom, and why?"
                ]
            }
        ],
        practice: [
            { q: "Why is 1914 significant in Nigerian history?", a: "The Northern and Southern Protectorates were amalgamated into a single colonial administration, with consequences for later federal structure." },
            { q: "Why is 'stateless society' a misleading term?", a: "Igbo and similar societies had governance through councils, age grades and title societies rather than a centralised monarchy." },
            { q: "What did indirect rule do to traditional authority?", a: "It used existing authorities for colonial administration while transforming their power, legitimacy and accountability." },
            { q: "Name two effects of the Atlantic slave trade on Nigerian societies.", a: "Population loss and political disruption through raiding; economic reorientation toward slave supply and later legitimate trade." },
            { q: "What does African agency mean in historiography?", a: "Attention to Africans as decision-makers and initiators, not only as respondents to European action." }
        ],
        checklist: [
            "Build a dated timeline from 1000 to 1960.",
            "Draw a comparison table of three pre-colonial systems.",
            "Map trade routes and their commodities.",
            "Read one primary source and identify its author's interest.",
            "Write an essay plan with a clear thesis.",
            "Learn five nationalist figures and their positions.",
            "Practise a document question under timed conditions."
        ]
    },
    {
        ...COMMON,
        slug: "phi-101-introduction-to-philosophy-and-logic",
        code: "PHI 101",
        title: "PHI 101: Introduction to Philosophy and Logic",
        subtitle: "Arguments, fallacies and the questions that do not go away",
        department: "Philosophy",
        tags: ["PHI 101", "Logic", "Argument", "Fallacy", "Ethics", "100L"],
        description: "This pack teaches the mechanics of argument first, then the classical divisions of philosophy. It includes validity and soundness, common fallacies, the problem of knowledge, ethics and African philosophy, plus a template for writing a philosophy answer that argues rather than narrates.",
        outcomes: [
            "Distinguish validity from soundness.",
            "Identify and name common informal fallacies.",
            "Explain the main branches of philosophy with an example question each.",
            "Write a short philosophical argument with an objection and a reply."
        ],
        sections: [
            {
                heading: "Arguments, validity and soundness",
                intro: "A good argument is structurally valid and materially true.",
                bullets: [
                    "Premises support a conclusion; the conclusion is what is claimed.",
                    "Validity concerns form: if premises are true, the conclusion must be.",
                    "Soundness requires validity plus true premises.",
                    "Deductive arguments guarantee; inductive arguments support with probability.",
                    "Counterexample is the standard tool for testing a claim.",
                    "Define your terms before you argue about them."
                ]
            },
            {
                heading: "Fallacies you will meet",
                intro: "Naming the fallacy is half the correction.",
                bullets: [
                    "Ad hominem: attacking the person instead of the argument.",
                    "Straw man: refuting a distorted version of the opponent's view.",
                    "False dilemma: presenting two options when more exist.",
                    "Appeal to authority or to popularity as a substitute for evidence.",
                    "Begging the question: assuming what you set out to prove.",
                    "Hasty generalisation and post hoc reasoning."
                ],
                callout: {
                    title: "Charity principle",
                    body: "Argue against the strongest version of the opposing view. Defeating a weak version proves nothing."
                }
            },
            {
                heading: "Branches and African philosophy",
                intro: "Each branch has characteristic questions.",
                bullets: [
                    "Metaphysics: what exists, and what is a person?",
                    "Epistemology: what is knowledge, and when is belief justified?",
                    "Ethics: what makes an action right?",
                    "Logic: what follows from what?",
                    "Aesthetics: what is beauty and what is art?",
                    "African philosophy: ethnophilosophy debates, ubuntu and communitarian ethics, sage philosophy, and the critique of a single 'African' position."
                ]
            }
        ],
        practice: [
            { q: "Can an argument be valid with false premises?", a: "Yes. Validity concerns the form; soundness additionally requires true premises." },
            { q: "Name the fallacy of attacking a person rather than their argument.", a: "Ad hominem." },
            { q: "What is begging the question?", a: "An argument that assumes the truth of the conclusion it is supposed to establish." },
            { q: "Give one epistemological question.", a: "What conditions must a true belief meet before it counts as knowledge?" },
            { q: "What is the charity principle?", a: "Interpreting an opponent's argument in its strongest reasonable form before criticising it." }
        ],
        checklist: [
            "Write five arguments in premise-conclusion form.",
            "Test each for validity and soundness.",
            "Learn ten fallacies with an example.",
            "Read one short Platonic dialogue.",
            "Summarise one debate in African philosophy.",
            "Draft an essay with an objection and a reply.",
            "Peer-review for unstated assumptions."
        ]
    },
    {
        ...COMMON,
        slug: "rel-101-introduction-to-the-study-of-religion",
        code: "REL 101",
        title: "REL 101: Introduction to the Study of Religion",
        subtitle: "Describe religious traditions accurately before you evaluate them",
        department: "Religion & Human Relations",
        tags: ["REL 101", "Religion", "African Traditional Religion", "Islam", "Christianity", "100L"],
        description: "This pack introduces the academic study of religion: key terms, the major traditions present in Nigeria, African Traditional Religion without caricature, and the method of describing before evaluating. It also covers the ethics of studying living communities.",
        outcomes: [
            "Define religion, belief, ritual and sacred with reference to scholars.",
            "Compare Christianity, Islam and African Traditional Religion accurately.",
            "Apply the describe-then-analyse method.",
            "Follow ethical norms in fieldwork with religious communities."
        ],
        sections: [
            {
                heading: "Terms that need defining",
                intro: "Definitions shape what you notice.",
                bullets: [
                    "Religion: a contested category; substantive and functional definitions differ.",
                    "Belief, practice, community and institution as four dimensions.",
                    "Sacred and profane; purity, taboo and boundary.",
                    "Ritual: repetitive, patterned action with symbolic meaning.",
                    "Myth: a foundational narrative, not a synonym for falsehood.",
                    "Syncretism, conversion and revival as processes, not labels."
                ]
            },
            {
                heading: "Traditions in Nigeria",
                intro: "Accuracy beats generalisation.",
                bullets: [
                    "Christianity: denominational diversity, Pentecostal growth and independent churches.",
                    "Islam: Maliki jurisprudence in the north, Sufi orders, reform movements.",
                    "African Traditional Religion: a misleading singular term for diverse traditions with shared features - divination, ancestors, deities, community rites.",
                    "Interreligious relations and conflict, and the role of the state.",
                    "Internal diversity within every tradition; avoid treating one expression as the whole.",
                    "Use the names communities use for themselves."
                ],
                callout: {
                    title: "Describe, then evaluate",
                    body: "Describe a practice in the terms its practitioners use, then analyse it with your academic tools. Reversing the order produces caricature."
                }
            },
            {
                heading: "Method and ethics",
                intro: "Religion is studied, not proselytised.",
                bullets: [
                    "Bracketing: set aside your own commitments for the purposes of description.",
                    "Use insider and outsider accounts together.",
                    "Obtain consent before interviews and photography.",
                    "Anonymise where disclosure could expose or endanger participants.",
                    "Distinguish normative theology from descriptive religious studies.",
                    "Cite sources with their tradition and date."
                ]
            }
        ],
        practice: [
            { q: "Why is 'African Traditional Religion' a contested singular term?", a: "It groups diverse, locally distinct traditions under one label, obscuring their differences and histories." },
            { q: "What does bracketing mean in the study of religion?", a: "Setting aside one's own commitments temporarily in order to describe a tradition accurately on its own terms." },
            { q: "Give two dimensions of religion besides belief.", a: "Practice and community; institution and ritual are further dimensions." },
            { q: "Distinguish theology from religious studies.", a: "Theology argues from within a tradition; religious studies describes and analyses traditions as an academic field." },
            { q: "Name one fieldwork ethics requirement.", a: "Informed consent before interviews or photography, plus protection of participant confidentiality." }
        ],
        checklist: [
            "Write two definitions of religion from different scholars.",
            "Compare three traditions across four dimensions.",
            "Learn ten terms with examples.",
            "Visit a service or site with permission and take descriptive notes.",
            "Write a description with no evaluative language.",
            "Then write a separate analytical section.",
            "Check every claim against a cited source."
        ]
    },
    {
        ...COMMON,
        slug: "mus-101-fundamentals-of-music-theory",
        code: "MUS 101",
        title: "MUS 101: Fundamentals of Music Theory - Notation, Scales and Rhythm",
        subtitle: "Read, write and hear the basics before analysis",
        domain: "Faculty Primer",
        department: "Music",
        tags: ["MUS 101", "Music Theory", "Notation", "Scales", "Rhythm", "100L"],
        description: "This pack covers staff notation, clefs, note values and metre, major and minor scales, intervals, triads, and the basics of African rhythmic organisation including polyrhythm and the standard pattern. It ends with an ear-training routine you can run without a piano.",
        outcomes: [
            "Read and write notes on treble and bass staves.",
            "Construct major and minor scales and identify intervals.",
            "Build and identify triads.",
            "Describe polyrhythm and the standard pattern in African music."
        ],
        sections: [
            {
                heading: "Notation fundamentals",
                intro: "Notation is a tool for thought, not a substitute for hearing.",
                bullets: [
                    "Staff, clefs, ledger lines and the grand staff.",
                    "Note values: whole, half, quarter, eighth, sixteenth and their rests.",
                    "Dots and ties change duration, not pitch.",
                    "Time signatures: simple, compound and irregular metre.",
                    "Key signatures and the circle of fifths.",
                    "Accidentals apply within the bar unless cancelled."
                ]
            },
            {
                heading: "Scales, intervals and chords",
                intro: "Patterns make transposition manageable.",
                bullets: [
                    "Major scale pattern: tone-tone-semitone-tone-tone-tone-semitone.",
                    "Natural, harmonic and melodic minor.",
                    "Interval quality: major, minor, perfect, augmented, diminished.",
                    "Triads: major, minor, diminished and augmented.",
                    "Roman numeral analysis for progressions.",
                    "Modes and pentatonic scales beyond the European common practice."
                ],
                callout: {
                    title: "Sing what you write",
                    body: "If you cannot sing a scale or interval, you do not yet know it. Singing connects notation to hearing."
                }
            },
            {
                heading: "African rhythmic organisation",
                intro: "African music theory is not an appendix to European theory.",
                bullets: [
                    "The standard pattern (the 'short' bell pattern) as a timeline reference.",
                    "Polyrhythm: simultaneous contrasting rhythmic layers.",
                    "Cross-rhythm and the relationship of 3 against 2 or 12/8 feels.",
                    "Call and response as a structural principle.",
                    "Timeline instruments anchor ensemble coordination.",
                    "Transcription is an interpretation; note your choices."
                ]
            }
        ],
        practice: [
            { q: "What is the interval pattern of a major scale?", a: "Tone, tone, semitone, tone, tone, tone, semitone." },
            { q: "How many semitones are in a perfect fifth?", a: "Seven." },
            { q: "What is a triad?", a: "A chord of three notes built in thirds from a root." },
            { q: "Define polyrhythm.", a: "The simultaneous use of two or more contrasting rhythmic patterns that do not share a simple subdivision." },
            { q: "Why is the standard pattern important?", a: "It functions as a timeline that anchors the ensemble and organises the cyclical structure of the music." }
        ],
        checklist: [
            "Write out all major scales up to four sharps and flats.",
            "Practise reading treble and bass clefs daily for a week.",
            "Sing and identify ten intervals.",
            "Build major, minor and diminished triads on five roots.",
            "Clap a 3:2 polyrhythm steadily for a minute.",
            "Transcribe four bars of a recorded pattern.",
            "Test yourself with a short dictation."
        ]
    },
    {
        ...COMMON,
        slug: "faa-101-foundations-of-fine-and-applied-arts",
        code: "FAA 101",
        title: "FAA 101: Foundations of Fine and Applied Arts - Drawing, Colour and Form",
        subtitle: "The studio habits that carry every later course",
        department: "Fine & Applied Arts",
        material_type: "lab-manuals",
        subcategory: "lab-manuals",
        tags: ["FAA 101", "Drawing", "Colour Theory", "Design", "100L"],
        description: "This pack covers observational drawing, proportion and perspective, value and colour theory, composition, and the material differences between drawing, painting, sculpture and design media. It includes a weekly sketchbook routine that builds skill faster than occasional intense sessions.",
        outcomes: [
            "Draw from observation with correct proportion and simple perspective.",
            "Use value to describe form and light.",
            "Apply colour theory in a composition.",
            "Keep a sketchbook that documents sustained practice."
        ],
        sections: [
            {
                heading: "Observation before expression",
                intro: "Draw what is there before you draw what you feel.",
                bullets: [
                    "Sight and measure: use your pencil to compare angles and proportions.",
                    "Block in the largest shapes before detail.",
                    "Check negative space to correct proportion errors.",
                    "One- and two-point perspective for interiors and streets.",
                    "Draw from life daily; photographs flatten form misleadingly.",
                    "Date every page so progress is visible."
                ]
            },
            {
                heading: "Value, light and colour",
                intro: "Value does most of the work of describing form.",
                bullets: [
                    "Build a nine-step value scale and use it to check drawings.",
                    "Identify the light source and keep it consistent.",
                    "Look for core shadow, reflected light and cast shadow.",
                    "Colour theory: hue, value, saturation; complementary and analogous schemes.",
                    "Local colour versus perceived colour under light.",
                    "Test colour relationships rather than trusting memory."
                ],
                callout: {
                    title: "Squint at it",
                    body: "Squinting collapses detail and reveals whether your values hold together. If the drawing collapses, fix the value structure, not the outline."
                }
            },
            {
                heading: "Media and studio practice",
                intro: "Materials have different affordances; learn them deliberately.",
                bullets: [
                    "Graphite: control, shading and erasure.",
                    "Charcoal and conte: bold mass and expressive mark-making.",
                    "Watercolour: transparency, layering and unforgiving corrections.",
                    "Acrylic and oil: opacity, blending and drying differences.",
                    "Clay and relief: form, armature and structural limits.",
                    "Clean up, store work flat and label materials properly."
                ]
            }
        ],
        practice: [
            { q: "Why check negative space when drawing?", a: "Because judging the shapes around an object exposes proportion errors the eye misses when focused on the object." },
            { q: "What are the three properties of colour?", a: "Hue, value and saturation." },
            { q: "Name the parts of a cast shadow.", a: "Core shadow, reflected light and cast shadow; highlight and midtone complete the light structure." },
            { q: "Why is daily sketching more effective than occasional long sessions?", a: "Skill builds through frequent repetition and immediate correction, which short sessions support." },
            { q: "What is the difference between local and perceived colour?", a: "Local colour is the object's inherent colour; perceived colour is how it appears under specific light and surroundings." }
        ],
        checklist: [
            "Fill ten sketchbook pages from observation.",
            "Build a nine-step value scale.",
            "Draw one interior in one-point perspective.",
            "Paint a simple colour wheel and two schemes.",
            "Make a value study of a still life.",
            "Experiment with two unfamiliar media.",
            "Review your first and last page side by side."
        ]
    },
    {
        ...COMMON,
        slug: "lin-101-introduction-to-linguistics",
        code: "LIN 101",
        title: "LIN 101: Introduction to Linguistics - Sound, Structure and Meaning",
        subtitle: "Analyse language systematically instead of judging it",
        department: "Linguistics",
        tags: ["LIN 101", "Linguistics", "Phonetics", "Syntax", "Sociolinguistics", "100L"],
        description: "Linguistics is descriptive, not prescriptive. This pack introduces phonetics and phonology, morphology, syntax, semantics and sociolinguistics, using Nigerian languages and Nigerian English as data - so the examples are close to what you actually hear.",
        outcomes: [
            "Transcribe simple words using IPA.",
            "Identify morphemes and word-formation processes.",
            "Draw a basic syntactic tree.",
            "Explain the difference between descriptive and prescriptive approaches."
        ],
        sections: [
            {
                heading: "Phonetics and phonology",
                intro: "Sounds first, then the systems they form.",
                bullets: [
                    "Articulation: place and manner of consonants, voicing.",
                    "Vowels described by height, backness and rounding.",
                    "IPA symbols for sounds that English spelling hides.",
                    "Phoneme versus allophone: contrast versus variation.",
                    "Syllable structure, stress and tone.",
                    "Nigerian languages contribute sounds English lacks; use them as data."
                ]
            },
            {
                heading: "Morphology and syntax",
                intro: "Structure at word level and sentence level.",
                bullets: [
                    "Morpheme: free and bound; root, stem and affix.",
                    "Word formation: derivation, compounding, borrowing, reduplication, clipping.",
                    "Word classes identified by distribution, not only meaning.",
                    "Constituents and phrase structure.",
                    "Basic tree diagrams for simple sentences.",
                    "Grammaticality is judged against a grammar, not against taste."
                ],
                callout: {
                    title: "Describe, do not scold",
                    body: "'Ain't' and Nigerian English forms are data about rules in use. Prescriptivism belongs to style guidance, not linguistic analysis."
                }
            },
            {
                heading: "Semantics and sociolinguistics",
                intro: "Meaning and social life are part of language structure.",
                bullets: [
                    "Sense, reference and ambiguity.",
                    "Synonymy, antonymy, hyponymy and entailment.",
                    "Pragmatics: implicature and speech acts.",
                    "Variation by region, class, gender and context.",
                    "Code-switching and multilingual repertoires.",
                    "Language contact, pidginisation and creolisation."
                ]
            }
        ],
        practice: [
            { q: "Distinguish a phoneme from an allophone.", a: "A phoneme contrasts meaning in a language; an allophone is a variant pronunciation of the same phoneme in a context." },
            { q: "What is a bound morpheme?", a: "A morpheme that cannot stand alone and must attach to another form, such as a plural or tense marker." },
            { q: "Why is prescriptivism not linguistic analysis?", a: "It evaluates usage against a preferred standard rather than describing the rules speakers actually follow." },
            { q: "Give an example of code-switching.", a: "Alternating between Igbo and English within a conversation or sentence according to topic, interlocutor or setting." },
            { q: "What does a constituency test show?", a: "Which groups of words behave as a single structural unit in a sentence." }
        ],
        checklist: [
            "Learn the IPA symbols used in your course.",
            "Transcribe twenty words from two languages.",
            "Segment ten words into morphemes.",
            "Draw five simple tree diagrams.",
            "Collect three examples of code-switching you observe.",
            "Read one paper on Nigerian English.",
            "Write a short descriptive analysis with data, not opinion."
        ]
    },
    {
        ...COMMON,
        slug: "melo-101-introduction-to-modern-european-languages",
        code: "MEL 101",
        title: "MEL 101: Introduction to Modern European Languages",
        subtitle: "French and German foundations: sounds, gender and basic structures",
        department: "Modern European Languages",
        tags: ["MEL 101", "French", "German", "Grammar", "Pronunciation", "100L"],
        description: "This pack covers the first-semester foundations of French and German: pronunciation and silent letters, articles and gender, basic verb conjugation, word order, and the study habits that make a foreign language stick. It also explains how to use a dictionary properly.",
        outcomes: [
            "Pronounce basic French and German sounds accurately.",
            "Use definite and indefinite articles with correct gender.",
            "Conjugate common verbs in the present tense.",
            "Build correct simple sentences in each language."
        ],
        sections: [
            {
                heading: "Sounds and spelling",
                intro: "Spelling and sound diverge; learn both together.",
                bullets: [
                    "French: nasal vowels, liaisons and silent final consonants.",
                    "French: accent marks affect pronunciation and meaning.",
                    "German: umlauts, the ich and ach sounds, and final devoicing.",
                    "German: nouns are capitalised; compounds carry meaning in parts.",
                    "Read aloud daily; silent reading builds no pronunciation.",
                    "Use audio from the start rather than translating word by word."
                ]
            },
            {
                heading: "Gender, articles and agreement",
                intro: "Gender is grammatical, not logical.",
                bullets: [
                    "French: le, la, les; un, une, des.",
                    "German: der, die, das; ein, eine, ein; cases change articles.",
                    "Adjectives agree with the noun in gender and number.",
                    "Word order: German places the finite verb second in main clauses.",
                    "Negation patterns differ from English; learn them as whole phrases.",
                    "Record nouns with their article from the first day."
                ],
                callout: {
                    title: "Learn the article with the noun",
                    body: "Memorising 'Tisch' without 'der' guarantees errors later. Learn 'der Tisch' as one item."
                }
            },
            {
                heading: "Study routine and resources",
                intro: "Language learning rewards frequency over intensity.",
                bullets: [
                    "Twenty minutes daily beats three hours once a week.",
                    "Use spaced repetition for vocabulary with audio.",
                    "Speak from week one, even imperfectly.",
                    "Keep an error log and review it weekly.",
                    "Read a dictionary entry properly: gender, part of speech, example.",
                    "Watch/listen to authentic material with subtitles, then without."
                ]
            }
        ],
        practice: [
            { q: "Why learn a noun with its article?", a: "Gender is not predictable from meaning, so the article must be memorised as part of the word." },
            { q: "What is liaison in French?", a: "The pronunciation of a normally silent final consonant when the next word begins with a vowel or silent h." },
            { q: "Where does the finite verb sit in a German main clause?", a: "In second position." },
            { q: "How do umlauts affect German vowels?", a: "They change vowel quality, and often the plural or comparative form of the word." },
            { q: "Why is daily short practice better?", a: "Frequency strengthens recall and pronunciation habits more effectively than infrequent long sessions." }
        ],
        checklist: [
            "Learn the alphabet and core sounds in each language.",
            "Record yourself reading a short paragraph weekly.",
            "Build a 100-word vocabulary list with articles.",
            "Conjugate five common verbs in the present.",
            "Write ten correct simple sentences.",
            "Set up a spaced-repetition deck with audio.",
            "Keep a weekly error log."
        ]
    }
]
