import { RequestHandler } from "express";
import { validateEmail, validatePassword, serialize } from "./utils";
import { UserModel } from "./database/users/model";

const signupHandler: RequestHandler = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const validatedEmail = validateEmail(email);
    const validatedPassword = validatePassword(password);
    if ((await UserModel.find({ email: validatedEmail })).length > 0) {
      throw new Error("Email already registered.");
    } else {
      UserModel.create(
        {
          firstname,
          lastname,
          email: validatedEmail,
          password: validatedPassword,
        },
        (err, result) => {
          if (err) {
            next(err);
          } else {
            res.status(200).json({
              error: false,
              requestMessage: "User successfully signed up",
              userId: result._id,
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
      console.log("hello");
      throw new Error("User does not exist");
    } else {
      if (user.password == validatedPassword) {
        res.status(200).json({
          error: false,
          requestMessage: "User successfully logged in",
          userId: user._id,
        });
      } else {
        throw new Error("Incorrect password");
      }
    }
  } catch (err) {
    next(err);
  }
};

const getUserInformationHandler: RequestHandler = async (req, res, next) => {
  console.log(req.query._id)
  const userId = req.query._id;

  try {
    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      throw new Error("User not found");
    } else {
      const data = serialize(user);
      res.status(200).json({
        requestMessage: "User data successfully retrieved",
        error: false,
        ...data,
      });
    }
  } catch (err) {
    next(err);
  }
};

export default {
  getUserInformation: getUserInformationHandler,
  signup: signupHandler,
  login: loginHandler,
};
