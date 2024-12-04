import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DecimalPipe} from '@angular/common';
import {CurrencyService} from '../currency.service';

@Component({
  selector: 'app-test2',
  imports: [
    FormsModule,
    DecimalPipe
  ],
  templateUrl: './test2.component.html',
  standalone: true,
  styleUrl: './test2.component.css'
})
export class Test2Component implements OnInit {
  userInput: string = '1156.78';
  // userInput: string = '1111';

  constructor(private service:CurrencyService) {
  }
  checkInputType(): void {
    this.display([this.userInput]);
  }

  // works
  getInputType(input: string): string {
    const germanFormatRegex = /^[0-9]{1,3}(?:\.[0-9]{3})*(?:,[0-9]+)?$/;
    const englishFormatRegex = /^[0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]+)?$/;
    const hasExactlyOneComma = /^([^,]*,([^,]*))$/;
    const hasExactlyOnePoint = /^[^.]*\.[^.]*$/;
    const otherFormatRegex = /^[0-9]+$/;

    // input = input.trim(); //  remove whitespace
    input = input.replace(/\s+/g, ''); //  remove all whitespace

    if (!input.includes(',') && !input.includes('.')) {
      // remove all later symbols and keep only numbers
      const numericString = input.replace(/[^0-9.-]/g, '');
      if (isNaN(Number(numericString))) {
        return 'Unknown format';
      } else {
        return 'Other';
      }
    } else if (germanFormatRegex.test(input)) {
      return 'German format';
    } else if (englishFormatRegex.test(input)) {
      return 'English format';
    } else if (otherFormatRegex.test(input)) {
      return 'Other';
    }
    else if (hasExactlyOneComma.test(input)) {
      return 'German format';
    } else if (hasExactlyOnePoint.test(input)) {
      return 'English format';
    } else {
      return 'Unknown format';
    }
  }


  hasExactlyOneComma(input: string): boolean {
    const parts = input.split(',');
    return parts.length === 2 && !input.includes(',,'); // Ensures only one comma
  }

  hasExactlyOnePoint(input: string): boolean {
    const parts = input.split('.');
    return parts.length === 2 && !input.includes('..'); // Ensures only one dot
  }

  // Check the format of the input string and return the English formatted number
  convertToEnglishFormat(input: string): string {
    const inputType = this.getInputType(input);

    // If it's already in English format, return as is
    if (inputType === 'English format') {
      return this.formatNumber(input, 'en-US');
    }

    // If it's in German format, convert to English format
    if (inputType === 'German format') {
      const numericValue = this.convertGermanToEnglish(input);
      return this.formatNumber(numericValue, 'en-US');
    }

    // If it's a simple number without any separators, just return the number as is
    if (inputType === 'Other') {
      console.log('other',this.formatNumber(input, 'en-US'))
      return this.formatNumber(input, 'en-US');
    }

    // Return 'Invalid input' if the format cannot be detected
    // return 'Invalid input';
    return '';
  }

  // This function converts German formatted numbers to English
  convertGermanToEnglish(input: string): string {
    // Remove the periods (thousands separator) and replace the comma with a period (decimal separator)
    return input.replace(/\./g, '').replace(',', '.');
  }

  // Helper function to format numbers to English format using toLocaleString
  formatNumber(input: string, locale: string): string {
    // Convert the input to a number and then format it using the given locale
    const numberValue = parseFloat(input);
    if (isNaN(numberValue)) {
      return '';
    }
    return numberValue.toLocaleString(locale);
  }

  ngOnInit(): void {

    // Example inputs to test:
//     const inputs = [
//       "1234.213231",        // English format
//       "1234,213231",        // German format
//       "1234",        // Other format
//       "12,34",        // German format
//       "56.78",        // English format
//       "1,234.56",     // German format
//       "98,765.43",    // German format
//       "10,000",       // German format
//       "5,678.90",     // German format
//       "123,456",      // German format
//       "12,345.67",    // German format
//       "987.65",       // English format
//       "123,456.78",   // German format
//       "45.67",        // English format
//       "5,678,901",    // English format
//       "2,345.67",     // German format
//       "1,234,567.89", // German format
//       "12.34",        // English format
//       "23456789",     // Other
//       "1234567890",   // Other
//       "123,456,789",  // English format
//       "10,987,654.32",// German format
//       "1,234,567",    // English format
//       " 1234567.1234"     // English format
//     ];
//
// // Log the result for each input
//     this.display(inputs);
  }

  private display(inputs: string[]) {
    inputs.forEach(input => {
      console.log(`Input: ${input} -> Type: ${this.getInputType(input)} -> Formatted: ${this.convertToEnglishFormat(input)} `);
    });
  }

  onInputChange(): void {
    // Ensure the input is correctly formatted when the user inputs a value
    this.userInput = this.convertToEnglishFormat(this.userInput);
  }
}
