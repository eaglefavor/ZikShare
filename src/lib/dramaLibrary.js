/**
 * Greek tragedy shelf — the complete surviving plays of Aeschylus, Sophocles
 * and Euripides, each linked to a free public-domain English translation.
 *
 * ## What this shelf is, and what it is not
 *
 * These are **not** ZikShare PDFs. Nothing here is hosted, copied or downloaded
 * by ZikShare: every card opens the full text on Project Gutenberg, where the
 * file is free and the copyright has expired. The card says so, the link is an
 * external link, and no page count is invented for a document we do not hold.
 *
 * ## How the links were chosen
 *
 * Each `gutenbergId` was read off Project Gutenberg's own catalogue (author
 * pages for Aeschylus id 2825, Sophocles id 26, Euripides id 1680, plus the
 * individual ebook pages), so the id in this file is the id Gutenberg publishes.
 * A translation is credited only where the ebook page states the translator.
 *
 * ## The four plays that are missing, and why
 *
 * Euripides' *Ion*, *The Suppliants*, *Iphigenia at Aulis* and *The Phoenician
 * Women* have no public-domain English translation in the Gutenberg catalogue.
 * They are listed in `EURIPIDES_NOT_ON_GUTENBERG` instead of being given a card
 * with a dead or misleading link — a reader is told they exist and told where
 * they are not.
 *
 * ## Synopses
 *
 * The plot summaries are written for ZikShare from the plays themselves. They
 * are not copied from a publisher's blurb, and they do not pretend to replace
 * reading the text.
 */

export const DRAMA_DOMAIN = 'Greek Tragedy'

/** The three playwrights, in the order the shelf presents them. */
export const DRAMA_AUTHORS = [
    {
        name: 'Aeschylus',
        dates: 'c. 525–456 BC',
        note: 'The oldest surviving tragedian. He wrote trilogies that argue a single question across three plays — the *Oresteia* is the only complete one left — and his chorus is still a character, not an interval.',
    },
    {
        name: 'Sophocles',
        dates: 'c. 497–406 BC',
        note: 'Seven plays survive. He added the third actor, so a scene can hold three people who all want different things, and he builds recognition (anagnorisis) as the engine of the plot.',
    },
    {
        name: 'Euripides',
        dates: 'c. 484–406 BC',
        note: 'Nineteen plays survive, more than either rival. He puts slaves, children and women at the centre, undercuts heroic myth, and ends several plays with a god arriving to tidy a mess the humans made.',
    },
]

const GUTENBERG = 'https://www.gutenberg.org/ebooks'

/**
 * Aeschylus — seven plays, all that survives of roughly seventy to ninety.
 */
