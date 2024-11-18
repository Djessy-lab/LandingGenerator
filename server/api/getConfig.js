import { defineEventHandler, getQuery } from 'h3';
import { supabase } from '~/utils/supabase';

export default defineEventHandler(async (event) => {
  const { userId } = getQuery(event);

  try {
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('configs')
      .eq('id', userId)
      .single();

    if (userError) {
      throw new Error(userError.message);
    }

    return JSON.parse(user.configs || '[]');
  } catch (error) {
    console.error('Erreur lors de la récupération des configurations:', error);
    return { error: 'Erreur lors de la récupération des configurations' };
  }
});
