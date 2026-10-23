/**
 * How each shelf describes itself.
 *
 * The library has nine shelves and more than three hundred documents; a single
 * undifferentiated list is unusable on a phone. This module is the one place
 * that says what each shelf is for, what a reader should call its items, and
 * which titles it honestly does not hold.
 */
import { EURIPIDES_NOT_AVAILABLE } from './dramaLibrary'
import { MEDIEVAL_NOT_AVAILABLE } from './medievalLibrary'
import { RENAISSANCE_NOT_AVAILABLE } from './renaissanceLibrary'
import { MODERN_UNHOSTABLE } from './modernLibrary'

export const SHELF_INFO = {
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

const DEFAULT_INFO = { blurb: '', unit: 'document', unitPlural: 'documents' }

export function shelfInfo(name) {
    return { ...DEFAULT_INFO, ...(SHELF_INFO[name] || {}) }
}

/**
 * The titles a shelf deliberately does not hold, with the reason for each.
 * A shelf with no recorded gap returns null, and the page then says nothing.
 */
export function shelfGaps(name) {
    switch (name) {
        case 'Greek Tragedy':
            return {
                title: 'Two Euripides plays are not on this shelf',
                description:
                    'All nineteen of his plays survive in Greek, but no public-domain English translation of these two is free to reproduce.',
                items: EURIPIDES_NOT_AVAILABLE.map((play) => ({
                    label: play.title,
                    hint: play.greekTitle,
                    note: play.note,
                })),
            }
        case 'Medieval Theatre':
            return {
                title: 'Seven medieval plays are not on this shelf',
                description:
                    'They survive, but only in Middle English spelling or in modern editions still in copyright.',
                items: MEDIEVAL_NOT_AVAILABLE.map((play) => ({
                    label: play.title,
                    note: play.note,
                })),
            }
        case 'Renaissance Theatre':
            return {
                title: 'What the play shelves leave out',
                description:
                    'Sixty-nine plays is not the whole of the English Renaissance stage. These are the largest gaps, named rather than given a card that opens nothing.',
                items: RENAISSANCE_NOT_AVAILABLE.map((play) => ({
                    label: play.title,
                    note: play.note,
                })),
            }
        case 'Modern Theatre':
            return {
                title: 'The two movements this shelf cannot carry',
                description:
                    'Epic Theatre and Absurdism are in copyright in every major jurisdiction. These are the plays to read elsewhere, and why they are not here.',
                items: MODERN_UNHOSTABLE.map((play) => ({
                    label: `${play.title} (${play.movement})`,
                    note: play.note,
                })),
            }
        default:
            return null
    }
}
