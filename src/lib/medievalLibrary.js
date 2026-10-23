/**
 * Medieval theatre shelf — the cycle plays, everyman and the first named
 * dramatist of the west, typeset as PDFs and hosted by ZikShare.
 *
 * ## What is here
 *
 * Seventeen play texts, in modern English, from the two public-domain
 * collections that Gutenberg actually holds:
 *
 * - *"Everyman" with other interludes, including eight miracle plays*, ed.
 *   Ernest Rhys (Everyman's Library, 1909): Everyman, four Wakefield pageants,
 *   two Chester pageants, the Coventry Nativity, two Cornish pageants, Bale's
 *   *God's Promises*, and the Cornish mummers' play of St George.
 * - *The Plays of Roswitha*, trans. Christopher St John (1923): the six plays of
 *   Hrotsvitha of Gandersheim, written in the 960s — the first plays written in
 *   Europe since antiquity, and the first by a woman.
 *
 * ## What is not here, and why
 *
 * The York cycle, the N-Town (Ludus Coventriae) cycle, *The Castle of
 * Perseverance* and *Mankind* survive only in Middle English, and no
 * public-domain modern English translation of them is free to host. They are
 * named on the library page rather than replaced with something else. See
 * `MEDIEVAL_NOT_AVAILABLE`.
 *
 * ## Dates
 *
 * Most of these plays are undated. The manuscript dates and the usual scholarly
 * ranges are given on the cards as ranges, never as a single confident year.
 */

import { MEDIEVAL_SHELF } from './medievalLibraryData.js'

export const MEDIEVAL_DOMAIN = 'Medieval Theatre'

/** The traditions the shelf is grouped by, in the order the shelf lists them. */
export const MEDIEVAL_TRADITIONS = [
    {
        name: 'Chester cycle',
        dates: 'c. 1400–1500',
        note: 'The Chester plays were performed at Whitsun by the city guilds, each company carrying its own pageant wagon. The manuscript was copied out in 1591–1607, after the plays had already been suppressed, which is why it survives at all.',
    },
    {
        name: 'Wakefield cycle',
        dates: 'c. 1425–1450',
        note: 'The Towneley manuscript, almost certainly from Wakefield. Five of its pageants are by one writer of genius, the Wakefield Master, who writes in a nine-line stanza and puts real Yorkshire shepherds, with real complaints, on stage.',
    },
    {
        name: 'Coventry cycle',
        dates: 'c. 1460–1500',
        note: 'Two pageants survive from Coventry, performed by the Shearmen and Tailors and the Weavers. The Shearmen and Tailors\' Nativity play contains the Coventry Carol, still sung every Christmas.',
    },
    {
        name: 'Cornish cycle',
        dates: 'c. 1400',
        note: 'The Ordinalia, three plays in Cornish on the Creation, the Passion and the Resurrection, performed at the plain-an-gwarry, the round playing place, in the Cornish villages. Cornish died out as a spoken language two centuries later, and the plays survive in a handful of manuscripts.',
    },
    {
        name: 'Morality plays',
        dates: 'c. 1400–1538',
        note: 'Allegory instead of scripture: a man meets the abstraction of what he has done. The morality stage is where English drama learned to build a character rather than a pageant, and Everyman is the one everybody still reads.',
    },
    {
        name: 'Hrotsvitha of Gandersheim',
        dates: 'c. 960–975',
        note: 'A canoness in a Saxon abbey wrote six plays in Latin prose, in imitation of Terence and against his morals. They are the first dramas written in Europe since the fall of Rome, and the first by a woman. Milton may have known of them; Europe did not read them until the nineteenth century.',
    },
]

const RHYS_EDITION = {
    translator: 'Modern English text, ed. Ernest Rhys',
    sourceEdition: '"Everyman" with other interludes (Everyman\'s Library, 1909)',
    sourceName: 'Project Gutenberg eBook #19481',
}

const ROSWITHA_EDITION = {
    translator: 'Christopher St John',
    sourceEdition: 'The Plays of Roswitha (1923)',
    sourceName: 'Project Gutenberg eBook #59770',
}

