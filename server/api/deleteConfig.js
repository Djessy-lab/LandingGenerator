import { defineEventHandler, getQuery } from 'h3';
import { supabase } from '~/utils/supabase';

export default defineEventHandler(async (event) => {
  const { userId, configName } = getQuery(event);

  try {
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('configs')
      .eq('id', userId)
      .single();

    if (userError) {
      return { error: 'Utilisateur non trouvé' };
    }

    const configs = user.configs ? JSON.parse(user.configs) : [];
    const updatedConfigs = configs.filter(config => config.configName !== configName);

    if (configs.length === updatedConfigs.length) {
      return { error: 'Configuration non trouvée' };
    }

    const { error: updateError } = await supabase
      .from('users')
      .update({ configs: JSON.stringify(updatedConfigs) })
      .eq('id', userId);

    if (updateError) {
      throw new Error(updateError.message);
    }

    return { message: 'Configuration supprimée avec succès' };
  } catch (error) {
    console.error('Erreur lors de la suppression de la configuration:', error);
    return { error: 'Erreur lors de la suppression de la configuration' };
  }
});
