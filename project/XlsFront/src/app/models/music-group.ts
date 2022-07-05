import {MusicTrend} from './music-trend';
import {City} from './city';
import {Country} from './country';

export class MusicGroup {
    constructor(public id: number,
                public name: string,
                public startDate: Date,
                public separationDate: Date,
                public founder: string | null,
                public members: number | null,
                public presentation: string,
                public musicTrend: MusicTrend | null,
                public city: City,
                public country: Country
    ) {
    }
}
