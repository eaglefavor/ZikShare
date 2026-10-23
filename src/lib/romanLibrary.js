/**
 * Roman theatre shelf — Plautus, Terence and Seneca, typeset as PDFs and hosted
 * by ZikShare.
 *
 * ## What is here
 *
 * All twenty of Plautus' surviving comedies, all six of Terence's, and the ten
 * tragedies that come down to us under Seneca's name. Every card downloads a
 * real PDF from this site; nothing here sends a reader to another website.
 *
 * ## Editions
 *
 * - Plautus and Terence: Henry Thomas Riley's literal prose translations
 *   (Bohn's Classical Library, 1852 and after; Bell's reprints, 1890-1912).
 * - Seneca: Frank Justus Miller's verse translation (1907, reprinted 1917).
 *
 * The Gutenberg texts carry their own licence and it is reproduced inside each
 * PDF. The Plautus plays come from the Perseus Digital Library's TEI edition of
 * Riley, which is published under CC BY-SA 4.0: that is credited inside the
 * file, and the translation underneath it is public domain.
 *
 * ## What is not Seneca's
 *
 * Two of the ten are almost certainly not his. *Hercules Oetaeus* is a long
 * imitation, and *Octavia* is a *praetexta* about Nero's divorce, written after
 * Seneca died. Both are transmitted with the tragedies and printed in Miller's
 * edition, so both are here — labelled for what they are rather than quietly
 * dropped or quietly attributed to him.
 *
 * ## Dates
 *
 * Most Roman play dates are unknown. Only Stichus (200 BC) and Pseudolus (191
 * BC) can be dated from the record, and the six Terence comedies are all dated
 * by their production notices. Everything else says so instead of guessing.
 */

import { ROMAN_SHELF } from './romanLibraryData.js'

export const ROMAN_DOMAIN = 'Roman Theatre'

export const ROMAN_AUTHORS = [
    {
        name: 'Plautus',
        dates: 'c. 254–184 BC',
        note: 'Twenty comedies survive, all of them musical farces in verse with a plot that turns on a clever slave. He wrote for a mass audience in a working city and never lets a scene end without a joke; his Latin is the rowdiest that survives from the Republic.',
    },
    {
        name: 'Terence',
        dates: 'c. 195–159 BC',
        note: 'Six comedies, all adapted from Greek originals, all still read as the cleanest Latin prose in the language. He writes quieter plays than Plautus — fathers and sons, double plots, nothing fantastical — and the humanist claim that "nothing human is foreign to me" is his line, not Cicero\'s.',
    },
    {
        name: 'Seneca',
        dates: 'c. 4 BC–AD 65',
        note: 'Nine tragedies, plus two transmitted with them that are not his. He was a Stoic philosopher and Nero\'s tutor, and his plays are not Athenian drama but Roman declamation: five acts, a ghost, a long description of horror instead of the horror itself. They are what Renaissance Europe actually read when it read tragedy.',
    },
]

const PLAUTUS_TRANSLATION = {
    translator: 'Henry Thomas Riley',
    sourceEdition: 'The Comedies of Plautus, literally translated (Bohn; Bell, 1912)',
    sourceName: 'Perseus Digital Library',
}

const TERENCE_TRANSLATION = {
    translator: 'Henry Thomas Riley',
    sourceEdition: 'The Comedies of Terence, literally translated (Harper, 1859)',
    sourceName: 'Project Gutenberg eBook #22188',
}

const SENECA_TRANSLATION = {
    translator: 'Frank Justus Miller',
    sourceEdition: 'The Tragedies of Seneca, translated into English verse (1907)',
    sourceName: 'Project Gutenberg eBook #57999',
}

