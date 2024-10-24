import { defineEventHandler, getQuery } from 'h3';
import db from '../database';

export default defineEventHandler((event) => {
  const { userId, configName } = getQuery(event);

  try {
    const user = db.prepare('SELECT configs FROM users WHERE id = ?').get(userId);

    if (!user) {
      return { error: 'Utilisateur non trouvé' };
    }

    const configs = JSON.parse(user.configs || '[]');

    const updatedConfigs = configs.filter(config => config.configName !== configName);

    if (configs.length === updatedConfigs.length) {
      return { error: 'Configuration non trouvée' };
    }

    const newConfigsString = JSON.stringify(updatedConfigs);
    db.prepare('UPDATE users SET configs = ? WHERE id = ?').run(newConfigsString, userId);

    return { message: 'Configuration supprimée avec succès' };

  } catch (error) {
    console.error('Erreur lors de la suppression de la configuration:', error);
    return { error: 'Erreur lors de la suppression de la configuration' };
  }
});
