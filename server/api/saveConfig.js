import { defineEventHandler, readBody } from 'h3';
import { supabase } from '~/utils/supabase';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { userId, configName, config } = body;

  try {
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('configs')
      .eq('id', userId)
      .single();

    if (userError) {
      throw new Error(userError.message);
    }

    const configs = user.configs ? JSON.parse(user.configs) : [];
    configs.push({ configName, ...config });

    const { error: updateError } = await supabase
      .from('users')
      .update({ configs: JSON.stringify(configs) })
      .eq('id', userId);

    if (updateError) {
      throw new Error(updateError.message);
    }

    return { message: 'Configuration sauvegardée avec succès!' };
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la configuration:', error);
    return { error: 'Erreur lors de la sauvegarde de la configuration.' };
  }
});
