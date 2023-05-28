export class DbContext {

  AddOrder(order: any) {
    console.log('DbContext, AddOrder');
    // 實際寫到資料庫內
  }

}


export function addTwoNumbers(a: number, b: number) {
  return a + b;
}

export function createSN(id: number) {
  return id + 1;
}

export function calculateFee(price: number) {
  return price > 300 ? 0 : 60;
}

export function createOrder(order: any, db: DbContext) {
  // 建立流水號
  const sn = createSN(order.id);

  // 計算運費
  const fee = calculateFee(order.price);

  // 存到資料庫
  const result = {
    id: sn,
    price: order.price,
    fee: fee
  };
  db.AddOrder(order);


  // 回傳結果
  return result;
}
