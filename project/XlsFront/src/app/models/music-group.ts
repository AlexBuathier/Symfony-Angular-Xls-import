import {MusicTrend} from './music-trend';
import {City} from './city';

export class MusicGroup {
    constructor(public id: number,
                public name: string,
                public startDate: Date,
                public separationDate: Date | null,
                public founder: string | null,
                public members: number | null,
                public presentation: string,
                public musicTrend: MusicTrend | null,
                public city: City
    ) {
    }
}
