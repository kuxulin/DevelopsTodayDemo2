import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country } from '../models/country';
import { Holiday } from '../models/holiday';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private http: HttpClient) {}

  getCountriesByPartialName(name: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${environment.API}/AvailableCountries`)
      .pipe(
        map((countries) =>
          countries.filter((country) =>
            name.length === 0 ? true : country.name.includes(name)
          )
        )
      );
  }

  getCountryHolidays(code: string, year: number): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(
      `${environment.API}/PublicHolidays/${year}/${code}`
    );
  }
}
