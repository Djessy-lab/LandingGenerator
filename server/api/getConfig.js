import { defineEventHandler, getQuery } from 'h3';
import db from '../database';

export default defineEventHandler((event) => {
  const { userId } = getQuery(event);

  try {
    const user = db.prepare('SELECT configs FROM users WHERE id = ?').get(userId);
    if (user) {
      return JSON.parse(user.configs || '[]');
    } else {
      return { error: 'Utilisateur non trouvé' };
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des configurations:', error);
    return { error: 'Erreur lors de la récupération des configurations' };
  }
});
