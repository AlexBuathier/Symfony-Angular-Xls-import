import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MusicGroup} from '../models/music-group';
import {Observable} from 'rxjs';
import {environment as env} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MusicGroupService {

    constructor(private http: HttpClient) {
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'my-auth-token'
        })
    }


    getMusicGroupCollection()
        :
        Observable<MusicGroup[]> {
        return this.http.get<MusicGroup[]>(`${env.domain}/api/music_groups.json`, this.httpOptions);
    }
}
