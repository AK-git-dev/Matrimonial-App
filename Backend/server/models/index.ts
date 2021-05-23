type Gender = "Male" | "Female" | "Shemale";

export interface SignupInterface {
  fullname: string;
  dateOfBirth: Date;
  age: number;
  gender: Gender;
  phoneNumber: string;
  email: string;
  password: string;
  martialStatus: string;
  motherTongue: string;
  isCasteBarrier: boolean;
  fathersName: string;
  mothersName: string;
  accountActive: boolean;
}
