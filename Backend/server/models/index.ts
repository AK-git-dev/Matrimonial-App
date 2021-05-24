type Gender = "Male" | "Female" | "Shemale";

export interface SignupInterface {
  email: string;
  password: string;
  phoneNumber: string;
}

export interface CreateProfileInterface {
  fullname: string;
  dateOfBirth: Date;
  age: number;
  gender: Gender;
  phoneNumber: string;
  martialStatus: string;
  motherTongue: string;
  isCasteBarrier: boolean;
  fathersName: string;
  mothersName: string;
}
