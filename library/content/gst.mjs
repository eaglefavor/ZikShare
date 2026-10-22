// GST and compulsory-course packs for UNIZIK 100 level students.
// Course codes and titles vary by department/session; packs carry a clear
// "confirm your outline" note rather than pretending to be official handouts.

export const GST_PACKS = [
    {
        slug: "gst-101-use-of-english",
        code: "GST 101",
        title: "GST 101: Use of English I - Grammar, Concord and Comprehension",
        subtitle: "A practical companion for the compulsory Use of English course every UNIZIK fresher takes",
        domain: "GST & Compulsory Courses",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 40000,
        tags: ["GST 101", "Use of English", "Grammar", "Concord", "Comprehension", "100L"],
        description: "Most freshers lose easy GST marks not because English is hard, but because they answer by ear. This pack turns the rules of concord, tense, punctuation and comprehension into short, testable patterns you can apply under exam pressure. It includes a sentence-error drill, a summary-writing method and a 7-day revision plan.",
        outcomes: [
            "Apply subject-verb agreement rules to tricky sentences involving collective nouns, indefinite pronouns and correlative conjunctions.",
            "Identify and correct the ten sentence errors that recur most in Nigerian university English tests.",
            "Read a passage once and extract its main idea, tone and supporting details without re-reading everything.",
            "Write a clean summary and a short argumentative paragraph with a clear topic sentence and evidence."
        ],
        sections: [
            {
                heading: "What the course is really testing",
                intro: "GST 101 is not a literature course and it is not a spelling bee. It tests whether you can use English as a precision instrument: can you say exactly what you mean, understand a dense passage, and spot a sentence that breaks a rule?",
                paragraphs: [
                    "The paper usually mixes objective questions with short written tasks. Objective sections reward recognition - you either know the rule or you do not. Written sections reward structure. A candidate with average vocabulary and strong structure routinely beats a candidate with impressive vocabulary and no paragraph plan.",
                    "Treat the course as a small set of repeatable skills: agreement, tense consistency, pronoun reference, punctuation, register, comprehension and summary. Each one can be drilled separately."
                ],
                bullets: [
                    "Agreement: the verb must match its real subject, not the nearest noun.",
                    "Tense: reported speech and time markers must stay consistent within a sentence.",
                    "Reference: every pronoun needs one clear noun it points to.",
                    "Register: a formal letter and a WhatsApp message should not sound the same."
                ]
            },
            {
                heading: "Concord: the marks hiding in plain sight",
                intro: "Concord questions are designed to trick your ear. Read for the subject first, ignore the phrase between the subject and the verb, then choose.",
                bullets: [
                    "Each, every, either, neither, everyone, somebody and nobody take a singular verb: 'Each of the students has a copy.'",
                    "Two subjects joined by 'and' take a plural verb, unless they describe one idea: 'Bread and butter is my breakfast.'",
                    "With 'either...or' and 'neither...nor', the verb agrees with the nearer subject: 'Neither the lecturer nor the students were ready.'",
                    "Collective nouns take a singular verb when the group acts as one unit and a plural verb when members act separately: 'The committee has decided' versus 'The committee are divided.'",
                    "Phrases beginning with 'a number of' take a plural verb; 'the number of' takes a singular verb.",
                    "Uncountable nouns such as information, advice, furniture, luggage and equipment are singular: 'The information is correct.'"
                ],
                callout: {
                    title: "A 10-second exam habit",
                    body: "Cover the words between the subject and the verb with your finger. Read the skeleton sentence aloud in your head. If it sounds wrong with the short subject, it is wrong."
                }
            },
            {
                heading: "The sentence errors that cost the most marks",
                intro: "Examiners reuse a small family of errors because they separate students who understand grammar from students who memorise rules.",
                bullets: [
                    "Run-on sentences: two independent clauses joined by a comma. Fix with a full stop, semicolon or conjunction.",
                    "Sentence fragments: a dependent clause standing alone. 'Because the lecture started late.' is not a sentence.",
                    "Dangling modifiers: 'Having finished the assignment, the lecturer collected it.' The lecturer did not finish the assignment.",
                    "Faulty parallelism: 'She likes reading, to swim and dancing.' Keep the list in one grammatical form.",
                    "Pronoun ambiguity: 'Chidi told Emeka that his phone was missing.' Whose phone? Rewrite with a name.",
                    "Double negatives: 'I did not see nobody.' Use one negative."
                ]
            },
            {
                heading: "Comprehension without panic",
                intro: "Do not read the passage as if it were a novel. Read the questions first, then read for the answers.",
                numbered: [
                    "Spend 45 seconds reading the questions and underlining the key word in each one.",
                    "Read the passage once at normal speed. Mark the paragraph that seems to contain each answer.",
                    "Answer in your own words where the question says 'in your own words'. Lifting the exact sentence usually earns nothing.",
                    "For inference questions, choose the option the passage supports, not the option that sounds generally true.",
                    "For tone questions, look at the writer's verbs and adjectives, not the topic alone."
                ],
                callout: {
                    title: "Watch the qualifiers",
                    body: "Options containing always, never, all, only and must are usually wrong unless the passage says so directly. Options with some, often, may and tends to are safer when the passage is cautious."
                }
            },
            {
                heading: "Summary and short writing",
                intro: "A summary is not a shorter copy. It is a compressed statement of the main points in your own words, with no examples, repetition or personal opinion.",
                bullets: [
                    "Find the topic sentence of each paragraph. Those sentences usually carry the main points.",
                    "Delete examples, statistics, dialogue and restatements.",
                    "Combine related points instead of listing them mechanically.",
                    "Keep the original order of ideas and the original tense.",
                    "Check your word limit. Being far under the limit usually means you omitted a main point."
                ]
            }
        ],
        practice: [
            { q: "Choose the correct verb: 'Neither the Dean nor the lecturers ___ available.'", a: "were. With neither...nor, the verb agrees with the nearer subject, 'lecturers'." },
            { q: "Rewrite correctly: 'Having submitted the form, the portal closed.'", a: "The sentence has a dangling modifier. Rewrite as: 'After I submitted the form, the portal closed.'" },
            { q: "Is 'The committee are arguing among themselves' correct?", a: "Yes. The plural verb is acceptable when members of the committee are acting individually. Use 'is' when the committee acts as one body." },
            { q: "What is wrong with 'She gave me an advice'?", a: "'Advice' is uncountable. Say 'a piece of advice' or 'some advice'." },
            { q: "In a summary, should you include the examples in the passage?", a: "No. Include the main points and omit examples, repetitions and minor details." },
            { q: "Identify the error: 'The number of applicants have increased.'", a: "'The number of' takes a singular verb. It should be 'has increased'." }
        ],
        checklist: [
            "Write out the seven concord rules in your own words and invent one example for each.",
            "Do 20 sentence-correction items from any credible English workbook and mark every error by rule name.",
            "Read one Guardian or Punch editorial and write its main idea in two sentences.",
            "Summarise a 500-word passage in 90 words without copying whole sentences.",
            "Write one argumentative paragraph with a topic sentence, two supporting points and a conclusion.",
            "Ask a friend to mark your paragraph for agreement and punctuation only.",
            "Re-do every question you missed after 48 hours, not immediately."
        ]
    },
    {
        slug: "gst-102-use-of-english-ii",
        code: "GST 102",
        title: "GST 102: Use of English II - Essays, Letters and Advanced Comprehension",
        subtitle: "Write the essays, letters and reports that university assessment actually rewards",
        domain: "GST & Compulsory Courses",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 40000,
        tags: ["GST 102", "Use of English", "Essay Writing", "Formal Letters", "Comprehension", "100L"],
        description: "GST 102 moves from sentence rules to whole pieces of writing. This pack gives you reusable structures for argumentative and expository essays, formal letters, reports and minutes, plus a marking-style checklist so you can grade your own drafts before your lecturer does.",
        outcomes: [
            "Plan an argumentative or expository essay in five minutes using a clear thesis and paragraph outline.",
            "Write a formal letter, application letter and simple report with correct layout and register.",
            "Use cohesive devices without overusing 'moreover' and 'furthermore'.",
            "Edit your own draft for structure, grammar, punctuation and word choice."
        ],
        sections: [
            {
                heading: "The five-minute essay plan",
                intro: "Most weak essays fail at the planning stage. Five minutes of planning saves twenty minutes of confused writing.",
                numbered: [
                    "Underline the instruction words: discuss, argue, compare, describe, evaluate. Each demands a different structure.",
                    "Write a one-sentence thesis: the exact position your essay will defend.",
                    "List three body points. Each must be different, relevant and supportable.",
                    "For each body point, note one example or piece of evidence.",
                    "Decide your conclusion in one sentence before you start writing."
                ],
                callout: {
                    title: "The thesis test",
                    body: "If your thesis could be agreed with by everyone, it is too vague. 'Technology is useful' is not a thesis. 'Smartphones help freshers study only when notifications are controlled' is."
                }
            },
            {
                heading: "Paragraph architecture",
                intro: "A body paragraph should do one job: prove one point. The most reliable pattern is claim, explanation, evidence, link.",
                bullets: [
                    "Claim: a topic sentence that states the point directly.",
                    "Explanation: why the claim is true in your context.",
                    "Evidence: an example, statistic, experience or reference.",
                    "Link: connect back to the thesis or forward to the next point.",
                    "Keep paragraphs between four and eight sentences. Very long paragraphs hide your argument."
                ]
            },
            {
                heading: "Argumentative versus expository essays",
                intro: "Both need structure, but they answer different questions.",
                bullets: [
                    "Argumentative: take a side, acknowledge the strongest opposing view, then rebut it. Do not sit on the fence unless the question asks you to.",
                    "Expository: explain a process, concept or phenomenon clearly. Your job is clarity, not persuasion.",
                    "Narrative: tell a story with a point. Avoid ending with 'and that was how I learnt a lesson' unless the lesson is specific.",
                    "Compare and contrast: organise by criteria (cost, speed, reliability) rather than describing one item fully and then the other."
                ],
                callout: {
                    title: "Counter-argument formula",
                    body: "Some students argue that X because Y. That view has merit, but it overlooks Z. When Z is considered, X becomes less convincing than it first appears."
                }
            },
            {
                heading: "Formal letters without embarrassment",
                intro: "Formal letters are marked on layout, tone and completeness as much as on grammar.",
                bullets: [
                    "Two addresses: your address, then the recipient's address, then the date.",
                    "Salutation: 'Dear Sir/Madam' when the name is unknown; 'Dear Mr Okafor' when known.",
                    "Subject line: short and specific, for example 'Application for the Position of Library Assistant'.",
                    "Opening: state your purpose in the first two sentences. Do not begin with 'I am writing this letter to tell you that'.",
                    "Body: one paragraph per issue. Be direct and courteous.",
                    "Closing: 'Yours faithfully' after 'Dear Sir/Madam'; 'Yours sincerely' after a named recipient.",
                    "Sign and print your full name."
                ]
            },
            {
                heading: "Reports and minutes",
                intro: "A report answers a question for someone who was not there. Minutes record decisions, not conversations.",
                bullets: [
                    "Report structure: title, terms of reference, procedure, findings, conclusion, recommendations.",
                    "Write findings as evidence, not opinion: 'Twenty of 30 students surveyed...' not 'Everybody knows...'.",
                    "Minutes: date, time, venue, attendance, agenda items, decisions, action owners, next meeting.",
                    "Record decisions and action points, not every contribution.",
                    "Use past tense for what happened and present tense for standing rules."
                ]
            }
        ],
        practice: [
            { q: "Write a thesis for: 'Should first-year students be allowed to use AI tools for assignments?'", a: "A defensible thesis: 'First-year students should be allowed to use AI tools for drafting and feedback, provided they disclose the use and remain responsible for the final argument.' It takes a position and sets a condition." },
            { q: "Which salutation pairs with 'Yours faithfully'?", a: "'Dear Sir/Madam' pairs with 'Yours faithfully'. 'Yours sincerely' pairs with a named recipient." },
            { q: "What is the difference between an expository and an argumentative essay?", a: "An expository essay explains a topic clearly. An argumentative essay takes a position and defends it against objections." },
            { q: "Rewrite in formal register: 'I wanna ask if you guys can give me the job.'", a: "'I would like to apply for the position and would appreciate the opportunity to discuss my suitability.'" },
            { q: "What belongs in the findings section of a report?", a: "Observed facts, data and evidence gathered through the stated procedure, presented without recommendations. Recommendations belong in their own section." },
            { q: "Give three cohesive devices for showing contrast.", a: "However, nevertheless, by contrast, whereas, on the other hand. Use one per paragraph rather than stacking them." }
        ],
        checklist: [
            "Write one argumentative essay in 40 minutes using the five-minute plan.",
            "Write one formal application letter and check every layout element against the list in this pack.",
            "Convert a news article into a two-paragraph summary in your own words.",
            "Edit an old essay, marking every run-on sentence and pronoun ambiguity.",
            "Learn five new transition words and use each once in a paragraph.",
            "Write a one-page report on a campus problem with findings and recommendations.",
            "Ask a coursemate to identify your thesis from your introduction alone."
        ]
    },
    {
        slug: "gst-103-philosophy-and-logic",
        code: "GST 103",
        title: "GST 103: Philosophy and Logic - Arguments, Fallacies and Clear Thinking",
        subtitle: "Learn to tell a real argument from noise, and to build one that survives cross-examination",
        domain: "GST & Compulsory Courses",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 40000,
        tags: ["GST 103", "Philosophy", "Logic", "Fallacies", "Critical Thinking", "100L"],
        description: "Philosophy and Logic is where many science and management students switch off - until they meet the objective questions. This pack explains validity, soundness, syllogisms and informal fallacies in plain language, with everyday UNIZIK examples and a fallacy-spotting drill.",
        outcomes: [
            "Distinguish an argument from a statement, explanation or quarrel.",
            "Test an argument for validity and soundness without confusing the two.",
            "Recognise the major informal fallacies in speeches, adverts and social-media arguments.",
            "Translate simple arguments into standard form and evaluate categorical syllogisms."
        ],
        sections: [
            {
                heading: "What philosophy is doing",
                intro: "Philosophy is not a collection of opinions. It is the disciplined practice of asking what a claim means, what it assumes, and what would count as evidence for it.",
                paragraphs: [
                    "The main branches you will meet are metaphysics (what exists), epistemology (what knowledge is and how we get it), ethics (how we should act), aesthetics (beauty and art) and logic (the rules of correct reasoning).",
                    "For examinations, logic carries the most marks because it is teachable and testable. The other branches matter for definitions and short-answer questions."
                ],
                bullets: [
                    "Metaphysics: reality, mind, causation, freedom.",
                    "Epistemology: belief, truth, justification, scepticism.",
                    "Ethics: right action, virtue, consequences, duty.",
                    "Logic: arguments, validity, proof, fallacy."
                ]
            },
            {
                heading: "Arguments: the basic unit",
                intro: "An argument is a set of statements where some, the premises, are offered as support for another, the conclusion.",
                paragraphs: [
                    "'I am tired, therefore I will sleep' is an argument. 'I am tired because I slept late' is an explanation. 'You are wrong because you are annoying' is an insult wearing an argument's clothes.",
                    "Premises answer 'what is the evidence?' The conclusion answers 'what follows?' Indicator words help: therefore, hence, so, thus and consequently usually introduce conclusions; because, since, given that and for usually introduce premises."
                ],
                callout: {
                    title: "Validity versus soundness",
                    body: "Validity is about structure: if the premises were true, the conclusion would have to be true. Soundness is validity plus actually true premises. An argument can be valid and unsound, but never sound and invalid."
                }
            },
            {
                heading: "Three patterns worth memorising",
                intro: "Most exam syllogisms use a small number of forms. Learn the patterns and you can evaluate them quickly.",
                bullets: [
                    "Modus ponens: If P then Q. P. Therefore Q. Valid.",
                    "Modus tollens: If P then Q. Not Q. Therefore not P. Valid.",
                    "Affirming the consequent: If P then Q. Q. Therefore P. Invalid - other causes of Q may exist.",
                    "Denying the antecedent: If P then Q. Not P. Therefore not Q. Invalid - Q may still happen for another reason.",
                    "Disjunctive syllogism: Either P or Q. Not P. Therefore Q. Valid when the options are genuinely exclusive."
                ]
            },
            {
                heading: "Categorical syllogisms in plain language",
                intro: "A categorical syllogism has two premises and a conclusion built from three terms: major, minor and middle.",
                paragraphs: [
                    "Example: All students write examinations. Ada is a student. Therefore Ada writes examinations. The middle term, 'students', links the other two terms.",
                    "Watch the quantifiers: all, no, some, some not. 'Some' means at least one, not most. A conclusion cannot introduce a stronger claim than the premises support."
                ],
                bullets: [
                    "All A are B; all B are C; therefore all A are C. Valid.",
                    "No A are B; some C are A; therefore some C are not B. Valid.",
                    "All A are B; some B are C; therefore some A are C. Invalid - the C may be among the Bs that are not A."
                ]
            },
            {
                heading: "Informal fallacies: the ones you will actually meet",
                intro: "A fallacy is a pattern of reasoning that looks persuasive but fails. Learning the names is useful; learning to explain why each fails is what earns marks.",
                bullets: [
                    "Ad hominem: attacking the person instead of the argument.",
                    "Appeal to authority: citing a famous person outside their expertise.",
                    "Appeal to popularity: 'everybody does it' does not make it true or right.",
                    "False dilemma: presenting two options when more exist.",
                    "Slippery slope: claiming one small step must lead to an extreme outcome without evidence.",
                    "Straw man: attacking a weaker version of an opponent's position.",
                    "Circular reasoning: assuming the conclusion in the premises.",
                    "Hasty generalisation: concluding from a tiny or biased sample.",
                    "Post hoc: assuming that because B followed A, A caused B."
                ],
                callout: {
                    title: "In the exam",
                    body: "When asked to identify a fallacy, name it and write one sentence explaining the reasoning error. A name without an explanation is half an answer."
                }
            }
        ],
        practice: [
            { q: "Is this valid or sound: 'All birds fly. Penguins are birds. Therefore penguins fly.'?", a: "The form is valid, but the argument is unsound because the first premise is false. Soundness requires true premises as well as valid structure." },
            { q: "Identify the fallacy: 'Don't listen to his advice on saving money - he failed his first business.'", a: "Ad hominem. The speaker attacks the person rather than addressing the financial advice." },
            { q: "What is the difference between an explanation and an argument?", a: "An argument offers evidence for a conclusion. An explanation shows why something is the case, assuming the fact is already accepted." },
            { q: "Test the form: If it rains, the ground is wet. The ground is wet. Therefore it rained.", a: "Invalid - affirming the consequent. The ground could be wet for another reason, such as a burst pipe." },
            { q: "Name the fallacy: 'Either you support the strike or you hate students.'", a: "False dilemma. It presents only two options when other positions are possible." },
            { q: "Why is 'some' different from 'most' in logic?", a: "'Some' means at least one. 'Most' means more than half. A conclusion using 'most' cannot be inferred from premises that only claim 'some'." }
        ],
        checklist: [
            "Write definitions of validity and soundness from memory, each with one example.",
            "Build your own valid modus ponens and invalid affirming-the-consequent argument on a campus topic.",
            "Collect ten headlines or adverts and name the fallacy in at least five.",
            "Draw a table of the six fallacies you find hardest and write a one-line rebuttal for each.",
            "Take a past objective question on logic and explain why each wrong option is wrong.",
            "Have a friend give you a one-paragraph argument and evaluate its premises and conclusion.",
            "Teach the difference between validity and soundness to someone in five minutes."
        ]
    },
    {
        slug: "gst-105-humanities",
        code: "GST 105",
        title: "GST 105: Humanities - Art, Literature, Music and the Examined Life",
        subtitle: "A guided tour of the humanities that gives you something real to say in the exam",
        domain: "GST & Compulsory Courses",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 40000,
        tags: ["GST 105", "Humanities", "Literature", "Art", "Music", "Philosophy", "100L"],
        description: "Humanities questions look broad, so students answer with vague generalities. This pack gives you concrete definitions, examples and evaluation language for literature, visual art, music, theatre and philosophy, plus a method for analysing a work you have never seen before.",
        outcomes: [
            "Define the humanities and explain why they matter beyond 'self-expression'.",
            "Analyse a poem, painting, piece of music or play using a repeatable framework.",
            "Explain the relationship between art, culture and society with Nigerian examples.",
            "Write a short evaluative answer that makes a claim, gives evidence and acknowledges complexity."
        ],
        sections: [
            {
                heading: "Why the humanities exist",
                intro: "The humanities study human experience and the meanings people make through language, image, sound, performance, belief and argument.",
                paragraphs: [
                    "They are not soft subjects. They require close reading, historical context and judgment under uncertainty - the same skills you need to interpret a legal case, a patient's story or a business rumour.",
                    "The disciplines you will meet include literature, linguistics, history, philosophy, religious studies, music, theatre and film, and visual arts."
                ],
                bullets: [
                    "Literature: how language creates meaning, character and value.",
                    "History: how evidence is selected and interpreted to explain change.",
                    "Philosophy: how concepts and arguments are tested.",
                    "Music and theatre: how performance shapes emotion and community."
                ]
            },
            {
                heading: "Analysing a poem without fear",
                intro: "Use the SOS method: Subject, Occasion, Speaker - then move to form and language.",
                numbered: [
                    "Subject: what is the poem about in one sentence?",
                    "Occasion: what situation or moment triggered it?",
                    "Speaker: who is talking, and is it the poet?",
                    "Form: stanzas, line length, rhyme, rhythm, free verse.",
                    "Language: diction, imagery, metaphor, simile, personification, repetition.",
                    "Tone: the speaker's attitude, supported by specific words.",
                    "Theme: what the poem suggests about life, not just what happens."
                ],
                callout: {
                    title: "Avoid the summary trap",
                    body: "Retelling the poem is not analysis. Every claim about meaning needs a quotation and a comment on the effect of the language."
                }
            },
            {
                heading: "Visual art and music as evidence",
                intro: "You do not need to be an artist to analyse art. You need to describe what is there before interpreting it.",
                bullets: [
                    "Visual art: subject matter, composition, colour, light, texture, scale, setting, and the artist's likely intention.",
                    "Nigerian reference points: Nok terracotta, Benin bronzes, Igbo uli body painting, contemporary artists such as Ben Enwonwu and Njideka Akunyili Crosby.",
                    "Music: instrument, rhythm, melody, tempo, dynamics, lyrics, call-and-response and context of performance.",
                    "Theatre: script, performance, staging, costume, audience and director's choices.",
                    "Always separate description from interpretation: 'The dominant colour is red' is description; 'The red suggests danger' is interpretation."
                ]
            },
            {
                heading: "Writing an answer that earns marks",
                intro: "Humanities answers are judged on accuracy, evidence and reasoning, not on how emotional they sound.",
                numbered: [
                    "Make a direct claim in the first sentence.",
                    "Define your key term immediately.",
                    "Give one concrete example - a text, artwork, event or practice.",
                    "Explain how the example supports the claim.",
                    "Add one qualification or counter-point.",
                    "Close with a sentence that answers the question, not with 'in conclusion'."
                ],
                callout: {
                    title: "Useful sentence starters",
                    body: "This suggests that... / The choice of... implies... / A limitation of this reading is... / This matters because... Avoid 'it is a very interesting work' with no follow-up."
                }
            }
        ],
        practice: [
            { q: "What is the difference between description and interpretation in art analysis?", a: "Description states what can be observed (colour, shapes, composition). Interpretation explains what those choices might mean. Interpretation needs descriptive evidence." },
            { q: "Name three elements of a poem you would discuss in an analysis.", a: "Form, imagery and tone are three. You could also discuss diction, rhythm, rhyme or theme, but every claim should be tied to a quotation." },
            { q: "Why is the humanities not the same as 'opinion'?", a: "Humanities scholarship uses evidence, context, method and argument. Opinions can be offered, but they must be supported and open to challenge." },
            { q: "Give one Nigerian example of visual art and explain its significance.", a: "The Benin bronzes are metal plaques and sculptures from the Kingdom of Benin, significant for their craftsmanship and for debates about repatriation of looted heritage." },
            { q: "What does 'tone' mean in literary analysis?", a: "The speaker's attitude toward the subject or audience, revealed through word choice, rhythm and images." },
            { q: "How should you discuss a work you have not studied before?", a: "Describe what is present, identify patterns, connect them to context and make a careful interpretive claim. Do not invent biographical facts." }
        ],
        checklist: [
            "Read one poem and annotate subject, speaker, form, imagery and tone.",
            "Visit a campus exhibition or browse a Nigerian art collection online and describe three works without interpreting them yet.",
            "Listen to one Nigerian classical or contemporary piece and write four lines on instrumentation and mood.",
            "Write a 250-word answer to 'Why study the humanities?' with two concrete examples.",
            "Learn five Nigerian cultural reference points you can use accurately.",
            "Analyse a film scene for staging, costume and camera choices.",
            "Exchange answers with a coursemate and mark each other for evidence, not length."
        ]
    },
    {
        slug: "gst-107-nigerian-peoples-and-culture",
        code: "GST 107",
        title: "GST 107: Nigerian Peoples and Culture - Diversity, History and Nation-Building",
        subtitle: "The context every Nigerian graduate should be able to explain without slogans",
        domain: "GST & Compulsory Courses",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 40000,
        tags: ["GST 107", "Nigerian Peoples", "Culture", "History", "Nation-Building", "100L"],
        description: "This pack organises Nigeria's pre-colonial societies, cultural institutions, colonial experience and post-independence challenges into clear themes you can actually remember. It replaces vague 'unity in diversity' answers with specific examples, dates and arguments.",
        outcomes: [
            "Describe the political and social organisation of at least three pre-colonial Nigerian societies.",
            "Explain how colonialism reshaped Nigerian economies, identities and boundaries.",
            "Distinguish cultural relativism from ethnocentrism with Nigerian examples.",
            "Discuss national integration using evidence rather than slogans."
        ],
        sections: [
            {
                heading: "Peoples, cultures and the danger of stereotypes",
                intro: "Nigeria has more than 250 ethnic groups and over 500 languages. The three largest - Hausa-Fulani, Yoruba and Igbo - are often used as shorthand, but that shorthand hides enormous internal diversity.",
                paragraphs: [
                    "Culture includes language, religion, food, dress, marriage, music, craft, political organisation and shared values. It is learned and changes over time; it is not biological.",
                    "Ethnocentrism judges another culture by the standards of one's own. Cultural relativism tries to understand a practice within its own context - without pretending that every practice is beyond criticism."
                ],
                bullets: [
                    "Hausa city-states and the Sokoto Caliphate: centralised emirate administration, Islamic scholarship and trans-Saharan trade.",
                    "Yoruba kingdoms: Ife and Oyo, divine kingship, the Oyo cavalry and a rich oral and artistic tradition.",
                    "Igbo societies: largely acephalous village republics, age grades, title societies such as Ozo, and the Nri ritual complex.",
                    "Minority and riverine peoples: the Tiv, Ijaw, Efik, Ibibio, Nupe, Kanuri and many others with distinct political systems."
                ]
            },
            {
                heading: "Pre-colonial trade, craft and knowledge",
                intro: "Long before colonial boundaries, the area that became Nigeria had sophisticated economies and knowledge systems.",
                bullets: [
                    "Trans-Saharan trade linked Kano and Katsina to North Africa through leather, salt, kola and horses.",
                    "The trans-Atlantic slave trade devastated communities and created wealth for intermediaries; its consequences outlasted abolition.",
                    "Benin bronzes, Ife terracotta heads, Nok figures and Igbo-Ukwu bronzes show advanced metallurgy and artistry.",
                    "Palm oil production, fishing, weaving, blacksmithing and salt making supported regional trade.",
                    "Indigenous medicine, astronomy and agriculture were systems of knowledge, not mere superstition."
                ]
            },
            {
                heading: "Colonialism and its long shadow",
                intro: "Colonial rule lasted roughly six decades but reorganised almost everything: boundaries, administration, economy, education and identity.",
                paragraphs: [
                    "The 1884-85 Berlin Conference set the framework for European partition. The Royal Niger Company and later the British colonial administration merged protectorates in 1914 into a single entity.",
                    "Colonial economies were built around extraction - palm produce, cocoa, groundnuts, tin and later oil - with infrastructure designed to move goods to ports rather than connect Nigerian communities.",
                    "Indirect rule deepened some ethnic identities and created new administrative divisions. Mission schools produced a new elite that later led nationalist movements."
                ],
                callout: {
                    title: "Exam precision",
                    body: "Do not write that 'the British united Nigeria'. They amalgamated territories for administrative convenience. The consequences - uneven development and contested citizenship - are still with us."
                }
            },
            {
                heading: "Nationalism, independence and nation-building",
                intro: "Nationalist movements used newspapers, unions, market associations and political parties to demand self-government.",
                bullets: [
                    "Early nationalism: Herbert Macaulay and the NNDP; the Aba Women's War of 1929 against colonial taxation.",
                    "Mass nationalism: Nnamdi Azikiwe, Obafemi Awolowo, Ahmadu Bello and the parties they led.",
                    "Independence in 1960; a republic in 1963; civil war from 1967 to 1970.",
                    "Military rule alternated with short democratic periods until civilian rule returned in 1999.",
                    "Federal character, state creation and revenue allocation are responses to the challenge of governing diversity."
                ],
                callout: {
                    title: "Nation-building is not the same as unity",
                    body: "Unity is a condition; nation-building is the work of creating institutions and loyalties that make diversity governable. Cite specific institutions such as the NYSC, federal character and national language policy."
                }
            }
        ],
        practice: [
            { q: "What is cultural relativism?", a: "The view that a culture should be understood in terms of its own values and context rather than judged by the standards of another culture." },
            { q: "Name two features of pre-colonial Igbo political organisation.", a: "Village assemblies and age-grade associations; title societies such as Ozo; and decentralised governance without a single paramount ruler in many communities." },
            { q: "Why was the 1914 amalgamation significant?", a: "It joined the Northern and Southern Protectorates into one administrative unit, shaping the boundaries and governance structure of modern Nigeria." },
            { q: "Distinguish ethnocentrism from racism.", a: "Ethnocentrism judges other cultures by one's own cultural standards. Racism asserts that racial groups have inherent superior or inferior qualities and often justifies discrimination." },
            { q: "Give one economic effect of colonial rule in Nigeria.", a: "The economy was reorganised around export crops and mineral extraction for European markets, with infrastructure built mainly to move goods to ports." },
            { q: "What is federal character, and why is it controversial?", a: "A constitutional principle requiring fair representation of Nigeria's diverse groups in public institutions. Critics argue it can undermine merit; supporters argue it protects inclusion in a deeply unequal federation." }
        ],
        checklist: [
            "Draw a map of Nigeria's six geopolitical zones and label three ethnic groups in each.",
            "Write one paragraph each on pre-colonial Hausa, Yoruba and Igbo political systems.",
            "Create a timeline from 1884 to 1999 with ten key events.",
            "Explain three ways colonialism changed Nigerian education and economy.",
            "Learn five cultural practices from groups outside your own without caricature.",
            "Write a balanced answer on whether Nigeria is a nation or merely a state.",
            "Discuss one current national issue using historical context rather than blame."
        ]
    },
    {
        slug: "gst-104-history-and-philosophy-of-science",
        code: "GST 104",
        title: "GST 104: History and Philosophy of Science - How Knowledge Actually Grows",
        subtitle: "From observation and falsification to African science and the ethics of discovery",
        domain: "GST & Compulsory Courses",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 40000,
        tags: ["GST 104", "Philosophy of Science", "Scientific Method", "History of Science", "Ethics", "100L"],
        description: "This pack explains what makes science different from mere belief, how scientific ideas have changed across history, and how African knowledge systems contributed to medicine, metallurgy and agriculture. It also gives you the vocabulary for ethics-of-science questions.",
        outcomes: [
            "Explain the scientific method, hypothesis, falsifiability, paradigm and theory without collapsing them into one word.",
            "Trace major shifts from ancient to modern science with accurate examples.",
            "Describe African contributions to science and technology using specific evidence.",
            "Discuss ethical issues such as research misconduct, informed consent and environmental responsibility."
        ],
        sections: [
            {
                heading: "What science is - and is not",
                intro: "Science is a method of producing reliable knowledge through observation, measurement, hypothesis testing and public criticism. It is not a fixed body of facts, and it is not the same as technology.",
                paragraphs: [
                    "A hypothesis is a testable prediction. A theory is a well-supported explanatory framework that has survived repeated testing. A law describes a regular relationship. Colloquial English uses 'theory' to mean a guess; science does not.",
                    "Falsifiability, associated with Karl Popper, means a claim must specify what evidence would count against it. 'Everything happens for a reason' is not scientific because no observation could refute it."
                ],
                bullets: [
                    "Observation and measurement: record what happens under controlled conditions.",
                    "Hypothesis: a specific, testable prediction.",
                    "Experiment: manipulate variables while controlling others.",
                    "Peer review: allow others to check methods, data and reasoning.",
                    "Replication: repeat the study to see whether the result holds."
                ],
                callout: {
                    title: "Correlation is not causation",
                    body: "Two things rising together may share a third cause, or one may cause the other in the opposite direction. Before claiming causation, look for controlled evidence and a plausible mechanism."
                }
            },
            {
                heading: "A short history of scientific change",
                intro: "Science has not progressed by simply accumulating facts. It has changed when old frameworks could no longer explain new observations.",
                bullets: [
                    "Ancient Greek natural philosophy: Aristotle's physics and the geocentric model.",
                    "Islamic Golden Age: algebra, optics, hospitals and the preservation of Greek texts.",
                    "Copernican revolution: the sun-centred model replaced geocentrism.",
                    "Galileo and Newton: mathematised motion, telescopes and laws of gravitation.",
                    "Darwin and Wallace: evolution by natural selection.",
                    "Einstein: relativity transformed space, time and gravity.",
                    "Watson, Crick, Franklin and Wilkins: the structure of DNA and modern molecular biology."
                ]
            },
            {
                heading: "African science and technology",
                intro: "African societies produced empirical knowledge and technical innovation long before European contact. Recognising this is not sentiment; it is historical accuracy.",
                bullets: [
                    "Metallurgy: Nok iron smelting and Igbo-Ukwu bronze casting.",
                    "Medicine: herbal pharmacopoeias, bone setting and knowledge of plant properties, some of which inform modern drug discovery.",
                    "Agriculture: mixed cropping, soil management, terracing and indigenous seed selection.",
                    "Mathematics: fractal-like patterns in African textiles and architecture; counting and weight systems.",
                    "Astronomy: navigation and calendar systems based on celestial observation."
                ],
                callout: {
                    title: "Avoid both extremes",
                    body: "Do not claim that all modern science was stolen from Africa, and do not claim that Africa had no science. Make specific, evidence-based claims about specific technologies."
                }
            },
            {
                heading: "Science, technology and society",
                intro: "Scientific knowledge is never automatically good. Its application depends on incentives, regulation and who bears the risk.",
                bullets: [
                    "Research ethics: informed consent, confidentiality, honest reporting and approval by an ethics committee.",
                    "Misconduct: fabrication, falsification and plagiarism destroy trust and can harm patients.",
                    "Dual use: the same research can produce medicine or weapons.",
                    "Environmental justice: communities may bear environmental costs without sharing the benefits.",
                    "Access: a drug that exists but is unaffordable is not a solution for the person who needs it."
                ]
            }
        ],
        practice: [
            { q: "What makes a claim falsifiable?", a: "It specifies observations that would count against it. If no possible evidence could refute the claim, it is not scientifically testable." },
            { q: "What is the difference between a hypothesis and a theory?", a: "A hypothesis is a specific testable prediction. A theory is a broad explanatory framework supported by many lines of evidence." },
            { q: "Give one African contribution to metallurgy.", a: "The Nok culture produced iron smelting evidence dating to roughly the first millennium BCE; Igbo-Ukwu is known for sophisticated bronze casting." },
            { q: "Why is peer review important?", a: "It exposes methods and claims to independent scrutiny before publication, reducing the chance that errors or weak reasoning go unchallenged." },
            { q: "Explain the difference between correlation and causation with an example.", a: "Ice-cream sales and drowning deaths both rise in hot weather, but ice cream does not cause drowning. Heat is a common cause." },
            { q: "Name two ethical requirements for research involving human participants.", a: "Informed consent and ethics committee approval; confidentiality and the right to withdraw are also essential." }
        ],
        checklist: [
            "Write definitions of hypothesis, theory, law and paradigm in your own words.",
            "Create a timeline of six scientific shifts with one key figure each.",
            "List four African technologies and the evidence that supports them.",
            "Find one news report that confuses correlation with causation and rewrite the headline accurately.",
            "Write a short paragraph on why falsifiability matters.",
            "Explain informed consent to a friend in under one minute.",
            "Review one unethical research case and identify what should have been done differently."
        ]
    }
]
