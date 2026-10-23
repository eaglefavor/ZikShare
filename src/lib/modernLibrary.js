/**
 * Modern theatre shelf — the stage from Ibsen to the Second World War, grouped
 * by the movements that made it, typeset as PDFs and hosted by ZikShare.
 *
 * ## What is here
 *
 * Fifty-eight plays in public-domain English texts:
 *
 * - *Realism*: Ibsen's twelve prose plays from the Archer and Sharp
 *   translations, Chekhov's five, nine Shaw plays, three Wilde comedies,
 *   four Synge plays, Gorky's *The Lower Depths* and Tolstoy's *The Power of
 *   Darkness*.
 * - *Naturalism*: Strindberg's *The Father*, *Miss Julie*, *Creditors* and
 *   *The Dance of Death*, and four Hauptmann plays including *The Weavers*.
 * - *Symbolism*: Maeterlinck, Yeats's verse plays, Wilde's *Salomé* and
 *   Ibsen's *Peer Gynt*.
 * - *Expressionism*: Strindberg's *A Dream Play*, *The Ghost Sonata* and
 *   *The Road to Damascus*, and Čapek's *R.U.R.* and *The Insect Play*.
 *
 * ## What is not here, and why
 *
 * Epic theatre and the theatre of the absurd are almost entirely in copyright.
 * Brecht died in 1956 and Beckett in 1989; their plays, and the standard
 * English translations of Ionesco, Pinter and Genet, cannot be reproduced
 * without permission. Rather than give those movements a token card, the shelf
 * names them in `MODERN_UNHOSTABLE` and says what the reader should read
 * elsewhere.
 *
 * The copyright line is not the same everywhere: a play enters the public
 * domain at different dates in the United States and the European Union, so
 * this shelf only carries texts that Project Gutenberg itself publishes as
 * public domain, and the edition is credited on every card.
 */

import { MODERN_SHELF } from './modernLibraryData.js'

export const MODERN_DOMAIN = 'Modern Theatre'

/** The movements, in the order the shelf lists them. */
export const MODERN_MOVEMENTS = [
    {
        name: 'Realism',
        dates: 'c. 1877–1914',
        note: 'The play as a room with a fourth wall, and the argument inside it as the action. Ibsen put a woman leaving her marriage on stage in 1879 and the century did not recover; Chekhov put a family failing to leave a house on stage twenty-five years later and made it funny and unbearable at once. Shaw used the same room to argue about money, and Synge used it to argue about Ireland.',
    },
    {
        name: 'Naturalism',
        dates: 'c. 1887–1911',
        note: 'Realism with a theory behind it: character as the product of heredity and environment, and the stage as a laboratory. Strindberg wrote the manifesto in his preface to Miss Julie; Hauptmann put Silesian weavers on the stage in 1892 and the police were called.',
    },
    {
        name: 'Symbolism',
        dates: 'c. 1890–1917',
        note: 'Against the furniture and the argument: plays built from dream, silence and image, where the important thing happens off the stage and the dialogue circles it. Maeterlinck wrote for marionettes in theory and for the stage in practice; Yeats built a national theatre out of Irish myth; Wilde wrote Salomé as a French symbolist play before he wrote his English comedies.',
    },
    {
        name: 'Expressionism',
        dates: 'c. 1898–1921',
        note: 'The stage as the inside of a mind. Strindberg got there first, in The Road to Damascus and A Dream Play, where time and place dissolve and the characters are stations on one man\u2019s road; the German expressionists turned it into a movement, and Čapek used it to put robots on stage and invent the word.',
    },
    {
        name: 'Epic Theatre',
        dates: 'c. 1926–1956',
        note: 'Brecht\u2019s theatre of the lecture: narrative scenes, placards, songs, actors who show a character rather than become one, and an audience kept awake to judge. Its major texts are still in copyright and cannot be hosted here; the shelf names them and says why.',
    },
    {
        name: 'Absurdism',
        dates: 'c. 1950–1960',
        note: 'The theatre after the war that refused argument, plot and consolation: two tramps waiting, a room filling with chairs, a man turning into a rhinoceros. Every canonical play of the movement is in copyright. The shelf names them rather than pretending otherwise.',
    },
]

/** A Gutenberg e-text, credited the way the edition deserves. */
const text = (id, translator) => ({
    sourceId: id,
    translator,
    sourceEdition: 'Project Gutenberg English text',
    sourceName: `Project Gutenberg eBook #${id}`,
})

const volume = (id, translator, sourceEdition) => ({
    sourceId: id,
    translator,
    sourceEdition,
    sourceName: `Project Gutenberg eBook #${id}`,
})

const ARCHER = 'The Collected Works of Henrik Ibsen, ed. William Archer'

/* ── Realism: Ibsen ───────────────────────────────────────────────────────── */

