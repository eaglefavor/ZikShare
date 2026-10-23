/**
 * Renaissance theatre shelf — the English stage from the Armada to the closing
 * of the theatres, typeset as PDFs and hosted by ZikShare.
 *
 * ## What is here
 *
 * Sixty-nine plays in three public-domain editions Gutenberg holds:
 *
 * - *The Complete Works of William Shakespeare* (Globe edition, Gutenberg
 *   #100): all thirty-eight plays, from *The Two Gentlemen of Verona* to
 *   *The Two Noble Kinsmen*.
 * - *The Chief Elizabethan Dramatists, excluding Shakespeare*, ed. W. A.
 *   Neilson (Houghton Mifflin, 1911; Gutenberg #77587): thirty plays by
 *   Lyly, Peele, Greene, Marlowe, Kyd, Chapman, Jonson, Dekker, Marston,
 *   Heywood, Beaumont, Fletcher, Webster, Middleton, Massinger, Ford and
 *   Shirley. The volume's glosses are printed at the end of each play.
 * - *Tamburlaine the Great, Part Two* in Dyce's edition (Gutenberg #1589),
 *   so the sequel stands beside the first part instead of being a gap.
 *
 * ## What is not here, and why
 *
 * Shakespeare's poems and sonnets are in #100 but they are not plays, so they
 * are not on this shelf. The plays that survive only in a corrupt or
 * original-spelling quarto, and the non-dramatic writers of the period, are
 * named in `RENAISSANCE_NOT_AVAILABLE` with the reason. Nothing is listed
 * there as a substitute for a card that opens nothing.
 *
 * ## Dates
 *
 * Elizabethan plays are almost never dated by their title-pages. Every date
 * below is the usual scholarly range for first performance, given as a range
 * and marked `c.` where it is a conjecture.
 */

import { RENAISSANCE_SHELF } from './renaissanceLibraryData.js'

export const RENAISSANCE_DOMAIN = 'Renaissance Theatre'

/**
 * The shelf's groups, in the order it lists them. Each group is an author or a
 * phase of one author's career, so a reader can find "Webster" without reading
 * sixty-nine cards.
 */
export const RENAISSANCE_GROUPS = [
    {
        name: 'Shakespeare: comedies',
        dates: 'c. 1590–1604',
        note: 'Twelve comedies, from the Plautine farce of *The Comedy of Errors* to the problem comedies written under James, in which the marriage at the end costs somebody something.',
    },
    {
        name: 'Shakespeare: histories',
        dates: 'c. 1591–1613',
        note: 'The two tetralogies and the two plays outside them. Eight of the ten were written in the 1590s, when the English chronicle play was the most popular form on the stage.',
    },
    {
        name: 'Shakespeare: tragedies',
        dates: 'c. 1591–1608',
        note: 'Eleven tragedies, from the Roman blood of *Titus Andronicus* to the late, cold tragedies written after the great four.',
    },
    {
        name: 'Shakespeare: romances and late plays',
        dates: 'c. 1608–1614',
        note: 'The last five plays: shipwreck, lost children, a statue that moves, and a masque of goddesses. Shakespeare wrote three of them with a collaborator.',
    },
    {
        name: 'The first Elizabethans',
        dates: 'c. 1585–1594',
        note: 'Lyly, Peele, Greene and Kyd: the generation that built the public stage before Marlowe and Shakespeare took it over. Lyly wrote for the boys\u2019 companies at court, the others for the open-air theatres.',
    },
    {
        name: 'Christopher Marlowe',
        dates: '1587–1593',
        note: 'Seven plays in six years, all of them in blank verse that nobody had heard before: a Scythian shepherd who conquers the world, a scholar who sells his soul, a Jew who poisons a convent, a king who loses his crown to his favourite.',
    },
    {
        name: 'George Chapman',
        dates: 'c. 1603–1604',
        note: 'Chapman translated Homer and wrote the French histories that Ben Jonson mocked and John Keats loved. *Bussy D\u2019Ambois* is his best-known tragedy.',
    },
    {
        name: 'Ben Jonson',
        dates: '1598–1610',
        note: 'Four plays from the first half of Jonson\u2019s career: the comedy that started the comedy of humours, the Roman tragedy that got him accused of treason, and the two great London comedies of greed.',
    },
    {
        name: 'Thomas Dekker',
        dates: '1599–1605',
        note: 'Three city plays by the most good-natured writer of the age: a shoemaker\u2019s holiday, and the two parts of a play about a reformed whore.',
    },
    {
        name: 'Thomas Heywood',
        dates: '1603',
        note: 'Heywood claimed to have had a hand in two hundred and twenty plays. One of them is still read, and it is this one.',
    },
    {
        name: 'John Marston and John Webster',
        dates: 'c. 1600–1604',
        note: 'Marston wrote *The Malcontent*; Webster supplied an induction and additions when the King\u2019s Men revived it. The two men are the darkest writers of the Jacobean stage, and this is where their work overlaps.',
    },
    {
        name: 'Beaumont and Fletcher',
        dates: 'c. 1607–1611',
        note: 'The most successful writing partnership in English after Shakespeare and Fletcher, and the plays that held the stage longest: the Folio of 1647 is the first collected edition of any English playwrights except Shakespeare and Jonson.',
    },
    {
        name: 'John Fletcher alone',
        dates: 'c. 1608–1621',
        note: 'Two plays Fletcher wrote without Beaumont, who retired from the stage around 1613 and died in 1616.',
    },
    {
        name: 'John Webster',
        dates: '1613–1614',
        note: 'Webster wrote slowly and little. *The Duchess of Malfi* is the one everybody knows; the shelf also holds his share of *The Malcontent*.',
    },
    {
        name: 'Thomas Middleton',
        dates: '1605–1622',
        note: 'Two plays from the sharpest of the London satirists: one a comedy of debt and coney-catching, the other a tragedy written with William Rowley.',
    },
    {
        name: 'Philip Massinger',
        dates: '1621–1622',
        note: 'Massinger took over Fletcher\u2019s company and his manner. *A New Way to Pay Old Debts* kept Sir Giles Overreach on the stage for two centuries.',
    },
    {
        name: 'John Ford',
        dates: 'c. 1625–1633',
        note: 'The Caroline tragedian of incest and endurance. *The Broken Heart* is his most controlled play, and the one least often staged.',
    },
    {
        name: 'James Shirley',
        dates: '1635–1641',
        note: 'The last professional playwright of the old stage. When the theatres closed in 1642 Shirley had written more than thirty plays; these are two of the best.',
    },
]

/* ── The editions ─────────────────────────────────────────────────────────── */

const SHAKESPEARE = {
    source: 100,
    author: 'William Shakespeare',
    translator: 'Globe edition text',
    sourceEdition: 'The Complete Works of William Shakespeare (Globe edition)',
    sourceName: 'Project Gutenberg eBook #100',
}

const NEILSON = {
    source: 77587,
    translator: 'W. A. Neilson (ed.)',
    sourceEdition: 'The Chief Elizabethan Dramatists, excluding Shakespeare (1911)',
    sourceName: 'Project Gutenberg eBook #77587',
}

const DYCE = {
    source: 1589,
    translator: 'Rev. Alexander Dyce (ed.)',
    sourceEdition: 'The Works of Christopher Marlowe, ed. Alexander Dyce',
    sourceName: 'Project Gutenberg eBook #1589',
}

/* ── Shakespeare ──────────────────────────────────────────────────────────── */

