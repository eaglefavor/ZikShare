/**
 * The Theatre Arts shelf.
 *
 * Two kinds of document, and the card always says which:
 *
 * - `classic` — a public-domain book from Project Gutenberg, typeset whole,
 *   with its author and edition credited.
 * - `guide`  — a ZikShare teaching unit written for this shelf, labelled
 *   "ZikShare guide" on the card and on the cover so nobody mistakes it for a
 *   published book.
 *
 * The shelf is organised by the seventeen topics a Theatre and Film Studies
 * department actually teaches, in the order the department lists them.
 */

import { THEATRE_SHELF } from './theatreArtsLibraryData.js'

export const THEATRE_DOMAIN = 'Theatre Arts'

export const THEATRE_TOPICS = [
    {
        name: 'Directing',
        note: 'The director reads the script for action, casts it, blocks it, and holds the production together from first reading to opening night.',
    },
    {
        name: 'Scriptwriting',
        note: 'How a play is built: premise, conflict, beats, scene, and the difference between a story and a play.',
    },
    {
        name: 'Lighting',
        note: 'Lanterns, angles, colour and control - and the paperwork that makes a lighting design repeatable.',
    },
    {
        name: 'Set Design',
        note: 'Turning a script into a floor plan, a model and a build that the workshop can actually make.',
    },
    {
        name: 'Props Design',
        note: 'Everything an actor handles, wears or eats, from the prop table to the running plot.',
    },
    {
        name: 'Makeup Art',
        note: 'Corrective, character and age makeup for the stage, and the different grammar of the camera.',
    },
    {
        name: 'Costume',
        note: 'Script breakdown, period research, fitting, making and the wardrobe that keeps a run clean.',
    },
    {
        name: 'Sound & Song Design',
        note: 'The sound system, the cue plot, and the writing of songs that carry a Nigerian stage story.',
    },
    {
        name: 'History of African Theatre',
        note: 'Performance in Africa before, during and after colonial rule, and the companies that made a modern theatre.',
    },
    {
        name: 'Evolution of Theatre',
        note: 'The long history of the stage: Athens, Rome, the medieval church, the Globe, the picture frame, the black box.',
    },
    {
        name: 'Theatre Management',
        note: 'Money, people, venues and audiences: how a theatre organisation survives a season.',
    },
    {
        name: 'Pre-Colonial Theatre',
        note: 'Ritual, masquerade, festival and oral narrative as theatre before the colonial encounter.',
    },
    {
        name: 'Colonial Theatre',
        note: 'Church drama, school concerts, concert parties and the colonial city stage.',
    },
    {
        name: 'Post-Colonial Theatre',
        note: 'The theatre of independence and after: Soyinka, Rotimi, Osofisan, Sofola and the festival stage.',
    },
    {
        name: 'Dramatic Criticism',
        note: 'What a play means and how it works: the critical tradition from Aristotle to semiotics, and how to write a review.',
    },
    {
        name: 'Speech Arts',
        note: 'Breath, voice, articulation and the delivery of verse and prose on a Nigerian stage.',
    },
    {
        name: 'Film Analysis',
        note: 'Shot, cut, sound and story: how to read a film, including the films Nigeria actually makes.',
    },
]


/* ── Public-domain texts ──────────────────────────────────────────────────── */

/**
 * A whole Project Gutenberg book, used uncut. `note` is printed on the cover:
 * it tells a reader why this book is on the shelf and what is inside it.
 */
function classic(entry) {
    return {
        kind: 'classic',
        kindLabel: 'public-domain text',
        level: 'All levels',
        covers: [],
        ...entry,
    }
}

export const CLASSIC_TEXTS = [
    classic({
        slug: 'archer-play-making',
        title: 'Play-Making: A Manual of Craftsmanship',
        author: 'William Archer',
        topic: 'Scriptwriting',
        dateLabel: '1912',
        sourceId: 10865,
        editor: 'Author\u2019s text',
        edition: 'Charles Scribner\u2019s Sons, 1912 \u00b7 Project Gutenberg #10865',
        summary:
            'The best book ever written on how a play is put together, by Ibsen\u2019s English translator: exposition, the obligatory scene, the curtain, and why a play is not a novel with dialogue.',
        note:
            'Archer wrote this as a working manual, not a theory: it takes the well-made play apart and shows where each part goes. Chapters on the choice of a theme, the dramatic and the undramatic, exposition, the obligatory scene, the curtain and the psychology of the audience are used in playwriting classes to this day, and the examples are drawn from Ibsen, Sophocles and the French stage. Long, but every chapter is usable on its own.',
        covers: ['premise', 'exposition', 'the obligatory scene', 'curtains', 'audience psychology'],
    }),
    classic({
        slug: 'baker-dramatic-technique',
        title: 'Dramatic Technique',
        author: 'George Pierce Baker',
        topic: 'Scriptwriting',
        dateLabel: '1919',
        sourceId: 36580,
        editor: 'Author\u2019s text',
        edition: 'Houghton Mifflin, 1919 \u00b7 Project Gutenberg #36580',
        summary:
            'The Harvard playwriting course in book form, from the man who taught Eugene O\u2019Neill: how to choose a subject, build a scene and hold an audience for three acts.',
        note:
            'Baker ran the English 47 workshop at Harvard, the first credit-bearing playwriting course in the United States, and this book is its method. It is long and concrete, with dozens of worked examples and a full section on the one-act play. Read the chapters on dramatic action and on preparation before you write your first full-length script; read the rest when a draft has stalled.',
        covers: ['dramatic action', 'preparation', 'the one-act play', 'climax', 'workshop method'],
    }),
    classic({
        slug: 'howard-autobiography-of-a-play',
        title: 'The Autobiography of a Play',
        author: 'Bronson Howard',
        topic: 'Scriptwriting',
        dateLabel: '1914',
        sourceId: 18769,
        editor: 'Author\u2019s text',
        edition: 'Harvard University Press, 1914 \u00b7 Project Gutenberg #18769',
        summary:
            'One playwright traces a single play (Shenandoah) from first idea through twelve years of rewriting to production: the clearest short account of how a script actually gets made.',
        note:
            'Bronson Howard was the first president of the Society of American Dramatists, and this lecture is his account of writing and rewriting one play across more than a decade. It is short enough to read in an evening and more honest than most manuals about how much of playwriting is revision. A good first reading for a scriptwriting course.',
        covers: ['drafting', 'revision', 'production', 'the commercial theatre', 'authorship'],
    }),
    classic({
        slug: 'lope-de-vega-new-art-of-writing-plays',
        title: 'The New Art of Writing Plays',
        author: 'Lope de Vega',
        topic: 'Scriptwriting',
        dateLabel: '1609',
        sourceId: 76719,
        editor: 'Translated by William T. Brewster',
        edition: 'Columbia University Press, 1914 \u00b7 Project Gutenberg #76719',
        summary:
            'The Spanish Golden Age playwright\u2019s verse essay on what audiences actually want, written in 1609 and still the funniest defence of giving the public the play it came for.',
        note:
            'Lope wrote hundreds of plays and knew exactly what he was doing: this essay admits that he locks the rules of Aristotle in his study when he writes, and explains the five-act structure, the comic servant, the concealment of identity and the timing of the curtain that the Spanish stage ran on. Short, quotable, and a useful counterweight to the Poetics.',
        covers: ['the Spanish Golden Age', 'five acts', 'the gracioso', 'audience', 'rules versus practice'],
    }),
    classic({
        slug: 'how-to-write-a-play-1909',
        title: 'How to Write a Play',
        author: 'William Archer and others',
        topic: 'Scriptwriting',
        dateLabel: '1909',
        sourceId: 18230,
        editor: 'Letters from William Archer, Sir Arthur Pinero and others',
        edition: 'Project Gutenberg #18230',
        summary:
            'A symposium of working playwrights answering the practical questions a beginner asks: where does a play start, what is a situation, and how do you know when it is finished?',
        note:
            'The book collects letters and short essays from playwrights and critics of the 1900s, each answering the same questions about construction. Because the answers disagree with one another, it is a good introduction to the argument about method rather than a rulebook: read it beside Archer\u2019s manual and decide which account matches the plays you admire.',
        covers: ['beginning a play', 'situation', 'character', 'the market', 'method'],
    }),
    classic({
        slug: 'aristotle-poetics',
        title: 'The Poetics of Aristotle',
        author: 'Aristotle',
        topic: 'Dramatic Criticism',
        dateLabel: 'c. 335 BCE',
        sourceId: 1974,
        editor: 'Translated by S. H. Butcher',
        edition: 'Macmillan, 1902 (4th ed.) \u00b7 Project Gutenberg #1974',
        summary:
            'The founding document of dramatic criticism: plot as the soul of tragedy, the six parts of a play, hamartia, reversal and recognition, and the argument about catharsis.',
        note:
            'Every later theory of drama argues with this book. Butcher\u2019s translation is the one generations of students used, and it prints the Greek terms alongside the English where they matter. Read the definitions in chapters 1-6 first, then the analysis of Oedipus in chapters 10-11, then the difficult discussion of catharsis in chapter 6 and the question of the tragic flaw in chapter 13.',
        covers: ['mimesis', 'the six parts', 'hamartia', 'reversal and recognition', 'catharsis'],
    }),
    classic({
        slug: 'schlegel-lectures-on-dramatic-art',
        title: 'Lectures on Dramatic Art and Literature',
        author: 'August Wilhelm von Schlegel',
        topic: 'Dramatic Criticism',
        dateLabel: '1809–1811',
        sourceId: 7148,
        editor: 'Translated by John Black',
        edition: 'Bohn, 1846 \u00b7 Project Gutenberg #7148',
        summary:
            'The lectures that taught nineteenth-century Europe how to think about drama as a historical form, from the Greeks through Shakespeare to the Spanish and German stage.',
        note:
            'Schlegel delivered these lectures in Vienna in 1808 and they became the model for every university drama survey written afterwards. The Romantic argument that Shakespeare is a classic, not a barbarian, is made here at length; so is the contrast between the ancient and the modern stage. Long, but the sections on Greek tragedy and on Shakespeare are the ones to read first.',
        covers: ['ancient and modern drama', 'Greek tragedy', 'Shakespeare', 'the Romantics', 'history of the stage'],
    }),
    classic({
        slug: 'hamilton-theory-of-the-theatre',
        title: 'The Theory of the Theatre, and Other Principles of Dramatic Criticism',
        author: 'Clayton Meeker Hamilton',
        topic: 'Dramatic Criticism',
        dateLabel: '1910',
        sourceId: 13589,
        editor: 'Author\u2019s text',
        edition: 'Henry Holt, 1910 \u00b7 Project Gutenberg #13589',
        summary:
            'A working critic explains what theatre is for: the audience as a crowd, the actor as the medium, the difference between drama and literature, and what a review should judge.',
        note:
            'Hamilton was a drama critic and lecturer at Columbia, and this is the clearest American statement of the idea that a play is written to be performed by actors in front of a crowd, and must be judged on those terms. The chapters on the psychology of the audience and on the critic\u2019s function are the most useful for a criticism course.',
        covers: ['the audience', 'the actor', 'drama and literature', 'the critic', 'the commercial stage'],
    }),
    classic({
        slug: 'matthews-a-book-about-the-theater',
        title: 'A Book About the Theater',
        author: 'Brander Matthews',
        topic: 'Dramatic Criticism',
        dateLabel: '1916',
        sourceId: 36790,
        editor: 'Author\u2019s text',
        edition: 'Charles Scribner\u2019s Sons, 1916 \u00b7 Project Gutenberg #36790',
        summary:
            'Essays by the first professor of dramatic literature in the United States: the play as a show, the actor-manager, the scenery, the rules and the audience.',
        note:
            'Matthews taught at Columbia and wrote about the theatre as a craft rather than a branch of literature. These essays cover the physical stage, the business of production, the repertory idea and the relation between the play and its audience, and they are a good introduction to theatre criticism written by someone who went to the theatre constantly.',
        covers: ['the play as performance', 'the actor-manager', 'scenery', 'repertory', 'the audience'],
    }),
    classic({
        slug: 'nathan-the-critic-and-the-drama',
        title: 'The Critic and the Drama',
        author: 'George Jean Nathan',
        topic: 'Dramatic Criticism',
        dateLabel: '1922',
        sourceId: 63188,
        editor: 'Author\u2019s text',
        edition: 'Alfred A. Knopf, 1922 \u00b7 Project Gutenberg #63188',
        summary:
            'The American drama critic\u2019s short, combative book on what criticism is for, written against reviewers who confuse the play with its production.',
        note:
            'Nathan was the most feared critic in New York, and this is his defence of criticism as a craft with standards. It is opinionated and often unfair, which makes it excellent material for a seminar: take one of his judgements, test it against a play you know, and decide where the argument fails.',
        covers: ['the critic\u2019s job', 'taste', 'the reviewer versus the critic', 'the New York stage', 'judgement'],
    }),
    classic({
        slug: 'symons-dramatis-personae',
        title: 'Dramatis Person\u00e6',
        author: 'Arthur Symons',
        topic: 'Dramatic Criticism',
        dateLabel: '1923',
        sourceId: 62270,
        editor: 'Author\u2019s text',
        edition: 'Bobbs-Merrill, 1923 \u00b7 Project Gutenberg #62270',
        summary:
            'Symons on the great actors and playwrights of his time - Duse, Bernhardt, Ibsen, Shaw - criticism written as portraiture rather than verdict.',
        note:
            'Symons was a poet and a symbolist, and he reviews performance as an atmosphere rather than a set of choices. The essays on Eleonora Duse and on Ibsen are the finest things in the book and a useful model for writing about acting without merely listing what the actor did.',
        covers: ['Duse', 'Bernhardt', 'Ibsen', 'the symbolist stage', 'writing about acting'],
    }),
    classic({
        slug: 'huneker-iconoclasts',
        title: 'Iconoclasts: A Book of Dramatists',
        author: 'James Huneker',
        topic: 'Dramatic Criticism',
        dateLabel: '1905',
        sourceId: 47546,
        editor: 'Author\u2019s text',
        edition: 'Charles Scribner\u2019s Sons, 1905 \u00b7 Project Gutenberg #47546',
        summary:
            'Huneker introduces the European dramatists who broke the nineteenth-century stage - Ibsen, Strindberg, Hauptmann, Shaw, Maeterlinck, Wedekind - to American readers.',
        note:
            'These essays were written while the plays were new and controversial, and they carry the excitement of the argument. For a criticism course they are a case study in how a critic makes a case for a writer the public has not accepted yet; for a history course they map the European modern stage at the moment it arrived.',
        covers: ['Ibsen', 'Strindberg', 'Hauptmann', 'Shaw', 'Maeterlinck', 'the modern stage'],
    }),
    classic({
        slug: 'moulton-shakespeare-dramatic-artist',
        title: 'Shakespeare as a Dramatic Artist',
        author: 'Richard G. Moulton',
        topic: 'Dramatic Criticism',
        dateLabel: '1885',
        sourceId: 43435,
        editor: 'Author\u2019s text',
        edition: 'Clarendon Press, 1885 \u00b7 Project Gutenberg #43435',
        summary:
            'A Victorian critic reads Shakespeare\u2019s plots as constructed objects, with a method of scene-by-scene analysis that still works in the classroom.',
        note:
            'Moulton\u2019s subject is dramatic technique in Shakespeare: how the plots are built, how the scenes are arranged, and what the arrangement does to an audience. His tables of scenes and his reading of the histories are old-fashioned and useful: take the method, ignore the moralising.',
        covers: ['plot construction', 'scene arrangement', 'the histories', 'character', 'close reading'],
    }),
    classic({
        slug: 'flickinger-greek-theater',
        title: 'The Greek Theater and Its Drama',
        author: 'Roy C. Flickinger',
        topic: 'Evolution of Theatre',
        dateLabel: '1918',
        sourceId: 69095,
        editor: 'Author\u2019s text',
        edition: 'University of Chicago Press, 1918 \u00b7 Project Gutenberg #69095',
        summary:
            'The standard account of how the Greek theatre was built and how its plays were staged: the orchestra, the skene, the masks, the chorus and the festivals.',
        note:
            'Flickinger writes about the theatre as a physical and social institution: the festival of Dionysus, the shape of the auditorium, the machinery, the costume and the conventions of the actor\u2019s craft. It is the best single book for a first-year course on the origins of the stage, and it is careful to distinguish what is known from what is guessed.',
        covers: ['Dionysus', 'the orchestra', 'masks and costume', 'the chorus', 'the festivals'],
    }),
    classic({
        slug: 'cibber-apology-volume-1',
        title: 'An Apology for the Life of Mr. Colley Cibber, Volume 1',
        author: 'Colley Cibber',
        topic: 'Evolution of Theatre',
        dateLabel: '1740',
        sourceId: 44064,
        editor: 'Author\u2019s text',
        edition: '1740 \u00b7 Project Gutenberg #44064',
        summary:
            'The memoirs of an actor-manager at Drury Lane: how a theatre was run, cast, financed and fought over in the eighteenth century, told by a man who did all of it.',
        note:
            'Cibber was actor, playwright and manager of Drury Lane, and his Apology is the liveliest account we have of the eighteenth-century theatre as a business and a workplace. For a management course it is a primary source on contracts, salaries, repertory and the star system; for a history course it is the period in its own words. This is the first of two volumes.',
        covers: ['Drury Lane', 'the actor-manager', 'repertory', 'salaries', 'the eighteenth-century stage'],
    }),
    classic({
        slug: 'cibber-apology-volume-2',
        title: 'An Apology for the Life of Mr. Colley Cibber, Volume 2',
        author: 'Colley Cibber',
        topic: 'Evolution of Theatre',
        dateLabel: '1740',
        sourceId: 44065,
        editor: 'Author\u2019s text',
        edition: '1740 \u00b7 Project Gutenberg #44065',
        summary:
            'The second volume of Cibber\u2019s memoirs: the actors he worked with, the parts he played, and the management of a London theatre through its quarrels.',
        note:
            'The second volume continues the inside account of Drury Lane and adds Cibber\u2019s portraits of the actors of his generation, including Betterton and Booth. Read it after volume one; the chapters on acting style are the most quoted.',
        covers: ['acting style', 'Betterton', 'Booth', 'company life', 'the London stage'],
    }),
    classic({
        slug: 'aria-costume',
        title: 'Costume: Fanciful, Historical and Theatrical',
        author: 'Mrs. Aria',
        topic: 'Costume',
        dateLabel: '1906',
        sourceId: 48551,
        editor: 'Author\u2019s text',
        edition: 'Macmillan, 1906 \u00b7 Project Gutenberg #48551',
        summary:
            'A period-by-period survey of dress written for the stage, with the silhouette, fabric and detail of each era set out for the designer.',
        note:
            'Mrs. Aria wrote for the theatre, and the book is organised the way a designer needs it: by period, with the shape of the garment and the accessories that make it read from the front row. It is a starting point for period research, not a substitute for it, and it is honest about which periods it knows best.',
        covers: ['period silhouette', 'fabric', 'accessories', 'theatrical dress', 'research'],
    }),
    classic({
        slug: 'winter-public-speaking',
        title: 'Public Speaking: Principles and Practice',
        author: 'Irvah Lester Winter',
        topic: 'Speech Arts',
        dateLabel: '1912',
        sourceId: 6333,
        editor: 'Author\u2019s text',
        edition: 'Ginn and Company, 1912 \u00b7 Project Gutenberg #6333',
        summary:
            'A complete course in delivery: breathing, voice production, articulation, gesture, and the speaking of prose and verse in front of an audience.',
        note:
            'Winter\u2019s manual was written for university classes and it still reads as a course: each chapter has explanation, examples and exercises. The sections on breathing and on the speaking of verse transfer directly to stage speech, and the drills are usable in a first-year Voice and Speech class.',
        covers: ['breathing', 'voice production', 'articulation', 'gesture', 'speaking verse'],
    }),
    classic({
        slug: 'lindsay-art-of-the-moving-picture',
        title: 'The Art of the Moving Picture',
        author: 'Vachel Lindsay',
        topic: 'Film Analysis',
        dateLabel: '1915',
        sourceId: 13029,
        editor: 'Author\u2019s text',
        edition: 'Macmillan, 1915 \u00b7 Project Gutenberg #13029',
        summary:
            'The first book of film theory by an American: the photoplay as a new art form with its own grammar of light, motion and close-up.',
        note:
            'Lindsay wrote this when cinema was twenty years old and critics still treated it as photographed theatre. His argument that the moving picture has its own pictorial laws, and his early account of the close-up and of light as a dramatic material, make this the starting point for film analysis in English.',
        covers: ['the photoplay', 'light', 'the close-up', 'motion', 'film as art'],
    }),
    classic({
        slug: 'talbot-moving-pictures',
        title: 'Moving Pictures: How They Are Made and Worked',
        author: 'Frederick A. Talbot',
        topic: 'Film Analysis',
        dateLabel: '1912',
        sourceId: 67972,
        editor: 'Author\u2019s text',
        edition: 'J. B. Lippincott, 1912 \u00b7 Project Gutenberg #67972',
        summary:
            'How a silent film was actually made: the studio, the camera, the set, the laboratory and the projection, explained to a general reader in 1912.',
        note:
            'Talbot\u2019s book is production history in plain language: how film stock works, how a scene is lit, how the negative is developed and how a film reaches a screen. For a film analysis course it supplies the technical vocabulary that the analysis of any film depends on, at the moment that vocabulary was being invented.',
        covers: ['the studio', 'camera and film stock', 'lighting', 'editing', 'projection'],
    }),
    classic({
        slug: 'phillips-the-photodrama',
        title: 'The Photodrama: Its Construction and Technique',
        author: 'Henry Albert Phillips',
        topic: 'Film Analysis',
        dateLabel: '1914',
        sourceId: 70937,
        editor: 'Author\u2019s text',
        edition: 'Stanhope-Dodge, 1914 \u00b7 Project Gutenberg #70937',
        summary:
            'A manual of screenwriting and screen structure from the silent era: plot, continuity, intertitles, and what a scene has to do in a film.',
        note:
            'Phillips writes about film narrative as a craft with rules, and the rules he sets out - the scene as a unit, continuity of action, the use of the intertitle - are the ancestors of the screenwriting manuals still in use. It also includes a complete photoplay and a glossary, which makes it usable as a primary text in a film analysis class.',
        covers: ['screen narrative', 'continuity', 'intertitles', 'scene structure', 'the studio system'],
    }),
    classic({
        slug: 'clark-how-to-produce-amateur-plays',
        title: 'How to Produce Amateur Plays: A Practical Manual',
        author: 'Barrett H. Clark',
        topic: 'Directing',
        dateLabel: '1917',
        sourceId: 39973,
        editor: 'Author\u2019s text',
        edition: 'Little, Brown, 1917 \u00b7 Project Gutenberg #39973',
        summary:
            'A complete production manual for a company with no money: choosing the play, casting, rehearsing, scenery, lighting, costumes, makeup and the business of the performance.',
        note:
            'Clark wrote for amateur companies, which is exactly the condition of most departmental productions. Every technical department on this shelf appears here in a few practical pages: how to build a flat, how to hang a border, how to light a scene with the equipment a hall already has, how to run a dress rehearsal. It is the best single introduction to putting a play on stage.',
        covers: ['choosing the play', 'casting', 'rehearsal', 'scenery', 'lighting', 'costume', 'makeup'],
    }),
]