export const IBSEN_PLAYS = [
    {
        slug: 'pillars-of-society',
        title: 'Pillars of Society',
        author: 'Henrik Ibsen',
        movement: 'Realism',
        heading: 'PILLARS OF SOCIETY',
        dateLabel: '1877',
        kind: 'prose drama',
        ...text(2296, 'R. Farquharson Sharp'),
        synopsis:
            'Karsten Bernick is the most respected man in a Norwegian port town, and the whole of his fortune rests on a lie about a woman and a ship. When his brother-in-law comes home from America, the lie begins to come apart in public, in front of the town that has built itself on his reputation.',
        context:
            'The first of the prose plays of modern life, and the one where Ibsen found the form he would use for the next twenty years: a room, a visitor from the past, and a community that would rather not know. It ends with a confession, which is the least characteristic thing about it.',
        topics: ['reputation', 'the town', 'shipping', 'confession', 'Norway'],
    },
    {
        slug: 'a-dolls-house',
        title: "A Doll's House",
        author: 'Henrik Ibsen',
        movement: 'Realism',
        heading: "A DOLL’S HOUSE",
        dateLabel: '1879',
        kind: 'prose drama',
        ...text(2542, 'R. Farquharson Sharp'),
        synopsis:
            'Nora Helmer forged a signature to save her husband\u2019s life, and has spent eight years paying it off in secret. When the man she borrowed from threatens to expose her, Torvald reacts not by protecting her but by explaining what it would cost him — and Nora sits down and asks what she has been doing in his house.',
        context:
            'The play that made the modern theatre possible. Nora\u2019s door slamming at the end was the most discussed sound of the nineteenth century; the play was banned in many countries and rewritten with a happy ending in Germany at the author\u2019s reluctant consent.',
        topics: ['marriage', 'the door', 'forgery', 'money', 'Ibsen'],
    },
    {
        slug: 'ghosts',
        title: 'Ghosts',
        author: 'Henrik Ibsen',
        movement: 'Realism',
        heading: 'GHOSTS',
        dateLabel: '1881',
        kind: 'tragedy',
        ...text(8121, 'William Archer'),
        synopsis:
            'Mrs Alving has spent her life covering up her husband\u2019s behaviour, and has built an orphanage with his money to do it. Her son comes home from Paris with his father\u2019s disease in his blood, and the play walks him toward the sunrise and the syringe.',
        context:
            'Written as a deliberate reply to the critics of A Doll\u2019s House, and received as an obscenity: the word syphilis is never spoken, and the play was attacked for even implying it. It is the tightest of the prose plays — one room, one day, five people.',
        topics: ['inheritance', 'venereal disease', 'the orphanage', 'duty', 'Osvald'],
    },
    {
        slug: 'an-enemy-of-the-people',
        title: 'An Enemy of the People',
        author: 'Henrik Ibsen',
        movement: 'Realism',
        heading: 'AN ENEMY OF THE PEOPLE',
        dateLabel: '1882',
        kind: 'prose drama',
        ...text(2446, 'R. Farquharson Sharp'),
        synopsis:
            'Dr Stockmann discovers that the town\u2019s new baths are polluted, and expects to be thanked. Instead his brother the mayor, the newspaper, the homeowners and eventually a public meeting turn on him, and he is left standing in the ruins of his house saying that the strongest man is the man most alone.',
        context:
            'Ibsen\u2019s answer to the reception of Ghosts, written in four months: a comedy about a man who is right and cannot make anybody listen. It is the most quoted and the most misquoted of his plays, and the one that every generation of students rediscovers as contemporary.',
        topics: ['public health', 'the majority', 'the press', 'Stockmann', 'whistleblowing'],
    },
    {
        slug: 'the-wild-duck',
        title: 'The Wild Duck',
        author: 'Henrik Ibsen',
        movement: 'Realism',
        heading: 'THE WILD DUCK',
        dateLabel: '1884',
        kind: 'tragicomedy',
        ...text(73631, 'Eleanor Marx Aveling'),
        synopsis:
            'Gregers Werle comes home believing that a marriage should have no secrets, and sets about telling the Ekdal family the truth about itself. The Ekdals keep a wild duck in the loft, and a child who believes she is loved; Gregers\u2019s honesty kills the one and destroys the other.',
        context:
            'The play in which Ibsen turned on his own reforming heroes. Gregers is an idealist and an idiot, and the play was read at the time as a defence of comfortable lies; Ibsen said it was neither, and the ambiguity is why it is still argued over.',
        topics: ['idealism', 'secrets', 'the duck', 'Hedvig', 'family'],
    },
    {
        slug: 'rosmersholm',
        title: 'Rosmersholm',
        author: 'Henrik Ibsen',
        movement: 'Realism',
        heading: 'ROSMERSHOLM',
        dateLabel: '1886',
        kind: 'tragedy',
        ...text(2289, 'R. Farquharson Sharp'),
        synopsis:
            'Johannes Rosmer, a former clergyman, lives in the family house with Rebecca West, who came to him after his wife died. As he moves toward a politics of freedom, the house begins to exact its price: the wife was driven to the mill-race, and the play ends with the two of them walking into it together.',
        context:
            'The darkest of the middle plays, and the one Freudians have made a career of. Its subject is the inheritance of guilt — the Rosmer family has never laughed and never forgiven, and the house is the antagonist.',
        topics: ['guilt', 'inheritance', 'the mill-race', 'Rebecca', 'freedom'],
    },
    {
        slug: 'the-lady-from-the-sea',
        title: 'The Lady from the Sea',
        author: 'Henrik Ibsen',
        movement: 'Realism',
        heading: 'THE LADY FROM THE SEA',
        dateLabel: '1888',
        kind: 'prose drama',
        ...text(2765, 'Eleanor Marx-Aveling'),
        synopsis:
            'Ellida Wangel married a doctor and came to live in a fjord, but she belongs to the sea, and to a stranger who sailed away and promised to come back. When he arrives, her husband does the one thing that can free her: he tells her she may choose, and means it.',
        context:
            'The warmest of the twelve prose plays, and the one with the most obvious symbol at its centre. Its argument — that a marriage has to be entered freely to be a marriage — is the argument of A Doll\u2019s House pursued into middle age.',
        topics: ['the sea', 'choice', 'the stranger', 'marriage', 'fjord'],
    },
    {
        slug: 'hedda-gabler',
        title: 'Hedda Gabler',
        author: 'Henrik Ibsen',
        movement: 'Realism',
        heading: 'HEDDA GABLER',
        dateLabel: '1890',
        kind: 'tragedy',
        ...text(4093, 'Edmund Gosse and William Archer'),
        synopsis:
            'Hedda has married a dull academic and is bored by everything, including her own honeymoon. She destroys the career of a rival, burns the manuscript of a man who once loved her, gives him a pistol and tells him to do something beautiful with it — and then uses the other pistol herself.',
        context:
            'The great female villain of the nineteenth century, and a part that has defined the careers of actresses from Eleonora Duse to Cate Blanchett. Ibsen\u2019s notes call her a woman who wants to be a man, and the play never lets the audience settle on a diagnosis.',
        topics: ['boredom', 'the pistols', 'manuscript', 'Løvborg', 'power'],
    },
    {
        slug: 'the-master-builder',
        title: 'The Master Builder',
        author: 'Henrik Ibsen',
        movement: 'Realism',
        heading: 'THE MASTER BUILDER',
        dateLabel: '1892',
        kind: 'prose drama',
        ...text(4070, 'Edmund Gosse and William Archer'),
        synopsis:
            'Halvard Solness has built churches, and houses for other people, and is now afraid that a younger generation will come and knock on his door. Hilda Wangel, whom he met ten years ago when she was a child, arrives to collect the castle in the air he promised her, and he climbs the tower he is terrified of.',
        context:
            'The first of the late plays, and the most autobiographical: Solness is an artist who has used the people around him and is afraid of the young. It is also, plainly, a play about a man and a girl, and that is the part critics still argue about.',
        topics: ['the tower', 'Hilda', 'artistic ambition', 'youth', 'vertigo'],
    },
    {
        slug: 'little-eyolf',
        title: 'Little Eyolf',
        author: 'Henrik Ibsen',
        movement: 'Realism',
        heading: 'LITTLE EYOLF',
        dateLabel: '1894',
        kind: 'prose drama',
        ...text(7942, 'William Archer'),
        synopsis:
            'Alfred Allmers has been writing a book about human responsibility while neglecting the son who was lamed in an accident at birth. The boy follows the Rat-Wife into the water, and the parents are left in a room with the boat, the crutch and the question of what either of them was actually doing.',
        context:
            'The most painful of the late plays, and the shortest. It was written quickly and Ibsen thought it one of his best; the Rat-Wife is one of the strangest figures in his work, half folk-tale and half symptom.',
        topics: ['grief', 'parenting', 'the Rat-Wife', 'disability', 'responsibility'],
    },
    {
        slug: 'john-gabriel-borkman',
        title: 'John Gabriel Borkman',
        author: 'Henrik Ibsen',
        movement: 'Realism',
        heading: 'JOHN GABRIEL BORKMAN',
        dateLabel: '1896',
        kind: 'prose drama',
        ...text(18792, 'William Archer'),
        synopsis:
            'Borkman has spent eight years pacing a room upstairs after being released from prison for embezzlement. He still believes he was acting for a great vision; the family below him believes he ruined it. His wife and her sister have been fighting over the same name for fifteen years, and the play ends in the snow.',
        context:
            'The last of the realistic plays, and the coldest. Money, ambition and erotic jealousy are all the same force here, and the ending — an old man dying in the open air with his dream intact — is Ibsen\u2019s most bitter irony.',
        topics: ['prison', 'banking', 'the room upstairs', 'sisters', 'snow'],
    },
    {
        slug: 'when-we-dead-awaken',
        title: 'When We Dead Awaken',
        author: 'Henrik Ibsen',
        movement: 'Realism',
        heading: 'WHEN WE DEAD AWAKEN',
        dateLabel: '1899',
        kind: 'prose drama',
        ...text(4782, 'William Archer'),
        synopsis:
            'The sculptor Arnold Rubek has been abroad for years, famous and empty, with a young wife and a work he no longer believes in. Irene, the model who was the sculpture and who he never touched, comes back from a sanatorium dressed in white, and they walk into the mountains — past the avalanche sign.',
        context:
            'Ibsen\u2019s last play, and his most ruthless about art: Rubek got his masterpiece and lost the person who made it possible. The epilogue\u2019s ending, with the two of them climbing toward the light while the storm comes down, is the last thing he wrote for the stage.',
        topics: ['art', 'the model', 'marriage', 'avalanche', 'epilogue'],
    },
]

/* ── Realism: Chekhov ─────────────────────────────────────────────────────── */