/** Plautus — twenty comedies, c. 205–184 BC. */
export const PLAUTUS_PLAYS = [
    {
        slug: 'amphitryon-plautus',
        title: 'Amphitryon',
        latinTitle: 'Amphitruo',
        author: 'Plautus',
        dateLabel: null,
        kind: 'comedy',
        ...PLAUTUS_TRANSLATION,
        synopsis:
            'Jupiter takes the shape of the general Amphitryon so he can spend a night with his wife Alcmena, and Mercury takes the shape of his slave Sosia to guard the door. The real Amphitryon comes home from the war to find himself locked out of his own house and accused of being an impostor by his own wife.',
        context:
            'The only Roman comedy about a god, and the only one Plautus called a tragedy in his prologue. It became a European fixture: Molière, Dryden, Kleist and Giraudoux all rewrote it.',
        topics: ['Jupiter', 'Alcmena', 'mistaken identity', 'Hercules', 'the double'],
    },
    {
        slug: 'asinaria-plautus',
        title: 'The Ass-Dealer',
        latinTitle: 'Asinaria',
        author: 'Plautus',
        dateLabel: null,
        kind: 'comedy',
        ...PLAUTUS_TRANSLATION,
        synopsis:
            'Argyrippus needs twenty minae to buy his mistress Philaenium from a pimp. His father Demaenetus finds the money by selling some asses and lends it — on condition that he gets the girl for one night of the year, which is exactly the kind of bargain his wife is not going to accept.',
        context:
            'Contains the line Latin literature is fondest of quoting: "lupus est homo homini, non homo" — man is a wolf to man, not a man. Read it in the mouth of a slave who is about to be cheated.',
        topics: ['father and son', 'courtesan', 'pimp', 'loan', 'comedy'],
    },
    {
        slug: 'aulularia-plautus',
        title: 'The Pot of Gold',
        latinTitle: 'Aulularia',
        author: 'Plautus',
        dateLabel: null,
        kind: 'comedy',
        ...PLAUTUS_TRANSLATION,
        synopsis:
            'Euclio finds a pot of gold buried in his house and stops sleeping, eating or leaving it alone. His daughter has been made pregnant by the young man next door, the pot is stolen and recovered, and the play breaks off before the wedding — the last part of the text is lost.',
        context:
            'The ancestor of every miser on the European stage, up to and including Harpagon in Molière\'s L\'Avare, which is a rewrite of this play. Euclio\'s soliloquies are the first sustained comic monologues in Latin.',
        topics: ['miser', 'gold', 'Euclio', 'Molière', 'incomplete text'],
    },
    {
        slug: 'bacchides-plautus',
        title: 'The Two Bacchises',
        latinTitle: 'Bacchides',
        author: 'Plautus',
        dateLabel: null,
        kind: 'comedy',
        ...PLAUTUS_TRANSLATION,
        synopsis:
            'Two sisters are both called Bacchis, and Pistoclerus falls for one of them while arranging for his friend to meet the other. Then the friend\'s father arrives, sees the second sister, and decides he wants her too — so the son has to buy his own father off.',
        context:
            'Plautus\' longest comedy, and his most mercenary: everybody on stage is calculating what everybody else is worth. The double name is the plot, not a coincidence.',
        topics: ['courtesans', 'father and son', 'slave plot', 'money', 'comedy'],
    },
    {
        slug: 'captivi-plautus',
        title: 'The Captives',
        latinTitle: 'Captivi',
        author: 'Plautus',
        dateLabel: null,
        kind: 'comedy',
        ...PLAUTUS_TRANSLATION,
        synopsis:
            'Hegio holds two prisoners of war and offers to trade them for his own son, captured in battle. One of the two is not a slave at all — he is Hegio\'s son, swapped as a child — and the play that looks like a kidnapping story ends in a recognition scene and a general freeing of slaves.',
        context:
            'Admired in antiquity as Plautus\' best-made play and still the one most often given to students: no love interest, no bawdry, and a plot built entirely on loyalty between two men.',
        topics: ['prisoners', 'recognition', 'loyalty', 'Tyndarus', 'Hegio'],
    },
    {
        slug: 'casina-plautus',
        title: 'Casina',
        latinTitle: 'Casina',
        author: 'Plautus',
        dateLabel: null,
        kind: 'comedy',
        ...PLAUTUS_TRANSLATION,
        synopsis:
            'Old Lysidamus and his son Euthynicus both want the foundling Casina, and neither can marry her: she is free-born and poor. Lysidamus arranges for his own bailiff to marry her so he can have her himself; the wife and the household find out and arrange instead for a boy actor to be put in the bridal bed.',
        context:
            'Ends with the old man humiliated in the dark and the whole cast turning to the audience. The final scene survives only in a shorter revised version, which is why the last act reads faster than the rest.',
        topics: ['old man in love', 'bed trick', 'wife', 'slave', 'comedy'],
    },
    {
        slug: 'cistellaria-plautus',
        title: 'The Casket',
        latinTitle: 'Cistellaria',
        author: 'Plautus',
        dateLabel: null,
        kind: 'comedy',
        ...PLAUTUS_TRANSLATION,
        synopsis:
            'A girl brought up in a courtesan\'s house turns out to be free-born, and the tokens in a small casket prove it. A young man in love with her, a rival, and two mothers who recognise each other in mid-play are what stands between her and the marriage.',
        context:
            'Adapted from Menander\'s Synaristosai, "the women at lunch". The prologue is spoken by the goddess Help, who explains a plot she says she has already set in motion.',
        topics: ['Menander', 'recognition', 'tokens', 'courtesan', 'comedy'],
    },
    {
        slug: 'curculio-plautus',
        title: 'Curculio',
        latinTitle: 'Curculio',
        author: 'Plautus',
        dateLabel: null,
        kind: 'comedy',
        ...PLAUTUS_TRANSLATION,
        synopsis:
            'The parasite Curculio is sent to Caria for money and comes back with a forged letter and a stolen ring. With the ring he convinces the pimp Cappadox that a soldier has already paid for the girl, and takes her away for his young master instead.',
        context:
            'A one-hour farce with a parasite for a hero — he opens the play by introducing himself directly to the audience, and the plot is over almost before it starts.',
        topics: ['parasite', 'forgery', 'pimp', 'soldier', 'comedy'],
    },
    {
        slug: 'epidicus-plautus',
        title: 'Epidicus',
        latinTitle: 'Epidicus',
        author: 'Plautus',
        dateLabel: null,
        kind: 'comedy',
        ...PLAUTUS_TRANSLATION,
        synopsis:
            'Epidicus invents a purchased girl, a forged letter and a borrowed lyre to fund two of his young master\'s love affairs at once. Everything works, then everything unravels, and he is one scene away from the cross when a recognition saves him.',
        context:
            'Usually dated early in Plautus\' career. The pleasure of the play is watching a slave build a plot in public and then have to live inside it.',
        topics: ['clever slave', 'disguise', 'forgery', 'recognition', 'comedy'],
    },
    {
        slug: 'menaechmi-plautus',
        title: 'The Twin Brothers',
        latinTitle: 'Menaechmi',
        author: 'Plautus',
        dateLabel: null,
        kind: 'comedy',
        ...PLAUTUS_TRANSLATION,
        synopsis:
            'Twin brothers were separated as children, and one has spent six years looking for the other. He arrives in Epidamnus and is immediately mistaken for his brother by a wife, a mistress, a parasite, a cook and a father-in-law, none of whom can understand why he denies knowing them.',
        context:
            'The Roman comedy Shakespeare copied almost scene for scene in The Comedy of Errors, and the template for every separated-twins farce since. The identity plot is solved by a slave, not by the family.',
        topics: ['twins', 'mistaken identity', 'Epidamnus', 'Shakespeare', 'comedy'],
    },
    {
        slug: 'mercator-plautus',
        title: 'The Merchant',
        latinTitle: 'Mercator',
        author: 'Plautus',
        dateLabel: null,
        kind: 'comedy',
        ...PLAUTUS_TRANSLATION,
        synopsis:
            'A young man buys a slave girl in Rhodes and brings her home to Athens, where his father promptly falls in love with her. The mother is told the girl is the young man\'s mistress, the father is caught, and the household has to find a way to keep the peace.',
        context:
            'Based on Philemon\'s Emporos. Plautus removes the Greek recognition scene and leaves the family in the room with its problem, which makes the ending colder and funnier.',
        topics: ['father and son', 'slave girl', 'household', 'Philemon', 'comedy'],
    },
    {
        slug: 'miles-gloriosus-plautus',
        title: 'The Braggart Captain',
        latinTitle: 'Miles Gloriosus',
        author: 'Plautus',
        dateLabel: null,
        kind: 'comedy',
        ...PLAUTUS_TRANSLATION,
        synopsis:
            'Pyrgopolynices is a soldier who believes he is irresistible, and he has taken his neighbour\'s girlfriend. The slave Palaestrio, working for the neighbour, sells him the story that a rich woman next door is dying for him, and gets him thrown out of his own house by the neighbour and his servants.',
        context:
            'The play that gave European comedy the miles gloriosus — the boastful soldier — as a stock type: Shakespeare\'s Parolles, Jonson\'s Bobadill and Falstaff all descend from Pyrgopolynices.',
        topics: ['braggart soldier', 'Palaestrio', 'trick', 'stock character', 'comedy'],
    },
    {
        slug: 'mostellaria-plautus',
        title: 'The Haunted House',
        latinTitle: 'Mostellaria',
        author: 'Plautus',
        dateLabel: null,
        kind: 'comedy',
        ...PLAUTUS_TRANSLATION,
        synopsis:
            'While the father is away, Philolaches spends the money and holds a party. The father returns without warning, and the slave Tranio blocks the door with a story: the house is haunted, there is a ghost inside, nobody may enter. It holds for about one act, and then the moneylender arrives.',
        context:
            'Plautus\' most performed comedy after Menaechmi, and the cleanest example of the "the master is back" plot that Roman comedy built and the commedia dell\'arte inherited.',
        topics: ['clever slave', 'lie', 'haunted house', 'father', 'comedy'],
    },
    {
        slug: 'persa-plautus',
        title: 'The Persian',
        latinTitle: 'Persa',
        author: 'Plautus',
        dateLabel: null,
        kind: 'comedy',
        ...PLAUTUS_TRANSLATION,
        synopsis:
            'A slave and a parasite conspire to get a girl out of a pimp\'s house before he can sell her. They dress the parasite\'s daughter up as a captured Persian and sell her to the pimp, who pays for a slave he is not allowed to keep.',
        context:
            'No Persian appears in it, and the title tells you very little; the play is a tight con in which everyone except the pimp is in on the trick from the first scene.',
        topics: ['con', 'pimp', 'disguise', 'slave', 'comedy'],
    },
    {
        slug: 'poenulus-plautus',
        title: 'The Young Carthaginian',
        latinTitle: 'Poenulus',
        author: 'Plautus',
        dateLabel: null,
        kind: 'comedy',
        ...PLAUTUS_TRANSLATION,
        synopsis:
            'Hanno, an old Carthaginian, arrives in Calydon looking for the two daughters who were kidnapped as children. They are in a pimp\'s house, and a young man in love with one of them has to find the money to free her before Hanno can recognise them both.',
        context:
            'Famous for a reason that has nothing to do with comedy: five lines of Punic, the longest surviving passage of the language outside inscriptions. Nobody in Plautus\' audience needed to understand them; the joke is that Hanno speaks it.',
        topics: ['Carthage', 'Punic', 'recognition', 'kidnapping', 'comedy'],
    },
    {
        slug: 'pseudolus-plautus',
        title: 'Pseudolus',
        latinTitle: 'Pseudolus',
        author: 'Plautus',
        dateLabel: '191 BC',
        kind: 'comedy',
        ...PLAUTUS_TRANSLATION,
        synopsis:
            'Calidorus has no money and the girl next door is being sold to a soldier. He asks the slave Pseudolus for help; Pseudolus, who has no plan when the play begins, promises to get her anyway, and spends five acts inventing one — a forged letter, a borrowed name, a drunk Macedonian, and a pimp who ends up paying for his own loss.',
        context:
            'One of only two Plautus comedies with a fixed date: staged at the Megalensian games in 191 BC. The slave is so confident he bets his master money he will fail, and then takes the bet.',
        topics: ['clever slave', 'Ballio', 'con', 'soldier', 'comedy'],
    },
    {
        slug: 'rudens-plautus',
        title: 'The Rope',
        latinTitle: 'Rudens',
        author: 'Plautus',
        dateLabel: null,
        kind: 'comedy',
        ...PLAUTUS_TRANSLATION,
        synopsis:
            'A storm wrecks the ship carrying a pimp and two girls, and they wash ashore near Cyrene. A fisherman\'s net hauls the girls out, and the tokens in a little casket prove that they are free-born — so the pimp has nothing to sell.',
        context:
            'The only Roman comedy with a sea in it, and the one Plautus set in Africa. Arcturus speaks the prologue and claims responsibility for the storm, which is a neat way of saying the plot is a moral one.',
        topics: ['shipwreck', 'fisherman', 'recognition', 'Cyrene', 'comedy'],
    },
    {
        slug: 'stichus-plautus',
        title: 'Stichus',
        latinTitle: 'Stichus',
        author: 'Plautus',
        dateLabel: '200 BC',
        kind: 'comedy',
        ...PLAUTUS_TRANSLATION,
        synopsis:
            'Two sisters have waited two years for their husbands, who are away making money. Their father wants them to remarry; they refuse. The husbands arrive, richer, and the second half of the play belongs to the slaves, who are given the run of the house and spend it eating.',
        context:
            'The earliest Roman comedy with a certain date: staged in 200 BC. It has almost no plot in the modern sense and ends with a drinking party, which is the best evidence we have for what a Roman audience actually enjoyed.',
        topics: ['marriage', 'slaves', 'feasting', 'dated performance', 'comedy'],
    },
    {
        slug: 'trinummus-plautus',
        title: 'The Three Pieces of Money',
        latinTitle: 'Trinummus',
        author: 'Plautus',
        dateLabel: null,
        kind: 'comedy',
        ...PLAUTUS_TRANSLATION,
        synopsis:
            'Charmides goes abroad and leaves a treasure buried in his house and his children in his friend Callicles\' care. His son sells the house, Callicles buys it to save the gold, and the neighbours conclude he is a thief until Charmides returns and everything is explained.',
        context:
            'Plautus\' most moralising comedy, and the one that most clearly argues a case: what a man owes his friend. The three pieces of money are the fee paid to a sharper to impersonate a messenger.',
        topics: ['treasure', 'friendship', 'return', 'impostor', 'comedy'],
    },
    {
        slug: 'truculentus-plautus',
        title: 'The Churl',
        latinTitle: 'Truculentus',
        author: 'Plautus',
        dateLabel: null,
        kind: 'comedy',
        ...PLAUTUS_TRANSLATION,
        synopsis:
            'Phronesium is a courtesan running three men at once: a young Athenian, a soldier who thinks he has fathered her child, and a country neighbour. The baby is borrowed, the soldier is milked, and the only character who sees the whole arrangement is her churlish slave Truculentus.',
        context:
            'Plautus at his least sentimental about sex and money. There is no marriage at the end and nobody is reformed; the play simply stops, with the men still paying.',
        topics: ['courtesan', 'soldier', 'money', 'churl', 'comedy'],
    },
]

