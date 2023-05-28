import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import { By } from '@angular/platform-browser';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalculatorComponent],
    });
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('測試畫面', () => {
    it('相加兩筆資料 (nativeElement)', () => {
      // Arrange
      component.a = 1;
      component.b = 2;

      // Action
      component.buttonClick();
      fixture.detectChanges();

      // Assert
      const actualA = (fixture.nativeElement as HTMLElement).querySelector('[data-a]')?.textContent;
      const actualB = (fixture.nativeElement as HTMLElement).querySelector('[data-b]')?.textContent;
      const actualResult = (fixture.nativeElement as HTMLElement).querySelector('[data-result]')?.textContent;

      expect(actualA).toBe('1');
      expect(actualB).toBe('2');
      expect(actualResult).toBe('3');
    })


    it('相加兩筆資料 (debugElemet)', () => {
      // Arrange
      component.a = 1;
      component.b = 2;

      // Action
      component.buttonClick();
      fixture.detectChanges();

      // Assert
      const actualA = fixture.debugElement.query(By.css('[data-a]')).nativeElement.textContent;
      const actualB = fixture.debugElement.query(By.css('[data-b]')).nativeElement.textContent;
      const actualResult = fixture.debugElement.query(By.css('[data-result]')).nativeElement.textContent;

      expect(actualA).toBe('1');
      expect(actualB).toBe('2');
      expect(actualResult).toBe('3');
    })

    it('相加兩筆資料 (畫面上的按鈕按下去)', () => {
      // Arrange
      component.a = 1;
      component.b = 2;

      // Action
      // component.buttonClick();
      (fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement).dispatchEvent(new Event('click'));
      fixture.detectChanges();

      // Assert
      const actualA = fixture.debugElement.query(By.css('[data-a]')).nativeElement.textContent;
      const actualB = fixture.debugElement.query(By.css('[data-b]')).nativeElement.textContent;
      const actualResult = fixture.debugElement.query(By.css('[data-result]')).nativeElement.textContent;

      expect(actualA).toBe('1');
      expect(actualB).toBe('2');
      expect(actualResult).toBe('3');
    })
  });


  describe('測試 spy', () => {
    it('測試 calculator service 呼叫 (spyOn)', () => {
      // 假設 addTwoNumbers 需要被隔離

      // Arrange
      spyOn(component.calculatorService, 'addTwoNumbers');
      component.a = 1;
      component.b = 2;

      // Act
      component.buttonClick();

      // Assert
      expect(component.calculatorService.addTwoNumbers).toHaveBeenCalled();
    });

    it('測試 calculator service 呼叫 (callThrough)', () => {
      // 除了驗證結果外，也要驗證共用方法被呼叫

      // Arrange
      spyOn(component.calculatorService, 'addTwoNumbers').and.callThrough();
      component.a = 1;
      component.b = 2;

      // Act
      component.buttonClick();

      // Assert
      expect(component.result).toBe(3);
      expect(component.calculatorService.addTwoNumbers).toHaveBeenCalled();
    });

    it('測試 calculator service 呼叫 (callFake)', () => {
      // 假設 addTwoNumbers 需要被隔離

      // Arrange
      component.a = 1;
      component.b = 2;
      const expected = 100;
      spyOn(component.calculatorService, 'addTwoNumbers').and.callFake(
        (a, b) => expected
      );

      // Act
      component.buttonClick();

      // Assert
      expect(component.result).toBe(expected);
      expect(component.calculatorService.addTwoNumbers).toHaveBeenCalled();
    });

    it('測試 calculator service 呼叫 (returnValue)', () => {
      // 假設 addTwoNumbers 需要被隔離

      // Arrange
      component.a = 1;
      component.b = 2;
      const expected = 100;
      spyOn(component.calculatorService, 'addTwoNumbers').and.returnValue(
        expected
      );

      // Act
      component.buttonClick();

      // Assert
      expect(component.result).toBe(expected);
      expect(component.calculatorService.addTwoNumbers).toHaveBeenCalled();
    });

    it('測試 calculator service 呼叫 (toHaveBeenCalledWith)', () => {
      // 假設 addTwoNumbers 需要被隔離

      // Arrange
      component.a = 1;
      component.b = 3;
      const expected = 100;
      spyOn(component.calculatorService, 'addTwoNumbers').and.returnValue(
        expected
      );

      // Act
      component.buttonClick();

      // Assert
      expect(component.result).toBe(expected);
      expect(component.calculatorService.addTwoNumbers).toHaveBeenCalledWith(
        component.a,
        component.b
      );
    });
  });
});