export const AESCHYLUS_PLAYS = [
    {
        slug: 'persians-aeschylus',
        title: 'The Persians',
        greekTitle: 'Πέρσαι',
        author: 'Aeschylus',
        year: 472,
        translator: null,
        gutenbergId: 8714,
        collection: 'Four Plays of Aeschylus',
        kind: 'tragedy',
        synopsis:
            'At the Persian court in Susa, the old queen Atossa and a chorus of elders wait for news of Xerxes\' expedition against Greece. Messenger after messenger reports the fleet destroyed at Salamis, and the play ends with the king himself returning in rags to a ruined palace.',
        context:
            'The oldest surviving Greek tragedy, and the only one drawn from recent history rather than myth: Aeschylus fought at Salamis himself, eight years before it was staged. Watch how the play gives the defeated enemy a full, sympathetic voice.',
        topics: ['Persian Wars', 'Salamis', 'hubris', 'historical tragedy', 'chorus'],
    },
    {
        slug: 'seven-against-thebes-aeschylus',
        title: 'Seven Against Thebes',
        greekTitle: 'Ἑπτὰ ἐπὶ Θήβας',
        author: 'Aeschylus',
        year: 467,
        translator: null,
        gutenbergId: 27458,
        collection: 'Prometheus Bound and the Seven Against Thebes',
        kind: 'tragedy',
        synopsis:
            'The Argive army under Polynices camps outside Thebes with seven champions against seven gates. Inside, King Eteocles posts his own defenders gate by gate, until only one pairing is left: he must face his brother, and both die.',
        context:
            'The middle play of a Theban trilogy whose other two are lost. The city is the protagonist as much as Eteocles: the chorus of Theban women panics, and the play asks what a ruler owes a city he is prepared to die in.',
        topics: ['Thebes', 'civil war', 'fratricide', 'city-state', 'Oedipus'],
    },
    {
        slug: 'suppliants-aeschylus',
        title: 'The Suppliants',
        greekTitle: 'Ἱκέτιδες',
        author: 'Aeschylus',
        year: -463,
        translator: null,
        gutenbergId: 8714,
        collection: 'Four Plays of Aeschylus',
        kind: 'tragedy',
        synopsis:
            'The fifty daughters of Danaus flee Egypt to escape forced marriage with their cousins, and throw themselves on the mercy of Argos. The Argive king must decide whether to shelter them and accept a war, and the play ends with the women safe but the army of suitors already on the coast.',
        context:
            'The earliest surviving play about asylum. Most of what happens is a debate about law, hospitality and the cost of protecting a stranger — an argument that has never stopped being staged.',
        topics: ['asylum', 'refugees', 'marriage', 'Argos', 'law'],
    },
    {
        slug: 'agamemnon-aeschylus',
        title: 'Agamemnon',
        greekTitle: 'Ἀγαμέμνων',
        author: 'Aeschylus',
        year: 458,
        translator: null,
        gutenbergId: 14417,
        collection: 'The Agamemnon of Aeschylus',
        kind: 'tragedy',
        synopsis:
            'Ten years after sailing for Troy, Agamemnon comes home with Cassandra as his prize. Clytemnestra, who has ruled in his absence and never forgiven him for sacrificing their daughter, meets him at the door with a bath and a net, and kills him.',
        context:
            'First play of the Oresteia, the only complete tragic trilogy to survive. The beacon speech, the carpet scene where a king walks on purple into his own house, and Cassandra\'s prophecy are three of the most studied scenes in world drama.',
        topics: ['Oresteia', 'revenge', 'Clytemnestra', 'Cassandra', 'homecoming'],
    },
    {
        slug: 'libation-bearers-aeschylus',
        title: 'The Libation Bearers',
        greekTitle: 'Χοηφόροι',
        author: 'Aeschylus',
        year: 458,
        translator: null,
        gutenbergId: 8604,
        collection: 'The House of Atreus',
        kind: 'tragedy',
        synopsis:
            'Orestes returns from exile in disguise, meets his sister Electra at their father\'s grave, and — ordered by Apollo — kills Clytemnestra and Aegisthus. The last image is Orestes standing over the bodies as the Furies appear to him alone.',
        context:
            'Second play of the Oresteia. The kommos, a sung lament shared between the siblings and the chorus at the tomb, is the model for every revenge play written since.',
        topics: ['Oresteia', 'Orestes', 'Electra', 'matricide', 'revenge'],
    },
    {
        slug: 'eumenides-aeschylus',
        title: 'The Eumenides',
        greekTitle: 'Εὐμενίδες',
        author: 'Aeschylus',
        year: 458,
        translator: null,
        gutenbergId: 8604,
        collection: 'The House of Atreus',
        kind: 'tragedy',
        synopsis:
            'Hunted by the Furies to Athens, Orestes is tried before Athena and a jury of citizens. The votes are tied, Athena casts the deciding one, and the Furies are offered a home and a cult in the city instead of endless vendetta.',
        context:
            'The last play of the Oresteia turns a blood feud into a court case. Read it beside any modern play about justice: this is the founding myth of trial by jury on the Athenian stage.',
        topics: ['Oresteia', 'justice', 'trial', 'Athena', 'Furies'],
    },
    {
        slug: 'prometheus-bound-aeschylus',
        title: 'Prometheus Bound',
        greekTitle: 'Προμηθεὺς Δεσμώτης',
        author: 'Aeschylus',
        year: null,
        translator: null,
        gutenbergId: 27458,
        collection: 'Prometheus Bound and the Seven Against Thebes',
        kind: 'tragedy',
        synopsis:
            'Prometheus, chained to a rock at the edge of the world for stealing fire for humanity, defies every visit — from Ocean, from Io, from Hermes — and refuses to say what he knows about Zeus\'s fall. The play ends with him hurled into the earth.',
        context:
            'Probably the most translated of all Greek plays, and the most political. Its date and even its authorship are still argued: the metre and theology differ from the rest of Aeschylus.',
        topics: ['Prometheus', 'tyranny', 'resistance', 'Zeus', 'fire'],
    },
]

