import { defineEventHandler, readBody } from 'h3';
import { sendMagicLink } from '../auth.service';
import { supabase } from '~/utils/supabase';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
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
            console.error('Erreur lors de la récupération de l\'utilisateur:', fetchError.message);
            throw new Error('Erreur lors de la récupération de l\'utilisateur');
        }

        if (!existingUser) {
            const { error: insertError } = await supabase
                .from('users')
                .insert([{ email }]);

            if (insertError) {
                console.error('Erreur lors de l\'insertion de l\'utilisateur:', insertError.message);
                throw new Error('Erreur lors de l\'insertion de l\'utilisateur');
            }
        }

        return { status: 200, message: 'Lien magique envoyé.', token };
    } catch (error) {
        console.error('Erreur lors de l\'envoi du lien magique:', error);
        return { status: 500, message: 'Erreur lors de l\'envoi du lien magique.' };
    }
});
