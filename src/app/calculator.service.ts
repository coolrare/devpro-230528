import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor() {}

  addTwoNumbers(a: number, b: number) {
    console.log('CalculatorService, addTwoNumbers');
    return a + b;
  }
}
