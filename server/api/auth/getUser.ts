import { defineEventHandler, getHeader } from "h3";
import db from "../../database";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const token = getHeader(event, "authorization")?.split(" ")[1];

  if (!token) {
    return { status: 401, message: "Utilisateur non authentifié." };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    const email = decoded.email;

    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

    if (user) {
      return { status: 200, email: user.email, userId: user.id }; 
    } else {
      return { status: 404, message: "Utilisateur non trouvé." };
    }
  } catch (error) {
    return { status: 401, message: "Token invalide." };
  }
});
