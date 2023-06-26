export default interface IPayments {
  name: string,
  type: "CASH" | "DEBIT" | "CREDIT"
  logo: string
}