/* ── Cards ────────────────────────────────────────────────────────────────── */

const BUILT = Object.fromEntries(THEATRE_SHELF.map((entry) => [entry.slug, entry]))

export const THEATRE_SHELF_BY_SLUG = BUILT

export function toTheatreCard(item) {
    const built = BUILT[item.slug]
    if (!built) {
        throw new Error(`${item.slug}: no PDF in the theatre shelf - run npm run theatre:build`)
    }

    const isGuide = item.kind === 'guide'

    return {
        id: `theatre-${item.slug}`,
        slug: item.slug,
        code: '',
        title: item.title,
        subtitle: `${isGuide ? 'ZikShare guide' : 'Public-domain text'} \u00b7 PDF, ${built.pages} pages \u00b7 free`,
        author: item.author,
        group: item.topic,
        topic: item.topic,
        year: null,
        dateLabel: item.dateLabel,
        kind: item.kindLabel,
        level: item.level,
        body: item.summary,
        description: item.summary,
        covers: item.covers,
        faculty: 'Faculty of Arts',
        department: 'Theatre & Film Studies',
        material_type: 'textbooks',
        domain: THEATRE_DOMAIN,
        priceKobo: 0,
        is_free: true,
        download_path: built.download_path,
        external_url: null,
        page_count: built.pages,
        file_size_bytes: built.bytes,
        is_official: true,
        isTheatre: true,
        isGuide,
        isExternal: false,
        isBook: false,
        isFresherPdf: false,
        isDrama: false,
        isRoman: false,
        isMedieval: false,
        isRenaissance: false,
        isModern: false,
    }
}

export function findTheatreTitleBySlug(slug) {
    return THEATRE_TITLES.find((item) => item.slug === slug) || null
}

export function theatreTitlesInTopic(name) {
    return THEATRE_TITLES.filter((item) => item.topic === name)
}

/** Only the topics that actually hold a document, in department order. */
export function theatreTopics() {
    return THEATRE_TOPICS.map((topic) => ({
        ...topic,
        titles: theatreTitlesInTopic(topic.name),
    })).filter((topic) => topic.titles.length > 0)
}

export function theatreCounts() {
    const byTopic = {}
    for (const item of THEATRE_TITLES) {
        byTopic[item.topic] = (byTopic[item.topic] || 0) + 1
    }
    return {
        byTopic,
        guides: GUIDES.length,
        classics: CLASSIC_TEXTS.length,
        total: THEATRE_TITLES.length,
    }
}

/* ── ZikShare guides ──────────────────────────────────────────────────────── */

/**
 * A teaching unit written for this shelf. `sections` becomes the body of the
 * PDF; `exercises` and `reading` are printed after it. Nothing here is quoted
 * from a published book - it is ZikShare's own text, and the card says so.
 */
function guide(entry) {
    return {
        kind: 'guide',
        kindLabel: 'ZikShare guide',
        author: 'ZikShare Theatre Arts',
        level: entry.level || '100–300 level',
        dateLabel: '2026',
        ...entry,
    }
}

