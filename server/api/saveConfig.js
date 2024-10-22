import { defineEventHandler, readBody } from 'h3';
import db from '../database';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { userId, configName, config } = body;

  try {
    const user = db.prepare('SELECT configs FROM users WHERE id = ?').get(userId);
    const configs = user.configs ? JSON.parse(user.configs) : [];

    configs.push({ configName, ...config });

    const stmt = db.prepare('UPDATE users SET configs = ? WHERE id = ?');
    stmt.run(JSON.stringify(configs), userId);

    return { message: 'Configuration sauvegardée avec succès!' };
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la configuration:', error);
    return { error: 'Erreur lors de la sauvegarde de la configuration.' };
  }
});
