import { Schema, model, Document } from "mongoose";
import validator from "validator";
import {
  generatePasswordResetToken,
  hashPassword,
  comparePassword,
} from "../utils/authUtil";
interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photo: string;
  passwordResetExpires: Date;
  passwordResetToken: string;
  comparePassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
  createPasswordResetToken(): string;
  isResetTokenValid(): boolean;
}
const userScheme = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide your first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide your last name"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },

    password: {
      type: String,
      required: [true, "Please provide your password"],
      minlength: 4,
      select: false,
    },
    photo: String,
    passwordResetExpires: Date,
    passwordResetToken: String,
  },
  {
    timestamps: true,
  }
);

userScheme.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    const hashedPasswordObj = await hashPassword(this.password);
    this.password = hashedPasswordObj.hashedPassword;
    next();
  } catch (error) {
    console.log(error);
  }
});

// password compare method
userScheme.methods.comparePassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await comparePassword({ candidatePassword, userPassword });
};
// password reset token generator
userScheme.methods.createPasswordResetToken = function () {
  const { resetToken, hashedToken, expires } = generatePasswordResetToken();
  this.passwordResetToken = hashedToken;
  this.passwordResetExpires = expires;
  return resetToken;
};

// check if password reset token is valid
userScheme.methods.isResetTokenValid = function () {
  return this.passwordResetExpires && this.passwordResetExpires > new Date();
};

// serialize user object
userScheme.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.passwordResetToken;
  delete userObject.passwordResetExpires;
  return userObject;
};
const User = model<IUser>("User", userScheme);
export { IUser, User };
