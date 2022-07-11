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

    getMusicGroupCollection(): Observable<MusicGroup[] | null> {
            return this.http.get<MusicGroup[]>(`${env.domain}/api/music_groups.json`).pipe(
                tap((musicGroup: MusicGroup[]) => {
                    this.musicGroups.next(musicGroup);
                }), switchMap(() => {
                    return this.musicGroups;
                })
            );
    }

    postImportMusicGroup(file: any): Observable<MusicGroup> {
        const formData = new FormData();

        // Store form name as "file" with file data
        formData.append("file", file, file.name);

        // Make http post request over api
        // with formData as req
        return this.http.post<MusicGroup>(`${env.domain}/api/file-import`, formData);
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
        return this.http.get<MusicGroup>(`${env.domain}/api/music_groups/${id}.json`);
    }






}
