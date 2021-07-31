import validator from "validator";
import {
  PackagePurchased,
  IUser,
  IUserDocument,
} from "../database/users/types";
import messages from "./messages";

export const validateUserInfo = (params) => {
  validateEmail(params.email);
  validatePassword(params.password);

  const refinedPackagePurchased = params.packagePurchased.trim().toLowerCase();

  let validatedPackagePurchased = "";
  Object.values(PackagePurchased).forEach((enumValue) => {
    if (enumValue.toLowerCase() == refinedPackagePurchased) {
      validatedPackagePurchased = enumValue;
    }
  });

  if (!validatedPackagePurchased) {
    throw new Error(messages.errors.invalidPackage);
  }

  if (params.hoursRemaining < 0) {
    throw new Error(messages.errors.invalidHoursRemaining);
  }

  if (params.grandTotalHours < 0) {
    throw new Error(messages.errors.invalidGrandTotalHours);
  }

  return validatedPackagePurchased;
};

export const validateEmail = (rawEmail: string) => {
  const email = rawEmail.trim().toLowerCase();
  if (!email) {
    throw new Error(messages.errors.noEmail);
  }
  if (!validator.isEmail(email)) {
    throw new Error(messages.errors.invalidEmail);
  }
  return email;
};

export const validatePassword = (rawPassword: string) => {
  const password = rawPassword.trim();
  if (!password) {
    throw new Error(messages.errors.noPassword);
  }
  if (password.length < 4) {
    throw new Error(messages.errors.passwordLength);
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
    dateOfEntry: data.dateOfEntry!,
    isAdmin: data.isAdmin!,
  };
  return serializedData;
};
