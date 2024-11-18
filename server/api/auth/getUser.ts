import { defineEventHandler, getHeader } from "h3";
import { supabase } from "~/utils/supabase";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const token = getHeader(event, "authorization")?.split(" ")[1];

  if (!token) {
    return { status: 401, message: "Utilisateur non authentifié." };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    const email = decoded.email;

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error.message);
      return { status: 404, message: "Utilisateur non trouvé." };
    }

    return { status: 200, email: user.email, userId: user.id };
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error);
    return { status: 401, message: "Token invalide." };
  }
});
