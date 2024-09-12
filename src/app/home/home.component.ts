import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  constructor(private countriesService: CountriesService) {}
  searchText: string = '';

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries() {
    this.countries$ = this.countriesService.getCountriesByPartialName(
      this.searchText
    );
  }
}
