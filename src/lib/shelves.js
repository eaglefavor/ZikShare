/**
 * The nine shelves, described without loading the library itself.
 *
 * The landing page has to name every shelf and say what it is for, but it must
 * not download three hundred book records to do it: the catalogue is half a
 * megabyte of text and the first screen should not wait for it. This module
 * holds only the labels — names, emoji, descriptions, what a shelf calls its
 * items. The counts come from the catalogue when they are needed, never from a
 * number typed here.
 */

/** Display order. The same order the library page and the sitemap use. */
export const SHELF_ORDER = [
    'GST & Compulsory Courses',
    'Money & Career',
    'Greek Tragedy',
    'Roman Theatre',
    'Medieval Theatre',
    'Renaissance Theatre',
    'Modern Theatre',
    'Theatre Arts',
    'Christian Books',
]

export const SHELF_EMOJI = {
    'GST & Compulsory Courses': '🏛️',
    'Money & Career': '💼',
    'Greek Tragedy': '🎭',
    'Roman Theatre': '🏺',
    'Medieval Theatre': '🕯️',
    'Renaissance Theatre': '👑',
    'Modern Theatre': '🌍',
    'Theatre Arts': '🎬',
    'Christian Books': '📕',
}

/**
 * What each shelf is for, and what one item on it is called. Kept in step with
 * the catalogue by `src/test/shelves.test.js`: every shelf that holds documents
 * must have an entry here, and no entry may describe an empty shelf.
 */
export const SHELF_META = {
    'GST & Compulsory Courses': {
        blurb: 'NOUN course manuals for the GST courses every UNIZIK student takes.',
        unit: 'manual',
        unitPlural: 'manuals',
    },
    'Money & Career': {
        blurb: 'Entrepreneurship and business manuals for the NEE courses.',
        unit: 'manual',
        unitPlural: 'manuals',
    },
    'Greek Tragedy': {
        blurb: 'Aeschylus, Sophocles and Euripides in public-domain English translations.',
        unit: 'play',
        unitPlural: 'plays',
    },
    'Roman Theatre': {
        blurb: 'Plautus, Terence and Seneca: comedy and tragedy from the Roman stage.',
        unit: 'play',
        unitPlural: 'plays',
    },
    'Medieval Theatre': {
        blurb: 'Cycle plays, moralities, and the first named playwright of the West.',
        unit: 'play',
        unitPlural: 'plays',
    },
    'Renaissance Theatre': {
        blurb: 'Shakespeare and his contemporaries, from Lyly to Shirley.',
        unit: 'play',
        unitPlural: 'plays',
    },
    'Modern Theatre': {
        blurb: 'Ibsen to Čapek: realism, naturalism, symbolism and expressionism.',
        unit: 'play',
        unitPlural: 'plays',
    },
    'Theatre Arts': {
        blurb: 'Directing, design, stagecraft, Nigerian theatre history and criticism.',
        unit: 'title',
        unitPlural: 'titles',
    },
    'Christian Books': {
        blurb: 'Full-length books, read in the browser or downloaded as a PDF.',
        unit: 'book',
        unitPlural: 'books',
    },
}
