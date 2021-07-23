import validator from "validator";
import { IUser, IUserDocument } from "../database/users/types";

export const validateEmail = (rawEmail: string) => {
  const email = rawEmail.trim().toLowerCase();
  if (!email) {
    throw new Error("Email must be provided");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Invalid Email");
  }
  return email;
};

export const validatePassword = (rawPassword: string) => {
  const password = rawPassword.trim();
  if (!password) {
    throw new Error("Password must be provided");
  }
  if (password.length < 4) {
    throw new Error("Password too short, must be greater than 4 character");
  }
  if (!validator.isAlphanumeric(password)) {
    throw new Error("Password contains invalid characters");
  }
  return password;
};

export const serialize = (data: IUserDocument) => {
  const serializedData: IUser = {
    firstname: data.firstname!,
    lastname: data.lastname!,
    userId: data._id!,
    email: data.email!,
    password: data.password!,
    zoomLink: data.zoomLink!,
    packagePurchased: data.packagePurchased!,
    hoursRemaining: data.hoursRemaining!,
    grandTotalHours: data.grandTotalHours!,
    previousSessionSummary: data.previousSessionSummary!,
    appleId: data.appleId!,
    dateOfEntry: data.dateOfEntry!,
    lastUpdated: data.lastUpdated!,
    isAdmin: data.isAdmin!,
  };
  return serializedData;
};