const COMEDIES = [
    {
        slug: 'alls-well-that-ends-well',
        title: "All's Well That Ends Well",
        heading: "ALL'S WELL THAT ENDS WELL",
        group: 'Shakespeare: comedies',
        dateLabel: 'c. 1604–05',
        kind: 'comedy',
        ...SHAKESPEARE,
        synopsis:
            "Helena, a physician's daughter, cures the King of France and is granted the husband she wants — Bertram, who runs to the wars rather than marry her. She follows him to Florence, takes a virgin's place in his bed in the dark, and wins him by a trick that audiences still argue about.",
        context:
            "One of the three 'problem comedies'. It ends in marriage, but the bridegroom has spent four acts being worthless and the last scene is a public hearing in which the dead appear to rise. The play survives only in the Folio of 1623.",
        topics: ['Bertram', 'Helena', 'problem comedy', 'Folio text', 'bed trick'],
    },
    {
        slug: 'as-you-like-it',
        title: 'As You Like It',
        heading: 'AS YOU LIKE IT',
        group: 'Shakespeare: comedies',
        dateLabel: 'c. 1599',
        kind: 'comedy',
        ...SHAKESPEARE,
        synopsis:
            'Rosalind is banished by her uncle, dresses as a boy, and flees to the Forest of Arden, where the man she loves is also hiding. Dressed as a boy she teaches him how to court her, and he does not notice who is teaching him.',
        context:
            "The most relaxed of the comedies, and the one with the speech about the seven ages of man. Arden is at once Warwickshire and the Ardennes; the play never settles which, and does not need to.",
        topics: ['Rosalind', 'Arden', 'disguise', 'Jaques', 'seven ages'],
    },
    {
        slug: 'comedy-of-errors',
        title: 'The Comedy of Errors',
        heading: 'THE COMEDY OF ERRORS',
        group: 'Shakespeare: comedies',
        dateLabel: 'c. 1594',
        kind: 'comedy',
        ...SHAKESPEARE,
        synopsis:
            'Two sets of identical twins, parted in a shipwreck, arrive in Ephesus on the same day. One Antipholus is taken for the other at every doorway, a wife shuts her husband out of his own house, and the town ends up in the street arguing about it.',
        context:
            "Shakespeare's shortest play, built on Plautus's Menaechmi and probably acted at Gray's Inn in 1594. It observes the classical unities almost exactly: one city, one day, one chain of mistakes.",
        topics: ['Plautus', 'twin farce', 'Ephesus', 'unities', 'shipwreck'],
    },
    {
        slug: 'loves-labours-lost',
        title: "Love's Labour's Lost",
        heading: "LOVE'S LABOUR'S LOST",
        group: 'Shakespeare: comedies',
        dateLabel: 'c. 1595',
        kind: 'comedy',
        ...SHAKESPEARE,
        synopsis:
            'The King of Navarre and three lords swear off women, food and sleep for three years of study. The Princess of France arrives on a diplomatic errand with three ladies, and the oath does not survive the first afternoon.',
        context:
            "The most word-drunk comedy Shakespeare wrote — puns, Latin, and a pageant of the Nine Worthies that collapses. It was the first play printed under his name, in the quarto of 1598, and it ends with a year of waiting instead of weddings.",
        topics: ['Navarre', 'oath', 'wordplay', 'Nine Worthies', '1598 quarto'],
    },
    {
        slug: 'measure-for-measure',
        title: 'Measure for Measure',
        heading: 'MEASURE FOR MEASURE',
        group: 'Shakespeare: comedies',
        dateLabel: '1604',
        kind: 'problem comedy',
        ...SHAKESPEARE,
        synopsis:
            'The Duke of Vienna hands the city to the puritan Angelo and stays behind dressed as a friar. Angelo condemns Claudio to death for fornication, then offers Claudio\u2019s sister Isabella a bargain: her brother\u2019s life for her body.',
        context:
            'A comedy that behaves like a tragedy, written in the same years as *Othello*. Its final scene gives a man who has abused his authority a wife, and gives nobody else an explanation.',
        topics: ['Angelo', 'Isabella', 'justice', 'Vienna', 'disguised duke'],
    },
    {
        slug: 'merchant-of-venice',
        title: 'The Merchant of Venice',
        heading: 'THE MERCHANT OF VENICE',
        group: 'Shakespeare: comedies',
        dateLabel: 'c. 1596–97',
        kind: 'comedy',
        ...SHAKESPEARE,
        synopsis:
            'Bassanio borrows three thousand ducats from Shylock on the security of Antonio\u2019s flesh. Portia, bound by her father\u2019s lottery of three caskets, wins the right husband and then arrives in the Venetian court dressed as a young doctor of law.',
        context:
            'The bond and Shylock\u2019s forced conversion are why the play is still argued over four centuries later. It is also the play that gave English the speech about the quality of mercy.',
        topics: ['Shylock', 'the bond', 'Portia', 'caskets', 'Venice'],
    },
    {
        slug: 'merry-wives-of-windsor',
        title: 'The Merry Wives of Windsor',
        heading: 'THE MERRY WIVES OF WINDSOR',
        group: 'Shakespeare: comedies',
        dateLabel: 'c. 1597',
        kind: 'comedy',
        ...SHAKESPEARE,
        synopsis:
            'Falstaff, short of money, writes the same love letter to two Windsor wives. They compare notes, and spend the play dumping him in a basket of dirty linen, dressing him as an old woman, and finally luring him into Windsor Forest dressed as a stag.',
        context:
            'The only comedy Shakespeare set in England in his own century, and the only one with Falstaff in it. Tradition says the Queen asked for a play showing Falstaff in love; the play itself is a farce with a middle-class household at the centre.',
        topics: ['Falstaff', 'Windsor', 'revenge comedy', 'Herne the Hunter', 'letters'],
    },
    {
        slug: 'a-midsummer-nights-dream',
        title: "A Midsummer Night's Dream",
        heading: "A MIDSUMMER NIGHT'S DREAM",
        group: 'Shakespeare: comedies',
        dateLabel: 'c. 1595',
        kind: 'comedy',
        ...SHAKESPEARE,
        synopsis:
            'Four young Athenians run into the woods outside the city, where the fairy king and queen are quarrelling over a changeling boy. A love potion goes on the wrong eyes, the queen falls in love with a weaver wearing an ass\u2019s head, and a company of craftsmen rehearse a play about Pyramus and Thisbe.',
        context:
            'The play that supplies most of the world\u2019s images of fairies, and the one in which the mechanicals\u2019 performance at the end is funnier than anything in the plot. Puck\u2019s epilogue asks the audience to think it all a dream.',
        topics: ['Oberon', 'Titania', 'Puck', 'Bottom', 'love potion'],
    },
    {
        slug: 'much-ado-about-nothing',
        title: 'Much Ado About Nothing',
        heading: 'MUCH ADO ABOUT NOTHING',
        group: 'Shakespeare: comedies',
        dateLabel: 'c. 1598',
        kind: 'comedy',
        ...SHAKESPEARE,
        synopsis:
            'Benedick and Beatrice insult each other in set pieces until their friends trick each of them into believing the other is dying of love. Beside them, Claudio is deceived into jilting Hero at the altar, and the comedy has to be rescued by a friar and a constable.',
        context:
            'The best comic dialogue Shakespeare wrote, and one of the darkest plots he put in a comedy. Dogberry and Verges, the watch, are the first English policemen on stage.',
        topics: ['Beatrice', 'Benedick', 'Claudio', 'Dogberry', 'slander'],
    },
    {
        slug: 'the-taming-of-the-shrew',
        title: 'The Taming of the Shrew',
        heading: 'THE TAMING OF THE SHREW',
        group: 'Shakespeare: comedies',
        dateLabel: 'c. 1590–91',
        kind: 'comedy',
        ...SHAKESPEARE,
        synopsis:
            'Baptista will not marry off his younger daughter Bianca until somebody takes Katherine, the elder, who terrifies the town. Petruchio arrives from Verona, marries her for her dowry, and sets about starving, sleeplessness and contradiction until she agrees with him about everything.',
        context:
            'A frame play: a drunkard is dressed as a lord and watches it performed. The question of whether the last speech is a submission or a private joke is the oldest argument in Shakespeare criticism.',
        topics: ['Petruchio', 'Katherine', 'induction', 'Padua', 'marriage'],
    },
    {
        slug: 'twelfth-night',
        title: 'Twelfth Night',
        heading: 'TWELFTH NIGHT; OR, WHAT YOU WILL',
        group: 'Shakespeare: comedies',
        dateLabel: 'c. 1601',
        kind: 'comedy',
        ...SHAKESPEARE,
        synopsis:
            'Viola is shipwrecked in Illyria, dresses as a boy called Cesario, and enters the service of Duke Orsino, who sends her to woo Olivia for him. Olivia falls in love with the messenger; Viola\u2019s twin brother turns up alive; and in the subplot Malvolio is tricked into yellow stockings and a dark room.',
        context:
            'The last of the great Elizabethan comedies, and the one with the most music in it. Its title is the twelfth night of Christmas, the end of the revels, and the play keeps the sadness of the morning after.',
        topics: ['Viola', 'Orsino', 'Olivia', 'Malvolio', 'Illyria'],
    },
    {
        slug: 'the-two-gentlemen-of-verona',
        title: 'The Two Gentlemen of Verona',
        heading: 'THE TWO GENTLEMEN OF VERONA',
        group: 'Shakespeare: comedies',
        dateLabel: 'c. 1590–91',
        kind: 'comedy',
        ...SHAKESPEARE,
        synopsis:
            'Valentine goes to Milan and falls in love with Silvia; Proteus, his closest friend, follows and immediately betrays him. Julia, the woman Proteus left behind, dresses as a page and watches the whole thing.',
        context:
            "Probably Shakespeare's first comedy, and the first play in English in which a girl dresses as a boy to follow a man. It contains the two lines about a man's love being 'more than a woman's' that every production has to decide what to do with.",
        topics: ['Proteus', 'Valentine', 'Julia', 'cross-dressing', 'friendship'],
    },
]

