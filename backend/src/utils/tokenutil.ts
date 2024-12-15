import jwt from "jsonwebtoken";
//generate access Token.
interface TokenPayload {
  id: string;
}

export const generateAccessToken = (id: string): string => {
  const payload: TokenPayload = { id };
  return jwt.sign(payload, process.env.JWT_SECRET as string, {});
};
