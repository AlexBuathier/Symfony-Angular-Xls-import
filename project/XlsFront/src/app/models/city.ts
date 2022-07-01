import {Country} from './country';

export class City {
    constructor(
        public id: number,
        public name: string,
        public country: Country
    ) {
    }
}