const HISTORIES = [
    {
        slug: 'henry-iv-part-1',
        title: 'Henry IV, Part One',
        heading: 'THE FIRST PART OF KING HENRY THE FOURTH',
        group: 'Shakespeare: histories',
        dateLabel: 'c. 1596–97',
        kind: 'history',
        ...SHAKESPEARE,
        synopsis:
            'The king is beset by a rebellion in Wales and the north, led by his former ally Hotspur. His son Hal spends his time in a tavern in Eastcheap with Falstaff, and the play carries both worlds until they meet on the field at Shrewsbury.',
        context:
            "The most popular play of Shakespeare's lifetime — it went through six quartos before the Folio. Falstaff is the reason: a coward, a liar, a thief, and the funniest character in English drama.",
        topics: ['Falstaff', 'Hotspur', 'Hal', 'Shrewsbury', 'rebellion'],
    },
    {
        slug: 'henry-iv-part-2',
        title: 'Henry IV, Part Two',
        heading: 'THE SECOND PART OF KING HENRY THE FOURTH',
        group: 'Shakespeare: histories',
        dateLabel: 'c. 1597–98',
        kind: 'history',
        ...SHAKESPEARE,
        synopsis:
            'The rebellion is dying and so is the king. Falstaff recruits a ragged company in Gloucestershire, halts a lawsuit with a joke, and rides to London expecting the world when Hal becomes king. What he gets is three words of rejection in the street.',
        context:
            'The saddest history Shakespeare wrote, and the one in which the comedy and the state are most clearly the same story. The rejection of Falstaff is followed by the epilogue promising a third part that Shakespeare never wrote.',
        topics: ['Falstaff', 'rejection', 'Gloucestershire', 'Hal', 'death of the king'],
    },
    {
        slug: 'henry-v',
        title: 'Henry V',
        heading: 'THE LIFE OF KING HENRY THE FIFTH',
        group: 'Shakespeare: histories',
        dateLabel: '1599',
        kind: 'history',
        ...SHAKESPEARE,
        synopsis:
            'The new king claims the crown of France, sails with an exhausted army, and wins at Agincourt against impossible odds. Before that he has to get through the Southampton plot, a night walking disguised among his own soldiers, and a courtship conducted in broken French.',
        context:
            'Written in 1599, in the year the Globe opened, and written to be acted with almost no props — the Chorus has to ask the audience to make the armies. The play swings between national celebration and the hanging of Bardolph.',
        topics: ['Agincourt', 'Chorus', 'Globe theatre', 'rejection of Falstaff', 'France'],
    },
    {
        slug: 'henry-vi-part-1',
        title: 'Henry VI, Part One',
        heading: 'THE FIRST PART OF HENRY THE SIXTH',
        group: 'Shakespeare: histories',
        dateLabel: 'c. 1591',
        kind: 'history',
        ...SHAKESPEARE,
        synopsis:
            'Henry V is dead and his infant son inherits France. Talbot holds out in Orléans against the French, who are led by a peasant girl called Joan la Pucelle; in London, the lords begin to argue in a garden and pick red and white roses.',
        context:
            'The earliest of the histories, and probably the first play Shakespeare had a hand in at all. The Temple Garden scene invents the Wars of the Roses on stage, and the English leave France by the end.',
        topics: ['Joan of Arc', 'Talbot', 'Wars of the Roses', 'Orléans', 'Temple Garden'],
    },
    {
        slug: 'henry-vi-part-2',
        title: 'Henry VI, Part Two',
        heading: 'THE SECOND PART OF KING HENRY THE SIXTH',
        group: 'Shakespeare: histories',
        dateLabel: 'c. 1591',
        kind: 'history',
        ...SHAKESPEARE,
        synopsis:
            'The court that had been arguing is now two parties. Gloucester, the last honest man around the king, is destroyed by his wife\u2019s ambition and his enemies; York returns from Ireland with an army; and the Commons rise under Jack Cade, who wants to kill all the lawyers.',
        context:
            "The play with the most social range in Shakespeare: a duke's trial, a peasant revolt, and a scene of a man pretending to be dead so he can see what people say about his corpse. Shakespeare's co-author for the Henry VI plays was probably Christopher Marlowe.",
        topics: ['Cade\u2019s rebellion', 'Gloucester', 'York', 'civil war', 'Commons'],
    },
    {
        slug: 'henry-vi-part-3',
        title: 'Henry VI, Part Three',
        heading: 'THE THIRD PART OF KING HENRY THE SIXTH',
        group: 'Shakespeare: histories',
        dateLabel: 'c. 1591',
        kind: 'history',
        ...SHAKESPEARE,
        synopsis:
            'The wars are now open. York is killed on the battlefield by Margaret, his son Richmond is hunted, and the crown changes hands four times. By the end a butcher king has stabbed a boy in a tower and the play has arrived at the beginning of Richard III.',
        context:
            'The longest of the three parts and the bloodiest: Shakespeare\u2019s first sustained tragedy of civil war, and the play that ends with the Yorkist victory. Its final act sets up Richard III and its imagery of butchery runs through both.',
        topics: ['civil war', 'Richard of Gloucester', 'Margaret', 'Wakefield', 'Tewkesbury'],
    },
    {
        slug: 'henry-viii',
        title: 'Henry VIII',
        heading: 'KING HENRY THE EIGHTH',
        group: 'Shakespeare: histories',
        dateLabel: '1613',
        kind: 'history',
        ...SHAKESPEARE,
        synopsis:
            'The fall of Buckingham, the fall of Wolsey, the king\u2019s marriage to Anne Boleyn and the birth of the princess Elizabeth. It is a play of pageants and depositions: the great men of the court are walked to the block and the crown passes to a baby.',
        context:
            'Shakespeare\u2019s last history, written with John Fletcher. A cannon fired at its first performance burned the Globe to the ground in 1613. Unlike every other history on this shelf, it is built around private conscience rather than war.',
        topics: ['Wolsey', 'Anne Boleyn', 'Globe fire', 'Fletcher', 'pageantry'],
    },
    {
        slug: 'king-john',
        title: 'King John',
        heading: 'THE LIFE AND DEATH OF KING JOHN',
        group: 'Shakespeare: histories',
        dateLabel: 'c. 1596',
        kind: 'history',
        ...SHAKESPEARE,
        synopsis:
            'John holds the crown against the claim of his nephew Arthur and the enmity of France and the Pope. Constance and her ally Philip of France besiege Angiers; Arthur is captured and dies falling from a wall; and the king is finally poisoned by a monk at Swinstead Abbey.',
        context:
            'The history with the least to do with the Tudors, and the one with the most talk about royal legitimacy. It is the source of the speech beginning \u2018Mad world, mad kings, mad composition!\u2019',
        topics: ['King John', 'Arthur', 'legitimacy', 'Angiers', 'Swineshead'],
    },
    {
        slug: 'richard-ii',
        title: 'Richard II',
        heading: 'THE LIFE AND DEATH OF KING RICHARD THE SECOND',
        group: 'Shakespeare: histories',
        dateLabel: 'c. 1595',
        kind: 'history',
        ...SHAKESPEARE,
        synopsis:
            'Richard banishes Bolingbroke and seizes his inheritance. Bolingbroke returns while the king is in Ireland, and the crown is surrendered in public at Flint Castle. Richard is murdered in Pomfret Castle with nobody at hand but a groom.',
        context:
            'The first play of the second tetralogy, and the only Shakespeare history written entirely in verse. Its deposition scene was cut from early editions; the Earl of Essex\u2019s faction paid for a performance of it on the eve of their rebellion in 1601.',
        topics: ['deposition', 'Bolingbroke', 'Flint Castle', 'Essex rebellion', 'verse'],
    },
    {
        slug: 'richard-iii',
        title: 'Richard III',
        heading: 'KING RICHARD THE THIRD',
        group: 'Shakespeare: histories',
        dateLabel: 'c. 1592–93',
        kind: 'history',
        ...SHAKESPEARE,
        synopsis:
            'Richard, Duke of Gloucester, kills his way to the crown: his brother Clarence in the Tower, the two princes, his wife, and anyone who gets between him and the throne. By the last act his mother will not curse him and his own army is held together by money.',
        context:
            'The most popular history of the eighteenth and nineteenth centuries, and the source of the stage \u2018Richard\u2019 — hunchback, confiding, charming. Half of what the world believes about the historical Richard comes from this play.',
        topics: ['Machiavel', 'the princes', 'Bosworth', 'villain-hero', 'Tudor myth'],
    },
]