export const CHEKHOV_PLAYS = [
    {
        slug: 'ivanoff',
        title: 'Ivanoff',
        author: 'Anton Chekhov',
        movement: 'Realism',
        heading: 'IVANOFF',
        dateLabel: '1887',
        kind: 'prose drama',
        ...text(1755, 'Maria Fell'),
        synopsis:
            'Ivanoff, a landowner in his thirties, has stopped being able to feel anything and thinks his wife is dying of it. He is in debt, in love with a younger woman and ashamed of both, and the play walks a man who has no gift for life toward the room with the revolver in it.',
        context:
            'Chekhov\u2019s first full-length play, and the first draft of everything that follows: everyone is bored, everyone talks past each other, and the man who is most obviously suffering is also the most selfish person on stage.',
        topics: ['depression', 'debt', 'marriage', 'Provincial Russia', 'suicide'],
    },
    {
        slug: 'the-seagull',
        title: 'The Seagull',
        author: 'Anton Chekhov',
        movement: 'Realism',
        heading: 'THE SEA-GULL',
        dateLabel: '1896',
        kind: 'prose drama',
        ...text(1754, 'Maria Fell'),
        synopsis:
            'A country house beside a lake: a young playwright hopes for a new theatre, an actress holds the room, and a short story writer shoots birds and cannot commit to anyone. The play ends with a note passed between two actors and a shot behind the house.',
        context:
            'The play whose first performance in Petersburg failed so badly that Chekhov swore off theatre; the Stanislavsky revival at the Moscow Art Theatre made him famous and gave the world the seagull as a logo. The shot is offstage, and nobody says what it means.',
        topics: ['the lake', 'writers', 'unrequited love', 'Moscow Art Theatre', 'suicide'],
    },
    {
        slug: 'uncle-vanya',
        title: 'Uncle Vanya',
        author: 'Anton Chekhov',
        movement: 'Realism',
        heading: 'UNCLE VANYA',
        dateLabel: '1897–99',
        kind: 'prose drama',
        ...text(1756, 'Maria Fell'),
        synopsis:
            'A professor and his young wife come to the estate that Vanya has managed for twenty years, and Vanya realises he has spent his life funding a fraud. He drinks, he fires a pistol at the professor and misses, and at the end he and Sonya go back to the account books.',
        context:
            'Chekhov\u2019s most performed play, and the one with the least plot: a hot afternoon, a rainstorm, a quarrel, and then the ordinary work again. The final speech about resting after death is one of the great endings of the modern stage.',
        topics: ['estate', 'wasted life', 'the professor', 'Sonya', 'endurance'],
    },
    {
        slug: 'three-sisters',
        title: 'Three Sisters',
        author: 'Anton Chekhov',
        movement: 'Realism',
        heading: 'THE THREE SISTERS',
        dateLabel: '1901',
        kind: 'prose drama',
        ...volume(7986, 'Julius West', 'Plays by Anton Chekhov, Second Series (1916)'),
        synopsis:
            'Three sisters in a provincial garrison town want to go to Moscow, and do not go. They lose the man who might have made one of them happy, the house fills with soldiers and then empties, and the play ends with the battery leaving and the sisters saying that they must live.',
        context:
            'Written for the Moscow Art Theatre, and set in the town where Chekhov was born. Its ending — the departing music, the sister standing alone — is the strongest piece of stagecraft he wrote, and it happens almost without dialogue.',
        topics: ['Moscow', 'garrison', 'sisters', 'time', 'hope'],
    },
    {
        slug: 'the-cherry-orchard',
        title: 'The Cherry Orchard',
        author: 'Anton Chekhov',
        movement: 'Realism',
        heading: 'THE CHERRY ORCHARD',
        dateLabel: '1904',
        kind: 'comedy',
        ...volume(7986, 'Julius West', 'Plays by Anton Chekhov, Second Series (1916)'),
        synopsis:
            'A family comes home to an estate that is about to be sold, and spends the whole play not quite discussing it. The merchant who can save them wants to cut the orchard down for building plots; the family wants to lunch. At the end, the axe is heard offstage and an old servant is left locked in the house.',
        context:
            'Chekhov\u2019s last play, written for the Art Theatre while he was dying, and called a comedy by him and a tragedy by the director. The sound of the axe in the last act is the most famous offstage noise in the theatre, after Nora\u2019s door.',
        topics: ['the orchard', 'the axe', 'landowning', 'Lopakhin', 'loss'],
    },
]

/* ── Realism: Shaw ────────────────────────────────────────────────────────── */

export const SHAW_PLAYS = [
    {
        slug: 'mrs-warrens-profession',
        title: "Mrs Warren's Profession",
        author: 'George Bernard Shaw',
        movement: 'Realism',
        dateLabel: '1893',
        kind: 'problem play',
        ...text(1097, 'Author\u2019s text'),
        synopsis:
            'Vivie Warren, newly graduated from Cambridge, discovers that the money that educated her came from her mother\u2019s chain of brothels. Mrs Warren does not apologise: she explains, in the speech Shaw wrote to be unanswerable, what the alternatives were for a woman of her class.',
        context:
            'Banned by the Lord Chamberlain in 1898 and not licensed until 1925; it was staged privately by the Stage Society in 1902, and the press treated it as a scandal rather than an argument. It is the first English play about prostitution that refuses to make the prostitute a victim or a monster.',
        topics: ['prostitution', 'money', 'censorship', 'mother and daughter', 'New Woman'],
    },
    {
        slug: 'arms-and-the-man',
        title: 'Arms and the Man',
        author: 'George Bernard Shaw',
        movement: 'Realism',
        dateLabel: '1894',
        kind: 'comedy',
        ...text(3618, 'Author\u2019s text'),
        synopsis:
            'Raina, a Bulgarian officer\u2019s daughter, hides a Swiss mercenary in her bedroom during a battle and falls in love with the romance of war. Bluntschli, the mercenary, carries chocolate instead of ammunition and points out that the cavalry charge she admires was a mistake.',
        context:
            'Shaw\u2019s first commercial success, and the play that made his name in the West End in 1894. It is a comedy about the difference between the war people are told about and the war that is fought, and its targets are romantic nationalism and the theatre that sold it.',
        topics: ['war', 'romance', 'Bluntschli', 'Bulgaria', 'anti-heroism'],
    },
    {
        slug: 'candida',
        title: 'Candida',
        author: 'George Bernard Shaw',
        movement: 'Realism',
        dateLabel: '1894',
        kind: 'comedy',
        ...text(4023, 'Author\u2019s text'),
        synopsis:
            'Candida is married to a Christian Socialist clergyman who is very good and very tiring, and is courted by a young poet who is very passionate and very young. She chooses, in the last act, and the choice is not the one the audience has been prepared for.',
        context:
            'The most performed of the Pleasant Plays, and the one that made Shaw\u2019s reputation as a writer of women. Its final scene is a debate about what a wife owes a husband and a husband owes a wife, conducted with the audience in the room.',
        topics: ['marriage', 'the poet', 'Victorian clergyman', 'choice', 'Shaw'],
    },
    {
        slug: 'the-devils-disciple',
        title: "The Devil's Disciple",
        author: 'George Bernard Shaw',
        movement: 'Realism',
        dateLabel: '1897',
        kind: 'melodrama',
        ...text(3638, 'Author\u2019s text'),
        synopsis:
            'In a New England village during the American Revolution, the town\u2019s most respectable minister is marked for hanging by the British, and the local reprobate lets himself be taken in his place. He does it because it is the one thing nobody expects of him, and then has to live with the consequences.',
        context:
            'Shaw\u2019s joke at the expense of melodrama, written for William Terriss and staged in 1899: the villain is a decent man, the hero is a black sheep, and the British are neither monsters nor fools. It was one of his most popular plays in his lifetime.',
        topics: ['American Revolution', 'martyrdom', 'melodrama', 'New England', 'irony'],
    },
    {
        slug: 'man-and-superman',
        title: 'Man and Superman',
        author: 'George Bernard Shaw',
        movement: 'Realism',
        dateLabel: '1903',
        kind: 'comedy',
        ...text(3328, 'Author\u2019s text'),
        synopsis:
            'Jack Tanner, a revolutionary writer, is pursued across Europe by Ann Whitefield, who wants to marry him and knows that he will resist. In the third act he dreams himself into hell and argues with the Devil and with Don Juan about whether life is worth living.',
        context:
            'A comedy with a philosophy attached, and the source of the phrase about the Life Force. The third act, \u201cDon Juan in Hell\u201d, is almost always cut from performance and almost always read; it is the clearest statement Shaw ever wrote of his religion.',
        topics: ['Life Force', 'Don Juan', 'courtship', 'revolution', 'the Devil'],
    },
    {
        slug: 'major-barbara',
        title: 'Major Barbara',
        author: 'George Bernard Shaw',
        movement: 'Realism',
        dateLabel: '1905',
        kind: 'problem play',
        ...text(3790, 'Author\u2019s text'),
        synopsis:
            'Barbara Undershaft is a major in the Salvation Army until her father, a munitions manufacturer, buys the Army\u2019s shelter with a cheque. The play then asks the question Shaw cared about most: whether you can do good with money that was made doing harm.',
        context:
            'Written in 1905 and set partly in the Salvation Army and partly in an arms factory that provides its workers with housing, schools and clean water. Its final scene is an argument about poverty and salvation that has not aged.',
        topics: ['Salvation Army', 'armaments', 'poverty', 'Undershaft', 'money'],
    },
    {
        slug: 'pygmalion',
        title: 'Pygmalion',
        author: 'George Bernard Shaw',
        movement: 'Realism',
        dateLabel: '1913',
        kind: 'comedy',
        ...text(3825, 'Author\u2019s text'),
        synopsis:
            'Henry Higgins bets a friend that he can pass a Covent Garden flower seller off as a duchess by teaching her to speak. He does it, and then discovers that he has made a woman with no place in the world and no income, and that he has no idea what to do with her.',
        context:
            'The play that became My Fair Lady, and the one Shaw wrote a long prose sequel to, insisting that Eliza does not marry Higgins. Its subject is class and speech, and the philology is accurate enough that phoneticians still approve of it.',
        topics: ['phonetics', 'class', 'Eliza', 'Higgins', 'London'],
    },
    {
        slug: 'heartbreak-house',
        title: 'Heartbreak House',
        author: 'George Bernard Shaw',
        movement: 'Realism',
        dateLabel: '1919',
        kind: 'comedic tragedy',
        ...text(3543, 'Author\u2019s text'),
        synopsis:
            'A house shaped like a ship, full of people who talk brilliantly and do nothing, while Europe drifts toward war. An adventurer arrives, an old man keeps talking about the dynamite in the garden, and the play ends with a Zeppelin raid that the household watches with relief.',
        context:
            'Written between 1913 and 1916 and published in 1919, Shaw\u2019s response to the First World War and to the class that let it happen. Its subtitle is \u201cA Fantasia in the Russian Manner on English Themes\u201d, and the Chekhov device — a house full of people waiting for something — is deliberate.',
        topics: ['war', 'the house', 'idle class', 'Zeppelin', 'Chekhovian'],
    },
    {
        slug: 'saint-joan',
        title: 'Saint Joan',
        author: 'George Bernard Shaw',
        movement: 'Realism',
        dateLabel: '1923',
        kind: 'chronicle play',
        ...text(76323, 'Author\u2019s text'),
        synopsis:
            'Joan of Arc wins battles, crowns a king, and is sold to the English and burned as a heretic by a court of French churchmen. The play gives every side its argument: the soldier who is right about tactics, the inquisitor who is right about the law, and the saint who is right about everything else.',
        context:
            'Written after Shaw was made a Nobel laureate, and the play that earned him the 1925 prize. It refuses both the patriotic myth and the sceptical one: Joan is a Protestant before the Reformation and a nationalist before nationalism, and the men who kill her are shown to be reasonable.',
        topics: ['Joan of Arc', 'heresy', 'the trial', 'nationalism', 'canonisation'],
    },
]

