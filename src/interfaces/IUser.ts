export default interface IUser {
  name: string,
  email: string,
  password: string,
  role: "ADMIN" | "CUSTOMER"
  isVerify: boolean 
}
