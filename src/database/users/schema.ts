import { Schema } from "mongoose";
import { PackagePurchased } from "./types";

const UserSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  zoomLink: {
    type: String,
    default: "",
  },
  packagePurchased: {
    type: String,
    enum: PackagePurchased,
    default: PackagePurchased.NONE,
  },
  hoursRemaining: {
    type: Number,
    default: 0,
  },
  grandTotalHours: {
    type: Number,
    default: 0,
  },
  dateOfEntry: {
    type: Date,
    default: new Date(),
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export default UserSchema;