/** Terence — six comedies, all dated from the production notices. */
export const TERENCE_PLAYS = [
    {
        slug: 'andria-terence',
        title: 'The Fair Andrian',
        latinTitle: 'Andria',
        author: 'Terence',
        dateLabel: '166 BC',
        kind: 'comedy',
        ...TERENCE_TRANSLATION,
        synopsis:
            'Pamphilus has promised to marry Glycerium, a girl from Andros who lives next door and is about to have his child. His father has contracted him to the daughter of Chremes, and the slave Davus keeps both engagements alive until a recognition shows that Glycerium is Chremes\' own daughter.',
        context:
            'Terence\'s first play, adapted from two Menander plays and staged when he was about twenty. The prologue answers a rival playwright who accused him of contaminating his sources — which is exactly what he had done.',
        topics: ['Menander', 'recognition', 'father and son', 'Davus', 'comedy'],
    },
    {
        slug: 'hecyra-terence',
        title: 'The Mother-in-Law',
        latinTitle: 'Hecyra',
        author: 'Terence',
        dateLabel: '165 BC',
        kind: 'comedy',
        ...TERENCE_TRANSLATION,
        synopsis:
            'Pamphilus is married to Philumena but in love with a courtesan, and when his wife\'s family takes her home he assumes the worst of her mother. The truth is worse and better at once: Philumena was raped at a festival before the marriage, and the ring taken from her identifies the rapist as Pamphilus himself.',
        context:
            'The most interesting failure in Roman theatre: it was abandoned at its first two performances because the audience left for a boxing match and then for a tightrope walker. Terence put both disappointments into the prologues.',
        topics: ['marriage', 'rape', 'recognition', 'stage history', 'comedy'],
    },
    {
        slug: 'heautontimorumenos-terence',
        title: 'The Self-Tormentor',
        latinTitle: 'Heautontimorumenos',
        author: 'Terence',
        dateLabel: '163 BC',
        kind: 'comedy',
        ...TERENCE_TRANSLATION,
        synopsis:
            'Menedemus drove his son away by nagging him about a love affair, and now punishes himself with farm labour from dawn to dark. His neighbour Chremes tells him to stop, while failing to notice that his own son is in the same trouble next door.',
        context:
            'Source of the line the Renaissance made a motto — "homo sum: humani nil a me alienum puto", I am a man, and nothing human is foreign to me — spoken by a busybody who is using it as an excuse to interfere.',
        topics: ['father and son', 'self-punishment', 'Chremes', 'humanism', 'comedy'],
    },
    {
        slug: 'eunuchus-terence',
        title: 'The Eunuch',
        latinTitle: 'Eunuchus',
        author: 'Terence',
        dateLabel: '161 BC',
        kind: 'comedy',
        ...TERENCE_TRANSLATION,
        synopsis:
            'Phaedria is in love with Thais, who is protecting a young girl from a soldier. His brother Chaerea dresses as the eunuch Thais has been given and gets into the house, where he rapes Pamphila; the play then has to turn a rape into a marriage, which it does by discovering that Pamphila is an Athenian citizen.',
        context:
            'Terence\'s biggest success and the most performed Roman comedy in antiquity — it reportedly earned more than any other play. Modern productions have to decide what to do with a plot that treats a rape as a joke with a wedding attached.',
        topics: ['Thais', 'Chaerea', 'disguise', 'rape', 'comedy'],
    },
    {
        slug: 'phormio-terence',
        title: 'Phormio',
        latinTitle: 'Phormio',
        author: 'Terence',
        dateLabel: '161 BC',
        kind: 'comedy',
        ...TERENCE_TRANSLATION,
        synopsis:
            'Two cousins are in love with two girls who have no dowries, and their fathers are away. The parasite Phormio arranges both marriages by pretending to be a friend of the family and then suing for damages, and when the fathers come home he argues his way out of court and into a fee.',
        context:
            'A comedy built almost entirely out of legal argument, and the best evidence for how much Roman audiences enjoyed watching a case being won. Phormio is the only parasite in Roman comedy who gets what he asks for.',
        topics: ['parasite', 'law court', 'marriage', 'fathers', 'comedy'],
    },
    {
        slug: 'adelphi-terence',
        title: 'The Brothers',
        latinTitle: 'Adelphi',
        author: 'Terence',
        dateLabel: '160 BC',
        kind: 'comedy',
        ...TERENCE_TRANSLATION,
        synopsis:
            'Demea has raised one son strictly and given the other to his easy-going brother to bring up in town. The strict son turns out to be the one in trouble, and the lenient father has to defend a way of raising children that Demea thinks has produced a idler — before Demea changes sides and outdoes him.',
        context:
            'Terence\'s last play, staged in the year of his death, and the one that most directly argues a thesis about fathers. Molière borrowed from it, and it is still the most useful of the six for a classroom argument about authority.',
        topics: ['education', 'fathers', 'two households', 'Molière', 'comedy'],
    },
]

