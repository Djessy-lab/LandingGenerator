import { defineEventHandler, getHeader } from "h3";
import { supabase } from "~/utils/supabase";

export default defineEventHandler(async (event) => {
  const token = getHeader(event, "authorization")?.split(" ")[1];

  if (!token) {
    return { status: 401, message: "Utilisateur non authentifié." };
  }

  try {
    const { error } = await supabase
      .from('magic_links')
      .delete()
      .eq('token', token);

    if (error) {
      throw new Error(error.message);
    }

    return { status: 200, message: "Déconnexion réussie." };
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    return { status: 500, message: "Erreur lors de la déconnexion." };
  }
});
