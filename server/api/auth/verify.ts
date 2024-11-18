import { defineEventHandler, getQuery } from "h3";
import { supabase } from "~/utils/supabase";

export default defineEventHandler(async (event) => {
    const { token, email } = getQuery(event);

    const { data: magicLink, error } = await supabase
        .from('magic_links')
        .select('*')
        .eq('token', token)
        .eq('email', email)
        .single();

    if (error || !magicLink) {
        console.error('Erreur lors de la récupération du lien magique:', error);
        return { status: 401, message: "Token invalide ou expiré." };
    }

    const currentTime = Date.now();
    const expirationTime = new Date(magicLink.expires_at).getTime();

    console.log('Current Time:', new Date(currentTime).toISOString());
    console.log('Expiration Time:', new Date(expirationTime).toISOString());

    if (currentTime > expirationTime) {
        console.error('Token expiré:', magicLink.expires_at);
        return { status: 401, message: "Token expiré." };
    }

    await supabase
        .from('magic_links')
        .delete()
        .eq('token', token);

    const { data: user } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

    if (user) {
        return {
            status: 200,
            message: "Utilisateur authentifié.",
            email: user.email,
        };
    } else {
        return { status: 404, message: "Utilisateur non trouvé." };
    }


});
