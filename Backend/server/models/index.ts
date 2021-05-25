type Gender = "Male" | "Female" | "Shemale";

/** Generate OtpCode | Magic Code **/
export interface PreflightInterface {
  id: string;
  email: string;
  phoneNumber: string;
  otpCode: string;
}

export interface SignupInterface {
  email: string;
  password: string;
  phoneNumber: string;
}

// TokenInterface for Authentication
export interface TokenInterface {
  userId: string;
  email: string;
  phoneNumber: string;
}

// Address Interface
export interface AddressInterface {
  address: string;
  city: string;
  district: string;
  country: string;
  zipCode: string;
}

// Caste Interface
export interface CasteInterface {
  caste: string;
  subCaste: string;
}

export interface LifestyleInterface {
  height: number;
  weight: number;
  bloodGroup: string;
  dressStyle: string;
  bodyShape: string;
  skinComplextion: string;
  diet: string;
  drinkingHabbits: string;
  smokingHabits: string;
  sportsFitness: string;
  anyChildren: "1" | "2" | "3+";
  dateOfMarriage: string;
  dateDivorced: string;
  isDivorced: boolean;
  reasonForDivorced: string;
  haveAnyDieases: boolean;
  descriptionOfDieseases: string;
}

export interface EducationInterface {
  type: string;
  degree: string;
  institutionName: string;
  specializationIn: string;
  passoutYear: string;
}

/** Profile Create Information Interface */
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

// Login With OTP Interface
export interface LoginOTPInterface {
  phoneNumber: string;
}