/**
 * Sophocles — seven plays; the other seven of the ninety or so attributed to
 * him survive only in fragments except for part of the satyr play *Ichneutae*.
 */
export const SOPHOCLES_PLAYS = [
    {
        slug: 'ajax-sophocles',
        title: 'Ajax',
        greekTitle: 'Αἴας',
        author: 'Sophocles',
        year: -445,
        translator: null,
        gutenbergId: 14484,
        collection: 'The Seven Plays in English Verse',
        kind: 'tragedy',
        synopsis:
            'When Achilles\' armour is awarded to Odysseus, Ajax goes mad with humiliation and slaughters the army\'s cattle in the belief that he is killing the commanders. He comes to his senses, refuses to live with what he has done, and falls on his sword.',
        context:
            'The earliest surviving Sophocles. The second half, in which his enemies argue over whether a traitor may be buried, is where the moral weight sits — Ajax is dead and the play keeps going without him.',
        topics: ['Ajax', 'honour', 'suicide', 'Odysseus', 'burial'],
    },
    {
        slug: 'antigone-sophocles',
        title: 'Antigone',
        greekTitle: 'Ἀντιγόνη',
        author: 'Sophocles',
        year: -441,
        translator: null,
        gutenbergId: 31,
        collection: 'Plays of Sophocles',
        kind: 'tragedy',
        synopsis:
            'Creon forbids the burial of the traitor Polynices; his niece Antigone buries him anyway and is walled up alive. By the time Creon changes his mind, Antigone, his son Haemon and his wife Eurydice are all dead.',
        context:
            'The most staged tragedy in the repertoire, and the most argued over: family against state, conscience against law, or — as many readings now insist — two people who are both wrong in the same way.',
        topics: ['Antigone', 'Creon', 'burial', 'law', 'resistance', 'family'],
    },
    {
        slug: 'women-of-trachis-sophocles',
        title: 'Women of Trachis',
        greekTitle: 'Τραχίνιαι',
        author: 'Sophocles',
        year: null,
        translator: null,
        gutenbergId: 14484,
        collection: 'The Seven Plays in English Verse',
        kind: 'tragedy',
        synopsis:
            'Deianira, waiting at home while Heracles campaigns, learns he has sent a captive woman ahead of him. She sends him a robe smeared with what she believes is a love charm; it is the Hydra\'s poison, and she kills herself when she realises what she has done.',
        context:
            'The least performed of the seven and the one that belongs to Heracles rather than to any hero of legend. Its subject is a marriage, and the poison works on stage in real time.',
        topics: ['Heracles', 'Deianira', 'jealousy', 'poison', 'marriage'],
    },
    {
        slug: 'oedipus-the-king-sophocles',
        title: 'Oedipus the King',
        greekTitle: 'Οἰδίπους Τύραννος',
        author: 'Sophocles',
        year: -429,
        translator: null,
        gutenbergId: 27673,
        collection: 'Oedipus King of Thebes',
        kind: 'tragedy',
        synopsis:
            'Thebes is dying of plague, and Oedipus swears to find the murderer of the previous king. He interrogates a prophet, a shepherd and finally himself, and learns he killed his father at a crossroads and married his mother. He blinds himself with her brooch.',
        context:
            'Aristotle\'s model tragedy, quoted in the Poetics for its reversal and recognition: the audience knows the answer before the hero does, and the whole play is the machinery of a man finding out.',
        topics: ['Oedipus', 'fate', 'plague', 'anagnorisis', 'Thebes'],
    },
    {
        slug: 'electra-sophocles',
        title: 'Electra',
        greekTitle: 'Ἠλέκτρα',
        author: 'Sophocles',
        year: null,
        translator: null,
        gutenbergId: 14484,
        collection: 'The Seven Plays in English Verse',
        kind: 'tragedy',
        synopsis:
            'Electra has waited years at Mycenae for her brother to avenge their father, while Clytemnestra and Aegisthus rule. Orestes arrives with a false report of his own death, and the play ends with the two of them walking out of the house having killed their mother.',
        context:
            'Compare it directly with Euripides\' Electra and with the Libation Bearers: the same murder, three different verdicts on it. Sophocles makes Electra the emotional centre and gives her the largest part in the surviving repertoire.',
        topics: ['Electra', 'Orestes', 'Clytemnestra', 'revenge', 'Mycenae'],
    },
    {
        slug: 'philoctetes-sophocles',
        title: 'Philoctetes',
        greekTitle: 'Φιλοκτήτης',
        author: 'Sophocles',
        year: -409,
        translator: null,
        gutenbergId: 14484,
        collection: 'The Seven Plays in English Verse',
        kind: 'tragedy',
        synopsis:
            'Philoctetes, marooned on Lemnos for ten years with a rotting foot and Heracles\' bow, is visited by Odysseus and the young Neoptolemus, who are told to bring him to Troy by any means. Neoptolemus lies, then refuses to keep lying.',
        context:
            'A play about a lie that works and a liar who cannot live with it. It is the most concentrated ethical drama of the five: three men, one island, and an argument about whether the end excuses the means.',
        topics: ['Philoctetes', 'Neoptolemus', 'deception', 'Troy', 'Lemnos'],
    },
    {
        slug: 'oedipus-at-colonus-sophocles',
        title: 'Oedipus at Colonus',
        greekTitle: 'Οἰδίπους ἐπὶ Κολωνῷ',
        author: 'Sophocles',
        year: -401,
        translator: null,
        gutenbergId: 31,
        collection: 'Plays of Sophocles',
        kind: 'tragedy',
        synopsis:
            'The blinded Oedipus, guided by Antigone, arrives as a beggar at a grove outside Athens. Both his sons want him back for the blessing his grave will bring; he curses them, and dies off-stage in a mystery that Theseus alone is allowed to see.',
        context:
            'Staged after Sophocles\' death, and written by a man in his late eighties about an old man\'s death. It was performed in Athens while the city was losing a war, which is worth remembering while reading the praise of Athens in it.',
        topics: ['Oedipus', 'Athens', 'old age', 'exile', 'Colonus'],
    },
]

