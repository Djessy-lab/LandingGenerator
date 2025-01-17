import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

function sanitizeFileName(fileName) {
  return fileName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^_+|_+$/g, '');
}

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const body = await readMultipartFormData(event);
    if (!body || body.length === 0) {
      throw new Error("Aucun fichier reçu.");
    }

    const file = body[0];
    const sanitizedFileName = sanitizeFileName(file.filename);
    const baseFileName = `${query.userId}_${sanitizedFileName}`;
    let filePath = `images/${baseFileName}`;


    const { data: existingFiles, error: listError } = await supabase.storage
      .from('landing-generator-bucket')
      .list('images');

    if (listError) {
      throw new Error(`Erreur lors de la liste des fichiers : ${listError.message}`);
    }

    const existingFile = existingFiles.find(file => {
      const baseName = file.name.split('_')[0] + '_' + file.name.split('_')[1];
      return baseName === baseFileName;
    });

    if (existingFile) {
      const { data: existingUrl } = supabase.storage
        .from('landing-generator-bucket')
        .getPublicUrl(`images/${existingFile.name}`);

      return {
        success: true,
        url: existingUrl.publicUrl,
        message: "Fichier déjà existant"
      };
    }

    const timestampedFileName = `${query.userId}_${Date.now()}_${sanitizedFileName}`;
    filePath = `images/${timestampedFileName}`;


    const { data, error } = await supabase.storage
      .from('landing-generator-bucket')
      .upload(filePath, file.data, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw new Error(`Erreur Supabase : ${error.message}`);
    }

    const { data: publicUrlData, error: urlError } = supabase.storage
      .from('landing-generator-bucket')
      .getPublicUrl(data.path);

    if (urlError) {
      throw new Error(`Erreur URL publique : ${urlError.message}`);
    }

    return {
      success: true,
      url: publicUrlData.publicUrl,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error.message,
    };
  }
});
