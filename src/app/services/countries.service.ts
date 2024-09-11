import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private http: HttpClient) {}

  getCountriesByPartialName(name: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${process.env['API']}/AvailableCountries`)
      .pipe(
        map((countries) =>
          countries.filter((country) =>
            name.length === 0 ? true : country.name.includes(name)
          )
        )
      );
  }
}