/**
 * Euripides — fifteen of the nineteen plays that survive, each with a free
 * English text. The other four are recorded below without a link.
 */
export const EURIPIDES_PLAYS = [
    {
        slug: 'alcestis-euripides',
        title: 'Alcestis',
        greekTitle: 'Ἄλκηστις',
        author: 'Euripides',
        year: -438,
        translator: null,
        gutenbergId: 10523,
        collection: 'Alcestis',
        kind: 'tragedy',
        synopsis:
            'Admetus is allowed to live if someone dies in his place, and only his wife Alcestis agrees. She dies, he grieves, and Heracles — arriving as a guest, not knowing why the house is in mourning — wrestles Death at the tomb and gives her back.',
        context:
            'Staged where a satyr play would normally go, so it ends with a rescue and a drunken hero. Admetus is often called the most detestable sympathetic character in Greek drama: read the ending and decide how happy it actually is.',
        topics: ['Alcestis', 'Admetus', 'sacrifice', 'Heracles', 'hospitality'],
    },
    {
        slug: 'medea-euripides',
        title: 'Medea',
        greekTitle: 'Μήδεια',
        author: 'Euripides',
        year: -431,
        translator: null,
        gutenbergId: 35451,
        collection: 'Medea of Euripides',
        kind: 'tragedy',
        synopsis:
            'Jason abandons Medea, the foreign princess who saved him and murdered for him, to marry the king\'s daughter. Medea sends the bride a poisoned robe and crown, kills her own two sons to wound Jason beyond repair, and leaves in a chariot sent by the sun.',
        context:
            'The play that made Euripides notorious. It is a study of a woman with no legal status and no home, and it refuses to make her either villain or victim by the end — she is a mother who has calculated exactly what will hurt.',
        topics: ['Medea', 'Jason', 'revenge', 'infanticide', 'exile'],
    },
    {
        slug: 'children-of-heracles-euripides',
        title: 'The Children of Heracles',
        greekTitle: 'Ἡρακλεῖδαι',
        author: 'Euripides',
        year: -430,
        translator: 'Michael Wodhull',
        gutenbergId: 77336,
        collection: 'Hecuba and Other Plays',
        kind: 'tragedy',
        synopsis:
            'The children of Heracles, hunted by Eurystheus, reach Athens and throw themselves on the city\'s protection. To save them, Heracles\' old mother offers to die, one of the daughters volunteers instead, and the play ends in a battle in which Athens breaks the pursuit.',
        context:
            'A play about which city on Earth will take in a hunted family, staged in a war. Its most quoted passage is a servant arguing that a noble death beats a safe life, delivered about a girl who is about to be killed.',
        topics: ['Heracleidae', 'Athens', 'asylum', 'sacrifice', 'Eurystheus'],
    },
    {
        slug: 'hippolytus-euripides',
        title: 'Hippolytus',
        greekTitle: 'Ἱππόλυτος',
        author: 'Euripides',
        year: -428,
        translator: null,
        gutenbergId: 8418,
        collection: 'Hippolytus; The Bacchae',
        kind: 'tragedy',
        synopsis:
            'Phaedra, married to Theseus, falls in love with her stepson Hippolytus, who has no interest in any woman. Her nurse tells him, he reacts with disgust, she hangs herself leaving a letter accusing him of rape, and Theseus curses him with a sea-bull.',
        context:
            'The one surviving play where a god opens and closes the action: Aphrodite sets it going and Artemis explains it afterwards, and the human beings are broken in between. It won first prize.',
        topics: ['Phaedra', 'Hippolytus', 'desire', 'false accusation', 'Artemis'],
    },
    {
        slug: 'andromache-euripides',
        title: 'Andromache',
        greekTitle: 'Ἀνδρομάχη',
        author: 'Euripides',
        year: -425,
        translator: 'Michael Wodhull',
        gutenbergId: 77336,
        collection: 'Hecuba and Other Plays',
        kind: 'tragedy',
        synopsis:
            'Andromache, Hector\'s widow, is a concubine in the house of Neoptolemus and barren Hermione wants her gone. Hermione and Menelaus plot to kill her; she is saved by Peleus, then Hermione is saved by Orestes, and Neoptolemus is murdered at Delphi.',
        context:
            'The play about what victory in war does to the women who survive it, and how quickly the victors\' own households curdle. Its ending is famously bleaker than its rescue-villain plot suggests.',
        topics: ['Andromache', 'Hermione', 'war captives', 'Neoptolemus', 'Delphi'],
    },
    {
        slug: 'hecuba-euripides',
        title: 'Hecuba',
        greekTitle: 'Ἑκάβη',
        author: 'Euripides',
        year: -424,
        translator: 'Michael Wodhull',
        gutenbergId: 77336,
        collection: 'Hecuba and Other Plays',
        kind: 'tragedy',
        synopsis:
            'The captive queen Hecuba learns that the Greeks will sacrifice her daughter Polyxena at Achilles\' tomb, and then that her last son Polydorus has been murdered by the Thracian king Polymestor. She gets Polymestor into her tent, blinds him, and kills his children.',
        context:
            'Two deaths and one revenge, in that order, and the second death is a mother\'s. Polyxena\'s exit to her execution is one of the great set pieces of the fifth-century stage.',
        topics: ['Hecuba', 'Polyxena', 'Polymestor', 'revenge', 'Trojan War'],
    },
    {
        slug: 'heracles-euripides',
        title: 'Heracles',
        greekTitle: 'Ἡρακλῆς μαινόμενος',
        author: 'Euripides',
        year: -416,
        translator: 'Michael Wodhull',
        gutenbergId: 77336,
        collection: 'Hecuba and Other Plays',
        kind: 'tragedy',
        synopsis:
            'While Heracles is down in the underworld, a usurper is about to execute his wife and children in Thebes. Heracles returns in time, kills the usurper, and then — sent mad by Hera — kills the family he just saved. Theseus takes him to Athens.',
        context:
            'The reversal is total and it happens in one scene: the hero of the labours becomes the murderer of his own children on the same day. Often called the most violent play in the canon, and the one that most resembles a modern psychological drama.',
        topics: ['Heracles', 'madness', 'Thebes', 'Theseus', 'family'],
    },
    {
        slug: 'trojan-women-euripides',
        title: 'The Trojan Women',
        greekTitle: 'Τρῳάδες',
        author: 'Euripides',
        year: -415,
        translator: null,
        gutenbergId: 35171,
        collection: 'The Trojan Women of Euripides',
        kind: 'tragedy',
        synopsis:
            'Troy has fallen and the women wait to be allotted to their captors. Cassandra is given to Agamemnon, Andromache\'s son is thrown from the walls, Polyxena is taken to Achilles\' grave, and Helen argues for her life while Hecuba argues her down.',
        context:
            'Almost no plot and almost no action: this is a play of aftermath, and it was staged the year after the Athenians killed the men of Melos. Read it as an argument against the war that was being fought while it was performed.',
        topics: ['Trojan Women', 'Hecuba', 'Cassandra', 'Andromache', 'war'],
    },
    {
        slug: 'iphigenia-in-tauris-euripides',
        title: 'Iphigenia in Tauris',
        greekTitle: 'Ἰφιγένεια ἡ ἐν Ταύροις',
        author: 'Euripides',
        year: -413,
        translator: null,
        gutenbergId: 5063,
        collection: 'The Iphigenia in Tauris of Euripides',
        kind: 'tragedy',
        synopsis:
            'Iphigenia, saved from sacrifice at Aulis and made a priestess in a far country that kills strangers, is ordered to prepare two Greek captives for death. They turn out to be her brother Orestes and his friend Pylades, and the three of them plot an escape with the temple statue.',
        context:
            'The closest Greek tragedy comes to an adventure story, and one of the very few that ends well. It is also the play that the modern stage rediscovers whenever it wants to talk about a woman who has been used by a cult.',
        topics: ['Iphigenia', 'Orestes', 'Pylades', 'escape', 'Tauris'],
    },
    {
        slug: 'helen-euripides',
        title: 'Helen',
        greekTitle: 'Ἑλένη',
        author: 'Euripides',
        year: -412,
        translator: 'Michael Wodhull',
        gutenbergId: 77336,
        collection: 'Hecuba and Other Plays',
        kind: 'tragedy',
        synopsis:
            'The real Helen never went to Troy — a phantom made of air went in her place — and she has spent seventeen years as a guest-hostage in Egypt. Menelaus arrives shipwrecked, finds her, and together they trick the Egyptian king and escape.',
        context:
            'Euripides rewriting the whole Trojan War as a misunderstanding, in a play that behaves like comedy. Pair it with the Trojan Women, staged three years earlier, and the tonal range becomes startling.',
        topics: ['Helen', 'Menelaus', 'Egypt', 'phantom', 'escape'],
    },
    {
        slug: 'electra-euripides',
        title: 'Electra',
        greekTitle: 'Ἠλέκτρα',
        author: 'Euripides',
        year: -413,
        translator: null,
        gutenbergId: 14322,
        collection: 'The Electra of Euripides',
        kind: 'tragedy',
        synopsis:
            'Electra has been married off to a poor farmer to keep her from having noble children. Orestes arrives, is recognised, and with her help kills Clytemnestra and Aegisthus — after which brother and sister come apart under what they have done.',
        context:
            'The anti-heroic version: a palace reduced to a peasant\'s cottage, a princess carrying water, and a murder committed by two people who then cannot look at each other. Staged beside Sophocles\' Electra it is the clearest case of two plays arguing.',
        topics: ['Electra', 'Orestes', 'Clytemnestra', 'revenge', 'poverty'],
    },
    {
        slug: 'orestes-euripides',
        title: 'Orestes',
        greekTitle: 'Ὀρέστης',
        author: 'Euripides',
        year: -408,
        translator: 'Theodore Alois Buckley',
        gutenbergId: 15081,
        collection: 'The Tragedies of Euripides, Volume I',
        kind: 'tragedy',
        synopsis:
            'Six days after the matricide, the Argive assembly condemns Orestes and Electra to death. Their last scheme is to murder Helen and hold her daughter hostage; Apollo intervenes at the last moment and the play stops rather than resolves.',
        context:
            'The most chaotic play in the canon, and the most modern in its portrait of two people who have done something unforgivable and are now improvising survival. Some critics call it a tragedy with a melodrama inside it; that is the point.',
        topics: ['Orestes', 'Electra', 'Helen', 'Argos', 'judgement'],
    },
    {
        slug: 'bacchae-euripides',
        title: 'The Bacchae',
        greekTitle: 'Βάκχαι',
        author: 'Euripides',
        year: -405,
        translator: null,
        gutenbergId: 35173,
        collection: 'The Bacchae of Euripides',
        kind: 'tragedy',
        synopsis:
            'Dionysus returns to Thebes, where his cousin Pentheus refuses to recognise him, and drives the city\'s women into the hills. Pentheus is lured out in women\'s clothes to watch them, is torn apart by the revellers, and his own mother carries his head home believing it is a lion\'s.',
        context:
            'Produced after Euripides died, and the only surviving play about the god of theatre himself. It is the hardest of the tragedies to moralise: the god is cruel, the king is a tyrant, and the play backs neither.',
        topics: ['Dionysus', 'Pentheus', 'Agave', 'Thebes', 'ecstasy'],
    },
    {
        slug: 'cyclops-euripides',
        title: 'Cyclops',
        greekTitle: 'Κύκλωψ',
        author: 'Euripides',
        year: null,
        translator: 'Michael Wodhull',
        gutenbergId: 77336,
        collection: 'Hecuba and Other Plays',
        kind: 'satyr',
        synopsis:
            'Odysseus and his crew land on the island of Polyphemus, who eats them two at a time. Odysseus gets the giant drunk on wine and blinds him, and the chorus of satyrs — comic, cowardly, and pretending to help — escape with him.',
        context:
            'The only complete satyr play to survive, and the reason we know what the fourth slot of a tragic tetralogy actually looked like. Same story as Odyssey book nine, played for laughs by a chorus of goat-men.',
        topics: ['satyr play', 'Odysseus', 'Polyphemus', 'Odyssey', 'comedy'],
    },
    {
        slug: 'rhesus-euripides',
        title: 'Rhesus',
        greekTitle: 'Ῥῆσος',
        author: 'Euripides',
        year: null,
        translator: null,
        gutenbergId: 35170,
        collection: 'The Rhesus of Euripides',
        kind: 'tragedy',
        synopsis:
            'A night raid during the Trojan war: Dolon goes out to spy on the Greeks and is caught, Odysseus and Diomedes enter the Trojan camp, and the newly arrived Thracian king Rhesus is killed in his sleep.',
        context:
            'Transmitted among Euripides\' plays but probably written by someone else in the fourth century. Read it as evidence of how the repertoire was assembled, and as a war play built entirely out of darkness and eavesdropping.',
        topics: ['Rhesus', 'Dolon', 'night raid', 'Iliad', 'authorship'],
    },
]

