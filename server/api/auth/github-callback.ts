import { defineEventHandler } from 'h3';
import { supabase } from '~/utils/supabase';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { user } = body;

    if (!user) {
        return { status: 400, message: 'Données utilisateur requises.' };
    }

    try {
        const { data: existingUser, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('email', user.email)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            console.error('Erreur lors de la récupération de l\'utilisateur:', fetchError.message);
            throw new Error('Erreur lors de la récupération de l\'utilisateur');
        }

        if (!existingUser) {
            const { error: insertError } = await supabase
                .from('users')
                .insert([{
                    email: user.email,
                    name: user.name,
                    github_id: user.id,
                    avatar_url: user.image,
                    created_at: new Date().toISOString()
                }]);

            if (insertError) {
                console.error('Erreur lors de l\'insertion de l\'utilisateur:', insertError.message);
                throw new Error('Erreur lors de l\'insertion de l\'utilisateur');
            }

            return { status: 201, message: 'Utilisateur créé avec succès.' };
        }

        const { error: updateError } = await supabase
            .from('users')
            .update({
                name: user.name,
                avatar_url: user.image,
                updated_at: new Date().toISOString()
            })
            .eq('email', user.email);

        if (updateError) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur:', updateError.message);
            throw new Error('Erreur lors de la mise à jour de l\'utilisateur');
        }

        return { status: 200, message: 'Utilisateur mis à jour avec succès.' };
    } catch (error) {
        console.error('Erreur:', error);
        return { status: 500, message: 'Erreur serveur lors du traitement de l\'utilisateur.' };
    }
});
