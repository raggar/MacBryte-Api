import { Document } from "mongoose";

export enum PackagePurchased {
  NONE = "No Package",
  LYTE = "MacBryte Lyte",
  BASIC = "MacBryte Basic",
  PLUS = "MacBryte Plus",
  PRO = "MacBryte Pro",
  MEMBERSHIP = "MacBryte Membership",
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
  grandTotalHours: number;
  dateOfEntry?: Date;
  isAdmin: boolean;
}

export interface IUserDocument extends Partial<IUser>, Document {}