/* ── Realism: Wilde, Synge, Gorky, Tolstoy ───────────────────────────────── */

export const WILDE_COMEDIES = [
    {
        slug: 'lady-windermeres-fan',
        title: "Lady Windermere's Fan",
        author: 'Oscar Wilde',
        movement: 'Realism',
        dateLabel: '1892',
        kind: 'comedy of manners',
        ...text(790, 'Author\u2019s text'),
        synopsis:
            'Lady Windermere is told that her husband is paying a woman to visit him, and invites the woman to her birthday ball to humiliate her. The woman is her mother, and she spends the evening saving her daughter from the mistake she herself made.',
        context:
            'Wilde\u2019s first West End success, and the play whose last line — about people who know everything and understand nothing — set the tone for the rest. It is a comedy of manners with a melodrama inside it, and Wilde wrote both parts sincerely.',
        topics: ['society', 'the fan', 'mother and daughter', 'reputation', 'Wilde'],
    },
    {
        slug: 'an-ideal-husband',
        title: 'An Ideal Husband',
        author: 'Oscar Wilde',
        movement: 'Realism',
        dateLabel: '1895',
        kind: 'comedy of manners',
        ...text(885, 'Author\u2019s text'),
        synopsis:
            'Sir Robert Chiltern, a rising politician, sold a state secret to buy his career, and a blackmailing adventuress has come to London to make him do it again. His wife worships him, his friend Lord Goring understands him, and the play asks whether a public man\u2019s private past is the public\u2019s business.',
        context:
            'The most political of Wilde\u2019s comedies and the one with the most machinery: blackmail, a diamond brooch, a letter and a parliamentary speech. It opened in January 1895, three weeks before the trials that ended Wilde\u2019s career.',
        topics: ['blackmail', 'politics', 'the secret', 'Lord Goring', 'marriage'],
    },
    {
        slug: 'the-importance-of-being-earnest',
        title: 'The Importance of Being Earnest',
        author: 'Oscar Wilde',
        movement: 'Realism',
        dateLabel: '1895',
        kind: 'farce',
        ...text(844, 'Author\u2019s text'),
        synopsis:
            'Two young men both invent a brother called Ernest, two young women both insist on marrying a man called Ernest, and a governess with a handbag arrives to sort out the parentage. Nobody behaves sensibly and everybody speaks perfectly.',
        context:
            'The most quoted comedy in English, and the one in which Wilde\u2019s dialogue finally has nothing to carry but itself. It opened in February 1895 and was closed within weeks by the scandal of Wilde\u2019s arrest.',
        topics: ['the handbag', 'bunburying', 'farce', 'Lady Bracknell', 'marriage'],
    },
]

export const SYNGE_PLAYS = [
    {
        slug: 'in-the-shadow-of-the-glen',
        title: 'In the Shadow of the Glen',
        author: 'J. M. Synge',
        movement: 'Realism',
        dateLabel: '1903',
        kind: 'one-act play',
        ...text(1618, 'Author\u2019s text'),
        synopsis:
            'A tramp shelters in a Wicklow cottage where a woman is keeping watch over her husband\u2019s body. The husband is not dead; he is testing her. By the end she has walked out of the house with the tramp, and the men are left with the whiskey and the inheritance.',
        context:
            'Synge\u2019s first play, and the first of the Abbey Theatre\u2019s quarrels: nationalist audiences thought it slandered Irish women. It is a one-act built like a folk tale, and its language is the language Synge heard in the Wicklow hills.',
        topics: ['Wicklow', 'tramp', 'marriage', 'folk tale', 'Abbey Theatre'],
    },
    {
        slug: 'riders-to-the-sea',
        title: 'Riders to the Sea',
        author: 'J. M. Synge',
        movement: 'Realism',
        dateLabel: '1904',
        kind: 'one-act tragedy',
        ...text(994, 'Author\u2019s text'),
        synopsis:
            'On an island off the west of Ireland, Maurya has lost her husband and five sons to the sea. The sixth is missing, a body is reported on the shore, and the play ends with her saying what is left to say over the last of them.',
        context:
            'The finest one-act tragedy in English, and the one Synge wrote after hearing the story on Inishmaan. It is built almost entirely of ordinary speech and one long keening monologue, and it lasts about twenty minutes.',
        topics: ['the sea', 'grief', 'Aran Islands', 'one act', 'keening'],
    },
    {
        slug: 'the-well-of-the-saints',
        title: 'The Well of the Saints',
        author: 'J. M. Synge',
        movement: 'Realism',
        dateLabel: '1905',
        kind: 'comedy',
        ...text(1241, 'Author\u2019s text'),
        synopsis:
            'A blind beggar and his wife are cured by a saint\u2019s water and discover that the world they have been describing to each other for years is not the world they now see. They choose, in the end, to be blind again.',
        context:
            'The play in which Synge\u2019s comedy and his bleakness are most evenly mixed. It was staged at the Abbey in 1905 and puzzled the audience; its argument, that beauty is easier to believe in than to look at, is the argument of all his work.',
        topics: ['blindness', 'miracle', 'illusion', 'Abbey Theatre', 'marriage'],
    },
    {
        slug: 'the-playboy-of-the-western-world',
        title: 'The Playboy of the Western World',
        author: 'J. M. Synge',
        movement: 'Realism',
        dateLabel: '1907',
        kind: 'comedy',
        ...text(1240, 'Author\u2019s text'),
        synopsis:
            'Christy Mahon arrives in a Mayo shebeen claiming to have killed his father with a spade, and the village makes him a hero. He wins the races, the women and the storytelling, and then his father walks in alive.',
        context:
            'The most famous riot in theatre history: the Abbey audience of January 1907 objected to the word \u201cshift\u201d and to the suggestion that Irish villagers would admire a parricide. It is now the central play of the Irish canon, and its language is the reason.',
        topics: ['Mayo', 'the spade', 'storytelling', 'riot', 'Abbey Theatre'],
    },
]

export const RUSSIAN_REALISM = [
    {
        slug: 'the-lower-depths',
        title: 'The Lower Depths',
        author: 'Maxim Gorky',
        movement: 'Realism',
        dateLabel: '1902',
        kind: 'prose drama',
        ...text(52468, 'Jenny Covan'),
        synopsis:
            'A cellar full of people who have nowhere else to go: a thief, a baron, an actor, a prostitute, a dying woman and a pilgrim who tells them that somewhere there is a righteous land. Nobody leaves, and the play ends with a song and a hanging nobody wants to look at.',
        context:
            'The play that made Gorky famous and the Moscow Art Theatre\u2019s great ensemble piece. Its subject is consolation — whether a comforting lie is a kindness — and it refuses to decide, which is why Stanislavsky\u2019s production ran for decades.',
        topics: ['poverty', 'the cellar', 'consolation', 'Luka', 'Moscow Art Theatre'],
    },
    {
        slug: 'the-power-of-darkness',
        title: 'The Power of Darkness',
        author: 'Leo Tolstoy',
        movement: 'Realism',
        dateLabel: '1886',
        kind: 'peasant tragedy',
        ...text(26661, 'Aylmer Maude'),
        synopsis:
            'A Russian peasant household in which a hired labourer takes up with the wife, the old man takes up with the servant, and a baby is buried in the cellar. The play ends with the murderer confessing in front of the village, and the family standing in the snow.',
        context:
            'Tolstoy\u2019s only major play, written for the people\u2019s theatre and banned from performance until 1895. It is naturalism built on melodrama, and its five acts of adultery and murder were too much even for Tolstoy\u2019s admirers.',
        topics: ['peasant life', 'adultery', 'murder', 'confession', 'censorship'],
    },
]