/**
 * Euripides plays that survive in Greek but have no public-domain English
 * translation in the Gutenberg catalogue. Listed so a reader knows the whole
 * corpus exists and knows exactly why four cards are absent.
 */
export const EURIPIDES_NOT_ON_GUTENBERG = [
    {
        title: 'Ion',
        greekTitle: 'Ἴων',
        note: 'Creusa is raped by Apollo and abandons the child; years later she nearly kills the temple servant who is her son. No free English translation on Project Gutenberg.',
    },
    {
        title: 'The Suppliants',
        greekTitle: 'Ἱκέτιδες',
        note: 'The mothers of the Seven Against Thebes demand the right to bury their sons, and Theseus forces Thebes to allow it. No free English translation on Project Gutenberg.',
    },
    {
        title: 'Iphigenia at Aulis',
        greekTitle: 'Ἰφιγένεια ἡ ἐν Αὐλίδι',
        note: 'Agamemnon is told he must sacrifice his daughter to get the fleet to Troy, and does. No free English translation on Project Gutenberg.',
    },
    {
        title: 'The Phoenician Women',
        greekTitle: 'Φοίνισσαι',
        note: 'The war of the brothers at Thebes, with Jocasta still alive to watch it. No free English translation on Project Gutenberg.',
    },
]

