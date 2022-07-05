import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Country} from '../models/country';
import {environment as env} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getCountryCollection(): Observable<Country[]> {
    return this.http.get<Country[]>(`${env.domain}/api/countries.json`);
  }
}
