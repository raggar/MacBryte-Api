import validator from "validator";

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
  if (password.length < 3) {
    throw new Error("Password too short, must be greater than 4 character");
  }
  if (!validator.isAlphanumeric(password)) {
    throw new Error("Password contains invalid characters");
  }
  return password;
};
