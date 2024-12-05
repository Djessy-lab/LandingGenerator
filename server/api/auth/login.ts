import { defineEventHandler, readBody } from 'h3';
import { sendMagicLink } from '../auth.service';
import { supabase } from '~/utils/supabase';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const userData = body.user || body;

    const { email, name, image } = userData;

    if (!email) {
        return { status: 400, message: 'L\'email est requis.' };
    }

    try {
        const { data: existingUser, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            console.error('Erreur lors de la récupération de l\'utilisateur:', fetchError.message);
            throw new Error('Erreur lors de la récupération de l\'utilisateur');
        }

        if (!existingUser) {
            const { data: insertedUser, error: insertError } = await supabase
                .from('users')
                .insert([{
                    email,
                    name,
                    image,
                    created_at: new Date().toISOString()
                }])
                .select()
                .single();

            if (insertError) {
                console.error('Erreur lors de l\'insertion de l\'utilisateur:', insertError.message);
                throw new Error('Erreur lors de l\'insertion de l\'utilisateur');
            }

            console.log('Utilisateur inséré:', insertedUser);
            return {
                status: 200,
                message: 'Utilisateur synchronisé avec succès.',
                userId: insertedUser.id
            };
        }

        return {
            status: 200,
            message: 'Utilisateur synchronisé avec succès.',
            userId: existingUser.id
        };

    } catch (error) {
        console.error('Erreur:', error);
        return { status: 500, message: 'Une erreur est survenue.' };
    }
});