/** Everyman and the cycle plays, from the Everyman's Library volume. */
export const CYCLE_PLAYS = [
    {
        slug: 'everyman',
        title: 'Everyman',
        author: 'Anonymous',
        tradition: 'Morality plays',
        heading: 'EVERYMAN',
        dateLabel: 'c. 1495',
        kind: 'morality',
        ...RHYS_EDITION,
        synopsis:
            'God sends Death to fetch Everyman, who is not ready. Fellowship, Kindred, Cousin and Goods all promise to come with him and all find a reason not to. Knowledge takes him to Confession, and Good Deeds — who has been lying on the ground, too weak to stand — is the only companion who will go into the grave.',
        context:
            'The best known morality play in English, and one of the shortest plays in the language. It is a close translation of the Dutch Elckerlijc, printed at Delft around 1470; the English text was printed by John Skot around 1525 and performed by travelling companies for a century afterwards.',
        topics: ['Death', 'allegory', 'Good Deeds', 'morality', 'Dutch original'],
    },
    {
        slug: 'noahs-flood',
        title: "Noah's Flood",
        author: 'Chester cycle',
        tradition: 'Chester cycle',
        heading: 'THE CHESTER PAGEANT OF THE WATER-LEADERS AND DRAWERS OF THE DEE',
        dateLabel: 'c. 1400–1500',
        kind: 'mystery',
        ...RHYS_EDITION,
        synopsis:
            'God tells Noah to build an ark out of wood, and the guild of water-leaders and drawers of the Dee build it on stage, plank by plank, with Noah\'s measurements spoken aloud. The animals are loaded, the rain comes, the world drowns, and the dove returns with the olive leaf. Noah\'s wife refuses to come aboard until the water is at her knees.',
        context:
            'The Chester pageant of the Deluge, assigned to the Water-leaders and Drawers of the Dee — the men who worked the river — which is why the play talks about shipbuilding like a trade manual. It is one of the few medieval plays with a surviving guild attribution for every pageant.',
        topics: ['Noah', 'the Flood', 'ark', 'Chester', 'guild pageant'],
    },
    {
        slug: 'abraham-and-isaac',
        title: 'Abraham, Melchisedec and Isaac',
        author: 'Chester cycle',
        tradition: 'Chester cycle',
        heading: 'THE CHESTER PAGEANT OF THE BARBERS AND WAX-CHANDLERS REPRESENTING',
        dateLabel: 'c. 1400–1500',
        kind: 'mystery',
        ...RHYS_EDITION,
        synopsis:
            'Abraham meets Melchisedec after the battle of the kings; then God asks him for Isaac. The journey to the hill, the boy carrying the wood, his question about the lamb, the altar, the knife — and the angel that stops it. An Expositor steps forward at the end to explain that Isaac means Christ.',
        context:
            'Played by the Barbers and Wax-chandlers at Chester. The Expositor, a figure who appears in several Chester pageants to tell the audience what the story means, is one of the cycle\'s distinctive inventions: the guilds did not trust an allegory to explain itself.',
        topics: ['Abraham', 'Isaac', 'sacrifice', 'Chester', 'Expositor'],
    },
    {
        slug: 'second-shepherds-play',
        title: "The Second Shepherds' Play",
        author: 'The Wakefield Master',
        tradition: 'Wakefield cycle',
        heading: "THE WAKEFIELD SECOND SHEPHERDS' PLAY",
        dateLabel: 'c. 1425–1450',
        kind: 'mystery',
        ...RHYS_EDITION,
        synopsis:
            'Three shepherds on a freezing moor complain about the weather, the gentry and their wives. Mak arrives, a thief with a charm for stealing sheep, and at his cottage his wife Gill hides a stolen wether in the cradle and pretends she has just given birth. The shepherds come back, lift the blanket, find the sheep, and toss Mak in it. Then the angel sings, and they go to see a real child.',
        context:
            'The masterpiece of the Wakefield Master and the most anthologised medieval play after Everyman. It is the only pageant in the cycle that does not begin with scripture: the first two-thirds are a realistic Yorkshire comedy about sheep-stealing, written in the same nine-line stanza as the Nativity that follows.',
        topics: ['shepherds', 'Mak', 'comedy', 'Wakefield Master', 'Nativity'],
    },
    {
        slug: 'coventry-nativity',
        title: 'The Coventry Nativity Play',
        author: 'Coventry cycle',
        tradition: 'Coventry cycle',
        heading: 'THE COVENTRY NATIVITY PLAY OF THE COMPANY OF SHEARMEN AND TAILORS',
        dateLabel: 'c. 1460–1500',
        kind: 'mystery',
        ...RHYS_EDITION,
        synopsis:
            'Isaiah prophesies, Gabriel salutes Mary, Joseph suspects her and is reassured by an angel, and the child is born. The shepherds come with gifts and the Kings with gold, myrrh and frankincense; Herod rages, the soldiers kill the innocents, and the mothers of Bethlehem sing over their dead children.',
        context:
            'The Shearmen and Tailors\' pageant from Coventry, famous for the lullaby the women sing as the soldiers close in — the Coventry Carol, "Lully, lulla, thou little tiny child". The manuscript was destroyed in a fire in 1879 and survives from a single transcript made in 1534.',
        topics: ['Nativity', 'Herod', 'Coventry Carol', 'Magi', 'innocents'],
    },
    {
        slug: 'crucifixion',
        title: 'The Crucifixion',
        author: 'The Wakefield Master',
        tradition: 'Wakefield cycle',
        heading: 'THE WAKEFIELD MIRACLE-PLAY OF THE CRUCIFIXION',
        dateLabel: 'c. 1425–1450',
        kind: 'mystery',
        ...RHYS_EDITION,
        synopsis:
            'Four torturers are given the job of crucifying Christ, and they cannot do it. The cross is too short, the holes do not line up, the nails will not hold, and they pull his limbs out of joint with ropes while complaining about the work. They dice for his clothes. Longeus, the blind centurion, drives his spear into the body and the blood that runs down the shaft heals his sight.',
        context:
            'From the Towneley manuscript, and usually given to the Wakefield Master. Its horror is domestic: the soldiers are workmen doing a job badly, and the play makes the crucifixion happen through their incompetence and their small talk. It is the most performed of all the mystery pageants.',
        topics: ['Crucifixion', 'soldiers', 'Longeus', 'Wakefield Master', 'Passion'],
    },
    {
        slug: 'three-maries',
        title: 'The Three Maries',
        author: 'Cornish cycle',
        tradition: 'Cornish cycle',
        heading: 'THE CORNISH MYSTERY-PLAY OF THE THREE MARIES',
        dateLabel: 'c. 1400',
        kind: 'mystery',
        ...RHYS_EDITION,
        synopsis:
            'Mary Magdalene, Mary the mother of James, and Mary Salome come to the tomb at dawn with spices and find the stone rolled away. An angel tells them he is risen. Christ meets them in the garden in the guise of a gardener, and Mary Magdalene knows him when he says her name.',
        context:
            'From the Cornish Ordinalia, the three-play cycle on the Creation, Passion and Resurrection performed in the round at the plain-an-gwarry. The English version here is the Everyman\'s Library text, translated from Cornish; the stage directions describing the playing place are among the best evidence we have for how medieval theatre was staged.',
        topics: ['Resurrection', 'Mary Magdalene', 'Cornish', 'Ordinalia', 'garden'],
    },
    {
        slug: 'mary-magdalene',
        title: 'Mary Magdalene and the Apostles',
        author: 'Cornish cycle',
        tradition: 'Cornish cycle',
        heading: 'THE CORNISH MYSTERY-PLAY OF MARY MAGDALENE',
        dateLabel: 'c. 1400',
        kind: 'mystery',
        ...RHYS_EDITION,
        synopsis:
            'Mary Magdalene runs to the apostles with the news that she has seen the Lord, and they do not believe her. Thomas is the loudest of them. The scene is the invention of the resurrection appearance to Mary alone, and of the argument in the upper room about whether a woman\'s word counts as evidence.',
        context:
            'The continuation of the Cornish Resurrection play: the same manuscript, the same playing place, the same audience. The apostles\' disbelief is played as a real quarrel among men who have locked themselves in a room.',
        topics: ['Resurrection', 'Mary Magdalene', 'Thomas', 'Cornish', 'testimony'],
    },
    {
        slug: 'harrowing-of-hell',
        title: 'The Harrowing of Hell',
        author: 'The Wakefield Master',
        tradition: 'Wakefield cycle',
        heading: 'THE WAKEFIELD PAGEANT OF THE HARROWING OF HELL',
        dateLabel: 'c. 1425–1450',
        kind: 'mystery',
        ...RHYS_EDITION,
        synopsis:
            'Christ comes down to hell and demands the souls that belong to him. Satan and Beelzebub argue that they hold them lawfully and then find they cannot hold the door. Adam, Eve, the prophets and John the Baptist are led out, and the play ends with the devils complaining about the loss.',
        context:
            'The Harrowing of Hell was the most popular single episode in medieval drama, staged in every cycle and in the Cornish plays as well; this is the Wakefield version, with the Latin stage direction Extractio Animarum ab Inferno still in place. Its devils are comic, and meant to be.',
        topics: ['Harrowing of Hell', 'Satan', 'Adam', 'Wakefield', 'descent'],
    },
    {
        slug: 'gods-promises',
        title: "God's Promises",
        author: 'John Bale',
        tradition: 'Morality plays',
        heading: 'THE INTERLUDE OF "GOD\'S PROMISES"',
        dateLabel: '1538',
        kind: 'morality',
        ...RHYS_EDITION,
        synopsis:
            'The Heavenly Father brings Adam, Noah, Abraham, Moses, David and Isaiah on stage one after another, and each is given the same promise of a redeemer. Bale himself appears as the prolocutor to explain the Protestant reading, and the play ends with a long attack on the Pope as the Antichrist.',
        context:
            'Written in 1538, after the break with Rome, by a man who had been a Carmelite friar and became a Protestant propagandist. It is included in the volume and on this shelf as the end of the morality tradition, not its middle: the allegory has become an argument, and the stage has become a pulpit.',
        topics: ['Reformation', 'Bale', 'promise', 'interlude', 'propaganda'],
    },
    {
        slug: 'st-george-and-the-dragon',
        title: 'St George and the Dragon',
        author: 'Cornish folk play',
        tradition: 'Cornish cycle',
        heading: '"ST. GEORGE AND THE DRAGON"',
        dateLabel: 'recorded 19th century',
        kind: 'folk',
        ...RHYS_EDITION,
        synopsis:
            'A mummers\' play. The Turkish Knight challenges St George, they fight, one falls, and the Doctor is called to bring him back to life. Father Christmas, the King of Egypt and the Giant Turpin each take a turn; at the end the hat goes round and the audience is asked to pay.',
        context:
            'A Christmas guising play recorded in Cornwall in the nineteenth century and printed in this volume as an appendix. It is not a medieval text — it is what was left of one, carried by village players for four hundred years after the cycles were suppressed, with the saint, the dragon and the Doctor still in place.',
        topics: ['folk play', 'mummers', 'St George', 'Cornwall', 'survival'],
    },
]