/* ── Naturalism ───────────────────────────────────────────────────────────── */

const STRINDBERG_1 = volume(8499, 'Edith and Warner Oland', 'Plays: The Father; Countess Julie; The Outlaw; The Stronger (1912)')
const STRINDBERG_2 = volume(14347, 'Edwin Björkman', 'Plays by August Strindberg, Second Series (1913)')

export const NATURALIST_PLAYS = [
    {
        slug: 'the-father',
        title: 'The Father',
        author: 'August Strindberg',
        movement: 'Naturalism',
        heading: 'THE FATHER',
        endHeading: 'COUNTESS JULIE',
        dateLabel: '1887',
        kind: 'tragedy',
        ...STRINDBERG_1,
        synopsis:
            'A cavalry captain and his wife disagree about their daughter\u2019s education, and the disagreement becomes a question of whether he is her father at all. The wife works the doubt into him through the household, the doctor and the priest until he is in a straitjacket.',
        context:
            'The first play of Strindberg\u2019s naturalist period, and the one in which he perfected the single-setting war between two people. It was written in a few weeks and is still the clearest demonstration of how a marriage can be conducted as a siege.',
        topics: ['marriage', 'paternity', 'the straitjacket', 'power', 'naturalism'],
    },
    {
        slug: 'miss-julie',
        title: 'Miss Julie',
        author: 'August Strindberg',
        movement: 'Naturalism',
        heading: 'COUNTESS JULIE',
        dateLabel: '1888',
        kind: 'tragedy',
        ...STRINDBERG_1,
        synopsis:
            'A count\u2019s daughter spends Midsummer Night with her father\u2019s valet, in the kitchen, while the servants are dancing outside. By morning the seduction has become a contest of class and will that she loses, and she walks out to the barn with his razor.',
        context:
            'The most concentrated naturalist play ever written — one kitchen, one night, three people — and its preface is the movement\u2019s manifesto: no scenery, no intervals, no dialogue that is not evasive. This is the Oland translation, published as Countess Julie.',
        topics: ['class', 'Midsummer', 'seduction', 'the razor', 'preface'],
    },
    {
        slug: 'creditors',
        title: 'Creditors',
        author: 'August Strindberg',
        movement: 'Naturalism',
        heading: 'CREDITORS',
        endHeading: 'PARIAH',
        dateLabel: '1889',
        kind: 'tragicomedy',
        ...STRINDBERG_2,
        synopsis:
            'An older man meets his ex-wife\u2019s new husband in a hotel lounge and, over two polite conversations, dismantles him. He does it by being helpful: the young husband\u2019s confidence, his marriage and his idea of himself come apart in the hands of a man who calls it education.',
        context:
            'Strindberg\u2019s cruellest comedy and the play in which the theory of naturalism — dialogue as a series of evasions and attacks — is most visible. It has no interval and no room for an actor to rest.',
        topics: ['manipulation', 'marriage', 'the lounge', 'divorce', 'cruelty'],
    },
    {
        slug: 'the-outlaw',
        title: 'The Outlaw',
        author: 'August Strindberg',
        movement: 'Naturalism',
        heading: 'THE OUTLAW',
        dateLabel: '1871',
        kind: 'one-act tragedy',
        ...STRINDBERG_1,
        synopsis:
            'A Viking and an Irish Christian in a hut in the north: the man who worships Thor and the man who worships Christ argue about law, honour and hospitality until one of them has to die.',
        context:
            'An early one-act, written before the naturalist turn, and included here because it shows what Strindberg was doing before he wrote his manifesto: myth, religion and the same argument about who has the right to rule.',
        topics: ['Vikings', 'Christianity', 'honour', 'one act', 'early Strindberg'],
    },
    {
        slug: 'the-stronger',
        title: 'The Stronger',
        author: 'August Strindberg',
        movement: 'Naturalism',
        heading: 'THE STRONGER',
        dateLabel: '1889',
        kind: 'one-act monodrama',
        ...STRINDBERG_1,
        synopsis:
            'Two women meet in the corner of a restaurant on Christmas Eve. Only one of them speaks: she talks about her marriage, about the other woman\u2019s silence, and about what that silence means. The silent one leaves, and wins.',
        context:
            'A one-act with a single speaking part, written for the actress Siri von Essen and performed by her as a double bill. It lasts fifteen minutes and is the shortest full statement of Strindberg\u2019s belief that silence is the strongest position on stage.',
        topics: ['silence', 'restaurant', 'two women', 'one act', 'power'],
    },
    {
        slug: 'before-dawn',
        title: 'Before Dawn',
        author: 'Gerhart Hauptmann',
        movement: 'Naturalism',
        heading: 'BEFORE DAWN',
        dateLabel: '1889',
        kind: 'tragedy',
        ...volume(9971, 'Ludwig Lewisohn', 'The Dramatic Works of Gerhart Hauptmann, Volume I (1912)'),
        synopsis:
            'A Silesian farmer who has grown rich on coal marries his daughter into a family that has not, and the drink, the money and the heredity come due in one evening. The play ends with a newborn child and a man who has just understood what he has done.',
        context:
            'Hauptmann\u2019s first play and the first triumph of German naturalism: it was staged by the Freie Bühne in 1889 and made him the movement\u2019s leading writer overnight. Its subject is hereditary alcoholism, and it takes the theory seriously.',
        topics: ['heredity', 'coal money', 'alcoholism', 'Silesia', 'Freie Bühne'],
    },
    {
        slug: 'the-weavers',
        title: 'The Weavers',
        author: 'Gerhart Hauptmann',
        movement: 'Naturalism',
        heading: 'THE WEAVERS',
        dateLabel: '1892',
        kind: 'drama',
        ...volume(9971, 'Mary Morison', 'The Dramatic Works of Gerhart Hauptmann, Volume I (1912)'),
        synopsis:
            'Silesian weavers in the 1840s are paid so little that they cannot eat, and the play moves through five rooms as the complaint becomes a march and the march becomes a riot. It ends in the house of a man who has just shot a soldier.',
        context:
            'The great naturalist play of the nineteenth century, and the only one whose hero is a group. Hauptmann wrote it from the 1844 weavers\u2019 revolt; the authorities tried to ban the Berlin production, and it is the reason the movement mattered politically.',
        topics: ['weavers', 'revolt', 'Silesia', 'poverty', '1844'],
    },
    {
        slug: 'the-beaver-coat',
        title: 'The Beaver Coat',
        author: 'Gerhart Hauptmann',
        movement: 'Naturalism',
        heading: 'THE BEAVER COAT',
        endHeading: 'THE CONFLAGRATION',
        dateLabel: '1893',
        kind: 'comedy',
        ...volume(9971, 'Ludwig Lewisohn', 'The Dramatic Works of Gerhart Hauptmann, Volume I (1912)'),
        synopsis:
            'Mother Wolff, a washerwoman on the edge of Berlin, steals a beaver coat and sells it back to the woman who owns it, and is then invited to inform on herself. Every authority in the play is stupider than she is, and she ends in a better coat than the one she took.',
        context:
            'The play that made Hauptmann a popular playwright after the scandal of The Weavers: a Berlin comedy of the 1890s, satirical about courts, police and pretension. It was banned in several German cities, then became his most performed work.',
        topics: ['theft', 'Berlin', 'police', 'satire', 'Mother Wolff'],
    },
    {
        slug: 'drayman-henschel',
        title: 'Drayman Henschel',
        author: 'Gerhart Hauptmann',
        movement: 'Naturalism',
        heading: 'DRAYMAN HENSCHEL',
        endHeading: 'ROSE BERND',
        dateLabel: '1898',
        kind: 'tragedy',
        ...volume(9972, 'Ludwig Lewisohn', 'The Dramatic Works of Gerhart Hauptmann, Volume II (1913)'),
        synopsis:
            'Henschel, a cart driver, marries the young servant girl whose care has made him happy, against the warnings of his dead wife\u2019s promise. The drink and the small humiliations of the marriage carry him, over three acts, to the barn.',
        context:
            'Hauptmann\u2019s most sustained study of a single consciousness, and a naturalist answer to tragedy: Henschel is ruined by his own kindness, and the play gives the ruin three hours and no villains.',
        topics: ['marriage', 'drink', 'promise', 'the barn', 'servant'],
    },
    {
        slug: 'the-rats',
        title: 'The Rats',
        author: 'Gerhart Hauptmann',
        movement: 'Naturalism',
        heading: 'THE RATS',
        dateLabel: '1911',
        kind: 'tragicomedy',
        ...volume(9972, 'Ludwig Lewisohn', 'The Dramatic Works of Gerhart Hauptmann, Volume II (1913)'),
        synopsis:
            'A Berlin tenement in which a former actress rents a room, a servant is accused of stealing laundry, and a newborn baby is sold. The landlord\u2019s rats and the tenants\u2019 gossip do the rest of the plot.',
        context:
            'Hauptmann\u2019s last great Berlin play, and the one where naturalism and social comedy fuse. It was written in 1911, when the tenement play was already old, and it gives every room a voice.',
        topics: ['tenement', 'Berlin', 'gossip', 'poverty', 'the baby'],
    },
]

