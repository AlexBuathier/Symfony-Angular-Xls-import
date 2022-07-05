import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment as env} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {MusicTrend} from '../models/music-trend';

@Injectable({
  providedIn: 'root'
})
export class MusicTrendService {

  constructor(private http: HttpClient) { }

  getMusicTrendCollection(): Observable<MusicTrend[]> {
    return this.http.get<MusicTrend[]>(`${env.domain}/api/music_trends.json`);
  }
}