/** Seneca — nine tragedies, plus two transmitted with them that are not his. */
export const SENECA_PLAYS = [
    {
        slug: 'hercules-furens-seneca',
        title: 'Hercules Furens',
        latinTitle: 'Hercules Furens',
        author: 'Seneca',
        dateLabel: null,
        kind: 'tragedy',
        ...SENECA_TRANSLATION,
        synopsis:
            'While Hercules is in the underworld, the tyrant Lycus takes Thebes and tries to force Megara to marry him. Hercules returns, kills him, and then — sent mad by Juno — shoots his wife and children with his own bow, waking to find the bodies around him.',
        context:
            'Seneca\'s most Roman play: a hero whose strength is a public menace, and a Juno who explains in the prologue exactly what she intends to do. The madness is reported by Amphitryon, not shown, which is the Senecan method.',
        topics: ['Hercules', 'Juno', 'madness', 'Lycus', 'Stoicism'],
    },
    {
        slug: 'troades-seneca',
        title: 'The Trojan Women',
        latinTitle: 'Troades',
        author: 'Seneca',
        dateLabel: null,
        kind: 'tragedy',
        ...SENECA_TRANSLATION,
        synopsis:
            'Troy has fallen and the women wait for the lots that will divide them. Polyxena is dragged to Achilles\' tomb and killed there, Astyanax is thrown from a tower, and Hecuba counts the dead while the Greek commanders argue about whether any of it is necessary.',
        context:
            'Euripides\' play rewritten by a Roman Stoic: the same events, but with the deaths staged as set pieces and the gods reduced to an argument nobody wins. Read it against the Greek and the difference in taste is the whole history of Roman tragedy.',
        topics: ['Troy', 'Hecuba', 'Astyanax', 'Polyxena', 'Euripides'],
    },
    {
        slug: 'phoenissae-seneca',
        title: 'The Phoenician Women',
        latinTitle: 'Phoenissae',
        author: 'Seneca',
        dateLabel: null,
        kind: 'tragedy',
        ...SENECA_TRANSLATION,
        synopsis:
            'Oedipus, blind and self-cursed, tries to stop the war between his sons, and Jocasta goes out to the battlefield to stand between them. The play ends before the brothers kill each other: what survives is a sequence of confrontations, with no chorus and no fifth act.',
        context:
            'The least finished thing in the Senecan corpus — a long fragment rather than a play, which is why it reads as a set of duets. It is included here because Miller\'s edition prints it and because the gaps are themselves evidence of how these texts reached us.',
        topics: ['Oedipus', 'Jocasta', 'Thebes', 'incomplete text', 'civil war'],
    },
    {
        slug: 'medea-seneca',
        title: 'Medea',
        latinTitle: 'Medea',
        author: 'Seneca',
        dateLabel: null,
        kind: 'tragedy',
        ...SENECA_TRANSLATION,
        synopsis:
            'Jason has left Medea for Creon\'s daughter, and Creon gives her one day before exile. She spends it preparing: a poisoned robe, a fire that spreads, and then her own sons, killed offstage while Jason is still shouting at the door.',
        context:
            'Seneca\'s Medea is a sorceress first and a wronged wife second — she stops the sun, calls on Hecate, and flies out over the stage. The Latin is the most quoted of all Senecan passages and the reason the play is still staged.',
        topics: ['Medea', 'Jason', 'revenge', 'sorcery', 'infanticide'],
    },
    {
        slug: 'phaedra-seneca',
        title: 'Phaedra',
        latinTitle: 'Phaedra',
        author: 'Seneca',
        dateLabel: null,
        kind: 'tragedy',
        ...SENECA_TRANSLATION,
        synopsis:
            'Phaedra falls in love with her stepson Hippolytus, and her nurse talks her into declaring it. He refuses her, she accuses him of rape, and Theseus curses him; Hippolytus is dragged to death by his own horses on the shore while his body is reassembled for the funeral.',
        context:
            'The version Racine rewrote, and the one that gave the European stage its idea of tragic desire as a disease. Seneca adds the nurse\'s long persuasive speech, which is the best scene in the play.',
        topics: ['Phaedra', 'Hippolytus', 'Theseus', 'desire', 'Racine'],
    },
    {
        slug: 'oedipus-seneca',
        title: 'Oedipus',
        latinTitle: 'Oedipus',
        author: 'Seneca',
        dateLabel: null,
        kind: 'tragedy',
        ...SENECA_TRANSLATION,
        synopsis:
            'Thebes is dying of plague and Oedipus sends Creon to the oracle, which names the murderer of Laius as the cause. Tiresias calls up Laius\' ghost, the truth comes out piece by piece, and Oedipus puts out his own eyes with his mother\'s brooch.',
        context:
            'Not a translation of Sophocles but a Roman horror show: the plague, the necromancy and the ghost are Seneca\'s additions, and they are what Elizabethan tragedy took from him. Compare the two Oedipuses side by side; Miller prints his own analysis at the back.',
        topics: ['Oedipus', 'plague', 'Tiresias', 'necromancy', 'Sophocles'],
    },
    {
        slug: 'agamemnon-seneca',
        title: 'Agamemnon',
        latinTitle: 'Agamemnon',
        author: 'Seneca',
        dateLabel: null,
        kind: 'tragedy',
        ...SENECA_TRANSLATION,
        synopsis:
            'Agamemnon comes home from Troy with Cassandra as his prize, and Clytemnestra and Aegisthus are waiting. The murder happens inside the palace; Cassandra, who has seen it coming for five acts, walks into it anyway and prophesies her own death on the way.',
        context:
            'Seneca compresses Aeschylus\' trilogy into one play and hands the best writing to Cassandra and to the ghost of Thyestes, who opens it. The result is less a homecoming than an execution with a chorus.',
        topics: ['Agamemnon', 'Clytemnestra', 'Cassandra', 'Aeschylus', 'revenge'],
    },
    {
        slug: 'thyestes-seneca',
        title: 'Thyestes',
        latinTitle: 'Thyestes',
        author: 'Seneca',
        dateLabel: null,
        kind: 'tragedy',
        ...SENECA_TRANSLATION,
        synopsis:
            'Atreus means to punish his brother Thyestes for seducing his wife, so he pretends to reconcile with him, invites him home, and serves him his own sons at dinner. Thyestes eats, asks for more, and is told what he has eaten.',
        context:
            'The most famous Senecan play, and the one that most directly produced the revenge tragedy of the English stage. The horror is never shown: it is described, at length, by a messenger who wishes he had not seen it.',
        topics: ['Atreus', 'Thyestes', 'revenge', 'cannibalism', 'Elizabethan tragedy'],
    },
    {
        slug: 'hercules-oetaeus-seneca',
        title: 'Hercules on Oeta',
        latinTitle: 'Hercules Oetaeus',
        author: 'Seneca',
        dateLabel: null,
        kind: 'tragedy',
        ...SENECA_TRANSLATION,
        synopsis:
            'Deianira, believing Hercules has abandoned her for Iole, sends him the shirt soaked in what she thinks is a love charm. It is the blood of the centaur Nessus, and it burns him alive; he builds his own pyre on Mount Oeta and is taken up among the gods.',
        context:
            'Almost certainly not by Seneca: it is half as long again as his longest play, repeats his tricks, and ends with an apotheosis no Stoic would have written. Printed in Miller\'s edition, so it is here and labelled.',
        topics: ['Hercules', 'Deianira', 'Nessus', 'apotheosis', 'spurious'],
    },
    {
        slug: 'octavia-seneca',
        title: 'Octavia',
        latinTitle: 'Octavia',
        author: 'Seneca',
        dateLabel: null,
        kind: 'praetexta',
        ...SENECA_TRANSLATION,
        synopsis:
            'Nero has tired of his wife Octavia and wants to marry Poppaea. The play follows Octavia\'s attempts to survive the divorce, the people\'s brief support for her, and the execution that ends it — with Seneca himself on stage as a counsellor Nero refuses to hear.',
        context:
            'Not a tragedy but a fabula praetexta, a play on a Roman subject, and not by Seneca: it dramatises events of AD 62, three years before he died, and puts him in it as a character. The only complete Latin historical drama that survives.',
        topics: ['Nero', 'Octavia', 'Poppaea', 'praetexta', 'spurious'],
    },
]