export const SHAKESPEARE_TRAGEDIES = [
    {
        slug: 'antony-and-cleopatra',
        title: 'Antony and Cleopatra',
        heading: 'THE TRAGEDY OF ANTONY AND CLEOPATRA',
        group: 'Shakespeare: tragedies',
        dateLabel: 'c. 1606–07',
        kind: 'tragedy',
        ...SHAKESPEARE,
        synopsis:
            'Antony has one Roman duty and one Egyptian love. He marries Octavia for politics, goes back to Cleopatra, loses the sea fight at Actium because Cleopatra\u2019s ships flee, and dies badly in her arms before she kills herself with an asp to avoid being shown in Octavius\u2019s triumph.',
        context:
            'The most expansive tragedy Shakespeare wrote: forty-two scenes, three continents, and a language that moves between the Roman and the Egyptian without warning. The Folio text is the only text, and it is missing the stage directions for the final scene.',
        topics: ['Actium', 'Cleopatra', 'Rome and Egypt', 'asp', 'Octavius'],
    },
    {
        slug: 'coriolanus',
        title: 'Coriolanus',
        heading: 'THE TRAGEDY OF CORIOLANUS',
        group: 'Shakespeare: tragedies',
        dateLabel: 'c. 1608–09',
        kind: 'tragedy',
        ...SHAKESPEARE,
        synopsis:
            'Caius Marcius wins the battle of Corioli and comes home to be consul. He cannot ask the citizens for their votes without insulting them, is banished, and joins the Volscian army outside Rome. His mother\u2019s plea in front of the gates is what destroys him.',
        context:
            'The most political of the tragedies, and the one least interested in interior life: almost every scene is a public confrontation about who has the right to speak. It is the last of the Roman plays and the coldest.',
        topics: ['Corioli', 'the tribunes', 'banishment', 'Volumnia', 'populism'],
    },
    {
        slug: 'hamlet',
        title: 'Hamlet',
        heading: 'THE TRAGEDY OF HAMLET, PRINCE OF DENMARK',
        group: 'Shakespeare: tragedies',
        dateLabel: 'c. 1600–01',
        kind: 'tragedy',
        ...SHAKESPEARE,
        synopsis:
            'The ghost of Hamlet\u2019s father tells him he was murdered by his brother, who has now married the queen and taken the crown. Hamlet stages a play to test the story, kills the wrong man behind a curtain, is sent to England, comes back, and kills everyone in a fencing match.',
        context:
            'The most discussed work in English, and the play in which the hero spends four acts refusing to do the one thing the plot requires. It survives in three texts that differ substantially: the second quarto, the first folio, and a short 1603 quarto.',
        topics: ['the ghost', 'delay', 'Elsinore', 'mousetrap', 'madness'],
    },
    {
        slug: 'julius-caesar',
        title: 'Julius Caesar',
        heading: 'THE TRAGEDY OF JULIUS CAESAR',
        group: 'Shakespeare: tragedies',
        dateLabel: '1599',
        kind: 'tragedy',
        ...SHAKESPEARE,
        synopsis:
            'Cassius persuades Brutus that Caesar must die for the republic. The conspirators stab him in the Capitol, Brutus speaks over the body, and Mark Antony speaks after him and turns the city into a riot with one funeral oration.',
        context:
            'The first of the Roman tragedies and the one with the most stage history: it was the play Orson Welles set in fascist Italy and the play an entire American touring company performed in 1937. Caesar dies halfway through and the play carries on without him.',
        topics: ['Brutus', 'Cassius', 'Mark Antony', 'Ides of March', 'republic'],
    },
    {
        slug: 'king-lear',
        title: 'King Lear',
        heading: 'THE TRAGEDY OF KING LEAR',
        group: 'Shakespeare: tragedies',
        dateLabel: '1605–06',
        kind: 'tragedy',
        ...SHAKESPEARE,
        synopsis:
            'Lear divides his kingdom between the two daughters who flatter him and disowns the one who does not. He keeps a hundred knights, loses them, and is turned out into a storm on the heath. The subplot gives Gloucester two sons and a pair of eyes.',
        context:
            'Performed at court at Christmas 1606 and printed in 1608 in a text that differs from the Folio by about three hundred lines. It was played for two centuries only in Nahum Tate\u2019s version, where Cordelia lives and marries Edgar.',
        topics: ['the heath', 'Cordelia', 'Gloucester', 'Tate\u2019s version', 'two texts'],
    },
    {
        slug: 'macbeth',
        title: 'Macbeth',
        heading: 'THE TRAGEDY OF MACBETH',
        group: 'Shakespeare: tragedies',
        dateLabel: '1606',
        kind: 'tragedy',
        ...SHAKESPEARE,
        synopsis:
            'Three witches greet Macbeth with a title and a prophecy. He kills the king, takes the crown, and then kills to keep it — Banquo, the wife and children of Macduff — until the woods of Birnam come up the hill and his own prophecy turns inside out.',
        context:
            "Shakespeare's shortest tragedy, written soon after the Gunpowder Plot and full of the language of equivocation. The surviving text is unusually short and includes material generally thought to be by Thomas Middleton.",
        topics: ['witches', 'regicide', 'Birnam Wood', 'equivocation', 'Middleton'],
    },
    {
        slug: 'othello',
        title: 'Othello',
        heading: 'THE TRAGEDY OF OTHELLO, THE MOOR OF VENICE',
        group: 'Shakespeare: tragedies',
        dateLabel: 'c. 1603–04',
        kind: 'tragedy',
        ...SHAKESPEARE,
        synopsis:
            'Othello passes over Cassio for promotion and Iago, who has been passed over himself, begins to destroy him. In a single night of suggestion Iago turns Othello\u2019s marriage into a certainty of adultery, and Othello smothers Desdemona in her bed.',
        context:
            'The most concentrated of the tragedies: almost every scene is in a street or a room in Cyprus, and almost all of the action is talk. Iago has more lines than Othello, and no motive that survives scrutiny.',
        topics: ['Iago', 'Desdemona', 'jealousy', 'Cyprus', 'the handkerchief'],
    },
    {
        slug: 'romeo-and-juliet',
        title: 'Romeo and Juliet',
        heading: 'THE TRAGEDY OF ROMEO AND JULIET',
        group: 'Shakespeare: tragedies',
        dateLabel: 'c. 1595–96',
        kind: 'tragedy',
        ...SHAKESPEARE,
        synopsis:
            'Two teenagers from feuding Veronese families meet at a party, marry the next day, and are separated by a street fight. The friar\u2019s plan for Juliet to feign death fails because the letter never arrives, and both of them die in the tomb within minutes of each other.',
        context:
            'Shakespeare\u2019s first great tragedy of love, and the play that taught the English stage how to write about young desire. The 1599 second quarto is about eight hundred lines longer than the first and is the foundation of every modern text.',
        topics: ['Verona', 'the balcony', 'feud', 'the tomb', 'first love'],
    },
    {
        slug: 'timon-of-athens',
        title: 'Timon of Athens',
        heading: 'THE LIFE OF TIMON OF ATHENS',
        group: 'Shakespeare: tragedies',
        dateLabel: 'c. 1605–08',
        kind: 'tragedy',
        ...SHAKESPEARE,
        synopsis:
            'Timon gives his fortune away to every flatterer in Athens until the creditors call. When nobody will lend him money he invites his false friends to a banquet of stones and water, curses the city, and goes to live in a cave by the sea.',
        context:
            'The most unfinished play in the Folio: scenes break off mid-argument, a character called the Poet appears twice for no reason, and the ending is a tomb and an epitaph. It was almost certainly written with Thomas Middleton.',
        topics: ['misanthrope', 'debt', 'Athens', 'banquet', 'collaboration'],
    },
    {
        slug: 'titus-andronicus',
        title: 'Titus Andronicus',
        heading: 'THE TRAGEDY OF TITUS ANDRONICUS',
        group: 'Shakespeare: tragedies',
        dateLabel: 'c. 1591–93',
        kind: 'tragedy',
        ...SHAKESPEARE,
        synopsis:
            'Titus returns from the Gothic wars with a captive queen who becomes empress and takes revenge on his family: rape, mutilation, and two heads in a dish. Titus goes mad, then pretends to be mad, and serves the empress her own sons in a pie.',
        context:
            "Shakespeare's earliest tragedy and the most violent play in the canon. It was enormously popular in the 1590s, disliked in the eighteenth century, and restored to the repertory by Peter Brook in 1955.",
        topics: ['revenge', 'Rome', 'Lavinia', 'Aaron', 'the pie'],
    },
    {
        slug: 'troilus-and-cressida',
        title: 'Troilus and Cressida',
        heading: 'TROILUS AND CRESSIDA',
        group: 'Shakespeare: tragedies',
        dateLabel: 'c. 1601–02',
        kind: 'problem play',
        ...SHAKESPEARE,
        synopsis:
            'In the seventh year of the siege of Troy, Troilus loves Cressida and Cressida is traded to the Greeks for a prisoner. The war meanwhile is conducted by men making speeches about honour, and Achilles sulks in his tent until Hector is killed.',
        context:
            'The play that refuses to be a comedy or a tragedy, and the one whose epilogue promises a sequel that does not exist. Its tone — disgusted, brilliant, unfailingly obscene — is unlike anything else in the canon.',
        topics: ['Troy', 'Cressida', 'Achilles', 'Hector', 'degradation'],
    },
]

