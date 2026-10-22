// Faculty primers - management, social sciences, arts, education, agriculture and vocational education.

export const FACULTY_PRIMER_PACKS_C = [
    {
        slug: "acc-101-introduction-to-financial-accounting",
        code: "ACC 101",
        title: "ACC 101: Introduction to Financial Accounting - Double Entry to Trial Balance",
        subtitle: "Learn the accounting cycle by doing it, one transaction at a time",
        domain: "Faculty Primer",
        faculty: "Faculty of Management Sciences",
        department: "Accountancy",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free: no fee, no payment before download
        tags: ["ACC 101", "Financial Accounting", "Double Entry", "Trial Balance", "100L"],
        description: "Accounting is a skill, not a set of definitions. This pack walks you through the accounting equation, double entry, books of original entry, the trial balance and simple final accounts, with worked transactions you can replicate on paper.",
        outcomes: [
            "Apply the accounting equation to record transactions correctly.",
            "Post transactions using double entry and balance a ledger account.",
            "Prepare a trial balance and identify errors it will not reveal.",
            "Prepare a simple income statement and statement of financial position."
        ],
        sections: [
            {
                heading: "The accounting equation",
                intro: "Every transaction preserves the relationship assets equals liabilities plus capital.",
                bullets: [
                    "Assets are resources controlled by the business; liabilities are obligations to outsiders; capital is the owner's residual interest.",
                    "Increase in an asset is a debit; increase in a liability or capital is a credit.",
                    "Expenses reduce capital and are debits; income increases capital and is a credit.",
                    "Drawings reduce capital and are debits to the drawings account.",
                    "Every transaction affects at least two accounts and keeps the equation in balance.",
                    "Write the equation after every transaction until it is automatic."
                ],
                callout: {
                    title: "Debit does not mean good",
                    body: "Debit simply means the left side of an account. Stop attaching moral meaning to it and the confusion disappears."
                }
            },
            {
                heading: "Books of original entry and the ledger",
                intro: "Transactions are first recorded in day books, then posted to the ledger, then summarised in the trial balance.",
                bullets: [
                    "Sales day book for credit sales; purchases day book for credit purchases.",
                    "Returns inwards for goods returned by customers; returns outwards for goods returned to suppliers.",
                    "Cash book combines cash and bank; treat it as both a book of original entry and a ledger.",
                    "Journal entries record adjustments, corrections and non-routine transactions with narrations.",
                    "Post to the relevant ledger accounts and balance them at the period end.",
                    "Extract the trial balance from ledger balances to check arithmetic equality."
                ]
            },
            {
                heading: "Errors and final accounts",
                intro: "A trial balance that balances is not proof of accuracy. Some errors cancel out.",
                bullets: [
                    "Errors not revealed: omission, commission, principle, original entry, reversal and compensating errors.",
                    "Errors revealed: one-sided posting, wrong addition and transposition between accounts.",
                    "Suspense accounts hold the difference until the error is found and corrected.",
                    "Income statement: revenue minus cost of sales gives gross profit; minus expenses gives net profit.",
                    "Statement of financial position: assets, liabilities and capital at a point in time.",
                    "Adjust for accruals, prepayments, depreciation and closing inventory before finalising."
                ]
            }
        ],
        practice: [
            { q: "A business buys equipment for cash. State the double entry.", a: "Debit equipment account; credit cash account. Both are assets, so the equation stays balanced." },
            { q: "What is the effect of drawings on capital?", a: "Drawings reduce capital and are recorded as a debit to the drawings account." },
            { q: "Name two errors that a trial balance will not reveal.", a: "Error of omission and error of principle; compensating errors and errors of original entry are also hidden." },
            { q: "Gross profit is 200,000 and expenses are 75,000. Find net profit.", a: "Net profit = 200,000 - 75,000 = 125,000." },
            { q: "Why is depreciation charged?", a: "To allocate the cost of a non-current asset over its useful life and match it against the revenue it helps generate." }
        ],
        checklist: [
            "Write the accounting equation and classify ten accounts as asset, liability, capital, income or expense.",
            "Record 15 transactions in day books and post them to ledger accounts.",
            "Balance five ledger accounts correctly.",
            "Prepare a trial balance from a list of balances.",
            "List six errors that a trial balance will not detect.",
            "Prepare a simple income statement with three adjustments.",
            "Attempt one past ACC 101 question under timed conditions."
        ]
    },
    {
        slug: "mkt-101-principles-of-marketing",
        code: "MKT 101",
        title: "MKT 101: Principles of Marketing - Customers, Value and the Marketing Mix",
        subtitle: "Think like a marketer about real Nigerian markets, not just definitions",
        domain: "Faculty Primer",
        faculty: "Faculty of Management Sciences",
        department: "Marketing",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free: no fee, no payment before download
        tags: ["MKT 101", "Marketing", "Marketing Mix", "Segmentation", "Consumer Behaviour", "100L"],
        description: "Marketing is often reduced to advertising, which is like reducing medicine to injections. This pack explains value, exchange, segmentation, positioning and the extended marketing mix, using Nigerian campus and consumer examples you can analyse in assignments.",
        outcomes: [
            "Define marketing as value creation and exchange rather than promotion alone.",
            "Segment a market and choose a defensible target segment and position.",
            "Apply the 4Ps and 7Ps to a real product or service.",
            "Explain consumer buying behaviour and the factors that shape it."
        ],
        sections: [
            {
                heading: "Marketing is not advertising",
                intro: "Marketing begins with understanding a need and ends with a satisfied customer, profitably.",
                bullets: [
                    "Needs are basic requirements; wants are culturally shaped desires; demand is the willingness and ability to buy.",
                    "Value is the difference between what a customer gets and what they give up.",
                    "Exchange requires two parties, something of value, communication and freedom to accept or reject.",
                    "Marketing orientation starts with the customer; production orientation starts with the factory.",
                    "Customer satisfaction and retention are cheaper than constant acquisition.",
                    "Marketing ethics matter: manipulation and false claims destroy trust and invite regulation."
                ]
            },
            {
                heading: "STP: segment, target, position",
                intro: "You cannot serve everybody well. Choose deliberately.",
                numbered: [
                    "Segment the market using demographic, geographic, psychographic or behavioural variables.",
                    "Evaluate segments by size, growth, profitability, accessibility and fit with your capability.",
                    "Select one or more target segments and state why.",
                    "Choose a positioning statement: for whom, what benefit, against which alternative.",
                    "Test the positioning for clarity, credibility and distinctiveness.",
                    "Ensure the marketing mix actually delivers the promised position."
                ],
                callout: {
                    title: "Positioning is a promise",
                    body: "If you position on low price, your cost structure must support it. If you position on quality, your product and service must consistently prove it."
                }
            },
            {
                heading: "The marketing mix and consumer behaviour",
                intro: "The mix is the set of controllable tools used to deliver value in the target market.",
                bullets: [
                    "Product: features, quality, branding, packaging, after-sales service.",
                    "Price: cost-plus, value-based, penetration and skimming strategies.",
                    "Place: channels, coverage, logistics and retailer relationships.",
                    "Promotion: advertising, sales promotion, public relations, personal selling and digital marketing.",
                    "For services, extend with people, process and physical evidence.",
                    "Buying behaviour is shaped by culture, social groups, personal factors and psychological factors such as perception and motivation."
                ]
            }
        ],
        practice: [
            { q: "Distinguish a need from a want.", a: "A need is a basic requirement such as food. A want is a culturally shaped way of satisfying it, such as a specific brand of noodles." },
            { q: "What is market segmentation?", a: "Dividing a heterogeneous market into smaller groups of buyers with similar needs or characteristics that can be served with a tailored offer." },
            { q: "Give two pricing strategies and when each is appropriate.", a: "Price skimming suits an innovative product with early adopters. Penetration pricing suits a new entrant trying to win share quickly." },
            { q: "Why do services add people, process and physical evidence to the 4Ps?", a: "Because services are intangible, produced and consumed simultaneously, and dependent on staff and customer experience, so these elements shape perceived quality." },
            { q: "Write a positioning statement for a campus food vendor.", a: "For busy UNIZIK students who need affordable, quick meals, our vendor offers hot home-style food delivered to hostels within 20 minutes, unlike cafeteria queues." }
        ],
        checklist: [
            "Define marketing, needs, wants and demand in your own words.",
            "Segment the UNIZIK student market in three different ways.",
            "Write one positioning statement for a product you use.",
            "Apply all seven Ps to a service business near campus.",
            "Collect two adverts and identify the targeting and positioning used.",
            "Explain three psychological factors in buying decisions.",
            "Write a one-page marketing mix proposal for a student business idea."
        ]
    },
    {
        slug: "psy-101-introduction-to-psychology",
        code: "PSY 101",
        title: "PSY 101: Introduction to Psychology - Mind, Behaviour and Evidence",
        subtitle: "What psychology actually studies, and how to evaluate a claim about behaviour",
        domain: "Faculty Primer",
        faculty: "Faculty of Social Sciences",
        department: "Psychology",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free: no fee, no payment before download
        tags: ["PSY 101", "Psychology", "Learning", "Memory", "Research Methods", "100L"],
        description: "Psychology freshers arrive with strong intuitions and weak methods. This pack introduces the major perspectives, learning and memory, developmental and social psychology, and the research reasoning needed to tell evidence from anecdote.",
        outcomes: [
            "Distinguish the biological, cognitive, behavioural, psychodynamic, humanistic and sociocultural perspectives.",
            "Explain classical and operant conditioning and observational learning with examples.",
            "Describe models of memory and reasons forgetting occurs.",
            "Evaluate a psychological claim using basic research-design criteria."
        ],
        sections: [
            {
                heading: "Perspectives and methods",
                intro: "Psychology is the scientific study of behaviour and mental processes, and it approaches questions from several angles.",
                bullets: [
                    "Biological: genes, brain structures and neurotransmitters.",
                    "Cognitive: attention, perception, memory, language and problem solving.",
                    "Behavioural: observable responses and consequences.",
                    "Psychodynamic: unconscious conflict and early experience, historically influential but harder to test.",
                    "Humanistic: growth, self-concept and personal agency.",
                    "Sociocultural: how groups, culture and context shape behaviour."
                ],
                callout: {
                    title: "Correlation is a clue, not a proof",
                    body: "A relationship between two variables does not establish direction or cause. Ask whether the study was experimental, randomised and controlled."
                }
            },
            {
                heading: "Learning and memory",
                intro: "Learning is a change in behaviour or knowledge resulting from experience; memory is the encoding, storage and retrieval of information.",
                bullets: [
                    "Classical conditioning: a neutral stimulus becomes associated with a meaningful one, as in Pavlov's dogs.",
                    "Operant conditioning: behaviour is shaped by reinforcement and punishment.",
                    "Observational learning: we learn by watching models, especially those we admire.",
                    "Memory stages: sensory memory, short-term or working memory and long-term memory.",
                    "Forgetting may result from encoding failure, decay, interference or retrieval failure.",
                    "Spaced practice and retrieval practice are among the best-supported study techniques."
                ]
            },
            {
                heading: "Development, personality and social behaviour",
                intro: "Human behaviour is shaped across the lifespan and in the presence of others.",
                bullets: [
                    "Piaget described cognitive stages; Vygotsky emphasised social scaffolding and the zone of proximal development.",
                    "Erikson framed development as a sequence of psychosocial conflicts.",
                    "Personality is described through traits; the Big Five model is widely used.",
                    "Conformity, obedience and group influence can override individual judgement.",
                    "Attribution explains how we assign causes to behaviour, often with bias in our own favour.",
                    "Prejudice involves attitudes; discrimination involves behaviour."
                ]
            }
        ],
        practice: [
            { q: "What is the difference between negative reinforcement and punishment?", a: "Negative reinforcement increases a behaviour by removing an unpleasant stimulus; punishment decreases a behaviour by adding or removing a stimulus." },
            { q: "Why is a correlational study weaker than an experiment for causal claims?", a: "Correlation does not control confounding variables or establish the direction of effect; an experiment manipulates the independent variable and controls alternatives." },
            { q: "Name two evidence-based study techniques.", a: "Spaced practice and retrieval practice. Interleaving and elaboration are also supported." },
            { q: "Distinguish prejudice from discrimination.", a: "Prejudice is a prejudgement or attitude; discrimination is behaviour that treats people unequally on that basis." },
            { q: "What is the zone of proximal development?", a: "The gap between what a learner can do alone and what they can do with skilled guidance, where learning is most effective." }
        ],
        checklist: [
            "Write one-sentence summaries of all six perspectives.",
            "Design a simple classical-conditioning example from campus life.",
            "Draw the memory model and label three causes of forgetting.",
            "Explain why an experiment supports causal claims better than a survey.",
            "Learn the Big Five traits with one descriptor each.",
            "Define prejudice, stereotype and discrimination distinctly.",
            "Critique one popular psychology claim using evidence criteria."
        ]
    },
    {
        slug: "mac-101-introduction-to-mass-communication",
        code: "MAC 101",
        title: "MAC 101: Introduction to Mass Communication - Media, Audiences and Ethics",
        subtitle: "How messages reach millions, and who decides what counts as news",
        domain: "Faculty Primer",
        faculty: "Faculty of Social Sciences",
        department: "Mass Communication",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free: no fee, no payment before download
        tags: ["MAC 101", "Mass Communication", "Media Theory", "Journalism", "Media Ethics", "100L"],
        description: "Mass communication is studied as a system of institutions, technologies, audiences and effects. This pack covers the communication process, media functions and theories, news values, and the ethical and legal issues Nigerian journalists face.",
        outcomes: [
            "Explain the communication process and the difference between interpersonal and mass communication.",
            "Describe the functions of the mass media and evaluate normative theories of the press.",
            "Apply news values to explain why one story leads and another is buried.",
            "Identify core ethical and legal issues in Nigerian media practice."
        ],
        sections: [
            {
                heading: "The communication process",
                intro: "Every communication event can be broken into components, and each component can fail.",
                bullets: [
                    "Sender, encoding, message, channel, noise, receiver, decoding, feedback.",
                    "Interpersonal communication is direct and reciprocal; mass communication is mediated, public and one-to-many.",
                    "Noise can be physical, semantic, psychological or channel-related.",
                    "Feedback in mass communication is delayed and indirect, for example ratings or comments.",
                    "Digital media blur the line by allowing audience participation at scale.",
                    "A model is a simplification; use it to analyse, not to pretend reality is tidy."
                ]
            },
            {
                heading: "Functions and theories of the press",
                intro: "Media do more than inform, and different societies expect different things from them.",
                bullets: [
                    "Functions: surveillance, interpretation, transmission of culture, socialisation, entertainment and mobilisation.",
                    "Authoritarian theory: media serve the state.",
                    "Libertarian theory: media should be free and open.",
                    "Social responsibility theory: freedom carries obligations to accuracy and public interest.",
                    "Soviet-communist and development media theories emphasise collective goals.",
                    "Gatekeeping, agenda-setting and framing explain how media shape what audiences think about."
                ],
                callout: {
                    title: "Agenda-setting versus telling you what to think",
                    body: "Media may not dictate your opinion, but they influence which issues you consider important. That distinction is examinable and worth stating precisely."
                }
            },
            {
                heading: "News values, ethics and law",
                intro: "News is a construction governed by professional routines and constraints.",
                bullets: [
                    "News values: timeliness, proximity, prominence, consequence, conflict, novelty and human interest.",
                    "Ethics: accuracy, fairness, balance, privacy, avoiding plagiarism and correcting errors promptly.",
                    "Law: defamation, contempt of court, copyright, and rules on official secrets.",
                    "Free expression is constitutionally protected but limited by law and public interest.",
                    "Self-regulation through codes of conduct matters where enforcement is weak.",
                    "Digital verification, source protection and misinformation are now core professional skills."
                ]
            }
        ],
        practice: [
            { q: "Name the components of the communication process.", a: "Sender, encoding, message, channel, noise, receiver, decoding and feedback." },
            { q: "What does agenda-setting theory argue?", a: "That media influence the salience of issues, shaping what audiences regard as important rather than directly telling them what to think." },
            { q: "List four news values.", a: "Timeliness, proximity, prominence and conflict. Consequence, novelty and human interest are also standard." },
            { q: "Distinguish defamation from contempt of court.", a: "Defamation is a false statement that damages reputation; contempt is conduct that interferes with the administration of justice, such as prejudicial reporting of a pending case." },
            { q: "Why is social responsibility theory relevant in Nigeria?", a: "The Constitution guarantees press freedom, but media are expected to serve the public interest, be accurate and avoid inciting harm." }
        ],
        checklist: [
            "Draw and label the communication process model.",
            "List five functions of the mass media with Nigerian examples.",
            "Compare libertarian and social responsibility theory in a table.",
            "Apply news values to three front-page stories.",
            "List six ethical duties of a journalist.",
            "Summarise one defamation case and its lesson for reporters.",
            "Write a 250-word analysis of a news story's framing."
        ]
    },
    {
        slug: "igb-101-introduction-to-igbo-studies",
        code: "IGB 101",
        title: "IGB 101: Introduction to Igbo Language and Culture - Sounds, Grammar and Worldview",
        subtitle: "A structured start for students studying Igbo for the first time",
        domain: "Faculty Primer",
        faculty: "Faculty of Arts",
        department: "Igbo, African & Asian Studies",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free: no fee, no payment before download
        tags: ["IGB 101", "Igbo", "Language", "Culture", "Phonology", "100L"],
        description: "Students entering Igbo studies vary from native speakers to complete beginners. This pack sets out the sound system, tone, noun classes and basic sentence patterns, and connects language to Igbo worldview through proverbs, naming and festivals, with drills that suit both groups.",
        outcomes: [
            "Recognise and produce Igbo vowels, consonants, digraphs and nasal sounds.",
            "Use tone marks and explain how tone changes meaning.",
            "Identify noun classes and form simple sentences with correct agreement.",
            "Interpret proverbs and naming practices as expressions of cultural values."
        ],
        sections: [
            {
                heading: "Sounds and spelling",
                intro: "Igbo is written with the Latin alphabet adapted to its own sounds, including dotted vowels and digraphs.",
                bullets: [
                    "Eight vowels: a, e, i, i with dot, o, o with dot, u, u with dot.",
                    "Consonant digraphs: ch, gb, gh, gw, kw, nw, ny, sh.",
                    "The letter n can be syllabic, as in the word for and.",
                    "Tone marks: high, low and, in some analyses, downstep.",
                    "Minimal pairs distinguished only by tone show why tone must be written.",
                    "Read aloud daily; Igbo orthography becomes intuitive with practice."
                ],
                callout: {
                    title: "Tone is not decoration",
                    body: "Words such as isi can mean head, smell or a form of the verb depending on tone. Omitting tone marks creates real ambiguity in writing."
                }
            },
            {
                heading: "Grammar basics",
                intro: "Igbo grammar is regular in many ways, but it uses patterns that English speakers must learn explicitly.",
                bullets: [
                    "Nouns are grouped by prefixes such as o, a, e, i, n and m.",
                    "Verbs carry subject agreement and aspect rather than tense in the English sense.",
                    "Word order is subject, verb, object in simple declarative sentences.",
                    "Questions can be formed with tone and with question particles.",
                    "Possession uses a possessive pronoun that agrees with the noun class.",
                    "Practice short sentences rather than memorising long paradigms."
                ]
            },
            {
                heading: "Culture, proverb and worldview",
                intro: "Language carries culture; Igbo proverbs are compressed arguments about life.",
                bullets: [
                    "Proverbs are used in formal speech, adjudication and storytelling to persuade and to soften criticism.",
                    "Names often encode circumstance, hope or gratitude, so naming is a form of communication.",
                    "Festivals such as the New Yam Festival express gratitude and social hierarchy.",
                    "Respect is encoded in address forms and titles.",
                    "Oral literature includes folktales, praise poetry and riddles with pedagogical purposes.",
                    "Colonial and missionary history shaped orthography and influenced language policy."
                ],
                callout: {
                    title: "Use proverbs accurately",
                    body: "In assignments, explain a proverb's literal meaning, then its application. A proverb dropped without explanation earns no marks."
                }
            }
        ],
        practice: [
            { q: "Name the eight Igbo vowels.", a: "a, e, i, i (with dot), o, o (with dot), u, u (with dot)." },
            { q: "Why are tone marks important in written Igbo?", a: "Tone distinguishes otherwise identical words, so omitting tone marks can change meaning." },
            { q: "Identify three Igbo consonant digraphs.", a: "gb, ch and nw are three; kw, gw, ny, sh and gh are others." },
            { q: "What is the basic word order of a simple Igbo sentence?", a: "Subject, verb, object." },
            { q: "Explain one function of proverbs in Igbo society.", a: "Proverbs compress shared wisdom and are used to persuade, counsel or criticise indirectly in formal speech." }
        ],
        checklist: [
            "Write the Igbo alphabet and mark the dotted vowels.",
            "Practise ten minimal pairs distinguished by tone.",
            "Build five simple sentences with correct verb agreement.",
            "Learn five proverbs, their literal meaning and one application each.",
            "Collect five Igbo names and explain their meanings.",
            "Read one page of Igbo aloud daily for a week.",
            "Record yourself speaking and ask a fluent speaker for feedback."
        ]
    },
    {
        slug: "edu-101-foundations-of-education",
        code: "EDU 101",
        title: "EDU 101: Foundations of Education - Purpose, History and Practice",
        subtitle: "What education is for, and how schools actually work",
        domain: "Faculty Primer",
        faculty: "Faculty of Education",
        department: "Educational Foundations",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free: no fee, no payment before download
        tags: ["EDU 101", "Education", "Philosophy of Education", "Curriculum", "100L"],
        description: "Education students often memorise definitions without understanding the debates underneath them. This pack covers the meaning and aims of education, major philosophies, the Nigerian education system and the basics of curriculum and assessment.",
        outcomes: [
            "Distinguish education, schooling and indoctrination.",
            "Compare major educational philosophies and their classroom implications.",
            "Describe the structure and levels of the Nigerian education system.",
            "Explain curriculum, pedagogy and assessment as connected decisions."
        ],
        sections: [
            {
                heading: "What education is",
                intro: "Education is a deliberate process of developing knowledge, skills, attitudes and values. Schooling is one institution through which it happens.",
                bullets: [
                    "Formal education is structured and certified; informal education is embedded in daily life; non-formal education is organised but flexible.",
                    "Indoctrination closes inquiry; education opens it. The distinction lies in method and intent.",
                    "Aims include intellectual development, social efficiency, citizenship, moral development and self-actualisation.",
                    "Education is both a right and an instrument of national development.",
                    "Nigerian policy defines basic education broadly, including junior secondary.",
                    "Teachers exercise authority, which makes ethical self-awareness essential."
                ]
            },
            {
                heading: "Educational philosophies",
                intro: "Philosophy answers what knowledge is and what teaching should therefore look like.",
                bullets: [
                    "Idealism: emphasises ideas and moral formation; teacher as model.",
                    "Realism: emphasises observation and the natural order.",
                    "Pragmatism and progressivism: learning through experience and problem solving; teacher as facilitator.",
                    "Essentialism: core knowledge and discipline transmitted systematically.",
                    "Constructivism: learners build understanding from prior knowledge and activity.",
                    "Perennialism: enduring ideas and canonical texts."
                ],
                callout: {
                    title: "Theory to classroom",
                    body: "Examiners love the question 'what does this mean for teaching practice?' Always move from the philosophy to a concrete classroom behaviour."
                }
            },
            {
                heading: "System, curriculum and assessment",
                intro: "Curriculum is what is intended to be learned; instruction is how it is taught; assessment is how we know whether it was learned.",
                bullets: [
                    "Nigerian structure: early childhood, nine years of basic education, three years of senior secondary, then tertiary.",
                    "A curriculum includes objectives, content, methods and evaluation.",
                    "Bloom's taxonomy orders cognitive objectives from remembering to creating.",
                    "Assessment types: diagnostic, formative and summative.",
                    "Valid assessment measures what it claims; reliable assessment is consistent.",
                    "Continuous assessment reduces the weight of a single examination and provides feedback."
                ]
            }
        ],
        practice: [
            { q: "Distinguish education from indoctrination.", a: "Education develops the ability to question and reason; indoctrination instils beliefs while suppressing critical examination." },
            { q: "What is the difference between formal and non-formal education?", a: "Formal education follows a structured curriculum in institutions and leads to certification. Non-formal education is organised learning outside the formal system, such as adult literacy classes." },
            { q: "State one classroom implication of constructivism.", a: "Teaching should begin from learners' prior knowledge and use activities or problems that require them to build new understanding." },
            { q: "Differentiate formative from summative assessment.", a: "Formative assessment occurs during learning to guide improvement; summative assessment occurs at the end to judge achievement." },
            { q: "List two aims of education.", a: "Intellectual development and preparation for responsible citizenship." }
        ],
        checklist: [
            "Write your own definition of education and defend it in three sentences.",
            "Compare three educational philosophies in a table.",
            "Draw the structure of the Nigerian education system.",
            "List the components of a curriculum.",
            "Classify five assessment tasks as diagnostic, formative or summative.",
            "Explain validity and reliability with an example each.",
            "Observe a lesson and identify the dominant teaching approach."
        ]
    },
    {
        slug: "agr-101-principles-of-agriculture",
        code: "AGR 101",
        title: "AGR 101: Principles of Agriculture - Soils, Crops and Farming Systems",
        subtitle: "The science behind food production, from soil physics to farm planning",
        domain: "Faculty Primer",
        faculty: "Faculty of Agriculture",
        department: "Crop Science & Horticulture",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free: no fee, no payment before download
        tags: ["AGR 101", "Agriculture", "Soil Science", "Crop Production", "Farming Systems", "100L"],
        description: "This pack introduces agriculture as applied science and business: soil formation and fertility, crop growth and management, animal production basics, farming systems and the realities of extension and markets in Nigeria.",
        outcomes: [
            "Describe soil formation, texture, structure and fertility management.",
            "Explain the growth stages and management needs of a field crop.",
            "Compare farming systems and their suitability to Nigerian conditions.",
            "Identify the main constraints in Nigerian agricultural value chains."
        ],
        sections: [
            {
                heading: "Soil as a living system",
                intro: "Soil is the medium of plant growth, and it is a biological system, not inert dirt.",
                bullets: [
                    "Soil formation involves weathering, organic matter accumulation and biological activity over time.",
                    "Texture refers to the proportions of sand, silt and clay; structure refers to how particles aggregate.",
                    "Porosity and water-holding capacity determine irrigation and drainage needs.",
                    "Soil pH affects nutrient availability; most crops do best in a slightly acidic to neutral range.",
                    "Organic matter improves structure, water retention and microbial activity.",
                    "Fertility requires both nutrients and suitable physical and biological conditions."
                ],
                callout: {
                    title: "Test before you apply",
                    body: "Applying fertiliser without a soil test is guesswork. Excess nitrogen can burn crops and pollute water, while a micronutrient deficiency may go untreated."
                }
            },
            {
                heading: "Crop production",
                intro: "Crop yield is the product of genetics, environment and management.",
                bullets: [
                    "Land preparation: clearing, tillage and seedbed formation appropriate to the crop.",
                    "Propagation: seed selection, nursery practice, transplanting and spacing.",
                    "Water management: irrigation scheduling based on crop need and soil moisture.",
                    "Weed control: mechanical, cultural, biological and chemical methods, and integrated management.",
                    "Pest and disease management: scouting, thresholds, resistant varieties and safe pesticide use.",
                    "Post-harvest handling determines whether the yield reaches the market in saleable condition."
                ]
            },
            {
                heading: "Systems, livestock and value chains",
                intro: "A farm is a system in which crops, animals, labour and money interact.",
                bullets: [
                    "Shifting cultivation and bush fallow rely on long fallow periods to restore fertility.",
                    "Mixed cropping and intercropping spread risk and use space efficiently.",
                    "Intensive systems require higher inputs and careful management.",
                    "Livestock production depends on breeds adapted to local conditions, feeding, housing and health.",
                    "Extension links research to farmers but is constrained by staffing and funding.",
                    "Value chain constraints include storage losses, poor roads, credit scarcity and price volatility."
                ]
            }
        ],
        practice: [
            { q: "What is soil texture?", a: "The relative proportions of sand, silt and clay particles in a soil." },
            { q: "Why does organic matter matter?", a: "It improves soil structure, water-holding capacity and biological activity, and supplies nutrients as it decomposes." },
            { q: "Give one advantage and one disadvantage of mixed cropping.", a: "Advantage: risk spreading and efficient land use. Disadvantage: competition for light, water and nutrients and greater complexity in pest management." },
            { q: "What is integrated pest management?", a: "A strategy combining cultural, biological, mechanical and chemical methods with monitoring and thresholds, using chemicals as a last resort." },
            { q: "Name two post-harvest constraints in Nigeria.", a: "Inadequate storage leading to spoilage, and poor road infrastructure leading to delayed and damaged transport." }
        ],
        checklist: [
            "Describe the four components of soil.",
            "Test the texture of two soil samples by hand feel and record results.",
            "List the growth stages of a common Nigerian crop.",
            "Compare three farming systems in a table.",
            "Identify five pests or diseases of a staple crop.",
            "Draw a simple value chain for a crop you know.",
            "Interview a farmer about constraints and record five findings."
        ]
    },
    {
        slug: "vte-101-introduction-to-vocational-education",
        code: "VTE 101",
        title: "VTE 101: Introduction to Vocational and Technical Education - Skills, Safety and Assessment",
        subtitle: "How practical skills are taught, assessed and made employable",
        domain: "Faculty Primer",
        faculty: "Faculty of Technology & Vocational Education",
        department: "Electrical & Electronics Technology Education",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free: no fee, no payment before download
        tags: ["VTE 101", "Vocational Education", "Workshop Safety", "Competency Assessment", "100L"],
        description: "Vocational education is judged by whether learners can do the work safely and well. This pack explains its philosophy, the workshop environment, competency-based assessment and the link between skills and enterprise.",
        outcomes: [
            "Explain the purpose of technical and vocational education within national development.",
            "Identify workshop hazards and apply safety controls.",
            "Describe competency-based assessment and how it differs from examination-based grading.",
            "Plan a practical lesson with clear demonstration steps."
        ],
        sections: [
            {
                heading: "Why vocational education exists",
                intro: "TVET develops practical competence for work, enterprise and further technical study.",
                bullets: [
                    "It integrates theory with practice; the workshop is a learning laboratory, not an afterthought.",
                    "Historically, vocational education in Nigeria was often treated as a route for lower performers, a perception that has depressed enrolment.",
                    "Successful systems link employers, industry standards and training providers.",
                    "Entrepreneurship education complements technical competence by building commercial awareness.",
                    "National policy increasingly frames skills as central to unemployment reduction.",
                    "Teachers need both technical mastery and pedagogical skill."
                ]
            },
            {
                heading: "Workshop safety and control",
                intro: "The hierarchy of controls applies: remove the hazard, then engineer the risk out, then use procedures and only then rely on protective equipment.",
                bullets: [
                    "Common hazards: electricity, sharp tools, rotating machinery, noise, dust, fumes and manual handling.",
                    "Electrical safety: earth connections, correct fuses, insulation checks and no wet hands.",
                    "Machine safety: guards in place, correct speeds, loose clothing and jewellery removed.",
                    "Personal protective equipment: goggles, gloves, boots, apron and hearing protection as appropriate.",
                    "Housekeeping and clear exits reduce fire and tripping risk.",
                    "Report incidents and near misses; a near miss is free warning data."
                ],
                callout: {
                    title: "No shortcuts in demos",
                    body: "Students imitate what they see. If you demonstrate a task without goggles, they will conclude the rule is optional."
                }
            },
            {
                heading: "Assessment and demonstration",
                intro: "Competency assessment judges performance against stated standards, not against other students.",
                bullets: [
                    "Competency: a specific, observable ability performed to a standard.",
                    "Assessment criteria should state what the learner must do and how well.",
                    "Methods: direct observation, product assessment, oral questioning and written knowledge tests.",
                    "Formative feedback during practice accelerates skill acquisition.",
                    "Demonstration steps: explain, demonstrate slowly, demonstrate again with commentary, allow guided practice, then assess.",
                    "Keep a logbook or portfolio as evidence of skill development."
                ]
            }
        ],
        practice: [
            { q: "Define vocational education.", a: "Education that develops practical skills, knowledge and attitudes for employment, enterprise or further technical study." },
            { q: "What is the hierarchy of controls in safety?", a: "Eliminate the hazard, substitute or engineer controls, apply administrative controls, and use personal protective equipment as the last line of defence." },
            { q: "Differentiate competency-based assessment from norm-referenced grading.", a: "Competency-based assessment measures performance against a defined standard, while norm-referenced grading compares learners with each other." },
            { q: "List three workshop hazards in an electrical workshop.", a: "Electric shock from exposed live parts, fire from faulty circuits and injury from unguarded rotating machinery." },
            { q: "Why should demonstration be followed by guided practice?", a: "Learners need supervised repetition to convert observed steps into reliable skill and to correct errors before they become habits." }
        ],
        checklist: [
            "Write five aims of vocational education.",
            "Conduct a hazard audit of a workshop and record ten controls.",
            "Demonstrate the correct use of two pieces of personal protective equipment.",
            "Write assessment criteria for one practical task.",
            "Prepare a ten-minute demonstration lesson plan.",
            "Start a skills logbook with signed entries.",
            "Research one Nigerian skills programme and summarise its outcomes."
        ]
    }
]
