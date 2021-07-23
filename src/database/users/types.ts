import { Document, Model } from "mongoose";

export enum PackagePurchased {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export interface IUser {
  firstname: string;
  lastname: string;
  userId: string;
  email: string;
  password: string;
  zoomLink: string;
  packagePurchased: PackagePurchased;
  hoursRemaining: number;
  grandTotalHours: string;
  previousSessionSummary: string[];
  appleId: string;
  dateOfEntry?: Date;
  lastUpdated?: Date;
  isAdmin: boolean;
}

export interface IUserDocument extends Partial<IUser>, Document {}

export interface IUserModel extends Model<IUserDocument> {}
