import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { prisma } from "./db";

export interface Token {
  id: string;
}

export async function getUserFromJWT(token: string) {
  let parsedToken: Token | undefined;
  jwt.verify(token, process.env.JWT_SECRET ?? "", {}, (err, decoded) => {
    if (err) return;
    else parsedToken = (decoded as { user: Token }).user;
  });

  if (!parsedToken) return;

  const user = await prisma.user.findUnique({
    where: {
      id: parsedToken?.id
    }
  });

  return user
}

export function createJWTForUser(user: User) {
  const token = jwt.sign({
    user: {
      id: user.id
    }
  }, process.env.JWT_SECRET ?? "", { expiresIn: '30d' });

  return token as string;
}