export const SHAKESPEARE_LATE = [
    {
        slug: 'cymbeline',
        title: 'Cymbeline',
        heading: 'CYMBELINE',
        group: 'Shakespeare: romances and late plays',
        dateLabel: 'c. 1609–10',
        kind: 'romance',
        ...SHAKESPEARE,
        synopsis:
            'Imogen marries Posthumus against her father\u2019s will; Posthumus bets a Roman that his wife cannot be seduced, and is tricked into believing she can. She flees disguised as a boy, meets her brothers in a cave in Wales, and the last scene untangles twenty years of lost identities.',
        context:
            'The roman with the most plot and the least explanation: a headless body, a sleeping potion, a prophecy, and a god descending to read out the solution. It is classed as a tragedy in the Folio and has been called a comedy ever since.',
        topics: ['Imogen', 'Wales', 'lost heirs', 'Jupiter', 'disguise'],
    },
    {
        slug: 'pericles',
        title: 'Pericles, Prince of Tyre',
        heading: 'PERICLES, PRINCE OF TYRE',
        group: 'Shakespeare: romances and late plays',
        dateLabel: 'c. 1607–08',
        kind: 'romance',
        ...SHAKESPEARE,
        synopsis:
            'Pericles solves a riddle, flees a king, is shipwrecked, loses his wife at sea and his daughter to pirates, and spends fourteen years believing both are dead. He is reunited with Marina in a scene that is almost entirely a monologue.',
        context:
            'The first of the late romances, narrated by a poet called Gower and written with a collaborator, probably George Wilkins. It was left out of the Folio, so it survives only in a poor 1609 quarto and a 1619 reprint.',
        topics: ['shipwreck', 'Marina', 'Gower', 'Tyre', 'reunion'],
    },
    {
        slug: 'the-tempest',
        title: 'The Tempest',
        heading: 'THE TEMPEST',
        group: 'Shakespeare: romances and late plays',
        dateLabel: '1610–11',
        kind: 'romance',
        ...SHAKESPEARE,
        synopsis:
            'Prospero, exiled duke and master of the island\u2019s spirits, raises a storm to wreck his brother\u2019s ship. The court party is scattered, Ferdinand falls in love with Miranda, and Caliban and two drunken servants plot a rebellion that collapses in a gutter.',
        context:
            'The last play Shakespeare wrote alone, and the only one with an almost unbroken observation of the classical unities. Its language of discovery comes from the accounts of the Sea Venture, wrecked in Bermuda in 1609.',
        topics: ['Prospero', 'Caliban', 'Ariel', 'the island', 'masque'],
    },
    {
        slug: 'the-two-noble-kinsmen',
        title: 'The Two Noble Kinsmen',
        heading: 'THE TWO NOBLE KINSMEN',
        group: 'Shakespeare: romances and late plays',
        dateLabel: 'c. 1613–14',
        kind: 'romance',
        ...SHAKESPEARE,
        synopsis:
            'Two Theban cousins, captured at war, fall in love with the same Athenian princess while one is in prison and the other in exile. They fight for her in a tournament, and the winner is thrown from his horse before he can claim her.',
        context:
            'Shakespeare\u2019s last play, written with John Fletcher and based on Chaucer\u2019s \u2018Knight\u2019s Tale\u2019. It was not included in the Folio and first appeared in a quarto of 1634, which names the two authors on the title page.',
        topics: ['Chaucer', 'Fletcher', 'friendship', 'tournament', 'Athens'],
    },
    {
        slug: 'the-winters-tale',
        title: "The Winter's Tale",
        heading: "THE WINTER'S TALE",
        group: 'Shakespeare: romances and late plays',
        dateLabel: 'c. 1610–11',
        kind: 'romance',
        ...SHAKESPEARE,
        synopsis:
            'Leontes accuses his pregnant wife of adultery, imprisons her, and orders his baby daughter left on a beach in Bohemia. Sixteen years pass in a single line, a bear eats a courtier, a sheep-shearing turns into a courtship, and a statue comes down from its pedestal.',
        context:
            'The romance with the most violent tonal jumps in the canon, and the one that breaks the rule of time most openly. Its final scene is the most moving piece of staging in the late plays, and it happens in silence.',
        topics: ['jealousy', 'Bohemia', 'the bear', 'the statue', 'Time as chorus'],
    },
]

/* ── The Elizabethans, before Marlowe ─────────────────────────────────────── */

export const FIRST_ELIZABETHANS = [
    {
        slug: 'endymion',
        title: 'Endymion, the Man in the Moon',
        heading: 'ENDYMION, THE MAN IN THE MOON',
        group: 'The first Elizabethans',
        author: 'John Lyly',
        dateLabel: 'c. 1588',
        kind: 'court comedy',
        ...NEILSON,
        synopsis:
            'Endymion loves the moon and sleeps under a spell for twenty years; Cynthia, the moon-queen, can wake him with a kiss. Around the allegory, Sir Tophas brags, page boys swap insults, and the court of Cynthia debates whether the moon is worth loving.',
        context:
            'Lyly wrote for the boys\u2019 companies and for the court; this play was acted before Elizabeth at Greenwich. Its prose style — balanced, alliterative, endlessly punning — was the most imitated in England until Shakespeare\u2019s blank verse displaced it.',
        topics: ['Cynthia', 'allegory', 'Elizabethan court', 'euphuism', 'moon'],
    },
    {
        slug: 'the-old-wives-tale',
        title: 'The Old Wives\u2019 Tale',
        heading: 'THE OLD WIVES TALE',
        group: 'The first Elizabethans',
        author: 'George Peele',
        dateLabel: 'c. 1590',
        kind: 'satire',
        ...NEILSON,
        synopsis:
            'A group of Londoners lost in the woods meet an old woman who tells them a tale: a princess stolen by a bear, a wandering knight, a magic sword, and a head that speaks warnings. The audience is asked to take it as a winter\u2019s story and not to expect sense.',
        context:
            'A parody of the romances that were the staple of the 1580s, and a forerunner of *The Knight of the Burning Pestle* and of the induction in *The Taming of the Shrew*. It is the only play of Peele\u2019s that keeps the stage.',
        topics: ['folk tale', 'romance parody', 'Old Wife', 'Eumenides', 'the bear'],
    },
    {
        slug: 'friar-bacon-and-friar-bungay',
        title: 'Friar Bacon and Friar Bungay',
        heading: 'THE HONOURABLE HISTORY OF FRIAR BACON AND FRIAR BUNGAY',
        group: 'The first Elizabethans',
        author: 'Robert Greene',
        dateLabel: 'c. 1589–92',
        kind: 'romantic comedy',
        ...NEILSON,
        synopsis:
            'Roger Bacon, an Oxford friar, builds a head of brass that will give him the whole of knowledge if it speaks; his servant will not wake him, and the head falls and breaks. Beside that, the son of the king of England courts a gamekeeper\u2019s daughter at Fressingfield and nearly loses her.',
        context:
            'Greene\u2019s best play, and the English answer to Faustus: Bacon is a magician who repents in time. It was probably written as a deliberate reply to Marlowe, and it stages the first great English scene of a magic mirror.',
        topics: ['Bacon', 'brass head', 'Fressingfield', 'magic mirror', 'Oxford'],
    },
    {
        slug: 'the-spanish-tragedy',
        title: 'The Spanish Tragedy',
        heading: 'THE SPANISH TRAGEDY OR HIERONIMO IS MAD AGAIN',
        group: 'The first Elizabethans',
        author: 'Thomas Kyd',
        dateLabel: 'c. 1587',
        kind: 'revenge tragedy',
        ...NEILSON,
        synopsis:
            'Hieronimo\u2019s son is murdered under a tree in his own garden, and the law will do nothing. He goes mad, then uses a court play as the instrument of revenge: the actors kill the murderers for real on stage, and Hieronimo bites out his own tongue rather than tell where he is.',
        context:
            'The most successful tragedy of the 1590s, and the play that made revenge the central form of English tragedy for fifty years. Shakespeare parodies it in *A Midsummer Night\u2019s Dream* and answers it in *Hamlet*.',
        topics: ['revenge', 'Hieronimo', 'the play within a play', 'madness', 'blood'],
    },
]

/* ── Christopher Marlowe ──────────────────────────────────────────────────── */

export const MARLOWE_PLAYS = [
    {
        slug: 'tamburlaine-part-1',
        title: 'Tamburlaine the Great, Part One',
        heading: 'TAMBURLAINE THE GREAT',
        group: 'Christopher Marlowe',
        author: 'Christopher Marlowe',
        dateLabel: '1587',
        kind: 'tragedy',
        ...NEILSON,
        synopsis:
            'A Scythian shepherd takes Persia, defeats the Turkish emperor and keeps him in a cage, and drives a chariot drawn by conquered kings. Tamburlaine says what he means to do and then does it, which was entirely new on the English stage.',
        context:
            'The play that introduced blank verse with its full range — \u2018the mighty line\u2019 — and made Edward Alleyn the first star of the English theatre. It was acted in 1587 and printed in 1590, in two parts.',
        topics: ['blank verse', 'Alleyn', 'conquest', 'Zenocrate', 'the cage'],
    },
    {
        slug: 'tamburlaine-part-2',
        title: 'Tamburlaine the Great, Part Two',
        heading: 'THE SECOND PART OF TAMBURLAINE THE GREAT.',
        startAnchor: 'DRAMATIS PERSONAE.',
        group: 'Christopher Marlowe',
        author: 'Christopher Marlowe',
        dateLabel: '1587–88',
        kind: 'tragedy',
        ...DYCE,
        synopsis:
            'Tamburlaine\u2019s wife dies and he burns the town where she died. His sons disappoint him, his own sickness defeats him, and the man who drove kings in harness dies in a tent making his last conquest a map of the world.',
        context:
            'The sequel was written within a year of Part One and printed with it in 1590. It is darker and stranger than the first part: a conqueror losing a war against his own body, and the first English play to stage death by disease.',
        topics: ['sequel', 'Zenocrate\u2019s death', 'mortality', 'Bajazeth', 'world map'],
    },
    {
        slug: 'doctor-faustus',
        title: 'Doctor Faustus',
        heading: 'THE TRAGICAL HISTORY OF DR. FAUSTUS',
        group: 'Christopher Marlowe',
        author: 'Christopher Marlowe',
        dateLabel: 'c. 1592',
        kind: 'tragedy',
        ...NEILSON,
        synopsis:
            'Faustus sells his soul to Mephistopheles for twenty-four years of power, and spends them playing tricks: grapes out of season, a pope humiliated, a horse-courser cheated. At midnight the devils come for him and he cannot reach a drop of Christ\u2019s blood.',
        context:
            'The play that made the Faust legend English. The 1604 quarto, printed here, is the short text; the 1616 quarto adds about seven hundred lines, and which is Marlowe\u2019s is still an open question.',
        topics: ['the devil', 'damnation', 'Wittenberg', 'the bond', 'comic scenes'],
    },
    {
        slug: 'the-jew-of-malta',
        title: 'The Jew of Malta',
        heading: 'THE JEW OF MALTA',
        group: 'Christopher Marlowe',
        author: 'Christopher Marlowe',
        dateLabel: 'c. 1590',
        kind: 'tragedy',
        ...NEILSON,
        synopsis:
            'Barabas loses his fortune to a Christian governor\u2019s tax and begins to kill: his daughter, two friars, a whole nunnery by poisoned porridge, a slave by treachery. He finally falls into his own cauldron and cannot get out.',
        context:
            'The most popular villain Marlowe wrote, and the play that gave the English stage its stage Jew a decade before *The Merchant of Venice*. It opens with a prologue by Machiavelli.',
        topics: ['Barabas', 'Machiavelli', 'Malta', 'antisemitism', 'the cauldron'],
    },
    {
        slug: 'edward-the-second',
        title: 'Edward the Second',
        heading: 'THE TROUBLESOME REIGN AND LAMENTABLE DEATH OF EDWARD THE SECOND',
        group: 'Christopher Marlowe',
        author: 'Christopher Marlowe',
        dateLabel: 'c. 1592',
        kind: 'history',
        ...NEILSON,
        synopsis:
            'Edward loves Gaveston, ignores his queen, and gives away the crown\u2019s authority until the barons kill his favourite. He is deposed, imprisoned in Berkeley Castle, and murdered with a red-hot spit; his son, the boy who hears him scream, becomes Edward III.',
        context:
            'Marlowe\u2019s most controlled play and the first English history to make a king\u2019s private life the source of his political failure. Shakespeare\u2019s Richard II is written in its wake.',
        topics: ['Gaveston', 'deposition', 'Berkeley Castle', 'favourite', 'Holinshed'],
    },
]