export const ROMAN_PLAYS = [...PLAUTUS_PLAYS, ...TERENCE_PLAYS, ...SENECA_PLAYS]

/** The generated catalogue, keyed by play slug. */
export const ROMAN_SHELF_BY_SLUG = Object.fromEntries(
    ROMAN_SHELF.map((entry) => [entry.slug, entry])
)

/**
 * Shape the library UI renders. Every card is a hosted PDF: nothing here opens
 * another website.
 */
export function toRomanCard(play) {
    const built = ROMAN_SHELF_BY_SLUG[play.slug]
    if (!built) {
        throw new Error(`${play.slug}: no PDF in the Roman shelf - run npm run roman:build`)
    }

    const subtitle = `Translated by ${built.translator} · PDF, ${built.pages} pages · free`

    return {
        id: `play-${play.slug}`,
        slug: play.slug,
        code: '',
        title: play.title,
        subtitle,
        author: play.author,
        latinTitle: play.latinTitle,
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
        domain: ROMAN_DOMAIN,
        priceKobo: 0,
        is_free: true,
        download_path: built.download_path,
        external_url: null,
        page_count: built.pages,
        file_size_bytes: built.bytes,
        description: play.synopsis,
        is_official: true,
        isRoman: true,
        isExternal: false,
        isBook: false,
        isFresherPdf: false,
        isDrama: false,
    }
}

export function findRomanPlayBySlug(slug) {
    return ROMAN_PLAYS.find((play) => play.slug === slug) || null
}

/** e.g. "20 comedies by Plautus" — used in copy, never hard-coded. */
export function romanCounts() {
    return {
        plautus: PLAUTUS_PLAYS.length,
        terence: TERENCE_PLAYS.length,
        seneca: SENECA_PLAYS.length,
        total: ROMAN_PLAYS.length,
    }
}
