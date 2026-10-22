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