/* ── Chapman, Jonson ──────────────────────────────────────────────────────── */

export const CHAPMAN_PLAYS = [
    {
        slug: 'bussy-dambois',
        title: "Bussy D'Ambois",
        heading: 'BUSSY D\u2019AMBOIS',
        group: 'George Chapman',
        author: 'George Chapman',
        dateLabel: 'c. 1603–04',
        kind: 'tragedy',
        ...NEILSON,
        synopsis:
            'Bussy d\u2019Ambois, a poor swordsman, is taken up by the king\u2019s brother and made a courtier. He seduces the wife of the powerful Montsurry, is lured to a house through the dark, and is killed in a single duel by the husband\u2019s friends.',
        context:
            'Chapman\u2019s best-known tragedy, written in a knotty, philosophical blank verse that Jonson complained had too much in it. It is a play about a man who cannot be in a court without insulting it.',
        topics: ['court', 'honour', 'duelling', 'Tamyra', 'French politics'],
    },
]

export const JONSON_PLAYS = [
    {
        slug: 'every-man-in-his-humour',
        title: 'Every Man in His Humour',
        heading: 'EVERY MAN IN HIS HUMOUR',
        group: 'Ben Jonson',
        author: 'Ben Jonson',
        dateLabel: '1598',
        kind: 'comedy',
        ...NEILSON,
        synopsis:
            'Every character is dominated by a \u2018humour\u2019: Kno\u2019well by suspicion of his son, Kitely by jealousy of his wife, Captain Bobadill by the belief that he is a soldier. A young man pretends to be the son of an old one, and London is proved silly all afternoon.',
        context:
            'The first comedy of humours, acted in 1598 by the Lord Chamberlain\u2019s Men with Shakespeare in the cast. Jonson later moved it from Italy to London for the 1616 Folio, which is the text printed here.',
        topics: ['comedy of humours', 'Bobadill', 'London', '1598', 'Shakespeare as actor'],
    },
    {
        slug: 'sejanus-his-fall',
        title: 'Sejanus, His Fall',
        heading: 'SEJANUS, HIS FALL',
        group: 'Ben Jonson',
        author: 'Ben Jonson',
        dateLabel: '1603',
        kind: 'tragedy',
        ...NEILSON,
        synopsis:
            'Sejanus rises by informing on everyone in Rome and becomes the emperor Tiberius\u2019s favourite, with the senate at his command. When he asks for the tribune\u2019s power he is read a letter in the senate house that destroys him, and the crowd throws him down the stairs.',
        context:
            'Jonson\u2019s Roman tragedy, learned, documented, and cold. The 1605 quarto carries a long preface quoting his sources line by line, and Jonson was examined for treason over its treatment of the imperial court.',
        topics: ['Tiberius', 'Rome', 'treason charge', 'the informer', 'Seneca'],
    },
    {
        slug: 'volpone',
        title: 'Volpone; or, The Fox',
        heading: 'VOLPONE; OR, THE FOX',
        group: 'Ben Jonson',
        author: 'Ben Jonson',
        dateLabel: '1605–06',
        kind: 'comedy',
        ...NEILSON,
        synopsis:
            'Volpone pretends to be dying so that the men who hope to inherit him will bring him presents. Mosca, his servant, sells the same hope five times over, then sells Volpone\u2019s wealth to a third party; the whole apparatus ends in two courtrooms and the chain gang.',
        context:
            'Jonson\u2019s masterpiece, acted by the King\u2019s Men in 1606, set in Venice to keep it from the London censor. Its poetry — the morning hymn to gold that opens it — is the finest Jonson wrote.',
        topics: ['greed', 'Mosca', 'venetian setting', 'inheritance', 'justice'],
    },
    {
        slug: 'the-alchemist',
        title: 'The Alchemist',
        heading: 'THE ALCHEMIST',
        group: 'Ben Jonson',
        author: 'Ben Jonson',
        dateLabel: '1610',
        kind: 'comedy',
        ...NEILSON,
        synopsis:
            'The plague drives a householder out of London and his servant, with two con artists, turns the empty house into a factory for fake gold. A knight, a rich clerk and a tobacconist all pay to be fooled by whichever fantasy suits them best.',
        context:
            'Widely held to be the most perfectly constructed comedy in English: one house, one day, and three sets of victims who never meet until the last scene. Subtitled \u2018The Alchemist\u2019 but the real subject is gullibility.',
        topics: ['alchemy', 'coney-catching', 'plague', 'gulls', 'London'],
    },
]

/* ── Dekker, Heywood, Marston ─────────────────────────────────────────────── */

export const DEKKER_PLAYS = [
    {
        slug: 'the-shoemakers-holiday',
        title: 'The Shoemakers\u2019 Holiday',
        heading: 'THE SHOEMAKERS\u2019 HOLIDAY',
        group: 'Thomas Dekker',
        author: 'Thomas Dekker',
        dateLabel: '1599',
        kind: 'comedy',
        ...NEILSON,
        synopsis:
            'Simon Eyre, a shoemaker, becomes Lord Mayor of London in a single morning and proclaims a holiday for all apprentices. A returned soldier, a pair of lovers and a Dutch merchant are sorted out along the way, and the whole city eats pancakes.',
        context:
            'The best-loved citizen comedy of the age, and the one that gives the working shoemakers of London their own heroic stage. It was acted by the Admiral\u2019s Men in 1599 with a cast that included Will Kemp.',
        topics: ['Simon Eyre', 'citizen comedy', 'apprentices', 'Lord Mayor', 'London trades'],
    },
    {
        slug: 'the-honest-whore-part-1',
        title: 'The Honest Whore, Part One',
        heading: 'THE HONEST WHORE',
        group: 'Thomas Dekker',
        author: 'Thomas Dekker',
        dateLabel: '1604',
        kind: 'city comedy',
        ...NEILSON,
        synopsis:
            'Bellafront leaves prostitution for the love of Hippolito, who will not marry her; the Duke goes mad with grief and is cured by a doctor who treats him as a patient in Bedlam. Infelice, believed dead, comes back to marry the man who abandoned Bellafront.',
        context:
            'Written with Thomas Middleton, who is thought to have supplied the subplot. Its madhouse scenes were staged at Bedlam itself in later revivals, and its picture of a woman choosing respectability is unusually direct for the period.',
        topics: ['Bedlam', 'reform', 'Bellafront', 'Middleton', 'Milan'],
    },
    {
        slug: 'the-honest-whore-part-2',
        title: 'The Honest Whore, Part Two',
        heading: 'THE HONEST WHORE',
        group: 'Thomas Dekker',
        author: 'Thomas Dekker',
        dateLabel: 'c. 1604–05',
        kind: 'city comedy',
        ...NEILSON,
        synopsis:
            'Bellafront is now married to the wastrel Matheo and supporting him by her needle. Her father, disguised, tests her virtue; Hippolito, now married, tries to seduce her; and the play ends with a wife\u2019s patience converting a husband who does not deserve it.',
        context:
            'Wholly Dekker\u2019s, and generally thought the better of the two parts. It is one of the few Jacobean plays to take a reformed prostitute seriously as a wife and a household economist.',
        topics: ['marriage', 'patience', 'Friscobaldo', 'Matheo', 'London'],
    },
]

