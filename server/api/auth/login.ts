import { defineEventHandler, readBody } from 'h3';
import { sendMagicLink } from '../auth.service';
import { supabase } from '~/utils/supabase';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const isOAuthAuth = body.email && (body.name || body.image || body.provider);

    if (isOAuthAuth) {
        const { email, name, image, provider } = body;

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
                throw new Error('Erreur lors de la récupération de l\'utilisateur');
            }

            if (!existingUser) {
                const { data: insertedUser, error: insertError } = await supabase
                    .from('users')
                    .insert([{
                        email,
                        name,
                        image,
                        auth_type: provider || 'oauth',
                        created_at: new Date().toISOString()
                    }])
                    .select()
                    .single();

                if (insertError) {
                    console.error('Erreur d\'insertion:', insertError);
                    throw new Error('Erreur lors de l\'insertion de l\'utilisateur');
                }

                return {
                    status: 200,
                    message: 'Utilisateur créé avec succès.',
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
    } else {
        const { email } = body;

        if (!email) {
            return { status: 400, message: 'L\'email est requis.' };
        }

        try {
            const token = await sendMagicLink(email);

            const { data: existingUser, error: fetchError } = await supabase
                .from('users')
                .select('*')
                .eq('email', email)
                .single();

            if (fetchError && fetchError.code !== 'PGRST116') {
                throw new Error('Erreur lors de la récupération de l\'utilisateur');
            }

            if (!existingUser) {
                const { error: insertError } = await supabase
                    .from('users')
                    .insert([{
                        email,
                        auth_type: 'magic_link',
                        created_at: new Date().toISOString()
                    }]);

                if (insertError) throw new Error('Erreur lors de l\'insertion de l\'utilisateur');
            }

            return { status: 200, message: 'Lien magique envoyé.', token };
        } catch (error) {
            console.error('Erreur lors de l\'envoi du lien magique:', error);
            return { status: 500, message: 'Erreur lors de l\'envoi du lien magique.' };
        }
    }
});
