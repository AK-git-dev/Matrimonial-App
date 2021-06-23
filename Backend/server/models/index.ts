import { DataTypes } from "sequelize";
import User from "../../database/schema/user.schema";

type Gender = "Male" | "Female" | "Shemale";

/** Generate OtpCode | Magic Code **/
export interface PreflightInterface {
  id: string;
  email: string;
  phoneNumber: string;
  otpCode: string;
}

export interface PhoneNumberSignupInterface {
  phoneNumber: string;
}

export interface SignupInterface {
  email: string;
  password: string;
  phoneNumber: string;
}

// TokenInterface for Authentication
export interface TokenInterface {
  userId: string;
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
  id: string;
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

/** Occupation Information Interface */
export interface OccupationInterface {
  type: string;
  currentCompanyName: string;
  salary: string;
  isSelfEmployeed: boolean;
}

/** Relative Contact Details **/
export interface RelativeContactInterface {
  type: string;
  phoneNumber: string;
}

/** Family Details Interface **/
export interface FamilyDetailsInterface {
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  noOfBrothers: number;
  noOfSisters: number;
  familyStatus: string;
  familyValues: string;
  ancestralOrigin: string;
}

/** PrefferedPartner Interface **/
export interface PrefferedPartnerInterface {
  minHeight: string;
  maxHeight: string;
  minAge: string;
  maxAge: string;
  expectedSalary: string;
  salaryType: string;
  caste: string;
  occupation: string;
  country: string;
  martitialStatus: string;
  prefferedMotherTounge: string[];
}

/*
  ------------------DATAMODELS_SCHEMA_RESPONSES----------------------
 */

export interface User {
  id?: string;
  fullname?: string;
  dateOfBirth?: Date;
  age?: number;
  gender?: string;
  phoneNumber?: string;
  email?: string;
  martialStatus?: string;
  motherTongue?: string;
  isCasteBarrier?: boolean;
  fathersName?: string;
  mothersName?: string;
  accountActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  Educations?: Education[];
  Address?: Address;
  Caste?: Caste;
  LifeStyle?: LifeStyle;
  UploadedDocument?: null;
  Occupation?: Occupation;
  PrefferedPartnerChoice?: PrefferedPartnerChoice;
  FamilyDetail?: FamilyDetail;
  ProfilePictures?: FavouritePerson[];
  RelativeContacts?: RelativeContact[];
  FavouritePersons?: FavouritePerson[];
  PersonWhoFavouritedYous?: FavouritePerson[];
}

export interface Address {
  id?: string;
  address?: string;
  city?: string;
  district?: string;
  country?: string;
  zipCode?: string;
  residentStatus?: null;
  createdAt?: Date;
  updatedAt?: Date;
  UserId?: string;
}

export interface Caste {
  id?: string;
  caste?: string;
  subCaste?: string;
  createdAt?: Date;
  updatedAt?: Date;
  UserId?: string;
}

export interface Education {
  id?: string;
  type?: string;
  degree?: string;
  institutionName?: string;
  specializationIn?: string;
  passoutYear?: string;
  createdAt?: Date;
  updatedAt?: Date;
  UserId?: string;
}

export interface FamilyDetail {
  id?: string;
  fatherName?: string;
  fatherOccupation?: string;
  motherName?: string;
  motherOccupation?: string;
  noOfBrothers?: number;
  noOfSisters?: number;
  familyStatus?: string;
  familyValues?: string;
  ancestralOrigin?: string;
  createdAt?: Date;
  updatedAt?: Date;
  UserId?: string;
}

export interface FavouritePerson {
  id?: string;
  favouritePersonId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  UserId?: string;
  personWhoFavoritedYouID?: string;
  filename?: string;
}

export interface LifeStyle {
  id?: string;
  height?: string;
  weight?: number;
  bloodGroup?: string;
  dressStyle?: string;
  bodyShape?: string;
  skinComplextion?: string;
  diet?: string;
  drinkingHabits?: null;
  smokingHabits?: string;
  sportsFitness?: string;
  anyChildren?: null;
  dateOfMarriage?: null;
  dateDivorced?: null;
  isDivorced?: null;
  reasonForDivorced?: null;
  haveAnyDieases?: boolean;
  descriptionOfDieseases?: string;
  createdAt?: Date;
  updatedAt?: Date;
  UserId?: string;
  PrivacySettingId?: null;
  favouriteMovies?: any[];
  honeymoonPlaces?: any[];
  languagesCanSpeak?: any[];
}

export interface Occupation {
  id?: string;
  type?: string;
  currentCompanyName?: string;
  salary?: number;
  isSelfEmployeed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  UserId?: string;
}

export interface PrefferedPartnerChoice {
  id?: string;
  minHeight?: string;
  maxHeight?: string;
  minAge?: string;
  maxAge?: string;
  expectedSalary?: string;
  salaryType?: string;
  createdAt?: Date;
  updatedAt?: Date;
  UserId?: string;
}

export interface RelativeContact {
  id?: string;
  type?: string;
  fullname?: string;
  phoneNumber?: string;
  UserId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
