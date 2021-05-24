import {
  createError,
  Next,
  RequestInterface,
  ResponseInterface,
} from "../index";
import { CreateProfileInterface } from "../../models";

export async function requiresMinimumAge(
  req: RequestInterface,
  res: ResponseInterface,
  next: Next
) {
  try {
    const payload: CreateProfileInterface = req.body as CreateProfileInterface;
    if (payload.gender === "Male") {
      const year = new Date().getUTCFullYear();
      const dob = new Date(payload.dateOfBirth).getUTCFullYear();
      const age = +year - dob;
      if (age < 22)
        throw new createError.UnprocessableEntity(
          `${payload.fullname}! you have to be minimum 22 years old to create account!`
        );
    } else {
      const year = new Date().getUTCFullYear();
      const dob = new Date(payload.dateOfBirth).getUTCFullYear();
      const age = +year - dob;
      if (age < 18)
        throw new createError.UnprocessableEntity(
          `${payload.fullname}! you have to be minimum 18 years old to create account!`
        );
    }
    next();
  } catch (error) {
    next(error);
  }
}
