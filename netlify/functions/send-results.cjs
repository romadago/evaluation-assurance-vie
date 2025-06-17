// Fichier : netlify/functions/send-results.cjs
// VERSION FINALE : utilise l'API de Resend directement, sans dépendances externes.

exports.handler = async function(event) {
  // On vérifie que la méthode est bien POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // On récupère les données envoyées par le front-end
    const data = JSON.parse(event.body);
    const { email, quizTitle, score, maxScore, resultLabel, resultDescription } = data;

    // Validation des données
    if (!email || !quizTitle || !resultLabel || !resultDescription) {
      return { statusCode: 400, body: 'Données manquantes pour l\'envoi de l\'email.' };
    }
    
    // On prépare les données pour l'API de Resend
    const emailPayload = {
      from: 'Aeternia Patrimoine <noreply@aeterniapatrimoine.fr>',
      to: [email],
      subject: `Vos résultats au questionnaire : ${quizTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Bonjour !</h2>
          <p>Merci d'avoir participé à notre questionnaire "<strong>${quizTitle}</strong>".</p>
          <p>Voici votre résultat :</p>
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">${resultLabel} (${score}/${maxScore} points)</h3>
            <p><em>${resultDescription}</em></p>
          </div>
          <p>N'hésitez pas à prendre rendez-vous pour discuter de vos résultats et affiner votre stratégie.</p>
          <p>Cordialement,</p>
          <p><strong>L'équipe Aeternia Patrimoine</strong></p>
        </div>
      `,
    };

    // --- Appel direct à l'API de Resend avec fetch ---
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}` // On utilise la clé API
      },
      body: JSON.stringify(emailPayload)
    });

    if (!response.ok) {
      // Si Resend retourne une erreur, on la capture
      const errorData = await response.json();
      console.error("Erreur de l'API Resend :", errorData);
      throw new Error("L'API Resend a retourné une erreur.");
    }

    // On retourne une réponse de succès au front-end
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email envoyé avec succès !' }),
    };

  } catch (error) {
    console.error("Erreur dans la fonction Netlify :", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Une erreur interne est survenue lors de l'envoi de l'email." }),
    };
  }
};

