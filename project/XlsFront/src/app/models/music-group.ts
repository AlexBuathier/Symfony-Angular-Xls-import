import {MusicTrend} from './music-trend';

export class MusicGroup {
    constructor(public id: number,
                public startDate: Date,
                public separatedDate: Date,
                public founder: string,
                public member: number,
                public presentation: string,
                public musicTrend: MusicTrend
    ) {
    }
}
