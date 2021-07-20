import { RequestHandler } from "express";
import { validateEmail, validatePassword, serialize } from "./utils";
import { UserModel } from "./database/users/model";

const signupHandler: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validatedEmail = validateEmail(email);
    const validatedPassword = validatePassword(password);
    if ((await UserModel.find({ email: validatedEmail })).length > 0) {
      throw new Error("Email already registered.");
    } else {
      UserModel.create(
        { email: validatedEmail, password: validatedPassword },
        (err, result) => {
          if (err) {
            next(err);
          } else {
            const serializedData = serialize(result);
            res.status(200).json({
              requestStatus: {
                error: false,
                message: "User successfully signed up",
              },
              data: { ...serializedData },
            });
          }
        }
      );
    }
  } catch (err) {
    next(err);
  }
};

const loginHandler: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validatedEmail = validateEmail(email);
    const validatedPassword = validatePassword(password);
    const user = await UserModel.findOne({ email: validatedEmail });
    if (!user) {
      throw new Error("User does not exist");
    } else {
      if (user.password == validatedPassword) {
        const serializedData = serialize(user);
        res.status(200).json({
          requestStatus: {
            error: false,
            message: "User successfully logged in",
          },
          data: { ...serializedData },
        });
      } else {
        throw new Error("Incorrect password");
      }
    }
  } catch (err) {
    next(err);
  }
};

export default {
  signup: signupHandler,
  login: loginHandler,
};
