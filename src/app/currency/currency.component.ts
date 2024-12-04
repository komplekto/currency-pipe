import {Component, OnInit} from '@angular/core';
import {CurrencyService} from '../currency.service';
import {debounceTime, Subject} from 'rxjs';
import {FormsModule} from '@angular/forms';
import { NgIf} from '@angular/common';

@Component({
  selector: 'app-currency',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './currency.component.html',
  standalone: true,
  styleUrl: './currency.component.css'
})
export class CurrencyComponent implements OnInit {
  value!: number; // Holds the actual numeric value
  formattedValue: string = ''; // Holds the formatted value for display
  loading = true;

  private valueChange$ = new Subject<number>(); // Debounced subject for value changes

  constructor(private _currencyService: CurrencyService) {}

  ngOnInit(): void {
    // Fetch initial data from backend
    this._currencyService.getData().subscribe({
      next: (data) => {
        this.loading = false;
        this.value = data;
        this.formattedValue = this.formatFloat(data); // Format the fetched value
      },
      error: (err) => {
        this.loading = false;
      }
    });

    // Subscribe to debounced changes
    this.valueChange$.pipe(debounceTime(300)).subscribe((value: number) => {
      this.sendValueToBackend(value);
    });
  }

  // Formats the number into English number format with 2 decimal places
  formatFloat(value: number): string {
    return new Intl.NumberFormat('en-US').format(value);
  }

  // Handles user input and updates both formattedValue and value
  onInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value;

    // Remove formatting (e.g., commas) and convert back to a number
    const numericValue = parseFloat(input.replace(/,/g, ''));

    if (!isNaN(numericValue)) {
      this.value = numericValue; // Store the raw numeric value
      this.formattedValue = this.formatFloat(numericValue); // Update the formatted value
      this.valueChange$.next(numericValue); // Trigger debounced value change
    }
  }

  // Sends the updated numeric value to the backend
  private sendValueToBackend(value: number): void {
    this._currencyService.updateData(value).subscribe({
      next: (data) => {
        console.log('Updated value sent to backend:', data);
      },
      error: (err) => {
        console.error('Error updating value:', err);
      }
    });
  }
}
