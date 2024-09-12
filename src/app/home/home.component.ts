import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Country } from '../models/country';
import { CountriesService } from '../services/countries.service';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  countries$!: Observable<Country[]>;
  searchText: string = '';
  randomCountries!: Country[];

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.getCountries();
    this.generateRandomData();
  }

  getCountries() {
    this.countries$ = this.countriesService.getCountriesByPartialName(
      this.searchText
    );
  }

  generateRandomData() {
    this.countriesService
      .getCountriesByPartialName('')
      .pipe(take(1))
      .subscribe((res) => {
        const shuffled = res.sort(() => 0.5 - Math.random());
        this.randomCountries = shuffled.slice(0, 3);

        this.randomCountries.forEach((country) => {
          this.countriesService
            .getClosestCountryHoliday(country.countryCode)
            .pipe(take(1))
            .subscribe((holiday) => (country.closestHoliday = holiday));
        });
      });
  }
}
