import {MusicTrend} from './music-trend';

export class MusicGroup {
    constructor(public id: number,
                public startDate: Date,
                public separationDate: Date,
                public founder: string,
                public members: number,
                public presentation: string,
                public musicTrend: MusicTrend
    ) {
    }
}