/** Hrotsvitha's six plays, from the 1923 translation. */
export const ROSWITHA_PLAYS = [
    {
        slug: 'gallicanus',
        title: 'Gallicanus',
        author: 'Hrotsvitha of Gandersheim',
        tradition: 'Hrotsvitha of Gandersheim',
        heading: 'GALLICANUS',
        dateLabel: 'c. 960–975',
        kind: 'saint play',
        ...ROSWITHA_EDITION,
        synopsis:
            'Gallicanus, Constantine\'s commander, wants to marry the emperor\'s daughter Constance, who has vowed herself to Christ. She asks him to go and fight the Scythians first; he does, is beaten, and is saved by the prayers of the two almoners travelling with him. He comes back baptised and celibate, and is martyred under Julian.',
        context:
            'A two-part play with two casts, which is unusual for its date and suggests Hrotsvitha expected it read aloud rather than staged. It is the longest of the six and the only one with a battle in it.',
        topics: ['Constance', 'martyrdom', 'conversion', 'Hrotsvitha', 'Constantine'],
    },
    {
        slug: 'dulcitius',
        title: 'Dulcitius',
        author: 'Hrotsvitha of Gandersheim',
        tradition: 'Hrotsvitha of Gandersheim',
        heading: 'DULCITIUS',
        dateLabel: 'c. 960–975',
        kind: 'saint play',
        ...ROSWITHA_EDITION,
        synopsis:
            'The governor Dulcitius wants the three virgin sisters Agape, Chionia and Irena, and comes to their prison at night. In the dark he embraces the kitchen pots and pans instead, and emerges black with soot and grease, to the laughter of the whole court. The sisters are then burnt and shot, and go to their deaths arguing about which of them should die first.',
        context:
            'The funniest of the six and the most often performed today. Hrotsvitha takes Terence\'s comic machinery — the lustful old man, the clever servant — and turns it against the persecutor, which is exactly what her prefaces say she is doing in writing Christian plays in Terence\'s manner.',
        topics: ['Dulcitius', 'Agape', 'martyrdom', 'comedy', 'Terence'],
    },
    {
        slug: 'callimachus',
        title: 'Callimachus',
        author: 'Hrotsvitha of Gandersheim',
        tradition: 'Hrotsvitha of Gandersheim',
        heading: 'CALLIMACHUS',
        dateLabel: 'c. 960–975',
        kind: 'saint play',
        ...ROSWITHA_EDITION,
        synopsis:
            'Callimachus falls in love with Drusiana, a married woman who has converted him by her preaching. She prays for death rather than for his sin, and dies. He comes to her tomb to violate the body and is bitten by a serpent and killed; John the Apostle raises him, and he is converted by what he saw.',
        context:
            'The darkest of the six, and the one that shows how far Hrotsvitha is from the Roman comedy she imitates: the plot turns on a corpse and a snake. Medieval readers copied it anyway, and it survives in several manuscripts.',
        topics: ['Drusiana', 'John the Apostle', 'resurrection', 'Hrotsvitha', 'desire'],
    },
    {
        slug: 'abraham-hrotsvitha',
        title: 'Abraham',
        author: 'Hrotsvitha of Gandersheim',
        tradition: 'Hrotsvitha of Gandersheim',
        heading: 'ABRAHAM',
        dateLabel: 'c. 960–975',
        kind: 'saint play',
        ...ROSWITHA_EDITION,
        synopsis:
            'The hermit Abraham has brought up his niece Mary in a cell, and she runs away to a brothel. He goes after her disguised as a soldier, wins her back at the inn without once saying who he is, and takes her home. The reunion scene, in which she recognises him only when he weeps, is the finest thing Hrotsvitha wrote.',
        context:
            'The most human of the six: a play about an old man who loves a girl who has ruined herself, and has to be more cunning than she is. Its subject is repentance, but its method is Terentian comedy, and it works.',
        topics: ['Abraham', 'Mary', 'repentance', 'Hrotsvitha', 'disguise'],
    },
    {
        slug: 'paphnutius',
        title: 'Paphnutius',
        author: 'Hrotsvitha of Gandersheim',
        tradition: 'Hrotsvitha of Gandersheim',
        heading: 'PAPHNUTIUS',
        dateLabel: 'c. 960–975',
        kind: 'saint play',
        ...ROSWITHA_EDITION,
        synopsis:
            'The hermit Paphnutius is told in a vision that the holiest person in the city is an actor and the second is a prostitute. He goes to the courtesan Thais disguised as a lover, converts her, and shuts her in a cell; she burns her wealth in the market square and dies there. Antony sees her soul carried up.',
        context:
            'Hrotsvitha\'s most cited play, and the one that has been staged in modern times — it was performed in Paris in the 1890s and has been revived repeatedly since. The vision that opens it, in which a monk outranks an actor, is also a defence of actors.',
        topics: ['Thais', 'Paphnutius', 'conversion', 'Hrotsvitha', 'asceticism'],
    },
    {
        slug: 'sapientia',
        title: 'Sapientia',
        author: 'Hrotsvitha of Gandersheim',
        tradition: 'Hrotsvitha of Gandersheim',
        heading: 'SAPIENTIA',
        dateLabel: 'c. 960–975',
        kind: 'saint play',
        ...ROSWITHA_EDITION,
        synopsis:
            'Sapientia (Wisdom) brings her three daughters, Faith, Hope and Charity, to Rome, where the emperor Hadrian interrogates them one by one. Each answers with a sermon. They are tortured and killed; their mother buries them, prays over the bodies, and dies on the third day.',
        context:
            'The last of the six, and the one with the least plot and the most speech: three martyrdom scenes that are almost entirely debate. Hrotsvitha ends her book with a mother outliving her children, which is a strange and deliberate place to stop.',
        topics: ['Sapientia', 'martyrdom', 'Hadrian', 'Hrotsvitha', 'allegory'],
    },
]