export const GUIDES = [
    guide({
        slug: 'directing-the-directors-craft',
        title: 'The Director\u2019s Craft: From First Reading to Opening Night',
        topic: 'Directing',
        summary:
            'What a director actually does in the weeks between the first reading and the first performance, stage by stage, with the paperwork each stage produces.',
        covers: ['the first reading', 'casting', 'blocking', 'rehearsal schedule', 'technical rehearsals'],
        sections: [
            {
                heading: 'The director is the audience\u2019s first representative',
                paras: [
                    'A director is not the person who tells actors where to stand. The director is the person who holds one interpretation of the play steady while thirty other people make it, and who answers every question with the same answer for six weeks. That is the job: consistency under pressure.',
                    'The work divides into three unequal parts. Before rehearsals, the director decides what the play is about and who is in it. During rehearsals, the director builds the action with the actors. In the last week, the director hands the production over to the stage manager and the technical departments and protects it from panic. Most first-time directors spend almost all their time on the middle part and arrive at the last week unprepared.',
                ],
            },
            {
                heading: 'The first reading is an argument you must be able to defend',
                paras: [
                    'Read the play three times before you say anything about it. First for the story, without a pencil. Second with a pencil, marking every time a character wants something and does not get it immediately. Third with the other characters in mind: what does each scene cost each person in it?',
                    'Then write one page, for yourself, that answers four questions. What happens? What is the play arguing? Whose play is it? What must the audience feel at the final curtain? If you cannot answer the third question, you do not yet know which part of the script you are directing, and every later decision will drift.',
                ],
            },
            {
                heading: 'Casting is a design decision',
                paras: [
                    'Cast for the action, not the photograph. An actor who can want something badly on stage will hold an audience longer than an actor who looks right and plays an attitude. Read two contrasting scenes at the audition: one where the character is in control and one where they lose it. Watch what happens when the partner changes, not how well the speech is recited.',
                    'Keep a callback list larger than the cast. The hardest parts of a cast are usually the small roles with two scenes and no arc, and those are won by actors who listen.',
                ],
            },
            {
                heading: 'Rehearsal: from the table to the run',
                paras: [
                    'A workable six-week schedule: week one at the table, on action and character; weeks two and three on blocking and scene work, in small chunks; week four on runs of each act; week five on full runs and detailed notes; week six in the theatre, on technical and dress rehearsals. In a three-week schedule, cut the table work to two days and accept that the acting will be found in performance.',
                    'Give notes on what the audience will see, not on what the actor feels. "You crossed on his line so we lost the letter" is a note an actor can use. "Be sadder" is not. Write every note down: if you repeat a note you have given before, the fault is usually in the instruction, not the actor.',
                ],
            },
            {
                heading: 'Technical rehearsals are for the crew',
                paras: [
                    'A technical rehearsal is not a rehearsal of the play. It is a rehearsal of the cues, and it will be slow, and the acting will be bad, and that is normal. Stop for anything that could hurt someone or break something; let everything else run and fix it in notes. The dress rehearsal is the first performance: no stopping, no notes until the end, and a full company call afterwards.',
                ],
            },
        ],
        exercises: [
            'Take a ten-minute scene and write, for each character, one sentence beginning "I want". Compare with a partner; the scenes that fail usually have two characters wanting the same thing in the same way.',
            'Block the same scene twice, once with the actors far apart and once with them close, and describe how the meaning changes.',
            'Draw up a six-week rehearsal schedule for a full-length play with a cast of eight and a two-week get-in. Mark the day you stop giving line notes.',
        ],
        reading: [
            'Peter Brook, The Empty Space (1968)',
            'Harold Clurman, On Directing (1972)',
            'William Ball, A Sense of Direction (1984)',
            'Katie Mitchell, The Director\u2019s Craft (2009)',
        ],
    }),
    guide({
        slug: 'directing-blocking-and-stage-pictures',
        title: 'Blocking and Stage Pictures',
        topic: 'Directing',
        summary:
            'How to arrange actors so the story is visible from every seat: levels, crosses, focus, and the difference between blocking that means something and blocking that merely moves.',
        covers: ['stage areas', 'levels', 'crosses and counter-crosses', 'focus', 'sightlines'],
        sections: [
            {
                heading: 'The stage is a map, and the map changes meaning',
                paras: [
                    'Downstage centre is the strongest position on a proscenium stage and should be spent, not used constantly. Upstage is weaker and older: an actor who retreats upstage loses the audience unless the lights and the blocking say otherwise. The diagonal from upstage right to downstage left reads as movement towards the audience; the opposite diagonal reads as withdrawal.',
                    'Before you block a scene, decide where the audience\u2019s eye should be at each moment. If two actors are talking and a third is listening, the third is the scene, and the picture should show it.',
                ],
            },
            {
                heading: 'Levels are the cheapest drama you have',
                paras: [
                    'A character standing while another sits has power in the picture before anyone speaks. Use the furniture you have: a chair, a step, a table, the floor. Blocking that keeps everyone at the same height for twenty minutes is a flat photograph; blocking that changes height at the moment the balance of a scene changes is doing the play\u2019s work.',
                    'Do not invent levels the set cannot support. A director who blocks an actor onto a table in week two and discovers in week six that the table is a light prop has cost the production a week.',
                ],
            },
            {
                heading: 'Crosses: give them a reason and a destination',
                paras: [
                    'Every cross should answer "why now, and why there". A cross on a line usually lands the line; a cross against the line usually shows the character resisting what is being said. Avoid the symmetrical cross that simply restores the picture after the last one; the audience sees the tidying and stops believing the scene.',
                    'Write the blocking down. Use a ground plan with a simple grid, mark entrances and furniture, and record each move in the script margin as a few words: "X to window on \u2018leave\u2019". In week four, nobody will remember why the actor is at the window.',
                ],
            },
            {
                heading: 'Composition, not decoration',
                paras: [
                    'A good stage picture has one centre of attention, a shape, and a relationship between the bodies in it. Triangles, diagonals and strong verticals read from the back of a hall; a straight line of actors all facing front reads as a choir. When you are stuck, change one thing: the distance between two people, or the direction one of them faces.',
                    'Check the picture from the worst seat in the house. If you cannot see the face of the actor who is speaking from the side seats, neither can the people who paid for them.',
                ],
            },
        ],
        exercises: [
            'Block a two-minute duologue three ways: both standing, one seated, both on the floor. Note what each version says before a word is spoken.',
            'Take a photograph of each stage picture you build in a rehearsal and review the photographs at the end of the week.',
            'Block a scene for a thrust stage and then for a proscenium, and list what had to change and why.',
        ],
        reading: [
            'William Ball, A Sense of Direction (1984)',
            'Harold Clurman, On Directing (1972)',
            'Francis Reid, The Staging Handbook (1995)',
        ],
    }),
    guide({
        slug: 'scriptwriting-the-one-act-play',
        title: 'Writing the One-Act Play',
        topic: 'Scriptwriting',
        summary:
            'A practical course in the form most student festivals actually ask for: one place, one situation, twenty-five minutes, and an ending that changes something.',
        covers: ['the single situation', 'entrances and exits', 'the turn', 'the ending', 'format'],
        sections: [
            {
                heading: 'One act does one thing',
                paras: [
                    'A one-act play is not a short three-act play. It is a single action, in one place, in real time or near it, with a small cast, that begins when a situation can no longer stay as it is and ends when it has changed. The audience should be able to say what happened in one sentence, and that sentence should not be "two people talked".',
                    'The commonest failure is a scene that is well written and has no pressure: two characters exchange information, reveal a secret, and part. Information is not action. A character must want something that another character can give or refuse, and the refusal must cost something.',
                ],
            },
            {
                heading: 'Build the situation before the dialogue',
                paras: [
                    'Answer four questions on paper. Who wants what? Who or what is in the way? Why now, and not yesterday? What happens if they fail? If the answer to the third question is "nothing in particular", you have a scene rather than a play.',
                    'Then decide the shape: the arrival that changes the balance, the attempt, the reversal, the last attempt, and the cost. Most one-acts run on two or three attempts, not one. The second attempt is where the writing usually becomes a play, because the character now knows the first one failed.',
                ],
            },
            {
                heading: 'Entrances and exits are your structure',
                paras: [
                    'In a one-act, every entrance changes the pressure and every exit leaves someone alone with the consequences. A third character who arrives to deliver a message and leaves is a device; a third character who arrives because they cannot stay away is a plot. Use the door as a decision, not transport.',
                ],
            },
            {
                heading: 'The ending should be inevitable and surprising',
                paras: [
                    'The ending is not the solution to the problem. It is the moment the audience sees what the problem has cost. Leave the room in a different condition from the one it was in when the lights came up: a promise broken, a person gone, a thing said that cannot be unsaid. A final speech that explains the play is usually the playwright losing confidence in the scene.',
                ],
            },
            {
                heading: 'Format is a courtesy to the people who have to produce you',
                paras: [
                    'Use the standard layout: character names in capitals, dialogue under them, stage directions in italics or brackets and kept to what can be seen or heard, a title page with your name and a contact, and page numbers. A director reading forty entries in a competition will decide in the first page whether the script is producible. Give them a clean page.',
                ],
            },
        ],
        exercises: [
            'Write the one-sentence action of three published one-acts you have seen, then write the one-sentence action of your own draft. If yours cannot be stated, rewrite the situation.',
            'Draft a fifteen-minute play with two characters and one door. Nothing may enter or leave except through it.',
            'Take a scene you have written and cut the first page. Read it aloud. Most first pages are the playwright warming up.',
        ],
        reading: [
            'Aristotle, Poetics (c. 335 BCE)',
            'William Archer, Play-Making (1912)',
            'Lajos Egri, The Art of Dramatic Writing (1946)',
        ],
    }),
    guide({
        slug: 'scriptwriting-structure-and-scene',
        title: 'Structure: Beats, Objectives and Scene Construction',
        topic: 'Scriptwriting',
        summary:
            'How a scene is built from beats and objectives, how acts are built from scenes, and why the well-made play still teaches more about construction than any screenwriting formula.',
        covers: ['beats', 'objectives', 'obstacles', 'act structure', 'the well-made play'],
        sections: [
            {
                heading: 'A beat is a change, not a pause',
                paras: [
                    'A beat is the smallest unit of dramatic action: a character tries something, meets resistance, and changes tactic. A page of dialogue in which nobody changes tactic is one beat, however many speeches it contains. When actors say a scene "has no beats", they mean it has no changes.',
                    'Mark the beats in your draft by writing, in the margin, what each character is doing to the other: persuading, testing, punishing, begging, lying. If two consecutive beats use the same verb, one of them is probably redundant.',
                ],
            },
            {
                heading: 'Objectives and obstacles',
                paras: [
                    'Give every character in a scene an objective that can be played: "to make her admit she knew" is playable; "to express sadness" is not. Then give the other character an obstacle that is not merely stubbornness. The strongest obstacle is a legitimate need that conflicts with the first, so that the audience can see both sides and cannot relax.',
                ],
            },
            {
                heading: 'Scenes and acts',
                paras: [
                    'A scene ends when the balance of power or knowledge changes. An act ends when the whole situation does. A play with five scenes in which the same two people argue five times has one scene, repeated; a play with two scenes in which the second is changed by the first has structure.',
                    'The five-act and three-act patterns are not laws, but they encode a discovery: an audience needs a period of complication before a climax is satisfying, and needs the climax to produce consequences. If your draft has a strong ending and a slow middle, the fault is usually that the middle has no decision in it.',
                ],
            },
            {
                heading: 'The well-made play, for and against',
                paras: [
                    'Scribe and Sardou built plays from a secret, a delayed confrontation and a sc\u00e8ne \u00e0 faire - the scene the audience has been promised and has come to see. Modern playwrights often laugh at the machinery and use it anyway, because it works: the audience must know what is at stake and must be made to wait.',
                    'Use the machinery consciously. If your play withholds information, decide whether the withholding is a character\u2019s choice or the author\u2019s convenience. Convenience is what makes an audience feel manipulated.',
                ],
            },
        ],
        exercises: [
            'Take a published scene and write the beat sheet: verb, verb, verb, one per change. Then do the same for your own scene and compare the number of changes.',
            'Rewrite a scene in which your characters state their feelings, so that neither ever names what they feel and both still get what they want or fail to.',
            'Outline a three-act play in twelve sentences: four per act, each a decision and its consequence.',
        ],
        reading: [
            'William Archer, Play-Making (1912)',
            'George Pierce Baker, Dramatic Technique (1919)',
            'Lajos Egri, The Art of Dramatic Writing (1946)',
            'David Howard and Edward Mabley, The Tools of Screenwriting (1993)',
        ],
    }),
    guide({
        slug: 'lighting-lanterns-angles-colour',
        title: 'Lighting the Stage: Lanterns, Angles and Colour',
        topic: 'Lighting',
        summary:
            'What each lantern does, where to hang it, and what light from the front, the side, the back and the top actually does to an actor\u2019s face.',
        covers: ['lantern types', 'angles', 'colour', 'intensity', 'safety'],
        sections: [
            {
                heading: 'The instruments',
                paras: [
                    'Four instruments cover most small venues. The fresnel gives a soft-edged pool and is used for general washes and area light. The profile (an ellipsoidal reflector spotlight) gives a hard edge and takes shutters and gobos, so it is used for specials, for isolating an area and for pattern. The par can gives a very wide, very bright wash with no control of the beam shape, useful for colour and for music. The LED wash gives colour without gels, runs cold, and is now cheaper to run than tungsten, though its dimming curve is different and cheap units buzz.',
                    'Know three numbers for each instrument: the beam angle, the throw distance to the stage, and the wattage. A 500 W fresnel at six metres lights a pool about two metres across and will not light a whole stage. Design from the throw you have, not the throw you want.',
                ],
            },
            {
                heading: 'Angles, and what they say',
                paras: [
                    'Front light (about 45 degrees above and 45 degrees to the side) is the standard "open" light: it shows the face, fills the eye sockets and makes the actor look well. Flat front light at eye level flattens the face and kills the set.',
                    'Side light rakes across the face and separates the actor from the background, which is why dance and musical numbers are lit from the wings. Back light outlines the body and creates depth; without it, actors stand in front of a flat wall of colour. Top light throws the eye sockets into shadow and reads as sinister or as outdoors at noon. Underlight, from below the face, is the oldest horror effect there is and should be used once.',
                    'A useful rule for a scene: one angle for the area, a second angle at 90 degrees for shape, and a back light for separation. Three instruments per area will light most small stages convincingly.',
                ],
            },
            {
                heading: 'Colour',
                paras: [
                    'Gel colour is subtractive: every gel cuts light, and a deep blue may cut 70 per cent of it. Check the transmission figure before you plan a dark blue wash with two lanterns.',
                    'Warm front light (straw, pale amber) and cool back light (steel blue) is the standard combination because it reads as sunlight and shadow at once. Colour on the face must stay close to skin tone or the actor stops looking human; colour belongs in the back light, the set and the floor.',
                ],
            },
            {
                heading: 'Safety and the boring parts',
                paras: [
                    'Lanterns get hot, cables trip people, and a badly rigged bar falls. Use safety bonds on every lantern, keep cables taped or matted, do not exceed the circuit loading, and never work at height alone. The lighting designer\u2019s first duty is that nobody is hurt by the lighting.',
                ],
            },
        ],
        exercises: [
            'Light one actor with three lanterns only: front, side, back. Photograph each combination and label what each angle contributes.',
            'Take a gel swatch book and find three gels that read as "moonlight" and three as "lamplight". Note their transmission figures.',
            'Measure the throw from your rigging position to the stage centre and calculate which lens angle covers your acting area.',
        ],
        reading: [
            'Francis Reid, The Stage Lighting Handbook (6th ed.)',
            'Richard Pilbrow, Stage Lighting Design (1997)',
            'J. Michael Gillette, Designing with Light (2008)',
        ],
    }),
    guide({
        slug: 'lighting-the-plot-and-the-cue-sheet',
        title: 'The Lighting Plot and the Cue Sheet',
        topic: 'Lighting',
        summary:
            'The paperwork that turns a design into a repeatable performance: the rig plan, the channel schedule, the focus notes and the cue sheet the operator actually runs.',
        covers: ['rig plan', 'channel schedule', 'focus', 'cue sheet', 'the paper tech'],
        sections: [
            {
                heading: 'Why paperwork is the design',
                paras: [
                    'A lighting design exists twice: once in the designer\u2019s head and once on paper. Only the paper survives to the performance. If the plot cannot be read by a crew that has never met you, the design will be replaced in the first technical rehearsal by whatever the operator can remember.',
                ],
            },
            {
                heading: 'The rig plan',
                paras: [
                    'Draw the stage to scale with the bars, the positions and the auditorium, and place every lantern on it with a number. Use the venue\u2019s own position names. Each lantern gets a symbol showing its type, its channel and the gel or colour it carries. The plan should let a rigger hang the show without asking a question.',
                    'Beside the plan, list every instrument: number, type, wattage, position, channel, colour, gobo, and what it is for ("DSR special", "blue back wash"). This is the schedule the crew works from, and the document you hand to the venue.',
                ],
            },
            {
                heading: 'Focus',
                paras: [
                    'Focus is done with the stage marked: tape the acting areas, put a stand-in on each mark, and work through the plot in order. Write down what each lantern was focused on, because in the dress rehearsal someone will ask. Focus notes are also the record for the next venue.',
                ],
            },
            {
                heading: 'The cue sheet',
                paras: [
                    'A cue sheet has a number, a trigger and a description. The trigger is what the operator hears or sees: "on the line \u2018I am not your wife\u2019", "on the blackout at the end of act one". The description is what changes: "cue 12: DS special out, blue back to 40 per cent over four".',
                    'Keep cues to tens or fives where you can: renumbering in the technical rehearsal is easier and the operator is less likely to jump one. Standby every cue over the talkback, and write the standby into the sheet for the cues that come without warning.',
                    'The paper tech is where the director, the stage manager and the designer agree the cue list before anyone touches a console. It saves hours in the theatre and it is the single most useful meeting in the production.',
                ],
            },
        ],
        exercises: [
            'Draw a rig plan for a 6 m by 4 m stage with eight lanterns and a 12-channel desk. Include the schedule.',
            'Write a cue sheet of ten cues for a five-minute scene, with triggers taken from the script.',
            'Run a paper tech with a stage manager: read the scene aloud and call every cue at its trigger.',
        ],
        reading: [
            'Steven Louis Shelley, A Practical Guide to Stage Lighting (2013)',
            'Francis Reid, The Stage Lighting Handbook',
            'Richard Pilbrow, Stage Lighting Design (1997)',
        ],
    }),
    guide({
        slug: 'set-design-reading-the-script-for-space',
        title: 'Set Design: Reading the Script for Space',
        topic: 'Set Design',
        summary:
            'How a designer turns a script into requirements: entrances, levels, sightlines, budget and the one image the whole design will be built from.',
        covers: ['script analysis', 'requirements list', 'the controlling image', 'sightlines', 'budget'],
        sections: [
            {
                heading: 'Read for what the play needs, not what it mentions',
                paras: [
                    'List every entrance and exit with the page number, every object that is used, every level an actor must reach and every time the location changes. Then add what the play needs but does not mention: somewhere for two people to be alone, a way for one character to overhear another, a door that can be locked.',
                    'A design that satisfies the script is not yet a design, but a design that fails the script is a set of furniture. Do the list before you draw anything.',
                ],
            },
            {
                heading: 'The controlling image',
                paras: [
                    'Every good set can be described in one sentence and remembered in one image: a room with too many doors, a house that is also a cage, a wall that moves closer. Find the image in the play\u2019s argument, not in its stage directions. Then test every later decision against it: if the image is "a house being sold", the chairs should look packed, not merely old.',
                ],
            },
            {
                heading: 'The ground plan is the real design',
                paras: [
                    'The ground plan decides the acting. Draw it at 1:25 on paper large enough to think on, and walk the routes: from the door to the table, from the window to the stairs, from wherever the actor enters to wherever they must be in eight lines. Actors cannot cross a wall; if the plan makes them walk around furniture to reach each other, the scene will lose its energy.',
                    'Mark the sightlines from the worst seats in the house: the extreme side seats of the front row and the back row of the gallery. Anything inside the shaded area is invisible and should hold nothing the audience needs to see.',
                ],
            },
            {
                heading: 'Building what you can afford',
                paras: [
                    'A departmental budget buys paint, timber and fabric, not scenery. Design within it: two well-built flats and a rostra, painted and lit properly, will look better than six badly built walls. Decide early what is real (a table an actor can stand on), what is suggested (a window frame with a cloth behind it) and what is painted (a skyline on a cyclorama).',
                    'Talk to the workshop before the design is fixed. The carpenter, the painter and the stage manager will tell you which idea costs three days and which costs an afternoon, and the design is better for knowing.',
                ],
            },
        ],
        exercises: [
            'Make the requirements list for a one-act play: entrances, objects, levels, locations, with page numbers.',
            'Draw a 1:25 ground plan for that play on a 6 m by 4 m stage, with sightlines marked.',
            'Write a build list with quantities and an estimated cost in naira for the plan you drew.',
        ],
        reading: [
            'Howard Bay, Stage Design (1974)',
            'Darwin Reid Payne, Theory and Craft of the Scenic Model (1975)',
            'J. Michael Gillette, Theatrical Design and Production (2012)',
        ],
    }),
    guide({
        slug: 'set-design-the-model-box-and-the-build',
        title: 'The Model Box, the Elevation and the Build',
        topic: 'Set Design',
        summary:
            'From white card to workshop drawing: how to build a scale model, read a ground plan and elevation, and hand a set to a carpenter without losing the design.',
        covers: ['scale', 'the model box', 'elevations', 'materials', 'the build meeting'],
        sections: [
            {
                heading: 'Scale is a promise',
                paras: [
                    '1:25 means one centimetre on the model is twenty-five centimetres in the theatre; 1:50 is the plan scale most workshops prefer for a full stage. Choose one and stay on it, because a model built at one scale and a plan drawn at another will produce a set that does not fit.',
                    'Build the model box first: a simple card box open at the front and top, with the stage floor at the right height and the proscenium opening cut to size. Everything you put in it is judged against the box, which is the point: the box is the theatre.',
                ],
            },
            {
                heading: 'The model in white',
                paras: [
                    'Build the model in white card or foam board before you colour it. In white you see proportion, sightlines and the arrangement of masses; colour hides bad proportion. Photograph it from the front, from both sides and from above, and look at the photographs as if you were an audience member.',
                    'Put scale figures in it. A one-centimetre figure on a 1:25 model is a 25 cm doll; two or three of them will tell you immediately whether a doorway is too low or a table too tall.',
                ],
            },
            {
                heading: 'The elevation and the build drawing',
                paras: [
                    'An elevation shows each wall flat, with dimensions and the position of every opening and fixing. A carpenter builds from the elevation; the designer builds from the model. The two must agree, which means the elevation is drawn from the model, not from memory.',
                    'Dimension everything that matters: height, width, the distance from the floor to a shelf, the depth of a step. Write the materials on the drawing: 18 mm ply, 50 x 75 mm timber, 3 mm hardboard. If the workshop has to guess, it will guess cheaply.',
                ],
            },
            {
                heading: 'The build meeting',
                paras: [
                    'Before building, meet the stage manager, the carpenter, the painter and the lighting designer together, with the model, the plan, the elevations and the schedule. Agree four things: what gets built first, what can be cut if time runs out, who paints it, and when the lighting designer needs the set finished. Write it down and circulate it.',
                    'Then go to the workshop every day during the build. A design is not finished when it is drawn; it is finished when it is standing on the stage and lit.',
                ],
            },
        ],
        exercises: [
            'Build a 1:25 white model of one room from a play you know, including two doors and one window.',
            'Draw the elevations for that room with dimensions and materials.',
            'Photograph the model from the worst seat in your theatre and revise one thing you can no longer see.',
        ],
        reading: [
            'Darwin Reid Payne, Theory and Craft of the Scenic Model (1975)',
            'Lynn Pecktal, Designing and Drawing for the Theatre (1995)',
            'J. Michael Gillette, Theatrical Design and Production (2012)',
        ],
    }),
    guide({
        slug: 'props-sourcing-making-and-running',
        title: 'Props: Sourcing, Making and Running',
        topic: 'Props Design',
        summary:
            'The department nobody budgets for: how to break a script for props, find or make them, and run a prop table that survives a full run.',
        covers: ['the props list', 'sourcing', 'making', 'the prop table', 'the running plot'],
        sections: [
            {
                heading: 'Three kinds of prop',
                paras: [
                    'Hand props are carried by an actor: a letter, a knife, a phone. Set props dress the stage and are not carried: furniture, rugs, wall hangings. Personal props belong to one character and are kept with the costume: spectacles, a watch, a handbag. Breaking the script down this way prevents the classic disaster of a letter that is a hand prop in act one and a set prop in act three.',
                ],
            },
            {
                heading: 'The list is made on the first read',
                paras: [
                    'Go through the script page by page and write every object named or implied, with the page, the character who handles it and what happens to it. Then add what the play needs but does not name: a glass that can be broken safely, a plate of food that can be eaten, a book that can be thrown. The list is a living document; it will double by the first run.',
                ],
            },
            {
                heading: 'Find it, adapt it, or make it',
                paras: [
                    'Sourcing runs in order of cost: borrow from the department store, buy from the market, adapt something close, and only then make. A modern kettle in a 1950s kitchen is a design error, but a modern kettle with the handle changed and the plastic hidden is often invisible from the third row.',
                    'When you make, make two. Anything handled every night will break, and a replacement made in week two will not match one made in week six unless you make the pair together. Practical props - a lamp that lights, a radio that plays, food that is eaten - need a rehearsal prop as well as a performance prop.',
                ],
            },
            {
                heading: 'The prop table and the running plot',
                paras: [
                    'The prop table sits in the wings, labelled, with a place for everything and a list taped to the wall. Personal props go into a labelled box for each actor. Nothing leaves the theatre without being signed out.',
                    'The running plot lists every prop movement: preset position, who takes it, when, where it goes after, and who strikes it. Every night the same hands do the same things. The props run is rehearsed like a scene, with the stage manager calling the presets.',
                    'Hygiene and safety matter more than period accuracy: wash anything that touches a mouth, do not use real glass where a fall is possible, do not put a real flame on a wooden stage without permission, and check every weapon prop is rubber or blunt before it is used.',
                ],
            },
        ],
        exercises: [
            'Make a props list for a ten-page scene: object, page, character, action, destination.',
            'Source three props for a period scene under a stated budget and photograph the substitutions you had to make.',
            'Write the running plot for those three props across two acts.',
        ],
        reading: [
            'Andrew Sofer, The Stage Life of Props (2003)',
            'Thurston James, The Prop Builder\u2019s Molding and Casting Handbook (1989)',
            'Amy Mussman, The Prop Master (2008)',
        ],
    }),
    guide({
        slug: 'props-period-function-and-symbol',
        title: 'Props Design: Period, Function and Symbol',
        topic: 'Props Design',
        summary:
            'A prop is never only an object: how period research, practical function and symbolic weight are balanced in a design, with examples from Nigerian stages.',
        covers: ['period research', 'practicality', 'symbol', 'colour and scale', 'the hero prop'],
        sections: [
            {
                heading: 'Research the object, not the era',
                paras: [
                    'Period research for props means answering: what was this made of, who made it, how much did it cost, and who would have owned one? A 1960s Lagos parlour has a particular radio, a particular wall clock and a particular kind of pressed-glass cup; getting those three right does more than a room full of generically old furniture.',
                    'Photographs, market stalls, family houses and the national archives are better sources than costume books, which usually stop at the drawing room.',
                ],
            },
            {
                heading: 'Practicality wins arguments',
                paras: [
                    'A prop that does not work will destroy the scene it appears in: a phone that does not ring, a letter that cannot be read, a bottle that is obviously empty. Decide what the object must do, then find the object that does it. If nothing does, build the function into the prop and hide the mechanism.',
                    'Weight is a design decision. A case that is supposed to be heavy and is carried lightly tells the audience it is cardboard. Add weight, or rehearse the carry so the actor\u2019s body tells the truth.',
                ],
            },
            {
                heading: 'The hero prop',
                paras: [
                    'Most plays have one object the action turns on: the letter in The Importance of Being Earnest, the pistol in Miss Julie, the papers in a political drama. The hero prop should be designed, not found: it needs a look that can be seen from the back row, a place it is kept, and a handling that the audience learns to watch.',
                    'Give the hero prop a journey. If it enters in act one and is still on the table in act two, the audience stops noticing it; if it is hidden, found, half-burned and returned, they will follow it.',
                ],
            },
            {
                heading: 'Symbol without posters',
                paras: [
                    'A prop becomes symbolic when the play has already given it weight, not when it is explained. A white cloth is a shroud because of what happens around it, not because the programme says so. Choose objects that can carry the play\u2019s argument and then let the staging do the work: place it, use it, take it away.',
                    'In Nigerian drama the staff, the calabash, the kolanut and the wrapper carry meanings already, and a designer who uses them must know which meanings and for whom. A masquerade staff on a domestic set is not decoration; it is a claim.',
                ],
            },
        ],
        exercises: [
            'Choose one play and identify its hero prop. Write the prop\u2019s journey through the play in six movements.',
            'Research three objects from a Nigerian household in 1965 and document them with sources.',
            'Design a symbolic prop for a scene, then stage the scene twice with and without it, and describe the difference.',
        ],
        reading: [
            'Andrew Sofer, The Stage Life of Props (2003)',
            'Amy Mussman, The Prop Master (2008)',
            'Yemi Ogunbiyi (ed.), Drama and Theatre in Nigeria (1981)',
        ],
    }),
    guide({
        slug: 'makeup-stage-straight-character-age',
        title: 'Stage Makeup: Straight, Character and Age',
        topic: 'Makeup Art',
        summary:
            'The three jobs of stage makeup, the products that do them, and how to build a face that reads from the back of the hall without looking like a mask up close.',
        covers: ['corrective makeup', 'character', 'ageing', 'greasepaint and cake', 'hygiene'],
        sections: [
            {
                heading: 'Why stage makeup is not everyday makeup',
                paras: [
                    'Stage lighting washes out the face: a normal face under a bright fresnel loses most of its modelling, and the eyes disappear into shadow. Stage makeup restores what the light takes away - the shadow under the cheekbone, the line of the lip, the definition of the eye - and then exaggerates it for the distance.',
                    'The rule is distance, not quantity. A face made up for the fifth row will look like a mask in a photograph; a face made up for a camera will look blank from the fifth row. Design for the seat you are playing to.',
                ],
            },
            {
                heading: 'Corrective, or straight makeup',
                paras: [
                    'Straight makeup makes a face look healthy and defined: a base matched to the skin, a crease shadow in the eye socket, a highlight above the cheekbone, a lip line slightly stronger than the natural one, and a setting powder. It is the base for everything else and it is what most actors need most nights.',
                    'Match the base to the neck, not the hand, and check it under the actual stage light. Foundation that looks right in a dressing-room mirror can be two shades too dark on stage.',
                ],
            },
            {
                heading: 'Character makeup',
                paras: [
                    'Character work starts from the character\u2019s body, not from a photograph: what does this person eat, how do they sleep, what have they survived? Then choose two or three features to change and leave the rest alone. A nose, a brow and a jaw change reads as a different person; ten changes read as a mask.',
                    'Nose putty, crepe hair, spirit gum, wax and stipple are the standard tools. Learn them on your own face first, and never apply spirit gum to anyone with sensitive skin without a patch test.',
                ],
            },
            {
                heading: 'Ageing',
                paras: [
                    'Age is not lines; it is gravity and loss of elasticity. Highlight the bones that emerge as fat pads shrink: the cheekbone, the jaw, the temple, the back of the hand. Shade the hollows under the eye and along the nasolabial fold. Grey the hair at the temples first, then the crown.',
                    'A young actor aged with lines alone looks like a young actor with lines. Add the body: a slower walk, a lower centre of gravity, a hand that grips the chair.',
                ],
            },
            {
                heading: 'Kit, hygiene and the call',
                paras: [
                    'A basic kit: base, cream shadow, highlight, powder, brushes, sponges, cotton buds, micellar water, tissues, a small mirror and a headband. Share nothing that touches skin without cleaning it. Keep each actor\u2019s sponge labelled and replace it weekly.',
                    'Allow forty minutes for straight makeup and character work, ninety for ageing plus hair. Build the makeup into the call, not into the twenty minutes before the beginners\u2019 entrance.',
                ],
            },
        ],
        exercises: [
            'Do a straight makeup on a partner under stage light and photograph it from three metres and from thirty centimetres.',
            'Age yourself twenty years using highlight and shadow only, with no drawn lines.',
            'Design a character face for a play you know, with a reference image, a materials list and a fifteen-minute application plan.',
        ],
        reading: [
            'Richard Corson, Stage Makeup (any edition)',
            'Herman Buchman, Stage Makeup (1949)',
            'Rosemarie Swinfield, Stage Makeup Step-by-Step (1994)',
        ],
    }),
    guide({
        slug: 'makeup-for-film-and-television',
        title: 'Makeup for Film and Television',
        topic: 'Makeup Art',
        summary:
            'The camera sees everything: why screen makeup is built in thin layers, how continuity is recorded, and where effects makeup changes the rules.',
        covers: ['HD and skin', 'continuity', 'effects', 'grooming', 'the continuity photograph'],
        sections: [
            {
                heading: 'The camera does not forgive',
                paras: [
                    'A high-definition camera resolves texture the eye does not notice at two metres, and it reads shine as plastic. Screen makeup is therefore thinner, more matte and more precisely matched than stage makeup: a light base, concealer only where needed, powder on the T-zone, and a lip colour that matches the natural lip.',
                    'Men are made up on screen, always. A face with powder and a little concealer reads as "no makeup" on camera; an unmade face reads as shiny and tired next to a made-up one.',
                ],
            },
            {
                heading: 'Continuity is the whole job',
                paras: [
                    'A film is shot out of order, so the makeup must be identical in scene 12 and scene 3. Photograph every actor, front and profile, in the final makeup under the same lighting, and keep the photographs with the continuity notes: base shade, blush, lip, hair, and any marks or injuries with their exact position.',
                    'Injuries need a schedule. A cut that heals over the story must be smaller in the later scenes; if nobody writes the schedule down, the cut will be large, small and large again in the order the film is shot.',
                ],
            },
            {
                heading: 'Effects and the close-up',
                paras: [
                    'Prosthetic pieces, bald caps, scars and burns are built for the lens: the edges must disappear into the skin, and the texture must survive a close-up. Silicone, gelatin and encapsulated colour are the modern materials; spirit gum and latex are the cheap ones and they show.',
                    'Test every effect on camera before the shoot day. What looks convincing in the mirror can look like a sticker on a monitor, and the monitor is the audience.',
                ],
            },
            {
                heading: 'Grooming, hygiene and the long day',
                paras: [
                    'Shooting days are long and hot, and makeup fails first at the hairline and the nose. Carry blotting paper, powder, cotton buds and a small bottle of remover. Never share applicators. In Nollywood conditions - heat, generators, long locations - a matte finish and a good setting spray will do more for continuity than any expensive product.',
                    'Respect the actor\u2019s skin. Ask about allergies before the first application, patch-test adhesives, and remove everything properly at the end of the day. A makeup artist who damages an actor\u2019s skin has ended a career, possibly their own.',
                ],
            },
        ],
        exercises: [
            'Make up a partner for a close-up, photograph the face at 50 mm and inspect it at 100 per cent on a monitor.',
            'Keep a continuity sheet for a five-minute scene shot out of order, and match the makeup across three setups.',
            'Build one small effect - a bruise or a scar - and test it on camera under the lighting you will actually use.',
        ],
        reading: [
            'Penny Delamar, The Complete Make-up Artist (2002)',
            'Rosemarie Swinfield, Stage Makeup Step-by-Step (1994)',
            'Vincent J-R Kehoe, The Technique of the Professional Make-up Artist (1995)',
        ],
    }),
    guide({
        slug: 'costume-design-from-script-to-fitting',
        title: 'Costume Design: From Script to Fitting',
        topic: 'Costume',
        summary:
            'How a costume designer reads a script, researches a period, presents a design and takes it through the fitting to the first dress rehearsal.',
        covers: ['script breakdown', 'period research', 'the sketch', 'fabric', 'the fitting'],
        sections: [
            {
                heading: 'Break the script down',
                paras: [
                    'For each character, list every appearance, what they are doing, what has happened to them since the last appearance, and what the audience must understand about them before they speak. A costume chart - characters down the side, scenes across the top - shows the changes at a glance and exposes the quick changes before they become a crisis.',
                    'Count the changes, not the characters. Ten actors with three changes each is thirty costumes and a wardrobe department, not a rack of clothes.',
                ],
            },
            {
                heading: 'Research the period, then the person',
                paras: [
                    'Period research gives you silhouette, fabric and fastening: what a wrapper looked like in 1970 Lagos, what a civil servant wore to the office in 1960, what a university student wore in 1978. Then design the person: a character who has money shows it in the fit and the shoes; a character who has lost money shows it in the same suit, altered.',
                    'Use primary sources where you can: photographs, family albums, newspaper advertisements, market fabric. Costume books are a starting point and often stop at the European drawing room.',
                ],
            },
            {
                heading: 'Swatching and the presentation',
                paras: [
                    'A design is a drawing plus a fabric. Present the sketch with the swatch attached, and say what the costume is made of, who makes it, and how long it takes. A beautiful drawing in the wrong cloth is a design that will fail in the fitting.',
                    'Design in the palette the lighting can carry. Deep blues and blacks disappear against a dark set; a strong colour on the principal actor is a lighting decision as much as a costume one.',
                ],
            },
            {
                heading: 'The fitting',
                paras: [
                    'Fit with the undergarments and shoes the actor will wear, and with the actor\u2019s hair as it will be. Pin, mark, and photograph the fitting. Ask the actor to sit, kneel, raise both arms and walk across the room: a costume that cannot do what the part does is not finished.',
                    'Book two fittings per costume: one to cut and one to correct. The second fitting is where a costume becomes wearable, and it is the one that is usually cancelled when the schedule slips.',
                ],
            },
        ],
        exercises: [
            'Make a costume chart for a three-act play with six characters and mark every quick change.',
            'Research one Nigerian decade and assemble five source photographs with captions.',
            'Present one costume design with a sketch, a swatch and a cost estimate, and defend the fabric choice.',
        ],
        reading: [
            'Rosemary Ingham and Liz Covey, The Costume Designer\u2019s Handbook (1992)',
            'Mary Fernald and Eileen Shenton, Costume Design and Making (1965)',
            'James Laver, Costume and Fashion: A Concise History (1969)',
        ],
    }),
    guide({
        slug: 'wardrobe-the-plot-and-the-run',
        title: 'Wardrobe: The Plot, the Quick Change and the Run',
        topic: 'Costume',
        summary:
            'What happens to costumes after the fitting: the wardrobe plot, dressers, quick changes, laundry and the care of a company\u2019s clothes through a run.',
        covers: ['wardrobe plot', 'quick changes', 'dressers', 'laundry', 'repairs'],
        sections: [
            {
                heading: 'The wardrobe plot',
                paras: [
                    'The wardrobe plot lists every costume piece, its owner, the scene it appears in, where it is preset and who is responsible for it. It is the costume department\u2019s equivalent of the prop table, and it lives in the wings where it is used.',
                    'Label everything, inside and out, with the character and the actor. Two black skirts are identical until the wrong one is on stage.',
                ],
            },
            {
                heading: 'Quick changes',
                paras: [
                    'A quick change is a small piece of theatre staged in the wings. Plan it: where the actor stands, who undoes what, which garments are pre-opened and which are on a numbered chair, and how many seconds it takes. Rehearse it with a stopwatch, in costume, at least three times.',
                    'If a change takes longer than the music or the scene it happens under, the design is wrong and should be changed. Do not solve a design problem with speed.',
                ],
            },
            {
                heading: 'Dressers and the show call',
                paras: [
                    'Every dresser needs the plot, a torch, a sewing kit, safety pins, stain remover and a clothes brush. The dresser\u2019s job is to make the actor ready and calm; a dresser who is shouting is a second emergency.',
                    'Preset before the half. After the show, every piece goes back to its place, not to a pile: the next performance begins the moment the last one ends.',
                ],
            },
            {
                heading: 'Care, repairs and the end of the run',
                paras: [
                    'Wash according to the fabric, not the schedule. Delicate pieces are spot-cleaned; white shirts are washed nightly; heavy costumes are aired. Keep a repair log, and mend on the day the damage is found - a torn hem on Monday is a torn hem in the photograph on Friday.',
                    'At the end of the run, catalogue what the department owns, clean and store it, and return borrowed items with a note of thanks. The next production will need the same goodwill.',
                ],
            },
        ],
        exercises: [
            'Write a wardrobe plot for a five-character, three-scene play.',
            'Stage and time a quick change of three garments, then redesign it to take half the time.',
            'Draw up a laundry and repair schedule for a two-week run.',
        ],
        reading: [
            'Rosemary Ingham and Liz Covey, The Costume Designer\u2019s Handbook (1992)',
            'Mary Fernald and Eileen Shenton, Costume Design and Making (1965)',
            'Mrs. Aria, Costume: Fanciful, Historical and Theatrical (1906)',
        ],
    }),
    guide({
        slug: 'sound-design-system-plot-and-cue',
        title: 'Sound Design: System, Plot and Cue',
        topic: 'Sound & Song Design',
        summary:
            'Putting sound in a room: the signal path, microphones, playback, the cue plot and the mix that lets an audience hear everything without hearing the system.',
        covers: ['signal path', 'microphones', 'playback', 'the cue plot', 'the mix'],
        sections: [
            {
                heading: 'The signal path',
                paras: [
                    'Every sound system is the same four things in order: a source (a microphone, a laptop, a phone), a mixer, an amplifier, and a loudspeaker. Learn to trace that path with your finger. When there is no sound, the fault is somewhere on the path, and a designer who can trace it finds the fault in a minute instead of a panic.',
                    'Keep the gain structure sane: the source should arrive at the mixer strong but not clipping, and the amplifier should not be asked to make up for a weak signal. Distortion is almost always a gain problem, not a volume problem.',
                ],
            },
            {
                heading: 'Microphones and the room',
                paras: [
                    'A dynamic microphone is robust and forgiving; a condenser is detailed and picks up everything, including the air conditioner. For theatre, body microphones are usually omni-directional lavaliers taped to the hairline or the cheek, with the pack hidden in the costume. Tape the cable in a loop with slack so the actor can turn their head.',
                    'Loudspeakers should be in front of the performers, aimed at the audience, never behind them. Feedback is the system hearing itself: move the microphone, lower the gain, or aim the speaker away. The cheapest improvement to most halls is a pair of speakers on stands at the front instead of one box on the floor.',
                ],
            },
            {
                heading: 'Playback and the cue plot',
                paras: [
                    'Use a computer for playback and a backup device for the backup. Name every file with its cue number, convert everything to the same format and sample rate, and test on the actual system - a file that plays at home may not play through the venue\u2019s interface.',
                    'The cue plot lists number, trigger, file, level, fade in, fade out and destination (which speakers). Write the trigger as something a human can hear: "on her line \u2018I am going\u2019", not "at 10:42". If the operator cannot follow the script and the plot together, the plot is wrong.',
                ],
            },
            {
                heading: 'The mix',
                paras: [
                    'The audience should hear the voice first, always. Music and effects sit under the voice; if a cue is beautiful and the line is lost, the cue is wrong. Ride the levels during the dress rehearsal rather than setting them once.',
                    'Listen from three places: front row centre, the back of the hall, and the wings. The wings are where the actors hear themselves, and if they cannot, they will push and the whole show will get louder.',
                ],
            },
        ],
        exercises: [
            'Draw the signal path of your venue from microphone to loudspeaker and label every cable.',
            'Build a ten-cue plot for a five-minute scene, with triggers and levels.',
            'Ring out a room: find the feedback frequency, notch it, and document the settings.',
        ],
        reading: [
            'Deena Kaye and James LeBrecht, Sound and Music for the Theatre (2009)',
            'Tomlinson Holman, Sound for Film and Television (2010)',
            'Ric Viers, The Sound Effects Bible (2008)',
        ],
    }),
    guide({
        slug: 'song-design-for-the-stage',
        title: 'Song Design: Music, Lyric and the Nigerian Stage',
        topic: 'Sound & Song Design',
        summary:
            'Writing songs that carry a story: the function of a number, verse and chorus, the band, and the traditions a Nigerian musical can draw on.',
        covers: ['the function of a song', 'lyric writing', 'arrangement', 'the band', 'Nigerian traditions'],
        sections: [
            {
                heading: 'A song in a play must do something',
                paras: [
                    'A number in a musical works when it does what speech cannot: a character who cannot say what they want sings it, or a company that cannot agree sings its disagreement. If the scene would survive with the song cut, the song is decoration.',
                    'Decide the function before writing a note: the "I want" song, the love duet, the comic list, the eleven o\u2019clock number, the reprise that closes the argument. Each has a place in the shape of the evening.',
                ],
            },
            {
                heading: 'Lyric before melody, then both together',
                paras: [
                    'Write the lyric as a speech first. If it is not worth saying, it will not be worth singing. Then find the stress pattern: the natural emphasis of the words becomes the rhythm, and a melody that fights the stress will make the words incomprehensible however good the tune.',
                    'A chorus is a repeated idea with a new meaning each time. The best reprises change one word, and the audience hears the whole story in that word.',
                ],
            },
            {
                heading: 'Arrangement and the band',
                paras: [
                    'Write for the musicians you have. A keyboard, a guitar, a bass, drums and two singers will carry most shows, and a good arrangement for six players beats a thin arrangement for twenty. Decide the key for the voice, not for the instrument, and transpose rather than asking a singer to strain.',
                    'The band needs a score, a click where the tempo is tricky, and a conductor who can see the stage. Put the band where the actors can hear it; in a small hall that usually means the side of the stage, not a pit.',
                ],
            },
            {
                heading: 'What a Nigerian musical can draw on',
                paras: [
                    'The traditions are deep and usable: highlife and palmwine guitar with their interlocking lines, the call-and-response of Yoruba and Igbo work songs, the talking drum\u2019s speech patterns, church choral harmony, Fuji and Afrobeat rhythm. A song that quotes a tradition should quote it accurately and credit it.',
                    'Folk opera is the local precedent: music, dance, spectacle and a moral argument in one evening. Study how those productions move from speech into song and back, because the transitions are where most student musicals fail.',
                ],
            },
        ],
        exercises: [
            'Take a scene with no song and write the "I want" number it needs, with one verse and a chorus.',
            'Set the same lyric in two rhythms - a highlife feel and a slow ballad - and compare what each says.',
            'Score a two-minute number for the instruments your department actually owns.',
        ],
        reading: [
            'Deena Kaye and James LeBrecht, Sound and Music for the Theatre (2009)',
            'Lehman Engel, The American Musical Theater (1967)',
            'Yemi Ogunbiyi (ed.), Drama and Theatre in Nigeria (1981)',
        ],
    }),
    guide({
        slug: 'african-theatre-a-history',
        title: 'African Theatre: A History in Five Traditions',
        topic: 'History of African Theatre',
        summary:
            'A short history of performance in Africa: festival and masquerade, the travelling theatre, the school and church stage, protest theatre, and the post-independence play.',
        covers: ['festival', 'masquerade', 'travelling theatre', 'protest theatre', 'post-independence drama'],
        sections: [
            {
                heading: 'Theatre before the proscenium',
                paras: [
                    'The oldest performance traditions in Africa are not plays. They are festivals: the Egungun and Gelede masquerades of the Yoruba, the Eyo and the Osun festival, the Igbo mmanwu, the Bori of the Hausa, the dances and praise-singing of the court and the compound. These are performances with an audience, a text, costume, music, choreography and a meaning, and they are the foundation of the continent\u2019s theatre.',
                    'Treat them as theatre without turning them into theatre. A masquerade is a religious event before it is a performance; the scholar\u2019s job is to describe how it works as performance without pretending it exists to entertain visitors.',
                ],
            },
            {
                heading: 'The travelling theatre',
                paras: [
                    'In the twentieth century the most popular theatre in West Africa was commercial and mobile. The Yoruba travelling theatre companies played in halls and at parties, with a leader who wrote, composed and starred. Hubert Ogunde\u2019s company, founded in 1945, toured Nigeria with plays built from folk material, music and satire, and became a national institution; others, including Kola Ogunmola\u2019s, made theatre a mass medium before television.',
                    'In Ghana the concert party developed a parallel form - a comic sketch, a band, a highlife finale - that toured the country and played to enormous audiences. The concert party is the clearest example in Africa of a popular theatre that was not subsidised and did not need to be.',
                ],
            },
            {
                heading: 'School, church and university',
                paras: [
                    'Colonial education brought the play text and the school concert, and mission churches brought the nativity play and the cantata. The universities added the drama department: Ibadan\u2019s School of Drama, founded in 1962, trained the first generation of Nigerian playwrights and directors, and the university theatre became the place where African drama was argued about as literature and as performance.',
                ],
            },
            {
                heading: 'Protest and liberation',
                paras: [
                    'In South Africa, theatre was part of the struggle against apartheid: workshop plays created collectively, performed in halls, churches and townships, and often banned. In Kenya, Ngugi wa Thiong\u2019o\u2019s Kamiriithu project made theatre in Gikuyu with villagers and was shut down by the state. In Nigeria, plays about corruption and dictatorship were written, staged and sometimes suppressed.',
                    'The lesson of this history is that African theatre has usually been made close to its audience: in a language they speak, in a form they know, about a question that is live. Where it has been most vital, it has also been most at risk.',
                ],
            },
        ],
        exercises: [
            'Choose one Nigerian festival and describe its performance elements: costume, music, space, audience, text.',
            'Compare a travelling theatre company with a concert party: organisation, repertoire, audience, economics.',
            'Read one post-independence play and identify what it takes from festival form and what from the European stage.',
        ],
        reading: [
            'Yemi Ogunbiyi (ed.), Drama and Theatre in Nigeria: A Critical Source Book (1981)',
            'Ebun Clark, Hubert Ogunde: The Making of Nigerian Theatre (1979)',
            'David Kerr, African Popular Theatre (1995)',
            'Ngugi wa Thiong\u2019o, Decolonising the Mind (1986)',
        ],
    }),
    guide({
        slug: 'the-yoruba-travelling-theatre',
        title: 'The Yoruba Travelling Theatre',
        topic: 'History of African Theatre',
        summary:
            'How a touring company worked: the leader, the repertory, the music, the money, and why the Yoruba travelling theatre became the model for popular performance in Nigeria.',
        covers: ['company structure', 'repertory', 'Ogunde', 'Ogunmola', 'music and audience'],
        sections: [
            {
                heading: 'A company, not a production',
                paras: [
                    'The travelling theatre was organised around a leader who wrote, composed, directed and often played the lead, with a permanent company of actors, musicians and dancers. It owned its own instruments, costumes and bus. It survived by touring: a new play opened in Lagos, toured the regional towns, and was replaced when the takings fell.',
                    'That economy shaped the plays. They had to please a paying audience immediately, so they combined music, dance, comedy, spectacle and a moral story. They were long, they changed in performance, and they were rewritten for each tour.',
                ],
            },
            {
                heading: 'Ogunde and the professional company',
                paras: [
                    'Hubert Ogunde began with a church choir and a part-time concert party, and built a professional company that toured Nigeria from the mid-1940s. His plays drew on Yoruba folklore, on current politics and on the Bible, and his music - highlife, Yoruba chant, choral harmony - was as much the attraction as the plot.',
                    'His company\u2019s success showed that an African theatre could be commercially viable, and his clashes with colonial and later military authorities showed what political theatre costs. Both belong in the history.',
                ],
            },
            {
                heading: 'Ogunmola and the actor\u2019s theatre',
                paras: [
                    'Kola Ogunmola came from the church concert tradition and made a theatre of the actor: long comic improvisations, a sharp satirical eye, and a company that could hold an audience with a single performer. His adaptation of Amos Tutuola\u2019s The Palm-Wine Drinkard showed that a novel could be turned into popular theatre without losing either.',
                ],
            },
            {
                heading: 'What happened to it',
                paras: [
                    'Television, video and the cinema took the mass audience from the 1970s, and the travelling companies declined. Their influence did not: the Yoruba film industry inherited the repertoire, the music and the star system, and the stage companies\u2019 way of building a play around music and a moral survives in Nigerian popular theatre and in Nollywood\u2019s family dramas.',
                    'For a student company the lesson is practical: a repertory, a bus, a band and a loyal audience will take a play further than a single well-funded opening night.',
                ],
            },
        ],
        exercises: [
            'Plan a three-town tour for a student company: repertoire, transport, venue, fee, and what changes between towns.',
            'Take a folk tale and outline it as a travelling-theatre play with songs and a moral.',
            'Compare the Ogunde and Ogunmola companies in organisation and performance style.',
        ],
        reading: [
            'Ebun Clark, Hubert Ogunde: The Making of Nigerian Theatre (1979)',
            'Karin Barber, The Generation of Plays (2000)',
            'Yemi Ogunbiyi (ed.), Drama and Theatre in Nigeria (1981)',
        ],
    }),
    guide({
        slug: 'theatre-history-greeks-to-the-globe',
        title: 'From the Greeks to the Globe',
        topic: 'Evolution of Theatre',
        summary:
            'Five thousand years of stage in one sweep: Athens, Rome, the medieval church, the commedia, the Elizabethan playhouse and the court stage.',
        covers: ['Athens', 'Rome', 'the medieval church', 'commedia', 'the Globe'],
        sections: [
            {
                heading: 'Athens',
                paras: [
                    'Theatre began in Athens as a festival of Dionysus: a chorus, a sacrifice, and a competition. The great theatre of Dionysus held perhaps fifteen thousand people, and the plays were performed in daylight, in masks, with a chorus in the orchestra and a wooden skene behind it.',
                    'What survived is a handful of plays by Aeschylus, Sophocles, Euripides and Aristophanes - a tiny fraction of what was produced - plus the physical evidence of the theatre and Aristotle\u2019s account of how it worked.',
                ],
            },
            {
                heading: 'Rome',
                paras: [
                    'Roman theatre borrowed the Greek forms and changed the building: a raised stage with a scaenae frons, a semicircular auditorium on a flat foundation. Plautus and Terence wrote comedies of situation and character that became the model for European comedy; Seneca wrote tragedies of rhetoric and horror that shaped the Renaissance.',
                    'Rome also gave the stage its first professional companies, its first star actors and its first theatre riots.',
                ],
            },
            {
                heading: 'The medieval stage',
                paras: [
                    'After the fall of the empire, theatre survived in the church, where the liturgy itself became dramatic: the quem quaeritis trope, the Easter sepulchre, the nativity dialogue. From there it moved out of doors into the mystery cycles, the miracle plays, the moralities and the saints\u2019 plays, performed on wagons, on pageants and in the round.',
                    'The medieval stage is the origin of the professional guild theatre, the crowd scene, the special effect and the comic devil.',
                ],
            },
            {
                heading: 'The Renaissance and the Globe',
                paras: [
                    'The Renaissance rebuilt the stage on classical lines - the proscenium arch, perspective scenery and the picture-frame - in Italy, while England developed a different form. The Globe, built in 1599, was a polygonal open-air playhouse with a deep platform stage, a tiring house, a trap, a balcony and an audience standing in the yard.',
                    'Shakespeare wrote for that space, and its conventions - soliloquy, doubling, two hours\u2019 traffic - are written into the plays. A modern production that ignores the shape of the original stage is arguing with the text.',
                ],
            },
        ],
        exercises: [
            'Draw and label the theatre of Dionysus and the Globe, and mark where the audience stood.',
            'Explain how daylight performance shapes what a Greek or Elizabethan actor can do that a modern actor cannot.',
            'Trace one stage convention (the soliloquy, the aside, the mask) from Athens to the Globe.',
        ],
        reading: [
            'Roy C. Flickinger, The Greek Theater and Its Drama (1918)',
            'A. W. Schlegel, Lectures on Dramatic Art and Literature (1809-11)',
            'Oscar Brockett, History of the Theatre (any edition)',
        ],
    }),
    guide({
        slug: 'theatre-history-the-modern-stage',
        title: 'The Modern Stage: Picture Frame to Black Box',
        topic: 'Evolution of Theatre',
        summary:
            'How the stage changed from gaslight to LED: realism and the fourth wall, the director, the avant-garde, the black box and the festival stage.',
        covers: ['gaslight and the picture frame', 'realism', 'the director', 'the avant-garde', 'the black box'],
        sections: [
            {
                heading: 'The picture frame and the dark',
                paras: [
                    'The modern theatre begins with a change in the auditorium: the audience was put in the dark. Gas lighting, then electricity, allowed the house to be dimmed and the stage to be lit from the front, and the proscenium became a picture frame rather than a platform. The actor no longer played to a visible crowd; the actor played as if nobody were there.',
                    'That convention - the fourth wall - is the basis of realistic acting and of the director\u2019s theatre. It is a convention, not nature, and every revolt against realism has begun by breaking it.',
                ],
            },
            {
                heading: 'Realism and the director',
                paras: [
                    'Ibsen, Strindberg, Chekhov and their companies made plays about ordinary people in ordinary rooms, and the box set - three walls, a ceiling, real furniture - was invented to hold them. The Duke of Saxe-Meiningen\u2019s company and André Antoine\u2019s Théâtre Libre established the director as the person who composed the stage picture and controlled the ensemble.',
                    'Stanislavsky\u2019s system came out of this work: if the audience is invisible and the room is real, the actor must supply an inner life that can be believed at three metres.',
                ],
            },
            {
                heading: 'The revolts',
                paras: [
                    'Symbolism, expressionism, futurism, dada and surrealism attacked realism from the 1890s onwards: the stage became a dream, a machine, a manifesto. After the Second World War, Artaud\u2019s theatre of cruelty, Brecht\u2019s epic theatre, Beckett\u2019s absurd, Grotowski\u2019s poor theatre, Boal\u2019s theatre of the oppressed and Brook\u2019s empty space each proposed a different relationship between performer and audience.',
                    'What they share is a refusal of the invisible audience. They put the spectator back in the room.',
                ],
            },
            {
                heading: 'The black box and the festival',
                paras: [
                    'The flexible black box - a plain room with a grid, black walls and movable seating - is the dominant theatre building of the last fifty years, because it can be rearranged for each production. It is cheap, and it makes the director responsible for the space as well as the staging.',
                    'Alongside it, the festival has become the main circuit for new work: Edinburgh, Avignon, Lagos Theatre Festival, the National Festival of Arts and Culture. Festivals reward the portable, the short and the surprising, and they have changed the shape of the plays written for them.',
                ],
            },
        ],
        exercises: [
            'Compare the audience-performer relationship in a proscenium, a thrust and a black box, using the same scene.',
            'Explain how electric lighting made the fourth wall possible, and what Brecht did with lighting to break it.',
            'Take a realistic scene and restage it in an expressionist manner; list what had to change.',
        ],
        reading: [
            'Oscar Brockett, History of the Theatre (any edition)',
            'Peter Brook, The Empty Space (1968)',
            'Marvin Carlson, Theories of the Theatre (1993)',
        ],
    }),
    guide({
        slug: 'theatre-management-running-a-company',
        title: 'Running a Theatre Company',
        topic: 'Theatre Management',
        summary:
            'The organisation behind the art: governance, the season, the production calendar, contracts, and the manager\u2019s relationship with the artistic team.',
        covers: ['governance', 'season planning', 'the production calendar', 'contracts', 'risk'],
        sections: [
            {
                heading: 'Two jobs, one organisation',
                paras: [
                    'A theatre company has an artistic side, which decides what is worth making, and a management side, which decides what can be paid for. The two are not enemies; they are the same argument held in different languages. The manager\u2019s job is to make the artistic plan possible, and to say no early enough that a yes is still possible later.',
                    'Governance matters even in a student company: who signs the cheques, who can commit the company to a venue, who is responsible if something goes wrong. Write it down before the first crisis.',
                ],
            },
            {
                heading: 'The season',
                paras: [
                    'A season is a portfolio: one production that will sell, one that will win the argument, one that trains the company, and one that is cheap. Announce the season as a whole, because audiences buy the idea of a season as much as a single play.',
                    'Balance the calendar against the institution\u2019s: examinations, holidays, the festival circuit, the availability of the hall. A brilliant production in an empty week is a loss.',
                ],
            },
            {
                heading: 'The production calendar',
                paras: [
                    'Work backwards from opening night. Technical week, dress rehearsals, the last week of rehearsal, the build, the fittings, the design deadline, the audition, the read-through. Every date in that list is a commitment made to other people; publish it and hold it.',
                    'Build in slack for one disaster. There will be one: a lead actor leaves, the hall is double-booked, the funding does not arrive. A calendar with no slack turns a problem into a cancellation.',
                ],
            },
            {
                heading: 'People, contracts and safety',
                paras: [
                    'Pay people if you can, and tell them early if you cannot. A written agreement - however short - should state the fee, the dates, the duties, the credit and who owns the recording. Handshake arrangements are the main cause of theatre disputes in Nigeria.',
                    'Health and safety is management\u2019s responsibility: fire exits, crowd capacity, rigging, electrical load, first aid, and a named person who can stop a performance. Insurance, where it exists, is not a substitute for a risk assessment.',
                ],
            },
        ],
        exercises: [
            'Write a one-page governance memorandum for a student company: who decides, who signs, who is accountable.',
            'Plan a four-production season with a stated budget, a venue and an audience for each.',
            'Draw a production calendar backwards from opening night and mark where you have built in slack.',
        ],
        reading: [
            'Colley Cibber, An Apology for the Life of Mr. Colley Cibber (1740)',
            'Brander Matthews, A Book About the Theater (1916)',
            'Iain Mackintosh, Architecture, Actor and Audience (1993)',
        ],
    }),
    guide({
        slug: 'theatre-management-budget-and-marketing',
        title: 'Budgeting, Marketing and Front of House',
        topic: 'Theatre Management',
        summary:
            'Where the money goes, how to price a ticket, how to fill a house without giving it away, and what the audience meets at the door.',
        covers: ['the budget', 'ticket pricing', 'marketing', 'box office', 'front of house'],
        sections: [
            {
                heading: 'The budget is a list of decisions',
                paras: [
                    'Split the budget into what happens before rehearsals (rights, design, materials), what happens during (venue, fees, transport, food, publicity) and what happens after (strike, storage, debts). Add a contingency line of ten per cent and protect it.',
                    'Rights are the item student companies forget. A published play needs a licence for performance, and the licence usually specifies the fee, the number of performances and the credit line. Applying for rights takes weeks; start before the season is announced.',
                ],
            },
            {
                heading: 'Pricing',
                paras: [
                    'Price by what the market will bear and by what the production costs, then choose one discount: students, groups, or previews. Too many price categories confuse the box office and slow the queue.',
                    'Free tickets are a legitimate choice for a campus production, but they hide the real audience size. Count attendance even when the tickets are free; the number is the only evidence you will have when you ask for funding next year.',
                ],
            },
            {
                heading: 'Marketing that works locally',
                paras: [
                    'For a campus or community production, the best marketing is a person: a company member talking to a class, a department, a church group, a hostel. Posters and social media are reminders, not recruitment.',
                    'Make one image and one sentence, and use them everywhere. A poster with six fonts and a paragraph of synopsis is a poster nobody reads. Say what the play is, when it is, where it is, and what it costs, in that order.',
                ],
            },
            {
                heading: 'Front of house',
                paras: [
                    'The audience\u2019s evening begins in the queue. Signage, a warm greeting, a place to leave bags, a programme, a working toilet, water, and a clear announcement of the running time and the interval will do more for the reputation of the company than any review.',
                    'Train the ushers on three things: where people sit, what to do if someone is ill or disruptive, and how to hold the door until the interval. Front of house is safety with a smile.',
                ],
            },
        ],
        exercises: [
            'Build a budget for a three-night run in a 250-seat hall, with a contingency line and a break-even calculation.',
            'Write the one-sentence description and the poster copy for a production you have worked on.',
            'Design a front-of-house plan: staffing, signage, queue, interval and evacuation.',
        ],
        reading: [
            'Brander Matthews, A Book About the Theater (1916)',
            'Colley Cibber, An Apology for the Life of Mr. Colley Cibber (1740)',
            'Stephen Langley, Theatre Management and Production in America (1990)',
        ],
    }),
    guide({
        slug: 'pre-colonial-performance-in-nigeria',
        title: 'Pre-Colonial Performance in Nigeria',
        topic: 'Pre-Colonial Theatre',
        summary:
            'What theatre looked like before the colonial encounter: festival, masquerade, oral epic, praise poetry and the performance of everyday life.',
        covers: ['festival', 'masquerade', 'oral epic', 'praise poetry', 'the market square'],
        sections: [
            {
                heading: 'The question of the word',
                paras: [
                    'Whether pre-colonial Nigeria had "theatre" depends on what you mean by the word. If theatre requires a written play, a hired actor and a paying audience, then it did not. If theatre is a performance, in a marked space, before an audience, with costume, music and a story, then it was everywhere.',
                    'Nigerian scholars have argued the second position since the 1970s: the festival is a theatre, the masquerade is a play, the praise-singer is a performer with a text. The argument matters because it decides where the history of Nigerian theatre begins.',
                ],
            },
            {
                heading: 'Festival as form',
                paras: [
                    'The great festivals - Egungun, Gelede, Osun, Eyo, Ekpo, mmanwu, Bori - are annual performances with fixed roles, costumes, music, choreography and an audience that knows the story. They take place in a defined space and follow a structure: procession, arrival, display, contest, departure.',
                    'Their theatre is not a representation of something that happened elsewhere; it is an event in which the community participates. That is why the audience is not passive, and why a festival cannot simply be transferred to a proscenium stage without becoming something else.',
                ],
            },
            {
                heading: 'Masquerade',
                paras: [
                    'The masquerade is the most theatrical of the pre-colonial forms: a masked figure who is believed to be a spirit, costumed and concealed, who speaks in a changed voice and moves in a choreographed way. The mask is a character, the costume is a body, and the performance is a negotiation between the wearer, the society and the audience.',
                    'The masquerade also carries authority: it can judge, punish, bless and legislate. A theatre that borrows the masque without understanding its authority borrows the costume and loses the meaning.',
                ],
            },
            {
                heading: 'Oral narrative and praise',
                paras: [
                    'The griot, the praise-singer and the storyteller performed history, satire and moral argument in a solo turn, with music, gesture and audience response. The ijala, the ijala chanters, the udje song contests and the tale-telling of the compound are the pre-colonial playhouse: one performer, an audience, a text held in memory and a performance that changes every night.',
                    'Modern Nigerian playwrights have gone back to these forms deliberately - Soyinka to Ogun and the masque, Rotimi to the epic, Osofisan to the festival - and the shelf\u2019s post-colonial titles show what they made of them.',
                ],
            },
        ],
        exercises: [
            'Describe one festival you have attended as a performance: space, roles, costume, music, audience, text.',
            'Compare a masquerade with a masked character in a modern play, and list what changes when the mask moves indoors.',
            'Collect and transcribe a praise poem or folk tale, noting the performer\u2019s gestures and the audience\u2019s responses.',
        ],
        reading: [
            'Yemi Ogunbiyi (ed.), Drama and Theatre in Nigeria (1981)',
            'Henry John Drewal and Margaret Thompson Drewal, Gelede (1983)',
            'Wole Soyinka, Myth, Literature and the African World (1976)',
        ],
    }),
    guide({
        slug: 'ritual-mask-and-festival',
        title: 'Ritual, Mask and Festival: The Grammar of African Performance',
        topic: 'Pre-Colonial Theatre',
        summary:
            'The elements that make African festival performance work - space, time, mask, music, participation - and how a modern production can use them honestly.',
        covers: ['sacred space', 'time', 'mask', 'music', 'participation'],
        sections: [
            {
                heading: 'Space is made, not found',
                paras: [
                    'A festival space is not a building; it is a place made special by performance: the market square, the shrine, the compound, the street. The boundary between performers and audience is porous and often crossed. A circle is the commonest form, because a circle lets everyone see and lets the audience become part of the event.',
                    'When a modern director stages a festival play in a proscenium, the first decision is how to recover that circle: a thrust, a traverse, an apron, or an audience on three sides.',
                ],
            },
            {
                heading: 'Time is not uniform',
                paras: [
                    'Festival time is not clock time. It begins when the drum begins and ends when the last mask leaves; it can stretch, repeat and return. This is why festival-derived plays often refuse the tight three-act clock of the European stage and move in episodes, processions and returns.',
                    'Soyinka\u2019s idea of the "fourth stage" - the transitional gulf between the worlds of the living, the dead and the unborn - is the best-known attempt to describe this time in critical language.',
                ],
            },
            {
                heading: 'The mask does three things',
                paras: [
                    'It conceals the wearer, it presents a character, and it transforms the wearer into something else. Each function changes the actor\u2019s work: a concealed actor can play a god; a presented character can be judged; a transformed performer is no longer an actor at all, and the audience knows it.',
                    'Modern productions that use masks should decide which of the three they want. A mask used as decoration gets laughter; a mask used as transformation gets silence.',
                ],
            },
            {
                heading: 'Music and participation',
                paras: [
                    'The drum is the spine of the form: it calls, answers, cues entrances and tells the audience what is happening. Songs carry the text the audience already knows and invite them to join. The audience\u2019s response - a shout, a comment, a dance step - is part of the performance, not an interruption.',
                    'A director who wants this energy must rehearse the audience\u2019s participation: leave the space, time the call, teach the response. Participation is not chaos; it is choreography.',
                ],
            },
        ],
        exercises: [
            'Stage a five-minute ritual sequence in the round, with a drum, a mask and an audience that is invited to respond.',
            'Diagram the space and the time of a festival you know, and mark where the audience crosses the boundary.',
            'Design a mask for a character in a modern play and write down which of the three functions it serves.',
        ],
        reading: [
            'Wole Soyinka, Myth, Literature and the African World (1976)',
            'Henry John Drewal and Margaret Thompson Drewal, Gelede (1983)',
            'Joachim Fiebach, The Hidden Work (1996)',
        ],
    }),
    guide({
        slug: 'colonial-theatre-in-nigeria',
        title: 'Colonial Theatre in Nigeria',
        topic: 'Colonial Theatre',
        summary:
            'What the colonial stage brought, what it suppressed, and how Nigerians took the imported forms and made a popular theatre out of them.',
        covers: ['mission schools', 'concerts and cantatas', 'the colonial city', 'censorship', 'appropriation'],
        sections: [
            {
                heading: 'The imported stage',
                paras: [
                    'Colonial theatre arrived with three institutions: the mission school, the church and the colonial club. The schools staged concerts, cantatas and Shakespeare; the churches staged nativity plays and Easter cantatas; the clubs staged drawing-room comedy for a European audience. None of it was meant to produce a Nigerian theatre.',
                    'What it produced was a generation of Nigerians who had learned the machinery of the stage - the proscenium, the script, the rehearsal, the ticket - and would turn it to their own purposes.',
                ],
            },
            {
                heading: 'The concert',
                paras: [
                    'The school concert was the most widespread theatrical form in colonial Nigeria: songs, sketches, recitations and a short play, performed at Christmas, at speech day and at the visit of a dignitary. It taught performance to thousands of people who never entered a theatre building.',
                    'From the concert came the concert party: a professional entertainment with a band, a comic sketch, a female impersonator and a highlife finale. In Ghana it became a national form; in Nigeria it fed directly into the travelling theatre.',
                ],
            },
            {
                heading: 'The colonial city and its audience',
                paras: [
                    'Lagos, Ibadan, Enugu and Port Harcourt acquired halls, cinemas and a paying audience of clerks, teachers, traders and colonial officials. Touring companies from abroad played Shakespeare and musical comedy; local companies played to the same audiences with a different repertoire.',
                    'The colonial authorities also censored. Plays about taxation, forced labour or the abuses of the courts were refused a licence, and the theatrical argument moved into music, satire and allegory - a technique that post-colonial playwrights inherited.',
                ],
            },
            {
                heading: 'Appropriation as strategy',
                paras: [
                    'The most important fact about colonial theatre in Nigeria is that Nigerians took it. They staged Shakespeare in Yoruba, turned the cantata into a folk opera, put highlife into the concert party and used the proscenium for plays about their own towns. The colonial form was the vehicle, not the destination.',
                    'Read the colonial period, then, as a period of training and theft: the tools were imported, the use was local.',
                ],
            },
        ],
        exercises: [
            'Trace one form - the concert, the cantata, the school play - into its post-colonial descendant.',
            'Read a colonial-era Nigerian newspaper advertisement for a play and describe the audience it assumes.',
            'Stage a two-minute scene in the style of a 1930s school concert, then in the style of a travelling theatre.',
        ],
        reading: [
            'Ebun Clark, Hubert Ogunde: The Making of Nigerian Theatre (1979)',
            'Yemi Ogunbiyi (ed.), Drama and Theatre in Nigeria (1981)',
            'David Kerr, African Popular Theatre (1995)',
        ],
    }),
    guide({
        slug: 'church-school-and-concert',
        title: 'Church, School and Concert: The Colonial Stages',
        topic: 'Colonial Theatre',
        summary:
            'The three stages where colonial Nigerians performed, and the repertory each one produced - from the nativity play to the Yoruba folk opera.',
        covers: ['the nativity play', 'the cantata', 'speech day', 'the folk opera', 'the hall'],
        sections: [
            {
                heading: 'The church',
                paras: [
                    'Mission Christianity brought drama in its liturgy and then in its festivals. The nativity play, the Passion play and the Easter cantata gave Nigerian congregations a ready-made dramatic repertoire, a rehearsal calendar and a stage in the churchyard.',
                    'The church also brought music: hymns, part-singing and choral harmony that became the harmonic language of Nigerian popular theatre and of the folk opera.',
                ],
            },
            {
                heading: 'The school',
                paras: [
                    'Speech day was the annual theatre festival of colonial Nigeria. Schools staged Shakespeare, Greek scenes, moral dialogues and patriotic tableaux, and the best performers were known beyond the school. The school play was where a Nigerian audience first learned to sit in rows in the dark and watch a story that was not a ritual.',
                    'The teachers who directed these plays were the first Nigerian directors, and the plays they chose were the first Nigerian repertory.',
                ],
            },
            {
                heading: 'The concert and the folk opera',
                paras: [
                    'The concert party combined a band, comedy and a sketch, and toured. Its Nigerian descendant, the Yoruba folk opera, added a continuous story, a company and a moral argument: Chief Hubert Ogunde\u2019s early work grew out of church and concert performance before it became a professional travelling theatre.',
                    'The folk opera is the missing link between colonial and post-colonial theatre, and it is the form most often left out of the syllabus.',
                ],
            },
            {
                heading: 'The hall as a public space',
                paras: [
                    'The colonial hall - church hall, school hall, town hall, assembly hall - was the physical theatre of the period: a raised platform, a proscenium or a curtain, rows of chairs and a generator. It is still the commonest venue for Nigerian theatre, which is why the technical chapters on this shelf are written for it.',
                    'The hall made theatre a public event with a ticket, a programme and an audience of strangers - the conditions of a modern theatre, in a colonial building.',
                ],
            },
        ],
        exercises: [
            'Find a programme or a newspaper notice for a colonial-era concert and reconstruct its running order.',
            'Write a ten-minute concert sketch in the 1940s style, with a song and a moral.',
            'Compare the church cantata and the folk opera as forms: audience, story, music, purpose.',
        ],
        reading: [
            'Ebun Clark, Hubert Ogunde: The Making of Nigerian Theatre (1979)',
            'Karin Barber, The Generation of Plays (2000)',
            'Yemi Ogunbiyi (ed.), Drama and Theatre in Nigeria (1981)',
        ],
    }),
    guide({
        slug: 'post-colonial-nigerian-theatre',
        title: 'Post-Colonial Nigerian Theatre',
        topic: 'Post-Colonial Theatre',
        summary:
            'The plays and playwrights of independence and after: Soyinka, Rotimi, Sofola, Osofisan and the argument about what a Nigerian theatre should be.',
        covers: ['independence', 'Soyinka', 'Rotimi', 'Sofola', 'Osofisan'],
        sections: [
            {
                heading: 'A theatre for a new nation',
                paras: [
                    'At independence the question was not whether Nigeria would have a theatre but what kind. The universities, the arts councils and the new television service all wanted a national drama, and the plays of the 1960s argued about whether it should be built from European models, from Yoruba festival forms, or from both at once.',
                    'Wole Soyinka\u2019s A Dance of the Forests, written for the independence celebrations of 1960, answered with a festival play that refused to celebrate: it summoned the dead to judge the living. The argument has continued ever since.',
                ],
            },
            {
                heading: 'Soyinka and total theatre',
                paras: [
                    'Soyinka\u2019s theatre is total: drum, dance, mask, song, mime and verse in one event, with a metaphysics drawn from Yoruba religion. The Lion and the Jewel (1959) is a comedy of the village and the modern; The Road (1965) is a nightmare of the lorry park; Death and the King\u2019s Horseman (1975) is a tragedy of colonial interference, drawn from a real incident in Oyo.',
                    'His criticism matters as much as his plays: Myth, Literature and the African World (1976) sets out the "fourth stage" and the argument that African drama must be understood in its own metaphysical terms.',
                ],
            },
            {
                heading: 'Rotimi, Sofola, Osofisan',
                paras: [
                    'Ola Rotimi took the Greek tragedy and rebuilt it in Yoruba terms: The Gods Are Not to Blame (1968) is Oedipus in a Yoruba village, and Kurunmi (1969) is a history play about the collapse of an empire. His theatre is popular in the best sense - large, musical, direct.',
                    'Zulu Sofola was the first Nigerian woman to publish a major play, and Wedlock of the Gods (1972) is a tragedy of widowhood and custom that puts a woman\u2019s choice at the centre of the stage. Her later work turned to festival form and to the education of a generation of students at Ilorin.',
                    'Femi Osofisan came after them with a theatre of argument: Once Upon Four Robbers (1980), Morountodun (1982) and a body of criticism that attacked the mythic theatre of Soyinka as a politics of resignation. His plays use song, direct address and a chorus to make the audience think about power.',
                ],
            },
            {
                heading: 'What the period left',
                paras: [
                    'The post-colonial decades produced a repertory that is still the backbone of Nigerian theatre: history plays, festival plays, satire, domestic tragedy and the musical. They also produced the institutions - the university departments, the National Theatre, the festivals - that a playwright now writes for or against.',
                    'The argument between myth and politics, ritual and revolution, is not settled. It is the live question of Nigerian dramatic criticism, and any student production takes a side in it whether it means to or not.',
                ],
            },
        ],
        exercises: [
            'Compare how Soyinka and Osofisan use a chorus, in one scene from each.',
            'Take a Greek tragedy and outline a Nigerian adaptation, naming the setting, the gods and the political stake.',
            'Write a review of a post-colonial Nigerian play that takes a position on the myth-versus-politics argument.',
        ],
        reading: [
            'Wole Soyinka, Myth, Literature and the African World (1976)',
            'Femi Osofisan, The Nostalgic Drum (2001)',
            'Yemi Ogunbiyi (ed.), Drama and Theatre in Nigeria (1981)',
            'Awam Amkpa, Theatre and Postcolonial Desires (2004)',
        ],
    }),
    guide({
        slug: 'post-colonial-festival-and-fringe',
        title: 'The Festival Aesthetic and the Contemporary Stage',
        topic: 'Post-Colonial Theatre',
        summary:
            'From the national festival to the Lagos fringe: how Nigerian theatre is funded, toured and staged now, and what the new plays are arguing about.',
        covers: ['national festivals', 'university theatre', 'the fringe', 'funding', 'new writing'],
        sections: [
            {
                heading: 'The festival as national form',
                paras: [
                    'Nigeria has used the festival as a instrument of cultural policy since the 1970s: the National Festival of Arts and Culture, the state arts councils, the university festivals and the religious festivals that draw the largest audiences of all. The festival gives a company a date, a venue, an audience and a reason to make a new work.',
                    'It also shapes the work: festival plays are short, portable, spectacular and easy to tour. That is not a corruption of the drama; it is a form with its own rules, and the best festival plays use them.',
                ],
            },
            {
                heading: 'The university and the company',
                paras: [
                    'The university theatre departments remain the main producers of new Nigerian plays, and the companies that grew out of them - and out of the churches, the schools and the travelling theatres - make up the professional sector. The repertory is small, the runs are short, and the touring circuit is thin.',
                    'The economics explain the aesthetics: with no long runs, a play must earn its audience in one night, and the companies that survive have learned to combine a known title with a strong music and dance element.',
                ],
            },
            {
                heading: 'The fringe and the new writing',
                paras: [
                    'The last two decades have produced a fringe: short-play festivals, poetry and performance nights, site-specific work in markets and courtyards, and a generation writing for small audiences in Lagos, Abuja, Port Harcourt and Enugu. The Lagos Theatre Festival, the Nigeria Theatre Festival and the proliferating campus festivals are its venues.',
                    'The new plays argue about money, gender, migration, the police, the internet and the family. They are more likely to be set in a flat than in a village, and more likely to be written for four actors than for twenty. That is a change in the theatre, not a decline in it.',
                ],
            },
            {
                heading: 'What a student company should take from this',
                paras: [
                    'Make work that can travel: a small cast, a set that fits in a bus, a running time under ninety minutes, and a technical plan that works in a hall with one lighting bar. Enter every festival you can. Keep the script, the photographs and the programme; they are the record of a production that may never be reviewed.',
                ],
            },
        ],
        exercises: [
            'Plan a fringe production for a 60-seat venue: budget, cast, running time, technical plan.',
            'Take a scene written for a large proscenium and reduce it to four actors and one bar of light.',
            'Write a funding application for a new Nigerian play, one page, with a budget and an audience plan.',
        ],
        reading: [
            'Awam Amkpa, Theatre and Postcolonial Desires (2004)',
            'Tejumola Olaniyan, Scars of Conquest/Masks of Resistance (1995)',
            'Femi Osofisan, The Nostalgic Drum (2001)',
        ],
    }),
    guide({
        slug: 'criticism-how-to-review-a-play',
        title: 'How to Review a Play',
        topic: 'Dramatic Criticism',
        summary:
            'The working method of a theatre review: what to watch, what to write down, how to judge, and how to say what a production did rather than what you would have done.',
        covers: ['preparation', 'note-taking', 'judgement', 'structure', 'ethics'],
        sections: [
            {
                heading: 'Before the curtain',
                paras: [
                    'Read the play before you go, if a text exists. Know what the production has chosen to do with it, so that you can tell the difference between a mistake and an interpretation. Arrive early enough to see the auditorium, the programme and the audience; the audience is part of the event.',
                ],
            },
            {
                heading: 'What to watch',
                paras: [
                    'Watch four things at once and write in the interval. First, the action: what does each character want, and does the production make it visible? Second, the acting: are the actors listening, or waiting to speak? Third, the staging: space, levels, movement, design, light - does the production have a visual argument? Fourth, the audience: where does it lean forward, where does it cough?',
                    'Write down specific moments, not adjectives. "The second act began with the table still uncleared and the two women circling it" is evidence; "the direction was dull" is a verdict without a case.',
                ],
            },
            {
                heading: 'Judgement',
                paras: [
                    'A review judges a production against its own aims, then against the play\u2019s, then against the standard of the art. Say what the production tried to do, whether it did it, and whether it was worth doing. That last question is the critic\u2019s real work and the one student reviewers avoid.',
                    'Be fair to difficulty: a company with no budget that attempts a hard play is doing something different from a funded company that attempts an easy one. Say which you are reviewing.',
                ],
            },
            {
                heading: 'Writing and ethics',
                paras: [
                    'Lead with the production, not with the plot. Quote one line of dialogue, describe one stage picture, name the actor who did the thing that mattered. Keep the review to the space you are given; eight hundred words is a discipline, not a limit.',
                    'Review the work, not the people\u2019s private lives. Do not invent facts about the budget or the rehearsal. If you did not see the whole performance, say so. A critic who is trusted is a critic who can be checked.',
                ],
            },
        ],
        exercises: [
            'Review a production in 400 words, with at least three specific moments as evidence.',
            'Rewrite a review that consists of adjectives into one that consists of observations.',
            'Write two reviews of the same show, one for a student paper and one for a national newspaper, and compare the assumptions.',
        ],
        reading: [
            'Clayton Meeker Hamilton, The Theory of the Theatre (1910)',
            'George Jean Nathan, The Critic and the Drama (1922)',
            'Eric Bentley, The Playwright as Thinker (1946)',
        ],
    }),
    guide({
        slug: 'criticism-approaches-to-drama',
        title: 'Approaches to Drama: Aristotle to the Present',
        topic: 'Dramatic Criticism',
        summary:
            'The main critical traditions and what each one lets you see: Aristotelian, historical, Marxist, psychoanalytic, semiotic, post-colonial and performance criticism.',
        covers: ['Aristotle', 'historical', 'Marxist', 'semiotics', 'post-colonial'],
        sections: [
            {
                heading: 'The classical inheritance',
                paras: [
                    'Aristotle\u2019s Poetics gives criticism its first vocabulary: plot, character, thought, diction, song and spectacle; reversal, recognition, hamartia and catharsis. Whatever you think of the theory, the vocabulary is still how plays are described.',
                    'Horace, Sidney, Dryden, Lessing and Schlegel argued about the rules that were derived from Aristotle - the unities, the mixing of tragedy and comedy, the status of Shakespeare - and each argument tells you what its period thought theatre was for.',
                ],
            },
            {
                heading: 'History and society',
                paras: [
                    'The historical critic reads a play as an event in its own theatre and society: what stage it was written for, what the audience expected, what the censors allowed. The Marxist critic reads it as an argument about power, class and ideology, asking whose interests the form serves.',
                    'Both approaches guard against the belief that a play means only what it means to us. Both can also explain a play away: not every line is a symptom of its century.',
                ],
            },
            {
                heading: 'The unconscious and the sign',
                paras: [
                    'Psychoanalytic criticism reads the play as a structure of desire, repression and repetition, and it is strongest on character and on the imagery a play cannot stop using. Semiotics reads the performance as a system of signs - the set, the light, the gesture, the tone - and asks how meaning is made in the theatre rather than on the page.',
                    'Semiotics is the most useful of the modern approaches for a director, because it describes exactly the materials a director controls.',
                ],
            },
            {
                heading: 'Post-colonial and performance criticism',
                paras: [
                    'Post-colonial criticism asks how a play positions Africa, the coloniser and the audience, and it has been the dominant approach in Nigerian drama since the 1980s: Soyinka\u2019s metaphysics, Osofisan\u2019s politics and the feminist critique of both are part of it.',
                    'Performance criticism reads the event rather than the text: the audience, the space, the body, the night. It is the approach that takes the theatre seriously as theatre, and it is the one a student production most needs.',
                ],
            },
        ],
        exercises: [
            'Read one short play through two of these approaches and write a paragraph from each.',
            'Take a production decision and explain what a semiotic critic would say about it.',
            'Write a post-colonial reading of a Nigerian play, with two quotations from the text.',
        ],
        reading: [
            'Aristotle, Poetics (c. 335 BCE)',
            'Keir Elam, The Semiotics of Theatre and Drama (1980)',
            'Marvin Carlson, Theories of the Theatre (1993)',
            'Tejumola Olaniyan, Scars of Conquest/Masks of Resistance (1995)',
        ],
    }),
    guide({
        slug: 'speech-breath-voice-articulation',
        title: 'Speech Arts: Breath, Voice and Articulation',
        topic: 'Speech Arts',
        summary:
            'The working voice: how breath supports sound, how resonance carries it, and the articulation drills that make a line audible from the back of a hall.',
        covers: ['breath', 'resonance', 'articulation', 'projection', 'warm-up'],
        sections: [
            {
                heading: 'Breath is the engine',
                paras: [
                    'Sound is made by air passing the vocal folds, and the folds are damaged by pushing. Breathe low, into the back and sides of the ribs, and let the abdominal wall move out as you inhale. On the voice, keep the ribs open and let the air come out in a controlled stream; do not squeeze the throat.',
                    'A useful drill: inhale for four counts, hiss for eight, then twelve, then sixteen, keeping the ribs wide and the shoulders still. Two minutes a day for a month changes a voice more than any amount of shouting in rehearsal.',
                ],
            },
            {
                heading: 'Resonance, not volume',
                paras: [
                    'A voice that carries is a voice with ring, not a voice with force. Find the forward resonance by humming on a comfortable note with the lips closed and the teeth apart, then opening into "ma, me, mi, mo, mu" without losing the buzz. The mask of the face should feel alive.',
                    'Projection is direction, not loudness. Speak to the back wall, not at the floor; lift the soft palate; keep the jaw free. An actor who fills a hall with a resonant voice can then whisper and still be heard in the tenth row.',
                ],
            },
            {
                heading: 'Articulation',
                paras: [
                    'English has twenty-four consonants and around twenty vowels, and most stage speech problems are consonant problems: final -s, -t, -d and -k dropped, and "th" replaced by "d" or "t". Drill the tongue, the lips and the soft palate separately, then together.',
                    'Standard drills: tongue twisters slowly, then at performance speed; the vowel ladder on one breath; the "red leather, yellow leather" sequence; and the reading of a paragraph with every consonant exaggerated, then at normal strength. Exaggeration is the training; the performance is the middle.',
                ],
            },
            {
                heading: 'The warm-up and the care of the voice',
                paras: [
                    'Warm up for ten minutes before a show: neck and shoulder release, yawn-sigh, lip trills, humming, tongue stretches, then a text. Warm down after: a gentle hum, water, silence. Do not whisper, because whispering strains more than speaking.',
                    'Avoid alcohol and smoke before a performance, and drink water through the day rather than in the five minutes before the entrance. If the voice is hoarse for more than two weeks, that is a medical matter, not a technique problem.',
                ],
            },
        ],
        exercises: [
            'Do the four-eight-twelve-sixteen hiss count and note the count you can reach without tension.',
            'Hum for one minute, then speak a speech; describe the difference in the resonance.',
            'Record a two-minute speech, listen back, and mark every dropped final consonant.',
            'Build a ten-minute warm-up for a company and lead it before a rehearsal.',
        ],
        reading: [
            'Cicely Berry, Voice and the Actor (1973)',
            'Kristin Linklater, Freeing the Natural Voice (1976)',
            'Patsy Rodenburg, The Right to Speak (1992)',
            'Irvah Lester Winter, Public Speaking: Principles and Practice (1912)',
        ],
    }),
    guide({
        slug: 'speech-nigerian-english-on-stage',
        title: 'Speaking Nigerian English on Stage',
        topic: 'Speech Arts',
        summary:
            'Accent, intelligibility and identity: how Nigerian actors handle standard and localised English, pidgin, code-switching and verse, without flattening either the language or the character.',
        covers: ['standard Nigerian English', 'accent', 'pidgin', 'code-switching', 'verse speaking'],
        sections: [
            {
                heading: 'There is no accent-free English',
                paras: [
                    'Standard Nigerian English is a variety with its own phonology, vocabulary and idiom, spoken by educated Nigerians across the country. It is not a failed attempt at British English, and a production that forces every actor into received pronunciation is making a class and cultural choice whether it admits it or not.',
                    'The actor\u2019s question is not "is this correct?" but "is this the right variety for this character in this play, and can the audience understand it?"',
                ],
            },
            {
                heading: 'Intelligibility before authenticity',
                paras: [
                    'Some features of Nigerian English carry perfectly and some do not. Vowel length, final consonant clusters and stress placement are the three that decide whether a line reaches the back row. Work on those and leave the rest alone.',
                    'The commonest stage faults are equal stress on every syllable, a falling pattern that turns every line into a statement, and swallowed word endings. All three are fixable with drills and a metronome.',
                ],
            },
            {
                heading: 'Pidgin and code-switching',
                paras: [
                    'Nigerian Pidgin is a language with grammar, register and a literature. On stage it can be comic, intimate, threatening or authoritative, depending on the play. Learn the register the character would actually use rather than a generic "stage pidgin" that belongs to no one.',
                    'Code-switching - moving between English, pidgin and a Nigerian language within a scene - is one of the most expressive resources a Nigerian actor has. It shows relationship, class and power in a single sentence. Rehearse the switch as a beat, because that is what it is.',
                ],
            },
            {
                heading: 'Verse, chant and the speaking of the text',
                paras: [
                    'Soyinka\u2019s verse, Rotimi\u2019s rhetorical set pieces and the praise poetry that both draw on need breath, stress and pace. Mark the stresses, find the pauses, and speak the line on the breath rather than at the end of it. Chant and incantation need a lower, more resonant placement than conversational speech.',
                    'Record the scene and listen for whether the meaning is clear with your eyes closed. If it is not, the audience is reading the surtitles of your body language instead of hearing the play.',
                ],
            },
        ],
        exercises: [
            'Read the same speech in Standard Nigerian English, in pidgin and in your own language; describe what each version says about the character.',
            'Mark the stresses in twenty lines of Soyinka verse and speak them to a partner at the back of the room.',
            'Record a scene and transcribe it phonetically; find three features to keep and three to change for clarity.',
        ],
        reading: [
            'David Jowitt, Nigerian English Usage (1991)',
            'Peter Roach, English Phonetics and Phonology (any edition)',
            'Cicely Berry, Voice and the Actor (1973)',
        ],
    }),
    guide({
        slug: 'film-analysis-shot-cut-and-sound',
        title: 'Film Analysis: Shot, Cut and Sound',
        topic: 'Film Analysis',
        summary:
            'A working vocabulary for reading a film: shot size, camera angle, movement, editing, sound and mise-en-sc\u00e8ne, applied scene by scene.',
        covers: ['shot size', 'camera angle', 'editing', 'sound', 'mise-en-sc\u00e8ne'],
        sections: [
            {
                heading: 'The shot',
                paras: [
                    'Shot size runs from the extreme long shot, which places a figure in a landscape, to the extreme close-up, which makes an eye the whole world. Each size answers a different question: where are we, who is this, what are they feeling, what are they noticing? A film that stays in medium shots for two hours has decided that nobody\u2019s inner life matters very much.',
                    'Camera angle carries judgement before a word is spoken: low angle gives power, high angle gives vulnerability, a Dutch tilt gives unease, and an eye-level shot pretends to be neutral.',
                ],
            },
            {
                heading: 'The cut',
                paras: [
                    'Editing is the creation of time and meaning. Continuity editing hides the cut so the story flows; montage makes the cut visible so an argument can be built from fragments. A cut on action joins two shots into one movement; a cut to a reaction shot tells you what the previous shot meant.',
                    'Watch a scene with the sound off and count the cuts. Note where the cut happens: on a line, on a look, on a movement, or after the movement has finished. The rhythm is the meaning.',
                ],
            },
            {
                heading: 'Sound',
                paras: [
                    'Diegetic sound belongs to the world of the film - a radio in the room, a car outside. Non-diegetic sound is added for the audience - a score, a narrator. The interesting cases are the ones in between: music a character can hear, a sound that turns out to be in someone\u2019s head.',
                    'Sound does more narrative work than students expect. A scene with the dialogue removed and the ambience kept will often tell you exactly what the scene is about. Try it.',
                ],
            },
            {
                heading: 'Mise-en-sc\u00e8ne and the long take',
                paras: [
                    'Mise-en-sc\u00e8ne is everything in the frame: set, costume, light, colour, blocking, the position of the camera. A long take without cuts puts the whole of that arrangement on display at once and asks the audience to choose where to look - which is why directors use it for moments of moral complexity.',
                    'For analysis, describe before you interpret. What is in the frame, where is it, what colour is it, what is moving? Then ask what the arrangement is doing.',
                ],
            },
        ],
        exercises: [
            'Break down a two-minute scene shot by shot: size, angle, movement, duration, sound.',
            'Watch the same scene with the sound off, then with the picture off, and describe what each carries.',
            'Compare a continuity-edited scene with a montage sequence and explain what each makes possible.',
        ],
        reading: [
            'David Bordwell and Kristin Thompson, Film Art: An Introduction (any edition)',
            'Louis Giannetti, Understanding Movies (any edition)',
            'James Monaco, How to Read a Film (1977)',
        ],
    }),
    guide({
        slug: 'film-nollywood-a-critical-introduction',
        title: 'Nollywood: A Critical Introduction',
        topic: 'Film Analysis',
        summary:
            'How the Nigerian video film industry works, what its films argue about, and how to analyse them without importing a foreign standard wholesale.',
        covers: ['history', 'production economy', 'genre', 'representation', 'criticism'],
        sections: [
            {
                heading: 'A cinema made for video',
                paras: [
                    'Nollywood grew out of a television and video economy rather than a cinema one: cheap cameras, direct-to-video release, markets and roadside sellers, and an audience that watched at home. The boom of the early 1990s made the industry national and then continental, and the straight-to-video model shaped everything that followed.',
                    'By the 2010s the industry had split: a high-budget cinema sector, a streaming sector, and the older video market that still reaches the largest audience. Analysis has to say which Nollywood it is talking about.',
                ],
            },
            {
                heading: 'The economy on screen',
                paras: [
                    'Shot on tight schedules and budgets, the classic video film developed its own grammar: long two-shots, a fixed camera, heavy dialogue, domestic interiors, and a strong reliance on music and on the star. These are production conditions visible in the form, not failures of craft.',
                    'A critic who measures a Nollywood film only against Hollywood will find it lacking in exactly the things it was never trying to do. Ask first what the film is trying to do, and to whom.',
                ],
            },
            {
                heading: 'Genre and argument',
                paras: [
                    'The main genres - the family melodrama, the ritual and occult film, the crime and campus film, the comedy, the epic and the historical - are arguments about money, gender, religion, tradition and the city. The occult film, for example, is often a story about wealth and its price, and it is read differently by different audiences.',
                    'Representation matters in a cinema this large: who is on screen, who speaks which language, who is punished and who is rewarded. Count, describe, then interpret.',
                ],
            },
            {
                heading: 'How to analyse a Nigerian film',
                paras: [
                    'Start with the conditions: budget, format, language, release. Then the story: what does the film want, and what does it fear? Then the craft: camera, sound, editing, performance, music. Then the audience: where was it shown, and to whom?',
                    'Keep a shot list for one sequence, a transcript of one scene, and a note on the music. Three pages of evidence will carry a better argument than thirty pages of opinion.',
                ],
            },
        ],
        exercises: [
            'Analyse one five-minute sequence from a Nigerian film: shot list, sound, performance, and one claim about meaning.',
            'Compare the first ten minutes of a 1990s video film with a 2020s cinema release: budget, grammar, audience.',
            'Write a 600-word review of a Nigerian film that names its production conditions and judges it on its own terms.',
        ],
        reading: [
            'Jonathan Haynes, Nigerian Video Films (2000)',
            'Manthia Diawara, African Cinema: Politics and Culture (1992)',
            'David Bordwell and Kristin Thompson, Film Art (any edition)',
        ],
    }),
]


