import { Document } from "mongoose";
declare module "mongoose" {
  interface Document {
    comparePassword(
      candidatePassword: string,
      userPassword: string
    ): Promise<boolean>;
    createPasswordResetToken(): string;
    isResetTokenValid(): boolean;
  }
}
