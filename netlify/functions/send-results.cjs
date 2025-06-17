// Fichier : netlify/functions/send-results.cjs
// IMPORTANT: Le nom du fichier doit maintenant se terminer par .cjs pour être traité comme un module CommonJS.

const { Resend } = require('resend');

// On exporte la fonction avec la syntaxe CommonJS (exports.handler)
exports.handler = async function(event) {
  // On s'assure que la requête vient bien du front-end via une méthode POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // On initialise Resend avec la clé API.
    const resend = new Resend(process.env.RESEND_API_KEY);

    // On récupère les données envoyées par le composant React
    const data = JSON.parse(event.body);
    const { email, quizTitle, score, maxScore, resultLabel, resultDescription } = data;

    // Une petite validation pour s'assurer que toutes les données sont bien là
    if (!email || !quizTitle || !resultLabel || !resultDescription) {
      return { statusCode: 400, body: 'Données manquantes pour l'envoi de l'email.' };
    }

    // --- Envoi de l'email via Resend ---
    await resend.emails.send({
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
    });

    // On retourne une réponse de succès au front-end
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email envoyé avec succès !' }),
    };

  } catch (error) {
    console.error("Erreur dans la fonction Netlify :", error);
    // En cas d'erreur, on retourne une réponse d'erreur au front-end
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Une erreur est survenue lors de l'envoi de l'email." }),
    };
  }
};
