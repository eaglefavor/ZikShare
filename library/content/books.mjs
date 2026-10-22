// Christian Books shelf.
//
// These are not authored ZikShare study packs. They are full-length books
// supplied as PDFs by the operator, catalogued here so the Library can list,
// search and serve them from /library/books/<slug>.pdf.
//
// `sourceFile` is the name of the supplied file. The importer
// (scripts/import-books.mjs) copies it into public/library/books/, measures the
// page count and checksum, and writes library/books.generated.json.
//
// `rights` records what the document itself says about copyright. It is NOT a
// claim that we hold a licence:
//   'publisher-copyright' - the PDF carries a publisher copyright notice
//   'edition-claims-public-domain' - the edition asserts public domain
//   'unverified' - no notice found; status not established
// Public distribution of a 'publisher-copyright' title needs the publisher's
// permission. See library/README.md.

export const CHRISTIAN_BOOKS_DOMAIN = 'Christian Books'

export const CHRISTIAN_BOOKS = [
    {
        slug: 'let-us-pray-watchman-nee',
        sourceFile: 'Let-Us-Pray-by-Watchman-Nee.pdf',
        title: 'Let Us Pray',
        subtitle: 'Collected messages on the prayer life of the believer',
        author: 'Watchman Nee',
        publisher: 'Christian Fellowship Publishers, New York',
        year: 1977,
        rights: 'publisher-copyright',
        topics: ['Prayer', 'Devotional', 'Church life'],
        description:
            'A short collection of messages, translated and published in English for the first time in 1977, asking what prayer actually is: whether we are really praying when we pray, what gives prayer its power, and what the conditions of an effective prayer life are. Readable in an evening, and intended for repeated reading rather than a single pass.',
    },
    {
        slug: 'the-spiritual-man-watchman-nee',
        sourceFile: 'The Spiritual Man.pdf',
        title: 'The Spiritual Man',
        subtitle: 'On spirit, soul and body — and the believer\u2019s walk after the Spirit',
        author: 'Watchman Nee',
        publisher: 'Christian Fellowship Publishers, New York',
        year: 1968,
        rights: 'publisher-copyright',
        topics: ['Spiritual formation', 'Theology', 'Sanctification'],
        description:
            'The longest and most systematic of the titles on this shelf: a combined edition of Nee\u2019s treatment of spirit, soul and body, the flesh, the soul, the spirit, walking after the Spirit, and the analysis of the soul in its emotion, mind and will. Dense and structured — work through it in parts with a notebook rather than reading it straight through.',
    },
    {
        slug: 'the-breaking-of-the-outer-man-watchman-nee',
        sourceFile: 'watchman-nee-the-breaking-of-the-outer-man.pdf',
        title: 'The Breaking of the Outer Man',
        subtitle: 'And the release of the spirit',
        author: 'Watchman Nee',
        publisher: 'Messages dated c. 1942–1951',
        year: null,
        rights: 'unverified',
        topics: ['Spiritual formation', 'Ministry', 'Discipline'],
        description:
            'Eight short chapters on the difference between the outward life and the inward one, arguing that an unbroken outer man frustrates the release of the spirit, and describing how breaking happens through discipline, dealings and the ordinary pressures of a life. A concise companion to The Spiritual Man.',
    },
    {
        slug: 'how-to-study-the-bible-watchman-nee',
        sourceFile: 'watchman-nee-how-to-study-the-bible.pdf',
        title: 'How to Study the Bible',
        subtitle: 'Preparing the person, then the methods',
        author: 'Watchman Nee',
        publisher: 'Messages dated c. 1942–1951',
        year: null,
        rights: 'unverified',
        topics: ['Bible study', 'Hermeneutics', 'Devotional'],
        description:
            'Two sections: the person who studies, with its three prerequisites and the things related to the Holy Spirit, and then the methods — keys to studying the Bible and the practice of it. Useful as a method book even if you do not share its theological commitments, because the argument is that method is secondary to the condition of the reader.',
    },
    {
        slug: 'love-not-the-world-watchman-nee',
        sourceFile: 'love-not-the-world-watchman-nee2.pdf',
        title: 'Love Not the World',
        subtitle: 'The mind behind the world system, and the believer\u2019s separation from it',
        author: 'Watchman Nee',
        publisher: 'Undated sermon collection',
        year: null,
        rights: 'edition-claims-public-domain',
        topics: ['Worldliness', 'Discipleship', 'Devotional'],
        description:
            'A collection of sermons on the world as a system with its own mind and trend, and on what separation from it means in ordinary life. Short chapters, plain argument, and a recurring pastoral concern rather than a technical theology. The edition itself states that it is in the public domain.',
    },
    {
        slug: 'they-shall-expel-demons-derek-prince',
        sourceFile: 'they-shall-expel-demons-derek-prince.pdf',
        title: 'They Shall Expel Demons',
        subtitle: 'What you need to know about demons — your invisible enemies',
        author: 'Derek Prince',
        publisher: 'Derek Prince Ministries',
        year: null,
        rights: 'publisher-copyright',
        topics: ['Deliverance', 'Spiritual warfare', 'Pastoral ministry'],
        description:
            'Part teaching, part testimony: fundamentals of how Jesus ministered, the author\u2019s own experience and failures, seven common questions, and then a practical section on recognising, preparing for and keeping deliverance. The most practical title on the shelf, and the one to read with a pastor rather than alone.',
    },
    {
        slug: 'lucifer-exposed-derek-prince',
        sourceFile: 'Lucifer-Exposed-by-DEREK PRINCE.pdf',
        title: 'Lucifer Exposed',
        subtitle: 'The devil\u2019s plan to destroy your life',
        author: 'Derek Prince',
        publisher: 'Derek Prince Ministries',
        year: null,
        rights: 'publisher-copyright',
        topics: ['Spiritual warfare', 'Doctrine', 'Christian living'],
        description:
            'A study of the fall of Lucifer and of the strategies the author attributes to him — accusation, deception, temptation, condemnation — written to make the reader alert rather than afraid. Pairs naturally with They Shall Expel Demons, which takes the same subject into pastoral practice.',
    },
    {
        slug: 'victory-in-jesus-kathryn-kuhlman',
        sourceFile: 'victoryinjesus00kuhl.pdf',
        title: 'Victory in Jesus and The Lord\u2019s Healing Touch',
        subtitle: 'Two books in one, on faith and divine healing',
        author: 'Kathryn Kuhlman',
        publisher: 'Scanned edition',
        year: null,
        rights: 'publisher-copyright',
        topics: ['Faith', 'Healing', 'Testimony'],
        description:
            'Two titles bound together, built largely from testimonies and sermon material from Kuhlman\u2019s healing ministry. This is a scanned copy, so the text is an image of the printed page: read it on a large screen, and expect to zoom rather than search.',
    },
]
