import bcrpyt from "bcrypt";
import * as crypto from "crypto";

export interface HashedPassword {
  hashedPassword: string;
}

export const hashPassword = async (
  password: string
): Promise<HashedPassword> => {
  const hashedPassword = await bcrpyt.hash(password, 12);
  return { hashedPassword };
};
export interface ComparePasswordParams {
  candidatePassword: string;
  userPassword: string;
}

export const comparePassword = async ({
  candidatePassword,
  userPassword,
}: ComparePasswordParams): Promise<boolean> => {
  return await bcrpyt.compare(candidatePassword, userPassword);
};

export const generatePasswordResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const expires = Date.now() + 10 * 60 * 1000;
  return { resetToken, hashedToken, expires };
};