export const MEDIEVAL_PLAYS = [...CYCLE_PLAYS, ...ROSWITHA_PLAYS]

/**
 * Plays that belong on this shelf and are not on it, with the reason. Printed on
 * the library page so the shelf never quietly pretends to be the whole corpus.
 */
export const MEDIEVAL_NOT_AVAILABLE = [
    {
        title: 'The York cycle',
        note: 'The largest surviving English cycle, 48 pageants played on wagons through York. It survives in the original 15th-century English, and no public-domain modern translation is free to reproduce.',
    },
    {
        title: 'The N-Town plays',
        note: 'The Ludus Coventriae manuscript, 41 pageants from East Anglia, including the Mary plays and the Passion. Gutenberg has the 1841 edition in the 15th-century spelling; there is no modern translation we can host.',
    },
    {
        title: 'The Castle of Perseverance',
        note: 'The longest morality play, and the one with the famous stage plan for acting in the round. It exists in a single manuscript in the original language, with no public-domain modern text.',
    },
    {
        title: 'Mankind',
        note: 'A short, savage morality in which Mankind, a labouring man with a spade, is pulled apart by Mischief and three vices. Original spelling only, and no free modern version.',
    },
    {
        title: "Hildegard of Bingen, Ordo Virtutum",
        note: 'The earliest surviving morality play by name, and the only one with music written by its author. The modern translations and editions are all in copyright.',
    },
    {
        title: 'Adam de la Halle, Le Jeu de Robin et Marion',
        note: 'The first French secular play, c. 1283, with its own songs. It is not on Gutenberg in English, and the published translations are copyrighted.',
    },
    {
        title: 'Lydgate, The Disguising at Hertford',
        note: 'A court mumming of 1427 by John Lydgate, in which husbands complain about their wives to the king. Gutenberg has it only in the 15th-century spelling, with no modern translation.',
    },
]

