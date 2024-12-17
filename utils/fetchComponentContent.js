export async function fetchComponentContent(componentName) {
  try {
    const response = await fetch(`/api/get-component-content?componentName=${componentName}`);
    const data = await response.json();

    if (data.success) {
      return data.content;
    } else {
      console.error(data.error);
      return '';
    }
  } catch (error) {
    console.error(`Erreur lors de la récupération du composant ${componentName}:`, error);
    throw error;
  }
}
