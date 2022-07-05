import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MusicGroup} from '../models/music-group';
import {BehaviorSubject, Observable, switchMap, tap} from 'rxjs';
import {environment as env} from '../../environments/environment';
import {Country} from '../models/country';
import {City} from '../models/city';

@Injectable({
    providedIn: 'root'
})
export class MusicGroupService {

    musicGroups: BehaviorSubject<any> = new BehaviorSubject(null);
    musicGroup$: Observable<MusicGroup[]> = this.musicGroups.asObservable();


    constructor(private http: HttpClient) {
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    }

    getMusicGroupCollection(): Observable<MusicGroup[] | null> {
        if (this.musicGroups.value) {
            return this.musicGroups;
        } else {
            return this.http.get<MusicGroup[]>(`${env.domain}/api/music_groups.json`, this.httpOptions).pipe(
                tap((musicGroup: MusicGroup[]) => {
                    this.musicGroups.next(musicGroup);
                }), switchMap(() => {
                    return this.musicGroups;
                })
            );
        }
    }

    putMusicGroupItem(id: number, item: MusicGroup): Observable<MusicGroup> {
        return this.http.put<MusicGroup>(`${env.domain}/api/music_groups/${id}`, item);
    }

    postMusicGroupItem(item: MusicGroup): Observable<MusicGroup> {
        return this.http.post<MusicGroup>(`${env.domain}/api/music_groups`, item);
    }

    deleteMusicGroupItem(id: number): Observable<MusicGroup> {
        return this.http.delete<MusicGroup>(`${env.domain}/api/music_groups/${id}`);
    }

    getMusicGroupItem(id: number): Observable<MusicGroup> {
        return this.http.get<MusicGroup>(`${env.domain}/api/music_groups/${id}.json`, this.httpOptions);
    }

    getMusicTrendCollection(): Observable<any> {
        return this.http.get<any>(`${env.domain}/api/music_trends.json`, this.httpOptions);
    }

    getCountryCollection(): Observable<Country[]> {
        return this.http.get<Country[]>(`${env.domain}/api/countries.json`, this.httpOptions);
    }

    getCityCollection(): Observable<MusicGroup[]> {
        return this.http.get<MusicGroup[]>(`${env.domain}/api/cities.json`, this.httpOptions);
    }

    getCityByCountry(id: number): Observable<City[]> {
        return this.http.get<City[]>(`${env.domain}/api/countries/${id}.json`, this.httpOptions);
    }
}
