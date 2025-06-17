// Fichier : netlify/functions/send-results.cjs (Version de TEST)
// Ce code ne fait qu'accuser réception des données, sans essayer d'envoyer un email.
// Son but est de vérifier si le déploiement sur Netlify fonctionne.

exports.handler = async function(event) {
  // On vérifie que la méthode est bien POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // On essaie de lire les données envoyées par le front-end
    const data = JSON.parse(event.body);
    
    // On affiche les données reçues dans les logs de Netlify pour vérifier
    console.log("Fonction de test a bien reçu les données :", data.email);

    // On retourne une réponse de succès au front-end
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "La fonction de test a bien été appelée." }),
    };

  } catch (error) {
    console.error("Erreur dans la fonction de test :", error);
    // On retourne une réponse d'erreur générique
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Une erreur est survenue dans la fonction de test." }),
    };
  }
};
