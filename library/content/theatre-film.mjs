// Theatre & Film Studies: the department ZikShare archives most deeply.
//
// Archive entries record what public UNIZIK pages listed in a given year. The
// two source pages we recovered are no longer reachable (both return 404 as of
// 2026-10-22 after the university site restructure), so each entry names the
// page, its publication date and the retrieval date. The most recent entry is a
// COMPILED working map, not an official handout, and says so on the page.

const SOURCE_2018 = {
    source: 'unizik.edu.ng - Theatre & Film Studies course description (page dated 31 May 2018; original URL now returns 404)',
    url: 'https://unizik.edu.ng/faculties/arts/departments/theatre-and-film-studies/course-description/',
    retrieved: '2026-10-22',
    status: 'archived',
}

const SOURCE_2019 = {
    source: 'arts.unizik.edu.ng - Theatre Arts programme and course map (page dated 18 Oct 2019; original URL now returns 404)',
    url: 'https://arts.unizik.edu.ng/dept/theatre-arts/theatre-arts-programmes/',
    retrieved: '2026-10-22',
    status: 'archived',
}

const CURRENT = {
    year: '2025/2026',
    label: 'Compiled working map',
    status: 'current',
    source: 'Compiled by ZikShare from the archived 2018 and 2019 departmental pages plus the published stress areas; this is a working map, not an official handout',
    retrieved: '2026-10-22',
}

const ARCHIVE_NOTE = 'Year demarcation matters: a course code that existed in 2018 may have been renumbered, merged or dropped by 2019, and the department now also runs a film track. Read the year label before you rely on a code. The current entry below is a compiled map - take it to your course rep or the departmental office and confirm it before registration.'

const COMMON_DISCLAIMER = 'Archive means: this records what a public departmental page listed in that year. It is not a guarantee of the current curriculum, and ZikShare is not affiliated with UNIZIK.'

function archive(entries) {
    return {
        coverage: entries.map((e) => e.year).join('  •  '),
        note: ARCHIVE_NOTE,
        disclaimer: COMMON_DISCLAIMER,
        sessions: entries,
    }
}

