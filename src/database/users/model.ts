import { model } from "mongoose";
import { IUserDocument } from "./types";
import UserSchema from "./schema";

export const UserModel = model<IUserDocument>("user", UserSchema);