/* ── Symbolism ────────────────────────────────────────────────────────────── */

const HOVEY = volume(13329, 'Richard Hovey', 'Pélléas and Mélisande; Alladine and Palomides; Home (1896)')
const YEATS_2 = volume(49609, 'W. B. Yeats', 'The Collected Works in Verse and Prose of William Butler Yeats, Vol. II (1908)')
const YEATS_3 = volume(49610, 'W. B. Yeats', 'The Collected Works in Verse and Prose of William Butler Yeats, Vol. III (1908)')
const YEATS_4 = volume(49611, 'W. B. Yeats', 'The Collected Works in Verse and Prose of William Butler Yeats, Vol. IV (1908)')

export const SYMBOLIST_PLAYS = [
    {
        slug: 'brand',
        title: 'Brand',
        author: 'Henrik Ibsen',
        movement: 'Symbolism',
        dateLabel: '1866',
        kind: 'verse tragedy',
        ...volume(66238, 'C. H. Herford', 'The Collected Works of Henrik Ibsen, Volume III: Brand (1908)'),
        synopsis:
            'A priest in a Norwegian fjord village demands of his parish, his mother, his wife and himself that they give everything and keep nothing. He refuses to compromise at every point where compromise would save a life, and walks up into the ice at the end with the voice above him saying that God is love.',
        context:
            'The poem that made Ibsen famous in Scandinavia, written in 1866 and never meant for the stage — the five acts are a verse drama on the page, and the productions that work are the ones that treat it as such. Its demand for consistency is aimed at the Church and at the idealists who left Norway for Rome.',
        topics: ['consistency', 'vocation', 'sacrifice', 'the glacier', 'verse'],
    },
    {
        slug: 'peer-gynt',
        title: 'Peer Gynt',
        author: 'Henrik Ibsen',
        movement: 'Symbolism',
        dateLabel: '1867',
        kind: 'verse drama',
        ...volume(66239, 'William Archer', 'The Collected Works of Henrik Ibsen, Volume IV: Peer Gynt (1908)'),
        synopsis:
            'Peer Gynt lies, seduces, abandons, sails to Morocco, is crowned emperor in a madhouse, and comes home an old man to find that a woman has been waiting for him for fifty years with a button-moulder at the door.',
        context:
            'Ibsen’s great folk poem and the play Grieg wrote the music for. It moves from Norwegian peasant superstition to the desert to the inside of a lunatic asylum, and it is the widest-ranging thing he wrote: a satire of the national character that has become the national epic.',
        topics: ['folk tale', 'the button-moulder', 'Solveig', 'Grieg', 'satire'],
    },
    {
        slug: 'pelleas-and-melisande',
        title: 'Pélléas and Mélisande',
        author: 'Maurice Maeterlinck',
        movement: 'Symbolism',
        heading: 'Pélléas and Mélisande.',
        dateLabel: '1892',
        kind: 'symbolist drama',
        ...HOVEY,
        synopsis:
            'Golaud finds a lost girl in a forest, marries her, and brings her home to a castle where his young half-brother lives. Nothing is explained: a well, a tower, a ring, a flock of sheep going the wrong way, and two people who love each other in rooms with too many doors.',
        context:
            'The founding play of symbolist theatre, and the one Debussy set to music. Maeterlinck wrote it for a theatre of marionettes in theory, and it made him famous in practice; its dialogue is deliberately slight, and the silences carry the plot.',
        topics: ['the castle', 'the well', 'the ring', 'silence', 'Debussy'],
    },
    {
        slug: 'alladine-and-palomides',
        title: 'Alladine and Palomides',
        author: 'Maurice Maeterlinck',
        movement: 'Symbolism',
        heading: 'Alladine and Palomides.',
        dateLabel: '1894',
        kind: 'symbolist drama',
        ...HOVEY,
        synopsis:
            'A king keeps his daughter and her lover in a palace of locked doors and underground vaults, and lets them find each other only to separate them. The play is a series of rooms, each one smaller than the last.',
        context:
            'The middle play of the Hovey volume and the purest example of Maeterlinck\u2019s method: an architecture of doors, and a plot that is almost entirely the approach of a footstep. It is rarely staged and reads like a dream.',
        topics: ['the palace', 'locked doors', 'the vaults', 'separation', 'dream'],
    },
    {
        slug: 'home-maeterlinck',
        title: 'Home',
        author: 'Maurice Maeterlinck',
        movement: 'Symbolism',
        heading: 'Home.',
        dateLabel: '1894',
        kind: 'symbolist drama',
        ...HOVEY,
        synopsis:
            'A family waits in a lamplit room for news of a daughter who has gone to the city. Nobody says what has happened; the play is the waiting, and the lamp, and the sound of the garden.',
        context:
            'The shortest and quietest of the three plays in the Hovey volume, and the one that shows how much Maeterlinck could do with an ordinary room. Its subject is dread, and it is built entirely out of what the characters do not say.',
        topics: ['waiting', 'the lamp', 'dread', 'the garden', 'one act'],
    },
    {
        slug: 'the-blue-bird',
        title: 'The Blue Bird',
        author: 'Maurice Maeterlinck',
        movement: 'Symbolism',
        heading: null,
        dateLabel: '1908',
        kind: 'fairy play',
        ...text(8606, 'Alexander Teixeira de Mattos'),
        synopsis:
            'Two children are sent to find the blue bird of happiness and travel through the Land of Memory, the Palace of Night, the Forest and the Kingdom of the Future, where the unborn wait to be born. They wake up at home with a bird that is not quite blue.',
        context:
            'The most popular symbolist play ever written, staged by Stanislavsky in 1908 and filmed by Hollywood twice. It is a children\u2019s pantomime built out of Platonic allegory, and its imagery entered the language.',
        topics: ['the blue bird', 'Memory', 'the Future', 'children', 'allegory'],
    },
    {
        slug: 'the-betrothal',
        title: 'The Betrothal',
        author: 'Maurice Maeterlinck',
        movement: 'Symbolism',
        heading: null,
        dateLabel: '1918',
        kind: 'fairy play',
        ...text(34343, 'Alexander Teixeira de Mattos'),
        synopsis:
            'The boy from The Blue Bird is now fifteen and must choose a bride from among the girls he meets in a house where the rooms are dreams. Every candidate is a virtue or a temptation, and the choice is whether to grow up at all.',
        context:
            'Maeterlinck\u2019s sequel to The Blue Bird, written after the First World War and much less known. It keeps the allegorical machinery and adds a young man\u2019s reluctance, which makes it the more interesting of the two for a student.',
        topics: ['sequel', 'choice', 'marriage', 'allegory', 'youth'],
    },
    {
        slug: 'salome',
        title: 'Salomé',
        author: 'Oscar Wilde',
        movement: 'Symbolism',
        heading: null,
        dateLabel: '1891',
        kind: 'symbolist tragedy',
        ...text(42704, 'Alfred Bruce Douglas'),
        synopsis:
            'John the Baptist is imprisoned in Herod\u2019s palace and refuses to look at Salomé. She dances for the king, asks for the prophet\u2019s head on a silver charger, and kisses it; the king orders her killed, and the play ends in the same sentence it began with.',
        context:
            'Written in French in 1891 and banned from the London stage while Wilde was alive; this is Lord Alfred Douglas\u2019s English translation, the one Wilde read and disliked. It is the one play in which his epigrams stop and the imagery takes over.',
        topics: ['the dance', 'the head', 'John the Baptist', 'desire', 'Herod'],
    },
    {
        slug: 'the-countess-cathleen',
        title: 'The Countess Cathleen',
        author: 'W. B. Yeats',
        movement: 'Symbolism',
        heading: 'THE COUNTESS CATHLEEN.',
        dateLabel: '1892',
        kind: 'verse play',
        ...YEATS_3,
        synopsis:
            'Famine in Ireland, and two demons go from door to door buying souls for gold. The Countess Cathleen sells everything she owns, and finally her own soul, to feed her tenants.',
        context:
            'Yeats\u2019s first play for the Irish stage, and the one that caused a riot in Dublin in 1899 on the grounds that an Irish countess would not sell her soul and that the play insulted the peasantry. It is written in a deliberately spare verse.',
        topics: ['famine', 'souls', 'Ireland', 'Dublin 1899', 'verse'],
    },
    {
        slug: 'the-land-of-hearts-desire',
        title: "The Land of Heart's Desire",
        author: 'W. B. Yeats',
        movement: 'Symbolism',
        heading: 'THE LAND OF HEART’S DESIRE.',
        dateLabel: '1894',
        kind: 'verse play',
        ...YEATS_3,
        synopsis:
            'A young bride in a Sligo cottage is courted by a child of the Sidhe who offers her fairyland, and the priest and the family cannot hold her. She leaves through the door and the fire dies.',
        context:
            'A one-act written for the Irish Literary Theatre and staged in London in 1894, where it was the curtain-raiser on the night that made the Irish dramatic movement. Its subject is the cost of the imagination.',
        topics: ['fairy', 'the bride', 'Sligo', 'one act', 'leaving'],
    },
    {
        slug: 'the-unicorn-from-the-stars',
        title: 'The Unicorn from the Stars',
        author: 'W. B. Yeats and Lady Gregory',
        movement: 'Symbolism',
        heading: 'THE UNICORN FROM THE STARS',
        endHeading: 'APPENDIX.',
        dateLabel: '1907',
        kind: 'verse play',
        ...YEATS_3,
        synopsis:
            'A young man is thrown from his horse, has a vision of a unicorn, and comes out of it convinced that he must destroy the world to bring the kingdom in. His followers take him literally, and the play ends with the vision and the ruin of the house.',
        context:
            'The most political of Yeats\u2019s early plays, written with Lady Gregory from an earlier draft of his own, and read at the time as a comment on revolutionary violence. Its imagery — the unicorn, the burning house — is Yeats\u2019s first mature symbolic system.',
        topics: ['the unicorn', 'revolution', 'vision', 'Gregory', 'the house'],
    },
    {
        slug: 'the-kings-threshold',
        title: "The King's Threshold",
        author: 'W. B. Yeats',
        movement: 'Symbolism',
        heading: 'THE KING’S THRESHOLD.',
        dateLabel: '1903',
        kind: 'verse play',
        ...YEATS_2,
        synopsis:
            'A poet is refused his traditional place at the king\u2019s table and sits down on the palace steps to starve until the right is restored. The king, the church and the poet\u2019s own pupils argue with him while he dies on the threshold.',
        context:
            'Yeats\u2019s play about the position of the artist in the state, prompted by the controversy over The Playboy. Its central image — the poet dying on the steps — has been read as Yeats\u2019s own answer to the riots.',
        topics: ['the poet', 'hunger strike', 'the threshold', 'art and power', 'verse'],
    },
    {
        slug: 'on-bailes-strand',
        title: "On Baile's Strand",
        author: 'W. B. Yeats',
        movement: 'Symbolism',
        heading: 'ON BAILE’S STRAND.',
        dateLabel: '1904',
        kind: 'verse play',
        ...YEATS_2,
        synopsis:
            'Cuchulain, the champion of Ulster, swears obedience to the high king and then kills a young man in single combat who turns out to be his own son. A blind man and a fool comment on the whole thing from the edge of the stage.',
        context:
            'The first of the Cuchulain plays and the one that made Yeats\u2019s mythic method work on stage. The blind man and the fool are a chorus out of Greek tragedy, and they are the only characters who understand what has happened.',
        topics: ['Cuchulain', 'the son', 'the chorus', 'Ulster cycle', 'tragedy'],
    },
    {
        slug: 'deirdre',
        title: 'Deirdre',
        author: 'W. B. Yeats',
        movement: 'Symbolism',
        heading: 'DEIRDRE.',
        dateLabel: '1906',
        kind: 'verse play',
        ...YEATS_2,
        synopsis:
            'Deirdre has lived seven years in hiding with Naoise, and comes back to Emain Macha on the king\u2019s promise of safety. The king kills Naoise, and Deirdre plays chess with him over the body and then takes her own life.',
        context:
            'The finest of the Cuchulain plays and the one with the least rhetoric: Yeats wrote it after seeing the Abbey company act, and it is built for their voices. Its last scene, the chess game, is the best thing he wrote for the theatre.',
        topics: ['Deirdre', 'Naoise', 'the chess game', 'Conchubar', 'Ulster'],
    },
    {
        slug: 'the-shadowy-waters',
        title: 'The Shadowy Waters',
        author: 'W. B. Yeats',
        movement: 'Symbolism',
        heading: 'THE SHADOWY WATERS',
        endHeading: 'APPENDIX I',
        dateLabel: '1900',
        kind: 'verse play',
        ...YEATS_2,
        synopsis:
            'A sea captain has sailed for years looking for a woman he has seen in a dream, and his crew mutiny. He finds her on a ship in the fog, and they sail away together into a country that may not exist.',
        context:
            'The most purely symbolist of Yeats\u2019s plays and the one that gave him the most trouble: he rewrote it for twenty years and printed an acting version as an appendix in the collected works. It is a poem for the stage rather than a play, and knows it.',
        topics: ['the sea', 'dream', 'mutiny', 'fog', 'rewriting'],
    },
    {
        slug: 'the-hour-glass',
        title: 'The Hour-Glass',
        author: 'W. B. Yeats',
        movement: 'Symbolism',
        heading: 'THE HOUR-GLASS:',
        dateLabel: '1903',
        kind: 'morality play',
        ...YEATS_4,
        synopsis:
            'A wise man who has argued away the existence of God is told by an angel that he will die when the hour-glass runs out, and that his arguments have been a lie. He tries to prove the soul exists, in the last hour, with a fool as his only convert.',
        context:
            'Yeats rewriting the medieval morality play for the Irish stage, and the clearest link between the medieval shelf and this one. It was written in prose and then versified, and both versions were printed.',
        topics: ['morality', 'the hour-glass', 'the fool', 'soul', 'medieval form'],
    },
    {
        slug: 'cathleen-ni-houlihan',
        title: 'Cathleen ni Houlihan',
        author: 'W. B. Yeats and Lady Gregory',
        movement: 'Symbolism',
        heading: 'CATHLEEN NI HOULIHAN',
        dateLabel: '1902',
        kind: 'one-act play',
        ...YEATS_4,
        synopsis:
            'A family prepares for a wedding in 1798 when an old woman comes to the door asking for help with her four green fields. The bridegroom follows her out, and the old woman becomes a young girl with the walk of a queen.',
        context:
            'The most performed Irish play of the twentieth century, and the one that turned the Abbey into a national institution. Maud Gonne played the title role; Yeats wrote it with Lady Gregory in a fortnight.',
        topics: ['1798', 'the old woman', 'nationalism', 'Maud Gonne', 'one act'],
    },
    {
        slug: 'the-golden-helmet',
        title: 'The Golden Helmet',
        author: 'W. B. Yeats',
        movement: 'Symbolism',
        heading: 'THE GOLDEN HELMET',
        endHeading: 'THE IRISH DRAMATIC MOVEMENT',
        dateLabel: '1908',
        kind: 'verse play',
        ...YEATS_4,
        synopsis:
            'Cuchulain takes the golden helmet from a giant he has killed, and the helmet begins to speak in the giant\u2019s voice, demanding that he do what the dead man wanted. The play is a duel between a hero and a piece of property.',
        context:
            'Written for the Abbey in 1908 and revised several times, this is the Cuchulain play in which Yeats\u2019s symbolist method and his stagecraft are most evenly matched. The helmet is one of the great props of the Irish theatre.',
        topics: ['Cuchulain', 'the helmet', 'the dead', 'property', 'Abbey'],
    },
]