/**
 * Shape the library UI renders. Every card is a hosted PDF: nothing here opens
 * another website.
 */
export function toMedievalCard(play) {
    const built = MEDIEVAL_SHELF_BY_SLUG[play.slug]
    if (!built) {
        throw new Error(`${play.slug}: no PDF in the medieval shelf - run npm run medieval:build`)
    }

    const subtitle = `${built.translator} · PDF, ${built.pages} pages · free`

    return {
        id: `medieval-${play.slug}`,
        slug: play.slug,
        code: '',
        title: play.title,
        subtitle,
        author: play.author,
        tradition: play.tradition,
        translator: built.translator,
        sourceEdition: play.sourceEdition,
        sourceName: play.sourceName,
        year: null,
        dateLabel: play.dateLabel,
        kind: play.kind,
        body: play.synopsis,
        context: play.context,
        topics: play.topics,
        faculty: 'Faculty of Arts',
        department: 'Theatre & Film Studies',
        level: 'All levels',
        material_type: 'textbooks',
        domain: MEDIEVAL_DOMAIN,
        priceKobo: 0,
        is_free: true,
        download_path: built.download_path,
        external_url: null,
        page_count: built.pages,
        file_size_bytes: built.bytes,
        description: play.synopsis,
        is_official: true,
        isMedieval: true,
        isExternal: false,
        isBook: false,
        isFresherPdf: false,
        isDrama: false,
        isRoman: false,
    }
}

export function findMedievalPlayBySlug(slug) {
    return MEDIEVAL_PLAYS.find((play) => play.slug === slug) || null
}

export const MEDIEVAL_SHELF_BY_SLUG = Object.fromEntries(
    MEDIEVAL_SHELF.map((entry) => [entry.slug, entry])
)

/** e.g. "11 cycle plays and 6 plays by Hrotsvitha" — used in copy, never typed. */
export function medievalCounts() {
    return {
        cycle: CYCLE_PLAYS.length,
        hrotsvitha: ROSWITHA_PLAYS.length,
        total: MEDIEVAL_PLAYS.length,
    }
}