export const HEYWOOD_PLAYS = [
    {
        slug: 'a-woman-killed-with-kindness',
        title: 'A Woman Killed with Kindness',
        heading: 'A WOMAN KILLED WITH KINDNESS',
        group: 'Thomas Heywood',
        author: 'Thomas Heywood',
        dateLabel: '1603',
        kind: 'domestic tragedy',
        ...NEILSON,
        synopsis:
            'Master Frankford discovers his wife in bed with his friend and does not kill her: he sends her to a house in the country with her servants and forbids her to see her children. She starves herself, and he arrives in time to be forgiven by her.',
        context:
            'The first great English domestic tragedy, set in a country house rather than a court, with a subplot about a debtor who murders his enemy in a duel. Heywood claimed a hand in two hundred and twenty plays; this is the one that is still performed.',
        topics: ['domestic tragedy', 'forgiveness', 'Frankford', 'adultery', 'Yorkshire'],
    },
]

export const MARSTON_PLAYS = [
    {
        slug: 'the-malcontent',
        title: 'The Malcontent',
        heading: 'THE MALCONTENT',
        group: 'John Marston and John Webster',
        author: 'John Marston and John Webster',
        dateLabel: 'c. 1603–04',
        kind: 'tragicomedy',
        ...NEILSON,
        synopsis:
            'Malevole, disguised as a court jester in Genoa, tells every courtier the truth about himself and is beaten for it. He is in fact the deposed duke, and by the last act he has exposed the usurper, forgiven him, and taken back his throne and his wife.',
        context:
            'Marston\u2019s angriest play, revived by the King\u2019s Men in 1604 with an induction and additions by John Webster. Its prose is the most corrosive in Jacobean drama, and its disguised duke is the model for the Duke in *Measure for Measure*.',
        topics: ['disguise', 'court satire', 'Genoa', 'Webster\u2019s induction', 'usurpation'],
    },
]

/* ── Beaumont and Fletcher, Fletcher, Webster ─────────────────────────────── */

export const BEAUMONT_FLETCHER_PLAYS = [
    {
        slug: 'the-knight-of-the-burning-pestle',
        title: 'The Knight of the Burning Pestle',
        heading: 'THE KNIGHT OF THE BURNING PESTLE',
        group: 'Beaumont and Fletcher',
        author: 'Francis Beaumont and John Fletcher',
        dateLabel: 'c. 1607',
        kind: 'comedy',
        ...NEILSON,
        synopsis:
            'A grocer and his wife in the audience refuse to watch the play the company has prepared and demand one about their apprentice, who then appears as a knight errant with a pestle for a lance and rescues nobody in particular.',
        context:
            'The first English play to put its audience on stage and let them interrupt, and the funniest theatrical satire of the period. It was acted by the Children of the Queen\u2019s Revels at Blackfriars and failed; the nineteenth century rediscovered it.',
        topics: ['audience on stage', 'satire', 'Blackfriars', 'apprentice', 'romance parody'],
    },
    {
        slug: 'philaster',
        title: 'Philaster; or, Love Lies a-Bleeding',
        heading: 'PHILASTER; OR LOVE LIES A-BLEEDING',
        group: 'Beaumont and Fletcher',
        author: 'Francis Beaumont and John Fletcher',
        dateLabel: 'c. 1609',
        kind: 'tragicomedy',
        ...NEILSON,
        synopsis:
            'Philaster loves Arethusa, who is promised to the king of Sicily; his page Bellario is a girl in disguise. A false accusation of adultery drives Philaster to wound Arethusa and Bellario in the woods, and the last act brings everybody back to life.',
        context:
            'The play that made the partnership famous, acted by the King\u2019s Men and printed five times before 1628. Its mix of near-tragedy and last-minute rescue set the fashion for tragicomedy on the Restoration stage.',
        topics: ['tragicomedy', 'disguise', 'Sicily', 'false accusation', 'Bellario'],
    },
    {
        slug: 'the-maids-tragedy',
        title: 'The Maid\u2019s Tragedy',
        heading: 'THE MAID\u2019S TRAGEDY',
        group: 'Beaumont and Fletcher',
        author: 'Francis Beaumont and John Fletcher',
        dateLabel: 'c. 1610–11',
        kind: 'tragedy',
        ...NEILSON,
        synopsis:
            'The king commands the wedding night of Amintor and Evadne to be unconsummated: Evadne is the king\u2019s mistress. Amintor\u2019s deserted bride Aspatia dies of grief dressed as a boy, and Evadne kills the king and then herself in the bridal bed.',
        context:
            'The most performed of the Beaumont and Fletcher plays for two centuries, and the one with the most quoted death scene in English — Aspatia\u2019s \u2018I am a maiden, and I die a maid\u2019. Its sexual politics are as brutal as anything in Webster.',
        topics: ['royal lust', 'honour', 'Aspatia', 'revenge', 'Rhodes'],
    },
]

export const FLETCHER_PLAYS = [
    {
        slug: 'the-faithful-shepherdess',
        title: 'The Faithful Shepherdess',
        heading: 'THE FAITHFUL SHEPHERDESS',
        group: 'John Fletcher alone',
        author: 'John Fletcher',
        dateLabel: 'c. 1608–09',
        kind: 'pastoral',
        ...NEILSON,
        synopsis:
            'Clorin, a shepherdess who has sworn chastity at her lover\u2019s grave, keeps watch over a wood in which every other shepherd is being pushed toward sex by a satyr, a river god, and a god of desire. The chaste are protected and the lustful are punished.',
        context:
            'Fletcher\u2019s pastoral, with a preface in which he defines tragicomedy for the first time in English. It failed at Blackfriars, and Fletcher blamed the audience for not understanding what a pastoral was.',
        topics: ['pastoral', 'chastity', 'tragicomedy preface', 'the wood', 'satyrs'],
    },
    {
        slug: 'the-wild-goose-chase',
        title: 'The Wild-Goose Chase',
        heading: 'THE WILD-GOOSE CHASE',
        group: 'John Fletcher alone',
        author: 'John Fletcher',
        dateLabel: 'c. 1621',
        kind: 'comedy',
        ...NEILSON,
        synopsis:
            'Mirabel will not marry Oriana; she hires a courtesan to be seen with him and lets him believe she has taken a lover. In a second plot, two friends agree to court the same woman to cure each other of her.',
        context:
            'A late Fletcher comedy of manners, written for the King\u2019s Men, and lost for a century and a half until the manuscript turned up in 1750. Its dialogue is the closest Fletcher came to Restoration comedy.',
        topics: ['courtship', 'jealousy', 'the wager', 'King\u2019s Men', 'manners'],
    },
]

export const WEBSTER_PLAYS = [
    {
        slug: 'the-duchess-of-malfi',
        title: 'The Duchess of Malfi',
        heading: 'THE DUCHESS OF MALFI',
        group: 'John Webster',
        author: 'John Webster',
        dateLabel: 'c. 1613–14',
        kind: 'tragedy',
        ...NEILSON,
        synopsis:
            'The widowed Duchess secretly marries her steward Antonio against her brothers\u2019 wishes. Ferdinand and the Cardinal send Bosola to spy on her; she is strangled, Antonio is killed by mistake, and the avengers kill each other in a darkened room.',
        context:
            'The greatest of the Jacobean tragedies after Shakespeare\u2019s, and the one with the most quoted line about death in English — \u2018Cover her face; mine eyes dazzle; she died young.\u2019 Its source is a story in Bandello by way of Painter.',
        topics: ['Ferdinand', 'Bosola', 'secret marriage', 'lycanthropy', 'the echo scene'],
    },
]

/* ── Middleton, Massinger, Ford, Shirley ──────────────────────────────────── */

export const MIDDLETON_PLAYS = [
    {
        slug: 'a-trick-to-catch-the-old-one',
        title: 'A Trick to Catch the Old One',
        heading: 'A TRICK TO CATCH THE OLD ONE',
        group: 'Thomas Middleton',
        author: 'Thomas Middleton',
        dateLabel: '1605',
        kind: 'city comedy',
        ...NEILSON,
        synopsis:
            'A prodigal nephew and his usurer uncle each try to cheat the other out of money. The nephew borrows a courtesan and passes her off as a rich widow to raise credit, and the crediting spreads through the City until two old men are bidding for her.',
        context:
            'The first of Middleton\u2019s great City comedies, and the one that shows the machinery of debt and reputation most clearly. It was acted at the Paul\u2019s boys\u2019 theatre in 1605.',
        topics: ['usury', 'credit', 'coney-catching', 'London', 'widow'],
    },
    {
        slug: 'the-changeling',
        title: 'The Changeling',
        heading: 'THE CHANGELING',
        group: 'Thomas Middleton',
        author: 'Thomas Middleton and William Rowley',
        dateLabel: '1622',
        kind: 'tragedy',
        ...NEILSON,
        synopsis:
            'Beatrice-Joanna hires De Flores, a man she finds physically repulsive, to murder her fianc\u00e9; he takes her virginity as his fee. In the madhouse subplot, a servant pretends to be a fool to sleep with the doctor\u2019s wife, and the two plots meet in the last scene.',
        context:
            'Middleton wrote the main plot, Rowley the madhouse; the two halves rarely touch, and the play is stronger for it. It is the finest tragedy of the Caroline period before the theatres closed.',
        topics: ['De Flores', 'Beatrice-Joanna', 'madhouse', 'murder', 'Rowley'],
    },
]