export const THEATRE_FILM_PACKS = [
    {
        slug: "tha-101-traditional-african-theatre",
        code: "THA 101",
        title: "THA 101: Traditional African Theatre - Festival, Ritual and Performance",
        subtitle: "Read African festival theatre as a complete performance system, not as folklore",
        domain: "Theatre & Film Studies",
        faculty: "Faculty of Arts",
        department: "Theatre & Film Studies",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free
        tags: ["THA 101", "Traditional African Theatre", "Festival", "Ritual", "Performance", "100L"],
        description: "THA 101 is where the department teaches you that African theatre did not begin with a written script. This pack explains festival theatre as a total performance event - space, audience, music, costume, masquerade and participation - and shows you how to describe a performance you have witnessed with precision instead of vague praise.",
        outcomes: [
            "Define traditional African theatre and distinguish it from written dramatic literature.",
            "Analyse a festival performance using space, audience, performer, music, costume and participation.",
            "Explain how ritual structure shapes the organisation of an African festival.",
            "Describe the masquerade tradition without treating it as mere entertainment."
        ],
        sections: [
            {
                heading: "What counts as traditional African theatre",
                intro: "Traditional theatre is performance made by a community, for that community, in a form inherited and adapted rather than written down by a single author.",
                bullets: [
                    "The performance is usually tied to a calendar, a rite of passage or a season, not to a ticketed evening.",
                    "Text may be minimal; meaning is carried by movement, music, mask, costume and audience response.",
                    "There is no sharp line between performers and spectators: the community participates.",
                    "The performance often has a social function - purification, harvest thanksgiving, initiation, conflict resolution.",
                    "Continuity comes from apprenticeship and participation, not from published scripts."
                ],
                callout: {
                    title: "Avoid two mistakes",
                    body: "Do not treat African festival theatre as primitive entertainment, and do not romanticise it as untouched tradition. It changes with its community and has always absorbed new elements."
                }
            },
            {
                heading: "Festival as total theatre",
                intro: "Total theatre means every performance element carries meaning at once.",
                bullets: [
                    "Space: the market square, shrine, compound or village green is the stage, and its meaning changes the performance.",
                    "Music: drums and song cue entrances, control tempo and mark transitions.",
                    "Costume and mask: they identify status, spirit or character, and may transform the wearer.",
                    "Movement and dance: patterned movement carries narrative and community identity.",
                    "Audience: response, chorus and participation complete the performance.",
                    "Time: festivals often run for days, so duration itself is part of the form."
                ]
            },
            {
                heading: "Writing about a performance",
                intro: "Assessment rewards specific observation. Use this structure for any performance report.",
                numbered: [
                    "State what you saw, where and on what occasion.",
                    "Describe the performance space and how it was used.",
                    "Identify performers, costumes and masks, and what each communicated.",
                    "Analyse music and movement as structural devices, not decoration.",
                    "Describe audience participation and how it shaped the event.",
                    "Evaluate the performance's social purpose and your evidence for that claim."
                ]
            }
        ],
        practice: [
            { q: "Why is traditional African theatre often described as total theatre?", a: "Because music, dance, costume, mask, space and audience participation operate together as one performance system rather than as separate additions." },
            { q: "Give two social functions of a festival performance.", a: "Harvest thanksgiving and rite-of-passage initiation; purification and conflict resolution are also common." },
            { q: "What is the danger of treating masquerade as mere entertainment?", a: "It removes the spiritual, judicial and social meanings the masquerade carries for the community, producing a shallow and inaccurate account." },
            { q: "How does the performance space shape meaning?", a: "A shrine, market square or compound carries its own associations and determines sightlines, participation and the intimacy of the event." },
            { q: "Name three elements you would describe in a performance report.", a: "The space, the costumes and masks, and the music or movement patterns." }
        ],
        checklist: [
            "Write definitions of traditional theatre, ritual and festival in your own words.",
            "Attend or watch a recorded Nigerian festival performance and take structured notes.",
            "Draw a diagram of the performance space and annotate how it was used.",
            "Identify three ways the audience participated.",
            "Write a 300-word performance description with evidence for each claim.",
            "Read one article on African festival theatre and note its main argument.",
            "Take your performance report to a senior colleague for feedback."
        ],
        archive: archive([
            { ...SOURCE_2018, year: '2018', label: 'Archived course description', topics: [
                'THA 101 Traditional African Theatre (3 credits) described as non-written drama and festival-derived theatre in various African communities',
                'Emphasis on theatre "evolving from the festival in its various contexts and settings"',
                'No separate film-track foundation course listed at 100 level in this snapshot',
            ], changed: 'The 2018 page frames the course almost entirely around festival and community contexts.' },
            { ...SOURCE_2019, year: '2019', label: 'Archived programme listing', topics: [
                'THA 101 Traditional African Theatre, 3 credits, first semester, 100 level',
                'Course numbering: first digit = year, middle digits = stress area, last digits = serial',
                'Companion 100-level courses appear: THA 111, 131, 151, 153, 161, 112, 122, 132, 142, 152, 162',
            ], changed: 'The 2019 listing adds THA 122, THA 153 and THA 161 (Participation Orientation, 2 credits), which do not appear in the 2018 description.' },
            { ...CURRENT, topics: [
                'THA 101 remains the 100-level foundation in history and comparative theatre',
                'Department is now styled Theatre and Film Studies, so 100-level cohorts may take media-facing companions',
                'Confirm whether THA 161 Participation Orientation is still required in your own registration',
            ] },
        ]),
    },
    {
        slug: "tha-111-introduction-to-drama-and-theatre",
        code: "THA 111",
        title: "THA 111: Introduction to Drama and Theatre in the World",
        subtitle: "The concepts and vocabularies you need before every other theatre course",
        domain: "Theatre & Film Studies",
        faculty: "Faculty of Arts",
        department: "Theatre & Film Studies",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free
        tags: ["THA 111", "Drama", "Theatre", "World Theatre", "Introduction", "100L"],
        description: "This course exists to stop you using 'drama', 'theatre', 'performance' and 'play' as if they mean the same thing. The pack sets out the working distinctions, traces the move from ritual to built theatres, and gives you a vocabulary for discussing any performance tradition in the world.",
        outcomes: [
            "Distinguish drama as text from theatre as performance event.",
            "Trace the shift from ritual and festival performance to purpose-built theatre buildings.",
            "Identify the social conventions that shape performance in different periods.",
            "Use genre and structural terms accurately in written answers."
        ],
        sections: [
            {
                heading: "Four terms that are not synonyms",
                intro: "Precise vocabulary earns marks and prevents confused essays.",
                bullets: [
                    "Drama: the written or composed work, its structure, character and dialogue.",
                    "Theatre: the collaborative event, including performers, space, audience and technology.",
                    "Performance: the broader category of staged human action, including dance and ritual.",
                    "Play: usually a dramatic text; a production is one realisation of it.",
                    "Text and production can differ sharply: a director's choices are an interpretation, not a copy."
                ]
            },
            {
                heading: "From ritual to theatre house",
                intro: "The institution of theatre grew out of communal performance and accumulated its own conventions.",
                bullets: [
                    "Greek festival theatre: civic competition, masks, chorus and open-air amphitheatre.",
                    "Roman spectacle: larger structures, entertainment politics and a shift in audience composition.",
                    "Medieval religious drama: pageant wagons, guild cycles and church calendar.",
                    "Asian traditions: Noh, Kabuki and Sanskrit theatre developed their own conventions rather than following Europe.",
                    "African festival theatre retained participatory structures that European proscenium theatre reduced.",
                    "Each built form encodes a social relation between performer and audience."
                ],
                callout: {
                    title: "The proscenium is an argument",
                    body: "A proscenium arch separates performers from spectators. That separation is a historical choice, not a neutral default, and it changes what performance can do."
                }
            },
            {
                heading: "Talking about structure and genre",
                intro: "Use these terms with a definition and an example.",
                bullets: [
                    "Plot, character, thought, diction, song and spectacle: Aristotle's six elements, still useful as an analysis checklist.",
                    "Tragedy, comedy, tragicomedy, farce, satire and melodrama: know the conventions that define each.",
                    "Conflict, complication, climax and resolution: describe structure rather than retelling plot.",
                    "Dramatic irony: the audience knows what a character does not.",
                    "Convention: an agreed shorthand the audience accepts, from soliloquy to puppetry."
                ]
            }
        ],
        practice: [
            { q: "Distinguish drama from theatre in one sentence each.", a: "Drama is the composed work with its structure and dialogue; theatre is the live collaborative event that stages it before an audience." },
            { q: "Why is the proscenium arch historically significant?", a: "It institutionalised a clear separation between performers and audience, shaping realistic illusion and a passive spectator role." },
            { q: "What does dramatic irony require?", a: "A gap between what the audience knows and what a character knows, used to create tension or humour." },
            { q: "Name Aristotle's six elements of drama.", a: "Plot, character, thought, diction, song and spectacle." },
            { q: "Give one example of a theatrical convention and explain what it asks the audience to accept.", a: "The soliloquy asks the audience to accept that a character is speaking their private thoughts aloud while others on stage do not hear." }
        ],
        checklist: [
            "Write definitions of drama, theatre, performance and play.",
            "Draw a timeline from Greek festival theatre to the modern stage.",
            "Compare two world theatre traditions in a table of conventions.",
            "Analyse a short play using Aristotle's six elements.",
            "Collect five theatrical conventions with one example each.",
            "Write a 250-word answer distinguishing text from production.",
            "Learn ten genre terms and match each to a play you know."
        ],
        archive: archive([
            { ...SOURCE_2018, year: '2018', label: 'Archived course description', topics: [
                'THA 111 Introduction to Drama and Theatre in the World described as an introduction to the nature of drama and theatre',
                'Emphasis on non-written traditions, festivals and rituals up to the institution of built stages and arenas',
                'Attention to the social conventions operating in those venues that create both literature and performance',
            ] },
            { ...SOURCE_2019, year: '2019', label: 'Archived programme listing', topics: [
                'THA 111 Introduction to Drama and Theatre in the World, 3 credits, first semester',
                'Listed beside THA 101, 131, 151, 153 and 161 in the same semester',
                'Total first-semester load shown as 24 credits including GST courses',
            ], changed: 'The 2019 listing keeps THA 111 as a core 100-level first-semester course with no title change.' },
            { ...CURRENT, topics: [
                'THA 111 remains the conceptual gateway to the programme in the compiled 2025/2026 map',
                'Expect comparative examples from African, Asian and European traditions rather than a Europe-only survey',
                'Confirm the current credit value, since 100-level loads were revised in later listings',
            ] },
        ]),
    },
    {
        slug: "tha-112-comparative-traditions-of-world-theatre",
        code: "THA 112",
        title: "THA 112: Comparative Traditions of World Theatres",
        subtitle: "Compare performance traditions without ranking them",
        domain: "Theatre & Film Studies",
        faculty: "Faculty of Arts",
        department: "Theatre & Film Studies",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free
        tags: ["THA 112", "Comparative Theatre", "World Theatre", "Noh", "Commedia", "100L"],
        description: "Comparison is a skill, not a list. This pack gives you a comparison grid covering space, performer training, text, audience and purpose, then applies it to African festival theatre, Greek theatre, Noh, Commedia dell'arte and contemporary Nigerian stage practice.",
        outcomes: [
            "Construct a comparison grid for any two performance traditions.",
            "Describe Greek, Japanese and African traditions using accurate terminology.",
            "Explain how performer training and audience expectation differ across traditions.",
            "Avoid evolutionist language that treats one tradition as more advanced."
        ],
        sections: [
            {
                heading: "Compare on dimensions, not vibes",
                intro: "A comparison needs fixed criteria applied to both cases.",
                bullets: [
                    "Space: where does performance happen, and who can see whom?",
                    "Text: is there a fixed script, an outline, or an inherited pattern?",
                    "Performer: trained specialist, community member, or both?",
                    "Audience: separated, participating, or paying customers?",
                    "Purpose: civic competition, religious observance, entertainment or social critique?",
                    "Transmission: school, apprenticeship, family lineage or mass media?"
                ],
                callout: {
                    title: "Do not write 'primitive'",
                    body: "Evolutionist language - primitive to sophisticated - is inaccurate and penalised. Say 'participatory' or 'text-centred' and define it."
                }
            },
            {
                heading: "Three traditions in brief",
                intro: "Know enough detail to support a comparison, not a full history.",
                bullets: [
                    "Greek: civic festival of Dionysus, masked actors, chorus, open-air amphitheatre, competition between playwrights.",
                    "Japanese Noh: highly codified movement, masks, chant and a slow tempo; transmission through schools and lineages.",
                    "African festival theatre: community participation, music and dance as structure, flexible performance space.",
                    "Commedia dell'arte: professional troupes, stock characters, improvisation around a scenario, touring economy.",
                    "Nigerian contemporary stage: blends festival elements, literary drama and popular theatre forms."
                ]
            },
            {
                heading: "Writing the comparison answer",
                intro: "Structure carries the marks.",
                numbered: [
                    "Introduce both traditions with dates and contexts.",
                    "State the criteria you will compare on.",
                    "Take one criterion at a time and discuss both cases.",
                    "Give a specific example for each claim.",
                    "Explain a similarity and a difference in function, not only in appearance.",
                    "Conclude with what the comparison reveals about theatre as a human practice."
                ]
            }
        ],
        practice: [
            { q: "List five dimensions for comparing performance traditions.", a: "Space, text, performer training, audience role and purpose. Transmission is a sixth." },
            { q: "What makes Noh a useful comparison with Greek theatre?", a: "Both use masks, highly formalised performance and inherited conventions, but differ in tempo, competition and religious framing." },
            { q: "Why is 'primitive theatre' an inaccurate phrase?", a: "It imposes a false hierarchy of development and ignores the sophistication and function of participatory forms." },
            { q: "How does audience role differ between festival theatre and proscenium theatre?", a: "Festival audiences participate and may be part of the performance; proscenium audiences are separated and typically observe." },
            { q: "What is a scenario in Commedia dell'arte?", a: "An outline of situations and stock characters that performers develop through improvisation rather than a fixed script." }
        ],
        checklist: [
            "Build a comparison grid with six dimensions.",
            "Fill the grid for two traditions you have studied.",
            "Learn ten terms specific to non-European theatre.",
            "Watch a short Noh excerpt and note three conventions.",
            "Write a 400-word comparison with evidence for each claim.",
            "Remove every evolutionist phrase from your draft.",
            "Discuss your grid with a coursemate and add one dimension you missed."
        ],
        archive: archive([
            { ...SOURCE_2018, year: '2018', label: 'Archived course description', topics: [
                'THA 112 Comparative Traditions of World Theatres appears in the 2018 course descriptions',
                'The same page separates THA 113 Theatre History in Perspective: 500 BC - 1800 AD',
                'Descriptions emphasise comparison of world traditions rather than a single national history',
            ], changed: 'THA 113 appears in the 2018 description but is absent from the 2019 programme listing, so the history sequence was reorganised.' },
            { ...SOURCE_2019, year: '2019', label: 'Archived programme listing', topics: [
                'THA 112 Comparative Traditions of World Theatres, 3 credits, second semester, 100 level',
                'Second-semester 100-level package includes THA 122, 132, 142, 152 and 162',
                'No THA 113 in this listing',
            ] },
            { ...CURRENT, topics: [
                'Comparative traditions remains a 100-level core in the compiled map',
                'Expect African, Asian and European traditions to be compared rather than surveyed separately',
                'Check whether your cohort takes this in first or second semester',
            ] },
        ]),
    },
    {
        slug: "tha-122-basic-performance-skills",
        code: "THA 122",
        title: "THA 122: Basic Performance Skills - Body, Voice and Presence",
        subtitle: "A practical studio companion for your first acting and movement classes",
        domain: "Theatre & Film Studies",
        faculty: "Faculty of Arts",
        department: "Theatre & Film Studies",
        level: "100L",
        material_type: "lab-manuals",
        subcategory: "lab-manuals",
        priceKobo: 0, // free
        tags: ["THA 122", "Acting", "Movement", "Voice", "Stanislavski", "Laban", "100L"],
        description: "Performance skills are built by repetition, not by inspiration. This pack sets out a safe studio routine, explains the body-awareness approaches referenced in the department's course description - Stanislavskian, Suzukian and Laban - and gives you a rehearsal log that makes your progress visible.",
        outcomes: [
            "Warm up the body and voice safely before studio work.",
            "Explain the difference between Stanislavskian, Suzukian and Laban approaches.",
            "Use objectives, actions and given circumstances to build a short scene.",
            "Keep a rehearsal log that documents choices and corrections."
        ],
        sections: [
            {
                heading: "Studio discipline",
                intro: "The studio is a workplace with physical risk. Prepare properly or you will be injured and marked down.",
                bullets: [
                    "Warm up joints, spine and breathing before any movement work.",
                    "Remove jewellery and wear clothing that allows movement.",
                    "Bare feet or non-slip footwear only on a studio floor.",
                    "Hydrate and take breaks; fatigue causes sloppy habits and injury.",
                    "Respect physical boundaries; agree contact before exercises.",
                    "Cool down and note any strain in your log."
                ]
            },
            {
                heading: "Three approaches you will meet",
                intro: "Each approach answers a different question about how performance becomes truthful or expressive.",
                bullets: [
                    "Stanislavski: given circumstances, objectives, actions and emotional truth; asks what the character wants now.",
                    "Suzuki: intense lower-body strength, stamping and vocal power; trains presence and stamina.",
                    "Laban: effort qualities of weight, time, space and flow; builds a vocabulary for movement.",
                    "None is the single correct method; technique serves the production's demands.",
                    "Name the approach in your log so your development is legible to a tutor.",
                    "Never imitate an advanced exercise you have not been trained to do."
                ],
                callout: {
                    title: "Objective plus action",
                    body: "A playable choice sounds like 'to persuade her to stay' rather than 'to be sad'. Emotion is a by-product of pursuing an objective."
                }
            },
            {
                heading: "Rehearsal log and scene work",
                intro: "Tutors assess process as much as the final showing.",
                bullets: [
                    "Record date, exercise, what you attempted and what changed.",
                    "Note one correction from your tutor verbatim, then how you applied it.",
                    "For scene work, list your objective, obstacle and action beats.",
                    "Score the scene in beats rather than trying to play one emotion throughout.",
                    "Review the log weekly and identify a pattern in your notes.",
                    "Film yourself once a fortnight; the camera exposes habits the mirror hides."
                ]
            }
        ],
        practice: [
            { q: "What is a playable objective?", a: "A specific want directed at another character in the scene, phrased as an action, for example 'to get him to admit he lied'." },
            { q: "Name the four effort qualities in Laban's movement analysis.", a: "Weight, time, space and flow." },
            { q: "Why does Suzuki training emphasise the lower body?", a: "It builds grounding, stamina and vocal support, producing a physically present performer." },
            { q: "What belongs in a rehearsal log entry?", a: "Date, exercise, what you attempted, what changed, feedback received and how you applied it." },
            { q: "Why score a scene in beats?", a: "Beats break the scene into playable units with changing objectives, preventing a single flat emotion across the whole scene." }
        ],
        checklist: [
            "Learn and rehearse a ten-minute warm-up you can do alone.",
            "Write objectives for three short scenes.",
            "Keep a rehearsal log for four sessions.",
            "Film one exercise and review it critically.",
            "Read a short introduction to Stanislavski's system.",
            "Practise one Laban effort quality across three exercises.",
            "Ask your tutor to correct one habit and record the correction."
        ],
        archive: archive([
            { ...SOURCE_2018, year: '2018', label: 'Archived course description', topics: [
                'The 2018 description covers basic artistic skills for the beginning actor and performer',
                'Body awareness in specified methods - Stanislavskian, Suzukian and Labanesque characterisations',
                'Graded studio exercises and field information used to stimulate imagination',
            ], changed: 'The 2018 page pairs body and space awareness with named performance methods rather than a separate movement course.' },
            { ...SOURCE_2019, year: '2019', label: 'Archived programme listing', topics: [
                'THA 122 Basic Performance Skills, 3 credits, second semester, 100 level',
                'The 2019 listing also introduces THA 153 Communication Models and THA 161 Participation Orientation',
                'Performance work sits beside THA 142 Introduction to Dance Theatre in Africa',
            ], changed: 'THA 122 is introduced in the 2019 listing; the 2018 description referenced performance skills without that code.' },
            { ...CURRENT, topics: [
                'Basic performance skills remains a 100-level studio core in the compiled map',
                'Expect assessment on process, logbook and showing, not only final performance',
                'Confirm studio dress and safety rules with your tutor before the first session',
            ] },
        ]),
    },
    {
        slug: "tha-131-basic-theatre-design-and-crafts",
        code: "THA 131",
        title: "THA 131: Basic Theatre Design and Crafts - Scenery, Lighting and Models",
        subtitle: "From a director's idea to a buildable, budgeted design",
        domain: "Theatre & Film Studies",
        faculty: "Faculty of Arts",
        department: "Theatre & Film Studies",
        level: "100L",
        material_type: "lab-manuals",
        subcategory: "lab-manuals",
        priceKobo: 0, // free
        tags: ["THA 131", "Theatre Design", "Scenery", "Lighting", "Model Making", "100L"],
        description: "Design is a set of constraints solved creatively: text, space, budget, labour and safety. This pack covers design elements and principles, ground plans and models, materials and construction basics, lighting and sound roles, and how to present a design to a production team.",
        outcomes: [
            "Apply the elements and principles of design to a script's requirements.",
            "Produce a ground plan and a scale model for a short scene.",
            "Identify common scenery, lighting and sound equipment and their functions.",
            "Present a design with a budget and a build schedule."
        ],
        sections: [
            {
                heading: "Elements and principles",
                intro: "Design language is learnable and assessable.",
                bullets: [
                    "Elements: line, shape, form, colour, texture and space.",
                    "Principles: contrast, rhythm, unity, emphasis, pattern, movement, balance and scale.",
                    "Start from the text: period, location, tone, entrances and required levels.",
                    "Design for the audience's sightlines, not for a photograph.",
                    "Every element should be justified by the production concept.",
                    "A design that cannot be built within budget and time is not finished."
                ]
            },
            {
                heading: "Drawings, models and materials",
                intro: "Technical communication prevents expensive mistakes.",
                bullets: [
                    "Ground plan: viewed from above, to scale, with all entrances and furniture positions.",
                    "Elevation and section: show heights and construction.",
                    "Model: white card or foam board at 1:25 or 1:50, with a human figure for scale.",
                    "Timber, plywood, canvas, steel and fabric each impose different construction rules.",
                    "Paint and finish affect how lighting reads on stage.",
                    "Label everything and include a materials list."
                ],
                callout: {
                    title: "Safety is part of design",
                    body: "A platform that flexes, a rail that wobbles or a cable across a walkway is a failed design regardless of how it looks."
                }
            },
            {
                heading: "Lighting, sound and presentation",
                intro: "Design is a collaborative department, not a solo artwork.",
                bullets: [
                    "Lighting shapes visibility, focus, mood and time of day.",
                    "Common units: profile and fresnel lanterns, LED fixtures, dimmers and a control desk.",
                    "Colour temperature and gels change how costume and paint read.",
                    "Sound design covers reinforcement, effects and cues; know the difference between live and recorded sources.",
                    "Present the concept, ground plan, model, materials list and budget on one board.",
                    "Walk the production team through the design in five minutes without reading from notes."
                ]
            }
        ],
        practice: [
            { q: "Name the elements and principles of design.", a: "Elements: line, shape, form, colour, texture, space. Principles: contrast, rhythm, unity, emphasis, pattern, movement, balance, scale." },
            { q: "Why is a ground plan essential?", a: "It shows the arrangement of the stage from above to scale, allowing the director, designer and builder to agree on positions, levels and entrances." },
            { q: "What does a 1:25 model mean?", a: "One unit on the model represents twenty-five of the same units in reality, for example 4 cm equals 1 m." },
            { q: "Give two functions of stage lighting.", a: "Visibility and focus; mood, time of day and shaping the performance space are others." },
            { q: "What must accompany a design proposal?", a: "A concept statement, ground plan, model, materials list, budget and build schedule." }
        ],
        checklist: [
            "Analyse a script for location, period, entrances and levels.",
            "Draw a to-scale ground plan for one scene.",
            "Build a simple 1:50 model with a human figure for scale.",
            "List materials and costs for your design.",
            "Learn five lighting fixtures and their uses.",
            "Prepare a five-minute design presentation.",
            "Have your tutor review the plan for safety issues."
        ],
        archive: archive([
            { ...SOURCE_2018, year: '2018', label: 'Archived course description', topics: [
                'THA 131 Basic Theatre Design and Crafts: fundamentals of scene, sound, lighting, costume, make-up and masks',
                'Drawing, altering and repairing designs, accessories, building, painting, fitting, decorating and budgeting',
                'THA 132 Trends in Theatre Design and Technologies listed as the companion course',
            ] },
            { ...SOURCE_2019, year: '2019', label: 'Archived programme listing', topics: [
                'THA 131 Basic Theatre Design and Crafts, 3 credits, first semester',
                'THA 233 Design Concepts in Performance Spaces and THA 343 Set and Lighting Design appear at 200 and 300 level',
                'Design sequence spans all four years in this listing',
            ], changed: 'The 2019 listing adds THA 233 and THA 343, formalising the design sequence that the 2018 page described only in outline.' },
            { ...CURRENT, topics: [
                'Basic design and crafts remains the 100-level entry to the technology and design stress area',
                'Model making, ground plans and build budgeting are the assessed core',
                'Confirm workshop access rules and whether materials are supplied',
            ] },
        ]),
    },
    {
        slug: "tha-151-speech-and-communication-for-stage-and-media",
        code: "THA 151",
        title: "THA 151: Speech and Communication for Stage and Media",
        subtitle: "Voice work, articulation and delivery that survive a microphone and a hall",
        domain: "Theatre & Film Studies",
        faculty: "Faculty of Arts",
        department: "Theatre & Film Studies",
        level: "100L",
        material_type: "lab-manuals",
        subcategory: "lab-manuals",
        priceKobo: 0, // free
        tags: ["THA 151", "Voice", "Speech", "Articulation", "Broadcasting", "100L"],
        description: "Your voice is an instrument that must be maintained and trained. This pack covers breathing and support, resonance, articulation, projection without strain, microphone technique, and the differences between stage delivery and broadcast delivery.",
        outcomes: [
            "Support the voice with diaphragmatic breathing rather than throat tension.",
            "Identify and correct common Nigerian English articulation issues without shame.",
            "Project in a large hall without damaging the voice.",
            "Adapt delivery for radio, television and recorded voice-over."
        ],
        sections: [
            {
                heading: "Breath, support and resonance",
                intro: "Volume comes from breath support and resonance, not from shouting.",
                bullets: [
                    "Breathe low into the abdomen; shoulders should not rise.",
                    "Control exhalation steadily to sustain a line to its end.",
                    "Resonance chambers: chest, mouth and nasal cavities shape timbre.",
                    "Warm up with humming, lip trills and gentle scales.",
                    "Hydrate; avoid shouting over noise as a habit.",
                    "Stop and rest if you feel pain or persistent hoarseness."
                ]
            },
            {
                heading: "Articulation and accent",
                intro: "Intelligibility is the goal; erasing your accent is not.",
                bullets: [
                    "Work on final consonants, consonant clusters and word endings.",
                    "Distinguish minimal pairs that affect meaning in your context.",
                    "Mark stress in multisyllabic words and avoid misplaced stress.",
                    "Pace and pausing carry meaning as much as pronunciation.",
                    "Use tongue twisters for agility, not as a performance in themselves.",
                    "Record yourself weekly and compare against a specific target, not a vague ideal."
                ],
                callout: {
                    title: "Stage versus microphone",
                    body: "On stage you project to the back row; at a microphone you work close and controlled. Practise both, because the habits are different."
                }
            },
            {
                heading: "Delivery for stage and broadcast",
                intro: "The medium changes the technique.",
                bullets: [
                    "Stage: project, articulate for distance, sustain energy through long speeches.",
                    "Radio: paint pictures with voice alone; pace and pause do the work of visual expression.",
                    "Television: controlled energy, natural eyeline, awareness of framing.",
                    "Voice-over: precise timing to picture, consistent tone, clean breaths.",
                    "Interview or news reading: neutral warmth, accurate pronunciation of names.",
                    "Always test the microphone and monitor before a recording."
                ]
            }
        ],
        practice: [
            { q: "How do you know you are breathing with support?", a: "The abdomen and lower ribs expand while the shoulders stay relatively still, and you can sustain a controlled exhalation." },
            { q: "Why is shouting a bad projection strategy?", a: "It strains the vocal folds and produces a harsh sound that does not carry as well as supported resonance." },
            { q: "Give two differences between stage and microphone delivery.", a: "Stage delivery requires projection to the back of the hall; microphone delivery uses close, controlled volume and greater attention to plosives." },
            { q: "What should you mark on a script before a reading?", a: "Breaths, pauses, stressed words and any difficult names or sounds." },
            { q: "Why record yourself?", a: "Recording exposes habits you cannot hear in the moment and allows measurable improvement against a target." }
        ],
        checklist: [
            "Practise diaphragmatic breathing for five minutes daily for a week.",
            "Warm up the voice before every studio or rehearsal session.",
            "Record and review a two-minute reading.",
            "Mark stress and pauses on one script extract.",
            "Practise a broadcast-style read at the microphone.",
            "Read a passage aloud in a large hall and check the back row can hear.",
            "Ask a tutor for one specific correction and apply it for a week."
        ],
        archive: archive([
            { ...SOURCE_2018, year: '2018', label: 'Archived course description', topics: [
                'THA 151 Basic Speech and Communication for Stage and the Media',
                'Vocal mechanism, range, interpretive devices and voice training for the actor, public speaker, newscaster or radio presenter',
                'Voice integrated with body as actors hold the stage',
            ] },
            { ...SOURCE_2019, year: '2019', label: 'Archived programme listing', topics: [
                'THA 151 Basic Speech and Communication for Stage and the Media, 3 credits',
                'New THA 153 Communication Models in Theatre and Media appears in the same semester',
                'Later media courses build on this: THA 252 and THA 324',
            ], changed: 'The 2019 listing adds THA 153 as a separate communication-theory course beside the practical voice course.' },
            { ...CURRENT, topics: [
                'Speech and communication remains a 100-level core in the compiled map',
                'Broadcast and voice-over assessment is likely, given the department film track',
                'Confirm whether THA 153 is still taught alongside it',
            ] },
        ]),
    },
    {
        slug: "tha-152-introduction-to-media-arts",
        code: "THA 152",
        title: "THA 152: Introduction to Media Arts - Radio, Television and Film Basics",
        subtitle: "How a media production is actually put together",
        domain: "Theatre & Film Studies",
        faculty: "Faculty of Arts",
        department: "Theatre & Film Studies",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free
        tags: ["THA 152", "Media Arts", "Radio", "Television", "Film", "100L"],
        description: "This pack explains the production chain for radio, television and film, the roles in a production team, and the basic grammar of shot sizes and sound. It is the foundation for THA 215, THA 252 and THA 324, so treat it as a map rather than a list of definitions.",
        outcomes: [
            "Describe pre-production, production and post-production stages.",
            "Identify the roles in a media production team and what each owns.",
            "Use shot sizes, camera angles and transitions accurately.",
            "Explain how radio differs from television and film in production logic."
        ],
        sections: [
            {
                heading: "The production chain",
                intro: "Every production, from a radio jingle to a feature film, moves through three phases.",
                bullets: [
                    "Pre-production: idea, script, budget, schedule, crew, location and permissions.",
                    "Production: shooting or recording, with continuity and safety management.",
                    "Post-production: editing, sound, colour, graphics and delivery.",
                    "Radio compresses the chain: script, record, edit, broadcast.",
                    "Failures in pre-production surface as chaos on set.",
                    "Keep a paper trail: scripts, schedules, release forms and logs."
                ]
            },
            {
                heading: "Roles and responsibilities",
                intro: "Credit correctly and know who decides what.",
                bullets: [
                    "Producer: money, logistics and overall delivery.",
                    "Director: interpretation and creative decisions.",
                    "Scriptwriter: structure and dialogue.",
                    "Cinematographer or camera operator: image and lighting.",
                    "Sound recordist and designer: dialogue, effects and mix.",
                    "Editor: rhythm, continuity and final structure."
                ],
                callout: {
                    title: "Say what you own",
                    body: "In group projects, write down who owns which deliverable. Ambiguity is the main cause of 'I did everything' disputes."
                }
            },
            {
                heading: "Visual grammar and sound",
                intro: "Learn the vocabulary before you analyse a film.",
                bullets: [
                    "Shot sizes: extreme wide, wide, medium, close-up, extreme close-up.",
                    "Angles: eye level, high, low, Dutch tilt.",
                    "Movement: pan, tilt, dolly, handheld, crane.",
                    "Transitions: cut, dissolve, fade, wipe.",
                    "Sound: diegetic (inside the story world) and non-diegetic (score, narration).",
                    "Continuity: eyeline, screen direction and the 180-degree rule."
                ]
            }
        ],
        practice: [
            { q: "What are the three production phases?", a: "Pre-production, production and post-production." },
            { q: "What is the difference between diegetic and non-diegetic sound?", a: "Diegetic sound exists in the story world and can be heard by characters; non-diegetic sound, such as a score, is added for the audience." },
            { q: "Who is responsible for continuity on set?", a: "The continuity supervisor or script supervisor, working with the director and editor." },
            { q: "Give one reason radio production differs from film production.", a: "Radio has no visual channel, so it must build place, character and action through voice, sound effects and silence." },
            { q: "What is the 180-degree rule?", a: "Keeping the camera on one side of an imaginary line between two characters preserves consistent screen direction." }
        ],
        checklist: [
            "Write the three production phases with tasks for each.",
            "Draw a production team chart with ten roles.",
            "Learn ten shot types with a sketch of each.",
            "Analyse a three-minute scene for shot sizes and sound.",
            "Make a one-page radio production plan.",
            "Watch a behind-the-scenes documentary and list three logistics lessons.",
            "Define diegetic and non-diegetic sound using a scene you know."
        ],
        archive: archive([
            { ...SOURCE_2018, year: '2018', label: 'Archived course description', topics: [
                'THA 152 Introduction to Media Arts sits inside the 100-level media area',
                'The 2018 description frames media study through production participation and studio practice',
                'THA 252 Fundamentals of Radio, Television and Film Production is described on the same page',
            ] },
            { ...SOURCE_2019, year: '2019', label: 'Archived programme listing', topics: [
                'THA 152 Introduction to Media Arts, 3 credits, second semester',
                'Media stress area continues with THA 215, 252, 324 and 333',
                'The department describes radio, TV and film as broadcast arts within theatre studies',
            ], changed: 'The 2019 listing shows a clearer media ladder: 152 introduces, 215 analyses film, 252 introduces production, 324 directs.' },
            { ...CURRENT, topics: [
                'Media arts remains the 100-level gateway to the film and broadcast track',
                'The department now includes Film Studies in its name, so expect stronger film emphasis',
                'Confirm which editing software and equipment your cohort can access',
            ] },
        ]),
    },
    {
        slug: "tha-162-basic-theatre-administration-and-management",
        code: "THA 162",
        title: "THA 162: Basic Theatre Administration and Management",
        subtitle: "Budgets, schedules, people and the business of putting on a show",
        domain: "Theatre & Film Studies",
        faculty: "Faculty of Arts",
        department: "Theatre & Film Studies",
        level: "100L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free
        tags: ["THA 162", "Theatre Management", "Budgeting", "Stage Management", "100L"],
        description: "Productions fail on logistics more often than on talent. This pack covers organisational structures, budgeting and break-even, scheduling, front-of-house and box office, contracts and basic stage management paperwork, with templates you can adapt for a campus production.",
        outcomes: [
            "Describe the structure of a theatre organisation and who reports to whom.",
            "Prepare a simple production budget and calculate break-even attendance.",
            "Build a rehearsal and production schedule with dependencies.",
            "Explain the stage manager's paperwork and communication role."
        ],
        sections: [
            {
                heading: "Structure and governance",
                intro: "A theatre company is an organisation with money, people and obligations.",
                bullets: [
                    "Artistic leadership shapes the season and creative decisions.",
                    "Administration handles finance, contracts, marketing and facilities.",
                    "Technical and production staff deliver the physical event.",
                    "Board or management oversight protects the organisation's sustainability.",
                    "Roles can overlap in student productions, but responsibility must be written down.",
                    "Know who can authorise spending before you spend."
                ]
            },
            {
                heading: "Budget and break-even",
                intro: "A budget is a plan with assumptions you can defend.",
                bullets: [
                    "Fixed costs: venue, equipment hire, insurance, rights.",
                    "Variable costs: costumes, props, printing, refreshments per performance.",
                    "Revenue: ticket sales, sponsorship, concessions, merchandise.",
                    "Break-even attendance equals fixed costs divided by contribution per ticket.",
                    "Keep a contingency of roughly ten percent for surprises.",
                    "Reconcile actuals against the budget after the production."
                ],
                callout: {
                    title: "Rights are not optional",
                    body: "Performing a copyrighted play without permission exposes the production to legal action. Budget for rights from the start."
                }
            },
            {
                heading: "Scheduling and stage management",
                intro: "The stage manager is the production's communication spine.",
                bullets: [
                    "Work backwards from the performance date to set deadlines.",
                    "Build a rehearsal calendar around cast availability and venue access.",
                    "Stage manager's book: script, blocking notes, cue sheets and contact list.",
                    "Rehearsal reports record attendance, progress and problems.",
                    "Cue sequences for lighting, sound and scene changes must be rehearsed.",
                    "Front-of-house plans cover ticketing, ushering, safety and accessibility."
                ]
            }
        ],
        practice: [
            { q: "Fixed costs are 120,000 and each ticket yields 1,500 after variable costs. Find break-even attendance.", a: "120,000 divided by 1,500 equals 80 tickets." },
            { q: "What is a contingency and why keep one?", a: "A reserve, typically around ten percent, to cover unforeseen costs without cancelling the production." },
            { q: "List four items in a stage manager's book.", a: "Script with blocking, cue sheets, contact list and rehearsal reports." },
            { q: "Why must you budget for performance rights?", a: "Performing copyrighted work without permission is an infringement and can lead to cancellation or legal claims." },
            { q: "What does a rehearsal report contain?", a: "Date, attendees, work covered, scenes or cues rehearsed, issues arising and actions assigned." }
        ],
        checklist: [
            "Draw an organisational chart for a student production.",
            "Build a budget with fixed, variable and contingency lines.",
            "Calculate break-even for a 200-seat hall.",
            "Create a rehearsal calendar working back from opening night.",
            "Write one rehearsal report template.",
            "List the safety and front-of-house tasks for a show.",
            "Interview a production manager or stage manager about one real problem."
        ],
        archive: archive([
            { ...SOURCE_2018, year: '2018', label: 'Archived course description', topics: [
                'THA 162 Basic Theatre Administration and Management',
                'Structure, organographies, resource management and the rules of conduct governing theatre business',
                'Application of theatre principles to education, management and policy',
            ] },
            { ...SOURCE_2019, year: '2019', label: 'Archived programme listing', topics: [
                'THA 162 Basic Theatre Administration and Management, 3 credits, second semester',
                'THA 261 Theatre in Education and Community and THA 262 Administering Theatre in Educational Establishments follow',
                'THA 315 Theatre, Art and Culture in Public Relations and Tourism extends the administration track',
            ], changed: 'The 2019 listing formalises an administration ladder across 100, 200 and 300 level.' },
            { ...CURRENT, topics: [
                'Basic administration remains the 100-level entry to the administration and applied theatre stress area',
                'Assessment typically combines a budget exercise with a written management answer',
                'Confirm whether rights and insurance are covered in your taught component',
            ] },
        ]),
    },
    {
        slug: "tha-211-dramatic-literature-and-criticism",
        code: "THA 211",
        title: "THA 211: Dramatic Literature and Criticism - From Aristotle to Soyinka",
        subtitle: "Read plays critically and argue about them without summarising the plot",
        domain: "Theatre & Film Studies",
        faculty: "Faculty of Arts",
        department: "Theatre & Film Studies",
        level: "200L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free
        tags: ["THA 211", "Dramatic Criticism", "Aristotle", "Soyinka", "Dramatic Literature", "200L"],
        description: "Criticism is an argument about how a play works, supported by evidence from the text. This pack covers classical and modern critical standpoints, the vocabulary of dramatic analysis, and a repeatable method for writing a critical answer that goes beyond plot summary.",
        outcomes: [
            "Apply Aristotle's poetics and later critical standpoints to a play.",
            "Analyse dramatic structure, character, language and staging implications.",
            "Distinguish description, interpretation and evaluation in criticism.",
            "Build a critical argument supported by textual evidence."
        ],
        sections: [
            {
                heading: "Critical standpoints",
                intro: "Each standpoint asks a different question of the same play.",
                bullets: [
                    "Classical: plot, character, thought, diction, song and spectacle; unity of action.",
                    "Neoclassical: rules, decorum and the unities, later challenged by Romantic practice.",
                    "Romantic and modern: expression, symbol and the director's interpretation.",
                    "Marxist: class relations, ideology and the economic conditions of production.",
                    "Feminist and postcolonial: gender, power and the politics of representation.",
                    "Semiotics: signs, codes and how performance produces meaning."
                ],
                callout: {
                    title: "Name the standpoint",
                    body: "If you use a postcolonial reading, say so. Naming the lens turns a set of opinions into a method."
                }
            },
            {
                heading: "Analysing a play",
                intro: "Use a checklist so you do not drift into retelling.",
                bullets: [
                    "Structure: act and scene divisions, turning points, use of time.",
                    "Character: function, relationships, what each character wants and fears.",
                    "Language: register, imagery, rhythm, silence.",
                    "Stagecraft implied by the text: setting, props, entrances, offstage action.",
                    "Context: the conditions of first production and the play's reception.",
                    "Theme: what the play argues, not merely what it is about."
                ]
            },
            {
                heading: "Writing the critical answer",
                intro: "Marks follow argument structure.",
                numbered: [
                    "Open with a claim that answers the question directly.",
                    "Define the critical term you are using.",
                    "Give a quotation or specific moment as evidence.",
                    "Explain how the evidence supports the claim.",
                    "Acknowledge a counter-reading and answer it.",
                    "Close by returning to the question, not to the plot."
                ]
            }
        ],
        practice: [
            { q: "What is the difference between description and evaluation?", a: "Description states what is there; evaluation judges how well it works and for what purpose, with reasons." },
            { q: "Name three critical standpoints and the question each asks.", a: "Marxist criticism asks how class and ideology operate; feminist criticism asks how gender and power are represented; semiotics asks how signs produce meaning." },
            { q: "Why is plot summary an inadequate answer?", a: "It reports events without arguing how the play creates meaning, which is what the question assesses." },
            { q: "Give one staging implication embedded in a script you know.", a: "A stage direction requiring sudden darkness implies dependence on lighting control, shaping mood and pace." },
            { q: "What does it mean to acknowledge a counter-reading?", a: "To state a credible alternative interpretation and explain why your reading remains stronger." }
        ],
        checklist: [
            "Learn Aristotle's six elements and one limitation of the model.",
            "Read one play with a critical lens and take notes by scene.",
            "Write a 200-word passage analysis with three quotations.",
            "Define six critical terms in your own words.",
            "Draft an essay and label claim, evidence and evaluation in the margin.",
            "Remove every sentence that only summarises plot.",
            "Exchange drafts and check each other's use of evidence."
        ],
        archive: archive([
            { ...SOURCE_2018, year: '2018', label: 'Archived course description', topics: [
                'THA 211 Dramatic Literature and Criticism',
                'Theories used by critics from Sophocles through Bernard Shaw to Wole Soyinka',
                'Development of literary criticism from classical and medieval theory to present controversies',
            ] },
            { ...SOURCE_2019, year: '2019', label: 'Archived programme listing', topics: [
                'THA 211 Dramatic Literature and Criticism, 3 credits, first semester, 200 level',
                'Paired with THA 213 Critical Perspectives in Theatre History and THA 215 Basic Film Analysis',
                'THA 413 Theories of Dramatic Criticism and THA 412 Critics and Theoreticians in Africa continue at 400 level',
            ], changed: 'The 2019 listing adds a 400-level criticism sequence that the 2018 description only implied.' },
            { ...CURRENT, topics: [
                'Dramatic literature and criticism remains the 200-level theory core',
                'Expect assessment through passage analysis and an argued essay',
                'Confirm your reading list early; play editions differ in translation and notes',
            ] },
        ]),
    },
    {
        slug: "tha-213-theatre-history-renaissance-to-19th-century",
        code: "THA 213",
        title: "THA 213: Theatre History from the Renaissance to the 19th Century",
        subtitle: "How revolutions, technology and money rebuilt the stage",
        domain: "Theatre & Film Studies",
        faculty: "Faculty of Arts",
        department: "Theatre & Film Studies",
        level: "200L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free
        tags: ["THA 213", "Theatre History", "Renaissance", "Romanticism", "Melodrama", "200L"],
        description: "This pack links theatre change to political and industrial change: the Renaissance recovery of classical texts, the rise of commercial playhouses, the director, melodrama, minstrel shows and new stage technology. It also shows you how the history sequence was renumbered between the 2018 and 2019 departmental listings.",
        outcomes: [
            "Trace major European theatre developments from the Renaissance to 1900.",
            "Explain how industrial and political change shaped theatre architecture and production.",
            "Connect the rise of the director to changes in staging and rehearsal.",
            "Interpret the archive entries showing how the department reorganised this course."
        ],
        sections: [
            {
                heading: "Renaissance to Enlightenment",
                intro: "Recovered classical texts changed what could be staged and how.",
                bullets: [
                    "Humanist scholarship revived Roman comedy and Senecan tragedy.",
                    "Commedia dell'arte professionalised touring improvisation.",
                    "Court masque and spectacle fused design, music and politics.",
                    "Neoclassical rules constrained structure until Romantic practice broke them.",
                    "Purpose-built playhouses created a paying public and a commercial profession.",
                    "Printing made plays available as literature, not only as performance."
                ]
            },
            {
                heading: "Revolution, industry and melodrama",
                intro: "The 19th century is the hinge between repertory theatre and modern production.",
                bullets: [
                    "Political revolution changed censorship, audiences and subject matter.",
                    "Gas and later electric lighting enabled picture-stage realism and controlled mood.",
                    "Railways created touring circuits and star actors with national reputations.",
                    "Melodrama offered clear morality, spectacle and music to mass audiences.",
                    "Minstrel shows spread racist caricature while shaping popular entertainment formats.",
                    "Realism and naturalism responded with claims to scientific observation."
                ],
                callout: {
                    title: "Technology is dramaturgy",
                    body: "Lighting, scene-shifting machinery and proscenium staging did not merely decorate plays; they changed what writers could write."
                }
            },
            {
                heading: "The rise of the director",
                intro: "Directing emerged as a profession when production became too complex for the actor-manager alone.",
                bullets: [
                    "Ensemble coherence replaced star-centred staging in key companies.",
                    "Rehearsal became a structured period rather than a formality.",
                    "Designers and directors coordinated unified visual concepts.",
                    "Scripts were interpreted rather than simply recited.",
                    "The director's authority also centralised power in production.",
                    "This history explains why directing is a separate course in your programme."
                ]
            }
        ],
        practice: [
            { q: "How did gas lighting change theatre practice?", a: "It allowed controllable dimming and focus, making picture-stage realism and mood shifts possible and changing rehearsal and design practice." },
            { q: "Why did the director emerge as a profession in the 19th century?", a: "Growing production complexity, ensemble ideals and unified visual concepts required someone to coordinate staging, design and interpretation." },
            { q: "What characterises melodrama?", a: "Clear moral polarities, heightened emotion, music, spectacle and stock situations designed for mass audiences." },
            { q: "Name one effect of the printing press on drama.", a: "Plays circulated as read literature, extending their influence beyond performance and shaping ideas of authorship." },
            { q: "What did neoclassical rules require?", a: "Adherence to unity of time, place and action, decorum and clear moral instruction, modelled on classical precedent." }
        ],
        checklist: [
            "Build a timeline from 1500 to 1900 with ten theatre events.",
            "Explain three effects of industrialisation on theatre.",
            "Compare pre- and post-lighting scene changes.",
            "Learn five melodrama conventions with an example.",
            "Trace how the director's role emerged in two countries.",
            "Read one play from the period and note its staging demands.",
            "Summarise the archive change from THA 113 to the current sequence."
        ],
        archive: archive([
            { ...SOURCE_2018, year: '2018', label: 'Archived course description', topics: [
                'THA 113 Theatre History in Perspective: 500 BC - 1800 AD appears in the 2018 descriptions',
                'Covers myth, folklore, songs, riddles and legends growing into written plays',
                'Questions whether theatre "evolved", "developed" or was "made" in various contexts',
            ], changed: 'THA 113 is the older history code. It appears in the 2018 description and is absent from the 2019 programme listing.' },
            { ...SOURCE_2019, year: '2019', label: 'Archived programme listing', topics: [
                'THA 213 Critical Perspectives in Theatre History: Renaissance to 19th Century, 3 credits',
                'Covers the Industrial Revolution, nationalisms, Romanticism, melodrama, minstrel shows, acting companies and the rise of the director',
                'New theatre architecture and design included in the same course',
            ], changed: 'The 2019 listing replaces the broad 500 BC - 1800 AD survey with a Renaissance-to-19th-century course at 200 level.' },
            { ...CURRENT, topics: [
                'The Renaissance-to-19th-century framing survives in the compiled 2025/2026 map',
                'Industrialisation, lighting technology and the emergence of the director remain examined themes',
                'Check whether THA 113-style world history is now covered in THA 111 or THA 112',
            ] },
        ]),
    },
    {
        slug: "tha-214-fundamentals-of-script-writing",
        code: "THA 214",
        title: "THA 214: Fundamentals of Script Writing - Structure, Character and Dialogue",
        subtitle: "Write a producible short play and learn to revise it",
        domain: "Theatre & Film Studies",
        faculty: "Faculty of Arts",
        department: "Theatre & Film Studies",
        level: "200L",
        material_type: "lab-manuals",
        subcategory: "lab-manuals",
        priceKobo: 0, // free
        tags: ["THA 214", "Playwriting", "Dramatic Structure", "Dialogue", "200L"],
        description: "Playwriting is a craft with repeatable techniques: premise, conflict, character want, escalation and resolution. This pack gives you a scene-by-scene method, dialogue exercises, formatting conventions and a revision checklist, ending with a ten-minute play brief you can actually complete.",
        outcomes: [
            "Turn a premise into a dramatic conflict with stakes.",
            "Build a scene that has a clear want, obstacle and change.",
            "Write dialogue that performs character rather than explaining it.",
            "Format a script professionally and revise it through structured readings."
        ],
        sections: [
            {
                heading: "Premise, conflict, stakes",
                intro: "A play needs someone who wants something they cannot easily get.",
                bullets: [
                    "Premise: the situation in one sentence, including the disruption.",
                    "Protagonist: the character who drives the action.",
                    "Objective: what they want now, in this scene.",
                    "Obstacle: the person or condition blocking them.",
                    "Stakes: what happens if they fail.",
                    "Theme emerges from the argument the play stages, not from a speech."
                ]
            },
            {
                heading: "Scenes that turn",
                intro: "A scene earns its place by changing something.",
                bullets: [
                    "Enter late, leave early: start after the small talk and cut before the resolution.",
                    "Give each character a distinct tactic, not just a distinct opinion.",
                    "Escalate: each beat should raise cost or narrow options.",
                    "Use subtext: characters rarely say exactly what they want.",
                    "End the scene on a shift in power, knowledge or decision.",
                    "Read dialogue aloud to catch lines no human would say."
                ],
                callout: {
                    title: "Show, do not explain",
                    body: "If a character announces the theme, cut the line and let the action carry it. Audiences trust what they witness."
                }
            },
            {
                heading: "Format and revision",
                intro: "Standard formatting signals professionalism and speeds rehearsal.",
                bullets: [
                    "Scene headings, character names in capitals, dialogue, stage directions in italics or brackets.",
                    "Keep stage directions minimal and physical.",
                    "Number pages for rehearsal and timing.",
                    "Hold a table read and mark where attention drops.",
                    "Revise for clarity, not cleverness: cut ten percent.",
                    "Keep drafts labelled with dates and version numbers."
                ]
            }
        ],
        practice: [
            { q: "What is the difference between an objective and an obstacle?", a: "The objective is what a character wants in the scene; the obstacle is what blocks them from getting it." },
            { q: "Why is subtext important in dialogue?", a: "It creates tension between what is said and what is meant, giving actors something to play and audiences something to interpret." },
            { q: "What does 'enter late, leave early' mean?", a: "Begin a scene after the routine preliminaries and end before the obvious resolution, keeping only dramatically necessary action." },
            { q: "How should stage directions be written?", a: "Sparingly, in the present tense, focused on visible physical action rather than inner emotion." },
            { q: "Give one test for a weak line of dialogue.", a: "If it could be spoken by any character in the play without changing meaning, it is not yet character-specific." }
        ],
        checklist: [
            "Write three premises with a clear disruption.",
            "Outline a ten-minute play in beats.",
            "Draft one scene of no more than three pages.",
            "Read it aloud with two coursemates.",
            "Cut ten percent of the lines after the reading.",
            "Format the script correctly with a title page.",
            "Submit a second draft with a short revision note."
        ],
        archive: archive([
            { ...SOURCE_2018, year: '2018', label: 'Archived course description', topics: [
                'THA 214 Fundamentals of Script Writing',
                'Scripting and plot devices, characterisation, theme and language in creating a dramatic script',
                'Graded exercises developing individual and group scripts',
            ] },
            { ...SOURCE_2019, year: '2019', label: 'Archived programme listing', topics: [
                'THA 214 Fundamentals of Script Writing, 3 credits, second semester, 200 level',
                'Later script courses: THA 322 Script Analysis and THA 332 Principles of Adaptation and Improvisation',
                'Writing sits within the dramaturgy stress area alongside directing',
            ], changed: 'The 2019 listing adds a 300-level script analysis and adaptation sequence after the 200-level writing course.' },
            { ...CURRENT, topics: [
                'Fundamentals of script writing remains the 200-level dramaturgy core',
                'Expect a portfolio assessment: premise, scene work and a revised draft',
                'Ask whether your cohort writes for stage, screen or both',
            ] },
        ]),
    },
    {
        slug: "tha-215-basic-film-analysis-and-appreciation",
        code: "THA 215",
        title: "THA 215: Basic Film Analysis and Appreciation - Reading the Moving Image",
        subtitle: "From shot to sequence: how films mean what they mean",
        domain: "Theatre & Film Studies",
        faculty: "Faculty of Arts",
        department: "Theatre & Film Studies",
        level: "200L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free
        tags: ["THA 215", "Film Analysis", "Cinematography", "Editing", "Nollywood", "200L"],
        description: "Film analysis is close reading with a stopwatch. This pack teaches you to break a sequence into shots, analyse framing, movement, editing, sound and performance, and write an analysis that cites timecodes as evidence. It includes Nollywood and African cinema examples rather than a Hollywood-only canon.",
        outcomes: [
            "Break a sequence into shots and describe each accurately.",
            "Analyse framing, camera movement, lighting and colour.",
            "Explain continuity, montage and editing rhythm.",
            "Write a timecode-based analysis of a short sequence."
        ],
        sections: [
            {
                heading: "Mise-en-scene and cinematography",
                intro: "Everything in the frame is a decision.",
                bullets: [
                    "Mise-en-scene: setting, props, costume, performance and lighting within the frame.",
                    "Framing: shot size, angle, headroom, composition and depth.",
                    "Movement: pan, tilt, dolly, handheld and crane each carry a different feel.",
                    "Lens and focus: wide lenses exaggerate space; long lenses compress it.",
                    "Lighting: direction, contrast and colour temperature shape mood and meaning.",
                    "Production design communicates period, class and character before dialogue begins."
                ]
            },
            {
                heading: "Editing and sound",
                intro: "The cut is the basic unit of film grammar.",
                bullets: [
                    "Continuity editing preserves spatial and temporal logic for the viewer.",
                    "Montage creates meaning through juxtaposition rather than continuity.",
                    "Cutting rhythm controls pace and emotional pressure.",
                    "Sound design: dialogue, ambience, effects and music; diegetic versus non-diegetic.",
                    "Silence is a designed choice, not an absence.",
                    "Sound bridges link scenes and smooth transitions."
                ],
                callout: {
                    title: "Cite timecodes",
                    body: "'01:12:30 to 01:14:05' is evidence. 'The scene where she cries' is not. Timestamps make your argument checkable."
                }
            },
            {
                heading: "Writing the analysis",
                intro: "Structure beats adjectives.",
                numbered: [
                    "State your claim about how the sequence produces meaning.",
                    "Describe the sequence's duration and position in the film.",
                    "Analyse two or three formal elements in detail.",
                    "Quote dialogue exactly and give timecodes.",
                    "Connect form to theme, genre or context.",
                    "Avoid plot summary except where it is necessary to your argument."
                ]
            }
        ],
        practice: [
            { q: "Distinguish continuity editing from montage.", a: "Continuity editing preserves coherent space and time; montage builds meaning through the juxtaposition of shots that may not be spatially continuous." },
            { q: "What does a low camera angle usually suggest?", a: "Power, dominance or threat in the subject, depending on context." },
            { q: "Why are timecodes essential in film analysis?", a: "They let a reader verify your evidence and locate the exact moment you are discussing." },
            { q: "Give an example of non-diegetic sound.", a: "A musical score that the characters cannot hear, added to shape the audience's emotional response." },
            { q: "What is mise-en-scene?", a: "Everything placed within the frame: setting, props, costume, lighting and performance." }
        ],
        checklist: [
            "Watch a five-minute sequence three times and log every shot.",
            "Write a shot list with timecodes and descriptions.",
            "Analyse lighting direction in two scenes.",
            "Compare continuity editing and montage using two examples.",
            "Draft a 500-word sequence analysis with timecodes.",
            "Watch one Nollywood film and one African art film and compare form.",
            "Peer-review a coursemate's analysis for evidence, not opinion."
        ],
        archive: archive([
            { ...SOURCE_2018, year: '2018', label: 'Archived course description', topics: [
                'THA 215 Basic Film Analysis and Appreciation is named in the 2018 course description page',
                'Film study is grouped with media arts and broadcast production',
                'THA 333 Jingle and Effects Design and THA 252 production fundamentals are described nearby',
            ] },
            { ...SOURCE_2019, year: '2019', label: 'Archived programme listing', topics: [
                'THA 215 Basic Film Analysis and Appreciation, 3 credits, first semester, 200 level',
                'Listed with THA 211 and THA 213 in the theory block',
                'Film studies later expands into THA 324 directing and THA 344 design for screen',
            ], changed: 'The 2019 listing places film analysis in a theory block, with production following in the media courses.' },
            { ...CURRENT, topics: [
                'Film analysis remains the 200-level entry to the film track in the compiled map',
                'The department name now includes Film Studies, so expect expanded screen examples',
                'Confirm whether analysis is assessed by exam, coursework or both',
            ] },
        ]),
    },
    {
        slug: "tha-231-rudiments-of-directing",
        code: "THA 231",
        title: "THA 231: Rudiments of Directing - Text, Space and the Six Visual Tools",
        subtitle: "Directing as preparation, composition and communication",
        domain: "Theatre & Film Studies",
        faculty: "Faculty of Arts",
        department: "Theatre & Film Studies",
        level: "200L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free
        tags: ["THA 231", "Directing", "Blocking", "Composition", "Play Analysis", "200L"],
        description: "Directing is not shouting instructions from the back of the hall. This pack covers script analysis for directors, the six visual tools named in the department's course description, blocking and composition, rehearsal technique and the director's production paperwork.",
        outcomes: [
            "Analyse a script for given circumstances, spine and directorial concept.",
            "Apply the six visual tools: ground plan, composition, picturisation, movement, rhythm and pantomimic dramatisation.",
            "Block a scene for clarity and emphasis.",
            "Run a rehearsal with a clear plan and give usable notes."
        ],
        sections: [
            {
                heading: "Script analysis for directors",
                intro: "You cannot stage what you have not understood.",
                bullets: [
                    "Given circumstances: time, place, society, relationships and prior events.",
                    "Spine: the through-line of action that holds the production together.",
                    "Units and beats: divide the scene into playable sections.",
                    "Character objectives and obstacles, scene by scene.",
                    "Theme: the argument the production will make visible.",
                    "Design requirements implied by the text."
                ]
            },
            {
                heading: "The six visual tools",
                intro: "These are the department's named tools; know them by name and use.",
                bullets: [
                    "Ground plan: the spatial arrangement of set, entrances and furniture.",
                    "Composition: where bodies sit in the frame of the stage or camera.",
                    "Picturisation: composing stage pictures that tell the story.",
                    "Movement: planned and motivated physical action across the space.",
                    "Rhythm: pace, pause and tempo changes that shape tension.",
                    "Pantomimic dramatisation: telling story through physical action without words."
                ],
                callout: {
                    title: "Directing is choosing",
                    body: "A production without choices becomes a reading. Decide what the audience should notice in each beat, then use the tools to make them notice it."
                }
            },
            {
                heading: "Rehearsal and notes",
                intro: "Rehearsal technique is a professional skill in its own right.",
                bullets: [
                    "Plan each rehearsal with a goal, a sequence and a stopping point.",
                    "Start with table work before blocking if the text is dense.",
                    "Give notes that are specific, playable and few.",
                    "Never give a note that contradicts the actor's objective without explanation.",
                    "Rehearse transitions, entrances and exits as rigorously as dialogue.",
                    "Keep a prompt script with blocking and cues."
                ]
            }
        ],
        practice: [
            { q: "Name the six visual tools of directing.", a: "Ground plan, composition, picturisation, movement, rhythm and pantomimic dramatisation." },
            { q: "What are given circumstances?", a: "The established conditions of the play - time, place, society, relationships and prior events - that shape character action." },
            { q: "Why must notes be playable?", a: "An actor can act an action such as 'make him leave' but cannot act an abstraction such as 'be more intense'." },
            { q: "How does rhythm affect a scene?", a: "Variation in pace, pause and tempo controls tension, emphasis and the audience's attention." },
            { q: "What belongs in a prompt script?", a: "Blocking, cue calls, scene changes and notes for technical departments." }
        ],
        checklist: [
            "Analyse a short scene into units and beats.",
            "Write a one-page directorial concept.",
            "Draw a ground plan for your scene.",
            "Block two pages and rehearse them with actors.",
            "Practise giving three playable notes.",
            "Time a run-through and adjust the rhythm.",
            "Review a recorded scene and identify two composition errors."
        ],
        archive: archive([
            { ...SOURCE_2018, year: '2018', label: 'Archived course description', topics: [
                'The 2018 page describes the director and the six visual tools: ground plan, composition, picturisation, movement, rhythm and pantomimic dramatisation',
                'Play analysis and communication of meaning to varied audiences',
                'Emphasis on proscenium dominance, model making and performance space configuration',
            ] },
            { ...SOURCE_2019, year: '2019', label: 'Archived programme listing', topics: [
                'THA 231 Rudiments of Directing, 3 credits, first semester, 200 level',
                'THA 322 Script Analysis and Interpretation for Performance follows at 300 level',
                'THA 433 Studies in Technical Directing appears at 400 level',
            ], changed: 'The 2019 listing gives directing a three-step ladder (231, 322, 433) rather than a single described course.' },
            { ...CURRENT, topics: [
                'Rudiments of directing remains the 200-level directing core',
                'The six visual tools are still the named framework to use in answers',
                'Confirm whether your directing assessment includes a staged scene or a written prompt book',
            ] },
        ]),
    },
    {
        slug: "tha-242-costume-and-appearance-design",
        code: "THA 242",
        title: "THA 242: Costume and Appearance Design - Stage, Screen and Carnival",
        subtitle: "Dress a character with intention, from festival spectacle to film close-up",
        domain: "Theatre & Film Studies",
        faculty: "Faculty of Arts",
        department: "Theatre & Film Studies",
        level: "200L",
        material_type: "lab-manuals",
        subcategory: "lab-manuals",
        priceKobo: 0, // free
        tags: ["THA 242", "Costume", "Make-up", "Carnival", "Design", "200L"],
        description: "Costume is character information made visible. This pack covers research and period sources, colour and silhouette, fabric behaviour under stage light and camera, make-up for stage versus screen, and the workflow from sketch to fitting to wardrobe maintenance.",
        outcomes: [
            "Research and document a period or cultural costume source responsibly.",
            "Design costumes that communicate character, status and period.",
            "Distinguish stage make-up from screen make-up technique.",
            "Manage a wardrobe plot, fittings and maintenance for a production."
        ],
        sections: [
            {
                heading: "Research and concept",
                intro: "Design begins with evidence, not mood boards alone.",
                bullets: [
                    "Identify the period, region, class and occasion of the production.",
                    "Collect primary sources: photographs, museum catalogues, archival images.",
                    "Note what a fabric, dye or accessory would actually have been available.",
                    "Avoid mixing culturally distinct dress traditions into a generic 'African' look.",
                    "Write a concept statement linking costume choices to character and theme.",
                    "Credit your sources in a design file."
                ],
                callout: {
                    title: "Specific, not decorative",
                    body: "A faded collar tells the audience about money. A random bright scarf tells them nothing."
                }
            },
            {
                heading: "Colour, silhouette and light",
                intro: "Costume must read from the back row and survive a close-up.",
                bullets: [
                    "Silhouette communicates status and period before detail is visible.",
                    "Colour reads differently under tungsten, LED and daylight.",
                    "Pattern can vibrate on camera; test on screen before approval.",
                    "Fabric weight affects movement, heat and sound.",
                    "Contrast separates a character from the set; blending creates anonymity.",
                    "Test make-up under the actual lighting plot, not a bathroom mirror."
                ]
            },
            {
                heading: "Workflow and wardrobe",
                intro: "A costume department is logistics as much as art.",
                bullets: [
                    "Costume plot: every character, scene and change listed in a table.",
                    "Measurements, fittings and alteration schedules.",
                    "Budget per character and per scene; track receipts.",
                    "Quick-change plans and dressers for fast transitions.",
                    "Maintenance: cleaning, repairs, labelling and storage.",
                    "Returns, hires and security of borrowed items."
                ]
            }
        ],
        practice: [
            { q: "What is a costume plot?", a: "A table listing each character's costume for each scene, including changes, accessories and responsible crew." },
            { q: "Why must costume be tested under stage lighting?", a: "Colour and texture shift under different light sources, so a costume that reads well in daylight may disappear on stage." },
            { q: "Give two differences between stage and screen make-up.", a: "Stage make-up is heavier and more defined to read at distance; screen make-up is finer and controlled for close-ups and camera colour." },
            { q: "Why is cultural specificity important in design?", a: "It communicates accurately and respectfully, avoiding the flattening of distinct traditions into a generic aesthetic." },
            { q: "What should a quick-change plan include?", a: "The change, timing, dresser assignment, garment preparation and a rehearsal of the change." }
        ],
        checklist: [
            "Build a research file with five primary sources.",
            "Write a concept statement for one character.",
            "Draw two costume sketches with fabric swatches.",
            "Create a costume plot for a short play.",
            "Test make-up under stage lighting and photograph it.",
            "Cost your design and list hire items.",
            "Rehearse one quick change with a dresser."
        ],
        archive: archive([
            { ...SOURCE_2018, year: '2018', label: 'Archived course description', topics: [
                'THA 242 Costume and Appearance Designs: From Festive Spectacle to Carnival',
                'History of costuming and make-up through the ages; textiles, cosmetology and fashion trends',
                'Sketching, match-ups, fittings, highlights, accessories and finishing',
            ] },
            { ...SOURCE_2019, year: '2019', label: 'Archived programme listing', topics: [
                'THA 242 Costume and Appearance Designs, 3 credits, second semester, 200 level',
                'THA 344 Costume and Make-Up Design for the Stage and Screen follows at 300 level',
                'Costume sits within the technology and design stress area',
            ], changed: 'The 2019 listing adds THA 344, extending costume design explicitly to screen work.' },
            { ...CURRENT, topics: [
                'Costume and appearance design remains the 200-level design core',
                'Screen make-up is now likely to be assessed given the film track',
                'Confirm whether materials are provided or self-funded for practicals',
            ] },
        ]),
    },
    {
        slug: "tha-252-radio-tv-and-film-production",
        code: "THA 252",
        title: "THA 252: Fundamentals of Radio, TV and Film Production",
        subtitle: "Plan, shoot and edit a short production with the equipment you actually have",
        domain: "Theatre & Film Studies",
        faculty: "Faculty of Arts",
        department: "Theatre & Film Studies",
        level: "200L",
        material_type: "lab-manuals",
        subcategory: "lab-manuals",
        priceKobo: 0, // free
        tags: ["THA 252", "Radio Production", "Television", "Film Production", "Editing", "200L"],
        description: "This pack is a production manual for students with limited equipment: a phone, a borrowed camera and free editing software. It covers formats and durations, scripting for radio and screen, shooting coverage, sound capture, editing workflow and delivery formats.",
        outcomes: [
            "Write a production proposal with format, audience, duration and budget.",
            "Record clean sound and shoot usable coverage on limited equipment.",
            "Edit a short sequence with continuity and a coherent mix.",
            "Export and deliver in the required broadcast or online format."
        ],
        sections: [
            {
                heading: "Formats and scripts",
                intro: "Different media demand different scripts.",
                bullets: [
                    "Radio drama: sound-only storytelling; write for ears, not eyes.",
                    "Radio magazine or news: timing, cue and actuality inserts.",
                    "Television: visual continuity, presenter links and package structure.",
                    "Short film: visual storytelling with economy; fewer locations, stronger scenes.",
                    "Documentary: research, contributor access, ethics and release forms.",
                    "Always write to a duration you can actually fill."
                ]
            },
            {
                heading: "Production on limited equipment",
                intro: "Technique beats gear at student level.",
                bullets: [
                    "Lock exposure and focus manually where possible; autofocus hunts in low light.",
                    "Record sound close to the source; a cheap lavalier beats a distant camera mic.",
                    "Shoot coverage: wide, medium, close and cutaways for every scene.",
                    "Observe the 180-degree rule and keep screen direction consistent.",
                    "Use available light thoughtfully; bounce and diffuse before adding fixtures.",
                    "Log every take with scene, shot and notes."
                ],
                callout: {
                    title: "Sound first",
                    body: "Audiences forgive soft images but not unusable audio. Capture clean dialogue and wild track before you chase a prettier shot."
                }
            },
            {
                heading: "Post-production and delivery",
                intro: "Editing is where the story is actually built.",
                bullets: [
                    "Organise footage by scene and take before editing.",
                    "Assemble a rough cut for story, then refine rhythm.",
                    "Keep audio levels consistent; avoid clipping.",
                    "Add music only where licensed or original.",
                    "Colour-correct for consistency rather than spectacle.",
                    "Export to the required codec, resolution and duration; check playback on a phone."
                ]
            }
        ],
        practice: [
            { q: "Why is a lavalier microphone usually better than a camera microphone?", a: "It sits close to the speaker, capturing clearer dialogue and rejecting more room noise." },
            { q: "What coverage should you shoot for each scene?", a: "A wide master, mediums, close-ups and cutaways, so the edit has choices." },
            { q: "What is wild track?", a: "Audio recorded separately from picture, such as room tone or effects, used to build the soundtrack." },
            { q: "Why export and test on a phone?", a: "Most viewers watch on mobile, and phone playback reveals level, framing and legibility problems." },
            { q: "Name two documentary ethics requirements.", a: "Informed consent from contributors and accurate representation; release forms and protection of vulnerable subjects also apply." }
        ],
        checklist: [
            "Write a one-page production proposal.",
            "Script a three-minute radio piece and a three-minute screen scene.",
            "Shoot coverage for one scene with logged takes.",
            "Record clean dialogue and room tone.",
            "Edit a rough cut and a fine cut.",
            "Mix audio and check levels on headphones and phone speaker.",
            "Export and screen it for feedback."
        ],
        archive: archive([
            { ...SOURCE_2018, year: '2018', label: 'Archived course description', topics: [
                'THA 252 Fundamentals of Radio, Television and Film Production',
                'Electronic media designs, audio-visual production styles for radio, television, filmic rendition and documentary',
                'Use of media, equipment and studio environments emphasised',
            ] },
            { ...SOURCE_2019, year: '2019', label: 'Archived programme listing', topics: [
                'THA 252 Fundamentals of Radio, TV and Film Production, 3 credits, second semester, 200 level',
                'THA 324 Techniques of Radio, TV and Film Directing and Production follows at 300 level',
                'THA 333 Jingle and Effects Design for Radio and Television also listed',
            ], changed: 'The 2019 listing separates production fundamentals (252) from directing (324) and effects design (333).' },
            { ...CURRENT, topics: [
                'Production fundamentals remains the 200-level media core',
                'Expect a submitted production artefact, not only a written exam',
                'Confirm equipment booking rules and whether you may shoot on a phone',
            ] },
        ]),
    },
    {
        slug: "tha-341-community-theatre-for-development",
        code: "THA 341",
        title: "THA 341: Community Theatre for Development - TfD in Practice",
        subtitle: "Make theatre with a community, not about one",
        domain: "Theatre & Film Studies",
        faculty: "Faculty of Arts",
        department: "Theatre & Film Studies",
        level: "300L",
        material_type: "lecture-notes",
        subcategory: "lecture-notes",
        priceKobo: 0, // free
        tags: ["THA 341", "Theatre for Development", "Community Theatre", "Boal", "Freire", "300L"],
        description: "Theatre for Development is participatory, research-led and ethically demanding. This pack covers the TfD cycle, key theorists from Boal and Freire to Abah and Etherton, participatory research methods, ethics and consent, and how to document a project honestly rather than claiming impact you did not measure.",
        outcomes: [
            "Explain the TfD cycle from entry to evaluation.",
            "Apply participatory methods to identify a community's priority issue.",
            "Design a drama process that invites community participation and ownership.",
            "Evaluate and document a project with honest evidence."
        ],
        sections: [
            {
                heading: "What TfD is and is not",
                intro: "Development theatre is not a health message delivered with drums.",
                bullets: [
                    "Community members are participants and co-authors, not an audience to be instructed.",
                    "The issue must emerge from dialogue with the community, not from the facilitator's assumptions.",
                    "Aesthetics matter; a clumsy play patronises its audience and loses attention.",
                    "Facilitators hold power and must manage it deliberately.",
                    "Sustainability depends on local ownership, not donor enthusiasm.",
                    "Documentation and evaluation are part of the work, not an afterthought."
                ]
            },
            {
                heading: "The TfD cycle",
                intro: "A repeatable sequence keeps the work honest.",
                numbered: [
                    "Entry and rapport building with community leaders and groups.",
                    "Participatory research: listening, mapping, ranking problems with the community.",
                    "Analysis and scenario building with local participants.",
                    "Workshop, improvisation and rehearsal.",
                    "Performance or intervention with audience participation.",
                    "Reflection, follow-up and evaluation with the community."
                ],
                callout: {
                    title: "Boal's spect-actor",
                    body: "Forum theatre invites spectators to intervene in the action. Learn the technique properly rather than asking the audience for 'questions' at the end."
                }
            },
            {
                heading: "Ethics and honest evaluation",
                intro: "Community work carries obligations.",
                bullets: [
                    "Informed consent for participation, filming and photographs.",
                    "Anonymity and confidentiality where individuals are vulnerable.",
                    "Avoid extracting stories for assessment and disappearing.",
                    "Do not claim behaviour change without evidence.",
                    "Record attendance, contributions and follow-up actions.",
                    "Share findings and the final documentation with the community."
                ]
            }
        ],
        practice: [
            { q: "Who owns a TfD project?", a: "The community, with the facilitator supporting their process and decisions; not the facilitator or the sponsor." },
            { q: "What is forum theatre?", a: "A participatory form where spectators become 'spect-actors' and intervene in the action to test alternative solutions to an oppression." },
            { q: "Why is participatory research essential?", a: "It surfaces the community's own priorities and language, preventing a project that solves a problem nobody identified." },
            { q: "Give two ethical requirements for documenting a TfD project.", a: "Informed consent for participation and media, and protecting the anonymity of vulnerable participants." },
            { q: "Why avoid claiming behaviour change without evidence?", a: "It misrepresents impact, undermines trust and makes the work impossible to evaluate or repeat honestly." }
        ],
        checklist: [
            "Read one TfD case study and summarise its cycle.",
            "Draft a participatory research plan.",
            "Write consent and release forms.",
            "Facilitate one improvisation workshop with peers.",
            "Document a session with notes, photos and attendance.",
            "Write an evaluation plan that names your indicators.",
            "Present findings to the group you worked with."
        ],
        archive: archive([
            { ...SOURCE_2018, year: '2018', label: 'Archived course description', topics: [
                'THA 341 Community Theatre for Development described under popular theatre',
                'Theorists named: Boal, Brecht, Kidd, Freire, Etherton, Abah, Wa Thiong\'o, Colleta',
                'Practical work requires participation in TfD projects, with performance at the site and audio-visual documentation',
            ] },
            { ...SOURCE_2019, year: '2019', label: 'Archived programme listing', topics: [
                'THA 341 Community Theatre for Development, 3 credits, first semester, 300 level',
                'THA 261 Theatre in Education and Community at 200 level feeds into it',
                'THA 369 Theatre and Development Studies appears in the course descriptions',
            ], changed: 'The 2019 listing makes community theatre a 300-level core after a 200-level education and community course.' },
            { ...CURRENT, topics: [
                'Community theatre for development remains a 300-level applied core',
                'Assessment usually includes a field project and a reflective report',
                'Confirm transport, partner communities and safeguarding expectations before fieldwork',
            ] },
        ]),
    },
    {
        slug: "tha-411-theatre-research-seminar-and-long-essay",
        code: "THA 411",
        title: "THA 411: Theatre Research, Seminar and Long Essay",
        subtitle: "From a topic idea to a bound, defensible final-year essay",
        domain: "Theatre & Film Studies",
        faculty: "Faculty of Arts",
        department: "Theatre & Film Studies",
        level: "400L",
        material_type: "project-materials",
        subcategory: "project-materials",
        priceKobo: 0, // free
        tags: ["THA 411", "Long Essay", "Thesis", "Research Methods", "MLA", "400L"],
        description: "The department's long essay is a supervised research project with a defined format. This pack covers choosing a topic, research questions, literature review, methodology for practice-based and text-based work, seminar presentation, the MLA style the department specifies, and the submission schedule.",
        outcomes: [
            "Turn a broad interest into a focused research question.",
            "Write a literature review that positions your study.",
            "Choose a method appropriate to text-based, practice-based or audience research.",
            "Present a seminar and submit a correctly formatted long essay."
        ],
        sections: [
            {
                heading: "Topic and research question",
                intro: "A topic is a field; a research question is an argument you can finish.",
                bullets: [
                    "Start from a problem you can state in one sentence.",
                    "Narrow by text, production, period, audience or practice.",
                    "Check that sources and access exist before committing.",
                    "Write a question answerable with evidence you can actually gather.",
                    "Agree the title with your supervisor early.",
                    "Keep a research log of decisions and supervisor comments."
                ]
            },
            {
                heading: "Literature and method",
                intro: "The review positions you; the method tells the reader how you will answer.",
                bullets: [
                    "Group sources by debate, not by author-by-author summary.",
                    "Identify the gap your study addresses.",
                    "Textual analysis: close reading supported by theory.",
                    "Practice-based research: document process, decisions and reflection.",
                    "Audience or field research: sampling, instruments, consent and ethics.",
                    "Be explicit about limitations rather than overclaiming."
                ],
                callout: {
                    title: "MLA, as specified",
                    body: "The department style manual specifies MLA. Use in-text parenthetical citations and a Works Cited page, and check every entry against the source."
                }
            },
            {
                heading: "Seminar and submission",
                intro: "The calendar is part of the assessment.",
                bullets: [
                    "Draft a proposal: title, question, rationale, method, chapter outline, bibliography.",
                    "Present a seminar with slides that show argument, not paragraphs.",
                    "Expect challenging questions and record the feedback.",
                    "Submit chapters progressively to your supervisor.",
                    "Proofread for citation consistency and formatting.",
                    "Meet the binding and submission deadline; late work risks non-assessment."
                ]
            }
        ],
        practice: [
            { q: "What distinguishes a research question from a topic?", a: "A topic names an area; a research question specifies what you will argue or find out, with scope and evidence." },
            { q: "How should a literature review be organised?", a: "By themes or debates that position your study, identifying agreements, tensions and the gap you address." },
            { q: "Name two ethical requirements for audience research.", a: "Informed consent and confidentiality or anonymity of participants." },
            { q: "Why state limitations?", a: "It shows methodological honesty and prevents overclaiming beyond what your evidence supports." },
            { q: "What citation style does the department specify for the long essay?", a: "MLA, per the departmental style manual referenced in the course description." }
        ],
        checklist: [
            "Write three possible research questions and rank them by feasibility.",
            "Agree a title and scope with your supervisor.",
            "Build an annotated bibliography of 15 sources.",
            "Draft a two-page proposal.",
            "Present one seminar and record the feedback.",
            "Submit two chapters for supervision.",
            "Check every citation and the Works Cited page before binding."
        ],
        archive: archive([
            { ...SOURCE_2018, year: '2018', label: 'Archived course description', topics: [
                'Seminar course requiring a topic from theatre and film studies, presented before a panel of assessors',
                'Long essay of not more than sixty pages, double spaced, bound with notes and illustrations',
                'Department Style Manual specifying MLA style referenced explicitly',
            ] },
            { ...SOURCE_2019, year: '2019', label: 'Archived programme listing', topics: [
                'THA 415 Seminar in Theatre Studies and THA 417 Studies in Dramatic Literature at 400 level',
                'Final-year specialisation streams: history and criticism, technology and design, directing',
                'THA 413 Theories of Dramatic Criticism listed in the same semester',
            ], changed: 'The 2019 listing splits the final-year research and seminar work across THA 415 and THA 417, and adds specialisation streams.' },
            { ...CURRENT, topics: [
                'The long essay and seminar remain the final-year capstone in the compiled map',
                'MLA remains the specified citation style in the archived departmental description',
                'Confirm your supervisor allocation, chapter deadlines and binding requirements in your first week',
            ] },
        ]),
    },
    {
        slug: "theatre-film-outline-archive-2018-2026",
        code: null,
        title: "Theatre & Film Studies Outline Archive: 2018, 2019 and the 2025/2026 Working Map",
        subtitle: "The full departmental course map, year by year, with differences marked",
        domain: "Departmental Archive",
        faculty: "Faculty of Arts",
        department: "Theatre & Film Studies",
        level: "100L",
        material_type: "project-materials",
        subcategory: "project-materials",
        priceKobo: 0, // free
        tags: ["Theatre Arts", "Film Studies", "Course Outline", "Archive", "Session", "UNIZIK"],
        description: "This is the archive index for the department: what the 2018 course-description page listed, what the 2019 programme page listed, and a compiled 2025/2026 working map that shows what changed. It exists so you can see a code in its year instead of assuming every listing is current. Both original pages now return 404, so the sources, publication dates and retrieval dates are recorded on every entry.",
        outcomes: [
            "Read a departmental course map with its year, level and semester intact.",
            "Identify which codes disappeared, appeared or were renumbered between snapshots.",
            "Distinguish an archived listing from a compiled working map.",
            "Check your own registration against the department's current, official list."
        ],
        sections: [
            {
                heading: "Why an archive instead of a single list",
                intro: "Course codes are not permanent. A single undated list is worse than useless, because it looks authoritative while hiding its age.",
                bullets: [
                    "The 2018 description and the 2019 programme page disagree in places.",
                    "THA 113 appears in 2018 and is absent in 2019.",
                    "THA 122, THA 153 and THA 161 appear in 2019 and are not described in 2018.",
                    "The department now includes Film Studies in its name, which the older pages do not reflect.",
                    "Both source pages now return 404 after the university site restructure, so the record here preserves what they said.",
                    "Always confirm the live version with your department before registering."
                ],
                callout: {
                    title: "What 'current' means here",
                    body: "The 2025/2026 entry is a compiled working map built from the archived sources and the department's published stress areas. It is clearly labelled and it is not an official handout."
                }
            },
            {
                heading: "The department's ten stress areas",
                intro: "Course numbering encodes the stress area, so learn the map.",
                bullets: [
                    "Theatre history and comparative theatre.",
                    "Dramatic theory and criticism.",
                    "Dramaturgy: playwriting and directing.",
                    "Technology and design: lighting, sound, scenery, costume and make-up.",
                    "Performance arts: acting, speech, mime, movement, puppetry.",
                    "Media, film and broadcast arts.",
                    "Theatre in education and applied theatre.",
                    "Theatre administration and management.",
                    "Theatre music and choreography.",
                    "Popular theatre and theatre for development."
                ]
            },
            {
                heading: "How to use this archive",
                intro: "Use the year bands in this pack as a checking tool.",
                numbered: [
                    "Find the course code you are registering for.",
                    "Note the year band in which it appears.",
                    "If a code exists only in an older band, ask the department whether it still runs.",
                    "Compare credit values across bands; they change.",
                    "Do not cite a 2018 or 2019 listing as proof of the current curriculum.",
                    "Record the official answer you receive, with the date and the officer's name."
                ]
            }
        ],
        practice: [
            { q: "Which course code appears in 2018 but is absent from the 2019 programme listing?", a: "THA 113, Theatre History in Perspective: 500 BC - 1800 AD." },
            { q: "Name two codes introduced in the 2019 listing that are not described in 2018.", a: "THA 122 Basic Performance Skills and THA 161 Participation Orientation; THA 153 Communication Models is also new in that listing." },
            { q: "Why is an undated course list a problem?", a: "It appears current while possibly describing a superseded curriculum, leading students to register for the wrong courses." },
            { q: "What should you do if a code only appears in the 2018 band?", a: "Confirm with the departmental office or your course rep whether it still runs before relying on it." },
            { q: "What does the current band in this archive represent?", a: "A compiled working map built from the archived pages and published stress areas, not an official UNIZIK handout." }
        ],
        checklist: [
            "Print or save the three year bands and highlight your courses.",
            "List every code you plan to register for.",
            "Mark which band each code appears in.",
            "Ask the department about any code that appears only in an older band.",
            "Record the official answer with date and officer name.",
            "Share the archive with your coursemates and correct any rumour.",
            "Re-check after registration opens, since lists can change mid-cycle."
        ],
        archive: archive([
            { ...SOURCE_2018, year: '2018', label: 'Archived course description', topics: [
                'THA 101, 111, 112, 113, 131, 132, 142, 151, 152, 162 described, with 200-level courses 202, 211, 212, 213, 214, 215, 242, 243, 244, 252',
                '300-level media and design courses 333, 341, 369 plus 400-level 412 and 424',
                'Long essay and seminar requirements described with the departmental style manual (MLA)',
            ], changed: 'The 2018 page is description-led; it does not give a complete semester-by-semester credit table for every level.' },
            { ...SOURCE_2019, year: '2019', label: 'Archived programme listing', topics: [
                '100 level: THA 101, 111, 131, 151, 153, 161 (first semester); THA 112, 122, 132, 142, 152, 162 (second semester)',
                '200 level: THA 211, 213, 215, 231, 233, 243, 261; THA 202, 212, 214, 242, 252, 262, 264',
                '300 level: THA 311, 313, 315, 331, 341, 343; THA 322, 324, 332, 342, 344; 400 level streams and THA 411, 413, 415, 417, 433, 435',
            ], changed: 'The 2019 listing is a full credit table and includes THA 122, 153 and 161, which the 2018 description does not.' },
            { ...CURRENT, topics: [
                'The department now runs as Theatre and Film Studies, with a film and broadcast track visible in THA 215, 252, 324, 333 and 344',
                'The ten stress areas remain the organising logic of course numbering',
                'Codes, credits and semester placement may have been revised under newer university curriculum standards - verify before registration',
            ] },
        ]),
    },
]
