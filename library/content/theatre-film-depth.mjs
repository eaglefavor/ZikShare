// Depth layers for the Theatre & Film Studies 100-level packs.
//
// Each layer is merged onto the pack with the same slug at build time. The
// base entry carries the course framing; these layers carry the material a
// student actually needs to study from: longer explanations, worked examples,
// exam-style questions with model outlines, a glossary, a four-week plan and
// a short reading list.
//
// Everything here is written for this library. Nothing is copied from a
// departmental handout, and no question is presented as a past paper.

export const THEATRE_FILM_DEPTH = {
    'tha-101-traditional-african-theatre': {
        sections: [
            {
                heading: 'The festival as a system, not a list of elements',
                paragraphs: [
                    'A festival performance is organised the way a play is organised: it has a sequence, entrances, climaxes and a close. What changes is who controls the sequence. In a written play the playwright and director fix the order; in a festival the order is held by ritual knowledge, the calendar and the titled elders or priests who authorise each stage.',
                    'This is why a performance report that simply lists "drums, masquerades, dancing and singing" scores badly. A stronger report explains function: the drums cue the transition from the profane to the sacred phase; the masquerade marks the moment the ancestors are present; the dance pattern identifies which lineage group is hosting; the audience response signals whether the performance is accepted.',
                    'The festival also distributes roles in a way that resembles a production team. There are custodians of the shrine (comparable to a producer holding authority), performance leaders (director and choreographer), costumed and masked specialists (design and costume), musicians (sound and score) and the community (audience and chorus). Naming these parallels shows you understand theatre as an organised event rather than a collection of "culture".',
                ],
                callout: {
                    title: 'A test for your own writing',
                    body: 'For every element you mention, write "and therefore...". Drums, and therefore the mood shifts and the audience knows the phase has changed. If you cannot finish the sentence, cut the element.',
                },
            },
            {
                heading: 'Masquerade, secrecy and the ethics of description',
                paragraphs: [
                    'The masquerade is not a costume worn by a performer for entertainment. In many communities the mask is the visible form of a presence - an ancestor, a deity, a social authority - and the identity of the wearer is protected by custom. This creates a real constraint on what an outsider may record and publish.',
                    'Academically, describe what the audience is permitted to see and what the community itself says about the figure. Do not attempt to unmask a performer in your writing, do not speculate about individuals, and do not photograph restricted moments. Ethics is part of method here, not an afterthought: a report that violates a community restriction is worthless as scholarship because the performance it describes will never be allowed to happen in front of a researcher again.',
                    'Use the community\'s own names for the figure and the festival. Where a translation is necessary, give the local term first and an approximate gloss in brackets, and note that the gloss is approximate. This small habit signals that you understand the difference between a translation and an equivalent.',
                ],
            },
            {
                heading: 'Oral tradition as a script',
                paragraphs: [
                    'An oral performance has a text, but the text is stored in memory, in music and in inherited formulas rather than on paper. That text is remarkably stable in structure and remarkably flexible in wording: the praise singer may improvise lines about a visitor, but the order of praise names and the sequence of the ceremony do not change.',
                    'This is directly comparable to formulaic composition in other traditions, and it is why "the play was not written down" does not mean "the play had no form". When you describe oral theatre, identify the fixed structure (the sequence of episodes) separately from the variable material (improvised praise, topical satire, audience interaction).',
                    'For analysis, use a transcription method: record with permission, transcribe with the help of a speaker of the language, mark the boundaries between song, speech and action, and note where the performer departed from the expected pattern. That transcription evidence is what turns an opinion about "rich oral tradition" into an argument.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Analysing a performance you attended',
                brief: 'You watched a masquerade festival in your town and must write a 500-word analysis. Here is the reasoning order that earns marks.',
                steps: [
                    'Open with the occasion: name the festival, the community, the date, and who authorised the performance. One sentence, no adjectives.',
                    'Describe the space in three sentences: where the audience stood, where the performance happened, and what that division allowed or prevented.',
                    'Trace the sequence in four beats - gathering, entry of the masked figures, the central action, the closing. Give beats, not a minute-by-minute diary.',
                    'Analyse two elements in depth rather than six in passing: music as a structural cue, and costume as an announcement of identity or rank.',
                    'Describe audience participation with evidence: when did people join, what did their joining change, who did not participate.',
                    'Close with the social function, phrased as a claim supported by what you saw, not as a slogan.',
                ],
                takeaway: 'Depth on two elements beats breadth on eight. An examiner can only award analysis for something you explained.',
            },
            {
                title: 'Comparing ritual and theatre without ranking them',
                brief: 'A question asks you to distinguish ritual from theatre using one example each.',
                steps: [
                    'Define the criterion instead of the term: ritual is action whose primary purpose is to enact a required transformation; theatre is action presented for an audience whose primary purpose is to witness a fiction or a representation.',
                    'State the overlap immediately: both use costume, space, sequence, music and an audience, which is why the origin debate exists.',
                    'Give your ritual example (a naming ceremony, a burial rite) and identify its required outcome.',
                    'Give your theatre example (a staged play) and identify its framing - the agreed pretence that what is happening is representation.',
                    'Conclude with what the distinction buys you: it lets you describe African festival forms as theatre without denying their ritual work.',
                ],
                takeaway: 'Never define by absence ("ritual has no audience"). Define by purpose and framing, then admit the overlap.',
            },
        ],
        examBank: [
            {
                question: 'With reference to one Nigerian festival you have observed, discuss the claim that traditional African theatre is "total theatre".',
                marks: '20 marks - about 35 minutes',
                outline: [
                    'Introduce total theatre as the integration of space, music, dance, costume, mask, narrative and audience participation in one event; attribute the framing carefully to the scholarship you have read.',
                    'Name your festival and its community, season and authorising authority. One paragraph of context.',
                    'Take three elements and show how each carries meaning: music as cue and mood, costume/mask as identity, space as the boundary between ordinary and sacred.',
                    'Show the integration, not just the coexistence: how does a drum pattern change the costume\'s meaning? How does the audience response complete the performance?',
                    'Acknowledge the limitation of the concept: "total" can flatten differences between festival traditions and can imply a unity the participants themselves do not claim.',
                    'Conclude that the concept is useful as an analytical starting point, provided you keep the community\'s own account of the event in view.',
                ],
                trap: 'Naming seven elements with no explanation of how they work together. That is description, not argument.',
            },
            {
                question: 'How does the masquerade tradition complicate the idea that theatre is a form of pretence?',
                marks: '15 marks',
                outline: [
                    'Set out the standard account: theatre involves an agreed pretence, with an actor playing a character.',
                    'Explain the masquerade\'s own claim: the figure is not a representation of a presence but a manifestation of it, which is why secrecy governs the performer\'s identity.',
                    'Identify the consequence for the audience: they are not suspending disbelief, they are participating in a belief system with obligations.',
                    'Discuss the scholarly problem: outsiders often describe masquerade as theatre, while insiders may reject that description as a category error.',
                    'Conclude with a defensible position: masquerade is performance and often theatrical in form, but "pretence" is the wrong frame for its own account of itself.',
                ],
                trap: 'Dismissing the community\'s account as superstition. Describe the claim, then analyse it.',
            },
            {
                question: 'What does an oral performance lose and gain when it is written down?',
                marks: '15 marks',
                outline: [
                    'Define what writing fixes: wording, sequence, and a text that can travel without performers.',
                    'Identify what is lost: variation, responsiveness to the audience, the authority of the living performer, and the ritual occasion itself.',
                    'Identify what is gained: preservation, wider circulation, teachability, and the possibility of close textual analysis.',
                    'Use one example - a transcribed praise poem or a published festival account - and show a specific feature that the transcription cannot carry, such as tone, timing or audience response.',
                    'Conclude that transcription is a translation between media, and should be read with the method of the transcriber in view.',
                ],
            },
        ],
        glossary: [
            { term: 'Total theatre', definition: 'A performance mode in which space, music, movement, costume, mask and audience participation operate together as one system of meaning.' },
            { term: 'Ritual', definition: 'A prescribed sequence of actions performed to bring about a required transformation, such as purification, initiation or thanksgiving.' },
            { term: 'Masquerade', definition: 'A costumed and masked performance figure whose identity is protected by custom and whose appearance often marks a sacred or judicial moment.' },
            { term: 'Oral tradition', definition: 'Knowledge and performance text transmitted through memory, apprenticeship and recitation rather than writing.' },
            { term: 'Performance space', definition: 'The physical and social area in which a performance happens, including the boundary between performers and audience.' },
            { term: 'Call and response', definition: 'A structural pattern in which a lead voice or drummer states a phrase and the group answers, organising participation and timing.' },
            { term: 'Communal performance', definition: 'Performance in which the community is not a passive audience but a participant with defined roles and obligations.' },
            { term: 'Festival calendar', definition: 'The seasonal schedule that determines when a performance may take place, often tied to harvest, planting or ritual cycles.' },
            { term: 'Proscenium', definition: 'A stage framed by an arch that separates performers from spectators, associated with illusionistic European theatre.' },
            { term: 'Dramatic text', definition: 'The composed verbal structure of a play, whether written or held in memory, as distinct from a particular production.' },
            { term: 'Custodian', definition: 'A person or lineage holding ritual authority over a performance, its space and its rules of access.' },
            { term: 'Ethnographic description', definition: 'Description of a cultural practice grounded in observation and the community\'s own account, with the researcher\'s method stated.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Build the vocabulary', focus: 'Definitions you can defend in a sentence.', tasks: ['Write your own definitions of ritual, festival, theatre and performance.', 'Collect three festival examples with community, season and function.', 'Attend or watch one recorded festival and take structured notes.'] },
            { week: 'Week 2 - Analyse one event', focus: 'Depth on two elements.', tasks: ['Describe the performance space in a labelled diagram.', 'Trace four beats of the event.', 'Analyse music and costume with evidence, not adjectives.'] },
            { week: 'Week 3 - Write under time', focus: 'Exam-shaped practice.', tasks: ['Answer the total-theatre question in 35 minutes without notes.', 'Mark it against the outline in this pack.', 'Rewrite the weakest paragraph only.'] },
            { week: 'Week 4 - Consolidate', focus: 'Recall and ethics.', tasks: ['Recite the glossary terms and give an example for each.', 'Re-read your performance report for unevidenced claims.', 'Take two specific questions to your lecturer.'] },
        ],
        readingList: [
            'Ogunba, O. - The Movement of Transition: a study of the plays of Wole Soyinka (festival and ritual framing).',
            'Adedeji, J. - writing on the Alarinjo travelling theatre tradition.',
            'Soyinka, W. - Myth, Literature and the African World, the essay usually cited as "The Fourth Stage".',
            'Any departmental course outline for THA 101: read the set texts before the lecture, not after.',
        ],
    },

    'tha-111-introduction-to-drama-and-theatre': {
        sections: [
            {
                heading: 'Text, performance and the gap between them',
                paragraphs: [
                    'A play script is an incomplete document. It records dialogue and some stage directions, but it leaves casting, tempo, spatial arrangement, lighting, sound and the audience relationship to a production. Two directors staging the same script can produce events that feel unrelated.',
                    'This is why "the play" is ambiguous. Drama is the composed work; theatre is an event that exists only while it is happening. When an exam asks you to discuss a play, check which object it means: the text, a specific production, or the idea of the work across productions. Confusing the three produces answers that drift between literary analysis and reviewing.',
                    'A useful habit is to separate three questions. What does the text require? What did this production choose? What did those choices do to the meaning? Answering only the first is a literature answer, not a theatre answer.',
                ],
            },
            {
                heading: 'The six elements and what they are for',
                paragraphs: [
                    'Aristotle\'s six elements - plot, character, thought, diction, song and spectacle - are usually memorised and never used. Used properly, they are a checklist for explaining how a play produces its effect, ordered roughly from the most to the least essential in his account.',
                    'Plot here means the arrangement of incidents, not the story as chronology. Character means the moral and dramatic function a figure serves. Thought is the reasoning and themes articulated by the action. Diction is the verbal medium, including imagery and rhythm. Song covers the musical and choral dimension. Spectacle is everything seen: design, costume, staging.',
                    'For any play on your course, work through the six and rank them for that specific text. In a densely plotted tragedy, plot dominates; in a play built on argument, thought does; in a masque-like spectacle, the ranking inverts. The ranking is the analysis.',
                ],
                callout: {
                    title: 'Say "arrangement", not "story"',
                    body: 'If you can swap two scenes without changing the play, you have identified where the plot work actually happens. Try it on any set text.',
                },
            },
            {
                heading: 'From ritual and festival to purpose-built theatre',
                paragraphs: [
                    'The standard history moves from communal ritual to civic festival to professional theatre to the proscenium stage, but it is not a story of improvement. Each step changes who the audience is and what the audience is for.',
                    'In a civic festival, the audience is a citizen body, and attendance is partly a civic duty. In commercial theatre, the audience is a paying public, and repertory responds to taste. In proscenium theatre, the audience is seated in darkness, addressed by an illusion that pretends they are not there. Each structure makes some kinds of performance easy and others difficult.',
                    'African festival traditions retained participatory structures that proscenium theatre had reduced, which is why the historical sequence is not a single line of development. The comparison question is not "which is more advanced" but "what does each arrangement allow the audience to do".',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Distinguishing the four terms in an exam sentence',
                brief: 'A question asks: "Drama is not theatre." Discuss. Here is how to build an answer that uses all four terms precisely.',
                steps: [
                    'Define drama as the composed structure of action and speech, whether written or remembered.',
                    'Define theatre as the live event in which performers, space, audience and technology produce meaning together.',
                    'Define performance as the wider category of staged human action, including dance, ritual and sport-like spectacle.',
                    'Define play as a dramatic text, and production as one realisation of it.',
                    'Show a case where the distinction matters: a script that reads as comedy but is staged as tragedy, and what that reveals about where meaning lives.',
                    'Conclude with a position: drama is the score, theatre is the performance, and neither is the whole work.',
                ],
                takeaway: 'Four definitions plus one worked case beats a page of general statements about the magic of the stage.',
            },
            {
                title: 'Reading a stage direction as evidence',
                brief: 'A script says: "(A long silence. The lamp gutters.)" What can you legitimately claim from this?',
                steps: [
                    'Identify what the direction fixes: duration marked as significant, and a dependency on a practical light source on stage.',
                    'State the production requirements it creates: a working lamp, control over dimming or flame effect, and actors able to hold a silence.',
                    'State the interpretive possibilities it opens: crisis, decision, time passing, or social decay, depending on context.',
                    'Distinguish evidence from inference: the silence is in the text; "the marriage is over" is your reading and must be argued.',
                    'Explain how a director\'s choice would change the meaning: a longer silence with the lamp left burning gives a different scene from one played in darkness.',
                ],
                takeaway: 'Stage directions are production constraints. Read them as instructions to a company, not as decoration.',
            },
        ],
        examBank: [
            {
                question: 'Explain, with examples, the difference between drama and theatre, and why the distinction matters for a student of theatre.',
                marks: '20 marks',
                outline: [
                    'Define both terms, and add performance and production for completeness.',
                    'Use one script and describe what the text fixes and what it leaves open.',
                    'Describe one production decision (casting, space, tempo) and show how it changed meaning.',
                    'Explain the disciplinary consequence: literary analysis answers "what does the text mean", theatre analysis answers "how did this event produce meaning".',
                    'Note the limit case: devised and festival theatre may have no fixed dramatic text at all, which tests your definitions.',
                    'Conclude with a working rule for your own essays.',
                ],
                trap: 'Using "drama" and "theatre" interchangeably after defining them carefully. Consistency is marked.',
            },
            {
                question: 'Discuss the claim that Greek theatre was a civic institution rather than entertainment.',
                marks: '15 marks',
                outline: [
                    'Describe the festival of Dionysus: competition, choregos funding, citizen audience, prizes.',
                    'Show the civic dimension: subject matter debated in public, attendance as participation in the polis, the chorus as a civic voice.',
                    'Acknowledge the entertainment dimension: spectacle, comedy competitions, audience reaction.',
                    'Distinguish the two claims rather than choosing one: civic function and popular appeal coexisted.',
                    'Conclude with what the case teaches about any theatre that claims a public role.',
                ],
            },
            {
                question: 'How did the proscenium arch change what theatre could do?',
                marks: '15 marks',
                outline: [
                    'Describe the architectural change: a framed stage, a separated auditorium, controlled sightlines.',
                    'Explain the new possibilities: illusionistic scenery, lighting control, the fourth wall, realistic interior drama.',
                    'Explain what it made harder: direct address, audience participation, fluid multiple locations.',
                    'Compare with one non-proscenium form - festival, arena or thrust stage - on a specific effect.',
                    'Conclude that staging shapes dramaturgy: writers began writing for the space they had.',
                ],
                trap: 'Treating the proscenium as simply "better theatre". It is a set of affordances, not a rank.',
            },
        ],
        glossary: [
            { term: 'Drama', definition: 'The composed structure of action and speech in a play, considered apart from any single production.' },
            { term: 'Theatre', definition: 'The live collaborative event in which performers, audience, space and technology produce meaning together.' },
            { term: 'Performance', definition: 'The broader category of staged human action, including dance, ritual and spectacle beyond scripted drama.' },
            { term: 'Production', definition: 'One particular realisation of a dramatic text by a specific company, in a specific space, on specific dates.' },
            { term: 'Convention', definition: 'An agreed shorthand that an audience accepts, such as the soliloquy or a bare stage standing for a forest.' },
            { term: 'Dramatic irony', definition: 'A gap between what the audience knows and what a character knows, used to produce tension or comedy.' },
            { term: 'Catharsis', definition: 'Aristotle\'s term for the purgation or clarification of pity and fear produced by tragedy.' },
            { term: 'Chorus', definition: 'A group performer in classical drama that comments, questions and embodies communal judgement.' },
            { term: 'Proscenium arch', definition: 'A structural frame separating stage from auditorium, supporting illusionistic staging.' },
            { term: 'Thrust stage', definition: 'A stage projecting into the auditorium so the audience surrounds it on three sides.' },
            { term: 'Fourth wall', definition: 'The imagined boundary between a realistic stage world and its audience, which the actors behave as if unaware of.' },
            { term: 'Devised theatre', definition: 'Performance created collaboratively by a company rather than from a pre-existing script.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Terms', focus: 'Precision with vocabulary.', tasks: ['Write the four definitions from memory.', 'Take one play and identify its genre conventions.', 'Practise using each term in a sentence about a play.'] },
            { week: 'Week 2 - Structures', focus: 'Aristotle in use.', tasks: ['Rank the six elements for two different plays and justify the ranking.', 'Map one play into acts, units and turning points.', 'Explain one stage direction as a production constraint.'] },
            { week: 'Week 3 - History', focus: 'Forms and their affordances.', tasks: ['Draw a timeline from Greek festival to proscenium.', 'Compare two theatre spaces on audience role.', 'Write one paragraph on a non-European tradition.'] },
            { week: 'Week 4 - Exam', focus: 'Timed writing.', tasks: ['Answer the drama/theatre question in 35 minutes.', 'Check every definition is used consistently.', 'Redo the conclusion so it states a position.'] },
        ],
        readingList: [
            'Aristotle - Poetics (any modern translation with notes; read the sections on plot and character).',
            'Any standard introduction to theatre history covering Greek, medieval and Renaissance practice.',
            'Your departmental reading list for THA 111 - editions differ, so cite the one you used.',
            'One play from your course, read twice: once for story, once for staging demands.',
        ],
    },
}

// ── Second batch: comparative theatre, performance skills, design ──────────
Object.assign(THEATRE_FILM_DEPTH, {
    'tha-112-comparative-traditions-of-world-theatre': {
        sections: [
            {
                heading: 'Comparison is a method, not a survey',
                paragraphs: [
                    'A comparative answer fails when it becomes two summaries placed next to each other. The fix is to state your criteria before you discuss either tradition, then move criterion by criterion across both cases. Six criteria carry almost every comparison question: the performance space, the status of the text, the training of the performer, the role of the audience, the purpose of the event, and how the tradition is transmitted to the next generation.',
                    'Worked properly, a comparison produces a finding rather than a list: for example, that Greek and Noh theatre both formalise performance through masks and inherited conventions, but distribute authority very differently - one through civic competition, the other through hereditary schools. That sentence is an argument; the surrounding detail is its evidence.',
                    'The other trap is evaluative language. Words like primitive, advanced, developed and authentic smuggle in a hierarchy that the evidence does not support. Replace them with descriptors: participatory or spectator-separated, text-centred or scenario-based, codified or improvisatory. Each descriptor can be demonstrated.',
                ],
            },
            {
                heading: 'Three traditions worth knowing in detail',
                paragraphs: [
                    'Greek theatre of the fifth century BCE was produced within a civic festival in honour of Dionysus. Three playwrights competed in tragedy, each presenting a tetralogy; a chorus of citizens performed; masks allowed three actors to play many roles; the open-air amphitheatre made scale and vocal projection central to the writing. Its conventions - the chorus, the messenger speech, the unities - are responses to that event, not abstract rules.',
                    'Japanese Noh, formalised by Zeami in the fourteenth and fifteenth centuries, is a theatre of extreme codification: a slow tempo, stylised gesture, masks for certain roles, chant and a small instrumental ensemble. Transmission runs through schools and lineages, so a performer\'s authority is institutional as well as personal. Comparing Noh with Greek practice shows how two masked, musical, convention-heavy theatres can produce entirely different audience experiences.',
                    'Commedia dell\'arte, professional from the sixteenth century in Italy, reversed the emphasis: fixed masked types, a scenario rather than a full script, and improvisation within known "lazzi". It is the clearest case in world theatre of an economy shaping form - touring companies needed portable plots and repeatable characters rather than libraries of scripts.',
                ],
                callout: {
                    title: 'One comparison, one finding',
                    body: 'If your essay could be read as two separate essays stapled together, the comparison has not happened. Every paragraph must contain both cases.',
                },
            },
        ],
        workedExamples: [
            {
                title: 'Building the comparison grid',
                brief: 'Question: compare the role of the audience in Greek theatre and in African festival performance.',
                steps: [
                    'State the criteria you will use: spatial relation, participation, and the source of authority over the event.',
                    'Greek case: the audience sits in a civic amphitheatre, separated but addressed; participation is indirect - judgement, applause, competition voting - and the festival authority is civic and religious.',
                    'Festival case: the audience is inside the performance area, participation is direct and sometimes required, and authority over the event rests with custodians and the ritual calendar.',
                    'Identify the similarity that matters: in both, attendance is a social act, not a consumer transaction.',
                    'Identify the difference that matters: Greek separation supports a fiction that the audience watches; festival participation supports an event the audience completes.',
                    'Conclude with the finding, not a summary: the audience is a compositional element in both, but one is addressed and the other is enrolled.',
                ],
                takeaway: 'Similarity and difference must both be explained in terms of function, not appearance.',
            },
            {
                title: 'Handling the word "authentic"',
                brief: 'A question asks which of two traditions is "more authentic". This is a trap, and here is how to answer it without refusing the question.',
                steps: [
                    'Define authenticity in the sense the question implies: closeness to an original or unchanged form.',
                    'Show that both traditions have changed historically - Greek practice changed across the classical period; festival forms absorb new instruments, fabrics and media.',
                    'Argue that transmission is itself the tradition: what looks like change is often the mechanism by which a form survives.',
                    'Offer a usable substitute criterion: coherence with the community\'s own account of the form.',
                    'Answer the question on your own terms: neither is more authentic; each is authentic to a different mechanism of authority.',
                ],
                takeaway: 'Reject the premise, then answer a better version of the question. Refusing to answer scores nothing.',
            },
        ],
        examBank: [
            {
                question: 'Compare two masked theatre traditions and explain what the mask does in each.',
                marks: '20 marks; criteria-led comparison',
                outline: [
                    'Name the two traditions and date them.',
                    'Greek: the mask as a practical device for role-doubling and vocal projection, and as a marker of character type.',
                    'Noh: the mask as a means of transforming the performer and fixing emotional register.',
                    'Compare on function, then on control: who decides when a mask is worn, and what does that say about authority?',
                    'Note what the mask makes impossible in each case (facial nuance, realism).',
                    'Conclude with a finding about convention and audience competence.',
                ],
                trap: 'Describing two masks without ever saying what each one accomplishes.',
            },
            {
                question: 'Why is evolutionist language ("primitive to sophisticated") inadequate for comparative theatre study?',
                marks: '15 marks',
                outline: [
                    'Define evolutionism in this context: the assumption that theatre forms move through stages toward a European endpoint.',
                    'Show the empirical problem: participatory and codified forms are not earlier versions of realism; they are different solutions.',
                    'Show the conceptual problem: the hierarchy makes it impossible to describe what a form actually does.',
                    'Offer replacements: participatory/spectator-separated, codified/improvisatory, text-centred/scenario-based.',
                    'Illustrate with one tradition that the language would misdescribe.',
                ],
            },
            {
                question: 'What does a touring economy explain about commedia dell\'arte?',
                marks: '15 marks',
                outline: [
                    'Describe the production conditions: travelling companies, limited props, unfamiliar audiences and languages.',
                    'Link form to conditions: stock masked types are instantly readable, scenarios travel better than scripts, lazzi can be reused.',
                    'Explain the cost: character depth and plot originality are traded for portability.',
                    'Compare with a settled repertory theatre where scripts accumulate.',
                    'Conclude that material conditions are part of dramaturgy, not background.',
                ],
            },
        ],
        glossary: [
            { term: 'Comparative method', definition: 'Analysis that applies fixed criteria to two or more cases in order to produce a finding rather than two summaries.' },
            { term: 'Noh', definition: 'A Japanese masked theatre form of chant, dance and highly codified gesture, transmitted through schools.' },
            { term: 'Lazzi', definition: 'Rehearsed comic routines inserted by commedia performers into a scenario.' },
            { term: 'Scenario', definition: 'An outline of situations and characters from which performers improvise, rather than a fixed script.' },
            { term: 'Stock character', definition: 'A recurring conventional figure whose traits the audience recognises immediately, such as the commedia miser or braggart.' },
            { term: 'Chorus (Greek)', definition: 'The group of citizen performers who sing, dance and comment, framing the action of a Greek play.' },
            { term: 'Amphitheatre', definition: 'An open-air performance space with tiered seating around the acting area.' },
            { term: 'Codification', definition: 'The process by which a performance tradition fixes gestures, tempos and roles into teachable rules.' },
            { term: 'Transmission', definition: 'How a performance form is passed on, whether by family lineage, school, apprenticeship or written record.' },
            { term: 'Evolutionism', definition: 'The mistaken assumption that cultural forms progress in stages toward a single advanced model.' },
            { term: 'Performance convention', definition: 'An accepted shorthand that the audience agrees to read in a particular way.' },
            { term: 'Civic festival', definition: 'A religious and political celebration funded and attended by the city, within which theatre is produced.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Grid', focus: 'Build the instrument.', tasks: ['Write the six comparison criteria in your own words.', 'Fill the grid for two traditions you have studied.', 'Identify one criterion where you need more evidence.'] },
            { week: 'Week 2 - Detail', focus: 'Know three traditions.', tasks: ['Write one page each on Greek, Noh and commedia.', 'Learn five terms specific to each.', 'List what each tradition makes difficult.'] },
            { week: 'Week 3 - Argument', focus: 'Findings, not surveys.', tasks: ['Draft a comparison with a stated finding.', 'Check every paragraph mentions both cases.', 'Remove every evolutionist word from the draft.'] },
            { week: 'Week 4 - Exam', focus: 'Timed comparison.', tasks: ['Answer one comparison question in 35 minutes.', 'Mark it against your own grid for coverage.', 'Rewrite only the conclusion as a finding.'] },
        ],
        readingList: [
            'Your departmental course outline for THA 112 and any set translations of Greek plays.',
            'A general theatre history chapter on classical Japanese theatre for Noh terminology.',
            'Any accessible introduction to commedia dell\'arte covering scenarios and stock types.',
            'One scholarly article that compares two traditions - study how it states its criteria.',
        ],
    },

    'tha-122-basic-performance-skills': {
        sections: [
            {
                heading: 'What a director actually asks for',
                paragraphs: [
                    'Studio work is assessed on process, and process is judged by whether your choices are actable. An actable choice is a verb directed at another person in the scene: to persuade, to test, to warn, to appease. An unactable choice is an abstraction: be angry, be nervous, be more intense. When a tutor asks "what are you doing?", the answer must be a verb with a target.',
                    'Objectives also need obstacles. A character who wants something nobody resists has no scene. Identify who or what blocks the want, and what happens if the character fails. That failure condition - the stake - is what makes an objective urgent rather than theoretical.',
                    'Finally, objectives change. A scene is not played at one temperature. Score it in beats: each beat has a new objective because the previous one either succeeded, failed or met a new obstacle. Three to five beats is normal for a short scene, and a beat sheet is the document that shows your preparation.',
                ],
            },
            {
                heading: 'Training systems: what each one is for',
                paragraphs: [
                    'Stanislavski\'s system asks how an actor can behave truthfully inside imaginary circumstances. Its working tools are given circumstances (the concrete facts of the scene), objectives and actions, and the "magic if" that makes a fictional situation personal. Contemporary practice usually takes the objective-and-action vocabulary rather than the older emotion-memory exercises, which are easy to misuse.',
                    'Suzuki training builds a physically grounded performer: heavy stamping, controlled falls, sustained lower-body work and vocal projection against resistance. It is not an acting "method" in the psychological sense; it trains presence, stamina and the body as a source of stage energy. Treat it as conditioning, with a warm-up and a teacher present.',
                    'Laban movement analysis describes how a body moves rather than why: weight (light to strong), time (sustained to sudden), space (indirect to direct) and flow (free to bound). It gives a shared vocabulary for movement quality, which is why directors use it to give movement notes and why actors use it to build a physical character that is not merely decorative.',
                ],
                callout: {
                    title: 'Warm up or risk the term',
                    body: 'A cold body cannot sustain Suzuki work or a dance call. Ten minutes of joint, spine and breath preparation is not optional, and a strain injury can end your practical assessment early.',
                },
            },
            {
                heading: 'Keeping a rehearsal log that earns credit',
                paragraphs: [
                    'A log is evidence of thinking, not a diary. Each entry should record the date, the exercise, what you attempted, what changed in the work, the tutor\'s exact correction, and how you applied it in the next session. "Worked on voice" is worthless; "sustained a 20-second phrase without losing support after lowering the breath" is assessable.',
                    'Film yourself at least once every two weeks. The camera exposes habits - a dropped chin, a rising shoulder, a trailing final consonant - that the mirror hides because the mirror lets you correct in real time while the camera records what your audience actually gets.',
                    'Review the log weekly and look for a pattern rather than a list. A pattern sounds like: "I rush the first three lines of every scene because I start before I have decided what I want." A pattern gives you something to work on; a list gives you nothing.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Turning an emotion into a playable action',
                brief: 'The script says your character "is devastated" by a letter. You cannot act "devastated". Here is the conversion.',
                steps: [
                    'Identify the fact the character has just learned from the letter.',
                    'Decide what the character wants from the other person in the scene now that they know it - to be reassured, to hurt back, to keep the secret.',
                    'Name the obstacle: the other person\'s refusal, ignorance or defensiveness.',
                    'Choose a tactic verb: to test, to accuse, to placate, to bargain.',
                    'Physicalise one beat: where you look, when you breathe, when you move towards or away.',
                    'Play the beat and note what happened; if the scene does not change, the objective was too vague.',
                ],
                takeaway: 'Emotion is a by-product of pursuing an objective. Play the want; the feeling arrives on its own.',
            },
            {
                title: 'Scoring a scene in beats',
                brief: 'A two-page duologue for your assessment. Here is how to prepare it so that it moves.',
                steps: [
                    'Read the scene once for facts: who, where, what has just happened, what each character knows that the other does not.',
                    'Mark where the power or information shifts. Each shift is a beat boundary.',
                    'Give each beat an objective for your character, phrased as a verb with a target.',
                    'Give each beat one physical anchor: an action you can repeat in performance without freezing.',
                    'Rehearse the transitions only; most scenes sag between beats rather than inside them.',
                    'Record a run and check the audience can see the shift without being told.',
                ],
                takeaway: 'Rehearse the joins. Scenes are lost in the transitions.',
            },
        ],
        examBank: [
            {
                question: 'Explain the difference between Stanislavskian and Laban approaches to performance, and say when each is useful.',
                marks: '15 marks',
                outline: [
                    'Stanislavski: psychological truth through given circumstances, objectives and actions.',
                    'Laban: movement quality through weight, time, space and flow.',
                    'Show the different questions: "what do I want?" versus "how does this body move?".',
                    'Give a use case for each: Stanislavski for text-driven scene work; Laban for chorus, movement and physical characterisation.',
                    'Note that they combine: an objective can be given a Laban quality to make it physical.',
                ],
                trap: 'Describing one system as outdated. The question asks about use, not rank.',
            },
            {
                question: 'What does a rehearsal log document, and why is it assessed?',
                marks: '10 marks',
                outline: [
                    'State each entry\'s components: date, exercise, attempt, change, correction, application.',
                    'Explain that practical assessment cannot rely on a single showing, so process must be evidenced.',
                    'Explain what distinguishes a strong log: patterns and specific corrections rather than activities.',
                    'Mention video review as corroboration.',
                ],
            },
            {
                question: 'Why must a scene objective include an obstacle and a stake?',
                marks: '10 marks',
                outline: [
                    'Define objective, obstacle and stake.',
                    'Show what happens without an obstacle: the scene becomes an announcement.',
                    'Show what happens without a stake: the want is theoretical and the urgency disappears.',
                    'Illustrate with a short example from a play you know.',
                ],
            },
        ],
        glossary: [
            { term: 'Given circumstances', definition: 'The concrete facts of a scene - time, place, relationships, prior events - that an actor works inside.' },
            { term: 'Objective', definition: 'What a character wants from another character in a scene, stated as an action with a target.' },
            { term: 'Obstacle', definition: 'The person or condition preventing a character from achieving an objective.' },
            { term: 'Stake', definition: 'What a character loses if the objective fails, which supplies urgency.' },
            { term: 'Beat', definition: 'A unit of a scene defined by a change in objective, power or information.' },
            { term: 'Tactic', definition: 'The specific verb a performer uses to pursue an objective in a single beat.' },
            { term: 'Magic if', definition: 'Stanislavski\'s prompt that asks the actor to behave as if the imaginary circumstances were real.' },
            { term: 'Laban effort', definition: 'Movement analysed through weight, time, space and flow, giving a vocabulary for movement quality.' },
            { term: 'Suzuki training', definition: 'Physical conditioning for performers built on lower-body strength, stamping and vocal power.' },
            { term: 'Presence', definition: 'The quality of focused, available energy that makes an audience watch a performer.' },
            { term: 'Subtext', definition: 'The meaning under the spoken line, carried by action, tone and timing.' },
            { term: 'Warm-up', definition: 'Preparatory movement and breathing that reduces injury risk and readies the voice and body.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Body', focus: 'Safe, repeatable preparation.', tasks: ['Build a ten-minute warm-up and do it daily.', 'Record one exercise and note two habits.', 'Learn the Laban effort terms with examples.'] },
            { week: 'Week 2 - Objective', focus: 'Actable choices.', tasks: ['Write objectives for three scenes.', 'For each, name the obstacle and the stake.', 'Rewrite any objective that is an abstraction.'] },
            { week: 'Week 3 - Beats', focus: 'Movement inside the scene.', tasks: ['Score a duologue into beats.', 'Rehearse only the transitions.', 'Film a run and check the shifts are visible.'] },
            { week: 'Week 4 - Log', focus: 'Evidence.', tasks: ['Write four complete log entries.', 'Identify one pattern in your notes.', 'Ask your tutor for one correction and record it verbatim.'] },
        ],
        readingList: [
            'Stanislavski, K. - An Actor Prepares (read the chapters on objectives and actions).',
            'Any introduction to Laban movement analysis for the effort qualities.',
            'Your departmental studio handbook: assessment criteria and safety rules for THA 122.',
        ],
    },

    'tha-131-basic-theatre-design-and-crafts': {
        sections: [
            {
                heading: 'From script to ground plan',
                paragraphs: [
                    'A designer reads a script for spatial demands, not for adjectives. Underline every entrance and exit, every level change, every object a character uses, and every line that fixes a location. That list is the brief. A design that ignores an exit will be redrawn during the build, which is expensive and embarrassing.',
                    'The ground plan is the first tool: a scale drawing of the stage seen from above, showing the set footprint, furniture positions, entrances and the auditorium edge. It is drawn at a stated scale, usually 1:25 or 1:50, and every element is labelled. The director uses it to block; the builder uses it to cut; the lighting designer uses it to place positions.',
                    'Elevations and sections come next, showing heights and construction. A section drawing is what reveals a problem the plan hides: a platform that blocks sightlines from the side seats, or a doorway too narrow for a costume to pass through.',
                ],
            },
            {
                heading: 'Lighting, sound and the design team',
                paragraphs: [
                    'Lighting does four jobs: it makes performers visible, it focuses attention, it establishes mood and time, and it separates areas of the stage. Learn the common instruments and what each does - a profile lantern throws a controllable, hard-edged beam for specials and gobos; a fresnel gives a soft, adjustable wash; LED fixtures mix colour without gels but behave differently on camera.',
                    'Colour behaves differently under different sources. A costume that reads warm red in daylight may go muddy under a saturated blue wash, and a painted flat under tungsten looks different from the same flat under a cold LED. This is why designers test under the actual plot rather than choosing colours from a swatch book.',
                    'Sound design covers reinforcement (making voices audible), effects (creating place and event) and music. Establish early whether effects are live or recorded and who cues them. A sound cue late by two seconds is a visible mistake in a way that a slightly different shade of paint is not.',
                ],
                callout: {
                    title: 'Design is a budget document',
                    body: 'A concept without a materials list, a cost and a build schedule is a drawing. Present all three or the design is not finished.',
                },
            },
        ],
        workedExamples: [
            {
                title: 'Reading a script for spatial demands',
                brief: 'You are given a one-act play set in a compound with three entrances. Here is the analysis order.',
                steps: [
                    'Highlight every entrance, exit and offstage sound.',
                    'List every prop that is used, distinguishing hand props, set dressing and furniture.',
                    'Note every level change and every moment a character must be seen above others.',
                    'Identify the sightline-critical moment - the one action that must be visible from every seat.',
                    'Draft the plan with entrances first, furniture second, decoration last.',
                    'Check the plan against the blocking needs you listed before drawing anything beautiful.',
                ],
                takeaway: 'Function first: a plan that works can be made beautiful; a beautiful plan that blocks an entrance cannot be used.',
            },
            {
                title: 'Choosing a lighting state',
                brief: 'The scene moves from a bright afternoon to nightfall in one page. What do you actually change?',
                steps: [
                    'Decide what the audience must still see: faces, a specific prop, the exits.',
                    'Choose the direction of the key light to motivate the change - window side cooling and dimming.',
                    'Keep one constant so the audience reads continuity, such as a practical lamp or a warm back light.',
                    'Reduce the lit area rather than only reducing brightness; night reads as a smaller pool of light.',
                    'Check colour temperature consistency between fixtures so faces do not turn two colours.',
                    'Rehearse the cue with the actors, not only the board operator; a slow fade can change the pacing of the scene.',
                ],
                takeaway: 'Lighting states are decisions about what the audience may see, not decoration added at the end.',
            },
        ],
        examBank: [
            {
                question: 'Explain the purpose of a ground plan, an elevation and a section, and why a design needs all three.',
                marks: '15 marks',
                outline: [
                    'Ground plan: positions from above to scale, used for blocking and construction.',
                    'Elevation: vertical face, used for heights and finish.',
                    'Section: a cut through the set, revealing what the plan hides - sightlines, headroom, construction.',
                    'Explain the errors each drawing prevents.',
                    'Conclude that design communication is a set of complementary projections, not one drawing.',
                ],
            },
            {
                question: 'A designer proposes an expensive set that the department cannot build in time. What should happen next?',
                marks: '10 marks',
                outline: [
                    'Restate the constraint: budget, labour, time and safety are design parameters.',
                    'Identify the production concept that the set is trying to serve.',
                    'Propose the cheapest solution that preserves that concept.',
                    'Document the revised plan with a build schedule and risk notes.',
                    'Conclude that an unbuildable design is a failed design regardless of its quality on paper.',
                ],
                trap: 'Blaming the budget. The question is about design judgement under constraint.',
            },
        ],
        glossary: [
            { term: 'Ground plan', definition: 'A scale drawing of the stage seen from above, showing set, furniture, entrances and the auditorium edge.' },
            { term: 'Elevation', definition: 'A scale drawing of a vertical surface of the set, showing height and finish.' },
            { term: 'Section', definition: 'A drawing cut through the set vertically, used to check heights, sightlines and construction.' },
            { term: 'Scale', definition: 'The ratio between a drawing and reality, for example 1:25 where 4 cm represents 1 m.' },
            { term: 'Sightline', definition: 'The line of vision from a seat to the stage; a set must not block the action for any paying seat.' },
            { term: 'Profile lantern', definition: 'A lighting fixture producing a controllable hard-edged beam, used for specials and gobos.' },
            { term: 'Fresnel', definition: 'A soft-edged wash lantern with an adjustable beam, used for general stage coverage.' },
            { term: 'Gel', definition: 'A coloured filter placed in front of a lantern to change the colour of its light.' },
            { term: 'Practical', definition: 'A working onstage light source that is visible to the audience, such as a lamp or a fire effect.' },
            { term: 'Build schedule', definition: 'The dated plan for constructing, painting and installing a set within the available labour.' },
            { term: 'Materials list', definition: 'A quantified list of timber, board, fabric, paint and hardware required, with costs.' },
            { term: 'Cue', definition: 'A defined point at which a lighting or sound change is executed.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Script analysis', focus: 'The brief.', tasks: ['Mark every entrance, exit and prop in one script.', 'List the spatial demands in order of priority.', 'Sketch a rough plan without worrying about scale.'] },
            { week: 'Week 2 - Draw', focus: 'Technical communication.', tasks: ['Draw a to-scale ground plan.', 'Add one elevation and one section.', 'Have a coursemate try to read it: if they cannot, label more.'] },
            { week: 'Week 3 - Light and sound', focus: 'Two departments, one language.', tasks: ['Learn five fixtures and their uses.', 'Write a two-state lighting plot for one scene.', 'Plan three sound cues with timings.'] },
            { week: 'Week 4 - Present', focus: 'The pitch.', tasks: ['Prepare a five-minute design presentation.', 'Include concept, plan, model, materials and budget.', 'Take questions and note what you could not answer.'] },
        ],
        readingList: [
            'Any standard stagecraft text covering ground plans, elevations and construction.',
            'A lighting design primer for lantern types and colour temperature.',
            'Your department\'s workshop safety rules - read these before your first build session.',
        ],
    },
})

// ── Third batch: voice, media, administration ──────────────────────────────
Object.assign(THEATRE_FILM_DEPTH, {
    'tha-151-speech-and-communication-for-stage-and-media': {
        sections: [
            {
                heading: 'Why your voice fails in a hall',
                paragraphs: [
                    'Almost every "quiet" performer has the same problem: they are pushing air out with the throat instead of supporting it from the abdomen. Throat-based volume is thin, tires quickly and becomes hoarse by the second hour. Supported volume is louder with less effort because the breath stream is steady and the resonance spaces are open.',
                    'Support is mechanical, not mystical. Stand tall, let the lower ribs widen on the inhale, keep the shoulders quiet, and let the abdominal wall resist as you speak. The test is not how big a breath you can take but how evenly you can release it: count aloud on one breath and aim for a steady stream rather than a burst that collapses at eight.',
                    'Projection then depends on the space. A proscenium hall needs the voice aimed at the back wall, with consonants sharpened to carry; a small studio needs less volume and more variety. Performers who shout in small rooms damage their voices and flatten their range - the audience hears strain instead of meaning.',
                ],
            },
            {
                heading: 'Articulation, accent and intelligibility',
                paragraphs: [
                    'The goal of speech work is intelligibility, not the erasure of your accent. Nigerian English is a legitimate variety with its own rules, and an actor who adopts a fake foreign accent loses truthfulness. What must be controlled is clarity at speed: final consonants, consonant clusters, word endings and the placement of stress in multisyllabic words.',
                    'Most lost meaning comes from four habits: dropping final consonants ("tes" for "test"), swallowing unstressed syllables ("comftable"), misplaced stress ("deVELopment" instead of "deVELopment" in standard usage), and running words together so that boundaries disappear. Each can be drilled separately with a short list of words you personally mangle.',
                    'Pace and pause carry as much meaning as pronunciation. A pause before a name, a slight lengthening of a verb, or a faster run of clauses communicates emphasis without volume. Mark your script: breaths, pauses, stressed words, and any name or term you must pronounce correctly. A newsreader who mispronounces a name has failed at the main task, however warm the delivery.',
                ],
                callout: {
                    title: 'Microphone technique changes everything',
                    body: 'At a microphone you work close and controlled, avoid plosives by speaking slightly across the capsule, and treat sibilance deliberately. Stage habits applied to a mic produce distortion, not intimacy.',
                },
            },
        ],
        workedExamples: [
            {
                title: 'Fixing a line that will not carry',
                brief: 'In rehearsal your line "I will not sign it" disappears in the back half of the hall. Here is the diagnosis sequence.',
                steps: [
                    'Check breath support: are you speaking on the last third of an uncontrolled exhale?',
                    'Check the target: are you speaking to the other actor or to the floor?',
                    'Check the consonants: the t and the s in "not sign it" are what carry meaning at distance.',
                    'Check the tempo: rushing the line removes the stresses that make it audible.',
                    'Adjust one variable at a time and ask someone in the back row to repeat the line back.',
                    'If it still fails, change the staging, not the shout: a step downstage may solve it more cheaply.',
                ],
                takeaway: 'Change one variable per repetition, otherwise you cannot tell what fixed it.',
            },
            {
                title: 'Reading for radio',
                brief: 'A three-minute news bulletin read. What separates a pass from a fail?',
                steps: [
                    'Mark the script for breaths, so no breath lands mid-phrase.',
                    'Underline stressed words; do not stress every noun.',
                    'Slow down on figures, names and places - the information the listener cannot re-read.',
                    'Keep a consistent distance from the microphone so levels do not jump.',
                    'Use a small pause at each story change; listeners need the boundary.',
                    'Record, listen back once for meaning (could you follow it?) and once for sound (any plosives, sibilance, breaths?).',
                ],
                takeaway: 'Radio is written for the ear: if you cannot follow your own recording, neither can the listener.',
            },
        ],
        examBank: [
            {
                question: 'Explain how breath support differs from shouting, and why it matters for a stage actor.',
                marks: '15 marks',
                outline: [
                    'Describe supported voice: steady exhalation resisted by the abdominal wall, open resonance.',
                    'Describe shouting: throat tension, raised pitch, rapid fatigue, reduced intelligibility.',
                    'Explain the consequences: sustainability across a run, vocal health, and control of dynamics.',
                    'Give one practical test for support.',
                    'Conclude that projection is a technique of breath and target, not of effort.',
                ],
                trap: 'Treating projection as volume. The question is about control.',
            },
            {
                question: 'Why is accent erasure not the goal of speech training?',
                marks: '10 marks',
                outline: [
                    'Distinguish accent from intelligibility.',
                    'Note that Nigerian English is a recognised variety with internal rules.',
                    'Explain the performance cost of imitation: loss of truthfulness and of the audience\'s recognition.',
                    'State the real targets: consonants, stress, pace and clarity at distance.',
                ],
            },
        ],
        glossary: [
            { term: 'Diaphragmatic breathing', definition: 'Breathing in which the diaphragm descends and the lower ribs expand, giving steady control of exhalation.' },
            { term: 'Support', definition: 'The controlled release of breath against abdominal resistance that sustains voice without throat strain.' },
            { term: 'Resonance', definition: 'The amplification and colouring of voice in the chest, mouth and nasal cavities.' },
            { term: 'Articulation', definition: 'The shaping of speech sounds by tongue, lips and palate to make words distinct.' },
            { term: 'Projection', definition: 'Directing supported voice to a specific audience distance without strain.' },
            { term: 'Plosive', definition: 'A consonant produced by a burst of air, such as p, b, t, d, k, g, which can thump a microphone.' },
            { term: 'Sibilance', definition: 'A harsh hiss on s and sh sounds, exaggerated by close microphone technique.' },
            { term: 'Register', definition: 'The level of formality in language, from casual to formal, suited to audience and occasion.' },
            { term: 'Stress', definition: 'The relative emphasis placed on a syllable or word, which can change meaning.' },
            { term: 'Intelligibility', definition: 'The degree to which a listener can understand what is said, especially at distance or on recording.' },
            { term: 'Vocal warm-up', definition: 'Gentle exercises that prepare breath, resonance and articulation before use.' },
            { term: 'Voice-over', definition: 'Recorded speech added over picture, requiring precise timing and consistent tone.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Breath', focus: 'Support.', tasks: ['Practise low breathing for five minutes daily.', 'Count aloud on one breath and record the result.', 'Warm up before every rehearsal.'] },
            { week: 'Week 2 - Clarity', focus: 'Consonants and stress.', tasks: ['List ten words you personally mangle.', 'Drill final consonants in a two-minute passage.', 'Record and compare with the clean version.'] },
            { week: 'Week 3 - Space', focus: 'Projection and target.', tasks: ['Read in a large hall and have someone at the back repeat lines.', 'Practise speaking to a target, not to the floor.', 'Adjust volume for a small room without losing variety.'] },
            { week: 'Week 4 - Media', focus: 'Microphone discipline.', tasks: ['Record a three-minute bulletin with breaths marked.', 'Review for plosives and sibilance.', 'Read the same script at two paces and choose.'] },
        ],
        readingList: [
            'Any standard voice and speech text for actors covering support, resonance and articulation.',
            'A broadcast journalism handbook section on reading for radio and television.',
            'Your department\'s voice studio guidelines, including vocal health advice.',
        ],
    },

    'tha-152-introduction-to-media-arts': {
        sections: [
            {
                heading: 'Three media, three production logics',
                paragraphs: [
                    'Radio, television and film share equipment and vocabulary but organise production differently. Radio has no image, so it must build place, character and action through voice, effects and silence; a listener cannot re-read a sentence, which is why radio writing repeats key information and keeps sentences short.',
                    'Television is usually produced against time and in formats: a package with a presenter link, an interview with cutaways, a magazine segment with a fixed duration. The grammar is continuity-based, and the constraint is that the audience may join at any moment, so context must be re-established regularly.',
                    'Film is the most controllable and the most expensive per minute. Coverage is shot out of order, so continuity and logging matter more than in the other two, and the story is finally built in the edit. Understanding which logic you are working in prevents the common student error of shooting a film as if it were a recorded stage play.',
                ],
            },
            {
                heading: 'Grammar you must be able to name',
                paragraphs: [
                    'Shot size is a relationship, not a measurement: an extreme wide establishes geography, a wide shows the body in space, a medium frames gesture, a close-up carries internal state, and an extreme close-up isolates detail. Angles carry attitude - a low angle enlarges the subject, a high angle reduces it, a Dutch tilt destabilises.',
                    'Continuity depends on three rules that students break most often. The 180-degree rule keeps camera positions on one side of an imaginary line between two subjects so screen direction stays consistent. The 30-degree rule requires a new shot to change angle by at least 30 degrees, otherwise it reads as a jump. Eyeline match keeps a character looking in a consistent direction across cuts.',
                    'Sound is not an afterthought: diegetic sound exists in the story world, non-diegetic sound is added for the audience, and a sound bridge links scenes. Room tone recorded on location is what makes an edit sound continuous; without it, cuts produce audible holes.',
                ],
                callout: {
                    title: 'Log before you shoot',
                    body: 'A shot log - scene, shot, take, notes - costs two minutes on set and saves hours in the edit. Without it you will review footage by guessing.',
                },
            },
        ],
        workedExamples: [
            {
                title: 'Planning coverage for a two-person scene',
                brief: 'You have one camera, one hour and a two-page dialogue scene. Here is the coverage plan.',
                steps: [
                    'Shoot a wide master of the whole scene first; it protects the edit and establishes geography.',
                    'Shoot over-the-shoulder singles for each character, keeping the camera on the same side of the line.',
                    'Add a clean close-up of the moment the scene turns - the reaction that carries the meaning.',
                    'Collect cutaways: hands, a prop, a doorway, and 30 seconds of room tone.',
                    'Log every take as you shoot, noting the best one and why.',
                    'In the edit, build the scene from the master, then cut to singles on the beats, then cover the joins with cutaways.',
                ],
                takeaway: 'Coverage is insurance. The master protects you when a performance peaks in a take you did not expect.',
            },
            {
                title: 'Diagnosing a bad cut',
                brief: 'Your edited scene feels jumpy and the two characters seem to look at each other from the same side. What went wrong?',
                steps: [
                    'Check the line: if the camera crossed the 180-degree line, screen direction reverses and the audience loses geography.',
                    'Check the angle change: two shots from nearly the same position produce a visible jump.',
                    'Check eyelines: each actor must look at a consistent point off camera.',
                    'Check sound: an abrupt room-tone change makes the cut audible.',
                    'Fix by inserting a neutral shot, re-blocking, or re-shooting one side rather than by adding effects.',
                ],
                takeaway: 'Most "bad editing" is a shooting error. Fix the cause, not the symptom.',
            },
        ],
        examBank: [
            {
                question: 'Explain the 180-degree rule and the effect of breaking it.',
                marks: '10 marks',
                outline: [
                    'Define the imaginary line between two subjects.',
                    'State the rule: keep all camera positions on one side of it.',
                    'Explain the effect of breaking it: screen direction reverses and the audience loses spatial orientation.',
                    'Give the standard fixes: cutaway, neutral shot, or re-establishing wide.',
                ],
            },
            {
                question: 'Compare the production logic of radio with that of film.',
                marks: '15 marks',
                outline: [
                    'Radio: sound-only, linear, listener cannot re-read, small crew, fast turnaround.',
                    'Film: visual and aural, shot out of order, expensive per minute, story built in the edit.',
                    'Show how each logic changes writing: radio repeats and simplifies; film can rely on image and subtext.',
                    'Show how each changes production: radio compresses the chain; film demands coverage and continuity.',
                    'Conclude that the medium determines the workflow, not only the style.',
                ],
                trap: 'Describing radio as "film without pictures". The constraints are different, not reduced.',
            },
        ],
        glossary: [
            { term: 'Shot size', definition: 'The framing of a subject, from extreme wide to extreme close-up, used to guide attention.' },
            { term: '180-degree rule', definition: 'The convention of keeping all camera positions on one side of an imaginary line so screen direction stays consistent.' },
            { term: '30-degree rule', definition: 'The requirement that a new shot of the same subject change angle by at least 30 degrees to avoid a jump cut.' },
            { term: 'Eyeline match', definition: 'Cutting between shots so that a character\'s gaze remains consistent in direction.' },
            { term: 'Diegetic sound', definition: 'Sound that exists within the story world and can be heard by the characters.' },
            { term: 'Non-diegetic sound', definition: 'Sound added for the audience, such as a score or narration, that characters do not hear.' },
            { term: 'Room tone', definition: 'The ambient sound of a location recorded separately to smooth edits.' },
            { term: 'Coverage', definition: 'The range of shots captured for a scene so that it can be edited.' },
            { term: 'Master shot', definition: 'A wide shot capturing the whole scene, used as the structural backbone of the edit.' },
            { term: 'Sound bridge', definition: 'Audio that continues across a cut, linking two scenes.' },
            { term: 'Pre-production', definition: 'The planning phase: script, budget, schedule, crew, locations and permissions.' },
            { term: 'Rough cut', definition: 'A first assembly of the footage that establishes structure before refinement.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Grammar', focus: 'Name what you see.', tasks: ['Log every shot in a two-minute scene.', 'Identify five shot sizes and three angles.', 'Mark one continuity error and explain it.'] },
            { week: 'Week 2 - Plan', focus: 'Pre-production.', tasks: ['Write a one-page production plan.', 'Draw a simple floor plan and camera positions.', 'List permissions and equipment you need.'] },
            { week: 'Week 3 - Shoot', focus: 'Coverage and sound.', tasks: ['Shoot a master plus singles for one scene.', 'Record room tone and cutaways.', 'Keep a shot log for every take.'] },
            { week: 'Week 4 - Edit', focus: 'Assembly to rough cut.', tasks: ['Build the scene from the master.', 'Cut on beats, cover the joins.', 'Screen it for two people and note where attention dropped.'] },
        ],
        readingList: [
            'Any introductory film studies text on shot grammar, continuity and sound.',
            'A radio production handbook section on writing for the ear.',
            'Your department\'s equipment booking and safety rules before your first shoot.',
        ],
    },

    'tha-162-basic-theatre-administration-and-management': {
        sections: [
            {
                heading: 'The producer\'s arithmetic',
                paragraphs: [
                    'Most student productions fail on arithmetic rather than talent. The core sum is simple: fixed costs divided by the contribution per ticket gives the number of tickets that must be sold before the production covers its costs. If the hall seats fewer than that number, the plan does not work and must change before rehearsals start, not after the posters go up.',
                    'Contribution per ticket is the ticket price minus the variable cost of each attendee - printing a programme, a refreshment, a comp ticket you must absorb. Fixed costs are everything you pay whether or not anyone comes: venue, rights, equipment hire, insurance, set materials. A contingency of roughly ten per cent is not padding; it is the line that stops a small surprise from cancelling a show.',
                    'Revenue is rarely only tickets. Sponsorship, concessions, merchandise and a second performance all change the arithmetic. Model each as a separate line with its own assumption, so that when one assumption fails you can see which part of the plan is now wrong.',
                ],
            },
            {
                heading: 'Rights, contracts and the paperwork that protects you',
                paragraphs: [
                    'Performing a copyrighted play without permission is an infringement, and it can end a production after the set is built. Rights are usually licensed per performance, per venue and per ticket price, and the application takes time. Budget for the fee and start the application as soon as the title is chosen.',
                    'For a student company, the minimum paperwork is short: a written agreement with the venue, a rights licence or written permission, a budget with receipts, a rehearsal schedule, a risk assessment for the build and the performance, and consent for any photography or recording. Each document answers a question that will otherwise be answered by an argument.',
                    'The stage manager is the production\'s communication spine. The prompt script - with blocking, cue calls, scene changes and contact numbers - is the document everyone else relies on when something goes wrong. A rehearsal report after each session records who attended, what was covered and what is now at risk.',
                ],
                callout: {
                    title: 'Say the number out loud',
                    body: 'If your break-even is 160 seats and the hall holds 150, the plan is already a loss. Discovering that in week one is management; discovering it on opening night is a scandal.',
                },
            },
        ],
        workedExamples: [
            {
                title: 'Break-even under pressure',
                brief: 'Fixed costs are 180,000. Tickets sell at 1,200 and each attendee costs 200 in programme and refreshment. The hall holds 200. Does the plan work?',
                steps: [
                    'Contribution per ticket = 1,200 - 200 = 1,000.',
                    'Break-even attendance = 180,000 / 1,000 = 180 tickets.',
                    'Capacity is 200, so the show breaks even at 90 per cent occupancy.',
                    'That is too tight; a single weak night loses money.',
                    'Options: raise the ticket to 1,500 (break-even 138), find 30,000 in sponsorship (break-even 150), or cut a fixed cost.',
                    'Choose the option that does not depend on selling out, and write the assumption into the budget.',
                ],
                takeaway: 'A plan that requires a sell-out is not a plan. Build a margin before you build the set.',
            },
            {
                title: 'Writing a risk assessment that is useful',
                brief: 'A department asks for a risk assessment before approving your production. What belongs in it?',
                steps: [
                    'List the activities: build, rigging, rehearsal, performance, strike.',
                    'For each, name the hazard: working at height, cables across walkways, heat from lamps, crowd movement.',
                    'Rate each hazard by likelihood and severity, and say who is exposed.',
                    'State the control: cable ramps, gloves, two-person lifting, a fire exit kept clear, a first aider on site.',
                    'Assign a named person and a date for each control.',
                    'Review after the first technical rehearsal, when real conditions are known.',
                ],
                takeaway: 'A risk assessment with no names and dates is a form, not a control.',
            },
        ],
        examBank: [
            {
                question: 'A production has fixed costs of 250,000, a ticket price of 1,500 and variable costs of 300 per attendee. Calculate break-even and comment on the result for a 220-seat hall.',
                marks: '15 marks',
                outline: [
                    'Contribution = 1,500 - 300 = 1,200.',
                    'Break-even = 250,000 / 1,200 = 208.3, so 209 tickets.',
                    'Capacity is 220, so break-even needs 95 per cent occupancy.',
                    'Comment: the margin is one bad night wide; the plan is fragile.',
                    'Propose two remedies with numbers: sponsorship of 30,000 lowers break-even to 184; a 1,800 ticket lowers it to 167.',
                    'Conclude on the principle of margin rather than optimism.',
                ],
                trap: 'Forgetting that variable costs reduce contribution. Dividing fixed costs by the ticket price alone gives a falsely optimistic answer.',
            },
            {
                question: 'Why must performance rights be secured before rehearsals begin?',
                marks: '10 marks',
                outline: [
                    'Define the right: performance of a copyrighted work requires a licence.',
                    'Explain timing: licences are per performance and take time to process.',
                    'Explain the consequence of failure: cancellation, financial liability, damage to the department\'s reputation.',
                    'State the practical steps: identify the rights holder, apply early, budget the fee, keep written confirmation.',
                ],
            },
        ],
        glossary: [
            { term: 'Fixed cost', definition: 'A cost that does not change with attendance, such as venue hire, rights or insurance.' },
            { term: 'Variable cost', definition: 'A cost that rises with each attendee, such as programmes or refreshments.' },
            { term: 'Contribution', definition: 'Ticket price minus variable cost per attendee; the amount each sale contributes to fixed costs.' },
            { term: 'Break-even', definition: 'The attendance at which total contribution equals fixed costs, so the production neither gains nor loses.' },
            { term: 'Contingency', definition: 'A reserve, typically around ten per cent, for unforeseen costs.' },
            { term: 'Production rights', definition: 'A licence to perform a copyrighted play, usually granted per performance and venue.' },
            { term: 'Prompt script', definition: 'The stage manager\'s master copy with blocking, cues, scene changes and contacts.' },
            { term: 'Rehearsal report', definition: 'A dated record of attendance, work covered, issues and actions from a rehearsal.' },
            { term: 'Cue call', definition: 'The instruction that triggers a lighting, sound or scene-change cue during performance.' },
            { term: 'Front of house', definition: 'The audience-facing operation: ticketing, ushering, safety and access.' },
            { term: 'Risk assessment', definition: 'A documented identification of hazards, who is exposed, and the controls with named owners.' },
            { term: 'Strike', definition: 'The dismantling and clearing of a production after the final performance.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Numbers', focus: 'Budget literacy.', tasks: ['List every fixed and variable cost for a hypothetical show.', 'Calculate break-even at two ticket prices.', 'Identify the assumption that would hurt most if wrong.'] },
            { week: 'Week 2 - Rights and paper', focus: 'Protection.', tasks: ['Draft a rights application enquiry.', 'Write a one-page venue agreement.', 'Collect a template risk assessment and adapt it.'] },
            { week: 'Week 3 - Schedule', focus: 'Time as a resource.', tasks: ['Build a rehearsal calendar backwards from opening night.', 'Mark dependencies and slack.', 'Write a rehearsal report after one session.'] },
            { week: 'Week 4 - Run', focus: 'Front of house and strike.', tasks: ['Write the front-of-house plan.', 'Prepare the prompt script with cues.', 'Plan strike labour and disposal.'] },
        ],
        readingList: [
            'Any theatre management text covering budgeting and break-even analysis.',
            'Your university\'s copyright guidance for student performances.',
            'A stage management handbook section on the prompt script and rehearsal reports.',
        ],
    },
})

// ── Second-level theatre and film courses (200 level) ───────────────────────
Object.assign(THEATRE_FILM_DEPTH, {
    'tha-211-dramatic-literature-and-criticism': {
        sections: [
            {
                heading: 'Criticism is an argument, not a verdict',
                paragraphs: [
                    'A weak drama essay tells the examiner what happens and then announces that the play is good. A strong essay makes a claim that someone could disagree with and then proves it from the text. "Death of a Salesman is a tragedy because Willy Loman dies" is a plot summary; "Death of a Salesman works as tragedy because Miller makes Willy responsible for his own collapse while denying him the recognition that would make that responsibility meaningful" is an argument.',
                    'The difference matters because criticism exists to explain how a text produces its effects. Your evidence is always the same three things: what is said (dialogue), what is done (action and stage business), and how it is arranged (structure, staging, the sequence of information). Anything not traceable to one of those is your opinion, which is allowed, but must be labelled as such.',
                    'Aristotle is useful for structure and dangerous when treated as a checklist. The requirement that a tragic action be serious, complete and of a certain magnitude is a tool for testing whether a play holds together, not a licence to list six elements and award marks to Sophocles. Use one concept from a theorist to do one job in your argument, and say what that job is.',
                ],
            },
            {
                heading: 'Reading a scene closely',
                paragraphs: [
                    'Close reading in drama has to include the body and the space. A line delivered across a table is not the same line delivered across a battlefield, and a pause written into a script is an instruction about pressure, not a gap. When you quote, quote briefly and then analyse the mechanics: who speaks, to whom, what they want, what they avoid naming, and what the other character does in response.',
                    'Track the information gap. Most dramatic scenes run on a difference between what the audience knows, what one character knows and what another believes. Identify when that gap opens, when it narrows and who benefits from it staying open. This single habit will produce a better essay than any amount of adjectives about "tension".',
                    'Notice repetition. Playwrights repeat phrases because repetition is how theatre builds meaning over time; a line repeated in act three carries the weight of act one whether or not the character acknowledges it. Mark repeated words in your copy and ask what changed between the two occurrences.',
                ],
                callout: {
                    title: 'The two-sentence test',
                    body: 'State your thesis in one sentence, then state in the next what a reasonable opponent would say against it. If you cannot produce the opponent, your thesis is a description.',
                },
            },
            {
                heading: 'Using theory without drowning in it',
                paragraphs: [
                    'Theory earns its place when it answers a question the text raises. A Marxist reading is appropriate when the play is organised around labour, ownership or class mobility; a feminist reading is appropriate when the play distributes speech, space and agency by gender. Applying a framework to a play it does not fit produces the familiar student essay in which the play disappears behind the vocabulary.',
                    'The practical method: choose one concept (for example, the gap between a character\'s social role and their interior life), define it in your own words, and then show three moments in the text where it becomes visible. If the three moments do not appear, abandon the concept rather than the evidence.',
                    'Cite theorists accurately and sparingly. A misattributed quotation is worse than no quotation, and an examiner who knows the source will notice. Where you are unsure of a wording, paraphrase and cite the idea, not the sentence.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'From plot summary to thesis',
                brief: 'A draft sentence reads: "In The Lion and the Jewel, Lakunle is a modern man and Baroka is a traditional man, and the play shows the conflict between tradition and modernity." Rebuild it as an argument.',
                steps: [
                    'Name the problem: the sentence describes two characters and calls their difference a conflict without showing that anything is at stake.',
                    'Ask what the play actually does with the pair: which one wins, and what does the winning cost or reveal?',
                    'Draft a claim with a consequence: "Soyinka makes the modern suitor lose not because tradition is stronger but because Lakunle\'s modernity is rhetorical, and the play measures ideas by what they can actually deliver."',
                    'Add the counter-position: a reader could argue the play simply celebrates tradition.',
                    'State the evidence you will use: Lakunle\'s speeches versus Baroka\'s actions, and the final choice Sidi makes.',
                    'Check the claim is falsifiable: point to the scene that would disprove it.',
                ],
                takeaway: 'A thesis predicts evidence. If you cannot name the scene that would test it, it is not yet an argument.',
            },
            {
                title: 'Reading a silence',
                brief: 'In a scene two characters argue, and one stops answering for eight lines. How do you write about that without inventing psychology?',
                steps: [
                    'Describe the stage fact: who is silent, for how long in the text, and what the other character does during it.',
                    'Note what the silence follows - usually a question the silent character cannot answer without losing something.',
                    'Compare with an earlier moment when the same character did speak; the contrast is the evidence.',
                    'State the effect on the audience\'s information: the silence withholds what the scene needs.',
                    'Offer an interpretation as an interpretation: "the silence functions as refusal", not "she feels ashamed".',
                ],
                takeaway: 'Write about what the script and staging do; attribute feelings only where the text supports them.',
            },
        ],
        examBank: [
            {
                question: 'Discuss the view that a good dramatic character is defined by what they want rather than by what they say.',
                marks: '20 marks',
                outline: [
                    'Define objective: a character\'s pursuit gives action its shape.',
                    'Support: show a play where stated intentions are contradicted by behaviour, and argue the behaviour is the truer evidence.',
                    'Complicate: in some dramatic styles speech is the action, and the linguistic register carries the want.',
                    'Bring in a second text to test the proposition across styles.',
                    'Conclude by qualifying: want explains structure, speech explains texture, and criticism needs both.',
                ],
                trap: 'Choosing one side absolutely. The marks are in the qualification.',
            },
            {
                question: 'How does a playwright control the audience\'s knowledge, and why does it matter for criticism?',
                marks: '15 marks',
                outline: [
                    'Identify the mechanisms: revelation, concealment, overheard scenes, dramatic irony, delayed entrances.',
                    'Show one extended example of an information gap opening and closing.',
                    'Explain the effect: suspense, irony, judgement of characters.',
                    'Argue that criticism should trace management of knowledge rather than assert "tension".',
                ],
            },
        ],
        glossary: [
            { term: 'Thesis', definition: 'The arguable claim an essay sets out to prove from evidence.' },
            { term: 'Dramatic irony', definition: 'A gap between what the audience knows and what a character believes.' },
            { term: 'Objective', definition: 'What a character is actively trying to achieve in a scene.' },
            { term: 'Obstacle', definition: 'What prevents a character from achieving the objective, producing conflict.' },
            { term: 'Subtext', definition: 'Meaning carried beneath the literal words, visible in action and context.' },
            { term: 'Catharsis', definition: 'Aristotle\'s term for the purgation of pity and fear produced by tragic action.' },
            { term: 'Hamartia', definition: 'The error or flaw in a tragic protagonist that contributes to their downfall.' },
            { term: 'Peripeteia', definition: 'A reversal of fortune in the action of a play.' },
            { term: 'Anagnorisis', definition: 'A moment of recognition or discovery that changes a character\'s understanding.' },
            { term: 'Close reading', definition: 'Detailed analysis of specific textual and staging choices to support an interpretation.' },
            { term: 'Falsifiable claim', definition: 'A claim precise enough that specific evidence could contradict it.' },
            { term: 'Canon', definition: 'The body of works a discipline treats as central, always open to challenge.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Argument', focus: 'Thesis and evidence.', tasks: ['Write three competing theses for one play.', 'Test each against a scene that could disprove it.', 'Choose one and outline five paragraphs.'] },
            { week: 'Week 2 - Close reading', focus: 'Mechanics.', tasks: ['Annotate one scene for objectives and obstacles.', 'Mark repeated words and their second occurrence.', 'Write 600 words on a single page of text.'] },
            { week: 'Week 3 - Theory', focus: 'One concept, three moments.', tasks: ['Pick a concept the text actually needs.', 'Find three supporting moments.', 'Define the concept in your own words.'] },
            { week: 'Week 4 - Essay', focus: 'Draft and cut.', tasks: ['Write a full draft to the word limit.', 'Cut every sentence that only summarises.', 'Check quotations against the edition you cite.'] },
        ],
        readingList: [
            'Aristotle, Poetics - read the sections on plot, character and recognition.',
            'Any standard introduction to dramatic theory covering realism, epic theatre and postcolonial criticism.',
            'The plays on your course outline, in editions with line numbers so you can cite precisely.',
        ],
    },

    'tha-213-theatre-history-renaissance-to-19th-century': {
        sections: [
            {
                heading: 'Why stages changed when the world changed',
                paragraphs: [
                    'Theatre history is easiest to remember as a chain of cause and effect between three things: who paid, what was believed, and what could be built. In the medieval period the church funded performance and belief organised the material, so plays were cycles staged on pageant wagons or in churchyards, moving through a town rather than sitting in a building.',
                    'The Renaissance rearranged all three. Courts and academies paid, humanist learning made classical texts desirable, and the invention of perspective painting supplied a technique for representing distance. Once you can paint a street receding to a vanishing point, you can build a set that imitates it, and once you do that, the audience must sit in one place to see it correctly. The proscenium arch is the architectural result of a way of seeing.',
                    'This is the single most useful idea for exam answers on this period: the picture-frame stage is not a neutral container. It decides where the audience sits, what they can see, and what kind of illusion the production is trying to produce.',
                ],
            },
            {
                heading: 'The English Renaissance stage and the Spanish corral',
                paragraphs: [
                    'The Elizabethan public playhouse was open-air, roughly circular, with a thrust stage projecting into a yard where groundlings stood, galleries around the walls, and a roofed rear stage with a trap. Daylight lit the performance and the audience could see each other, so the actor addressed the crowd directly and scenery was minimal; place was established in language, which is why Shakespeare\'s characters tell you where they are.',
                    'The Spanish corral worked on similar principles - a courtyard, a raised stage, standing groundlings, galleries and a women\'s gallery - with companies organised around a lead actor-manager and a repertoire that changed daily. Comparison is a strong exam move: two commercial, open-air, daylight theatres developed comparable solutions because they faced comparable constraints, not because one copied the other.',
                    'Both systems produced repertory practice: many plays in rotation, short rehearsal, actors specialised in types (the "line" system), and scripts written to the strengths of a company. Understanding repertory explains a lot of apparent oddities in the plays, including why some roles are written for particular voices and why doubling is built into the text.',
                ],
                callout: {
                    title: 'The lighting argument',
                    body: 'Daylight theatre produces a performance that acknowledges the audience; candlelit and gaslit theatre produces one that can hide from it. Lighting is a dramaturgical fact, not decoration.',
                },
            },
            {
                heading: 'Neoclassicism, the eighteenth century and the rise of the box set',
                paragraphs: [
                    'French neoclassical theory, distilled from Aristotle and Horace, imposed the unities of action, time and place and a strict separation of tragedy from comedy. The rules were defended as rationality and attacked as pedantry; what matters for your answer is that they were a critical programme with a political dimension, tied to court culture and to the idea of a regulated public taste.',
                    'The eighteenth century professionalised the audience experience: subscription seasons, star actors, patent theatres in London, and a growing middle-class public that wanted domestic stories. Sentimental comedy and bourgeois tragedy answered that demand. Meanwhile the actor-manager became the dominant figure, and the actor\'s performance - rather than the playwright\'s text - began to drive the evening.',
                    'By the nineteenth century, romanticism rejected the unities in favour of historical spectacle, and the box set (three walls and a ceiling, with the fourth wall imagined) enclosed the action in a room. Gas lighting, then electric, allowed the auditorium to be darkened, which completed the picture-frame logic: the audience becomes invisible and the stage becomes a world. Realism in acting and playwriting follows from that arrangement.',
                ],
            },
            {
                heading: 'Money, censorship and the profession',
                paragraphs: [
                    'Every period in this course is also an economic story. Theatres were commercial ventures with shareholders, seasons, ticket prices and risk. Censorship shaped what could be written: England\'s licensing of plays restricted political and religious content for centuries, and the French system tied repertoire to the state. When censorship loosens, subject matter moves; when it tightens, playwrights displace the argument into history or allegory.',
                    'Companies, not individual geniuses, made the work. Repertory, stock roles, apprenticeships and touring circuits determined what was performable. If you can describe the company structure behind a period, you can explain its plays better than a student who only memorises dates.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Answering "how did the proscenium arch change acting?"',
                brief: 'A common exam question with a trap: students describe architecture and stop.',
                steps: [
                    'State the architectural change: a framed opening, auditorium darkened, audience separated from performers.',
                    'Trace the consequence for sightlines: the actor must face front and stay within the frame, so upstage/downstage blocking replaces the open thrust.',
                    'Trace the consequence for style: gesture becomes smaller and more facial, because the audience is closer optically even when far away physically.',
                    'Trace the consequence for illusion: the actor can "ignore" the audience, which makes naturalistic behaviour possible.',
                    'Give a counter-example: popular and political theatre kept direct address, showing that the frame was a choice, not a necessity.',
                    'Conclude that staging arrangements train acting conventions.',
                ],
                takeaway: 'Architecture to sightline to style: three links, each stated, is a full-mark answer.',
            },
            {
                title: 'Comparing two national traditions without listing them',
                brief: 'You must compare the English playhouse and the Spanish corral in a timed essay.',
                steps: [
                    'Set the comparison criteria first: funding, space, audience composition, repertoire practice.',
                    'Compare within each criterion rather than describing one theatre then the other.',
                    'Identify the shared constraint: daylight, open air, commercial risk.',
                    'Identify the divergence: company organisation and the role of the actor-manager.',
                    'Explain why divergence occurred using evidence about ownership and patronage.',
                    'Close by arguing that similarity came from constraint and difference from institutions.',
                ],
                takeaway: 'Compare criterion by criterion, never theatre by theatre.',
            },
        ],
        examBank: [
            {
                question: 'To what extent was the picture-frame stage a product of Renaissance perspective rather than of audience demand?',
                marks: '20 marks',
                outline: [
                    'Explain perspective scenery and its requirement of a single viewing point.',
                    'Show the court and academy context that funded it.',
                    'Argue the audience side: indoor halls, paying spectators, desire for spectacle and comfort.',
                    'Use the English exception to show that demand alone did not produce the frame.',
                    'Conclude that technique supplied the means and commercial indoor theatre supplied the motive.',
                ],
                trap: 'Treating perspective as a neutral technical advance. It was a way of seeing with social consequences.',
            },
            {
                question: 'How did lighting technology alter dramatic writing between 1600 and 1900?',
                marks: '15 marks',
                outline: [
                    'Daylight: direct address, minimal scenery, place established in language.',
                    'Candle and oil: indoor intimacy, selective visibility, evening performances.',
                    'Gas and electricity with dimming: darkened auditorium, focus on the actor, fourth wall.',
                    'Show one playwriting consequence: the drawing-room scene with concealed information becomes possible.',
                ],
            },
        ],
        glossary: [
            { term: 'Proscenium arch', definition: 'The framed opening separating stage from auditorium, typical of picture-frame theatre.' },
            { term: 'Thrust stage', definition: 'A stage projecting into the auditorium with audience on three sides.' },
            { term: 'Groundling', definition: 'A spectator standing in the yard of an open-air playhouse.' },
            { term: 'Corral', definition: 'The Spanish courtyard playhouse, with raised stage, yard and galleries.' },
            { term: 'Box set', definition: 'A realistic interior with three walls and a ceiling, the fourth wall imagined.' },
            { term: 'Unities', definition: 'Neoclassical rules of action, time and place derived from Aristotle and Horace.' },
            { term: 'Repertory', definition: 'A system of rotating several plays in performance rather than running one.' },
            { term: 'Line of business', definition: 'The stock role type an actor specialised in within a repertory company.' },
            { term: 'Actor-manager', definition: 'A performer who also ran the company, choosing repertoire and staging.' },
            { term: 'Patent theatre', definition: 'A London theatre holding a royal licence to perform spoken drama.' },
            { term: 'Vanishing point', definition: 'The point where receding lines meet in perspective scenery, fixing the ideal seat.' },
            { term: 'Fourth wall', definition: 'The invisible boundary through which the audience watches a naturalistic production.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Medieval to Renaissance', focus: 'Cause and effect.', tasks: ['Draw the chain from patronage to staging.', 'Label a playhouse diagram from memory.', 'Write 400 words on perspective and seating.'] },
            { week: 'Week 2 - England and Spain', focus: 'Comparison.', tasks: ['Build a four-criterion comparison table.', 'Find one play that reflects repertory conditions.', 'Practise a compare-by-criterion paragraph.'] },
            { week: 'Week 3 - Neoclassicism to romanticism', focus: 'Rules and revolt.', tasks: ['Summarise the unities in three sentences.', 'List three romantic objections to them.', 'Trace one censorship case.'] },
            { week: 'Week 4 - Realism', focus: 'Lighting and the box set.', tasks: ['Explain how dimming enabled naturalism.', 'Describe a box set in production terms.', 'Write a timed 20-mark answer.'] },
        ],
        readingList: [
            'Any standard theatre history survey covering the Renaissance to the nineteenth century.',
            'A study of Shakespearean playhouse reconstruction and its evidence.',
            'A history of stage lighting for the shift from daylight to gas and electricity.',
        ],
    },

    'tha-214-fundamentals-of-script-writing': {
        sections: [
            {
                heading: 'A play is a machine for producing events',
                paragraphs: [
                    'Beginning writers describe. Produced writers make things happen. The unit of a play is not the line but the event: something changes between the start and end of a scene, and the audience can name what changed. If a scene could be removed without altering anything later, it is not a scene; it is a conversation.',
                    'Structure in the practical sense is the arrangement of those changes so that each one makes the next one necessary. The traditional three-act shape and the five-act shape are descriptions of that pressure, not recipes. What matters is that the protagonist wants something, tries, fails in a way that raises the cost, and is finally forced to act in a way they would have avoided at the start.',
                    'Write the spine before the dialogue. One page: who wants what, who or what blocks it, what is at risk if they fail, and what the last image is. If you cannot write that page, no amount of dialogue will save the script, because you do not yet know what the scenes are for.',
                ],
            },
            {
                heading: 'Dialogue is behaviour with words',
                paragraphs: [
                    'People rarely say what they mean, and characters should not either. Dialogue works when each speaker is pursuing an objective and using language as an instrument - to persuade, to deflect, to wound, to test. Write the objective above each scene and check that every exchange serves it.',
                    'Cut the exposition. Audiences accept information they overhear but resist information they are told. Let the facts arrive as a by-product of an argument: a character mentions the rent because they are angry about it, not because the audience needs to know. Two lines of conflict can carry a page of backstory.',
                    'Read every line aloud. Speech that looks fine on the page often reveals itself as unsayable: too many subordinate clauses, tongue-twisting consonant clusters, or a rhythm that no human breath supports. Cut ten per cent of the words in every speech and the scene usually improves.',
                ],
                callout: {
                    title: 'The rewrite rule',
                    body: 'A first draft is material, not a script. Plan to write three: one to find the story, one to fix the structure, one to polish the language.',
                },
            },
            {
                heading: 'Format, producibility and collaboration',
                paragraphs: [
                    'Standard play format is functional: character names in capitals at the left margin, dialogue beneath, stage directions in italics or brackets indented, act and scene headings, and a character list at the front. Nobody awards marks for typography, but a script that is hard to read will be read badly.',
                    'Producibility is a discipline. Count your locations, your cast, your costume changes and your effects. A script that needs twelve actors, five sets and a live animal will not be staged by a student company, however good the writing. Constraints often improve the work: a single room forces conflict into language.',
                    'A script is a blueprint for other people. The director, designer, actors and stage manager will all make decisions from your pages, so include only what they cannot invent themselves: who speaks, what is necessary for the action, and what would otherwise be misunderstood. Directing from the page ("she looks at him meaningfully, remembering her father") removes the actor\'s work and usually reads as amateur.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Building a ten-minute play from one want',
                brief: 'You need a complete short play for assessment. Here is a workable construction method.',
                steps: [
                    'Choose one want with a deadline: a student needs a signature before an office closes.',
                    'Give the want an obstacle with power: the official is the mother of the student\'s ex-partner.',
                    'Set the stakes: without the signature, a scholarship is lost.',
                    'Start late - at the moment the request is refused, not at the walk to the office.',
                    'Escalate twice: first a reasonable argument, then a threat, then an offer the student cannot afford.',
                    'End on a decision that costs something, and cut the explanation of what it cost.',
                ],
                takeaway: 'One want, one obstacle, two escalations, one costly decision. That is a complete short play.',
            },
            {
                title: 'Turning a bad scene into a scene',
                brief: 'Your scene has two characters discussing whether to attend a party. It is dull. Diagnose and repair.',
                steps: [
                    'Name what changes: nothing, so there is no scene.',
                    'Ask what each character wants in the scene and whether the wants conflict.',
                    'Introduce a cost: one of them has already told a lie about the party.',
                    'Cut the first 30 seconds where they agree.',
                    'Make the refusal happen on a specific line and let the other character react with an action rather than a speech.',
                    'End before the argument resolves, so the next scene has somewhere to go.',
                ],
                takeaway: 'If nobody wants anything incompatible, you have written an interview, not a scene.',
            },
        ],
        examBank: [
            {
                question: 'Explain the function of conflict in dramatic structure and distinguish it from argument.',
                marks: '15 marks',
                outline: [
                    'Define conflict as incompatible objectives, not raised voices.',
                    'Show how conflict generates events and therefore structure.',
                    'Distinguish argument (a form conflict may take) from conflict itself.',
                    'Give an example of a quiet scene with high conflict.',
                    'Conclude that structure is the arrangement of unresolved incompatibilities.',
                ],
            },
            {
                question: 'Why should a writer avoid directing the actor in stage directions?',
                marks: '10 marks',
                outline: [
                    'Explain the division of labour: the script supplies action and speech, the production supplies interpretation.',
                    'Show how over-written directions pre-empt the actor and director.',
                    'Distinguish necessary directions (entrances, business required by plot) from emotional instructions.',
                    'Note the practical cost: a script that cannot be staged flexibly is less likely to be produced.',
                ],
                trap: 'Confusing stage directions that make the plot possible with directions that dictate feeling.',
            },
        ],
        glossary: [
            { term: 'Event', definition: 'A change in the situation of a scene that the audience can name.' },
            { term: 'Objective', definition: 'What a character is trying to achieve in a scene.' },
            { term: 'Obstacle', definition: 'The force or person preventing the objective, which generates conflict.' },
            { term: 'Stakes', definition: 'What is lost if the character fails.' },
            { term: 'Spine', definition: 'The one-page statement of want, obstacle, risk and ending that organises the draft.' },
            { term: 'Beat', definition: 'A unit of change within a scene, marked by a shift in tactic or power.' },
            { term: 'Exposition', definition: 'Background information the audience needs, best delivered as a by-product of action.' },
            { term: 'Subtext', definition: 'Meaning carried under the spoken words.' },
            { term: 'Reversal', definition: 'A moment where the action turns against the protagonist\'s expectation.' },
            { term: 'Climax', definition: 'The point of highest pressure where the central incompatibility must resolve.' },
            { term: 'Producibility', definition: 'The practical feasibility of staging a script with available cast, space and budget.' },
            { term: 'Rewriting', definition: 'The structured revision of a draft for story, structure and language.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Spine', focus: 'Story before dialogue.', tasks: ['Write a one-page spine for two ideas.', 'Choose the one with higher stakes.', 'Outline five events.'] },
            { week: 'Week 2 - First draft', focus: 'Getting to the end.', tasks: ['Write the draft without editing.', 'Mark the event in every scene.', 'Read it aloud once.'] },
            { week: 'Week 3 - Structure', focus: 'Cutting and escalating.', tasks: ['Delete any scene with no event.', 'Add one escalation in act two.', 'Check the ending costs something.'] },
            { week: 'Week 4 - Language', focus: 'Dialogue and format.', tasks: ['Cut ten per cent of every speech.', 'Read with two actors.', 'Reformat to standard script layout.'] },
        ],
        readingList: [
            'Any practical playwriting guide covering structure, conflict and rewriting.',
            'Two published short plays to study how quickly a scene establishes want and obstacle.',
            'Your department\'s script submission guidelines for format and length.',
        ],
    },

    'tha-215-basic-film-analysis-and-appreciation': {
        sections: [
            {
                heading: 'The sequence is the unit of meaning',
                paragraphs: [
                    'A single shot can be beautiful and mean very little. Meaning appears when shots are placed next to each other, because the cut creates a relationship the audience completes. Two neutral images in sequence produce a third idea: a face, then a plate of food, reads as hunger or refusal depending on the performance in the first shot.',
                    'This is why film analysis should begin with the sequence rather than the frame. Identify where a sequence starts and ends (usually by a change of place, time or argument), then ask what question the sequence poses and how the editing answers it. A chase sequence poses "will they escape?" and answers it with rhythm: shots shorten as pressure rises.',
                    'Mise-en-scene - everything within the frame - is the other half. Setting, costume, lighting, colour, the arrangement of bodies and the choice of what is left out all communicate before a character speaks. Learn to describe a frame neutrally first ("she sits at the far end of a long table, lit from one side, the other chair empty"), then interpret. Description first protects you from inventing.',
                ],
            },
            {
                heading: 'Editing, time and point of view',
                paragraphs: [
                    'Continuity editing is a set of conventions designed to be invisible: shot-reverse-shot, eyeline matches, match cuts on action, and the 180-degree rule. Its purpose is to let the audience follow space and time without effort. When a film breaks those rules, it is usually asking you to notice.',
                    'Alternatives are deliberate. A jump cut compresses time and signals impatience or fracture. A long take preserves the continuity of real time and refuses to guide your attention, which is why it feels either immersive or anxious depending on the content. Montage builds meaning by association rather than by spatial continuity, and is the standard tool for compressing labour, training or the passage of months.',
                    'Point of view is the question of whose experience organises the film. A shot from a character\'s optical position, a voice-over, a sound that only they can hear, or a restriction of information to what they know all establish subjectivity. Track who is allowed to know what and when; the pattern is usually the film\'s argument.',
                ],
                callout: {
                    title: 'Sound carries half the meaning',
                    body: 'Try watching a two-minute sequence with the sound off, then with the image off. The second exercise usually tells you more about how the scene was built.',
                },
            },
            {
                heading: 'Writing analysis that earns marks',
                paragraphs: [
                    'The standard failure is the review: "the cinematography was stunning and the acting was superb". A review evaluates; analysis explains. Replace every adjective with a mechanism. Not "tense editing" but "the average shot length drops from six seconds to two across the sequence, so the audience has less time to locate each new image".',
                    'Cite with precision. Name the sequence by its position and content ("the market sequence, 00:34:10-00:37:20"), and describe what you saw. If you are working from a screening you cannot rewind, take notes in a fixed pattern during the film: shot size, camera movement, sound, and one word for what changed.',
                    'Context belongs at the end of the argument, not the beginning. Industrial conditions, censorship, budget and genre expectations explain why a film makes the choices it does, but they cannot substitute for showing the choices. Establish the evidence, then explain it.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Analysing a two-minute sequence',
                brief: 'You must produce 800 words on one sequence. Here is a repeatable structure.',
                steps: [
                    'Watch once without notes to establish the dramatic question.',
                    'Watch again and log every shot: number, size, movement, duration, sound.',
                    'Identify the pattern: does shot length shorten, does the camera move more, does sound become subjective?',
                    'Pick three moments where the pattern breaks and describe them precisely.',
                    'Argue what the pattern does to the audience\'s knowledge or sympathy.',
                    'Conclude with what the sequence contributes to the film\'s overall argument.',
                ],
                takeaway: 'Log, find the pattern, then interpret the pattern. Never interpret before you have logged.',
            },
            {
                title: 'Why a scene feels false',
                brief: 'A dialogue scene in a student film feels stagey although the writing is fine. Diagnose it.',
                steps: [
                    'Check coverage: if every shot is a medium two-shot, the scene has no visual rhythm.',
                    'Check eyelines: crossing the line makes the conversation spatially incoherent.',
                    'Check the cutaways: without reaction shots, the audience never sees anyone listen.',
                    'Check pace: uniform shot lengths remove emphasis, so nothing lands.',
                    'Check sound: no room tone makes cuts audible, which reads as amateur.',
                    'Repair by planning one close-up on the turn of the scene and varied shot lengths.',
                ],
                takeaway: 'Stagey film is usually a coverage problem, not a writing problem.',
            },
        ],
        examBank: [
            {
                question: 'Using one sequence, show how editing creates meaning rather than simply recording action.',
                marks: '20 marks',
                outline: [
                    'Define the sequence and its dramatic question.',
                    'Describe the editing pattern with evidence: shot lengths, transitions, ordering.',
                    'Show one moment where the cut produces an idea absent from either shot alone.',
                    'Show one moment where continuity is deliberately broken and explain the effect.',
                    'Conclude on editing as argument, not transcription.',
                ],
                trap: 'Listing shot types without saying what the arrangement does to the audience.',
            },
            {
                question: 'What is mise-en-scene and how does it communicate before dialogue?',
                marks: '15 marks',
                outline: [
                    'Define the term: everything placed within the frame.',
                    'Break it into setting, costume, lighting, colour, composition, performance.',
                    'Give one frame described neutrally then interpreted.',
                    'Explain the principle: the frame is a set of choices, and absences are choices too.',
                ],
            },
        ],
        glossary: [
            { term: 'Mise-en-scene', definition: 'Everything arranged within the frame: setting, costume, light, colour, bodies and props.' },
            { term: 'Sequence', definition: 'A group of shots forming a unit of action or argument, usually unified by place or time.' },
            { term: 'Continuity editing', definition: 'Conventions that make cuts invisible so the audience follows space and time easily.' },
            { term: 'Jump cut', definition: 'An abrupt cut between similar framings that compresses time or signals fracture.' },
            { term: 'Long take', definition: 'A shot held for an extended period, preserving real time and refusing to guide attention.' },
            { term: 'Montage', definition: 'Editing that builds meaning by association and compresses time.' },
            { term: 'Shot-reverse-shot', definition: 'Alternating shots of two speakers that constructs a conversation in space.' },
            { term: 'Match cut', definition: 'A cut linking two shots through a visual or rhythmic correspondence.' },
            { term: 'Diegetic', definition: 'Belonging to the story world, as opposed to added for the audience.' },
            { term: 'Point of view', definition: 'The perspective whose knowledge and experience organise the film.' },
            { term: 'Average shot length', definition: 'The mean duration of shots in a sequence, a measurable index of pace.' },
            { term: 'Subjective sound', definition: 'Sound presented as heard by a character, such as muffled or distorted audio.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Vocabulary', focus: 'Naming what you see.', tasks: ['Log shots for ten minutes of any film.', 'Describe five frames neutrally.', 'Convert three adjectives into mechanisms.'] },
            { week: 'Week 2 - Sequence', focus: 'Pattern and pace.', tasks: ['Measure average shot length in two sequences.', 'Mark where the pattern breaks.', 'Write 400 words on one break.'] },
            { week: 'Week 3 - Sound', focus: 'Listening.', tasks: ['Watch a sequence image-off.', 'Note diegetic and non-diegetic layers.', 'Explain one sound bridge.'] },
            { week: 'Week 4 - Essay', focus: 'Argument.', tasks: ['Choose one sequence and one claim.', 'Write 800 words with timestamps.', 'Cut every evaluative adjective.'] },
        ],
        readingList: [
            'Any introductory film analysis text covering mise-en-scene, editing and sound.',
            'A glossary of film terms to use consistently in your writing.',
            'One published analysis of a film from your region to see the method applied locally.',
        ],
    },

    'tha-231-rudiments-of-directing': {
        sections: [
            {
                heading: 'Directing is decided in advance',
                paragraphs: [
                    'The common image of a director is someone shouting instructions. In practice, directing is mostly preparation: reading the script until you can say what it is about in one sentence, deciding what the audience must feel at each turn, and then building a plan that produces those effects. Rehearsal is where the plan meets the actors, not where the plan is invented.',
                    'Start with the through-line: whose story is it, what do they want, and what does the play do to them? Then choose a spine for the production - an interpretation that gives every scene a purpose. A production without a spine is a collection of well-acted scenes that do not add up.',
                    'The six visual tools are the director\'s compositional vocabulary: level, balance, contrast, focus, rhythm and proportion. They are taught because they are checkable. Before you tell an actor to move, ask which tool the move is serving. If none, the move is decoration.',
                ],
            },
            {
                heading: 'The six visual tools in use',
                paragraphs: [
                    'Level refers to height relationships: a standing figure against a seated one creates authority before a word is spoken. Balance is the distribution of visual weight across the stage; an unbalanced composition produces unease, which is useful when the scene is unstable and distracting when it is not. Contrast is difference - in costume, light, sound, tempo - and is how the audience is told what matters.',
                    'Focus is where attention goes, and it is created by light, movement, stillness, and the direction of other actors\' gazes. Rhythm is the pattern of duration and pause in a scene: a director who lets every scene run at the same speed has no rhythm. Proportion is the relative size and prominence of elements, including how much of the stage each actor occupies.',
                    'Use the tools to solve problems rather than to decorate. If the audience is watching the wrong character, change focus rather than telling the actor to be louder. If a scene feels flat, change rhythm before changing the text.',
                ],
                callout: {
                    title: 'The blocking notebook',
                    body: 'Record every blocking choice with the reason: "cross down left - so the letter is hidden from the audience until she turns". When you cannot write a reason, you have found a move to cut.',
                },
            },
            {
                heading: 'Working with actors, and rehearsal structure',
                paragraphs: [
                    'Actors need three things from a director: clarity about what the scene must achieve, freedom in how to achieve it, and consistency. Give notes that describe the effect rather than the feeling ("the audience must not know whether you are lying") and let the actor find the behaviour. Never give a line reading unless the actor asks; it produces imitation instead of performance.',
                    'A workable rehearsal sequence: table work to establish the story and the characters\' objectives, blocking to fix the physical shape, then detailed work on beats and transitions, then runs with technical elements, then dress rehearsals. Compress according to time available, but never skip the table work entirely - it is cheaper to fix a misunderstanding before anyone has learned a movement.',
                    'Notes after a run should be few, specific and ordered by importance. Three clear notes acted on beat twenty scattered observations. Always say what worked, because actors need to know what to keep as much as what to change.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Blocking a scene for a specific effect',
                brief: 'A two-hander where one character must feel trapped and the other in control - with no furniture available.',
                steps: [
                    'Choose the level relationship: the controlling character stands; the trapped one begins seated on the floor, then rises late.',
                    'Set the focus: the controlling character always faces the audience side of the trapped one, so we see the trapped face react.',
                    'Create contrast: give the controlling character almost no movement and the trapped one a small repeated gesture.',
                    'Use proportion: keep the trapped character downstage, close to the audience, isolated on one third of the stage.',
                    'Control rhythm: long silences in the first half, accelerating crossings in the second.',
                    'Test with a spectator: ask who they watched and when, then adjust focus only.',
                ],
                takeaway: 'Compose the relationship, not the picture. The tools exist to make power visible.',
            },
            {
                title: 'Giving a note that works',
                brief: 'An actor delivers a confession scene at full emotional intensity from the first line. Fix it.',
                steps: [
                    'Describe the problem as an effect, not a judgement: "we know too early, so we stop listening".',
                    'State the requirement: the audience must suspect before they are certain.',
                    'Offer a playable action: "try to keep it from him for as long as you can".',
                    'Give them a second attempt without further explanation.',
                    'Note what changed and name it, so the actor knows what to repeat.',
                ],
                takeaway: 'Notes should give the actor a task, not a diagnosis of their talent.',
            },
        ],
        examBank: [
            {
                question: 'Discuss the director\'s responsibility for the through-line of a production.',
                marks: '20 marks',
                outline: [
                    'Define through-line and distinguish it from theme.',
                    'Explain how it guides casting, cutting, blocking and pace.',
                    'Show what happens without one: episodic production, unclear stakes.',
                    'Acknowledge the collaborative limit: designers and actors contribute to the spine.',
                    'Conclude that the through-line is an argument the director must be able to state.',
                ],
                trap: 'Confusing a theme (what the play is about) with a through-line (what the production is doing with it).',
            },
            {
                question: 'Explain three of the six visual tools and give a staging problem each solves.',
                marks: '15 marks',
                outline: [
                    'Name the tools and define them.',
                    'For each, give a concrete staging problem and the compositional fix.',
                    'Explain the principle that tools solve problems rather than decorate.',
                ],
            },
        ],
        glossary: [
            { term: 'Through-line', definition: 'The organising action of a production that gives every scene a purpose.' },
            { term: 'Spine', definition: 'The director\'s stated interpretation that unifies decisions.' },
            { term: 'Blocking', definition: 'The planned movement and positioning of actors in space.' },
            { term: 'Level', definition: 'Height relationships between performers, used to show authority and vulnerability.' },
            { term: 'Balance', definition: 'The distribution of visual weight across the stage picture.' },
            { term: 'Contrast', definition: 'Deliberate difference in light, costume, tempo or sound that marks significance.' },
            { term: 'Focus', definition: 'The direction of audience attention, created by light, movement and gaze.' },
            { term: 'Rhythm', definition: 'The pattern of duration, pause and tempo across a scene or production.' },
            { term: 'Proportion', definition: 'The relative size and prominence of elements on stage.' },
            { term: 'Table work', definition: 'Rehearsal discussion of text, objectives and story before staging.' },
            { term: 'Note', definition: 'A director\'s specific instruction given after a rehearsal or run.' },
            { term: 'Technical rehearsal', definition: 'A rehearsal integrating light, sound, scene changes and cues with the acting.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Read', focus: 'The play on paper.', tasks: ['Write the one-sentence spine.', 'Mark every scene\'s turning point.', 'List what the audience must know and when.'] },
            { week: 'Week 2 - Compose', focus: 'Visual tools.', tasks: ['Draw a ground plan.', 'Block one scene using three tools.', 'Justify every move in writing.'] },
            { week: 'Week 3 - Rehearse', focus: 'Working with actors.', tasks: ['Run table work on act one.', 'Give notes as playable actions.', 'Record one note and its effect.'] },
            { week: 'Week 4 - Run', focus: 'Integration.', tasks: ['Run with cues.', 'Cut one move that has no reason.', 'Write a three-note page for the company.'] },
        ],
        readingList: [
            'Any directing handbook covering composition, blocking and rehearsal structure.',
            'A director\'s published rehearsal notes or interview about a specific production.',
            'Your department\'s technical facilities list so your plan is buildable.',
        ],
    },
})

// ── Design, production, community and research tracks ───────────────────────
Object.assign(THEATRE_FILM_DEPTH, {
    'tha-242-costume-and-appearance-design': {
        sections: [
            {
                heading: 'Costume is character before speech',
                paragraphs: [
                    'A costume tells the audience who a person is, what they do, where they are and what has just happened to them - and it does so before a single line. That is why costume design begins with questions about the character, not with sketches: age, occupation, income, climate, period, social position, and the precise moment of the story.',
                    'The design brief is written, not imagined. For each character you need: the silhouette (the overall shape), the palette (colours and their relationships), the texture and weight of fabric, the condition of the garments, and the changes required by the action. A character who has been travelling needs creases and dust; a character who has just been humiliated needs a garment that no longer fits the way it did.',
                    'Students lose marks by designing "beautiful clothes" rather than characters. A test: show your sketch to someone who has not read the play and ask what they can tell about the person. If they can only say "she looks nice", the design has not done its job.',
                ],
            },
            {
                heading: 'Designing for the medium',
                paragraphs: [
                    'Stage and screen impose opposite constraints. On stage the audience is at distance, so silhouette, colour blocking and contrast carry the information; fine detail is wasted, and fabric that photographs poorly under stage light may read beautifully in the hand. On screen the camera decides: a close-up shows weave, stain and the fraying of a cuff, and the costume must survive that scrutiny without looking like a costume.',
                    'Practicalities govern both. Stage costume must allow the movement the blocking requires, survive quick changes, fasten reliably and be repairable. Screen costume must work across continuity - multiple takes, different days, the same mud on the same sleeve - which is why a continuity photograph of every costume state is a basic professional habit.',
                    'Carnival and festival costume is a third category with its own logic. There the body is a structure for spectacle: scale, colour, movement and lightness matter, because the costume is seen in motion and at distance, often at night, often in a crowd. Weight distribution and heat are design problems as real as the pattern.',
                ],
                callout: {
                    title: 'Buy, borrow, build, alter',
                    body: 'The professional order is cheapest first: source existing garments, alter them, build only what cannot be found. A student budget is a design constraint that should appear in your sketchbook as a cost column.',
                },
            },
            {
                heading: 'The costume plot and the paperwork',
                paragraphs: [
                    'The costume plot is the document that makes a production run. A grid with characters down one side and scenes across the top, each cell listing the costume or change, immediately reveals collisions: two characters changing in the same ninety seconds, an actor in four costumes, a garment needed in scenes that cannot share a dressing room.',
                    'Behind the plot sit the working documents: the measurement sheet, the budget with receipts, the fittings schedule, the laundry and repair rota, and the continuity photographs. Costume work fails in production, not in design, and it fails for boring reasons - a zip that breaks, a hem that drops, a change with no dresser assigned.',
                    'Marks in assessment come from showing the whole chain: research, brief, sketches, fabric choice with justification, cost, construction plan and the running of the show. A beautiful sketch with no construction plan is half a design.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Turning a script into a costume brief',
                brief: 'A character is described only as "a market woman in her fifties, recently widowed". Build a brief.',
                steps: [
                    'Establish facts: occupation, income, climate, period, and the social role of mourning in the setting.',
                    'Choose silhouette: generous wrapper and blouse that permits sitting on the ground and carrying loads.',
                    'Choose palette: faded indigo and dark brown, with one item retained from before the death to show continuity of self.',
                    'Choose condition: worn edges at the shoulder where loads rest, fresh laundering but old fabric.',
                    'Choose texture: heavy cotton that reads at distance and survives heat.',
                    'List changes: the mourning garment in act one, the practical working dress in act three.',
                    'Write the cost and source for each item.',
                ],
                takeaway: 'A brief is a list of decisions with reasons. The sketch follows the reasoning.',
            },
            {
                title: 'Solving a quick change',
                brief: 'An actor must change from a tailored suit to work clothes in forty seconds, offstage, with one dresser.',
                steps: [
                    'Count the fastenings: every button, zip and lace has a time cost.',
                    'Redesign the first costume with magnetic or press-stud closures hidden under a placket.',
                    'Build the second costume as a single piece that goes on over the head.',
                    'Pre-set both costumes in the order of removal, with the second on a marked rail.',
                    'Rehearse the change with the dresser at the same time as the scene before it.',
                    'Time it three times and add ten seconds of margin.',
                ],
                takeaway: 'Quick changes are engineered in the workroom and rehearsed like blocking.',
            },
        ],
        examBank: [
            {
                question: 'How does costume design differ between stage and screen?',
                marks: '15 marks',
                outline: [
                    'State the viewing conditions: distance and light versus lens and close-up.',
                    'Explain what carries on stage: silhouette, colour blocks, contrast, durability.',
                    'Explain what carries on screen: texture, detail, continuity and realism under scrutiny.',
                    'Give a practical example of a garment that works in one medium and fails in the other.',
                    'Conclude that the medium sets the design problem, not merely the finish.',
                ],
            },
            {
                question: 'Explain the purpose of a costume plot and what it reveals.',
                marks: '10 marks',
                outline: [
                    'Describe the grid of characters against scenes.',
                    'Show what it exposes: change collisions, actor load, garment reuse, dresser requirements.',
                    'Link it to budget and laundry planning.',
                    'State that it is a production tool, not a design artefact.',
                ],
            },
        ],
        glossary: [
            { term: 'Silhouette', definition: 'The overall outer shape of a costume as read at distance.' },
            { term: 'Palette', definition: 'The planned set of colours and their relationships across a production.' },
            { term: 'Costume plot', definition: 'A grid listing each character\'s costume per scene, exposing changes and collisions.' },
            { term: 'Quick change', definition: 'A costume change completed in seconds, engineered and rehearsed in advance.' },
            { term: 'Continuity', definition: 'Consistency of costume state across takes, days and scenes.' },
            { term: 'Dresser', definition: 'The crew member who assists with costume changes during performance.' },
            { term: 'Fitting', definition: 'A session adjusting a garment to the performer\'s body and movement needs.' },
            { term: 'Breakdown', definition: 'The deliberate ageing or distressing of a garment to look used.' },
            { term: 'Toile', definition: 'A cheap test version of a garment used to check fit before cutting final fabric.' },
            { term: 'Practicality', definition: 'A garment\'s ability to survive the movement, heat and changes a production demands.' },
            { term: 'Costume parade', definition: 'A review of all costumes under performance lighting before technical rehearsals.' },
            { term: 'Pulling', definition: 'Selecting existing garments from stock or hire rather than building new.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Read', focus: 'Characters and constraints.', tasks: ['Write a brief for three characters.', 'Note every change the action requires.', 'List budget and sourcing options.'] },
            { week: 'Week 2 - Research', focus: 'Evidence.', tasks: ['Collect period and regional reference.', 'Justify one fabric choice in writing.', 'Sketch three silhouettes per character.'] },
            { week: 'Week 3 - Build', focus: 'Making it real.', tasks: ['Make a toile for one garment.', 'Cost the full plot.', 'Plan fittings and a repair kit.'] },
            { week: 'Week 4 - Run', focus: 'Production discipline.', tasks: ['Build the costume plot grid.', 'Rehearse every quick change.', 'Take continuity photographs of each state.'] },
        ],
        readingList: [
            'Any costume design text covering research, brief-writing and the costume plot.',
            'A stagecraft handbook section on wardrobe maintenance and quick changes.',
            'Photographic reference of carnival and festival costume construction in your region.',
        ],
    },

    'tha-252-radio-tv-and-film-production': {
        sections: [
            {
                heading: 'The production chain, end to end',
                paragraphs: [
                    'Every production, from a thirty-second radio ident to a short film, runs the same chain: development, pre-production, production, post-production, distribution. The proportions change but the order does not, and skipping a stage costs more later than it would have cost then.',
                    'Pre-production is where the production is actually won. Script locked, locations confirmed with written permission, equipment tested, crew roles assigned, schedule written with travel time, and a shot list or running order prepared. A student crew that arrives without a shot list will shoot what is in front of them and discover in the edit that a reaction shot was never captured.',
                    'Post-production is where the material becomes a programme. Logging, assembly, rough cut, sound work, colour, titles and export. Export settings matter: a file that is too large to submit or too compressed to screen has failed the assignment at the last step.',
                ],
            },
            {
                heading: 'Sound first, because it is hardest to fix',
                paragraphs: [
                    'Audiences forgive soft images and abandon poor sound. On location, record dialogue close with a directional microphone whenever possible, monitor with headphones, and capture thirty seconds of room tone at every setup. Wind, traffic and generator hum are the three most common destroyers of amateur footage, and all three are solved by microphone placement and a little patience.',
                    'Radio production is sound design without a picture, which makes it the best training for film sound. Build a scene from three layers: speech, effects that establish place, and music or silence that carries emotion. Keep levels consistent and remember that a listener needs a moment to recognise a new location, so transitions need a bridge - a door, a crowd, a change of acoustic.',
                    'For television, observe the formats: the package with a presenter link, the studio interview with cutaways, the magazine item with a fixed duration. Formats constrain content, and a producer who ignores the format will have the item cut for them.',
                ],
                callout: {
                    title: 'Test the kit before you leave',
                    body: 'Batteries, cards, cables, adapters, a backup recorder and a charged phone. Equipment failure is the most common cause of a lost shoot day, and the most preventable.',
                },
            },
            {
                heading: 'Roles, safety and permissions',
                paragraphs: [
                    'A small crew still needs defined roles: producer (schedule, permissions, budget), director (interpretation and performance), camera, sound, and a runner who also handles continuity. Where one person holds two roles, write down which hat is on for each part of the day, or decisions will be made twice and differently.',
                    'Permissions are part of production. Written consent to film on private property, consent from people who appear on camera, and caution about filming identifiable people in sensitive situations. Consent is not a formality: it protects the contributor and the production.',
                    'Safety on set is boring and non-negotiable: cables taped down, no one behind a reversing vehicle, lamps given space and kept away from fabric, and a first-aid point known to everyone. Never rig anything above head height without someone competent to check it.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Planning a two-minute radio package',
                brief: 'You have three interviews, forty minutes of material and a two-minute slot.',
                steps: [
                    'Write the story in one sentence and decide the order: hook, context, evidence, close.',
                    'Select three actuality clips - the best eight seconds of each speaker, not the longest.',
                    'Record a link that sets the scene in one line.',
                    'Add two effects that establish place, and one pause before the final quote.',
                    'Lay the bed music under the link only, ducked to stay below speech.',
                    'Time it aloud; two minutes of radio is roughly 280-320 words plus actuality.',
                    'Export as a single mono file at broadcast level.',
                ],
                takeaway: 'Write for the ear and cut for the clock. The best clip is the shortest one that makes the point.',
            },
            {
                title: 'Recovering a shoot with no close-ups',
                brief: 'You return from a shoot with only wide masters. The edit needs reaction shots.',
                steps: [
                    'Assess what exists: can any wide be reframed as a medium without losing resolution?',
                    'Identify whether any usable coverage exists from a second setup.',
                    'If not, plan a pickup shoot for reaction shots only, scheduled around the same costume and light.',
                    'Design the edit to work without reactions: use sound, inserts, or hold on the wide for effect.',
                    'Record the lesson in the shot list template for next time.',
                ],
                takeaway: 'When coverage fails, either shoot pickups or redesign the edit - never stretch a wide until it breaks.',
            },
        ],
        examBank: [
            {
                question: 'Why is pre-production considered the most important stage of production?',
                marks: '15 marks',
                outline: [
                    'Define pre-production activities: script, schedule, permissions, crew, kit.',
                    'Explain cost logic: mistakes are cheapest to fix before shooting.',
                    'Give concrete failure examples caused by missing preparation.',
                    'Acknowledge that some discovery happens on set, and that preparation is what makes room for it.',
                    'Conclude that production executes decisions, so decisions must exist first.',
                ],
            },
            {
                question: 'Describe the three layers of a radio scene and explain their functions.',
                marks: '10 marks',
                outline: [
                    'Speech establishes action and character.',
                    'Effects establish place and movement.',
                    'Music or silence establishes emotional register and marks transitions.',
                    'Explain the need for acoustic bridges between locations.',
                ],
            },
        ],
        glossary: [
            { term: 'Pre-production', definition: 'Planning stage covering script, schedule, budget, crew, permissions and equipment.' },
            { term: 'Shot list', definition: 'A prepared list of every shot required, used to shoot efficiently and completely.' },
            { term: 'Running order', definition: 'The planned sequence and timing of items in a programme.' },
            { term: 'Actuality', definition: 'Recorded speech or ambient sound from the real situation, used as evidence.' },
            { term: 'Room tone', definition: 'The ambient sound of a location, recorded to smooth edits.' },
            { term: 'Package', definition: 'A complete broadcast item combining links, actuality and effects.' },
            { term: 'Bed', definition: 'Music or ambience played under speech, usually at reduced level.' },
            { term: 'Rough cut', definition: 'A first assembly of edited material establishing structure.' },
            { term: 'Export', definition: 'The final encoding of a programme into a deliverable file format.' },
            { term: 'Continuity', definition: 'Consistency of props, costume and action between takes and scenes.' },
            { term: 'Consent', definition: 'Permission from a contributor to be recorded and broadcast.' },
            { term: 'Pickup', definition: 'An additional shoot to capture material missed in the main production.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Plan', focus: 'The chain.', tasks: ['Write a one-page production plan.', 'Build a shot list or running order.', 'Confirm permissions in writing.'] },
            { week: 'Week 2 - Sound', focus: 'Recording cleanly.', tasks: ['Record dialogue close with headphones.', 'Capture room tone at every setup.', 'Build a three-layer radio scene.'] },
            { week: 'Week 3 - Shoot', focus: 'Coverage.', tasks: ['Shoot master plus singles.', 'Log every take on set.', 'Shoot cutaways and inserts.'] },
            { week: 'Week 4 - Post', focus: 'Delivery.', tasks: ['Assemble and cut to time.', 'Balance levels and check on headphones.', 'Export at the required settings and screen it.'] },
        ],
        readingList: [
            'Any radio production handbook covering packages, actuality and levels.',
            'A film production text on shot lists, coverage and continuity.',
            'Your department\'s equipment manual and safety policy.',
        ],
    },

    'tha-341-community-theatre-for-development': {
        sections: [
            {
                heading: 'Theatre for development is not theatre about development',
                paragraphs: [
                    'The defining difference is authorship. In conventional theatre a writer produces a script and a community receives it. In theatre for development the community identifies the problem, contributes the material, tests the solutions in performance, and decides what happens afterwards. The outsider is a facilitator, not an author, and the measure of success is what changes after the performance, not how good the performance was.',
                    'This has consequences for every stage. Research is done with the community, in its language, at times and places it chooses. The drama is built from its own stories and idioms rather than imported formats. The performance is usually followed by a facilitated discussion in which the audience interrogates the action and proposes alternatives - and may join the scene to try them.',
                    'Because the aim is change, TfD projects fail when they are evaluated only as art. The useful evaluation asks: who participated, what did they learn, what did they decide, and what did they do next? A brilliant performance that leaves no decision behind has not completed the work.',
                ],
            },
            {
                heading: 'Methods: forum, image, and popular theatre forms',
                paragraphs: [
                    'Forum theatre presents a short scene in which a character is oppressed and cannot overcome the obstacle. A facilitator - the joker - invites spectators to replace the protagonist and try a different action on stage. The audience becomes "spect-actors". The method works because it rehearses intervention in conditions that resemble the real ones, and because failure on stage is cheap.',
                    'Image theatre builds frozen pictures of a situation with bodies, then moves them toward an ideal image. It is useful where discussion is blocked by hierarchy or language, because it lets people show a problem before they can articulate it. Newspaper theatre takes published text and reads it against itself, exposing what a report conceals.',
                    'Popular forms - folktale, masquerade, song, dance, puppetry, market comedy - are not decoration. They are the community\'s existing performance grammar, and using them means the audience can follow the argument without being taught the form. A TfD project that imposes an unfamiliar naturalistic play on a village square has chosen the hardest possible route.',
                ],
                callout: {
                    title: 'Do no harm',
                    body: 'A scene about domestic violence, staged without care, can expose and endanger participants. Anonymise, consult before staging, prepare referral support, and let the community decide what may be shown.',
                },
            },
            {
                heading: 'Participation, ethics and exit',
                paragraphs: [
                    'Participation is not attendance. A community that watches your play has not participated; one that shaped the script, argued with it and made a decision has. Plan participation deliberately: who is consulted, how disagreement is recorded, who speaks for those who cannot attend, and how the project avoids being captured by the loudest local voice.',
                    'Ethics in TfD are practical. Informed consent to be recorded and depicted; confidentiality where a story is personal; caution about raising expectations of funding or services; and honesty about what the project can and cannot deliver. Never promise follow-up you cannot provide.',
                    'The exit matters. A project that leaves a community dependent on an outside facilitator has failed. Train local facilitators, leave written material in the local language, connect the group to whatever support exists, and agree in advance how the work continues without you.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Designing a forum theatre session on school fees',
                brief: 'A community identifies that students drop out because fees are paid late. Build the intervention.',
                steps: [
                    'Consult separately with students, parents and staff; the same problem looks different from each position.',
                    'Choose one concrete scene: a student is sent home on the day of a test.',
                    'Stage it so the obstacle is visible: the bursar follows a rule, the parent has no cash, the student has no advocate.',
                    'Brief the joker to stop the scene at the point of no return.',
                    'Run the forum: spectators replace the student and try approaches; record which ones change the outcome.',
                    'Consolidate: ask the group to name the two actions that worked and who must be involved.',
                    'Agree a follow-up - a meeting with the school, a savings arrangement - and who owns it.',
                ],
                takeaway: 'The scene must be small enough to intervene in and exact enough to be recognisable.',
            },
            {
                title: 'Evaluating a TfD project without inventing numbers',
                brief: 'A funder asks for evidence of impact. What can you honestly report?',
                steps: [
                    'Record participation: attendance by group, who spoke, who joined the scene.',
                    'Record decisions: what the community agreed to do and who accepted responsibility.',
                    'Record changes in stated knowledge using a short pre- and post-session question set.',
                    'Record follow-up actions observed weeks later, with dates.',
                    'Report what did not change, and why.',
                    'Do not convert qualitative evidence into invented percentages.',
                ],
                takeaway: 'Honest evaluation is narrower and far more convincing than fabricated impact figures.',
            },
        ],
        examBank: [
            {
                question: 'Distinguish theatre for development from conventional theatre in purpose, process and evaluation.',
                marks: '20 marks',
                outline: [
                    'Purpose: change versus presentation.',
                    'Process: community authorship and facilitation versus script and direction.',
                    'Form: local performance grammar versus imported conventions.',
                    'Evaluation: decisions and actions versus aesthetic reception.',
                    'Conclude that the distinction is structural, not a matter of subject matter.',
                ],
                trap: 'Defining TfD by its themes. A play about health is not automatically TfD.',
            },
            {
                question: 'What are the ethical risks of staging a community\'s problems, and how are they managed?',
                marks: '15 marks',
                outline: [
                    'Risk of exposure and stigma for identifiable participants.',
                    'Risk of raising unmet expectations about funding or services.',
                    'Risk of amplifying one voice and silencing others.',
                    'Controls: consent, anonymisation, consultation, referral support, community veto, honest exit plan.',
                ],
            },
        ],
        glossary: [
            { term: 'Theatre for development', definition: 'Participatory performance made with a community to examine and act on its own problems.' },
            { term: 'Facilitator', definition: 'The outside practitioner who supports a community\'s authorship rather than imposing a script.' },
            { term: 'Forum theatre', definition: 'A method in which spectators replace the protagonist and test alternative actions on stage.' },
            { term: 'Joker', definition: 'The facilitator who runs a forum theatre session and manages the interventions.' },
            { term: 'Spect-actor', definition: 'An audience member who becomes a participant by entering the scene.' },
            { term: 'Image theatre', definition: 'Building frozen physical pictures of a situation and reshaping them toward a desired state.' },
            { term: 'Newspaper theatre', definition: 'Staging published text so that its assumptions and omissions become visible.' },
            { term: 'Popular theatre', definition: 'Performance using a community\'s own forms, such as song, dance, masquerade and folktale.' },
            { term: 'Informed consent', definition: 'Agreement to participate given with full knowledge of how material will be used.' },
            { term: 'Anonymisation', definition: 'Removing identifying detail so that a contributor cannot be recognised.' },
            { term: 'Sustainability', definition: 'The project\'s ability to continue through local capacity after external facilitation ends.' },
            { term: 'Exit strategy', definition: 'The agreed plan for handing over skills, material and relationships at the end of a project.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Enter', focus: 'Consultation.', tasks: ['Meet three stakeholder groups separately.', 'Record the problem in their words.', 'Identify who is not being heard.'] },
            { week: 'Week 2 - Build', focus: 'Scene-making.', tasks: ['Choose one concrete scene.', 'Draft it with community members.', 'Test it in front of a small group.'] },
            { week: 'Week 3 - Perform', focus: 'Forum.', tasks: ['Brief the joker on the stop point.', 'Run the intervention.', 'Record decisions and who owns them.'] },
            { week: 'Week 4 - Follow up', focus: 'Honest evaluation.', tasks: ['Collect follow-up evidence with dates.', 'Write the report including what did not change.', 'Hand over materials and contacts.'] },
        ],
        readingList: [
            'Augusto Boal, Theatre of the Oppressed - for forum and image theatre methods.',
            'Any African TfD case study collection covering participatory methodology.',
            'Your institution\'s research ethics guidance for community-based work.',
        ],
    },

    'tha-411-theatre-research-seminar-and-long-essay': {
        sections: [
            {
                heading: 'From interest to a researchable topic',
                paragraphs: [
                    'A topic is not a subject. "Costume in Nigerian theatre" is a subject and will produce an unfocused essay. A topic names a specific case, a specific question and a specific claim: "How does costume construction in the Aba carnival negotiate between masquerade convention and commercial spectacle?" That version tells you what to read, what to observe and what to argue.',
                    'Narrow in three steps. First choose a case you can actually access - a production, a company, a festival, a set of scripts, a venue. Then choose an angle: historical, textual, production-based, reception-based or practice-based. Finally choose a question that your material can answer. Access is not a compromise; it is the condition of evidence.',
                    'Test the topic with three questions: what will I read, what will I observe or collect, and what would count as a finding? If any answer is vague, the topic is still a subject.',
                ],
            },
            {
                heading: 'Method, evidence and the literature review',
                paragraphs: [
                    'Theatre research commonly uses one or more of: archival work (programmes, photographs, reviews, records), textual analysis of scripts, interviews with practitioners and audiences, observation and documentation of performance, and practice-as-research where your own production is the object of study. Each carries obligations: archives need citation, interviews need consent, observation needs permission, and practice needs documentation.',
                    'The literature review is an argument about what is already known and what remains unresolved. Organise it by problem, not by author. "Three studies treat festival costume as heritage; none examines how makers price their work" is a literature review; a list of summaries is not. End the review by naming the gap your study fills.',
                    'Cite consistently in one style - MLA is usual in theatre and film - with a works cited list. Every quotation needs a page or timestamp. Interviews are cited with date and place, anonymised where consent requires it. Keep your field notes dated and your recordings stored with backups.',
                ],
                callout: {
                    title: 'Write the method before the fieldwork',
                    body: 'A one-page method statement - what you will do, with whom, when, and how you will record it - will save you weeks and satisfy the ethics process.',
                },
            },
            {
                heading: 'Structure, argument and defence',
                paragraphs: [
                    'A long essay of this kind usually runs to a maximum of about sixty pages, double-spaced, and is structured as: introduction with question and roadmap, literature review, method, two or three analytical chapters, conclusion, works cited, appendices. The introduction is written last but must be rewritten until it accurately describes what the essay argues.',
                    'Each chapter should make one claim that the next chapter needs. If a chapter can be moved without damage, the argument is not yet built. Use signposting sparingly but clearly, and keep the conclusion to what has been demonstrated plus what remains open - not a summary of everything you read.',
                    'In a seminar and in the viva, you must be able to state your question, your method, your main finding and its limitation in ninety seconds. Then answer challenges with evidence rather than defensiveness: "that is a fair objection; my evidence covers X but not Y, which is why I have limited the claim to Z."',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Turning a subject into a proposal',
                brief: 'You want to write about "film in Nollywood". Produce a proposal page.',
                steps: [
                    'Choose access: three films you can watch repeatedly and a director you can interview.',
                    'Choose an angle: how sound design constructs place in low-budget productions.',
                    'Write the question: "How do three Nollywood films use diegetic sound to establish location without location shooting?"',
                    'Name the method: sequence analysis of six scenes plus one practitioner interview.',
                    'Name the gap: existing criticism focuses on narrative and economics, not sound.',
                    'State the likely finding and the limitation: a small sample, indicative not general.',
                ],
                takeaway: 'Access plus angle plus a question your material can answer equals a proposal.',
            },
            {
                title: 'Answering a hostile seminar question',
                brief: 'A examiner says: "Your sample is too small to support this claim." Respond.',
                steps: [
                    'Acknowledge the point without collapsing: the sample is small and the claim is correspondingly limited.',
                    'Restate what the evidence does support: a pattern within these three films.',
                    'Explain why the sample was chosen: access and analytical depth rather than representativeness.',
                    'Offer the extension: how a larger study would test the finding.',
                    'Do not invent additional data under pressure.',
                ],
                takeaway: 'Defend the scope of the claim, never the size of the sample you do not have.',
            },
        ],
        examBank: [
            {
                question: 'What makes a research topic answerable, and why does access determine feasibility?',
                marks: '15 marks',
                outline: [
                    'Distinguish subject from topic.',
                    'Require a case, an angle and a question.',
                    'Explain access as the source of evidence.',
                    'Show how an inaccessible topic produces assertion instead of argument.',
                    'State the three test questions and apply them to an example.',
                ],
            },
            {
                question: 'Explain the function of a literature review beyond summarising sources.',
                marks: '15 marks',
                outline: [
                    'Define its function: establishing what is known and what is unresolved.',
                    'Show organisation by problem rather than by author.',
                    'Explain the gap statement and its role in justifying the study.',
                    'Note the risk of a list of summaries with no argument.',
                ],
            },
        ],
        glossary: [
            { term: 'Research question', definition: 'A specific, answerable question that the study\'s evidence can address.' },
            { term: 'Literature review', definition: 'An argument about existing knowledge that identifies the gap a study fills.' },
            { term: 'Methodology', definition: 'The justified account of how evidence was gathered and analysed.' },
            { term: 'Practice as research', definition: 'Inquiry in which the researcher\'s own creative practice generates evidence.' },
            { term: 'Primary source', definition: 'Original material such as a performance, script, recording, programme or interview.' },
            { term: 'Secondary source', definition: 'Published commentary that interprets primary material.' },
            { term: 'Gap', definition: 'The unresolved question in existing scholarship that a study addresses.' },
            { term: 'Triangulation', definition: 'Using multiple kinds of evidence to strengthen a claim.' },
            { term: 'Informed consent', definition: 'Agreement from a participant given with knowledge of how their material will be used.' },
            { term: 'MLA style', definition: 'A citation convention using in-text author-page references and a works cited list.' },
            { term: 'Limitation', definition: 'An acknowledged bound on what the evidence can support.' },
            { term: 'Viva', definition: 'An oral examination in which the candidate defends the study.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Topic', focus: 'Feasibility.', tasks: ['Write three candidate topics.', 'Test each for access and evidence.', 'Choose one and write a proposal page.'] },
            { week: 'Week 2 - Sources', focus: 'The field.', tasks: ['Build a source list by problem.', 'Draft the gap statement.', 'Write the method statement.'] },
            { week: 'Week 3 - Draft', focus: 'Chapters.', tasks: ['Write one analytical chapter fully.', 'Check every quotation against the source.', 'Prepare the argument map.'] },
            { week: 'Week 4 - Defend', focus: 'Finish and rehearse.', tasks: ['Rewrite the introduction to match the argument.', 'Prepare a ninety-second summary.', 'Rehearse answers to three likely objections.'] },
        ],
        readingList: [
            'A research methods text for arts and humanities students covering qualitative methods.',
            'The MLA Handbook or your department\'s citation guide.',
            'Two well-regarded long essays or theses in theatre studies as models of structure.',
        ],
    },
})

// ── GST and compulsory courses ─────────────────────────────────────────────
// The General Studies courses are taken by every first-year student, so these
// layers are written to be usable by any discipline: the examples span arts,
// science and professional programmes.
Object.assign(THEATRE_FILM_DEPTH, {
    'gst-101-use-of-english': {
        sections: [
            {
                heading: 'The sentence is an argument about relationships',
                paragraphs: [
                    'Most sentence errors in student writing are not errors of grammar but errors of relationship: the subject and verb disagree about number, the pronoun has no clear owner, or the modifier attaches itself to the wrong noun. A sentence is a small claim about who did what, and every element must agree on the answer.',
                    'Start with the verb and find its subject. In "The list of items were submitted", the subject is list, not items, so the verb should be was. Long noun phrases are where agreement collapses, because the nearest noun is often not the subject. Strip the phrase down: "The list was submitted" - correct, then rebuild.',
                    'Misplaced modifiers are the second common failure. In "Having finished the experiment, the results were recorded", the results did not finish the experiment; the writer did. The dangling participle signals a hidden agent. Name the agent or restructure: "Having finished the experiment, we recorded the results."',
                ],
            },
            {
                heading: 'Paragraphs that do work',
                paragraphs: [
                    'A paragraph makes one claim and supports it. The topic sentence states the claim; the middle sentences supply evidence, example or explanation; the final sentence either draws the consequence or sets up the next claim. If a paragraph has two claims, split it. If it has none, delete it or fold it into a neighbour.',
                    'Cohesion is created by more than connectives. Repeat key nouns, use pronouns with clear antecedents, and order information so that the end of one sentence gives the beginning of the next something to pick up. "However", "therefore" and "moreover" do not create logic; they announce logic that must already be there.',
                    'Length is a symptom, not a rule. A paragraph of two hundred words is usually two or three paragraphs pretending to be one; a paragraph of one sentence is usually an assertion that has not been supported.',
                ],
                callout: {
                    title: 'Vary the subject',
                    body: 'If five consecutive sentences begin with the same subject, the writing will feel mechanical even if it is correct. Change the opening: a phrase, an adverb, a subordinate clause.',
                },
            },
            {
                heading: 'Punctuation as control of pace',
                paragraphs: [
                    'The full stop ends a thought; the comma separates elements within it; the semicolon joins two related complete thoughts and signals that the relationship matters; the colon introduces an explanation, a list or a quotation. The dash interrupts. Each mark tells the reader how long to hold a unit of meaning.',
                    'The commonest error is the comma splice, joining two complete sentences with only a comma. "The results were inconclusive, we repeated the test." Fix it with a full stop, a semicolon, or a conjunction. The second commonest is the apostrophe: it marks possession (the student\'s work) or a contraction (it\'s = it is), never a plural. Its and it\'s are different words.',
                    'Read your work aloud and mark where you naturally breathe. Those are your punctuation points. A sentence with none is usually a sentence you have not yet understood well enough to control.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Repairing a bad paragraph',
                brief: '"Myself and my friend went to the library, we were reading for the exam and it was very useful because we learnt many things and also the library was quiet and conducive." Rebuild it.',
                steps: [
                    'Split into claims: who went, what they did, what they gained, what condition helped.',
                    'Fix the pronoun: "My friend and I", not "Myself and my friend".',
                    'Remove the comma splice by using a full stop or subordination.',
                    'Replace vague praise ("very useful", "many things") with specific content.',
                    'Cut "also the library was quiet and conducive" into a supporting clause.',
                    'Result: "My friend and I revised in the library for three hours. The silence let us work through two past papers together, and by the end we could explain the harder topics to each other."',
                ],
                takeaway: 'Specificity plus correct sentence boundaries fixes most "weak writing" in one pass.',
            },
            {
                title: 'Fixing agreement in a long sentence',
                brief: '"The committee, after considering the reports submitted by the various departments, have decided that each of the students are to be interviewed."',
                steps: [
                    'Find the main subject: committee.',
                    'Note that committee is singular here, taking a singular verb: has decided.',
                    'Find the next subject: each, which is singular: each of the students is to be interviewed.',
                    'Keep the interrupting phrase but check it separately: reports submitted by departments is plural and correct.',
                    'Re-read the sentence with the core intact: "The committee has decided that each of the students is to be interviewed".',
                ],
                takeaway: 'Strip the sentence to its core, check it, then rebuild. Agreement errors hide inside long phrases.',
            },
        ],
        examBank: [
            {
                question: 'Identify and correct the errors: "Its important that every student submit there assignment before the deadline, otherwise they will loose marks."',
                marks: '10 marks',
                outline: [
                    'Its should be It\'s (it is).',
                    'There should be their (possession).',
                    'Submit is acceptable in the subjunctive after "important that", but the sentence should be consistent.',
                    'Loose should be lose.',
                    'They has an unclear antecedent - use "the student" or "students".',
                    'State the pattern: homophones and apostrophes account for most of these errors.',
                ],
            },
            {
                question: 'Explain the difference between a comma splice and a fused sentence, with one correction each.',
                marks: '10 marks',
                outline: [
                    'Comma splice: two independent clauses joined by a comma alone.',
                    'Fused sentence: two independent clauses with no punctuation at all.',
                    'Correct either with a full stop, semicolon, or conjunction.',
                    'Give one example of each and its repair.',
                ],
            },
            {
                question: 'Write a well-formed paragraph of 120-150 words on why academic writing avoids slang, and underline your topic sentence.',
                marks: '15 marks',
                outline: [
                    'Topic sentence makes one claim about audience and precision.',
                    'Two sentences of explanation.',
                    'One example of slang replaced by precise language.',
                    'A concluding sentence that draws the consequence.',
                    'Check sentence boundaries, agreement and apostrophes before submitting.',
                ],
                trap: 'Writing about the topic without demonstrating control of the sentence.',
            },
        ],
        glossary: [
            { term: 'Subject-verb agreement', definition: 'The requirement that a verb matches its subject in number and person.' },
            { term: 'Comma splice', definition: 'Two independent clauses joined by a comma without a conjunction.' },
            { term: 'Fused sentence', definition: 'Two independent clauses written with no punctuation between them.' },
            { term: 'Dangling modifier', definition: 'A modifying phrase whose intended subject is not the subject of the sentence.' },
            { term: 'Topic sentence', definition: 'The sentence stating the claim a paragraph will support.' },
            { term: 'Cohesion', definition: 'The linking of sentences through reference, repetition and logical order.' },
            { term: 'Semicolon', definition: 'A mark joining two related independent clauses or separating complex list items.' },
            { term: 'Apostrophe', definition: 'A mark showing possession or a contraction, never plurality.' },
            { term: 'Antecedent', definition: 'The noun a pronoun refers back to.' },
            { term: 'Register', definition: 'The level of formality appropriate to audience and purpose.' },
            { term: 'Clause', definition: 'A group of words containing a subject and a verb.' },
            { term: 'Concord', definition: 'Another term for grammatical agreement between sentence elements.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Sentences', focus: 'Boundaries and agreement.', tasks: ['Correct ten sentences from your own past work.', 'Practise stripping long sentences to the core.', 'Learn the four homophone pairs you confuse.'] },
            { week: 'Week 2 - Paragraphs', focus: 'One claim each.', tasks: ['Underline the topic sentence in five paragraphs you wrote.', 'Rewrite one paragraph with a single claim.', 'Remove every connective that is not doing logical work.'] },
            { week: 'Week 3 - Punctuation', focus: 'Control of pace.', tasks: ['Read an essay aloud marking breaths.', 'Fix every comma splice.', 'Check every apostrophe.'] },
            { week: 'Week 4 - Register', focus: 'Audience.', tasks: ['Rewrite a chat message as a formal email.', 'Identify slang in an old essay and replace it.', 'Write 300 words to a specified reader.'] },
        ],
        readingList: [
            'Any university Use of English course text covering sentence grammar and paragraphing.',
            'A punctuation guide covering the comma, semicolon and apostrophe.',
            'A good dictionary and thesaurus - consult the dictionary for usage, not just spelling.',
        ],
    },

    'gst-102-use-of-english-ii': {
        sections: [
            {
                heading: 'Expository writing: explaining without wandering',
                paragraphs: [
                    'Exposition answers a question the reader already has, in an order the reader can follow. The reliable structure is: define the thing, explain how it works, show why it matters, then deal with the difficulty a reader will raise. Each move is a paragraph or two, and the whole piece announces its shape in the first hundred words.',
                    'The most common weakness is unmotivated description. A student writes four paragraphs on the history of a topic before stating what the essay is about. Put the question in the first two sentences, then use history only where it explains the present.',
                    'Exposition also demands examples that are doing work. An example should be specific enough to be checked and typical enough to support the generalisation. "Many students struggle" is not evidence; "in the first semester, three of the four students I interviewed had never used a library catalogue" is.',
                ],
            },
            {
                heading: 'Argument: claim, warrant, evidence, objection',
                paragraphs: [
                    'An argument has four parts. The claim is what you want accepted. The warrant is the principle connecting evidence to claim. The evidence is what you can point to. The objection is the strongest reason a sensible person would disagree, which you must answer.',
                    'Students often supply evidence without a warrant, so the evidence sits there unexplained. "Enrolment rose by 12 per cent after the fee was reduced" is a fact; the argument needs: rising enrolment follows fee reduction because cost is a barrier for applicants, therefore reducing fees widens access - and then the objection: the rise may reflect population growth, so a comparison with neighbouring institutions is needed.',
                    'Weak arguments share a symptom: they cannot be disagreed with. If no evidence could count against your claim, you have stated a preference, not an argument.',
                ],
                callout: {
                    title: 'Steel-man the objection',
                    body: 'State the opposing case in its strongest form, then answer it. A weak objection is a way of avoiding the argument while appearing to have one.',
                },
            },
            {
                heading: 'Summary, paraphrase and citation',
                paragraphs: [
                    'Summary compresses the whole of a source\'s argument, in your words, at a fraction of its length. Paraphrase restates a specific passage closely, also in your words. Quotation reproduces exact words in quotation marks. All three require a citation; none of them removes the need for your own comment.',
                    'Plagiarism is not only copying. It includes paraphrasing without citation, borrowing a structure without acknowledgement, and submitting work written by someone else. The defence is procedural: take notes with the page number at the moment of reading, keep a source list as you go, and write your first draft from your notes rather than from the open book.',
                    'Use quotation sparingly and always for a reason: because the wording itself is the point, because the author is an authority you are invoking, or because you intend to disagree precisely. A paragraph made of quotations is a collage, not an argument.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Building an argument paragraph from a fact',
                brief: 'You have one statistic and need a paragraph that argues rather than reports.',
                steps: [
                    'State the claim: cheaper data plans have widened access to online learning.',
                    'State the warrant: access depends on cost, so price falls change participation.',
                    'Present the evidence and its source.',
                    'Acknowledge the objection: falling prices coincide with rising smartphone ownership.',
                    'Answer with a comparison or a control.',
                    'Conclude with the limited claim your evidence actually supports.',
                ],
                takeaway: 'A statistic is not an argument until a warrant connects it to a claim.',
            },
            {
                title: 'Summarising without plagiarising',
                brief: 'A source runs to six hundred words. Produce a summary and a paraphrase of its key paragraph.',
                steps: [
                    'Read once for the argument, noting the main claim and the three supports.',
                    'Close the source and write the summary from memory in three sentences.',
                    'Open the source and check that nothing essential is missing and no wording is copied.',
                    'For the paraphrase, change the sentence structure entirely, not just the synonyms.',
                    'Add the citation with page number and one sentence of your own comment.',
                ],
                takeaway: 'Write from notes, not from the open page. Copying is a symptom of reading and writing at the same time.',
            },
        ],
        examBank: [
            {
                question: 'Write an expository passage of about 200 words explaining how a student should evaluate an online source.',
                marks: '20 marks',
                outline: [
                    'Define the problem: anyone can publish, so authority must be checked.',
                    'Give a step sequence: author, date, evidence, purpose, corroboration.',
                    'Show one example of an unreliable source and why.',
                    'Close with a rule the reader can apply.',
                    'Check sentence boundaries and register.',
                ],
                trap: 'Listing checks without explaining what each check reveals.',
            },
            {
                question: 'Distinguish summary, paraphrase and quotation, and state the citation obligation for each.',
                marks: '10 marks',
                outline: [
                    'Summary: whole argument, compressed, own words.',
                    'Paraphrase: specific passage, own words, close detail.',
                    'Quotation: exact words in quotation marks.',
                    'All three require citation; none replaces your own analysis.',
                ],
            },
        ],
        glossary: [
            { term: 'Exposition', definition: 'Writing that explains a subject in a sequence the reader can follow.' },
            { term: 'Claim', definition: 'The proposition an argument asks the reader to accept.' },
            { term: 'Warrant', definition: 'The principle that connects evidence to a claim.' },
            { term: 'Objection', definition: 'The strongest reasonable case against a claim, which must be answered.' },
            { term: 'Paraphrase', definition: 'Restating a specific passage in your own words and structure.' },
            { term: 'Summary', definition: 'A compressed restatement of a source\'s whole argument.' },
            { term: 'Plagiarism', definition: 'Presenting another person\'s words, structure or work as your own.' },
            { term: 'In-text citation', definition: 'A brief reference in the body of the text pointing to a full source entry.' },
            { term: 'Corroboration', definition: 'Supporting a claim by showing independent sources agree.' },
            { term: 'Register', definition: 'The formality of language suited to a purpose and audience.' },
            { term: 'Thesis statement', definition: 'The central claim of an essay, usually stated in the introduction.' },
            { term: 'Coherence', definition: 'The logical connection of ideas across a whole piece of writing.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Exposition', focus: 'Order and definition.', tasks: ['Write a 200-word explanation of a process you know.', 'Put the question in the first two sentences.', 'Replace every vague example with a specific one.'] },
            { week: 'Week 2 - Argument', focus: 'Four parts.', tasks: ['Label claim, warrant, evidence and objection in a published article.', 'Write one paragraph with all four.', 'Steel-man an objection to your own view.'] },
            { week: 'Week 3 - Sources', focus: 'Honest use.', tasks: ['Summarise a source in three sentences from memory.', 'Paraphrase a paragraph without copying structure.', 'Build a citation list with page numbers.'] },
            { week: 'Week 4 - Timed essay', focus: 'Performance.', tasks: ['Plan in five minutes, write in thirty-five.', 'Check boundaries and citations.', 'Compare against the marking guide.'] },
        ],
        readingList: [
            'Any Use of English II text covering exposition, argument and citation.',
            'A study skills guide section on summarising and paraphrasing.',
            'Your faculty\'s citation and plagiarism policy.',
        ],
    },

    'gst-103-philosophy-and-logic': {
        sections: [
            {
                heading: 'Validity is not truth',
                paragraphs: [
                    'Logic studies the relation between premises and conclusion, not the truth of the premises themselves. An argument is valid when the conclusion cannot be false if the premises are true. It is sound when it is valid and the premises are also true. These are separate questions, and confusing them is the most common error in first-year logic.',
                    '"All lecturers are mortal; Dr Ade is a lecturer; therefore Dr Ade is mortal" is valid and, as it happens, sound. "All lecturers are wealthy; Dr Ade is a lecturer; therefore Dr Ade is wealthy" is equally valid - the form is identical - but unsound, because the first premise is false. Logic cannot tell you whether lecturers are wealthy; it can tell you that if the premise were true the conclusion would follow.',
                    'This is why logic is useful: it lets you accept a conclusion provisionally while disputing a premise, and it exposes arguments that look persuasive because of their rhetoric rather than their structure.',
                ],
            },
            {
                heading: 'The forms you must recognise',
                paragraphs: [
                    'Modus ponens: if P then Q; P; therefore Q. Valid. Modus tollens: if P then Q; not Q; therefore not P. Valid. Denying the antecedent: if P then Q; not P; therefore not Q. Invalid. Affirming the consequent: if P then Q; Q; therefore P. Invalid. These four forms account for a large share of examination questions.',
                    'Categorical syllogisms work through quantity and quality: All S are P; some S are M; therefore some M are P. The techniques of distribution and the Venn diagram test are used to check validity without relying on intuition.',
                    'Informal fallacies are failures of relevance or evidence rather than form: ad hominem (attacking the person), appeal to authority (citing status instead of evidence), false dilemma (two options when more exist), begging the question (assuming the conclusion), straw man (misrepresenting an opponent), and post hoc (assuming sequence proves causation).',
                ],
                callout: {
                    title: 'Name the fallacy precisely',
                    body: 'In an exam, "this is a fallacy" earns nothing. Identify the form or name the fallacy and say exactly which move is illegitimate.',
                },
            },
            {
                heading: 'Philosophy as the examination of assumptions',
                paragraphs: [
                    'The philosophical questions in this course - what is knowledge, what is real, what makes an action right - are asked because ordinary assumptions conflict when pressed. Knowledge as justified true belief faces the problem of accidentally justified belief: a person who believes the time by looking at a stopped clock that happens to show the right time has a true justified belief but does not know the time. The discussion of such cases is the method, not an interruption of it.',
                    'Branches to keep distinct: epistemology (knowledge), metaphysics (what exists), ethics (how to act), logic (correct inference), aesthetics (beauty and art). A good answer places a question in its branch before attempting it, because the standards of argument differ.',
                    'Write philosophy in the first person plural of argument: "One might object that..." then answer. Assertion without argument is the characteristic failure, and it is easy to detect: if your paragraph could be prefaced by "I just think that", it is not yet philosophy.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Testing an argument for validity',
                brief: 'A newspaper argues: "If the policy were sound, enrolment would have risen. Enrolment has risen. Therefore the policy is sound."',
                steps: [
                    'Formalise: if P then Q; Q; therefore P.',
                    'Name the form: affirming the consequent.',
                    'Show why it fails: enrolment could rise for other reasons.',
                    'Construct a parallel case with an obviously false conclusion to make the failure vivid.',
                    'State what would be needed: evidence that no other factor could explain the rise.',
                ],
                takeaway: 'Formalise first, name second, explain third. Intuition alone will not earn the marks.',
            },
            {
                title: 'Answering an epistemology question',
                brief: '"Is justified true belief sufficient for knowledge?" Answer in fifteen minutes.',
                steps: [
                    'Define the three conditions and the classical analysis.',
                    'State the challenge with the stopped-clock or barn-façade case.',
                    'Explain precisely what the case shows: justification is accidentally connected to truth.',
                    'Consider one response: add a no-false-lemmas or reliability condition.',
                    'Assess the response: does it exclude the case without excluding ordinary knowledge?',
                    'Conclude with a position and the cost of holding it.',
                ],
                takeaway: 'Philosophy answers have the shape: thesis, counter-example, reply, assessment, position.',
            },
        ],
        examBank: [
            {
                question: 'Distinguish validity from soundness and explain why the distinction matters.',
                marks: '15 marks',
                outline: [
                    'Define validity as form: premises cannot be true with a false conclusion.',
                    'Define soundness as validity plus true premises.',
                    'Give a valid but unsound example.',
                    'Explain the practical use: allows criticism of premises independently of inference.',
                ],
            },
            {
                question: 'Identify the fallacy: "You cannot criticise the new timetable; you are not a member of the senate."',
                marks: '10 marks',
                outline: [
                    'Name the move: rejecting a criticism because of the critic\'s status.',
                    'Identify the fallacy: ad hominem, or appeal to authority in reverse.',
                    'Explain why it fails: the truth of a criticism does not depend on who makes it.',
                    'Note the legitimate version: expertise may affect the weight of testimony, not the validity of an argument.',
                ],
            },
            {
                question: 'Is knowledge more than justified true belief? Discuss.',
                marks: '20 marks',
                outline: [
                    'Set out the tripartite analysis.',
                    'Present a Gettier-style counter-example in detail.',
                    'Explain the intuition the case produces.',
                    'Evaluate at least two proposed additions to the analysis.',
                    'Conclude with a defended position and its cost.',
                ],
                trap: 'Describing the counter-example without saying what it is supposed to show.',
            },
        ],
        glossary: [
            { term: 'Validity', definition: 'A property of form: true premises cannot yield a false conclusion.' },
            { term: 'Soundness', definition: 'Validity combined with actually true premises.' },
            { term: 'Modus ponens', definition: 'If P then Q; P; therefore Q - a valid form.' },
            { term: 'Modus tollens', definition: 'If P then Q; not Q; therefore not P - a valid form.' },
            { term: 'Affirming the consequent', definition: 'If P then Q; Q; therefore P - an invalid form.' },
            { term: 'Denying the antecedent', definition: 'If P then Q; not P; therefore not Q - an invalid form.' },
            { term: 'Syllogism', definition: 'A deductive argument with two premises and a conclusion.' },
            { term: 'Ad hominem', definition: 'Rejecting a claim by attacking the person who made it.' },
            { term: 'False dilemma', definition: 'Presenting two options as exhaustive when others exist.' },
            { term: 'Begging the question', definition: 'Assuming the conclusion among the premises.' },
            { term: 'Epistemology', definition: 'The branch of philosophy concerned with knowledge and justification.' },
            { term: 'Counter-example', definition: 'A case showing that a general claim or analysis fails.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Form', focus: 'Validity.', tasks: ['Formalise ten short arguments.', 'Test each for validity.', 'Write one valid but unsound argument deliberately.'] },
            { week: 'Week 2 - Syllogisms', focus: 'Categorical logic.', tasks: ['Translate sentences into All/Some/No form.', 'Test five syllogisms with Venn diagrams.', 'Identify the distributed terms.'] },
            { week: 'Week 3 - Fallacies', focus: 'Naming and explaining.', tasks: ['Collect five fallacies from news commentary.', 'Name each and state the illegitimate move.', 'Write a corrected version of one.'] },
            { week: 'Week 4 - Philosophy', focus: 'Essay shape.', tasks: ['Outline a thesis, counter-example and reply.', 'Write one full answer under time.', 'Check that every claim has an argument.'] },
        ],
        readingList: [
            'Any introductory logic text covering validity, syllogisms and informal fallacies.',
            'An introduction to philosophy with primary extracts on knowledge and ethics.',
            'A dictionary of philosophy for precise definitions of terms.',
        ],
    },
})

Object.assign(THEATRE_FILM_DEPTH, {
    'gst-104-history-and-philosophy-of-science': {
        sections: [
            {
                heading: 'What makes an explanation scientific',
                paragraphs: [
                    'Science is not a body of facts but a disciplined way of testing explanations. The core requirement is falsifiability: a scientific claim must rule something out, so that evidence could count against it. "All metals expand when heated" rules out a metal that contracts; "everything happens for a reason" rules out nothing and is therefore not a scientific claim, however true it might feel.',
                    'The hypothetico-deductive pattern runs: observe a puzzle, propose a hypothesis, derive a prediction that would be surprising if the hypothesis were false, test it, and revise. The prediction step is where weak work fails, because a prediction that the hypothesis does not actually require cannot test it.',
                    'Confirmation is cumulative but never final. A theory survives because it has repeatedly made risky predictions that came true, not because it has been proved. This is why scientists speak of the best-supported explanation rather than the truth, and why a single decisive anomaly can be more valuable than a hundred confirmations.',
                ],
            },
            {
                heading: 'Kuhn, Popper and the question of change',
                paragraphs: [
                    'Popper argued that science progresses by conjecture and refutation: we propose bold theories and try to destroy them, and what survives is provisionally accepted. Kuhn argued that this describes crises rather than normal work. In his account, a scientific community operates within a paradigm - shared assumptions, methods and exemplars - and normal science is puzzle-solving within that paradigm. Anomalies accumulate, and when the paradigm can no longer absorb them, a revolution replaces it.',
                    'The two accounts answer different questions. Popper explains the logic of justification; Kuhn explains the sociology of change. A strong exam answer uses both without collapsing them: Popper tells you what should persuade a scientist, Kuhn tells you what actually does.',
                    'The paradigm debate raises a real problem: if communities with different paradigms cannot agree on standards, is science rational? The usual reply is that paradigm choice is constrained by predictive success, experimental reproducibility and practical application - not by arbitrary preference.',
                ],
                callout: {
                    title: 'Criticism is the method',
                    body: 'A claim that cannot be criticised cannot be tested. When you meet an unfalsifiable claim, the question is not whether it is comforting but what evidence would change the holder\'s mind.',
                },
            },
            {
                heading: 'Science, technology and society in Africa',
                paragraphs: [
                    'The history of science is not a European monopoly narrative. Metallurgy, medicine, astronomy, agriculture and mathematics developed in many centres, and the history of their transfer matters: colonial science in Africa was largely organised around extraction, survey and tropical medicine for the benefit of administrators, which shaped institutions long after independence.',
                    'Indigenous knowledge systems contain empirical content - soil classification, plant medicine, weather prediction - that is testable and has sometimes been validated by laboratory work. Treating such knowledge as either sacred or worthless are both errors; the useful question is what claims it makes and how they can be checked.',
                    'Contemporary debates about research funding, brain drain and technology transfer are part of this history rather than a break from it. A good answer links the philosophy of science to the conditions under which science is actually done.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Testing a hypothesis properly',
                brief: 'A student claims that studying in groups improves examination performance. Build a testable version.',
                steps: [
                    'State the hypothesis with a direction: students who study in groups of three to five score higher than students who study alone.',
                    'Define the measure: mean score on the same examination.',
                    'Define the comparison group and how students are assigned.',
                    'Identify confounds: prior ability, attendance, time spent, subject difficulty.',
                    'State what result would count against the hypothesis.',
                    'Acknowledge limits: one cohort, one institution, no claim beyond it.',
                ],
                takeaway: 'A hypothesis that cannot fail is not a hypothesis. Name the disconfirming result in advance.',
            },
            {
                title: 'Answering "is astrology a science?"',
                brief: 'A classic exam question. Avoid the trap of asserting an answer without criteria.',
                steps: [
                    'State criteria first: testability, predictive precision, falsifiability, openness to revision.',
                    'Apply them: astrology makes predictions but typically vague, post-hoc adjusted, and unfalsifiable in practice.',
                    'Acknowledge the historical point: astronomy and astrology were once intertwined.',
                    'Distinguish the claim from its practitioners - sincerity is not evidence.',
                    'Conclude that it fails the falsifiability criterion, not that it is meaningless to its users.',
                ],
                takeaway: 'Answer with criteria, apply them, then conclude. The criteria earn the marks.',
            },
        ],
        examBank: [
            {
                question: 'Explain falsifiability and why it is central to the demarcation of science.',
                marks: '15 marks',
                outline: [
                    'Define: a claim must forbid some observable state of affairs.',
                    'Explain the demarcation problem it solves.',
                    'Give one falsifiable and one unfalsifiable example.',
                    'Note the objection: some good science is not directly testable, requiring auxiliary assumptions.',
                    'Conclude on fallibilism rather than certainty.',
                ],
            },
            {
                question: 'Compare Popper and Kuhn on scientific change.',
                marks: '20 marks',
                outline: [
                    'Popper: conjecture and refutation, permanent openness to criticism.',
                    'Kuhn: paradigms, normal science, anomaly, revolution.',
                    'Show how each accounts for a historical episode.',
                    'Explain what each explains that the other struggles with.',
                    'Conclude that they address justification and sociology respectively.',
                ],
                trap: 'Presenting Kuhn as "irrational" or Popper as "naive". Both positions are more careful than that.',
            },
        ],
        glossary: [
            { term: 'Falsifiability', definition: 'The property of a claim that allows evidence to count against it.' },
            { term: 'Paradigm', definition: 'The shared assumptions, methods and exemplars of a scientific community.' },
            { term: 'Normal science', definition: 'Puzzle-solving within an accepted paradigm.' },
            { term: 'Anomaly', definition: 'An observation a paradigm cannot explain, prompting revision.' },
            { term: 'Hypothesis', definition: 'A testable proposed explanation derived from a theory.' },
            { term: 'Confirmation', definition: 'Evidence consistent with a hypothesis, always provisional.' },
            { term: 'Demarcation', definition: 'The problem of distinguishing science from non-science.' },
            { term: 'Induction', definition: 'Generalising from observed cases to a wider claim.' },
            { term: 'Deduction', definition: 'Deriving specific predictions from general principles.' },
            { term: 'Reproducibility', definition: 'The ability of others to obtain the same result by the same method.' },
            { term: 'Auxiliary assumption', definition: 'A background belief required for a test, which may itself fail.' },
            { term: 'Indigenous knowledge', definition: 'Locally developed empirical knowledge about environment, health and production.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Method', focus: 'Falsifiability.', tasks: ['Write three falsifiable and three unfalsifiable claims.', 'Design a test for one falsifiable claim.', 'Name the disconfirming result.'] },
            { week: 'Week 2 - Change', focus: 'Popper and Kuhn.', tasks: ['Summarise each in 150 words.', 'Apply both to one historical episode.', 'List one strength and one weakness of each.'] },
            { week: 'Week 3 - Context', focus: 'Science and society.', tasks: ['Trace one colonial scientific institution.', 'Evaluate one indigenous knowledge claim.', 'Link funding to research priorities.'] },
            { week: 'Week 4 - Essay', focus: 'Timed answer.', tasks: ['Outline a 20-mark answer.', 'Write it in 35 minutes.', 'Check that criteria are stated before applied.'] },
        ],
        readingList: [
            'Karl Popper, Conjectures and Refutations - the opening chapters on falsification.',
            'Thomas Kuhn, The Structure of Scientific Revolutions - chapters on normal science and revolutions.',
            'An introduction to the history of science in Africa covering indigenous knowledge and colonial institutions.',
        ],
    },

    'gst-105-humanities': {
        sections: [
            {
                heading: 'What the humanities study, and why it is not "soft"',
                paragraphs: [
                    'The humanities study human meaning: how people make, argue, worship, govern and remember. Their evidence is texts, artefacts, performances, institutions and testimony, and their method is interpretation disciplined by argument. The charge that this is "soft" usually means the evidence is not numerical, which is a description, not a criticism.',
                    'Interpretation is not arbitrary. A reading of a novel, a constitution or a religious practice must be supported by what is there, must account for the strongest contrary reading, and must be offered in terms another scholar could dispute. Those three requirements are as demanding as any laboratory protocol.',
                    'The humanities also matter instrumentally. Law, journalism, diplomacy, education, publishing and public administration all run on the ability to read carefully, argue precisely and understand why people act as they do - the exact skills this course begins to build.',
                ],
            },
            {
                heading: 'The disciplines and their questions',
                paragraphs: [
                    'Philosophy asks what is real, what we can know and how we should act. Literature studies how language makes meaning and pleasure. History reconstructs and interprets the past from partial evidence. Linguistics analyses language as a system. Religious studies examines belief and practice without assuming the truth of any tradition. Fine and performing arts study making and reception. Each has its own standards of evidence; a historian cannot accept a claim because it is beautiful, and a literary critic cannot settle an interpretation by counting.',
                    'Knowing which discipline you are in determines what counts as a good answer. The commonest first-year error is writing a moral essay in a history paper, or a summary in a philosophy paper. Ask of every paragraph: what kind of claim is this, and what would support it in this discipline?',
                ],
                callout: {
                    title: 'The two-question habit',
                    body: 'For any humanities source ask: what is this claiming, and what would make it wrong? The second question is what separates study from reading.',
                },
            },
            {
                heading: 'Culture, identity and the Nigerian humanities',
                paragraphs: [
                    'Nigerian humanities scholarship has been shaped by debates about colonial knowledge, language, and the responsibility of the writer and scholar. The argument over whether African literature should be written in European languages, the recovery of oral traditions as legitimate sources, and the critique of anthropology as a colonial instrument are all part of the field\'s formation.',
                    'These debates are not historical curiosities. They determine how a student today treats oral testimony, whether a festival is described as heritage or as contemporary practice, and whose categories are used to organise a course. A good answer makes its own categories visible.',
                    'Culture here is not decoration. It is the shared system of meaning through which people interpret work, authority, gender, time and death; the humanities study how those systems are produced and contested.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Reading a source as a humanist',
                brief: 'You are given a 1960s newspaper editorial about decolonisation. Produce a discipline-appropriate reading.',
                steps: [
                    'Establish the source: author, outlet, date, intended reader.',
                    'Identify the claim and the argument supporting it.',
                    'Note the vocabulary doing ideological work - words that assume what they should prove.',
                    'Place it in context: what was happening that makes this intervention timely?',
                    'Offer two readings and say which the evidence better supports.',
                    'State the limit of a single editorial as evidence for public opinion.',
                ],
                takeaway: 'Source, claim, language, context, competing readings, limits. That is a humanities method in six steps.',
            },
            {
                title: 'Answering "why study the humanities?" without cliché',
                brief: 'A scholarship interview question that most candidates answer with "because it makes us human".',
                steps: [
                    'Name the concrete skill: constructing an argument from ambiguous evidence.',
                    'Give an example of a decision that requires it - interpreting a contract, a report, a testimony.',
                    'Acknowledge the economic objection honestly.',
                    'Show the transfer: the same skill appears in law, policy, media and management.',
                    'Avoid grand claims you cannot support.',
                ],
                takeaway: 'Defend the humanities by describing what graduates can actually do.',
            },
        ],
        examBank: [
            {
                question: 'Distinguish the kinds of evidence used in history and in literary criticism, and explain why the distinction matters.',
                marks: '15 marks',
                outline: [
                    'History: documents, testimony, material remains, interpreted for what happened and why.',
                    'Literary criticism: the text itself, read for how meaning is produced.',
                    'Explain the different burdens: causal adequacy versus interpretive plausibility.',
                    'Show the consequence for a student answer: counting cannot settle an interpretation; beauty cannot settle a fact.',
                ],
            },
            {
                question: 'Discuss the view that the humanities are a luxury in a developing economy.',
                marks: '20 marks',
                outline: [
                    'State the strongest version of the objection.',
                    'Identify its assumption: that value equals immediate measurable output.',
                    'Show the dependence of institutions on humanities skills.',
                    'Concede the funding pressure is real.',
                    'Conclude with a defensible position on priorities, not a slogan.',
                ],
                trap: 'Refusing to engage the objection. Marks come from taking it seriously.',
            },
        ],
        glossary: [
            { term: 'Humanities', definition: 'Disciplines studying human meaning, expression and institutions through interpretation.' },
            { term: 'Interpretation', definition: 'An account of meaning supported by evidence and open to dispute.' },
            { term: 'Primary source', definition: 'Material produced in the period or by the people being studied.' },
            { term: 'Secondary source', definition: 'Later commentary that interprets primary material.' },
            { term: 'Hermeneutics', definition: 'The theory and method of interpretation, especially of texts.' },
            { term: 'Discourse', definition: 'A patterned way of speaking and writing that shapes what can be said.' },
            { term: 'Colonial knowledge', definition: 'Knowledge produced within and for colonial power, shaping categories still in use.' },
            { term: 'Oral tradition', definition: 'Knowledge transmitted through speech, performance and memory.' },
            { term: 'Canon', definition: 'The works a discipline treats as central, always contestable.' },
            { term: 'Ideology', definition: 'Assumptions embedded in language and practice that make arrangements seem natural.' },
            { term: 'Aesthetics', definition: 'The study of beauty, taste and artistic value.' },
            { term: 'Interdisciplinarity', definition: 'Combining methods from more than one discipline to address a question.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Disciplines', focus: 'Questions and evidence.', tasks: ['Write the central question of three humanities disciplines.', 'Match five sources to the discipline that would use them.', 'Identify one claim that no discipline could test.'] },
            { week: 'Week 2 - Sources', focus: 'Reading closely.', tasks: ['Analyse one primary source in six steps.', 'Mark vocabulary doing ideological work.', 'State the limits of the source.'] },
            { week: 'Week 3 - Debate', focus: 'Nigerian contexts.', tasks: ['Summarise the language debate in 200 words.', 'Take a position with evidence.', 'Name the strongest objection.'] },
            { week: 'Week 4 - Essay', focus: 'Discipline-appropriate writing.', tasks: ['Plan a 20-mark answer.', 'Check every paragraph\'s claim type.', 'Write and edit to the word limit.'] },
        ],
        readingList: [
            'Any general introduction to the humanities covering disciplines and methods.',
            'A collection of Nigerian humanities essays on culture, language and decolonisation.',
            'A short guide to source analysis for arts and social science students.',
        ],
    },

    'gst-107-nigerian-peoples-and-culture': {
        sections: [
            {
                heading: 'Peoples, not tribes',
                paragraphs: [
                    'Nigeria has more than two hundred and fifty ethno-linguistic groups. The word "tribe" is avoided in serious scholarship because it implies a fixed, primitive unit and flattens enormous internal diversity; "ethnic group", "linguistic community" or a specific name such as "Igbo", "Yoruba", "Hausa", "Ibibio", "Tiv", "Ijaw" or "Nupe" is more accurate.',
                    'Even those names need care. "Igbo" covers communities with distinct dialects, political structures and histories; "Yoruba" as a unified identity is partly a nineteenth-century development shaped by missionaries, print and inter-city politics. Identity is layered: family, lineage, town, region, religion, occupation and generation all matter, and which layer is salient depends on the situation.',
                    'This matters for exam answers because the question "discuss Nigerian culture" invites a list of three groups and their festivals. A stronger answer explains how identities are constructed, how they change, and how they are mobilised politically.',
                ],
            },
            {
                heading: 'Family, kinship and social organisation',
                paragraphs: [
                    'Kinship organises rights and obligations: who inherits, who names a child, who buries whom, who may marry whom, and who is responsible when someone is in trouble. Patrilineal systems trace descent through men; matrilineal systems exist in parts of Nigeria and elsewhere; bilateral systems trace through both. Understanding which system operates in a community explains inheritance disputes, residence patterns and the authority of uncles and aunts.',
                    'Marriage in most Nigerian societies is a transaction between families, not only individuals. Bridewealth, which is not the same as bride price or wife purchase, formalises the alliance and gives the wife\'s family claims on the husband\'s lineage. Christian and Islamic marriage regimes coexist with customary marriage, and many families register more than one.',
                    'Age grades, title societies, secret associations and market women\'s associations are civic institutions with real power. A student who describes a community only through its festivals has missed the governance structures that actually run it.',
                ],
                callout: {
                    title: 'Avoid the culture list',
                    body: 'Festival, food, dress is description, not analysis. Ask instead: what does this practice do for the people who maintain it, and who benefits if it continues or changes?',
                },
            },
            {
                heading: 'Culture, change and the national question',
                paragraphs: [
                    'Culture is not a museum object. Nigerian cultural practice has absorbed and reshaped Christianity, Islam, colonial administration, migration, Nollywood, the mobile phone and social media. A masquerade may now be recorded and posted; a traditional wedding may be planned on WhatsApp; a language may be revitalised through online content.',
                    'The national question - how a state of many nations should be governed, and whether the current federal arrangement distributes resources and power fairly - runs through Nigerian politics. Ethnic and religious identity are mobilised in competition for resources, which is why the study of culture cannot be separated from the study of political economy.',
                    'Language is the clearest index of both vitality and threat. Nigerian Pidgin functions as a national lingua franca with its own grammar and literature; Standard Nigerian English is an official variety, not a deviation; and smaller languages are losing speakers to urban migration and school language policy. Documenting a language is cultural work with a deadline.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Analysing a festival instead of describing it',
                brief: 'You must write 500 words on a community festival. Build an analytical structure.',
                steps: [
                    'Name the community, the festival and the calendar point precisely.',
                    'Identify who authorises it: elders, priests, a titled society, a youth association.',
                    'Describe the phases and what each marks.',
                    'Explain the social functions: status display, dispute settlement, courtship, trade, commemoration.',
                    'Identify what has changed in living memory and who resisted the change.',
                    'Conclude on what the festival is doing now, not only what it once meant.',
                ],
                takeaway: 'Function and change turn description into analysis.',
            },
            {
                title: 'Handling the "three major ethnic groups" framing',
                brief: 'An exam question assumes Nigeria has three ethnic groups. Answer it without reproducing the error.',
                steps: [
                    'Acknowledge the framing and its origin in colonial administration and national politics.',
                    'State the actual diversity: over 250 groups and more than 500 languages.',
                    'Explain why the triad persists: population, political weight, media representation.',
                    'Give examples of minority groups with distinct institutions.',
                    'Show the consequence: policy that assumes three groups marginalises others.',
                    'Conclude on the difference between a political shorthand and an accurate description.',
                ],
                takeaway: 'Correct a false premise in the question, then answer the question it was trying to ask.',
            },
        ],
        examBank: [
            {
                question: 'Explain how kinship systems shape inheritance and residence in Nigerian communities.',
                marks: '15 marks',
                outline: [
                    'Define kinship and its functions.',
                    'Distinguish patrilineal, matrilineal and bilateral descent.',
                    'Trace one consequence for inheritance and one for residence.',
                    'Note the interaction with statutory and Islamic law.',
                    'Conclude on how descent systems produce different disputes.',
                ],
            },
            {
                question: 'Discuss the view that Nigerian culture is being eroded by globalisation.',
                marks: '20 marks',
                outline: [
                    'Clarify what "erosion" would mean and how it could be measured.',
                    'Give evidence of loss: language shift, declining participation, commodification.',
                    'Give evidence of adaptation: Nollywood, music, online language activism.',
                    'Explain the political economy: who profits from which cultural form.',
                    'Conclude that change is uneven rather than simple decline.',
                ],
                trap: 'Treating change as loss. Some practices are abandoned because people choose to.',
            },
        ],
        glossary: [
            { term: 'Ethnic group', definition: 'A community sharing descent, language or culture, with internal diversity.' },
            { term: 'Kinship', definition: 'Relations of descent and marriage that define rights and obligations.' },
            { term: 'Patrilineal', definition: 'Tracing descent and inheritance through the male line.' },
            { term: 'Matrilineal', definition: 'Tracing descent and inheritance through the female line.' },
            { term: 'Bridewealth', definition: 'Goods or money transferred between families to formalise a marriage alliance.' },
            { term: 'Age grade', definition: 'A cohort organised by age with defined duties and rights in the community.' },
            { term: 'Title society', definition: 'An association conferring ranked status and authority within a community.' },
            { term: 'Lingua franca', definition: 'A shared language used between speakers of different first languages.' },
            { term: 'Nigerian Pidgin', definition: 'A widely spoken contact language with its own grammar and literature.' },
            { term: 'National question', definition: 'The debate over how Nigeria\'s constituent nations should share power and resources.' },
            { term: 'Syncretism', definition: 'The blending of beliefs and practices from different traditions.' },
            { term: 'Cultural commodification', definition: 'Turning cultural practice into a product for sale, changing its meaning.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Peoples', focus: 'Accurate categories.', tasks: ['List ten ethnic groups and their locations.', 'Explain why "tribe" is imprecise.', 'Trace how Yoruba identity formed.'] },
            { week: 'Week 2 - Institutions', focus: 'Kinship and authority.', tasks: ['Map one community\'s descent system.', 'Identify three civic institutions.', 'Explain bridewealth to a foreigner.'] },
            { week: 'Week 3 - Culture', focus: 'Practice and change.', tasks: ['Analyse one festival by function.', 'Record one change in living memory.', 'Interview one elder about it.'] },
            { week: 'Week 4 - Debate', focus: 'The national question.', tasks: ['Summarise the federalism debate.', 'Take a position with evidence.', 'Write a timed 20-mark answer.'] },
        ],
        readingList: [
            'Any Nigerian peoples and culture course text covering ethnic groups and institutions.',
            'A history of Nigeria covering pre-colonial states and colonial administration.',
            'Scholarship on Nigerian Pidgin and language policy.',
        ],
    },
})

// ── Faculty of Arts primers ────────────────────────────────────────────────
Object.assign(THEATRE_FILM_DEPTH, {
    'lin-101-introduction-to-linguistics': {
        sections: [
            {
                heading: 'Language as a system, not a list of rules',
                paragraphs: [
                    'Linguistics studies language as a natural object. Its central claim is that every human language is a structured system with levels that can be analysed separately: phonetics (the sounds themselves), phonology (how sounds pattern), morphology (how words are built), syntax (how sentences are built), semantics (meaning) and pragmatics (meaning in use).',
                    'The discipline is descriptive, not prescriptive. A linguist does not ask whether "I no go school" is correct English but what system produces it and who uses it with whom. Judgements about correctness are social facts worth studying, but they are not linguistic analysis.',
                    'Descriptivism does not mean anything goes. Every language, dialect and pidgin has systematic rules, and a speaker who breaks them produces something that other speakers recognise as wrong. The difference between "he don go" and "he dey go" is grammatical, not a matter of taste.',
                ],
            },
            {
                heading: 'Phonetics and phonology: the sounds and the patterns',
                paragraphs: [
                    'Phonetics describes speech sounds by how they are produced: place of articulation (where the airflow is obstructed), manner (how it is obstructed) and voicing (whether the vocal folds vibrate). /p/ and /b/ share a place and manner and differ only in voicing, which is why they form a minimal pair in English: pin and bin.',
                    'Phonology studies which distinctions a particular language uses. English does not use aspiration to distinguish words, so the p in pin and the p in spin are heard as the same phoneme; many Indian languages do use it, so the two are different phonemes there. The phoneme is an abstract category, realised by different phones in different environments.',
                    'Nigerian languages contribute materially to this field. Igbo is tonal: pitch distinguishes words, so the same consonant-vowel sequence with a different tone is a different word. Yoruba has a complex tone system with three levels and, in some analyses, contour tones. Hausa has implosives and ejectives that English lacks. A student who learns to hear tone stops mis-hearing Igbo and Yoruba as "flat".',
                ],
                callout: {
                    title: 'Minimal pairs are your test',
                    body: 'If two words differ only by one sound and have different meanings, those sounds are separate phonemes in that language. This one test will carry you through most phonology questions.',
                },
            },
            {
                heading: 'Morphology and syntax: building words and sentences',
                paragraphs: [
                    'Morphemes are the smallest units of meaning. "Unhelpfulness" contains un- (negation), help (root), -ful (adjective-forming), -ness (noun-forming). Free morphemes stand alone; bound morphemes attach. Inflectional morphology marks grammatical information without changing the word class (walk, walks, walked); derivational morphology changes the class or meaning (help, helpful, helper).',
                    'Syntax describes how words combine into phrases and sentences. Constituency tests - substitution, movement, coordination - show which words group together. A tree diagram is not decoration: it displays claims about structure that can be argued for.',
                    'Word order is not universal. English is SVO; many Nigerian languages are also SVO but differ in agreement, serial verb constructions and the position of the noun phrase. A key concept is agreement: in Igbo and Yoruba, verbs typically do not inflect for person the way English does, which is one reason Nigerian English sometimes regularises verb forms.',
                ],
            },
            {
                heading: 'Sociolinguistics and language in Nigeria',
                paragraphs: [
                    'Nigeria is one of the most linguistically diverse countries in the world, with over five hundred languages. Multilingualism is the norm: a student may speak a home language, a community lingua franca, Nigerian Pidgin, English and Arabic for religious purposes, each in a different domain.',
                    'Code-switching - alternating languages within a conversation - is a skilled practice, not confusion. It signals identity, manages relationships and marks topic shifts. Language attitudes, meanwhile, do real damage: children punished for speaking their mother tongue at school, speakers of minority languages shifting to dominant ones, and the prestige hierarchy that treats a foreign accent as competence.',
                    'Language policy is therefore a political question. Nigeria\'s National Policy on Education recommends mother-tongue instruction in early primary school, but implementation varies; the result is measurable in language shift and in literacy outcomes.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Doing a phonemic analysis',
                brief: 'You are given a short word list from an unfamiliar language and asked which sounds are contrastive.',
                steps: [
                    'Look for pairs of words that differ in exactly one sound.',
                    'Check that the meanings differ; if so, you have a minimal pair.',
                    'Name the two sounds as separate phonemes and write them between slashes.',
                    'Where no minimal pair exists, check whether the two sounds occur in complementary environments - if so, they may be allophones of one phoneme.',
                    'State your conclusion with the evidence, and note any ambiguity.',
                ],
                takeaway: 'Minimal pair first, complementary distribution second, conclusion with evidence always.',
            },
            {
                title: 'Morphological parsing',
                brief: 'Break "disrespectfully" into morphemes and classify each.',
                steps: [
                    'Identify the root: respect.',
                    'Attach the prefix dis- (negation, derivational).',
                    'Attach -ful (derivational, noun to adjective).',
                    'Attach -ly (derivational, adjective to adverb).',
                    'Check: is the order fixed? Yes - dis + respect + ful + ly, and reversing any pair produces a non-word.',
                    'Express the structure as a bracketed tree rather than a flat list.',
                ],
                takeaway: 'Show the structure. A flat list of morphemes does not demonstrate understanding of hierarchy.',
            },
        ],
        examBank: [
            {
                question: 'Distinguish phonetics from phonology with examples from a Nigerian language.',
                marks: '15 marks',
                outline: [
                    'Phonetics: physical production and perception of sounds.',
                    'Phonology: how a language organises sounds into contrastive categories.',
                    'Use tone in Igbo or Yoruba: phonetically a pitch difference, phonologically a meaning distinction.',
                    'Conclude that the same physical fact can be contrastive in one language and not another.',
                ],
            },
            {
                question: 'Why is linguistics descriptive rather than prescriptive?',
                marks: '10 marks',
                outline: [
                    'Define both positions.',
                    'State that all varieties are systematic.',
                    'Distinguish grammaticality from social acceptability.',
                    'Note that prescriptivism is itself a legitimate object of study.',
                ],
            },
            {
                question: 'Explain code-switching as a skilled practice, using a Nigerian example.',
                marks: '15 marks',
                outline: [
                    'Define code-switching and distinguish it from borrowing and from interlanguage.',
                    'Give a domain example: home language in family talk, Pidgin with peers, English in class.',
                    'Explain the functions: identity, solidarity, topic marking, quotation.',
                    'Refute the "confusion" interpretation with evidence of systematicity.',
                ],
                trap: 'Equating code-switching with poor competence in one language.',
            },
        ],
        glossary: [
            { term: 'Phoneme', definition: 'A contrastive sound unit in a language, written between slashes.' },
            { term: 'Allophone', definition: 'A variant pronunciation of a phoneme in a particular environment.' },
            { term: 'Minimal pair', definition: 'Two words differing by one sound and differing in meaning.' },
            { term: 'Morpheme', definition: 'The smallest unit of meaning in a word.' },
            { term: 'Derivational morpheme', definition: 'An affix that changes a word\'s class or meaning.' },
            { term: 'Inflectional morpheme', definition: 'An affix marking grammatical information without changing class.' },
            { term: 'Syntax', definition: 'The rules governing how words combine into phrases and sentences.' },
            { term: 'Constituent', definition: 'A group of words functioning as a unit within a larger structure.' },
            { term: 'Tone', definition: 'Use of pitch to distinguish word meaning, as in Igbo and Yoruba.' },
            { term: 'Pragmatics', definition: 'The study of meaning as shaped by context and use.' },
            { term: 'Code-switching', definition: 'Alternating between languages within a conversation or utterance.' },
            { term: 'Lingua franca', definition: 'A language used for communication between speakers of different first languages.' },
            { term: 'Language shift', definition: 'A community\'s gradual replacement of one language by another.' },
            { term: 'Descriptivism', definition: 'The approach of analysing language as it is used rather than prescribing usage.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Sounds', focus: 'Phonetics.', tasks: ['Learn the IPA symbols for English consonants.', 'Describe five sounds by place, manner and voicing.', 'Transcribe ten words.'] },
            { week: 'Week 2 - Patterns', focus: 'Phonology.', tasks: ['Find five minimal pairs in English.', 'Identify tonal minimal pairs in Igbo or Yoruba.', 'Explain allophones in one environment.'] },
            { week: 'Week 3 - Structure', focus: 'Morphology and syntax.', tasks: ['Parse ten words into morphemes.', 'Draw three tree diagrams.', 'Apply two constituency tests.'] },
            { week: 'Week 4 - Society', focus: 'Sociolinguistics.', tasks: ['Record a code-switching example with permission.', 'Classify its functions.', 'Write a 15-mark timed answer.'] },
        ],
        readingList: [
            'Any introductory linguistics textbook covering phonetics, morphology and syntax.',
            'An introduction to the linguistics of Nigerian languages.',
            'A sociolinguistics reader with African case studies.',
        ],
    },

    'eng-101-nigerian-literature-in-english': {
        sections: [
            {
                heading: 'A literature with a history of argument',
                paragraphs: [
                    'Nigerian literature in English begins in contest. The first generation wrote against colonial representation and against the assumption that African life was raw material for European interpretation. Chinua Achebe\'s Things Fall Apart (1958) answered novels that treated Igbo society as backdrop by placing its institutions, proverbs and internal debates at the centre.',
                    'The language question followed immediately. Achebe argued for a "new English" that could carry African experience; Ngugi wa Thiong\'o argued that writing in colonial languages perpetuates colonial power and moved to Gikuyu. The debate is not settled, and a good answer treats it as a live argument with consequences for who reads, who teaches and who is translated.',
                    'Periods are useful but must be handled carefully. Pre-independence writing is often read through cultural nationalism; the post-war generation through disillusionment and experimental form; the contemporary period through diaspora, gender, migration and genre fiction. These labels describe tendencies, not rules.',
                ],
            },
            {
                heading: 'Reading the text and the tradition together',
                paragraphs: [
                    'Nigerian writing in English is multilingual in practice. Texts carry proverbs, songs, untranslated words and speech rhythms from Igbo, Yoruba, Hausa and Pidgin. The presence of these elements is not decoration: it positions the reader, creates authenticity effects and sometimes deliberately excludes the monolingual reader.',
                    'Oral tradition is a structural resource, not a theme. The praise singer, the folktale frame, the call-and-response rhythm and the digressive narrator all appear in written texts. When a novel uses a storyteller\'s voice, ask what that voice authorises: a moral perspective, a communal memory, or an ironic distance from the events narrated.',
                    'Gender is a sustained critical question. Early criticism focused on nation and culture; later work asked where women were in those narratives, and a generation of women writers re-entered the tradition on their own terms. Reading for gender does not mean judging characters by contemporary standards; it means asking how the text distributes voice, agency and consequence.',
                ],
                callout: {
                    title: 'One quotation, three sentences of analysis',
                    body: 'Never leave a quotation unexplained. Say what it says, how it is said, and what it does in the argument you are making.',
                },
            },
            {
                heading: 'Writing about literature',
                paragraphs: [
                    'A literature essay argues about how meaning is produced. Plot summary is not analysis; it is the material you analyse. The strongest essays take a small textual detail - a repeated image, a shift in narrative voice, a character\'s silence - and use it to open a claim about the whole text.',
                    'Use the vocabulary precisely: narrator is not author; theme is not message; irony is not sarcasm. Cite by page in the edition you used. Compare texts by criterion, not in separate blocks.',
                    'Examiners reward the ability to hold a complexity. If a novel both criticises and reproduces a patriarchal assumption, say so and show where. A single-minded reading is easier to write and weaker to mark.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Turning summary into argument',
                brief: 'A draft says: "In Things Fall Apart, Okonkwo is a strong man who refuses change and eventually kills himself."',
                steps: [
                    'Identify the problem: this reports plot and offers a psychological label.',
                    'Ask a question the text can answer: why does the novel place Okonkwo\'s rigidity against the flexibility of his community?',
                    'Draft a claim: the novel treats inflexibility not as individual flaw but as a structural risk in a society negotiating change.',
                    'Identify the evidence: the clan\'s willingness to adapt versus Okonkwo\'s fear of resemblance to his father.',
                    'Name a counter-reading: the novel also celebrates an uncompromising masculinity.',
                    'Conclude with a position that holds both.',
                ],
                takeaway: 'A claim about function beats a claim about personality.',
            },
            {
                title: 'Handling the language debate in an exam',
                brief: '"Discuss the argument that African literature should be written in African languages."',
                steps: [
                    'State both positions with their strongest reasons.',
                    'Give a textual example of English used to carry African idiom.',
                    'Give the counter-case: audience, education policy, translation.',
                    'Identify what the debate is really about: access and power, not aesthetics alone.',
                    'Conclude with your own position and what would follow from it.',
                ],
                takeaway: 'Present both cases at full strength before choosing.',
            },
        ],
        examBank: [
            {
                question: 'Discuss the use of oral tradition in a Nigerian novel you have studied.',
                marks: '20 marks',
                outline: [
                    'Name the specific devices used: proverb, song, folktale, praise name, narrator address.',
                    'Give three textual instances with page references.',
                    'Explain the function of each: characterisation, communal authority, structure.',
                    'Assess whether the device is integrated or ornamental.',
                    'Conclude on what the novel gains from the oral resource.',
                ],
                trap: 'Listing oral features without explaining what they do.',
            },
            {
                question: 'How does the language question shape the reading of Nigerian literature in English?',
                marks: '15 marks',
                outline: [
                    'State the debate and its main positions.',
                    'Show the textual consequence: idiom, untranslated terms, register shifts.',
                    'Explain the effect on the implied reader.',
                    'Relate to publishing, education and translation.',
                ],
            },
        ],
        glossary: [
            { term: 'Cultural nationalism', definition: 'Writing that asserts the value and autonomy of a colonised culture.' },
            { term: 'Oral tradition', definition: 'Knowledge and art transmitted through speech, song and performance.' },
            { term: 'Proverb', definition: 'A condensed traditional saying used to authorise an argument or judgement.' },
            { term: 'Code-switching', definition: 'Alternating languages or registers within a text or utterance.' },
            { term: 'Narrator', definition: 'The voice telling a story, distinct from the author.' },
            { term: 'Free indirect discourse', definition: 'Third-person narration coloured by a character\'s idiom and perspective.' },
            { term: 'Postcolonial', definition: 'Writing and criticism concerned with the legacies of colonial rule.' },
            { term: 'Hybridity', definition: 'The mixing of cultural forms and languages produced by colonial encounter.' },
            { term: 'Canon', definition: 'The body of texts a discipline treats as central, always contested.' },
            { term: 'Genre', definition: 'A category of writing defined by shared conventions and reader expectations.' },
            { term: 'Disillusionment narrative', definition: 'Post-independence writing that exposes the failure of nationalist promises.' },
            { term: 'Close reading', definition: 'Detailed analysis of language and form in support of an interpretation.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Context', focus: 'History of the field.', tasks: ['Build a timeline of three generations.', 'Summarise the language debate in 200 words.', 'List the set texts with editions.'] },
            { week: 'Week 2 - Close reading', focus: 'Detail.', tasks: ['Annotate one chapter for oral features.', 'Choose three quotations worth analysing.', 'Write 500 words on one image.'] },
            { week: 'Week 3 - Argument', focus: 'Thesis.', tasks: ['Write two competing theses.', 'Find the evidence each would need.', 'Draft a five-paragraph plan.'] },
            { week: 'Week 4 - Essay', focus: 'Timed writing.', tasks: ['Write a 20-mark answer in 40 minutes.', 'Cut all plot summary.', 'Check every quotation is analysed.'] },
        ],
        readingList: [
            'Achebe, Things Fall Apart and his essay on writing in English.',
            'Ngugi wa Thiong\'o, Decolonising the Mind - for the language debate.',
            'A critical anthology of Nigerian literature covering the three generations.',
        ],
    },

    'his-101-nigerian-history-to-1960': {
        sections: [
            {
                heading: 'Before colonial rule: states, trade and networks',
                paragraphs: [
                    'Pre-colonial Nigeria contained several distinct political systems. The Sokoto Caliphate, consolidated after the jihad of 1804, was a federation of emirates under a caliph, administered through Islamic law, taxation and a scholarly class. The Oyo Empire governed through a king checked by a council of chiefs, with a cavalry-based military and an elaborate provincial structure. Benin had a centralised monarchy with titled societies and a craft guild system producing the bronzes that later became evidence in debates about African achievement.',
                    'Igbo communities are often described as "stateless", which is misleading. Many operated without a central king but through village assemblies, age grades, title societies and oracles that exercised judicial and political authority. The Arochukwu oracle network, for instance, was an economic and legal institution spanning a large region.',
                    'Long-distance trade connected these systems: trans-Saharan routes north, Atlantic trade south from the sixteenth century, and internal markets for salt, cloth, iron and kola. The Atlantic slave trade reshaped these economies over three centuries, and its abolition in the nineteenth century drove the expansion of palm oil production - the commodity that made the Niger Delta strategically valuable to Britain.',
                ],
            },
            {
                heading: 'Conquest, administration and resistance',
                paragraphs: [
                    'Colonial rule was established by force and then organised for revenue. The Royal Niger Company governed much of the south before the British government took control in 1900; Lagos was annexed in 1861. The amalgamation of the Northern and Southern Protectorates in 1914 created the administrative entity that became Nigeria, joining regions with different legal systems, religions and fiscal capacities.',
                    'The system of administration differed by region. Indirect rule in the north used existing emirate structures, which worked because centralised authority existed. Applied to Igbo communities, it required inventing "warrant chiefs", with consequences that included the Aba Women\'s War of 1929 - a revolt against taxation and the corruption of warrant chief courts, organised by women through market networks.',
                    'Resistance was continuous and varied: military resistance by the Sokoto caliphate and Benin, tax revolts, religious movements, strikes by workers, and nationalist politics. Treating resistance as either absent or uniform misreads the record.',
                ],
            },
            {
                heading: 'Nationalism to independence',
                paragraphs: [
                    'Nationalist organisation developed through newspapers, professional associations, trade unions and students abroad. The National Council of Nigeria and the Cameroons (1944), the Action Group (1951) and the Northern People\'s Congress (1951) represented different regional and social bases. The constitutions of 1946, 1951, 1954 and 1960 successively expanded elected representation and regional autonomy.',
                    'Independence in 1960 was negotiated, not seized. The critical issues were the balance between regions, the status of minorities within them, and control of revenue. The Willink Commission (1957-58) investigated minority fears and declined to create new states, a decision that shaped later conflict.',
                    'The historiography matters. Nationalist history emphasised unity and achievement; later scholarship examined class formation, gender, labour and the limits of independence. Reading a source means asking who wrote it, for what audience and what it leaves out - particularly the voices of women, slaves and minorities.',
                ],
                callout: {
                    title: 'Date plus consequence',
                    body: 'A date alone earns nothing. Write the date, what changed, and who was affected - that is a historical sentence.',
                },
            },
        ],
        workedExamples: [
            {
                title: 'Analysing a colonial document',
                brief: 'You are given a 1920s district officer\'s report describing a community as "backward and in need of administration".',
                steps: [
                    'Establish provenance: author, office, date, purpose of the report.',
                    'Identify the vocabulary doing ideological work ("backward", "need").',
                    'Ask what the report is justifying: taxation, labour, intervention.',
                    'Cross-check against another source: oral testimony, a missionary record, a court case.',
                    'State what the document can and cannot establish.',
                    'Note whose voices are absent and how that limits conclusions.',
                ],
                takeaway: 'Colonial documents are evidence of colonial thinking first and of African life second.',
            },
            {
                title: 'Explaining the Aba Women\'s War',
                brief: 'A question asks why the 1929 revolt occurred. Build a causal answer.',
                steps: [
                    'Immediate trigger: rumours of taxation of women and counting of women and livestock.',
                    'Structural causes: warrant chiefs, corrupt native courts, loss of women\'s traditional political roles.',
                    'Organisation: market networks, women\'s councils, shared grievance across ethnic lines.',
                    'Consequences: the colonial administration reformed the warrant chief system and appointed women to some courts.',
                    'Historiographical point: long described as a "riot"; now understood as organised political action.',
                    'Conclude that the name matters - it shapes how the event is judged.',
                ],
                takeaway: 'Give trigger, structure and consequence. Then discuss how the event has been named.',
            },
        ],
        examBank: [
            {
                question: 'Compare the political organisation of two pre-colonial Nigerian societies.',
                marks: '20 marks',
                outline: [
                    'Choose systems with real contrast, such as Sokoto and an Igbo community.',
                    'Compare criteria: authority, law, revenue, military, succession.',
                    'Explain why the differences arose from scale, ecology and religion.',
                    'Resist the "centralised equals advanced" assumption.',
                    'Conclude that both were effective at different scales.',
                ],
                trap: 'Value-laden language that treats centralised states as superior.',
            },
            {
                question: 'Why did indirect rule work better in some regions than others?',
                marks: '15 marks',
                outline: [
                    'Define indirect rule and its fiscal purpose.',
                    'Explain the fit with emirate structures.',
                    'Explain the misfit where authority was diffuse, producing warrant chiefs.',
                    'Give the consequence: Aba Women\'s War and legitimised grievances.',
                    'Conclude that administrative systems require existing institutions to work with.',
                ],
            },
        ],
        glossary: [
            { term: 'Indirect rule', definition: 'Colonial administration through existing local authorities under British supervision.' },
            { term: 'Warrant chief', definition: 'A chief appointed by colonial administration without traditional legitimacy.' },
            { term: 'Amalgamation', definition: 'The 1914 joining of the Northern and Southern Protectorates into one administration.' },
            { term: 'Sokoto Caliphate', definition: 'A nineteenth-century Islamic federation of emirates in northern Nigeria.' },
            { term: 'Aba Women\'s War', definition: 'The 1929 revolt by women in eastern Nigeria against taxation and warrant chief courts.' },
            { term: 'Nationalism', definition: 'Political movements seeking self-government or independence.' },
            { term: 'Willink Commission', definition: 'The 1957-58 inquiry into minority fears before independence, which declined to create new states.' },
            { term: 'Legitimate trade', definition: 'Trade in commodities such as palm oil that replaced the slave trade after abolition.' },
            { term: 'Age grade', definition: 'An age-based cohort with civic duties and rights.' },
            { term: 'Historiography', definition: 'The study of how history has been written and interpreted.' },
            { term: 'Primary source', definition: 'Material produced by participants or witnesses of the period studied.' },
            { term: 'Revenue allocation', definition: 'The division of public income between levels of government.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Pre-colonial', focus: 'States and systems.', tasks: ['Draw a comparison table of three systems.', 'Learn two institutions per system.', 'Avoid value-laden terms.'] },
            { week: 'Week 2 - Conquest', focus: 'Administration.', tasks: ['Map the 1914 amalgamation.', 'Explain indirect rule in two regions.', 'Build a timeline of resistance events.'] },
            { week: 'Week 3 - Sources', focus: 'Reading evidence.', tasks: ['Analyse one colonial document.', 'Find one counter-source.', 'Write a paragraph on the limits of each.'] },
            { week: 'Week 4 - Nationalism', focus: 'Argument.', tasks: ['Timeline of constitutions and parties.', 'Explain one minority question.', 'Write a timed 20-mark answer.'] },
        ],
        readingList: [
            'A standard history of Nigeria covering the pre-colonial period to 1960.',
            'Scholarship on the Aba Women\'s War and colonial administration.',
            'A historiography introduction explaining nationalist and revisionist approaches.',
        ],
    },
})

Object.assign(THEATRE_FILM_DEPTH, {
    'phi-101-introduction-to-philosophy-and-logic': {
        sections: [
            {
                heading: 'Philosophy begins with a question you cannot answer quickly',
                paragraphs: [
                    'Philosophy is not the accumulation of opinions about big topics. It is the practice of taking a question that ordinary life assumes and pressing it until the assumptions show. "Is it ever right to lie?" becomes philosophical when you ask what makes an action right at all, and discover that you cannot answer without a theory.',
                    'The discipline is divided into branches: epistemology (knowledge), metaphysics (existence, causation, mind), ethics (right action), political philosophy (justice and authority), aesthetics (art and beauty) and logic (correct inference). Each has its own questions and its own standards. Placing a question in a branch is the first move in any good answer.',
                    'African philosophy is a substantial part of this field, not a regional footnote. Debates about the existence and character of African philosophy - whether it lies in communal worldviews, in critical individual reflection, in proverbs and oral argument, or in professional academic practice - are methodological arguments with real consequences for what counts as philosophy.',
                ],
            },
            {
                heading: 'The tools: argument, counter-example, distinction',
                paragraphs: [
                    'An argument is a set of premises offered in support of a conclusion. Philosophy assesses the link between them. A valid argument cannot have true premises and a false conclusion; a sound argument is valid and has true premises. Most philosophical work is the construction and destruction of arguments, not the assertion of conclusions.',
                    'The counter-example is the philosopher\'s most efficient tool. To show that a definition fails, produce a case that fits the definition but not the concept, or the reverse. To test "knowledge is justified true belief", produce a case of accidentally justified true belief - and the definition is in trouble.',
                    'The distinction is the second tool. A great deal of confusion dissolves when two things wrongly treated as one are separated: causing harm and intending harm; believing and knowing; legal and moral obligation; explaining and justifying. Making a distinction is an argumentative move, not a neutral observation, and must be defended.',
                ],
                callout: {
                    title: 'Charity before criticism',
                    body: 'State your opponent\'s position in its strongest form, then answer it. Refuting a weak version proves nothing except that you can win against yourself.',
                },
            },
            {
                heading: 'Writing philosophy',
                paragraphs: [
                    'A philosophy essay has a thesis, an argument for it, an objection, and a reply. It does not have a survey of everyone who ever wrote on the topic unless each is doing argumentative work. "Philosophers have long debated X" is a wasted sentence; "If Hume is right that reason alone cannot motivate action, then moral education must address desire, not only belief" is not.',
                    'Write in the present tense for positions ("Aristotle holds that...") and use examples. Abstract claims become testable when attached to a case: a trolley, a promise to a dying friend, a lie to protect someone. Philosophy without examples drifts into vocabulary.',
                    'Cite primary texts where possible and secondary sources for interpretation. Never attribute a position to a philosopher you have not read; if you know it only through a summary, say so or choose another target.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Testing a definition with counter-examples',
                brief: 'A friend defines justice as "giving each person what they deserve". Assess it.',
                steps: [
                    'Clarify the definition: what does desert mean here - merit, need, contribution, legal entitlement?',
                    'Construct a counter-example: a person born with a disability who cannot contribute as others do, yet would receive little on a merit-based reading.',
                    'Ask whether the counter-example is decisive or whether the definition can be revised by distinguishing need from merit.',
                    'Consider a rival definition: justice as fair terms of cooperation.',
                    'Assess which definition handles more cases without collapsing into vagueness.',
                    'Conclude with a qualified position, not a verdict.',
                ],
                takeaway: 'Definitions are tested by cases, and revision is part of the argument.',
            },
            {
                title: 'Answering "is capital punishment justified?" in twenty minutes',
                brief: 'A question that invites assertion. Build an argument instead.',
                steps: [
                    'Distinguish retributive, deterrent and restorative justifications.',
                    'State the strongest case for one and the empirical claim it requires.',
                    'Examine whether the evidence supports that empirical claim.',
                    'Present the strongest objection, including the problem of wrongful conviction.',
                    'Explain what would have to be true for your conclusion to hold.',
                    'Conclude with your position and its costs.',
                ],
                takeaway: 'Separate the moral argument from the empirical premise, and assess each.',
            },
        ],
        examBank: [
            {
                question: 'Distinguish validity and soundness, and explain why philosophy cares about both.',
                marks: '15 marks',
                outline: [
                    'Define validity in terms of form.',
                    'Define soundness as validity plus true premises.',
                    'Give one valid-but-unsound example.',
                    'Explain the division of labour: logic checks inference; other inquiry checks premises.',
                ],
            },
            {
                question: 'Is there a distinctive African philosophy? Discuss.',
                marks: '20 marks',
                outline: [
                    'Set out the sceptical position: philosophy requires individual critical argument, not communal worldview.',
                    'Set out the reply: proverbs, oral debate and communal thought contain critical reasoning.',
                    'Discuss sage philosophy and the ethnophilosophy debate.',
                    'Assess what is at stake: who defines the discipline\'s boundaries.',
                    'Conclude with a defended position.',
                ],
                trap: 'Treating the question as a matter of respect rather than of argument.',
            },
        ],
        glossary: [
            { term: 'Argument', definition: 'Premises offered in support of a conclusion.' },
            { term: 'Validity', definition: 'The property that true premises cannot yield a false conclusion.' },
            { term: 'Soundness', definition: 'Validity plus actually true premises.' },
            { term: 'Counter-example', definition: 'A case that shows a definition or general claim to fail.' },
            { term: 'Premise', definition: 'A proposition offered as support within an argument.' },
            { term: 'Epistemology', definition: 'The branch of philosophy concerned with knowledge and justification.' },
            { term: 'Metaphysics', definition: 'The branch concerned with what exists and its fundamental structure.' },
            { term: 'Ethics', definition: 'The branch concerned with right action and the good life.' },
            { term: 'Ethnophilosophy', definition: 'The reconstruction of a communal worldview as philosophy, criticised for lacking critical argument.' },
            { term: 'Sage philosophy', definition: 'The critical thought of individual wise persons within a community.' },
            { term: 'Thought experiment', definition: 'An imagined case used to test a principle or intuition.' },
            { term: 'Dilemma', definition: 'A situation requiring a choice between options each with a cost.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Arguments', focus: 'Form.', tasks: ['Formalise five arguments from newspaper editorials.', 'Test each for validity.', 'Write one valid but unsound argument.'] },
            { week: 'Week 2 - Branches', focus: 'Placement.', tasks: ['Sort ten questions by branch.', 'Write the central question of each branch.', 'Explain why placement changes method.'] },
            { week: 'Week 3 - Cases', focus: 'Thought experiments.', tasks: ['Design a counter-example to a definition.', 'Run one thought experiment in 300 words.', 'Assess what intuition the case relies on.'] },
            { week: 'Week 4 - Essay', focus: 'Thesis, objection, reply.', tasks: ['Draft a philosophy essay plan.', 'Write the strongest objection.', 'Complete a timed answer.'] },
        ],
        readingList: [
            'Any introduction to philosophy with primary extracts rather than summaries only.',
            'A collection of African philosophy essays covering ethnophilosophy and sage philosophy.',
            'A short logic primer covering validity, soundness and common fallacies.',
        ],
    },

    'rel-101-introduction-to-the-study-of-religion': {
        sections: [
            {
                heading: 'Studying religion without adjudicating it',
                paragraphs: [
                    'Religious studies examines beliefs, practices and institutions as human phenomena. It does not require the student to accept or reject any tradition\'s truth claims; it requires the student to describe them accurately, explain them in context and analyse their effects. This methodological neutrality is often called bracketing, and it is a discipline, not indifference.',
                    'The field uses several approaches. Phenomenological description tries to capture how a practice appears to its practitioners. Historical analysis traces origins and change. Sociological analysis asks what religion does for and to a society. Anthropological work examines ritual, kinship and symbolism. Comparative study looks for patterns across traditions while resisting the temptation to flatten differences.',
                    'The commonest student error is apologetics in either direction - defending or attacking a tradition instead of analysing it. If your paragraph could be preached, it is not yet an academic paragraph.',
                ],
            },
            {
                heading: 'Belief, practice and institution',
                paragraphs: [
                    'Traditions are not only doctrines. They are calendars, diets, dress, architecture, music, lifecycle rituals, authority structures and money. A student who studies only scripture has studied one dimension of a three-dimensional object.',
                    'Ritual is a central analytic category. Most definitions include a prescribed sequence, a symbolic dimension, a participant body and a marked separation from ordinary time. Rites of passage commonly follow a pattern of separation, liminality and incorporation; this framework is useful for analysing naming ceremonies, weddings, initiations and funerals across traditions.',
                    'Authority takes different forms: textual (interpretation of scripture), charismatic (personal gift), institutional (office and hierarchy) and customary (elders and lineage). Conflicts within traditions are frequently conflicts about which authority governs.',
                ],
                callout: {
                    title: 'Describe before you explain',
                    body: 'First say what practitioners do and say in their own terms. Then explain it. Skipping the first step produces explanation that is really projection.',
                },
            },
            {
                heading: 'Religion in Nigeria: plurality and proximity',
                paragraphs: [
                    'Nigeria is a country of extraordinary religious plurality: Islam in its various schools, Christianity in many denominations, and indigenous traditions that continue in practices often described as "customary" even by their practitioners. These traditions have coexisted, borrowed from and competed with one another for centuries.',
                    'The categories are not clean. Many Christians and Muslims participate in practices rooted in indigenous tradition; naming ceremonies, burial rites and festivals often combine elements. Scholars describe this as syncretism, parallel practice or lived religion, depending on the degree of integration.',
                    'Religion in Nigeria is also inseparable from politics, education, media and economy. Religious institutions run schools and hospitals, shape electoral behaviour, and provide welfare where the state does not. Analysis that treats religion as private belief misses most of what it does publicly.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Analysing a naming ceremony',
                brief: 'You must describe and analyse a naming ceremony in 500 words without evaluating it.',
                steps: [
                    'Describe the sequence: who is present, what is said, what objects are used, when it happens.',
                    'Identify the symbolic elements and the meanings participants give them.',
                    'Apply a rite-of-passage frame: what is the child separated from, what liminal state, what incorporation?',
                    'Identify authority: who performs, who witnesses, who names.',
                    'Explain social functions: kinship recognition, legitimacy, community obligation.',
                    'Note change: urban versions, smaller gatherings, religious mixing.',
                ],
                takeaway: 'Description, symbol, structure, authority, function, change. Six moves, one page.',
            },
            {
                title: 'Answering a question about religious conflict carefully',
                brief: 'You are asked why religious conflict occurs in Nigeria. Avoid both apologetics and crude causal claims.',
                steps: [
                    'Distinguish religious from religiously framed conflict.',
                    'Identify material factors: land, grazing routes, employment, political competition.',
                    'Identify the role of religious language and institutions in mobilising.',
                    'Note the role of media and rumour in escalation.',
                    'Give one well-documented case and cite it.',
                    'Conclude that religion is often a vocabulary for conflict with other causes, without denying that belief can itself motivate action.',
                ],
                takeaway: 'Avoid single-cause explanations. Name the mechanisms.',
            },
        ],
        examBank: [
            {
                question: 'What does methodological neutrality require of a student of religion, and what does it not require?',
                marks: '15 marks',
                outline: [
                    'Define bracketing of truth claims.',
                    'Distinguish neutrality from indifference and from relativism.',
                    'Show what it demands: accurate description, fair use of sources, no preaching.',
                    'Show what it does not demand: abandoning judgement about evidence or ethics.',
                ],
            },
            {
                question: 'Explain the three phases of a rite of passage and apply them to one Nigerian ceremony.',
                marks: '15 marks',
                outline: [
                    'Separation, liminality, incorporation.',
                    'Describe the ceremony\'s sequence in those terms.',
                    'Identify symbols marking each phase.',
                    'Explain the social function of the liminal phase.',
                ],
            },
        ],
        glossary: [
            { term: 'Bracketing', definition: 'Setting aside judgement on truth claims in order to describe and analyse.' },
            { term: 'Phenomenology of religion', definition: 'An approach describing religious experience and practice as it appears to participants.' },
            { term: 'Ritual', definition: 'A prescribed symbolic sequence performed in a marked setting and time.' },
            { term: 'Rite of passage', definition: 'A ceremony marking transition between social states through separation, liminality and incorporation.' },
            { term: 'Liminality', definition: 'The in-between phase of a rite of passage where normal status is suspended.' },
            { term: 'Syncretism', definition: 'The blending of elements from different religious traditions.' },
            { term: 'Lived religion', definition: 'Religion as practised in everyday life rather than as official doctrine.' },
            { term: 'Charismatic authority', definition: 'Authority deriving from perceived personal gift rather than office.' },
            { term: 'Sacred', definition: 'That which a community sets apart as powerful and non-ordinary.' },
            { term: 'Cosmology', definition: 'A community\'s account of the structure of the world and its powers.' },
            { term: 'Comparative religion', definition: 'The study of patterns and differences across traditions.' },
            { term: 'Apologetics', definition: 'Argument in defence of a tradition\'s truth, as distinct from analysis of it.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Method', focus: 'Bracketing.', tasks: ['Rewrite one preaching paragraph as analysis.', 'List the approaches and their questions.', 'Define neutral description.'] },
            { week: 'Week 2 - Practice', focus: 'Ritual.', tasks: ['Observe a ceremony with permission.', 'Write a descriptive account.', 'Apply the rite-of-passage frame.'] },
            { week: 'Week 3 - Plurality', focus: 'Nigeria.', tasks: ['Map three traditions in your locality.', 'Document one instance of mixing.', 'Interview one practitioner.'] },
            { week: 'Week 4 - Analysis', focus: 'Essay.', tasks: ['Write a 15-mark answer.', 'Remove every evaluative claim.', 'Cite two academic sources.'] },
        ],
        readingList: [
            'Any introduction to religious studies covering method, ritual and typology.',
            'An ethnography of religious practice in Nigeria.',
            'Scholarship on religious plurality and conflict in northern and central Nigeria.',
        ],
    },

    'mus-101-fundamentals-of-music-theory': {
        sections: [
            {
                heading: 'Pitch is measured, not guessed',
                paragraphs: [
                    'Western music theory names twelve pitch classes and organises them into scales. A major scale follows the interval pattern tone-tone-semitone-tone-tone-tone-semitone; a natural minor scale follows tone-semitone-tone-tone-semitone-tone-tone. Everything else - key signatures, chords, transposition - follows from these patterns.',
                    'Intervals are the distance between two notes, named by size and quality: a major third, a perfect fifth, a minor seventh. Counting semitones is the reliable method: a perfect fifth is seven semitones, a major third four, a minor third three. Learn the semitone count for each interval and you can construct any chord.',
                    'Nigerian music theory is not a subset of Western theory. Igbo and Yoruba tonal systems organise melody around speech tone, and the pentatonic scales common in many Nigerian traditions do not map neatly onto diatonic harmony. A student who transcribes a traditional melody into a major key has usually altered it. The comparison between systems is itself examinable.',
                ],
            },
            {
                heading: 'Rhythm, metre, and the thing notation hides',
                paragraphs: [
                    'Rhythm is the organisation of durations; metre is the repeating pattern of strong and weak beats. A time signature states the metre - 4/4 is four crotchet beats per bar - but the felt pulse is what performers actually organise around. A listener can clap to 4/4 without reading a score.',
                    'Syncopation places emphasis off the beat, and polyrhythm places two or more rhythmic patterns in simultaneous conflict. Both are central to much African music, where a single cycle may be organised by several interlocking parts and the "beat" emerges from the relationship rather than being stated by one instrument. This is why transcribing such music into a single Western metre often loses the structure.',
                    'Master rhythms are named and learned as cycles: a bell pattern establishes the timeline, and other parts interlock with it. Understanding this makes clear that rhythm in such traditions is compositional architecture, not accompaniment.',
                ],
                callout: {
                    title: 'Clap before you notate',
                    body: 'If you cannot clap the pattern steadily and say where the cycle restarts, you do not yet understand it well enough to write it down.',
                },
            },
            {
                heading: 'Harmony and form',
                paragraphs: [
                    'A triad is three notes stacked in thirds. Major, minor, diminished and augmented triads differ by their interval content. In a key, chords are numbered by scale degree: I, ii, iii, IV, V, vi, vii. The common progressions students must recognise by ear are I-IV-V-I, I-vi-IV-V and the twelve-bar blues.',
                    'Cadences close phrases: perfect (V-I), imperfect (ending on I with the melody on the third), plagal (IV-I), interrupted (V-vi) and half (ending on V). Identifying cadences is a reliable way to find phrase boundaries in an unfamiliar piece.',
                    'Form is the large-scale arrangement: binary (AB), ternary (ABA), strophic (verses to the same music), through-composed, and the call-and-response structure central to much African and African-diaspora music. Name the form, then show where the sections divide and what marks the division - a cadence, a texture change, a new rhythmic cycle.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Building a major scale and its chords',
                brief: 'Construct the scale of D major and identify its primary triads.',
                steps: [
                    'Start on D and apply the major pattern: tone, tone, semitone, tone, tone, tone, semitone.',
                    'Result: D E F# G A B C# D.',
                    'Check the key signature: two sharps, F# and C#.',
                    'Build triads on I, IV and V: D major (D-F#-A), G major (G-B-D), A major (A-C#-E).',
                    'Play the progression I-IV-V-I and listen for the resolution.',
                    'Transpose the same progression to another key to test the method.',
                ],
                takeaway: 'Pattern, signature, triads, listening. Never memorise a scale without the pattern.',
            },
            {
                title: 'Identifying a cadence by ear',
                brief: 'A phrase ends and you must name the cadence.',
                steps: [
                    'Find the final bass note of the phrase.',
                    'If it is the tonic and the preceding chord was the dominant, it is perfect.',
                    'If the melody ends on the third degree over the tonic, it is imperfect.',
                    'If the phrase ends on the dominant, it is a half cadence.',
                    'If the expected tonic is replaced by the relative minor, it is interrupted.',
                    'Confirm by playing the phrase again and singing the bass.',
                ],
                takeaway: 'Bass note plus preceding chord identifies almost every cadence.',
            },
        ],
        examBank: [
            {
                question: 'Construct the natural minor scale on A and explain how it differs from A major.',
                marks: '15 marks',
                outline: [
                    'A natural minor: A B C D E F G A.',
                    'Interval pattern: tone, semitone, tone, tone, semitone, tone, tone.',
                    'Compare with A major: three lowered degrees (C, F, G become C natural, F natural, G natural).',
                    'Note the effect on the primary triads and on cadence strength.',
                    'Mention the harmonic minor alteration of the seventh.',
                ],
            },
            {
                question: 'Explain polyrhythm and its role in African music, using a named example.',
                marks: '15 marks',
                outline: [
                    'Define polyrhythm: simultaneous contrasting rhythmic patterns.',
                    'Describe the timeline pattern and interlocking parts.',
                    'Give a named ensemble or tradition example.',
                    'Explain why a single Western metre may misrepresent the structure.',
                ],
                trap: 'Calling polyrhythm "complex rhythm". Complexity is not the defining feature; simultaneity of patterns is.',
            },
        ],
        glossary: [
            { term: 'Scale', definition: 'An ordered set of pitches forming the melodic material of a key or mode.' },
            { term: 'Semitone', definition: 'The smallest standard interval in Western tuning, adjacent keys on a piano.' },
            { term: 'Interval', definition: 'The distance in pitch between two notes, named by size and quality.' },
            { term: 'Key signature', definition: 'The sharps or flats at the start of a staff indicating the key.' },
            { term: 'Triad', definition: 'A chord of three notes stacked in thirds.' },
            { term: 'Cadence', definition: 'A harmonic formula closing a phrase or section.' },
            { term: 'Metre', definition: 'The repeating pattern of strong and weak beats.' },
            { term: 'Syncopation', definition: 'Emphasis placed on a weak beat or between beats.' },
            { term: 'Polyrhythm', definition: 'Two or more contrasting rhythmic patterns sounding simultaneously.' },
            { term: 'Timeline', definition: 'A repeated bell or percussion pattern that anchors an ensemble\'s cycle.' },
            { term: 'Pentatonic scale', definition: 'A five-note scale common in many musical traditions.' },
            { term: 'Form', definition: 'The large-scale arrangement of sections in a piece.' },
            { term: 'Transposition', definition: 'Moving music to a different key while preserving intervals.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Pitch', focus: 'Scales and intervals.', tasks: ['Write five major scales from the pattern.', 'Count semitones for six intervals.', 'Identify key signatures by sight.'] },
            { week: 'Week 2 - Rhythm', focus: 'Metre and pattern.', tasks: ['Clap and notate three rhythms.', 'Identify syncopation in a recording.', 'Learn one timeline pattern.'] },
            { week: 'Week 3 - Harmony', focus: 'Chords and cadences.', tasks: ['Build primary triads in three keys.', 'Identify five cadences by ear.', 'Play I-IV-V-I in two keys.'] },
            { week: 'Week 4 - Form', focus: 'Structure.', tasks: ['Map the form of one song.', 'Mark section boundaries and why.', 'Write a 15-mark answer.'] },
        ],
        readingList: [
            'Any fundamentals of music theory workbook covering scales, intervals and triads.',
            'An introduction to African music covering polyrhythm and ensemble organisation.',
            'A sight-singing or ear-training resource for interval recognition.',
        ],
    },

    'faa-101-foundations-of-fine-and-applied-arts': {
        sections: [
            {
                heading: 'What art does, and how to talk about it',
                paragraphs: [
                    'Fine art is made to be experienced primarily as form and meaning; applied art is made to be used as well. The distinction is institutional rather than absolute - a woven cloth can be both a functional object and a major work - and it changes with context. A masquerade headdress in a museum is fine art; worn in performance it is applied, ritual and social at once.',
                    'Analysis of a work begins with description, not judgement. Describe what is there: medium, support, scale, composition, colour, texture, subject, and the marks of making. Only then interpret. The order matters because interpretation without description invents a work that is not in front of you.',
                    'Formal elements - line, shape, form, value, colour, texture, space - and principles - balance, contrast, emphasis, rhythm, proportion, unity - are the vocabulary for description. They are not a checklist to be recited; each term should answer a question about how the work produces its effect.',
                ],
            },
            {
                heading: 'Materials, process and craft',
                paragraphs: [
                    'Every medium has a logic. Charcoal responds to pressure and erases; watercolour rewards transparency and punishes correction; oil allows revision and slow blending; clay records every touch before firing; wood has grain that decides composition; textile has drape, weight and repeat. An artwork that ignores its material\'s logic usually looks like an idea that has not met its medium.',
                    'Process is part of content. Whether a surface is built up in layers, carved away, cast, woven or printed changes what the work can say. Learn the basic processes of at least one medium well enough to explain why a specific effect was achievable and another was not.',
                    'Nigerian art history includes major traditions of sculpture (Nok terracotta, Ife brass and terracotta heads, Benin bronzes), textile (aso oke, adire, akwete), pottery, leatherwork and body arts, alongside modern and contemporary practice. These are not "craft" in a diminished sense; they are technically sophisticated traditions with their own aesthetic systems.',
                ],
                callout: {
                    title: 'One work, twenty minutes',
                    body: 'Sit with a single work and write only description for twenty minutes. Interpretation will be better afterwards, because you will have something to interpret.',
                },
            },
            {
                heading: 'Context, function and the studio habit',
                paragraphs: [
                    'Art is made in conditions. Patronage, religion, politics, market demand, training systems and available materials determine what is possible. The Benin plaques exist because a court could support specialist guilds; contemporary installation art exists because galleries and biennales do. Asking who paid and who was meant to see it answers more questions than asking whether it is beautiful.',
                    'Your own studio practice teaches the same lessons faster. Make something weekly, keep a sketchbook with dated entries, annotate failures, and revisit an idea three times rather than starting ten. A sketchbook with honest notes is the strongest evidence of development in an assessment.',
                    'Critique is a skill. Say what you see, what you think it does, and what you would change - and separate those three. Receiving critique means asking a clarifying question before defending.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'A description that earns marks',
                brief: 'Write 200 words describing a sculpture without evaluating it.',
                steps: [
                    'State medium, dimensions and support.',
                    'Describe the subject and pose in plain language.',
                    'Describe the treatment of surface: tool marks, polish, patina, texture.',
                    'Describe composition: mass distribution, negative space, viewpoint.',
                    'Describe colour and light response.',
                    'Stop. Do not add "beautiful" or "expressive" - those belong in interpretation.',
                ],
                takeaway: 'Description is a skill with a stopping point. Stop before judgement.',
            },
            {
                title: 'Choosing a medium for an idea',
                brief: 'You want to show the fragility of a family memory. Which medium, and why?',
                steps: [
                    'State the idea precisely: memory that survives only through repeated retelling.',
                    'List candidate media and what each affords: paper (tears, fades), textile (frays, patches), clay (breaks, cannot be repaired invisibly).',
                    'Choose one and name the specific property that carries the idea.',
                    'Test it with a small maquette before committing.',
                    'Document the test and what it revealed.',
                ],
                takeaway: 'Medium choice is an argument. Name the property that does the work.',
            },
        ],
        examBank: [
            {
                question: 'Distinguish fine art from applied art, and explain why the distinction is contested.',
                marks: '15 marks',
                outline: [
                    'Define both by purpose and context.',
                    'Show the institutional basis of the distinction.',
                    'Use a Nigerian example where function and aesthetic value coexist.',
                    'Explain what the distinction obscures: skill hierarchies, gender and colonial classification.',
                ],
            },
            {
                question: 'Analyse the formal elements of a named work you have studied.',
                marks: '20 marks',
                outline: [
                    'Identify the work, medium and date.',
                    'Describe line, shape, value, colour, texture and composition with specifics.',
                    'Explain how two elements work together to produce an effect.',
                    'Connect form to context or function.',
                    'Avoid evaluative adjectives until the final sentence.',
                ],
                trap: 'Reciting the elements of art without applying them to the specific work.',
            },
        ],
        glossary: [
            { term: 'Formal elements', definition: 'Line, shape, form, value, colour, texture and space used in description.' },
            { term: 'Principles of design', definition: 'Balance, contrast, emphasis, rhythm, proportion and unity.' },
            { term: 'Medium', definition: 'The material and process used to make a work.' },
            { term: 'Support', definition: 'The surface or structure on which a work is made.' },
            { term: 'Maquette', definition: 'A small test model made before the final work.' },
            { term: 'Patina', definition: 'Surface change produced by age, handling or chemical action.' },
            { term: 'Negative space', definition: 'The empty area around and between forms, itself a compositional element.' },
            { term: 'Value', definition: 'The relative lightness or darkness of a tone.' },
            { term: 'Adire', definition: 'Yoruba resist-dyed textile tradition using indigo.' },
            { term: 'Aso oke', definition: 'Yoruba hand-woven cloth, often worn for ceremonies.' },
            { term: 'Nok terracotta', definition: 'Early Nigerian figurative sculpture, among the oldest in sub-Saharan Africa.' },
            { term: 'Critique', definition: 'Structured feedback separating observation, interpretation and suggestion.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - See', focus: 'Description.', tasks: ['Describe one work in 200 words without judgement.', 'Label the formal elements you used.', 'Repeat with a different medium.'] },
            { week: 'Week 2 - Make', focus: 'Material logic.', tasks: ['Test three media on one idea.', 'Record what each affords.', 'Choose and justify.'] },
            { week: 'Week 3 - Context', focus: 'Function and patronage.', tasks: ['Research one Nigerian tradition.', 'Identify who made and who used it.', 'Explain the training system.'] },
            { week: 'Week 4 - Critique', focus: 'Assessment language.', tasks: ['Critique a peer using the three-part method.', 'Annotate your sketchbook.', 'Write a 20-mark analysis.'] },
        ],
        readingList: [
            'Any foundations of visual art text covering formal elements and media.',
            'A survey of Nigerian art history from Nok to contemporary practice.',
            'A studio guide to the medium you are working in this semester.',
        ],
    },
})

Object.assign(THEATRE_FILM_DEPTH, {
    'igb-101-introduction-to-igbo-language-and-culture': {
        sections: [
            {
                heading: 'The language: tones carry meaning',
                paragraphs: [
                    'Igbo is a tonal language of the Benue-Congo branch of Niger-Congo, spoken by tens of millions of people in south-eastern Nigeria. It has two principal tones, high and low, and tone is lexical: the same consonants and vowels with different tones are different words. "Ákwá" (cry), "àkwà" (bed) and "ákwà" (cloth) differ only in tone and are not interchangeable.',
                    'Igbo is also largely isolating in its verb morphology compared with English: verbs do not inflect for person, so "m na-aga" (I am going) and "ọ na-aga" (he or she is going) differ in the pronoun, not the verb. Aspect matters more than tense; the -rV suffix marks completed action, "na-" marks progressive or habitual.',
                    'The standard orthography uses dotted vowels (ị, ọ, ụ) that are distinct phonemes, not decorative variants. Writing them accurately is a mark of literacy in the language, and omitting them changes words. The letter "n" before a consonant is syllabic in many words, as in "ńdị" and "m̀bà".',
                ],
            },
            {
                heading: 'Dialect, standard and the question of which Igbo',
                paragraphs: [
                    'Igbo is a dialect cluster rather than a single uniform speech. Onitsha, Nsukka, Owerri, Abakaliki and other varieties differ in vocabulary, tone and pronunciation, and mutual intelligibility is not always complete. Standard Igbo was developed largely on the basis of central dialects, and it is what schools and broadcasting tend to use.',
                    'The choice of a standard raises a cultural question that is examinable: standardisation enables literacy, publishing and examination, but it can make a student\'s home variety feel incorrect. The mature position is that both exist for different purposes, and that dialect diversity is a resource rather than an error.',
                    'Igbo is written in the Latin alphabet adapted in the nineteenth and twentieth centuries and refined by committees including the Onwu orthography of 1961. Earlier writing used the Union Igbo of the missions, which is one reason older texts look unfamiliar.',
                ],
                callout: {
                    title: 'Write the dots',
                    body: 'Omitting ị, ọ and ụ is not a small typing shortcut; it produces different words. In an examination, missing dots are missing marks.',
                },
            },
            {
                heading: 'Culture: kinship, title and the village assembly',
                paragraphs: [
                    'Traditional Igbo society is often described as acephalous - without a single king - but that understates its organisation. Authority was distributed among the family head (ọkpara), the council of elders, age grades, title societies such as Ọzọ, women\'s associations, and oracles and shrines with judicial functions. Decisions were made in assembly (ọha) and consensus mattered.',
                    'Kinship is patrilineal: descent, inheritance and residence run through the male line, with the umunna (lineage group) as the basic political unit. Marriage involves both families; the bridewealth (ime ego) formalises the alliance, and the wife retains rights in her own lineage. The first daughter (ada) has specific ritual roles, including at her father\'s burial.',
                    'Culture is not frozen. Masquerade traditions (mmanwu) continue with new materials and new occasions; the New Yam Festival (Iri Ji) is both agricultural and social; chieftaincy titles now coexist with elected local government. Examiners reward answers that show change as well as continuity.',
                ],
            },
            {
                heading: 'Learning the language: a practical routine',
                paragraphs: [
                    'Vocabulary alone will not produce speech. Learn phrases in context: greetings ("Kedu?", "Ọ dị mma"), responses, and the politeness formulas that structure Igbo interaction. Greeting correctly is not optional; it is the entry ticket to any conversation.',
                    'Tone must be practised aloud. Reading silently will not fix tone because tone is not represented in your memory of the written form. Record yourself, compare with a speaker, and mark tones on your own vocabulary lists.',
                    'Use the language daily in a small domain: greetings, market transactions, family talk. Ten minutes of real use beats an hour of memorising word lists, because it builds the retrieval pathways speech requires.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Minimal pairs in tone',
                brief: 'Show that tone is contrastive in Igbo using two pairs.',
                steps: [
                    'Choose pairs with identical segmental material: ákwá / àkwà.',
                    'Give the meaning of each: cry / bed.',
                    'Mark the tone on each syllable clearly.',
                    'Add a second pair to show the pattern is systematic: ịsị / ísì.',
                    'State the conclusion: tone is a phoneme in Igbo, so mispronunciation changes meaning.',
                ],
                takeaway: 'Segments identical, tones different, meanings different. That is a tonal minimal pair.',
            },
            {
                title: 'Using aspect instead of tense',
                brief: 'Explain the difference between "m na-aga" and "m gàrà".',
                steps: [
                    'Identify the pronoun: m (I).',
                    'Identify the aspect marker: na- marks progressive or habitual.',
                    'Identify the completed form: gàrà with the -rV suffix marks completed action.',
                    'Translate: "I am going / I go" versus "I went".',
                    'Note that English marks tense; Igbo marks aspect, which is why literal translation misleads.',
                ],
                takeaway: 'Translate meaning, not words. Aspect is not tense.',
            },
        ],
        examBank: [
            {
                question: 'Explain why Igbo is described as a tonal language, with examples.',
                marks: '15 marks',
                outline: [
                    'Define tone as pitch distinguishing lexical meaning.',
                    'Give two minimal pairs with tone marking.',
                    'Explain the consequence for pronunciation and for writing.',
                    'Note that tone also functions grammatically in some constructions.',
                ],
            },
            {
                question: 'Discuss the tension between standard Igbo and dialect diversity.',
                marks: '20 marks',
                outline: [
                    'Describe the dialect cluster and the need for a standard.',
                    'Explain the benefits: literacy, publishing, examinations, broadcasting.',
                    'Explain the costs: home varieties devalued, learners corrected against their own speech.',
                    'Show how both can be accommodated in education.',
                    'Conclude that standardisation is a tool, not a hierarchy.',
                ],
                trap: 'Presenting dialect as "incorrect" Igbo.',
            },
            {
                question: 'Describe the main institutions of authority in a traditional Igbo community.',
                marks: '15 marks',
                outline: [
                    'Family head and umunna.',
                    'Council of elders and the assembly.',
                    'Age grades and title societies.',
                    'Women\'s associations and their powers.',
                    'Shrines and oracles as judicial authority.',
                    'Conclude that authority was distributed, not absent.',
                ],
            },
        ],
        glossary: [
            { term: 'Tone', definition: 'Pitch used to distinguish word meaning, as in ákwá and àkwà.' },
            { term: 'Umunna', definition: 'The lineage group descended from a common ancestor, a basic political unit.' },
            { term: 'Ọkpara', definition: 'The first son, holding specific authority and obligations in the family.' },
            { term: 'Ọzọ', definition: 'A titled society conferring rank and responsibility.' },
            { term: 'Age grade', definition: 'A cohort of people born within a period, organised for civic duties.' },
            { term: 'Ọha', definition: 'The assembly of the community, where decisions are debated.' },
            { term: 'Bridewealth', definition: 'Goods or money given to formalise a marriage alliance between families.' },
            { term: 'Mmanwu', definition: 'Masquerade performance and the tradition surrounding it.' },
            { term: 'Iri Ji', definition: 'The New Yam Festival marking harvest and community renewal.' },
            { term: 'Aspect', definition: 'The grammatical marking of whether an action is complete, ongoing or habitual.' },
            { term: 'Dotted vowels', definition: 'The characters ị, ọ and ụ which represent distinct Igbo phonemes.' },
            { term: 'Syllabic nasal', definition: 'An n that carries its own syllable before a consonant.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Sounds', focus: 'Tone and vowels.', tasks: ['Learn the dotted vowels and their sounds.', 'Record ten tonal minimal pairs.', 'Practise greetings aloud daily.'] },
            { week: 'Week 2 - Grammar', focus: 'Pronouns and aspect.', tasks: ['Build ten sentences with na-.', 'Change them to completed aspect.', 'Note where English tense misleads.'] },
            { week: 'Week 3 - Culture', focus: 'Institutions.', tasks: ['Map your community\'s authority structures.', 'Describe one festival\'s functions.', 'Interview an elder about change.'] },
            { week: 'Week 4 - Writing', focus: 'Accuracy.', tasks: ['Write 300 words with correct dots and tones.', 'Check every tone against a speaker.', 'Answer a 15-mark question under time.'] },
        ],
        readingList: [
            'Any Igbo language course book covering orthography, tone and basic grammar.',
            'An ethnography of Igbo social and political organisation.',
            'A collection of Igbo proverbs with translations and contexts.',
        ],
    },

    'igb-101-introduction-to-igbo-studies': {
        sections: [
            {
                heading: 'A field defined by its objects of study',
                paragraphs: [
                    'Igbo studies examines the language, literature, history, religion, art and institutions of Igbo-speaking peoples. It is interdisciplinary by necessity: a question about masquerade requires performance studies and anthropology; a question about the novels of Achebe requires literary criticism and history; a question about land tenure requires law and economics.',
                    'The field has a history. Missionary linguistics produced the first grammars and dictionaries; colonial anthropology produced both useful description and distorting categories; nationalist scholarship from the mid-twentieth century recovered and defended Igbo institutions. Contemporary work is often self-critical about all three inheritances.',
                    'A student entering the field should be able to name its main sources: oral tradition, archaeological evidence, colonial archives, missionary records, Igbo-language texts, literature in English, and living practice.',
                ],
            },
            {
                heading: 'Oral tradition as evidence',
                paragraphs: [
                    'Oral tradition is not rumour. It is testimony transmitted with recognised conventions, and it can be evaluated: who transmits it, in what setting, with what constraints, and how it compares with independent evidence. Praise poetry, genealogies, proverbs, folktales and ritual formulae are different genres with different reliability profiles.',
                    'A genealogy may encode political claims rather than biological descent; a founding narrative may legitimise land rights. That does not make it false - it makes it evidence of how a community understands its past and its claims. Historians read it alongside archaeology and written records.',
                    'Collection requires method: record with consent, transcribe with a speaker, note the setting, the performer and the audience, and preserve the original language. Translating too early loses exactly the features that make the material evidence.',
                ],
                callout: {
                    title: 'Date your fieldwork',
                    body: 'Every oral source needs a date, a place, a named speaker and their relationship to the material. Without those four, the testimony cannot be assessed.',
                },
            },
            {
                heading: 'Debates that still shape the field',
                paragraphs: [
                    'The Nri-Awka-Igbo-Ukwu question concerns the origins and dating of early Igbo civilisation. Igbo-Ukwu bronze and copper objects, excavated from the ninth century onwards in dating terms, demonstrate advanced casting and trade long before European contact. Their interpretation has been part of a wider argument about African achievement and independent invention.',
                    'The Aro and the Atlantic slave trade; the warrant chief system and the Aba Women\'s War; the Biafra war and its memory; language shift and the survival of Igbo in urban diaspora - each is a research area with substantial literature and living political stakes.',
                    'The politics of naming runs through the field: "Igbo" as an ethnic label, the internal diversity it covers, and the relationship between Igbo identity and Nigerian citizenship. A good student distinguishes the analytic category from the political claim.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Evaluating an oral source',
                brief: 'An elder tells you your community was founded by a hunter from the east. How do you handle it?',
                steps: [
                    'Record the account in full with date, place, speaker and language.',
                    'Ask what the narrative does: does it establish land rights, ritual precedence, kinship with a neighbouring town?',
                    'Collect variant accounts from other families and note the differences.',
                    'Compare with any written or archaeological evidence.',
                    'Present the narrative as an account of origins and legitimacy, not as a proven migration route.',
                    'State what evidence would settle the question, and note whether it exists.',
                ],
                takeaway: 'Origins narratives are claims about present relationships as much as past events.',
            },
            {
                title: 'Answering a question on Igbo-Ukwu',
                brief: '"What is the significance of Igbo-Ukwu for the study of Igbo history?"',
                steps: [
                    'State the finds: bronze, copper and glass objects, ritual regalia, a burial chamber.',
                    'Give the dating and its implication: complex society and long-distance trade before European contact.',
                    'Explain the technical achievement: lost-wax casting and elaborate decoration.',
                    'Explain the historiographical significance: it refuted diffusionist assumptions about African innovation.',
                    'Note the limits: excavation was limited, interpretation contested, and much remains unpublished.',
                    'Conclude on how one site changed a discipline\'s assumptions.',
                ],
                takeaway: 'Evidence plus implication plus limitation. All three are needed.',
            },
        ],
        examBank: [
            {
                question: 'How should oral tradition be used as historical evidence?',
                marks: '20 marks',
                outline: [
                    'Define oral tradition and distinguish its genres.',
                    'Explain evaluation criteria: transmission, setting, interest of the teller.',
                    'Show the difference between factual and legitimising content.',
                    'Describe collection method: consent, transcription, dating, naming.',
                    'Conclude that oral tradition is evidence when handled methodologically.',
                ],
                trap: 'Treating oral tradition as either unimpeachable or worthless. Both are failures of method.',
            },
            {
                question: 'Discuss the significance of Igbo-Ukwu in African historiography.',
                marks: '15 marks',
                outline: [
                    'Describe the finds and dating.',
                    'Explain technical sophistication and trade networks.',
                    'Show how it undermined diffusionist assumptions.',
                    'Note interpretive debates and evidentiary limits.',
                ],
            },
        ],
        glossary: [
            { term: 'Oral tradition', definition: 'Testimony about the past transmitted by word of mouth with recognised conventions.' },
            { term: 'Igbo-Ukwu', definition: 'An archaeological site with ninth-century bronze and copper objects of high technical quality.' },
            { term: 'Lost-wax casting', definition: 'A metal-casting method using a wax model that is melted out before pouring.' },
            { term: 'Diffusionism', definition: 'The assumption that innovations spread from a single advanced source, often used to deny African originality.' },
            { term: 'Genealogy', definition: 'A recorded line of descent, sometimes encoding political claims.' },
            { term: 'Praise poetry', definition: 'Poetry naming and celebrating a person, lineage or place.' },
            { term: 'Nri', definition: 'A ritual and political system influential in north-western Igboland.' },
            { term: 'Aro', definition: 'A network centred on the Arochukwu oracle with wide economic and judicial reach.' },
            { term: 'Warrant chief', definition: 'A colonial appointee without traditional legitimacy.' },
            { term: 'Historiography', definition: 'The study of how history is written and interpreted.' },
            { term: 'Ethnography', definition: 'The description and analysis of a people\'s social life.' },
            { term: 'Language shift', definition: 'A community\'s replacement of its language by a dominant one.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Sources', focus: 'What counts as evidence.', tasks: ['List five kinds of Igbo studies source.', 'Note the limits of each.', 'Read one archaeological report summary.'] },
            { week: 'Week 2 - Orality', focus: 'Collection.', tasks: ['Record one account with permission.', 'Transcribe with a speaker.', 'Note date, place, speaker and audience.'] },
            { week: 'Week 3 - Historiography', focus: 'Debates.', tasks: ['Summarise the Igbo-Ukwu significance.', 'Explain diffusionism and its critique.', 'Trace one colonial institution\'s legacy.'] },
            { week: 'Week 4 - Essay', focus: 'Argument.', tasks: ['Plan a 20-mark answer.', 'Cite at least three sources.', 'Write under timed conditions.'] },
        ],
        readingList: [
            'An introduction to Igbo studies covering language, history and institutions.',
            'Published reports on the Igbo-Ukwu excavations.',
            'A methodological guide to collecting and using oral tradition.',
        ],
    },

    'melo-101-introduction-to-modern-european-languages': {
        sections: [
            {
                heading: 'Why a European language, and which one',
                paragraphs: [
                    'Modern European languages are studied in Nigeria for practical and scholarly reasons: diplomatic and trade relations, access to scholarship, translation, tourism, and the comparative study of language itself. French is the most widely taught because of Nigeria\'s francophone neighbours and regional bodies; German, Spanish, Portuguese, Russian and Arabic-related programmes exist with smaller cohorts.',
                    'Learning a language is not learning a code of translations. It is learning a system with its own categories: gender in French and German, case in German and Russian, aspect in Russian, the subjunctive as a living mood in French and Spanish. These are not decoration; they change what must be said and what can be left unsaid.',
                    'The comparison with Nigerian languages is genuinely illuminating. Learners who speak a tonal language often find European stress patterns easier; learners whose first language lacks grammatical gender find noun gender the hardest feature; learners from a language without articles find French partitives puzzling.',
                ],
            },
            {
                heading: 'The four skills and how to build them',
                paragraphs: [
                    'Listening, speaking, reading and writing develop unevenly and need separate practice. Reading can be built quickly with graded texts and a dictionary; listening requires repeated exposure to natural speed; speaking requires tolerating error; writing requires learning register and connectors.',
                    'Comprehensible input is the engine. Read and listen to material slightly above your level, repeatedly, with the aim of understanding rather than translating word by word. Grammar study then explains what you have already noticed, which is the opposite of the common classroom order and far more durable.',
                    'Vocabulary should be learned in chunks, not isolated words: "avoir besoin de", "es geht um", "tener ganas de". Chunks carry grammar and usage inside them, so they produce correct sentences earlier. Aim for high-frequency vocabulary first: the most common thousand words cover most everyday speech.',
                ],
                callout: {
                    title: 'Speak before you are ready',
                    body: 'Waiting until your grammar is correct guarantees you will not speak. Error correction is information, not humiliation - and in a foreign language it is how fluency is built.',
                },
            },
            {
                heading: 'Culture, register and translation',
                paragraphs: [
                    'Language carries social rules. French distinguishes tu and vous; German distinguishes du and Sie; Spanish varies between tú, usted and vos by region. Choosing wrongly is a social error even when the grammar is perfect. Learning when to use which form is part of the language.',
                    'Register matters in writing: a formal letter, an academic essay and a message to a friend use different structures and vocabulary. Learn the formulas early - salutations, closings, hedging phrases - because they are fixed and high-value.',
                    'Translation is a skill with its own discipline. A good translation preserves function rather than word order; idioms rarely transfer; and some cultural references need explanation rather than substitution. Never translate word by word, and always read the result as a text in the target language.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Building a first paragraph in the target language',
                brief: 'You must write 120 words about your studies in French, German or Spanish.',
                steps: [
                    'Collect five sentence frames rather than vocabulary: "Je suis étudiant(e) en...", "Depuis...", "Ce qui me plaît, c\'est...".',
                    'Fill each frame with content you can actually say.',
                    'Check gender and agreement for every noun and adjective.',
                    'Add two connectors appropriate to the register.',
                    'Read aloud and mark anything you cannot pronounce confidently.',
                    'Have it corrected once, then rewrite from memory.',
                ],
                takeaway: 'Frames plus accurate agreement produce usable writing faster than word lists.',
            },
            {
                title: 'Handling a listening exercise',
                brief: 'You understand nothing on first hearing. What is the method?',
                steps: [
                    'Listen once without stopping for the gist only - who is speaking, about what, in what mood.',
                    'Listen again and note the words you recognise, not the ones you do not.',
                    'Identify the type of text: announcement, interview, conversation, advertisement.',
                    'Answer the questions you can, then listen a third time for the specific missing details.',
                    'Check your answers against the transcript and locate why you missed each one.',
                ],
                takeaway: 'Gist first, detail second, transcript third. Never start with word-by-word decoding.',
            },
        ],
        examBank: [
            {
                question: 'Explain how grammatical gender affects learning a European language for a Nigerian learner.',
                marks: '15 marks',
                outline: [
                    'Define grammatical gender as a noun class system affecting agreement.',
                    'Explain the difficulty where the first language lacks gender.',
                    'Show the consequences: articles, adjectives, pronouns must agree.',
                    'Describe a learning strategy: learn the article with the noun.',
                    'Note that gender is largely arbitrary and cannot be guessed from meaning.',
                ],
            },
            {
                question: 'Discuss the relationship between language learning and cultural understanding.',
                marks: '20 marks',
                outline: [
                    'Give examples where grammar encodes social relations: tu/vous, du/Sie.',
                    'Show how politeness formulas differ.',
                    'Explain the risk of translating cultural concepts directly.',
                    'Argue that language learning is also learning a social system.',
                    'Conclude on the limits: fluency does not guarantee cultural competence.',
                ],
            },
        ],
        glossary: [
            { term: 'Grammatical gender', definition: 'A noun class system requiring agreement in articles, adjectives and pronouns.' },
            { term: 'Register', definition: 'The level of formality appropriate to situation and audience.' },
            { term: 'Comprehensible input', definition: 'Language slightly above the learner\'s level that can be understood from context.' },
            { term: 'Cognate', definition: 'A word related in form and meaning across languages.' },
            { term: 'False friend', definition: 'A word that looks similar across languages but means something different.' },
            { term: 'Subjunctive', definition: 'A verb mood expressing doubt, wish, necessity or emotion, productive in French and Spanish.' },
            { term: 'Case', definition: 'A system marking a noun\'s grammatical role, as in German and Russian.' },
            { term: 'Chunk', definition: 'A memorised multi-word unit used as a single building block.' },
            { term: 'Agreement', definition: 'Correspondence of gender, number or case between related words.' },
            { term: 'Tú / vous', definition: 'The familiar and formal second-person pronouns in French, used according to social relation.' },
            { term: 'Idiom', definition: 'A fixed expression whose meaning is not derivable from its parts.' },
            { term: 'Transliteration', definition: 'Representing words of one writing system in another\'s characters.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Sounds', focus: 'Pronunciation.', tasks: ['Learn the phoneme inventory of your target language.', 'Read aloud daily for five minutes.', 'Record and compare with a model speaker.'] },
            { week: 'Week 2 - Nouns', focus: 'Gender and articles.', tasks: ['Learn 50 nouns with their articles.', 'Practise agreement in short sentences.', 'Build a gender-grouped vocabulary list.'] },
            { week: 'Week 3 - Verbs', focus: 'Present and past.', tasks: ['Conjugate five core verbs.', 'Write ten sentences about your week.', 'Learn five high-frequency chunks.'] },
            { week: 'Week 4 - Text', focus: 'Reading and writing.', tasks: ['Read a graded text and summarise it.', 'Write 120 words on a familiar topic.', 'Check register and formulas.'] },
        ],
        readingList: [
            'Your course textbook for the target language, including its audio component.',
            'A bilingual dictionary with usage examples rather than word lists only.',
            'Graded readers at your level for extensive reading practice.',
        ],
    },
})

// ── Social science and professional primers ────────────────────────────────
Object.assign(THEATRE_FILM_DEPTH, {
    'edu-101-foundations-of-education': {
        sections: [
            {
                heading: 'What education is for: four competing answers',
                paragraphs: [
                    'Every education system rests on an answer to the question "what is education for?", and the answers conflict. The transmission answer says education passes on the knowledge and values a society needs. The developmental answer says it cultivates the whole person. The economic answer says it produces skills for employment and growth. The critical answer says it should equip people to question the society they inherit.',
                    'These are not compatible in practice. A curriculum designed for measurable skills crowds out time for open inquiry; a curriculum designed for critical consciousness may not produce the specific competencies employers demand. Recognising the conflict is the first analytic move in this course, because most policy debates are really arguments between these purposes.',
                    'Nigerian education policy carries all four at once. The National Policy on Education speaks of self-reliance, citizenship, scientific literacy and employability, and the tension between them is visible whenever funding, assessment or curriculum is discussed.',
                ],
            },
            {
                heading: 'The institutions and their history',
                paragraphs: [
                    'Formal education in Nigeria has three roots: indigenous education (apprenticeship, oral instruction, age-grade training, moral formation), Islamic education (Qur\'anic schools and later scholarship), and Western missionary schooling from the mid-nineteenth century. Each had its own curriculum, its own authority and its own purposes, and their interaction shaped the modern system.',
                    'The 6-3-3-4 structure introduced in the 1980s, later revised toward 9-3-4, defines primary, junior secondary, senior secondary and tertiary stages. Understanding the structure matters because each transition is an examination gate, and the gates determine who continues.',
                    'Access has expanded dramatically since independence, but quality and equity have not kept pace. Out-of-school children, teacher supply, infrastructure, and the rural-urban gap are structural problems, not individual failures.',
                ],
                callout: {
                    title: 'Policy is a set of trade-offs',
                    body: 'When you evaluate a policy, name what it gains and what it costs. A policy with no costs is a slogan.',
                },
            },
            {
                heading: 'Teachers, learners and the classroom',
                paragraphs: [
                    'Educational psychology supplies the working knowledge a teacher needs: how attention and memory operate, why spaced practice beats cramming, how motivation differs between intrinsic and extrinsic forms, and why feedback that names the next step is more effective than a grade alone.',
                    'Classroom management is not discipline. It is the design of routines, expectations and physical arrangements that make learning possible. A well-managed classroom has predictable procedures, visible purposes and a teacher who notices individuals.',
                    'Assessment has two functions that are often confused: assessment of learning (summative, for reporting) and assessment for learning (formative, to guide the next step). A system that uses only the first turns education into a ranking exercise and loses most of its diagnostic power.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Evaluating a policy claim',
                brief: 'A state announces free primary education. Assess the claim.',
                steps: [
                    'Define "free": no fees, or no fees plus no levies, uniforms and materials?',
                    'Identify the funding source and whether it is recurrent or one-off.',
                    'Predict the enrolment effect and the capacity response: classrooms, teachers, materials.',
                    'Identify the quality risk: overcrowding and teacher workload.',
                    'Name the equity effect: which children are still excluded - girls, disabled children, rural households?',
                    'Conclude with what evidence would show the policy succeeded.',
                ],
                takeaway: 'Define the term, follow the money, predict the response, name the excluded.',
            },
            {
                title: 'Turning a theory into a classroom decision',
                brief: 'Apply spaced practice to a two-week revision period.',
                steps: [
                    'Identify the material to be retained.',
                    'Divide it into four units rather than one block.',
                    'Schedule short revisits at increasing intervals rather than one long cram.',
                    'Include retrieval practice: closed-book recall, not rereading.',
                    'Build in feedback that corrects errors immediately.',
                    'Measure retention at the end by testing the earliest unit.',
                ],
                takeaway: 'Theory earns its place when it changes what you do on Monday.',
            },
        ],
        examBank: [
            {
                question: 'Discuss the competing purposes of education and their implications for curriculum.',
                marks: '20 marks',
                outline: [
                    'Name the four purposes: transmission, development, economic, critical.',
                    'Explain what each implies for content and assessment.',
                    'Show two concrete tensions.',
                    'Relate to Nigerian policy language.',
                    'Conclude that curriculum is a negotiated compromise, not a neutral selection.',
                ],
            },
            {
                question: 'Distinguish assessment of learning from assessment for learning.',
                marks: '10 marks',
                outline: [
                    'Define summative and formative functions.',
                    'Give one example of each in a classroom.',
                    'Explain the consequence of using only summative assessment.',
                ],
            },
        ],
        glossary: [
            { term: 'Curriculum', definition: 'The planned content, sequence and assessment of a course of study.' },
            { term: 'Pedagogy', definition: 'The method and theory of teaching.' },
            { term: 'Indigenous education', definition: 'Learning through apprenticeship, oral instruction and community participation.' },
            { term: 'Formative assessment', definition: 'Assessment used to guide the next step in learning.' },
            { term: 'Summative assessment', definition: 'Assessment used to report achievement at the end of a period.' },
            { term: 'Spaced practice', definition: 'Distributing study over time rather than massing it.' },
            { term: 'Retrieval practice', definition: 'Recalling information from memory to strengthen retention.' },
            { term: 'Intrinsic motivation', definition: 'Engagement driven by interest or satisfaction in the activity itself.' },
            { term: 'Equity', definition: 'Fairness in access and outcomes, accounting for different starting points.' },
            { term: '6-3-3-4', definition: 'The Nigerian education structure of six primary, three junior secondary, three senior secondary and four tertiary years.' },
            { term: 'Hidden curriculum', definition: 'Lessons transmitted through school routines and expectations rather than formal content.' },
            { term: 'Self-reliance', definition: 'A stated aim of Nigerian education emphasising practical and entrepreneurial capability.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Purposes', focus: 'Aims.', tasks: ['Write the four purposes in your own words.', 'Find each in the national policy.', 'Identify one conflict.'] },
            { week: 'Week 2 - History', focus: 'Institutions.', tasks: ['Timeline the three roots of Nigerian education.', 'Explain one missionary legacy.', 'Map the 6-3-3-4 stages.'] },
            { week: 'Week 3 - Learning', focus: 'Psychology applied.', tasks: ['Design a spaced revision plan.', 'Write three formative questions.', 'Plan feedback that names the next step.'] },
            { week: 'Week 4 - Policy', focus: 'Evaluation.', tasks: ['Assess one real policy claim.', 'Name the excluded group.', 'Write a 20-mark answer.'] },
        ],
        readingList: [
            'The current Nigerian National Policy on Education.',
            'An introduction to the sociology and philosophy of education.',
            'A text on educational psychology covering memory, motivation and assessment.',
        ],
    },

    'psy-101-introduction-to-psychology': {
        sections: [
            {
                heading: 'Psychology as a science of behaviour and mind',
                paragraphs: [
                    'Psychology studies behaviour and mental processes using empirical methods. Its authority comes from method, not from intuition: a claim about memory, emotion or personality must be testable and must survive attempts to falsify it. This is why psychology is a science subject with statistics in the curriculum, not a branch of philosophy.',
                    'The main perspectives each explain part of the picture. Biological approaches examine brain, genes and hormones. Cognitive approaches model attention, memory and problem-solving as information processing. Behavioural approaches study observable responses to environment. Psychodynamic approaches examine unconscious conflict. Humanistic approaches emphasise growth and meaning. Social approaches study how presence of others changes behaviour.',
                    'No single perspective explains everything, and a good answer uses more than one while stating what each leaves out.',
                ],
            },
            {
                heading: 'Research methods and why they matter',
                paragraphs: [
                    'Experiments manipulate an independent variable and measure a dependent variable while controlling confounds, which allows causal claims. Correlational studies measure relationships without manipulation, which does not. The most common error in student work - and in journalism - is treating a correlation as a cause.',
                    'Sampling determines what a result can be generalised to. A study of fifty first-year students in one department supports conclusions about that group, and only cautiously about others. Replication is what turns a finding into knowledge.',
                    'Ethics is not paperwork. Informed consent, avoidance of harm, confidentiality, the right to withdraw, and careful debriefing where deception was used are conditions of doing the research at all.',
                ],
                callout: {
                    title: 'Correlation is not causation',
                    body: 'Ice-cream sales and drowning rise together. Both follow temperature. Before accepting a causal claim, ask what third variable could produce both.',
                },
            },
            {
                heading: 'Core findings worth knowing',
                paragraphs: [
                    'Memory is reconstructive, not a recording. Recall is shaped by schemas, and confident memory can be wrong; eyewitness identification is therefore weaker evidence than courts once assumed. Spacing and retrieval strengthen memory more than rereading.',
                    'Classical conditioning pairs a neutral stimulus with an unconditioned one until the neutral stimulus elicits the response; operant conditioning shapes behaviour through reinforcement and punishment. Both explain far more of everyday habit than people expect.',
                    'Social psychology documents conformity, obedience, bystander effects and attribution biases. These findings are uncomfortable because they locate the cause of behaviour in situations rather than character, which is why they are frequently misused to excuse individuals. A careful answer distinguishes explanation from excuse.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Designing a simple experiment',
                brief: 'Test whether background music affects reading comprehension.',
                steps: [
                    'State the hypothesis with a direction.',
                    'Define the independent variable: silence, music with lyrics, instrumental music.',
                    'Define the dependent variable: score on the same comprehension test.',
                    'Assign participants randomly to conditions.',
                    'Control confounds: same text, same time of day, same duration, headphones at equal volume.',
                    'Analyse the group means and report the limitation: one session, one text, small sample.',
                ],
                takeaway: 'Random assignment, one changed variable, defined measure. That is an experiment.',
            },
            {
                title: 'Reading a study report critically',
                brief: 'A headline says "students who sleep less score higher". Assess it.',
                steps: [
                    'Find the design: correlational or experimental?',
                    'Check the sample: who, how many, where?',
                    'Look for confounds: study habits, course difficulty, part-time work.',
                    'Check the effect size, not just significance.',
                    'Ask whether the direction could be reversed - poor performance causing stress and less sleep.',
                    'State what the study can and cannot support.',
                ],
                takeaway: 'Design, sample, confounds, effect size, direction. Five questions for any headline.',
            },
        ],
        examBank: [
            {
                question: 'Distinguish experimental from correlational designs and the claims each permits.',
                marks: '15 marks',
                outline: [
                    'Define manipulation and control in experiments.',
                    'Explain why correlation cannot establish causation.',
                    'Give an example of each design.',
                    'State the role of random assignment and third variables.',
                ],
            },
            {
                question: 'Explain reconstructive memory and its implications for eyewitness testimony.',
                marks: '15 marks',
                outline: [
                    'Define reconstructive memory and schemas.',
                    'Describe the misinformation effect with a study example.',
                    'Show the implication: confidence and accuracy diverge.',
                    'State procedural safeguards: lineups, blind administration, caution in courts.',
                ],
            },
        ],
        glossary: [
            { term: 'Independent variable', definition: 'The factor an experimenter manipulates.' },
            { term: 'Dependent variable', definition: 'The outcome measured in an experiment.' },
            { term: 'Confound', definition: 'An uncontrolled factor that could explain the result.' },
            { term: 'Random assignment', definition: 'Allocating participants to conditions by chance to reduce bias.' },
            { term: 'Correlation', definition: 'A statistical relationship between two variables, not evidence of causation.' },
            { term: 'Replication', definition: 'Repeating a study to test whether a finding holds.' },
            { term: 'Schema', definition: 'A mental framework that organises knowledge and shapes recall.' },
            { term: 'Classical conditioning', definition: 'Learning in which a neutral stimulus comes to elicit a response through pairing.' },
            { term: 'Operant conditioning', definition: 'Learning shaped by reinforcement and punishment of behaviour.' },
            { term: 'Bystander effect', definition: 'Reduced helping when others are present.' },
            { term: 'Informed consent', definition: 'Agreement to participate given with knowledge of risks and purpose.' },
            { term: 'Effect size', definition: 'The magnitude of a difference or relationship, distinct from statistical significance.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Perspectives', focus: 'Explanatory frames.', tasks: ['Summarise six perspectives in one line each.', 'Explain one behaviour from three perspectives.', 'State what each leaves out.'] },
            { week: 'Week 2 - Methods', focus: 'Design.', tasks: ['Identify design in three abstracts.', 'Design a simple experiment.', 'List five confounds you controlled.'] },
            { week: 'Week 3 - Findings', focus: 'Memory and learning.', tasks: ['Explain reconstructive memory.', 'Apply spacing and retrieval to your own study.', 'Describe one conditioning example from daily life.'] },
            { week: 'Week 4 - Critique', focus: 'Evidence.', tasks: ['Assess one media psychology claim.', 'Check sample and design.', 'Write a 15-mark timed answer.'] },
        ],
        readingList: [
            'Any introductory psychology textbook covering methods, memory, learning and social psychology.',
            'A research methods chapter on experimental design and ethics.',
            'A review article on the misinformation effect.',
        ],
    },

    'mac-101-introduction-to-mass-communication': {
        sections: [
            {
                heading: 'The models that explain the field',
                paragraphs: [
                    'Mass communication studies how messages reach large, dispersed audiences through media institutions. The classic transmission model - source, encoding, message, channel, noise, decoding, receiver, feedback - is useful for identifying where communication fails, but it treats meaning as something sent rather than negotiated.',
                    'The alternative is the cultural or ritual model, which treats communication as the construction of shared meaning. A broadcast does not simply deliver information; it produces a way of seeing. Understanding both models lets you analyse a news report as simultaneously a transmission of facts and a ritual reaffirming what a society treats as important.',
                    'Gatekeeping explains why some events become news and others do not. Editors, producers and platforms select, and their selection follows news values: proximity, prominence, consequence, novelty, conflict, human interest. These values are not natural; they are conventions that can be studied and criticised.',
                ],
            },
            {
                heading: 'Media effects and audience agency',
                paragraphs: [
                    'Early models assumed powerful, direct effects - the hypodermic needle. Later research found limited effects, with audiences filtering messages through existing beliefs and group affiliations. The two-step flow model proposed that opinion leaders mediate media influence; cultivation theory argued that repeated exposure shapes perceptions of reality; agenda-setting argued that media tell us what to think about, not what to think.',
                    'The current consensus is neither omnipotence nor harmlessness. Effects depend on the message, the audience, the context and the repetition. Uses and gratifications theory reframes the question by asking what audiences do with media rather than what media do to audiences.',
                    'Digital platforms complicate all of this. Algorithms select content at scale, engagement metrics reward emotional content, and misinformation spreads because it is shareable rather than because it is persuasive. Media literacy - verifying sources, checking claims, understanding platform incentives - has become a basic civic skill.',
                ],
                callout: {
                    title: 'Follow the incentive',
                    body: 'Ask who is paid, and for what. Advertising-funded media optimise attention; subscription media optimise retention; public media optimise legitimacy. The business model explains more than the editorial statement.',
                },
            },
            {
                heading: 'The Nigerian media landscape',
                paragraphs: [
                    'Nigerian media includes a large and vibrant press, dozens of television stations, hundreds of radio stations (the most trusted medium in much of the country), a dominant film industry, and an enormous social media sector. Radio\'s reach in local languages makes it the most important medium for rural information.',
                    'Press freedom is contested. Reporting on corruption, security and politics carries risk, and journalists face legal pressure, harassment and worse. Ownership matters: media owned by political or business interests report within limits that are rarely stated.',
                    'The regulatory environment includes the National Broadcasting Commission, which licenses stations and enforces a broadcasting code, and various press bodies. Understanding the difference between statutory regulation, self-regulation and platform governance is examinable.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Analysing a news story',
                brief: 'Take one front-page story and analyse it as a communication act.',
                steps: [
                    'Identify the source: who is quoted, who is not, and who benefits from the framing.',
                    'Identify the news values that made it a story.',
                    'Note what is in the lead paragraph and what is buried.',
                    'Identify the assumed reader: what does the story expect you to already know or feel?',
                    'Look for loaded vocabulary that carries evaluation.',
                    'State what alternative framing would have been possible.',
                ],
                takeaway: 'Framing is visible in what is quoted, what is placed first, and which words carry evaluation.',
            },
            {
                title: 'Evaluating a viral claim',
                brief: 'A screenshot circulates claiming a policy change. Assess it in five minutes.',
                steps: [
                    'Identify the original source and whether it exists.',
                    'Check the date - old content recirculates.',
                    'Search for the same claim from an independent outlet.',
                    'Check whether the image is cropped or edited.',
                    'Assess the incentive of whoever first shared it.',
                    'Report your confidence level rather than a verdict.',
                ],
                takeaway: 'Source, date, corroboration, editing, incentive. Five checks, five minutes.',
            },
        ],
        examBank: [
            {
                question: 'Compare the transmission and cultural models of communication.',
                marks: '15 marks',
                outline: [
                    'Transmission: linear transfer, noise, feedback, focus on accuracy.',
                    'Cultural: meaning negotiated, ritual, shared frames.',
                    'Apply both to one broadcast.',
                    'Explain what each model cannot explain.',
                ],
            },
            {
                question: 'Discuss the claim that audiences are active rather than passive.',
                marks: '20 marks',
                outline: [
                    'Set out the direct-effects position.',
                    'Present evidence for limited effects and selectivity.',
                    'Use uses and gratifications theory.',
                    'Acknowledge algorithmic influence and platform power.',
                    'Conclude that activity is constrained, not free.',
                ],
                trap: 'Choosing pure passivity or pure agency. The marks are in the constraint.',
            },
        ],
        glossary: [
            { term: 'Gatekeeping', definition: 'The selection process deciding which events become news.' },
            { term: 'News values', definition: 'Criteria such as proximity, prominence and conflict that shape selection.' },
            { term: 'Agenda-setting', definition: 'The media\'s influence over which issues audiences consider important.' },
            { term: 'Cultivation', definition: 'The shaping of perceptions through repeated exposure to media content.' },
            { term: 'Two-step flow', definition: 'Influence passing from media to opinion leaders and then to others.' },
            { term: 'Uses and gratifications', definition: 'A theory explaining media use by the needs audiences seek to satisfy.' },
            { term: 'Framing', definition: 'Selecting and emphasising aspects of an issue to promote an interpretation.' },
            { term: 'Encoding and decoding', definition: 'Producing meaning in a message and interpreting it, which may diverge.' },
            { term: 'Media literacy', definition: 'The ability to access, analyse, evaluate and produce media messages.' },
            { term: 'Public sphere', definition: 'The space where citizens debate matters of common concern.' },
            { term: 'Self-regulation', definition: 'Media governing itself through codes and councils rather than statute.' },
            { term: 'Concentration of ownership', definition: 'Few owners controlling many outlets, reducing diversity of voice.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Models', focus: 'Frameworks.', tasks: ['Draw the transmission model.', 'Explain its limits.', 'Re-read one story through the cultural model.'] },
            { week: 'Week 2 - Selection', focus: 'Gatekeeping.', tasks: ['List news values found in five stories.', 'Identify one buried fact.', 'Interview someone about what they think is missing.'] },
            { week: 'Week 3 - Effects', focus: 'Audiences.', tasks: ['Summarise three effects theories.', 'Apply uses and gratifications to your own media use.', 'Trace one viral claim.'] },
            { week: 'Week 4 - Context', focus: 'Nigeria.', tasks: ['Map ownership of three outlets.', 'Explain the regulatory framework.', 'Write a 15-mark answer.'] },
        ],
        readingList: [
            'Any introduction to mass communication covering models, effects and news values.',
            'A media and society text with African case studies.',
            'A guide to verifying claims and sources for journalism students.',
        ],
    },

    'law-101-nigerian-legal-system': {
        sections: [
            {
                heading: 'Sources of Nigerian law',
                paragraphs: [
                    'Nigerian law comes from several sources that operate together: the Constitution, legislation, English common law and doctrines of equity received at a cut-off date, customary law, Islamic law in the northern states, and judicial precedent. Each has its own scope, and conflicts between them are resolved by hierarchy and by validity tests.',
                    'The Constitution is supreme; any law inconsistent with it is void to the extent of the inconsistency. Legislation follows a defined process - bill, readings, committee, assent - and must be published to take effect. English common law and equity apply as received, but only where no Nigerian legislation covers the point.',
                    'Customary law applies where it is the appropriate law for the parties and is not repugnant to natural justice, equity and good conscience, nor incompatible with existing legislation. That repugnancy doctrine is itself controversial: it measures African custom against a foreign standard, and its application has produced both protection and distortion.',
                ],
            },
            {
                heading: 'Court structure and jurisdiction',
                paragraphs: [
                    'The superior courts are the Supreme Court, the Court of Appeal, the Federal High Court, the State High Courts, the National Industrial Court and the Sharia Courts of Appeal and Customary Courts of Appeal in the states that have them. Below them are magistrates\' courts, district and area courts, and customary courts. Jurisdiction is the legal power to hear a matter, and it depends on subject matter, geography, parties and the value of the claim.',
                    'Appeals generally run from trial courts to the Court of Appeal and then to the Supreme Court, with limits on which matters may go further. Time limits for appeals are strict; missing them can end a case regardless of its merits.',
                    'The separation of powers matters practically. Courts interpret; the legislature enacts; the executive implements. Unlawful executive action can be challenged in court by judicial review, though the remedy is only as effective as compliance with it.',
                ],
                callout: {
                    title: 'Jurisdiction before merits',
                    body: 'A court without jurisdiction cannot decide anything else, however good the arguments. Always ask first: is this the right court?',
                },
            },
            {
                heading: 'Precedent and the legal method',
                paragraphs: [
                    'The doctrine of stare decisis requires courts to follow decisions of higher courts on the same point. A decision contains a ratio decidendi - the principle necessary to the outcome - and obiter dicta, remarks not necessary and therefore not binding. Distinguishing a case means showing that its material facts differ, so its ratio does not apply.',
                    'The legal method taught in this course is a structure: state the issue, state the rule and its source, apply the rule to the facts, and conclude. IRAC works because it forces you to separate what the law is from what you think about the facts.',
                    'Reading a case means identifying parties, facts, issues, holding, reasoning and any dissenting opinion. Citation conventions matter: a case reference identifies the parties, the volume, the report series and the page. Sloppy citation undermines otherwise sound work.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Applying IRAC to a short problem',
                brief: 'A landlord locks a tenant out without notice after two months of unpaid rent. Work through the issue.',
                steps: [
                    'Issue: was the landlord entitled to take possession without a court order?',
                    'Rule: recovery of possession of premises is regulated; self-help eviction is unlawful, and the appropriate procedure is an action in court.',
                    'Application: locking out the tenant is self-help, regardless of the arrears.',
                    'Further issue: the unpaid rent gives a right to claim arrears and to terminate in accordance with the tenancy, not to remove the tenant by force.',
                    'Conclusion: the eviction is unlawful and the tenant may seek re-entry and damages.',
                    'Note the sources you would cite and the court with jurisdiction.',
                ],
                takeaway: 'State the rule and its source before applying it. Conclusion follows from the rule, not from sympathy.',
            },
            {
                title: 'Distinguishing a precedent',
                brief: 'A precedent holds that a contract signed under duress is voidable. Your case involves pressure from a third party.',
                steps: [
                    'State the precedent\'s ratio: pressure by a contracting party vitiates consent.',
                    'Identify the material fact in your case: the pressure came from outside the contract.',
                    'Argue that the ratio does not cover third-party pressure.',
                    'Cite authority on third-party duress if available.',
                    'Acknowledge the counter-argument that the test is overborne will.',
                    'Conclude on whether the precedent binds.',
                ],
                takeaway: 'Distinguishing works on material facts. Name the fact that matters and explain why.',
            },
        ],
        examBank: [
            {
                question: 'Discuss the sources of Nigerian law and how conflicts between them are resolved.',
                marks: '20 marks',
                outline: [
                    'List the sources and their constitutional or statutory basis.',
                    'Explain supremacy of the Constitution.',
                    'Explain the repugnancy test and its criticisms.',
                    'Give an example of a hierarchy conflict and its resolution.',
                    'Conclude on the plural character of the system.',
                ],
            },
            {
                question: 'Explain ratio decidendi and obiter dictum, and why the distinction matters.',
                marks: '10 marks',
                outline: [
                    'Define both.',
                    'Explain that only the ratio binds.',
                    'Show how distinguishing operates on the ratio.',
                    'Note the difficulty of identifying the ratio in a multi-judge decision.',
                ],
            },
        ],
        glossary: [
            { term: 'Ratio decidendi', definition: 'The legal principle necessary to a court\'s decision, which binds lower courts.' },
            { term: 'Obiter dictum', definition: 'A remark not necessary to the decision, and therefore not binding.' },
            { term: 'Stare decisis', definition: 'The doctrine that courts follow higher courts\' decisions on the same point.' },
            { term: 'Jurisdiction', definition: 'A court\'s legal power to hear a particular matter.' },
            { term: 'Judicial review', definition: 'Court scrutiny of the legality of administrative action.' },
            { term: 'Repugnancy doctrine', definition: 'The test that customary law must not offend natural justice, equity and good conscience.' },
            { term: 'Common law', definition: 'Judge-made law received from English practice and applied where not superseded.' },
            { term: 'Equity', definition: 'A body of principles supplementing common law to prevent injustice.' },
            { term: 'Precedent', definition: 'A prior decision used as authority for deciding a later similar case.' },
            { term: 'IRAC', definition: 'Issue, Rule, Application, Conclusion - a structure for legal problem answers.' },
            { term: 'Customary law', definition: 'Law derived from the accepted customs of a community.' },
            { term: 'Separation of powers', definition: 'The division of governmental functions among legislature, executive and judiciary.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Sources', focus: 'Hierarchy.', tasks: ['List sources and rank them.', 'Read the supremacy provision.', 'Explain the repugnancy test and one criticism.'] },
            { week: 'Week 2 - Courts', focus: 'Jurisdiction.', tasks: ['Draw the court hierarchy.', 'Match five disputes to the correct court.', 'Note appeal time limits.'] },
            { week: 'Week 3 - Cases', focus: 'Reading judgments.', tasks: ['Brief one reported case.', 'Extract the ratio.', 'Identify one obiter remark.'] },
            { week: 'Week 4 - Method', focus: 'IRAC.', tasks: ['Answer two problem questions.', 'Cite sources properly.', 'Check that application follows the rule.'] },
        ],
        readingList: [
            'The Constitution of the Federal Republic of Nigeria (as amended).',
            'An introduction to Nigerian legal system covering sources and court structure.',
            'A casebook of Nigerian authorities on precedent and jurisdiction.',
        ],
    },
})

// ── Science foundations ───────────────────────────────────────────────────
Object.assign(THEATRE_FILM_DEPTH, {
    'bio-101-introduction-to-biology': {
        sections: [
            {
                heading: 'The levels of organisation',
                paragraphs: [
                    'Biology studies living systems at every scale: molecules, organelles, cells, tissues, organs, organisms, populations, communities and ecosystems. The same question - how is this organised and how does it maintain itself - gets a different answer at each level, and part of learning the subject is knowing which level a question belongs to.',
                    'The unifying ideas are few and powerful: cells are the basic unit of life; all living things use the same molecular machinery (DNA, RNA, proteins, ATP); structure and function are related at every level; and evolution by natural selection explains both diversity and similarity.',
                    'A cell is not a bag. It is compartmentalised: the membrane regulates exchange, the nucleus holds genetic material in eukaryotes, mitochondria generate ATP, ribosomes make protein, and the endomembrane system moves material. Prokaryotes lack membrane-bound organelles and are nonetheless biochemically sophisticated.',
                ],
            },
            {
                heading: 'Information, energy and inheritance',
                paragraphs: [
                    'DNA stores information in a four-letter code; transcription produces RNA; translation produces protein. The genetic code is nearly universal, which is itself evidence of common ancestry. Mutations alter the sequence, and their consequences range from silent to lethal.',
                    'Energy flow follows thermodynamics. Photosynthesis captures light energy and converts it into chemical bonds; cellular respiration releases that energy as ATP. ATP is the currency, not the store. Enzymes lower activation energy without changing the equilibrium, and their activity depends on temperature, pH and substrate concentration.',
                    'Inheritance follows Mendelian ratios for simple traits, with complications that are now standard: incomplete dominance, codominance, multiple alleles, linked genes, polygenic traits and environmental effects. Most real traits are not one-gene-one-trait.',
                ],
                callout: {
                    title: 'Structure predicts function',
                    body: 'For any biological structure you are asked to describe, ask what the shape allows and what it prevents. This single habit answers most "explain the significance" questions.',
                },
            },
            {
                heading: 'Ecology, evolution and the Nigerian context',
                paragraphs: [
                    'Evolution by natural selection requires variation, heritability and differential reproductive success. It is both a historical account of life\'s diversification and a mechanism operating in the present, visible in antibiotic resistance and in crop pest adaptation.',
                    'Ecology studies interactions between organisms and environment: competition, predation, parasitism, mutualism and succession. Nutrient cycling and energy flow explain why ecosystems have limits. Human activity - habitat loss, pollution, overexploitation, climate change - is now the dominant driver of biodiversity loss.',
                    'Nigeria\'s biological context is distinctive: rainforest and savanna, high endemism in some taxa, and severe pressures from deforestation, wetlands loss and urban expansion. Local examples make exam answers stronger than generic ones.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Following a genetic cross',
                brief: 'Two heterozygous tall pea plants (Tt) are crossed. Predict the offspring.',
                steps: [
                    'Identify the alleles: T dominant (tall), t recessive (short).',
                    'Write the gametes each parent can produce: T and t.',
                    'Construct a Punnett square: TT, Tt, Tt, tt.',
                    'State the genotypic ratio: 1 TT : 2 Tt : 1 tt.',
                    'State the phenotypic ratio: 3 tall : 1 short.',
                    'Note the assumption: independent assortment and no lethality.',
                ],
                takeaway: 'Gametes first, square second, both ratios third. State assumptions.',
            },
            {
                title: 'Explaining an experimental result',
                brief: 'An enzyme\'s rate rises with temperature to 40 degrees then falls sharply. Explain.',
                steps: [
                    'State the relationship: kinetic energy increases collisions up to an optimum.',
                    'Explain the rise: more frequent effective collisions between enzyme and substrate.',
                    'Explain the fall: denaturation of the active site above the optimum.',
                    'Distinguish reversible slowing from irreversible denaturation.',
                    'Note that the optimum is specific to the enzyme and its environment.',
                ],
                takeaway: 'Two mechanisms, opposite directions. Name both and where the switch occurs.',
            },
        ],
        examBank: [
            {
                question: 'Explain how the structure of the cell membrane relates to its functions.',
                marks: '15 marks',
                outline: [
                    'Describe the phospholipid bilayer and embedded proteins.',
                    'Explain selective permeability.',
                    'Distinguish diffusion, facilitated diffusion and active transport.',
                    'Link each function to a structural feature.',
                ],
            },
            {
                question: 'Discuss the evidence for evolution by natural selection.',
                marks: '20 marks',
                outline: [
                    'State the mechanism and its three requirements.',
                    'Fossil evidence and transitional forms.',
                    'Comparative anatomy and homologous structures.',
                    'Molecular evidence: universal code, sequence similarity.',
                    'Observed contemporary evolution: resistance.',
                    'Address one objection and its reply.',
                ],
            },
        ],
        glossary: [
            { term: 'Eukaryote', definition: 'An organism whose cells contain membrane-bound organelles and a nucleus.' },
            { term: 'Prokaryote', definition: 'An organism lacking a membrane-bound nucleus and organelles.' },
            { term: 'ATP', definition: 'Adenosine triphosphate, the cell\'s energy-transfer molecule.' },
            { term: 'Enzyme', definition: 'A protein catalyst that lowers activation energy for a reaction.' },
            { term: 'Denaturation', definition: 'Loss of a protein\'s functional shape through heat, pH or chemical action.' },
            { term: 'Allele', definition: 'One of the variant forms of a gene.' },
            { term: 'Genotype', definition: 'The genetic makeup of an organism at a locus.' },
            { term: 'Phenotype', definition: 'The observable characteristics produced by genotype and environment.' },
            { term: 'Natural selection', definition: 'Differential reproductive success of heritable variants.' },
            { term: 'Homeostasis', definition: 'Maintenance of a stable internal environment despite external change.' },
            { term: 'Trophic level', definition: 'A feeding position in a food chain.' },
            { term: 'Endemism', definition: 'The condition of a species being native to a single region and found nowhere else.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Cells', focus: 'Structure and function.', tasks: ['Draw and label a eukaryotic cell.', 'Match five organelles to functions.', 'Compare prokaryote and eukaryote.'] },
            { week: 'Week 2 - Biochemistry', focus: 'Energy and enzymes.', tasks: ['Summarise photosynthesis and respiration.', 'Explain enzyme kinetics with a graph.', 'State two factors affecting enzyme activity.'] },
            { week: 'Week 3 - Genetics', focus: 'Inheritance.', tasks: ['Solve five monohybrid crosses.', 'Explain one non-Mendelian case.', 'Describe a mutation and its effect.'] },
            { week: 'Week 4 - Ecology', focus: 'Systems.', tasks: ['Draw a food web from a local habitat.', 'Explain one nutrient cycle.', 'Describe one local conservation pressure.'] },
        ],
        readingList: [
            'Any first-year biology textbook covering cell biology, genetics and ecology.',
            'A genetics chapter with worked monohybrid and dihybrid problems.',
            'A Nigerian ecology or conservation source for local examples.',
        ],
    },

    'chm-101-general-chemistry': {
        sections: [
            {
                heading: 'Atoms, moles and stoichiometry',
                paragraphs: [
                    'Chemistry is quantitative. The mole is the bridge between the microscopic and the measurable: one mole contains Avogadro\'s number of particles, and its mass in grams equals the relative molecular mass. Almost every calculation in first-year chemistry runs through the mole.',
                    'Stoichiometry uses the balanced equation as a ratio machine. Balance first, convert masses to moles, apply the ratio from the coefficients, convert back to the requested quantity. The limiting reagent is the one that runs out first, and it determines the maximum yield; percentage yield compares what you got with that maximum.',
                    'The empirical formula comes from percentage composition, the molecular formula from the molar mass. These are routine calculations, and marks are lost mainly through unit errors and unrounded intermediate values.',
                ],
            },
            {
                heading: 'Bonding and structure',
                paragraphs: [
                    'Ionic bonding transfers electrons between atoms with large electronegativity difference, producing a lattice held by electrostatic attraction. Covalent bonding shares electrons, producing discrete molecules or giant structures. Metallic bonding delocalises electrons across a lattice, which explains conductivity and malleability.',
                    'Intermolecular forces - London dispersion, dipole-dipole and hydrogen bonding - determine boiling point, solubility and viscosity. This is why water, with hydrogen bonding, boils far above hydrogen sulphide despite a similar shape, and why ice floats.',
                    'VSEPR theory predicts molecular shape from electron-pair repulsion: pairs arrange to minimise repulsion, lone pairs repel more strongly than bonding pairs. Shape determines polarity, and polarity determines physical behaviour and reactivity.',
                ],
                callout: {
                    title: 'Balance before you calculate',
                    body: 'An unbalanced equation will produce a confidently wrong answer. Check atom counts, then charges.',
                },
            },
            {
                heading: 'Equilibria, acids and redox',
                paragraphs: [
                    'Reversible reactions reach dynamic equilibrium where forward and reverse rates are equal. Le Chatelier\'s principle predicts the direction of response to concentration, pressure and temperature changes; it does not predict the rate, and it does not tell you how fast equilibrium is reached.',
                    'Acids and bases are described by Brønsted-Lowry proton transfer and by Lewis electron-pair donation. pH is the negative logarithm of hydrogen ion concentration, and buffer solutions resist pH change because they contain a conjugate pair in comparable amounts.',
                    'Redox reactions involve changes in oxidation state. Assigning oxidation numbers correctly is the key skill; balancing redox equations in acidic or basic solution requires adding water and hydrogen ions in the correct order.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'A limiting reagent calculation',
                brief: 'You react 4.6 g of sodium with 8.0 g of chlorine. Which is limiting, and what mass of sodium chloride forms?',
                steps: [
                    'Write and balance: 2Na + Cl2 -> 2NaCl.',
                    'Convert to moles: Na = 4.6 / 23 = 0.20 mol; Cl2 = 8.0 / 71 = 0.113 mol.',
                    'Apply the ratio: 2 mol Na needs 1 mol Cl2, so 0.20 mol Na needs 0.10 mol Cl2.',
                    'Compare with available: 0.113 mol Cl2 is available, so Cl2 is in excess and Na is limiting.',
                    'Moles of NaCl from Na: 0.20 mol.',
                    'Mass of NaCl: 0.20 x 58.5 = 11.7 g.',
                ],
                takeaway: 'Convert to moles, apply the coefficient ratio, compare, then convert back.',
            },
            {
                title: 'Predicting a shape and polarity',
                brief: 'Predict the shape of ammonia and whether it is polar.',
                steps: [
                    'Count valence electrons: N (5) + 3 H (3) = 8.',
                    'Draw the Lewis structure: three N-H bonds plus one lone pair on N.',
                    'Apply VSEPR: four electron pairs, one lone pair, hence trigonal pyramidal.',
                    'Assess symmetry: the lone pair makes the arrangement asymmetric.',
                    'Conclude: bond dipoles do not cancel, so ammonia is polar.',
                    'Relate to behaviour: high solubility in water and hydrogen bonding.',
                ],
                takeaway: 'Electrons, then shape, then symmetry, then polarity. Each step uses the previous one.',
            },
        ],
        examBank: [
            {
                question: 'Explain the difference between ionic and covalent bonding and how the difference affects physical properties.',
                marks: '15 marks',
                outline: [
                    'Define each in terms of electron transfer and sharing.',
                    'Relate electronegativity difference to bond type.',
                    'Compare melting points, conductivity and solubility.',
                    'Use a specific example of each.',
                ],
            },
            {
                question: 'State Le Chatelier\'s principle and apply it to the Haber process.',
                marks: '15 marks',
                outline: [
                    'State the principle.',
                    'Write the equation and note the exothermic direction.',
                    'Predict the effect of pressure, temperature and removal of ammonia.',
                    'Explain the industrial compromise between yield and rate.',
                ],
                trap: 'Confusing equilibrium yield with reaction rate.',
            },
        ],
        glossary: [
            { term: 'Mole', definition: 'The amount containing Avogadro\'s number of particles.' },
            { term: 'Molar mass', definition: 'The mass of one mole of a substance in grams.' },
            { term: 'Limiting reagent', definition: 'The reactant that is exhausted first and so limits product formation.' },
            { term: 'Empirical formula', definition: 'The simplest whole-number ratio of atoms in a compound.' },
            { term: 'Electronegativity', definition: 'An atom\'s tendency to attract shared electrons.' },
            { term: 'Hydrogen bond', definition: 'A strong intermolecular attraction between a hydrogen bonded to N, O or F and a lone pair.' },
            { term: 'VSEPR', definition: 'A theory predicting molecular shape from electron-pair repulsion.' },
            { term: 'Dynamic equilibrium', definition: 'A state where forward and reverse reaction rates are equal.' },
            { term: 'Buffer', definition: 'A solution that resists pH change when acid or base is added.' },
            { term: 'Oxidation number', definition: 'A bookkeeping charge assigned to an atom in a compound.' },
            { term: 'Stoichiometry', definition: 'Quantitative relationships between reactants and products in a reaction.' },
            { term: 'Percentage yield', definition: 'Actual yield expressed as a percentage of theoretical yield.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Moles', focus: 'Quantities.', tasks: ['Convert between mass, moles and particles for ten substances.', 'Determine empirical formulas from percentages.', 'Solve three limiting reagent problems.'] },
            { week: 'Week 2 - Bonding', focus: 'Structure.', tasks: ['Draw Lewis structures for ten molecules.', 'Predict shapes with VSEPR.', 'Compare boiling points using intermolecular forces.'] },
            { week: 'Week 3 - Equilibrium', focus: 'Reversibility.', tasks: ['Write equilibrium expressions.', 'Apply Le Chatelier to three systems.', 'Calculate pH for strong and weak acids.'] },
            { week: 'Week 4 - Redox', focus: 'Electron transfer.', tasks: ['Assign oxidation numbers in ten compounds.', 'Balance three redox equations.', 'Identify oxidising and reducing agents.'] },
        ],
        readingList: [
            'Any first-year general chemistry text covering stoichiometry, bonding and equilibrium.',
            'A calculations workbook for mole and titration problems.',
            'A laboratory manual section on safe handling of acids and oxidising agents.',
        ],
    },

    'phy-101-general-physics-mechanics': {
        sections: [
            {
                heading: 'Measurement, uncertainty and vectors',
                paragraphs: [
                    'Physics begins with measurement and the admission that measurement has limits. Every reading has an uncertainty, and a result cannot be more precise than its inputs. Significant figures are a shorthand for that logic; unit consistency is a check that will catch most errors before they cost marks.',
                    'Vectors have magnitude and direction; scalars do not. Displacement, velocity, acceleration and force are vectors; distance, speed, mass and energy are scalars. Resolving a vector into components turns a two-dimensional problem into two one-dimensional problems, which is the single most useful technique in mechanics.',
                    'Kinematics describes motion without asking its cause: displacement, velocity, acceleration and time, related by the equations for constant acceleration. Dynamics asks why motion changes, and answers with force and mass.',
                ],
            },
            {
                heading: 'Newton\'s laws and conservation',
                paragraphs: [
                    'Newton\'s first law states that a body remains at rest or in uniform motion unless a net external force acts. The second law quantifies the relationship: net force equals rate of change of momentum, or F = ma for constant mass. The third law states that forces occur in equal and opposite pairs acting on different bodies - which is why they do not cancel.',
                    'Conservation laws are often easier than force analysis. Momentum is conserved in the absence of external force, which solves collisions and explosions quickly. Energy is conserved but transforms, and mechanical energy is conserved only where no non-conservative force does work, such as friction.',
                    'Friction, tension, normal reaction and weight must be drawn accurately on a free-body diagram. Most errors in mechanics problems are diagram errors, not algebra errors.',
                ],
                callout: {
                    title: 'Draw the free-body diagram first',
                    body: 'One object, every force acting on it, nothing else. If your diagram is wrong, no amount of correct algebra will save the answer.',
                },
            },
            {
                heading: 'Circular motion, gravitation and simple machines',
                paragraphs: [
                    'Circular motion requires a centripetal force directed toward the centre; the object\'s speed may be constant while its velocity changes continuously. The common error is inventing an outward "centrifugal" force in an inertial frame - what is felt is inertia, not a real force.',
                    'Newton\'s law of gravitation states that the force between two masses is proportional to the product of the masses and inversely proportional to the square of the distance. From this follow orbital motion, satellite speed and Kepler\'s laws as consequences rather than separate facts.',
                    'Simple machines - lever, pulley, inclined plane, wheel and axle - trade force for distance. Efficiency is useful work out divided by work in, and it is always less than one hundred per cent because of friction. The principle of moments for a lever is a conservation argument in disguise.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'A projectile problem',
                brief: 'A ball is thrown at 20 m/s at 30 degrees above the horizontal. Find the time of flight and range (take g = 10 m/s2).',
                steps: [
                    'Resolve velocity: horizontal 20 cos30 = 17.3 m/s; vertical 20 sin30 = 10 m/s.',
                    'Time to highest point: v = u - gt gives 0 = 10 - 10t, so t = 1 s.',
                    'Total flight time: 2 s, by symmetry.',
                    'Range: horizontal velocity times total time = 17.3 x 2 = 34.6 m.',
                    'Maximum height: u squared over 2g = 100 / 20 = 5 m.',
                    'Check units and reasonable magnitude before writing the answer.',
                ],
                takeaway: 'Resolve, treat axes independently, then recombine. Never mix horizontal and vertical.',
            },
            {
                title: 'A momentum problem',
                brief: 'A 2 kg trolley moving at 3 m/s collides and sticks to a stationary 1 kg trolley. Find the final velocity.',
                steps: [
                    'State conservation of momentum: total momentum before equals after.',
                    'Before: 2 x 3 + 1 x 0 = 6 kg m/s.',
                    'After: (2 + 1) x v = 3v.',
                    'Equate: 3v = 6, so v = 2 m/s in the original direction.',
                    'Check energy: kinetic energy falls from 9 J to 6 J, lost as heat and deformation - consistent with an inelastic collision.',
                ],
                takeaway: 'Momentum is conserved in all collisions; kinetic energy only in elastic ones.',
            },
        ],
        examBank: [
            {
                question: 'State Newton\'s three laws and explain why the third law does not produce equilibrium.',
                marks: '15 marks',
                outline: [
                    'State each law precisely.',
                    'Explain that action and reaction act on different bodies.',
                    'Give a worked example, such as a book on a table.',
                    'Distinguish the reaction pair from the normal force and weight pair.',
                ],
                trap: 'Treating weight and normal reaction as an action-reaction pair. They act on the same body.',
            },
            {
                question: 'Derive an expression for the speed of a satellite in a circular orbit.',
                marks: '15 marks',
                outline: [
                    'Set gravitational force equal to centripetal force.',
                    'Simplify to v squared = GM/r.',
                    'Discuss the dependence on orbital radius.',
                    'Note the assumption of a circular orbit and negligible drag.',
                ],
            },
        ],
        glossary: [
            { term: 'Vector', definition: 'A quantity with both magnitude and direction.' },
            { term: 'Scalar', definition: 'A quantity with magnitude only.' },
            { term: 'Displacement', definition: 'Change in position, a vector quantity.' },
            { term: 'Acceleration', definition: 'Rate of change of velocity.' },
            { term: 'Free-body diagram', definition: 'A diagram showing all forces acting on a single object.' },
            { term: 'Momentum', definition: 'The product of mass and velocity, conserved absent external force.' },
            { term: 'Impulse', definition: 'The product of force and time, equal to change in momentum.' },
            { term: 'Centripetal force', definition: 'The net inward force required for circular motion.' },
            { term: 'Work', definition: 'Force multiplied by displacement in the direction of the force.' },
            { term: 'Conservation of energy', definition: 'The principle that energy is transformed but not created or destroyed.' },
            { term: 'Efficiency', definition: 'Useful output divided by total input, expressed as a percentage.' },
            { term: 'Uncertainty', definition: 'The range within which a measured value is likely to lie.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Kinematics', focus: 'Describing motion.', tasks: ['Solve ten constant-acceleration problems.', 'Draw motion graphs and interpret gradients.', 'Resolve five vectors into components.'] },
            { week: 'Week 2 - Dynamics', focus: 'Forces.', tasks: ['Draw free-body diagrams for six situations.', 'Apply F = ma to two-body systems.', 'Explain the third law with a counter-example.'] },
            { week: 'Week 3 - Conservation', focus: 'Momentum and energy.', tasks: ['Solve five collision problems.', 'Check whether kinetic energy is conserved.', 'Apply the work-energy theorem.'] },
            { week: 'Week 4 - Circular motion', focus: 'Rotation and gravity.', tasks: ['Derive orbital speed.', 'Solve three centripetal force problems.', 'Explain why "centrifugal force" is not a real force.'] },
        ],
        readingList: [
            'Any first-year mechanics textbook with worked examples and problem sets.',
            'A practical physics manual for measurement and uncertainty.',
            'A revision guide for projectile and momentum problems.',
        ],
    },

    'mth-101-elementary-mathematics': {
        sections: [
            {
                heading: 'Sets, logic and proof',
                paragraphs: [
                    'Set notation is the grammar of mathematics: union, intersection, complement, subset, cardinality. Venn diagrams solve many counting problems, and the inclusion-exclusion principle generalises them: for two sets, the size of the union is the sum of the sizes minus the overlap.',
                    'Logic underlies proof. A statement and its contrapositive are equivalent; the converse and inverse are not. Proof by contradiction assumes the negation and derives a contradiction. Proof by induction establishes a base case and an inductive step, and is valid only over the natural numbers.',
                    'The commonest student error is proving an example rather than a general claim. Three cases support a conjecture but do not prove it; one counter-example refutes it.',
                ],
            },
            {
                heading: 'Algebra, functions and equations',
                paragraphs: [
                    'Quadratic equations are solved by factorisation, completing the square, or the formula. The discriminant determines the nature of the roots: positive for two real roots, zero for a repeated root, negative for complex roots. The sum and product of roots follow directly from the coefficients.',
                    'Functions map inputs to outputs; the domain is what is allowed, the range is what results. Composition and inverse functions require care about domains; an inverse exists only if the function is one-to-one.',
                    'Simultaneous equations can be solved by substitution, elimination or matrices. Word problems are solved by naming the unknowns, writing the equations from the conditions, checking the solution against the original wording - and rejecting solutions that do not fit the physical context.',
                ],
                callout: {
                    title: 'Check against the question',
                    body: 'A solution that satisfies the algebra but contradicts the physical situation - a negative length, a fractional number of students - is a signal that you set the equation up wrongly.',
                },
            },
            {
                heading: 'Sequences, series and counting',
                paragraphs: [
                    'Arithmetic progressions add a constant difference; geometric progressions multiply by a constant ratio. The nth term and sum formulas follow from these definitions and are worth deriving once so they are not misremembered.',
                    'Permutations count arrangements where order matters; combinations count selections where it does not. The binomial theorem expands (a + b)^n using binomial coefficients, and Pascal\'s triangle generates them.',
                    'These tools are the foundation of probability and statistics, which is why they are taught early. A probability is the count of favourable outcomes over the count of equally likely outcomes, and the counting skills determine whether you can find either number.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'A set counting problem',
                brief: 'In a class of 40, 25 study Mathematics, 20 study Physics, and 10 study both. How many study neither?',
                steps: [
                    'Let M and P be the sets; write the given values.',
                    'Apply inclusion-exclusion: |M union P| = 25 + 20 - 10 = 35.',
                    'Students studying at least one subject: 35.',
                    'Students studying neither: 40 - 35 = 5.',
                    'Check with a Venn diagram: only M = 15, only P = 10, both = 10, total 35.',
                ],
                takeaway: 'Draw the diagram after the formula. The two should agree; if they do not, you have misread the question.',
            },
            {
                title: 'Solving a quadratic with a condition',
                brief: 'Find k if x squared + kx + 9 = 0 has equal roots.',
                steps: [
                    'Equal roots means the discriminant is zero.',
                    'Write the discriminant: b squared - 4ac = k squared - 36.',
                    'Set to zero: k squared = 36.',
                    'Solve: k = 6 or k = -6.',
                    'Check both by substitution - both give a perfect square.',
                    'State both answers; rejecting one without reason is an error.',
                ],
                takeaway: 'Translate the condition into an equation about the coefficients, then solve it.',
            },
        ],
        examBank: [
            {
                question: 'Prove by induction that the sum of the first n natural numbers is n(n+1)/2.',
                marks: '15 marks',
                outline: [
                    'State the proposition for all n greater than or equal to 1.',
                    'Base case: check n = 1 on both sides.',
                    'Assume true for n = k.',
                    'Show it follows for n = k + 1 by adding the next term and simplifying.',
                    'Conclude by the principle of induction.',
                ],
                trap: 'Omitting the base case or failing to state the induction hypothesis clearly.',
            },
            {
                question: 'Distinguish permutations from combinations with one worked example each.',
                marks: '10 marks',
                outline: [
                    'Define both in terms of whether order matters.',
                    'Give formulas and notation.',
                    'Work one arrangement and one selection example with the same numbers.',
                    'Explain why the combination result is smaller.',
                ],
            },
        ],
        glossary: [
            { term: 'Set', definition: 'A collection of distinct objects considered as a whole.' },
            { term: 'Union', definition: 'The set of elements in either of two sets.' },
            { term: 'Intersection', definition: 'The set of elements in both of two sets.' },
            { term: 'Inclusion-exclusion', definition: 'A counting principle adding sizes and subtracting overlaps.' },
            { term: 'Contrapositive', definition: 'The equivalent form of a conditional obtained by negating and reversing.' },
            { term: 'Discriminant', definition: 'b squared minus 4ac, determining the nature of quadratic roots.' },
            { term: 'Domain', definition: 'The set of inputs for which a function is defined.' },
            { term: 'Range', definition: 'The set of outputs a function actually produces.' },
            { term: 'Arithmetic progression', definition: 'A sequence with a constant difference between terms.' },
            { term: 'Geometric progression', definition: 'A sequence with a constant ratio between terms.' },
            { term: 'Permutation', definition: 'An arrangement in which order matters.' },
            { term: 'Combination', definition: 'A selection in which order does not matter.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Sets', focus: 'Counting.', tasks: ['Solve five Venn diagram problems.', 'Apply inclusion-exclusion to three cases.', 'Practise set notation.'] },
            { week: 'Week 2 - Algebra', focus: 'Equations.', tasks: ['Solve ten quadratics by three methods.', 'Use the discriminant to classify roots.', 'Set up three word problems.'] },
            { week: 'Week 3 - Functions', focus: 'Mapping.', tasks: ['Find domains and ranges.', 'Compose and invert functions.', 'Solve simultaneous equations by two methods.'] },
            { week: 'Week 4 - Sequences', focus: 'Patterns and counting.', tasks: ['Derive the nth term and sum for both progressions.', 'Solve three permutation problems.', 'Prove one statement by induction.'] },
        ],
        readingList: [
            'Any elementary mathematics text covering sets, algebra and sequences.',
            'A problem-solving workbook with worked solutions.',
            'A short introduction to proof techniques for first-year students.',
        ],
    },
})

Object.assign(THEATRE_FILM_DEPTH, {
    'acc-101-introduction-to-financial-accounting': {
        sections: [
            {
                heading: 'The accounting equation and double entry',
                paragraphs: [
                    'Financial accounting records transactions and reports their effect on a business. Everything rests on the accounting equation: assets equal liabilities plus capital. Every transaction affects at least two elements, which is why the system is called double entry, and why the trial balance should always balance.',
                    'Debits and credits are not good and bad; they are left and right. Assets and expenses increase on the debit side; liabilities, capital and income increase on the credit side. Learn the direction for each category once, and the rest follows mechanically.',
                    'The journal records the transaction with its narration, the ledger groups entries by account, the trial balance lists balances, and the financial statements report the result. Each stage is a check on the previous one.',
                ],
            },
            {
                heading: 'Preparing the statements',
                paragraphs: [
                    'The statement of profit or loss matches income earned in a period against the expenses incurred to earn it, regardless of when cash moved. The statement of financial position reports assets, liabilities and capital at a point in time. Confusing a period with a point in time is a common error: one flows, the other is a snapshot.',
                    'Adjustments are where most marks are won or lost: accruals (expense incurred, not yet paid), prepayments (paid in advance), depreciation (allocation of the cost of a non-current asset over its useful life), bad and doubtful debts, and closing inventory. Each adjustment affects at least two figures.',
                    'Depreciation is not saving for replacement. It is the systematic allocation of cost. Straight-line divides cost less residual value by useful life; reducing balance applies a fixed percentage to the carrying amount.',
                ],
                callout: {
                    title: 'Every adjustment has two sides',
                  body: 'If you have changed one figure and not another, the statements will not agree. Ask which two accounts the adjustment touches.',
                },
            },
            {
                heading: 'Control accounts, errors and interpretation',
                paragraphs: [
                    'A trial balance that balances does not prove the books are correct. Errors of omission, commission, principle, original entry, reversal and compensating errors can all leave it in balance. Only some are detected by the trial balance; the rest require reconciliation and review.',
                    'Control accounts summarise the sales and purchases ledgers and are reconciled to their underlying lists. Bank reconciliation explains the difference between the cash book and the bank statement: unpresented cheques, uncredited deposits, bank charges and errors.',
                    'Ratio analysis interprets the statements: profitability, liquidity, efficiency and gearing. Ratios are only meaningful in comparison - with a previous year, a competitor or an industry norm - and a single ratio rarely tells you anything certain.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Recording a transaction set',
                brief: 'A business starts with 500,000 capital in the bank, buys equipment for 200,000 cash, and buys goods on credit for 80,000. Show the effects.',
                steps: [
                    'Capital introduced: debit bank 500,000; credit capital 500,000.',
                    'Equipment purchase: debit equipment 200,000; credit bank 200,000.',
                    'Credit purchase: debit purchases 80,000; credit payables 80,000.',
                    'Check the equation: assets = 300,000 bank + 200,000 equipment + 80,000 inventory = 580,000; liabilities 80,000 + capital 500,000 = 580,000.',
                    'Confirm the trial balance totals agree.',
                ],
                takeaway: 'Write both sides every time. The equation is the check, not the method.',
            },
            {
                title: 'A depreciation calculation',
                brief: 'A machine costs 1,200,000, has a residual value of 200,000 and a useful life of five years. Compute straight-line depreciation and the carrying amount after three years.',
                steps: [
                    'Depreciable amount: 1,200,000 - 200,000 = 1,000,000.',
                    'Annual charge: 1,000,000 / 5 = 200,000.',
                    'Accumulated depreciation after three years: 600,000.',
                    'Carrying amount: 1,200,000 - 600,000 = 600,000.',
                    'State the assumption: full-year charge, no revaluation.',
                ],
                takeaway: 'Subtract the residual value before dividing. Forgetting it is the most common error.',
            },
        ],
        examBank: [
            {
                question: 'Explain why a trial balance may balance even when errors have been made.',
                marks: '15 marks',
                outline: [
                    'State that the trial balance checks arithmetic equality only.',
                    'Name errors that preserve equality: omission, commission, principle, original entry, reversal, compensating.',
                    'Give one example of each briefly.',
                    'Explain what mechanisms do detect them: control accounts, reconciliation, review.',
                ],
            },
            {
                question: 'Distinguish accruals from prepayments with an example of each.',
                marks: '10 marks',
                outline: [
                    'Accrual: expense incurred but not yet paid; create a liability.',
                    'Prepayment: amount paid for a future period; create an asset.',
                    'Give one adjusting entry for each.',
                    'Explain the matching principle behind both.',
                ],
            },
        ],
        glossary: [
            { term: 'Accounting equation', definition: 'Assets equal liabilities plus capital.' },
            { term: 'Double entry', definition: 'Recording each transaction with equal debits and credits.' },
            { term: 'Trial balance', definition: 'A list of ledger balances used to check arithmetic equality.' },
            { term: 'Accrual', definition: 'An expense incurred but not yet paid, recorded as a liability.' },
            { term: 'Prepayment', definition: 'An amount paid in advance for a future period, recorded as an asset.' },
            { term: 'Depreciation', definition: 'Systematic allocation of the cost of a non-current asset over its useful life.' },
            { term: 'Carrying amount', definition: 'Cost less accumulated depreciation.' },
            { term: 'Control account', definition: 'A summary account reconciled to the individual ledger balances.' },
            { term: 'Bank reconciliation', definition: 'A statement explaining differences between the cash book and bank statement.' },
            { term: 'Error of principle', definition: 'Recording a transaction in the wrong class of account.' },
            { term: 'Compensating error', definition: 'Two errors that cancel each other in the trial balance.' },
            { term: 'Gearing', definition: 'The proportion of a business financed by debt rather than equity.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Double entry', focus: 'Recording.', tasks: ['Post twenty transactions.', 'Extract a trial balance.', 'Check the accounting equation.'] },
            { week: 'Week 2 - Adjustments', focus: 'Accruals and depreciation.', tasks: ['Make five year-end adjustments.', 'Compute depreciation by two methods.', 'Write up the adjusted ledger.'] },
            { week: 'Week 3 - Statements', focus: 'Reporting.', tasks: ['Prepare a profit or loss statement.', 'Prepare a statement of financial position.', 'Check that they articulate.'] },
            { week: 'Week 4 - Analysis', focus: 'Interpretation.', tasks: ['Compute six ratios.', 'Compare two years.', 'Identify one error the trial balance would miss.'] },
        ],
        readingList: [
            'Any introductory financial accounting textbook with exercises and answers.',
            'A study text on year-end adjustments and depreciation.',
            'Your professional body\'s conceptual framework summary.',
        ],
    },

    'mkt-101-principles-of-marketing': {
        sections: [
            {
                heading: 'Marketing is exchange, not advertising',
                paragraphs: [
                    'Marketing is the activity of creating, communicating and delivering value to a chosen market at a profit. Advertising is one tool within it. A business that advertises a product nobody wants has a marketing failure, not an advertising one.',
                    'The marketing concept holds that the customer\'s need should organise the business, subject to profitability. This is not altruism: it is a claim about which orientation survives competition. Production orientation assumes supply is the constraint; product orientation assumes quality sells itself; selling orientation assumes persuasion is the constraint; marketing orientation assumes understanding the customer is.',
                    'The marketing environment is analysed with PESTLE (political, economic, social, technological, legal, environmental) and with Porter\'s five forces for competitive pressure. These frameworks are only useful if you fill them with specific facts about a specific market.',
                ],
            },
            {
                heading: 'Segmentation, targeting and positioning',
                paragraphs: [
                    'Markets are not homogeneous. Segmentation divides a market by measurable and actionable criteria: demographic, geographic, psychographic and behavioural. A segment is useful only if it can be reached and served profitably.',
                    'Targeting chooses which segments to serve; positioning decides the place the offer should occupy in the customer\'s mind relative to alternatives. A positioning statement names the target, the category, the benefit and the reason to believe - and a version that could describe a competitor is not a positioning statement.',
                    'The marketing mix operationalises the choice: product (features, quality, branding, packaging), price (level, discounts, terms), place (channels, coverage, logistics) and promotion (advertising, sales promotion, public relations, personal selling, digital). In services, people, process and physical evidence extend the mix.',
                ],
                callout: {
                    title: 'One sentence first',
                    body: 'Write: "For [target] who [need], our offer is a [category] that [benefit], unlike [alternative]." If you cannot fill it, the plan is not yet a plan.',
                },
            },
            {
                heading: 'Consumer behaviour and the Nigerian market',
                paragraphs: [
                    'Buying decisions involve need recognition, information search, evaluation, purchase and post-purchase behaviour. The process is compressed for habitual purchases and extended for expensive or risky ones. Marketers influence each stage differently; a single message cannot do all the work.',
                    'Nigerian consumer markets are shaped by income volatility, informal retail, strong social networks, religious and festive calendars, and rapid mobile adoption. Distribution through kiosks, markets and agents often beats formal retail. Trust is built through community reference, not only through branded advertising.',
                    'Marketing ethics matter practically. Misleading claims, exploitative pricing and dark patterns destroy trust in markets where reputation travels fast. Regulation exists - advertising standards, consumer protection - and non-compliance carries commercial as well as legal cost.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Writing a positioning statement',
                brief: 'A campus food vendor wants to compete with cheaper street food.',
                steps: [
                    'Identify target: students who skip breakfast before 8 a.m. lectures.',
                    'Identify need: fast, filling, hygienic food within walking distance.',
                    'Choose category: quick-service breakfast.',
                    'Choose benefit: ready in three minutes, sealed packaging.',
                    'Choose reason to believe: pre-packed portions and a visible kitchen.',
                    'Write the statement and test whether it could describe the cheaper competitor.',
                ],
                takeaway: 'Positioning fails when the benefit is what everyone claims. Choose something a rival cannot easily copy.',
            },
            {
                title: 'Setting a price with three methods',
                brief: 'Price a handmade leather bag.',
                steps: [
                    'Cost-plus: total cost 8,000, add 40 per cent margin, giving 11,200.',
                    'Competitor-based: comparable bags retail at 10,000 to 14,000.',
                    'Value-based: estimate what the target customer will pay for durability and design.',
                    'Reconcile: choose a figure that covers cost and sits credibly against alternatives.',
                    'State the assumption that would change the answer, such as a rise in leather prices.',
                ],
                takeaway: 'Use all three methods; each corrects the blind spot of the others.',
            },
        ],
        examBank: [
            {
                question: 'Explain the four Ps and how they must be consistent with each other.',
                marks: '15 marks',
                outline: [
                    'Define product, price, place and promotion.',
                    'Show a consistency example: premium product requires premium price and selective distribution.',
                    'Show an inconsistency and its cost.',
                    'Conclude that the mix is a system, not a checklist.',
                ],
            },
            {
                question: 'Distinguish segmentation, targeting and positioning.',
                marks: '10 marks',
                outline: [
                    'Segmentation divides the market.',
                    'Targeting selects which segments to serve.',
                    'Positioning decides the intended place in the customer\'s mind.',
                    'Give a short example running through all three.',
                ],
            },
        ],
        glossary: [
            { term: 'Marketing mix', definition: 'The controllable elements - product, price, place, promotion - used to serve a target market.' },
            { term: 'Segmentation', definition: 'Dividing a market into groups with shared characteristics.' },
            { term: 'Targeting', definition: 'Selecting the segments a business will serve.' },
            { term: 'Positioning', definition: 'The place an offer is designed to occupy in the customer\'s mind.' },
            { term: 'Value proposition', definition: 'The specific benefit an offer promises and why it is credible.' },
            { term: 'PESTLE', definition: 'A framework for analysing the macro-environment.' },
            { term: 'Distribution channel', definition: 'The route by which a product reaches the customer.' },
            { term: 'Brand equity', definition: 'The added value a brand name gives to a product.' },
            { term: 'Customer lifetime value', definition: 'The total profit expected from a customer over the relationship.' },
            { term: 'Market orientation', definition: 'Organising the business around understanding and serving customer needs.' },
            { term: 'Push and pull', definition: 'Promotion through channel incentives versus demand creation with end customers.' },
            { term: 'Consumer protection', definition: 'Law and regulation guarding buyers against unfair or unsafe practices.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Concepts', focus: 'Orientation.', tasks: ['Distinguish the four orientations with examples.', 'Complete a PESTLE for one industry.', 'Write a one-sentence value proposition.'] },
            { week: 'Week 2 - STP', focus: 'Choice.', tasks: ['Segment a market on three bases.', 'Choose a target and justify it.', 'Write and test a positioning statement.'] },
            { week: 'Week 3 - Mix', focus: 'Execution.', tasks: ['Design a four-P plan for one product.', 'Price it three ways.', 'Check internal consistency.'] },
            { week: 'Week 4 - Behaviour', focus: 'Customers.', tasks: ['Map a purchase decision process.', 'Identify two Nigerian market factors.', 'Assess one ethical issue.'] },
        ],
        readingList: [
            'Any principles of marketing textbook covering STP and the marketing mix.',
            'A consumer behaviour text with emerging-market case studies.',
            'Nigerian advertising and consumer protection regulation summaries.',
        ],
    },

    'csc-101-introduction-to-computer-science': {
        sections: [
            {
                heading: 'What a computer actually does',
                paragraphs: [
                    'A computer is a machine that executes instructions. Its architecture comprises a processor, memory, input and output devices, and storage, connected by buses. The processor fetches an instruction, decodes it, executes it and writes the result back - the fetch-decode-execute cycle, repeated billions of times per second.',
                    'Programs and data share memory in the stored-program model, which is what makes general-purpose computing possible: the machine does not change, the instructions do. Memory hierarchy - registers, cache, RAM, disk - trades speed against capacity and cost, and understanding that hierarchy explains most performance behaviour.',
                    'Data is represented in binary because digital circuits distinguish two voltage levels reliably. Numbers, characters and images are all encoded: two\'s complement for signed integers, ASCII and Unicode for characters, pixel values for images. Knowing the encoding explains overflow, rounding error and why text files have encodings at all.',
                ],
            },
            {
                heading: 'Algorithms and programming',
                paragraphs: [
                    'An algorithm is a finite, unambiguous sequence of steps that solves a problem. The same problem admits many algorithms, and they differ in time and space complexity. Big-O notation describes how running time grows with input size, which matters more than constant factors once inputs are large.',
                    'Programs are built from sequence, selection and iteration, plus abstraction through functions and data structures. Choosing the right structure - list, stack, queue, dictionary, tree - often determines whether a solution is practical.',
                    'Debugging is a method, not a mood. Reproduce the fault, isolate it by narrowing the input or the code path, form a hypothesis, test it, and fix the cause rather than the symptom. Printing intermediate values or using a debugger is faster than guessing.',
                ],
                callout: {
                    title: 'Trace it by hand',
                    body: 'Run the algorithm on paper with a small input. Most logic errors become obvious within three iterations.',
                },
            },
            {
                heading: 'Systems, networks and security',
                paragraphs: [
                    'An operating system manages processes, memory, files and devices, and enforces protection between users and programs. It schedules the processor, allocates memory, and handles input and output through drivers. Concurrency - multiple tasks appearing to run at once - introduces race conditions and requires synchronisation.',
                    'Networks move data in packets across layers, from physical transmission up through addressing and routing to applications. The layered model allows independent development: a change in wireless technology does not require rewriting a web browser.',
                    'Security rests on confidentiality, integrity and availability. Threats include malware, phishing, injection attacks and social engineering; defences include strong authentication, updates, least privilege, encryption and backups. Human factors are usually the weakest link, which is why security awareness training matters more than any single tool.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Analysing a simple algorithm',
                brief: 'Find the largest value in a list of n numbers. What is the cost?',
                steps: [
                    'Set the first element as the current maximum.',
                    'Compare each remaining element once.',
                    'Replace the maximum when a larger element is found.',
                    'Count operations: n - 1 comparisons, so time is linear, O(n).',
                    'Note that no comparison-based algorithm can do better, because every element must be examined.',
                    'Confirm space usage is constant, O(1).',
                ],
                takeaway: 'Count the dominant operation and express growth, not seconds.',
            },
            {
                title: 'Debugging a loop that never ends',
                brief: 'A while loop that should count from 1 to 10 never terminates.',
                steps: [
                    'Read the loop condition and the update statement.',
                    'Check whether the update actually changes the variable in the condition.',
                    'Trace three iterations on paper.',
                    'Check for an off-by-one that prevents the exit condition being reached.',
                    'Add a temporary counter with a print statement to observe the variable.',
                    'Fix the update, then re-test with both a normal and an edge case.',
                ],
                takeaway: 'Trace the variable. Infinite loops are almost always a failure to change the thing you are testing.',
            },
        ],
        examBank: [
            {
                question: 'Explain the fetch-decode-execute cycle.',
                marks: '10 marks',
                outline: [
                    'Fetch the instruction from the address in the program counter.',
                    'Decode the operation and operands.',
                    'Execute, using the ALU or memory access.',
                    'Store the result and update the program counter.',
                ],
            },
            {
                question: 'Compare two algorithms for the same problem using Big-O notation.',
                marks: '15 marks',
                outline: [
                    'Choose a problem, such as searching.',
                    'Describe linear search, O(n), and binary search, O(log n).',
                    'State the precondition for binary search: sorted data.',
                    'Explain why the difference matters at scale.',
                    'Note that constants matter for small inputs.',
                ],
                trap: 'Claiming one algorithm is always faster. Preconditions and input size matter.',
            },
        ],
        glossary: [
            { term: 'Algorithm', definition: 'A finite, unambiguous sequence of steps solving a problem.' },
            { term: 'Big-O notation', definition: 'A description of how an algorithm\'s cost grows with input size.' },
            { term: 'Binary', definition: 'A base-2 number system used by digital circuits.' },
            { term: 'Two\'s complement', definition: 'A scheme for representing signed integers in binary.' },
            { term: 'Compiler', definition: 'A program that translates source code into machine code before execution.' },
            { term: 'Interpreter', definition: 'A program that executes source code directly, statement by statement.' },
            { term: 'Operating system', definition: 'Software managing hardware, processes, memory and files.' },
            { term: 'Data structure', definition: 'An organised format for storing and accessing data.' },
            { term: 'Packet', definition: 'A unit of data transmitted across a network.' },
            { term: 'Protocol', definition: 'An agreed set of rules for communication between systems.' },
            { term: 'Encryption', definition: 'Encoding data so that only authorised parties can read it.' },
            { term: 'Race condition', definition: 'A fault arising when concurrent operations depend on timing.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Representation', focus: 'Binary.', tasks: ['Convert between binary, decimal and hex.', 'Add and subtract in two\'s complement.', 'Encode ten characters in ASCII.'] },
            { week: 'Week 2 - Algorithms', focus: 'Design.', tasks: ['Write three algorithms in pseudocode.', 'Trace each by hand.', 'Estimate their complexity.'] },
            { week: 'Week 3 - Programming', focus: 'Implementation.', tasks: ['Implement one algorithm in a real language.', 'Test with edge cases.', 'Debug one deliberate fault.'] },
            { week: 'Week 4 - Systems', focus: 'Context.', tasks: ['Describe the memory hierarchy.', 'Explain layering in networks.', 'List five security practices.'] },
        ],
        readingList: [
            'Any introduction to computer science text covering representation, algorithms and systems.',
            'A programming textbook for the language used in your course.',
            'A short guide to computer security fundamentals.',
        ],
    },

    'arc-101-introduction-to-architecture': {
        sections: [
            {
                heading: 'Architecture as response to conditions',
                paragraphs: [
                    'A building is an answer to a set of conditions: climate, site, materials, budget, function, culture and regulation. Architectural quality is not decoration applied afterwards; it is how well the answer addresses those conditions at once.',
                    'In Nigeria the conditions are specific and demanding. Heat and humidity require shading, cross-ventilation and thermal mass; heavy rain requires overhangs and drainage; unreliable power requires daylighting strategies; and informal settlement requires incremental, affordable construction rather than imported models.',
                    'The classic triad - firmitas, utilitas, venustas (firmness, commodity, delight) - remains a useful test. A building that is beautiful and leaks has failed; so has one that is durable and uninhabitable.',
                ],
            },
            {
                heading: 'Drawing, scale and representation',
                paragraphs: [
                    'Architects think through drawings. Plans show a horizontal cut, sections a vertical cut, and elevations the external faces. Each is a convention, and each omits information the others carry; reading them together is how a building is understood.',
                    'Scale is the relationship between drawing and reality. A 1:100 plan means one unit on paper equals one hundred in reality. Getting scale wrong at design stage multiplies through construction, which is why dimensioning and checking are treated as basic professional habits.',
                    'Technical drawing conventions - line weights, hatching, dimension lines, north arrows - are not fussiness. They are the language in which a design is communicated to builders, engineers and clients.',
                ],
                callout: {
                    title: 'Draw the sun path',
                    body: 'Before placing a window, know where the sun is at 9 a.m. and 3 p.m. in the hot season. Orientation is free; air conditioning is not.',
                },
            },
            {
                heading: 'Structure, materials and sustainability',
                paragraphs: [
                    'Structural systems - load-bearing walls, frames, trusses, shells - determine spans and therefore what spaces are possible. Understanding how loads travel from roof to foundation is what makes a design buildable, and it is the usual dividing line between a sketch and an architectural proposal.',
                    'Materials have properties that prescribe details: concrete is strong in compression, steel in tension; timber moves; blockwork needs movement joints; roofs need ventilation. Local materials - laterite, burnt brick, bamboo, thatch, stone - have environmental and economic advantages when detailed correctly.',
                    'Sustainability is now a design requirement, not an optional virtue. Passive strategies come first: orientation, shading, ventilation, thermal mass, daylight. Active systems and renewable energy come second, because they cost more to install and to maintain.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Designing for passive cooling',
                brief: 'You must place a classroom block on a site in Enugu. Make the climate decisions.',
                steps: [
                    'Orient the long axis east-west so the long facades face north and south.',
                    'Shade the north and south facades with deep overhangs and horizontal fins.',
                    'Place openings to allow cross-ventilation from the prevailing breeze.',
                    'Use a high-level vent or clerestory to release hot air.',
                    'Choose a light-coloured roof with ventilation to reduce heat gain.',
                    'Place trees and covered walkways on the west side to block afternoon sun.',
                ],
                takeaway: 'Orientation, shading, ventilation, thermal mass. In that order, before any equipment.',
            },
            {
                title: 'Reading a set of drawings',
                brief: 'You are given a plan, a section and an elevation. What do you check first?',
                steps: [
                    'Confirm the scale and the north point.',
                    'Check that the plan dimensions match the section heights and the storey count.',
                    'Trace circulation: can you reach every room without passing through another?',
                    'Check daylight and ventilation openings against room depth.',
                    'Identify structural elements and confirm they align across floors.',
                    'Note discrepancies and raise them before construction.',
                ],
                takeaway: 'Cross-check drawings against each other. Discrepancies found on paper are free to fix.',
            },
        ],
        examBank: [
            {
                question: 'Explain how climate should shape building form in a hot-humid region.',
                marks: '20 marks',
                outline: [
                    'Describe the climate: high temperature, high humidity, heavy rain.',
                    'Orientation and shading strategy.',
                    'Ventilation: cross-ventilation and stack effect.',
                    'Roof design: overhangs, reflective surfaces, ventilation.',
                    'Material choices and thermal mass considerations.',
                    'Conclude that passive design precedes mechanical cooling.',
                ],
            },
            {
                question: 'Why are plans, sections and elevations all required to describe a building?',
                marks: '10 marks',
                outline: [
                    'Each shows one kind of information.',
                    'The plan gives layout; the section gives height and structure; the elevation gives appearance.',
                    'Cross-checking reveals errors.',
                    'Conventions exist so that others can read the design.',
                ],
            },
        ],
        glossary: [
            { term: 'Plan', definition: 'A drawing of a horizontal section showing layout at a stated scale.' },
            { term: 'Section', definition: 'A drawing of a vertical cut showing heights and construction.' },
            { term: 'Elevation', definition: 'A drawing of an external face of a building.' },
            { term: 'Scale', definition: 'The ratio between a drawing and the real object.' },
            { term: 'Cross-ventilation', definition: 'Air movement through openings on opposite or adjacent sides of a space.' },
            { term: 'Stack effect', definition: 'Vertical air movement driven by temperature differences.' },
            { term: 'Thermal mass', definition: 'A material\'s capacity to absorb and store heat, moderating temperature swings.' },
            { term: 'Load-bearing wall', definition: 'A wall that carries structural loads from above.' },
            { term: 'Span', definition: 'The distance a structural element bridges without intermediate support.' },
            { term: 'Firmitas, utilitas, venustas', definition: 'Firmness, commodity and delight - the classical triad of architectural value.' },
            { term: 'Incremental housing', definition: 'Housing designed to be extended and improved by residents over time.' },
            { term: 'Passive design', definition: 'Using form, orientation and materials to manage climate without mechanical systems.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Conditions', focus: 'Site and climate.', tasks: ['Analyse one site: sun, wind, rain, access.', 'Sketch a sun path.', 'List five climate responses.'] },
            { week: 'Week 2 - Drawing', focus: 'Representation.', tasks: ['Draw a plan, section and elevation at 1:100.', 'Dimension correctly.', 'Cross-check for consistency.'] },
            { week: 'Week 3 - Structure', focus: 'Buildability.', tasks: ['Identify the structural system in a local building.', 'Explain how loads reach the ground.', 'Choose materials and justify.'] },
            { week: 'Week 4 - Proposal', focus: 'Integration.', tasks: ['Design a small building to fit the brief.', 'Show passive strategies on the drawings.', 'Present orally in five minutes.'] },
        ],
        readingList: [
            'Any introduction to architectural design covering drawing conventions and scale.',
            'A text on climate-responsive design in tropical regions.',
            'A structures primer for architects on load paths and spanning systems.',
        ],
    },
})

// ── Health sciences primers ───────────────────────────────────────────────
Object.assign(THEATRE_FILM_DEPTH, {
    'ana-101-human-anatomy': {
        sections: [
            {
                heading: 'The language of the body',
                paragraphs: [
                    'Anatomy is a naming discipline before it is anything else. Terms of position - superior, inferior, anterior, posterior, medial, lateral, proximal, distal - locate a structure unambiguously regardless of posture. Planes (sagittal, coronal, transverse) allow the body to be described in sections. Without this vocabulary, description collapses into pointing.',
                    'The body is organised in levels: cells, tissues, organs, systems, organism. The four basic tissues - epithelial, connective, muscular and nervous - build every organ, and function follows from which tissues dominate and how they are arranged.',
                    'Anatomy is learned by region and by system at once. The regional approach answers what is in this part of the body; the systemic approach answers how a function works across it. Examinations test both, and strong answers move between them.',
                ],
            },
            {
                heading: 'Skeleton, muscle and control',
                paragraphs: [
                    'The skeleton supports, protects, stores minerals and produces blood cells. Bone features - foramina, fossae, condyles, tubercles - mark where structures pass, articulate or attach. Learning a bone means learning its landmarks, because that is what clinical examination and imaging rely on.',
                    'Skeletal muscle moves joints by contracting, working in antagonistic pairs. Origin, insertion, action and nerve supply are the four facts for every muscle, and the nerve supply is the one students most often omit. Lever systems explain how the same force produces different movement depending on where it attaches.',
                    'Control runs through the nervous and endocrine systems. The peripheral nervous system divides into somatic and autonomic, and the autonomic into sympathetic and parasympathetic divisions that generally oppose each other. Blood supply and lymphatic drainage explain how disease spreads and how drugs reach tissue.',
                ],
                callout: {
                    title: 'Learn by layers',
                    body: 'For any region: skin, fascia, muscle, vessel, nerve, bone. It is the order a surgeon dissects and the order an examiner expects.',
                },
            },
            {
                heading: 'Studying anatomy effectively',
                paragraphs: [
                    'Anatomy is not learned by reading. It is learned by retrieval: labelling diagrams from memory, drawing structures from scratch, and explaining a region aloud without notes. Spaced repetition of those tasks over weeks outperforms rereading.',
                    'Use prosections, models and imaging with the respect the setting requires. Photograph and label your own diagrams rather than collecting images passively; constructing the label is the learning.',
                    'Clinical correlation is the strongest memory aid. A structure remembered because of what happens when it is damaged is retained far longer than one memorised from a list. Learn one clinical consequence for every major structure.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Describing a region systematically',
                brief: 'Describe the anterior compartment of the forearm.',
                steps: [
                    'Boundaries: fascia anteriorly, interosseous membrane posteriorly, elbow proximally, wrist distally.',
                    'Muscles: superficial and deep groups with their actions.',
                    'Nerve supply: median nerve, with ulnar contribution to one muscle.',
                    'Vessels: radial and ulnar arteries and branches.',
                    'Clinical correlation: the deficit following median nerve lesion at the wrist.',
                    'Present as a table rather than prose for revision.',
                ],
                takeaway: 'Boundaries, contents, supply, drainage, clinical correlation. Same order every time.',
            },
            {
                title: 'A functional anatomy answer',
                brief: '"Explain why the shoulder joint is prone to dislocation."',
                steps: [
                    'Classify: synovial, ball and socket, multiaxial.',
                    'Describe the bony arrangement: large head, shallow glenoid cavity.',
                    'Explain soft tissue contribution: labrum, capsule, ligaments, rotator cuff.',
                    'State the trade-off: mobility bought at the cost of stability.',
                    'Name the common direction of dislocation and why.',
                    'Conclude with the clinical implication.',
                ],
                takeaway: 'Structure, trade-off, consequence.',
            },
        ],
        examBank: [
            {
                question: 'Name and describe the four basic tissue types with one location of each.',
                marks: '15 marks',
                outline: [
                    'Epithelial: covering and lining, avascular, e.g. epidermis.',
                    'Connective: support and binding, e.g. bone or tendon.',
                    'Muscular: contraction, e.g. skeletal muscle.',
                    'Nervous: conduction, e.g. spinal cord.',
                    'Link structure to function.',
                ],
            },
            {
                question: 'Explain the antagonistic arrangement of skeletal muscles with an example.',
                marks: '10 marks',
                outline: [
                    'Define agonist, antagonist and synergist.',
                    'Elbow flexion: biceps against triceps.',
                    'Explain why one muscle cannot reverse its own action.',
                    'Note the role of nerve supply in coordination.',
                ],
            },
        ],
        glossary: [
            { term: 'Anatomical position', definition: 'Standing upright, palms forward, the reference posture for directional terms.' },
            { term: 'Sagittal plane', definition: 'A vertical plane dividing the body into left and right parts.' },
            { term: 'Proximal', definition: 'Closer to the point of attachment or trunk.' },
            { term: 'Epithelium', definition: 'Avascular tissue covering surfaces and lining cavities.' },
            { term: 'Origin', definition: 'The relatively fixed attachment of a muscle.' },
            { term: 'Insertion', definition: 'The attachment that moves during contraction.' },
            { term: 'Agonist', definition: 'The muscle primarily responsible for a movement.' },
            { term: 'Antagonist', definition: 'The muscle opposing the agonist.' },
            { term: 'Foramen', definition: 'An opening in bone through which structures pass.' },
            { term: 'Synovial joint', definition: 'A freely movable joint with a fluid-filled cavity.' },
            { term: 'Autonomic nervous system', definition: 'The division controlling involuntary functions.' },
            { term: 'Clinical correlation', definition: 'The functional consequence of a structure being damaged.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Terminology', focus: 'Precision.', tasks: ['Learn all directional terms.', 'Label three planes.', 'Describe one region aloud without notes.'] },
            { week: 'Week 2 - Skeleton', focus: 'Landmarks.', tasks: ['Learn 30 bony landmarks.', 'Identify what passes through three foramina.', 'Draw the skull from memory.'] },
            { week: 'Week 3 - Muscle', focus: 'Action.', tasks: ['Tabulate four facts for 20 muscles.', 'Explain one lever system.', 'Test a partner on actions.'] },
            { week: 'Week 4 - Systems', focus: 'Integration.', tasks: ['Trace one nerve root to target.', 'Trace blood supply to one limb.', 'Write a functional anatomy answer.'] },
        ],
        readingList: [
            'Any standard regional anatomy textbook with clinical notes.',
            'An anatomy labelling workbook for active recall.',
            'A clinical anatomy text linking structures to common injuries.',
        ],
    },

    'bcs-201-introduction-to-pathology': {
        sections: [
            {
                heading: 'What pathology studies',
                paragraphs: [
                    'Pathology studies the causes, mechanisms and effects of disease, answering four questions: cause (aetiology), mechanism (pathogenesis), structural change (morphology) and functional consequence (clinical significance).',
                    'Disease is the failure of homeostasis. Cells respond to injury by adapting, degenerating reversibly, or dying. That repertoire is limited - hypertrophy, atrophy, hyperplasia, metaplasia, necrosis, apoptosis - which is why a small set of concepts explains a very large number of conditions.',
                    'Reversible injury produces swelling and fatty change with function intact once the cause is removed; irreversible injury produces cell death, which the body must repair or replace with scar.',
                ],
            },
            {
                heading: 'Inflammation, repair and neoplasia',
                paragraphs: [
                    'Inflammation is a protective response to injury or infection, characterised by redness, heat, swelling, pain and loss of function. Acute inflammation involves vasodilatation, increased permeability and leukocyte migration; chronic inflammation involves lymphocytes and macrophages, often with fibrosis.',
                    'Repair may restore tissue or replace it with scar. Regeneration is possible in tissues with dividing cells; permanent tissues heal by fibrosis. Healing is impaired by infection, poor nutrition, poor blood supply, diabetes and steroids - factors that matter directly in surgical care.',
                    'Neoplasia is uncontrolled cell growth. Benign tumours remain localised and well differentiated; malignant tumours invade and metastasise. Carcinogenesis usually involves multiple mutations affecting oncogenes and tumour suppressor genes, which is why latency is long and exposure history matters.',
                ],
                callout: {
                    title: 'Four questions for every disease',
                    body: 'Cause, mechanism, appearance, consequence. Answer all four and you can write about the condition.',
                },
            },
            {
                heading: 'Investigating disease',
                paragraphs: [
                    'Diagnosis combines history, examination, laboratory tests, imaging and tissue examination. Tests change probabilities rather than producing certainty, which is why sensitivity, specificity and predictive value matter.',
                    'Histopathology examines tissue architecture under a microscope using stains such as H&E; cytology examines individual cells. Both require correct specimen handling: fixation, labelling and clinical information on the request form.',
                    'Laboratory safety is not administrative. Universal precautions, correct disposal and disciplined labelling prevent the infections and misidentifications that harm staff and patients.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Explaining ischaemic cell injury',
                brief: 'A patient has an ischaemic limb. Explain the progression to necrosis.',
                steps: [
                    'Reduced perfusion lowers oxygen delivery.',
                    'ATP production falls as oxidative phosphorylation fails.',
                    'The sodium-potassium pump fails, causing sodium and water influx and cell swelling.',
                    'Anaerobic metabolism produces lactic acid, lowering intracellular pH.',
                    'Mitochondrial and membrane damage become irreversible.',
                    'Necrosis follows, releasing contents and provoking inflammation.',
                ],
                takeaway: 'Follow the ATP. Almost every step descends from its loss.',
            },
            {
                title: 'Interpreting a test result',
                brief: 'A test has 90 per cent sensitivity and 95 per cent specificity. A patient tests positive in a population with one per cent prevalence. What does it mean?',
                steps: [
                    'Define sensitivity and specificity.',
                    'Take 10,000 people: 100 diseased, 9,900 healthy.',
                    'True positives: 90; false positives: about 495.',
                    'So most positives are false in this population.',
                    'Conclude that confirmatory testing is required.',
                    'Relate to why screening targets higher-prevalence groups.',
                ],
                takeaway: 'Prevalence changes the meaning of a positive result.',
            },
        ],
        examBank: [
            {
                question: 'Compare necrosis and apoptosis.',
                marks: '15 marks',
                outline: [
                    'Necrosis: pathological, membrane rupture, inflammation, groups of cells.',
                    'Apoptosis: programmed, energy-dependent, membrane intact, no inflammation.',
                    'Give one example of each.',
                    'Explain the clinical relevance.',
                ],
            },
            {
                question: 'Describe the cardinal signs of acute inflammation and their mechanisms.',
                marks: '15 marks',
                outline: [
                    'Redness and heat from vasodilatation.',
                    'Swelling from increased permeability and exudate.',
                    'Pain from mediators and pressure.',
                    'Loss of function from pain and tissue disruption.',
                    'Name the main mediators briefly.',
                ],
            },
        ],
        glossary: [
            { term: 'Aetiology', definition: 'The cause of a disease.' },
            { term: 'Pathogenesis', definition: 'The mechanism by which a cause produces disease.' },
            { term: 'Homeostasis', definition: 'Maintenance of a stable internal environment.' },
            { term: 'Necrosis', definition: 'Cell death with membrane rupture, provoking inflammation.' },
            { term: 'Apoptosis', definition: 'Programmed cell death without inflammation.' },
            { term: 'Metaplasia', definition: 'Reversible change of one mature cell type into another.' },
            { term: 'Oedema', definition: 'Accumulation of fluid in tissue spaces.' },
            { term: 'Exudate', definition: 'Protein-rich fluid produced by inflammation.' },
            { term: 'Neoplasia', definition: 'New, uncontrolled cell growth forming a tumour.' },
            { term: 'Metastasis', definition: 'Spread of malignant cells to distant sites.' },
            { term: 'Sensitivity', definition: 'The proportion of diseased people a test correctly identifies.' },
            { term: 'Specificity', definition: 'The proportion of healthy people a test correctly clears.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Concepts', focus: 'Injury.', tasks: ['Define the four questions.', 'List five cellular adaptations.', 'Compare reversible and irreversible injury.'] },
            { week: 'Week 2 - Inflammation', focus: 'Response.', tasks: ['Explain the cardinal signs.', 'Distinguish acute from chronic.', 'Describe one repair pathway.'] },
            { week: 'Week 3 - Neoplasia', focus: 'Growth.', tasks: ['Compare benign and malignant.', 'Explain oncogenes and tumour suppressors.', 'List three risk factors.'] },
            { week: 'Week 4 - Investigation', focus: 'Evidence.', tasks: ['Explain sensitivity and specificity.', 'Work one predictive value example.', 'Describe specimen handling.'] },
        ],
        readingList: [
            'Any pathology text covering cell injury, inflammation and neoplasia.',
            'A clinical laboratory handbook on specimen handling.',
            'An epidemiology primer on diagnostic test interpretation.',
        ],
    },
})

Object.assign(THEATRE_FILM_DEPTH, {
    'med-101-introduction-to-medicine': {
        sections: [
            {
                heading: 'The clinical method',
                paragraphs: [
                    'Medicine begins with a structured approach: history, examination, differential diagnosis, investigation, management. Each stage narrows the possibilities before the next, and most diagnoses are made from the history alone.',
                    'A differential is a working list ranked by likelihood and by danger. Rank by what is common, but never omit what is fatal - a rare diagnosis that kills matters more than a common one that resolves. This is the principle behind ruling out the worst first.',
                    'Management has four components: supportive care, specific treatment, prevention of complications, and communication with the patient. Students focus on the second and neglect the rest, which is why communication and consent are examined as clinical skills.',
                ],
            },
            {
                heading: 'Systems and red flags',
                paragraphs: [
                    'Chest pain is characterised by site, radiation, character, timing, aggravating and relieving factors and associated symptoms; red flags include pain at rest, diaphoresis and breathlessness. In respiratory disease, cough, sputum, haemoptysis, breathlessness and fever are the essentials.',
                    'The abdomen is examined in the order inspection, auscultation, percussion, palpation - auscultation before palpation because palpation alters bowel sounds. The neurological examination assesses conscious level, cranial nerves, tone, power, reflexes, sensation, coordination and gait.',
                    'Red flags require urgent action rather than routine follow-up: weight loss with night sweats, sudden severe headache, bleeding from any orifice, focal neurological deficit, and sepsis markers. Recognising them early is more valuable than memorising rare conditions.',
                ],
                callout: {
                    title: 'The most useful question',
                    body: 'Ask "what else could this be?" at every point. A single diagnosis reached too early is the commonest cause of clinical error.',
                },
            },
            {
                heading: 'Ethics, consent and professionalism',
                paragraphs: [
                    'Consent must be informed, voluntary and given with capacity. Informed means the patient understands the diagnosis, the proposed intervention, the alternatives and the material risks.',
                    'Confidentiality has narrow exceptions: risk to others, statutory reporting, and the patient\'s own consent. Discussing a case in a public corridor is a breach, not a conversation.',
                    'Professional boundaries mean being honest about your level of training, never acting beyond competence, and reporting errors. Concealing mistakes harms patients more than the mistakes themselves.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'A differential for chest pain',
                brief: 'A 22-year-old has sudden chest pain and breathlessness after a long bus journey.',
                steps: [
                    'List candidates: musculoskeletal, pneumonia, pneumothorax, pulmonary embolism, anxiety, cardiac.',
                    'Rank by likelihood: musculoskeletal and anxiety are common in the young.',
                    'Flag the dangerous: pulmonary embolism and pneumothorax.',
                    'Note the risk factor: prolonged immobility.',
                    'Specify immediate assessment: observations, saturation, chest examination.',
                    'State what would change the ranking: hypoxia, unilateral reduced breath sounds, tachycardia.',
                ],
                takeaway: 'Rank by likelihood, but never let a dangerous possibility drop off the list.',
            },
            {
                title: 'A focused history',
                brief: 'A patient reports headache. What must you establish?',
                steps: [
                    'Onset: sudden severe onset is a red flag.',
                    'Character, site, radiation, severity.',
                    'Associated features: fever, neck stiffness, visual change, vomiting, neurological symptoms.',
                    'Aggravating and relieving factors, including analgesia use.',
                    'Past history: hypertension, trauma, migraine, medication.',
                    'Decide: urgent referral or routine assessment.',
                ],
                takeaway: 'Onset first. Sudden severe headache is a different problem from a gradual one.',
            },
        ],
        examBank: [
            {
                question: 'Explain the components of informed consent.',
                marks: '15 marks',
                outline: [
                    'Capacity, voluntariness, information.',
                    'What information: diagnosis, treatment, alternatives, material risks.',
                    'Who may obtain it.',
                    'Exceptions: emergency and statutory.',
                ],
            },
            {
                question: 'Describe the structure of a clinical history.',
                marks: '15 marks',
                outline: [
                    'Presenting complaint and chronology.',
                    'History of the presenting complaint.',
                    'Past medical, drug, family and social history.',
                    'Review of systems.',
                    'Explain why structure reduces missed information.',
                ],
            },
        ],
        glossary: [
            { term: 'Differential diagnosis', definition: 'A ranked list of possible diagnoses for a presentation.' },
            { term: 'Red flag', definition: 'A finding indicating serious disease and requiring urgent action.' },
            { term: 'Presenting complaint', definition: 'The problem the patient reports as the reason for attendance.' },
            { term: 'Review of systems', definition: 'A structured enquiry across body systems.' },
            { term: 'Capacity', definition: 'The ability to understand and weigh information to decide.' },
            { term: 'Informed consent', definition: 'Agreement given voluntarily with adequate understanding.' },
            { term: 'Confidentiality', definition: 'The duty not to disclose patient information without justification.' },
            { term: 'Triage', definition: 'Sorting patients by urgency to allocate care safely.' },
            { term: 'Sepsis', definition: 'Life-threatening organ dysfunction from a dysregulated response to infection.' },
            { term: 'Iatrogenic', definition: 'Caused by medical examination or treatment.' },
            { term: 'Prognosis', definition: 'The likely course and outcome of a condition.' },
            { term: 'Professional boundary', definition: 'The limit of role and competence within which a clinician may act.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Method', focus: 'Reasoning.', tasks: ['Take three simulated histories.', 'Write a differential for each.', 'Identify one red flag per case.'] },
            { week: 'Week 2 - Examination', focus: 'Systems.', tasks: ['Practise cardiovascular examination in order.', 'Practise abdominal examination in order.', 'State normal findings aloud.'] },
            { week: 'Week 3 - Ethics', focus: 'Consent.', tasks: ['Write a consent script.', 'List confidentiality exceptions.', 'Discuss one incident-reporting scenario.'] },
            { week: 'Week 4 - Integration', focus: 'Cases.', tasks: ['Work three paper cases.', 'Rank differentials by likelihood and danger.', 'Present a case in three minutes.'] },
        ],
        readingList: [
            'A clinical skills textbook covering history and examination.',
            'A medical ethics text for undergraduates.',
            'Your faculty\'s professional conduct guidelines.',
        ],
    },

    'nur-101-fundamentals-of-nursing': {
        sections: [
            {
                heading: 'The nursing process',
                paragraphs: [
                    'Nursing practice is organised through assessment, diagnosis, planning, implementation and evaluation - a problem-solving cycle, not a form. Assessment gathers subjective and objective data; the nursing diagnosis identifies the patient\'s response to a health problem; planning sets measurable goals; implementation delivers care; evaluation checks whether goals were met.',
                    'The distinction between medical and nursing diagnosis is examinable. A medical diagnosis names a disease; a nursing diagnosis names a human response such as impaired comfort or risk of infection. Interventions follow from the response, so two patients with the same disease may need different plans.',
                    'Documentation is part of the process. What is not recorded is treated as not done, because the record is the legal account of care. Objective, timed, signed entries protect the patient and the nurse.',
                ],
            },
            {
                heading: 'Vital signs, hygiene and safety',
                paragraphs: [
                    'Vital signs - temperature, pulse, respiration, blood pressure and oxygen saturation - are the earliest indicators of deterioration. Measure correctly, record accurately, and act on abnormal values immediately.',
                    'Infection prevention is the single most effective intervention: hand hygiene before and after every contact, correct glove use, aseptic technique for invasive procedures, and safe sharps disposal. Most hospital-acquired infection is preventable and the prevention is unglamorous.',
                    'Patient safety includes fall prevention, pressure area care, medication safety and correct identification. The five rights of medication administration exist because each has been the site of fatal error; accurate documentation is the sixth.',
                ],
                callout: {
                    title: 'Escalate early',
                    body: 'A rising respiratory rate is the most sensitive early sign of deterioration. Report it rather than waiting to be sure.',
                },
            },
            {
                heading: 'Communication, ethics and boundaries',
                paragraphs: [
                    'Communication is a clinical skill. Open questions gather information, closed questions confirm it, summarising checks understanding, and silence is a tool. Teach-back confirms that instructions were understood.',
                    'Ethical practice rests on autonomy, beneficence, non-maleficence and justice. Consent, confidentiality, truthfulness and advocacy follow from them. Advocacy means representing the patient when they cannot.',
                    'The therapeutic relationship has boundaries. Kindness is professional; entanglement is not. Cultural sensitivity, privacy and awareness of your own reactions are part of competence.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Writing a care plan',
                brief: 'A post-operative patient is reluctant to move and breathes shallowly.',
                steps: [
                    'Assessment: reduced mobility, shallow respirations, pain on movement, saturation at the lower limit.',
                    'Nursing diagnosis: ineffective breathing pattern related to pain and immobility.',
                    'Goal: saturation within normal range and hourly deep breathing.',
                    'Interventions: prescribed analgesia, positioning, spirometry teaching, hourly reinforcement.',
                    'Evaluation: record saturation, breath sounds and adherence each shift.',
                    'State escalation criteria explicitly.',
                ],
                takeaway: 'A care plan names the response, the goal, the action and the evidence of evaluation.',
            },
            {
                title: 'Handling a medication error',
                brief: 'You realise you gave a drug an hour late.',
                steps: [
                    'Assess the patient and take observations.',
                    'Inform the nurse in charge without delay.',
                    'Complete an incident report factually, without blame.',
                    'Record the event and actions in the notes.',
                    'Inform the prescriber if clinically significant.',
                    'Reflect on the system cause, not only individual attention.',
                ],
                takeaway: 'Report, assess, document, learn. Concealment turns an error into misconduct.',
            },
        ],
        examBank: [
            {
                question: 'Explain the five steps of the nursing process.',
                marks: '15 marks',
                outline: [
                    'Assessment of subjective and objective data.',
                    'Diagnosis of the patient\'s response.',
                    'Planning of measurable goals.',
                    'Implementation of interventions.',
                    'Evaluation against goals, with revision.',
                    'Note that the process is cyclical.',
                ],
            },
            {
                question: 'Discuss the nurse\'s role in infection prevention.',
                marks: '15 marks',
                outline: [
                    'Hand hygiene and its indications.',
                    'Aseptic technique for invasive procedures.',
                    'Personal protective equipment.',
                    'Sharps disposal and waste segregation.',
                    'Isolation precautions and patient education.',
                ],
            },
        ],
        glossary: [
            { term: 'Nursing process', definition: 'A five-step problem-solving cycle from assessment to evaluation.' },
            { term: 'Nursing diagnosis', definition: 'A statement of a patient\'s response, distinct from a medical diagnosis.' },
            { term: 'Aseptic technique', definition: 'Practices preventing contamination of a site or equipment.' },
            { term: 'Vital signs', definition: 'Temperature, pulse, respiration, blood pressure and oxygen saturation.' },
            { term: 'Tachypnoea', definition: 'Abnormally rapid breathing, an early sign of deterioration.' },
            { term: 'Five rights', definition: 'Right patient, drug, dose, route and time.' },
            { term: 'Incident report', definition: 'A factual record of an adverse event for review and learning.' },
            { term: 'Advocacy', definition: 'Acting to protect a patient\'s interests.' },
            { term: 'Autonomy', definition: 'The patient\'s right to make informed decisions about care.' },
            { term: 'Pressure area care', definition: 'Interventions preventing skin breakdown in immobile patients.' },
            { term: 'Teach-back', definition: 'Asking a patient to restate information to confirm understanding.' },
            { term: 'Escalation', definition: 'Referring a deteriorating patient promptly to a senior clinician.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Process', focus: 'Structure.', tasks: ['Write a care plan for one case.', 'Distinguish nursing from medical diagnoses.', 'Practise objective documentation.'] },
            { week: 'Week 2 - Observations', focus: 'Vital signs.', tasks: ['Record vital signs for five patients.', 'State normal ranges.', 'Identify two escalation triggers.'] },
            { week: 'Week 3 - Safety', focus: 'Infection and medication.', tasks: ['Demonstrate hand hygiene.', 'List the five rights.', 'Describe sharps disposal.'] },
            { week: 'Week 4 - Communication', focus: 'Patients.', tasks: ['Practise open-question interviews.', 'Use teach-back.', 'Discuss one ethical scenario.'] },
        ],
        readingList: [
            'Any fundamentals of nursing text covering the nursing process.',
            'Your clinical skills laboratory procedure checklists.',
            'Your institution\'s infection prevention policy.',
        ],
    },

    'mls-101-introduction-to-medical-laboratory-science': {
        sections: [
            {
                heading: 'The laboratory\'s place in diagnosis',
                paragraphs: [
                    'Laboratory results influence most clinical decisions, which makes accuracy a patient safety issue. The discipline covers haematology, clinical chemistry, microbiology, histopathology, immunology and blood transfusion, each with its own methods and quality requirements.',
                    'Every result passes through a chain: patient identification, collection, transport, preparation, analysis, validation and reporting. Most errors occur before the analyser is involved - wrong tube, insufficient volume, delayed transport, mislabelling.',
                    'Reference ranges describe the central 95 per cent of a healthy population; they are not thresholds of health. A result outside the range may be normal for that individual, and interpretation always requires clinical context.',
                ],
            },
            {
                heading: 'Specimen quality and safety',
                paragraphs: [
                    'Collection technique determines result quality. Venepuncture requires the correct order of draw to avoid cross-contamination between tube additives, adequate mixing, and labelling at the bedside. Haemolysed samples distort potassium and other analytes.',
                    'Urine, stool, sputum and swab samples each have collection requirements, and a poor sample produces a misleading result regardless of analyser quality.',
                    'Biosafety is daily discipline: gloves, lab coats, eye protection, no eating or drinking, correct decontamination, and safe disposal. Universal precautions assume every sample is infectious.',
                ],
                callout: {
                    title: 'Label at the bedside',
                    body: 'A specimen labelled away from the patient may belong to someone else. No result is worth that risk.',
                },
            },
            {
                heading: 'Quality control and assurance',
                paragraphs: [
                    'Quality control runs samples of known value alongside patient samples. Control results plotted on a chart reveal drift and shifts before they affect patients. A failed control means results are held until the cause is found.',
                    'Quality assurance is broader: staff competence, equipment maintenance, calibration, documentation and external proficiency testing, where the laboratory is assessed against peers on the same samples.',
                    'Accreditation is external recognition that a laboratory meets a defined standard. It requires documented procedures, records, audits and corrective action - not good intentions.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Investigating a discrepant result',
                brief: 'A patient\'s potassium is markedly raised but the patient has no symptoms.',
                steps: [
                    'Check for haemolysis - the commonest cause of spurious hyperkalaemia.',
                    'Check collection: tourniquet time, fist clenching, needle size.',
                    'Check for EDTA contamination from an earlier draw.',
                    'Check the delay between collection and analysis.',
                    'Request a repeat sample with correct technique.',
                    'Never release an implausible critical result without investigating.',
                ],
                takeaway: 'An implausible result is a specimen question before it is a patient question.',
            },
            {
                title: 'Reading a control chart',
                brief: 'Controls drift upward for a week but stay within limits.',
                steps: [
                    'Recognise a trend rather than random variation.',
                    'Consider reagent ageing, lamp deterioration, calibration drift, temperature.',
                    'Check maintenance and calibration records.',
                    'Recalibrate and re-run controls.',
                    'Document the investigation and corrective action.',
                    'Review whether patient results in that period need retesting.',
                ],
                takeaway: 'Trends are warnings. Waiting for a control to fail means waiting for a wrong result.',
            },
        ],
        examBank: [
            {
                question: 'Explain the pre-analytical, analytical and post-analytical phases and where errors occur.',
                marks: '20 marks',
                outline: [
                    'Define each phase with examples.',
                    'State that most errors are pre-analytical.',
                    'Give three pre-analytical errors and their effects.',
                    'Name controls that reduce them.',
                    'Conclude that quality is a pathway property.',
                ],
            },
            {
                question: 'Distinguish quality control from quality assurance.',
                marks: '10 marks',
                outline: [
                    'Control monitors method performance on known samples.',
                    'Assurance covers the wider system of competence and audit.',
                    'Explain why control alone is insufficient.',
                ],
            },
        ],
        glossary: [
            { term: 'Reference range', definition: 'The interval containing the central 95 per cent of healthy values.' },
            { term: 'Haemolysis', definition: 'Red cell breakdown releasing contents that distort results.' },
            { term: 'Order of draw', definition: 'The sequence for filling tubes to prevent additive cross-contamination.' },
            { term: 'Quality control', definition: 'Running known samples to verify method performance.' },
            { term: 'Quality assurance', definition: 'The whole system ensuring reliability from competence to audit.' },
            { term: 'Proficiency testing', definition: 'External comparison of results with peer laboratories.' },
            { term: 'Calibration', definition: 'Adjusting an instrument against known standards.' },
            { term: 'Critical value', definition: 'A result requiring immediate clinical notification.' },
            { term: 'Asepsis', definition: 'The absence of pathogenic microorganisms.' },
            { term: 'Universal precautions', definition: 'Treating all samples as potentially infectious.' },
            { term: 'Accreditation', definition: 'External recognition that a laboratory meets a standard.' },
            { term: 'Sensitivity', definition: 'A test\'s ability to detect disease when present.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Pathway', focus: 'Phases.', tasks: ['Map the specimen pathway.', 'List three pre-analytical errors.', 'Explain reference ranges.'] },
            { week: 'Week 2 - Collection', focus: 'Technique.', tasks: ['Practise order of draw.', 'Label at the bedside.', 'Identify haemolysis causes.'] },
            { week: 'Week 3 - Safety', focus: 'Biosafety.', tasks: ['Demonstrate PPE use.', 'Describe sharps disposal.', 'Explain universal precautions.'] },
            { week: 'Week 4 - Quality', focus: 'Control.', tasks: ['Interpret a control chart.', 'Describe a corrective action.', 'Explain accreditation.'] },
        ],
        readingList: [
            'Any medical laboratory science text on collection and quality management.',
            'A clinical chemistry handbook on interferences and critical values.',
            'Your laboratory\'s biosafety manual.',
        ],
    },
})

// ── Study skills ──────────────────────────────────────────────────────────
Object.assign(THEATRE_FILM_DEPTH, {
    'how-to-study-at-university': {
        sections: [
            {
                heading: 'University is a different kind of study',
                paragraphs: [
                    'In secondary school someone decided what you would learn, checked daily that you had learned it, and tested you on it in the same form it was taught. At university you are given a reading list and a deadline. Nobody checks whether you understood week three. That shift - from supervised coverage to self-managed understanding - is the single biggest reason capable students struggle in first year.',
                    'The practical consequence is that you must build your own feedback loop. There is no teacher checking your notes, so you check them: can you explain the concept without looking, can you answer a past question on it, can you identify what you still cannot do?',
                    'A semester has roughly twelve to fourteen teaching weeks. Divide the syllabus by those weeks now, at the start, and you have a map. Students who discover this map in the week before examinations are not lazy; they were never shown the arithmetic.',
                ],
            },
            {
                heading: 'The weekly routine that actually works',
                paragraphs: [
                    'Three habits carry most of the result. First, attend and take usable notes: date, topic, key claims, and - critically - a list of the three things you did not understand. Second, do a short review within twenty-four hours, because forgetting begins immediately and a ten-minute review changes the curve. Third, test yourself rather than reread: close the book and write what the topic contained.',
                    'Plan by week, not by day. A weekly list of outcomes - "be able to apply X", "finish chapter 4", "write the introduction" - survives disruptions that a minute-by-minute timetable does not. Put fixed commitments (classes, work, worship, family) in first, then schedule study around them, then protect one unscheduled block as buffer.',
                    'Study in blocks of twenty-five to forty-five minutes with a short break, and remove the phone from the room rather than turning it face down. Concentration is not willpower; it is an environment you build.',
                ],
                callout: {
                    title: 'The three-question check',
                    body: 'After every study block ask: what did I learn, what can I now do, and what is still unclear? Write the answers down. That page is your revision plan.',
                },
            },
            {
                heading: 'Reading, notes and getting help',
                paragraphs: [
                    'You cannot read everything on a reading list. Read actively: preview headings, read the introduction and conclusion, then the section you actually need. Take notes in your own words with a page reference, because a copied paragraph is not a note - it is a quotation you will later fail to attribute.',
                    'Keep one notebook or document per course, with three sections: lecture notes, reading notes, and a running list of questions. The questions list is the most valuable part, because it tells you where to spend your next study block.',
                    'Ask for help early and specifically. "I do not understand this course" is hard to answer; "I follow the definition but I cannot apply it to this kind of problem" is easy to answer. Lecturers, course representatives, study groups and the library all exist for this - using them is not weakness, it is procedure.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Building a semester plan',
                brief: 'You have five courses, twelve weeks, and a part-time job on weekends.',
                steps: [
                    'List each course and its assessment weights and deadlines.',
                    'Block fixed commitments: classes, work, travel, worship, sleep.',
                    'For each course, divide readings by the twelve teaching weeks.',
                    'Reserve two hours per course per week for review and self-testing.',
                    'Mark the three weeks with the heaviest deadlines and shift reading earlier in those weeks.',
                    'Keep one evening a week unassigned as buffer for illness or overrun.',
                ],
                takeaway: 'Plan backwards from deadlines, and protect a buffer. A plan with no slack breaks in week three.',
            },
            {
                title: 'Fixing a lost week',
                brief: 'You missed four lectures and are behind in two courses.',
                steps: [
                    'Do not try to catch up by rereading everything.',
                    'Get the lecture outlines and one set of notes from a reliable classmate.',
                    'For each missed topic, write the three-question check: what is it, what can I do with it, what is unclear.',
                    'Book one hour with the lecturer or a tutor for the unclear items only.',
                    'Complete the current week\'s work first, then backfill the oldest gap that later topics depend on.',
                    'Adjust the semester plan rather than pretending nothing happened.',
                ],
                takeaway: 'Triage by dependency, not by chronology. Catch up the foundation first.',
            },
        ],
        examBank: [
            {
                question: 'Explain why rereading is a weak study method and what should replace it.',
                marks: '10 marks',
                outline: [
                    'Rereading produces familiarity, not retrievability.',
                    'It gives no feedback about what you cannot recall.',
                    'Replace with closed-book recall, self-testing and past questions.',
                    'Explain the testing effect and spacing.',
                ],
            },
            {
                question: 'Describe a weekly study routine that fits a student with a part-time job.',
                marks: '15 marks',
                outline: [
                    'Fixed commitments first.',
                    'Weekly outcomes rather than daily timetables.',
                    'Short review within twenty-four hours.',
                    'Blocks of twenty-five to forty-five minutes.',
                    'One buffer block kept free.',
                ],
            },
        ],
        glossary: [
            { term: 'Active recall', definition: 'Retrieving information from memory rather than recognising it in a text.' },
            { term: 'Spaced practice', definition: 'Distributing study across days rather than massing it before a test.' },
            { term: 'Testing effect', definition: 'The improvement in retention produced by being tested rather than rereading.' },
            { term: 'Interleaving', definition: 'Mixing different topics or problem types within a study session.' },
            { term: 'Reading list', definition: 'The set of sources a course expects you to consult.' },
            { term: 'Formative feedback', definition: 'Information about your current performance that guides the next step.' },
            { term: 'Buffer block', definition: 'Deliberately unscheduled time that absorbs overruns and illness.' },
            { term: 'Course outline', definition: 'The document stating topics, assessment weights and deadlines.' },
            { term: 'Study group', definition: 'Peers who meet to test and explain material to each other.' },
            { term: 'Deep work', definition: 'Focused effort on a cognitively demanding task without interruption.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Map', focus: 'The semester.', tasks: ['List all deadlines and weights.', 'Divide readings across teaching weeks.', 'Identify the three heaviest weeks.'] },
            { week: 'Week 2 - Routine', focus: 'Habits.', tasks: ['Run three study blocks daily for five days.', 'Review each lecture within 24 hours.', 'Record what you could not recall.'] },
            { week: 'Week 3 - Retrieval', focus: 'Testing.', tasks: ['Close-book recall for each course.', 'Answer one past question per course.', 'List the weakest three topics.'] },
            { week: 'Week 4 - Repair', focus: 'Gaps.', tasks: ['Spend one block per weak topic.', 'Ask one specific question of a lecturer.', 'Update the semester plan.'] },
        ],
        readingList: [
            'A study skills guide covering active recall and spaced practice.',
            'Your faculty handbook for assessment rules and deadlines.',
            'A guide to academic reading for first-year students.',
        ],
    },

    'note-taking-and-lecture-skills': {
        sections: [
            {
                heading: 'A lecture is an argument, not dictation',
                paragraphs: [
                    'Lecturers speak in structures even when they do not announce them. Common patterns: cause and effect, comparison, problem and solution, chronological development, and claim-evidence-conclusion. If you can hear the pattern in the first three minutes, your notes organise themselves.',
                    'Signals tell you what matters: "there are three reasons", "the important point is", "this contrasts with", "note that", "in the exam". Write those phrases down verbatim; they are the lecturer telling you what will be assessed.',
                    'You cannot write everything and you should not try. The aim is a usable record: enough to reconstruct the argument later, not a transcript. Students who transcribe lose the reasoning because their attention is on the words rather than the structure.',
                ],
            },
            {
                heading: 'Systems that work',
                paragraphs: [
                    'The Cornell layout divides a page into a wide notes column, a narrow cue column and a summary strip at the bottom. You write notes during the lecture, cues and questions afterwards, and a two-sentence summary at the end. The value is in the second pass, which forces retrieval.',
                    'For scientific and technical content, diagrams and worked examples matter more than prose. Copy the diagram, then label it from memory later. For humanities lectures, record the argument and the evidence offered for it, plus the strongest counter-argument mentioned.',
                    'Whatever the system, the notes must contain three things: what the topic is, the key claims with their support, and your own questions. A page with none of the third is a page you have not engaged with.',
                ],
                callout: {
                    title: 'Review within 24 hours',
                    body: 'Ten minutes of tidying and self-testing the day after a lecture is worth more than an hour of rereading it the week before examinations.',
                },
            },
            {
                heading: 'Listening, asking and recording',
                paragraphs: [
                    'Active listening means predicting what comes next and checking whether you were right. When the lecturer gives an example, ask what general principle it illustrates. When a definition is given, ask what it excludes.',
                    'Ask questions in the moment if the lecture allows, otherwise write them and ask after the class or by email. A specific question gets a specific answer: "you said the policy failed because of implementation - was that funding or capacity?" is answerable; "I did not understand the policy part" is not.',
                    'If you record audio, ask permission, and never rely on the recording instead of notes. A recording you never revisit is a substitute for attention, not a support for it.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Cornell page for one lecture',
                brief: 'Set up a page for a lecture titled "Sources of Nigerian law".',
                steps: [
                    'Top line: course code, date, lecturer, topic.',
                    'Notes column: the sources listed, with one line of explanation each.',
                    'Mark the lecturer\'s signal phrases where they appeared.',
                    'Cue column afterwards: "What is the hierarchy?", "What is the repugnancy test?", "Which source is supreme?"',
                    'Summary strip: two sentences stating the lecture\'s argument.',
                    'Transfer the unanswered cues to your questions list.',
                ],
                takeaway: 'The cues and summary are written after the lecture. That second pass is where learning happens.',
            },
            {
                title: 'Rescuing bad notes',
                brief: 'Your notes from last week are unreadable fragments.',
                steps: [
                    'Do not copy them out as they are.',
                    'Get the lecture topic and outline from the course outline or a classmate.',
                    'Reconstruct the structure: what were the main sections?',
                    'Fill each section either from memory first, then from the textbook.',
                    'Mark the gaps you cannot fill and ask about them.',
                    'Adopt one note system immediately so this does not recur.',
                ],
                takeaway: 'Reconstruct from structure first, memory second, source third.',
            },
        ],
        examBank: [
            {
                question: 'Explain why transcription is an ineffective note-taking strategy.',
                marks: '10 marks',
                outline: [
                    'Attention is on words rather than structure.',
                    'No processing occurs, so no encoding.',
                    'Transcripts are long and never reviewed.',
                    'Replacement: structured notes with cues and summary.',
                ],
            },
            {
                question: 'Describe the Cornell note-taking system and its purpose.',
                marks: '10 marks',
                outline: [
                    'Notes column during the lecture.',
                    'Cue column for questions afterwards.',
                    'Summary strip at the bottom.',
                    'Explain the retrieval value of the second pass.',
                ],
            },
        ],
        glossary: [
            { term: 'Cornell notes', definition: 'A page layout with notes, cue questions and a summary strip.' },
            { term: 'Signposting', definition: 'Phrases a speaker uses to signal structure and importance.' },
            { term: 'Active listening', definition: 'Listening with prediction and checking rather than passive reception.' },
            { term: 'Cue column', definition: 'The narrow margin where questions and keywords are written after a lecture.' },
            { term: 'Transcript', definition: 'A verbatim record of speech, distinct from structured notes.' },
            { term: 'Encoding', definition: 'The process by which information enters long-term memory.' },
            { term: 'Retrieval', definition: 'Bringing stored information back into awareness.' },
            { term: 'Course outline', definition: 'The document listing topics and assessment for a course.' },
            { term: 'Concept map', definition: 'A diagram linking concepts by labelled relationships.' },
            { term: 'Paraphrase', definition: 'Restating content in your own words.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Structure', focus: 'Hearing the pattern.', tasks: ['Identify the structure of three lectures.', 'Copy signal phrases verbatim.', 'Set up Cornell pages.'] },
            { week: 'Week 2 - System', focus: 'Consistency.', tasks: ['Use one system for every lecture.', 'Complete cue columns the same day.', 'Write summaries in two sentences.'] },
            { week: 'Week 3 - Review', focus: 'Retrieval.', tasks: ['Self-test from cues for three lectures.', 'Redraw one diagram from memory.', 'Log unanswered questions.'] },
            { week: 'Week 4 - Repair', focus: 'Gaps.', tasks: ['Reconstruct one bad set of notes.', 'Ask two specific questions.', 'Compare notes with a classmate.'] },
        ],
        readingList: [
            'A study skills guide section on lecture note-taking.',
            'Your course outlines for topic structures.',
            'A guide to concept mapping for revision.',
        ],
    },

    'exam-preparation-and-revision': {
        sections: [
            {
                heading: 'Revision is retrieval under exam conditions',
                paragraphs: [
                    'Most students revise by reading notes and highlighting, which produces a feeling of familiarity that collapses in the exam hall. The exam does not ask you to recognise your notes; it asks you to produce an answer from memory within a time limit. So revision must practise that exact activity.',
                    'Past questions are the best available evidence of what the examiner values. Work them closed-book, under time, then mark your own answer against the course outline and the marks available. The gap between what you wrote and what was required is your revision list.',
                    'Distribute practice across the weeks before the exam. Five sessions of one hour across five days beats one five-hour session, because each session begins with forgetting that must be overcome - and that effort is what consolidates memory.',
                ],
            },
            {
                heading: 'The revision plan',
                paragraphs: [
                    'Start from the syllabus, not from the notes. For each topic, rate your confidence honestly: can explain, can apply, can analyse, cannot yet. Sort the topics into those three groups and allocate time by weakness, not by comfort. Students revise what they already know because it feels productive.',
                    'Build a one-page summary per topic - not a rewrite of the notes, but the skeleton: definitions, key claims, one worked example, one common error. If you cannot produce the page from memory, you do not yet know the topic.',
                    'Practise the format. If the exam has multiple choice, practise speed and elimination; if it has essays, practise planning in five minutes and writing in thirty-five; if it has calculations, practise under time with the formula sheet you will actually be given.',
                ],
                callout: {
                    title: 'The blank page test',
                    body: 'Take a blank sheet, write the topic heading, and reproduce everything you know in five minutes. Then check. That single exercise predicts exam performance better than any amount of highlighting.',
                },
            },
            {
                heading: 'The week before and the day itself',
                paragraphs: [
                    'In the final week, reduce new material to zero and increase retrieval. Sleep is part of revision: memory consolidation happens during sleep, and a night of cramming costs more than it gains.',
                    'Prepare logistics in advance - venue, time, identification, materials, transport - so that the morning is not a source of stress. Arrive early. Read the whole paper before starting and allocate minutes per question according to marks.',
                    'In the hall, answer the question asked. Underline the command word: define, explain, compare, discuss, evaluate, calculate. Each requires a different structure, and a brilliant answer to the wrong command scores poorly.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Turning a past paper into a revision plan',
                brief: 'You have four past papers and three weeks.',
                steps: [
                    'List every question by topic across the four papers.',
                    'Identify the topics that recur - these are core.',
                    'Sit one paper closed-book under time to establish a baseline.',
                    'Mark it against the outline and list what was missing.',
                    'Allocate the next two weeks to the recurring topics you performed worst on.',
                    'Sit the remaining papers in the final week under exam conditions.',
                ],
                takeaway: 'Recurrence identifies the core; your own marked answers identify the gaps.',
            },
            {
                title: 'Planning an essay answer in five minutes',
                brief: 'The question is: "Discuss the view that technology has improved education in Nigeria."',
                steps: [
                    'Underline the command: discuss means present both sides and reach a position.',
                    'Write a one-sentence position.',
                    'List three arguments for and two against, with one example each.',
                    'Choose an order that builds rather than alternates.',
                    'Allocate minutes per section according to marks.',
                    'Write, leaving two minutes to check that you answered the question.',
                ],
                takeaway: 'Position, arguments, order, timing. Planning costs five minutes and saves fifteen.',
            },
        ],
        examBank: [
            {
                question: 'Why is distributed practice more effective than massed practice?',
                marks: '10 marks',
                outline: [
                    'Each session begins with partial forgetting, requiring effortful retrieval.',
                    'Effortful retrieval consolidates memory.',
                    'Sleep between sessions supports consolidation.',
                    'Massed practice produces familiarity without durability.',
                ],
            },
            {
                question: 'Explain how command words change the structure of an answer.',
                marks: '15 marks',
                outline: [
                    'Define: state meaning precisely, with an example.',
                    'Explain: give reasons and mechanisms.',
                    'Compare: use criteria and cover both sides within each.',
                    'Discuss: present positions and reach a judgement.',
                    'Evaluate: assess against criteria and state a conclusion.',
                ],
            },
        ],
        glossary: [
            { term: 'Distributed practice', definition: 'Spacing study sessions over days rather than massing them.' },
            { term: 'Retrieval practice', definition: 'Recalling material from memory to strengthen it.' },
            { term: 'Command word', definition: 'The verb in a question that specifies the required structure.' },
            { term: 'Mark scheme', definition: 'The criteria used to allocate marks to an answer.' },
            { term: 'Baseline', definition: 'A first timed attempt used to measure current performance.' },
            { term: 'Consolidation', definition: 'The stabilising of memory, supported by sleep.' },
            { term: 'Formative self-assessment', definition: 'Marking your own work to identify gaps.' },
            { term: 'Time allocation', definition: 'Dividing exam minutes according to the marks available.' },
            { term: 'Topic skeleton', definition: 'A one-page summary of a topic\'s core structure.' },
            { term: 'Exam conditions', definition: 'Closed-book, timed practice that mirrors the real assessment.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Audit', focus: 'Baseline.', tasks: ['Sit one past paper closed-book and timed.', 'Mark it against the outline.', 'List the three weakest topics.'] },
            { week: 'Week 2 - Repair', focus: 'Weak topics.', tasks: ['Write one-page skeletons from memory.', 'Do five retrieval sessions across the week.', 'Re-test the weakest topic.'] },
            { week: 'Week 3 - Conditions', focus: 'Timing.', tasks: ['Sit two papers under exam conditions.', 'Practise planning in five minutes.', 'Check command-word structures.'] },
            { week: 'Week 4 - Taper', focus: 'Consolidation.', tasks: ['Reduce new material.', 'Review skeletons only.', 'Protect sleep and logistics.'] },
        ],
        readingList: [
            'A revision guide covering retrieval practice and spacing.',
            'Past papers and mark schemes for your courses.',
            'Your faculty examination regulations.',
        ],
    },

    'time-management-and-procrastination': {
        sections: [
            {
                heading: 'Procrastination is an emotional problem, not a scheduling one',
                paragraphs: [
                    'Procrastination is the voluntary delay of an intended task despite expecting to be worse off for it. It is not laziness, and it is rarely a failure to know what to do. It is usually avoidance of a feeling the task produces: fear of doing it badly, confusion about where to start, resentment at being made to do it, or dread of the effort.',
                    'This is why timetable apps alone do not fix it. A better plan does not remove the feeling, so the avoidance simply moves to the next task. What helps is reducing the emotional cost of starting: making the first step tiny, removing ambiguity about what "start" means, and tolerating the discomfort for a short, defined period.',
                    'The two-minute rule works because it changes the question from "can I finish this?" to "can I begin this?" Beginning is where the resistance is; once begun, most tasks continue.',
                ],
            },
            {
                heading: 'Planning that survives real life',
                paragraphs: [
                    'Plan in three horizons. The semester plan holds deadlines and assessment weights. The weekly plan holds outcomes. The daily list holds two or three concrete actions. If your daily list has twelve items, you have written a wish, not a plan.',
                    'Schedule by energy, not only by clock. Most people have a window of two to three hours when difficult work is possible; protect it for the hardest task rather than spending it on email and messages. Put administrative work in the low-energy periods.',
                    'Estimate honestly by tracking. Most people underestimate task duration by a factor of one and a half to two. Time your actual work for a week, then multiply future estimates accordingly.',
                ],
                callout: {
                    title: 'Name the next physical action',
                    body: '"Study for test" is not an action. "Open the past paper and answer question one" is. Vague tasks are avoided; concrete ones are started.',
                },
            },
            {
                heading: 'Focus, distraction and recovery',
                paragraphs: [
                    'Distraction is cheaper to prevent than to resist. Put the phone in another room, close unrelated tabs, and decide in advance what you will do when you feel the urge to check. A pre-committed alternative - stand up, drink water, return - is more effective than willpower.',
                    'Work in defined blocks with a stated single objective. At the end of each block, note where you stopped and what the next action is. This removes the cost of restarting, which is where most time is lost.',
                    'When you fall behind - and you will - triage rather than panic. Ask which deadline is closest, which task others depend on, and which can be negotiated. Contact the person early; almost every extension is easier to obtain before the deadline than after.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Breaking down an avoided task',
                brief: 'You have put off a 2,000-word assignment for two weeks.',
                steps: [
                    'Name the feeling: probably confusion about the topic or fear of the standard.',
                    'Reduce ambiguity: write the assignment question in your own words.',
                    'Set a ten-minute first action: find three sources and list their main claims.',
                    'Schedule the action at your high-energy window.',
                    'At the end of ten minutes, write the next action and stop if you want.',
                    'Repeat daily until the draft exists, then schedule editing separately.',
                ],
                takeaway: 'Shrink the first step until refusal feels absurd, and write the next action before you stop.',
            },
            {
                title: 'Triage when three deadlines collide',
                brief: 'Three assignments are due within four days.',
                steps: [
                    'List each with its weight and how much work remains.',
                    'Identify dependencies: does anything else wait on this?',
                    'Rank by weight times urgency, not by preference.',
                    'Contact the lecturer for the least tractable one immediately, with a specific request.',
                    'Allocate your best hours to the highest-ranked task.',
                    'Accept that one will be weaker, and choose deliberately which.',
                ],
                takeaway: 'Triage is choosing what to do less well, on purpose, rather than failing at everything.',
            },
        ],
        examBank: [
            {
                question: 'Explain procrastination as an emotional rather than a scheduling problem.',
                marks: '15 marks',
                outline: [
                    'Define procrastination and its voluntary, self-defeating character.',
                    'Name the emotions involved: fear, confusion, resentment, dread.',
                    'Explain why plans alone fail.',
                    'Describe interventions that reduce the cost of starting.',
                ],
            },
            {
                question: 'Describe a planning system with three horizons.',
                marks: '10 marks',
                outline: [
                    'Semester plan for deadlines.',
                    'Weekly plan for outcomes.',
                    'Daily list of two or three concrete actions.',
                    'Explain why each horizon fails alone.',
                ],
            },
        ],
        glossary: [
            { term: 'Procrastination', definition: 'Voluntary delay of an intended task despite expecting to be worse off.' },
            { term: 'Two-minute rule', definition: 'Committing to only the first two minutes of an avoided task.' },
            { term: 'Triage', definition: 'Ranking tasks by consequence when not all can be completed.' },
            { term: 'Energy window', definition: 'The period in a day when demanding cognitive work is possible.' },
            { term: 'Implementation intention', definition: 'A pre-decided plan of when, where and how an action will be done.' },
            { term: 'Task granularity', definition: 'The level of detail to which a task is broken down.' },
            { term: 'Buffer', definition: 'Unscheduled time reserved to absorb overruns.' },
            { term: 'Dependency', definition: 'A task that cannot start until another is complete.' },
            { term: 'Parkinson\'s law', definition: 'Work expands to fill the time available for it.' },
            { term: 'Deep work', definition: 'Uninterrupted focus on cognitively demanding work.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Diagnose', focus: 'Patterns.', tasks: ['Log where time actually goes for five days.', 'Name the tasks you avoid and the feeling.', 'Track how long tasks really take.'] },
            { week: 'Week 2 - Start', focus: 'First steps.', tasks: ['Apply the two-minute rule daily.', 'Write the next physical action for each task.', 'Remove the phone from the room.'] },
            { week: 'Week 3 - Plan', focus: 'Horizons.', tasks: ['Write a weekly outcome list.', 'Protect one energy window daily.', 'Keep a daily list of three actions.'] },
            { week: 'Week 4 - Recover', focus: 'Triage.', tasks: ['Practise ranking by consequence.', 'Make one early request for support.', 'Review estimates against actuals.'] },
        ],
        readingList: [
            'A book on procrastination research and interventions.',
            'A time management guide covering planning horizons.',
            'Your faculty\'s policy on extensions and late submission.',
        ],
    },

    'academic-writing-and-referencing': {
        sections: [
            {
                heading: 'The essay is an argument with a shape',
                paragraphs: [
                    'Academic writing exists to make and support a claim. The introduction states the question, the position and the route; body paragraphs each make one claim and support it; the conclusion states what has been established and what remains open. Everything else - background, definitions, context - serves that structure.',
                    'The most common weakness is a paragraph that reports rather than argues. If a paragraph could be replaced by a list of facts, it is not doing argumentative work. The fix is a topic sentence that makes a claim, followed by evidence, followed by a sentence explaining what the evidence shows.',
                    'Academic register is precise rather than ornate. Prefer the specific to the general, the active to the passive where the agent matters, and the short word to the long one. "The policy reduced enrolment in rural areas" is stronger than "the implementation of the aforementioned policy resulted in a diminution of enrolment within rural localities".',
                ],
            },
            {
                heading: 'Citation, quotation and avoiding plagiarism',
                paragraphs: [
                    'Citation does two jobs: it lets a reader check your evidence, and it distinguishes your contribution from other people\'s. Any idea, fact or phrase taken from a source needs a reference, whether quoted, paraphrased or summarised.',
                    'Quotations should be used sparingly and for a reason - because the wording matters, because you are invoking authority, or because you intend to disagree precisely. Always introduce a quotation, then analyse it. A quotation dropped into a sentence without comment is a gap in the argument.',
                    'Plagiarism includes copying, paraphrasing without citation, reusing your own previous work without acknowledgement, and submitting work written by someone else. The procedural defence is simple: take notes with page numbers at the time of reading, keep a running source list, and draft from notes rather than from open books.',
                ],
                callout: {
                    title: 'Cite as you write',
                    body: 'Adding references at the end is how citations get lost. Put the reference in the sentence as you draft; tidying the format later is easy, reconstructing the source is not.',
                },
            },
            {
                heading: 'Style, format and revision',
                paragraphs: [
                    'Learn one citation style properly - MLA, APA or Harvard as your department requires - and apply it consistently. Consistency matters more than which style, but inconsistency signals carelessness.',
                    'Structure the document: title page, introduction, headed sections, conclusion, reference list, appendices if required. Follow the word limit exactly; exceeding it is usually penalised. Use readable spacing and a consistent font.',
                    'Revise in passes rather than all at once: one pass for argument and structure, one for paragraph logic, one for sentence clarity, one for citation and mechanics. Reading aloud catches errors that silent reading hides. If possible, ask someone to read only the introduction and tell you what the essay argues - if they cannot, the introduction needs work.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Rebuilding a reporting paragraph',
                brief: '"Nigeria has many universities. Enrolment has increased. Funding has not increased. This has caused problems."',
                steps: [
                    'Identify the missing claim: what do these facts together show?',
                    'Draft a topic sentence making that claim.',
                    'Combine the facts into one or two sentences of evidence.',
                    'Add a sentence explaining the mechanism or consequence.',
                    'Cite the source of the enrolment and funding figures.',
                    'Result: a paragraph with a claim, evidence, explanation and reference.',
                ],
                takeaway: 'Facts do not argue. State what they show, then show it.',
            },
            {
                title: 'Integrating a quotation',
                brief: 'You want to use a critic\'s statement that the novel "refuses the comfort of resolution".',
                steps: [
                    'Introduce the source and the context of the claim.',
                    'Quote exactly, in quotation marks, with a page reference.',
                    'Explain what the phrase means in relation to the text.',
                    'Connect it to your own argument - agree, qualify or disagree.',
                    'Keep the quotation short enough that your analysis is longer than the quote.',
                ],
                takeaway: 'Introduce, quote, explain, connect. Four moves for every quotation.',
            },
        ],
        examBank: [
            {
                question: 'Explain what constitutes plagiarism and how to avoid it procedurally.',
                marks: '15 marks',
                outline: [
                    'Define plagiarism, including paraphrase and self-reuse.',
                    'Explain why citation alone does not make use legitimate - analysis is still required.',
                    'Describe the procedural defence: notes with pages, running source list, drafting from notes.',
                    'Note institutional consequences.',
                ],
            },
            {
                question: 'Describe the structure of an argumentative essay.',
                marks: '15 marks',
                outline: [
                    'Introduction: question, position, route.',
                    'Body: one claim per paragraph, with evidence and explanation.',
                    'Counter-argument and reply.',
                    'Conclusion: what is established and what remains open.',
                ],
            },
        ],
        glossary: [
            { term: 'Thesis statement', definition: 'The central claim an essay sets out to establish.' },
            { term: 'Topic sentence', definition: 'The sentence stating a paragraph\'s claim.' },
            { term: 'Paraphrase', definition: 'Restating a source\'s specific passage in your own words.' },
            { term: 'Plagiarism', definition: 'Presenting another\'s words, structure or work as your own.' },
            { term: 'In-text citation', definition: 'A brief reference in the body pointing to a full source entry.' },
            { term: 'Reference list', definition: 'Full details of every source cited, in the required style.' },
            { term: 'Academic register', definition: 'Formal, precise language suited to scholarly argument.' },
            { term: 'Cohesion', definition: 'The linking of sentences and paragraphs into a coherent whole.' },
            { term: 'Counter-argument', definition: 'The strongest case against your claim, which you must answer.' },
            { term: 'Word limit', definition: 'The permitted length, usually enforced with a penalty.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Argument', focus: 'Claims.', tasks: ['Write a thesis for two questions.', 'Draft one paragraph with claim, evidence, explanation.', 'Identify reporting sentences in old work.'] },
            { week: 'Week 2 - Sources', focus: 'Citation.', tasks: ['Practise paraphrasing without copying structure.', 'Build a reference list in the required style.', 'Integrate one quotation with analysis.'] },
            { week: 'Week 3 - Draft', focus: 'Structure.', tasks: ['Write a full draft to the word limit.', 'Check each paragraph\'s claim.', 'Add counter-argument and reply.'] },
            { week: 'Week 4 - Revise', focus: 'Clarity.', tasks: ['Revise in four separate passes.', 'Read aloud for sentence errors.', 'Check every citation against the source.'] },
        ],
        readingList: [
            'Your department\'s citation style guide.',
            'A guide to academic writing for undergraduates.',
            'Your institution\'s plagiarism policy.',
        ],
    },

    'memory-and-active-recall': {
        sections: [
            {
                heading: 'How memory actually works',
                paragraphs: [
                    'Memory is not a store that fills up; it is a set of processes. Information enters working memory, which is small and brief, and moves to long-term memory only through encoding. Retrieval is the act of bringing it back, and retrieval strength is what examinations measure.',
                    'Forgetting is not a malfunction. Without forgetting, you would be unable to distinguish what matters now. The forgetting curve is steep in the first day and flattens afterwards, which is why a review within twenty-four hours is disproportionately valuable.',
                    'Two principles follow. Spacing: distribute study across days so each session begins with partial forgetting that must be overcome. Retrieval: test yourself rather than review, because the effort of recall is what strengthens the memory.',
                ],
            },
            {
                heading: 'Techniques that work and techniques that feel like work',
                paragraphs: [
                    'Effective: closed-book recall, past questions, flashcards used correctly (guess before flipping), explaining a concept aloud to an imaginary listener, drawing a diagram from memory, and interleaving different problem types.',
                    'Ineffective despite feeling productive: rereading, highlighting, copying notes, summarising a chapter you have just read, and watching a video at normal speed without pausing to recall. These produce familiarity, which is easily mistaken for knowledge.',
                    'Elaboration strengthens memory by connecting new material to what you already know: ask how the concept relates to something you have seen, what it would explain, and what would contradict it. A concept connected to six others is easier to retrieve than one stored alone.',
                ],
                callout: {
                    title: 'Guess before you check',
                    body: 'A flashcard you flip without attempting recall is a reading exercise. The attempt, even a failed one, is what makes the next attempt easier.',
                },
            },
            {
                heading: 'Building a recall routine',
                paragraphs: [
                    'Use a simple spaced schedule: review after one day, three days, one week, two weeks, one month. Adjust by difficulty. Keep the material small - five to ten items per session - and stop when recall becomes easy, because further repetitions at that point add little.',
                    'Write questions rather than statements. "What are the four stages of the nursing process?" is a recall prompt; "the nursing process has four stages" is not. Convert your notes into questions as you review, and you will have a question bank for the rest of the semester.',
                    'Test under the conditions you will be assessed in. Closed book, time limit, no phone. The closer practice is to the real conditions, the more useful the feedback.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Converting notes into recall prompts',
                brief: 'You have one page of notes on inflammation.',
                steps: [
                    'Read the page once.',
                    'Close it and write every question the page could answer.',
                    'Aim for eight to twelve questions.',
                    'Answer them from memory the next day.',
                    'Mark the ones you could not answer and rewrite them in your own words.',
                    'Return to those specific items after three days.',
                ],
                takeaway: 'Questions are reusable; notes are not. Build the question bank once and use it all semester.',
            },
            {
                title: 'Making a study session efficient',
                brief: 'You have forty minutes before a test.',
                steps: [
                    'Do not reread the chapter.',
                    'Take the topic list and mark each item: confident, shaky, unknown.',
                    'Spend twenty-five minutes on shaky and unknown items only, testing each.',
                    'Spend ten minutes writing a blank-page summary of the whole topic.',
                    'Check the summary and note what was missing.',
                    'Stop five minutes before the test and do nothing.',
                ],
                takeaway: 'Spend time where recall fails, not where it already succeeds.',
            },
        ],
        examBank: [
            {
                question: 'Explain the forgetting curve and its practical implication for study.',
                marks: '10 marks',
                outline: [
                    'Describe rapid initial forgetting that slows over time.',
                    'Explain that review shortly after learning intercepts the steepest loss.',
                    'State the practical implication: review within a day, then space.',
                ],
            },
            {
                question: 'Distinguish active recall from recognition and explain why it matters for examinations.',
                marks: '15 marks',
                outline: [
                    'Recognition is identifying material when present; recall is producing it.',
                    'Rereading trains recognition only.',
                    'Examinations require production under time pressure.',
                    'Describe techniques that train recall.',
                ],
            },
        ],
        glossary: [
            { term: 'Working memory', definition: 'The small, brief store used for current mental operations.' },
            { term: 'Encoding', definition: 'The process of forming a memory trace.' },
            { term: 'Retrieval', definition: 'Accessing stored information.' },
            { term: 'Forgetting curve', definition: 'The pattern of rapid then slowing memory loss over time.' },
            { term: 'Spacing effect', definition: 'Better retention when study is distributed over time.' },
            { term: 'Testing effect', definition: 'Improved retention produced by retrieval attempts.' },
            { term: 'Elaboration', definition: 'Connecting new information to existing knowledge.' },
            { term: 'Interleaving', definition: 'Mixing topics or problem types within a session.' },
            { term: 'Recognition', definition: 'Identifying material when it is presented.' },
            { term: 'Desirable difficulty', definition: 'Effortful study conditions that improve long-term retention.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Baseline', focus: 'Honest assessment.', tasks: ['Blank-page test one topic.', 'Compare with your notes.', 'List what you could not recall.'] },
            { week: 'Week 2 - Prompts', focus: 'Question bank.', tasks: ['Convert three topics into questions.', 'Test daily for five days.', 'Retire items you know cold.'] },
            { week: 'Week 3 - Spacing', focus: 'Schedule.', tasks: ['Apply the one-day, three-day, one-week pattern.', 'Interleave two courses per session.', 'Track which items keep failing.'] },
            { week: 'Week 4 - Conditions', focus: 'Transfer.', tasks: ['Test closed-book under time.', 'Explain a topic aloud from memory.', 'Draw one diagram from memory.'] },
        ],
        readingList: [
            'A book on cognitive science applied to learning.',
            'A study skills guide covering flashcards and spacing.',
            'Your course outlines for topic lists to convert into questions.',
        ],
    },
})

// ── Campus life ───────────────────────────────────────────────────────────
Object.assign(THEATRE_FILM_DEPTH, {
    'unizik-fresher-survival-guide': {
        sections: [
            {
                heading: 'The first three weeks decide a lot',
                paragraphs: [
                    'Registration, course allocation, timetables, hostel allocation and identity documents all happen in a compressed period, and each has a queue. Students who finish registration early have time to attend lectures; those who leave it late spend the first month chasing signatures and miss the material that everything else builds on.',
                    'Know your documents before you need them: admission letter, result slips, birth certificate or age declaration, local government identification, passport photographs, and payment receipts. Keep both physical copies and photographs on your phone and in cloud storage. Most registration crises are a missing photocopy, not a missing qualification.',
                    'Find four places in your first week: your department\'s notice board, the faculty office, the library, and the health centre. These are the four you will need in an emergency, and none of them is the one you will be told about most loudly.',
                ],
            },
            {
                heading: 'The unglamorous essentials',
                paragraphs: [
                    'Read the student handbook once. It contains the regulations that will decide disputes later: attendance requirements, examination rules, grading, carry-over, and disciplinary procedures. Students who have never read it are surprised by rules that were published before they arrived.',
                    'Build a small margin: a little money set aside, a printed copy of your timetable, a charged power bank, and one person in your department who answers your messages. Margin is what turns a bad day into an inconvenience rather than a crisis.',
                    'Protect your sleep in the first month. New students lose sleep to noise, anxiety and irregular meals, then conclude they cannot cope academically. Most of what looks like an academic problem in week four is a sleep and food problem.',
                ],
                callout: {
                    title: 'Ask early, ask specifically',
                    body: 'The department officer who has answered the same vague question forty times will answer a precise one. "My course form shows GST 103 but my timetable shows GST 107 - which is correct?" gets help.',
                },
            },
            {
                heading: 'People, money and boundaries',
                paragraphs: [
                    'Join one organisation, not five. A departmental society, a professional body chapter or a volunteer group gives you information, contacts and a reason to be on campus that is not an examination. Five memberships give you five sets of meetings and no depth.',
                    'Money leaves quickly in the first semester because of setup costs. Track spending for four weeks and you will see the pattern. Set a weekly figure rather than a monthly one, since a monthly budget is exhausted in the first ten days by almost everyone who tries it.',
                    'Set boundaries before you need them. Lending money you cannot lose, joining a group because leaving would be awkward, or accepting an arrangement you have not understood are all decisions better made in advance than under pressure.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'A first-week checklist',
                brief: 'You arrive on Monday with an admission letter.',
                steps: [
                    'Day 1: confirm department, collect and complete registration forms, scan all documents.',
                    'Day 2: pay approved fees only through official channels, keep receipts, verify course registration.',
                    'Day 3: locate lecture venues and copy the timetable into your phone and a paper copy.',
                    'Day 4: introduce yourself to your course adviser and one class representative.',
                    'Day 5: visit the library and health centre; note opening hours.',
                    'Day 6: read the student handbook sections on attendance and examinations.',
                ],
                takeaway: 'Do the bureaucratic work in the first week so the semester belongs to you.',
            },
            {
                title: 'Handling a bureaucratic dead end',
                brief: 'An officer says your file is not on the list and sends you away.',
                steps: [
                    'Write down the officer\'s name and the exact statement made.',
                    'Ask what document would resolve it, rather than arguing.',
                    'Check whether the same process exists at another window or online.',
                    'Escalate to the course adviser or department head with the specific question.',
                    'Keep a dated note of each visit and what you were told.',
                    'Follow up in writing where possible so there is a record.',
                ],
                takeaway: 'Ask for the missing document, not for sympathy, and keep a written record.',
            },
        ],
        examBank: [
            {
                question: 'List the documents a fresher should keep available and explain why duplicates matter.',
                marks: '10 marks',
                outline: [
                    'Admission letter, results, age or birth documentation, identification, photographs, receipts.',
                    'Physical and digital copies.',
                    'Duplicates prevent delays at each registration stage.',
                ],
            },
            {
                question: 'Why should a new student read the student handbook in the first week?',
                marks: '10 marks',
                outline: [
                    'It states attendance, examination, grading and disciplinary rules.',
                    'Rules are enforced whether or not they were read.',
                    'Early knowledge prevents avoidable loss of a semester.',
                ],
            },
        ],
        glossary: [
            { term: 'Matriculation', definition: 'The formal enrolment of a student into the university.' },
            { term: 'Course adviser', definition: 'The staff member who guides a student\'s course selection.' },
            { term: 'Course registration', definition: 'The formal enrolment in specific courses for a semester.' },
            { term: 'Carry-over course', definition: 'A failed course that must be retaken.' },
            { term: 'CGPA', definition: 'Cumulative grade point average across all completed semesters.' },
            { term: 'Student handbook', definition: 'The document stating institutional rules and procedures.' },
            { term: 'Class representative', definition: 'A student who liaises between the class and lecturers.' },
            { term: 'Faculty officer', definition: 'The administrative officer handling faculty records.' },
            { term: 'Study leave', definition: 'Approved absence from study for a defined reason.' },
            { term: 'Transcript', definition: 'The official record of a student\'s courses and grades.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Land', focus: 'Registration.', tasks: ['Complete registration and scan documents.', 'Locate four key offices.', 'Copy the timetable.'] },
            { week: 'Week 2 - Learn the rules', focus: 'Handbook.', tasks: ['Read attendance and examination rules.', 'Note grading and carry-over policy.', 'Meet your course adviser.'] },
            { week: 'Week 3 - Routine', focus: 'Habits.', tasks: ['Attend every lecture.', 'Set a weekly spending figure.', 'Join one organisation.'] },
            { week: 'Week 4 - Review', focus: 'Adjust.', tasks: ['Check you are registered for all courses.', 'Review sleep and meals.', 'List three problems and one action each.'] },
        ],
        readingList: [
            'Your university student handbook.',
            'The department handbook for your programme.',
            'The academic calendar for the session.',
        ],
    },

    'hostel-and-off-campus-living': {
        sections: [
            {
                heading: 'Choosing where to live',
                paragraphs: [
                    'Hostel allocation is cheap and inconvenient; off-campus is expensive and freer. The real decision variables are cost, distance, security, water, power, noise and the reliability of the landlord. Rank them before you view anything, because in the viewing you will be persuaded by the thing you ranked last.',
                    'Distance is measured in minutes and money, not kilometres. A room thirty minutes\' walk away costs you five hours a week and a great deal of energy; a room near a transport route may be better than one that is technically closer. Visit at the time of day you will actually travel.',
                    'Never pay for a room you have not seen, and never pay without a receipt and a written agreement. The commonest student housing loss is a deposit paid to someone who did not own the property.',
                ],
            },
            {
                heading: 'The practicalities nobody explains',
                paragraphs: [
                    'Water and power determine daily quality of life more than room size. Ask current tenants, not the landlord, when water runs and how often power comes. Check the condition of the roof, the windows, the toilet and the wiring, and photograph everything before you move in.',
                    'Cooking, laundry and study space are the three functions that decide whether a room works. A room with no ventilation cannot be studied in during the hot season. A shared kitchen with no storage produces conflict. Plan these before signing.',
                    'House rules prevent most disputes: who cleans what, how bills are split, quiet hours, guests, and what happens when someone leaves. Write them down, even in a hostel. An unwritten rule is a rule someone will claim never existed.',
                ],
                callout: {
                    title: 'Photograph before you move in',
                    body: 'Dated photographs of the room\'s condition are the difference between getting your deposit back and losing it.',
                },
            },
            {
                heading: 'Living with others',
                paragraphs: [
                    'Conflict in shared accommodation is usually about unspoken expectations rather than malice. Raise an issue early and specifically: "the dishes are being left for two days and it is attracting insects" is actionable; "you people are inconsiderate" is not.',
                    'Keep money arrangements separate from friendship. Shared bills should have a named collector, a written record and a fixed date. Lending to a housemate is a decision to risk the friendship and the money.',
                    'Safety is collective: a shared lock, agreed visitor rules, and knowing who has a key. A room that is safe when you are there alone may be unsafe when five people are coming and going.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Comparing two rooms',
                brief: 'Room A is cheaper but 45 minutes away with unreliable water. Room B is 25 per cent more expensive, 10 minutes away, with a borehole.',
                steps: [
                    'Calculate the transport cost of Room A over a semester.',
                    'Value the time: 90 minutes a day, five days a week.',
                    'Add the cost of buying water for Room A.',
                    'Compare total cost, not rent.',
                    'Weigh the academic cost of fatigue and missed evening study.',
                    'Choose and state the assumption that could change the decision.',
                ],
                takeaway: 'Compare total cost and total time. Rent is the smallest part of housing cost.',
            },
            {
                title: 'Setting up a written house agreement',
                brief: 'Four students share a flat.',
                steps: [
                    'List shared costs and how each is split.',
                    'Name who collects and who holds the record.',
                    'Agree cleaning responsibilities by area and day.',
                    'Agree quiet hours and guest rules.',
                    'Agree notice period and procedure for a replacement tenant.',
                    'All four sign and keep a copy.',
                ],
                takeaway: 'Write it while everyone is friendly. That is when it is still possible.',
            },
        ],
        examBank: [
            {
                question: 'What should a student check before paying for accommodation?',
                marks: '10 marks',
                outline: [
                    'Ownership and authority to let.',
                    'Condition of water, power, roof, toilet and wiring.',
                    'Distance and transport at the relevant times.',
                    'Written agreement and receipt.',
                    'Photographic record of condition.',
                ],
            },
            {
                question: 'Explain why shared accommodation disputes are usually about expectations.',
                marks: '10 marks',
                outline: [
                    'Unspoken rules differ between households.',
                    'Conflict arises from unmet assumptions rather than intent.',
                    'Written house rules and early specific communication prevent escalation.',
                ],
            },
        ],
        glossary: [
            { term: 'Tenancy agreement', definition: 'A written contract setting out the terms of renting.' },
            { term: 'Deposit', definition: 'Money held against damage or unpaid rent, refundable on conditions.' },
            { term: 'Borehole', definition: 'A drilled water source, often shared by a compound.' },
            { term: 'House rules', definition: 'Agreed expectations about cleaning, noise, guests and bills.' },
            { term: 'Shared cost', definition: 'A bill divided among occupants, requiring a record.' },
            { term: 'Ventilation', definition: 'The movement of air through a space, essential for comfort and study.' },
            { term: 'Agent', definition: 'An intermediary who arranges lettings for an owner.' },
            { term: 'Notice period', definition: 'The agreed time before leaving a tenancy.' },
            { term: 'Subletting', definition: 'Renting out a space one already rents, often requiring permission.' },
            { term: 'Commuting cost', definition: 'The money and time spent travelling to campus.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Criteria', focus: 'Decide what matters.', tasks: ['Rank cost, distance, security, water, power, noise.', 'Set a maximum total monthly cost.', 'List questions for current tenants.'] },
            { week: 'Week 2 - Inspect', focus: 'Evidence.', tasks: ['Visit three options at realistic times.', 'Photograph conditions.', 'Verify ownership and get a receipt.'] },
            { week: 'Week 3 - Agree', focus: 'Paperwork.', tasks: ['Write the tenancy or house agreement.', 'Agree bill splitting and records.', 'Set quiet hours and guest rules.'] },
            { week: 'Week 4 - Settle', focus: 'Routine.', tasks: ['Establish cleaning rota.', 'Locate water, power and security contacts.', 'Review the first month\'s actual costs.'] },
        ],
        readingList: [
            'Your university\'s accommodation policy.',
            'A tenant rights summary for your state.',
            'A personal finance guide section on shared living costs.',
        ],
    },

    'campus-safety-and-scam-awareness': {
        sections: [
            {
                heading: 'Risk is mostly about routine',
                paragraphs: [
                    'Most campus incidents happen in predictable circumstances: late at night, alone, on routes with poor lighting, or during periods of unusual movement such as examination week and end of semester. Knowing the pattern lets you change it rather than living in fear.',
                    'Practical measures are unglamorous: travel in groups at night, tell someone your route and expected arrival time, keep your phone charged, know where security posts are, and avoid unlit shortcuts even when they are shorter.',
                    'Your valuables are most at risk during transitions - moving into a hostel, examination periods, crowded functions, and the days before holidays. Most theft on campus is opportunistic and happens when attention is elsewhere.',
                ],
            },
            {
                heading: 'Scams that target students',
                paragraphs: [
                    'Common patterns: a "bursary" or "scholarship" that requires an upfront payment; a "course registration" agent who collects money and disappears; fake accommodation agents; messages claiming a relative is in trouble; investment schemes promising fast returns; and requests to receive money on someone else\'s behalf.',
                    'The rule that defeats almost all of them: legitimate institutions do not require payment to release money, and no genuine offer needs you to act within minutes. Urgency is the mechanism. Slow down, verify through an official channel you found yourself, and ask someone you trust.',
                    'Never share your bank details, PIN, OTP or password with anyone, including someone claiming to be from your bank. A bank will never ask for your PIN. An OTP read aloud is a transfer authorised by you.',
                ],
                callout: {
                    title: 'Verify through a channel you chose',
                    body: 'Do not call the number in the message. Find the official number yourself and call that. The scammer controls the number in the message.',
                },
            },
            {
                heading: 'If something happens',
                paragraphs: [
                    'Report immediately, even if you feel foolish. Delays help the offender and reduce the chance of recovery. Report to campus security, the police, and your bank in the case of financial fraud - in that order of speed.',
                    'Preserve evidence: screenshots, transaction references, message threads, names and times. A report without evidence is much harder to act on.',
                    'Look after yourself afterwards. Being robbed or defrauded is not a personal failure, and the shame that keeps people silent is what protects the offender.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Assessing a scholarship message',
                brief: 'A message says you have won a grant and must pay 5,000 naira to process it today.',
                steps: [
                    'Identify the emotion being used: urgency and flattery.',
                    'Check the rule: legitimate grants do not require payment to release funds.',
                    'Verify independently using the institution\'s official website or office.',
                    'Ask what organisation the sender represents and whether the domain matches.',
                    'Do not pay, and do not send documents.',
                    'Report the message to the university and warn your classmates.',
                ],
                takeaway: 'Money out to get money in is the oldest scam structure there is.',
            },
            {
                title: 'Safe late-night travel',
                brief: 'You must leave the library at 9 p.m.',
                steps: [
                    'Plan the route in advance along lit, populated paths.',
                    'Travel with someone or wait for a group.',
                    'Tell a friend your route and expected arrival time.',
                    'Keep your phone charged and accessible, not buried in a bag.',
                    'Note the nearest security post on the way.',
                    'Message on arrival so someone knows you are safe.',
                ],
                takeaway: 'Plan the route, share the plan, arrive and confirm.',
            },
        ],
        examBank: [
            {
                question: 'Identify three common scams targeting students and the principle that defeats each.',
                marks: '15 marks',
                outline: [
                    'Upfront payment for a grant or scholarship - legitimate funds do not require payment.',
                    'Fake agent for registration or accommodation - verify through official channels.',
                    'Urgent family emergency message - verify by calling the person directly on a known number.',
                    'State the general principle: urgency plus payment plus unverifiable identity.',
                ],
            },
            {
                question: 'What should a student do immediately after a theft or fraud?',
                marks: '10 marks',
                outline: [
                    'Report to campus security and police.',
                    'Contact the bank immediately for financial fraud.',
                    'Preserve evidence: screenshots, references, times.',
                    'Inform the department if documents were taken.',
                ],
            },
        ],
        glossary: [
            { term: 'Phishing', definition: 'A fraudulent message designed to obtain credentials or money.' },
            { term: 'OTP', definition: 'A one-time password used to authorise a transaction.' },
            { term: 'Social engineering', definition: 'Manipulating people into revealing information or acting against their interest.' },
            { term: 'Advance-fee fraud', definition: 'A scam requiring payment before a promised benefit is released.' },
            { term: 'Opportunistic theft', definition: 'Theft taking advantage of an unguarded moment rather than planning.' },
            { term: 'Security post', definition: 'A manned campus point for reporting incidents and requesting escort.' },
            { term: 'Evidence trail', definition: 'Records such as screenshots and references that support a report.' },
            { term: 'Shoulder surfing', definition: 'Observing someone entering a PIN or password.' },
            { term: 'Identity theft', definition: 'Using another person\'s details to obtain money or services.' },
            { term: 'Escort service', definition: 'Campus arrangement to accompany students across unsafe areas.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Map', focus: 'Routes.', tasks: ['Identify lit routes and security posts.', 'Note two places to avoid at night.', 'Save security numbers.'] },
            { week: 'Week 2 - Habits', focus: 'Routine.', tasks: ['Adopt the travel-with-someone rule.', 'Set up phone tracking or check-in with a friend.', 'Secure valuables in your room.'] },
            { week: 'Week 3 - Scams', focus: 'Recognition.', tasks: ['List five scam patterns you have seen.', 'Practise independent verification.', 'Warn two classmates.'] },
            { week: 'Week 4 - Response', focus: 'Reporting.', tasks: ['Write a report template.', 'Know the bank fraud number.', 'Rehearse what you would preserve as evidence.'] },
        ],
        readingList: [
            'Your university security office guidance.',
            'Your bank\'s fraud reporting instructions.',
            'A consumer protection guide on common fraud patterns.',
        ],
    },

    'student-clubs-leadership-and-volunteering': {
        sections: [
            {
                heading: 'Why joining one thing well beats five things badly',
                paragraphs: [
                    'Student organisations are where leadership is actually practised: organising an event, managing a budget, resolving a disagreement, recruiting and replacing people. These are the experiences employers and postgraduate selectors ask about, and they are only credible when you can describe something you actually did.',
                    'Choose by interest and by the quality of the existing members. A well-run small society teaches more than a large disorganised one. Attend two meetings before committing, and ask what the group achieved last year - not what it plans to achieve.',
                    'Depth beats breadth. Two years in one organisation with a progression from member to coordinator to officer is a stronger story than one semester in six groups.',
                ],
            },
            {
                heading: 'Running something: the basic mechanics',
                paragraphs: [
                    'Every event has five elements: purpose, people, plan, money and follow-up. Purpose states what the event is for and how you will know it worked. People means named roles rather than a committee of everyone. Plan means a timeline working backwards from the date. Money means a budget with receipts. Follow-up means thanking people and recording what to repeat.',
                    'Leadership in a student group is mostly communication and reliability. Say what you will do and when, then do it. When you cannot, say so early. A leader who is predictable is trusted with more than one who is impressive but unreliable.',
                    'Delegation is not dumping. Give a task with a clear outcome, a deadline, the authority to act, and an agreement about when you will check in. Then do not hover.',
                ],
                callout: {
                    title: 'Write the handover',
                    body: 'Before you leave a role, write one page: what you did, where the files are, who the contacts are, what failed and why. That page is the most useful thing you will leave behind.',
                },
            },
            {
                heading: 'Volunteering and its limits',
                paragraphs: [
                    'Volunteering builds skills and relationships, and it should be chosen as deliberately as paid work. Ask what you will be doing, who you will report to, how much time it requires, and whether you will receive any training or reference. Vagueness in those answers predicts a frustrating experience.',
                    'Protect your studies. A volunteer role that costs you a semester is not a good trade, and good organisations will say so. Learn to decline: "I can commit two hours on Saturdays until the end of term" is a complete and respectable answer.',
                    'Ethics matter in volunteering too: do not accept a role you are not competent for, do not take photographs of vulnerable people without consent, and do not use a volunteer position primarily to collect a certificate.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Planning a departmental event',
                brief: 'Your society will host a career talk in three weeks.',
                steps: [
                    'State the purpose and the success measure, such as attendance and follow-up enquiries.',
                    'Assign named roles: programme, publicity, logistics, finance, documentation.',
                    'Work backwards from the date: invitations two weeks before, venue confirmed one week before, materials three days before.',
                    'Write the budget and get approval before spending.',
                    'Confirm the speaker in writing with time, venue and transport details.',
                    'After the event, send thanks, collect feedback and write a one-page report.',
                ],
                takeaway: 'Purpose, roles, timeline, budget, follow-up. Skip any one and the event fails in a predictable way.',
            },
            {
                title: 'Handling a non-performing team member',
                brief: 'A committee member has missed three deadlines.',
                steps: [
                    'Ask privately whether something has happened - illness, workload, confusion about the task.',
                    'Restate the specific commitment and the consequence of missing it.',
                    'Offer one concrete support: a smaller task, a partner, or a revised deadline.',
                    'Agree what happens if the next deadline is missed.',
                    'Record the agreement briefly and follow up.',
                    'If it repeats, redistribute the work rather than complaining to others.',
                ],
                takeaway: 'Ask, restate, support, agree consequences. Complaining to the group solves nothing.',
            },
        ],
        examBank: [
            {
                question: 'Explain the components of an effective event plan.',
                marks: '15 marks',
                outline: [
                    'Purpose and success measure.',
                    'Named roles and responsibilities.',
                    'Timeline worked backwards from the date.',
                    'Budget with approval and receipts.',
                    'Follow-up, feedback and records.',
                ],
            },
            {
                question: 'What makes delegation effective?',
                marks: '10 marks',
                outline: [
                    'Clear outcome and deadline.',
                    'Authority to act.',
                    'Agreed check-in points.',
                    'Support without hovering.',
                ],
            },
        ],
        glossary: [
            { term: 'Handover', definition: 'A written record of a role passed to a successor.' },
            { term: 'Delegation', definition: 'Assigning a task with outcome, deadline and authority.' },
            { term: 'Accountability', definition: 'Being answerable for a defined responsibility.' },
            { term: 'Budget approval', definition: 'Formal permission to spend before expenditure occurs.' },
            { term: 'Success measure', definition: 'The evidence that an activity achieved its purpose.' },
            { term: 'Quorum', definition: 'The minimum attendance required for a decision to be valid.' },
            { term: 'Terms of reference', definition: 'The stated purpose and powers of a committee or role.' },
            { term: 'Stakeholder', definition: 'Anyone affected by or interested in an activity.' },
            { term: 'Follow-up', definition: 'Post-event thanks, feedback and documentation.' },
            { term: 'Reference', definition: 'A statement about your performance from someone who supervised you.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Choose', focus: 'Selection.', tasks: ['Attend two society meetings.', 'Ask what the group achieved last year.', 'Commit to one organisation.'] },
            { week: 'Week 2 - Contribute', focus: 'Reliability.', tasks: ['Take one small named task.', 'Deliver it early.', 'Write down what the role involves.'] },
            { week: 'Week 3 - Lead', focus: 'Organising.', tasks: ['Plan one activity with five elements.', 'Delegate two tasks properly.', 'Track the budget.'] },
            { week: 'Week 4 - Record', focus: 'Evidence.', tasks: ['Write a one-page report of the activity.', 'Collect feedback.', 'Draft a handover note.'] },
        ],
        readingList: [
            'Your Students\' Union constitution and society registration rules.',
            'A short guide to running student events and budgets.',
            'A volunteering guide on expectations and safeguarding.',
        ],
    },

    'peer-pressure-and-social-life': {
        sections: [
            {
                heading: 'Pressure is usually ordinary',
                paragraphs: [
                    'Peer pressure is rarely a dramatic dare. It is the accumulated expectation of a group: what everyone wears, where everyone goes on Friday, what nobody admits to finding difficult. Most of it is harmless, and some of it is genuinely valuable - friends who insist you attend lectures are applying pressure in your interest.',
                    'The pressure that causes damage is usually about three things: money, substances and risk. Spending to keep up, drinking to belong, and joining activities whose consequences you have not considered. The pattern is always the same - a short-term social gain traded against a longer-term cost.',
                    'Notice which groups make you more yourself and which make you perform. That distinction is a better guide than any rule about who to avoid.',
                ],
            },
            {
                heading: 'Refusing without a scene',
                paragraphs: [
                    'Most people fear refusal because they expect it to be humiliating. In practice, a calm, brief refusal delivered without a lecture ends the matter almost every time. The mistake is over-explaining, which invites negotiation.',
                    'Useful forms: "Not tonight." "I am not drinking." "I cannot afford it this month." "I have a test tomorrow." Each is complete. You do not owe an argument, and a friend who requires one is telling you something about the friendship.',
                    'Have an exit plan before you need one: your own transport money, a friend who will leave with you, and a code message to someone outside the situation. Planning an exit is not pessimism; it is the same logic as knowing where the fire exit is.',
                ],
                callout: {
                    title: 'Decide in advance',
                    body: 'Decisions made in the moment are made under social pressure. Decide your limits - money, alcohol, time - before you go out, when you are still the only person influencing you.',
                },
            },
            {
                heading: 'Friendship, conflict and loneliness',
                paragraphs: [
                    'Good friendships are reciprocal and low-drama. If a relationship requires constant management, secrecy from other friends, or regular financial extraction, it is not a friendship with a problem - it is the problem.',
                    'Conflict is normal and manageable: describe the behaviour, state the effect, ask for a change, and be specific. "When you cancel at the last minute, I waste the transport fare and the afternoon" invites a response in a way that "you are unreliable" does not.',
                    'Loneliness in first year is extremely common and rarely discussed. It usually eases with repeated low-stakes contact - the same study group, the same society, the same church or mosque - rather than with effortful attempts to make a best friend immediately. If it persists and affects sleep, appetite or study, the counselling service exists for exactly that.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Refusing an expensive outing',
                brief: 'Your group plans a trip that costs more than your monthly allowance.',
                steps: [
                    'Decide before the conversation: you are not going.',
                    'Give one short reason without apology: "I cannot afford it this month."',
                    'Do not offer to borrow or to pay later.',
                    'Suggest an alternative you can afford, if you want to stay involved.',
                    'If pressed, repeat the same sentence rather than adding new reasons.',
                    'Follow up with the group afterwards so the refusal does not end the friendship.',
                ],
                takeaway: 'One sentence, repeated. Every added reason is an invitation to negotiate.',
            },
            {
                title: 'Raising a problem with a housemate',
                brief: 'A friend repeatedly borrows money and does not repay.',
                steps: [
                    'Choose a private moment, not a group setting.',
                    'State the facts: two loans, dates and amounts.',
                    'State the effect: you now cannot cover your own transport.',
                    'Ask for a specific action: repayment by a date, or an agreement to stop borrowing.',
                    'Agree what happens next if it repeats.',
                    'Do not lend again on the basis of a promise alone.',
                ],
                takeaway: 'Facts, effect, request, agreement. Emotion is legitimate but should not replace the specific ask.',
            },
        ],
        examBank: [
            {
                question: 'Distinguish positive from negative peer influence with examples.',
                marks: '10 marks',
                outline: [
                    'Positive: encouragement towards study, health, responsibility.',
                    'Negative: pressure towards spending, substances, risk.',
                    'Explain that the mechanism is the same - group expectation - and the outcome differs.',
                ],
            },
            {
                question: 'Describe an effective strategy for refusing pressure without confrontation.',
                marks: '10 marks',
                outline: [
                    'Decide in advance.',
                    'Give one brief reason and repeat it.',
                    'Avoid over-explaining.',
                    'Have an exit plan.',
                    'Maintain the relationship afterwards.',
                ],
            },
        ],
        glossary: [
            { term: 'Peer pressure', definition: 'Influence from a group to conform to its expectations.' },
            { term: 'Social conformity', definition: 'Changing behaviour to match a group\'s norms.' },
            { term: 'Assertiveness', definition: 'Stating your position clearly without aggression or apology.' },
            { term: 'Exit plan', definition: 'A prepared way to leave a situation safely.' },
            { term: 'Reciprocity', definition: 'Mutual give and take in a relationship.' },
            { term: 'Boundary', definition: 'A stated limit on what you will accept or do.' },
            { term: 'Loneliness', definition: 'Distress from perceived lack of connection, distinct from being alone.' },
            { term: 'Counselling service', definition: 'Confidential support provided by the institution.' },
            { term: 'Financial peer pressure', definition: 'Spending to maintain social standing.' },
            { term: 'Code message', definition: 'A prearranged signal asking a friend to help you leave.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Notice', focus: 'Patterns.', tasks: ['Identify three situations where you spend to fit in.', 'Note which groups energise you.', 'Write your limits in advance.'] },
            { week: 'Week 2 - Practise', focus: 'Refusal.', tasks: ['Rehearse three short refusals aloud.', 'Use one in a real situation.', 'Notice that the conversation ends.'] },
            { week: 'Week 3 - Connect', focus: 'Belonging.', tasks: ['Attend one group twice.', 'Initiate one low-stakes conversation.', 'Plan a cheap shared activity.'] },
            { week: 'Week 4 - Repair', focus: 'Conflict.', tasks: ['Raise one small issue using facts and request.', 'Ask for one change.', 'Know the counselling contact.'] },
        ],
        readingList: [
            'A student wellbeing guide covering social pressure and boundaries.',
            'Your institution\'s counselling service information.',
            'A communication guide on assertive requests.',
        ],
    },

    'academic-integrity-and-exam-rules': {
        sections: [
            {
                heading: 'What integrity means in practice',
                paragraphs: [
                    'Academic integrity means producing work that is genuinely yours and attributing what is not. It covers examinations, assignments, laboratory reports, projects and publications, and it applies to collaboration as well as copying.',
                    'The line is not mysterious. Using someone\'s words without citation is plagiarism. Using their ideas without citation is also plagiarism. Submitting a purchased or commissioned assignment is fraud. Sitting an examination with prohibited material is misconduct. Helping another student cheat makes you a participant, not a bystander.',
                    'Collaboration is permitted where the brief says so and prohibited where it does not. If you are unsure, ask before you submit, not after you are questioned.',
                ],
            },
            {
                heading: 'Examination regulations',
                paragraphs: [
                    'Know the rules before the day: permitted materials, identification requirements, arrival time, seating, and what constitutes prohibited items. Most examination misconduct cases involve a phone that was never used but was present, or notes left in a pocket from earlier study.',
                    'During the examination, follow invigilator instructions exactly. Do not communicate with other candidates, do not look at another script, and do not leave the hall without permission. If you need something, raise your hand and wait.',
                    'If you are accused of misconduct, the process matters: you will normally be informed in writing, given an opportunity to respond, and entitled to a hearing. Respond factually within the deadline. Do not attempt to contact the invigilator privately, and do not discuss the case on social media.',
                ],
                callout: {
                    title: 'Empty your pockets',
                    body: 'Before entering the hall, remove everything except permitted items. A phone found in a pocket is treated as possession, whatever you intended.',
                },
            },
            {
                heading: 'Why it matters beyond punishment',
                paragraphs: [
                    'Integrity protects the value of your qualification. If degrees can be bought, the degree of every honest graduate is worth less. That is the collective harm behind individual rules.',
                    'It also protects you professionally. A student who plagiarises an assignment is rehearsing a habit that ends careers - in journalism, law, medicine and research, attribution errors have ended employment.',
                    'The practical alternative to cheating is planning: start early, keep notes with sources, ask for help when stuck, and use the honest routes - extensions, study support, and speaking to the lecturer - that exist precisely because difficulty is normal.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Deciding whether collaboration is allowed',
                brief: 'A friend suggests writing an assignment together.',
                steps: [
                    'Read the brief for any statement about collaboration.',
                    'If it is silent, ask the lecturer in writing.',
                    'If collaboration is permitted for discussion only, agree on ideas, then write separately.',
                    'Never share a document that will be submitted by both of you.',
                    'Cite any source either of you introduces.',
                    'Keep a record of the permission if it was given verbally.',
                ],
                takeaway: 'Ask before, cite always, and never submit shared text.',
            },
            {
                title: 'Preparing for an examination without prohibited material',
                brief: 'You rely on your phone for notes.',
                steps: [
                    'Convert notes into a one-page summary you can revise from.',
                    'Leave the phone at home or in your bag outside the hall.',
                    'Check pockets and sleeves before entry.',
                    'Know permitted materials and bring exactly those.',
                    'Arrive early enough to settle without rushing.',
                    'If you accidentally bring a prohibited item, surrender it to the invigilator before the paper starts.',
                ],
                takeaway: 'Voluntary surrender before the exam is a different situation from discovery during it.',
            },
        ],
        examBank: [
            {
                question: 'Explain what counts as plagiarism and how it is avoided.',
                marks: '15 marks',
                outline: [
                    'Copying words without quotation and citation.',
                    'Using ideas without citation.',
                    'Paraphrasing too closely, or reusing your own prior work without acknowledgement.',
                    'Prevention: notes with pages, running source list, drafting from notes.',
                ],
            },
            {
                question: 'Describe the procedure following an allegation of examination misconduct.',
                marks: '10 marks',
                outline: [
                    'Written notification of the allegation.',
                    'Opportunity to respond within a deadline.',
                    'A hearing with the right to be heard.',
                    'Outcome and appeal route.',
                ],
            },
        ],
        glossary: [
            { term: 'Plagiarism', definition: 'Presenting another\'s words, ideas or structure as your own.' },
            { term: 'Citation', definition: 'A reference identifying the source of information or ideas.' },
            { term: 'Collusion', definition: 'Unauthorised collaboration presented as individual work.' },
            { term: 'Contract cheating', definition: 'Commissioning work from another person and submitting it as your own.' },
            { term: 'Invigilator', definition: 'The officer supervising an examination.' },
            { term: 'Prohibited material', definition: 'Items not permitted in an examination hall.' },
            { term: 'Misconduct panel', definition: 'The body that hears allegations of academic misconduct.' },
            { term: 'Self-plagiarism', definition: 'Reusing your own previous work without acknowledgement.' },
            { term: 'Attribution', definition: 'Identifying the source of a quotation, idea or data set.' },
            { term: 'Appeal', definition: 'A formal request for a decision to be reviewed.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Rules', focus: 'Read them.', tasks: ['Read the examination regulations.', 'Read the plagiarism policy.', 'Note the appeal route.'] },
            { week: 'Week 2 - Practice', focus: 'Citation.', tasks: ['Cite every source in one assignment.', 'Check paraphrases against the original.', 'Ask about collaboration rules in writing.'] },
            { week: 'Week 3 - Preparation', focus: 'Honest routes.', tasks: ['Start the next assignment early.', 'Book study support if needed.', 'Request an extension before the deadline if necessary.'] },
            { week: 'Week 4 - Exam day', focus: 'Procedure.', tasks: ['Check permitted materials.', 'Empty pockets before entry.', 'Arrive early and follow instructions exactly.'] },
        ],
        readingList: [
            'Your institution\'s academic integrity policy.',
            'The examination regulations for your faculty.',
            'Your department\'s citation guide.',
        ],
    },
})

// ── Money and career ──────────────────────────────────────────────────────
Object.assign(THEATRE_FILM_DEPTH, {
    'student-budgeting-and-saving': {
        sections: [
            {
                heading: 'Where the money actually goes',
                paragraphs: [
                    'Almost every student who says money disappears without knowing where is right: it does disappear, but not without a pattern. Track every naira for four weeks - notes or a simple spreadsheet - and the pattern appears within a fortnight. Until you have data, a budget is a wish.',
                    'Student spending concentrates in four places: food, transport, data and social. The last is the one people underestimate, because it arrives in small amounts and is hard to refuse. Naming it is the first step to controlling it.',
                    'Set a weekly figure rather than a monthly one. A monthly allowance is usually exhausted by day ten because the first week absorbs setup costs and the second absorbs social pressure. Weekly limits are easier to hold and easier to correct.',
                ],
            },
            {
                heading: 'Budgeting that survives a lump sum',
                paragraphs: [
                    'Most Nigerian students receive money in irregular amounts - a semester allowance, a transfer from a relative, occasional earnings. Budgeting for irregular income means building three envelopes: fixed costs (rent, fees), variable essentials (food, transport, data), and a buffer. The buffer is the line that prevents a small shock from becoming a crisis.',
                    'Pay yourself first. Move a fixed amount into a separate account or a locked savings arrangement on the day money arrives, before spending becomes possible. Saving what remains at the end of the month is not a strategy; nothing remains.',
                    'Buy in bulk with people you trust for staples, cook rather than buy prepared food, and treat transport as a planning problem - walking distance and route choice matter more than fare negotiation.',
                ],
                callout: {
                    title: 'The 24-hour rule',
                    body: 'For any non-essential purchase above a level you decide in advance, wait a day. Most wants do not survive the wait, and the ones that do are usually worth buying.',
                },
            },
            {
                heading: 'Debt, emergencies and talking about money',
                paragraphs: [
                    'Avoid borrowing for consumption. Borrowing for an examination fee or a medical cost is different from borrowing to attend a party, and the difference is whether the cost is unavoidable. If you must borrow, write the amount and repayment date, and tell the lender when you will pay.',
                    'An emergency fund of even a small amount changes behaviour: it removes the panic that produces bad decisions. Start with an amount that covers transport and food for one week, then grow it.',
                    'Money is uncomfortable to discuss, which is exactly why students get exploited. Compare prices, ask what a service includes, refuse to pay for anything you have not understood, and share information with classmates about who charges what. A group that talks about prices is a group that gets overcharged less.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Building a weekly budget from data',
                brief: 'After four weeks of tracking you find: food 18,000, transport 8,000, data 5,000, social 12,000, other 4,000. You receive 45,000 a month.',
                steps: [
                    'Total spending is 47,000, so you are overspending by 2,000.',
                    'Identify the flexible category: social at 12,000 is the largest avoidable item.',
                    'Set a weekly cap for social rather than a monthly one.',
                    'Reduce food cost by cooking two more meals weekly.',
                    'Move 3,000 to savings on receipt day.',
                    'Recheck after two weeks and adjust the cap rather than abandoning the plan.',
                ],
                takeaway: 'Cut from the flexible category, not from the one that keeps you alive.',
            },
            {
                title: 'Handling an unexpected cost',
                brief: 'A 9,000 naira medical bill arrives mid-month with 5,000 left.',
                steps: [
                    'Treat it as essential and pay it.',
                    'Do not borrow from a high-interest lender for the difference.',
                    'Reduce the flexible categories for the remaining days.',
                    'Ask about a payment plan or student health scheme at the clinic.',
                    'Record the shortfall and rebuild the buffer next month.',
                    'Ask whether an equivalent future cost could be avoided.',
                ],
                takeaway: 'Pay essentials, cut flexibles, avoid expensive debt, rebuild the buffer.',
            },
        ],
        examBank: [
            {
                question: 'Why is a weekly budget more effective than a monthly one for students?',
                marks: '10 marks',
                outline: [
                    'Monthly allowances are exhausted early by setup and social costs.',
                    'Weekly limits allow correction within the month.',
                    'Shorter horizons make spending visible and controllable.',
                ],
            },
            {
                question: 'Explain the purpose of an emergency buffer and how to build one on a small allowance.',
                marks: '15 marks',
                outline: [
                    'Define the buffer and the panic it prevents.',
                    'Start with one week\'s essential costs.',
                    'Save on receipt day rather than at month end.',
                    'Keep it separate from spending money.',
                    'Rebuild after use.',
                ],
            },
        ],
        glossary: [
            { term: 'Budget', definition: 'A plan allocating expected income to intended spending and saving.' },
            { term: 'Fixed cost', definition: 'A cost that does not vary with day-to-day choices, such as rent.' },
            { term: 'Variable cost', definition: 'A cost that changes with behaviour, such as food and transport.' },
            { term: 'Buffer', definition: 'Money reserved to absorb unexpected costs.' },
            { term: 'Pay yourself first', definition: 'Saving a set amount immediately on receiving income.' },
            { term: 'Consumption debt', definition: 'Borrowing to buy things that are used up rather than invested.' },
            { term: 'Tracking', definition: 'Recording actual spending to reveal patterns.' },
            { term: 'Sinking fund', definition: 'Regular saving towards a known future expense.' },
            { term: 'Opportunity cost', definition: 'What you give up by choosing one use of money over another.' },
            { term: 'Liquidity', definition: 'How quickly an asset can be turned into cash without loss.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Track', focus: 'Data.', tasks: ['Record every expense for seven days.', 'Total by category.', 'Identify the largest flexible cost.'] },
            { week: 'Week 2 - Plan', focus: 'Limits.', tasks: ['Set a weekly figure for each category.', 'Move savings on receipt day.', 'Start a one-week buffer.'] },
            { week: 'Week 3 - Cut', focus: 'Choices.', tasks: ['Apply the 24-hour rule twice.', 'Cook two extra meals weekly.', 'Compare prices for one regular purchase.'] },
            { week: 'Week 4 - Review', focus: 'Adjust.', tasks: ['Compare plan with actuals.', 'Adjust one category only.', 'Write down the emergency plan.'] },
        ],
        readingList: [
            'A personal finance guide for students.',
            'Your institution\'s fees and payment schedule.',
            'A budgeting spreadsheet or app tutorial.',
        ],
    },

    'side-hustles-and-freelancing': {
        sections: [
            {
                heading: 'Earning without losing the degree',
                paragraphs: [
                    'A side hustle is worth doing only if it survives contact with your timetable. The test is simple: can you do it in fixed hours that do not compete with your highest-value study time? Work that expands to fill every evening will cost you the semester.',
                    'The realistic options for students are skills-based and local: tutoring, writing and editing, graphic design, photography, social media management, tailoring, repairs, food sales, delivery and transcription. Each has a low entry cost and a market you can reach on foot or through acquaintances.',
                    'Choose by skill you already have, not by what sounds lucrative. A mediocre photographer competing with professionals earns nothing; a patient mathematics tutor with a good reputation is booked out before examinations.',
                ],
            },
            {
                heading: 'The business basics nobody teaches',
                paragraphs: [
                    'Price by the job, not by the hour, and calculate your costs first. If a design job takes four hours, requires data and electricity, and the client wants three revisions, the price must cover all of it. Students routinely underprice because they count only their time.',
                    'Get a deposit before starting. Fifty per cent is normal for freelance work and protects you from clients who disappear. Put the scope in writing - number of revisions, delivery date, format - because the difference between a good job and an endless one is usually an unclear agreement.',
                    'Keep records from the first naira: income, expenses, and who owes what. A notebook is enough. It protects you in disputes and shows you which work is actually profitable.',
                ],
                callout: {
                    title: 'Say no to scope creep',
                    body: '"That is outside what we agreed - I can do it for an additional fee" is a professional sentence. Working for free to be liked is how freelancers burn out.',
                },
            },
            {
                heading: 'Reputation, payment and risk',
                paragraphs: [
                    'Most student work comes through trust networks: classmates, lecturers, church and mosque communities, family. That means your reputation is your marketing, and one unfinished job travels further than ten good ones.',
                    'Payment risk is real. Use bank transfers rather than cash where possible, keep screenshots, agree a delivery date, and withhold final files until final payment for work where that is reasonable. For larger jobs, split into milestones.',
                    'Understand the legal basics: you cannot sell work you did not create, you should not use pirated software for paid work, and income may be taxable depending on the amount and your circumstances. Ask before assuming.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Pricing a freelance job',
                brief: 'A client wants five social media graphics, delivered in a week.',
                steps: [
                    'Estimate time: one hour per graphic plus two hours of revisions, so seven hours.',
                    'Calculate costs: data, electricity, software, transport to meet the client.',
                    'Decide a target hourly rate that makes the work worth your time.',
                    'Set a price that covers time plus costs plus a margin for the revision risk.',
                    'State the scope in writing: five graphics, two revisions, delivery date and format.',
                    'Request fifty per cent upfront.',
                ],
                takeaway: 'Time plus costs plus revision risk, agreed in writing, with a deposit.',
            },
            {
                title: 'Handling a client who will not pay',
                brief: 'You delivered work and the client has stopped responding.',
                steps: [
                    'Send one clear, polite message restating the amount, the agreed date and the work delivered.',
                    'Attach the screenshots of the agreement and delivery.',
                    'Set a firm date for payment and state the consequence - withholding further work or files.',
                    'Escalate through a mutual contact if one exists.',
                    'Record the client in your own notes and do not work for them again without prepayment.',
                    'Learn the lesson: deposit first, next time.',
                ],
                takeaway: 'Documented, polite, escalating pressure works better than anger. And it starts with a deposit.',
            },
        ],
        examBank: [
            {
                question: 'Explain how a student should decide whether to take on paid work during the semester.',
                marks: '10 marks',
                outline: [
                    'Fixed hours that do not compete with high-value study time.',
                    'Skill match and market demand.',
                    'Effect on attendance and assessment deadlines.',
                    'Explicit decision about what will be sacrificed.',
                ],
            },
            {
                question: 'Why should a freelancer take a deposit and state scope in writing?',
                marks: '10 marks',
                outline: [
                    'Deposits protect against non-payment and confirm commitment.',
                    'Written scope limits revisions and disputes.',
                    'Both convert a hopeful arrangement into an agreement.',
                ],
            },
        ],
        glossary: [
            { term: 'Freelancing', definition: 'Working for clients on specific jobs rather than as an employee.' },
            { term: 'Scope', definition: 'The agreed extent of work to be delivered.' },
            { term: 'Deposit', definition: 'An upfront payment securing a job and reducing non-payment risk.' },
            { term: 'Scope creep', definition: 'Unpaid expansion of a job beyond what was agreed.' },
            { term: 'Milestone', definition: 'A payment stage tied to a delivered portion of work.' },
            { term: 'Cost of delivery', definition: 'The expenses incurred to complete a job.' },
            { term: 'Reputation', definition: 'The standing that generates repeat and referred work.' },
            { term: 'Invoice', definition: 'A document requesting payment for work delivered.' },
            { term: 'Retainer', definition: 'A recurring fee for an agreed ongoing service.' },
            { term: 'Portfolio', definition: 'A collection of work demonstrating your capability.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Skill', focus: 'What can you sell?', tasks: ['List three skills you have.', 'Ask three people what they would pay for.', 'Choose one and set a price.'] },
            { week: 'Week 2 - Offer', focus: 'Finding clients.', tasks: ['Write a three-line offer.', 'Tell ten people.', 'Build a simple portfolio of three items.'] },
            { week: 'Week 3 - Deliver', focus: 'Professionalism.', tasks: ['Write a scope agreement for one job.', 'Take a deposit.', 'Deliver on the agreed date.'] },
            { week: 'Week 4 - Record', focus: 'Learning.', tasks: ['Record income and costs.', 'Calculate the real hourly return.', 'Decide whether to continue.'] },
        ],
        readingList: [
            'A freelancing guide covering pricing and contracts.',
            'Your institution\'s rules on student employment.',
            'A short guide to invoicing and record keeping.',
        ],
    },

    'scholarships-grants-and-financial-aid': {
        sections: [
            {
                heading: 'How funding is actually decided',
                paragraphs: [
                    'Scholarship panels are not looking for the most deserving person in the abstract; they are looking for evidence against stated criteria. Read the eligibility rules first and check whether you meet every one. A brilliant application to a fund you are not eligible for is wasted effort.',
                    'Most awards weigh three things: academic record, financial need, and the applicant\'s capacity to use the opportunity. Application quality matters because panels read hundreds of similar statements; specificity is what makes one memorable.',
                    'Timing decides more outcomes than talent. Applications have fixed windows, transcripts take weeks, and referees need notice. Work backwards from the deadline by at least six weeks.',
                ],
            },
            {
                heading: 'The documents and the statement',
                paragraphs: [
                    'Prepare a master file: academic transcripts, certificates, identification, admission letter, passport photographs, a curriculum vitae, and a bank verification number where required. Keep scanned copies at a consistent resolution and named clearly. Most missed deadlines are document problems, not merit problems.',
                    'The personal statement should answer three questions: what you are studying and why, what you have done that shows commitment, and what you will do with the support. Avoid generic claims about passion. One specific anecdote - a project, a role, a problem you solved - is worth a paragraph of adjectives.',
                    'Choose referees who know your work and give them your CV, the award criteria, and the deadline. A referee who is told nothing writes a letter that could be about anyone.',
                ],
                callout: {
                    title: 'Never pay to apply',
                    body: 'Legitimate scholarships do not charge application or processing fees. Any request for payment is fraud, however official the website looks.',
                },
            },
            {
                heading: 'Where to look and how to avoid fraud',
                paragraphs: [
                    'Sources: your department and faculty notice boards, the university scholarship office, state government education secretariats, professional bodies, religious organisations, corporate foundations, and the official websites of the institutions you are applying to. The most reliable information is usually the least advertised.',
                    'Verify every opportunity against an official domain or a phone number you found yourself. Treat any offer that arrives unsolicited, demands urgency, or asks for bank details by message as fraud until proven otherwise.',
                    'Keep a tracker: award name, deadline, documents required, status. Applying to six awards with a tracker beats applying to twenty in a panic, because you will actually meet the deadlines.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Building a master document file',
                brief: 'You want to be ready for any award that opens.',
                steps: [
                    'Scan transcripts, certificates, admission letter and identification at 300 dpi.',
                    'Name each file clearly with type and date.',
                    'Write a one-page CV with education, roles, skills and two referees.',
                    'Draft a 500-word statement you can adapt to different criteria.',
                    'Store everything in one folder and one cloud location.',
                    'Review the file each semester and update it.',
                ],
                takeaway: 'A prepared file turns a two-week scramble into a two-hour application.',
            },
            {
                title: 'Assessing an award for eligibility',
                brief: 'A scholarship requires a minimum CGPA of 3.5, a state of origin, and full-time enrolment.',
                steps: [
                    'Check each criterion honestly against your record.',
                    'If you meet all three, note the deadline and required documents.',
                    'If you do not, decide whether another award fits better.',
                    'Do not apply hoping the rules will be waived.',
                    'Record the decision in your tracker so you do not revisit it later.',
                    'Share the opportunity with a classmate who is eligible.',
                ],
                takeaway: 'Eligibility first. Effort spent on ineligible applications is effort not spent on eligible ones.',
            },
        ],
        examBank: [
            {
                question: 'What do scholarship panels typically assess, and how should an applicant respond?',
                marks: '15 marks',
                outline: [
                    'Academic record - provide transcripts and evidence of performance.',
                    'Financial need - follow the stated documentation exactly.',
                    'Capacity to use the opportunity - show specific plans and past commitment.',
                    'Application quality - be specific rather than generic.',
                ],
            },
            {
                question: 'How can a student identify and avoid fraudulent scholarship offers?',
                marks: '10 marks',
                outline: [
                    'Legitimate funds never charge processing fees.',
                    'Verify through an official domain or independently found phone number.',
                    'Treat urgency and unsolicited offers as warnings.',
                    'Never share bank credentials or OTPs.',
                ],
            },
        ],
        glossary: [
            { term: 'Scholarship', definition: 'Financial support for study, usually awarded on merit or need or both.' },
            { term: 'Grant', definition: 'Non-repayable funding, often for a specific purpose.' },
            { term: 'Bursary', definition: 'Award based primarily on financial need.' },
            { term: 'Eligibility criteria', definition: 'The conditions an applicant must meet.' },
            { term: 'Personal statement', definition: 'A written account of your motivation, experience and plans.' },
            { term: 'Referee', definition: 'A person who provides a reference on your behalf.' },
            { term: 'Transcript', definition: 'The official record of courses and grades.' },
            { term: 'CGPA', definition: 'Cumulative grade point average.' },
            { term: 'Application tracker', definition: 'A record of awards, deadlines, documents and status.' },
            { term: 'Award letter', definition: 'The formal document confirming an award and its conditions.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - File', focus: 'Documents.', tasks: ['Scan and name all documents.', 'Write a one-page CV.', 'Identify two referees.'] },
            { week: 'Week 2 - Search', focus: 'Opportunities.', tasks: ['Check department, faculty and state sources.', 'List five awards with deadlines.', 'Verify each against an official source.'] },
            { week: 'Week 3 - Write', focus: 'Statement.', tasks: ['Draft 500 words with one specific anecdote.', 'Adapt it to one award\'s criteria.', 'Ask a lecturer for feedback.'] },
            { week: 'Week 4 - Submit', focus: 'Deadlines.', tasks: ['Submit one complete application early.', 'Confirm referees have received requests.', 'Update the tracker.'] },
        ],
        readingList: [
            'Your university scholarship office guidance.',
            'A guide to writing personal statements for funding.',
            'Official websites of your state scholarship board and relevant foundations.',
        ],
    },

    'cv-interviews-and-internships': {
        sections: [
            {
                heading: 'A CV is evidence, not a biography',
                paragraphs: [
                    'A recruiter spends under a minute on a first read. That means the top third of the page decides whether the rest is read. Put your name, contact details, degree and a two-line summary of what you offer at the top, and leave out the primary school you attended.',
                    'Write in outcomes rather than duties. "Organised a departmental career event attended by 120 students" is evidence; "helped with events" is not. Where numbers exist, use them. Where they do not, describe what changed because of you.',
                    'One page is enough for a student. Use a clean font, consistent dates, and reverse chronological order. Check for spelling and consistency - one error in a contact detail can end the application before the content is read.',
                ],
            },
            {
                heading: 'Interviews: structure and the STAR method',
                paragraphs: [
                    'Most graduate interviews combine a motivation question ("why this organisation?"), competency questions ("tell me about a time you led a team"), and a chance for you to ask questions. Prepare for the first two and use the third.',
                    'Answer competency questions with STAR: situation, task, action, result. Keep the situation brief, spend most of the answer on your action, and end on a concrete result. The commonest mistake is spending eighty per cent of the answer on context.',
                    'Research the organisation before you go: what it does, where it operates, and one recent development. Prepare two questions that show you have thought about the work, not about your own benefits. Arrive early, dress appropriately, and bring copies of your CV.',
                ],
                callout: {
                    title: 'Prepare three stories',
                    body: 'Three well-rehearsed stories - a team you led, a problem you solved, a failure you learned from - will answer most competency questions in some form.',
                },
            },
            {
                heading: 'Internships and first opportunities',
                paragraphs: [
                    'Internships are found through three routes: advertised programmes with fixed application windows, personal and family networks, and direct approaches to organisations. The third is underused: a short, specific letter to a manager explaining what you can do and what you want to learn produces more offers than a hundred generic emails.',
                    'During an internship, reliability matters more than brilliance. Arrive on time, finish what you accept, ask questions after trying, and write down instructions. Most internships convert into references or offers for people who were dependable rather than exceptional.',
                    'At the end, ask for a written reference and a short conversation about what you should learn next. That conversation is worth more than the certificate.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Turning a role into a CV line',
                brief: 'You were assistant secretary of a student society.',
                steps: [
                    'List what you actually did: minutes, correspondence, scheduling, records.',
                    'Find the outcomes: meetings held, members recruited, records organised.',
                    'Write a line with a verb, an object and a result.',
                    'Example: "Maintained minutes and correspondence for a 60-member society, reducing missed meetings by scheduling reminders a week ahead."',
                    'Remove any claim you cannot defend in an interview.',
                    'Place it under a heading such as Leadership and Organisation.',
                ],
                takeaway: 'Verb, object, outcome. If there is no outcome, find the change you produced.',
            },
            {
                title: 'Answering "tell me about a time you failed"',
                brief: 'A standard question most candidates mishandle.',
                steps: [
                    'Choose a real failure with a real consequence, not a disguised strength.',
                    'Describe the situation briefly.',
                    'State your decision and why it was wrong.',
                    'Describe what you did to limit the damage.',
                    'State what you changed afterwards, with evidence.',
                    'Keep it under two minutes and end on the change.',
                ],
                takeaway: 'The answer is judged on what you changed, not on how interesting the failure was.',
            },
        ],
        examBank: [
            {
                question: 'Explain the STAR method and why it suits competency-based interviews.',
                marks: '15 marks',
                outline: [
                    'Situation, task, action, result.',
                    'Competency questions ask for evidence of past behaviour.',
                    'STAR supplies evidence in a checkable structure.',
                    'Emphasise action and result over context.',
                ],
            },
            {
                question: 'What makes a student CV effective?',
                marks: '10 marks',
                outline: [
                    'One page, reverse chronological, consistent format.',
                    'Outcomes rather than duties.',
                    'Relevant evidence in the top third.',
                    'Accurate contact details and no errors.',
                ],
            },
        ],
        glossary: [
            { term: 'CV', definition: 'A one to two page summary of education, experience and skills.' },
            { term: 'Competency question', definition: 'A question asking for evidence of past behaviour.' },
            { term: 'STAR', definition: 'Situation, task, action, result - a structure for behavioural answers.' },
            { term: 'Internship', definition: 'A period of supervised work experience.' },
            { term: 'Reference', definition: 'A statement about your performance from someone who supervised you.' },
            { term: 'Cover letter', definition: 'A short letter explaining why you are applying for a specific role.' },
            { term: 'Assessment centre', definition: 'A multi-exercise selection process.' },
            { term: 'Transferable skill', definition: 'A capability usable across different roles.' },
            { term: 'Elevator pitch', definition: 'A ninety-second account of who you are and what you offer.' },
            { term: 'Follow-up', definition: 'A brief message after an interview thanking the panel.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - CV', focus: 'Evidence.', tasks: ['Draft a one-page CV.', 'Convert three duties into outcomes.', 'Have someone check it.'] },
            { week: 'Week 2 - Stories', focus: 'Interviews.', tasks: ['Write three STAR stories.', 'Rehearse each aloud under two minutes.', 'Prepare two questions to ask.'] },
            { week: 'Week 3 - Research', focus: 'Targets.', tasks: ['Research three organisations.', 'Write one tailored cover letter.', 'Send one direct approach.'] },
            { week: 'Week 4 - Practise', focus: 'Performance.', tasks: ['Do a mock interview.', 'Get feedback on pace and clarity.', 'Ask one contact for a reference.'] },
        ],
        readingList: [
            'A graduate careers guide covering CVs and interviews.',
            'Your university careers service materials.',
            'Your institution\'s internship and attachment policy.',
        ],
    },

    'entrepreneurship-from-idea-to-first-customer': {
        sections: [
            {
                heading: 'An idea is not a business',
                paragraphs: [
                    'A business exists when someone pays for something repeatedly at a price that covers costs. Everything before that is a hypothesis. The useful question is not "is this a good idea?" but "who specifically has this problem badly enough to pay, and how will I reach them?"',
                    'Most student ventures fail for one of three reasons: no clear customer, no margin after real costs, or no repeat purchase. A product that everyone admires and nobody buys has failed at the first test; a product that sells at a loss has failed at the second.',
                    'Start small enough to test cheaply. One product, ten customers, one channel. Learning from ten real transactions is worth more than a business plan written for a thousand imaginary ones.',
                ],
            },
            {
                heading: 'Costs, price and the first sale',
                paragraphs: [
                    'Separate fixed costs (equipment, registration, rent) from variable costs (materials, packaging, delivery). Your price must cover variable cost plus a contribution towards fixed costs plus a margin. Many student businesses price at the cost of materials and then discover they have been working for free.',
                    'Your first ten customers come from people who already trust you: classmates, family, church or mosque networks, and their referrals. Sell to them in person, ask why they bought, and note what they complained about. That conversation is your market research.',
                    'Keep records from day one: money in, money out, stock, and who owes what. A notebook is sufficient. Businesses without records cannot tell whether they are profitable, and they cannot prove anything to a lender or partner later.',
                ],
                callout: {
                    title: 'Sell before you build',
                    body: 'Take pre-orders or a deposit before committing to a large purchase of stock. If nobody will pre-pay, nobody will buy.',
                },
            },
            {
                heading: 'Legal basics, partners and failure',
                paragraphs: [
                    'Register the business when it starts handling meaningful money - a business name registration is inexpensive and separates your personal liability from the venture\'s obligations. Understand what you are signing, especially with a partner.',
                    'Partnerships fail over unspoken expectations. Before starting, write down who contributes what, who decides what, how profits are split, what happens if someone leaves, and how disputes are resolved. A one-page agreement signed while everyone is friendly prevents most later conflict.',
                    'Expect the first version to be wrong. The skill is not avoiding failure but making it cheap and quick: test small, listen, change one thing at a time, and stop when the evidence says stop. Persistence is valuable only when the feedback is improving.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Testing an idea cheaply',
                brief: 'You want to sell packaged snacks on campus.',
                steps: [
                    'Define the customer: students leaving evening lectures who have not eaten.',
                    'Set a test: make 20 units and sell them at one location over two evenings.',
                    'Calculate the true cost per unit, including packaging, transport and your time.',
                    'Record how many sold, at what price, and what buyers said.',
                    'Decide: continue, change the price, change the location, or stop.',
                    'Only scale after the test shows a margin and repeat buyers.',
                ],
                takeaway: 'Twenty units sold honestly tell you more than a business plan.',
            },
            {
                title: 'Writing a one-page partnership agreement',
                brief: 'Two friends want to start a printing service.',
                steps: [
                    'State contributions: cash, equipment, time and skills.',
                    'State roles and who decides what.',
                    'State the profit split and when it is paid.',
                    'State what happens if one person stops contributing.',
                    'State how disputes are resolved and how someone exits.',
                    'Both sign and date, and keep copies.',
                ],
                takeaway: 'Write the exit before the entry. That is when it can still be discussed calmly.',
            },
        ],
        examBank: [
            {
                question: 'Distinguish fixed and variable costs and explain why the distinction matters for pricing.',
                marks: '10 marks',
                outline: [
                    'Definitions with examples.',
                    'Price must exceed variable cost to contribute to fixed costs.',
                    'Contribution analysis identifies break-even.',
                    'Pricing below variable cost means losing money on every sale.',
                ],
            },
            {
                question: 'Why do most student ventures fail, and how can failure be made cheaper?',
                marks: '15 marks',
                outline: [
                    'No clear customer, no margin, no repeat purchase.',
                    'Test with small volumes and real transactions.',
                    'Record and respond to feedback.',
                    'Stop quickly when evidence is negative.',
                ],
            },
        ],
        glossary: [
            { term: 'Value proposition', definition: 'The specific benefit an offer promises to a defined customer.' },
            { term: 'Fixed cost', definition: 'A cost incurred regardless of sales volume.' },
            { term: 'Variable cost', definition: 'A cost that rises with each unit produced or sold.' },
            { term: 'Contribution', definition: 'Price minus variable cost per unit.' },
            { term: 'Break-even', definition: 'The sales volume at which contribution covers fixed costs.' },
            { term: 'Margin', definition: 'The difference between price and cost, as an amount or a percentage.' },
            { term: 'Pre-order', definition: 'Payment taken before goods are produced.' },
            { term: 'Repeat purchase', definition: 'A customer buying again, the clearest sign of real value.' },
            { term: 'Cash flow', definition: 'The timing of money entering and leaving the business.' },
            { term: 'Partnership agreement', definition: 'A written statement of contributions, roles, splits and exit.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Customer', focus: 'Specificity.', tasks: ['Name one specific customer group.', 'Interview five people about the problem.', 'Write a one-sentence offer.'] },
            { week: 'Week 2 - Costs', focus: 'Numbers.', tasks: ['List fixed and variable costs.', 'Calculate a price with margin.', 'Set a break-even target.'] },
            { week: 'Week 3 - Test', focus: 'First sale.', tasks: ['Produce a small batch.', 'Sell to ten people.', 'Record what they said.'] },
            { week: 'Week 4 - Decide', focus: 'Evidence.', tasks: ['Review sales and margin.', 'Change one thing.', 'Decide to continue, adapt or stop.'] },
        ],
        readingList: [
            'A short guide to starting a small business.',
            'Your country\'s business registration guidance.',
            'A book on testing business ideas cheaply.',
        ],
    },
})

// ── Digital skills ────────────────────────────────────────────────────────
Object.assign(THEATRE_FILM_DEPTH, {
    'word-excel-and-powerpoint-for-assignments': {
        sections: [
            {
                heading: 'Word: structure first, appearance second',
                paragraphs: [
                    'Most marks lost in typed assignments are lost to formatting chaos: inconsistent headings, manual numbering that breaks, paragraphs separated by blank lines, and a table of contents that does not match the page numbers. All of it disappears if you use styles properly.',
                    'Apply heading styles (Heading 1, Heading 2) rather than making text bold and large. Styles give you automatic navigation, a consistent look, and a working table of contents. Insert page numbers and a title page in separate sections so the numbering starts correctly.',
                    'Set the document up before writing: page size, margins, font, line spacing and the citation style your department requires. Then use Find and Replace for repeated corrections rather than editing by hand.',
                ],
            },
            {
                heading: 'Excel: formulas, references and charts',
                paragraphs: [
                    'A spreadsheet is a calculation engine. Every cell can hold a value or a formula beginning with equals. Relative references (A1) shift when copied; absolute references ($A$1) do not. Understanding that difference is the difference between a working model and a column of wrong answers.',
                    'The functions students actually need: SUM, AVERAGE, COUNT, IF, VLOOKUP or XLOOKUP, and ROUND. The IF function returns different values depending on a condition; lookups pull a value from a table based on a key. Learn these five and you can build a grade tracker, a budget, or a simple data analysis.',
                    'Charts should show one thing clearly. Title the axes, label the units, and choose the chart type that matches the relationship: column for comparison, line for change over time, pie only for a small number of parts of a whole.',
                ],
                callout: {
                    title: 'Never type a number twice',
                    body: 'If a value appears in two places, one of them should be a formula. Typed duplicates are how spreadsheets drift out of agreement.',
                },
            },
            {
                heading: 'PowerPoint: slides support a speaker',
                paragraphs: [
                    'A slide is not a document. If the audience is reading paragraphs, they are not listening. One idea per slide, six lines maximum, large font, and a headline that states the point rather than naming the topic.',
                    'Design for the room: high contrast, dark text on a light background or the reverse, a font size readable from the back, and images that are relevant rather than decorative. Avoid animations unless they explain something.',
                    'Rehearse with the slides, not by reading them. Keep notes in the speaker notes pane. Always export a PDF copy and carry it on a flash drive, because equipment fails and the version on someone else\'s laptop is not always the version you saved.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'A working grade tracker',
                brief: 'You want to compute your CGPA in Excel.',
                steps: [
                    'Columns: course code, units, score, grade.',
                    'Use nested IF formulas to convert score to grade and grade point.',
                    'Multiply each grade point by its unit value.',
                    'Sum the weighted points and the units separately.',
                    'Divide the total weighted points by total units.',
                    'Freeze the header row and apply conditional formatting to highlight low grades.',
                ],
                takeaway: 'Convert to numbers early, weight by units, divide at the end.',
            },
            {
                title: 'Fixing a Word document that will not behave',
                brief: 'Your headings are inconsistent and the table of contents is wrong.',
                steps: [
                    'Select each heading and apply the correct built-in style.',
                    'Remove manual bold and font-size changes.',
                    'Insert an automatic table of contents from References.',
                    'Update the field to refresh page numbers.',
                    'Insert page numbers with a section break after the title page.',
                    'Check the document in print preview.',
                ],
                takeaway: 'Styles are the fix. Manual formatting is the cause.',
            },
        ],
        examBank: [
            {
                question: 'Explain the difference between relative and absolute cell references.',
                marks: '10 marks',
                outline: [
                    'Relative references change when copied.',
                    'Absolute references are fixed with dollar signs.',
                    'Give one use case for each.',
                    'Explain what goes wrong if the distinction is ignored.',
                ],
            },
            {
                question: 'Why should headings in a long document use styles rather than manual formatting?',
                marks: '10 marks',
                outline: [
                    'Consistency across the document.',
                    'Automatic table of contents and navigation.',
                    'Easier global changes.',
                    'Manual formatting breaks when text is edited.',
                ],
            },
        ],
        glossary: [
            { term: 'Style', definition: 'A saved set of formatting rules applied to text such as a heading.' },
            { term: 'Section break', definition: 'A division in a document allowing different formatting or numbering.' },
            { term: 'Field', definition: 'An automatically updated element such as a page number or contents list.' },
            { term: 'Cell reference', definition: 'The address of a spreadsheet cell, such as A1.' },
            { term: 'Absolute reference', definition: 'A fixed cell reference that does not change when copied.' },
            { term: 'Function', definition: 'A built-in calculation such as SUM or IF.' },
            { term: 'Lookup', definition: 'A function that retrieves a value from a table using a key.' },
            { term: 'Conditional formatting', definition: 'Formatting applied automatically according to cell values.' },
            { term: 'Chart type', definition: 'The visual form used to display a data relationship.' },
            { term: 'Speaker notes', definition: 'Text visible to the presenter but not the audience.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Word', focus: 'Structure.', tasks: ['Set up a template with styles.', 'Insert automatic contents and page numbers.', 'Convert an old assignment to styles.'] },
            { week: 'Week 2 - Excel', focus: 'Formulas.', tasks: ['Build a grade tracker.', 'Practise relative and absolute references.', 'Use IF and one lookup.'] },
            { week: 'Week 3 - Charts', focus: 'Communication.', tasks: ['Create three charts from one data set.', 'Label axes and units.', 'Choose the right type and justify it.'] },
            { week: 'Week 4 - Slides', focus: 'Presentation.', tasks: ['Build ten slides at six lines maximum.', 'Rehearse with notes.', 'Export a PDF backup.'] },
        ],
        readingList: [
            'A short guide to Word styles and long-document formatting.',
            'An Excel formulas tutorial covering IF and lookups.',
            'Your department\'s formatting and citation requirements.',
        ],
    },

    'google-workspace-and-cloud-collaboration': {
        sections: [
            {
                heading: 'Cloud tools are for working together',
                paragraphs: [
                    'A shared cloud document changes collaboration from sending versions by email to editing one file together. That eliminates "final_v3_edited" confusion, but it introduces new problems: accidental deletion, unclear ownership, and edits nobody can trace.',
                    'The fix is conventions. Name files consistently (course-date-topic), keep one folder per course, and agree who owns which document. Use comments for discussion and the document itself for content, so that the final text is not buried under debate.',
                    'Version history is the safety net. Learn where it is and how to restore a previous version before you need it. It is the single most useful feature in any cloud document and almost nobody uses it until something is lost.',
                ],
            },
            {
                heading: 'The tools and their real uses',
                paragraphs: [
                    'Docs for writing, Sheets for data and calculation, Slides for presentation, Forms for surveys and quizzes, Drive for storage and sharing, and Calendar for scheduling. Each has a mobile app, but long documents and spreadsheets are far easier on a laptop.',
                    'Sharing permissions have three levels that matter: viewer (read), commenter (suggest but not change), and editor (change). Give the lowest level that works. Sharing a folder with "anyone with the link" is how private material becomes public.',
                    'Offline access is worth configuring in advance. Download the files you need before travelling, and check that they open without a connection. Cloud tools are excellent until the data runs out.',
                ],
                callout: {
                    title: 'Link, do not attach',
                    body: 'Send the link with the right permission rather than an attachment. Attachments multiply versions; links keep everyone on one file.',
                },
            },
            {
                heading: 'Group work without group chaos',
                paragraphs: [
                    'Divide by section, not by sentence. Each person owns a section and is responsible for its content and citations; one person owns the final edit and the formatting. Agree the deadline for drafts as a date and time, not "before submission".',
                    'Use suggestion mode for edits to other people\'s sections, and comments for disagreements. This preserves the author\'s control and leaves a record of what changed and why - which is also useful if a lecturer asks who wrote what.',
                    'Track tasks somewhere visible: a shared checklist, a simple sheet, or a task list in the document. Group work fails silently when everyone assumes someone else is doing the referencing.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Setting up a group assignment',
                brief: 'Five students, one 2,500-word report, three weeks.',
                steps: [
                    'Create one folder and one master document.',
                    'Agree the structure and assign one section per person.',
                    'Set draft deadline, review deadline and final deadline as dates and times.',
                    'Give editing rights to all, but assign one final editor.',
                    'Agree the citation style and who checks the reference list.',
                    'Use comments for feedback and version history if something is lost.',
                ],
                takeaway: 'One file, one owner per section, one final editor, deadlines with times.',
            },
            {
                title: 'Recovering deleted work',
                brief: 'A group member deleted two pages of the report.',
                steps: [
                    'Open File, then Version history.',
                    'Identify the version before the deletion by timestamp.',
                    'Restore or copy the missing section into the current version.',
                    'Restrict editing rights for that member to commenter if it was careless.',
                    'Ask everyone to work in suggestion mode from then on.',
                    'Take a PDF snapshot at each milestone.',
                ],
                takeaway: 'Version history first, blame later. Then change permissions, not friendships.',
            },
        ],
        examBank: [
            {
                question: 'Explain the three main sharing permission levels and when each is appropriate.',
                marks: '10 marks',
                outline: [
                    'Viewer for finished documents.',
                    'Commenter for review without alteration.',
                    'Editor for co-authoring.',
                    'Principle of least privilege.',
                ],
            },
            {
                question: 'Describe conventions that prevent version chaos in group work.',
                marks: '10 marks',
                outline: [
                    'One master document with a link.',
                    'Consistent file naming and one folder.',
                    'Section ownership and named final editor.',
                    'Deadlines with dates and times.',
                ],
            },
        ],
        glossary: [
            { term: 'Cloud storage', definition: 'Files stored on remote servers and accessed over the internet.' },
            { term: 'Version history', definition: 'A record of changes allowing restoration of earlier versions.' },
            { term: 'Suggestion mode', definition: 'An editing mode that proposes changes rather than applying them.' },
            { term: 'Permission level', definition: 'The rights granted to a user: view, comment or edit.' },
            { term: 'Shared drive', definition: 'A folder whose contents belong to a group rather than an individual.' },
            { term: 'Offline access', definition: 'The ability to open and edit files without a connection.' },
            { term: 'Sync', definition: 'Keeping local and remote copies of files consistent.' },
            { term: 'Milestone', definition: 'A fixed point in a project with a defined deliverable.' },
            { term: 'Master document', definition: 'The single authoritative file for a piece of work.' },
            { term: 'Two-factor authentication', definition: 'A second verification step beyond a password.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Organise', focus: 'Structure.', tasks: ['Create one folder per course.', 'Adopt a file naming convention.', 'Set up two-factor authentication.'] },
            { week: 'Week 2 - Collaborate', focus: 'Permissions.', tasks: ['Share a document at each permission level.', 'Use comments and suggestion mode.', 'Practise restoring a version.'] },
            { week: 'Week 3 - Data', focus: 'Sheets and Forms.', tasks: ['Build a shared tracker.', 'Create a short survey form.', 'Analyse the responses in a sheet.'] },
            { week: 'Week 4 - Group work', focus: 'Delivery.', tasks: ['Run one assignment with the conventions.', 'Hold a five-minute stand-up.', 'Take a PDF snapshot at submission.'] },
        ],
        readingList: [
            'The help documentation for your cloud provider\'s document tools.',
            'A guide to collaborative writing practice.',
            'Your institution\'s data protection guidance for student work.',
        ],
    },

    'ai-tools-for-studying-ethically': {
        sections: [
            {
                heading: 'What these tools are good at, and what they are not',
                paragraphs: [
                    'Language models generate plausible text by predicting what usually follows. That makes them useful for explaining a concept in simpler words, generating practice questions, suggesting structures, and checking your grammar. It also makes them capable of confident invention - fabricated citations, wrong dates, non-existent laws - which is why every factual claim must be verified.',
                    'The distinction that matters is between using a tool to think and using it to avoid thinking. Asking for an explanation of a concept you then test yourself on is study. Asking for an essay you submit as your own is misconduct, regardless of how much you edit it.',
                    'Assume your institution will detect and penalise undisclosed use. Disclosure rules vary, so read your department\'s policy and, when unsure, ask before submitting.',
                ],
            },
            {
                heading: 'Uses that genuinely help',
                paragraphs: [
                    'Explanation at a different level: ask for a simpler explanation, an analogy, or a counter-example. Then close the tool and write the explanation yourself; if you cannot, you have not learned it.',
                    'Practice generation: ask for ten exam-style questions on a named topic, answer them closed-book, then compare with your notes. The questions are only as good as your ability to check the answers, so use topics you know well enough to judge.',
                    'Editing and structure: ask for feedback on clarity, or for three possible outlines for an argument you have already researched. Never let a tool supply the evidence - that is the part you must find and cite.',
                ],
                callout: {
                    title: 'Verify or omit',
                    body: 'Any citation, statistic, date or quotation a tool gives you must be checked against the original source before it appears in your work. Unverified generated citations are the commonest form of accidental fabrication.',
                },
            },
            {
                heading: 'Risk, privacy and academic honesty',
                paragraphs: [
                    'Do not paste confidential material - other people\'s data, unpublished research, personal information - into a public tool. Assume anything you enter may be stored and reviewed.',
                    'Keep a record of how you used a tool if your department requires disclosure: which tool, what prompt, what you did with the output. Honest disclosure is almost always treated more leniently than concealment.',
                    'The professional parallel is worth remembering: using a tool for a first draft is normal in many workplaces, but signing your name to work you cannot defend is not. Your qualification certifies your capability, and that is what an employer or a postgraduate panel will test.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Using a tool to study a hard concept',
                brief: 'You do not understand the difference between validity and soundness.',
                steps: [
                    'Ask the tool for a simple explanation with two examples.',
                    'Read it once and close it.',
                    'Write your own explanation from memory.',
                    'Test yourself with three new examples you invent.',
                    'Check your answers against your textbook, not against the tool.',
                    'Note the one point you still cannot explain and ask a lecturer.',
                ],
                takeaway: 'The tool is a first reader, not an authority. Your textbook and your lecturer are the check.',
            },
            {
                title: 'Checking a generated citation',
                brief: 'A tool gives you: "Achebe, C. (1958) Things Fall Apart. London: Heinemann." plus a page reference.',
                steps: [
                    'Verify the book exists and the publication details match a library catalogue.',
                    'Check the edition you are using, because page numbers differ between editions.',
                    'Locate the quoted passage yourself.',
                    'If you cannot find it, do not cite it.',
                    'Cite the edition you actually consulted.',
                    'If the claim came from the tool rather than the book, do not use the claim.',
                ],
                takeaway: 'Publication details may be right while the quotation is invented. Check the passage, not just the book.',
            },
        ],
        examBank: [
            {
                question: 'Distinguish using an AI tool to support learning from using it to commit academic misconduct.',
                marks: '15 marks',
                outline: [
                    'Support: explanation, practice questions, feedback on your own work.',
                    'Misconduct: submitting generated text as your own, undisclosed.',
                    'The test is whether the thinking and evidence are yours.',
                    'Institutional disclosure rules determine what must be declared.',
                ],
            },
            {
                question: 'Why must every factual claim from a language model be verified?',
                marks: '10 marks',
                outline: [
                    'Models predict plausible text rather than retrieving verified facts.',
                    'Fabricated citations and confident errors occur.',
                    'Verification against primary sources is the only check.',
                ],
            },
        ],
        glossary: [
            { term: 'Language model', definition: 'A system that generates text by predicting likely sequences.' },
            { term: 'Hallucination', definition: 'Confident output that is factually wrong or invented.' },
            { term: 'Prompt', definition: 'The instruction given to a generative tool.' },
            { term: 'Disclosure', definition: 'Declaring how a tool was used in producing work.' },
            { term: 'Verification', definition: 'Checking a claim against an authoritative source.' },
            { term: 'Primary source', definition: 'The original document or data, as opposed to commentary.' },
            { term: 'Data protection', definition: 'Rules governing the handling of personal information.' },
            { term: 'Attribution', definition: 'Identifying the source of an idea, quotation or image.' },
            { term: 'Plagiarism', definition: 'Presenting another\'s work or words as your own.' },
            { term: 'Critical evaluation', definition: 'Judging the reliability of a source or output before using it.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Rules', focus: 'Policy.', tasks: ['Read your department\'s AI policy.', 'Note disclosure requirements.', 'List prohibited uses.'] },
            { week: 'Week 2 - Study use', focus: 'Explanation.', tasks: ['Ask for a simpler explanation of one concept.', 'Rewrite it from memory.', 'Test yourself and note gaps.'] },
            { week: 'Week 3 - Verify', focus: 'Checking.', tasks: ['Verify three generated citations.', 'Find one fabricated detail.', 'Practise locating the original passage.'] },
            { week: 'Week 4 - Reflect', focus: 'Honesty.', tasks: ['Write a disclosure statement template.', 'Review your own recent work for unverified claims.', 'Ask a lecturer one clarifying question.'] },
        ],
        readingList: [
            'Your institution\'s academic integrity and AI use policy.',
            'A guide to source verification for students.',
            'A critical thinking text on evaluating evidence.',
        ],
    },

    'cybercrime-and-online-safety': {
        sections: [
            {
                heading: 'The threats that actually reach students',
                paragraphs: [
                    'Most online harm comes through a handful of routes: phishing messages that steal passwords, fraudulent payment requests, account takeover through reused passwords, sextortion using stolen images, malware from pirated software, and identity misuse of photographs and documents.',
                    'Cybercrime is also something students can commit without realising it: using someone else\'s account, accessing a system without permission, sharing pirated material, or forwarding intimate images. In Nigeria these are criminal offences with real penalties, and "I did not know" is not a defence.',
                    'The common thread in victimisation is urgency. Fraud works by making you act before you think. Any message demanding immediate action - pay now, verify now, send the code now - is a reason to slow down, not to hurry.',
                ],
            },
            {
                heading: 'Habits that prevent most incidents',
                paragraphs: [
                    'Use a unique password for every important account and a password manager to hold them. Reused passwords are why one breach becomes ten. Turn on two-factor authentication everywhere it is offered, and prefer an authenticator app over SMS where possible.',
                    'Never share a one-time code. No bank, platform or university will ask for it. A code read aloud is a login or transfer authorised by you, whoever is asking.',
                    'Keep devices updated, install software only from official sources, and back up important files to two places. Ransomware and device theft are survivable with backups and catastrophic without them.',
                ],
                callout: {
                    title: 'Slow is safe',
                    body: 'Any message that pressures you to act within minutes is a message to verify through a channel you chose. The pressure is the attack.',
                },
            },
            {
                heading: 'If you are targeted',
                paragraphs: [
                    'For account takeover: change the password from a different device, revoke active sessions, enable two-factor authentication, and check recovery email and phone settings for changes the attacker made.',
                    'For financial fraud: contact your bank immediately, report to the police cybercrime unit, and preserve every message and transaction reference. Speed matters more than dignity; delays reduce recovery.',
                    'For sextortion or image-based abuse: do not pay, do not send more, preserve evidence, report to the platform and to the authorities, and seek support. Paying increases demands and never ends them.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Responding to a phishing message',
                brief: 'An email says your student portal will be closed unless you log in through a link within 24 hours.',
                steps: [
                    'Do not click the link.',
                    'Inspect the sender address and the link target without clicking.',
                    'Open the portal by typing the official address yourself.',
                    'Check whether any notice exists there.',
                    'Report the message to the institution\'s IT service.',
                    'If you already entered credentials, change the password and enable two-factor authentication immediately.',
                ],
                takeaway: 'Navigate to the service yourself. Never log in through a link in a message.',
            },
            {
                title: 'Recovering a compromised account',
                brief: 'You can no longer log in and friends report strange messages from your account.',
                steps: [
                    'Use the platform\'s account recovery from a device you trust.',
                    'Change the password to a new unique one.',
                    'Revoke all active sessions and connected apps.',
                    'Enable two-factor authentication.',
                    'Check recovery email and phone numbers and correct them.',
                    'Warn contacts that messages from the account were not from you.',
                ],
                takeaway: 'Password, sessions, two-factor, recovery details. In that order.',
            },
        ],
        examBank: [
            {
                question: 'Explain how phishing works and the habits that defeat it.',
                marks: '15 marks',
                outline: [
                    'Impersonation plus urgency plus a link or attachment.',
                    'Defences: never log in via links, verify through independent channels, inspect sender and URL.',
                    'Two-factor authentication limits the damage of a stolen password.',
                ],
            },
            {
                question: 'Identify three online behaviours that constitute criminal offences.',
                marks: '10 marks',
                outline: [
                    'Unauthorised access to a system or account.',
                    'Fraudulent requests for money or credentials.',
                    'Sharing intimate images without consent.',
                    'Distribution of pirated material where prohibited.',
                ],
            },
        ],
        glossary: [
            { term: 'Phishing', definition: 'A fraudulent message designed to obtain credentials or money.' },
            { term: 'Two-factor authentication', definition: 'A second verification step beyond a password.' },
            { term: 'One-time code', definition: 'A single-use code authorising a login or transaction.' },
            { term: 'Malware', definition: 'Software designed to harm or gain unauthorised access.' },
            { term: 'Ransomware', definition: 'Malware that encrypts files and demands payment.' },
            { term: 'Sextortion', definition: 'Threatening to publish intimate images unless demands are met.' },
            { term: 'Account takeover', definition: 'Unauthorised control of another person\'s account.' },
            { term: 'Password manager', definition: 'Software that stores and generates unique passwords.' },
            { term: 'Backup', definition: 'A copy of data kept separately so it can be restored.' },
            { term: 'Digital footprint', definition: 'The record of your activity left online.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Accounts', focus: 'Access.', tasks: ['Set unique passwords for five accounts.', 'Enable two-factor authentication.', 'Check recovery details.'] },
            { week: 'Week 2 - Recognition', focus: 'Fraud.', tasks: ['Collect three suspicious messages.', 'Identify the pressure tactic in each.', 'Practise independent verification.'] },
            { week: 'Week 3 - Devices', focus: 'Hygiene.', tasks: ['Update all software.', 'Remove pirated applications.', 'Set up two backups.'] },
            { week: 'Week 4 - Response', focus: 'Incident plan.', tasks: ['Write your response checklist.', 'Save the bank fraud number.', 'Know how to report to the cybercrime unit.'] },
        ],
        readingList: [
            'Your institution\'s IT security guidance.',
            'Your bank\'s fraud prevention advice.',
            'The Cybercrimes Act and a plain-language summary of its offences.',
        ],
    },
})

// ── Health and wellbeing ──────────────────────────────────────────────────
Object.assign(THEATRE_FILM_DEPTH, {
    'mental-health-and-stress-management': {
        sections: [
            {
                heading: 'Stress is a response, not a weakness',
                paragraphs: [
                    'Stress is the body\'s response to a demand it perceives as exceeding its resources. In short bursts it is useful: it sharpens attention before an examination. It becomes harmful when it is chronic, when the demand never lifts and the body never returns to baseline. That is when sleep, appetite, concentration and immunity begin to suffer.',
                    'University creates specific stressors: financial pressure, academic workload, distance from family, crowded accommodation, uncertain outcomes and social comparison. Naming the specific stressor matters, because "I am stressed" cannot be acted on while "I cannot sleep because I am worried about fees" can.',
                    'Mental health is not the absence of difficulty. It is the capacity to function, to feel, and to seek help when functioning is impaired. Everyone has bad weeks; the question is whether the bad weeks are becoming the pattern.',
                ],
            },
            {
                heading: 'What helps, in order of evidence',
                paragraphs: [
                    'The foundations are unglamorous and effective: sleep on a regular schedule, eat regularly, move your body most days, and reduce alcohol and stimulants. None of these is a cure, and all of them make everything else easier.',
                    'Practical stress management: break tasks into next actions, write worries down rather than rehearsing them, set a boundary on rumination by scheduling a short worry period, and use breathing or paced exercise to settle the physical response. Social contact is not optional - isolation amplifies almost every symptom.',
                    'Cognitive approaches help by noticing and testing thoughts rather than obeying them: "I will fail everything" is a prediction, not a fact, and it can be checked against what has actually happened. This is the core of what counselling teaches, and it is learnable.',
                ],
                callout: {
                    title: 'Sleep is treatment',
                    body: 'Regular sleep and wake times, no screens in bed, and no caffeine after midday will improve mood and concentration faster than most other changes.',
                },
            },
            {
                heading: 'When to seek help, and how',
                paragraphs: [
                    'Seek help when symptoms last more than two weeks, when they interfere with attendance or study, when sleep or appetite are significantly changed, or when you have thoughts of harming yourself. Any of these is sufficient - you do not need to be at breaking point.',
                    'Sources: the university counselling service, the health centre, your religious community, a trusted lecturer, and helplines. If you are in immediate danger, go to the health centre or a hospital, and tell someone physically near you.',
                    'Supporting a friend: ask directly and calmly, listen without rushing to advice, take statements about self-harm seriously, and help them make contact with a service. Do not promise secrecy about a risk to life. Looking after yourself while supporting someone is not selfishness; it is what makes the support sustainable.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Breaking a stress spiral',
                brief: 'You cannot sleep because of an exam in five days and a fee deadline.',
                steps: [
                    'Write down the two stressors separately; they need different actions.',
                    'For the exam: list the topics and pick the two weakest to start with.',
                    'For the fees: identify one person or office to speak to and one question to ask.',
                    'Set a time tomorrow to do each first action.',
                    'Write the worries on paper and put them away until that time.',
                    'Fix a wake time and stop studying one hour before bed.',
                ],
                takeaway: 'One action per stressor, scheduled. Rumination is not planning.',
            },
            {
                title: 'Supporting a friend who is struggling',
                brief: 'A friend has stopped attending and says there is no point.',
                steps: [
                    'Ask directly: "how are you actually doing?" and wait.',
                    'Listen without correcting or minimising.',
                    'Ask whether they have thoughts of harming themselves.',
                    'If yes, do not leave them alone and help them contact the health centre or a helpline.',
                    'Offer something concrete: accompany them to the appointment, share notes.',
                    'Check in again in a few days - sustained contact matters more than one conversation.',
                ],
                takeaway: 'Direct questions do not plant the idea; they open the door.',
            },
        ],
        examBank: [
            {
                question: 'Distinguish acute from chronic stress and explain why the distinction matters.',
                marks: '15 marks',
                outline: [
                    'Acute: short-lived response to a specific demand; can improve performance.',
                    'Chronic: sustained demand without recovery; impairs sleep, immunity, mood, cognition.',
                    'The distinction determines the intervention: recovery versus removing the stressor.',
                ],
            },
            {
                question: 'List the signs that a student should seek professional help.',
                marks: '10 marks',
                outline: [
                    'Symptoms lasting more than two weeks.',
                    'Functional impairment in study or attendance.',
                    'Major changes in sleep or appetite.',
                    'Any thoughts of self-harm.',
                ],
            },
        ],
        glossary: [
            { term: 'Stressor', definition: 'A demand perceived as exceeding available resources.' },
            { term: 'Acute stress', definition: 'A short-term response to a specific demand.' },
            { term: 'Chronic stress', definition: 'Sustained stress without adequate recovery.' },
            { term: 'Rumination', definition: 'Repetitive thinking about a problem without progressing towards action.' },
            { term: 'Cognitive restructuring', definition: 'Testing and revising unhelpful thoughts.' },
            { term: 'Burnout', definition: 'Exhaustion from prolonged unmanaged demand.' },
            { term: 'Counselling', definition: 'Confidential talking therapy with a trained professional.' },
            { term: 'Stigma', definition: 'Social disapproval that discourages help-seeking.' },
            { term: 'Sleep hygiene', definition: 'Habits that support regular, sufficient sleep.' },
            { term: 'Safety plan', definition: 'A pre-agreed set of steps for a crisis, including contacts.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Notice', focus: 'Patterns.', tasks: ['Log sleep, mood and study hours for seven days.', 'Name the top two stressors.', 'Set a fixed wake time.'] },
            { week: 'Week 2 - Act', focus: 'First steps.', tasks: ['Take one action on each stressor.', 'Schedule one social contact.', 'Reduce caffeine after midday.'] },
            { week: 'Week 3 - Skills', focus: 'Thinking.', tasks: ['Write one worry and test it against evidence.', 'Practise a breathing exercise daily.', 'Use a scheduled worry period.'] },
            { week: 'Week 4 - Support', focus: 'Help.', tasks: ['Identify the counselling contact.', 'Have one honest conversation.', 'Write a personal safety plan.'] },
        ],
        readingList: [
            'Your institution\'s counselling and health service information.',
            'A self-help guide based on cognitive behavioural principles.',
            'A guide to supporting a friend in distress.',
        ],
    },

    'nutrition-and-student-energy': {
        sections: [
            {
                heading: 'Energy is a food problem before it is a willpower problem',
                paragraphs: [
                    'The afternoon slump, the inability to concentrate at 4 p.m., and the constant hunger that leads to buying whatever is nearest are usually consequences of what was eaten at 7 a.m. - often nothing. A breakfast with protein and fibre produces a slower rise and fall in blood glucose than a sugary drink and a pastry.',
                    'The basic composition matters more than any specific diet: carbohydrates for fuel, protein for repair and satiety, fats for hormones and absorption, fibre for digestion and steady energy, and water for everything. Most student diets are high in refined carbohydrate, low in protein and vegetables, and low in water.',
                    'Meal timing shapes energy. Three meals with one or two small snacks suits most people better than one huge evening meal, particularly for concentration during the day.',
                ],
            },
            {
                heading: 'Eating well on a student budget',
                paragraphs: [
                    'The cheapest nutrition per naira is usually staples bought dry and in bulk, combined with legumes and seasonal vegetables: rice and beans, yam and egg, garri with groundnut and vegetables, pap with milk, bread with egg. Adding a protein source and a vegetable to a staple transforms its nutritional value for a small cost.',
                    'Cook in batches. One pot of beans or stew divided into portions and refrigerated or frozen saves both money and the decision fatigue that leads to buying expensive food. A shared cooking arrangement with housemates reduces cost further.',
                    'Water is the cheapest performance enhancer available. Keep a bottle with you and drink before you feel thirsty. Sugary drinks and energy drinks provide a short rise followed by a fall, and the caffeine masks fatigue rather than resolving it.',
                ],
                callout: {
                    title: 'Add, do not subtract',
                    body: 'Rather than removing foods, add what is missing: a protein source and a vegetable at each main meal. Restriction usually fails; addition usually holds.',
                },
            },
            {
                heading: 'Food safety, iron and common deficiencies',
                paragraphs: [
                    'Food poisoning is common where water and refrigeration are unreliable. Wash hands and produce, cook meat thoroughly, separate raw and cooked food, refrigerate promptly, and be careful with food left out in heat. Reheating should be thorough, not lukewarm.',
                    'Iron deficiency is common in young women and in anyone with a cereal-heavy diet. Plant iron is absorbed better with vitamin C, so pair beans or greens with tomato, citrus or pepper, and avoid tea with meals since it inhibits absorption.',
                    'If you are persistently tired despite adequate sleep and food, see the health centre and ask about anaemia, malaria and thyroid function rather than assuming laziness. Fatigue is a symptom, not a character trait.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Rebuilding a typical day',
                brief: 'Your current day: no breakfast, soft drink and pastry at 11, rice at 4, instant noodles at 11 p.m.',
                steps: [
                    'Identify the problems: no protein until evening, long gaps, sugary drink, late heavy meal.',
                    'Add breakfast: bread with egg, or pap with milk and groundnut.',
                    'Replace the soft drink with water and a piece of fruit.',
                    'Add beans or fish to the rice and a vegetable.',
                    'Move the evening meal earlier and make it lighter.',
                    'Keep one snack available: groundnut, banana or yoghurt.',
                ],
                takeaway: 'Three additions and one replacement. Sustainable changes are small and specific.',
            },
            {
                title: 'A week\'s cooking plan',
                brief: 'You have a shared kitchen, a small budget and two hours on Sunday.',
                steps: [
                    'Buy staples dry and in bulk: rice, beans, garri, oil, tomatoes, onions, pepper.',
                    'Cook a large pot of beans and a tomato stew base.',
                    'Portion into containers and refrigerate or freeze.',
                    'Buy vegetables twice a week rather than once, to keep them fresh.',
                    'Assign two evenings to cooking and use leftovers on the others.',
                    'Track cost for one week and compare with buying prepared food.',
                ],
                takeaway: 'Batch cooking converts a budget problem into a time problem, which is easier to solve.',
            },
        ],
        examBank: [
            {
                question: 'Explain why breakfast affects concentration during morning lectures.',
                marks: '10 marks',
                outline: [
                    'Blood glucose supplies the brain.',
                    'A meal with protein and fibre releases energy slowly.',
                    'Skipping breakfast produces a later deficit and compensatory overeating.',
                ],
            },
            {
                question: 'How can a student eat a balanced diet on a limited budget?',
                marks: '15 marks',
                outline: [
                    'Staples bought dry and in bulk.',
                    'Legumes as affordable protein.',
                    'Seasonal vegetables and fruit.',
                    'Batch cooking and shared purchasing.',
                    'Water instead of sugary drinks.',
                ],
            },
        ],
        glossary: [
            { term: 'Macronutrient', definition: 'A nutrient needed in large amounts: carbohydrate, protein or fat.' },
            { term: 'Fibre', definition: 'Indigestible plant material that supports digestion and steady energy.' },
            { term: 'Blood glucose', definition: 'The concentration of sugar in the blood, the brain\'s main fuel.' },
            { term: 'Legume', definition: 'A plant in the bean family, an affordable protein source.' },
            { term: 'Iron deficiency', definition: 'Insufficient iron for red blood cell production, causing fatigue.' },
            { term: 'Vitamin C', definition: 'A nutrient that enhances absorption of plant iron.' },
            { term: 'Batch cooking', definition: 'Cooking several portions at once for later meals.' },
            { term: 'Food safety', definition: 'Practices preventing foodborne illness.' },
            { term: 'Satiety', definition: 'The feeling of fullness that ends eating.' },
            { term: 'Dehydration', definition: 'Insufficient body water, impairing concentration and physical performance.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Record', focus: 'What you actually eat.', tasks: ['Record everything eaten for three days.', 'Note water intake.', 'Identify the biggest gap.'] },
            { week: 'Week 2 - Add', focus: 'Protein and vegetables.', tasks: ['Add a protein source to each main meal.', 'Add one vegetable daily.', 'Replace one sugary drink with water.'] },
            { week: 'Week 3 - Cook', focus: 'Budget and batching.', tasks: ['Cook two batches of staples.', 'Portion and store.', 'Compare the weekly cost.'] },
            { week: 'Week 4 - Check', focus: 'Energy and health.', tasks: ['Rate afternoon energy daily.', 'Review sleep and water.', 'See the health centre if fatigue persists.'] },
        ],
        readingList: [
            'A basic nutrition guide covering macronutrients and balanced diets.',
            'A food safety guide for households without reliable refrigeration.',
            'Your campus health centre\'s advice on nutrition and anaemia.',
        ],
    },

    'sleep-fitness-and-posture': {
        sections: [
            {
                heading: 'Sleep is where learning is consolidated',
                paragraphs: [
                    'Sleep is not lost time from study; it is part of studying. Memory consolidation happens during sleep, and sleep deprivation impairs attention, working memory and emotional regulation before it impairs anything you would notice subjectively. People who are sleep-deprived are reliably worse at judging how impaired they are.',
                    'The two practical levers are regularity and light. A consistent wake time stabilises the body clock more effectively than a consistent bedtime. Morning daylight and dim evening light reinforce the same rhythm; bright screens late at night do the opposite.',
                    'Caffeine has a half-life of about five hours, which means a 4 p.m. coffee still has a quarter of its effect at midnight. Alcohol helps people fall asleep and then fragments sleep in the second half of the night.',
                ],
            },
            {
                heading: 'Movement you will actually do',
                paragraphs: [
                    'The best exercise is the one you continue. For students, that usually means something free, nearby and social: walking, running, football, skipping, bodyweight circuits, or a gym shared with friends. Twenty to thirty minutes most days is enough to produce real benefits for mood, sleep and concentration.',
                    'The World Health Organization recommends at least 150 minutes of moderate activity per week plus muscle-strengthening twice weekly. That is twenty-two minutes a day, or three longer sessions. It does not require equipment or a membership.',
                    'Warm up before and cool down after. Progress gradually - increases of about ten per cent per week - and take rest days. Most student injuries come from doing too much suddenly, often in the first week of a new routine.',
                ],
                callout: {
                    title: 'Movement breaks beat caffeine',
                    body: 'Five minutes of walking and stretching restores concentration more reliably than another cup of coffee, and it does not cost sleep later.',
                },
            },
            {
                heading: 'Posture, screens and back pain',
                paragraphs: [
                    'There is no single perfect posture; the problem is staying in one position for hours. Change position regularly, stand up every thirty to forty-five minutes, and adjust the screen so the top is at eye level and the keyboard so the elbows are near ninety degrees.',
                    'When studying on a bed or floor for long periods, support the lower back and keep the neck neutral rather than flexed forward. A rolled cloth or a small cushion helps. Reading a phone while lying on your side with the neck bent is a common cause of persistent neck pain.',
                    'Carrying a heavy bag on one shoulder produces asymmetrical loading. Use both straps, reduce the load, and alternate sides if you must carry a single bag. Persistent pain, numbness or weakness needs assessment rather than a posture video.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Fixing a broken sleep schedule',
                brief: 'You sleep at 2 a.m., wake at 10, and feel unrefreshed.',
                steps: [
                    'Set a fixed wake time and keep it for two weeks, including weekends.',
                    'Get outside within an hour of waking for daylight exposure.',
                    'Move the bedtime earlier by 15 minutes every three days.',
                    'Stop caffeine after midday.',
                    'Dim screens for the last hour and keep the phone out of the bed.',
                    'Do not nap longer than twenty minutes, and not after 4 p.m.',
                ],
                takeaway: 'Fix the wake time first. The bedtime follows.',
            },
            {
                title: 'A fifteen-minute daily routine',
                brief: 'You have no gym access and limited time.',
                steps: [
                    'Five minutes: brisk walking or skipping to warm up.',
                    'Five minutes: bodyweight circuit - squats, press-ups, lunges, plank.',
                    'Three minutes: repeat the circuit once at lower intensity.',
                    'Two minutes: stretch the back, hips and calves.',
                    'Do it at the same time most days.',
                    'Increase repetitions by about ten per cent each week.',
                ],
                takeaway: 'Consistency beats intensity. Fifteen minutes daily outperforms one heroic session a month.',
            },
        ],
        examBank: [
            {
                question: 'Explain how sleep deprivation affects academic performance.',
                marks: '15 marks',
                outline: [
                    'Impaired attention and working memory.',
                    'Reduced consolidation of learned material.',
                    'Poor emotional regulation and motivation.',
                    'Impaired self-assessment of performance.',
                ],
            },
            {
                question: 'What are the recommended physical activity levels for adults, and how can a student meet them?',
                marks: '10 marks',
                outline: [
                    '150 minutes of moderate activity weekly.',
                    'Muscle strengthening twice weekly.',
                    'Ways to meet them: walking, sport, bodyweight circuits.',
                    'Gradual progression and rest days.',
                ],
            },
        ],
        glossary: [
            { term: 'Circadian rhythm', definition: 'The roughly 24-hour internal cycle regulating sleep and alertness.' },
            { term: 'Sleep hygiene', definition: 'Habits and conditions that support regular, sufficient sleep.' },
            { term: 'Consolidation', definition: 'The stabilising of memory during sleep.' },
            { term: 'Half-life', definition: 'The time taken for half of a substance to be cleared from the body.' },
            { term: 'Moderate activity', definition: 'Exercise that raises breathing rate while still allowing speech.' },
            { term: 'Progressive overload', definition: 'Gradually increasing training demand to build capacity.' },
            { term: 'Ergonomics', definition: 'Arranging work conditions to fit the body and reduce strain.' },
            { term: 'Neutral spine', definition: 'A spinal alignment that maintains its natural curves.' },
            { term: 'RPE', definition: 'Rate of perceived exertion, a simple way to gauge exercise intensity.' },
            { term: 'Recovery', definition: 'Rest and adaptation after physical or mental demand.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Sleep', focus: 'Regularity.', tasks: ['Set a fixed wake time.', 'Get daylight within an hour of waking.', 'Record sleep hours.'] },
            { week: 'Week 2 - Caffeine and screens', focus: 'Triggers.', tasks: ['No caffeine after midday.', 'Screens off one hour before bed.', 'Phone out of the bed.'] },
            { week: 'Week 3 - Move', focus: 'Habit.', tasks: ['Do fifteen minutes daily.', 'Walk instead of short transport trips.', 'Add two strengthening sessions.'] },
            { week: 'Week 4 - Posture', focus: 'Study set-up.', tasks: ['Adjust screen and keyboard height.', 'Stand every 40 minutes.', 'Use both bag straps.'] },
        ],
        readingList: [
            'A sleep science guide for students.',
            'WHO physical activity recommendations.',
            'An ergonomics guide for laptop study setups.',
        ],
    },

    'sexual-health-consent-and-relationships': {
        sections: [
            {
                heading: 'Consent is a standard, not a mood',
                paragraphs: [
                    'Consent is a clear, voluntary and informed agreement to a specific activity, given by someone with the capacity to give it. It can be withdrawn at any point, and it cannot be given in advance for an activity that has not been discussed. Silence is not consent; previous consent does not extend to a new occasion; being in a relationship does not create standing consent.',
                    'Alcohol and drugs complicate capacity. A person who is significantly intoxicated may not be able to give valid consent, and sex without valid consent is rape or sexual assault regardless of the relationship or the intentions of the other person.',
                    'Coercion includes pressure, guilt, threats, emotional manipulation and refusing to accept a no. Repeatedly asking until someone gives in is not persuasion; it is coercion. A healthy sexual relationship is one in which either person can say no without consequence.',
                ],
            },
            {
                heading: 'Protection, testing and reproductive health',
                paragraphs: [
                    'Condoms are the only method that protects against both pregnancy and sexually transmitted infections. Used correctly and consistently, they are highly effective; used inconsistently, they are not. Other contraceptive methods - pills, injectables, implants, intrauterine devices - are more effective for pregnancy prevention but do not protect against infection.',
                    'Common STIs, including chlamydia, gonorrhoea, syphilis and HIV, may be asymptomatic. Testing is therefore the only reliable way to know your status, and it is routine, confidential and available at the campus health centre. Free or subsidised testing and treatment exist; asking is normal.',
                    'Emergency contraception is most effective the sooner it is taken. If a condom fails or unprotected sex occurs, act within 72 hours and ask about post-exposure prophylaxis for HIV, which is time-critical.',
                ],
                callout: {
                    title: 'The question to ask yourself',
                    body: 'Would this person still be able to say no to me right now, comfortably? If the answer is unclear, stop and check.',
                },
            },
            {
                heading: 'Relationships, boundaries and getting help',
                paragraphs: [
                    'Healthy relationships have four features: mutual respect, honesty, shared control over decisions, and the ability to disagree safely. Warning signs include monitoring messages, isolating a partner from friends, controlling money or clothing, explosive jealousy, and any physical violence. These escalate; they rarely improve on their own.',
                    'Setting boundaries is a skill: state what you need, be specific, and notice how the other person responds. A partner who responds to a boundary with anger or punishment is showing you something important.',
                    'If you experience sexual violence, it is not your fault. Seek medical attention promptly - within 72 hours where possible - for injury care, emergency contraception, STI prophylaxis and, if you choose, forensic evidence. Counselling, a trusted lecturer, the health centre and the police are all options, and the decision about reporting belongs to you.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Checking consent in a real situation',
                brief: 'A partner has been drinking heavily and is initiating sex.',
                steps: [
                    'Assess capacity: is the person able to understand and communicate a decision right now?',
                    'If there is doubt, treat it as no.',
                    'Say what you are doing: "you have had a lot to drink, let us stop here".',
                    'Do not continue on the basis of earlier enthusiasm.',
                    'Check in the next day without pressure.',
                    'If the person is unwell, ensure they are safe and not left alone.',
                ],
                takeaway: 'Uncertainty is not a green light. Stop, and check when both people are clear.',
            },
            {
                title: 'Setting a boundary',
                brief: 'A partner checks your phone and demands your location.',
                steps: [
                    'Name the behaviour specifically.',
                    'State the effect: it feels like surveillance and it is eroding trust.',
                    'State the boundary: you will not share passwords, and you will tell them where you are when it matters.',
                    'Observe the response: negotiation is fine, punishment is not.',
                    'Decide in advance what you will do if it continues.',
                    'Tell a trusted friend so the situation is not secret.',
                ],
                takeaway: 'Boundary plus observed response tells you more than any promise.',
            },
        ],
        examBank: [
            {
                question: 'Define consent and explain why intoxication and coercion invalidate it.',
                marks: '15 marks',
                outline: [
                    'Consent: clear, voluntary, informed, specific, revocable.',
                    'Intoxication may remove capacity to decide.',
                    'Coercion removes voluntariness even if agreement is verbalised.',
                    'Silence and prior consent are not consent.',
                ],
            },
            {
                question: 'Compare contraceptive methods for pregnancy and infection protection.',
                marks: '10 marks',
                outline: [
                    'Condoms protect against both when used consistently.',
                    'Hormonal and long-acting methods are more effective for pregnancy but not for infection.',
                    'Dual protection combines both strategies.',
                ],
            },
        ],
        glossary: [
            { term: 'Consent', definition: 'A clear, voluntary, informed and specific agreement, revocable at any time.' },
            { term: 'Capacity', definition: 'The ability to understand and communicate a decision.' },
            { term: 'Coercion', definition: 'Pressure that removes the voluntariness of an agreement.' },
            { term: 'STI', definition: 'A sexually transmitted infection, which may be asymptomatic.' },
            { term: 'Barrier method', definition: 'A method such as a condom that physically prevents transmission.' },
            { term: 'Emergency contraception', definition: 'A method used after unprotected sex, more effective the sooner it is taken.' },
            { term: 'PEP', definition: 'Post-exposure prophylaxis, medication taken after possible HIV exposure.' },
            { term: 'Boundary', definition: 'A stated limit on what a person will accept.' },
            { term: 'Reproductive health', definition: 'Wellbeing in relation to reproduction and sexual function.' },
            { term: 'Confidentiality', definition: 'The duty not to disclose health information without consent.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Understand', focus: 'Consent.', tasks: ['Write a definition in your own words.', 'List three things that invalidate consent.', 'Discuss one scenario with a trusted friend.'] },
            { week: 'Week 2 - Protect', focus: 'Methods.', tasks: ['Learn how to use a condom correctly.', 'List three contraceptive options and their limits.', 'Know where to get emergency contraception.'] },
            { week: 'Week 3 - Test', focus: 'Status.', tasks: ['Find the campus testing service.', 'Know the window period.', 'Get tested if you have been at risk.'] },
            { week: 'Week 4 - Boundaries', focus: 'Relationships.', tasks: ['Write one boundary and how to state it.', 'Identify two warning signs.', 'Know the support contacts.'] },
        ],
        readingList: [
            'Your campus health centre\'s sexual health information.',
            'A guide on consent and healthy relationships for students.',
            'WHO guidance on contraception and STI prevention.',
        ],
    },
})

// ── Remaining primers and the departmental archive ─────────────────────────
Object.assign(THEATRE_FILM_DEPTH, {
    'pha-101-introduction-to-pharmacy': {
        sections: [
            {
                heading: 'From molecule to medicine',
                paragraphs: [
                    'A drug is a chemical producing a biological effect; a medicine is a formulated product that delivers it safely. The difference is pharmaceutical science: solubility, stability, particle size, excipients, packaging and storage determine whether the active ingredient reaches the patient in usable form.',
                    'Pharmacokinetics describes what the body does to the drug - absorption, distribution, metabolism, excretion. Pharmacodynamics describes what the drug does to the body. Most clinical questions about dosing are kinetics questions in disguise.',
                    'Bioavailability is the proportion of a dose reaching systemic circulation unchanged. Intravenous administration is 100 per cent by definition; oral bioavailability is reduced by incomplete absorption and first-pass metabolism, which is why oral and intravenous doses differ.',
                ],
            },
            {
                heading: 'Formulation and dosage forms',
                paragraphs: [
                    'Tablets contain active ingredient plus excipients: diluents, binders, disintegrants, lubricants and coatings. Each has a function and each can cause problems - a binder that slows disintegration delays onset; a coating may protect the stomach or protect the drug from it.',
                    'Modified-release systems control the rate of release. They improve convenience and steady plasma levels but introduce risk: crushing a sustained-release tablet releases the whole dose at once, which can be dangerous. Counselling on this is a pharmacist\'s responsibility.',
                    'Sterile products - injections, eye drops, infusions - require aseptic manufacture and endotoxin control. Their preparation is regulated because contamination cannot be seen.',
                ],
                callout: {
                    title: 'The dose makes the poison',
                    body: 'Paracetamol is safe at therapeutic dose and causes liver failure in overdose. Every counselling conversation about a common medicine should include the maximum daily dose.',
                },
            },
            {
                heading: 'The pharmacist\'s professional role',
                paragraphs: [
                    'Pharmacists dispense, but their value is in validation, counselling and monitoring. Checking interactions, contraindications, duplicate therapy and appropriate dosing prevents harm that prescribing alone does not catch.',
                    'Counselling must be specific: what the medicine is for, how and when to take it, what to do about a missed dose, likely side effects, and when to seek help. Teach-back confirms understanding, and written instructions in a language the patient reads are more reliable than a hurried explanation.',
                    'Ethics and law govern controlled substances, record keeping, substitution and advertising. Selling antibiotics without prescription, dispensing beyond competence, or failing to report adverse reactions are professional failures with public health consequences - antimicrobial resistance being the clearest.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Calculating a paediatric dose',
                brief: 'A child weighs 18 kg and is prescribed 15 mg/kg/day in three doses. The suspension is 125 mg/5 mL. Find the volume per dose.',
                steps: [
                    'Daily dose: 15 x 18 = 270 mg.',
                    'Per administration: 270 / 3 = 90 mg.',
                    'Concentration: 125 mg in 5 mL, so 25 mg per mL.',
                    'Volume: 90 / 25 = 3.6 mL.',
                    'Check against the maximum for the child\'s age and weight.',
                    'Show the working and have it independently checked.',
                ],
                takeaway: 'Convert to a common unit, calculate, check against a maximum, show the working.',
            },
            {
                title: 'Counselling on a new antibiotic',
                brief: 'A patient collects a course for a chest infection.',
                steps: [
                    'Confirm identity, prescription and allergies.',
                    'State the purpose in plain language.',
                    'Give dose, frequency, duration and the reason to complete the course.',
                    'Mention common side effects and what to do about them.',
                    'State when to seek help: rash, breathlessness, worsening fever.',
                    'Ask the patient to repeat the key points and provide written instructions.',
                ],
                takeaway: 'Purpose, dose, duration, side effects, red flags, teach-back.',
            },
        ],
        examBank: [
            {
                question: 'Explain the four processes of pharmacokinetics with one factor affecting each.',
                marks: '20 marks',
                outline: [
                    'Absorption: formulation, food, gastric emptying.',
                    'Distribution: protein binding, lipid solubility, perfusion.',
                    'Metabolism: liver function, enzyme induction and inhibition.',
                    'Excretion: renal function and urine pH.',
                    'Conclude that these determine dose and interval.',
                ],
            },
            {
                question: 'Why must modified-release tablets not be crushed?',
                marks: '10 marks',
                outline: [
                    'Explain the release mechanism.',
                    'Describe dose dumping and its risk.',
                    'Note exceptions where crushing is licensed.',
                    'Relate to counselling practice.',
                ],
            },
        ],
        glossary: [
            { term: 'Pharmacokinetics', definition: 'What the body does to a drug: absorption, distribution, metabolism, excretion.' },
            { term: 'Pharmacodynamics', definition: 'What a drug does to the body.' },
            { term: 'Bioavailability', definition: 'The proportion of a dose reaching systemic circulation unchanged.' },
            { term: 'First-pass metabolism', definition: 'Liver breakdown of an oral drug before it reaches circulation.' },
            { term: 'Excipient', definition: 'An inactive ingredient included for a specific function.' },
            { term: 'Disintegrant', definition: 'An excipient helping a tablet break apart in the gut.' },
            { term: 'Modified-release', definition: 'A formulation controlling the rate or site of release.' },
            { term: 'Dose dumping', definition: 'Rapid release of the full dose from a damaged modified-release product.' },
            { term: 'Contraindication', definition: 'A circumstance in which a medicine should not be used.' },
            { term: 'Adverse drug reaction', definition: 'A harmful response at normal doses.' },
            { term: 'Aseptic preparation', definition: 'Compounding sterile products under conditions preventing contamination.' },
            { term: 'Antimicrobial resistance', definition: 'Microorganisms surviving drugs that previously killed them.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Kinetics', focus: 'ADME.', tasks: ['Define the four processes.', 'Explain bioavailability.', 'Compare oral and intravenous dosing.'] },
            { week: 'Week 2 - Formulation', focus: 'Dosage forms.', tasks: ['List excipients and functions.', 'Explain modified release.', 'Describe why crushing is dangerous.'] },
            { week: 'Week 3 - Calculations', focus: 'Accuracy.', tasks: ['Solve ten dose calculations.', 'Check each against a maximum.', 'Practise paediatric weight-based dosing.'] },
            { week: 'Week 4 - Practice', focus: 'Counselling.', tasks: ['Role-play three counselling scenarios.', 'Write plain-language instructions.', 'List when to refer.'] },
        ],
        readingList: [
            'Any introduction to pharmaceutics covering formulation and dosage forms.',
            'A clinical pharmacy text on counselling and dose calculation.',
            'Your national drug regulation guidance.',
        ],
    },

    'agr-101-principles-of-agriculture': {
        sections: [
            {
                heading: 'Agriculture as a system',
                paragraphs: [
                    'A farm is a system with inputs (land, labour, capital, water, seed, fertiliser), processes (crop or animal production) and outputs (food, fibre, income, waste). Systems thinking reveals trade-offs: intensifying production may deplete soil; expanding area may require labour the household does not have.',
                    'Nigeria\'s agriculture is dominated by smallholders producing most of the food on small plots with limited mechanisation and rainfall dependence. Debates about productivity, credit, extension and market access are therefore debates about smallholder conditions.',
                    'The value chain runs from input supply through production, processing, storage, transport and marketing. Value is often captured downstream, which is why farmers who sell raw commodities earn least.',
                ],
            },
            {
                heading: 'Soil, water and crops',
                paragraphs: [
                    'Soil is a living system of minerals, organic matter, air, water and organisms. Texture determines water-holding capacity and drainage; structure determines root penetration and erosion resistance; pH determines nutrient availability. A soil test is the cheapest input decision a farmer can make.',
                    'Plants need light, water, carbon dioxide and sixteen essential nutrients. Nitrogen drives vegetative growth, phosphorus supports roots and flowering, potassium regulates water and quality. Deficiency symptoms overlap, which is why testing beats guessing.',
                    'Crop rotation, intercropping, cover cropping, mulching and organic matter management maintain fertility and interrupt pest cycles. These are agronomic principles that inputs should support, not replace.',
                ],
                callout: {
                    title: 'Test before you apply',
                    body: 'Fertiliser applied without a soil test is a guess with a price. The test costs less than one bag.',
                },
            },
            {
                heading: 'Livestock, pests and markets',
                paragraphs: [
                    'Livestock production depends on feed, health, housing and genetics. Feed is usually the largest cost and feed conversion ratio is the key efficiency measure. Disease control requires vaccination, biosecurity and prompt reporting; zoonoses make animal health a public health matter.',
                    'Integrated pest management combines resistant varieties, cultural practices, biological control and judicious pesticide use. Indiscriminate spraying destroys natural enemies and selects for resistance.',
                    'Market access requires consistent quality, volume and timing. A farmer who produces well but cannot store, grade or aggregate with others sells at the lowest price of the season.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Calculating a gross margin',
                brief: 'Inputs for one hectare of maize cost 120,000; the harvest is 2.5 tonnes sold at 90,000 per tonne.',
                steps: [
                    'Revenue: 2.5 x 90,000 = 225,000.',
                    'Variable costs: 120,000.',
                    'Gross margin: 105,000 per hectare.',
                    'Check whether family labour and land rent are included.',
                    'Compare with an alternative crop on the same land.',
                    'Test a 20 per cent price fall: revenue 180,000, margin 60,000.',
                ],
                takeaway: 'Gross margin is not profit. State what is excluded before concluding.',
            },
            {
                title: 'Designing a rotation',
                brief: 'A farmer grows maize continuously on three plots.',
                steps: [
                    'Identify problems: declining yield, pest build-up, nutrient depletion.',
                    'Choose a legume to fix nitrogen and break pest cycles.',
                    'Alternate cereal and legume across seasons on each plot.',
                    'Include a cover crop where land allows.',
                    'Plan residue management to protect soil cover.',
                    'State how success will be measured.',
                ],
                takeaway: 'Every rotation choice should name the problem it solves.',
            },
        ],
        examBank: [
            {
                question: 'Explain the role of the three primary macronutrients in crop growth.',
                marks: '15 marks',
                outline: [
                    'Nitrogen: vegetative growth, chlorophyll, protein.',
                    'Phosphorus: roots, energy transfer, flowering.',
                    'Potassium: water regulation, enzyme activity, quality.',
                    'One deficiency symptom for each; note that excess is harmful.',
                ],
            },
            {
                question: 'Discuss the constraints facing smallholder farmers in Nigeria.',
                marks: '20 marks',
                outline: [
                    'Land tenure and fragmentation.',
                    'Credit and insurance access.',
                    'Input costs and counterfeit inputs.',
                    'Extension and information.',
                    'Post-harvest losses and market access.',
                    'One realistic intervention and its limitation.',
                ],
            },
        ],
        glossary: [
            { term: 'Smallholder', definition: 'A farmer cultivating a small area, often with family labour.' },
            { term: 'Value chain', definition: 'Activities from input supply to final consumer.' },
            { term: 'Soil texture', definition: 'The relative proportions of sand, silt and clay.' },
            { term: 'Soil pH', definition: 'Acidity or alkalinity affecting nutrient availability.' },
            { term: 'Macronutrient', definition: 'A nutrient needed in large amounts by plants.' },
            { term: 'Crop rotation', definition: 'Growing different crops in sequence on the same land.' },
            { term: 'Intercropping', definition: 'Growing two or more crops together on one field.' },
            { term: 'Integrated pest management', definition: 'Combining methods to control pests with minimal chemical use.' },
            { term: 'Feed conversion ratio', definition: 'Feed required to produce one unit of animal product.' },
            { term: 'Biosecurity', definition: 'Measures preventing disease introduction and spread on a farm.' },
            { term: 'Gross margin', definition: 'Revenue minus variable costs for an enterprise.' },
            { term: 'Post-harvest loss', definition: 'Product lost between harvest and consumption.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Systems', focus: 'The farm.', tasks: ['Draw inputs, processes and outputs for a local farm.', 'Identify two trade-offs.', 'Map one value chain.'] },
            { week: 'Week 2 - Soil', focus: 'Fertility.', tasks: ['Interpret a soil test report.', 'Explain pH and nutrient availability.', 'Design a rotation.'] },
            { week: 'Week 3 - Production', focus: 'Crops and animals.', tasks: ['Identify three deficiency symptoms.', 'Explain feed conversion.', 'List biosecurity measures.'] },
            { week: 'Week 4 - Economics', focus: 'Decisions.', tasks: ['Calculate a gross margin.', 'Run a price sensitivity check.', 'Write a policy answer.'] },
        ],
        readingList: [
            'Any principles of agriculture text covering soils, crops and livestock.',
            'A farm management guide on gross margins and budgeting.',
            'An extension manual on integrated pest management.',
        ],
    },

    'vte-101-introduction-to-vocational-education': {
        sections: [
            {
                heading: 'What vocational education is for',
                paragraphs: [
                    'Vocational education prepares people for specific occupations through practical competence underpinned by relevant theory. Its distinguishing feature is not that it is less academic but that competence is demonstrated in performance rather than described in an essay.',
                    'The field has been treated as a second-choice route, which damages enrolment and quality. The policy argument is economic - skills shortages, youth unemployment, informal sector productivity - and the educational argument is that many people learn best through applied problems.',
                    'Competency-based education defines outcomes as observable performances with stated standards. Students are assessed as competent or not yet competent against criteria rather than ranked against classmates. Instruction is organised around what a graduate must be able to do.',
                ],
            },
            {
                heading: 'Curriculum, workshop and assessment',
                paragraphs: [
                    'A vocational curriculum is built backwards from occupational standards: what tasks does the job require, what knowledge underpins them, what attitudes and safety practices accompany them? Task analysis produces the module list; the syllabus follows.',
                    'Workshop teaching requires demonstration, guided practice and independent practice. The instructor demonstrates at normal speed, then slowly with commentary, then supervises. Tools, materials and safety must be planned before the session, because a workshop without materials teaches only theory.',
                    'Assessment is performance-based: a practical task with a checklist of observable criteria, plus questioning for underpinning knowledge. Reliability comes from clear criteria and moderated judgement, not a single examiner\'s impression.',
                ],
                callout: {
                    title: 'Competence is observable',
                    body: 'If you cannot describe what a competent person does differently from an incompetent one, the outcome is not yet written as a competence.',
                },
            },
            {
                heading: 'Industry links and the informal sector',
                paragraphs: [
                    'Programmes succeed when connected to employers: attachment, guest instructors, equipment access, and curricula reviewed with industry. Without that link, programmes train for equipment and processes that no longer exist.',
                    'Much Nigerian vocational learning happens through apprenticeship - mechanic villages, tailoring shops, carpentry workshops - under masters who teach by participation. Formal systems can strengthen this by certifying prior learning and training masters pedagogically.',
                    'Entrepreneurship belongs in the curriculum. A graduate who can perform a trade but cannot cost a job, keep a record or find a customer will not sustain a livelihood.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Writing a competence statement',
                brief: 'Turn "understand electrical wiring" into an assessable outcome.',
                steps: [
                    'Performance: install a domestic lighting circuit.',
                    'Conditions: given a plan, tools, materials and a simulated board.',
                    'Standard: correct polarity, secure terminations, insulation resistance within limits, within time.',
                    'Underpinning knowledge: circuit design, cable rating, protection.',
                    'Safety: isolation and testing before energising.',
                    'Write the assessment checklist from these criteria.',
                ],
                takeaway: 'Performance plus conditions plus standard equals an assessable competence.',
            },
            {
                title: 'Planning a workshop session',
                brief: 'Two hours, twelve learners, four hacksaws.',
                steps: [
                    'Set one observable objective.',
                    'Plan for shortage: three groups of four rotating between demonstration, practice and theory.',
                    'Demonstrate to the whole group first.',
                    'Give each group a practical checklist.',
                    'Close with each group reporting one difficulty.',
                    'Record who achieved the objective.',
                ],
                takeaway: 'Plan the constraint, not the ideal. Equipment shortages are a design problem.',
            },
        ],
        examBank: [
            {
                question: 'Distinguish competency-based education from traditional subject-based assessment.',
                marks: '15 marks',
                outline: [
                    'Observable outcomes, stated standards, criterion referencing.',
                    'Content coverage and norm referencing in traditional models.',
                    'Consequences for teaching and assessment design.',
                    'Demands: clear criteria, moderation, resources.',
                ],
            },
            {
                question: 'Discuss how formal vocational education can work with informal apprenticeship.',
                marks: '20 marks',
                outline: [
                    'Describe apprenticeship under a master.',
                    'Strengths and weaknesses.',
                    'Recognition of prior learning.',
                    'Pedagogical training for masters.',
                    'Links to finance and markets.',
                    'Institutional conditions required.',
                ],
            },
        ],
        glossary: [
            { term: 'Competency-based education', definition: 'Learning organised around observable performances assessed against standards.' },
            { term: 'Task analysis', definition: 'Breaking an occupation into the tasks a competent worker performs.' },
            { term: 'Criterion referencing', definition: 'Judging performance against standards rather than peers.' },
            { term: 'Recognition of prior learning', definition: 'Credit for skills acquired outside formal education.' },
            { term: 'Underpinning knowledge', definition: 'The theory required to perform a task safely and correctly.' },
            { term: 'Moderation', definition: 'Reviewing assessors\' judgements for consistency.' },
            { term: 'Demonstration', definition: 'An instructor showing a procedure before learners practise.' },
            { term: 'Attachment', definition: 'A period of workplace learning within a programme.' },
            { term: 'Occupational standard', definition: 'An agreed statement of what a job requires.' },
            { term: 'Informal apprenticeship', definition: 'Trade learning under a master outside formal institutions.' },
            { term: 'Formative feedback', definition: 'Guidance during practice that improves the next attempt.' },
            { term: 'Employability', definition: 'The skills, knowledge and attributes enabling employment.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Purpose', focus: 'Aims.', tasks: ['Write the case for vocational education.', 'Identify two misconceptions.', 'Define competency-based education.'] },
            { week: 'Week 2 - Curriculum', focus: 'Backwards design.', tasks: ['Perform a task analysis.', 'Write three competence statements.', 'Build an assessment checklist.'] },
            { week: 'Week 3 - Teaching', focus: 'Workshop.', tasks: ['Plan a session with scarce equipment.', 'Deliver a demonstration.', 'Collect peer feedback.'] },
            { week: 'Week 4 - System', focus: 'Industry links.', tasks: ['Interview one artisan about training.', 'Propose a prior-learning route.', 'Write a 20-mark answer.'] },
        ],
        readingList: [
            'An introduction to vocational and technical education.',
            'A workshop teaching guide on demonstration and practice.',
            'Policy material on technical and vocational education in Nigeria.',
        ],
    },

    'feg-101-engineering-mathematics': {
        sections: [
            {
                heading: 'Functions, limits and continuity',
                paragraphs: [
                    'Engineering mathematics models physical systems. A function describes how one quantity depends on another; its domain and range describe what is physically meaningful. Choosing the right function - linear, exponential, sinusoidal - is a modelling decision before it is a mathematical one.',
                    'Limits describe behaviour near a point rather than at it, which is what makes calculus possible. Continuity requires the limit to exist, the function to be defined there, and the two to agree. Engineering functions are continuous except at switches, impacts and boundaries - exactly where careful analysis matters.',
                    'Differentiation gives the rate of change: velocity from displacement, current from charge. Integration accumulates: distance from velocity, work from force. The fundamental theorem connects them.',
                ],
            },
            {
                heading: 'Differentiation and its applications',
                paragraphs: [
                    'The power, product, quotient and chain rules become mechanical with practice. The chain rule is most often misused because the inner function must be identified explicitly. Implicit differentiation handles relations that cannot be written as y equals f of x.',
                    'Optimisation follows a pattern: find stationary points by setting the derivative to zero, classify them with the second derivative, and check the endpoints. Word problems require translating a situation into a function of one variable, usually by eliminating a constraint.',
                    'Related rates and small-error estimation interpret the derivative as a sensitivity: how much does the output change per unit change in the input?',
                ],
                callout: {
                    title: 'Draw the graph first',
                    body: 'A sketch reveals how many stationary points exist and roughly where. Then calculate, and check that the algebra agrees.',
                },
            },
            {
                heading: 'Integration and linear algebra',
                paragraphs: [
                    'Not every function has an elementary antiderivative. Standard techniques - substitution, by parts, partial fractions, trigonometric identities - are pattern recognition. Definite integrals give areas, volumes, centroids, work and average values.',
                    'Taylor series approximate functions by polynomials, which is how calculators and simulations work. The error term tells you how good the approximation is, and engineering depends on knowing that.',
                    'Linear algebra supplies the language of systems: matrices represent transformations, determinants test invertibility, eigenvalues describe modes and stability. Elimination is the basis of structural, circuit and control analysis.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Maximising an area',
                brief: 'A rectangular field is fenced with 100 m against an existing wall. Find the dimensions giving maximum area.',
                steps: [
                    'Let width be x and length y, with the wall forming one side.',
                    'Constraint: 2x + y = 100, so y = 100 - 2x.',
                    'Area: A = x(100 - 2x) = 100x - 2x squared.',
                    'Differentiate: 100 - 4x = 0, so x = 25.',
                    'Then y = 50 and area is 1,250 square metres.',
                    'Second derivative is negative, confirming a maximum; endpoints give zero.',
                ],
                takeaway: 'Constraint, single-variable function, derivative, classification.',
            },
            {
                title: 'A definite integral for work',
                brief: 'A force F = 3x newtons acts along a line. Find the work done from x = 0 to 4 m.',
                steps: [
                    'Work is the integral of force over displacement.',
                    'Set up the integral of 3x dx from 0 to 4.',
                    'Antiderivative: 1.5 x squared.',
                    'Evaluate: 1.5 x 16 = 24 joules.',
                    'Check units: newtons times metres gives joules.',
                    'Sanity-check against the average force of 6 N over 4 m.',
                ],
                takeaway: 'Set up from the physical definition, then check units and magnitude.',
            },
        ],
        examBank: [
            {
                question: 'Find and classify the stationary points of f(x) = x cubed - 3x.',
                marks: '15 marks',
                outline: [
                    'Differentiate: 3x squared - 3.',
                    'Set to zero: x = 1 or x = -1.',
                    'Second derivative: 6x, positive at 1 and negative at -1.',
                    'Minimum at x = 1, maximum at x = -1.',
                    'State the function values.',
                ],
                trap: 'Failing to classify with the second derivative or to give the values.',
            },
            {
                question: 'Evaluate the integral of x e to the x dx.',
                marks: '10 marks',
                outline: [
                    'Integration by parts with u = x and dv = e to the x dx.',
                    'Apply the formula: x e to the x minus the integral of e to the x dx.',
                    'Result: e to the x (x - 1) plus a constant.',
                    'Differentiate to check.',
                ],
            },
        ],
        glossary: [
            { term: 'Limit', definition: 'The value a function approaches as the input approaches a point.' },
            { term: 'Continuity', definition: 'The property that a function\'s limit equals its value at a point.' },
            { term: 'Derivative', definition: 'The instantaneous rate of change of a function.' },
            { term: 'Stationary point', definition: 'A point where the derivative is zero.' },
            { term: 'Chain rule', definition: 'The rule for differentiating a function of a function.' },
            { term: 'Integral', definition: 'Accumulation of a quantity, computed as an antiderivative or area.' },
            { term: 'Definite integral', definition: 'An integral evaluated between limits, giving a numeric quantity.' },
            { term: 'Taylor series', definition: 'A polynomial approximation of a function around a point.' },
            { term: 'Matrix', definition: 'A rectangular array representing a linear transformation.' },
            { term: 'Determinant', definition: 'A scalar indicating invertibility and scaling of a matrix.' },
            { term: 'Eigenvalue', definition: 'A scalar by which an eigenvector is scaled.' },
            { term: 'Optimisation', definition: 'Finding a maximum or minimum subject to constraints.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Functions', focus: 'Limits.', tasks: ['Evaluate ten limits.', 'Test five functions for continuity.', 'Sketch three graphs.'] },
            { week: 'Week 2 - Differentiation', focus: 'Rules.', tasks: ['Differentiate twenty functions.', 'Apply the chain rule to ten composites.', 'Solve two optimisation problems.'] },
            { week: 'Week 3 - Integration', focus: 'Techniques.', tasks: ['Integrate by substitution and parts.', 'Evaluate four definite integrals.', 'Compute one area and one volume.'] },
            { week: 'Week 4 - Linear algebra', focus: 'Systems.', tasks: ['Solve a 3x3 system.', 'Compute three determinants.', 'Find two eigenvalues.'] },
        ],
        readingList: [
            'Any engineering mathematics textbook covering calculus and linear algebra.',
            'A problem set with worked solutions.',
            'A mathematical methods text covering series approximations.',
        ],
    },

    'theatre-film-outline-archive-2018-2026': {
        sections: [
            {
                heading: 'What this archive is, and what it is not',
                paragraphs: [
                    'This pack collects the course outlines, module lists and programme structures for Theatre and Film Studies at the institution across several academic sessions, presented as a dated record rather than as a current syllabus. Each session is labelled, and each entry states where it came from and when it was retrieved.',
                    'The distinction matters. A 2018 outline tells you what was taught in 2018; it does not tell you what is taught now. Where the source pages were unavailable, the entry says so and records the band as a compiled working map rather than an official document. Nothing here claims to be syllabus-accurate for the current session.',
                    'Use the archive as evidence of how a curriculum changes, and as a study aid for courses that remain in the programme. Do not use it to plan registration without checking the current departmental list.',
                ],
            },
            {
                heading: 'Reading an outline properly',
                paragraphs: [
                    'A course outline contains more than a topic list. It states the course code and title, the credit units, the semester, the lecturer, the aims and objectives, the teaching method, the assessment weighting, the recommended texts, and often a weekly schedule. Read the assessment weighting first: it tells you where the marks are, and therefore where your effort should go.',
                    'Course codes carry information. In the Theatre and Film programme the numbering generally indicates level - 100-level foundational courses, 200-level core theory and practice, 300-level specialisation, 400-level research and production - and the ordering indicates the area within the discipline. Learning to read the numbering lets you see progression across the programme.',
                    'Compare outlines across sessions to see what was added, what was dropped and what was renamed. Renaming is often the most revealing change: a course called "Theatre Arts" in one session and "Theatre and Film Studies" in a later one is telling you something about the discipline\'s self-definition.',
                ],
                callout: {
                    title: 'Date every source you use',
                    body: 'In any archival work, a claim without a date and a provenance is not evidence. Write the session, the source and the retrieval date every time.',
                },
            },
            {
                heading: 'Using the archive for research and revision',
                paragraphs: [
                    'For research, the archive supports questions about curriculum change, the shifting balance between theory and practice, the introduction of film studies into a theatre programme, and the relationship between course titles and the professional field. These are answerable from dated documents, which makes them good long-essay topics.',
                    'For revision, use only the outlines whose courses still appear in the current programme, and always in addition to the current outline. Where a topic has clearly dropped out, do not spend revision time on it; where a topic persists across sessions, it is almost certainly a core examinable area.',
                    'For a student organisation or a departmental review, the archive provides the comparison a proposal needs. An argument that a course should be reintroduced is stronger when it shows the course existed, what it covered, and when it stopped.',
                ],
            },
        ],
        workedExamples: [
            {
                title: 'Comparing two sessions',
                brief: 'You want to show how the programme changed between two sessions.',
                steps: [
                    'List the courses in each session with codes, titles and credit units.',
                    'Match courses by code and then by description, not only by title.',
                    'Mark additions, removals and renames in separate columns.',
                    'Note changes in credit weighting, which indicate shifts in emphasis.',
                    'Identify one plausible reason for each change, and label it as inference.',
                    'Present as a table with a short commentary.',
                ],
                takeaway: 'Match by content as well as title. Renaming is a change worth explaining.',
            },
            {
                title: 'Using an archived outline for exam preparation',
                brief: 'A course you are taking has an outline from an earlier session in the archive.',
                steps: [
                    'Confirm the course still appears in the current programme.',
                    'Compare the archived topic list with the current one.',
                    'Mark topics that appear in both - these are the core.',
                    'Note topics that appear only in the archive and deprioritise them.',
                    'Use the archived assessment weighting only as a guide, never as fact.',
                    'Ask your lecturer to confirm the current weighting.',
                ],
                takeaway: 'Overlap across sessions is the best available signal of what is core.',
            },
        ],
        examBank: [
            {
                question: 'Why must an archived course outline be dated and attributed before it is used as evidence?',
                marks: '15 marks',
                outline: [
                    'An outline describes a specific session, not the programme in general.',
                    'Provenance determines reliability: official document versus compiled map.',
                    'Undated claims cannot be checked or compared.',
                    'Method: record session, source and retrieval date for every entry.',
                ],
            },
            {
                question: 'Explain what course codes reveal about a programme\'s structure.',
                marks: '10 marks',
                outline: [
                    'Numbering typically indicates level and progression.',
                    'Ordering indicates subject area.',
                    'Credit units indicate weighting.',
                    'Reading the codes reveals the programme\'s architecture.',
                ],
            },
        ],
        glossary: [
            { term: 'Course outline', definition: 'A document stating a course\'s aims, content, assessment and texts.' },
            { term: 'Credit unit', definition: 'A measure of a course\'s weighting in the programme.' },
            { term: 'Provenance', definition: 'The origin and history of a document.' },
            { term: 'Session', definition: 'An academic year, usually named by its two calendar years.' },
            { term: 'Archive', definition: 'A dated collection of documents preserved as a record.' },
            { term: 'Working map', definition: 'A compiled overview assembled from available sources rather than an official document.' },
            { term: 'Assessment weighting', definition: 'The proportion of marks allocated to each component.' },
            { term: 'Prerequisite', definition: 'A course that must be completed before another may be taken.' },
            { term: 'Curriculum', definition: 'The planned content and sequence of a programme of study.' },
            { term: 'Historiography', definition: 'The study of how a record has been constructed and interpreted.' },
        ],
        weeklyPlan: [
            { week: 'Week 1 - Survey', focus: 'What is here.', tasks: ['List every session in the archive.', 'Note which entries are official and which are compiled.', 'Record sources and retrieval dates.'] },
            { week: 'Week 2 - Compare', focus: 'Change.', tasks: ['Build a comparison table across two sessions.', 'Mark additions, removals and renames.', 'Note credit changes.'] },
            { week: 'Week 3 - Use', focus: 'Study.', tasks: ['Match archived topics to your current courses.', 'Identify overlap as core material.', 'Ask your lecturer to confirm weighting.'] },
            { week: 'Week 4 - Research', focus: 'Argument.', tasks: ['Choose one curriculum change.', 'Explain it with two dated sources.', 'Write 500 words distinguishing evidence from inference.'] },
        ],
        readingList: [
            'Your current departmental handbook and course list.',
            'A guide to archival research and source criticism.',
            'Scholarship on curriculum change in Nigerian theatre and film education.',
        ],
    },
})
