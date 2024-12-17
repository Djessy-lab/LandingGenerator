import { promises as fs } from 'fs';
import { resolve } from 'path';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { componentName } = query;

  try {
    if (!componentName) {
      throw new Error('Nom du composant manquant.');
    }

    const componentPath = resolve(`./components/Landing/${componentName}`);
    const content = await fs.readFile(componentPath, 'utf-8');

    return {
      success: true,
      content,
    };
  } catch (error) {
    return {
      success: false,
      error: `Erreur lors de la lecture du composant ${componentName}: ${error.message}`,
    };
  }
});
