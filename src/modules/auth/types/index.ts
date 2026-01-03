import { JwtPayload } from "jsonwebtoken";

export interface DecodedToken extends JwtPayload {
  userId: string; // Assuming userId is a string
}