export const DRAMA_PLAYS = [
    ...AESCHYLUS_PLAYS,
    ...SOPHOCLES_PLAYS,
    ...EURIPIDES_PLAYS,
]

/** The public page for a play, or the collection that contains it. */
export function dramaUrl(play) {
    return `${GUTENBERG}/${play.gutenbergId}`
}

/** Shape the library UI renders. These are links out, never hosted files. */
export function toDramaCard(play) {
    const subtitle = play.translator
        ? `Translated by ${play.translator} · free full text at Project Gutenberg`
        : 'Free full text at Project Gutenberg'

    return {
        id: `play-${play.slug}`,
        slug: play.slug,
        code: '',
        title: play.title,
        subtitle,
        author: play.author,
        greekTitle: play.greekTitle,
        translator: play.translator,
        gutenbergId: play.gutenbergId,
        collection: play.collection,
        year: play.year,
        kind: play.kind,
        body: play.synopsis,
        context: play.context,
        topics: play.topics,
        faculty: 'Faculty of Arts',
        department: 'Theatre & Film Studies',
        level: 'All levels',
        material_type: 'textbooks',
        domain: DRAMA_DOMAIN,
        priceKobo: 0,
        is_free: true,
        // No download_path: ZikShare does not host this text.
        download_path: null,
        external_url: dramaUrl(play),
        page_count: null,
        file_size_bytes: null,
        description: play.synopsis,
        is_official: true,
        isDrama: true,
        isExternal: true,
        isBook: false,
        isFresherPdf: false,
    }
}

export function findPlayBySlug(slug) {
    return DRAMA_PLAYS.find((play) => play.slug === slug) || null
}
