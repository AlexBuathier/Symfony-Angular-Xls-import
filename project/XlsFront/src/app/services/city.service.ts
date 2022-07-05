import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {City} from '../models/city';
import {environment as env} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  getCityCollection(): Observable<City[]> {
    return this.http.get<City[]>(`${env.domain}/api/cities.json`);
  }
  getCityByCountry(id: number): Observable<City[]> {
    return this.http.get<City[]>(`${env.domain}/api/countries/${id}.json`).pipe(
        map((city: City[] | any) => {
            return city.city;
        }
    ));
  }
}