/* ── Expressionism ────────────────────────────────────────────────────────── */

export const EXPRESSIONIST_PLAYS = [
    {
        slug: 'a-dream-play',
        title: 'A Dream Play',
        author: 'August Strindberg',
        movement: 'Expressionism',
        heading: 'THE DREAM PLAY',
        endHeading: 'THE LINK',
        dateLabel: '1901',
        kind: 'dream play',
        ...volume(45375, 'Edwin Björkman', 'Plays by August Strindberg, First Series (1912)'),
        synopsis:
            'The daughter of Indra comes down to earth to see how people live, and the play follows her through a castle that grows out of a flower, a marriage that turns into a cell, a door that opens on nothing, and a shawl that becomes a net.',
        context:
            'The play that invented theatrical expressionism, twelve years before the German movement had a name. Strindberg\u2019s preface says the characters split, double and vanish; the production history is a history of stage machinery, from Reinhardt\u2019s 1916 Berlin production onward.',
        topics: ['Indra', 'the castle', 'dream logic', 'stage machinery', 'Reinhardt'],
    },
    {
        slug: 'the-ghost-sonata',
        title: 'The Ghost Sonata',
        author: 'August Strindberg',
        movement: 'Expressionism',
        heading: 'THE SPOOK SONATA',
        dateLabel: '1907',
        kind: 'chamber play',
        ...volume(44302, 'Edwin Björkman', 'Plays by August Strindberg, Fourth Series (1916)'),
        synopsis:
            'A student meets an old man in the street outside a house, and is taken inside to a dinner where the guests are ghosts, the cook is a vampire, and a young woman is dying of the furniture. The play ends with the student hearing the Island of the Dead.',
        context:
            'One of Strindberg\u2019s \u201cchamber plays\u201d, written for his intimate theatre in Stockholm in 1907 with a cast of nine and a single set. It is the most compressed of his late works and the direct ancestor of the expressionist stage.',
        topics: ['the house', 'the vampire cook', 'ghosts', 'chamber play', 'the island'],
    },
    {
        slug: 'the-bridal-crown',
        title: 'The Bridal Crown',
        author: 'August Strindberg',
        movement: 'Expressionism',
        heading: 'THE BRIDAL CROWN',
        dateLabel: '1901',
        kind: 'folk play',
        ...volume(44302, 'Edwin Björkman', 'Plays by August Strindberg, Fourth Series (1916)'),
        synopsis:
            'A girl who has borne a child in secret is crowned with the bridal crown at Midsummer, and the water sprite and the forest take their revenge. The play moves through six scenes and a song, between the farm and the mill-stream.',
        context:
            'Strindberg\u2019s folk play, written the same year as A Dream Play and set to music by himself, with a musical appendix in the volume. It is the Swedish peasant tradition turned into symbolist theatre.',
        topics: ['Midsummer', 'the crown', 'water sprite', 'folk song', 'guilt'],
    },
    {
        slug: 'the-first-warning',
        title: 'The First Warning',
        author: 'August Strindberg',
        movement: 'Expressionism',
        heading: 'THE FIRST WARNING',
        endHeading: 'GUSTAVUS VASA',
        dateLabel: '1907',
        kind: 'one-act comedy',
        ...volume(44302, 'Edwin Björkman', 'Plays by August Strindberg, Fourth Series (1916)'),
        synopsis:
            'A man is warned in a dream that his wife is unfaithful, and spends a one-act afternoon trying to prove it to himself in a drawing room where everyone is being extremely polite.',
        context:
            'One of the four chamber plays, and the lightest: a comedy of suspicion in a single act, with the dream machinery of the expressionist plays used for domestic comedy.',
        topics: ['dream', 'jealousy', 'one act', 'drawing room', 'chamber play'],
    },
    {
        slug: 'the-road-to-damascus',
        title: 'The Road to Damascus',
        author: 'August Strindberg',
        movement: 'Expressionism',
        heading: null,
        dateLabel: '1898–1904',
        kind: 'trilogy',
        ...text(8875, 'Graham Rawson'),
        synopsis:
            'A stranger leaves his wife and walks out of his life, meets a woman at a crossroads, is tried by a court of the dead, and spends three plays being stripped of everything he owns — including, at the end, his own name.',
        context:
            'Strindberg\u2019s conversion trilogy, written after his crisis of the 1890s, and the first play in which he used the station-drama form: the scenes are stages on a road, not rooms in a house. This edition prints all three parts complete.',
        topics: ['conversion', 'the stranger', 'the road', 'the court', 'trilogy'],
    },
    {
        slug: 'r-u-r',
        title: 'R.U.R. (Rossum\u2019s Universal Robots)',
        author: 'Karel Čapek',
        movement: 'Expressionism',
        heading: null,
        dateLabel: '1920',
        kind: 'science fiction drama',
        ...text(59112, 'Nigel Playfair'),
        synopsis:
            'A factory makes artificial workers out of organic matter, and they do all the work until a scientist gives them feelings. Then they revolt, kill every human being except one, and the last robot and the last woman discover something like love.',
        context:
            'The play that gave the world the word robot — from the Czech robota, forced labour — and the first great science-fiction drama. It was written in 1920 and was a hit in Prague, London and New York within three years.',
        topics: ['robots', 'labour', 'revolt', 'the factory', 'science fiction'],
    },
    {
        slug: 'the-insect-play',
        title: 'The Insect Play',
        author: 'Karel Čapek and Josef Čapek',
        movement: 'Expressionism',
        heading: null,
        dateLabel: '1921',
        kind: 'satire',
        ...text(61420, 'Paul Selver'),
        synopsis:
            'A tramp falls asleep in a meadow and watches the insects: butterflies courting, beetles hoarding, ants organising a state, and a colony of termites that worships its own efficiency. He wakes up and goes back to being human.',
        context:
            'Written with his brother Josef, and the most savagely funny play either of them wrote: a satire of militarism, nationalism and the division of labour, staged as a nature documentary. Its final scene is one of the darkest in twentieth-century theatre.',
        topics: ['insects', 'satire', 'the state', 'militarism', 'the tramp'],
    },
]

