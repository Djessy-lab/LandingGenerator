import { defineEventHandler } from 'h3';
import { supabase } from '../utils/supabase';

export default defineEventHandler(async (event) => {
  try {
    const { data: emails, error } = await supabase
      .from('emails')
      .select('*');

    if (error) {
      throw new Error(error.message);
    }

    return emails;
  } catch (error) {
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Erreur lors de l\'export des emails.' }));
  }
});