export const MASSINGER_PLAYS = [
    {
        slug: 'a-new-way-to-pay-old-debts',
        title: 'A New Way to Pay Old Debts',
        heading: 'A NEW WAY TO PAY OLD DEBTS',
        group: 'Philip Massinger',
        author: 'Philip Massinger',
        dateLabel: 'c. 1621–22',
        kind: 'comedy',
        ...NEILSON,
        synopsis:
            'Sir Giles Overreach has swallowed half of Nottinghamshire through mortgages and wants his daughter to marry a lord. His nephew, with the help of a pretended rich widow, ruins him by feeding his greed until he believes he owns estates that do not exist.',
        context:
            'Massinger\u2019s most durable play, and the one that kept the actor Edmund Kean famous: Sir Giles\u2019s collapse on stage was a nineteenth-century sensation. It is a comedy in form and a revenge play in feeling.',
        topics: ['Sir Giles Overreach', 'usury', 'greed', 'Nottinghamshire', 'Kean'],
    },
]

export const FORD_PLAYS = [
    {
        slug: 'the-broken-heart',
        title: 'The Broken Heart',
        heading: 'THE BROKEN HEART',
        group: 'John Ford',
        author: 'John Ford',
        dateLabel: 'c. 1625–33',
        kind: 'tragedy',
        ...NEILSON,
        synopsis:
            'Penthea is forced by her brother to marry a man she does not love, and refuses to see the man she does. She starves herself to death; her lover Calantha dances through the news of three deaths and then dies of a broken heart on the spot.',
        context:
            'Ford\u2019s most severe tragedy and the one that most resists staging: its central action is endurance. It was printed in 1633, and its Spartan setting was chosen to keep the censor away from the English court.',
        topics: ['Sparta', 'forced marriage', 'endurance', 'Calantha', 'honour'],
    },
]

export const SHIRLEY_PLAYS = [
    {
        slug: 'the-lady-of-pleasure',
        title: 'The Lady of Pleasure',
        heading: 'THE LADY OF PLEASURE',
        group: 'James Shirley',
        author: 'James Shirley',
        dateLabel: '1635',
        kind: 'comedy',
        ...NEILSON,
        synopsis:
            'Aretina, newly rich, resolves to live for pleasure in London and takes a lover in front of her husband. Her stepdaughter Celestina moves in the opposite direction, and the two women trade definitions of freedom until the husbands stage a reconciliation.',
        context:
            'The best of Shirley\u2019s comedies of manners, written for the Queen\u2019s Men at the Cockpit. It is the comedy of the 1630s: witty, urban, and only a few years from the closing of the theatres.',
        topics: ['London', 'pleasure', 'marriage', 'fashion', 'Caroline court'],
    },
    {
        slug: 'the-cardinal',
        title: 'The Cardinal',
        heading: 'THE CARDINAL',
        group: 'James Shirley',
        author: 'James Shirley',
        dateLabel: '1641',
        kind: 'tragedy',
        ...NEILSON,
        synopsis:
            'The Duchess Rosaura is widowed before her wedding night and chooses a husband for herself, against the wishes of the Cardinal, who wants her for his nephew. The Cardinal\u2019s revenge drives a loyal servant to murder, and the play ends with the Cardinal stabbed in his own gallery.',
        context:
            'Shirley\u2019s finest tragedy, and one of the last plays acted before Parliament closed the theatres in 1642. Its ghost scene and its villain are usually read as the last word of the Jacobean tradition.',
        topics: ['revenge', 'the Cardinal', 'ghost', '1642 closure', 'Navarre'],
    },
]

/* ── The shelf ────────────────────────────────────────────────────────────── */

export const RENAISSANCE_PLAYS = [
    ...COMEDIES,
    ...HISTORIES,
    ...SHAKESPEARE_TRAGEDIES,
    ...SHAKESPEARE_LATE,
    ...FIRST_ELIZABETHANS,
    ...MARLOWE_PLAYS,
    ...CHAPMAN_PLAYS,
    ...JONSON_PLAYS,
    ...DEKKER_PLAYS,
    ...HEYWOOD_PLAYS,
    ...MARSTON_PLAYS,
    ...BEAUMONT_FLETCHER_PLAYS,
    ...FLETCHER_PLAYS,
    ...WEBSTER_PLAYS,
    ...MIDDLETON_PLAYS,
    ...MASSINGER_PLAYS,
    ...FORD_PLAYS,
    ...SHIRLEY_PLAYS,
]

/**
 * What this shelf does not hold, and why. The shelf is built from two editions
 * that between them cover the canon; the rest of the period's drama is named
 * here rather than given a card that opens nothing.
 */
export const RENAISSANCE_NOT_AVAILABLE = [
    {
        title: 'Shakespeare\u2019s poems and sonnets',
        note: 'The sonnets, *Venus and Adonis*, *The Rape of Lucrece* and the shorter poems are all in the same Gutenberg volume as the plays. They are not on a theatre shelf because they are not plays, not because they cannot be hosted.',
    },
    {
        title: 'Webster, The White Devil',
        note: 'Not in the 1911 Neilson anthology the shelf is built from, and not yet typeset from a separate edition. Webster\u2019s other play, *The Duchess of Malfi*, is on the shelf.',
    },
    {
        title: 'Ford, \u2019Tis Pity She\u2019s Whore',
        note: 'Ford\u2019s most famous tragedy is not in the anthology, which prints *The Broken Heart* instead. It is a gap on this shelf, not a lost play.',
    },
    {
        title: 'Jonson, Bartholomew Fair, Epicoene and the late comedies',
        note: 'The shelf carries the four Jonson plays the anthology prints. *Bartholomew Fair* (1614), *Epicoene* (1609) and *The Devil is an Ass* (1616) are the major plays still missing from this shelf.',
    },
    {
        title: 'Middleton, Women Beware Women and The Roaring Girl',
        note: 'Two City tragedies and comedies of the same years as *The Changeling*, neither of them in the anthology. *Women Beware Women* is the largest single gap in the Middleton holdings here.',
    },
    {
        title: 'Marlowe, The Massacre at Paris and Dido, Queen of Carthage',
        note: 'Both survive only in the spelling of the 1590s quartos — *The Massacre at Paris* in a short, corrupt undated text, *Dido* in a 1594 quarto reproduced in facsimile. They exist; they are not readable without editorial modernisation, which the shelf does not do.',
    },
    {
        title: 'The other Elizabethans: Sackville and Norton, Preston, Lodge, Porter',
        note: '*Gorboduc* (1561), *Cambises* (c. 1569), *The Wounds of Civil War* and *The Two Angry Women of Abington* are the period\u2019s other surviving plays. None of them is in the two editions this shelf is built from.',
    },
    {
        title: 'The court masques',
        note: 'Jonson\u2019s masques with Inigo Jones, and the court entertainments of the 1630s, are a separate dramatic form with music and spectacle at their centre. The texts exist; they are not stage plays and are not on this shelf.',
    },
]

const BUILT = Object.fromEntries(RENAISSANCE_SHELF.map((entry) => [entry.slug, entry]))

export const RENAISSANCE_SHELF_BY_SLUG = BUILT

/**
 * Shape the library UI renders. Every card is a hosted PDF: nothing here sends
 * a reader to another website.
 */
export function toRenaissanceCard(play) {
    const built = BUILT[play.slug]
    if (!built) {
        throw new Error(`${play.slug}: no PDF in the renaissance shelf - run npm run renaissance:build`)
    }

    return {
        id: `renaissance-${play.slug}`,
        slug: play.slug,
        code: '',
        title: play.title,
        subtitle: `${built.translator} \u00b7 PDF, ${built.pages} pages \u00b7 free`,
        author: play.author,
        group: play.group,
        tradition: play.group,
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
        domain: RENAISSANCE_DOMAIN,
        priceKobo: 0,
        is_free: true,
        download_path: built.download_path,
        external_url: null,
        page_count: built.pages,
        file_size_bytes: built.bytes,
        description: play.synopsis,
        is_official: true,
        isRenaissance: true,
        isExternal: false,
        isBook: false,
        isFresherPdf: false,
        isDrama: false,
        isRoman: false,
        isMedieval: false,
    }
}

export function findRenaissancePlayBySlug(slug) {
    return RENAISSANCE_PLAYS.find((play) => play.slug === slug) || null
}

/** The plays of one group, in shelf order. */
export function renaissancePlaysInGroup(groupName) {
    return RENAISSANCE_PLAYS.filter((play) => play.group === groupName)
}

/** The groups that actually hold a play, in display order. */
export function renaissanceGroups() {
    return RENAISSANCE_GROUPS.map((group) => ({
        ...group,
        plays: renaissancePlaysInGroup(group.name),
    })).filter((group) => group.plays.length > 0)
}

/** e.g. "38 Shakespeare plays and 31 by his contemporaries" — never typed. */
export function renaissanceCounts() {
    const shakespeare = RENAISSANCE_PLAYS.filter((play) => play.source === 100).length
    return {
        shakespeare,
        contemporaries: RENAISSANCE_PLAYS.length - shakespeare,
        total: RENAISSANCE_PLAYS.length,
    }
}
