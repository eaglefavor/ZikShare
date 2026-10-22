// Study-skills and campus-life packs. These are not tied to a course code.

export const STUDY_AND_CAMPUS_PACKS = [
    {
        slug: "how-to-study-at-university",
        code: null,
        title: "How to Study at University: A First-Semester System That Works",
        subtitle: "Replace secondary-school cramming with a repeatable weekly study routine",
        domain: "Study Skills",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 45000,
        tags: ["Study Skills", "Freshers", "Independent Learning", "Study Routine", "100L"],
        description: "University rewards independent work, and many freshers keep using a method built for supervised secondary school. This pack sets out a weekly system: preparing before lectures, processing notes after them, and revising in spaced cycles instead of one desperate week.",
        outcomes: [
            "Explain how university assessment differs from secondary-school assessment.",
            "Build a weekly timetable that covers all courses without cramming.",
            "Use pre-lecture, during-lecture and post-lecture routines.",
            "Choose study techniques supported by evidence rather than comfort."
        ],
        sections: [
            {
                heading: "What changed",
                intro: "At university you are responsible for noticing what you do not understand.",
                bullets: [
                    "Lectures cover selected material; reading and practice fill the gaps.",
                    "Assessment is often cumulative and less predictable than WAEC-style papers.",
                    "Nobody checks your notes weekly, so weaknesses surface late.",
                    "Continuous assessment, assignments and attendance carry marks.",
                    "The volume is larger, so passive reading cannot keep pace.",
                    "A system beats motivation: you need a routine that works on bad days."
                ]
            },
            {
                heading: "The weekly cycle",
                intro: "Treat each course as a cycle rather than a single event.",
                numbered: [
                    "Before the lecture, skim the topic for ten minutes and write two questions.",
                    "During the lecture, capture structure and examples, not a transcript.",
                    "Within a day, rewrite the notes in your own words and fill gaps from a textbook.",
                    "Two days later, test yourself without notes.",
                    "At the weekend, do practice questions and update your weak-topic list.",
                    "Before the next lecture, review the previous week for five minutes."
                ],
                callout: {
                    title: "The two-day rule",
                    body: "If you have not revisited a lecture within two days, you are effectively learning it again from scratch. Short, early reviews save hours later."
                }
            },
            {
                heading: "Techniques that earn their place",
                intro: "Use methods with evidence behind them and drop techniques that only feel productive.",
                bullets: [
                    "Retrieval practice: close the book and write what you remember.",
                    "Spaced repetition: revisit at increasing intervals rather than rereading repeatedly.",
                    "Interleaving: mix problem types so you learn to choose a method, not just apply one.",
                    "Elaboration: explain why a fact is true and connect it to what you know.",
                    "Avoid highlighting as a primary method; it produces recognition, not recall.",
                    "Study in 40-minute blocks with short breaks and a phone out of reach."
                ]
            }
        ],
        practice: [
            { q: "Why is rereading a weak study method?", a: "It creates a feeling of familiarity without testing retrieval, so it produces weak long-term memory." },
            { q: "What is interleaving?", a: "Mixing different problem types or topics in one study session so learners practise choosing the right approach." },
            { q: "Name two things to do within 24 hours of a lecture.", a: "Rewrite notes in your own words and self-test on the main points without notes." },
            { q: "Why does a study timetable beat studying when motivated?", a: "It removes the need to decide and protects study time on low-motivation days." },
            { q: "How should you handle a topic you do not understand?", a: "Write a specific question, consult the recommended text, then ask your lecturer or course rep, and record the answer." }
        ],
        checklist: [
            "Draw a weekly timetable with fixed study blocks for every course.",
            "Write your lecture routine in three steps and follow it for one week.",
            "Choose two evidence-based techniques and use them for seven days.",
            "Create a weak-topic list and update it weekly.",
            "Try one 40-minute focus block with the phone switched off.",
            "Review the week every Sunday and adjust the plan.",
            "Compare notes with a coursemate and fill one gap each."
        ]
    },
    {
        slug: "note-taking-and-lecture-skills",
        code: null,
        title: "Note-Taking and Lecture Skills: Capture Ideas, Not Sentences",
        subtitle: "A practical note system for fast lecturers, crowded halls and heavy courses",
        domain: "Study Skills",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 40000,
        tags: ["Note Taking", "Lectures", "Cornell Method", "Study Skills", "100L"],
        description: "Writing every word is impossible and unnecessary. This pack teaches structural note-taking, the Cornell layout, abbreviation systems and a post-lecture consolidation routine that turns messy notes into usable revision material.",
        outcomes: [
            "Take structured notes that show relationships between ideas.",
            "Use the Cornell method and effective abbreviations under time pressure.",
            "Identify key points, examples and lecturer cues.",
            "Consolidate notes within a day so they remain useful."
        ],
        sections: [
            {
                heading: "Listen for structure",
                intro: "Lecturers signal importance. Learn the signals and you can take fewer, better notes.",
                bullets: [
                    "Cues: 'there are three types', 'the key point is', 'note this', 'in contrast'.",
                    "Record headings and sub-points before details.",
                    "Capture definitions, formulas, examples and the lecturer's emphasis.",
                    "Leave space for gaps rather than guessing; mark them with a question symbol.",
                    "Do not copy slides word for word if they will be shared; note what the lecturer adds.",
                    "If you miss a point, write the heading and move on - keep following the argument."
                ]
            },
            {
                heading: "The Cornell layout",
                intro: "It is popular because it separates recording from reviewing.",
                bullets: [
                    "Divide the page: a narrow cue column on the left, a wide notes column, and a summary strip at the bottom.",
                    "During the lecture, write notes in the wide column.",
                    "Within 24 hours, write keywords and questions in the cue column.",
                    "Write a two-sentence summary at the bottom.",
                    "Cover the notes column and use the cues to test yourself.",
                    "The layout works on paper and in any notes app with a table."
                ],
                callout: {
                    title: "Fewer words, more structure",
                    body: "A page of well-indented headings with six clear points is more useful than three pages of unreadable sentences."
                }
            },
            {
                heading: "Abbreviations and consolidation",
                intro: "Notes are for you, but they must still be readable a month later.",
                bullets: [
                    "Agree on abbreviations for your course: define them on the first page.",
                    "Use symbols consistently: arrows for causation, therefore, versus and increase.",
                    "Rewrite key ideas in your own words; this is where learning happens.",
                    "Add one worked example per concept.",
                    "Link today's notes to previous topics with references.",
                    "Convert one page of notes into five flashcard questions each week."
                ]
            }
        ],
        practice: [
            { q: "What are the three sections of a Cornell notes page?", a: "Cue column, notes column and summary section." },
            { q: "Why should you avoid transcribing a lecture word for word?", a: "It prevents you from processing the argument and slows you down, so you miss connections and later points." },
            { q: "Give three lecturer cues that signal important content.", a: "'The key point is', 'there are three types' and 'note this'. Emphasis, repetition and diagrams also signal importance." },
            { q: "What should you do within 24 hours of a lecture?", a: "Review and rewrite notes in your own words, fill gaps and write cue questions." },
            { q: "How do you handle a missed point during a fast lecture?", a: "Mark the gap with a symbol, keep following the structure, and fill the gap afterwards from a textbook or a coursemate." }
        ],
        checklist: [
            "Set up one Cornell page for each of three courses.",
            "Define ten abbreviations for your most technical course.",
            "Attend two lectures using the structure-first method.",
            "Consolidate each set of notes within 24 hours for one week.",
            "Convert one lecture into five flashcard questions.",
            "Compare notes with a coursemate to check for gaps.",
            "Review a month-old note and identify what makes it hard to use."
        ]
    },
    {
        slug: "exam-preparation-and-revision",
        code: null,
        title: "Exam Preparation and Revision: A Four-Week Plan That Holds Up",
        subtitle: "Plan, practise and manage exam-day pressure without last-minute panic",
        domain: "Study Skills",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 45000,
        tags: ["Exam Preparation", "Revision", "Study Plan", "Exam Technique", "100L"],
        description: "This pack gives you a four-week revision architecture, a way to prioritise courses by risk and weight, and exam-hall technique for multiple-choice, theory and calculation papers. It also covers the practical side: materials, timing and the night before.",
        outcomes: [
            "Build a four-week revision plan prioritised by course risk.",
            "Use spaced testing instead of rereading slides.",
            "Apply paper-specific exam technique for objective, theory and calculation questions.",
            "Manage exam anxiety and the 24 hours before a paper."
        ],
        sections: [
            {
                heading: "Prioritise before you plan",
                intro: "Not every course deserves equal time. Rank them by consequence and current weakness.",
                bullets: [
                    "List every course with its credit unit and exam date.",
                    "Rate your current confidence from one to five with evidence, not feeling.",
                    "Compute a simple priority score: credit units times the gap between confidence and five.",
                    "Give the highest scores more blocks, but never abandon a course entirely.",
                    "Protect the courses with early exam dates from being crowded out.",
                    "Put the plan on paper where you can see it daily."
                ]
            },
            {
                heading: "The four-week architecture",
                intro: "Spread the work so the final week is consolidation, not first-time learning.",
                numbered: [
                    "Week four before: skim all syllabi, gather materials, write topic checklists.",
                    "Week three: cover the weakest high-priority topics, one past question per course.",
                    "Week two: active recall across all courses, timed sections, fix repeated errors.",
                    "Week one: full past papers under exam conditions, then targeted repair only.",
                    "Each day: two or three courses maximum, alternating heavy and lighter subjects.",
                    "Last 48 hours: review summaries, formula sheets and error logs. No new topics."
                ],
                callout: {
                    title: "Test, do not reread",
                    body: "Rereading creates familiarity. Closing the book and writing from memory creates the retrieval skill the exam actually requires."
                }
            },
            {
                heading: "In the hall",
                intro: "Exam technique is worth marks independent of knowledge.",
                bullets: [
                    "Read all instructions and check the number of questions and sections.",
                    "Budget time per question and keep a few minutes for review.",
                    "Answer the easiest questions first to secure marks and settle nerves.",
                    "For objective questions, answer every item unless there is a penalty for guessing.",
                    "For theory, define terms, structure with paragraphs and use examples.",
                    "For calculations, show method, units and a final statement. Box your answer."
                ],
                callout: {
                    title: "If you blank",
                    body: "Write the question in your own words, list what you know about the topic and start with the definition. Motion usually returns recall."
                }
            }
        ],
        practice: [
            { q: "Why is a confidence rating with evidence better than a feeling?", a: "Evidence such as past-question scores prevents overconfidence and targets study where marks are actually at risk." },
            { q: "What should the last 48 hours before an exam contain?", a: "Review of summaries, formula sheets and an error log. No new topics and no all-night cramming." },
            { q: "How should you use a past paper?", a: "First as a timed diagnostic under exam conditions, then as a source of an error log that drives targeted repair." },
            { q: "Give two exam-hall strategies for theory papers.", a: "Plan a brief outline before writing, and define key terms early with a concrete example." },
            { q: "Why is it risky to study only one course for days?", a: "Other courses decay through disuse, and the schedule may not leave time to recover them." }
        ],
        checklist: [
            "List every course with credit units and exam dates.",
            "Rate your confidence with evidence from a past question.",
            "Build the four-week plan on paper.",
            "Complete one timed past paper per course.",
            "Start an error log and update it after each practice.",
            "Prepare a one-page formula and definition sheet per course.",
            "Rehearse exam-day logistics: venue, time, materials and transport."
        ]
    },
    {
        slug: "time-management-and-procrastination",
        code: null,
        title: "Time Management for Students: Beat Procrastination Without Hating Yourself",
        subtitle: "Practical systems for a timetable that survives real campus life",
        domain: "Study Skills",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 40000,
        tags: ["Time Management", "Procrastination", "Productivity", "Study Skills", "100L"],
        description: "Most procrastination is not laziness; it is avoidance of ambiguity, fear or exhaustion. This pack explains why we delay, then gives a practical system: fixed commitments, priority tasks, time blocks and honest weekly reviews.",
        outcomes: [
            "Identify the main causes of your own procrastination.",
            "Build a weekly plan around fixed commitments and protected study blocks.",
            "Break large tasks into next actions that can be started in ten minutes.",
            "Run a weekly review that improves the plan instead of abandoning it."
        ],
        sections: [
            {
                heading: "Why we delay",
                intro: "Procrastination is an emotional regulation problem more often than a scheduling one.",
                bullets: [
                    "Task is vague: 'read biology' has no clear first action.",
                    "Task feels threatening: fear of doing it badly leads to not starting.",
                    "Task is boring and the phone is entertaining.",
                    "Energy is low because of poor sleep or irregular meals.",
                    "Perfectionism turns a 200-word draft into a blocked project.",
                    "Name the cause honestly; the fix differs for each one."
                ]
            },
            {
                heading: "The planning system",
                intro: "Keep it simple enough to maintain on a bad week.",
                numbered: [
                    "List fixed commitments: lectures, labs, fellowship, work, travel.",
                    "Block sleep, meals and exercise first; they are not optional leftovers.",
                    "Add study blocks for your highest-priority courses.",
                    "Each block gets one specific outcome, written as a verb.",
                    "Keep a capture list for new tasks instead of acting on them immediately.",
                    "Review the week on Sunday and adjust one thing only."
                ],
                callout: {
                    title: "Two-minute start",
                    body: "Commit to two minutes of the task. Starting is the hard part; momentum usually follows. If it does not, you have learned the task needs to be broken down further."
                }
            },
            {
                heading: "Protecting focus",
                intro: "Attention is the scarce resource, not time.",
                bullets: [
                    "Phone on silent, out of sight, or in another room during a block.",
                    "Use a 40-minute block with a five-minute break; longer only if genuinely absorbed.",
                    "Batch messaging and social media into defined windows.",
                    "Study in the library or a quiet classroom if the hostel is chaotic.",
                    "Say no to low-value commitments with a specific alternative time.",
                    "Track actual study hours for one week; estimates are usually inflated."
                ]
            }
        ],
        practice: [
            { q: "Give three causes of procrastination.", a: "Vague tasks, fear of failure and low energy. Boredom and perfectionism are also common." },
            { q: "What makes a good study block outcome?", a: "A specific, achievable action such as 'solve five quadratic problems', not 'study maths'." },
            { q: "Why schedule sleep and meals before study?", a: "They are prerequisites for attention; treating them as leftovers produces unreliable study time." },
            { q: "What is the two-minute start?", a: "Committing to begin a task for two minutes to overcome the initial resistance to starting." },
            { q: "How should you respond when a weekly plan fails?", a: "Review the cause, adjust one element and continue. Abandoning the plan guarantees no improvement." }
        ],
        checklist: [
            "List all fixed commitments for the week.",
            "Write your top three procrastination triggers.",
            "Create five specific study-block outcomes.",
            "Track actual study hours for seven days.",
            "Try the two-minute start on the task you most avoid.",
            "Batch social media into two windows per day.",
            "Run one Sunday review and change one thing."
        ]
    },
    {
        slug: "academic-writing-and-referencing",
        code: null,
        title: "Academic Writing and Referencing: Say It Clearly, Cite It Properly",
        subtitle: "Structure, argument and citations for assignments that would otherwise lose marks",
        domain: "Study Skills",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 45000,
        tags: ["Academic Writing", "Referencing", "Plagiarism", "APA", "Assignments", "100L"],
        description: "Marks are lost for the same reasons every semester: no clear argument, weak structure, quotation without citation and padding. This pack covers essay structure, paragraph logic, APA-style citation, paraphrasing and proofreading.",
        outcomes: [
            "Plan and structure an academic essay with a clear thesis.",
            "Write paragraphs that make one point and support it with evidence.",
            "Cite sources correctly in APA style and paraphrase without plagiarising.",
            "Proofread for clarity, grammar and consistency."
        ],
        sections: [
            {
                heading: "Structure before style",
                intro: "An academic assignment answers a question with a reasoned argument.",
                bullets: [
                    "Introduction: context, the question, your thesis and the route of the essay.",
                    "Body: one point per paragraph, each supported by evidence and explanation.",
                    "Conclusion: restate the answer, not new arguments.",
                    "Use headings when the assignment is long and permits them.",
                    "Define key terms early, especially contested ones.",
                    "Aim for clarity over impressive vocabulary."
                ],
                callout: {
                    title: "The thesis test",
                    body: "Read your introduction alone. Can a stranger state your position? If not, your thesis is not yet doing its job."
                }
            },
            {
                heading: "Citation and plagiarism",
                intro: "Referencing is not decoration; it lets a reader verify your evidence and distinguishes your ideas from others'.",
                bullets: [
                    "In-text citation, APA style: (Author, Year) or Author (Year).",
                    "Reference list entries: author, year, title, source and access details where required.",
                    "Cite page numbers for direct quotations.",
                    "Paraphrase by understanding, closing the source and writing in your own structure.",
                    "Copying without citation is plagiarism, whether or not you intended it.",
                    "Keep a working reference list while writing, not after."
                ]
            },
            {
                heading: "Editing and proofreading",
                intro: "Editing is where average drafts become good assignments.",
                numbered: [
                    "Put the draft aside for a few hours before editing.",
                    "Check that every paragraph has one clear point.",
                    "Read aloud to catch awkward or run-on sentences.",
                    "Verify every citation and reference entry.",
                    "Check formatting, font, spacing and word count.",
                    "Get one reader to explain your argument back to you."
                ],
                callout: {
                    title: "Common killers",
                    body: "No clear thesis, unsupported claims, long quotations doing the thinking, and references that do not match in-text citations."
                }
            }
        ],
        practice: [
            { q: "What is the function of a thesis statement?", a: "It states the central claim the essay will defend, giving the reader a clear position to follow." },
            { q: "How do you paraphrase without plagiarising?", a: "Understand the passage, close the source, rewrite the idea in your own words and structure, then cite the source." },
            { q: "Write an APA in-text citation for a 2021 book by Ada Obi.", a: "(Obi, 2021) or Obi (2021) if used as part of the sentence." },
            { q: "Why is a long quotation a weakness unless analysed?", a: "It replaces your reasoning with someone else's words; marks are earned by analysing the evidence." },
            { q: "Name three proofreading checks.", a: "Paragraph focus, sentence clarity and citation accuracy. Formatting and word count also count." }
        ],
        checklist: [
            "Write a thesis statement for one assignment question.",
            "Outline three body paragraphs with evidence for each.",
            "Draft a 500-word essay and self-edit it twice.",
            "Build a reference list in APA style with five sources.",
            "Practise paraphrasing one paragraph and compare with the original.",
            "Read your draft aloud and mark every sentence that stumbles.",
            "Ask a coursemate to summarise your argument from the draft."
        ]
    },
    {
        slug: "memory-and-active-recall",
        code: null,
        title: "Memory and Active Recall: Remember More With Less Rereading",
        subtitle: "How memory actually works, and how to study in line with it",
        domain: "Study Skills",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 40000,
        tags: ["Memory", "Active Recall", "Spaced Repetition", "Flashcards", "100L"],
        description: "Memory is not a recording device. This pack explains encoding, consolidation and retrieval, then converts that into concrete practice: retrieval questions, spaced schedules, flashcards done correctly and techniques for formulas and vocabulary.",
        outcomes: [
            "Explain encoding, consolidation and retrieval in simple terms.",
            "Design retrieval questions instead of highlighting notes.",
            "Build and use a spaced-repetition schedule for a semester.",
            "Use mnemonics and elaboration without relying on them alone."
        ],
        sections: [
            {
                heading: "How memory works",
                intro: "Information must be encoded, consolidated and retrievable. Each stage can fail.",
                bullets: [
                    "Encoding depends on attention and meaningful processing.",
                    "Consolidation happens over time, especially with sleep.",
                    "Retrieval strengthens memory more than rereading.",
                    "Cues help retrieval; learning with varied contexts creates more cues.",
                    "Forgetting is normal and can be countered with spaced review.",
                    "Stress and sleep deprivation impair all three stages."
                ]
            },
            {
                heading: "Retrieval in practice",
                intro: "Turn every page of notes into questions.",
                bullets: [
                    "Write questions on the left of the page and answers on the right.",
                    "Close the notes and answer from memory before checking.",
                    "Mark each attempt: confident, shaky or failed.",
                    "Review failed items the next day, shaky items in three days.",
                    "Mix old and new questions in one session.",
                    "Use past questions as retrieval practice, not just as prediction."
                ],
                callout: {
                    title: "The flashcard rules",
                    body: "One fact per card, a question on the front and a short answer on the back. If a card takes more than ten seconds to understand, split it."
                }
            },
            {
                heading: "Spacing, sleep and mnemonics",
                intro: "Timing matters as much as technique.",
                bullets: [
                    "Review after one day, three days, one week, two weeks and one month.",
                    "Short frequent sessions beat one long session.",
                    "Sleep after study supports consolidation; all-nighters trade memory for anxiety.",
                    "Mnemonics help with lists but do not replace understanding.",
                    "Elaboration - asking why and how - creates stronger, more flexible memories.",
                    "Explain a topic aloud; gaps become obvious immediately."
                ]
            }
        ],
        practice: [
            { q: "Why is retrieval stronger than rereading?", a: "Retrieval requires reconstructing information, which strengthens memory traces and reveals gaps; rereading only creates familiarity." },
            { q: "Give a workable spaced-review schedule.", a: "Review one day, three days, one week, two weeks and one month after first learning." },
            { q: "What is wrong with a flashcard containing a whole paragraph?", a: "It is too complex to retrieve quickly; one fact or concept per card works better." },
            { q: "How does sleep affect memory?", a: "Sleep supports consolidation, stabilising and integrating newly learned information." },
            { q: "When are mnemonics useful?", a: "For ordered lists, names or sequences; they aid recall but should be paired with understanding." }
        ],
        checklist: [
            "Convert one lecture into ten retrieval questions.",
            "Test yourself with notes closed and mark each answer.",
            "Build a spaced-review schedule for one week.",
            "Create 15 single-fact flashcards.",
            "Explain one topic aloud from memory for two minutes.",
            "Track sleep for a week and note its effect on recall.",
            "Re-test a topic after seven days and compare with day one."
        ]
    },
    {
        slug: "unizik-fresher-survival-guide",
        code: null,
        title: "UNIZIK Fresher Survival Guide: Registration, Campus and First Semester",
        subtitle: "What to do in your first weeks, in the order that actually matters",
        domain: "Campus Life",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 45000,
        tags: ["UNIZIK", "Freshers", "Registration", "Campus Life", "Orientation", "100L"],
        description: "First semester is easier when you know the sequence: documents, registration, course allocation, departmental orientation and the small habits that prevent avoidable problems. This pack is a practical checklist, not a rumour collection.",
        outcomes: [
            "Assemble the documents and steps needed for registration.",
            "Plan the first two weeks to avoid deadline pressure.",
            "Locate the key offices and know which problems they solve.",
            "Build habits that protect your academic standing from day one."
        ],
        sections: [
            {
                heading: "The first two weeks",
                intro: "Registration delays cause stress later. Move early and keep copies of everything.",
                numbered: [
                    "Confirm your admission status and collect the required documents listed by the university.",
                    "Complete screening and pay approved fees through official channels only.",
                    "Complete course registration and confirm your course list with your department.",
                    "Attend departmental and faculty orientation; note deadlines and contact persons.",
                    "Meet your course rep and level adviser, and join the official class channel.",
                    "Locate the library, ICT centre, health centre and your lecture venues before the first week ends."
                ],
                callout: {
                    title: "Official channels only",
                    body: "Pay fees through the university's official platform. Anyone who offers to 'fast-track' registration for cash is a risk, not a shortcut."
                }
            },
            {
                heading: "Know the offices",
                intro: "Most first-year problems are resolved faster when you go to the right office with the right documents.",
                bullets: [
                    "Departmental office: course registration issues, results, lecturer contacts.",
                    "Faculty office: academic records and faculty-level approvals.",
                    "Bursary: fee payment confirmation and receipts.",
                    "ICT centre: portal access and login problems.",
                    "Health centre: medical attention and sick notes.",
                    "Student affairs: hostel matters, welfare and student organisations."
                ]
            },
            {
                heading: "Habits that protect your semester",
                intro: "Small routines prevent most avoidable academic problems.",
                bullets: [
                    "Attend lectures and sign attendance where required.",
                    "Keep receipts, registration slips and screenshots in one folder.",
                    "Submit assignments on time and keep a copy.",
                    "Check official notice boards and portals weekly.",
                    "Learn the course outline and assessment weightings early.",
                    "Ask questions in class; anonymity disappears quickly at university."
                ]
            }
        ],
        practice: [
            { q: "List five documents commonly required for fresher registration.", a: "Admission letter, O-level result, JAMB result or admission slip, birth certificate or age declaration, and passport photographs. Requirements vary, so confirm with your department." },
            { q: "Why should you keep receipts and screenshots?", a: "They are evidence if a payment or registration is later disputed or not reflected in the system." },
            { q: "Which office handles portal login problems?", a: "The university ICT centre, sometimes with support from your department." },
            { q: "Why meet your course rep early?", a: "They relay schedule changes, deadlines and class information, and can direct you to the right staff." },
            { q: "What should you do if a registration deadline is missed?", a: "Go to your department immediately, explain the situation in person, and ask about the official remedy rather than relying on informal fixes." }
        ],
        checklist: [
            "Assemble all admission and registration documents in one folder.",
            "Complete screening and fee payment through official channels.",
            "Confirm your registered courses with your department.",
            "Attend orientation and record key contacts.",
            "Save the department, faculty and ICT contacts in your phone.",
            "Walk your timetable route once before lectures begin.",
            "Create a receipts folder on your phone and in hard copy."
        ]
    },
    {
        slug: "hostel-and-off-campus-living",
        code: null,
        title: "Hostel and Off-Campus Living: Rent, Roommates and Realistic Costs",
        subtitle: "Choose accommodation with your eyes open and live with fewer conflicts",
        domain: "Campus Life",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 40000,
        tags: ["Accommodation", "Hostel", "Off-Campus", "Roommates", "Campus Life", "100L"],
        description: "Accommodation decisions affect cost, safety, study time and stress. This pack covers comparing hostel and off-campus options, inspecting a lodge before paying, understanding rent and agency fees, and managing shared living without daily conflict.",
        outcomes: [
            "Compare hostel and off-campus options on cost, safety and study conditions.",
            "Inspect accommodation and verify ownership before paying.",
            "Budget for hidden accommodation costs.",
            "Set shared-living rules that prevent common conflicts."
        ],
        sections: [
            {
                heading: "Choose on criteria, not pressure",
                intro: "Accommodation is a package: rent, transport, utilities, security and study environment.",
                bullets: [
                    "Hostel advantages: proximity, campus security, less commuting. Disadvantages: crowding, rules and limited privacy.",
                    "Off-campus advantages: space and flexibility. Disadvantages: transport cost, landlord risk and security variability.",
                    "Calculate total monthly cost, not just rent.",
                    "Consider distance to your faculty, not just to the main gate.",
                    "Check water, power and network coverage at different times of day.",
                    "Decide before the last week of vacation; panic raises both price and risk."
                ]
            },
            {
                heading: "Inspect and verify",
                intro: "Never pay for a room you have not entered, and never pay without documentation.",
                numbered: [
                    "Visit in person and inspect the room, toilet, water source and wiring.",
                    "Speak to current tenants about the landlord, security and interruptions.",
                    "Confirm ownership or the agent's authority to collect rent.",
                    "Read the tenancy agreement, including duration, notice and refund terms.",
                    "Pay through a traceable method and collect a signed receipt.",
                    "Photograph the room's condition at handover."
                ],
                callout: {
                    title: "The too-cheap warning",
                    body: "A rent far below the area average is either misrepresented or unsafe. Inspect with a friend and never be rushed by 'another person is paying today'."
                }
            },
            {
                heading: "Living with others",
                intro: "Most roommate conflict is unspoken expectation, not malice.",
                bullets: [
                    "Agree on cleaning rotas, cooking, noise hours and guest rules in the first week.",
                    "Agree on how shared bills are collected and recorded.",
                    "Respect boundaries around food, clothes and personal items.",
                    "Raise a problem early and privately rather than accumulating resentment.",
                    "Secure your valuables; familiarity does not remove risk.",
                    "Keep an emergency contact and know the nearest health facility."
                ]
            }
        ],
        practice: [
            { q: "Name three costs beyond rent.", a: "Transport, electricity or fuel, water, security levies, and replacement of shared items." },
            { q: "Why inspect accommodation in person?", a: "Listings and photographs can misrepresent space, water, security and condition, and payment without inspection is irrecoverable." },
            { q: "What should a tenancy agreement cover?", a: "Duration, rent and payment schedule, obligations for repairs, notice period, refund terms and conditions for termination." },
            { q: "What is the best way to raise a roommate problem?", a: "Early, privately and specifically, proposing a rule or solution rather than making it personal." },
            { q: "How can you reduce risk when paying rent?", a: "Verify ownership, use a traceable payment method, obtain a signed receipt and keep a copy of the agreement." }
        ],
        checklist: [
            "Compare two accommodation options on total cost.",
            "Visit and inspect before any payment.",
            "Speak to at least two current tenants.",
            "Read the agreement and photograph it.",
            "Photograph the room at handover.",
            "Agree shared rules and a cleaning rota in week one.",
            "Save emergency and campus security contacts."
        ]
    },
    {
        slug: "campus-safety-and-scam-awareness",
        code: null,
        title: "Campus Safety and Scam Awareness: Protect Your Money and Yourself",
        subtitle: "Practical habits against fraud, theft and unsafe situations on and around campus",
        domain: "Campus Life",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 40000,
        tags: ["Campus Safety", "Fraud", "Scams", "Security", "100L"],
        description: "Students lose money to fake agents, fake accommodation, fake scholarship portals and social-engineering calls. This pack covers how common scams work, how to verify before paying, safe meet-up habits and what to do after an incident.",
        outcomes: [
            "Recognise common student-targeted scams and the pressure tactics they use.",
            "Verify a person, offer or portal before sending money.",
            "Apply personal-safety habits for late travel and meet-ups.",
            "Report incidents correctly and preserve evidence."
        ],
        sections: [
            {
                heading: "How scams work",
                intro: "Fraud relies on urgency, authority and isolation. Break any one and the scam usually fails.",
                bullets: [
                    "Fake accommodation agents demand a deposit before inspection.",
                    "Fake scholarship or job portals charge an application or processing fee.",
                    "Impersonation calls claim to be from the bursary, your bank or a lecturer.",
                    "Fake buyers overpay and ask for a refund of the difference.",
                    "Investment schemes promise unrealistic daily returns and pay early members with later members' money.",
                    "Pressure to act immediately and secretly is the strongest warning sign."
                ],
                callout: {
                    title: "The pause rule",
                    body: "No legitimate transaction collapses because you took ten minutes to verify. If someone insists you cannot check, do not pay."
                }
            },
            {
                heading: "Verify before you pay",
                intro: "Verification is a process, not a feeling about the person.",
                numbered: [
                    "Confirm identity through an independent channel you found yourself.",
                    "Verify ownership or authority with the institution, landlord or employer.",
                    "Never pay into a personal account for an institutional fee.",
                    "Ask for a written receipt and keep records of the conversation.",
                    "Check the official website or portal rather than a link sent to you.",
                    "For goods, inspect before paying; for services, agree milestones."
                ]
            },
            {
                heading: "Personal safety and reporting",
                intro: "Most risk is managed by routine rather than by fear.",
                bullets: [
                    "Share your movement with a trusted friend when travelling late.",
                    "Use well-lit, populated routes and registered transport.",
                    "Meet buyers or sellers in public, busy locations during daylight.",
                    "Keep bank alerts on and never share your PIN or OTP with anyone.",
                    "Avoid displaying expensive items unnecessarily.",
                    "After an incident, report to campus security and the police, and preserve messages and receipts."
                ]
            }
        ],
        practice: [
            { q: "Name three pressure tactics used by scammers.", a: "Urgency, claimed authority and secrecy or isolation from people who could verify the offer." },
            { q: "Why is paying a deposit before inspecting accommodation risky?", a: "The property may not exist or the person may not be authorised to collect rent, and recovery is difficult." },
            { q: "How should you verify a scholarship offer?", a: "Check the official university or sponsor website and contact the institution through independently sourced contact details." },
            { q: "What should you do if you receive a suspicious call claiming to be your bank?", a: "Hang up and call the bank's official number yourself. Never share PINs, OTPs or card details." },
            { q: "What evidence should you preserve after a scam?", a: "Chats, call logs, account details, receipts and transaction references, along with a written timeline." }
        ],
        checklist: [
            "Save official university, bank and security numbers in your phone.",
            "Agree a late-travel check-in routine with a friend.",
            "Review your bank alert settings.",
            "Practise verifying one offer before paying.",
            "Learn where campus security is located.",
            "Write down the reporting steps for fraud.",
            "Talk through one scam example with a coursemate."
        ]
    },
    {
        slug: "student-clubs-leadership-and-volunteering",
        code: null,
        title: "Clubs, Leadership and Volunteering: Build Skills Without Losing Your Semester",
        subtitle: "Choose activities that develop you and still leave room for your degree",
        domain: "Campus Life",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 40000,
        tags: ["Clubs", "Leadership", "Volunteering", "Soft Skills", "Campus Life", "100L"],
        description: "Extracurricular activity can build real skills or quietly consume your study time. This pack helps you choose a small number of commitments deliberately, contribute well, and record what you learn in a way that later helps with internships and job applications.",
        outcomes: [
            "Choose activities aligned with your goals and available time.",
            "Contribute effectively in a team and handle responsibility reliably.",
            "Balance leadership roles with academic workload.",
            "Record achievements and skills for future applications."
        ],
        sections: [
            {
                heading: "Choose deliberately",
                intro: "Depth in two activities beats shallow membership in eight.",
                bullets: [
                    "Decide what you want to develop: communication, organisation, technical skill or a network.",
                    "Attend a meeting before committing to a role.",
                    "Ask current members how much time the role actually takes.",
                    "Check that meetings do not clash with core lectures or labs.",
                    "Prefer organisations with clear structures and real projects.",
                    "Leave gracefully if an activity is consuming your study time."
                ]
            },
            {
                heading: "Work well in a team",
                intro: "Reliability is the most valued trait in student teams.",
                bullets: [
                    "Confirm what you own and when it is due.",
                    "Communicate early when a deadline is at risk.",
                    "Write brief minutes with decisions and owners.",
                    "Do the unglamorous tasks sometimes; it builds trust.",
                    "Give credit publicly and correct privately.",
                    "Document events with photos and simple reports for continuity."
                ],
                callout: {
                    title: "Leadership is not a title",
                    body: "A treasurer who keeps clean records and a volunteer who shows up consistently are doing more leadership than a titleholder who disappears."
                }
            },
            {
                heading: "Record what you learn",
                intro: "Experience that cannot be described is hard to use later.",
                bullets: [
                    "Keep a simple log: role, dates, tasks, results and skills used.",
                    "Quantify where possible: number of participants, funds raised, sessions organised.",
                    "Collect one or two references from supervisors.",
                    "Save certificates and photographs in a folder.",
                    "Reflect on one failure each semester and what you changed.",
                    "Turn the log into CV bullet points while details are fresh."
                ]
            }
        ],
        practice: [
            { q: "How many activities should a first-year student join?", a: "A small number - often one or two meaningful commitments - so that participation is real and study time is protected." },
            { q: "Why write minutes with owners?", a: "They turn discussion into accountable action and prevent tasks from being forgotten or duplicated." },
            { q: "What should a contribution log contain?", a: "Role, dates, tasks, measurable results, skills used and contacts for references." },
            { q: "How do you leave a role responsibly?", a: "Give notice, hand over documentation and contacts, and complete outstanding commitments." },
            { q: "Why quantify achievements?", a: "Numbers make contributions concrete and credible in CVs and interviews." }
        ],
        checklist: [
            "Write the three skills you most want to develop.",
            "Attend one meeting before joining.",
            "Choose no more than two commitments for the semester.",
            "Create a contribution log with dates and results.",
            "Take on one specific responsibility and deliver it.",
            "Collect contact details for a reference.",
            "Review your commitments at mid-semester and adjust."
        ]
    },
    {
        slug: "peer-pressure-and-social-life",
        code: null,
        title: "Peer Pressure and Social Life: Keep Your Friends, Keep Your Standards",
        subtitle: "Make your own decisions about money, alcohol, relationships and belonging",
        domain: "Campus Life",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 40000,
        tags: ["Peer Pressure", "Social Life", "Boundaries", "Belonging", "100L"],
        description: "Freshers face new freedoms and new pressure at the same time. This pack explains how group influence works, gives scripts for refusing without drama, and helps you build friendships that support rather than undermine your goals.",
        outcomes: [
            "Explain how conformity and social influence affect decisions.",
            "Recognise pressure around money, alcohol, cultism and relationships.",
            "Use clear, low-conflict refusal scripts.",
            "Build a social circle that supports your academic and personal goals."
        ],
        sections: [
            {
                heading: "Why pressure works",
                intro: "Humans are wired to avoid exclusion, and that wiring can override judgement.",
                bullets: [
                    "We look to others when unsure, especially in a new environment.",
                    "We conform to avoid standing out or being rejected.",
                    "Small requests escalate; agreeing once makes agreeing again easier.",
                    "Groups create shared stories about what is normal.",
                    "Being tired, lonely or financially stretched increases susceptibility.",
                    "Naming the pressure reduces its power."
                ]
            },
            {
                heading: "Know your lines",
                intro: "Decide your standards before the moment and rehearse simple refusals.",
                bullets: [
                    "Direct: 'No, I am not doing that.'",
                    "Redirect: 'I am not drinking, but I will still come for the music.'",
                    "Delay: 'I need to think about it; I will get back to you.'",
                    "Exit: 'I have to go now.'",
                    "Broken record: repeat the same short answer without justifying.",
                    "Refuse cultism and criminal groups absolutely; there is no safe level of involvement."
                ],
                callout: {
                    title: "Say no to money pressure",
                    body: "Never borrow to match someone else's spending. A friend who mocks your budget is describing their values, not your worth."
                }
            },
            {
                heading: "Build good friendships",
                intro: "The strongest protection against bad influence is a small group with shared standards.",
                bullets: [
                    "Choose friends you would be comfortable introducing to your parents.",
                    "Look for consistency between what people say and do.",
                    "Keep at least one friend who will tell you the truth.",
                    "Invest in people who celebrate your progress rather than compete with it.",
                    "Keep contact with family or a mentor outside campus.",
                    "Ask for help early if you feel trapped or threatened."
                ]
            }
        ],
        practice: [
            { q: "Why does conformity increase in new environments?", a: "Uncertainty makes people rely on others for cues about acceptable behaviour, and the need to belong is strong." },
            { q: "Give two refusal scripts.", a: "'No, I am not doing that' and 'I need to think about it; I will get back to you.'" },
            { q: "Why is a broken-record refusal effective?", a: "It gives no new argument to negotiate against and signals a settled decision." },
            { q: "What should you do if a friend is pressuring you financially?", a: "State your limit clearly, decline, and reconsider how much time you spend with someone who disregards it." },
            { q: "Why is cultism a hard no rather than a risk to manage?", a: "Involvement is criminal, violent and difficult to exit; there is no safe level of participation." }
        ],
        checklist: [
            "Write your personal non-negotiables in three lines.",
            "Rehearse two refusal lines aloud.",
            "Identify one friend who supports your goals.",
            "Set a weekly social budget and stick to it.",
            "Know the support contacts for counselling or security.",
            "Leave any group that repeatedly ignores your boundaries.",
            "Check in on a coursemate who seems isolated."
        ]
    },
    {
        slug: "academic-integrity-and-exam-rules",
        code: null,
        title: "Academic Integrity and Exam Rules: Pass Without Cheating",
        subtitle: "What misconduct looks like, why it is punished, and how to protect yourself",
        domain: "Campus Life",
        faculty: "General Studies (GST / CED)",
        department: "GST Directorate",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 40000,
        tags: ["Academic Integrity", "Exams", "Plagiarism", "Misconduct", "100L"],
        description: "Misconduct findings can end a programme faster than poor grades. This pack explains plagiarism, collusion, impersonation, exam-hall offences and the reasonable steps that protect you, including how to handle accidental similarity and how to study when you feel unprepared.",
        outcomes: [
            "Define plagiarism, collusion and fabrication with examples.",
            "Explain common exam-hall offences and their consequences.",
            "Protect yourself through correct citation and record keeping.",
            "Prepare adequately instead of relying on shortcuts."
        ],
        sections: [
            {
                heading: "What misconduct includes",
                intro: "Integrity rules cover anything that gives an unfair academic advantage or misrepresents your work.",
                bullets: [
                    "Plagiarism: presenting someone else's words or ideas without attribution.",
                    "Collusion: working with others on an individual assessment.",
                    "Fabrication: inventing data, results or references.",
                    "Contract cheating: submitting work written by another person or service.",
                    "Impersonation: sitting an examination on behalf of another student.",
                    "Exam offences: unauthorised materials, communicating during the paper, or refusing instructions from invigilators."
                ]
            },
            {
                heading: "Protecting yourself",
                intro: "Most accidental problems are avoided by good habits, not by knowing penalties.",
                bullets: [
                    "Cite as you write, not afterwards.",
                    "Quote exactly with quotation marks and a page reference.",
                    "Keep drafts and research notes to show the work is yours.",
                    "Do not share assignment files with coursemates; share explanations instead.",
                    "Follow the department's rules on collaborative work.",
                    "If you are unsure whether help is allowed, ask before submitting."
                ],
                callout: {
                  title: "AI tools",
                  body: "Check your department's policy first. If use is permitted, disclose it and verify every fact and citation yourself. If it is not permitted, do not use it - an acknowledgement does not convert a prohibited act into an allowed one."
                }
            },
            {
                heading: "Consequences and second chances",
                intro: "Penalties range from mark deductions to expulsion, and they follow you.",
                bullets: [
                    "Procedures usually include a report, an investigation and a panel hearing.",
                    "You are normally entitled to see the allegation and respond.",
                    "Honesty during a hearing usually matters more than a defensive denial.",
                    "A finding can affect scholarships, graduation and professional licensing.",
                    "Failing a course is recoverable; a misconduct record can be permanent.",
                    "Seek advice from the student affairs office or a staff adviser."
                ]
            }
        ],
        practice: [
            { q: "Define plagiarism.", a: "Presenting another person's words, ideas or data as your own without proper acknowledgement." },
            { q: "What is collusion?", a: "Unauthorised collaboration on an assessment intended to be completed individually." },
            { q: "How should you handle accidental similarity?", a: "Paraphrase properly, cite the source and, where required, discuss it with your lecturer before submission." },
            { q: "Why is honesty during a misconduct hearing important?", a: "It affects the panel's assessment of your conduct and can lead to a proportionate outcome, while dishonesty compounds the finding." },
            { q: "What is the safest approach to AI tools in assignments?", a: "Follow the department's written policy; if permitted, disclose the use and verify all content yourself." }
        ],
        checklist: [
            "Read your university's academic integrity policy.",
            "Learn your department's rules on collaboration.",
            "Practise citing three sources correctly while drafting.",
            "Keep drafts and notes for every assignment.",
            "Check the policy on AI and other digital assistance.",
            "Know the procedure for responding to an allegation.",
            "Plan a revision schedule so shortcuts are unnecessary."
        ]
    }
]
