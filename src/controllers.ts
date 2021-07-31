import { RequestHandler } from "express";
import {
  validateUserInfo,
  validateEmail,
  validatePassword,
  serialize,
} from "./utils";
import { UserModel } from "./database/users/model";
import messages from "./utils/messages";

const signupHandler: RequestHandler = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const validatedEmail = validateEmail(email);
    const validatedPassword = validatePassword(password);
    if ((await UserModel.find({ email: validatedEmail })).length > 0) {
      throw new Error(messages.errors.emailRegistered);
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
              requestMessage: messages.successfulSignup,
              userId: result._id,
              isAdmin: result.isAdmin,
              zoomLink: result.zoomLink,
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
      throw new Error(messages.errors.unknownUser);
    } else {
      if (user.password == validatedPassword) {
        res.status(200).json({
          error: false,
          requestMessage: messages.successfulLogin,
          userId: user._id,
          isAdmin: user.isAdmin,
          zoomLink: user.zoomLink,
        });
      } else {
        throw new Error(messages.errors.incorrectPassword);
      }
    }
  } catch (err) {
    next(err);
  }
};

const getUserInformationHandler: RequestHandler = async (req, res, next) => {
  const { userId } = req.query;

  try {
    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      throw new Error(messages.errors.unknownUser);
    } else {
      res.status(200).json({
        requestMessage: messages.retrievedUserData,
        error: false,
        ...serialize(user),
      });
    }
  } catch (err) {
    next(err);
  }
};

const getAllUsersHandler: RequestHandler = async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({
      requestMessage: messages.retrievedUsersData,
      error: false,
      users: users.map((user) => serialize(user)),
    });
  } catch (err) {
    next(err);
  }
};

const updateUsersHandler: RequestHandler = async (req, res, next) => {
  const { updatedUsers } = req.body;
  try {
    const updateUserPromises = updatedUsers.map(
      async ({ userId, ...params }) => {
        validateUserInfo(params);
        UserModel.updateOne({ _id: userId }, params, {}, (err, result) => {
          if (err) {
            throw err;
          } else {
            return null;
          }
        });
      }
    );
    await Promise.all(updateUserPromises);
    res.status(200).json({
      error: false,
      requestMessage: messages.updateUsers,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  getAllUsers: getAllUsersHandler,
  getUserInformation: getUserInformationHandler,
  signup: signupHandler,
  login: loginHandler,
  updateUsers: updateUsersHandler,
};
