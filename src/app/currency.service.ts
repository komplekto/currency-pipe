import {Injectable} from '@angular/core';
import {delay, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor() {
  }

  getData(): Observable<number> {
    const data = 1200;
    return of(data).pipe(delay(1000));
  }

  updateData(value: number): Observable<number> {
    return of(value).pipe(delay(3000));
  }
}
