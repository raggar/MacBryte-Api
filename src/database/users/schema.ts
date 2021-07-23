import { Schema } from "mongoose";
import { setLastUpdated } from "./methods";
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
    default: PackagePurchased.LOW,
  },
  hoursRemaining: {
    type: Number,
    default: 0,
  },
  grandTotalHours: {
    type: Number,
    default: 0,
  },
  previousSessionSummary: {
    type: [String],
    default: [],
  },
  appleId: {
    type: String,
    default: "",
  },
  dateOfEntry: {
    type: Date,
    default: new Date(),
  },
  lastUpdated: {
    type: Date,
    default: new Date(),
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.setLastUpdated = setLastUpdated;

export default UserSchema;
