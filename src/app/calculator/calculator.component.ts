import { Component } from '@angular/core';
import { CalculatorService } from '../calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  a = 0;
  b = 0;
  result = 0;

  constructor(public calculatorService: CalculatorService){}

  buttonClick() {
    this.result = this.calculatorService.addTwoNumbers(this.a, this.b);
  }
}
