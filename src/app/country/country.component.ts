import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Observable } from 'rxjs';
import { Holiday } from '../models/holiday';
import { CountriesService } from '../services/countries.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { environment } from '../environments/environment';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
})
export class CountryComponent implements OnInit {
  holidays$!: Observable<Holiday[]>;
  enabledYears = [
    2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
  ];
  selectedYear = environment.CURRENT_YEAR;
  code!: string;
  constructor(
    private countriesService: CountriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('countryCode')!;
    this.getHolidays();
  }

  getHolidays() {
    this.holidays$ = this.countriesService.getCountryHolidays(
      this.code,
      this.selectedYear
    );
  }
}
