export default interface IOrder {
  userId: string;
  paymentId: string;
  name: string;
  // totalPrice: number,
  totalPaid: number,
  // totalReturn: number,
  // receiptCode: string,
  products: {
    productId: string;
    quantity: number;
  }[];
}