/* ── The shelf ────────────────────────────────────────────────────────────── */

export const MODERN_PLAYS = [
    ...IBSEN_PLAYS,
    ...CHEKHOV_PLAYS,
    ...SHAW_PLAYS,
    ...WILDE_COMEDIES,
    ...SYNGE_PLAYS,
    ...RUSSIAN_REALISM,
    ...NATURALIST_PLAYS,
    ...SYMBOLIST_PLAYS,
    ...EXPRESSIONIST_PLAYS,
]

/**
 * The two movements this shelf cannot carry, and the individual plays that are
 * the reason. Both are in copyright in every major jurisdiction: naming them is
 * the only honest thing a free library can do.
 */
export const MODERN_UNHOSTABLE = [
    {
        movement: 'Epic Theatre',
        title: 'Bertolt Brecht',
        note: 'Brecht died in 1956, so his plays are in copyright in the United States until 2052 and in the European Union until 2027; the standard English versions by Willett, Manheim and Bentley are separately copyrighted. Mother Courage, The Threepenny Opera, Galileo, The Caucasian Chalk Circle and The Good Person of Szechwan are the plays to read, in a library or a bought edition. Nothing by Brecht can be hosted here.',
    },
    {
        movement: 'Absurdism',
        title: 'Samuel Beckett, Eugène Ionesco, Harold Pinter, Jean Genet',
        note: 'Waiting for Godot, Endgame, The Bald Soprano, The Chairs, The Birthday Party and The Maids are all in copyright: Beckett died in 1989 and his estate is strict about the texts, and the French originals of Ionesco are equally protected. These are the defining plays of the movement and none of them can appear on a free shelf.',
    },
    {
        movement: 'Absurdism',
        title: 'Alfred Jarry, Ubu Roi',
        note: 'The ancestor of the absurd, published in 1896 and out of copyright — but Gutenberg holds it only in French. An English Ubu Roi would need a public-domain translation, and the well-known ones are not free to reproduce.',
    },
    {
        movement: 'Expressionism',
        title: 'The German expressionists',
        note: 'Georg Kaiser (Gas), Ernst Toller (Mass Man), Reinhard Sorge and Walter Hasenclever are the playwrights who made expressionism a movement after Strindberg. Their plays are in copyright, and Gutenberg carries none of them in English.',
    },
]

const BUILT = Object.fromEntries(MODERN_SHELF.map((entry) => [entry.slug, entry]))

export const MODERN_SHELF_BY_SLUG = BUILT

/**
 * Shape the library UI renders. Every card is a hosted PDF: nothing here sends
 * a reader to another website.
 */
export function toModernCard(play) {
    const built = BUILT[play.slug]
    if (!built) {
        throw new Error(`${play.slug}: no PDF in the modern shelf - run npm run modern:build`)
    }

    return {
        id: `modern-${play.slug}`,
        slug: play.slug,
        code: '',
        title: play.title,
        subtitle: `${built.translator} \u00b7 PDF, ${built.pages} pages \u00b7 free`,
        author: play.author,
        group: play.movement,
        movement: play.movement,
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
        domain: MODERN_DOMAIN,
        priceKobo: 0,
        is_free: true,
        download_path: built.download_path,
        external_url: null,
        page_count: built.pages,
        file_size_bytes: built.bytes,
        description: play.synopsis,
        is_official: true,
        isModern: true,
        isExternal: false,
        isBook: false,
        isFresherPdf: false,
        isDrama: false,
        isRoman: false,
        isMedieval: false,
        isRenaissance: false,
    }
}

export function findModernPlayBySlug(slug) {
    return MODERN_PLAYS.find((play) => play.slug === slug) || null
}

export function modernPlaysInMovement(name) {
    return MODERN_PLAYS.filter((play) => play.movement === name)
}

/** The movements that actually hold a play, in display order. */
export function modernMovements() {
    return MODERN_MOVEMENTS.map((movement) => ({
        ...movement,
        plays: modernPlaysInMovement(movement.name),
    })).filter((movement) => movement.plays.length > 0)
}

export function modernCounts() {
    const byMovement = {}
    for (const play of MODERN_PLAYS) {
        byMovement[play.movement] = (byMovement[play.movement] || 0) + 1
    }
    return { byMovement, total: MODERN_PLAYS.length }
}