/* ── Longer units ─────────────────────────────────────────────────────────── */

/**
 * The sections below are appended to the units above at load time. They were
 * written after the first build showed which units were too short to be worth a
 * place on a shelf: each one adds a working section to an existing guide.
 */
const EXTRA_SECTIONS = {
    'directing-the-directors-craft': {
        heading: 'After opening night',
        paras: [
            'The director\u2019s work does not end at the first performance. Watch the show again in the second week, from different seats, with a notebook. Performances drift: a cross gets shorter, a pause gets longer, a scene speeds up because the actors are bored of it. Give a line note before the next performance, not a speech. Two or three specific notes will hold a show for a month; a general appeal to "keep the energy up" holds nothing.',
            'Keep a production file: the script with the blocking, the cue sheets, the design drawings, the cast list, the photographs, the programme and the reviews. It is the evidence that the production happened, it is what you show the next venue, and it is what you will teach from in five years. Departments lose their history because nobody keeps the file.',
            'Finally, write down what you would do differently. A director who cannot answer that question after a run has not been directing; they have been managing a series of emergencies. The answer is the beginning of the next production.',
        ],
    },
    'directing-blocking-and-stage-pictures': {
        heading: 'Blocking a crowd',
        paras: [
            'Crowds are blocked in groups, not individuals. Divide the stage into areas, give each group an area and a leader, and give each group one action for the scene: the mourners enter and kneel, the servants clear the table, the guests drink and talk. Then give the principals their own paths through the groups. An audience reads a crowd as a mass with a few faces in it, and that is how it should be built.',
            'Keep the crowd busy with business that belongs to the play: folding cloth, serving, carrying, waiting. Nothing destroys a serious scene faster than eight people standing still and watching two people talk. But keep the business quiet and repeatable, because a crowd that improvises will eventually improvise over the line that matters.',
            'Rehearse the crowd separately. Twenty minutes with the ensemble on entrances, exits and the one picture you need will save an hour of the principal actors\u2019 time, and the ensemble will feel like a company rather than furniture.',
        ],
    },
    'scriptwriting-the-one-act-play': {
        heading: 'The read-through test',
        paras: [
            'A draft is not finished until it has been read aloud by people who are not you. Give each reader a character, sit them round a table, and listen without interrupting. You will learn three things in twenty minutes: where the audience laughs when you did not intend it, where they lose the thread, and where the play is better than you thought. Write nothing down during the reading; the things worth keeping will still be there afterwards, and the rest is noise.',
            'Then cut ten per cent. Almost every first draft of a one-act is ten per cent too long, and the ten per cent is usually at the start of scenes: the greetings, the settling, the explanation of what the audience can already see. Cut the first two speeches of every scene and read it again. If it still makes sense, you have found the play.',
            'Finally, check the stage directions against the budget. A one-act that needs a working tap, a fire and a car is a one-act that will not be produced by a student company. Write for two chairs, one door and a lamp, and let the writing do the rest; the best one-acts in the repertory are built out of almost nothing.',
        ],
    },
    'scriptwriting-structure-and-scene': {
        heading: 'Rewriting: the second draft',
        paras: [
            'The second draft is not the first draft with better sentences. It is a structural pass made after the play has been read aloud. Work through it in this order: the story (does every scene change the situation?), the characters (does every character want something in every scene they are in?), the scenes (does each begin late and end early?), the dialogue (can any speech be cut in half?), and only then the language.',
            'Keep a "cut file" rather than deleting. Lines you love and cannot justify go into the file, and sometimes they come back in another play. The discipline is to remove them from this one.',
            'Read the draft again for the character who speaks least. In most student plays the quiet character is the playwright\u2019s conscience and has nothing to do. Give them a want, an obstruction and one scene where they win something, and the play will gain a dimension it did not have.',
        ],
    },
    'lighting-lanterns-angles-colour': {
        heading: 'Power, circuits and the venue check',
        paras: [
            'Before you design anything, walk into the venue and ask the electrician four questions: how many circuits are there, what is the rating of each, where is the dimmer rack, and what is the earthing arrangement? A lantern is not a lamp you plug into a wall socket; the load has to be calculated and spread. Six 500 W lanterns on one 10 A circuit will trip it, and a tripped circuit in the middle of a performance is a blackout with a cause.',
            'Count the outlets, the bars and the positions. Many Nigerian halls have one lighting bar, no dimmer, and a single switch by the door; a design for that venue is a design for switching, not for dimming, and it is built from parcans, floor stands and practicals. Design for the room you are in.',
            'Check the safety items before the first hang: safety bonds, cable ramps, fire extinguishers, and a ladder that is not a chair. Write a one-page risk note for the get-in and give it to the stage manager. Nobody remembers the design that was beautiful; everybody remembers the one that hurt someone.',
        ],
    },
    'lighting-the-plot-and-the-cue-sheet': {
        heading: 'The console, the cue stack and the show file',
        paras: [
            'Modern consoles store cues as a stack, and the operator runs the stack rather than the channels. Build the show in the console in the order it will be performed, label every cue with the page and the trigger, and save two copies of the show file: one on the console and one on a USB stick in the stage manager\u2019s folder. A console that loses its memory an hour before the show has ended productions.',
            'Keep a paper backup: the cue sheet, the channel schedule and a photograph of the console screen at the top of the show. If the console fails, you can at least run the show on the house lights and the practicals and tell the audience what is happening.',
            'Rehearse the cues before the technical rehearsal. A "dry tech" - the stage manager calling the cues with no actors, the operator pressing go - takes an hour and finds the cue that was written for a page that no longer exists. Directors who skip it spend the first dress rehearsal discovering the same thing slowly, in costume, with an audience of thirty waiting.',
        ],
    },
    'set-design-reading-the-script-for-space': {
        heading: 'Presenting the design',
        paras: [
            'A design is presented three times: to the director, to the company, and to the workshop. Each needs a different document. The director needs the idea and the ground plan; the company needs to see where they enter and what they can stand on; the workshop needs dimensions, materials and a date.',
            'Make one presentation sheet: the model photographed from the audience, the ground plan, a materials board with the actual paint colours and fabric swatches, and three sentences of intention. Pin it up in the rehearsal room for the whole rehearsal period. Actors work better in a space they can imagine, and a design that lives only in the designer\u2019s folder is discovered, not rehearsed.',
            'Be ready to cut. A design that cannot be built in the time available is not ambitious, it is late. Decide in advance which element is the idea and which are the trimmings, so that when the schedule slips, you cut a trimming and keep the idea.',
        ],
    },
    'set-design-the-model-box-and-the-build': {
        heading: 'Finishing and photographing the model',
        paras: [
            'A white model is for thinking; a finished model is for showing. Finish with texture: paint the floor, paper the walls, add the fabric of the curtains at scale, and use a matt finish because gloss photographs as plastic. Card edges should be clean; a sloppy model reads as a sloppy design, whatever the idea.',
            'Light the model before you photograph it. A desk lamp at the angle of the stage light will show you whether the set has depth or reads flat. Photograph from the height of the audience\u2019s eye, not from above: the plan view is for the workshop, the eye view is for the director.',
            'Keep the model after the production. Store it flat, photograph it from four angles, and file the photographs with the drawings. Models are the department\u2019s memory, and the next production of the same play will begin with them.',
        ],
    },
    'props-sourcing-making-and-running': {
        heading: 'The prop store and the budget',
        paras: [
            'Start a prop store even if it is one cupboard. Label shelves, keep an inventory, and record what left and who has it. Every department that has ever produced a play owns a bottle, a suitcase, a telephone and a pile of cloth; the store is how those objects survive from one production to the next.',
            'Budget props as a line, not as petty cash. Divide the budget between consumables (food, candles, breakaways), hire (furniture, a sewing machine), purchases (the objects you must own) and making (materials). Photograph the receipts; the next production will need to know what a beaded bag cost.',
            'Borrow with a form. Note the owner, the object, its condition, the date it is due back and who is responsible. Return borrowed things clean and on time, with a note. A department that returns things properly can borrow again, and a production that cannot borrow is a production that buys everything twice.',
        ],
    },
    'props-period-function-and-symbol': {
        heading: 'Props and the actor\u2019s body',
        paras: [
            'An actor needs time with a prop before an audience sees it. Give them the object in the first week of rehearsal, not the dress rehearsal: a phone that must be answered in three rings, a bag that must be searched, a knife that must be held convincingly all need practice, and practice is what makes an object look owned.',
            'Decide the handling as part of the blocking. Where is the prop kept when it is not used? How is it picked up? Does the character treat it carelessly or carefully, and what does that say? An actor who fidgets with a prop is telling you the prop has no business, so give it one.',
            'Safety is part of the design: no real glass, no real flames without a fire officer, no blade that has not been checked, and no food that has been sitting under stage lights for two hours. Rehearse the dangerous moments slowly, and rehearse the moment before the dangerous moment, because that is where accidents are made.',
        ],
    },
    'makeup-stage-straight-character-age': {
        heading: 'Hair, wigs and the finished head',
        paras: [
            'Makeup is half a head. Hair and wigs change a silhouette faster than any paint: a receding hairline, a braided crown, a wig with grey at the temples. Learn to block and pin a wig, to lace a front hairline, and to set a style that survives an hour of stage heat.',
            'Match the wig to the period and to the actor\u2019s face. A wig that sits too low on the forehead makes every face look older and every character look tired. Pin the wig securely, tape the lace, and check it under the stage light from three metres.',
            'Build a wig and hair plot alongside the costume plot: character, scene, wig or natural hair, who dresses it, and where it is kept between performances. Hair that is improvised every night is hair that eventually falls off on stage.',
        ],
    },
    'makeup-for-film-and-television': {
        heading: 'The kit for a low-budget shoot',
        paras: [
            'A workable kit for a small production: a light base and a medium base, two concealers, a translucent powder, a neutral blush, a brow pencil, a small eyeshadow palette, a lip colour close to natural, brushes, sponges, cotton buds, blotting paper, a setting spray, micellar water, tissues and a mirror with a light.',
            'Lighting conditions decide the makeup. Daylight, tungsten, LED panels and phone lights all render colour differently, so test the day before and note what the monitor shows. A foundation that looks right under a tungsten bulb can go grey under an LED panel, and the camera will show the join at the jaw.',
            'Work fast and clean. On a low-budget shoot the makeup artist is often also the continuity person and the person holding the reflector, so the kit should be small enough to carry and organised so that anything can be found in the dark. Label the drawers; the day will be long.',
        ],
    },
    'costume-design-from-script-to-fitting': {
        heading: 'The costume budget',
        paras: [
            'Costume budgets are spent in four places: hire, purchase, making and alteration. For a period play, hire is usually cheapest for the principals and most expensive for the crowd; for a contemporary play, purchase from the market and alter is almost always cheapest.',
            'Cost a costume from the fabric up: metres, lining, thread, buttons, zip, trim, and the tailor\u2019s fee, then add twenty per cent. A design presentation without a cost is a wish; a director cannot choose between two designs until both have a number.',
            'Decide early what the department owns and will reuse: suits, shoes, wrappers, school uniforms, choir robes. A costume store with ten good suits and a rail of neutral shirts will dress half the plays a department produces. Keep it clean, labelled and inventoried, and it will save more money than any single purchase.',
        ],
    },
    'wardrobe-the-plot-and-the-run': {
        heading: 'The dress rehearsal and the notes',
        paras: [
            'The dress rehearsal is a technical event wearing costumes. Watch it from the wings, with the wardrobe plot in your hand, and write down every change that did not work, every piece that arrived late and every actor who could not move properly. Those notes are worth more than any number of notes about appearance.',
            'After the dress, sit with each actor for two minutes. Ask what the costume stops them doing. An actor who cannot raise an arm, sit down or cross the stage quickly will tell you, and they are right. Alter the costume, not the blocking.',
            'Between performances, check the rail before the half: every piece present, every piece clean, every repair done. A missing glove on a Saturday night is a costume department problem, not an actor\u2019s, and the audience will not know the difference.',
        ],
    },
    'church-school-and-concert': {
        heading: 'Reconstructing a lost repertoire',
        paras: [
            'Very little of the colonial repertoire survives as a text. It survives in programmes, newspaper notices, school magazines, photographs and memoirs, and reconstructing it is a research exercise a student can actually do: the national archives, the university library, the church records and the family album.',
            'Start with one institution - a school, a church, a town hall - and collect every theatrical event you can find over twenty years. List the title, the date, the venue, the company and the audience. Patterns appear quickly: the same plays, the same seasons, the same people directing.',
            'Then read one surviving script, if there is one, against the notices. The gap between what was advertised and what was performed is the history: it tells you what the audience wanted, what the authorities allowed, and what the company could afford.',
        ],
    },
    'criticism-approaches-to-drama': {
        heading: 'Reading closely: a practical sequence',
        paras: [
            'Whatever approach you choose, begin with the text in front of you. Read the scene twice: once for what happens, once for how it is made. Then write four lists: what each character wants, what each says, what each does, and what the scene withholds. Most critical arguments begin in the gap between the second and the third list.',
            'Then place the scene: where it sits in the play, what the audience knows at that point, and what the scene is doing to the play\u2019s shape. A scene that seems dull in isolation is often a hinge, and a scene that seems brilliant is often a set piece that stops the story.',
            'Only then bring the theory. Use it to ask a question the text cannot answer by itself, not to prove a conclusion you had before you read. A criticism that could be written without the play is not criticism of the play.',
        ],
    },
    'theatre-management-budget-and-marketing': {
        heading: 'The break-even calculation',
        paras: [
            'Break-even is the number of tickets you must sell before the production stops losing money: total costs divided by the average ticket price. If the budget is 600,000 naira and the average ticket is 2,000, you need 300 sales. If the hall holds 250, you cannot break even in one night, and the season needs either a higher price, a sponsor, or a smaller budget.',
            'Do the calculation before the season is announced, not after the first week of sales. It tells you how many nights you need, whether a free student matinee is affordable, and how much of the budget must come from sponsorship. It also tells you the moment to cut a line item rather than hope.',
            'Track sales daily and compare with the break-even line. A production that is behind on Tuesday can still be saved by a school booking; one that discovers the gap on Friday cannot. The manager\u2019s job is to see the number early enough to act on it.',
        ],
    },
    'colonial-theatre-in-nigeria': {
        heading: 'Sources: how we know',
        paras: [
            'The colonial theatre is documented unevenly. The colonial administration kept files on licences, censorship and public order; the missions kept school and church records; the newspapers - the Lagos Weekly Record, the West African Pilot and their contemporaries - carried notices and reviews; and private collections hold programmes and photographs.',
            'Read the administrative files against the newspapers. The file tells you what the state feared; the notice tells you what the audience was offered; the review tells you what a contemporary thought of it. Where the three disagree, you are close to the history.',
            'Oral history matters here more than for any other period on this shelf. People who performed in school concerts and church cantatas in the 1940s and 1950s are still alive, and their memories of the repertoire, the rehearsals and the audience are primary sources. Record them, with permission, and cite them properly.',
        ],
    },
    'theatre-history-greeks-to-the-globe': {
        heading: 'What the evidence actually is',
        paras: [
            'The history of the theatre is built from three kinds of evidence: texts, buildings and pictures. For Greece we have a handful of plays, the remains of the theatre of Dionysus, and vase paintings. For Rome, plays, the ruins at Orange and Pompeii, and mosaics. For the medieval stage, play manuscripts, church records, and a few stage plans such as the Valenciennes drawing and the Castle of Perseverance plan.',
            'Learn to say what is known and what is inferred. Nobody knows exactly how the Greek mask amplified the voice; nobody knows how the Globe\u2019s trapdoor was worked in every play. The honest history distinguishes the evidence from the reconstruction, and a good essay does the same.',
            'Then use the reconstruction as a hypothesis. If the Globe\u2019s stage was deep and the audience stood in daylight, what follows for the acting? If the Greek theatre held fifteen thousand people in the open air, what follows for the size of gesture? The building is an argument about performance, and reading it that way is the point of theatre history.',
        ],
    },
    'theatre-management-running-a-company': {
        heading: 'The manager\u2019s week',
        paras: [
            'A working week in a small company: Monday for the money (box office, invoices, payroll, the bank), Tuesday for the next production (contracts, rights, venue, designers), Wednesday for the current one (tickets, front of house, press), Thursday for people (calls, problems, the cast and crew who need an answer), Friday for the future (funding, partnerships, the season after next).',
            'Protect one hour a day for the thing nobody else will do: reading the contracts, checking the accounts, answering the email that has been waiting. Management fails slowly, through the letters that were not answered.',
            'Write a weekly one-page report to the board or the head of department: what happened, what it cost, what is coming, what you need. A manager who reports regularly is trusted with the crisis; a manager who reports only in a crisis is blamed for it.',
        ],
    },
    'criticism-how-to-review-a-play': {
        heading: 'The review as an argument',
        paras: [
            'A review is an argument with evidence, not a verdict with adjectives. The claim might be "this production turns a domestic tragedy into a ghost story", and the evidence is three specific choices: the lighting, the doubling, the way the maid is directed to stand. A reader who did not see the show should be able to follow the argument and disagree with it.',
            'Structure it simply. Open with the production\u2019s central choice; describe two or three moments that show it working or failing; place it in the context of the company and the play; end with a judgement that follows from the evidence. The plot summary belongs in one sentence, and only if the reader needs it.',
            'Avoid the three common failures: reviewing the play instead of the production, reviewing your own expectations, and reviewing the audience. You are writing about what happened on a particular night in a particular room, and the specificity is what makes it criticism rather than a notice.',
        ],
    },
    'the-yoruba-travelling-theatre': {
        heading: 'The repertoire and the star',
        paras: [
            'Travelling theatre was a star system. The leader\u2019s name was on the poster, the leader played the lead, the leader\u2019s music sold the tickets. The repertoire was built around that star: roles written to display a voice, a dance, a comic turn, and a moral authority the audience already associated with the performer.',
            'The plays themselves were often adapted from folk tales, from novels, from the Bible and from the newspapers. The adaptation was free: a story was taken, reset in a recognisable world, given songs and a moral, and toured until it stopped earning. Copyright was not the model; ownership of a performance was.',
            'For a student company the lesson is about the ensemble: a company built around one performer survives only as long as that performer. The travelling theatres that lasted built a repertoire and a training system, and trained the next generation on the road.',
        ],
    },
    'film-nollywood-a-critical-introduction': {
        heading: 'Distribution and the new platforms',
        paras: [
            'The economics of Nollywood changed twice: once when video cassettes and then discs made the market national, and again when streaming made it international. Each change altered the form. The disc market rewarded volume and a strong cover; the cinema market rewards spectacle and a release date; streaming rewards the first ten minutes and a hook that survives a thumbnail.',
            'Distribution determines running time, aspect ratio, sound mix and even the ending. A film made for a cinema screen can afford a slow opening; a film made for a phone cannot. When you analyse a Nigerian film, ask where it was meant to be seen before you judge its pacing.',
            'The platforms also changed the criticism. Audiences now argue about films on the same timeline as the reviewers, and the box office is visible in a way it never was. A critic writing now is writing in public conversation with the audience, which is closer to the theatre than to the old film review.',
        ],
    },
    'film-analysis-shot-cut-and-sound': {
        heading: 'Reading a sequence: a worked method',
        paras: [
            'Choose a sequence of two to four minutes. Watch it three times. First for what happens. Second with a notebook, writing the timecode of every cut and the size of every shot. Third with the sound off, then once more with the picture off.',
            'You will end with a shot list and a sound list. Lay them side by side and look for the pattern: how long the shots are, whether the cuts land on dialogue or on movement, where the music enters and leaves, which shot is held longer than the rest. The held shot is almost always the one the sequence is about.',
            'Then write one paragraph that states what the sequence does and cites three pieces of evidence from your lists. That paragraph, repeated across a film, is a film analysis. It is slower than an impression and much harder to argue with.',
        ],
    },
    'ritual-mask-and-festival': {
        heading: 'Taking festival form indoors',
        paras: [
            'A festival form moved into a hall loses three things immediately: the sky, the crowd and the duration. The designer\u2019s job is to restore equivalents. A cyclorama or a dark surround can stand for the sky; a thrust or an apron can put the audience where the crowd was; an episodic structure can restore the sense of time passing rather than being cut to ninety minutes.',
            'Do not reproduce a shrine on a proscenium and call it ritual. The honest move is to find the performance principle - procession, possession, contest, departure - and stage that. The audience will feel the form even when the setting is a hall.',
            'Work with practitioners. If the production uses a masquerade, a drummer or a praise-singer, they are collaborators with authority over their material, not hired effects. Agree the terms in writing, credit them properly, and let them correct you.',
        ],
    },
    'speech-nigerian-english-on-stage': {
        heading: 'Drills for the specific features',
        paras: [
            'For final consonants, drill minimal pairs and then a paragraph with every final consonant tapped: "he asked for the last list of tests". For stress, take ten sentences and mark the word that carries the new information, then say each sentence three times with the stress in a different place and describe how the meaning changes.',
            'For vowel length, work with pairs such as "sit/seat", "full/fool", "cot/caught" - not to make the actor sound British, but to give the character a choice. A character who cannot distinguish them is a character with fewer options than the actor.',
            'For pace, read a speech at half speed, then at performance speed, then at half speed again. The middle reading is usually the one to keep. Record it and listen with the script in hand, marking every word the listener lost.',
        ],
    },
    'song-design-for-the-stage': {
        heading: 'Where the songs sit in the story',
        paras: [
            'Map the evening before writing a note. A conventional shape: an opening number that introduces the world, a want song for the protagonist, a duet that complicates the relationship, an act-one finale that raises the stakes, a comic number after the interval, an eleven o\u2019clock song for the protagonist alone, and a finale that resolves the argument.',
            'That shape is not a rule, but it is a diagnosis. If your show has no want song, the audience does not know what the protagonist wants. If it has no act-one finale, the interval has nothing to think about. If the finale introduces new material, the show has not finished.',
            'Write the transitions before the songs. The move from speech into music is where an audience decides whether to accept the form; a scene that simply stops and a band that simply starts will lose them. Give the band a cue in the dialogue, give the actor a reason to sing, and rehearse the join until it is invisible.',
        ],
    },
    'post-colonial-festival-and-fringe': {
        heading: 'The producer\u2019s checklist',
        paras: [
            'For any festival or fringe performance, confirm in writing: the venue, the get-in and get-out times, the technical specification (power, lighting bars, sound inputs), the running time and any hard curfew, the fee and when it is paid, the accommodation and transport, the marketing materials the festival will produce, and who owns the recording.',
            'Build a technical plan that fits in one page and one bag: what you bring, what you need, and what you can do without. Festivals run late and share equipment; a company that can perform with two lanterns and a laptop will always perform, and a company that needs a full rig will sometimes not.',
            'Keep a festival file: the programme, the contract, the photographs, the reviews and the audience numbers. Funding applications ask for exactly this, and the company that has the file gets the grant.',
        ],
    },
    'theatre-history-the-modern-stage': {
        heading: 'The director\u2019s theatre and the actor\u2019s theatre',
        paras: [
            'Two traditions run through the modern stage and they disagree about where the meaning is made. In the director\u2019s theatre, the production is a composition: the text is material, the stage picture is the argument, and the director is the author of the evening. In the actor\u2019s theatre, the performance is the meaning: the text is a score, the actor is the instrument, and the director is a coach.',
            'The twentieth century oscillated between them. The Meiningen company and Craig, Appia and Reinhardt built the director\u2019s theatre; the Moscow Art Theatre and the Actors Studio built the actor\u2019s. Brecht wanted both and wrote for a theatre where the staging argues with the acting.',
            'Ask of any production you study: who is authoring the meaning? The answer tells you which tradition it belongs to, and it usually tells you what the production is worth.',
        ],
    },
    'pre-colonial-performance-in-nigeria': {
        heading: 'The evidence problem',
        paras: [
            'There is no script. The evidence for pre-colonial performance is the performance itself, the objects used in it, the oral tradition that surrounds it, and the accounts of outsiders - travellers, missionaries, colonial officers - whose descriptions are useful and interested.',
            'Treat the outsider\u2019s account as evidence of what an outsider saw, not as the truth of the event. Where a missionary describes a masquerade as superstition, a historian reads a performance with authority, and both readings are in the sentence.',
            'The best method is participation with permission: attend, watch, ask, record, and let the practitioners correct your description. Then compare what they say with what the archive says. The gap is the history, and it is where a student can make an original contribution rather than repeat a textbook.',
        ],
    },
    'speech-breath-voice-articulation': {
        heading: 'From drill to text',
        paras: [
            'Drills are not performance. The point of a warm-up is to arrive at the text with options: a voice that can be loud or quiet, fast or slow, high or low, without strain. After the drills, speak a speech you know and change one parameter at a time, listening for what the change does to the meaning.',
            'Work with a metronome for pace and with a partner at the back of the room for projection. A partner who raises a hand when a word is lost is a better teacher than a mirror.',
            'Finally, record yourself once a week for a term. The recording is the only evidence of progress, and it is the thing a student most needs when the voice feels stuck. Keep the files; in twelve weeks the change will be audible.',
        ],
    },
    'sound-design-system-plot-and-cue': {
        heading: 'The show file and the backup',
        paras: [
            'The show file is the sound design in a form the operator can run: every cue numbered, every file named to match, every level set, every fade timed. Save it twice, on the playback machine and on a USB stick, and print the cue list.',
            'Test the whole file on the venue system before the technical rehearsal: every cue, in order, at the level it will play. Files that play at home fail on a venue interface, and the failure is usually a format, a sample rate or a missing codec.',
            'Have a fallback for every cue that matters: a phone with the files, a second cable, a spare battery for the microphone. The audience will forgive a cue that is late; they will not forgive a scene with no sound at all.',
        ],
    },
    'african-theatre-a-history': {
        heading: 'The archive problem, and what to do about it',
        paras: [
            'African theatre history is written from a thin archive: few published scripts before the 1960s, few recordings, few theatre buildings, and newspapers that are hard to find outside a national library. The history has often been written by outsiders, and the corrections have come from African scholars working with oral sources.',
            'A student project should work with what is local. Record an interview with a performer who worked in the 1970s; collect the programmes of a defunct company; photograph a festival and describe it in performance terms; find the church or school records of a concert. A single well-documented local case is worth more than another summary of the published canon.',
            'Cite the practitioners by name. The history of African theatre is not only the history of playwrights; it is the history of companies, managers, designers, drummers and audiences, and most of them left no book.',
        ],
    },
    'post-colonial-nigerian-theatre': {
        heading: 'The canon and the syllabus',
        paras: [
            'The Nigerian dramatic canon was made in the university: the plays taught in the 1970s and 1980s became the plays produced, anthologised and examined. That canon is strong on Soyinka, Rotimi, Osofisan and Clark, and thinner on women, on the popular theatre, on the north and on the languages other than English.',
            'A student should read the canon and then read around it: Zulu Sofola, Tess Onwueme, Bode Sowande, Kole Omotoso, Ahmed Yerima, and the travelling theatre repertoire that the canon left out. The gaps are part of the history.',
            'When you write about a Nigerian play, say which tradition it belongs to and which audience it was written for. A university festival play and a market video drama are not competing on the same terms, and criticism that pretends they are will misread both.',
        ],
    },
    'directing-the-directors-craft#2': {
        heading: 'Working with actors who have done this longer than you',
        paras: [
            'A student director often directs actors who are older, more experienced or more senior in the department. The authority does not come from the title; it comes from having done the work on the text. Come to every rehearsal with the scene read, the questions prepared and the blocking thought through, and the room will follow. Come unprepared and no title will hold it.',
            'Ask, do not instruct, when the question is about the actor\u2019s process: "what is she trying to get from him here?" is a better note than "play it angrier". Keep instruction for the things that are yours - space, tempo, the shape of the scene - and keep the actor\u2019s process theirs.',
        ],
    },
    'directing-blocking-and-stage-pictures#2': {
        heading: 'The two-hour blocking rule',
        paras: [
            'Never block more than two hours at a stretch, and never block a scene the actors have not read aloud. Blocking is the physical shape of an argument the actors have to understand first; a company that is walked around a stage before it understands the scene will perform the traffic and not the play.',
            'Block in pencil. Every blocking plan changes in the first run, and a director who has inked the moves into a script will defend them past the point where they work. The blocking is a hypothesis about the scene, and the run is the test.',
        ],
    },
    'scriptwriting-the-one-act-play#2': {
        heading: 'The title, the cast list and the first page',
        paras: [
            'A competition reader sees the title page, the cast list and the first page before deciding whether to read on. Make the title do work: "The Last Bus" tells the reader more than "A Play in One Act". Make the cast list honest: five characters, not "Crowd". Make the first page begin inside the situation, not before it.',
            'Do not open with a stage direction that describes the weather, the furniture and the history of the family. Open with a person doing something they cannot easily stop doing. The audience will learn where they are from what they do.',
        ],
    },
    'scriptwriting-structure-and-scene#2': {
        heading: 'The scene that will not work',
        paras: [
            'When a scene refuses to work, the fault is almost never the dialogue. Check three things in order: does the scene have a decision in it, does the character who wants something have the power to get it, and does the scene start too early? Nine times out of ten the answer is the third, and the fix is to cut the first half-page.',
            'If it still will not work, the scene may be doing a job that belongs to another scene. Move the information into the scene where it costs something, and delete this one. A play is not a set of scenes that each do one thing; it is a set of scenes that each do several things at once.',
        ],
    },
    'lighting-lanterns-angles-colour#2': {
        heading: 'The lighting states a play actually needs',
        paras: [
            'Most plays need six or seven states, not sixty: a general warm wash, a cooler general, a night state, a special for one area, a practical state for a lamp or a fire, a blackout, and one state that is specific to the play and cannot be described in advance. Build those first and the design will hold the evening.',
            'Resist the temptation to light every moment differently. Constant change exhausts the audience and the operator, and it flattens the two or three moments that should be different. A lighting design is a hierarchy of attention, and hierarchy means most of the stage is in the same light most of the time.',
        ],
    },
    'lighting-the-plot-and-the-cue-sheet#2': {
        heading: 'Cue timing',
        paras: [
            'A cue has a duration as well as a level. A four-second fade reads as a change of mood; a twenty-second fade reads as a change of time; a snap reads as an event. Write the duration on the sheet, and rehearse it with a stopwatch, because operators count differently and the difference is visible.',
            'Cue the cue, not the line. If the cue is written for "on her entrance", the operator watches the door; if it is written for a line, the operator listens for the line and the entrance is late. Choose the trigger that is easiest to see or hear, and write it in the words the operator will actually hear.',
        ],
    },
    'set-design-reading-the-script-for-space#2': {
        heading: 'Three questions before you draw',
        paras: [
            'Where does the audience sit, and what can they see? What must the stage do physically - how many doors, how much floor, how high? And what is the one thing the audience must understand about this world before anyone speaks? Answer those three and the design has a brief; skip them and it has a style.',
            'Keep the brief to one page and pin it above the drawing board. Every decision afterwards can be tested against it, and when the director asks for a change you can say what the change costs in the terms of the brief rather than in taste.',
        ],
    },
    'set-design-the-model-box-and-the-build#2': {
        heading: 'When the model meets the theatre',
        paras: [
            'A model is built to the theatre\u2019s dimensions, not to an ideal stage. Measure the venue: the proscenium opening, the depth to the back wall, the height to the grid, the width of the wings, the position of the doors the audience uses. A set designed for a stage two metres deeper than the one you have will be cut in the week before opening, badly.',
            'Take the model to the venue and stand it in the actual space before the build. The perspective of a model flatters; the theatre does not. Photograph the model in the venue, from the seats, and adjust before anyone buys timber.',
        ],
    },
    'church-school-and-concert#3': {
        heading: 'The concert programme as a document',
        paras: [
            'A colonial concert programme is a small historical record: the order of items, the names of performers, the patrons, the price of admission, the advertisements round the edge. Read one carefully and you can date the form, name the audience and see what the school or church wanted to be seen to value.',
            'Collect a dozen programmes from one town across twenty years and you have a social history of performance: which hymns, which plays, which visiting dignitaries, which language. That is a manageable student research project, and it produces something the archive does not have.',
        ],
    },
    'wardrobe-the-plot-and-the-run#3': {
        heading: 'A wardrobe on no budget',
        paras: [
            'Three rails and a cupboard will dress a department if the pieces are chosen, not accumulated. Build a core: five men\u2019s suits in different sizes, ten white shirts, five dark skirts, five blouses, two academic gowns, a rail of neutral dresses, and a box of scarves, belts and shoes. Hire or make the period pieces per show.',
            'Buy at the market, not the boutique, and buy with a tape measure. Alteration is cheaper than purchase, and a garment that fits the actor will read as expensive from the third row whatever it cost.',
        ],
    },
    'theatre-management-running-a-company#3': {
        heading: 'The company meeting',
        paras: [
            'Hold one meeting a week, with an agenda, a time limit and written minutes. Three standing items: what is happening this week, what is at risk, and what needs a decision today. Everything else goes in a note.',
            'Minutes matter more than meetings. They are the record of who agreed to what, they protect the manager when a decision is questioned, and they are the institutional memory that survives the graduating class. Circulate them within a day, while people still remember disagreeing.',
        ],
    },
    'colonial-theatre-in-nigeria#3': {
        heading: 'Censorship as a theatrical fact',
        paras: [
            'The colonial licence was not only a legal instrument; it shaped what playwrights wrote. A play that could not mention a tax riot could still put the argument in a song, a proverb or a masquerade, and audiences learned to read the code.',
            'That habit of indirection did not disappear at independence. It is one reason Nigerian political drama so often works through allegory, festival form and satire rather than direct statement, and a student reading the post-colonial plays without the colonial censorship will miss half of what they are doing.',
        ],
    },
    'criticism-approaches-to-drama#3': {
        heading: 'The vocabulary you need',
        paras: [
            'Learn a working set of terms precisely: plot, story, action, beat, objective, obstacle, turning point, reversal, recognition, climax, resolution, exposition, subtext, aside, soliloquy, dramatic irony, stock character, type, stereotype, protagonist, antagonist, chorus, catharsis.',
            'Then use them to describe rather than to decorate. "Dramatic irony" is not a compliment; it names the gap between what the character knows and what the audience knows. A criticism that uses the terms accurately can be argued with, which is the whole point.',
        ],
    },
    'the-yoruba-travelling-theatre#3': {
        heading: 'The music as structure',
        paras: [
            'In travelling theatre the music is not an interval act. A song establishes the world, marks a time jump, comments on the action and gives the audience a way into the story. The band is on stage, the leader sings, and the company answers.',
            'Watch how the transition works: a spoken line becomes a phrase, the phrase becomes a melody, the melody becomes a chorus the audience already knows. That join is the form\u2019s signature, and it is the technique a modern Nigerian musical most needs to learn.',
        ],
    },
    'theatre-management-budget-and-marketing#3': {
        heading: 'Sponsorship without humiliation',
        paras: [
            'A sponsor buys an audience, a reputation or a photograph. Write one page that says what the audience is, what the sponsor\u2019s name will appear on, and what the money will pay for. Ask for a specific sum for a specific line item; "support the arts" is not a request.',
            'Deliver what you promised, in writing, with photographs, and thank the sponsor publicly. The second ask is always easier than the first, and the department\u2019s reputation for delivering is worth more than any single cheque.',
        ],
    },
    'costume-design-from-script-to-fitting#3': {
        heading: 'Colour under light',
        paras: [
            'Choose costume colours against the set and the lighting plan, not on a white page. A red dress under warm light reads orange; a dark green suit against a dark green wall disappears; a white shirt under a strong front light blooms and takes the face with it.',
            'Test the swatches under the actual lamps before the fabric is bought, and photograph them on a person, not flat. The costume is seen in movement, in light, from a distance, and that is the only test that counts.',
        ],
    },
    'speech-nigerian-english-on-stage#3': {
        heading: 'The microphone changes the rules',
        paras: [
            'A body microphone rewards intimacy and punishes projection: an actor who belts into a lavalier distorts, and an actor who whispers is heard in the back row. Learn the working distance - about a hand\u2019s width from the corner of the mouth - and keep the head turned towards the audience rather than down to the floor.',
            'Rehearse with the microphones on, at performance level, and let the operator ride the levels. A company that only meets its microphones at the dress rehearsal will spend the first performance listening to itself.',
        ],
    },
    'film-analysis-shot-cut-and-sound#3': {
        heading: 'The vocabulary, exactly',
        paras: [
            'Learn the terms so you can use them without hesitating: extreme long shot, long shot, medium long shot, medium shot, medium close-up, close-up, extreme close-up; high angle, low angle, eye level, overhead, Dutch angle; pan, tilt, track, dolly, crane, handheld, zoom.',
            'Then learn the editing terms: cut, dissolve, fade, wipe, match cut, jump cut, cross-cutting, montage, insert, reaction shot, long take. A shot list written in this vocabulary can be compared with another, which is what analysis requires.',
        ],
    },
    'ritual-mask-and-festival#3': {
        heading: 'Documentation as a discipline',
        paras: [
            'If you are studying a festival you can attend, prepare before you go: a permissions letter, a recording plan, a shot list of what you need (space, costume, instruments, audience), and questions for the organisers. A performance that lasts six hours will not wait for you to decide what to photograph.',
            'Record the frame, not just the highlight: the procession, the waiting, the drummers, the vendors, the children, the end. Theatre scholarship has been damaged by photographs of the mask and nothing else.',
        ],
    },
    'criticism-how-to-review-a-play#3': {
        heading: 'The paragraph that does the work',
        paras: [
            'Almost every good review has one paragraph that carries the argument: a description of a moment, followed by what it meant, followed by why it mattered. Write that paragraph first, then build the review around it. If you cannot write it, you do not yet have a review; you have notes.',
            'Keep your notebook open in the interval and write the moment down before you talk to anyone. The opinions of the person beside you are the fastest way to lose your own.',
        ],
    },
    'film-nollywood-a-critical-introduction#3': {
        heading: 'Sound, music and the Nigerian film',
        paras: [
            'Music carries more narrative weight in Nigerian popular film than in most cinema: it tells the audience how to feel about a character, warns of danger, marks a flashback and seals an ending. A scene watched without its score often loses the plot, which is itself an argument about how the film works.',
            'Sound is also the technical place where budgets show. Location noise, unrecorded dialogue and abrupt music edits are the marks of a fast shoot, and a critic should read them as conditions rather than as carelessness - while still saying when they damage the film.',
        ],
    },
    'pre-colonial-performance-in-nigeria#3': {
        heading: 'From performance to play',
        paras: [
            'The line from festival to written drama runs through adaptation, and the adaptations are the evidence. Rotimi\u2019s Kurunmi takes a historical episode and gives it a Greek shape; Soyinka\u2019s Death and the King\u2019s Horseman takes a colonial incident and a Yoruba metaphysical frame; Osofisan\u2019s festival plays take the form and turn its politics.',
            'Read one adaptation beside the tradition it draws on. Ask what was kept, what was changed, and what the change does to the argument. That comparison is the core of a Nigerian drama course.',
        ],
    },
    'theatre-history-greeks-to-the-globe#3': {
        heading: 'The repertoire as evidence',
        paras: [
            'What survives is not what was popular. We have seven plays by Sophocles out of more than a hundred, and none of the hundreds of Roman mimes that drew the crowds. The canon is an accident of copying, and a history that treats it as a list of the best plays is confusing survival with merit.',
            'Say so in your essays. "The surviving plays suggest" is a more honest sentence than "the Greeks believed", and it costs nothing except the habit of certainty.',
        ],
    },
    'post-colonial-festival-and-fringe#3': {
        heading: 'The short run and the long life',
        paras: [
            'A fringe production may play twice. That does not make it less serious; it makes the recording, the script, the photographs and the audience responses more important, because they are what survives.',
            'Film the show with two cameras if you can, from the back and from the side, with the sound taken from the desk. A company without a recording of its own work is a company that starts from nothing every year.',
        ],
    },
    'theatre-history-the-modern-stage#3': {
        heading: 'The Nigerian modern',
        paras: [
            'The modern stage did not arrive in Nigeria as a copy of Europe. It arrived through the church, the school, the travelling theatre and the university, and it produced its own modernism: Soyinka\u2019s total theatre, Rotimi\u2019s Yoruba tragedy, Osofisan\u2019s political musical, the festival play.',
            'Place a Nigerian play beside a European one of the same decade and the conversation is more interesting than either alone: both are asking what a stage is for after the war, after independence, after the cinema took the popular audience.',
        ],
    },
    'speech-breath-voice-articulation#3': {
        heading: 'Voice in a hall with no air conditioning',
        paras: [
            'Heat, dust and a generator change the voice. Drink water through the day, avoid iced drinks before a show, and warm up longer in the cold of an air-conditioned hall and less in the heat where the voice is already loose.',
            'When the hall has no sound system, projection is a technique of direction and support, not of shouting: speak past the audience to the back wall, use the consonants to carry, and let the body do the work the throat should not.',
        ],
    },
    'sound-design-system-plot-and-cue#3': {
        heading: 'Sound effects that convince',
        paras: [
            'A recorded effect convinces when it is layered and when it matches the space. Rain is a bed, a few close drops and a distant muffle; a market is voices at three distances. A single sound file played at one level reads as a sound effect, not as a world.',
            'Fade effects in and out rather than starting and stopping them, and keep a library organised by category with clear names. The cue you need at 11 p.m. is the one you can find in ten seconds.',
        ],
    },
    'song-design-for-the-stage#3': {
        heading: 'Rehearsing a number',
        paras: [
            'Rehearse a song in three passes: learn the notes and the words, learn the staging, then put them together slowly. Most student numbers fail because the company learned the choreography before it could sing the tune, and the singing never recovered.',
            'Then rehearse it with the band, with the microphones and in costume, before the technical rehearsal. A number that has never met its band is a number that will be conducted by panic on the first night.',
        ],
    },
    'wardrobe-the-plot-and-the-run#4': {
        heading: 'The costume store',
        paras: [
            'Store on hangers, not in bags: cloth needs air, and a bin bag is where costumes go to smell. Fold knits, hang tailoring, box shoes in pairs with the size written on the heel, and keep a labelled box for each production.',
            'Photograph every stored costume on a hanger against a plain wall and keep the photograph with the inventory. The next designer will choose from the photograph rather than from memory, and the store will finally be used.',
        ],
    },
    'makeup-for-film-and-television#3': {
        heading: 'Working with the actor',
        paras: [
            'Ask before you touch. Explain what you are doing, keep the actor facing a mirror where possible, and check in during a long application. A makeup chair is a vulnerable place, and an actor who is anxious about their face will perform badly.',
            'Know when to stop. The camera rewards a face that looks like a person; a makeup that announces itself has failed, however skilled the execution. The best compliment a film makeup artist gets is that nobody noticed.',
        ],
    },
    'church-school-and-concert#4': {
        heading: 'Teaching the form',
        paras: [
            'The concert is a useful form for a first-year class because it is small, cheap and complete: a song, a sketch, a moral and an audience. Ask students to write and perform one in a single week, with one prop and no set.',
            'Then ask them to write a second one for a different audience - a church, a school, a market - and compare. The exercise teaches audience analysis faster than any lecture, and it produces material a department can actually perform.',
        ],
    },
}

for (const guide of GUIDES) {
    for (const [key, section] of Object.entries(EXTRA_SECTIONS)) {
        if (key === guide.slug || key.startsWith(`${guide.slug}#`)) guide.sections.push(section)
    }
}

export const THEATRE_TITLES = [...CLASSIC_TEXTS, ...GUIDES]
