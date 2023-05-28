import { addTwoNumbers, createSN, createOrder } from "./calculator";

class FakeDbContext {
  data: any[] = [];

  AddOrder(order: any) {
    console.log('fakeDbContext, AddOrder');
    this.data.push(order);
  }
}

describe('Calculator', () => {
  describe('數字處理', () => {
    it('addTwoNumbers 應該對兩個數字相加', () => {
      // Arrange
      const a = 1;
      const b = 2;
      const expected = 3;

      // Act
      const actual = addTwoNumbers(a, b);

      // Assert
      expect(expected).toBe(actual);
    });
  });

  describe('訂單處理', () => {
    let fakeDbContext: FakeDbContext;

    beforeEach(() => {
      console.log('beforeEach');
      fakeDbContext = new FakeDbContext();
    })

    it('createSN 要能產生流水號', () => {
      // Arrange
      const id = 100;
      const expected = 101;

      // Act
      const actual = createSN(id);

      // Assert
      expect(expected).toBe(actual);
    });

    it('createOrder 應該要能建立訂單', () => {
      // Arrange
      const order = {
        id: 100,
        price: 50,
        fee: 0,
      };
      const expected = {
        id: 101,
        price: 50,
        fee: 60,
      };

      // Act
      expect(fakeDbContext.data.length).toBe(0);
      const result = createOrder(order, fakeDbContext);

      // Assert
      expect(expected).toEqual(result);
      expect(fakeDbContext.data.length).toBe(1);
    });

    it('createOrder 應該要能計算運費並產生訂單', () => {
      // case1: 金額大於 300 時，運費 0
      // Arrange
      const order = {
        id: 100,
        price: 500,
        fee: 0,
      };
      const expected = {
        id: 101,
        price: 500,
        fee: 0,
      };

      // Act
      const result = createOrder(order, fakeDbContext);

      // Assert
      expect(expected).toEqual(result);
    });

    it('金額小於 300 時，運費 60', () => {
      // case2: 金額小於 300 時，運費 60
      // Arrange
      const order2 = {
        id: 100,
        price: 500,
        fee: 0,
      };
      const expected2 = {
        id: 101,
        price: 500,
        fee: 0,
      };

      // Act
      const result2 = createOrder(order2, fakeDbContext);

      // Assert
      expect(expected2).toEqual(result2);
    });

    it('使用 spyOn 建立假資料庫', () => {
      // Arrange
      const order2 = {
        id: 100,
        price: 500,
        fee: 0,
      };
      const expected2 = {
        id: 101,
        price: 500,
        fee: 0,
      };

      const fakeDb = jasmine.createSpyObj('fakeDbContext', ['AddOrder']);

      // Act
      const result2 = createOrder(order2, fakeDb);

      // Assert
      expect(expected2).toEqual(result2);
      expect(fakeDb.AddOrder).toHaveBeenCalled();
    });
  });


});
