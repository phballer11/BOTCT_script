// demon
import imp from './assets/trouble_brewing_images/imp.png'

// minions
import baron from './assets/trouble_brewing_images/baron.png';
import scarlert_woman from './assets/trouble_brewing_images/scarlert_woman.png'
import spy from './assets/trouble_brewing_images/spy.png'
import poisoner from './assets/trouble_brewing_images/poisoner.png'

// outsiders
import drunk from './assets/trouble_brewing_images/drunk.png'
import recluse from './assets/trouble_brewing_images/recluse.png'
import saint from './assets/trouble_brewing_images/saint.png'
import butler from './assets/trouble_brewing_images/butler.png'

// townfolks
import washerwoman from './assets/trouble_brewing_images/washerwoman.png'
import undertaker from './assets/trouble_brewing_images/undertaker.png'
import virgin from './assets/trouble_brewing_images/virgin.png'
import slayer from './assets/trouble_brewing_images/slayer.png'
import soldier from './assets/trouble_brewing_images/soldier.png'
import ravenkeeper from './assets/trouble_brewing_images/ravenkeeper.png'
import mayor from './assets/trouble_brewing_images/mayor.png'
import monk from './assets/trouble_brewing_images/monk.png'
import Investigator from './assets/trouble_brewing_images/Investigator.png'
import librarian from './assets/trouble_brewing_images/librarian.png'
import fortune_teller from './assets/trouble_brewing_images/fortune_teller.png'
import empath from './assets/trouble_brewing_images/empath.png'
import chef from './assets/trouble_brewing_images/chef.png'

export interface role {
    src: string,
    alt: string
}

// townfolks
const WASHERWOMAN: role = { src: washerwoman, alt: 'Washerwoman' }
const UNDERTAKER: role = { src: undertaker, alt: 'Undertaker' }
const VIRGIN: role = { src: virgin, alt: 'Virgin' }
const SLAYER: role = { src: slayer, alt: 'Slayer' }
const SOLDIER: role = { src: soldier, alt: 'Soldier' }
const RAVENKEEPER: role = { src: ravenkeeper, alt: 'Ravenkeeper' }
const MAYOR: role = { src: mayor, alt: 'Mayor' }
const MONK: role = { src: monk, alt: 'Monk' }
const INVESTIGATOR: role = { src: Investigator, alt: 'Investigator' }
const LIBRARIAN: role = { src: librarian, alt: 'Librarian' }
const FORTUNE_TELLER: role = { src: fortune_teller, alt: 'Fortune Teller' }
const EMPATH: role = { src: empath, alt: 'Empath' }
const CHEF: role = { src: chef, alt: 'Chef' }

// outsiders
export const DRUNK: role = { src: drunk, alt: 'Drunk' }
const RECLUSE: role = { src: recluse, alt: 'Recluse' }
const SAINT: role = { src: saint, alt: 'Saint' }
const BUTLER: role = { src: butler, alt: 'Butler' }

// demon
const IMP: role = { src: imp, alt: 'Imp' }

// minions
export const BARON: role = { src: baron, alt: 'Baron' }
const SCARLERT_WOMAN: role = { src: scarlert_woman, alt: 'Scarlert woman' }
const POISONER: role = { src: poisoner, alt: 'Poisoner' }
const SPY: role = { src: spy, alt: 'Spy' }


export const TOWN_FOLKS = [WASHERWOMAN,
    UNDERTAKER,
    VIRGIN,
    SLAYER,
    SOLDIER,
    RAVENKEEPER,
    MAYOR,
    MONK,
    INVESTIGATOR,
    LIBRARIAN,
    FORTUNE_TELLER,
    EMPATH,
    CHEF]
export const OUTSIDERS = [DRUNK,
    RECLUSE,
    SAINT,
    BUTLER]
export const MINIONS = [BARON, SCARLERT_WOMAN, POISONER, SPY]
export const DEMON = IMP;

export const ALL_ROLES = [...TOWN_FOLKS, ...OUTSIDERS, ...MINIONS, DEMON];